import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text} from "react-native";
import SimpleButton from "../components/SimpleButton";
import { AuthContext } from "../navigaion/AuthProvider";
import HeaderButton from "../components/HeaderButton";
import Card from "../components/Card";

const HomeScreen = props => {

    const {user, logout} = useContext(AuthContext);

    useEffect(()=>{
        props.navigation.setOptions({
            headerRight: () => (
                <HeaderButton
                    iconName={"add-circle-outline"}/>
            ),
        })
    },[props.navigation])

    const logOutHandler = () =>
    {
        logout();
    };

    return(
        <View style={styles.screen}>
            <Card/>
            <Text>Home Screen</Text>
            <Text>{user.uid}</Text>
            <SimpleButton
                btnTitle={"LogOut"}
                onPress={logOutHandler}/>
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