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
						return auth().signInWithCredential(googleCredential);
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

						return auth().signInWithCredential(facebookCredential);
					} catch (e) {
						console.log({ e });
					}
				},

				register: async (email, password) => {
					try {
						await auth().createUserWithEmailAndPassword(email, password);
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
				}

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
