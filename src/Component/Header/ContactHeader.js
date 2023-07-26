import { Icon } from 'native-base';
import React, {useContext } from 'react';
import { View, Text, StyleSheet} from 'react-native';
import { COLORS } from '../../Assets/Color';
import { FONTS } from '../../Assets/Font';
import { Avatar } from 'react-native-elements/dist/avatar/Avatar';
import Navigation from '../../Service/Navigation';
import { UserContext } from '../../Context/UserContext';

const ContactHeader = () => {


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
   

    <Text
        style={{
            top:3,
            left:10,
            color: COLORS.white,
            fontSize: 23,
            fontFamily: FONTS.SemiBold,
        }}
    >
        Contacts
    </Text>

</View>
  )
}

export default ContactHeader;

const styles = StyleSheet.create({
    container: {
        height: 70,
        backgroundColor: COLORS.theme,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
});