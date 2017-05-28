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

export default class phonenumber extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      text: this.props.phone !== undefined ? this.props.phone : '',
      text_flag: true,
      text_flag1: true,
      flagBtn: false
    };
  }

  setPhoneNumber(event) {
    let text = event.nativeEvent.text;
    this.setState({text})
    if(this.state.text_flag && text.length === 3){
      text = '(' + text + ') '
      this.setState({text})
    }if(this.state.text_flag1 && text.length === 9){
      text = text + '-'
      this.setState({text})
    }
    if(text.length > 3){
      this.setState({text_flag:false})
    }else{
      this.setState({text_flag:true})
    }
    if(text.length > 9){
      this.setState({text_flag1:false})
    }else{
      this.setState({text_flag1:true})
    }
    if(text.length === 14){this.setState({flagBtn:true})}else{this.setState({flagBtn:false})}
  }

  goToNextView(nextView, data) {
    nextView(data);
  }

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={this.props.data ? NavigationActions.signup : NavigationActions.login}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>Enter your mobile number</Text>
          <View style={styles.number_view}>
            <TextInput
              style={styles.number}
              placeholder='(514) 449-4366'
              keyboardType='numeric'
              maxLength={14}
              autoFocus = {true}
              onChange={this.setPhoneNumber.bind(this)}
              value={this.state.text}
            />
          </View>
        </View>
        {
          this.state.flagBtn ? (
            <TouchableOpacity  onPress={() => this.goToNextView(NavigationActions.email, { phone: this.state.text, email: this.props.email, firstName: this.props.firstName, lastName: this.props.lastName })}>
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
