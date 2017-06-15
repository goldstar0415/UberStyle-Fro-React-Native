import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TextInput, TouchableHighlight, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import Modal from 'react-native-modalbox';
import Switch from 'react-native-material-switch'
import CalendarPicker from 'react-native-calendar-picker';
import RadioButton from 'radio-button-react-native';

import Geocoder from 'react-native-geocoder';

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

import { setFilter, ActionCreators } from '../../../actions';

const time_of_day = [
  {label: 'Anytime', value: 0 },
  {label: 'Morning', value: 1 },
  {label: 'Afternoon', value: 2 },
  {label: 'Evening', value: 3 }
]

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


class Filters extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          choose_time: false,
          year: '',
          month: '',
          day: '',
          s_date: '',
          pre_year: '',
          pre_month: '',
          pre_day: '',
          pre_s_date: '',
          time_dataSource: ds.cloneWithRows(time_of_day),
          time_option_value: null,
          pre_time_option_value: null,
          rating_selected: 0,
          service_selected: 0,
          position: {
            lat: null,
            lng: null
          },
          error: null,
          country: null,
          locality: null,
          area: null,
          geo_value: ''
        }

    }

    setGeolocation(data, details) {
      this.setState({
        position: {
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng
        },
        geo_value: data.description,
        city_open: false,
        geo_flag: 1
      })
      if(data.terms.length == 1){
        this.setState({
          locality: data.terms[0].value,
          country: data.terms[0].value,
          area: data.terms[0].value
        })
      }else if(data.terms.length == 2){
        this.setState({
          country: data.terms[1].value,
          area: data.terms[0].value,
          locality: data.terms[0].value
        })
      }else if(data.terms.length == 3){
        this.setState({
          country: data.terms[2].value,
          locality: data.terms[0].value,
          area: data.terms[1].value
        })
      }else if(data.terms.length == 4){
        this.setState({
          country: data.terms[3].value,
          locality: data.terms[0].value,
          area: data.terms[2].value
        })
      }
    }

    getGeolocation(){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            error: null
          });
          Geocoder.geocodePosition(this.state.position).then(res => {
            this.setState({geo_value: res[0].locality + ', ' + res[0].adminArea + ', ' + res[0].country, geo_flag: 0})
          })
          .catch(err => console.log(err))
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
      this.setState({city_open: false})
    }


    onDateChange(date) {
      var year = date.getFullYear()
      var month = monthNames[date.getMonth()]
      var day = dayNames[date.getDay()]
      var s_date = date.getDate()
      this.setState({year,month,day,s_date})

    }

    timePress(value){
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      this.setState({time_option_value: value, time_dataSource: ds.cloneWithRows(time_of_day)})
    }

    time_renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.timePress(rowData.value)} >
          <View style={styles.time_sub_view}>
            <View  style={styles.time_option}>
              <RadioButton currentValue={this.state.time_option_value} value={rowData.value} onPress={() => this.timePress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
            </View>
            <Text style={{fontFamily: 'Montserrat', fontSize: 16, marginLeft: 40}}>{rowData.label}</Text>
          </View>
        </TouchableOpacity>
      )
    }

    _applyFilter() {
      var filters = {}
      filters["rating"] = this.state.rating_selected
      filters["service_location"] = this.state.service_selected
      filters["year"] = this.state.year
      filters["month"] = this.state.month
      filters["day"] = this.state.day
      this.props.setFilter(filters)
      this.setState({choose_time: false})
      NavigationActions.pop({refresh:{filters: filters}})
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{flexDirection: 'column', width:Dimensions.get('window').width, height: 110}} >
              <View style={{flexDirection: 'row', width: Dimensions.get('window').width}}>
                <TouchableOpacity onPress={() => {NavigationActions.pop(); this.setState({choose_time: false})}}>
                  <Image source={require('../../../img/close-button.png')}  style={{marginTop: 35,marginLeft: 20,width: 12,height: 12}}/>
                </TouchableOpacity>
                <TouchableOpacity style={{ position: 'absolute', right: 20, top: 32}} onPress={() => {
                  this.setState({choose_time: false,
                                  year: '',
                                  month: '',
                                  day: '',
                                  s_date: '',
                                  pre_year: '',
                                  pre_month: '',
                                  pre_day: '',
                                  pre_s_date: '',
                                  time_option_value: null,
                                  pre_time_option_value: null,
                                  rating_selected: 0,
                                  service_selected: 0,
                                  country: null,
                                  locality: null,
                                  area: null,
                                  geo_value: '',
                                  position: null,
                                  geo_flag: 2})
                }}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14,}}>Clear</Text>
                </TouchableOpacity>
              </View>
              <Text style={{fontFamily: 'Montserrat', fontSize: 20, marginTop: 25,marginLeft: 20}}>Where</Text>
            </View>
            <View style={{flexDirection: 'column', width: Dimensions.get('window').width - 40, height: 60, justifyContent: 'center', alignSelf: 'center', borderBottomWidth: 0.2}}>
              <TouchableOpacity onPress={() => this.setState({city_open: true})}>
                {
                  this.state.geo_flag == 0 ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 16}}>Current position</Text>
                  ) : this.state.geo_flag == 1 ? (
                    <View>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 16}}>{this.state.locality}</Text>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 16, color: 'gray'}}>{this.state.area + ', ' + this.state.country}</Text>
                    </View>
                  ) : (
                    <View>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 16}}>City</Text>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 16, color: 'gray'}}>Street, Country</Text>
                    </View>
                  )
                }
              </TouchableOpacity>
            </View>
            <View style={styles.each_view}>
              <View style={styles.each_title_view}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 20, position: 'absolute', left: 0}}>When</Text>
                <View style={{flexDirection: 'row', position: 'absolute', right: 0}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 13, marginRight: 10}}>Choose time</Text>
                  <Switch
                    activeBackgroundColor='#fac4b9'
                    inactiveBackgroundColor='#afafaf'
                    activeButtonColor='#f26c4f'
                    activeButtonPressedColor='#f26c4f'
                    inactiveButtonColor='#363636'
                    inactiveButtonPressedColor='#363636'
                    switchHeight={10}
                    switchWidth={25}
                    buttonRadius={8}
                    active={this.state.choose_time}
                    onChangeState={(state) => this.setState({choose_time: state})}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity disabled={this.state.choose_time ? false : true} onPress={() => this.setState({calendar_open: true, pre_year: this.state.year, pre_month: this.state.month, pre_day: this.state.day, pre_s_date: this.state.s_date})}>
                  <View style={this.state.day && this.state.month && this.state.s_date ? styles.when_selected_view : styles.when_view}>
                    <Text style={this.state.day && this.state.month && this.state.s_date ? {fontFamily: 'Montserrat', fontSize: 14, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14}}>{this.state.day && this.state.month && this.state.s_date ? (this.state.day + ', ' + this.state.month + ' ' + this.state.s_date) : 'Date'}</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity disabled={this.state.choose_time ? false : true} onPress={() => this.setState({start_open: true, pre_time_option_value: this.state.time_option_value})}>
                  <View style={this.state.time_option_value != null ? [styles.when_selected_view, {marginLeft: 6}] : [styles.when_view, {marginLeft: 6}]}>
                    <Text style={this.state.time_option_value != null ? {fontFamily: 'Montserrat', fontSize: 14, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14}}>{this.state.time_option_value != null ? (time_of_day[this.state.time_option_value].label) : 'Start'}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.each_view}>
              <View style={styles.each_title_view}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 20, position: 'absolute', left: 0}}>Rating</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.setState({rating_selected: 1})}>
                  <View style={this.state.rating_selected == 1 ? styles.rating_selected_view : styles.rating_view}>
                    <Text style={this.state.rating_selected == 1 ? {fontFamily: 'Montserrat', fontSize: 16, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 16}}>1+</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({rating_selected: 2})}>
                  <View style={this.state.rating_selected == 2 ? [styles.rating_selected_view, {marginLeft: 10}] : [styles.rating_view, {marginLeft: 10}]}>
                    <Text style={this.state.rating_selected == 2 ? {fontFamily: 'Montserrat', fontSize: 16, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 16}}>2+</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({rating_selected: 3})}>
                  <View style={this.state.rating_selected == 3 ? [styles.rating_selected_view, {marginLeft: 10}] : [styles.rating_view, {marginLeft: 10}]}>
                    <Text style={this.state.rating_selected == 3 ? {fontFamily: 'Montserrat', fontSize: 16, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 16}}>3+</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({rating_selected: 4})}>
                  <View style={this.state.rating_selected == 4 ? [styles.rating_selected_view, {marginLeft: 10}] : [styles.rating_view, {marginLeft: 10}]}>
                    <Text style={this.state.rating_selected == 4 ? {fontFamily: 'Montserrat', fontSize: 16, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 16}}>4+</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({rating_selected: 5})}>
                  <View style={this.state.rating_selected == 5 ? [styles.rating_selected_view, {marginLeft: 10}] : [styles.rating_view, {marginLeft: 10}]}>
                    <Text style={this.state.rating_selected == 5 ? {fontFamily: 'Montserrat', fontSize: 16, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 16}}>5</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.service_view}>
              <View style={styles.each_title_view}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 20, position: 'absolute', left: 0}}>Service Location</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => this.setState({service_selected: 1})}>
                  <View style={this.state.service_selected == 1 ? styles.service_selected_btn : styles.service_btn}>
                    <Image source={this.state.service_selected == 1 ? require('../../../img/home_white.png') : require('../../../img/home_black.png')}  style={{width: 25,height: 25}}/>
                    <Text style={this.state.service_selected == 1 ? {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10}}>Stylist's Home</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({service_selected: 2})}>
                  <View style={this.state.service_selected == 2 ? [styles.service_selected_btn, {marginLeft: 12}] : [styles.service_btn, {marginLeft: 12}]}>
                    <Image source={this.state.service_selected == 2 ? require('../../../img/salon_white.png') : require('../../../img/salon_black.png')}  style={{width: 25,height: 25}}/>
                    <Text style={this.state.service_selected == 2 ? {fontSize: 14, marginTop: 10, color: 'white'} : {fontSize: 14, marginTop: 10}}>Stylist's Salon</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.setState({service_selected: 3})}>
                  <View style={this.state.service_selected == 3 ? [styles.service_selected_btn, {marginLeft: 12}] : [styles.service_btn, {marginLeft: 12}]}>
                    <Image source={this.state.service_selected == 3 ? require('../../../img/car_white.png') : require('../../../img/car_black.png')}  style={{width: 25,height: 25}}/>
                    <Text style={this.state.service_selected == 3 ? {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10}}>Your Place</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.filter_btn_view} onPress={() => this._applyFilter()}>
              <Text style={styles.filter_btn}>Apply Filters</Text>
            </TouchableOpacity>

            <Modal isOpen={this.state.city_open} onClosed={() => this.setState({city_open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={styles.city_navBar} >
                <TouchableOpacity onPress={() => this.setState({city_open: false})}>
                  <Image source={require('../../../img/back_white.png')}  style={{marginTop: 40,marginLeft: 18,width: 18,height: 18}}/>
                </TouchableOpacity>
              </View>
              <View style={[styles.each_view, { height: 90, justifyContent: 'center', zIndex: 1}]}>
                <TouchableOpacity onPress={this.getGeolocation.bind(this)}>
                  <View style={{flexDirection: 'column', }}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 20, }}>Around me</Text>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 18, color: '#363636'}}>Request your geolocation</Text>
                  </View>
                </TouchableOpacity>
                <Image source={require('../../../img/marker.png')}  style={{position: 'absolute', right: 0, width: 22,height: 30}}/>
              </View>
              <GooglePlacesAutocomplete
                      placeholder='Address, city, zip code...'
                      placeholderTextColor = 'white'
                      minLength={1}
                      autoFocus={false}
                      listViewDisplayed='auto'
                      fetchDetails={true}
                      renderDescription={(row) => row.description}
                      onPress={(data, details = null) => {
                        this.setGeolocation(data, details)
                      }}
                      getDefaultValue={() => {
                        return this.state.geo_value
                      }}
                      query={{
                        key: 'AIzaSyCFQXyosWbxw95jnNtruOY4btR1ztnuXQE',
                        language: 'en',
                        types: '(cities)',
                      }}
                      styles={{
                        textInputContainer: {
                          backgroundColor: 'rgba(0,0,0,0)',
                          borderTopWidth: 0,
                          borderBottomWidth:0
                        },
                        textInput: {
                          width:Dimensions.get('window').width - 40,
                          fontFamily: 'Montserrat',
                          fontSize: 18,
                          color: 'white',
                          backgroundColor: '#63b7b7',
                          textAlign: 'left',
                          height: 50,
                          alignSelf: 'center',
                          marginTop: 20
                        },
                        listView: {
                          width:Dimensions.get('window').width - 40,
                          height: Dimensions.get('window').height,
                          alignSelf: 'center',
                          marginTop: 106
                        },
                        container: {
                          width: Dimensions.get('window').width,
                          height: Dimensions.get('window').height,
                          position: 'absolute',
                          top: 65
                        },
                        description: {
                          marginLeft: 0
                        },
                      }}
                      nearbyPlacesAPI='GooglePlacesSearch'
                      GoogleReverseGeocodingQuery={{
                      }}
                      GooglePlacesSearchQuery={{
                        rankby: 'distance',
                        types: 'food',
                      }}
                      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                      debounce={200}
                    />
            </Modal>

            <Modal isOpen={this.state.calendar_open} onClosed={() => this.setState({calendar_open: false})} style={styles.calendar_modal} position={"center"} swipeToClose={false}>
              <View style={{flexDirection: 'column', height: 430}}>
                <View style={{flexDirection: 'column', width:Dimensions.get('window').width - 60, marginBottom: 10, height: 80, justifyContent: 'center', backgroundColor: '#63b7b7'}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginLeft: 20, color: 'white'}}>{this.state.year}</Text>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 22, marginLeft: 20, color: 'white'}}>{this.state.day && this.state.month && this.state.s_date ? (this.state.day + ', ' + this.state.month + ' ' + this.state.s_date) : null}</Text>
                </View>
                <CalendarPicker
                  scaleFactor={430}
                  selectedDayColor="#63b7b7"
                  onDateChange={(date) => this.onDateChange(date)}
                />
                <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 100, alignSelf: 'center', position: 'absolute', bottom: 15}}>
                  <TouchableOpacity onPress={() => this.setState({year: '', month: '', day: '', s_date: ''})}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', right: 40}} onPress={() => this.setState({calendar_open: false, year: this.state.pre_year, month: this.state.pre_month, day: this.state.pre_day, s_date: this.state.pre_s_date})}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => this.setState({calendar_open: false})}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, }}>OK</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Modal isOpen={this.state.start_open} onClosed={() => this.setState({start_open: false})} style={styles.start_modal} position={"center"} swipeToClose={false}>
              <View style={{flexDirection: 'column', height: 320}}>
                <View style={{width:Dimensions.get('window').width - 90, marginBottom: 10, height: 60, justifyContent: 'center', backgroundColor: '#63b7b7'}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginLeft: 20, color: 'white'}}>Time Of Day</Text>
                </View>
                <ListView
                  dataSource={this.state.time_dataSource}
                  renderRow={this.time_renderRow.bind(this)}
                />
                <View style={{flexDirection: 'row', width: Dimensions.get('window').width - 140, alignSelf: 'center', position: 'absolute', bottom: 35}}>
                  <TouchableOpacity style={{position: 'absolute', right: 40}} onPress={() => this.setState({start_open: false, time_option_value: this.state.pre_time_option_value})}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => this.setState({start_open: false})}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, }}>OK</Text>
                  </TouchableOpacity>
                </View>
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
  each_view:{
    flexDirection: 'column',
    width: Dimensions.get('window').width - 40,
    height: 130,
    alignSelf: 'center',
    borderBottomWidth: 0.2
  },
  each_title_view: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    justifyContent: 'center'
  },
  when_view: {
    width: 100,
    height: 35,
    borderRadius: 2,
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  when_selected_view: {
    width: 100,
    height: 35,
    borderRadius: 2,
    backgroundColor: '#63b7b7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  rating_view: {
    width: 50,
    height: 35,
    borderRadius: 2,
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rating_selected_view: {
    width: 50,
    height: 35,
    borderRadius: 2,
    backgroundColor: '#63b7b7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  service_view: {
    flexDirection: 'column',
    width: Dimensions.get('window').width - 40,
    height: 150,
    alignSelf: 'center',
  },
  service_btn: {
    flexDirection: 'column',
    width: 100,
    height: 70,
    borderRadius: 2,
    borderWidth: 0.8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  service_selected_btn: {
    flexDirection: 'column',
    width: 100,
    height: 70,
    borderRadius: 2,
    backgroundColor: '#63b7b7',
    alignItems: 'center',
    justifyContent: 'center'
  },
  filter_btn: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  filter_btn_view: {
    width:Dimensions.get('window').width,
    height:60,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },

  city_navBar: {
    flexDirection: 'column',
    width:Dimensions.get('window').width,
    height: 125,
    backgroundColor: "#63b7b7"
  },

  calendar_modal: {
    width: Dimensions.get('window').width - 60,
    height: 430,
    alignItems: 'center', //#f1f0f0
    borderRadius: 2
  },

  start_modal: {
    width: Dimensions.get('window').width - 90,
    height: 320,
    alignItems: 'center', //#f1f0f0
    borderRadius: 2
  },

  time_sub_view: {
    flexDirection:'row',
    width: Dimensions.get('window').width - 140,
    alignSelf: 'center',
    alignItems: 'center',
    height: 50,
  },
  time_option: {
    alignSelf: 'center', position: "absolute", left: 0
  },

  text_input: {
    fontFamily: 'Montserrat',
    width:Dimensions.get('window').width - 40,
    fontSize: 18,
    color: 'white',
    backgroundColor: '#63b7b7',
    textAlign: 'left',
    height: 50,
    alignSelf: 'center',
    marginTop: 20
  },
});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (filter) => {
        dispatch(setFilter(filter));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
