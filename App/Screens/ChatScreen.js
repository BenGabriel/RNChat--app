import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  Dimensions,
} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Indicator from '../Components/Indicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {database} from '../Firebase/firebaseConfig';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Font from 'react-native-vector-icons/FontAwesome5';
import {ReceiveMessage, SendMessage} from '../Firebase/Message';
import {child, onValue, ref} from 'firebase/database';
import ImageCropPicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';
import dayjs from 'dayjs';
import Colors from '../common/Colors';

const {width, height} = Dimensions.get('window');

const ChatScreen = ({
  navigation,
  route: {
    params: {item},
  },
}) => {
  const [message, setMessage] = React.useState('');
  const [guestUid, setGuestUid] = React.useState(item.uuid);
  const [currentUid, setCurrentUid] = React.useState('');
  const [allMessages, setAllMessages] = React.useState([]);
  const [image, setImage] = React.useState('');

  const getCurrentUid = async () => {
    const currentUid = await AsyncStorage.getItem('UID');
    setCurrentUid(currentUid);

    try {
      const query = child(
        child(ref(database, 'messages'), currentUid),
        guestUid,
      );
      onValue(query, databaseSnapahot => {
        console.log(databaseSnapahot);
        let messages = [];

        databaseSnapahot.forEach(data => {
          console.log(data.val());
          messages.push({
            sendBy: data.val().message.sender,
            receivedBy: data.val().message.receiver,
            message: data.val().message.msg,
            image: data.val().message.image,
            date: data.val().message.date,
            time: data.val().message.time,
          });
        });

        setAllMessages(messages.reverse());
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    getCurrentUid();
  }, []);

  const sendMessage = async () => {
    if (message) {
      SendMessage(currentUid, guestUid, message, '')
        .then(() => {
          setMessage('');
          item.getAllUsers();
        })
        .catch(err => console.log(err));

      ReceiveMessage(currentUid, guestUid, message, '')
        .then(() => {
          setMessage('');
        })
        .catch(err => console.log(err));
    }
  };

  const openGallery = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(images => {
      console.log(images.path);
      ImgToBase64.getBase64String(images.path)
        .then(async base64String => {
          let source = 'data:image/jpeg;base64,' + base64String;
          SendMessage(currentUid, guestUid, '', source)
            .then(() => {})
            .catch(err => console.log(err));

          ReceiveMessage(currentUid, guestUid, '', source)
            .then(() => {})
            .catch(err => console.log(err));
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fbfcff',
      }}>
      <View style={styles.top}>
        <TouchableOpacity
          style={{marginLeft: 10}}
          onPress={() => navigation.goBack()}>
          <Font name="chevron-left" size={18}  color='#555'/>
        </TouchableOpacity>
        <View
          style={{flexDirection: 'row', alignItems: 'center', marginLeft: 30}}>
          <Image
            source={{uri: item.image}}
            style={{
              width: 34,
              height: 34,
              borderRadius: 100,
            }}
          />
          <Text
            style={{
              marginLeft: 10,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#000',
            }}>
            {item.userName}
          </Text>
        </View>
      </View>
      <FlatList
        inverted
        style={{marginBottom: 60, marginHorizontal: 10}}
        data={allMessages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item}) => (
          <View
            style={{
              marginVertical: 4,
              marginHorizontal: 4,
              maxWidth: width / 1.5 + 20,
              alignSelf: currentUid === item.sendBy ? 'flex-end' : 'flex-start',
            }}>
            <View
              style={{
                borderRadius: 10,
                backgroundColor:
                  currentUid === item.sendBy ? Colors.primary : '#fff',
                overflow: 'hidden',
                elevation: 2
              }}>
              {item.image === '' ? (
                <Text
                  style={{
                    paddingVertical: 7,
                    paddingHorizontal: 10,
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: currentUid === item.sendBy ? '#fff' : '#000',
                  }}>
                  {item.message} {'  '}{' '}
                  <Text
                    style={{
                      fontSize: 10,
                    }}>
                    {item.time}
                  </Text>
                </Text>
              ) : (
                <View>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      height: 200,
                      width: width / 1.5 + 20,
                    }}
                    resizeMode="cover"
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      position: 'absolute',
                      bottom: 5,
                      right: 5,
                      color: '#fff',
                    }}>
                    {item.time}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}
      />
      <View
        style={{
          bottom: 0,
          position: 'absolute',
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            value={message}
            placeholder="Enter Message"
            placeholderTextColor="#000"
            style={{
              height: 40,
              width: '85%',
              paddingLeft: 10,
              color:'#000'
            }}
            onChangeText={text => setMessage(text)}
          />

          <TouchableOpacity
            style={{...styles.icons}}
            onPress={() => openGallery()}>
            <Font name="camera" size={20} color="#000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            ...styles.icons,
            marginLeft: 5,
            backgroundColor: Colors.primary,
            width: 38,
            height: 38,
            borderRadius: 10,
            elevation: 3
          }}
          onPress={() => sendMessage()}>
          <Icon name="send" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  icons: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    width: '100%',
    backgroundColor: '#fff',
  },
  inputContainer: {
    width: '80%',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    elevation: 3,
    borderRadius: 10,
    alignItems: 'center',
  },
});
