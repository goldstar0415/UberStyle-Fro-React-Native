import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TextInput, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Alert, Linking} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {ActionCreators} from '../../../actions';
import Modal from 'react-native-modalbox';

import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import RadioButton from 'radio-button-react-native';

import stars from '../../../components/stars';

import marker_img from '../../../img/marker.png';

const cancel_options = [
  {label: "No response from Johnny", value: 0 },
  {label: 'Location is too far', value: 1 },
  {label: "Time or Date doesn't work", value: 2 },
  {label: "Deposit missing", value: 3 },
  {label: 'Other', value: 4 }
]

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Confirmed extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          dataSource: ds.cloneWithRows(cancel_options),
          cancel_state: 0,
          appointments: [
            {
              icon: require('../../../img/david1.jpeg'),
              name: 'Brandon Crownley',
              star: 4.5,
              available: 'Thu, Mar 19 • 11:00 AM',
              type: "Women's Cut",
              ability: '30 mins',
              reading: false,
              location: {
                latitude: 37.79825,
                longitude: -122.4424,
              },
            }
          ],
        }

    }

    componentDidMount(){
      this.getGeolocation()
    }

    getDates(date){
      date = new Date(date)
      var day = dayNames[date.getDay()];
      var month = monthNames[date.getMonth()];
      var dates = date.getDate();
      var year = date.getFullYear();

      var hours = date.getHours()
      hours = (hours+24)%24
      var mid='AM'
      if(hours==0){
        hours=12
      }else if(hours>12){
        hours=hours%12
        mid='PM'
      }
      if(date.getMinutes() < 10)var minutes = '0' + date.getMinutes()
      else var minutes = date.getMinutes()

      times = hours + ':' + minutes + ' ' + mid

      days = day + ', ' + month + ' ' + dates

      return times
    }

    getGeolocation(){
      Geocoder.geocodePosition({lat: this.state.appointments[0].location.latitude, lng: this.state.appointments[0].location.longitude}).then(res => {
        this.setState({location: res[0].formattedAddress})
      })
      .catch(err => console.log(err))
    }

    setDescription(event) {
      let description = event.nativeEvent.text;
      if((description.toLowerCase()).search("@") !== -1 || (description.toLowerCase()).search(".com") !== -1 || (description.toLowerCase()).search(".ca") !== -1 || (description.toLowerCase()).search(".net") !== -1){
        this.setState({description: ''})
        Alert.alert('Warning!', "You cannot write an email address, your phone number or add a website link")
      }else{
        this.setState({description})
      }
    }

    cancelPress(value){
      this.setState({sub_open: false, cancel_state: value})
    }

    renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.cancelPress(rowData.value)} >
          <View style={styles.private_sub_view}>
            <Text style={styles.private_text}>{rowData.label}</Text>
            <View  style={styles.right_arrow}>
              <RadioButton currentValue={this.state.cancel_state} value={rowData.value} onPress={() => this.cancelPress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    _cancelAppointment(){
      this.props.cancelAppointment(this.props.auth.token, this.props.data.id, cancel_options[this.state.cancel_state].label, this.state.description).then(()=>{
        this.setState({cancel_open: true})
      });
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={{marginTop: 20}}>
              <View style={{width: width - 40, alignSelf: 'center'}}>

              <View style={{width: width - 40, height: 130, borderBottomWidth: 0.2}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={NavigationActions.pop}>
                    <Image source={require('../../../img/close-button.png')}  style={{marginTop: 10,width: 10,height: 10}}/>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', top: 10, right: 0}} onPress={NavigationActions.editAppointment}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 12}}>EDIT</Text>
                  </TouchableOpacity>
                </View>
                <Text style={{fontFamily: 'Montserrat', fontSize: 26, marginTop: 20}}>{this.props.data.type}</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>{this.getDates(this.props.data.available) + ' ・ ' + this.props.data.ability}{'\n'}Pending</Text>
              </View>

                <View style={{flexDirection: 'row', width: width - 40, height: 80, alignItems: 'center', borderBottomWidth: 0.2}}>
                  <Image source={this.props.data.icon} style={styles.profile}/>
                  <View style={styles.review_view}>
                    <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{this.props.data.name}</Text>
                    <Image source={stars[this.props.data.star]} style={styles.rating_star}/>
                  </View>
                </View>

                <View style={{flexDirection: 'row', width: width - 40, height: 130, alignItems: 'center', justifyContent: 'center'}}>
                  <View style={styles.circle_view}>
                    <TouchableOpacity onPress={NavigationActions.selectDate}>
                      <Image source={require('../../../img/ic_reschedule.png')}  style={{width: 60,height: 60}}/>
                    </TouchableOpacity>
                    <Text style={styles.circle_text}>Reschedule</Text>
                  </View>
                  <View style={styles.circle_view}>
                    <TouchableOpacity onPress={() => this._cancelAppointment()}>
                      <Image source={require('../../../img/ic_cancel.png')}  style={{width: 60,height: 60}}/>
                    </TouchableOpacity>
                    <Text style={styles.circle_text}>Cancel</Text>
                  </View>
                  <View style={styles.circle_view}>
                    <TouchableOpacity onPress={NavigationActions.messageRoom}>
                      <Image source={require('../../../img/ic_message.png')}  style={{width: 60,height: 60}}/>
                    </TouchableOpacity>
                    <Text style={styles.circle_text}>Message</Text>
                  </View>
                </View>

                <MapView
                  initialRegion={{latitude: this.state.appointments[0].location.latitude, longitude: this.state.appointments[0].location.longitude, latitudeDelta: 0.0032, longitudeDelta: 0.0021}}
                  style = {{width: width, height: 230, alignSelf: 'center', marginTop: 10}}
                >
                  <MapView.Marker
                    image={marker_img}
                    coordinate={this.state.appointments[0].location}
                  />
                </MapView>

                <View style={styles.bottom_view}>
                  <Text style={styles.left_text}>{this.state.location}</Text>
                  <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => Linking.openURL(`http://maps.google.com/maps?q=${this.state.appointments[0].location.latitude},${this.state.appointments[0].location.longitude}`)}>
                    <Text style={styles.right_text}>Open in...</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottom_view}>
                  <Text style={styles.left_text}>Total</Text>
                  <TouchableOpacity style={{position: 'absolute', right: 0}}>
                    <Text style={styles.right_text}>$423 CAD</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottom_view}>
                  <Text style={styles.left_text}>Help</Text>
                  <TouchableOpacity style={{position: 'absolute', right: 0}}>
                    <Text style={styles.right_text}>Xyz</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </ScrollView>

            <Modal isOpen={this.state.cancel_open} onClosed={() => this.setState({cancel_open: false})} style={styles.container} position={"center"} swipeToClose={false}>
              <View style={{width: width - 40, alignSelf: 'center'}}>
                <TouchableOpacity onPress={() => this.setState({cancel_open: false})}>
                  <Image source={require('../../../img/close-button.png')}  style={{marginTop: 30,width: 10,height: 10}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginTop: 35}}>Please provide a reason</Text>
                <TouchableOpacity style={{flexDirection: 'row', width: width-40, height: 50, borderWidth: 1, borderColor: '#d3d3d3', alignItems: 'center', marginTop: 10}} onPress={() => this.setState({sub_open: true})}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginLeft: 10}}>{cancel_options[this.state.cancel_state].label}</Text>
                  <Image source={require('../../../img/down_aroow.png')}  style={{width: 16,height: 12, position: 'absolute', right: 10}} resizeMode={'contain'}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginTop: 40}}>Include a message for David</Text>
                <TextInput
                  style={styles.textinput_about}
                  multiline = {true}
                  placeholder = "Share anything that can be helpful."
                  value={this.state.description}
                  onChange={this.setDescription.bind(this)}
                />
              </View>
              <TouchableOpacity style={styles.sBtn_view} onPress={NavigationActions.pop}>
                <Text style={styles.loginBtntext}>Cancel Appointment</Text>
              </TouchableOpacity>
            </Modal>

            <Modal isOpen={this.state.sub_open} onClosed={() => this.setState({sub_open: false})} style={styles.modal} position={"center"}>
              <View style={{flex:1}}>
                <View style={{width: width - 100, height: 0.5, backgroundColor: '#d3d3d3', marginTop: 30}}/>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                />
              </View>
            </Modal>

          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  rating_star: {
    marginTop: 2,
    width:70,
    height:10,
  },
  review_view: {
    height: 80,
    justifyContent: 'center',
    marginLeft: 15
  },
  circle_view: {
    flexDirection: 'column', width: 100, height: 130, alignItems: 'center', justifyContent: 'center'
  },
  circle_text: {
    fontFamily: 'Montserrat', fontSize: 14, marginTop: 8
  },
  bottom_view: {
    flexDirection: 'row', width: width - 40, height: 60, alignItems: 'center', borderBottomWidth: 0.2
  },
  left_text: {
    fontFamily: 'Montserrat', fontSize: 14, width: (width - 40)*2/3
  },
  right_text: {
    fontFamily: 'Montserrat', fontSize: 14, color: '#f26c4f'
  },
  textinput_about: {
    fontFamily: 'Montserrat',
    width:width - 40,
    fontSize: 18,
    paddingLeft: 10,
    borderWidth:1,
    borderColor:'#d3d3d3',
    textAlign: 'left',
    height: 150,
    marginTop: 10
  },
  sBtn_view: {
    width:width,
    height:50,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  private_sub_view: {
    flexDirection:'row',
    width: width - 100,
    alignSelf: 'center',
    height: 40,
    borderBottomWidth: 0.2
  },
  private_text: {
    fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'
  },
  right_arrow: {
    alignSelf: 'center', position: "absolute", right: 0
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    height: 260,
    borderRadius: 2
  },
});


const mapStateToProps = (state) => {
    const {api} = state
    const {auth} = state
    return {api, auth}
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirmed)
