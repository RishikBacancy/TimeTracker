import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  FlatList,
  Alert,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import SimpleButton from '../components/SimpleButton';
import HeaderButton from '../components/HeaderButton';
import Card from '../components/Card';
import firestore from '@react-native-firebase/firestore';
import auth, {firebase} from '@react-native-firebase/auth';
import Colors from '../Constants/Colors';
import InputField from '../components/InputField';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TimeTracking from './TimeTracking';

const HomeScreen = props => {
  const cUser = auth().currentUser;

  const [modalBtn, setModalBtn] = useState(false);

  const [taskName, setTaskName] = useState('');
  const [description, setDescription] = useState('');

  const [taskList, setTaskList] = useState([]);

  const [allTask, setAllTask] = useState(true);
  const [profTask, setProfTask] = useState(false);
  const [perTask, setPerTask] = useState(false);

  const [filterList, setFilterList] = useState();

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [filterOption, setFilterOption] = useState('All');

  const data = [
    {label: 'Professional', value: 'Professional'},
    {label: 'Personal', value: 'Personal'},
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
      .collection('Tasks')
      .onSnapshot(dataSnap => {
        const taskData = [];

        if (dataSnap != null) {
          dataSnap.forEach(dataSnapshot => {
            if (dataSnapshot.exists) {
              taskData.push({
                ...dataSnapshot.data(),
              });
            }
          });
        }
        //console.log(taskData.filter(item => item.taskType === "Personal"));
        setTaskList(taskData);
        setFilterList(taskData);
        //setProfTask(taskData.filter(item => item.taskType === "Professional"));
        //setPerTask(taskData.filter(item => item.taskType === "Personal"));
        //setProjectData(taskData);
      });

    return () => {
      register();
    };
  }, [cUser.uid]);

  const addHandler = () => {
    if (taskName === '' || description === '') {
      Alert.alert('All fields are required ! ', 'Fill up all fields', [
        {
          text: 'OK',
          onPress: () => {},
          style: 'cancel',
        },
      ]);
    } else if (value === null) {
      Alert.alert(
        "Task's type not selected !",
        "Select your task's type first !",
        [
          {
            text: 'OK',
            onPress: () => {},
            style: 'cancel',
          },
        ],
      );
    } else {
      firestore()
        .collection('Users')
        .doc(cUser.uid)
        .collection('Tasks')
        .doc(taskName)
        .set({
          name: taskName,
          description: description,
          taskType: value,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .catch(e => console.log(e));

      setTaskName('');
      setDescription('');
      setValue(null);
      setModalBtn(false);
    }
  };

  const setStatusFilter = filterOption => {
    setFilterOption(filterOption);

    if (filterOption !== 'All') {
      setFilterList(taskList.filter(item => item.taskType === filterOption));
      //etProjectData();
      //setFilterList(profTask);
      if (filterOption === 'Professional') {
        setAllTask(false);
        setPerTask(false);
        setProfTask(true);
      } else if (filterOption === 'Personal') {
        setAllTask(false);
        setPerTask(true);
        setProfTask(false);
      }
    } else {
      setFilterList(taskList);
      setAllTask(true);
      setPerTask(false);
      setProfTask(false);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.filterTab}>
        <TouchableOpacity
          style={[
            styles.filterBtnTab,
            allTask === true && styles.ActiveFilterBtn,
          ]}
          onPress={() => setStatusFilter('All')}>
          <Text
            style={[styles.filterText, allTask === true && styles.ActiveText]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtnTab,
            profTask === true && styles.ActiveFilterBtn,
          ]}
          onPress={() => setStatusFilter('Professional')}>
          <Text
            style={[styles.filterText, profTask === true && styles.ActiveText]}>
            Professional
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterBtnTab,
            perTask === true && styles.ActiveFilterBtn,
          ]}
          onPress={() => setStatusFilter('Personal')}>
          <Text
            style={[styles.filterText, perTask === true && styles.ActiveText]}>
            Personal
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.flatlistWrap}>
        <FlatList
          data={filterList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Card style={styles.cardWrap}>
              <Text style={styles.cardTaskName}>{item.name}</Text>
              <Text style={styles.cardTaskDescription}>
                Description: {item.description}
              </Text>
              <Text style={styles.cardTaskType}>Type: {item.taskType}</Text>
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
              onChangeText={data => setTaskName(data)}
              inputValue={taskName}
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
              <Dropdown
                style={[
                  styles.dropdown,
                  isFocus && {borderColor: Colors.primaryColor},
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={data}
                maxHeight={110}
                labelField="label"
                valueField="value"
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => (
                  <Ionicons
                    style={styles.icon}
                    color={isFocus ? Colors.primaryColor : Colors.accentColor}
                    name="pricetags"
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
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  filterTab: {
    flex: 1,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  filterBtnTab: {
    width: Dimensions.get('window').width / 3.5,
    borderRadius: 4,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EBEBEB',
    padding: 10,
  },
  ActiveFilterBtn: {
    backgroundColor: Colors.primaryColor,
  },
  filterText: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 15,
  },
  ActiveText: {
    color: '#fff',
    fontFamily: 'Ubuntu-Bold',
  },
  iconWrap: {
    marginRight: 7,
  },
  dropdowncontainer: {
    height: 100,
    width: 200,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  dropdown: {
    borderColor: Colors.accentColor,
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 10,
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
    height: '90%',
    marginTop: 10,
  },
  cardWrap: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardTaskName: {
    fontSize: 30,
    alignSelf: 'center',
    fontFamily: 'Ubuntu-Regular',
    // fontStyle: 'oblique',
    textDecorationLine: 'underline',
    marginBottom: '2%',
  },
  cardTaskDescription: {
    fontSize: 18,
    marginTop: '1%',
    fontStyle: 'italic',
    fontFamily: 'Ubuntu-Regular',
  },
  cardTaskType: {
    fontSize: 16,
    marginTop: '3%',
    fontStyle: 'italic',
    fontFamily: 'Ubuntu-Regular',
    color: 'green',
  },
});

export default HomeScreen;
