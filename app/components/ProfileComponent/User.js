import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';
import { WIDTH_SCALE } from '../../utils/ScaleAdaptor';
import { REDUX } from '../../redux/store/types';
import Spinner from '../Spinner';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function User(props) {
  const userRedux = useSelector((state) => state?.userReducer?.userData);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <View style={styles.childContainer}>
        <Image
          source={{ uri: userRedux?.avatar }}
          style={styles.imgStyle}
          resizeMode="cover"
        />
        <View style={{ justifyContent: 'center' }}>
          <Text style={{ fontSize: width * 0.045, fontFamily: 'Times' }}>
            {userRedux?.displayName}
          </Text>
          <Text
            style={{
              fontSize: width * 0.038,
              fontFamily: 'Times',
              color: Colors.colorGreen,
            }}>
            {userRedux?.phone}
          </Text>
          <Text
            style={{
              fontSize: width * 0.038,
              fontFamily: 'Times',
              color: Colors.colorGrayText,
            }}>
            Chủ sân
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            Spinner.show();
            dispatch({ type: REDUX.CLEAR_USER_DATA });
            Spinner.hide();
            props.navigation.replace('Login');
          }}
          style={{
            backgroundColor: Colors.colorOrange,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 0,
          }}>
          <Text
            style={{
              color: Colors.whiteColor,
              fontSize: width * 0.03,
              fontFamily: 'Times',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.account}>TÀI KHOẢN</Text>
      <View style={{ marginVertical: 22 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('ProfileDetail')}
            style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="user" size={25} color="#15C0FF" />
            <Text style={{ marginLeft: 32 }}>Chỉnh sửa tài khoản</Text>
          </TouchableOpacity>
          <Feather name="chevron-right" size={25} color="grey" />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="list" size={25} color="#15C0FF" />
            <Text style={{ marginLeft: 32 }}>Lịch sử đặt sân</Text>
          </View>
          <Feather name="chevron-right" size={25} color="grey" />
        </View>
      </View>
      <View style={{ marginVertical: 22 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="list" size={25} color="#15C0FF" />
            <Text style={{ marginLeft: 32 }}>Sản phẩm - Dịch vụ</Text>
          </View>
          <Feather name="chevron-right" size={25} color="grey" />
        </View>
      </View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Feather name="list" size={25} color="#15C0FF" />
            <Text style={{ marginLeft: 32 }}>Thiết lập sân</Text>
          </View>
          <Feather name="chevron-right" size={25} color="grey" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  childContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgStyle: {
    width: WIDTH_SCALE * 80,
    height: WIDTH_SCALE * 80,
    borderRadius: (WIDTH_SCALE * 80) / 2,
    marginRight: 10 * WIDTH_SCALE,
  },
  account: {
    fontFamily: 'Times',
    marginTop: 40,
    color: Colors.colorOrange,
    fontSize: width * 0.045,
  },
});
