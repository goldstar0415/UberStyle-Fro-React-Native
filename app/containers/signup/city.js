import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import { Actions as NavigationActions } from 'react-native-router-flux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from '../../styles/signupStyles'

export default class city extends React.Component{

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={NavigationActions.password}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>What's your city?</Text>
          <View style={styles.number_view}>
            <TextInput
              style={styles.number}
              placeholder='City'
              autoFocus = {true}
            />
          </View>
        </View>
        <TouchableOpacity  onPress={NavigationActions.name}>
          <Image source={require('../../img/right1.png')}  style={styles.rightBtn}/>
        </TouchableOpacity>
        <KeyboardSpacer/>
      </View>
    );
  }
}
