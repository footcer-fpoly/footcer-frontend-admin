import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useSelector } from 'react-redux';
import Container from '../components/common/Container';
import StatusBarMain from '../components/common/StatusBarMain';
import ItemStadium from '../components/Home/ItemStadium';
import Colors from '../theme/Colors';
import ConfigStyle from '../theme/ConfigStyle';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';

export default function HomeScreen({ route, navigation }) {
  const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );
  console.log('HomeScreen -> dataStadiumRedux', dataStadiumRedux);
  return (
    <View>
      <Header
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
      {buttom({
        title: 'Thông tin sân',
        onPress: () => navigation.navigate('InfoStadium'),
      })}
      {buttom({
        title: 'Thông tin đặt sân',
      })}
      {buttom({
        title: 'Thông tin cá nhân',
        onPress: () => navigation.navigate('ProfileDetail'),
      })}
      {buttom({
        title: 'Thông tin dịch vụ',
        onPress: () => navigation.navigate('ServiceScreen'),
      })}
      {buttom({
        title: 'Thống kê',
      })}
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
});
function buttom({ title = '', onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{}}>{title}</Text>
    </TouchableOpacity>
  );
}
