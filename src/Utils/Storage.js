import AsyncStorage from "@react-native-async-storage/async-storage";

async function get(key, defaultValue = null) {
    try {
        let value = await AsyncStorage.getItem(key);

        if (value !== null) {
            value = JSON.parse(value);
        }

        return value;

    } catch (error) {
        console.log("could not save data: " + error);
    }
}

async function set(key, value) {
    try {
        return await AsyncStorage.setItem(key,JSON.stringify(value));
    } catch (error) {
        console.log("could not save data: " + error);
    }

}

async function remove(key){}

async function clear(){
    try {
        return await AsyncStorage.clear(()=>{
            console.log("cleared");
        })
    } catch (error) {
        console.log("couldn not create data",error);
    }
}

export default {
    get,set,remove,clear
};