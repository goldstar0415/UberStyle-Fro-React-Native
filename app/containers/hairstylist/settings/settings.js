import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TextInput, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import Modal from 'react-native-modalbox';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Settings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          title: '',
          description: ''
        }
    }

    componentDidMount() {

    }

    setTitle(event) {
      let title = event.nativeEvent.text;
      this.setState({title})
    }

    setDescription(event) {
      let description = event.nativeEvent.text;
      this.setState({description})
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Settings</Text>
            </View>

            <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.notifications}>
              <Text style={styles.text}>Notifications</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.about}>
              <Text style={styles.text}>About</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={() => this.setState({sub_open: true, pre_title: this.state.title, pre_description: this.state.description})}>
              <Text style={styles.text}>Send Feedback</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.login}>
              <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>

            <Modal isOpen={this.state.sub_open} onClosed={() => this.setState({sub_open: false})} style={styles.sub_modal} position={"center"}>
              <View style={{flex:1}}>
                <View style={styles.star_view}>
                  <Text style={styles.star_title_text}>Send Feedback to Fro</Text>
                  <Text style={[styles.star_text, {marginTop: 5}]}>Email your feedback about the app</Text>
                </View>

                <View style={{width: width-120, alignSelf: 'center', marginTop: 10}}>
                  <Text style={[styles.star_text, {textAlign: 'left'}]}>Title</Text>
                  <View style={{width: width-120, height: 35, borderBottomWidth: 0.2}}>
                    <TextInput
                      style={{width: width-120, height: 40, fontFamily: 'Montserrat', fontSize: 14,  textAlign: 'left' }}
                      value={this.state.title}
                      onChange={this.setTitle.bind(this)}
                    />
                  </View>
                </View>

                <View style={{width: width-120, alignSelf: 'center', marginTop: 10}}>
                  <Text style={[styles.star_text, {textAlign: 'left'}]}>Description</Text>
                  <View style={{width: width-120, height: 35, borderBottomWidth: 0.2}}>
                    <TextInput
                      style={{width: width-120, height: 40, fontFamily: 'Montserrat', fontSize: 14,  textAlign: 'left' }}
                      value={this.state.description}
                      onChange={this.setDescription.bind(this)}
                    />
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: width-120, height: 40, alignSelf: 'center', marginTop: 55}}>
                  <TouchableOpacity style={{position: 'absolute', right: 135}} onPress={() => this.setState({title: this.state.pre_title, description: this.state.pre_description, sub_open: false})}>
                    <Text style={[styles.star_text, {color: '#63b7b7'}]}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => this.setState({sub_open: this.state.title == '' || this.state.description == '' ? true : false})}>
                    <Text style={[styles.star_text, {color: this.state.title == '' || this.state.description == '' ? '#bbdddd' : '#63b7b7'}]}>Send Feedback</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Modal>

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
  text: {
    fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'
  },
  sub_view: {
    flexDirection:'row', width: width-40, alignSelf: 'center', alignItems: 'center', height: 60, borderBottomWidth: 0.2
  },
  star_view: {
    width: width-120, height: 80, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
  },
  star_title_text: {
    fontFamily: 'Montserrat', fontSize: 16, textAlign: 'center'
  },
  star_text: {
    fontFamily: 'Montserrat', fontSize: 14, color: '#4c4c4c', textAlign: 'center'
  },
  sub_modal: {
    width: width - 80,
    height: 300,
    borderRadius: 2
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
