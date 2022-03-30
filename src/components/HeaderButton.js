import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../Constants/Colors';

const HeaderButton = props => {
  return (
    <View style={[styles.iconWrap, props.style]}>
      <Icon
        name={props.iconName}
        size={30}
        color={Colors.accentColor}
        onPress={props.onSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrap: {},
});

export default HeaderButton;
