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
import ImagePicker from 'react-native-image-picker';
import { convertStrings } from '../utils/convertStrings';
import AutoHeightImage from 'react-native-auto-height-image';
import { SkypeIndicator } from 'react-native-indicators';
import TextInputCustom from '../components/TextInputCustom';

export default function UpdateStadium({ route, navigation }) {
  const isCheckStadium = route?.params?.isCheckStadium;
  const item = route?.params?.item;
  const KEY_API = 'AIzaSyAmh-Tqfy35GzzQlGED6HLigQtXN4dMi7Q';
  const [address, setAddress] = useState({
    city: '',
    district: '',
    ward: '',
    address: '',
    fullAddress: '',
    latitude: '',
    longitude: '',
    data: {},
  });
  const [source, setSource] = useState();
  const [nameStadium, setNameStadium] = useState();
  const modalCity = useRef();
  const modalWard = useRef();
  const modalDistrict = useRef();
  const [isPermission, setIsPermission] = useState(false);
  const dispatch = useDispatch();
  const reduxPosition = useSelector(
    (state) => state?.userReducer?.listPosition,
  );
  const selectFile = async () => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        console.log(response.customButton);
      } else {
        setSource(response);
      }
    });
  };
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
    reduxPosition?.lat !== -1 && reduxPosition?.lng !== -1 && Spinner.show();
    Geolocation.getCurrentPosition(
      (position) => {
        const newPosition = {
          lat: position?.coords?.latitude,
          lng: position?.coords?.longitude,
        };
        dispatch({ type: REDUX.UPDATE_POSITION, payload: newPosition });
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
          const dataAddress = vietnam.data?.filter(
            (a) =>
              convertStrings(a?.name)
                ?.toLowerCase()
                ?.trim()
                .indexOf(
                  convertStrings(splitAddress[splitAddress?.length - 2])
                    ?.toLowerCase()
                    ?.trim(),
                ) !== -1,
          );
          dispatch({
            type: REDUX.UPDATE_POSITION,
            payload: data.results[0]?.geometry?.location,
          });

          setAddress({
            ...address,
            data: Object.values(dataAddress),
            city: dataAddress[0].name,
            district: splitAddress[splitAddress?.length - 3],
            ward: splitAddress[splitAddress?.length - 4],
            fullAddress: splitAddress
              .splice(0, splitAddress?.length - 1)
              .toString(),
          });
        })
        .catch((onError) => {
          Message('Lỗi lấy vị trí vui lòng thử lại');
          console.log('SignIn -> onError', onError);
        });
    } catch (error) {
      console.log('GetLocation -> error', error);
      Spinner.hide();
    }
  };
  const getCollage = () => {
    API.get('/stadium/info')
      .then(({ data }) => {
        const obj = data?.data;
        dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
      })
      .catch((onError) => {
        console.log('Stadium -> onError', onError.message);
        Message('Lỗi');
      });
  };
  const apiUpdateStadium = async () => {
    Spinner.show();
    const formData = new FormData();
    item
      ? item?.address !== address.fullAddress &&
        formData.append('address', address.fullAddress)
      : formData.append('address', address.fullAddress);
    item
      ? item?.city !== address.city && formData.append('city', address.city)
      : formData.append('city', address.city);
    item
      ? item?.stadiumName !== nameStadium &&
        formData.append('stadiumName', nameStadium)
      : formData.append('stadiumName', nameStadium);
    item
      ? item?.district !== address.district &&
        formData.append('district', address.district)
      : formData.append('district', address.district);
    item
      ? item?.ward !== address.ward && formData.append('ward', address.ward)
      : formData.append('ward', address.ward);
    item
      ? item?.image !== source?.uri &&
        formData.append('files', {
          type: source?.type,
          size: source?.fileSize,
          uri: `file://${source?.path}`,
          name: source?.fileName,
        })
      : formData.append('files', {
          type: source?.type,
          size: source?.fileSize,
          uri: `file://${source?.path}`,
          name: source?.fileName,
        });
    formData.append('folder', 'stadium');
    formData.append('latitude', reduxPosition?.lat);
    formData.append('longitude', reduxPosition?.lng);
    console.log('UpdateStadium -> formData', formData);

    if (
      nameStadium &&
      address?.fullAddress &&
      address?.ward &&
      address?.district &&
      address?.city &&
      source &&
      reduxPosition?.lat &&
      reduxPosition?.lng
    ) {
      await API.put('/stadium/update', formData)
        .then(({ data }) => {
          if (data.code === 200) {
            getCollage();
            isCheckStadium ? navigation.replace('Home') : navigation.goBack();
            Message('Cập nhật thành công!');
          } else Message('Lỗi, vui lòng thử lại');
          Spinner.hide();
        })
        .catch((onError) => {
          console.log('apiUpdateStadium -> onError', onError.message);
          Message('Lỗi, vui lòng thử lại');
          Spinner.hide();
        });
    } else {
      Message('Vui lòng nhập đầy đủ thông tin!');
      Spinner.hide();
    }
  };
  console.log('UpdateStadium -> item?.image', item?.image, address.image);

  const setDefault = () => {
    const dataAddress = vietnam.data?.filter(
      (a) =>
        convertStrings(a?.name)
          ?.toLowerCase()
          ?.trim()
          .indexOf(convertStrings(item?.city)?.toLowerCase()?.trim()) !== -1,
    );
    item &&
      setAddress({
        ...address,
        fullAddress: item?.address,
        city: item?.city,
        district: item?.district,
        ward: item?.ward,
        data: Object.values(dataAddress),
      });
    item && setNameStadium(item?.stadiumName);
    item && setSource({ uri: item?.image });
  };
  useEffect(() => {
    item && setDefault();
  }, []);
  return (
    <ImageBackground
      source={IMAGE.background}
      style={{ width: WIDTH, height: HEIGHT, flex: 1 }}>
      <Header
        hideBack
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
        right={
          <TouchableOpacity onPress={() => navigation.replace('Home')}>
            <Text
              style={{
                fontSize: fonts.font14,
                color: Colors.whiteColor,
              }}>
              Bỏ qua
            </Text>
          </TouchableOpacity>
        }
      />
      <ScrollView>
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.whiteColor,
          }}>
          <ScrollView
            style={{
              padding: 10 * WIDTH_SCALE,
            }}
            showsVerticalScrollIndicator={true}>
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
                reduxPosition?.lat !== -1 &&
                reduxPosition?.lng !== -1 ? (
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
                        margin: 1,
                      }}
                      initialRegion={{
                        latitude: reduxPosition?.lat || 0,
                        longitude: reduxPosition?.lng || 0,
                        latitudeDelta: 0.002,
                        longitudeDelta: 0.002,
                      }}
                      showsUserLocation
                      showsMyLocationButton
                      onRegionChangeComplete={(event) => {
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
                <TextInputCustom
                  style={{
                    fontSize: fonts.font16,
                    width: '100%',
                  }}
                  value={address.fullAddress}
                  // textError={isError.text}
                  // validate={isError.value}
                  label="Nhập địa chỉ sân chi tiết(*)"
                  onChangeText={(text) =>
                    setAddress({ ...address, fullAddress: text })
                  }
                  returnKeyType="done"
                />
              </View>
            </View>
            <View style={{ marginVertical: 20 * HEIGHT_SCALE }}>
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
                }}>
                <TextInputCustom
                  style={{
                    fontSize: fonts.font16,
                    width: '100%',
                  }}
                  value={nameStadium}
                  // textError={isError.text}
                  // validate={isError.value}
                  label="Nhập tên cụm sân(*)"
                  onChangeText={setNameStadium}
                  returnKeyType="done"
                />
                <Text style={{ flex: 1 }}>Chọn ảnh sân(*):</Text>
                <TouchableOpacity
                  onPress={selectFile}
                  style={{
                    flex: 1,
                    backgroundColor: Colors.colorGrayBackground,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 5 * HEIGHT_SCALE,
                    borderRadius: 6 * HEIGHT_SCALE,
                  }}>
                  {source ? (
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        minHeight: 60 * WIDTH_SCALE,
                      }}>
                      <SkypeIndicator
                        style={{ alignSelf: 'center', position: 'absolute' }}
                        color={Colors.borderGreen}
                        size={50 * WIDTH_SCALE}
                      />
                      <AutoHeightImage
                        width={0.9 * WIDTH}
                        source={{ uri: source?.uri }}
                        style={{ borderRadius: 6 * HEIGHT_SCALE }}
                      />
                    </View>
                  ) : (
                    <Text
                      style={{
                        paddingVertical: 25 * HEIGHT_SCALE,
                      }}>
                      Nhấn để chọn ảnh
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={apiUpdateStadium}
              style={{
                alignItems: 'center',
                backgroundColor: Colors.colorGreen,
                // marginHorizontal: 20 * WIDTH_SCALE,
                borderRadius: 14 * HEIGHT_SCALE,
                width: WIDTH,
                alignSelf: 'center',
                marginBottom: 20 * HEIGHT_SCALE,
              }}>
              <Text
                style={{
                  paddingVertical: 14 * HEIGHT_SCALE,
                  color: 'white',
                  fontSize: fonts.font16,
                  fontWeight: fonts.bold,
                }}>
                Cập Nhật Sân
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <ModalComponent
          isHideAgree
          ref={modalCity}
          title="Chọn Tỉnh/Thành Phố"
          propagateSwipe={true}>
          <View style={{ height: HEIGHT * 0.8 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}>
              {vietnam.data
                .sort(function (a, b) {
                  return a.name.localeCompare(b.name);
                })
                .map((data) => {
                  return (
                    <TouchableOpacity
                      key={data.level1_id}
                      style={{
                        borderBottomWidth: 1 * WIDTH_SCALE,
                        borderBottomColor: Colors.colorGrayBackground,
                        paddingVertical: 10 * HEIGHT_SCALE,
                      }}
                      onPress={() => {
                        setAddress({
                          ...address,
                          data: [data],
                          city: data.name,
                          district: Object?.values(data?.level2s)[0].name,
                          ward: Object?.values(
                            Object?.values(data?.level2s)[0].level3s,
                          )[0].name,
                          fullAddress: '',
                        });
                        modalCity.current.hide();
                      }}>
                      <Text>{data.name}</Text>
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}>
              {address?.data[0]?.level2s &&
                address?.data[0]?.level2s
                  .sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                  })
                  .map((data) => {
                    return (
                      <TouchableOpacity
                        key={data.level2_id}
                        style={{
                          borderBottomWidth: 1 * WIDTH_SCALE,
                          borderBottomColor: Colors.colorGrayBackground,
                          paddingVertical: 10 * HEIGHT_SCALE,
                        }}
                        onPress={() => {
                          setAddress({
                            ...address,
                            district: data.name,
                            ward: Object?.values(data?.level3s)[0].name,
                            fullAddress: '',
                          });
                          modalDistrict.current.hide();
                        }}>
                        <Text>{data.name}</Text>
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ flex: 1 }}>
              {address?.data[0]?.level2s &&
                address?.data[0]?.level2s
                  ?.filter(
                    (a) =>
                      a?.name
                        ?.trim()
                        ?.toLowerCase()
                        ?.indexOf(address?.district?.trim()?.toLowerCase()) !==
                      -1,
                  )[0]
                  ?.level3s.sort(function (a, b) {
                    return a.name.localeCompare(b.name);
                  })
                  .map((data) => {
                    return (
                      <TouchableOpacity
                        key={data.level3_id}
                        style={{
                          borderBottomWidth: 1 * WIDTH_SCALE,
                          borderBottomColor: Colors.colorGrayBackground,
                          paddingVertical: 10 * HEIGHT_SCALE,
                        }}
                        onPress={() => {
                          setAddress({
                            ...address,
                            ward: data.name,
                            fullAddress: '',
                          });
                          modalWard.current.hide();
                        }}>
                        <Text>{data.name}</Text>
                      </TouchableOpacity>
                    );
                  })}
            </ScrollView>
          </View>
        </ModalComponent>
      </ScrollView>
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
