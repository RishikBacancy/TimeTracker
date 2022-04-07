import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Modal, FlatList} from 'react-native';
import SimpleButton from '../components/SimpleButton';
import {AuthContext} from '../navigaion/AuthProvider';
import HeaderButton from '../components/HeaderButton';
import Card from '../components/Card';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Colors from '../Constants/Colors';
import InputField from '../components/InputField';
import {Dropdown} from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TimeTracking from './TimeTracking';

const HomeScreen = props => {
  const {user, logout} = useContext(AuthContext);
  const cUser = auth().currentUser;

  const [modalBtn, setModalBtn] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');

  const [projectData, setProjectData] = useState([]);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Professional', value: 'professional'},
    {label: 'Personal', value: 'personal'},
  ];

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          style={styles.iconWrap}
          iconName={'add-circle-outline'}
          onSelect={() => {
            console.log('add pressed!');
            setModalBtn(true);
          }}
        />
      ),
    });
  }, [props.navigation]);

  useEffect(() => {
    const register = firestore()
      .collection('Users')
      .doc(cUser.uid)
      .collection('Projects')
      .onSnapshot(dataSnap => {
        const project = [];

        if (dataSnap != null) {
          dataSnap.forEach(dataSnapshot => {
            if (dataSnapshot.exists) {
              project.push({
                ...dataSnapshot.data(),
              });
            }
          });
        }
        setProjectData(project);
      });
    console.log(projectData);
    return () => register();
  }, []);

  const addHandler = () => {
    firestore()
      .collection('Users')
      .doc(cUser.uid)
      .collection('Projects')
      .doc(projectName)
      .set({
        name: projectName,
        description: description,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .catch(e => console.log(e));

    setProjectName('');
    setDescription('');
    setModalBtn(false);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.flatlistWrap}>
        <FlatList
          data={projectData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Card style={styles.cardWrap}>
              <Text>Project Name: {item.name}</Text>
              <Text>Project Description: {item.description}</Text>
              <TimeTracking />
            </Card>
          )}
        />
      </View>

      <Modal animationType="slide" visible={modalBtn} transparent={true}>
        <View style={styles.modalWrap}>
          <View style={styles.modalContainer}>
            <InputField
              iconName={'book'}
              placeholder="Project Name"
              onChangeText={data => setProjectName(data)}
              inputValue={projectName}
              numberOfLines={1}
            />
            <InputField
              iconName={'file-text-o'}
              placeholder="Description"
              onChangeText={data => setDescription(data)}
              inputValue={description}
              numberOfLines={3}
              multiline={true}
              style={styles.description}
            />

            <View style={styles.dropdowncontainer}>
              {/* {renderLabel()} */}
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: Colors.primaryColor},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                // inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={110}
                // width={300}
                labelField="label"
                valueField="value"
                // placeholder={!isFocus ? 'Select item' : 'Select Tag'}
                // searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <AntDesign
                    style={styles.icon}
                    color={isFocus ? Colors.primaryColor : Colors.accentColor}
                    name="Safety"
                    size={20}
                  />
                )}
              />
            </View>

            <View style={styles.btnWrap}>
              <SimpleButton
                style={styles.btnStyle}
                btnTitle={'Add'}
                onPress={addHandler}
              />
              <SimpleButton
                style={styles.btnStyle}
                btnTitle={'Cancel'}
                onPress={() => setModalBtn(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    marginRight: 7,
  },
  dropdowncontainer: {
    // flex: 1,
    height: 100,
    width: 200,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  dropdown: {
    // maxHeight: 100,
    borderColor: Colors.accentColor,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    paddingHorizontal: 8,
    fontSize: 14,
    left: 22,
    top: 8,
    zIndex: 999,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: 'Ubuntu-Regular',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  modalWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '20%',
    marginHorizontal: '20%',
    padding: 20,
    borderRadius: 7,
    elevation: 5,
  },
  btnStyle: {
    width: '40%',
  },
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  description: {
    height: 100,
  },
  flatlistWrap: {
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  cardWrap: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
});

export default HomeScreen;
