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
  const getOrderStadium = () => {
    API.get(`/order/stadium/${dataStadiumRedux?.stadiumId}`)
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
  const updateOrder = ({ orderId, status }) => {
    API.put(`/order/update-status`, {
      orderId: orderId,
      status: status,
      reason: status === 'ACCEPT' ? 'Chủ sân chấp nhận' : 'Chủ sân huỷ',
    })
      .then(({ data }) => {
        console.log('🚀 ~ file: OrderStadium.js ~ line 42 ~ .then ~ obj', data);
        const obj = data?.data;
        if (data.code === 200) {
          getOrderStadium();
        }
      })

      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };
  useEffect(() => {
    Spinner.show();
    getOrderStadium();
  }, [check]);
  const renderItem = ({ index, item }) => {
    const startTime = new Date(
      Number(item?.stadium_details?.startTimeDetail),
    ).toUTCString();
    const endTime = new Date(
      Number(item?.stadium_details?.endTimeDetail),
    ).toUTCString();
    return (
      <View
        style={{
          width: 0.9 * WIDTH,
          alignSelf: 'center',
          paddingVertical: 12 * HEIGHT_SCALE,
          borderBottomWidth: 1 * WIDTH_SCALE,
          borderBottomColor: Colors.greyShadow,
        }}>
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              //   alignItems: 'center',
              justifyContent: 'center',
              marginRight: 14 * WIDTH_SCALE,
            }}>
            <Image
              source={{ uri: item?.user?.avatar }}
              style={{
                width: 80 * WIDTH_SCALE,
                height: 80 * WIDTH_SCALE,
                marginBottom: 8 * HEIGHT_SCALE,
              }}
            />
            <Text
              style={{
                color: Colors.black,
                fontSize: fonts.font18,
                width: 100 * WIDTH_SCALE,
              }}
              numberOfLines={1}>
              {item?.user?.displayName}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              justifyContent: 'center',
            }}>
            {textRow({
              title: `Tên sân con: `,
              content: item?.stadium_collage?.stadiumCollageName,
            })}
            {textRow({
              title: `Giá tiền: `,
              content: `${formatNumber(item?.stadium_details?.price)} đ`,
            })}
            {textRow({
              title: `Ngày: `,
              content: moment(item?.time)?.format('DD-MM-YYYY'),
            })}
            {textRow({
              title: `Thời gian: `,
              content: `${startTime.substr(17, 5)} - ${endTime.substr(17, 5)}`,
            })}
            {textRow({
              title: `Tình trạng: `,
              content:
                item?.order_status?.status === 'ACCEPT'
                  ? 'Đã nhận'
                  : item?.order_status?.status === 'WAITING'
                  ? 'Chờ xác nhận'
                  : 'Đã huỷ',
              status: item?.order_status?.status,
            })}
          </View>
        </View>
        {item?.order_status?.status === 'WAITING' && (
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
        )}
      </View>
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
        <FlatList
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
          flexDirection: 'row',
          padding: 2 * HEIGHT_SCALE,
          alignItems: 'center',
          width: 0.75 * WIDTH,
        }}>
        <Text
          style={{
            fontSize: fonts.font16,
            color: Colors.blackColor,
          }}>
          {title}
        </Text>
        <Text
          numberOfLines={numberLine}
          style={{
            fontSize: fonts.font16,
            color:
              status === 'ACCEPT'
                ? Colors.textGreen
                : status === 'WAITING'
                ? Colors.colorOrange
                : status === 'REJECT'
                ? Colors.colorRed
                : Colors.colorGrayText,
            width: '100%',
          }}>
          {content}
        </Text>
      </View>
    );
  }
}
