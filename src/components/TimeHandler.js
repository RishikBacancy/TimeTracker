import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Colors from "../Constants/Colors";

const TimeHandler = props => 
{
    const [ sec, setSec ] = useState(props.tSec);
    const [ min, setMin ] = useState(props.tMin);
    const [ hr, setHr ] = useState(props.tSec);
    const [ runTime, setRunTime] = useState(false);

    var timer;

    useEffect(()=>{

        if(runTime){
            timer = setInterval(()=>{

                setSec(sec+1);
    
                if(sec === 59){
                    setMin(min+1);
                    setSec(0);
                }
    
                if(min === 59){
                    setHr(hr+1);
                    setMin(0);
                }
    
            },1000)
        } else {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        }

    })

    const stratHandler = () => {
        console.log("started");
        setRunTime(true);
    };

    const stopHandler = () => {
        console.log("stopped");
        setRunTime(false);
    };

    return(
        <View style={styles.timerWrapper}>
            <View>
                <Icon name="ios-caret-forward-circle-outline" color={Colors.primaryColor} size={25} onPress={()=>{stratHandler()}}/>
            </View>
            <Text> { hr<10?"0"+hr:hr } : {min<10?"0"+min:min} : {sec<10?"0"+sec:sec} </Text>
            <View>
                <Icon name="stop-circle-outline" color={Colors.primaryColor} size={25} onPress={()=>{stopHandler()}}/>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    timerWrapper:{
        flex:1,
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        padding:10,
    }
});

export default TimeHandler;