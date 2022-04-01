import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {Login} from '../Firebase/Login';
import Indicator from '../Components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth} from '../Firebase/firebaseConfig';
import Colors from '../common/Colors';

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
      props.navigation.replace('Dashboard');
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
        console.log(res)
        const uid = auth.currentUser.uid;
        console.log(uid);
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
    <>
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.appWhite,
        }}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.text}>
          BEN <Text style={{color: '#000'}}>DESIGNER</Text>
        </Text>
        <View style={styles.vertical} />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 110,
            width: '100%',
            padding: 10,
          }}>
          <TextInputComponent
            placeholder="Email"
            onChangeText={text => setDetails({...details, email: text})}
          />
          <TextInputComponent
            placeholder="Password"
            onChangeText={text => setDetails({...details, password: text})}
          />
          <Text
            style={{
              width: '85%',
              textAlign: 'right',
              fontSize: 12,
            }}>
            Forgot Password?
          </Text>
          <ButtonComponent
            title="Login"
            onPress={() => logintoFirebase()}
            style={{
              marginVertical: 40,
              marginBottom: 140,
            }}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('SignUp')}
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#a2a5b6',
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              Don't have an account?{' '}
              <Text
                style={{
                  fontSize: 16,
                  color: '#707787',
                }}>
                Signup
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loader ? <Indicator /> : null}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 60,
  },
  vertical: {
    borderWidth: 1.3,
    width: 45,
    borderColor: Colors.primary,
    alignSelf: 'center',
    marginTop: 5,
  },
});
