import React from 'react';
import { 
    View, 
    Text, 
    Image, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet
} from 'react-native';
import Colors from '../../theme/Colors';
import Feather from 'react-native-vector-icons/Feather';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function User(props) {
    return (
        <View style={styles.container}>
            <View style={styles.childContainer}>
                <Image 
                source={require('../../assets/images/avatar.jpg')} 
                style={styles.imgStyle}
                resizeMode="cover"
                />
                <View style={{justifyContent:'center'}}>
                    <Text style={{fontSize:width*0.045,fontFamily:'Times'}}>Huỳnh Bình</Text>
                    <Text style={{fontSize:width*0.038,fontFamily:'Times',color:Colors.colorGreen}}>09643983123</Text>
                    <Text style={{fontSize:width*0.038,fontFamily:'Times',color:Colors.colorGrayText}}>binhhxps09323@fpt.edu.vn</Text>
                </View>
                <TouchableOpacity style={{backgroundColor:Colors.colorOrange,paddingHorizontal:10,paddingVertical:5,borderRadius:10,alignItems: 'center',justifyContent:'center'}}>
                    <Text style={{color:Colors.whiteColor,fontSize:width*0.03,fontFamily:'Times',justifyContent:'center',alignItems: 'center'}}>Đăng xuất</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.account}>TÀI KHOẢN</Text>
            <View style={{marginVertical:22}}>
                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Feather name="user" size={25} color="#15C0FF"/>
                        <Text style={{marginLeft:32}}>Chỉnh sửa tài khoản</Text>
                    </View>
                    <Feather name="chevron-right" size={25} color="grey"/>
                </View>
            </View>
            <View>
                <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Feather name="list" size={25} color="#15C0FF"/>
                        <Text style={{marginLeft:32}}>Lịch sử đặt sân</Text>
                    </View>
                    <Feather name="chevron-right" size={25} color="grey"/>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingVertical:10,
        paddingHorizontal:18,
    },
    childContainer: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        alignItems:'center'
    },
    imgStyle: {
        width:width*0.22,
        height:height*0.1, 
        borderRadius:width*0.22/2
    },
    account: {
        fontFamily:'Times',
        marginTop:40,
        color:Colors.colorOrange,
        fontSize:width*0.045
    }
})
