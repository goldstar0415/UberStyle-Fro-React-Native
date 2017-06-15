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

export default class second extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      fnameBtn:false,
      lnameBtn:false,
      email_text: '',
      email_flag: false,
      passBtn: false,
      text: '',
      text_flag: true,
      text_flag1: true,
      flagBtn: false
    };
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
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f', marginLeft: 20}}/>
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#ffffff', marginLeft: 20}}/>
            <View style={{width: (width-100)/4, height: 3, backgroundColor: '#ffffff', marginLeft: 20}}/>
          </View>
          <TouchableOpacity style={{marginTop: 5}} onPress={NavigationActions.pop}>
            <Image source={require('../../img/back_white.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>Hi {this.props.first}, which best{'\n'}describes you?</Text>
        </View>
        <View style={{flexDirection:'column', height: height, backgroundColor: '#ffffff'}}>
          <TouchableOpacity style={styles.view} onPress={() => this._goToNextView(NavigationActions.service, {first: this.props.first, last: this.props.last,
              email: this.props.email, password: this.props.password, phone: this.props.phone, provider: "Hair Stylist"})}>
            <Text style={styles.view_text}>Hair Stylist</Text>
            <Image source={require('../../img/right-arrow-black.png')}  style={{width: 18, height: 18, position: 'absolute', right: 15}} resizeMode={'contain'}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.view} onPress={() => this._goToNextView(NavigationActions.service, {first: this.props.first, last: this.props.last,
              email: this.props.email, password: this.props.password, phone: this.props.phone, provider: "Makeup Artist"})}>
            <Text style={styles.view_text}>Makeup Artist</Text>
            <Image source={require('../../img/right-arrow-black.png')}  style={{width: 18, height: 18, position: 'absolute', right: 15}} resizeMode={'contain'}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
