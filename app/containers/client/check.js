import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import Calendar from 'react-native-calendar';

import {setCalendarState, setPressState} from '../../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var full_monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var full_dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var hours_minutes = ["12 AM", "12:15 AM", "12:30 AM", "12:45 AM", "1 AM", "1:15 AM", "1:30 AM", "1:45 AM", "2 AM", "2:15 AM", "2:30 AM", "2:45 AM", "3 AM", "3:15 AM", "3:30 AM", "3:45 AM", "4 AM", "4:15 AM", "4:30 AM", "4:45 AM", "5 AM", "5:15 AM", "5:30 AM", "5:45 AM", "6 AM", "6:15 AM", "6:30 AM", "6:45 AM", "7 AM", "7:15 AM", "7:30 AM", "7:45 AM", "8 AM", "8:15 AM", "8:30 AM", "8:45 AM", "9 AM", "9:15 AM", "9:30 AM", "9:45 AM", "10 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12 PM", "12:15 PM", "12:30 PM", "12:45 PM", "1 PM", "1:15 PM", "1:30 PM", "1:45 PM", "2 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3 PM", "3:15 PM", "3:30 PM", "3:45 PM", "4 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5 PM", "5:15 PM", "5:30 PM", "5:45 PM", "6 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8 PM", "8:15 PM", "8:30 PM", "8:45 PM", "9 PM", "9:15 PM", "9:30 PM", "9:45 PM", "10 PM", "10:15 PM", "10:30 PM", "10:45 PM", "11 PM", "11:15 PM", "11:30 PM", "11:45 PM"]

class Check extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          days: [],
          fullDays: [],
          week_step: 0,
          date_step: 0,
          day_values: [],
        }
    }

    componentDidMount() {
      this.getWeek()
    }

    getWeek(){
      var firstDay = new Date();
      var days = []
      var fullDays = []
      var day_values = []
      for(var i = this.state.week_step;i < this.state.week_step+7; i++){
        var nextWeek = new Date(firstDay.getTime() + i * 24 * 60 * 60 * 1000);
        var date = nextWeek.getDate()
        var day = dayNames[nextWeek.getDay()]
        var month = monthNames[nextWeek.getMonth()]
        var year = nextWeek.getFullYear()
        var day_value = nextWeek.getDay()
        day_values.push(day_value)
        days.push(date+' '+day)
        fullDays.push(month+' '+date+', '+year)
      }

      var nextDate = new Date(firstDay.getTime() + this.state.date_step * 24 * 60 * 60 * 1000);
      var full_month = full_monthNames[nextDate.getMonth()]
      var full_date = nextDate.getDate()
      var full_year = nextDate.getFullYear()
      var full_day = full_dayNames[nextDate.getDay()]
      var full_day_value = nextDate.getDay()
      var full_days = full_month + ' ' + full_date + ', ' + full_year

      this.setState({day_values: day_values, days: days, fullDays: fullDays, full_days: full_days, full_day: full_day, full_day_value: full_day_value})
    }

    previousButton(){
      if(this.props.calendar_state == 0){
        this.state.date_step--
      }else if(this.props.calendar_state == 1){
        this.state.week_step = this.state.week_step - 7
      }
      this.setState({week_step: this.state.week_step, date_step: this.state.date_step})
      this.getWeek()
    }
    nextButton(){
      if(this.props.calendar_state == 0){
        this.state.date_step++
      }else if(this.props.calendar_state == 1){
        this.state.week_step = this.state.week_step + 7
      }
      this.setState({week_step: this.state.week_step})
      this.getWeek()
    }

    pressPlus(){
      if(this.props.calendar_state == 0){
        this.props.setPressState(0)
      }else if(this.props.calendar_state == 1){
        this.props.setPressState(1)
      }else{
        this.props.setPressState(2)
      }
    }

    pressTime(day, time){
      if(this.props.press_state != -1){
        var date = [day, time]
        NavigationActions.manualBooking(date)
      }
    }

    render() {
      const customStyle = {
        calendarContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          height: height,
          position: 'absolute',
          top: Platform.OS === 'ios' ? 115 : 95
        },
        calendarControls: {
          height: 50,
          marginLeft: 55,
          backgroundColor: 'rgba(0,0,0,0)'
        },
        controlButton: {
          backgroundColor: 'rgba(0,0,0,0)',
          width: 50
        },
        calendarHeading: {
          height: 30,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderColor: 'gray',
          backgroundColor: 'white'
        },
        currentDayCircle: {
          backgroundColor: '#63b7b7',
        },
        currentDayText: {
          color: '#63b7b7',
        },
        dayHeading: {
          fontSize: 12,
        },
        eventIndicator: {
          backgroundColor: 'gray',
          width: 8,
          height: 8,
          borderRadius: 8/2
        },
        weekendHeading: {
          fontSize: 12,
          color: 'black',
        },
        selectedDayCircle: {
          backgroundColor: '#63b7b7',
        },
        title: {
          fontSize: 15, fontFamily: 'Montserrat', textAlign: 'center'
        },
        weekendDayText: {
          color: 'black',
        },
      }

        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 30 : 10}} onPress={NavigationActions.pop}>
                <Image source={require('../../img/close.png')}  style={{width: 20,height: 20}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Availability</Text>
            </View>
            <TouchableOpacity onPress={this.props.press}>
              <View style={styles.sBtn_view}>
                <Text style={styles.loginBtntext}>Depending on the service, availability may change</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.sBtn_view, {flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)'}]}>
              <TouchableOpacity  style={{marginLeft: 30}} onPress={() => this.previousButton()}>
                <Image source={require('../../img/left-arrow-black.png')}  style={{width: 14,height: 14}}/>
              </TouchableOpacity>
              <View style={{flexDirection: 'column'}}>
                <Text style={{width: width-133, fontSize: 15, fontFamily: 'Montserrat', textAlign: 'center'}}>{this.state.fullDays[0]+' - '+this.state.fullDays[6]}</Text>
                {
                  this.state.week_step == 0 ? (
                    <Text style={{width: width-133, fontSize: 12, fontFamily: 'Montserrat', color: 'gray', textAlign: 'center'}}>This Week</Text>
                  ) : null
                }
              </View>

              <TouchableOpacity  style={{marginRight: 25}} onPress={() => this.nextButton()}>
                <Image source={require('../../img/right-arrow-black.png')}  style={{width: 14,height: 14}}/>
              </TouchableOpacity>
            </View>

                <View style={{width: width, height: Platform.OS === 'ios' ? height - 210 : height - 215}}>
                  <View style={styles.week_view}>
                    {
                      this.state.days.map((day, i) =>
                        <Text key={i} style={this.state.week_step == 0 && i == 0 ? [styles.week_text, {color: '#63b7b7', fontWeight: 'bold'}] : styles.week_text}>{day}</Text>
                      )
                    }
                  </View>
                  <View style={{height: 5, borderBottomWidth: 1, borderColor: 'gray'}}/>

                  <ScrollView contentOffset={{ x: 0, y: 430}}>
                    <View style={{flexDirection: 'row'}}>
                      <View style={{width: 30, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}>
                      {
                        hours_minutes.map((hours, i) =>
                          i % 4 == 0 ?
                            <View key={i} style={{height: 48, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.2}}>
                              <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 8, width: 15}}>{hours}</Text>
                            </View>
                          : null
                        )
                      }
                      </View>
                      <View style={{flexDirection: 'row', width: width-30}}>
                        {
                          this.state.days.map((day, j) =>
                            <View key={j} style={{flexDirection: 'column'}}>
                              {
                                hours_minutes.map((hours, i) =>
                                  this.state.day_values[j] == 0 ?
                                    this.props.value12 <= i/2 && this.props.value13 > i/2 && this.props.checked7 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : this.state.day_values[j] == 1 ?
                                    this.props.value0 <= i/2 && this.props.value1 > i/2 && this.props.checked1 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : this.state.day_values[j] == 2 ?
                                    this.props.value2 <= i/2 && this.props.value3 > i/2 && this.props.checked2 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : this.state.day_values[j] == 3 ?
                                    this.props.value4 <= i/2 && this.props.value5 > i/2 && this.props.checked3 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : this.state.day_values[j] == 4 ?
                                    this.props.value6 <= i/2 && this.props.value7 > i/2 && this.props.checked4 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : this.state.day_values[j] == 5 ?
                                    this.props.value8 <= i/2 && this.props.value9 > i/2 && this.props.checked5 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : this.state.day_values[j] == 6 ?
                                    this.props.value10 <= i/2 && this.props.value11 > i/2 && this.props.checked6 == true ?
                                      <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                    : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#f9f9f9'}] : [styles.day_view, {backgroundColor: '#f9f9f9'}]}/>
                                  : null
                                )
                              }
                            </View>
                          )
                        }
                      </View>
                    </View>
                  </ScrollView>

                </View>

              <View style={{flexDirection: 'row', width: width, height: 50, alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: 12, height: 12, backgroundColor: '#9bd01a'}}/>
                <Text style={{fontSize: 15, fontFamily: 'Montserrat', textAlign: 'center', marginLeft: 10}}>Available Time Slots</Text>
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
  navBar_view: {
    flexDirection: 'row',
    width: 210,
    height: 27,
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: Platform.OS === 'ios' ? 15 : 0
  },
  nav_touch: {
    width: 70,
    height: 27,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  nav_text: {
    fontSize: 13,
    fontFamily: 'Montserrat',
    backgroundColor: 'rgba(0,0,0,0)',
    textAlign: 'center'
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
    fontSize: 14,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  week_view: {
    flexDirection: 'row',
    width: width - 30,
    height: 30,
    marginLeft: 30,
    alignItems: 'center',
  },
  week_text: {
    width: (width-32)/7,
    fontSize: 12,
    fontFamily: 'Montserrat',
    textAlign: 'center'
  },
  day_view: {
    width: (width-30)/7,
    height: 12,
    borderBottomWidth: 0.8,
    borderRightWidth: 0.8,
    borderColor: '#d3d3d3',
    backgroundColor: '#9bd01a'
  },
  day_sub_view: {
    width: width-50,
    height: 20,
    borderBottomWidth: 1,
    borderColor: 'gray'
  },
  day_text: {
    width: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  }
});

const mapStateToProps = (state) => {
    const props = {
      value0: state.hours.value0,
      value1: state.hours.value1,
      value2: state.hours.value2,
      value3: state.hours.value3,
      value4: state.hours.value4,
      value5: state.hours.value5,
      value6: state.hours.value6,
      value7: state.hours.value7,
      value8: state.hours.value8,
      value9: state.hours.value9,
      value10: state.hours.value10,
      value11: state.hours.value11,
      value12: state.hours.value12,
      value13: state.hours.value13,
      checked1: state.hours.checked1,
      checked2: state.hours.checked2,
      checked3: state.hours.checked3,
      checked4: state.hours.checked4,
      checked5: state.hours.checked5,
      checked6: state.hours.checked6,
      checked7: state.hours.checked7,
      calendar_state: state.calendar.calendar_state,
      press_state: state.calendar.press_state
    };
    return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
      setCalendarState: (calendar_state) => {
          dispatch(setCalendarState(calendar_state));
      },
      setPressState: (press_state) => {
          dispatch(setPressState(press_state));
      },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Check)
