import React, { useEffect, useState } from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Animated,
  TextInput,
  Image,
} from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Icon,
} from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Navigation from '../Service/Navigation';
import uuid from "react-native-uuid";
import SimpleToast from 'react-native-simple-toast'
import database from '@react-native-firebase/database';
import { COLORS } from '../Assets/Color';
import { FONTS } from '../Assets/Font';

const { width, height } = Dimensions.get('window');

function Register() {

  const [name, setname] = useState('');
  const [email, setemail] = useState('');
  const [pass, setpass] = useState('');
  const [about, setabout] = useState('');

  const registerUser = () => {

    if (name == '' || email == '' || pass == '' || about == '') {
      SimpleToast.show("Fill in all the fields")
      return false;
    }

    let data = {
      id: uuid.v4(),
      name: name,
      emailId: email,
      password: pass,
      about: about,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMx1itTXTXLB8p4ALTTL8mUPa9TFN_m9h5VQ&usqp=CAU"
    }

    database()
      .ref('/users/'+data.id)
      .set(data)
      .then(() => {
        SimpleToast.show("Register Successfully ");
        setname("");
        setabout("");
        setemail("");
        setpass("");
        Navigation.navigate("Login");
    });


  }


  return (
    <Container>
      <StatusBar
        backgroundColor={COLORS.theme}
        barStyle="light-content"
        hidden={false}
      />
      <View style={styles.uppercard}>
      <Image
        
        style={{ width: 170,height:80,marginRight:5 }}
        source={require("../Assets/logo.png")}
      />
        <Text
          style={{
            color: '#fff',
            fontFamily: FONTS.Bold,
            fontSize: 25
          }}>
          Messenger
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <KeyboardAwareScrollView
          style={{ marginTop: 20 }}
          showsVerticalScrollIndicator={false}>
          <Card
            style={{
              backgroundColor: '#fff',
              width: width - 30,
              borderRadius: 15,
            }}>
            <CardItem style={styles.cardView}>
              <View style={{ flex: 1 }}>
                <Text style={{fontSize:28,alignSelf:'center',color:COLORS.theme,fontWeight:'bold',marginBottom:10}}>Register</Text>
               
                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="person"
                      type="Ionicons"
                      style={{
                        color: '#fff',
                        fontSize: 23,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Full Name"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setname(value)}
                    value={name}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>
                <View style={styles.inputContainer}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="gmail"
                      type="MaterialCommunityIcons"
                      style={{
                        color: '#fff',
                        fontSize: 23,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Email Id"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setemail(value)}
                    value={email}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="key"
                      type="MaterialCommunityIcons"
                      style={{
                        color: '#fff',
                        fontSize: 23,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Password"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setpass(value)}
                    value={pass}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="md-information-circle"
                      type="Ionicons"
                      style={{
                        color: '#fff',
                        fontSize: 23,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter About"
                    underlineColorAndroid="transparent"
                    onChangeText={value => setabout(value)}
                    value={about}
                    placeholderTextColor={COLORS.liteBlack}
                  />
                </View>



                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => registerUser()}>
                  <Text style={styles.btnText}>Register</Text>
                </TouchableOpacity>

                <View style={styles.contactView}>
                  <Text style={styles.smallTxt}>Existing user?</Text>
                  <TouchableOpacity
                    style={{ marginLeft: 4 }}
                    onPress={() => Navigation.navigate('Login')}>
                    <Text style={styles.register}>Login Now</Text>
                  </TouchableOpacity>
                </View>
                <View>

                </View>
              </View>
            </CardItem>
          </Card>
        </KeyboardAwareScrollView>
      </View>
    </Container>
  );
}

export default Register;

const styles = StyleSheet.create({
  uppercard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: height / 8,
    borderBottomRightRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: height / 2 - 50,
    width: '95%',
    resizeMode: 'cover',
    borderRadius: 13,
  },
  loginBtn: {
    height: 48,
    width: '95%',
    backgroundColor: COLORS.theme,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 6,
  },
  loginText: {
    color: COLORS.lightgray,
    fontSize: 18,
    fontFamily: FONTS.Regular,
  },
  buttonSec: { marginTop: 20, justifyContent: 'center', alignItems: 'center' },

  inputs: {
    fontSize: 18,
    color: "black",
    flex: 1,
    paddingLeft: 15,
    paddingVertical: 10
  },
  inputContainer: {
    borderRadius: 30,
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    marginBottom: 15,
    elevation: 5,
    borderWidth: 0.1,
  },
  inputIconView: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.theme,
    height: '100%',
    borderRadius: 30,
    alignSelf: 'center',
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    elevation: 2,
  },
  smallTxt: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.Regular,
    marginTop: 10,
    opacity: .5,
    textAlign: 'center',
  },
  
  register: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: "green",
    textDecorationLine: 'underline'
  },
  contactView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 23,
    paddingBottom: 2,
  },
  btn: {
    marginTop:10,
    alignSelf: 'center',
    backgroundColor: COLORS.theme,
    width: '50%',
    height: 50,
    borderRadius: 30,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardView: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingBottom: 20,
    paddingTop: 20,
  }
});