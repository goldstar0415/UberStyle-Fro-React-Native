import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var brittany = ['Fro', 'Kijiji', 'Friends/Family', "Brittany's Instagram page", "Brittany's Facebook page", 'Other']

class Finalconfirm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          yes_state: -1
        }
    }

    componentDidMount() {

    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Final Step</Text>
            </View>

            <ScrollView>
              <View style={{width: width, height: 100, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center'}}>Is this your first time booking Brittany?</Text>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 10}}>Your answer helps Brittany prepare for your appointment.</Text>
              </View>
              <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity style={this.state.answer == 0 ? [styles.answer_view, {backgroundColor: '#63b7b7'}] : styles.answer_view} onPress={() => this.setState({answer: 0})}>
                  <Text style={this.state.answer == 0 ? [styles.answer_text, {color: 'white'}] : styles.answer_text}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.answer == 1 ? [styles.answer_view, {backgroundColor: '#63b7b7', marginLeft: 25}] : [styles.answer_view, {marginLeft: 25}]} onPress={() => this.setState({answer: 1})}>
                  <Text style={this.state.answer == 1 ? [styles.answer_text, {color: 'white'}] : styles.answer_text}>No</Text>
                </TouchableOpacity>
              </View>

              {
                this.state.answer == 0 ? (
                  <View style={{width: width-40, alignSelf: 'center', alignItems: 'center'}}>
                    <Text style={{height: 40, fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 20}}>How did you hear about Brittany?</Text>
                    {
                      brittany.map((brit, i) =>
                        <TouchableOpacity key={i} style={this.state.yes_state == i ? [styles.yes_view, {backgroundColor: '#63b7b7'}] : styles.yes_view} onPress={() => this.setState({yes_state: i})}>
                          <Text style={this.state.yes_state == i ? [styles.yes_text, {color: 'white'}] : styles.yes_text}>{brit}</Text>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                ) : null
              }
            </ScrollView>

            {
              this.state.answer == 1 || this.state.yes_state != -1 ? (
                <TouchableOpacity style={styles.sBtn_view} onPress={NavigationActions.enjoy}>
                  <Text style={styles.loginBtntext}>Complete Booking</Text>
                </TouchableOpacity>
              ) : (
                <View style={[styles.sBtn_view, {backgroundColor: '#ee8169'}]}>
                  <Text style={styles.loginBtntext}>Complete Booking</Text>
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
  },
  navBar: {
    flexDirection:'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    width: width,
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
  sBtn_view: {
    width:width,
    height:50,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  answer_view: {
    width: 90,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#63b7b7'
  },
  answer_text: {
    fontSize: 13,
    fontFamily: 'Montserrat',
    textAlign: 'center'
  },
  yes_view: {
    width: width-40,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eef5f5',
    borderBottomWidth: 1,
    borderColor: 'white'
  },
  yes_text: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center'
  }
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

export default connect(mapStateToProps, mapDispatchToProps)(Finalconfirm)
