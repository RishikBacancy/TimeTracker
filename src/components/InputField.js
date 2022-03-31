import React from "react";
import { View, StyleSheet, TextInput} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"

const InputField = props =>
{
    return(
        <View style={[styles.inputContainer, props.style]}>  
            <View style={[styles.iconContainner, props.style ]}>
                <Icon name={props.iconName} color="#666" size={25}/>
            </View>
            <TextInput
                {...props}
                value={props.inputValue}
                placeholderTextColor="#666"
                style={[styles.textContainner, props.style]}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer:{
        flexDirection:"row",
        borderColor:"#666",
        borderWidth:1,
        borderRadius:5,
        marginVertical:5,
        fontFamily:"Ubuntu-Bold",
    },
    iconContainner:{
        width:40,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRightWidth:1,
        borderRightColor:"#666",
    },
    textContainner: {
        width:250,
        height:40,
        fontFamily:"Ubuntu-Medium",
    },
});

export default InputField;