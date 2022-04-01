import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import Colors from '../common/Colors';

const ButtonComponent = ({title, onPress, style}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={[styles.button, style]}>
      <View style={styles.mainContainer}>
        <Text style={styles.textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonComponent;

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '85%',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    height: 50,
    marginBottom: 5,
    width: '100%',
    paddingHorizontal: 6,
    backgroundColor: Colors.primary,
    margin: 10,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: 'bold',
    color:Colors.white,
    textTransform:'uppercase'

  },
});
