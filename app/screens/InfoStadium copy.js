import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import IMAGE from '../utils/images.util';
import fonts from '../theme/ConfigStyle';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import API from '../server/api';
import { useDispatch, useSelector } from 'react-redux';
import { REDUX } from '../redux/store/types';
import { Message } from '../components/Message';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
export default function InfoStadium({ navigation }) {
  const [dataStadium, setDataStadium] = useState();
  const domain = useSelector((state) => state?.userReducer?.domain);
  useEffect(() => {
    API.get(`${domain}stadium/info`)
      .then(({ data }) => {
        data?.code === 200
          ? setDataStadium(data?.data)
          : Message('Lỗi lấy dữ liệu');
      })
      .catch((onError) => {
        console.log('InfoStadium -> onError', onError.message);
        Message('Vui lòng kiểm tra thông tin đăng nhập');
      });
  }, []);
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT, flex: 1 }}>
      <ParallaxScrollView
        showsVerticalScrollIndicator={false}
        headerBackgroundColor={Colors.colorDarkBlue}
        stickyHeaderHeight={48 * HEIGHT_SCALE}
        parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
        backgroundSpeed={10}
        renderBackground={() => (
          <View key="background">
            <Image
              source={{
                uri: dataStadium?.image,
                width: WIDTH,
                height: PARALLAX_HEADER_HEIGHT,
              }}
            />
            <View
              style={{
                position: 'absolute',
                top: 0,
                width: WIDTH,
                backgroundColor: '#00000060',
                height: PARALLAX_HEADER_HEIGHT,
              }}
            />
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <Text numberOfLines={1} style={styles.sectionSpeakerText}>
              {dataStadium?.stadiumName}
            </Text>
            <Text numberOfLines={1} style={styles.sectionTitleText}>
              {dataStadium?.address}
            </Text>
          </View>
        )}
        renderStickyHeader={() => (
          <Header
            style={{
              backgroundColor: Colors.colorGreen,
            }}
            center={
              <Text
                numberOfLines={1}
                style={{
                  fontSize: fonts.font18,
                  fontWeight: fonts.bold,
                  color: Colors.whiteColor,
                }}>
                {dataStadium?.stadiumName}
              </Text>
            }
          />
        )}
      />
    </ImageBackground>
  );
}
const PARALLAX_HEADER_HEIGHT = 250 * HEIGHT_SCALE;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorDarkBlue,
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WIDTH,
    height: PARALLAX_HEADER_HEIGHT,
  },
  parallaxHeader: {
    justifyContent: 'flex-end',
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 10 * WIDTH_SCALE,
  },
  sectionSpeakerText: {
    color: 'white',
    fontSize: fonts.font18,
    fontWeight: fonts.bold,
    paddingVertical: 5 * HEIGHT_SCALE,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: fonts.font14,
    paddingVertical: 5 * HEIGHT_SCALE,
  },
});
