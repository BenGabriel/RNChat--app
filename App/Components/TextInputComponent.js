import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';

const TextInputComponent = ({placeholder, onChangeText}) => {
  return (
    <View style={[styles.mainContainer, {backgroundColor: '#ccc'}]}>
      <TextInput
        style={[styles.textInput, {fontSize: 17}]}
        placeholder={placeholder}
        placeholderTextColor="#000"
        onChangeText={text => onChangeText(text)}
        secureTextEntry={placeholder == 'Enter Password' ? true : false}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
    height: 50,
    marginBottom: 10,
    width: '85%',
  },
  textInput: {
    paddingHorizontal: 10,
    width: '90%',
    paddingVertical: 0,
    color: '#000',
  },
});
