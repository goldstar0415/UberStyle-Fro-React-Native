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

export default class email extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email_text: this.props.email !== undefined ? this.props.email : '',
      email_flag: false
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  setEmailText(event) {
    let email_text = event.nativeEvent.text;
    this.setState({email_text})
    if (this.validateEmail(email_text)) {
      this.setState({email_flag: true})
    } else {
      this.setState({email_flag: false})
    }
  }

  goToNextView(nextView, data) {
    nextView(data);
  }

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={() =>
              this.goToNextView(NavigationActions.phonenumber, { phone: this.props.phone, email: this.state.email_text, firstName: this.props.firstName, lastName: this.props.lastName })}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>What's your email address?</Text>
          <View style={styles.number_view}>
            <TextInput
              style={styles.number}
              placeholder='name@example.com'
              keyboardType='email-address'
              autoFocus = {true}
              onChange={this.setEmailText.bind(this)}
              value={this.state.email_text}
            />
          </View>
        </View>
        {
          this.state.email_flag ? (
            <TouchableOpacity  onPress={() => this.goToNextView(NavigationActions.password, { phone: this.props.phone, email: this.state.email_text, firstName: this.props.firstName, lastName: this.props.lastName })}>
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
