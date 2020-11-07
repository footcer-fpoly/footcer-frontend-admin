import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
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

export default function InfoStadium({ navigation, route }) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [nameColage, setNameColage] = useState('');
  const [playTime, setPlayTime] = useState('1800000');
  const [people, setPeople] = useState('5');
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
  const startTimeRef = useRef();
  const endTimeRef = useRef();
  console.log(
    'createCollage -> route?.params?.id',
    route?.params?.id,
    nameColage,
    people,
    new Date(startTime).getTime(),
    new Date(endTime).getTime(),
    playTime,
  );
  const createCollage = () => {
    Spinner.show();
    if (nameColage) {
      if (new Date(startTime).getTime() < new Date(endTime).getTime()) {
        API.post('/stadium/add-collage', {
          stadiumCollageName: nameColage,
          amountPeople: people,
          startTime: new Date(startTime).getTime().toString(),
          endTime: new Date(endTime).getTime().toString(),
          playTime: playTime,
          stadiumId: route?.params?.id,
        })
          .then(({ data }) => {
            const obj = data?.data;
            if (data.code === 200) {
              Spinner.hide();
              navigation.replace('InfoStadium');
            } else {
              Spinner.hide();
              Message('Tạo sân con thất bại');
            }
          })
          .catch((onError) => {
            console.log(onError.message);
            Spinner.hide();
          });
      } else Message('Thời gian bắt đầu phải lớn hơn thời gian kết thúc');
    } else Message('Vui lòng nhập tên sân con');
  };
  return (
    <View>
      <Header
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Tạo sân con
          </Text>
        }
      />
      <View
        style={{
          margin: 10 * WIDTH_SCALE,
        }}>
        <Text
          style={{
            fontWeight: fonts.bold,
            left: 10 * WIDTH_SCALE,
          }}>
          Tên sân con:
        </Text>
        <View
          style={{
            overflow: 'hidden',
            borderWidth: 1 * HEIGHT_SCALE,
            borderColor: Colors.borderGreen,
            borderRadius: 6 * HEIGHT_SCALE,
          }}>
          <TextInput
            placeholder="Sân 1, Sân trái, Sân lớn, Sân si,...."
            style={{
              paddingHorizontal: 10 * WIDTH_SCALE,
              borderWidth: 1 * HEIGHT_SCALE,
              borderColor: Colors.colorGrayBackground,
              borderRadius: 6 * HEIGHT_SCALE,
            }}
            multiline
            onChangeText={setNameColage}
          />
        </View>
      </View>
      <View
        style={{
          margin: 10 * WIDTH_SCALE,
        }}>
        <Text
          style={{
            fontWeight: fonts.bold,
            left: 10 * WIDTH_SCALE,
          }}>
          Chọn thời gian:
        </Text>
        <View
          style={{
            overflow: 'hidden',
            borderWidth: 1 * HEIGHT_SCALE,
            borderColor: Colors.borderGreen,
            borderRadius: 6 * HEIGHT_SCALE,
            padding: 10 * WIDTH_SCALE,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => startTimeRef.current.show()}>
                <Text style={{}}>Giờ bắt đầu: {startTime.substr(17, 5)}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => endTimeRef.current.show()}>
                <Text>Giờ kết thúc: {endTime.substr(17, 5)}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          margin: 10 * WIDTH_SCALE,
        }}>
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
      <View
        style={{
          margin: 10 * WIDTH_SCALE,
        }}>
        <Text
          style={{
            fontWeight: fonts.bold,
            left: 10 * WIDTH_SCALE,
          }}>
          Số người chơi:
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
              borderWidth: checkPeople.op5 ? 2 * WIDTH_SCALE : 1 * WIDTH_SCALE,
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
              borderWidth: checkPeople.op7 ? 2 * WIDTH_SCALE : 1 * WIDTH_SCALE,
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
              borderWidth: checkPeople.op9 ? 2 * WIDTH_SCALE : 1 * WIDTH_SCALE,
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
      <TouchableOpacity
        onPress={createCollage}
        style={{
          alignItems: 'center',
          backgroundColor: Colors.colorGreen,
          // marginHorizontal: 20 * WIDTH_SCALE,
          borderRadius: 14 * HEIGHT_SCALE,
          width: WIDTH * 0.9,
          alignSelf: 'center',
        }}>
        <Text
          style={{
            paddingVertical: 14 * HEIGHT_SCALE,
            color: 'white',
            fontSize: fonts.font16,
            fontWeight: fonts.bold,
          }}>
          Tạo sân con
        </Text>
      </TouchableOpacity>
      <ModalTimeComponent
        ref={startTimeRef}
        title="Chọn giờ bắt đầu"
        time={setStartTime}
      />
      <ModalTimeComponent
        ref={endTimeRef}
        title="Chọn giờ kết thúc"
        time={setEndTime}
      />
    </View>
  );
}
