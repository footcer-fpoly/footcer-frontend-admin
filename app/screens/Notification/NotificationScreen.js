import React, {useState} from 'react'
import { 
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  Text,
 } from 'react-native'
import Container from '../../components/common/Container';
import StatusBarMain from '../../components/common/StatusBarMain';
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle'
import Swipeable from 'react-native-swipeable';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Modal from 'react-native-modal';



export default function NotificationScreen(props) {
  const data = [
    {
        id:0,
        typeRequest:'Yêu cầu đặt sân bóng',
        nameStadium:'Sân bóng Chảo Lửa',
        userName:'Huỳnh Bình',
        content:'đã yêu cầu đặt sân bóng',
        time:'10 phút trước',
        typeStadium:'Sân 5',
        status: true, 
    },
    {
        id:1,
        typeRequest:'Yêu cầu huỷ đặt sân bóng',
        nameStadium:'Sân bóng Chảo Lửa',
        userName:'Huỳnh Bình',
        content:'đã yêu cầu huỷ đặt sân bóng',
        time:'10 phút trước',
        typeStadium:'Sân 5',
        status: false, 
    },
    {
        id:2,
        typeRequest:'Yêu cầu đặt sân bóng',
        nameStadium:'Sân bóng Chảo Lửa',
        userName:'Huỳnh Bình',
        content:'đã yêu cầu đặt sân bóng',
        time:'10 phút trước',
        typeStadium:'Sân 5',
        status: true, 
    },
    {
        id:3,
        typeRequest:'Yêu cầu huỷ đặt sân bóng',
        nameStadium:'Sân bóng Chảo Lửa',
        userName:'Huỳnh Bình',
        content:'đã yêu cầu huỷ đặt sân bóng',
        time:'10 phút trước',
        typeStadium:'Sân 5',
        status: false, 
    },
]
  const {navigation} = props;
  const [isModalVisible, setisModalVisible] = useState(false);

  const rightButtons = [
    <TouchableOpacity style={styles.rightButton}>
      <Text style={styles.textButton}>XÓA</Text>
    </TouchableOpacity>,
  ];

  const [newData, setNewData] = React.useState({});
  const toggleModal = (data) => {
    setNewData(data);
    setisModalVisible(!isModalVisible);
  };

  const renderItem = ({item}) => {
    return (
      <Swipeable rightButtons={rightButtons} rightButtonWidth={100}>
        <Modal
          isVisible={isModalVisible}
          backdropOpacity={0.2}
          onBackdropPress={toggleModal}
        >
          <View style={styles.cardModal}>
          <Text style={newData.status ? styles.request : styles.cancel}>{newData.typeRequest}</Text>
            <Text style={styles.textContent}>{newData.userName}
              <Text style={styles.textinside}> {newData.content}</Text>
            </Text>
            <View style={styles.locationStyle}>
            <Text style={styles.textLocation}>Loại sân: </Text>
              <Text style={styles.textLocation}>{newData.typeStadium}</Text>
            </View>
            <Text style={styles.textTime}>{newData.time}</Text>
            <View style={styles.viewButton}>
              <TouchableOpacity style={{backgroundColor:Colors.colorRed, paddingVertical:10,paddingHorizontal:55, borderRadius:10}}>
                <Text style={styles.textButtonModal}>Từ chối</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:Colors.colorGreen, paddingVertical:10,paddingHorizontal:55, borderRadius:10}}>
                <Text style={styles.textButtonModal}>Đồng ý</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.container}>
          <TouchableOpacity 
          style={styles.touchNotification} 
          onPress={() => {
              toggleModal(item);
            }}>
            <Text style={item.status ? styles.request : styles.cancel}>{item.typeRequest}</Text>
            <Text style={styles.textContent}>{item.userName}
                <Text style={styles.textinside}> {item.content}</Text>
            </Text>
            <Text style={styles.textTime}>{item.time}</Text>
          </TouchableOpacity>
        </View>
      </Swipeable>
    );
  };


  return (
    <Container
      header={
        <StatusBarMain
        title="Thông báo"
        contentBarStyles={{justifyContent:'space-between'}}
        navigation={props.navigation}
        headerHeight={ConfigStyle.statusBarHeight}
        />
      }
      headerHeight={ConfigStyle.statusBarHeight}
      >
      <View style={{flex:1}}>
        <FlatList
          data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
      </View>
      </Container>
  )
}

const styles = StyleSheet.create({
  container: {
      paddingHorizontal:10, 
      marginTop:10
  },
  touchNotification:{
      backgroundColor:Colors.whiteColor, 
      padding:15,
      borderRadius:7
  },
  textLocation: {
    fontSize:ConfigStyle.font14, 
    fontFamily:'Times'
  },
  textContent:{
      color:Colors.touchSale, 
      fontSize:ConfigStyle.font16, 
      fontFamily:'Times', 
      paddingVertical:5
  },
  textinside:{
      color:Colors.blackColor, 
      fontSize:16, 
      fontFamily:'Times'
  },
  textTime:{
      color:Colors.colorGrayText,
      fontSize:ConfigStyle.font14, 
      fontFamily:'Times'
  },
  viewButton:{
    flexDirection:'row',
    justifyContent:'space-between', 
    marginTop:30
  },
  locationStyle:{
    flexDirection:'row', 
    alignItems:'center', 
    marginBottom:10
  },
  textButton: {
    color: Colors.whiteColor,
    textAlign: 'center',
  },
  rightButton: {
    backgroundColor: Colors.colorRed,
    width: 90,
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flex: 1,
  },
  textButtonModal:{
    fontSize:ConfigStyle.font16,
    fontFamily:'Times-Bold',
    color:Colors.whiteColor
  },
  cardModal: {
    borderRadius: 10,
    paddingVertical: 15,
    elevation: 10,
    backgroundColor: Colors.whiteColor,
    shadowOffset: {width: 3, height: 3},
    textShadowColor: Colors.black4,
    shadowOpacity: 0.5,
    textShadowRadius: 0.5,
    marginTop: 1,
    paddingHorizontal: 17,
    marginBottom: 15,
  },
  request: {
    fontSize:ConfigStyle.font18,
    fontFamily:'Times-Bold',
    color: Colors.colorGreen,
  },
  requestModal: {
    fontSize:ConfigStyle.font18,
    fontFamily:'Times-Bold',
    color:Colors.blackColor
  },
  cancel: {
    fontSize:ConfigStyle.font18,
    fontFamily:'Times-Bold',
    alignSelf: 'flex-start',
    color: Colors.colorRed,
  },

})
