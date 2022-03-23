import React, { useContext, useEffect , useState} from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { AuthContext } from "../navigaion/AuthProvider";
import ProfilePic from "../components/ProfilePic";
import Card from "../components/Card";
import Colors from "../Constants/Colors";
import SimpleButton from "../components/SimpleButton";

const ProfileScreen = props =>
{

    const { logout, forgotPswd } = useContext(AuthContext);

    const [uEmail, setUEmail] = useState("")
    const user = auth().currentUser.uid;

    let email;

    useEffect(()=>{

        firestore().collection("Users").doc(user).get()
            .then((documentSnapshot) => {
                if(documentSnapshot.exists) {
                    console.log(documentSnapshot.get("email"));
                    setUEmail(documentSnapshot.get("email"));
                }
            });

    },[user]);

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

    return(
        <View style={styles.screen}>
            
            <Card style={styles.cardWrap}>
                <ProfilePic style={styles.profileWrap}/>

                <View style={styles.dataField}>
                    <Text style={styles.titleText}>Name :</Text>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>Rishik Karanjiya</Text>
                </View>

                <View style={styles.dataField}>
                    <Text style={styles.titleText}>Email :</Text>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>{uEmail}</Text>
                </View>

                <View style={styles.dataField}>
                    <Text style={styles.titleText}>Phone :</Text>
                    <Text ellipsizeMode="tail" numberOfLines={1} style={styles.detailText}>1234567890</Text>
                </View>

                <SimpleButton style={styles.btnWrap} btnTitle={"LogOut"} onPress={()=>logout()}/>

            </Card>
            <Text>Profile Screen</Text>
            <Icon name="lock-reset" size={25} color="black" onPress={resetHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex:1,
        justifyContent: "space-around",
        alignItems: "center",
    },  
    cardWrap:{
        width:"90%",
    },
    profileWrap:{
        alignSelf:"center",
        marginBottom:10,
    },
    dataField:{
        flexDirection:"row",
        marginHorizontal:5,
        marginVertical:15,
    },
    titleText:{
        fontFamily:"Ubuntu-Bold",
        fontSize:18,
        color: Colors.primaryColor,
    },
    detailText:{
        fontFamily:"Ubuntu-Regular",
        fontSize:19,
        color: Colors.accentColor,
        marginHorizontal:5,
    },
    btnWrap:{
        alignSelf:"center",
    }
});

export default ProfileScreen;