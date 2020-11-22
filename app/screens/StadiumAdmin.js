import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import fonts from '../theme/ConfigStyle';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import API from '../server/api';
import { REDUX } from '../redux/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { Message } from '../components/Message';

export default function StadiumAdmin({ route, navigation }) {
  const [dataStadium, setData] = useState();
  const listStadium = useSelector(
    (state) => state.userReducer?.listStadiumAdmin,
  );
  const [check, setCheck] = useState({ all: true, filter: false });
  const dispatch = useDispatch();
  const getStadium = () => {
    API.get('/stadium/list')
      .then(({ data }) => {
        const obj = data?.data;
        if (data.code === 200) {
          setData(obj);
          dispatch({ type: REDUX.UPDATE_STADIUM_ADMIN, payload: obj });
        }
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };
  const CheckBox = (value) => {
    switch (value) {
      case 'all':
        setCheck({ all: true, filter: false });
        break;
      case 'filter':
        setCheck({ all: false, filter: true });
        break;
    }
  };
  useEffect(() => {
    getStadium();
  }, []);
  useEffect(() => {
    check?.filter
      ? setData(dataStadium.filter((a) => a?.verify === '0'))
      : setData(listStadium);
  }, [check]);
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
            {'Danh sách sân'}
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
        <TouchableOpacity
          onPress={() => CheckBox('all')}
          style={{
            flex: 1,
            alignItems: 'center',
            borderRadius: 8 * WIDTH_SCALE,
            borderWidth: check.all ? 2 * WIDTH_SCALE : 1 * WIDTH_SCALE,
            marginHorizontal: 5 * WIDTH_SCALE,
            padding: 10 * WIDTH_SCALE,
            borderColor: check.all ? Colors.borderGreen : Colors.colorGrayText,
          }}>
          <Text
            style={{
              fontWeight: check.all ? fonts.bold : null,
              color: check.all ? '#000' : Colors.colorGrayText,
            }}>
            Tất cả sân
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => CheckBox('filter')}
          style={{
            flex: 1,
            alignItems: 'center',
            borderRadius: 8 * WIDTH_SCALE,
            borderWidth: check?.filter ? 2 * WIDTH_SCALE : 1 * WIDTH_SCALE,
            marginHorizontal: 5 * WIDTH_SCALE,
            padding: 10 * WIDTH_SCALE,
            borderColor: check?.filter
              ? Colors.borderGreen
              : Colors.colorGrayText,
          }}>
          <Text
            style={{
              fontWeight: check?.filter ? fonts.bold : null,
              color: check?.filter ? '#000' : Colors.colorGrayText,
            }}>
            Sân chưa duyệt
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataStadium}
        renderItem={({ item, index }) => {
          return <Item onPress={getStadium} item={item} index={index} />;
        }}
      />
    </View>
  );
}

const Item = ({ item, index, onPress }) => {
  const acceptStadium = () => {
    API.get(`/admin/accept-stadium/${item?.stadiumId}`)
      .then(({ data }) => {
        const obj = data?.data;
        if (data.code === 200) {
          onPress();
          Message('Duyệt thành công');
        }
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };
  return (
    <View
      style={{
        borderRadius: 10 * WIDTH_SCALE,
        overflow: 'hidden',
        backgroundColor: 'white',
        margin: 16 * WIDTH_SCALE,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,

        elevation: 2,
      }}>
      <Image
        style={{ width: '100%', height: 150 * HEIGHT_SCALE }}
        source={{
          uri: item?.image,
        }}
      />
      {textRow({ title: `Tên cụm sân: `, content: item?.stadiumName })}
      {textRow({
        title: `Tình trạng: `,
        content: item?.verify === '0' ? 'Chưa xác thực' : 'Đã xác thưc',
      })}
      {textRow({
        title: `Địa chỉ: `,
        content: '01 Đường Tô Kí, Quận 12, Tp.HCM, Quận 12, Tp.HCM',
      })}
      {textRow({
        title: `Mô tả: `,
        content: item?.description,
        numberLine: 3,
      })}

      {item?.verify === '0' && (
        <View style={{ alignItems: 'flex-end' }}>
          <TouchableOpacity
            onPress={acceptStadium}
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
      )}
    </View>
  );
  function textRow({ title, content, numberLine = 1 }) {
    return (
      <View
        style={{
          flexDirection: 'row',
          padding: 8 * HEIGHT_SCALE,
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
            color: item?.verify === '0' ? Colors.colorRed : Colors.textGreen,
            width: '100%',
          }}>
          {content}
        </Text>
      </View>
    );
  }
};
