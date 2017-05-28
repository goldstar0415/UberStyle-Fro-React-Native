import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

class Inbox extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
          <View style={styles.container}>
            <Image source={require('../../img/black_message.png')} style={styles.background}>
              <Text style={styles.title_text}>Messages</Text>
              <View style={styles.sub_form}>
                <Text style={styles.modal_text}>No Messages Yet</Text>
                <Text style={styles.modal_text_gray}>When you find a beauty professional you love, connect with her. Tell her a bit about yourself and the beauty appointment you want to book.</Text>
                <TouchableOpacity onPress={NavigationActions.explore}>
                  <View style={styles.btn_view}>
                    <Text style={styles.text_btn}>Start Exploring</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Image>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    marginTop: 20
  },
  title_text: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    left: 18,
    top: 25,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  sub_form: {
    flexDirection:'column',
    alignItems:'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width-40,
    height: 220,
    borderRadius: 3,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 95
  },
  modal_text: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    height: 40
  },
  modal_text_gray: {
    width: Dimensions.get('window').width-80,
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#242424',
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  text_btn: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  btn_view: {
    width: 170,
    height: 40,
    backgroundColor: '#f26c4f',
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  }
});


export default Inbox;
