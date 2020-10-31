import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
  PermissionsAndroid,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { SignIn } from '../redux/actions/userAction';
import IMAGE from '../utils/images.util';
import colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';
import {
  HEIGHT,
  HEIGHT_SCALE,
  WIDTH,
  WIDTH_SCALE,
} from '../utils/ScaleAdaptor';
import API from '../server/api';
import { Message } from '../components/Message';
import Header from '../components/Header';
import Colors from '../theme/Colors';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import Spinner from '../components/Spinner';
import vietnam from '../assets/json/vietnam.json';
import ModalComponent from '../components/ModalComponent';
import { REDUX } from '../redux/store/types';

export default function UpdateStadium({ route, navigation }) {
  const KEY_API = 'AIzaSyAmh-Tqfy35GzzQlGED6HLigQtXN4dMi7Q';
  const [address, setAddress] = useState({
    city: '',
    district: '',
    ward: '',
    address: '',
    fullAddress: '',
    data: {},
  });
  const modalCity = useRef();
  const modalWard = useRef();
  const modalDistrict = useRef();
  const [vietnamData, setVietnamData] = useState([]);
  const [isPermission, setIsPermission] = useState(false);
  const dispatch = useDispatch();
  const reduxPosition = useSelector(
    (state) => state?.userReducer?.listPosition,
  );
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setIsPermission(true);
      } else {
        setIsPermission(false);
      }
    } catch (err) {
      setIsPermission(false);
    }
  };
  const GetPosition = async () => {
    await requestLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        dispatch({ type: REDUX.UPDATE_POSITION, payload: position?.coords });
      },
      (error) => {
        console.log('code:', error.code, 'message:', error.message);
      },
    );
  };
  const GetAddress = async (event) => {
    try {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${event?.latitude},${event?.longitude}&key=${KEY_API}`,
        )
        .then(({ data }) => {
          const splitAddress = data?.results[0]?.formatted_address?.split(',');
          const dataAddress = vietnamData.filter(
            (a) =>
              a?.name_with_type
                ?.toLowerCase()
                ?.trim()
                .indexOf(
                  splitAddress[splitAddress?.length - 2]?.toLowerCase()?.trim(),
                ) !== -1,
          );
          const obj = {};
          dataAddress.map((k) =>
            Object.keys(k).forEach((a) => (obj[a] = k[a])),
          );
          setAddress({
            ...address,
            data: obj,
            city: obj.name_with_type,
            district: Object.values(obj?.quan_huyen).filter(
              (a) =>
                a?.name
                  .trim()
                  .toLowerCase()
                  .indexOf(
                    splitAddress[splitAddress?.length - 3].trim().toLowerCase(),
                  ) !== -1,
            )[0]?.name_with_type,
            ward: Object.values(
              Object.values(obj?.quan_huyen).filter(
                (a) =>
                  a?.name
                    .trim()
                    .toLowerCase()
                    .indexOf(
                      splitAddress[splitAddress?.length - 3]
                        .trim()
                        .toLowerCase(),
                    ) !== -1,
              )[0]?.xa_phuong,
            ).filter(
              (a) =>
                a?.name
                  .trim()
                  .toLowerCase()
                  .indexOf(
                    splitAddress[splitAddress?.length - 4].trim().toLowerCase(),
                  ) !== -1,
            )[0].name_with_type,
            fullAddress: splitAddress
              .splice(0, splitAddress?.length - 1)
              .toString(),
          });

          Spinner.hide();
        })
        .catch((onError) => {
          Message('Lỗi lấy vị trí vui lòng thử lại');
          console.log('SignIn -> onError', onError);
          Spinner.hide();
        });
    } catch (error) {
      console.log('GetLocation -> error', error);
      Spinner.hide();
    }
  };
  useEffect(() => {
    setVietnamData(
      Object.values(vietnam).sort(function (a, b) {
        return a.name_with_type.localeCompare(b.name_with_type);
      }),
    );
  }, []);

  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT, flex: 1 }}>
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
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <ScrollView style={{ padding: 10 * WIDTH_SCALE }}>
          <View>
            <Text style={{ fontWeight: fonts.bold, left: 10 * WIDTH_SCALE }}>
              Vị trí sân của bạn trên bản đồ:
            </Text>
            <View
              style={{
                overflow: 'hidden',
                borderWidth: 1 * HEIGHT_SCALE,
                borderColor: Colors.borderGreen,
                borderRadius: 6 * HEIGHT_SCALE,
                height: 250 * HEIGHT_SCALE,
              }}>
              {isPermission &&
              reduxPosition?.latitude !== -1 &&
              reduxPosition?.longitude !== -1 ? (
                <View style={{ flex: 1 }}>
                  <View
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: -30 * WIDTH_SCALE,
                      marginLeft: -10 * WIDTH_SCALE,
                    }}>
                    <Image
                      source={IMAGE.marker}
                      resizeMode="contain"
                      style={{
                        height: 30 * WIDTH_SCALE,
                        width: 20 * WIDTH_SCALE,
                      }}
                    />
                  </View>
                  <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{
                      flex: 1,
                      ...StyleSheet.absoluteFillObject,
                      zIndex: -1,
                      // margin: 1,
                    }}
                    initialRegion={{
                      latitude: reduxPosition?.latitude,
                      longitude: reduxPosition?.longitude,
                      latitudeDelta: 0.002,
                      longitudeDelta: 0.002,
                    }}
                    showsUserLocation
                    showsMyLocationButton
                    onRegionChangeComplete={(event) => {
                      Spinner.show();
                      GetAddress(event);
                    }}
                  />
                </View>
              ) : (
                <TouchableOpacity
                  onPress={GetPosition}
                  style={{
                    flex: 1,
                    backgroundColor: Colors.colorGrayBackground,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{ color: 'black' }}>
                    Nhấn để chọn vị trí trên bản đồ
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ marginTop: 20 * HEIGHT_SCALE }}>
            <Text style={{ fontWeight: fonts.bold, left: 10 * WIDTH_SCALE }}>
              Thiết lập địa chỉ:
            </Text>
            <View
              style={{
                borderWidth: 1 * HEIGHT_SCALE,
                borderColor: Colors.borderGreen,
                borderRadius: 6 * HEIGHT_SCALE,
                overflow: 'hidden',
                padding: 10 * HEIGHT_SCALE,
              }}>
              {textLocation({
                title: 'Tỉnh/Thành Phố(*)',
                value: address.city,
                onPress: () => modalCity.current.show(),
              })}
              {textLocation({
                title: 'Quận/Huyện(*)',
                value: address?.district,
                onPress: () =>
                  address.city
                    ? modalDistrict.current.show()
                    : Message('Vui lòng chọn tỉnh'),
              })}
              {textLocation({
                title: 'Xã/Phường(*)',
                disableLine: true,
                value: address.ward,
                onPress: () =>
                  address?.city
                    ? modalWard.current.show()
                    : Message('Vui lòng chọn tỉnh'),
              })}
              <TextInput
                value={address.fullAddress}
                placeholder="Nhập địa chỉ sân chi tiết..."
                style={{
                  paddingHorizontal: 10 * WIDTH_SCALE,
                  borderWidth: 1 * HEIGHT_SCALE,
                  borderColor: Colors.colorGrayBackground,
                  borderRadius: 6 * HEIGHT_SCALE,
                }}
                multiline
              />
            </View>
          </View>
          <View style={{ marginTop: 20 * HEIGHT_SCALE }}>
            <Text style={{ fontWeight: fonts.bold, left: 10 * WIDTH_SCALE }}>
              Thông tin bổ sung:
            </Text>
            <View
              style={{
                borderWidth: 1 * HEIGHT_SCALE,
                borderColor: Colors.borderGreen,
                borderRadius: 6 * HEIGHT_SCALE,
                overflow: 'hidden',
                padding: 10 * HEIGHT_SCALE,
              }}></View>
          </View>
        </ScrollView>
      </View>
      <ModalComponent
        isHideAgree
        ref={modalCity}
        title="Chọn Tỉnh/Thành Phố"
        propagateSwipe={true}>
        <View style={{ height: HEIGHT * 0.8 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {vietnamData.map((data) => {
              return (
                <TouchableOpacity
                  key={data.code}
                  style={{
                    borderBottomWidth: 1 * WIDTH_SCALE,
                    borderBottomColor: Colors.colorGrayBackground,
                    paddingVertical: 10 * HEIGHT_SCALE,
                  }}
                  onPress={() => {
                    setAddress({
                      ...address,
                      data: data,
                      city: data.name_with_type,
                      district: Object.values(data?.quan_huyen)[0]
                        .name_with_type,
                      ward: Object.values(
                        Object.values(data?.quan_huyen)[0].xa_phuong,
                      )[0].name_with_type,
                      fullAddress: '',
                    });
                    modalCity.current.hide();
                  }}>
                  <Text>{data.name_with_type}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </ModalComponent>
      <ModalComponent
        isHideAgree
        ref={modalDistrict}
        title="Chọn Quận/Huyện"
        propagateSwipe={true}>
        <View style={{ height: HEIGHT * 0.8 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {address?.data?.quan_huyen &&
              Object.values(address?.data?.quan_huyen)
                .sort(function (a, b) {
                  return a.name.localeCompare(b.name);
                })
                .map((data) => {
                  return (
                    <TouchableOpacity
                      key={data.code}
                      style={{
                        borderBottomWidth: 1 * WIDTH_SCALE,
                        borderBottomColor: Colors.colorGrayBackground,
                        paddingVertical: 10 * HEIGHT_SCALE,
                      }}
                      onPress={() => {
                        setAddress({
                          ...address,
                          district: data.name_with_type,
                          ward: Object.values(data?.xa_phuong)[0]
                            .name_with_type,
                          fullAddress: '',
                        });
                        modalDistrict.current.hide();
                      }}>
                      <Text>{data.name_with_type}</Text>
                    </TouchableOpacity>
                  );
                })}
          </ScrollView>
        </View>
      </ModalComponent>
      <ModalComponent
        isHideAgree
        ref={modalWard}
        title="Chọn Xã/Phường"
        propagateSwipe={true}>
        <View style={{ height: HEIGHT * 0.8 }}>
          <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
            {address?.data?.quan_huyen &&
              address?.district &&
              Object.values(
                Object.values(address?.data?.quan_huyen).filter(
                  (a) => a?.name_with_type.indexOf(address?.district) !== -1,
                )[0]?.xa_phuong,
              ).map((data) => {
                return (
                  <TouchableOpacity
                    key={data.code}
                    style={{
                      borderBottomWidth: 1 * WIDTH_SCALE,
                      borderBottomColor: Colors.colorGrayBackground,
                      paddingVertical: 10 * HEIGHT_SCALE,
                    }}
                    onPress={() => {
                      setAddress({
                        ...address,
                        ward: data.name_with_type,
                        fullAddress: '',
                      });
                      modalWard.current.hide();
                    }}>
                    <Text>{data.name_with_type}</Text>
                  </TouchableOpacity>
                );
              })}
          </ScrollView>
        </View>
      </ModalComponent>
    </ImageBackground>
  );

  function textLocation({
    title,
    disableLine = false,
    value,
    onPress = () => {},
  }) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: disableLine ? null : 1 * HEIGHT_SCALE,
          borderBottomColor: Colors.colorGrayBackground,
          paddingVertical: 10 * HEIGHT_SCALE,
        }}>
        <Text style={{ flex: 1 }}>{title}</Text>
        <TouchableOpacity
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={onPress}>
          <Text>{value ? value : 'Nhấn để chọn'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
