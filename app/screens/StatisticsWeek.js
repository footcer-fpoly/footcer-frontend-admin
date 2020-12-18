import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import Colors from '../theme/Colors';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import Calendar from '../components/Calendar';
import API from '../server/api';
import moment from 'moment';
import { formatNumber } from '../components/MoneyFormat';
import { useSelector } from 'react-redux';

export default function StatisticsWeek({ route, navigation }) {
  const [dataWeek, setDataWeek] = useState([]);
  const domain = useSelector((state) => state?.userReducer?.domain);
  useEffect(() => {
    const startDate = moment().isoWeekday(0).format('YYYY-MM-DD');
    let stringDate = '';
    for (let i = 0; i < 7; i++) {
      stringDate += `${i === 0 ? '' : ','}${moment(startDate, 'YYYY-MM-DD')
        ?.add(i, 'day')
        ?.format('YYYY-MM-DD')}`;
    }
    stringDate &&
      API.get(`${domain}//statistics-from-to?dates=${stringDate}`)
        .then(({ data }) => {
          data?.code === 200 && setDataWeek(data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }, []);
  const dataOrder = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [
          dataWeek[0]?.totalDetailsOrder || 0,
          dataWeek[1]?.totalDetailsOrder || 0,
          dataWeek[2]?.totalDetailsOrder || 0,
          dataWeek[3]?.totalDetailsOrder || 0,
          dataWeek[4]?.totalDetailsOrder || 0,
          dataWeek[5]?.totalDetailsOrder || 0,
          dataWeek[6]?.totalDetailsOrder || 0,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Số sân được đặt'], // optional
  };
  const dataPrice = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [
          dataWeek[0]?.totalPrice || 0,
          dataWeek[1]?.totalPrice || 0,
          dataWeek[2]?.totalPrice || 0,
          dataWeek[3]?.totalPrice || 0,
          dataWeek[4]?.totalPrice || 0,
          dataWeek[5]?.totalPrice || 0,
          dataWeek[6]?.totalPrice || 0,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Doanh thu'], // optional
  };
  const dataCustomer = {
    labels: ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'],
    datasets: [
      {
        data: [
          dataWeek[0]?.totalCustomer || 0,
          dataWeek[1]?.totalCustomer || 0,
          dataWeek[2]?.totalCustomer || 0,
          dataWeek[3]?.totalCustomer || 0,
          dataWeek[4]?.totalCustomer || 0,
          dataWeek[5]?.totalCustomer || 0,
          dataWeek[6]?.totalCustomer || 0,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
    legend: ['Khách hàng'], // optional
  };
  const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `#000`,
    decimalPlaces: 0,
    // strokeWidth: 10, // optional, default 3
    // barPercentage: 0.5,
    // useShadowColorFromDataset: false, // optional
  };
  return (
    <View style={{ flex: 1 }}>
      <Header
        navigation={navigation}
        center={
          <Text
            style={{
              fontSize: fonts.font18,
              fontWeight: fonts.bold,
              color: Colors.whiteColor,
            }}>
            {`Thống kê tuần`}
          </Text>
        }
      />
      <ScrollView
        style={{ backgroundColor: Colors.whiteColor, flex: 1 }}
        showHorizontalScrollIndicator>
        {dataWeek?.length ? (
          <View>
            <Text
              style={{
                color: '#000',
                fontSize: fonts?.font16,
                width: ' 90%',
                alignSelf: 'center',
                marginVertical: 10 * HEIGHT_SCALE,
                fontWeight: 'bold',
              }}>
              {`Thống kê trong tuần từ ${moment()
                .isoWeekday(0)
                .format('DD-MM')} đến ${moment()
                .isoWeekday(0)
                .add(7, 'days')
                .format('DD-MM')}`}
            </Text>
            <Text
              style={{
                color: '#000',
                fontSize: fonts?.font14,
                width: ' 90%',
                alignSelf: 'center',
                marginVertical: 10 * HEIGHT_SCALE,
              }}>
              Doanh thu:
            </Text>
            <LineChart
              verticalLabelRotation={30}
              data={dataWeek ? dataPrice : []}
              width={WIDTH}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
            <Text
              style={{
                color: '#000',
                fontSize: fonts?.font14,
                width: ' 90%',
                alignSelf: 'center',
                marginVertical: 10 * HEIGHT_SCALE,
              }}>
              Số sân được đặt:
            </Text>
            <LineChart
              verticalLabelRotation={30}
              data={dataWeek ? dataOrder : []}
              width={WIDTH}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
            <Text
              style={{
                color: '#000',
                fontSize: fonts?.font14,
                width: ' 90%',
                alignSelf: 'center',
                marginVertical: 10 * HEIGHT_SCALE,
              }}>
              Số khách hàng:
            </Text>
            <LineChart
              verticalLabelRotation={30}
              data={dataWeek ? dataCustomer : []}
              width={WIDTH}
              height={220}
              chartConfig={chartConfig}
              bezier
            />
          </View>
        ) : (
          <Text
            style={{
              position: 'relative',
              textAlign: 'center',
              alignSelf: 'center',
              paddingTop: 24 * HEIGHT_SCALE,
              paddingBottom: 24 * HEIGHT_SCALE,
              color: '#000',
            }}>
            {'Không có dữ liệu'}
          </Text>
        )}
      </ScrollView>
    </View>
  );
}
