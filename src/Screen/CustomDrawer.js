import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import Ionicons from "react-native-vector-icons/Ionicons"
import { COLORS } from '../Assets/Color'
import { UserContext } from '../Context/UserContext'
import { Avatar, Button, Divider, ListItem } from 'react-native-elements'
import Auth from '../Service/Auth'

const CustomDrawer = (props) => {
    const { userData, setUserData, setLogin } = useContext(UserContext);

    const logout = () => {
        Auth.logout();
        setUserData({});
        setLogin(false);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: COLORS.theme }}>

            <View>
                <Avatar
                    containerStyle={{ marginTop: 50 }}
                    size={100}
                    rounded
                    source={{ uri: userData.img }}
                />
                <View style={{ justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: -3, right: -4, paddingVertical: 4, paddingHorizontal: 6, backgroundColor: "#00FF00", borderRadius: 30 }}>
                    <Ionicons name='camera' size={25} color={"white"} />
                </View>
            </View>

            <Divider style={{ backgroundColor: "white", width: 180, height: 1, marginTop: 18 }} />

            <View style={{ width: "60%", marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
                <Ionicons name='person' size={26} color={"white"} />
                <Text style={{ left: 20, color: "white", fontSize: 20, fontFamily: "ProductSans-Medium" }} >{userData.name}</Text>
            </View>

            <View style={{ width: "60%", marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
                <Ionicons name='mail' size={26} color={"white"} />
                <Text style={{ left: 20, color: "white", fontSize: 18, fontFamily: "ProductSans-Medium" }} >{userData.emailId}</Text>
            </View>

            <View style={{ width: "60%", marginTop: 20, flexDirection: 'row', alignItems: 'center' }} >
                <Ionicons name='information-circle-outline' size={28} color={"white"} />
                <Text style={{ left: 20, color: "white", fontSize: 16, fontFamily: "ProductSans-Medium" }} >{userData.about}</Text>
            </View>

           
            <TouchableOpacity onPress={logout} style={{borderRadius:30,backgroundColor: "white",marginTop:300}} >
                <Text style={{paddingHorizontal:15,padding:10,color:COLORS.theme,fontSize:20,fontFamily:"ProductSans-Bold"}} >Logout</Text>
            </TouchableOpacity>
            

        </View>
    )
}

export default CustomDrawer