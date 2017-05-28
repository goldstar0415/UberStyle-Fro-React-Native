import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TextInput, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Emailconfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          send_state: 0
        }
    }

    componentDidMount() {

    }

    setEmailText(event) {
      let email_text = event.nativeEvent.text;
      this.setState({email_text})
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <View style={{width: 10, height: 10, borderRadius: 10/2, backgroundColor: '#41b451'}}/>
              <View style={{width: 10, height: 10, borderRadius: 10/2, marginLeft: 5, backgroundColor: '#bdbfc1'}}/>
            </View>
            <Text style={{fontSize: 24, fontFamily: 'Montserrat', marginTop: 30, textAlign: 'center', color: '#585c5e'}}>Confirm your email</Text>
            <View style={{width: width-40, height: 50, borderBottomWidth: 1, borderColor: '#bdbfc1', alignSelf: 'center', alignItems: 'center', marginTop: 40}}>
              <TextInput
                style={{width: width-40, height: 40, fontSize: 16, fontFamily: 'Montserrat', textAlign: 'center'}}
                keyboardType='email-address'
                autoFocus = {this.state.send_state == 0 ? true : false}
                onChange={this.setEmailText.bind(this)}
                value={this.state.email_text}
              />
            </View>
            {
              this.state.send_state == 0 ? (
                <View>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', marginTop: 25, textAlign: 'center', color: '#585c5e'}}>We'll send an email to the address above.</Text>
                  <TouchableOpacity style={styles.sBtn_view} onPress={() => this.setState({send_state: 1})}>
                    <Text style={styles.loginBtntext}>Send Me an Email</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', marginTop: 25, textAlign: 'center', color: '#585c5e'}}>Tap the link in the email we sent you.</Text>
                  <TouchableOpacity style={{marginTop: 25}} onPress={() => this.setState({send_state: 0})}>
                    <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', color: '#f26c4f'}}>Change email address</Text>
                  </TouchableOpacity>
                </View>
              )
            }

          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  sBtn_view: {
    width:width-40,
    height:50,
    borderRadius: 2,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

const mapStateToProps = (state) => {
    const props = {

    };
    return props;
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Emailconfirm)
