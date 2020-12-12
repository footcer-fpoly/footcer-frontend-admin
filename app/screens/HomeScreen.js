import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import Container from '../components/common/Container';
import StatusBarMain from '../components/common/StatusBarMain';
import ItemStadium from '../components/Home/ItemStadium';
import Colors from '../theme/Colors';
import ConfigStyle from '../theme/ConfigStyle';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import IMAGE from '../utils/images.util';
import moment from 'moment';

export default function HomeScreen({ route, navigation }) {
  const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );
  const userRedux = useSelector((state) => state?.userReducer?.userData);
  return (
    <View style={{ flex: 1 }}>
      <Header
        hideBack
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            {dataStadiumRedux?.stadiumName}
          </Text>
        }
      />
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.navigate('ProfileDetail')}>
        <View style={styles.viewRow}>
          <View>
            <Image
              style={styles.imgAvatar}
              source={{ uri: userRedux?.avatar }}
            />
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{
          paddingHorizontal: 20 * WIDTH_SCALE,
          marginTop: 10 * HEIGHT_SCALE,
        }}>
        <View style={{}}>
          <Text style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>
            {`Xin chào! ${userRedux?.displayName}`}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: 18,
              marginTop: 5 * HEIGHT_SCALE,
              fontWeight: 'bold',
            }}>
            {`Chúc bạn một ngày tốt lành!!!`}
          </Text>
        </View>
      </View>
      <View
        style={{
          ...styles.viewRow,
          flex: 0.8,
        }}>
        <View
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'space-evenly',
          }}>
          {buttom({
            title: 'Quản lý sân',
            onPress: () => navigation.navigate('InfoStadium'),
            image: IMAGE?.stadium,
          })}
          {buttom({
            title: 'Quản lý đặt sân',
            onPress: () => navigation.navigate('OrderStadium'),
            image: IMAGE?.infor_stadium,
          })}
          {/* {buttom({
            title: 'Thông tin cá nhân',
            onPress: () => navigation.navigate('ProfileDetail'),
            image: IMAGE?.profile,
          })} */}
        </View>
        <View
          style={{
            width: '50%',
            height: '100%',
            justifyContent: 'space-evenly',
          }}>
          {buttom({
            title: 'Thông tin dịch vụ',
            onPress: () => navigation.navigate('ServiceScreen'),
            image: IMAGE?.service,
          })}
          {buttom({
            title: 'Thống kê',
            onPress: () => navigation.navigate('Statistics'),
            image: IMAGE?.statistics,
          })}
          {/* {buttom({
            title: 'Duyệt sân',
            onPress: () => navigation.navigate('Admin'),
          })} */}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slideShowContainer: { flex: 1 },
  slideShowContent: { borderRadius: 15, width: '100%', marginTop: 13 },
  containerAds: { paddingHorizontal: 18 },
  touchPress: { marginVertical: 13 },
  touchStyle: {
    borderRadius: 7,
    borderWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderColor: Colors.borderGreen,
    backgroundColor: Colors.whiteColor,
  },
  textPress: {
    color: Colors.borderGreen,
    fontSize: ConfigStyle.font16,
    fontFamily: 'Times',
  },
  containerPromotion: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  textDiscount: {
    fontSize: ConfigStyle.font16,
    fontFamily: 'Times-Bold',
  },
  textViewAll: {
    fontSize: ConfigStyle.font14,
    fontFamily: 'Times-Bold',
    color: Colors.colorViewAll,
  },
  headerContainer: {
    padding: 20 * WIDTH_SCALE,
    paddingBottom: 0,
  },
  imgAvatar: {
    height: 80 * WIDTH_SCALE,
    width: 80 * WIDTH_SCALE,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: Colors.borderGreen,
  },
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
function buttom({ title = '', onPress, image }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        alignSelf: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        width: '90%',
        borderRadius: 10 * WIDTH_SCALE,
        borderTopRightRadius: 120 * WIDTH_SCALE,
        paddingVertical: 10 * WIDTH_SCALE,
        paddingLeft: 10 * WIDTH_SCALE,
        elevation: 3,
      }}>
      <Image
        tintColor={Colors.textGreen}
        resizeMode="cover"
        style={{ height: 60 * WIDTH_SCALE, width: 60 * WIDTH_SCALE }}
        source={image}
      />
      <Text
        style={{
          color: '#000',
          marginTop: 4 * HEIGHT_SCALE,
          fontSize: fonts?.font18,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}
