import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, AsyncStorage} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {ActionCreators} from '../../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var appointment_data = []

class Alerts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          alert: 1,
          appointments: []
        }
    }

    _getAlerts() {
      this.props.getDailyBookings(this.props.auth.token).then(()=>{
        const {api} = this.props
        appointment_data = []
        if (api.dailyBookings!=undefined) {
          for(i=0; i<api.dailyBookings.length; i++) {
            let appointment = api.dailyBookings[i]
            var tmp = {}
            tmp["id"]=appointment._id,
            tmp["icon"]=(appointment.icon) ? appointment.icon : require('../../img/david.jpg');
            tmp["name"]=(appointment.user) ? appointment.user.name : "No Name";
            tmp["star"]=(appointment.star) ? appointment.star : 4.5;
            tmp["available"]=(appointment.startDatetime) ? new Date(appointment.startDatetime) : new Date();
            tmp["type"]=(appointment.service) ? appointment.service.name : "No Service";
            tmp["ability"]=(appointment.duration) ? appointment.duration+"mins" : "No Ability";
            tmp["cost"]=(appointment.cost) ? appointment.cost : 50;
            tmp["status"]=(appointment.status) ? appointment.status : "Confirmed";
            appointment_data.push(tmp)
          }
          this.setState({
            appointments: appointment_data,
          })
        }
      });
    }

    componentWillMount() {
      this._getAlerts();
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
              console.log(this.state.appointments),
              this.state.appointments == null || this.state.appointments.length == 0 ? (
                <View style={{flexDirection: 'column', width: Dimensions.get('window').width - 40, alignSelf: 'center', marginTop: 80}}>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Alerts</Text>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14 , marginTop: 10}}>No alerts</Text>
                  <View style={{width: 40, height: 1, borderBottomWidth: 0.2, marginTop: 20}}/>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14, marginTop: 20}}>Congrats! You're up to date on alerts.</Text>
                </View>
              ) : (
                <View style={{flexDirection: 'column', width: Dimensions.get('window').width - 40, alignSelf: 'center', marginTop: 80}}>
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 30, fontWeight: 'bold'}}>Alerts</Text>
                  <ScrollView>
                  {
                    this.state.appointments.map((alert, i) =>
                      <TouchableOpacity style={{flexDirection: 'row', width: width-40, height: 100, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#d3d3d3', alignSelf: 'center', marginTop: 50}} onPress={NavigationActions.review({alert:alert})}>
                        <Image source={alert.icon} style={styles.profile}/>
                        <View style={{height: 100, justifyContent: 'center', marginLeft: 20}}>
                          <Text style={{fontFamily: 'Montserrat', fontSize: 16}}>Please leave a review.</Text>
                          <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: '#4c4c4c'}}>Leave a review for {alert.name}.</Text>
                          <Text style={{fontFamily: 'Montserrat', fontSize: 12, color: '#f26c4f'}}>13 days</Text>
                        </View>
                      </TouchableOpacity>)
                  }
                  </ScrollView>
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
  const {api} = state
  const {auth} = state
    // const props = {
    // };
    return {api, auth};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
