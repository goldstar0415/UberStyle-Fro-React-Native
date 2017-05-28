import React, { Component, PropTypes } from 'react';
import {
    Alert,
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

class login extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      email_flag: false,
      password: '',
      passBtn: false,
    };
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  _focusNextField(nextField) {
      this.refs[nextField].focus()
  }

  setEmailText(event) {
    let email = event.nativeEvent.text;
    this.setState({email})
    if (this.validateEmail(email)) {
      this.setState({email_flag: true})
    } else {
      this.setState({email_flag: false})
    }
  }

  loginEmail() {
    const { email, password } = this.state;
    const { auth } = this.props;  
    //this.loginEmail();
    this.props.loginUser({ email, password }).then(() => {
      const { auth } = this.props;
      if (auth.isAuthenticated) {
        if(auth.user.role === 'Client')
        {
            NavigationActions.tabbar1();
        }
        else if (auth.user.role === 'Provider')
        {
            NavigationActions.tabbar();
        }
        
      } else {
        console.log("error registering");
        console.log(user);
      }
    });
    
    /*.then(() => {
        console.log("In promise");
        console.log(auth.user.role)
        if(auth.user.role === 'Client')
        {
            console.log("here");
            NavigationActions.tabbar1();
        } else if(auth.user.role === 'Provider')
        {
            NavigationActions.tabbar();
        }
    });*/
  }

  renderError() {
    const { auth } = this.props;
    if (auth.error) {
      return (
        <Text style={styles.error_text}>{auth.error}</Text>
      );
    }
  }

  render() {

    const { auth } = this.props;
    let name = auth.user ? auth.user.firstName : "";
    return (
      <View style={styles.sub_mainContainer}>
        <View style={styles.sub_form}>
          <TouchableOpacity  onPress={NavigationActions.signup}>
            <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
          </TouchableOpacity>
          <Text style={styles.text}>Welcome back, sign in to continue</Text>
          <View style={{flexDirection:'column',marginTop:15}}>
            <View style={styles.name_view} style={{borderBottomWidth:1}}>
              <TextInput
                style={{width: Dimensions.get('window').width - 45,  height: 37}}
                placeholder='name@example.com'
                keyboardType='email-address'
                autoFocus = {true}
                returnKeyType = 'next'
                onSubmitEditing={() => this._focusNextField('2')}
                onChange={this.setEmailText.bind(this)}
                value={this.state.email}
              />
            </View>
            <View style={styles.name_view} style={{borderBottomWidth:1,marginTop:15}}>
              <TextInput
                ref='2'
                style={{width: Dimensions.get('window').width - 45,  height: 37}}
                placeholder='Enter your password'
                password={true}
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
          {this.renderError()}
          </View>
          <View style={{flexDirection:'row'}}>
            <View style={styles.name_bottom} style={{flexDirection:'column', marginLeft: 25, marginTop: 7, width: Dimensions.get('window').width - 110}}>
              <TouchableOpacity  onPress={NavigationActions.forgotPassword}>
                <Text style={{fontFamily: 'Montserrat', fontSize:14, color:'#008489'}}>
                  I forgot my password
                </Text>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => NavigationActions.phonenumber(false)}>
                <Text style={{fontFamily: 'Montserrat', fontSize:14, color:'#008489', marginTop:10}}>
                  Create an Account
                </Text>
              </TouchableOpacity>
            </View>
            {
              this.state.email_flag && this.state.passBtn ? (
                <TouchableOpacity onPress={() => this.loginEmail()}  /*onPress={NavigationActions.tabbar}*/>
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

/*const mapDispatchToProps = (dispatch) => {
  return {
    login: (email, password) => {
      dispatch(loginUser(email, password));
    },
    fetchRecipes: (ingredient) => {
      dispatch(fetchRecipes(ingredient));
    }  
  }
}*/

export default connect(mapStateToProps, mapDispatchToProps)(login)
