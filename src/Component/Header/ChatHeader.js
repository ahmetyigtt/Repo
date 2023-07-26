import { Icon } from 'native-base';
import React, { Component, useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Platform } from 'react-native';
import moment from 'moment';
import { COLORS } from '../../Assets/Color';
import { FONTS } from '../../Assets/Font';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import Navigation from '../../Service/Navigation';
import { UserContext } from '../../Context/UserContext';


const ChatHeader = (props) => {
    const { data } = props;


    const { userData } = useContext(UserContext)
    const [lastSeen, setlastSeen] = useState('')

    return (
        <View style={styles.container}>

            
            <Icon
                style={{
                    marginHorizontal: 10,
                    color: COLORS.white,
                }}
                name="chevron-back"
                type="Ionicons"
                onPress={() => Navigation.back()}
            />
            <Avatar

                source={{ uri: data.img }}
                rounded
                size={45}
            />

            <Text
                style={{
                    top:3,
                    left:10,
                    color: COLORS.white,
                    fontSize: 23,
                    fontFamily: FONTS.SemiBold,
                }}
            >
                {data.name}
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 75,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});

export default ChatHeader;