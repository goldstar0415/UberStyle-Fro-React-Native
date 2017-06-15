import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TextInput, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Alert, Linking} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';

import Modal from 'react-native-modalbox';

import MapView from 'react-native-maps';
import Geocoder from 'react-native-geocoder';

import RadioButton from 'radio-button-react-native';

import stars from '../../../components/stars';

import marker_img from '../../../img/marker.png';

const cancel_options = [
  {label: "No response from hairstylist", value: 0 },
  {label: "Found a better price", value: 1 },
  {label: 'Location is too far', value: 2 },
  {label: "Time or Date doesn't work", value: 3 },
  {label: "Hairstylist asked me", value: 4 },
  {label: 'Other', value: 5 }
]

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Details extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          dataSource: ds.cloneWithRows(cancel_options),
          cancel_state: 0,
        }

    }

    componentDidMount(){
      this.getGeolocation()
    }

    getGeolocation(){
      Geocoder.geocodePosition({lat: (this.props.location)?this.props.location.latitude:37.78565, lng: (this.props.location)?this.props.location.longitude:-122.4124}).then(res => {
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

    _cancelAppointment() {
      this.props.cancelAppointment(this.props.auth.token, this.props._id, cancel_options[this.state.cancel_state].label, this.state.description).then(()=>{
        NavigationActions.pop();
      })
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

    _getDateStr(date) {
      var dateFormat = require('dateformat');
      return dateFormat(date, "ddd, mmm d, yyyy • h:MM TT");
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={{marginTop: 20}}>
              <View style={{width: width - 40, alignSelf: 'center'}}>

                <View style={{width: width - 40, height: 130, borderBottomWidth: 0.2}}>
                  <TouchableOpacity onPress={NavigationActions.pop}>
                    <Image source={require('../../../img/close-button.png')}  style={{marginTop: 10,width: 10,height: 10}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 26, marginTop: 20}}>{this.props.service.name}</Text>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>{this._getDateStr(new Date(this.props.startDatetime))}{'\n'}{this.props.status}</Text>
                </View>

                <View style={{flexDirection: 'row', width: width - 40, height: 80, alignItems: 'center', borderBottomWidth: 0.2}}>
                  <Image source={(this.props.icon)?this.props.icon:require('../../../img/stylist.png')} style={styles.profile}/>
                  <View style={styles.review_view}>
                    <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{this.props.provider.name}</Text>
                    <Image source={(this.props.star)?stars[this.props.star]:stars[4.5]} style={styles.rating_star}/>
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
                    <TouchableOpacity onPress={() => this.setState({cancel_open: true})}>
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
                  initialRegion={{latitude: (this.props.location)?this.props.location.latitude:37.78565, longitude: (this.props.location)?this.props.location.longitude:-122.4124, latitudeDelta: 0.0032, longitudeDelta: 0.0021}}
                  style = {{width: width, height: 230, alignSelf: 'center', marginTop: 10}}
                >
                  <MapView.Marker
                    image={marker_img}
                    coordinate={(this.props.location)?this.props.location:{latitude: 37.78565, longitude: -122.4124}}
                  />
                </MapView>

                <View style={styles.bottom_view}>
                  <Text style={styles.left_text}>{this.state.location}</Text>
                  <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => Linking.openURL(`http://maps.google.com/maps?q=${(this.props.location)?this.props.location.latitude:37.78565},${(this.props.location)?this.props.location.longitude:-122.4124}`)}>
                    <Text style={styles.right_text}>Open in...</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottom_view}>
                  <Text style={styles.left_text}>Total Cost</Text>
                  <TouchableOpacity style={{position: 'absolute', right: 0}}>
                    <Text style={styles.right_text}>${this.props.price}</Text>
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
                <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginTop: 40}}>Include a message for {this.props.provider.name.split(' ')[0]}</Text>
                <TextInput
                  style={styles.textinput_about}
                  multiline = {true}
                  placeholder = "Share anything that can be helpful."
                  value={this.state.description}
                  onChange={this.setDescription.bind(this)}
                />
              </View>
              <TouchableOpacity style={styles.sBtn_view} onPress={()=>this._cancelAppointment()}>
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
    height: 300,
    borderRadius: 2
  },
});


const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Details)
