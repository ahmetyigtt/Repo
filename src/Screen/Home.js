/* eslint-disable react-hooks/exhaustive-deps */
import {Container, Icon, View} from 'native-base';
import React, {useEffect, useState, useContext} from 'react';
import {FlatList, StatusBar, StyleSheet, TouchableOpacity} from 'react-native';
import {ListItem, Avatar, Button} from 'react-native-elements';

import HomeHeader from '../Component/Header/HomeHeader';
import Navigation from '../Service/Navigation';
import database from '@react-native-firebase/database';
import {UserContext} from '../Context/UserContext';
import {FONTS} from '../Assets/Font';
import {COLORS} from '../Assets/Color';

const Home = ({navigation}) => {
  const {userData} = useContext(UserContext);

  const [chatList, setchatList] = useState([]);

  useEffect(() => {
    getChatList();
  }, []);

  const getChatList = () => {
    database()
      .ref('/chatlist/' + userData?.id)
      .on('value', snapshot => {
        if (snapshot.val() != null) {
          setchatList(Object.values(snapshot.val()));
        }
      });
  };

  const renderItem = ({item}) => (
    <ListItem
      containerStyle={{
        paddingVertical: 8,
        backgroundColor: '#E4F1E3',
      }}
      onPress={() => Navigation.navigate('SingleChat', {receiverData: item})}>
      <Avatar source={{uri: item.img}} rounded title={item.name} size={60} />
      <ListItem.Content>
        <ListItem.Title
          style={{fontFamily: 'ProductSans-Medium', fontSize: 22}}>
          {item.name}
        </ListItem.Title>
        <ListItem.Subtitle
          style={{marginTop: 5, fontFamily: FONTS.Regular, fontSize: 14}}
          numberOfLines={1}>
          {item.msgType == 'image' ? 'Photo' : item.lastMsg}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
  return (
    <Container style={{flex: 1, backgroundColor: '#E4F1E3'}}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <HomeHeader navigation={navigation} />

      <FlatList
        ItemSeparatorComponent={() => (
          <View style={{backgroundColor: '#adb5bd', height: 1,width:"95%",alignSelf:'center'}} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={chatList}
        renderItem={renderItem}
      />

      <TouchableOpacity
        style={styles.but}
        onPress={() => Navigation.navigate('Contacts')}>
        <Icon
          name="users"
          type="FontAwesome5"
          style={{color: COLORS.white, fontSize: 20}}
        />
      </TouchableOpacity>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  but: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.theme,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
