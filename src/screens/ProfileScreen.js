import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, Alert, Modal, Image, TextInput, ActivityIndicator } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigaion/AuthProvider';
import Card from '../components/Card';
import Colors from '../Constants/Colors';
import SimpleButton from '../components/SimpleButton';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

const ProfileScreen = (props) => {
	const { logout, forgotPswd } = useContext(AuthContext);

	const [ uName, setUName ] = useState('');
	const [ uEmail, setUEmail ] = useState('');
	const [ uPhone, setUPhone ] = useState('');

	const [ pic, setPic ] = useState(null);

	//let uriImage = {};

	const user = auth().currentUser.uid;

	const [ modalBtn, setModalBtn ] = useState(false);
	const [ editMode, setEditMode ] = useState(false);
	const [ isLoading, setIsLoading ] = useState(false);

	const reference = storage().ref().child('/UserProfile/' + user);

	//const [ response, setResponse ] = useState(null);

	useEffect(
		() => {
			setIsLoading(true);
			firestore().collection('Users').doc(user).get().then((documentSnapshot) => {
				if (documentSnapshot.exists) {
					let userData = {};

					//console.log(documentSnapshot.get('userData'));
					userData = documentSnapshot.get('userData');
					//console.log(documentSnapshot.get("profileImage"));
					//console.log(userData)

					setUName(userData.name);
					setUEmail(userData.email);
					setUPhone(userData.phone);
					setPic(userData.image);
					setIsLoading(false);
				}
			});
		},
		[ user ]
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
				saveToPhotos: false
			},
			(response) => {
				console.log(response);

				let uriImage = { uri: response.assets.map(({ uri }) => uri) };
				console.log('=================\n' + uriImage);
				const uploadImage = reference.putFile(uriImage.uri[0]);

				uploadImage.on(
					'state_changed',
					(imageSnapshot) => {
						console.log(imageSnapshot.bytesTransferred + '/' + imageSnapshot.totalBytes);
					},
					(err) => {
						console.log(err);
					},
					() => {
						uploadImage.snapshot.ref.getDownloadURL().then((imageUrl) => {
							console.log(imageUrl);
							setPic(imageUrl);
						});
					}
				);

				//setPic(uriImage.uri[0]);
			}
		);
		setModalBtn(false);
		//setPic(uriImage);
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
				includeBase64: true
			},
			(response) => {
				//console.log(typeof(response.uri));
				//console.log(response.assets.map(({ base64 }) => (base64)));
				//console.log('=================\n' + uriImage);
				let uriImage = { uri: response.assets.map(({ uri }) => uri) };

				//setBasePic(response.assets.map(({ base64 }) => (base64)));
				//setPic(response.uri);
				//firestore.collection("Users").doc(user).

				//console.log('=================\n' + uriImage);
				//console.log(response.assets.find("base64"));
				const uploadImage = reference.putFile(uriImage.uri[0]);

				uploadImage.on(
					'state_changed',
					(imageSnapshot) => {
						console.log(imageSnapshot.bytesTransferred + '/' + imageSnapshot.totalBytes);
					},
					(err) => {
						console.log(err);
					},
					() => {
						uploadImage.snapshot.ref.getDownloadURL().then((imageUrl) => {
							console.log(imageUrl);
							setPic(imageUrl);
						});
					}
				);

				//setPic(uriImage.uri[0]);
			}
		);
		setModalBtn(false);

		console.log('=================\n');
		//console.log(pic);
		//setPic(uriImage.file);
	};

	const updateHandler = () => {
		setIsLoading(true);

		let userData = {};

		userData.name = uName;
		userData.email = uEmail;
		userData.phone = uPhone;
		userData.image = pic;
		userData.userId = user;

		firestore().collection('Users').doc(user).update({
			userData
		});

		setEditMode(false);
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<View style={styles.screen}>
				<ActivityIndicator size={'large'} color={Colors.primaryColor} />
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Modal animationType="slide" visible={modalBtn} transparent={true}>
				<View style={styles.modalWrap}>
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
				</View>
			</Modal>

			<Card style={styles.cardWrap}>
				<View style={styles.profilePicture}>
					<View style={styles.profileWrap}>
						{pic === null ? (
							<Image
								style={styles.profilePicContainer}
								source={require('../../assets/blankPic.png')}
								//source = {{pic}}
								resizeMode="cover"
							/>
						) : (
							<Image
								style={styles.profilePicContainer}
								//source={require('../../assets/blankPic.png')}
								source={{ uri: pic }}
								resizeMode="cover"
							/>
						)}
					</View>
					{editMode ? (
						<View style={styles.editImage}>
							<Icon name="ios-add-circle" size={25} color={'black'} onPress={() => setModalBtn(true)} />
						</View>
					) : null}
				</View>

				<View style={styles.dataField}>
					<Text style={styles.titleText}>Name :</Text>
					{editMode ? (
						<TextInput
							style={styles.detailEditText}
							placeholder="Full Name"
							onChangeText={(data) => setUName(data)}
							value={uName}
							numberOfLines={1}
							placeholderTextColor="#ccc"
						/>
					) : (
						<Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
							{uName === null ? '-' : uName}
						</Text>
					)}
				</View>

				<View style={styles.dataField}>
					<Text style={styles.titleText}>Email :</Text>
					<Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
						{uEmail === null ? '-' : uEmail}
					</Text>
				</View>

				<View style={styles.dataField}>
					<Text style={styles.titleText}>Phone :</Text>
					{editMode ? (
						<TextInput
							style={styles.detailEditText}
							placeholder="Phone Number"
							onChangeText={(data) => setUPhone(data)}
							value={uPhone}
							numberOfLines={1}
							keyboardType="number-pad"
							placeholderTextColor="#ccc"
						/>
					) : (
						<Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>
							{uPhone === null ? '-' : uPhone}
						</Text>
					)}
				</View>

				{editMode ? (
					<SimpleButton style={styles.btnWrap} btnTitle={'Update'} onPress={updateHandler} />
				) : (
					<SimpleButton style={styles.btnWrap} btnTitle={'LogOut'} onPress={() => logout()} />
				)}

				<View style={styles.editBtn}>
					<Icon
						name="ios-create-outline"
						size={25}
						color={Colors.accentColor}
						onPress={() => setEditMode(true)}
					/>
				</View>
			</Card>
			<SimpleButton btnTitle={'Reset password'} onPress={resetHandler} />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	modalWrap: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: 'rgba(54,54,54,0.5)'
	},
	modalContainer: {
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
	detailEditText: {
		fontFamily: 'Ubuntu-Regular',
		fontSize: 19,
		color: Colors.accentColor,
		flex: 3,
		borderBottomWidth: 1,
		height: 40,
		marginVertical: -5,
		borderColor: Colors.primaryColor
	},
	btnWrap: {
		alignSelf: 'center'
	},
	editBtn: {
		position: 'absolute',
		top: 10,
		right: 10
	}
});

export default ProfileScreen;
