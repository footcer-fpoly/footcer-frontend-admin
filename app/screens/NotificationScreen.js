import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import Colors from '../theme/Colors';
import { WIDTH_SCALE } from '../utils/ScaleAdaptor';
import API from '../server/api';
import { useSelector } from 'react-redux';
import { Message } from '../components/Message';
import CFlatList from '../components/CFlatList';
import moment from 'moment';
import IMAGE from '../utils/images.util';

export default function NotificationScreen({ route, navigation }) {
  const [dataNoti, setDataNoti] = useState();

  const domain = useSelector((state) => state?.userReducer?.domain);

  const getDataNoti = () => {
    API.get(`${domain}/notification/get`)
      .then(({ data }) => {
        const obj = data?.data;
        data?.code === 200 && setDataNoti(obj);
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };
  useEffect(() => {
    getDataNoti();
  }, []);
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
            Thông báo
          </Text>
        }
      />
      <ScrollView showVerticalScrollIndicator showHorizontalScrollIndicator>
        <CFlatList
          data={dataNoti || []}
          renderItem={({ item, index }) => {
            return (
              <RenderItem item={item} index={index} navigation={navigation} />
            );
          }}
        />
      </ScrollView>
    </View>
  );
}
function RenderItem({ item, index, navigation }) {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('OrderDetails', { id: item.generalId })
      }
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.colorGrayText,
      }}>
      <Image
        source={item?.key === 'ADD_ORDER' ? IMAGE.book_open : IMAGE.book_close}
        tintColor={
          item?.key === 'ADD_ORDER' ? Colors?.colorGreen : Colors?.colorRed
        }
        style={{
          height: 40 * WIDTH_SCALE,
          width: 40 * WIDTH_SCALE,
          margin: 10 * WIDTH_SCALE,
          alignSelf: 'center',
        }}
      />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: fonts.font16, fontWeight: 'bold' }}>
          {item?.title}
        </Text>
        <Text style={{ marginTop: 2, fontSize: fonts.font14 }}>
          {item?.content}
        </Text>
        <Text style={{ marginTop: 2, fontSize: fonts.font14 }}>
          {moment(item?.created_at).format('DD-MM-YYYY')}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
