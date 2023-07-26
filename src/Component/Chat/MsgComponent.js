// import moment from 'moment';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable, Dimensions} from 'react-native';
import {COLORS} from '../../Assets/Color';
import {FONTS} from '../../Assets/Font';
import TimeDelivery from './TimeDelivery';
import {Image} from 'react-native-elements';

const {width, height} = Dimensions.get('window');
const MsgComponent = props => {
  const {sender, item} = props;

  return (
    <View>
      <View
        style={[styles.TriangleShapeCSS, sender ? styles.right : [styles.left]]}
      />
      <View
        style={[
          styles.masBox,
          {
            alignSelf: sender ? 'flex-end' : 'flex-start',
            backgroundColor: sender ? COLORS.theme : "#1F41BB",
          },
        ]}>
        {item.msgType === 'text' ? (
          <Text
            style={{color:COLORS.white , fontSize: 19,fontFamily:FONTS.Medium}}>
            {item.message}
          </Text>
        ) : (
          <Image
            source={{uri: item.message}}
            style={{
                
              height: 220,
              width: width / 1.5,
              resizeMode: 'cover',
            }}></Image>
        )}

        <TimeDelivery sender={sender} item={item} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  masBox: {
    alignSelf: 'flex-end',
    marginHorizontal: 10,
    maxWidth: '80%',
    paddingHorizontal: 10,
    marginVertical: 5,
    paddingTop: 8,
    borderRadius: 10,
  },
  TriangleShapeCSS: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 5,
    borderBottomWidth: 20,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  left: {
    borderBottomColor: "#1F41BB",
    left: 2,
    bottom: 10,
    transform: [{rotate: '0deg'}],
  },
  right: {
    borderBottomColor: COLORS.theme,
    right: 2,
    bottom: 5,
    transform: [{rotate: '103deg'}],
  },
});

export default MsgComponent;
