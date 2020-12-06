import React, { useEffect, useState, useLayoutEffect, useRef } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import Container from '../../components/common/Container';
import Message from '../../components/Message';
import ModalComponent from '../../components/ModalComponent';
import StatusBarMain from '../../components/common/StatusBarMain';
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import imagesUtil from '../../utils/images.util';
import ImagePicker from 'react-native-image-picker';
import {REDUX} from '../../redux/store/types';
import API from '../../server/api';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../../utils/ScaleAdaptor';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ServicesScreen(props) {
    const ref = new useRef();
    const [source, setSource] = useState();
    const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );
  const dispatch = useDispatch();

    const [dataService, setDataService] = useState({
        nameService: '',
        priceService: '',
        imageService: '',
        stadiumId: dataStadiumRedux?.stadiumId,
        data: {},
    });

    console.log('idddddd' , dataStadiumRedux);
  const choosePhotoFromLibrary = async () => {
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
        console.log('abdc', response.uri);
      }
    });
  };
  console.log(
    '🚀 ~ file: ServicesScreen.js ~ line 75 ~ createService ~ source?.path',
    source?.path,
  );
  async function createService() {
    const formData = new FormData();
    formData.append('folder', 'service');
    formData.append('name', dataService.nameService);
    formData.append('price', dataService.priceService);
    formData.append('stadiumId', dataService.stadiumId);
    formData.append('files', {
      type: source?.type,
      size: source?.fileSize,
      uri: source?.uri,
      name: source?.fileName,
    });

    console.log(
      'dataaaaa',
      source?.type,
      source?.fileSize,
      source?.uri,
      source?.fileName,
    );

    API.post('/service/add', formData)
      .then(({ data }) => {
        console.log('apiUpdateStadium -> data', data);
        if(data.code === 200){
            API.get('/stadium/info')
                  .then(({ data }) => {
                    const obj = data?.data;
                    dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
                  })
                  .catch((onError) => {
                    console.log('Stadium -> onError', onError.message);
                    Message('Lỗi');
                  });
            ref.current.hide();
        }
        else{
            Message("Error");
        }
      })
      .catch((onError) => {
        console.log('apiUpdateStadium -> onError', onError);
        Message('Lỗi, vui lòng thử lại');
      });
  }

  

  return (
    <Container
      header={
        <StatusBarMain
          title="Sản phẩm và dịch vụ"
          arrowBack={true}
          contentBarStyles={{ justifyContent: 'space-between' }}
          navigation={props.navigation}
          headerHeight={ConfigStyle.statusBarHeight}
        />
      }
      headerHeight={ConfigStyle.statusBarHeight}>
      <View style={styles.container}> 
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.textServices}>Dịch vụ cơ bản</Text>
            <TouchableOpacity style={styles.addServiceButton} onPress={() => ref.current.show()}>
                <Icon name="plus" size={20} color={Colors.whiteColor} />
            </TouchableOpacity>
        </View>
        
      <FlatList 
      numColumns={2}
      columnWrapperStyle={{justifyContent:'space-between'}}
      data={dataStadiumRedux.service}
      renderItem={({item,index}) => {return (
        <ItemService ref={ref} item={item} />
      )}}
    />
      <ModalComponent 
      ref= {ref}
      title="Thêm dịch vụ"
       >
        <View>
            <Text style={styles.textUpon}>Tên dịch vụ</Text>
            <TextInput
              placeholder="Tên dịch vụ"
              onChangeText={(text) =>
                setDataService({ ...dataService, nameService: text })
              }
              value={dataService.nameService}
              placeholderTextColor="grey"
              style={styles.inputText}
            />
            <Text style={styles.textUpon}>Giá tiền</Text>
            <TextInput
              placeholder="Giá tiền"
              onChangeText={(text) =>
                setDataService({ ...dataService, priceService: text })
              }
              value={dataService.priceService}
              placeholderTextColor="grey"
              style={styles.inputText}
            />
          </View>
          <View style={styles.chooserContainer}>
            <Icon name="camera" size={25} color={Colors.greyShadow} />
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={choosePhotoFromLibrary}>
              <Text style={styles.textUpon}>Chọn ảnh từ thư viện</Text>
              <Image
                resizeMode="contain"
                source={{ uri: source?.uri }}
                style={{ width: 100, height: 100 }}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.touchUpload} onPress={createService}>
            <Text style={styles.textAdd}>Thêm mới</Text>
          </TouchableOpacity>
      </ModalComponent>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  textServices: {
    fontSize: 18,
    fontFamily: 'Times-Bold',
  },
  addServiceButton: {
    backgroundColor: Colors.colorGreen,
    width: width * 0.1,
    height: height * 0.03,
    borderRadius: width * 0.13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    marginTop: 15,
    marginRight:10,
    width: width * 0.4 * WIDTH_SCALE,
    height: height * 0.17 * HEIGHT_SCALE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.greyShadow,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    backgroundColor: Colors.whiteColor,
    shadowRadius: 3,
    borderTopRightRadius:10,
    borderTopLeftRadius:7,
    borderBottomRightRadius:7,
    borderBottomLeftRadius:7
  },
  img: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: width * 0.15,
  },
  imgDelete: {
    width: width * 0.15,
    height: height * 0.07,
    borderRadius: width * 0.15,
    marginVertical:10 * HEIGHT_SCALE
  },
  textName: {
    marginVertical: 5,
    fontFamily: 'Times',
    fontSize: height * 0.02,
  },
  textType: {
    fontFamily: 'Times',
    fontSize: height * 0.02,
    color: Colors.colorOrange,
  },
  titleModal: {
    alignItems: 'center',
    backgroundColor: Colors.colorGreen,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  textNameService: {
    fontSize: 20,
    fontFamily: 'Times-Bold',
    color: Colors.whiteColor,
  },
  textUpon: {
    fontSize: 18,
    fontFamily: 'Times',
  },
  textModel: {
    fontSize: 18,
    fontFamily: 'Times',
    marginVertical: 10 * HEIGHT_SCALE,
    marginHorizontal: 10 * WIDTH_SCALE,
  },
  textModelBelow: {
    fontSize: 18,
    fontFamily: 'Times',
    marginHorizontal: 10 * WIDTH_SCALE,
  },
  inputText: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginVertical: 10,
    fontSize: 18,
    fontFamily: 'Times',
  },
  chooserContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
  },
  touchUpload: {
    backgroundColor: Colors.colorOrange,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:60* WIDTH_SCALE,
    paddingVertical: 10*HEIGHT_SCALE,
    borderRadius: 10,
  },
  textAdd: {
    fontSize: 18,
    fontFamily: 'Times',
    color: Colors.whiteColor,
  },
});

function ItemService(props) {

    const ref = new useRef();
    const [source, setSource] = useState();
    const dataStadiumRedux = useSelector(
    (state) => state?.userReducer?.listStadium,
  );

    console.log(props.item.name);

    const dispatch = useDispatch();

    async function deleteServices(){
        API.delete(`/service/delete/${props.item.serviceId}`)
      .then(({ data }) => {
        console.log('apiUpdateStadium -> data', data);
        if(data.code === 200){
            API.get('/stadium/info')
                  .then(({ data }) => {
                    const obj = data?.data;
                    dispatch({ type: REDUX.UPDATE_STADIUM, payload: obj });
                  })
                  .catch((onError) => {
                    console.log('Stadium -> onError', onError.message);
                    Message('Lỗi');
                  });
        }
        else{
            Message("Error");
        }
      })
      .catch((onError) => {
        console.log('apiUpdateStadium -> onError', onError);
        Message('Lỗi, vui lòng thử lại');
      });
    }

    return(
        <View style={styles.itemContainer} key={props.item.serviceId}>
            <TouchableOpacity style={{
                backgroundColor:Colors.colorRed, 
                borderRadius:20, width:25 * WIDTH_SCALE, 
                height:20 * HEIGHT_SCALE, 
                alignItems: 'center',
                justifyContent:'center', 
                position:'absolute',
                top:0,
                right:0,
                }}
                // onPress={deleteServices}
                onPress={() => ref.current.show()}
                >
                <Text style={{color:Colors.whiteColor}}>X</Text>
            </TouchableOpacity>
            <Image resizeMode="contain" source={{uri: props.item.image}} style={styles.img} />
            <Text style={styles.textName}>{props.item.name}</Text>
            <Text style={styles.textType}>{props.item.price}</Text>

            <ModalComponent 
              ref= {ref}
              title="Xác nhận xoá dịch vụ"
            >
        <View>
            <Text style={styles.textUpon}>Bạn có muốn xoá sản phẩm?</Text>
            <View style={{flexDirection: 'row'}}>
              <Image resizeMode="contain" source={{uri: props.item.image}} style={styles.imgDelete} />
              <View>
                <Text style={styles.textModel}>{props.item.name}</Text>
                <Text style={styles.textModelBelow}>{props.item.price}đ</Text>
              </View>
            </View>
          </View>
          <TouchableOpacity 
          style={styles.touchUpload}
          onPress={deleteServices}
          >
            <Text style={styles.textAdd}>Xác nhận</Text>
          </TouchableOpacity>
      </ModalComponent>
        </View>
    )
}

