import {Container, View} from 'native-base';
import React, {useState, useEffect, useContext} from 'react';
import {FlatList, StatusBar, StyleSheet} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-ios';
import {COLORS} from '../Assets/Color';
import {FONTS} from '../Assets/Font';
import database from '@react-native-firebase/database';
import Navigation from '../Service/Navigation';
import uuid from 'react-native-uuid';
import {UserContext} from '../Context/UserContext';
import ContactHeader from '../Component/Header/ContactHeader';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

const Contacts = () => {
  const {userData} = useContext(UserContext);

  const [search, setsearch] = useState('');
  const [allUser, setallUser] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  useEffect(() => {
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllUser = () => {
    database()
      .ref('/users/')
      .once('value')
      .then(snapshot => {
        console.log('all User data: ', snapshot.val());
        setallUser(
          Object.values(snapshot.val()).filter(item => item.id != userData.id),
        ); // except me
        setSearchedUsers(
          Object.values(snapshot.val()).filter(item => item.id != userData.id),
        );
      });
  };

  const searchUser = val => {
    setsearch(val);
    setallUser(searchedUsers.filter(item => item.name.match(val)));
  };

  const createChatList = data => {
    database()
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId: roomId,
            id: userData.id,
            name: userData.name,
            img: userData.img,
            emailId: userData.email,
            about: userData.about,
            lastMsg: '',
          };

          database()
            .ref('/chatlist/' + data.id + '/' + userData.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

          delete data['password'];
          data.lastMsg = '';
          data.roomId = roomId;

          database()
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated.'));

          Navigation.navigate('SingleChat', {receiverData: data});
        } else {
          Navigation.navigate('SingleChat', {receiverData: snapshot.val()});
          console.log(snapshot.val());
        }
      });
  };

  const renderItem = ({item, index}) => (
    <ListItem
      Component={TouchableOpacity}
      onPress={() => createChatList(item)}
      containerStyle={{paddingVertical: 7, backgroundColor: ''}}>
      <Avatar
        source={{uri: item.img}}
        rounded
        title={item.name}
        size="medium"
      />
      
      <ListItem.Content>
        <ListItem.Title style={{fontFamily: FONTS.Medium, fontSize: 20}}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{fontFamily: FONTS.Regular, fontSize: 13}}
          numberOfLines={1}>
          {item.about}
        </ListItem.Subtitle>
      </ListItem.Content>
     
    </ListItem>
  );

  return (
    <Container style={{flex: 1, backgroundColor: COLORS.white}}>
      <ContactHeader />
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SearchBar
        placeholder="Search contacts"
        onChangeText={val => searchUser(val)}
        value={search}
        containerStyle={styles.searchContainer}
        inputStyle={styles.searchInput}
      />
      <FlatList
        ItemSeparatorComponent={() => (
          <View
            style={{
              backgroundColor: '#adb5bd',
              height: 1,
              width: '95%',
              alignSelf: 'center',
            }}
          />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={allUser}
        renderItem={renderItem}
      />
    </Container>
  );
};

export default Contacts;

const styles = StyleSheet.create({
  searchContainer: {
    marginHorizontal: 5,
    marginTop: 5,
    height: 50,
    backgroundColor: COLORS.lightgray,
    paddingHorizontal: 10,
    borderRadius: 40,
    marginBottom: 10,
  },
  searchInput: {
    fontSize: 15,
    fontFamily: FONTS.Regular,
    color: COLORS.black,
    opacity: 0.7,
  },
});
