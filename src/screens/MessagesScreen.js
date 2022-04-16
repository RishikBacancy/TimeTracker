import React, {useContext, useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  TextSection,
} from '../styles/MessageStyles';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigaion/AuthProvider';
import {decryptionData} from '../components/Encryption';

const MessagesScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    //getUsers();

    const userRef = firestore().collection('Users');

    const unSub = userRef.onSnapshot(querySanp => {
      if (querySanp != null) {
        let userList = querySanp.docs.map(details => details.get('userData'));

        //console.log(userList);

        // eslint-disable-next-line eqeqeq
        userList = userList.filter(details => details.userId != user.uid);

        //console.log(userList);
        setUsers(userList);
      }

      return () => {
        unSub();
      };
    });

    //console.log(user);
  }, [user.uid]);

  return (
    <Container>
      <FlatList
        data={users}
        renderItem={({item}) => (
          <Card
            onPress={() =>
              navigation.navigate('Chat', {
                userName: decryptionData(item.userId, item.name),
                userId: item.userId,
                userAvatar:
                  item.image === null
                    ? require('../../assets/blankPic.png')
                    : item.image,
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
                  <UserName>{decryptionData(item.userId, item.name)}</UserName>
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
