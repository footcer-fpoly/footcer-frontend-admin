import React from 'react'
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';

export default function ItemNotification(props) {

    const data = {
        typeRequest:'Yêu cầu đặt sân bóng',
        userName:'Huỳnh Bình',
        content:'đã yêu cầu đặt sân bóng',
        time:'10 phút trước',
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.touchNotification}>
                <Text style={styles.textTitle}>{data.typeRequest}</Text>
                <Text style={styles.textContent}>{data.userName}
                    <Text style={styles.textinside}> {data.content}</Text>
                </Text>
                <Text style={styles.textTime}>{data.time}</Text>
        </TouchableOpacity>
        </View>
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
    textTitle:{
        color:Colors.textGreen, 
        fontSize:ConfigStyle.font18, 
        fontFamily:'Times-Bold'
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
    }
})
