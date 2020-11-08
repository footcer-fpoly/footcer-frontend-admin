import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native'
import Colors from '../../theme/Colors'
import ConfigStyle from '../../theme/ConfigStyle'

const width = Dimensions.get('window').width
export default function ItemStadium(props) {

    const data = {
        deal:'-40%',
        typeStadium: 'Sân 5',
        nameStadium:'Sân bóng đá Chảo Lửa',
        address:'30 Phan Thúc Duyện, Tân Bình'
    }

    return (
        <View style={styles.container}>
            <View>
                <Image
                source={require('../../assets/images/stadium.jpg')}
                style={{
                  width:width*0.44, height:130,
                  borderTopLeftRadius:7,
                  borderTopRightRadius:7,
                  resizeMode:'cover'
                }}
                />
                <TouchableOpacity style={styles.touchSale}>
                    <Text style={styles.textSale}>{data.deal}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.textInfor}>
                <Text style={styles.typeOfStadium}>{data.typeStadium}</Text>
                <Text style={styles.nameOfStadium}>{data.nameStadium}</Text>
                <Text style={styles.addressOfStadium}>{data.address}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:Colors.whiteColor,
        width:width*0.44,
        borderRadius:7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        paddingBottom:15,
        marginBottom:16,
    },
    touchSale:{
        backgroundColor:Colors.touchSale,
        borderTopRightRadius:7,
        position:'absolute',
        bottom:0,
        left:0,
        paddingHorizontal:10,
        paddingVertical:3,
    },
    textSale: {
        color:Colors.whiteColor,
        fontSize:ConfigStyle.font12,
        fontFamily:'Times'
    },
    textInfor: {
        marginTop:7,
        marginLeft:8,
    },
    typeOfStadium:{
        fontSize:ConfigStyle.font12,
        fontFamily:'Times',
        color:Colors.colorGrayText
    },
    nameOfStadium:{
        fontSize:ConfigStyle.font14,
        fontFamily:'Times-Bold',
        color:Colors.blackColor,
    },
    addressOfStadium:{
        fontSize:ConfigStyle.font12,
        fontFamily:'Times',
        color:Colors.colorGrayText,
    }
})
