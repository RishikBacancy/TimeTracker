import React, {useContext, useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from '../styles/MessageStyles';
import {AuthContext} from '../navigaion/AuthProvider';
import firestore from '@react-native-firebase/firestore';

const Messages = [
  {
    id: '1',
    userName: 'Jenny Doe',
    userImg: require('../../assets/user-3.jpg'),
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'John Doe',
    userImg: require('../../assets/user-1.jpg'),
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Ken William',
    userImg: require('../../assets/user-4.jpg'),
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Selina Paul',
    userImg: require('../../assets/user-6.jpg'),
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Christy Alex',
    userImg: require('../../assets/user-7.jpg'),
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    const querySanp = await firestore().collection('Users').get();
    const allusers = querySanp.docs.map(docSnap => docSnap.data('userData'));

    console.log(allusers);
    setUsers(allusers);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <Container>
      <FlatList
        data={users}
        keyExtractor={item => item.email}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {
                userName: item.name,
                email: item.email,
              })
            }>
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={{uri: item.userData.image}} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  {/* {console.log(item.userData.name)} */}
                  <UserName>{item.userData.name}</UserName>
                  {/* <PostTime>{item.messageTime}</PostTime> */}
                </UserInfoText>
                {/* <MessageText>{item.messageText}</MessageText> */}
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
