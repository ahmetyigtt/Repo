
import { Icon } from 'native-base';
import React, { Component, useEffect, useContext } from 'react';
import { StatusBar,View, Text, StyleSheet, ImageBackground, TextInput, SectionList, TouchableOpacity, FlatList, KeyboardAvoidingView, SafeAreaView, Platform } from 'react-native';
import MsgComponent from '../Component/Chat/MsgComponent';
import ChatHeader from '../Component/Header/ChatHeader';
import database, { firebase } from '@react-native-firebase/database';
import SimpleToast from 'react-native-simple-toast'
import moment from 'moment';
import ImageCropPicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import { UserContext } from '../Context/UserContext';
import { COLORS } from '../Assets/Color';

const SingleChat = (props) => {



    const { userData } = useContext(UserContext)
    const { receiverData } = props.route.params;



    const [msg, setMsg] = React.useState('');
    const [disabled, setdisabled] = React.useState(false);
    const [allChat, setallChat] = React.useState([]);


    useEffect(() => {
        console.log(Date.now())
        const onChildAdd = database()
            .ref('/messages/' + receiverData.roomId)
            .on('child_added', snapshot => {
                setallChat((state) => [...state,snapshot.val()]);

            });

        // Stop listening for updates when no longer required
        return () => database().ref('/messages/' + receiverData.roomId).off('child_added', onChildAdd);
    }, [receiverData.roomId]);


    const msgvalid = txt => txt && txt.replace(/\s/g, "").length;

    const sendMsg = () => {

        if (msg == "" || msgvalid(msg) == 0) {
            SimpleToast.show("Enter a message");
            return false;
        }
        setdisabled(true);
        let msgData = {
            roomId: receiverData.roomId, // ???
            message: msg,
            from: userData.id,
            to: receiverData.id,
            sendTime: moment().format(),
            msgType: "text"
        }

        updateFirabaseMessages(msgData);

    }

    const updateFirabaseMessages = async (msgData) => {

        const newReference = database().ref('/messages/' + receiverData.roomId).push();
        msgData.id = newReference.key;
        newReference
            .set(msgData)
            .then(() => {
                let chatListUpdate = {
                    lastMsg: msgData.message,
                    sendTime: msgData.sendTime,
                    msgType: msgData.msgType
                }
                database()
                    .ref('/chatlist/' + receiverData.id + "/" + userData.id)
                    .update(chatListUpdate)
                    .then(() => console.log('Data updated.'));

                database()
                    .ref('/chatlist/' + userData.id + "/" + receiverData.id)
                    .update(chatListUpdate)
                    .then(() => console.log('Data updated.'));

                setMsg("");
                setdisabled(false);
            });
    }

    const uploadImage = async () => {

        ImageCropPicker.openPicker({

            cropping: false
        }).then(async (image) => {
            console.log("-----------------", image.path);
            let imgName = image.path.substring(image.path.lastIndexOf("/") + 1);
            let ext = imgName.split(".").pop();
            let name = imgName.split(".")[0];
            let newName = "a" + Date.now() + "." + ext;


            try {
                console.log("pathhhhh: ", image.path);
                const task = firebase.storage().ref("chatMedia/" + newName).putFile(image.path);
                task.on('state_changed', taskSnapshot => {
                    console.log(`${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`);
                });

                task.then(async () => {
                    const imgUrl = await storage().ref("chatMedia/" + newName).getDownloadURL();


                    let msgData = {
                        roomId: receiverData.roomId, // ???
                        message: imgUrl,
                        from: userData.id,
                        to: receiverData.id,
                        sendTime: moment().format(),
                        msgType: "image"
                    };

                    updateFirabaseMessages(msgData);

                });


            } catch (error) {
                console.error(error)

            }



        }).catch(err => console.warn(err));

    }



    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <ChatHeader data={receiverData} />

            <KeyboardAvoidingView style={{ flex: 1 }} >
                {/* <ImageBackground
                    source={require('../Assets/Background.jpg')}
                    style={{ flex: 1 }}
                > */}

                    <FlatList
                        inverted={true} contentContainerStyle={{ flexGrow: 1, flexDirection: 'column-reverse' }}
                        style={{ flex: 1 }}
                        data={allChat}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => {
                            return (
                                <MsgComponent
                                    sender={item.from == userData.id}
                                    item={item}
                                />
                            )
                        }}
                    />

                {/* </ImageBackground> */}

                <View
                    style={{
                        backgroundColor: COLORS.theme,
                        // height: 60,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingVertical: 8,
                        justifyContent: 'space-evenly',
                        paddingRight: 5
                    }}
                >

                    <TextInput
                        
                        underlineColorAndroid="transparent"
                        style={{
                            fontSize:20,
                            backgroundColor: COLORS.white,
                            width: '60%',
                            borderRadius: 25,
                            borderWidth: 0.5,
                            borderColor: COLORS.white,
                            paddingLeft: 30,
                            paddingRight:10,
                            color: COLORS.black,
                            
                        }}
                        placeholder="Type a message"
                        placeholderTextColor="grey"
                        value={msg}
                        onChangeText={(val) => setMsg(val)}
                    />

                    <TouchableOpacity
                        disabled={disabled}
                        // onPress={sendMsg}
                    >
                        <Icon
                            
                            style={{
                                fontSize:35,
                                color: COLORS.white
                            }}
                            name="mic"
                            type="Ionicons"
                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={disabled}
                        onPress={uploadImage}
                       
                    >
                        <Icon
                            style={{
                                // marginHorizontal: 15,
                                color: COLORS.white,
                                fontSize:35,
                            }}
                            name="attach-outline"
                            type="Ionicons"

                        />

                    </TouchableOpacity>

                    <TouchableOpacity
                        disabled={disabled}
                        onPress={sendMsg}
                    >
                        <Icon
                            style={{
                                fontSize:30,
                                color: COLORS.white
                            }}
                            name="send"
                            type="Ionicons"
                        />

                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>


        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        
        backgroundColor:"white",
        flex: 1,
    },
});

export default SingleChat;