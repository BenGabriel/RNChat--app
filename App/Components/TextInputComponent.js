import {StyleSheet, View, TextInput} from 'react-native';
import React from 'react';
import Colors from '../common/Colors';

const TextInputComponent = ({placeholder, onChangeText}) => {
  const [focus, setFocus] = React.useState(false);
  return (
    <View
      style={[
        styles.mainContainer,
        {
          backgroundColor: focus ? Colors.appWhite : '#e2e9f3',
          elevation: focus ? 5 : 0,
        },
      ]}>
      <TextInput
        style={[styles.textInput, {fontSize: 15}]}
        placeholder={placeholder}
        placeholderTextColor="#9097a1"
        onChangeText={text => onChangeText(text)}
        secureTextEntry={placeholder.includes('Password') ? true : false}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
    </View>
  );
};

export default TextInputComponent;

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
    borderRadius: 13,
    width: '85%',
    marginVertical: 15,
  },
  textInput: {
    paddingHorizontal: 10,
    width: '90%',
    paddingVertical: 0,
    color: '#000',
  },
});
