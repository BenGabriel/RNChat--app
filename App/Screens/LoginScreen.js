import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Login} from '../Firebase/Login';
import Indicator from '../Components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../Firebase/firebaseConfig';

const LoginScreen = props => {
  const [details, setDetails] = React.useState({
    email: '',
    password: '',
  });

  const [loader, setLoader] = React.useState(false);

  const isLoggedIn = async () => {
    setLoader(true);
    const uid = await AsyncStorage.getItem('UID');
    if (uid) {
      props.navigation.navigate('Dashboard');
      setLoader(false);
    }
    setLoader(false);
  };

  React.useEffect(() => {
    isLoggedIn();
  }, []);

  const logintoFirebase = () => {
    if (details.email === '') {
      return alert('Please Enter email');
    }
    if (details.password === '') {
      return alert('Please Enter password');
    }
    setLoader(true);
    Login(details.email, details.password)
      .then(async res => {
        const uid = auth.currentUser.uid;
        await AsyncStorage.setItem('UID', uid);
        console.log(res);
        setLoader(false);
        props.navigation.replace('Dashboard');
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
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
      <Image
        source={require('../assets/cherry.png')}
        style={{width: 100, height: 100, borderRadius: 30, marginBottom: 20}}
      />
      <TextInputComponent
        placeholder="Enter Email"
        onChangeText={text => setDetails({...details, email: text})}
      />
      <TextInputComponent
        placeholder="Enter Password"
        onChangeText={text => setDetails({...details, password: text})}
      />
      <ButtonComponent title="Login" onPress={() => logintoFirebase()} />
      <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
        <Text
          style={{
            color: '#fff',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          New user? Click Here
        </Text>
      </TouchableOpacity>
      {loader ? <Indicator /> : null}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
