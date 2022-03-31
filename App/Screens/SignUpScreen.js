import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {SignUp} from '../Firebase/SignUp';
import {auth} from '../Firebase/firebaseConfig';
import {AddUser} from '../Firebase/Users';
import Indicator from '../Components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUpScreen = props => {
  const [details, setDetails] = React.useState({
    name: '',
    email: '',
    password: '',
  });

  const [loader, setLoader] = React.useState(false);

  const signUpuser = () => {
    if (details.name === '') {
      return alert('Please Enter Name');
    }
    if (details.email === '') {
      return alert('Please Enter email');
    }
    if (details.password === '') {
      return alert('Please Enter Password');
    }
    setLoader(true);
    SignUp(details.email, details.password)
      .then(res => {
        console.log('res', res);
        AddUser(details.name, details.email, '', auth.currentUser.uid)
          .then(async res => {
            console.log('success');
            const uid = auth.currentUser.uid;
            await AsyncStorage.setItem('UID', uid);
            setLoader(false);
            props.navigation.navigate('Dashboard');
          })
          .catch(err => {
            console.log(err);
            setLoader(false);
          });
      })
      .catch(err => {
        console.log(err);
        setLoader(false);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TextInputComponent
        placeholder="Enter Name"
        onChangeText={text => setDetails({...details, name: text})}
      />
      <TextInputComponent
        placeholder="Enter Email"
        onChangeText={text => setDetails({...details, email: text})}
      />
      <TextInputComponent
        placeholder="Enter Password"
        onChangeText={text => setDetails({...details, password: text})}
      />
      <ButtonComponent title="Sign Up" onPress={() => signUpuser()} />

      {loader ? <Indicator /> : null}
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});
