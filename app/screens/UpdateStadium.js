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

export default function UpdateStadium({ route, navigation }) {
  const [location, setLocation] = useState({
    latitude: -1,
    longitude: -1,
    latitudeDelta: 0.002,
    longitudeDelta: 0.002,
  });
  const KEY_API = 'AIzaSyAmh-Tqfy35GzzQlGED6HLigQtXN4dMi7Q';
  const [address, setAddress] = useState({
    fullAddress: '',
    address: '',
    ward: '',
    district: '',
    city: '',
  });
  const [isPermission, setIsPermission] = useState(false);
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn('err', err);
    }
  };
  const GetPosition = async () => {
    await requestLocationPermission();
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          ...location,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        console.log('code:', error.code, 'message:', error.message);
      },
    );
  };
  const GetAddress = async (latitude, longitude) => {
    try {
      await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KEY_API}`,
        )
        .then(({ data }) => {
          const dataAddress = data?.results[0]?.formatted_address;
          const splitAddress = dataAddress?.split(',');
          const fullAddress = `${splitAddress[0]}, ${splitAddress[1]}, ${splitAddress[2]}, ${splitAddress[3]}`;
          setAddress({
            ...address,
            fullAddress: fullAddress,
            address: splitAddress[0],
            ward: splitAddress[1],
            district: splitAddress[2],
            city: splitAddress[3],
          });
          Spinner.hide();
        })
        .catch((onError) => {
          console.log('SignIn -> onError', onError);
          Spinner.hide();
        });
    } catch (error) {
      console.log('GetLocation -> error', error);
      Spinner.hide();
    }
  };
  useEffect(() => {
    GetPosition();
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
                region={location}
                showsUserLocation
                showsMyLocationButton
                onRegionChangeComplete={(event) => {
                  Spinner.show();
                  GetAddress(event.latitude, event.longitude);
                  setLocation({
                    ...location,
                    ...event,
                  });
                }}
              />
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
              })}
              {textLocation({
                title: 'Quận/Huyện(*)',
                value: address?.district,
              })}
              {textLocation({
                title: 'Xã/Phường(*)',
                disableLine: true,
                value: address.ward,
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
        </ScrollView>
      </View>
    </ImageBackground>
  );

  function textLocation({ title, disableLine = false, value }) {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderBottomWidth: disableLine ? null : 1 * HEIGHT_SCALE,
          borderBottomColor: Colors.colorGrayBackground,
          paddingVertical: 10 * HEIGHT_SCALE,
        }}>
        <Text>{title}</Text>
        <Text>{value}</Text>
      </TouchableOpacity>
    );
  }
}
