import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const ButtonComponent = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={() => onPress()} style={styles.button}>
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
    width: '100%',
  },
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    height: 50,
    marginBottom: 5,
    width: '85%',
    paddingHorizontal: 6,
    backgroundColor: '#ffd302',
    margin: 10,
  },
  textStyle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
