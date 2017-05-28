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
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

import { Actions as NavigationActions } from 'react-native-router-flux'
import KeyboardSpacer from 'react-native-keyboard-spacer';
import styles from '../../styles/signupStyles'

class name extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      nameBtn: false,
      firstName: this.props.firstName !== undefined ? this.props.firstName : '',
      lastName: this.props.lastName !== undefined ? this.props.lastName : ''
    };
  }

  _focusNextField(nextField) {
      this.refs[nextField].focus()
  }

  register() {
    let phoneNumber = this.props.phone.replace(/\D/g,'');
    let user = {
      password: this.props.password,
      lastName: this.state.lastName,
      firstName: this.state.firstName,
      email: this.props.email,
      role: 'Client',
      phoneNumber: phoneNumber
    }
    this.props.registerClient(user).then(() => {
      const { auth } = this.props;
      if (auth.isAuthenticated) {
        NavigationActions.tabbar1();
        
      } else {
        console.log("error registering");
        console.log(user);
      }
    });
  }

  goToNextView(nextView, data) {
    nextView(data);
  }

  renderError() {
    const { auth } = this.props;
    if (auth.error) {
      return (
        <Text style={styles.error_text}>{auth.error}</Text>
      );
    }
  }

  render(){
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity onPress={() =>
              this.goToNextView(NavigationActions.password, { phone: this.props.phone, email: this.props.email, firstName: this.state.firstName, lastName: this.state.lastName })}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>What's your name?</Text>
          <View style={{flexDirection:'row',marginTop:15}}>
            <View style={styles.name_view}>
              <TextInput
                style={styles.name}
                placeholder='First'
                autoFocus = {true}
                returnKeyType = 'next'
                onSubmitEditing={() => this._focusNextField('2')}
                onChangeText={text => {
                  if(text){
                    this.setState({nameBtn:true, firstName:text})
                  }else{
                    this.setState({nameBtn:false})
                  }
                }}
                value={this.state.firstName}
              />
            </View>
            <View style={styles.name_view} style={{marginLeft: 20, borderBottomWidth:1}}>
              <TextInput
                ref='2'
                style={styles.name}
                placeholder='Last'
                onChangeText={text => {
                  if(text){
                    this.setState({nameBtn:true, lastName:text})
                  }else{
                    this.setState({nameBtn:false})
                  }
                }}
                value={this.state.lastName}
              />
            </View>
          </View>
          {this.renderError()}
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.name_bottom} style={{flexDirection:'column', marginLeft: 25, marginTop: 7, width: Dimensions.get('window').width - 110}}>
              <Text style={styles.name_text}>By continuing, I confirm that</Text>
              <Text style={styles.name_text}>I have read and agree to the</Text>
              <View style={styles.name_bottom}>
                <Text style={styles.name_hypertext}
                      onPress={() => Linking.openURL('http://google.com')}>
                  Terms of Service
                </Text>
                <Text style={styles.name_text}> and </Text>
                <Text style={styles.name_hypertext}
                      onPress={() => Linking.openURL('http://google.com')}>
                  Privacy Policy
                </Text>
                <Text style={styles.name_text}>.</Text>
              </View>
            </View>
            {
              this.state.nameBtn ? (
                <TouchableOpacity onPress={() => this.register()} /*onPress={NavigationActions.tabbar1}*/>
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

const mapStateToProps = (state) => {
  const {auth} = state;

  return {auth};
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(name)