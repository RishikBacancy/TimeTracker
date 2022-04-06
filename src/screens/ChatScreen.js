import React, {useState, useEffect, useCallback, useContext} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import {AuthContext} from '../navigaion/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  // const {userName, email} = props.route.params;

  const getAllMessages = async () => {};

  const {user} = useContext(AuthContext);

  const {userId} = props.route.params;

  //console.log(userId);

  const fetchAllMsg = async () => {
    const roomid =
      userId > user.uid ? user.uid + '-' + userId : userId + '-' + user.uid;

    const querySnapshot = await firestore()
      .collection('ChatRooms')
      .doc(roomid)
      .collection('Messages')
      .orderBy('createdAt', 'desc')
      .get();

    const allMsg = querySnapshot.docs.map(docSnap => {
      return {
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt.toDate(),
      };
    });

    console.log(allMsg);
    setMessages(allMsg);
  };

  useEffect(() => {
<<<<<<< HEAD
    fetchAllMsg();
=======
    
    //fetchAllMsg();
    const roomid = userId > user.uid ? user.uid+"-"+userId : userId+"-"+user.uid;

    const msgRef = firestore().collection("ChatRooms").doc(roomid).collection("Messages")
    .orderBy("createdAt","desc")

    msgRef.onSnapshot((querySnapshot)=>{
      
      const allMsg = querySnapshot.docs.map( docSnap => {

        const msgData = docSnap.data();

        if(msgData){
          return{
            ...docSnap.data(),
            createdAt: docSnap.data().createdAt.toDate()
          }
        }else{
          return{
            ...docSnap.data(),
            createdAt: new Date()
          }
        }
      })

      setMessages(allMsg);

    })

>>>>>>> cf9fb6d992aa11136ccba2b6ea96ad3dbcd32b4a
  }, []);

  const onSend = messageArray => {
    const msg = messageArray[0];
    const myMsg = {
      ...msg,
      sentBY: user.uid,
      sentTo: userId,
    };

    console.log(myMsg);

    setMessages(previousMessages => GiftedChat.append(previousMessages, myMsg));

    const roomId =
      userId > user.uid ? user.uid + '-' + userId : userId + '-' + user.uid;

    firestore()
      .collection('ChatRooms')
      .doc(roomId)
      .collection('Messages')
      .add({...myMsg, createdAt: firestore.FieldValue.serverTimestamp()});
  };

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color={Colors.primaryColor}
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primaryColor,
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.uid,
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
    />
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
