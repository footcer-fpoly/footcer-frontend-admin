import React, { useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from 'react-native';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import API from '../server/api';
import { HEIGHT, HEIGHT_SCALE } from '../utils/ScaleAdaptor';
import { Message } from '../components/Message';
import { formatNumber } from '../components/MoneyFormat';
import ModalComponent from '../components/ModalComponent';
import Spinner from '../components/Spinner';
export default function PriceScreen({ route, navigation }) {
  const ref = useRef();
  const item = route?.params?.item;
  const [dataCollage, setData] = useState(item);
  console.log('PriceScreen -> dataCollage', dataCollage);
  const [price, setPrice] = useState();
  const [index, setIndex] = useState();
  const getData = () => {
    API.get(
      `/stadium/collage-details/?stadiumCollageId=${item.stadiumCollageId}&date=2000-11-30`,
    )
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
  };
  const updatePrice = () => {
    Spinner.show();
    if (price) {
      API.put('/stadium/collage-details-update', {
        stadiumDetailsId: dataCollage?.stadiumDetails[index]?.stadiumDetailsId,
        price: Number(price),
      })
        .then(({ data }) => {
          console.log('editCollage -> data', data);
          if (data.code === 200) {
            getData();
            Spinner.hide();
            setIndex();
            setPrice();
          } else {
            Message('Chỉnh sửa giá thất bại');
            Spinner.hide();
            setIndex();
            setPrice();
          }
        })
        .catch((onError) => {
          Message('Lỗi');
          console.log(onError.message);
          Spinner.hide();
          setIndex();
          setPrice();
        });
    } else {
      Message('Vui lòng nhập giá');
      Spinner.hide();
    }
  };
  const renderItem = (props) => {
    const { item, index } = props;
    const startTime = new Date(Number(item?.startTimeDetail)).toUTCString();
    const endTime = new Date(Number(item?.endTimeDetail)).toUTCString();
    return (
      <TouchableOpacity
        onPress={() => {
          setIndex(index);
          ref.current.show();
        }}
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
          <Text style={styles.txtPrice}>{formatNumber(item?.price)} đ</Text>
          <Text>{`${startTime.substr(17, 5)} - ${endTime.substr(17, 5)}`}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  useEffect(() => {
    getData();
  }, []);
  const startTime = new Date(Number(dataCollage?.startTime)).toUTCString();
  const endTime = new Date(Number(dataCollage?.endTime)).toUTCString();
  return (
    <>
      <View style={{ flex: 1 }}>
        <Header
          center={
            <Text
              style={{
                fontSize: fonts.font18,
                fontWeight: fonts.bold,
                color: Colors.whiteColor,
              }}>
              Thông tin chi tiết giá
            </Text>
          }
        />
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
          </View>
          <View style={[styles.settingsContainer, {}]}>
            <FlatList
              data={dataCollage?.stadiumDetails || []}
              renderItem={renderItem}
            />
          </View>
        </ScrollView>
      </View>
      <ModalComponent
        ref={ref}
        title="Chỉnh sửa giá"
        onPress={() => {
          updatePrice();
          ref.current.hide();
        }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
          <Text style={{ fontWeight: fonts.bold }}>Nhập giá: </Text>
          <TextInput
            style={{ fontSize: fonts.font16 }}
            placeholder="Nhập giá..."
            onChangeText={setPrice}
            keyboardType="number-pad"
          />
        </View>
      </ModalComponent>
    </>
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
