import React, {useContext, useEffect, useReducer, useState} from 'react';
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
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigaion/AuthProvider';

const MessagesScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const querySanp = await firestore().collection('Users').get();

    let userList = querySanp.docs.map(details => details.get('userData'));

    console.log(userList);

    userList = userList.filter(details => details.userId != user.uid);

    console.log(userList);
    setUsers(userList);
  };

  useEffect(() => {
    // getUsers();
    const userRef = firestore().collection('Users');

    userRef.onSnapshot(querySanp => {
      if (querySanp != null) {
        let userList = querySanp.docs.map(details => details.get('userData'));

        console.log(querySanp);

        userList = userList.filter(details => details.userId != user.uid);

        //   console.log(userList);
        setUsers(userList);
      }
    });
    //console.log(user);
    return () => {
      setUsers({});
    };
  }, []);

  return (
    <Container>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {
                userName: item.name,
                userId: item.userId,
              })
            }>
            <UserInfo>
              <UserImgWrapper>
                {item.image === null ? (
                  <UserImg source={require('../../assets/blankPic.png')} />
                ) : (
                  <UserImg source={{uri: item.image}} />
                )}
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.name}</UserName>
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
