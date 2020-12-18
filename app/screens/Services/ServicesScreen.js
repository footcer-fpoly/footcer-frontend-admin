import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Container from '../../components/common/Container';
import { Message } from '../../components/Message';
import ModalComponent from '../../components/ModalComponent';
import StatusBarMain from '../../components/common/StatusBarMain';
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import imagesUtil from '../../utils/images.util';
import ImagePicker from 'react-native-image-picker';
import { REDUX } from '../../redux/store/types';
import API from '../../server/api';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../../utils/ScaleAdaptor';
import TextInputCustom from '../../components/TextInputCustom';
import fonts from '../../theme/ConfigStyle';
import Header from '../../components/Header';
import CFlatList from '../../components/CFlatList';
import { formatNumber } from '../../components/MoneyFormat';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ServicesScreen({ route, navigation }) {
  const ref = new useRef();
  const [source, setSource] = useState();
  const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );
  const dispatch = useDispatch();

  const [dataService, setDataService] = useState({
    nameService: '',
    priceService: '',
    imageService: '',
    stadiumId: dataStadiumRedux?.stadiumId,
    data: {},
  });

  const choosePhotoFromLibrary = async () => {
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
      }
    });
  };
  const domain = useSelector((state) => state?.userReducer?.domain);

  const createService = () => {
    if (dataService.nameService && dataService.priceService && source) {
      const formData = new FormData();
      formData.append('folder', 'service');
      formData.append('name', dataService.nameService);
      formData.append('price', dataService.priceService);
      formData.append('stadiumId', dataService.stadiumId);
      formData.append('files', {
        type: source?.type,
        uri: `file://${source?.path}`,
        name: source?.fileName,
      });
      API.post(`${domain}/service/add`, formData)
        .then(({ data }) => {
          if (data.code === 200) {
            API.get(`${domain}/stadium/info`)
              .then(({ data }) => {
                const obj = data?.data;

                dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
              })
              .catch((onError) => {
                console.log('Stadium -> onError', onError.message);
                Message('Lỗi');
              });
            ref.current.hide();
          } else {
            Message('Error');
          }
        })
        .catch((onError) => {
          console.log(
            '🚀 ~ file: ServicesScreen.js ~ line 105 ~ createService ~ onError',
            JSON.stringify(onError),
          );
          Message('Lỗi, vui lòng thử lại');
        });
    } else {
      Message('Vui lòng cung cấp đủ thông tin');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            {'Dịch vụ sân'}
          </Text>
        }
      />
      <View style={{ flex: 1 }}>
        {!!dataStadiumRedux?.service?.length && (
          <Text
            style={{
              fontSize: fonts.font16,
              color: Colors.colorGrayText,
              margin: 10 * HEIGHT_SCALE,
            }}>
            Dịch vụ hiện có tại sân bóng:
          </Text>
        )}
        <View style={{ flex: 1 }}>
          <CFlatList
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-evenly',
              alignItems: 'center',
            }}
            data={dataStadiumRedux.service || []}
            renderItem={({ item, index }) => {
              return <ItemService ref={ref} item={item} domain={domain} />;
            }}
          />
        </View>
        <ModalComponent hideButton ref={ref} title="Thêm dịch vụ">
          <View>
            <TextInputCustom
              style={{
                fontSize: fonts.font16,
                width: '100%',
              }}
              value={dataService.nameService}
              label="Tên dịch vụ"
              onChangeText={(text) =>
                setDataService({ ...dataService, nameService: text })
              }
            />
            <TextInputCustom
              style={{
                fontSize: fonts.font16,
                width: '100%',
              }}
              value={dataService.priceService}
              label="Giá tiền"
              onChangeText={(text) =>
                setDataService({ ...dataService, priceService: text })
              }
            />
          </View>
          <View style={styles.chooserContainer}>
            <Icon name="camera" size={25} color={Colors.greyShadow} />
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={choosePhotoFromLibrary}>
              <Text style={{}}>Chọn ảnh từ thư viện</Text>
              <Image
                resizeMode="contain"
                source={{ uri: source?.uri }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.touchUpload} onPress={createService}>
            <Text style={{ color: '#fff' }}>Thêm mới</Text>
          </TouchableOpacity>
        </ModalComponent>
      </View>
      <TouchableOpacity
        onPress={() => ref.current.show()}
        style={{
          alignItems: 'center',
          width: '100%',
          right: 0,
          backgroundColor: Colors.colorGreen,
          padding: 15 * WIDTH_SCALE,
          zIndex: 1,
        }}>
        <Text
          style={{
            color: Colors.whiteColor,
            fontSize: fonts.font18,
            fontWeight: fonts.bold,
          }}>
          Thêm dịch vụ
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  textServices: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
  },
  addServiceButton: {
    backgroundColor: Colors.colorGreen,
    width: width * 0.1,
    height: height * 0.03,
    borderRadius: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    width: width * 0.4 * WIDTH_SCALE,
    height: height * 0.17 * HEIGHT_SCALE,
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 7,
    borderBottomRightRadius: 7,
    borderBottomLeftRadius: 7,
    marginBottom: 15,
  },
  img: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: width * 0.15,
  },
  imgDelete: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: width * 0.15,
    marginVertical: 10 * HEIGHT_SCALE,
  },
  textName: {
    marginVertical: 5,
    fontFamily: 'Times',
    fontSize: height * 0.02,
  },
  textType: {
    fontFamily: 'Times',
    fontSize: height * 0.02,
    color: Colors.colorOrange,
  },
  titleModal: {
    alignItems: 'center',
    backgroundColor: Colors.colorGreen,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  textNameService: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    color: Colors.whiteColor,
  },
  textUpon: {
    fontSize: 18,
    fontFamily: 'Times',
  },
  textModel: {
    fontSize: 18,
    fontFamily: 'Times',
    marginVertical: 10 * HEIGHT_SCALE,
    marginHorizontal: 10 * WIDTH_SCALE,
  },
  textModelBelow: {
    fontSize: 18,
    fontFamily: 'Times',
    marginHorizontal: 10 * WIDTH_SCALE,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    fontSize: 18,
    fontFamily: 'Times',
  },
  chooserContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  touchUpload: {
    backgroundColor: Colors.colorOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 60 * WIDTH_SCALE,
    paddingVertical: 10 * HEIGHT_SCALE,
    borderRadius: 10,
  },
  textAdd: {
    fontSize: 18,
    fontFamily: 'Times',
    color: Colors.whiteColor,
  },
});

function ItemService(props) {
  const ref = new useRef();
  const [source, setSource] = useState();
  const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );

  const dispatch = useDispatch();

  async function deleteServices() {
    API.delete(`${props?.domain}/service/delete/${props.item.serviceId}`)
      .then(({ data }) => {
        console.log('apiUpdateStadium -> data', data);
        if (data.code === 200) {
          API.get(`${props?.domain}/stadium/info`)
            .then(({ data }) => {
              const obj = data?.data;
              dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
            })
            .catch((onError) => {
              console.log('Stadium -> onError', onError.message);
              Message('Lỗi');
            });
        } else {
          Message('Error');
        }
      })
      .catch((onError) => {
        console.log('apiUpdateStadium -> onError', onError);
        Message('Lỗi, vui lòng thử lại');
      });
  }

  return (
    <View style={styles.itemContainer} key={props.item.serviceId}>
      <TouchableOpacity
        style={{
          backgroundColor: Colors.colorRed,
          borderRadius: 4,
          borderTopRightRadius: 0,
          width: 25 * WIDTH_SCALE,
          height: 25 * HEIGHT_SCALE,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 9999,
        }}
        // onPress={deleteServices}
        onPress={() => ref.current.show()}>
        <Text style={{ color: Colors.whiteColor }}>X</Text>
      </TouchableOpacity>
      <Image
        source={{ uri: props.item.image }}
        style={{
          width: '100%',
          height: 80 * WIDTH_SCALE,
          backgroundColor: 'red',
        }}
      />
      <Text
        numberOfLines={1}
        style={{ fontSize: fonts.font16, fontWeight: 'bold' }}>
        {props.item.name}
      </Text>
      <Text numberOfLines={1} style={{}}>
        {formatNumber(props.item.price)} đ
      </Text>

      <ModalComponent ref={ref} onPress={deleteServices}>
        <Text
          style={{
            color: '#000',
          }}>{`Bạn có muốn xoá dịch vụ ${props.item.name}?`}</Text>
      </ModalComponent>
    </View>
  );
}
