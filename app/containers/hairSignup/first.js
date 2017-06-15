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
    Dimensions,
    Linking
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../../styles/hairSignupStyles'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import RoundCheckbox from 'rn-round-checkbox';

import { Actions as NavigationActions } from 'react-native-router-flux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class first extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      fnameBtn:false,
      lnameBtn:false,
      email_text: '',
      email_flag: false,
      passBtn: false,
      text: '', //Phone number
      text_flag: true,
      text_flag1: true,
      flagBtn: false,
      fname_text: '', // First Name
      lname_text: '', // Last Name
      password_text: '' // Password
    };
  }

  setFirstNameText(event) {
    let fname_text = event.nativeEvent.text;
    this.setState({fname_text})
  }

  setLastNameText(event) {
    let lname_text = event.nativeEvent.text;
    this.setState({lname_text})
  }

  setPasswordText(event) {
    let password_text = event.nativeEvent.text;
    this.setState({password_text})
  }

  setEmailText(event) {
    let email_text = event.nativeEvent.text;
    this.setState({email_text})
    if((email_text.toLowerCase()).search("@") !== -1 && ((email_text.toLowerCase()).search(".com") !== -1 || (email_text.toLowerCase()).search(".ca") !== -1 || (email_text.toLowerCase()).search(".net") !== -1)){this.setState({email_flag:true})}else{this.setState({email_flag:false})}
  }

  setPhoneNumber(event) {
    let text = event.nativeEvent.text;
    this.setState({text})
    if(this.state.text_flag && text.length == 3){
      text = '(' + text + ') '
      this.setState({text})
    }if(this.state.text_flag1 && text.length == 9){
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
    if(text.length == 14){this.setState({flagBtn:true})}else{this.setState({flagBtn:false})}
  }

  _goToNextView(nextView, data) {
    nextView(data);
  }

  render(){
    return (
      <View style={styles.mainContainer}>
        <View style={{flexDirection:'column', alignSelf: 'center', width: width-40, height: height - 420}}>
          <View style={{flexDirection: 'row', width: width-40, height: 20, alignSelf: 'center', alignItems: 'center', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f'}}/>
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#ffffff', marginLeft: 20}}/>
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#ffffff', marginLeft: 20}}/>
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#ffffff', marginLeft: 20}}/>
          </View>
          <TouchableOpacity style={{marginTop: 5}} onPress={NavigationActions.pop}>
            <Image source={require('../../img/back_white.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>First, let's create{'\n'}your account.</Text>
        </View>
        <ScrollView style={{flexDirection:'column', marginBottom:0}}>
          <View style={styles.view}>
            <Text style={styles.view_text}>First Name</Text>
            <TextInput
              style={styles.name}
              placeholder='Kadiatou'
              returnKeyType = 'next'
              onChangeText={text => {
                if(text){
                  this.setState({fnameBtn:true})
                }else{
                  this.setState({fnameBtn:false})
                }
              }}
              onChange={this.setFirstNameText.bind(this)}
              value={this.state.fname_text}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.view_text}>Last Name</Text>
            <TextInput
              style={styles.name}
              placeholder="Haidara"
              returnKeyType = 'next'
              onChangeText={text => {
                if(text){
                  this.setState({lnameBtn:true})
                }else{
                  this.setState({lnameBtn:false})
                }
              }}
              onChange={this.setLastNameText.bind(this)}
              value={this.state.lname_text}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.view_text}>Email</Text>
            <TextInput
              style={styles.name}
              placeholder="youremail@email.com"
              keyboardType='email-address'
              returnKeyType = 'next'
              onChange={this.setEmailText.bind(this)}
              value={this.state.email_text}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.view_text}>Password</Text>
            <TextInput
              style={styles.name}
              placeholder="Minimum 6 characters"
              password={true}
              returnKeyType = 'next'
              onChangeText={text => {
                if(text && text.length >= 6){
                  this.setState({passBtn:true})
                }else{
                  this.setState({passBtn:false})
                }
              }}
              onChange={this.setPasswordText.bind(this)}
              value={this.state.password_text}
            />
          </View>
          <View style={styles.view}>
            <Text style={styles.view_text}>Phone Number</Text>
            <TextInput
              style={styles.name}
              placeholder="(___) ___-____"
              maxLength={14}
              keyboardType='numeric'
              onChange={this.setPhoneNumber.bind(this)}
              value={this.state.text}
            />
          </View>
          <View style={styles.view1_bottom}>
            <View style={{flexDirection: 'column', paddingTop: 16, marginLeft: 18, width: Dimensions.get('window').width-55}}>
              <Text style={styles.p_text}>By signing up. I agree to the </Text>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.hypertext}
                      onPress={() => Linking.openURL('http://google.com')}>
                  Terms of Service
                </Text>
                <Text style={styles.p_text}> and </Text>
                <Text style={styles.hypertext}
                      onPress={() => Linking.openURL('http://google.com')}>
                  Privacy Policy
                </Text>
              </View>
            </View>
            <View style={styles.check}>
              <RoundCheckbox
                size={22}
                checked={this.state.isSelected}
                backgroundColor={'#63b7b7'}
                onValueChange={(newValue) => {
                  if(newValue){
                    this.setState({isSelected:true})
                  }else{
                    this.setState({isSelected:false})
                  }
                }}
              />
            </View>
          </View>

        </ScrollView>
        {
          this.state.fnameBtn && this.state.lnameBtn && this.state.email_flag && this.state.passBtn && this.state.flagBtn && this.state.isSelected ? (
            <TouchableOpacity onPress={() => this._goToNextView(NavigationActions.second, {first: this.state.fname_text, last: this.state.lname_text,
              email: this.state.email_text, password: this.state.password_text, phone: this.state.text})}>
              <View style={styles.sBtn_view}>
                <Text style={styles.loginBtntext}>Sign Up</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <View style={styles.sBtn_view_gray}>
              <Text style={styles.loginBtntext}>Sign Up</Text>
            </View>
          )
        }
        <KeyboardSpacer/>
      </View>
    );
  }
}
