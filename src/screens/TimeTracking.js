import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';

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
      <View style={styles.parent}>
        <Text style={styles.child}>
          {time.hours < 10 ? '0' + time.hours : ':' + time.hours}
        </Text>
        <Text style={styles.child}>
          {time.minutes < 10 ? ':0' + time.minutes : ':' + time.minutes}
        </Text>
        <Text style={styles.child}>
          {time.seconds < 10 ? ':0' + time.seconds : ':' + time.seconds}
        </Text>
      </View>
      <View style={styles.buttonParent}>
        <Icon
          // style={styles.button}
          name="play"
          size={25}
          color={Colors.primaryColor}
          onPress={() => {
            setStart(true);
            // setStop(false);
          }}
        />
        <Icon
          // style={styles.button}
          name="pause"
          size={25}
          color={Colors.primaryColor}
          onPress={() => {
            // setStop(true);
            setStart(false);
          }}
        />
      </View>
      {/* <View style={styles.buttonParent}>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              // setStop(true);
              setStart(false);
            }}>
            Stop
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={() => {
              setStart(true);
              // setStop(false);
            }}>
            Start
          </Text>
        </TouchableOpacity>
      </View> */}
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
    borderRadius: 10,
    borderColor: Colors.primaryColor,
    // backgroundColor: Colors.primaryColor,
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
    marginTop: '5%',
    width: '50%',
  },

  // buttonText: {
  //   color: Colors.accentColor,
  //   fontSize: 20,
  //   alignSelf: 'center',
  // },
});
export default TimeTracking;
