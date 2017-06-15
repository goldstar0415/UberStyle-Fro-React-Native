import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Enjoy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {

    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.tabbar1}>
                <Image source={require('../../../img/close.png')}  style={{width: 20,height: 20}}/>
              </TouchableOpacity>
            </View>

            <View style={{width: width, height: height, alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', fontWeight: 'bold', marginTop: 40}}>Enjoy your appointment!</Text>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: 10}}>You'll receive a confirmation email shortly.</Text>
              <Image source={require('../../../img/green_tick_turqoise.png')}  style={{width: 130,height: 130, marginTop: 50}}/>
              {/*<TouchableOpacity style={{width: 180, height: 45, backgroundColor: '#63b7b7', borderWidth: 1, borderColor: 'white', alignItems: 'center', justifyContent: 'center', marginTop: 50}}>
                <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'}}>Add to calendar</Text>
              </TouchableOpacity>*/}

              <TouchableOpacity  style={{position: 'absolute', bottom: Platform.OS === 'ios' ? 90 : 70}} onPress={NavigationActions.tabbar1}>
                <Image source={require('../../../img/close.png')}  style={{width: 40,height: 40}}/>
              </TouchableOpacity>
            </View>

          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#63b7b7"
  },
  navBar: {
    flexDirection:'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    width: width,
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Enjoy)
