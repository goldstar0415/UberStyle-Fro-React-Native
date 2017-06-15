import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Firststep extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }
        console.log(this.props)
    }

    componentDidMount() {

    }

    _goToAddPhoto() {
      let data = {
        "stylist_id" : this.props.stylist_id,
        "service" : this.props.service,
        "stylist_name": this.props.stylist_name
      }
      NavigationActions.addPhoto(data)
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={{width: width-40, alignSelf: 'center'}}>
              <Text style={{fontSize: 30, fontFamily: 'Montserrat', fontWeight: 'bold', color: '#484848', marginTop: 70, textAlign: 'left'}}>Get ready to book{'\n'}with {this.props.stylist_name.split(' ')[0]}</Text>
              <Text style={{fontSize: 20, fontFamily: 'Montserrat', marginTop: 10, color: '#484848', textAlign: 'left'}}>We ask everyone on Fro to confirm a few details before booking an appointment. You'll only have to do this once.</Text>
              <View style={{flexDirection: 'row', height: 80, marginTop: 60, borderBottomWidth: 0.2, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontFamily: 'Montserrat', color: '#484848', textAlign: 'left'}}>Add a profile photo</Text>
                <Image source={require('../../../../img/checked.png')}  style={{position: 'absolute', right: 0, width: 20,height: 20}}/>
              </View>
              <View style={{flexDirection: 'row', height: 80, borderBottomWidth: 0.2, alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontFamily: 'Montserrat', color: '#484848', textAlign: 'left'}}>Confirm email address</Text>
                <Image source={require('../../../../img/checked.png')}  style={{position: 'absolute', right: 0, width: 20,height: 20}}/>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={()=>this._goToAddPhoto()}>
              <View style={styles.sBtn_view}>
                <Text style={styles.loginBtntext}>Continue</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default connect(mapStateToProps, mapDispatchToProps)(Firststep)
