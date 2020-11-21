import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Colors from '../theme/Colors';
import HeadAvatar from '../components/ProfileDetailScreenComponents/HeadAvatar';
import Profile from '../components/ProfileDetailScreenComponents/Profile';
import fonts from '../theme/ConfigStyle';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-picker';
import ModalTimeComponent from '../components/ModalTimeComponent';
import moment from 'moment';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import Spinner from '../components/Spinner';
import { Message } from '../components/Message';
import API from '../server/api';
import { REDUX } from '../redux/store/types';

export default function ProfileDetailScreen({ route, navigation }) {
  const userRedux = useSelector((state) => state?.userReducer?.userData);
  const [user, setUser] = useState({});
  const [source, setSource] = useState();
  useEffect(() => {
    API.get('/users/profile')
      .then(({ data }) => {
        const obj = data?.data;
        if (data.code === 200) {
          dispatch({ type: REDUX.UPDATE_USER_DATA, payload: obj });
          Spinner.hide();
        } else {
          Message('Lỗi lấy thông tin');
          Spinner.hide();
        }
      })
      .catch((onError) => {
        Spinner.hide();
        console.log('SignIn -> onError', onError);
        Message('Lỗi, vui lòng thử lại');
      });
  }, []);
  useEffect(() => {
    setUser({
      ...user,
      displayName: userRedux?.displayName,
      phone: userRedux?.phone,
      avatar: userRedux?.avatar,
      birthday: userRedux?.birthday || '',
    });
  }, [userRedux]);
  const selectFile = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        console.log(response.customButton);
      } else {
        setSource(response);
        setUser({ ...user, avatar: response.uri });
      }
    });
  };
  const ref = useRef();
  const dispatch = useDispatch();
  const updateProfile = async () => {
    Spinner.show();
    const formData = new FormData();
    formData.append('folder', 'user');
    user?.displayName !== userRedux?.displayName &&
      formData.append('displayName', user?.displayName);
    (user?.birthday !== userRedux?.birthday || user?.birthday !== '') &&
      formData.append('birthday', user?.birthday);
    formData.append('phone', user?.phone);
    user?.avatar !== userRedux?.avatar &&
      formData.append('files', {
        type: source?.type,
        size: source?.fileSize,
        uri: `file://${source?.path}`,
        name: source?.fileName,
      });
    if (
      user?.displayName !== userRedux?.displayName ||
      user?.birthday !== userRedux?.birthday ||
      user?.phone !== userRedux?.phone ||
      user?.avatar !== userRedux?.avatar
    ) {
      await API.put('/users/update', formData)
        .then(({ data }) => {
          if (data?.code === 200) {
            Message('Cập nhật thành công!');
            API.get('/users/profile')
              .then(({ data }) => {
                const obj = data?.data;
                console.log('ProfileDetailScreen -> obj', obj);
                if (data.code === 200) {
                  dispatch({ type: REDUX.UPDATE_USER_DATA, payload: obj });
                  Spinner.hide();
                } else {
                  Message('Lỗi lấy thông tin');
                  Spinner.hide();
                }
              })
              .catch((onError) => {
                Spinner.hide();
                console.log('SignIn -> onError', onError);
                Message('Lỗi, vui lòng thử lại');
              });
          } else Message('Lỗi, vui lòng thử lại');
          console.log('update -> data', data);
          Spinner.hide();
        })
        .catch((onError) => {
          console.log('apiUpdateStadium -> onError', onError);
          Message('Lỗi, vui lòng thử lại');
          Spinner.hide();
        });
    } else {
      Message('Không có gì để thay đổi (^_^)!');
      Spinner.hide();
    }
  };
  return (
    <View style={styles.container}>
      <Header
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Chỉnh sửa thông tin
          </Text>
        }
      />
      <View style={styles.headerContainer}>
        <View style={styles.viewRow}>
          <View>
            <Image style={styles.imgAvatar} source={{ uri: user?.avatar }} />
            <TouchableOpacity style={styles.edit} onPress={selectFile}>
              <Icon name={'pen'} size={12} color={'#fff'} />
            </TouchableOpacity>
          </View>
          <View style={{ paddingHorizontal: 15 }}>
            <View style={{}}>
              <Text style={{ color: '#fff', fontSize: 18 }}>
                {userRedux?.displayName}
              </Text>
              <TouchableOpacity
                style={styles.btnChangePassword}
                onPress={() => {
                  navigation.navigate('ChangePassword');
                }}>
                <Text style={{ color: '#fff', fontSize: 14 }}>
                  Đổi mật khẩu
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View style={{ height: 10, backgroundColor: Colors.greyShadow }} />
      <ScrollView>
        <View style={styles.bodyContainer}>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.colorGrayText,
            }}>
            <Text style={styles.title}>Họ và Tên</Text>
            <View style={styles.subTitle}>
              <TextInput
                value={user?.displayName}
                style={styles.txt}
                placeholder="Nhập Họ và Tên"
                onChangeText={(v) => setUser({ ...user, displayName: v })}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.colorGrayText,
            }}>
            <Text style={styles.title}>Số điện thoại</Text>
            <View style={styles.subTitle}>
              <TextInput
                editable={false}
                value={user?.phone}
                style={styles.txt}
                keyboardType="phone-pad"
                placeholder="Nhập số điện thoại"
                onChangeText={(v) => setUser({ ...user, phone: v })}
              />
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.colorGrayText,
            }}>
            <Text style={styles.title}>Ngày sinh</Text>
            <View style={styles.subTitle}>
              <TouchableOpacity onPress={() => ref.current.show()}>
                <Text style={styles.txt}>
                  {user?.birthday ? user?.birthday : 'Nhấn để chọn'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={updateProfile}
            style={{
              alignItems: 'center',
              backgroundColor: Colors.colorGreen,
              marginTop: 20 * WIDTH_SCALE,
              borderRadius: 14 * HEIGHT_SCALE,
              width: WIDTH * 0.9,
              alignSelf: 'center',
            }}>
            <Text
              style={{
                paddingVertical: 14 * HEIGHT_SCALE,
                color: 'white',
                fontSize: fonts.font16,
                fontWeight: fonts.bold,
              }}>
              {'Lưu thay đổi'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <ModalTimeComponent
        isDate
        ref={ref}
        title="Chọn giờ mở cửa"
        time={(v) =>
          setUser({
            ...user,
            birthday: moment(v.toString()).format('DD-MM-YYYY'),
          })
        }
        timeDefault={user?.birthday ? user?.birthday : new Date()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhite,
  },
  bodyContainer: {
    marginTop: 10,
    backgroundColor: Colors.colorWhite,
    paddingHorizontal: 10,
    marginBottom: -1,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#0AB134',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  imgAvatar: {
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  edit: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editName: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
  title: {
    fontSize: 14,
    color: Colors.colorGrayText,
  },
  btnChangePassword: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF5E0B',
    marginTop: 5,
    justifyContent: 'center',
    width: 120,
    height: 30,
    borderRadius: 5,
  },
  subTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  txt: {
    paddingVertical: 10,
    width: '100%',
    fontSize: 15,
  },
});
