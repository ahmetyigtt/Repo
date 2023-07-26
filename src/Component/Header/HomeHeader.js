import { Icon } from 'native-base'
import React, { useEffect, useContext } from 'react'
import { View, Text, StyleSheet, TouchableHighlight, Touchable } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'
import { COLORS } from '../../Assets/Color'
import { FONTS } from '../../Assets/Font'
import { UserContext } from '../../Context/UserContext'
import Auth from '../../Service/Auth'
import Navigation from '../../Service/Navigation'
import { Button } from 'react-native-elements'

const HomeHeader = ({navigation}) => {
    const { userData, setUserData, setLogin } = useContext(UserContext);

    useEffect(() => {
    }, [])

 

    return (

        <View style={styles.container}>
            <Icon
                style={{
                    color: COLORS.white,
                    fontSize:40
                }}
                
                name="menu"
                type="Ionicons"
                onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.logo}>Chats</Text>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Avatar
                   onPress={() => navigation.openDrawer()}
                    source={{ uri: userData.img }}
                    rounded
                    size={45} />
            </View>
        </View>
    )
}

export default HomeHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: COLORS.theme,
        paddingVertical:8

    },
    logo: {
        fontFamily: "Poppins-Bold",
        color: COLORS.white,
        fontSize: 28,
        paddingTop:5
    },
})
