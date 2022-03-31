import {View, ActivityIndicator} from 'react-native';
import React from 'react';

const Indicator = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      }}>
      <ActivityIndicator size="large" color="#bad" />
    </View>
  );
};

export default Indicator;
