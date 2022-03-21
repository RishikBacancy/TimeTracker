import React, {useContext} from "react";
import { View, StyleSheet, Text} from "react-native";
import SimpleButton from "../components/SimpleButton";
import { AuthContext } from "../navigaion/AuthProvider";

const HomeScreen = ({navigation}) => {

    const {user, logout} = useContext(AuthContext);

    const logOutHandler = () =>
    {
        logout();
    };

    return(
        <View style={styles.screen}>
            <Text>Home Screen</Text>
            <Text>{user.uid}</Text>
            <SimpleButton
                btnTitle={"LogOut"}
                onPress={logOutHandler}/>
            <SimpleButton
                btnTitle={"Profile"}
                onPress={()=>{navigation.navigate("Profile")}}/>
        </View>

    );
}

const styles = StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
});

export default HomeScreen;