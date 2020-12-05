import React, { useState, useEffect } from 'react';
import { WeekCalendar, CalendarProvider } from 'react-native-calendars';
import { View, Text } from 'react-native';
import moment from 'moment';
import { WIDTH_SCALE } from '../utils/ScaleAdaptor';
import Colors from '../theme/Colors';
import fonts from '../theme/ConfigStyle';

export default function Calendar(props) {
  const [month, setMonth] = useState('1');
  const [dateSelect, setDateSelect] = useState(moment());
  const today = moment();
  useEffect(() => {
    setMonth(moment(today)?.format('MM'));
  }, []);

  return (
    <View style={{ width: '100%', backgroundColor: '#c3c3c3' }}>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: fonts?.font14,
          width: ' 90%',
          alignSelf: 'center',
          paddingVertical: 10 * WIDTH_SCALE,
        }}>{`Tháng ${month}`}</Text>
      <View
        style={{
          borderTopRightRadius: 14 * WIDTH_SCALE,
          borderTopLeftRadius: 14 * WIDTH_SCALE,
          overflow: 'hidden',
        }}>
        <CalendarProvider
          date={dateSelect}
          current={moment()}
          onDateChanged={(day) => {
            // if (
            //   moment(today).format('YYYYMMDD') !==
            //   moment(day).format('YYYYMMDD')
            // ) {
            props.date(day);
            // }
            setDateSelect(day);
          }}
          onMonthChange={(day) => {
            setMonth(day?.month);
            props.month(day);
          }}
          disabledOpacity={0.6}
          theme={{
            todayTextColor: Colors.textGreen,
            backgroundColor: 'red',
          }}>
          <WeekCalendar
            firstDay={1}
            theme={{
              selectedDayBackgroundColor: Colors.textGreen, //ptColor.appColor,
              todayTextColor: Colors.textGreen,
              selectedDayTextColor: '#000',
            }}
            markedDates={props?.markedDates ? props?.markedDates : null}
          />
        </CalendarProvider>
      </View>
    </View>
  );
}
