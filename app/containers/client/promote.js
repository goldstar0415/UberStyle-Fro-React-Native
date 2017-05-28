import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform, Linking} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Promote extends React.Component {
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
                <Image source={require('../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Spread The Word</Text>
            </View>

            <View style={{width: width-40, height: 180, alignSelf: 'center', justifyContent: 'center'}}>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center'}}>Invite your friends on Fro and get a chance to win a free beauty appointment!</Text>
              <View style={{flexDirection:'row', width: width-40, alignSelf: 'center', justifyContent: 'center', marginTop: 10}}>
                <TouchableOpacity  onPress={this.props.press}>
                  <Image source={require('../../img/facebook.png')} style={styles.social_icon} resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={this.props.press}>
                  <Image source={require('../../img/gmail.png')} style={styles.social_icon} resizeMode={'contain'}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={this.props.press}>
                  <Image source={require('../../img/ic_SMS.png')} style={styles.social_icon} resizeMode={'contain'}/>
                </TouchableOpacity>
              </View>
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
  social_icon: {
    width:35, height: 35, margin: 7
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

export default connect(mapStateToProps, mapDispatchToProps)(Promote)
