import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';

const ProfilePic = (props) => {

	console.log(props.profilePic)

	return (
		<View style={[styles.container, props.style]}>
			<View style={styles.profilePicContainer}>
				<Image
					//source={require('../../assets/blankPic.png')}
					
					source={{uri:props.profilePic}}
					style={styles.profilePicWrap}
					resizeMode="cover"
				/>
			</View>
			{props.children}
		</View>
	);
};

const styles = StyleSheet.create({
    container:{
        height:100,
        width:100,
    },
	profilePicContainer: {
		width: "100%",
		height: "100%",
		borderRadius: 50,
		borderWidth: 2,
		borderColor: Colors.accentColor,
		overflow: 'hidden'
	},
	profilePicWrap: {
		height: '100%',
		width: '100%'
	}
});

export default ProfilePic;
