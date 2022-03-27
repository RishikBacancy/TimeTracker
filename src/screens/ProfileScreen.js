import React, { useContext, useEffect, useState,  useRef } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigaion/AuthProvider';
import Card from '../components/Card';
import Colors from '../Constants/Colors';
import SimpleButton from '../components/SimpleButton';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';

const ProfileScreen = (props) => {
	const { logout, forgotPswd } = useContext(AuthContext);

	const [ uName, setUName ] = useState('');
	const [ uEmail, setUEmail ] = useState('');
	const [ uPhone, setUPhone ] = useState('');

	const [ pic, setPic ] = useState('');

	let uriImage;

	const user = auth().currentUser.uid;

	const [ modalBtn, setModalBtn ] = useState(false);

	const [ response, setResponse ] = useState(null);

	useEffect(
		() => {
			firestore().collection('Users').doc(user).get().then((documentSnapshot) => {
				if (documentSnapshot.exists) {

					let userData = {};

					//console.log(documentSnapshot.get('userData'));
					userData = documentSnapshot.get('userData');

					//console.log(userData)

					setUName(userData.name);
					setUEmail(userData.email);
					setUPhone(userData.phone);
				}
			});
		},
		[ user]
	);

	const resetHandler = () => {
		forgotPswd(auth().currentUser.email);
		Alert.alert('Password Reset', 'Password Reset link has been sent!', [
			{
				text: 'OK',
				onPress: () => {},
				style: 'cancel'
			}
		]);
	};

	const cameraHandler = () => {
		ImagePicker.launchCamera(
			{
				mediaType: 'photo',
				includeBase64: false,
				maxHeight: 200,
				maxWidth: 200,
				saveToPhotos: true,
			},
			(response) => {
				console.log(response);
				
				uriImage = response.assets.map(({uri})=>(uri));
			}
		);
		setModalBtn(false);
		setPic(uriImage);
		console.log('=================\n');
		console.log(pic);
	};

	const libraryHandler = () => {
		ImagePicker.launchImageLibrary(
			{
				maxHeight: 200,
				maxWidth: 200,
				selectionLimit: 0,
				mediaType: 'photo',
				includeBase64: false,
			},
			(response) => {
				console.log(typeof(response.uri));
				//console.log(response.assets.map(({uri})=>(uri)));
				console.log('=================\n' + uriImage);
				uriImage = response.assets.map(({uri})=>(uri));
				//setPic(response.uri);
				//firestore.collection("Users").doc(user).
				console.log('=================\n' + typeof(uriImage));
			}
			
		);
		setModalBtn(false);
		
		console.log('=================\n');
		console.log(pic);
		//setPic(uriImage.file);
	};

	const editMenuHandler = () =>
	{

	};

	return (
		<View style={styles.screen}>
			<Modal animationType="slide" visible={modalBtn} transparent={true}>
				<View style={styles.modalContainer}>
					<SimpleButton style={styles.modalBtn} btnTitle="Open Camera" onPress={cameraHandler} />
					<SimpleButton style={styles.modalBtn} btnTitle="Choose from Library" onPress={libraryHandler} />
					<SimpleButton
						style={styles.modalBtn}
						btnTitle="Cancel"
						onPress={() => {
							setModalBtn(false);
						}}
					/>
				</View>
			</Modal>

			<Card style={styles.cardWrap}>
				<View style={styles.profilePicture}>
					<View style={styles.profileWrap}>
						<Image
							style={styles.profilePicContainer}
							//source={require('../../assets/blankPic.png')}
							source={{uri:uriImage}}
							resizeMode="cover"
						/>
					</View>
					<View style={styles.editImage}>
						<Icon name="ios-add-circle" size={25} color={'black'} onPress={() => setModalBtn(true)} />
					</View>
				</View>

				<View style={styles.dataField}>
					<Text style={styles.titleText}>Name :</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
						{uName === null ? "Enter your Name" : uName}
					</Text>
				</View>

				<View style={styles.dataField}>
					<Text style={styles.titleText}>Email :</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
						{uEmail === null ? "Enter your Email" : uEmail}
					</Text>
				</View>

				<View style={styles.dataField}>
					<Text style={styles.titleText}>Phone :</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
						{uPhone === null ? "Enter your Phone" : uPhone}
					</Text>
				</View>

				<SimpleButton style={styles.btnWrap} btnTitle={'LogOut'} onPress={() => logout()} />
				<View style={styles.editBtn}>
					<Icon name='ios-create-outline' size={25} color={Colors.accentColor} onPress={editMenuHandler}/>
				</View>
			</Card>
			<Text>Profile Screen</Text>
			<Icon name="key" size={25} color="black" onPress={resetHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalContainer: {
		marginTop: '128%',
		width: '100%',
		height: '30%',
		borderColor: '#ccc',
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 1,
		backgroundColor: 'white',
		elevation: 3
	},
	modalBtn: {
		width: '80%'
	},
	cardWrap: {
		width: '90%'
	},
	profilePicture: {
		height: 100,
		width: 100,
		alignSelf: 'center'
	},
	profileWrap: {
		width: '100%',
		height: '100%',
		borderRadius: 50,
		borderWidth: 2,
		borderColor: Colors.accentColor,
		overflow: 'hidden'
	},
	profilePicContainer: {
		height: '100%',
		width: '100%',
		marginBottom: 10,
		alignSelf: 'center'
	},
	editImage: {
		position: 'absolute',
		top: 5,
		right: 0
	},
	dataField: {
		flexDirection: 'row',
		marginHorizontal: 5,
		marginVertical: 15
	},
	titleText: {
		fontFamily: 'Ubuntu-Bold',
		fontSize: 18,
		color: Colors.primaryColor,
		flex: 1
	},
	detailText: {
		fontFamily: 'Ubuntu-Regular',
		fontSize: 19,
		color: Colors.accentColor,
		marginHorizontal: 5,
		flex: 3
	},
	btnWrap: {
		alignSelf: 'center'
	},
	editBtn:{
		position:"absolute",
		top:10,
		right:10,
	}
});

export default ProfileScreen;
