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

export default class password extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      passBtn: false,
      password: '',
    };
  }

  goToNextView(nextView, data) {
    nextView(data);
  }

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={() =>
              this.goToNextView(NavigationActions.email, { phone: this.props.phone, email: this.props.email, firstName: this.props.firstName, lastName: this.props.lastName })}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>Create your account password</Text>
          <View style={styles.number_view}>
            <TextInput
              style={styles.number}
              placeholder='Enter your password'
              password={true}
              autoFocus = {true}
              onChangeText={text => {
                if(text && text.length >= 6){
                  this.setState({passBtn:true, password:text})
                }else{
                  this.setState({passBtn:false})
                }
              }}
            />
          </View>
        </View>
        {
          this.state.passBtn ? (
            <TouchableOpacity onPress={() =>
              this.goToNextView(NavigationActions.name, { phone: this.props.phone, email: this.props.email, password: this.state.password, firstName: this.props.firstName, lastName: this.props.lastName })}>
              <Image source={require('../../img/right1.png')}  style={styles.rightBtn}/>
            </TouchableOpacity>
          ) : (
            <Image source={require('../../img/right_gray.png')}  style={styles.rightBtn}/>
          )
        }
        <KeyboardSpacer/>
      </View>
    );
  }
}
