import React from 'react';
import {StyleSheet, TouchableOpacity, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({
  btnTitle,
  btnBgColor,
  iconName,
  iconColor,
  ...extra
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.btnContainer,
        {backgroundColor: btnBgColor, borderColor: iconColor},
      ]}
      {...extra}>
      <View style={styles.iconContainer}>
        <Icon name={iconName} color={iconColor} size={35} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.textWrap, {color: iconColor}]}>{btnTitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: 250,
    height: 50,
    flexDirection: 'row',
    borderRadius: 5,
    marginTop: 10,
    borderWidth: 1,
  },
  iconContainer: {
    height: 50,
    width: 50,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  textWrap: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 18,
  },
});

export default SocialButton;
