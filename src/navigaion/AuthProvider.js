import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [ user, setUser ] = useState(null);

	return (
		<AuthContext.Provider
			value={{
				user,
				setUser,

				login: async (email, password) => {
					try {
						await auth().signInWithEmailAndPassword(email, password);
					} catch (e) {
						console.log(e);
					}
				},

				googleLogin: async () => {
					try {
						const { idToken } = await GoogleSignin.signIn();
						const googleCredential = auth.GoogleAuthProvider.credential(idToken);
						return auth().signInWithCredential(googleCredential).then((data)=>{
							
							let userData = {};

							firestore().collection("Users").doc(auth().currentUser.uid).get().then((snap)=>{
								if(snap.exists){
									//console.log(snap.get("userData"));
									userData = snap.get("userData");
									console.log(userData)
									firestore().collection("Users").doc(auth().currentUser.uid).set({
										userData
									});
								}else{
									console.log("yesss else part!");
									userData.name = data.user.displayName;
									//console.log(userData.name);
									userData.name = data.user.displayName;
									userData.email = data.user.email.toLowerCase();
									userData.phone = data.user.phoneNumber;

									firestore().collection("Users").doc(auth().currentUser.uid).set({
										userData
									});

								}
							});

							//console.log(userData.name);

							//firestore().collection("Users").doc(auth().currentUser.uid).set({
								//userData
							//});
						});
					} catch (e) {
						console.log({ e });
					}
				},

				fbLogin: async () => {
					try {
						const result = await LoginManager.logInWithPermissions([ 'public_profile', 'email' ]);

						if (result.isCancelled) {
							throw 'User cancelled the login process';
						}

						const data = await AccessToken.getCurrentAccessToken();

						if (!data) {
							throw 'Something went wrong obtaining access token';
						}

						const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);


						return auth().signInWithCredential(facebookCredential).then((data)=>{
							let userData = {};
							
							//userData.name = data.user.displayName;
							//userData.email = data.user.email.toLowerCase();
							//userData.phone = data.user.phoneNumber;

							firestore().collection("Users").doc(auth().currentUser.uid).get().then((snap)=>{
								if(snap.exists){
									//console.log(snap.get("userData"));
									userData = snap.get("userData");
									firestore().collection("Users").doc(auth().currentUser.uid).set({
										userData
									});
								}else{
									userData.name = data.user.displayName;
									userData.email = data.user.email.toLowerCase();
									userData.phone = data.user.phoneNumber;

									firestore().collection("Users").doc(auth().currentUser.uid).set({
										userData
									});
								}
							});

							//console.log(userData);

							
						});
					} catch (e) {
						console.log({ e });
					}
				},

				register: async (name, email, password, phone) => {
					try {
						await auth().createUserWithEmailAndPassword(email, password).then((data)=>{
							let userData = {};
							
							userData.name = name;
							userData.email = email.toLowerCase();
							userData.phone = phone;

							console.log(userData);

							firestore().collection("Users").doc(auth().currentUser.uid).set({
								userData
							});
							
						});
					} catch (e) {
						console.log(e);
					}
				},

				forgotPswd: async (email) => {
					try {
						await auth().sendPasswordResetEmail(email);
					} catch (e) {
						console.log(e);
					}
				},

				logout: async () => {
					try {
						await auth().signOut();
					} catch (e) {
						console.log(e);
					}
				},

				/*uploadData: async (name, email, password, phone ) => {
					try {
						await Firestore().collection("Users").doc(auth().user.uid).set({
							name : name,
							email : email,
							password : password,
							phone : phone,
						});
					} catch (e) {
						console.log(e);
					}

				},*/
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
