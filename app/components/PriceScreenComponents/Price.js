import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import Colors from '../../theme/Colors';

export default function Price() {
  const tableHead = ['Khung giờ', 'Sân 5', 'Sân 7'];
  const [tableData, setTableData] = useState([
    ['5:30 - 7:00', '150.000', '200.000'],
    ['5:30 - 7:00', '150.000', '200.000'],
    ['5:30 - 7:00', '150.000', '200.000'],
    ['5:30 - 7:00', '150.000', '200.000'],
    ['5:30 - 7:00', '150.000', '200.000'],
    ['5:30 - 7:00', '150.000', '200.000'],
  ]);
  return (
    <View style={styles.container}>
      <Table
        style={styles.table}
        borderStyle={{ borderWidth: 1, borderColor: Colors.colorGrayText }}>
        <Row data={tableHead} textStyle={styles.textHead} />
        <Rows data={tableData} textStyle={styles.textData} />
      </Table>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.colorWhite,
  },
  textHead: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 10,
    color: Colors.colorGrayText,
  },
  textData: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 20,
    color: Colors.colorGrayText,
  },
  table: {
    marginTop: 0,
  },
});
