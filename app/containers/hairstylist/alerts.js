import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, AsyncStorage} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Alerts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          alert: 1
        }
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  onPress={NavigationActions.pop}>
                <Image source={require('../../img/back.png')}  style={{width: 18, height: 18}}/>
              </TouchableOpacity>
            </View>
            {
              this.state.alert == 0 ? (
                <View style={{flexDirection: 'column', width: Dimensions.get('window').width - 40, alignSelf: 'center', marginTop: 80}}>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Alerts</Text>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14 , marginTop: 10}}>No alerts</Text>
                  <View style={{width: 40, height: 1, borderBottomWidth: 0.2, marginTop: 20}}/>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14, marginTop: 20}}>Congrats! You're up to date on alerts.</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'column', width: Dimensions.get('window').width - 40, alignSelf: 'center', marginTop: 80}}>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Alerts</Text>
                  <TouchableOpacity style={{flexDirection: 'row', width: width-40, height: 100, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#d3d3d3', alignSelf: 'center', marginTop: 50}} onPress={NavigationActions.review}>
                    <Image source={require('../../img/david.jpg')} style={styles.profile}/>
                    <View style={{height: 100, justifyContent: 'center', marginLeft: 20}}>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 16}}>Please leave a review.</Text>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: '#4c4c4c'}}>Leave a review for Funda Cerit.</Text>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 12, color: '#f26c4f'}}>13 days</Text>
                    </View>
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
  },
  navBar: {
    flexDirection:'row',
    height: 60,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    position: 'absolute',
    left: 15,
    top: 30,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    alignItems: 'center',
    alignSelf: 'center',
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

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
