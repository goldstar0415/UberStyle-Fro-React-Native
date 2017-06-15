import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

class Profile extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
      const { auth } = this.props;
      if (!auth.isAuthenticated) {
        NavigationActions.login();
      }
      console.log(this.props);

        return (
          <View style={styles.container}>
            <ScrollView style={{flexDirection:'column', marginTop: 20 }}>
              <View style={{flexDirection:'row', height: 120, borderBottomWidth: 0.2}}>
                <View style={{flexDirection:'column', alignSelf: 'center', width:Dimensions.get('window').width*2/3}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 24, marginLeft: 30}}>{auth.user.firstName}</Text>
                  <TouchableOpacity  onPress={NavigationActions.profileEdit}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 30}}>View and edit profile</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.profile_view}>
                  <Image source={require('../../img/david.jpg')} style={styles.profile}/>
                </View>
              </View>
              <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.services}>
                <Text style={styles.text}>Services</Text>
                <View style={styles.icon_view}>
                  <Image source={require('../../img/ic_briefcase.png')} style={styles.icon}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.managePhotos}>
                <Text style={styles.text}>Manage Photos</Text>
                <View style={styles.icon_view}>
                  <Image source={require('../../img/photo.png')} style={{width: 28, height: 25}}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.settings}>
                <Text style={styles.text}>Settings</Text>
                <View style={styles.icon_view}>
                  <Image source={require('../../img/settings.png')} style={styles.icon}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.help}>
                <Text style={styles.text}>Help</Text>
                <View style={styles.icon_view}>
                  <Image source={require('../../img/help.png')} style={styles.icon}/>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_view} onPress={NavigationActions.promote}>
                <Text style={styles.text}>Promote</Text>
                <View style={styles.icon_view}>
                  <Image source={require('../../img/remote.png')} style={{width: 28, height: 25}} resizeMode={'contain'}/>
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 80/2
  },
  profile_view: {
    width: Dimensions.get('window').width/3,
    alignItems: 'center',
    alignSelf: 'center'
  },
  icon: {
    width: 25,
    height: 25
  },
  text: {
    fontFamily: 'Montserrat', fontSize: 18, alignSelf: 'center', width:Dimensions.get('window').width*4/5,  marginLeft: 30
  },
  icon_view: {
    width: Dimensions.get('window').width/5 - 60,
    alignItems: 'center',
    alignSelf: 'center'
  },
  sub_view: {
    flexDirection:'row',height: 70, borderBottomWidth: 0.2
  }
});

const mapStateToProps = (state) => {
  const {auth} = state;

  return {auth};
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
