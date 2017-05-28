import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Calendarsync extends React.Component {
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
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Calendar Sync</Text>
              <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 32 : 12}} onPress={this.props.press}>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'}}>Update</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 60}}>Would you like to sync your current calendar{'\n'}to prevent double bookings?</Text>
              <TouchableOpacity style={{width: width-100, height: 50, borderRadius: 30, backgroundColor: '#f26c4f', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'}}>{Platform.OS === 'ios' ? 'Yes, Log into my Apple account' : 'Yes, Log into my Google account'}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={NavigationActions.pop}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', color: '#63b7b7', textAlign: 'center', marginTop: 15}}>No Thanks</Text>
              </TouchableOpacity>
              <View style={{width: width-40, height: 1, alignSelf: 'center', borderBottomWidth: 0.2, marginTop: 30}}/>
              <Text style={{fontSize: 12, fontFamily: 'Montserrat', color: 'gray', textAlign: 'center', marginTop: 30}}>Please note: Syncing your calendar will not enable{'\n'}client SMS notifications for the synced appointments.{'\n'}It will block off time from your schedule if you have{'\n'}appointments already booked.</Text>
            </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Calendarsync)
