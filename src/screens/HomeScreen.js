import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import SimpleButton from '../components/SimpleButton';
import { AuthContext } from '../navigaion/AuthProvider';
import HeaderButton from '../components/HeaderButton';
import Card from '../components/Card';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Colors from '../Constants/Colors';

const HomeScreen = (props) => {
	const { user, logout } = useContext(AuthContext);
	const cUser = auth().currentUser;

	const [ modalBtn, setModalBtn] = useState(false);

	useEffect(
		() => {
			props.navigation.setOptions({
				headerRight: () => <HeaderButton style={styles.iconWrap} iconName={'add-circle-outline'} onSelect={()=>console.log("add pressed!")}/>
			});

			/*firestore().collection('Users').doc(cUser.uid).set({
				email: cUser.email ,
			});*/
		},
		[ props.navigation, cUser ]
	);

	const logOutHandler = () => {
		logout();
	};

	return (
		<View style={styles.screen}>
			<Card>
                <Text>Rishik Karanjiya</Text>
            </Card>
			<Text>Home Screen</Text>
			<Text>{user.uid}</Text>
			<SimpleButton btnTitle={'LogOut'} onPress={logOutHandler} />

			<Modal animationType='slide' visible={modalBtn} transparent={true}>
				<View style={styles.modalContainer}>
					<Text>Modal</Text>
					<SimpleButton btnTitle={"cancel"} onPress={()=>setModalBtn(false)}/>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	iconWrap: {
		marginRight: 7,
	},
});

export default HomeScreen;
