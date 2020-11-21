import React, {useEffect,useState, useLayoutEffect} from 'react'
import {
    View, 
    Text, 
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native'
import Container from '../../components/common/Container'
import { Modal} from 'react-native-paper';
import StatusBarMain from '../../components/common/StatusBarMain'
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';
import Icon from 'react-native-vector-icons/AntDesign';
import imagesUtil from '../../utils/images.util';
import ImagePicker from 'react-native-image-crop-picker';
import API from '../../server/api';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ServicesScreen(props) {
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = {backgroundColor: 'white', marginHorizontal:50,borderRadius:10};

    const [dataService, setDataService] = useState({
        nameService:'',
        priceService:'',
        imageService:'',
    });

    const choosePhotoFromLibrary = async() => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
          }).then(response => {
            console.log(response);
          }); 
    }
    useEffect(() => {
        async function createService(){
            API.post('/service/add',{
                name: dataService.nameService,
                price: dataService.priceService,
                image: dataService.imageService,
            })
        }

        async function apiCreateService(){
            const formData = new FormData();
            formData.append('folder','service');
            formData.append('name','nameService');
            formData.append('price','priceService');
            formData.append('image','imageService');
            formData.append('files', {
                type: source?.type,
                size: source?.fileSize,
                uri: `file://${source?.path}`,
                name: source?.fileName,
              });
        }
    },[]);

    return (
        <Container
        header={
            <StatusBarMain
                title="Sản phẩm và dịch vụ"
                arrowBack={true}
                contentBarStyles={{justifyContent:'space-between'}}
                navigation={props.navigation}
                headerHeight={ConfigStyle.statusBarHeight}
            />
        }
        headerHeight={ConfigStyle.statusBarHeight}
        >
            <View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={styles.textServices}>Dịch vụ cơ bản</Text>
                    <TouchableOpacity 
                    style={styles.addServiceButton}
                    onPress={showModal}
                    >
                        <Icon name="plus" size={20} color={Colors.whiteColor} />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                    <Image source={imagesUtil.avatar} style={styles.img}/>
                    <Text style={styles.textName}>Trà đá</Text>
                    <Text style={styles.textType}>Miễn phí</Text>
                </View>
            </View>
            <Modal
                visible={visible} 
                onDismiss={hideModal} 
                contentContainerStyle={containerStyle}
            >
                    <View>
                        <View style={styles.titleModal}>
                            <Text style={styles.textNameService}>Thêm dịch vụ</Text>
                        </View>
                        <View style={{padding:20}}>
                            <Text style={styles.textUpon}>Tên dịch vụ</Text>
                            <TextInput
                                placeholder="Tên dịch vụ"
                                onChangeText={text => onChangeText(text)}
                                value={props.nameService}
                                placeholderTextColor="grey"
                                style={styles.inputText}
                            />
                            <Text style={styles.textUpon}>Giá tiền</Text>
                            <TextInput
                                placeholder="Giá tiền"
                                onChangeText={text => onChangeText(text)}
                                value={props.priceService}
                                placeholderTextColor="grey"
                                style={styles.inputText}/>
                        </View>
                        <View style={styles.chooserContainer}>
                            <Icon name="camera" size={25} color={Colors.greyShadow} />
                            <TouchableOpacity 
                            style={{marginLeft:10}} 
                            onPress={choosePhotoFromLibrary}
                            >
                                <Text style={styles.textUpon}>Chọn ảnh từ thư viện</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.touchUpload}>
                            <Text style={styles.textAdd}>Thêm mới</Text>
                        </TouchableOpacity>
                    </View>
            </Modal>
        </Container>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal:18,
        paddingVertical:10,
        height:height*0.9,//height is scrollview   
    },
    textServices: {
        fontSize:18,
        fontFamily:'Times-Bold',
    }, 
    addServiceButton: {
        backgroundColor:Colors.colorGreen,
        width:width*0.1,
        height:height*0.03,
        borderRadius:width*0.13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer: {
        marginTop:15,
        width:width*0.4,
        height:height*0.17,
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
        borderRadius:7,
    },
    img:{
        width: width*0.15,
        height: height*0.07,
        borderRadius: width*0.15,
    },
    textName:{
        marginVertical:5,
        fontFamily:"Times",
        fontSize:height*0.02,
    },
    textType:{
        fontFamily:"Times",
        fontSize:height*0.02,
        color: Colors.colorOrange,
    },
    titleModal:{
        alignItems: 'center',
        backgroundColor:Colors.colorGreen,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        paddingVertical:10
    },
    textNameService:{
        fontSize:20, 
        fontFamily:'Times-Bold', 
        color:Colors.whiteColor
    },
    textUpon:{
        fontSize:18, 
        fontFamily:'Times'
    },
    inputText:{
        borderWidth:1,
        borderRadius:5,
        paddingVertical:10,
        paddingHorizontal:5,
        marginVertical:10,
        fontSize:18, 
        fontFamily:'Times',
    },
    chooserContainer: {
        flexDirection: 'row', 
        paddingHorizontal:20,
        marginBottom:10,
        alignItems: 'center'
    },
    touchUpload:{
        backgroundColor:Colors.colorOrange,
        paddingHorizontal:40,
        paddingVertical:10,
        marginHorizontal:80,
        borderRadius:10,
        marginVertical:15,
        alignItems: 'center',
        justifyContent:'center'
    },
    textAdd:{
        fontSize:18, 
        fontFamily:'Times', 
        color:Colors.whiteColor
    },
})

