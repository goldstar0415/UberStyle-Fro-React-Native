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

            <ScrollView>
              <View style={{width: width-40, alignSelf: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', fontWeight: 'bold', textAlign: 'center', marginTop: 25}}>Get booked online!</Text>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 5}}>This is your VIP link to your new profile</Text>
                <View style={{flexDirection: 'row', width: width-40, height: 50, alignSelf: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#d3d3d3', borderRadius: 2, marginTop: 20}}>
                  <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', color: '#63b7b7', marginLeft: 10}}>froapp.ca/donjohn</Text>
                  <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', color: '#63b7b7', position: 'absolute', right: 10}}>Copy</Text>
                </View>
                <View style={{width: width-40, height: 120, borderBottomWidth: 0.2, alignSelf: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center'}}>Share anywhere</Text>
                  <View style={{flexDirection:'row', width: width-40, alignSelf: 'center', justifyContent: 'center', marginTop: 5}}>
                    <TouchableOpacity  onPress={this.props.press}>
                      <Image source={require('../../img/facebook.png')} style={styles.social_icon} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.props.press}>
                      <Image source={require('../../img/twitter.png')} style={styles.social_icon} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.props.press}>
                      <Image source={require('../../img/gmail.png')} style={styles.social_icon} resizeMode={'contain'}/>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={this.props.press}>
                      <Image source={require('../../img/ic_SMS.png')} style={styles.social_icon} resizeMode={'contain'}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 25}}>Custom made for you</Text>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 5}}>Tap and hold to download and save to your library for use on Instagram, Facebook, etc.</Text>
                <TouchableOpacity style={{marginTop: 30}} onPress={this.props.onPress} >
                  <Image source={require('../../img/4 Taka Hair Salon-52.jpg')} style={{width: width-40, height: 240, alignSelf: 'center', justifyContent: 'center'}}>
                    <View style={{width: width-40, height: 240, alignSelf: 'center', justifyContent: 'center', backgroundColor: 'black', opacity: 0.6}}>
                      <Text style={{fontSize: 16, fontFamily: 'Montserrat', fontWeight: 'bold', textAlign: 'center', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0)'}}>Great News!</Text>
                      <View style={{width: width-80, height: 80, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0)', borderWidth: 1, borderColor: '#ffffff', marginTop: 10}}>
                        <Text style={{fontSize: 26, fontFamily: 'Montserrat', textAlign: 'center', color: '#ffffff'}}>You can now book{'\n'}me on Fro</Text>
                      </View>
                      <Text style={{fontSize: 16, fontFamily: 'Montserrat', textAlign: 'center', color: '#ffffff', backgroundColor: 'rgba(0,0,0,0)', marginTop: 10}}>froapp.ca/i/donjohn</Text>
                    </View>
                  </Image>
                </TouchableOpacity>

                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'left', marginTop: 20}}>Ready-made Caption</Text>
                <Text style={{fontSize: 12, fontFamily: 'Montserrat', textAlign: 'left', marginTop: 20, marginBottom: 50}}>Book your next appointment with me on Fro. It's super easy!{'\n'}froapp.ca /i/donjohn #froapp #bookme</Text>

              </View>
            </ScrollView>

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
