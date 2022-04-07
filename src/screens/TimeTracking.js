import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const TimeTracking = props => {
  const [time, setTime] = useState({
    seconds: 0,
    minutes: 0,
    hours: 0,
  });
  const [start, setStart] = useState(false);

  useEffect(() => {
    const startTime = () => {
      setTimeout(() => {
        let nSeconds = time.seconds;
        let nMinutes = time.minutes;
        let nHours = time.hours;
        nSeconds++;
        if (nSeconds > 59) {
          nMinutes++;
          nSeconds = 0;
        }
        if (nMinutes > 59) {
          nHours++;
          nMinutes = 0;
        }
        if (nHours > 24) {
          nHours = 0;
        }
        if (start) {
          setTime({seconds: nSeconds, minutes: nMinutes, hours: nHours});
        }
      }, 1000);
    };
    startTime();
    return () => {
      console.log(time);
    };
  }, [time, start]);

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Button
          title="start"
          onPress={() => {
            setStart(true);
            // setStop(false);
          }}
        />

        <Button
          title="stop"
          onPress={() => {
            // setStop(true);
            setStart(false);
          }}
        />
      </View>
      <View style={styles.timeContainer}>
        <Text>{time.hours < 10 ? '0' + time.hours : time.hours} </Text>
        <Text>{time.minutes < 10 ? '0' + time.minutes : time.minutes}</Text>
        <Text>{time.seconds < 10 ? '0' + time.seconds : time.seconds}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    // flex: 1,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 100,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 100,
  },
});
export default TimeTracking;
