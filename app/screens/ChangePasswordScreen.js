import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import IMAGE from '../utils/images.util';
import colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import API from '../server/api';
import Spinner from '../components/Spinner';
import Axios from 'axios';
import { REDUX } from '../redux/store/types';
import { Message } from '../components/Message';
import Colors from '../theme/Colors';
import Header from '../components/Header';
import { useSelector } from 'react-redux';

export default function ChangePasswordScreen({ route, navigation }) {
  const domain = useSelector((state) => state?.userReducer?.domain);
  const userRedux = useSelector((state) => state?.userReducer?.userData);
  const [isCheck, setIsCheck] = useState({
    password: true,
    confirmPassword: true,
  });
  const [data, setData] = useState({ password: '', confirmPassword: '' });
  const handleChangePassword = () => {
    API.put(`${domain}/users/change-password`, {
      password: data?.password,
      phone: userRedux?.phone,
    })
      .then(({ data }) => {
        console.log('editCollage -> data', data);
        if (data.code === 200) {
          Message('Đổi mật khẩu thành công');
          Spinner.hide();
          navigation.goBack();
        } else {
          Spinner.hide();
          Message('Đổi mật khẩu thất bại');
        }
      })
      .catch((onError) => {
        Message('Đổi mật khẩu thất bại');
        console.log(onError.message);
        Spinner.hide();
      });
  };
  const handleValidate = () => {
    Spinner.show();
    data?.password
      ? data?.password >= 6
        ? data?.confirmPassword
          ? data?.password === data?.confirmPassword
            ? handleChangePassword()
            : (Message('Nhập lại mật khẩu không đúng'), Spinner.hide())
          : (Message('Vui lòng nhập lại mật khẩu'),
            setIsCheck({
              ...isCheck,
              password: true,
              confirmPassword: false,
            }),
            Spinner.hide())
        : (Message('Mật khẩu phải trên 6 kí tự'),
          setIsCheck({
            ...isCheck,
            password: false,
            confirmPassword: false,
          }),
          Spinner.hide())
      : (Message('Vui lòng nhập mật khẩu'),
        setIsCheck({
          ...isCheck,
          password: false,
          confirmPassword: false,
        }),
        Spinner.hide());
  };
  const inputCell = (props) => {
    return (
      <View>
        <Text
          style={{
            fontSize: fonts.font16,
            marginTop: 20 * HEIGHT_SCALE,
            color: colors.blackColor,
          }}>
          {props.title}
        </Text>
        <View
          style={{
            borderColor: props?.isCheck ? colors.colorGreen : colors.colorRed,

            borderWidth: 1 * HEIGHT_SCALE,
            width: 0.8 * WIDTH,
            borderRadius: 10 * HEIGHT_SCALE,
            paddingHorizontal: 20 * WIDTH_SCALE,
            marginTop: 20 * HEIGHT_SCALE,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={props?.image ? props?.image : IMAGE.username}
            style={{
              height: 20 * WIDTH_SCALE,
              width: 20 * WIDTH_SCALE,
              marginRight: 10 * WIDTH_SCALE,
            }}
          />
          <TextInput
            style={{
              fontSize: fonts.font16,
              width: '100%',
            }}
            secureTextEntry={
              props?.secureTextEntry ? props?.secureTextEntry : false
            }
            maxLength={props?.maxLength ? props.maxLength : null}
            keyboardType={props?.keyboardType ? props?.keyboardType : null}
            onChangeText={props.onChangeText}
            returnKeyType={props.isDone ? 'done' : null}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <Header
        navigation={navigation}
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            Đổi mật khẩu
          </Text>
        }
      />
      <View style={styles.bodyContainer}>
        {inputCell({
          image: IMAGE.password,
          title: 'Nhập mật khẩu mới:',
          onChangeText: (text) => setData({ ...data, password: text?.trim() }),
          secureTextEntry: true,
          isCheck: isCheck.password,
        })}
        {inputCell({
          image: IMAGE.password,
          title: 'Nhập lại mật khẩu:',
          onChangeText: (text) =>
            setData({ ...data, confirmPassword: text?.trim() }),
          secureTextEntry: true,
          isDone: true,
          isCheck: isCheck.confirmPassword,
        })}
      </View>
      <TouchableOpacity
        onPress={handleValidate}
        style={{
          alignItems: 'center',
          backgroundColor: Colors.colorGreen,
          // marginHorizontal: 20 * WIDTH_SCALE,
          marginTop: 30 * HEIGHT_SCALE,
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
          {'Cập nhật'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.colorWhite,
  },
  bodyContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: Colors.colorGrayText,
  },
  subTitle: {
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.colorGrayText,
  },
  txt: {
    fontSize: 15,
  },
});
