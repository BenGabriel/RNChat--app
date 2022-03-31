import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {auth, database} from '../Firebase/firebaseConfig';
import {child, onValue, orderByKey, query, ref} from 'firebase/database';
import {signOut} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Indicator from '../Components/Indicator';
import AppHeader from '../Components/AppHeader';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import {UpdateUserImage} from '../Firebase/Users';
import {limitToLast} from 'firebase/firestore';

const DashboardScreen = props => {
  const [allUsers, setAllUsers] = React.useState([]);
  const [loader, setLoader] = React.useState(false);
  const [image, setImage] = React.useState('');
  const [loggedInUser, setUser] = React.useState('');

  const getAllUsers = async () => {
    setLoader(true);
    try {
      await onValue(ref(database, 'users'), snapshot => {
        const uuid = auth.currentUser.uid;

        new Promise((resolve, reject) => {
          let user = [];
          let lastMessage = '';
          let lastDate = '';
          let lastTime = '';
          let properDate = '';
          snapshot.forEach(item => {
            console.log(item.val(), 'chid1');
            if (item.val().uid === uuid) {
              setUser(item.val().name);
              setImage(item.val().image);
            } else {
              let newUser = {
                userId: '',
                userName: '',
                userProPic: '',
                lastMessage: '',
                lastDate: '',
                lastTime: '',
                properDate: '',
              };

              new Promise((resolve, reject) => {
                const dbRef = child(
                  child(ref(database, 'messages'), uuid),
                  item.val().uid,
                );

                onValue(
                  query(dbRef, orderByKey(limitToLast(1))),
                  dataSnapShot => {
                    console.log(dataSnapShot.val(), 'snapshot');
                    if (dataSnapShot.val()) {
                      dataSnapShot.forEach(item => {
                        console.log(item, 'item');
                        lastMessage =
                          item.val().message.image !== ''
                            ? 'Photo'
                            : item.val().message.msg;
                        lastDate = item.val().message.date;
                        lastTime = item.val().message.time;
                        properDate =
                          item.val().message.date +
                          ' ' +
                          item.val().message.time;
                      });
                    } else {
                      lastMessage = '';
                      lastDate = '';
                      lastTime = '';
                      properDate = '';
                    }

                    newUser.userId = item.val().uid;
                    newUser.userName = item.val().name;
                    newUser.userProPic = item.val().image;
                    newUser.lastMessage = lastMessage;
                    newUser.lastDate = lastDate;
                    newUser.lastTime = lastTime;
                    newUser.properDate = properDate;

                    return resolve(newUser);
                  },
                );
              }).then(newUser => {
                user.push({
                  userName: newUser.userName,
                  uuid: newUser.userId,
                  image: newUser.userProPic,
                  lastMessage: newUser.lastMessage,
                  lastDate: newUser.lastDate,
                  lastTime: newUser.lastTime,
                  properDate: newUser.lastDate
                    ? new Date(newUser.properDate)
                    : null,
                });
                setAllUsers(user.sort((a, b) => b.properDate - a.properDate));
                setLoader(false);
              });
              return resolve(user);
            }
          });
        }).then(user => {
          setAllUsers(user.sort((a, b) => b.properDate - a.properDate));
        });
      });
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  React.useEffect(() => {
    getAllUsers();
  }, []);

  const logOut = async () => {
    await signOut(auth)
      .then(async () => {
        await AsyncStorage.removeItem('UID');
        props.navigation.replace('Login');
      })
      .catch(err => console.log(err));
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(images => {
      setLoader(true);
      ImgToBase64.getBase64String(images.path)
        .then(async base64String => {
          const uid = await AsyncStorage.getItem('UID');
          let source = 'data:image/jpeg;base64,' + base64String;
          UpdateUserImage(source, uid).then(() => {
            setImage(images.path);
            setLoader(false);
          });
        })
        .catch(err => {
          console.log(err);
          setLoader(false);
        });
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#000'}}>
      <AppHeader title="Messages" onPress={() => logOut()} />
      <FlatList
        alwaysBounceVertical={false}
        data={allUsers}
        style={{padding: 5}}
        keyExtractor={(_, index) => index.toString()}
        ListHeaderComponent={
          <View
            style={{
              height: 160,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{...styles.imageContainer, width: 80, height: 80}}
              onPress={() => openGallery()}>
              <Image
                source={{
                  uri:
                    image === ''
                      ? 'https://www.comercialmoyano.com/4706-thickbox_default/blue-italian-fashion-men-suit.jpg'
                      : image,
                }}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: 20,
              }}>
              {loggedInUser}
            </Text>
          </View>
        }
        renderItem={({item}) => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              borderBottomWidth: 0.2,
              borderColor: '#fff',
              paddingVertical: 15,
            }}
            onPress={() =>
              props.navigation.navigate('Chat', {
                item: {
                  uuid: item.uuid,
                  userName: item.userName,
                  getAllUsers: getAllUsers
                },
              })
            }>
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri:
                    item.image === ''
                      ? 'https://www.comercialmoyano.com/4706-thickbox_default/blue-italian-fashion-men-suit.jpg'
                      : item.image,
                }}
                style={{width: '100%', height: '100%'}}
                resizeMode="contain"
              />
            </View>
            <View
              style={{
                width: '70%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Text style={{color: '#fff', fontSize: 16, fontWeight: 'bold'}}>
                {item.userName}
              </Text>
              <Text style={{color: '#fff', fontSize: 12, fontWeight: '600'}}>
                {item.lastMessage}
              </Text>
            </View>
            <View
              style={{
                width: '20%',
                alignItems: 'flex-start',
                justifyContent: 'center',
                marginRight: 20,
              }}>
              <Text style={{color: '#fff', fontSize: 13, fontWeight: '400'}}>
                {item.lastTime}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {loader ? <Indicator /> : null}
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 0.2,
    borderColor: '#fff',
  },
});
