import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import fonts from '../theme/ConfigStyle';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import { Message } from '../components/Message';
import API from '../server/api';
import { useSelector } from 'react-redux';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import { formatNumber } from '../components/MoneyFormat';
import moment from 'moment';
import Spinner from '../components/Spinner';
import IMAGE from '../utils/images.util';
import CFlatList from '../components/CFlatList';

export default function OrderStadium({ route, navigation }) {
  const [dataOrder, setDataOrder] = useState();
  const [filter, setFilter] = useState(null);
  const [check, setCheck] = useState({
    all: true,
    accept: false,
    waiting: false,
    reject: false,
  });
  const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );
  const select = [
    {
      title: 'Tất cả',
      onPress: () => {
        CheckBox('all');
        setFilter(null);
      },
      content: 'all',
    },
    {
      title: 'Đã chấp nhận',
      onPress: () => {
        CheckBox('accept');
        setFilter('ACCEPT');
      },
      content: 'accept',
    },
    {
      title: 'Chờ xác nhận',
      onPress: () => {
        CheckBox('waiting');
        setFilter('WAITING');
      },
      content: 'waiting',
    },
    {
      title: 'Đã huỷ',
      onPress: () => {
        CheckBox('reject');
        setFilter('REJECT');
      },
      content: 'reject',
    },
  ];
  const domain = useSelector((state) => state?.userReducer?.domain);
  const getOrderStadium = () => {
    API.get(`${domain}/order/stadium/${dataStadiumRedux?.stadiumId}`)
      .then(({ data }) => {
        const obj = filter
          ? data?.data?.filter((a) => a?.order_status?.status === filter)
          : data?.data;
        if (data.code === 200) {
          setDataOrder(
            obj?.sort((a, b) => {
              return moment(a?.time).valueOf() - moment(b?.time).valueOf();
            }),
          );
          Spinner.hide();
        } else {
          Spinner.hide();
        }
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
        Spinner.hide();
      });
  };
  useEffect(() => {
    Spinner.show();
    getOrderStadium();
  }, [check]);
  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     getOrderStadium();
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  const renderItem = ({ index, item }) => {
    const startTime = new Date(
      Number(item?.stadium_details?.startTimeDetail),
    ).toUTCString();
    const endTime = new Date(
      Number(item?.stadium_details?.endTimeDetail),
    ).toUTCString();

    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('OrderDetails', { item: item })}
        style={{
          width: 0.9 * WIDTH,
          alignSelf: 'center',
          marginTop: 24 * HEIGHT_SCALE,
          borderBottomWidth: 6 * WIDTH_SCALE,
          borderBottomColor:
            item?.order_status?.status === 'ACCEPT'
              ? Colors.textGreen
              : item?.order_status?.status === 'WAITING'
              ? Colors.colorOrange
              : item?.order_status?.status === 'REJECT'
              ? Colors.colorRed
              : Colors.colorDarkBlue,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
            }}>
            {textRow({
              title: `Tên sân: `,
              content: item?.stadium_collage?.stadiumCollageName,
            })}
            {textRow({
              title: `Giá tiền: `,
              content: `${formatNumber(item?.stadium_details?.price)} đ`,
            })}
          </View>
          <View
            style={{
              width: '50%',
              justifyContent: 'center',
            }}>
            {textRow({
              title: `Ngày: `,
              content: moment(item?.time)?.format('DD-MM-YYYY'),
            })}
            {textRow({
              title: `Thời gian: `,
              content: `${startTime.substr(17, 5)} - ${endTime.substr(17, 5)}`,
            })}
          </View>

          <Image
            source={IMAGE?.pennon}
            tintColor={
              item?.order_status?.status === 'ACCEPT'
                ? Colors.textGreen
                : item?.order_status?.status === 'WAITING'
                ? Colors.colorOrange
                : item?.order_status?.status === 'REJECT'
                ? Colors.colorRed
                : Colors.colorDarkBlue
            }
            resizeMode="contain"
            style={{
              width: 28 * WIDTH_SCALE,
              height: 28 * WIDTH_SCALE,
              top: 0,
              right: 10 * WIDTH_SCALE,
              position: 'absolute',
            }}
          />
        </View>
        {textRow({
          title: `Tình trạng: `,
          content:
            item?.order_status?.status === 'ACCEPT'
              ? 'Đã nhận'
              : item?.order_status?.status === 'WAITING'
              ? 'Chờ xác nhận'
              : item?.order_status?.status === 'REJECT'
              ? 'Đã huỷ'
              : 'Hoàn thành',
          status: item?.order_status?.status,
        })}
        {/* {item?.order_status?.status === 'WAITING' && (
          <View
            style={{
              marginTop: 10 * HEIGHT_SCALE,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() =>
                updateOrder({ orderId: item?.orderId, status: 'REJECT' })
              }
              style={{
                backgroundColor: Colors.colorRed,
                width: 150 * WIDTH_SCALE,
                borderTopLeftRadius: 10 * WIDTH_SCALE,
                borderBottomRightRadius: 10 * WIDTH_SCALE,
              }}>
              <Text
                style={{
                  color: Colors.whiteColor,
                  fontSize: fonts.font16,
                  fontFamily: 'Times',
                  textAlign: 'center',
                  paddingHorizontal: 10,
                  paddingVertical: 12 * HEIGHT_SCALE,
                }}>
                Huỷ sân
              </Text>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={() =>
                  updateOrder({ orderId: item?.orderId, status: 'ACCEPT' })
                }
                style={{
                  backgroundColor: Colors.borderGreen,
                  width: 150 * WIDTH_SCALE,
                  borderTopLeftRadius: 10 * WIDTH_SCALE,
                  borderBottomRightRadius: 10 * WIDTH_SCALE,
                }}>
                <Text
                  style={{
                    color: Colors.whiteColor,
                    fontSize: fonts.font16,
                    fontFamily: 'Times',
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    paddingVertical: 12 * HEIGHT_SCALE,
                  }}>
                  Xác nhận sân
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )} */}
      </TouchableOpacity>
    );
  };
  const CheckBox = (value) => {
    switch (value) {
      case 'all':
        setCheck({ all: true, accept: false, waiting: false, reject: false });
        break;
      case 'accept':
        setCheck({ all: false, accept: true, waiting: false, reject: false });
        break;
      case 'waiting':
        setCheck({ all: false, accept: false, waiting: true, reject: false });
        break;
      case 'reject':
        setCheck({ all: false, accept: false, waiting: false, reject: true });
        break;
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
            {'Thông tin đặt sân'}
          </Text>
        }
      />
      <View
        style={{
          overflow: 'hidden',
          borderWidth: 1 * HEIGHT_SCALE,
          borderColor: Colors.borderGreen,
          borderRadius: 6 * HEIGHT_SCALE,
          flexDirection: 'row',
          padding: 10 * WIDTH_SCALE,
        }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {select.map((item) => {
            let a;
            if (check.all) {
              a = 'all';
            } else if (check.accept) {
              a = 'accept';
            } else if (check.waiting) {
              a = 'waiting';
            } else if (check.reject) {
              a = 'reject';
            }
            return (
              <TouchableOpacity
                onPress={item?.onPress}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  borderRadius: 8 * WIDTH_SCALE,
                  borderWidth:
                    item?.content === a ? 2 * WIDTH_SCALE : 1 * WIDTH_SCALE,
                  marginHorizontal: 5 * WIDTH_SCALE,
                  padding: 10 * WIDTH_SCALE,
                  borderColor:
                    item?.content === a ? Colors.borderGreen : '#000',
                  backgroundColor:
                    item?.content === a ? Colors.borderGreen : null,
                }}>
                <Text
                  style={{
                    fontWeight: fonts.bold,
                    color: item?.content === a ? '#fff' : '#000',
                  }}>
                  {item?.title}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
      <View>
        <CFlatList
          showsVerticalScrollIndicator={false}
          style={{}}
          data={dataOrder || []}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
  function textRow({ title, content, numberLine = 1, status }) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 2 * HEIGHT_SCALE,
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: fonts.font16,
            color: Colors.blackColor,
          }}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            fontSize: fonts.font16,
            color:
              status === 'ACCEPT'
                ? Colors.textGreen
                : status === 'WAITING'
                ? Colors.colorOrange
                : status === 'REJECT'
                ? Colors.colorRed
                : status === 'FINISH'
                ? Colors.colorDarkBlue
                : Colors.colorGrayText,
            width: '100%',
          }}>
          {content}
        </Text>
      </View>
    );
  }
}
