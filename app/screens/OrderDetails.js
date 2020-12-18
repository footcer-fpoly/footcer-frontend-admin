import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Colors from '../theme/Colors';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import fonts from '../theme/ConfigStyle';
import moment from 'moment';
import { formatNumber } from '../components/MoneyFormat';
import IMAGE from '../utils/images.util';
import { Message } from '../components/Message';
import Spinner from '../components/Spinner';
import API from '../server/api';
import { useSelector } from 'react-redux';
import TextInputCustom from '../components/TextInputCustom';
import Header from '../components/Header';
import ModalComponent from '../components/ModalComponent';

export default function OrderDetails({ route, navigation }) {
  const item = route?.params?.item;
  const modalAccept = useRef();
  const modalReject = useRef();
  const [filter, setFilter] = useState();
  const domain = useSelector((state) => state?.userReducer?.domain);
  useEffect(() => {
    setFilter(item?.order_status?.status);
  }, []);
  const orderId = item?.orderId;
  const stadiumDetailsId = item?.stadium_details?.stadiumDetailsId;
  const startTime = new Date(
    Number(item?.stadium_details?.startTimeDetail),
  ).toUTCString();
  const endTime = new Date(
    Number(item?.stadium_details?.endTimeDetail),
  ).toUTCString();
  const dateTimeCurrent = moment().format('YYYY-MM-DD HH:mm:ss');
  const dateTimeOrder = moment(
    `${item?.time.substr(0, 10)} ${startTime.substr(17, 5)}`,
  )
    .zone(-7)
    .format('YYYY-MM-DD HH:mm:ss');

  const updateOrder = ({ status }) => {
    API.put(`${domain}/order/update-status`, {
      orderId: orderId,
      status: status,
      reason: status === 'ACCEPT' ? 'Chủ sân chấp nhận' : 'Chủ sân huỷ',
      userId: item?.user?.userId,
      name: item?.stadium?.stadiumName,
    })
      .then(({ data }) => {
        const obj = data?.data;
        console.log('🚀 ~ file: OrderDetails.js ~ line 29 ~ .then ~ obj', data);
        if (data.code === 200) {
          setFilter('ACCEPT');
        }
      })

      .catch((onError) => {
        console.log('Stadium -> onError', onError);
        Message('Lỗi');
      });
  };
  const finishOrder = () => {
    API.put(`${domain}/order/update-status`, {
      orderId: orderId,
      status: 'FINISH',
      reason: 'Hoàn thành',
      userId: item?.user?.userId,
      name: item?.stadium?.stadiumName,
    })
      .then(({ data }) => {
        if (data.code === 200) {
          API.put(`${domain}/order/finish`, {
            orderId: orderId,
            stadiumDetailsId: stadiumDetailsId,
          })
            .then(({ data }) => {
              if (data.code === 200) {
                navigation?.goBack();
              }
            })
            .catch((onError) => {
              console.log('Stadium -> onError', onError.message);
              Message('Lỗi');
            });
        }
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <Header
        navigation={navigation}
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Chi tiết đặt sân
          </Text>
        }
      />
      <ScrollView style={{ paddingHorizontal: 0.05 * WIDTH }}>
        <Text
          style={{
            color: Colors.black,
            fontSize: fonts.font14,
            marginTop: 16 * HEIGHT_SCALE,
          }}
          numberOfLines={1}>
          Thông tin người đặt:
        </Text>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14 * WIDTH_SCALE,
            flexDirection: 'row',
            borderWidth: 1 * HEIGHT_SCALE,
            borderColor: Colors.borderGreen,
            borderRadius: 6 * HEIGHT_SCALE,
            overflow: 'hidden',
            padding: 10 * HEIGHT_SCALE,
          }}>
          <Image
            source={{ uri: item?.user?.avatar }}
            style={{
              width: 100 * WIDTH_SCALE,
              height: 100 * WIDTH_SCALE,
              borderRadius: 50 * WIDTH_SCALE,
              marginRight: 10 * WIDTH_SCALE,
            }}
          />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                width: '100%',
                color: Colors.black,
                fontSize: fonts.font18,
              }}
              numberOfLines={1}>
              {item?.user?.displayName}
            </Text>
            <Text
              style={{
                width: '100%',
                color: Colors.black,
                fontSize: fonts.font14,
              }}
              numberOfLines={1}>
              {item?.user?.phone}
            </Text>
          </View>
          <Image
            source={IMAGE?.pennon}
            tintColor={Colors.borderGreen}
            resizeMode="contain"
            style={{
              width: 40 * WIDTH_SCALE,
              height: 40 * WIDTH_SCALE,
              top: -4 * HEIGHT_SCALE,
              right: 10 * WIDTH_SCALE,
              position: 'absolute',
            }}
          />
        </View>
        {textRow({
          title: `Tên sân: `,
          content: item?.stadium_collage?.stadiumCollageName,
        })}
        {textRow({
          title: `Giá tiền: `,
          content: `${formatNumber(item?.stadium_details?.price)} đ`,
        })}
        {textRow({
          title: `Tình trạng: `,
          content:
            filter === 'ACCEPT'
              ? 'Đã nhận'
              : filter === 'WAITING'
              ? 'Chờ xác nhận'
              : filter === 'REJECT'
              ? item?.order_status?.isUser
                ? 'Người dùng huỷ'
                : 'Chủ sân huỷ'
              : 'Hoàn thành',
          status: filter,
        })}

        {textRow({
          title: `Ngày: `,
          content: moment(item?.time)?.format('DD-MM-YYYY'),
        })}
        {textRow({
          title: `Thời gian: `,
          content: `${startTime.substr(17, 5)} - ${endTime.substr(17, 5)}`,
        })}
        {filter === 'WAITING' ? (
          <View
            style={{
              marginTop: 10 * HEIGHT_SCALE,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}>
            <TouchableOpacity
              onPress={() => modalReject.current.show()}
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
                onPress={() => modalAccept.current.show()}
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
        ) : (
          !item?.finish &&
          filter === 'ACCEPT' && (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: 10 * HEIGHT_SCALE,
              }}>
              <TouchableOpacity
                onPress={finishOrder}
                disabled={dateTimeCurrent > dateTimeOrder ? false : true}
                style={{
                  backgroundColor:
                    dateTimeCurrent > dateTimeOrder
                      ? Colors.borderGreen
                      : Colors.colorGrayText,
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
                  Hoàn thành
                </Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </ScrollView>
      <ModalComponent
        ref={modalAccept}
        onPress={() => {
          updateOrder({ status: 'ACCEPT' });
          modalAccept.current.hide();
        }}
        title="Thông báo!">
        <Text style={{ color: '#000' }}>Bạn có muốn xác nhận sân?</Text>
      </ModalComponent>
      <ModalComponent
        ref={modalReject}
        onPress={() => {
          updateOrder({ status: 'REJECT' });
          modalReject.current.hide();
        }}
        title="Thông báo!">
        <Text style={{ color: '#000' }}>Bạn có muốn đăng xuất?</Text>
      </ModalComponent>
    </View>
  );
}
function textRow({ title, content, numberLine = 1, status }) {
  return (
    <TextInputCustom
      style={{
        fontSize: fonts.font16,
        width: '100%',
      }}
      editable={false}
      selectTextOnFocus={false}
      value={content}
      // textError={isError.text}
      // validate={isError.value}
      label={title}
      returnKeyType="done"
    />
  );
}
