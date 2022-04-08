import React, {useState, useEffect} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';

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
    <View style={styles.container}>
      <View style={styles.buttonParent}>
        <Button
          style={styles.button}
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
      <View style={styles.parent}>
        <Text style={styles.child}>
          {time.hours < 10 ? '0' + time.hours : time.hours}
        </Text>
        <Text style={styles.child}>
          {time.minutes < 10 ? ' : 0' + time.minutes : time.minutes}
        </Text>
        <Text style={styles.child}>
          {time.seconds < 10 ? ' : 0' + time.seconds : time.seconds}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '8%',
  },
  parent: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 80,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.primaryColor,
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '.5%',
    paddingBottom: '.5%',
  },

  child: {
    fontSize: 30,
    color: Colors.accentColor,
  },

  buttonParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '12%',
  },

  button: {
    backgroundColor: Colors.primaryColor,
    paddingTop: '5%',
    paddingBottom: '5%',
    paddingLeft: '5%',
    paddingRight: '5%',
    display: 'flex',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.accentColor,
    height: 60,
  },

  buttonText: {
    color: Colors.accentColor,
    fontSize: 20,
    alignSelf: 'center',
  },
});
export default TimeTracking;
