import React, { useEffect, useState, useContext } from 'react';
import {
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
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
import database from '@react-native-firebase/database';
import Auth from '../Service/Auth';
import SimpleToast from 'react-native-simple-toast'
import { UserContext } from '../Context/UserContext';
import { FONTS } from '../Assets/Font';
import { COLORS } from '../Assets/Color';

const { width, height } = Dimensions.get('window');



const Login = () => {

  const { setUserData, setLogin } = useContext(UserContext)

  const [email, setemail] = useState("");
  const [pass, setpass] = useState("");

  const loginUser = async () => {

    database()
      .ref('/users/')
      .orderByChild("emailId")
      .equalTo(email)
      .once('value')
      .then(async snapshot => {
        if (snapshot.val() == null) {
          SimpleToast.show("Invalid Email");
          return false;
        }
        let userData = Object.values(snapshot.val())[0];

        if (userData?.password != pass) {
          SimpleToast.show("Invalid Password");
          return false;
        }

        setUserData(userData); setLogin(true);
        await Auth.setAccount(userData);
        SimpleToast.show("Login Successfully");
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
        <Card
          style={{
            backgroundColor: '#fff',
            width: '90%',
            borderRadius: 15,
          }}>
          <CardItem style={styles.cardView}>
            <View style={{ flex: 1 }}>
              <Text style={{
                alignSelf: 'center',
                fontWeight: 'bold',
                color: "green",
                fontSize: 28,
                marginBottom: 15
              }}>Login</Text>

              <KeyboardAwareScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}>

                <View style={[styles.inputContainer, { marginTop: 10 }]}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="gmail"
                      type="MaterialCommunityIcons"
                      style={{
                        color: '#fff',
                        fontSize: 25,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Email"
                    keyboardType='email-address'
                    onChangeText={value => {
                      setemail(value);
                    }}
                    value={email}

                  />
                </View>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIconView}>
                    <Icon
                      name="key"
                      type="MaterialCommunityIcons"
                      style={{
                        color: '#fff',
                        fontSize: 25,
                        textAlign: 'center',
                      }}
                    />
                  </View>
                  <TextInput
                    style={styles.inputs}
                    placeholder="Enter Password"
                    underlineColorAndroid="transparent"
                    onChangeText={value => {
                      setpass(value);
                    }}
                    value={pass}

                  />
                </View>

              </KeyboardAwareScrollView>

              <TouchableOpacity
                style={styles.btn}
                onPress={() => loginUser()}
              >
                <Text style={styles.btnText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.contactView}>
                <Text style={styles.smallTxt}>New user?</Text>

                <TouchableOpacity style={{ marginLeft: 4 }}
                  onPress={() => Navigation.navigate('Register')}>
                  <Text style={styles.register}>Register Now</Text>
                </TouchableOpacity>

              </View>
              <View>

              </View>
            </View>
          </CardItem>
        </Card>
      </View>
    </Container>
  );
}

export default Login;

const styles = StyleSheet.create({
  uppercard: {
    height: height / 4,
    backgroundColor: COLORS.theme,
    borderBottomLeftRadius: height / 8,
    borderBottomRightRadius: height / 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    fontSize: 20,
    paddingBottom: 2,
  },
  btn: {
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
    paddingTop: 14,
  }
});