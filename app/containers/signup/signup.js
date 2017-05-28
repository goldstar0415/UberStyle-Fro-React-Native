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
import styles from '../../styles/signupStyles'

import { Actions as NavigationActions } from 'react-native-router-flux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default class signup extends React.Component{

  render(){
    return (
      <View style={styles.mainContainer}>
        <Image source={require('../../img/background.jpg')} style={{width: width, height: height - 20, marginTop: Platform.OS === 'ios' ? 20 : 0, alignItems: 'center'}} resizeMode={'stretch'}>
          <View style={{flexDirection:'row', width: width-40, height: 40, alignSelf: 'center'}}>
            <TouchableOpacity style={{justifyContent: 'center', height: 40}} onPress={this.props.press}>
              <Image source={require('../../img/close_green.png')}  style={styles.backBtn} style={{width: 12, height: 12}}/>
            </TouchableOpacity>
            <TouchableOpacity style={{justifyContent: 'center', height: 40, position: 'absolute', right: 0}} onPress={NavigationActions.login}>
              <Text style={{fontFamily: 'Montserrat', fontSize: 16, backgroundColor: 'rgba(0,0,0,0)'}}>Log in</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.form}>
            <View style={styles.logo_view} resizeMode={'contain'}>
              <Image source={require('../../img/final_logo1.png')} style={{width: 120, height: 120}}/>
            </View>
            <View style={styles.facebook}>
              <TouchableOpacity style={styles.facebutton} onPress={this.props.onPress}>
                <Icon name='facebook'
                  size={15}
                  color='#ffffff'
                  style={styles.facebook_Btn}
                />
                <Text style={styles.facetext}>Facebook</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.google}>
              <TouchableOpacity style={styles.facebutton} onPress={this.props.onPress}>
                <Icon name='google'
                  size={15}
                  color='#ffffff'
                  style={styles.facebook_Btn}
                />
                <Text style={styles.facetext}>Google</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.google}>
              <TouchableOpacity style={styles.loginbutton} onPress={() => NavigationActions.phonenumber(true)}>
                <Text style={styles.loginBtntext}>Create Account</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.or_view}>
              <View style={styles.line}/><Text style={styles.or}>OR</Text><View style={styles.line}/>
            </View>
            <View style={[styles.google, {marginTop: 30}]}>
              <TouchableOpacity style={[styles.loginbutton, {backgroundColor: '#f26c4f'}]} onPress={NavigationActions.first}>
                <Text style={[styles.loginBtntext, {color: '#ffffff'}]}>Sign up as a beauty professional</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
          <View style={styles.bottom}>
            <Text style={styles.bottomtext}>By signing up I agree to the </Text>
            <Text style={styles.hypertext}
                  onPress={() => Linking.openURL('http://google.com')}>
              Terms of Service
            </Text>
            <Text style={styles.bottomtext}> and </Text>
            <Text style={styles.hypertext}
                  onPress={() => Linking.openURL('http://google.com')}>
              Privacy Policy
            </Text>
            <Text style={styles.bottomtext}>.</Text>
          </View>
        </Image>
      </View>
    );
  }
}
