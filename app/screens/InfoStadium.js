import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
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
import ModalComponentX from '../components/ModalComponentX';
import { formatNumber } from '../components/MoneyFormat';
import Spinner from '../components/Spinner';
import StarRating from 'react-native-star-rating';

export default function InfoStadium({ navigation }) {
  const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );
  const [dataStadium, setDataStadium] = useState();
  const ref = useRef();
  const dispatch = useDispatch();
  const [index, setIndex] = useState();
  const getCollage = () => {
    API.get('/stadium/info')
      .then(({ data }) => {
        const obj = data?.data;
        setDataStadium(obj);
        dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };
  useEffect(() => {
    setDataStadium(dataStadiumRedux);
  }, [dataStadiumRedux]);
  useEffect(() => {
    getCollage();
  }, []);
  const renderItem = (props) => {
    const { item, index } = props;
    var swipeoutBtns = [
      {
        text: `Chi tiết`,
        backgroundColor: Colors.colorGreen,
        onPress: () => navigation.navigate('PriceScreen', { item: item }),
      },
      {
        text: 'Xoá',
        backgroundColor: Colors.colorRed,
        onPress: () => deleteCollage(item?.stadiumCollageId),
      },
    ];
    const startTime = new Date(Number(item?.startTime)).toUTCString();
    const endTime = new Date(Number(item?.endTime)).toUTCString();
    return (
      <View
        style={{
          borderBottomWidth: 1 * HEIGHT_SCALE,
          borderBottomColor: Colors.colorGrayBackground,
        }}>
        <Swipeout right={swipeoutBtns} showsButtons backgroundColor="white">
          <TouchableOpacity
            onPress={() => {
              setIndex(index);
              ref.current.show();
            }}
            style={{
              padding: 20 * HEIGHT_SCALE,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text>{item?.stadiumCollageName}</Text>

            <Text>{`${startTime.substr(17, 5)} - ${endTime.substr(
              17,
              5,
            )}`}</Text>
          </TouchableOpacity>
        </Swipeout>
      </View>
    );
  };
  const deleteCollage = (id) => {
    Spinner.show();
    API.delete(`/stadium/delete_collage/${id}`)
      .then(({ data }) => {
        if (data.code === 200) {
          getCollage();
          ref.current.hide();
          Spinner.hide();
          Message('Xoá sân con thành công');
        } else {
          Spinner.hide();
          Message('Xoá sân con thất bại');
        }
      })
      .catch((onError) => {
        console.log(onError.message);
        Spinner.hide();
      });
  };
  return (
    <>
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
                width: WIDTH,
                backgroundColor: '#00000060',
                height: PARALLAX_HEADER_HEIGHT,
              }}
            />
          </View>
        )}
        renderForeground={() => (
          <View key="parallax-header" style={styles.parallaxHeader}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CreateCollage', {
                  id: dataStadium?.stadiumId,
                })
              }
              style={{
                alignItems: 'center',
                width: 120 * WIDTH_SCALE,
                position: 'absolute',
                marginTop: StatusBar.currentHeight * 1.2,
                right: 0,
                backgroundColor: Colors.colorGreen,
                padding: 10 * WIDTH_SCALE,
                borderRadius: 5 * WIDTH_SCALE,
                zIndex: 1,
              }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                }}>
                Thêm sân con
              </Text>
            </TouchableOpacity>
            <View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text numberOfLines={1} style={styles.sectionSpeakerText}>
                  {dataStadium?.stadiumName}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('UpdateStadium', { item: dataStadium })
                  }
                  style={{ marginHorizontal: 10 * WIDTH_SCALE }}>
                  <Image
                    tintColor={Colors.greyShadow}
                    source={IMAGE.edit}
                    style={{
                      height: 20 * WIDTH_SCALE,
                      width: 20 * WIDTH_SCALE,
                    }}
                  />
                </TouchableOpacity>
              </View>
              {dataStadium?.verify === '0' ? (
                <Text
                  style={{
                    color: '#ff0000',
                  }}>
                  Chưa xác thực
                </Text>
              ) : (
                <Text
                  style={{
                    color: Colors.colorGreen,
                  }}>
                  Đã xác thực
                </Text>
              )}
              <View
                style={{
                  width: 80 * WIDTH_SCALE,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={3.5}
                  fullStarColor={'yellow'}
                  starSize={15 * WIDTH_SCALE}
                />
                <Text
                  style={{
                    color: Colors.colorGrayBackground,
                    fontSize: fonts.font12,
                    marginHorizontal: 5 * WIDTH_SCALE,
                  }}>
                  3.5
                </Text>
                <Text
                  style={{
                    color: Colors.colorGrayBackground,
                    fontSize: fonts.font12,
                  }}>
                  (12)
                </Text>
              </View>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.sectionTitleText,
                  marginRight: 120 * WIDTH_SCALE,
                }}>
                {dataStadium?.address}
              </Text>
            </View>
          </View>
        )}
        renderStickyHeader={() => (
          <Header
            style={{
              backgroundColor: Colors.colorGreen,
              height: 70 * HEIGHT_SCALE,
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
            right={
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CreateCollage', {
                    id: dataStadium?.stadiumId,
                  })
                }>
                <Text
                  numberOfLines={1}
                  style={{
                    fontSize: fonts.font14,
                    color: Colors.whiteColor,
                  }}>
                  Thêm
                </Text>
              </TouchableOpacity>
            }
          />
        )}>
        <View style={{ marginTop: 10 * HEIGHT_SCALE }}>
          <FlatList
            data={dataStadium?.stadium_collage || []}
            renderItem={renderItem}
          />
        </View>
      </ParallaxScrollView>
      <ModalComponentX
        isHideAgree
        ref={ref}
        title="Thông tin sân con"
        onPress={() => {
          ref.current.hide();
          // navigation.navigate('OTPScreen', { phone: phone });
        }}>
        {viewModal({
          title: 'Sân con: ',
          content: dataStadium?.stadium_collage[index]?.stadiumCollageName,
        })}
        {viewModal({
          title: 'Thời gian: ',
          content: `${new Date(
            Number(dataStadium?.stadium_collage[index]?.startTime),
          )
            .toUTCString()
            .substr(17, 5)} - ${new Date(
            Number(dataStadium?.stadium_collage[index]?.endTime),
          )
            .toUTCString()
            .substr(17, 5)}`,
        })}
        {viewModal({
          title: 'Thời gian chơi: ',
          content: `${
            dataStadium?.stadium_collage[index]?.playTime === '1800000'
              ? '30'
              : dataStadium?.stadium_collage[index]?.playTime === '3600000'
              ? '60'
              : '90'
          } phút`,
        })}
        {viewModal({
          title: 'Số người: ',
          content: dataStadium?.stadium_collage[index]?.amountPeople,
        })}
        <View style={{ flexDirection: 'row', marginTop: 5 * HEIGHT_SCALE }}>
          <TouchableOpacity
            onPress={() => {
              deleteCollage(
                dataStadium?.stadium_collage[index]?.stadiumCollageId,
              );
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: Colors.colorRed,
              marginRight: 5 * WIDTH_SCALE,
              padding: 6 * WIDTH_SCALE,
              paddingVertical: 10 * WIDTH_SCALE,
              borderRadius: 8 * WIDTH_SCALE,
            }}>
            <Text style={{ color: Colors.whiteColor }}>Xoá</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              ref.current.hide();
              navigation.navigate('CreateCollage', {
                data: dataStadium?.stadium_collage[index],
              });
            }}
            style={{
              flex: 1,
              alignItems: 'center',
              backgroundColor: Colors.colorOrange,
              marginLeft: 5 * WIDTH_SCALE,
              padding: 6 * WIDTH_SCALE,
              paddingVertical: 10 * WIDTH_SCALE,
              borderRadius: 8 * WIDTH_SCALE,
            }}>
            <Text style={{ color: Colors.whiteColor }}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            ref.current.hide();
            navigation.navigate('PriceScreen', {
              item: dataStadium?.stadium_collage[index],
            });
          }}
          style={{
            flex: 1,
            alignItems: 'center',
            backgroundColor: Colors.borderGreen,
            marginLeft: 5 * WIDTH_SCALE,
            padding: 6 * WIDTH_SCALE,
            paddingVertical: 10 * WIDTH_SCALE,
            borderRadius: 8 * WIDTH_SCALE,
            marginTop: 10 * HEIGHT_SCALE,
          }}>
          <Text style={{ color: Colors.whiteColor }}>Xem chi tiết giá</Text>
        </TouchableOpacity>
      </ModalComponentX>
    </>
  );

  function viewModal({ title, content }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 5 * HEIGHT_SCALE,
        }}>
        <Text
          style={{
            fontSize: fonts.font16,
            color: Colors.blackColor,
            flex: 1,
          }}>
          {title}
        </Text>
        <Text
          style={{
            fontWeight: fonts.bold,
            fontSize: fonts.font16,
            color: Colors.colorGrayText,
            flex: 1,
            textAlign: 'right',
          }}>
          {content}
        </Text>
      </View>
    );
  }
}
const PARALLAX_HEADER_HEIGHT = 200 * HEIGHT_SCALE;

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
    flex: 1,
    marginHorizontal: 10 * WIDTH_SCALE,
    justifyContent: 'flex-end',
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
