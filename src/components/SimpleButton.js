import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import Colors from '../Constants/Colors';
const SimpleButton = props => {
  return (
    <TouchableOpacity {...props} style={[styles.btnContainer, props.style]}>
      <Text style={styles.textWrap}>{props.btnTitle}</Text>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    width: 150,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  textWrap: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
    color: 'black',
  },
});

export default SimpleButton;
