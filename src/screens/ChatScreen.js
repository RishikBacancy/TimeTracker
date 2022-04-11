/* eslint-disable no-shadow */
import React, {useState, useEffect, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Colors from '../Constants/Colors';
import {AuthContext} from '../navigaion/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const ChatScreen = props => {
  const [messages, setMessages] = useState([]);

  const {user} = useContext(AuthContext);

  const {userId} = props.route.params;

  //console.log(userId);

  useEffect(() => {
    const roomid =
      userId > user.uid ? user.uid + '-' + userId : userId + '-' + user.uid;

    const msgRef = firestore()
      .collection('ChatRooms')
      .doc(roomid)
      .collection('Messages')
      .orderBy('createdAt', 'desc');

    msgRef.onSnapshot(querySnapshot => {
      if (querySnapshot != null) {
        const allMsg = querySnapshot.docs.map(docSnap => {
          const msgData = docSnap.data();

          if (msgData.createdAt) {
            return {
              ...docSnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...docSnap.data(),
              createdAt: new Date(),
            };
          }
        });

        setMessages(allMsg);
      }
    });

    return () => {
      setMessages();
    };
  }, [user.uid, userId]);

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
          <Ionicons
            name="send"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{marginBottom: 5, marginRight: 5}}
            size={28}
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
          left: {
            backgroundColor: '#ccc',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: Colors.accentColor,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
});
