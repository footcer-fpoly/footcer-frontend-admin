import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
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
import ModalTimeComponent from '../components/ModalTimeComponent';
import Spinner from '../components/Spinner';
import TextInputCustom from '../components/TextInputCustom';

export default function InfoStadium({ navigation, route }) {
  const dispatch = useDispatch();
  const { data, id } = route?.params;
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [nameColage, setNameColage] = useState('');
  const [playTime, setPlayTime] = useState('1800000');
  const [people, setPeople] = useState('5');
  const [price, setPrice] = useState();
  console.log(
    '🚀 ~ file: CreateCollage.js ~ line 36 ~ InfoStadium ~ price',
    typeof price,
  );
  const [checkTimePlay, setCheckTimePlay] = useState({
    op30: true,
    op60: false,
    op90: false,
  });
  const [checkPeople, setCheckPeople] = useState({
    op5: true,
    op7: false,
    op9: false,
  });
  const TimePlayCheck = (value) => {
    switch (value) {
      case 'op30':
        setCheckTimePlay({ op30: true, op60: false, op90: false });
        setPlayTime('1800000');
        break;
      case 'op60':
        setCheckTimePlay({ op30: false, op60: true, op90: false });
        setPlayTime('3600000');
        break;
      case 'op90':
        setCheckTimePlay({ op30: false, op60: false, op90: true });
        setPlayTime('5400000');
        break;
    }
  };
  const PeopleCheck = (value) => {
    switch (value) {
      case 'op5':
        setCheckPeople({ op5: true, op7: false, op9: false });
        setPeople('5');
        break;
      case 'op7':
        setCheckPeople({ op5: false, op7: true, op9: false });
        setPeople('7');
        break;
      case 'op9':
        setCheckPeople({ op5: false, op7: false, op9: true });
        setPeople('9');
        break;
    }
  };
  const domain = useSelector((state) => state?.userReducer?.domain);
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  const createCollage = () => {
    const sTime = new Date(startTime).getTime();
    const eTime = new Date(endTime).getTime();
    const pTime = playTime;
    const tTime = new Date(endTime).getTime() - new Date(startTime).getTime();
    Spinner.show();
    if (nameColage && price) {
      if (sTime < eTime) {
        if (Number(tTime) >= Number(pTime)) {
          API.post(`${domain}/stadium/add-collage`, {
            stadiumCollageName: nameColage,
            amountPeople: people,
            startTime: new Date(startTime)?.getTime()?.toString(),
            endTime: new Date(endTime)?.getTime()?.toString(),
            playTime: playTime,
            stadiumId: id,
            defaultPrice: Number(price),
          })
            .then(({ data }) => {
              const obj = data?.data;
              console.log('createCollage -> obj', obj);
              if (data.code === 200) {
                API.get(`${domain}/stadium/info`)
                  .then(({ data }) => {
                    const obj = data?.data;
                    dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
                  })
                  .catch((onError) => {
                    console.log('Stadium -> onError', onError.message);
                    Message('Lỗi');
                  });
                Spinner.hide();
                navigation.replace('PriceScreen', {
                  item: obj,
                });
              } else {
                Spinner.hide();
                Message('Tạo sân con thất bại');
              }
            })
            .catch((onError) => {
              console.log(onError.message);
              Spinner.hide();
            });
        } else {
          Message('Thời gian mở cửa phải lớn hơn thời gian chơi');
          Spinner.hide();
        }
      } else {
        Message('Thời gian kết thúc phải lớn hơn thời gian bắt đầu');
        Spinner.hide();
      }
    } else {
      Message('Vui lòng nhập đầy đủ thông tin');
      Spinner.hide();
    }
  };
  const editCollage = () => {
    const sTime = new Date(startTime).getTime();
    const eTime = new Date(endTime).getTime();
    const pTime = new Date(playTime).getTime();
    const tTime = new Date(endTime).getTime() - new Date(startTime).getTime();
    Spinner.show();
    if (nameColage) {
      if (sTime < eTime) {
        if (Number(tTime) >= Number(pTime)) {
          API.put(`${domain}/stadium/update-collage`, {
            stadiumCollageName: nameColage,
            amountPeople: people,
            startTime: new Date(startTime)?.getTime()?.toString(),
            endTime: new Date(endTime)?.getTime()?.toString(),
            playTime: playTime,
            stadiumCollageId: data?.stadiumCollageId,
          })
            .then(({ data }) => {
              console.log('editCollage -> data', data);
              if (data.code === 200) {
                Spinner.hide();
                navigation.replace('InfoStadium');
              } else {
                Spinner.hide();
                Message('Chỉnh sửa sân con thất bại');
              }
            })
            .catch((onError) => {
              console.log(onError.message);
              Spinner.hide();
            });
        } else {
          Message('Thời gian trận đấu lớn hơn giờ mở cửa');
          Spinner.hide();
        }
      } else {
        Message('Thời gian bắt đầu phải lớn hơn thời gian kết thúc');
        Spinner.hide();
      }
    } else {
      Message('Vui lòng nhập đầy đủ thông tin');
      Spinner.hide();
    }
  };
  const setDefault = () => {
    data && setNameColage(data?.stadiumCollageName);
    data && setStartTime(new Date(Number(data?.startTime))?.toUTCString());
    data && setEndTime(new Date(Number(data?.endTime))?.toUTCString());
    data && setPlayTime(data?.playTime);
    data && setPeople(data?.amountPeople);
    TimePlayCheck(
      data?.playTime === '1800000'
        ? 'op30'
        : data?.playTime === '3600000'
        ? 'op60'
        : 'op90',
    );
    PeopleCheck(
      data?.amountPeople === '5'
        ? 'op5'
        : data?.amountPeople === '7'
        ? 'op7'
        : 'op9',
    );
  };
  useEffect(() => {
    data && setDefault();
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <Header
        navigation={navigation}
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            {data ? 'Chỉnh sửa sân con' : 'Tạo sân con'}
          </Text>
        }
      />
      <ScrollView style={{ paddingHorizontal: 0.05 * WIDTH }}>
        <TextInputCustom
          style={{
            fontSize: fonts.font16,
            width: '100%',
          }}
          textError={'Số điện thoại không hợp lệ'}
          value={nameColage}
          label="Nhập tên sân"
          onChangeText={setNameColage}
        />
        <View style={{}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <TextInputCustom
                isPicker
                style={{
                  fontSize: fonts.font16,
                  width: '100%',
                }}
                value={startTime.substr(17, 5)}
                label="Giờ bắt đầu"
                icon={() => {}}
                onPressIcon={() => startTimeRef.current.show()}
              />
            </View>
            <Text>{`    -    `}</Text>
            <View style={{ flex: 1 }}>
              <TextInputCustom
                isPicker
                style={{
                  fontSize: fonts.font16,
                  width: '100%',
                }}
                value={endTime.substr(17, 5)}
                label="Giờ kết thúc"
                icon={() => {}}
                onPressIcon={() => endTimeRef.current.show()}
              />
            </View>
          </View>
        </View>
        {!data && (
          <TextInputCustom
            style={{
              fontSize: fonts.font16,
              width: '100%',
            }}
            textError={'Nhập giá'}
            value={price}
            label="Nhập giá"
            onChangeText={setPrice}
            keyboardType="number-pad"
          />
        )}
        <View style={{}}>
          <Text
            style={{
              fontWeight: fonts.bold,
              left: 10 * WIDTH_SCALE,
            }}>
            Thời gian chơi:
          </Text>
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
              onPress={() => TimePlayCheck('op30')}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 8 * WIDTH_SCALE,
                borderWidth: checkTimePlay.op30
                  ? 2 * WIDTH_SCALE
                  : 1 * WIDTH_SCALE,
                marginHorizontal: 5 * WIDTH_SCALE,
                padding: 10 * WIDTH_SCALE,
                borderColor: checkTimePlay.op30
                  ? Colors.borderGreen
                  : Colors.colorGrayText,
              }}>
              <Text
                style={{
                  fontWeight: checkTimePlay.op30 ? fonts.bold : null,
                  color: checkTimePlay.op30 ? '#000' : Colors.colorGrayText,
                }}>
                30 Phút
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => TimePlayCheck('op60')}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 8 * WIDTH_SCALE,
                borderWidth: checkTimePlay.op60
                  ? 2 * WIDTH_SCALE
                  : 1 * WIDTH_SCALE,
                marginHorizontal: 5 * WIDTH_SCALE,
                padding: 10 * WIDTH_SCALE,
                borderColor: checkTimePlay.op60
                  ? Colors.borderGreen
                  : Colors.colorGrayText,
              }}>
              <Text
                style={{
                  fontWeight: checkTimePlay.op60 ? fonts.bold : null,
                  color: checkTimePlay.op60 ? '#000' : Colors.colorGrayText,
                }}>
                60 Phút
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => TimePlayCheck('op90')}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 8 * WIDTH_SCALE,
                borderWidth: checkTimePlay.op90
                  ? 2 * WIDTH_SCALE
                  : 1 * WIDTH_SCALE,
                marginHorizontal: 5 * WIDTH_SCALE,
                padding: 10 * WIDTH_SCALE,
                borderColor: checkTimePlay.op90
                  ? Colors.borderGreen
                  : Colors.colorGrayText,
              }}>
              <Text
                style={{
                  fontWeight: checkTimePlay.op90 ? fonts.bold : null,
                  color: checkTimePlay.op90 ? '#000' : Colors.colorGrayText,
                }}>
                90 Phút
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{}}>
          <Text
            style={{
              fontWeight: fonts.bold,
              left: 10 * WIDTH_SCALE,
            }}>
            Số người:
          </Text>
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
              onPress={() => PeopleCheck('op5')}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 8 * WIDTH_SCALE,
                borderWidth: checkPeople.op5
                  ? 2 * WIDTH_SCALE
                  : 1 * WIDTH_SCALE,
                marginHorizontal: 5 * WIDTH_SCALE,
                padding: 10 * WIDTH_SCALE,
                borderColor: checkPeople.op5
                  ? Colors.borderGreen
                  : Colors.colorGrayText,
              }}>
              <Text
                style={{
                  fontWeight: checkPeople.op5 ? fonts.bold : null,
                  color: checkPeople.op5 ? '#000' : Colors.colorGrayText,
                }}>
                5 người
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => PeopleCheck('op7')}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 8 * WIDTH_SCALE,
                borderWidth: checkPeople.op7
                  ? 2 * WIDTH_SCALE
                  : 1 * WIDTH_SCALE,
                marginHorizontal: 5 * WIDTH_SCALE,
                padding: 10 * WIDTH_SCALE,
                borderColor: checkPeople.op7
                  ? Colors.borderGreen
                  : Colors.colorGrayText,
              }}>
              <Text
                style={{
                  fontWeight: checkPeople.op7 ? fonts.bold : null,
                  color: checkPeople.op7 ? '#000' : Colors.colorGrayText,
                }}>
                7 người
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => PeopleCheck('op9')}
              style={{
                flex: 1,
                alignItems: 'center',
                borderRadius: 8 * WIDTH_SCALE,
                borderWidth: checkPeople.op9
                  ? 2 * WIDTH_SCALE
                  : 1 * WIDTH_SCALE,
                marginHorizontal: 5 * WIDTH_SCALE,
                padding: 10 * WIDTH_SCALE,
                borderColor: checkPeople.op9
                  ? Colors.borderGreen
                  : Colors.colorGrayText,
              }}>
              <Text
                style={{
                  fontWeight: checkPeople.op9 ? fonts.bold : null,
                  color: checkPeople.op9 ? '#000' : Colors.colorGrayText,
                }}>
                9 người
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={data ? editCollage : createCollage}
        style={{
          alignItems: 'center',
          backgroundColor: Colors.colorGreen,
          // marginHorizontal: 20 * WIDTH_SCALE,
          width: WIDTH,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 0,
        }}>
        <Text
          style={{
            paddingVertical: 14 * HEIGHT_SCALE,
            color: 'white',
            fontSize: fonts.font16,
            fontWeight: fonts.bold,
          }}>
          {data ? 'Chỉnh sửa sân con' : 'Tạo sân con'}
        </Text>
      </TouchableOpacity>
      <ModalTimeComponent
        ref={startTimeRef}
        title="Chọn giờ mở cửa"
        time={setStartTime}
        timeDefault={startTime}
      />
      <ModalTimeComponent
        ref={endTimeRef}
        title="Chọn giờ đóng cửa"
        time={setEndTime}
        timeDefault={endTime}
      />
    </View>
  );
}
