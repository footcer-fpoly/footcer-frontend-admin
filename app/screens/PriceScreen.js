import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import API from '../server/api';
import { HEIGHT, HEIGHT_SCALE } from '../utils/ScaleAdaptor';
import { Message } from '../components/Message';
import moment from 'moment';
export default function PriceScreen({ route, navigation }) {
  const item = route?.params?.item;
  const [dataCollage, setData] = useState(item);
  const renderItem = (props) => {
    const { item, index } = props;
    const startTime = new Date(Number(item?.startTimeDetail)).toUTCString();
    const endTime = new Date(Number(item?.endTimeDetail)).toUTCString();
    return (
      <View
        style={{
          borderBottomWidth: 1 * HEIGHT_SCALE,
          borderBottomColor: Colors.colorGrayBackground,
        }}>
        <View
          style={{
            padding: 20 * HEIGHT_SCALE,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.txtPrice}>{item?.price}</Text>
          <Text>{`${startTime.substr(17, 5)} - ${endTime.substr(17, 5)}`}</Text>
        </View>
      </View>
    );
  };
  useEffect(() => {
    API.get(`/stadium/collage-details/${item.stadiumCollageId}`)
      .then(({ data }) => {
        const obj = data?.data;
        data?.code === 200
          ? setData({ dataCollage, ...obj })
          : Message('Lỗi lấy dữ liệu');
      })
      .catch((onError) => {
        console.log('InfoStadium -> onError', onError.message);
        Message('Lỗi');
      });
  }, []);
  const startTime = new Date(Number(dataCollage?.startTime)).toUTCString();
  const endTime = new Date(Number(dataCollage?.endTime)).toUTCString();
  return (
    <View style={{ flex: 1 }}>
      <Header
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Cập nhật thông tin sân
          </Text>
        }
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.settingsContainer}>
          <View style={styles.row}>
            <Text style={styles.txt}>Tên sân con</Text>
            <Text style={styles.txtTimeSlot}>
              {dataCollage?.stadiumCollageName}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Khung giờ</Text>
            <Text style={styles.txtDate}>{`${startTime.substr(
              17,
              5,
            )} - ${endTime.substr(17, 5)}`}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Số phút</Text>
            <Text style={styles.txtDate}>
              {dataCollage?.playTime === '1800000'
                ? '30'
                : dataCollage?.playTime === '3600000'
                ? '60'
                : '90'}{' '}
              phút
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Loại sân</Text>
            <Text style={styles.txtDate}>
              {dataCollage?.amountPeople} người
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.txt}>Giá tiền</Text>
            <Text style={styles.txtPrice}>{dataCollage?.defaultPrice}</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.btnSetting}>
              <Text style={styles.txtSettingg}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.settingsContainer, {}]}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataCollage?.stadiumDetails || []}
            renderItem={renderItem}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorGrayBackground,
  },
  txtSetting: {
    color: Colors.colorDarkBlue,
    fontSize: fonts.font16,
    marginVertical: 10 * HEIGHT_SCALE,
    marginLeft: 15,
  },
  txtSettingg: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    fontSize: 17,
    color: Colors.colorWhite,
  },
  settingsContainer: {
    backgroundColor: Colors.colorWhite,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  txt: {
    color: Colors.colorGrayText,
    fontSize: fonts.font16,
  },
  txtTimeSlot: {
    color: Colors.colorBlue,
    fontSize: fonts.font16,
    fontWeight: fonts.bold,
  },
  txtDate: {
    fontSize: fonts.font16,
    color: Colors.colorGrayText,
  },
  txtPrice: {
    color: Colors.colorGreen,
    fontSize: fonts.font16,
  },
  btnContainer: {
    alignItems: 'center',
  },
  btnSetting: {
    backgroundColor: Colors.colorOrange,
    alignItems: 'center',
    borderRadius: 7,
  },
});
