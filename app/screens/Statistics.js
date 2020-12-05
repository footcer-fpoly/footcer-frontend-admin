import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import Header from '../components/Header';
import fonts from '../theme/ConfigStyle';
import Colors from '../theme/Colors';
import { PieChart } from 'react-native-chart-kit';
import { HEIGHT_SCALE, WIDTH, WIDTH_SCALE } from '../utils/ScaleAdaptor';
import Calendar from '../components/Calendar';
import API from '../server/api';
import moment from 'moment';
import { formatNumber } from '../components/MoneyFormat';

export default function Statistics({ route, navigation }) {
  const [dataDay, setDataDay] = useState([]);
  const [dataMonth, setDataMonth] = useState([]);
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [month, setMonth] = useState(moment().format('YYYY-MM'));
  useEffect(() => {
    API.get(`/statistics?day=${date}&month=`)
      .then(({ data }) => {
        setDataDay(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);
  useEffect(() => {
    API.get(
      `/statistics?day=&month=${moment(month?.dateString)?.format('YYYY-MM')}`,
    )
      .then(({ data }) => {
        setDataMonth(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month]);
  const data = [
    {
      name: 'khung giờ trống',
      population:
        Number(dataMonth?.data?.totalDetails) -
          Number(dataMonth?.data?.totalDetailsOrder) || 0,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: fonts?.font14,
    },
    {
      name: 'Khung giờ đặt',
      population: Number(dataMonth?.data?.totalDetailsOrder) || 0,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: fonts?.font14,
    },
  ];
  const chartConfig = {
    backgroundColor: '#444',
    backgroundGradientFrom: '#444',
    backgroundGradientTo: '#444',
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 10, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
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
            Thống kê
          </Text>
        }
      />
      <ScrollView style={{ backgroundColor: Colors.whiteColor, flex: 1 }}>
        <Calendar
          date={(v) => {
            v && setDate(moment(v)?.format('YYYY-MM-DD'));
          }}
          month={(v) => {
            v && setMonth(v);
            console.log(moment(v)?.format('YYYY-MM'), v);
          }}
        />
        <View style={{}}>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font16,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
              fontWeight: 'bold',
            }}>
            {dataDay?.message}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font14,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {`Số khung giờ đã đặt: ${dataDay?.data?.totalDetailsOrder}/${dataDay?.data?.totalDetails}`}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font14,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {`Doanh thu: ${formatNumber(dataDay?.data?.totalPrice)} đ`}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font14,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {`Số khách hàng: ${dataDay?.data?.totalCustomer} khách`}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font16,
              width: ' 90%',
              fontWeight: 'bold',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {dataMonth?.message}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font14,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {`Doanh thu tháng ${
              month?.month || moment()?.format('MM')
            }: ${formatNumber(dataMonth?.data?.totalPrice)} đ`}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font14,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {`Số khách hàng tháng ${month?.month || moment()?.format('MM')}: ${
              dataMonth?.data?.totalCustomer
            } khách`}
          </Text>
          <Text
            style={{
              color: '#000',
              fontSize: fonts?.font14,
              width: ' 90%',
              alignSelf: 'center',
              marginVertical: 10 * HEIGHT_SCALE,
            }}>
            {`Khung giờ:`}
          </Text>
          <PieChart
            data={data}
            width={WIDTH}
            height={220}
            chartConfig={chartConfig}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        </View>
      </ScrollView>
    </View>
  );
}
