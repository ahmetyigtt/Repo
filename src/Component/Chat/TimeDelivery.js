//import liraries
import moment from 'moment';
import {Icon} from 'native-base';
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../Assets/Color';


const TimeDelivery = props => {
  const {sender, item} = props;
  return (
    <View
      style={[
        styles.mainView,
        {
            justifyContent: sender ? 'flex-end' : 'flex-start'
        },
      ]}>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
          // color: sender ? COLORS.white : COLORS.black,
          color: COLORS.white 
        }}>
        {moment(item.send_time).format('LT')}
      </Text>

      <Icon
        name={'checkmark-done'}
        type="Ionicons"
        style={{
          color: item.seen ? COLORS.black : COLORS.white,
          fontSize: 20,
          marginLeft: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

export default TimeDelivery;
