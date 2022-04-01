import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import TextInputComponent from '../Components/TextInputComponent';
import ButtonComponent from '../Components/ButtonComponent';
import {SignUp} from '../Firebase/SignUp';
import {auth} from '../Firebase/firebaseConfig';
import {AddUser} from '../Firebase/Users';
import Indicator from '../Components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../common/Colors';
import {TouchableOpacity} from 'react-native-gesture-handler';

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
            marginTop: 80,
            width: '100%',
            padding: 10,
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

          <ButtonComponent
            title="Sign Up"
            onPress={() => signUpuser()}
            style={{
              marginVertical: 40,
              marginBottom: 140,
            }}
          />
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Login')}
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: '#a2a5b6',
                fontSize: 13,
                fontWeight: 'bold',
              }}>
              Already have an account?{' '}
              <Text
                style={{
                  fontSize: 16,
                  color: '#707787',
                }}>
                Login
              </Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {loader ? <Indicator /> : null}
    </>
  );
};

export default SignUpScreen;

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
