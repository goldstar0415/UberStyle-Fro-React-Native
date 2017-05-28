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

export default class digitcode extends React.Component{

  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      digitBtn: false
    };
  }

  _focusNextField(nextField) {
      this.refs[nextField].focus()
  }

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={NavigationActions.email}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>Enter the 4-digit code sent to you{"\n"}at (514) 449-4366</Text>
          <View style={{flexDirection:'row',marginTop:15}}>
            <View style={styles.digit_view}>
              <TextInput
                ref="1"
                style={styles.digit_number}
                placeholder='0'
                keyboardType='numeric'
                maxLength={1}
                autoFocus = {true}
                blurOnSubmit={false}
                clearTextOnFocus={false}
                onChangeText={text => {
                  if(text && text.length == 1){
                    this._focusNextField('2')
                  }else{
                    this.setState({digitBtn:false})
                  }
                }}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={() => this._focusNextField('2')}
              />
            </View>
            <View style={styles.digit_view} style={{marginLeft:12, borderBottomWidth: 1}}>
              <TextInput
                ref='2'
                style={styles.digit_number}
                placeholder='0'
                keyboardType='numeric'
                maxLength={1}
                blurOnSubmit={false}
                onChangeText={text => {
                  if(text && text.length == 1){
                    this._focusNextField('3')
                  }else{
                    this.setState({digitBtn:false})
                  }
                }}
                onSubmitEditing={() => this._focusNextField('3')}
              />
            </View>
            <View style={styles.digit_view} style={{marginLeft:12, borderBottomWidth: 1}}>
              <TextInput
                ref="3"
                style={styles.digit_number}
                placeholder='0'
                keyboardType='numeric'
                maxLength={1}
                blurOnSubmit={false}
                onChangeText={text => {
                  if(text && text.length == 1){
                    this._focusNextField('4')
                  }else{
                    this.setState({digitBtn:false})
                  }
                }}
                onSubmitEditing={() => this._focusNextField('4')}
              />
            </View>
            <View style={styles.digit_view} style={{marginLeft:12, borderBottomWidth: 1}}>
              <TextInput
                ref="4"
                style={styles.digit_number}
                placeholder='0'
                keyboardType='numeric'
                maxLength={1}
                onChangeText={text => {
                  if(text && text.length == 1){
                    this.setState({digitBtn:true})
                  }else{
                    this.setState({digitBtn:false})
                  }
                }}
              />
            </View>
          </View>
        </View>
        <View style={{flexDirection:'row'}}>
          <Text style={styles.digit_text}>Resend code in 00:24</Text>
          {
            this.state.digitBtn ? (
              <TouchableOpacity  onPress={NavigationActions.password}>
                <Image source={require('../../img/right1.png')}  style={styles.digit_rightBtn}/>
              </TouchableOpacity>
            ) : (
              <Image source={require('../../img/right_gray.png')}  style={styles.digit_rightBtn}/>
            )
          }
        </View>
        <KeyboardSpacer/>
      </View>
    );
  }
}
