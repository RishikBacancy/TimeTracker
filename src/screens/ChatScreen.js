import React, {useState, useEffect, useCallback} from 'react';
import {View, ScrollView, Text, Button, StyleSheet} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import firestore from '@react-native-firebase/firestore';
const ChatScreen = ({user, route}) => {
  const [messages, setMessages] = useState([]);
  const {userName, email} = route.params;

  const getAllMessages = async () => {};

  useEffect(() => {
    // setMessages([
    //   {
    //     _id: 1,
    //     text: 'Hello developer',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 2,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    //   {
    //     _id: 2,
    //     text: 'Hello world',
    //     createdAt: new Date(),
    //     user: {
    //       _id: 1,
    //       name: 'React Native',
    //       avatar: 'https://placeimg.com/140/140/any',
    //     },
    //   },
    // ]);

    // getAllMessages();
    if (typeof email !== 'undefined') {
      const docid =
        email > user.id ? user.email + '-' + email : email + '-' + user.email;
      const messageRef = firestore()
        .collection('chatrooms')
        .doc(docid)
        .collection('messages')
        .orderBy('createdAt', 'desc');

      messageRef.onSnapshot(querySnap => {
        const allmsg = querySnap.docs.map(docSnap => {
          const data = docSnap.data();
          if (data.createdAt) {
            return {
              ...querySnap.data(),
              createdAt: docSnap.data().createdAt.toDate(),
            };
          } else {
            return {
              ...querySnap.data(),
              createdAt: new Date(),
            };
          }
        });

        setMessages(allmsg);
      });
    }
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={{marginBottom: 5, marginRight: 5}}
            size={32}
            color="#2e64e5"
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
            backgroundColor: '#2e64e5',
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

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const mymsg = {
      ...msg,
      sentBytes: user.email,
      sentTo: email,
      createdAt: new Date(),
    };
    setMessages(previousMessages => GiftedChat.append(previousMessages, mymsg));
    const docid = uid > user.id ? user.uid + '-' + uid : uid + '-' + user.id;
    firestore()
      .collection('chatrooms')
      .doc(docid)
      .collection('messages')
      .add({...mymsg, createdAt: firestore.FieldValue.serverTimestamp()});
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: user.email,
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
