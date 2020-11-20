import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../theme/Colors';
import ConfigStyle from '../../theme/ConfigStyle';
import ImageUtils from '../../utils/images.util';

export default function ItemServices(props) {
    return (
        <View style={styles.itemContainer}>
            <Image source={ImageUtils.avatar} style={styles.img}/>
            <Text style={styles.textName}>{props.nameService}</Text>
            <Text style={styles.textType}>{props.typeService}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    img:{
        width: width*0.15,
        height: height*0.07,
        borderRadius: width*0.15,
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
    textName:{
        marginVertical:5,
        fontFamily:"Times",
        fontSize:height*0.02,
    },
    textType:{
        fontFamily:"Times",
        fontSize:height*0.02,
        color: Colors.colorOrange,
    }
})
