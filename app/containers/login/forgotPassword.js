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

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';

export default class forgotPassword extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email_text: '',
      email_flag: false,
      open: false
    };
  }

  setEmailText(event) {
    let email_text = event.nativeEvent.text;
    this.setState({email_text})
    if((email_text.toLowerCase()).search("@") !== -1 && ((email_text.toLowerCase()).search(".com") !== -1 || (email_text.toLowerCase()).search(".ca") !== -1 || (email_text.toLowerCase()).search(".net") !== -1)){this.setState({email_flag:true})}else{this.setState({email_flag:false})}
  }

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={NavigationActions.login}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>Enter the email address you used to register</Text>
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
            <TouchableOpacity  onPress={() => this.setState({open: true})}>
              <Image source={require('../../img/right1.png')}  style={styles.rightBtn}/>
            </TouchableOpacity>
          ) : (
            <Image source={require('../../img/right_gray.png')}  style={styles.rightBtn}/>
          )
        }
        <KeyboardSpacer/>
        <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.modal} position={"bottom"}>
          <View style={{flexDirection:'column',alignItems:'center'}}>
            <Image source={require('../../img/mailbox.png')}  style={styles.mail_icon}/>
            <Text style={styles.modal_text}>Email sent</Text>
            <Text style={styles.modal_text_gray}>You'll receive an email from Fro{"\n"}shortly with a link to reset your{"\n"}password</Text>
            <View style={{flexDirection:'row', marginTop:40}}>
              <Button onPress={() => this.props.press} style={styles.resend_btn}>RESEND</Button>
              <Button onPress={() => {this.setState({open: false}), NavigationActions.login()}} style={styles.ok_btn}>OK</Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
