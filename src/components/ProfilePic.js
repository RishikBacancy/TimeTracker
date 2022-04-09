import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import Colors from '../Constants/Colors';

const ProfilePic = props => {
  return (
    <View style={[styles.profilePicContainer, props.style]}>
      <Image
        source={require('../../assets/blankPic.png')}
        //source={{uri:"https://us.123rf.com/450wm/apoev/apoev1903/apoev190300039/124427555-person-gray-photo-placeholder-woman-in-shirt-on-white-background.jpg?ver=6"}}
        style={styles.profilePicWrap}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  profilePicContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.accentColor,
    overflow: 'hidden',
  },
  profilePicWrap: {
    height: '100%',
    width: '100%',
  },
});

export default ProfilePic;
