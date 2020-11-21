import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function HeadAvatar(props) {
  console.log(props);
  return (
    <View style={styles.headerContainer}>
      <View style={styles.viewRow}>
        <View>
          <Image
            style={styles.imgAvatar}
            source={{ uri: props.urlImgAvatar }}
          />
          <TouchableOpacity style={styles.edit}>
            <Icon name={'pen'} size={12} color={'#fff'} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 15 }}>
          <View style={styles.viewRow}>
            <Text style={{ color: '#fff', fontSize: 18 }}>
              {props.nameUser}
            </Text>
            <View style={styles.editName}>
              <Icon name={'pen'} size={12} color={'#fff'} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerContainer: {
    backgroundColor: '#0AB134',
    paddingHorizontal: 25,
    paddingBottom: 20,
  },
  imgAvatar: {
    height: 85,
    width: 85,
    borderRadius: 85 / 2,
    borderWidth: 1,
    borderColor: 'white',
  },
  edit: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    position: 'absolute',
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editName: {
    height: 25,
    width: 25,
    borderRadius: 25 / 2,
    backgroundColor: '#707070',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  },
});
