import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
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
import Swipeout from 'react-native-swipeout';
import Moment from 'moment';

export default function InfoStadium({ navigation }) {
  const [dataStadium, setDataStadium] = useState();
  console.log('InfoStadium -> dataStadium', dataStadium?.stadium_collage);
  useEffect(() => {
    API.get('stadium/info')
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
  const renderItem = (props) => {
    const { item, index } = props;
    var swipeoutBtns = [
      {
        text: `Chi tiết`,
        backgroundColor: Colors.colorGreen,
        onPress: () =>
          navigation.navigate('PriceScreen', { id: item?.stadiumCollageId }),
      },
      {
        text: 'Xoá',
        backgroundColor: Colors.colorRed,
      },
    ];
    console.log('renderItem -> item', item);
    const startTime = new Date(Number(item?.startTime)).toUTCString();
    const endTime = new Date(Number(item?.endTime)).toUTCString();

    return (
      <View
        style={{
          borderBottomWidth: 1 * HEIGHT_SCALE,
          borderBottomColor: Colors.colorGrayBackground,
        }}>
        <Swipeout right={swipeoutBtns} showsButtons backgroundColor="white">
          <View
            style={{
              padding: 20 * HEIGHT_SCALE,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>{item?.stadiumCollageName}</Text>

            <Text>{`${Moment(startTime).format('HH:mm')} - ${Moment(
              endTime,
            ).format('HH:mm')}`}</Text>
          </View>
        </Swipeout>
      </View>
    );
  };
  return (
    <ParallaxScrollView
      showsVerticalScrollIndicator={false}
      headerBackgroundColor={Colors.colorDarkBlue}
      stickyHeaderHeight={70 * HEIGHT_SCALE}
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
      )}>
      <FlatList
        data={dataStadium?.stadium_collage || []}
        renderItem={renderItem}
      />
    </ParallaxScrollView>
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
