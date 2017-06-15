import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import stars from '../../../components/stars';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';

const { width, height } = Dimensions.get('window');

class Appointments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          index: 1,
          routes: [
            { key: '1', title: 'Past' },
            { key: '2', title: 'Upcoming' },
          ],
          hairstylist: [],
          past_hairstylist: []
        }
    }

    _getAppointmentPast() {
      this.props.actions.getPastAppointments(this.props.authState.token).then(()=>{
        const {apiState} = this.props
        this.setState({
          past_hairstylist: (apiState.bookings) ? apiState.bookings : []
        })
      })
    }

    _getAppointmentUpcoming() {
      this.props.actions.getUpcomingAppointments(this.props.authState.token).then(()=>{
        const {apiState} = this.props
        this.setState({
          hairstylist: (apiState.bookings) ? apiState.bookings : []
        })
      })
    }

    _getDateStr(date) {
      var dateFormat = require('dateformat');
      return dateFormat(date, "ddd, mmm d, yyyy • h:MM TT");
    }

    componentDidMount() {
      this._getAppointmentUpcoming();
      this._getAppointmentPast();
    }

    _handleChangeTab = (index) => {
      this.setState({ index });
    };

    _renderHeader = (props) => {
      return <TabBar {...props} style = {{backgroundColor: '#63b7b7'}} indicatorStyle = {{backgroundColor: 'white', height: 3}}/>;
    };

    _renderScene = ({ route }) => {
      switch (route.key) {
      case '1':
        return (
          this.state.past_hairstylist.length > 0 ? (
            <ScrollView style={{marginBottom: 50}}>
            {
              this.state.past_hairstylist.map((hairstyle, i) =>
                <TouchableOpacity key={i} onPress={() => NavigationActions.details(hairstyle)}>
                  <View style={styles.sub_view}>
                    <Image source={(hairstyle.icon)?hairstyle.icon:require('../../../img/stylist.png')} style={styles.profile}/>
                    <View style={styles.details_view}>
                      <View style={styles.profile_view}>
                        <View style={styles.name_view}>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{hairstyle.provider.name}</Text>
                          <View style={styles.review_view}>
                            <Image source={(hairstyle.star)?stars[hairstyle.star]:stars[4.5]} style={styles.rating_star}/>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{(hairstyle.review)?hairstyle.review: "80"} Reviews</Text>
                          </View>
                        </View>
                        <Text style={hairstyle.status == 'Completed' ? [styles.rating_text, {color: '#18e409'}] : hairstyle.status == 'Canceled' ? [styles.rating_text, {color: '#ff0606'}] : [styles.rating_text, {color: '#808080'}]}>{hairstyle.status}</Text>
                      </View>
                      <View style={styles.line_view}/>
                      <Text style={{fontFamily: 'Montserrat', marginTop: 10, textAlign: 'left', fontSize: 13}}>{this._getDateStr(new Date(hairstyle.startDatetime))}{'\n'}{hairstyle.service.name} - ${hairstyle.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            <View style={{height: 10, backgroundColor: '#f1f0f0'}}/>
            </ScrollView>):(
              <View style={{width: width, height: height-130, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../../img/ic_cal_light_grey.png')}  style={{width: 90,height: 90}}/>
                <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 22, marginTop: 20}}>No past reservations</Text>
                <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 16, marginTop: 5}}>Past reservations will be available here</Text>
                <TouchableOpacity style={styles.sBtn_view} onPress={NavigationActions.explore}>
                  <Text style={styles.loginBtntext}>Start Exploring</Text>
                </TouchableOpacity>
              </View>
          )
        )
      case '2':
        return (
          this.state.hairstylist.length > 0 ? (
            <ScrollView style={{marginBottom: 50}}>
            {
              this.state.hairstylist.map((hairstyle, i) =>
                <TouchableOpacity key={i} onPress={() => NavigationActions.details(hairstyle)}>
                  <View style={styles.sub_view}>
                    <Image source={(hairstyle.icon)?hairstyle.icon:require('../../../img/stylist.png')} style={styles.profile}/>
                    <View style={styles.details_view}>
                      <View style={styles.profile_view}>
                        <View style={styles.name_view}>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{hairstyle.provider.name}</Text>
                          <View style={styles.review_view}>
                            <Image source={(hairstyle.star)?stars[hairstyle.star]:stars[4.5]} style={styles.rating_star}/>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{(hairstyle.review)?hairstyle.review: "80"} Reviews</Text>
                          </View>
                        </View>
                        <Text style={hairstyle.status == 'Completed' ? [styles.rating_text, {color: '#18e409'}] : hairstyle.status == 'Canceled' ? [styles.rating_text, {color: '#ff0606'}] : [styles.rating_text, {color: '#808080'}]}>{hairstyle.status}</Text>
                      </View>
                      <View style={styles.line_view}/>
                      <Text style={{fontFamily: 'Montserrat', marginTop: 10, textAlign: 'left', fontSize: 13}}>{this._getDateStr(new Date(hairstyle.startDatetime))}{'\n'}{hairstyle.service.name} - ${hairstyle.price}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            <View style={{height: 10, backgroundColor: '#f1f0f0'}}/>
            </ScrollView>):(
              <View style={{width: width, height: height-130, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                <Image source={require('../../../img/ic_cal_light_grey.png')}  style={{width: 90,height: 90}}/>
                <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 22, marginTop: 20}}>No upcoming reservations</Text>
                <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 16, marginTop: 5}}>Upcoming reservations will be available here</Text>
                <TouchableOpacity style={styles.sBtn_view} onPress={NavigationActions.explore}>
                  <Text style={styles.loginBtntext}>Start Exploring</Text>
                </TouchableOpacity>
              </View>
          )
        )
          

      default:
        return null;
      }
    };
    render() {
        return (
          <View style={styles.container}>
            <TabViewAnimated
              style={{flex: 1, backgroundColor: '#f1f0f0', marginTop: 20}}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderHeader={this._renderHeader}
              onRequestChangeTab={this._handleChangeTab}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63b7b7'
  },

  sub_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
    height: 130,
    alignSelf: 'center',
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: 'white'
  },
  details_view: {
    width: Dimensions.get('window').width - 140,
    height: 130,
    alignSelf: 'center',
    marginLeft: 20
  },
  profile: {
    width: 65,
    height: 65,
    borderRadius: 65/2,
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20
  },
  profile_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 140,
    height: 45,
    alignSelf: 'center',
    marginTop: 20
  },
  name_view: {
    position: 'absolute',
    left: 0
  },
  rating_star: {
    width:70,
    height:10,
  },
  review_view: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rating_text: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    position: 'absolute',
    right: 10
  },
  line_view: {
    width:Dimensions.get('window').width-140,
    alignSelf: 'center',
    height: 1,
    borderBottomWidth: 0.2
  },
  sBtn_view: {
    width:260,
    height:50,
    borderRadius: 30,
    marginTop: 25,
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
  const { auth } = state
  const { api } = state
  const props = {
    authState: auth,
    apiState: api
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
      actions: bindActionCreators(ActionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Appointments)
