import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppHeader = ({title, onPress}) => {
  const navigtion = useNavigation();

  return (
    <View style={{height: 60, marginBottom: 20}}>
      <View style={{paddingTop: 5, backgroundColor: '#ffd31d'}}>
        <View style={styles.headerView}>
          {title === 'Messages' ? (
            <View style={{width: '10%'}}></View>
          ) : (
            <View style={{alignSelf: 'flex-start'}}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => navigtion.goBack()}>
                <Icon name="arrow-back" size={25} color="#000" />
              </TouchableOpacity>
            </View>
          )}
          <View style={{width: '80%', alignItems: 'center'}}>
            <Text style={[styles.textView, {fontSize: 25, fontWeight: 'bold'}]}>
              {title}
            </Text>
          </View>
          {title === 'Messages' ? (
            <View
              style={{width: '10%', alignItems: 'flex-end', marginRight: 10}}>
              <TouchableOpacity
                style={styles.iconView}
                onPress={() => onPress()}>
                <Icon name="logout" size={25} color="#000" />
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      </View>
    </View>
  );
};

export default AppHeader;

const styles = StyleSheet.create({
  headerView: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
  textView: {
    color: '#000',
  },
});
