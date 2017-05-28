import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import Calendar from 'react-native-calendar';

import {setCalendarState, setPressState} from '../../../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

var full_monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var full_dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

var hours_minutes = ["12 AM", "12:15 AM", "12:30 AM", "12:45 AM", "1 AM", "1:15 AM", "1:30 AM", "1:45 AM", "2 AM", "2:15 AM", "2:30 AM", "2:45 AM", "3 AM", "3:15 AM", "3:30 AM", "3:45 AM", "4 AM", "4:15 AM", "4:30 AM", "4:45 AM", "5 AM", "5:15 AM", "5:30 AM", "5:45 AM", "6 AM", "6:15 AM", "6:30 AM", "6:45 AM", "7 AM", "7:15 AM", "7:30 AM", "7:45 AM", "8 AM", "8:15 AM", "8:30 AM", "8:45 AM", "9 AM", "9:15 AM", "9:30 AM", "9:45 AM", "10 AM", "10:15 AM", "10:30 AM", "10:45 AM", "11 AM", "11:15 AM", "11:30 AM", "11:45 AM", "12 PM", "12:15 PM", "12:30 PM", "12:45 PM", "1 PM", "1:15 PM", "1:30 PM", "1:45 PM", "2 PM", "2:15 PM", "2:30 PM", "2:45 PM", "3 PM", "3:15 PM", "3:30 PM", "3:45 PM", "4 PM", "4:15 PM", "4:30 PM", "4:45 PM", "5 PM", "5:15 PM", "5:30 PM", "5:45 PM", "6 PM", "6:15 PM", "6:30 PM", "6:45 PM", "7 PM", "7:15 PM", "7:30 PM", "7:45 PM", "8 PM", "8:15 PM", "8:30 PM", "8:45 PM", "9 PM", "9:15 PM", "9:30 PM", "9:45 PM", "10 PM", "10:15 PM", "10:30 PM", "10:45 PM", "11 PM", "11:15 PM", "11:30 PM", "11:45 PM"]

class Calendars extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          days: [],
          fullDays: [],
          week_step: 0,
          date_step: 0,
          day_values: [],
          calendar_state: 0
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

    calendarView(){
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
        <View>
        <View style={styles.navBar}>
          <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pending}>
            <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
          </TouchableOpacity>
          <View style={styles.navBar_view}>
            <TouchableHighlight style={this.props.calendar_state == 0 ? [styles.nav_touch, {borderBottomLeftRadius: 25, borderTopLeftRadius: 25, backgroundColor: '#f26c4f'}] : [styles.nav_touch, {borderBottomLeftRadius: 25, borderTopLeftRadius: 25}]} underlayColor='#f26c4f' onPress={() => {this.props.setCalendarState(0); this.props.setPressState(-1)}}>
              <Text style={this.props.calendar_state == 0 ? [styles.nav_text, {color: 'white'}] : styles.nav_text}>Day</Text>
            </TouchableHighlight>
            <TouchableHighlight style={this.props.calendar_state == 1 ? [styles.nav_touch, {backgroundColor: '#f26c4f'}] : styles.nav_touch} underlayColor='#f26c4f' onPress={() => {this.props.setCalendarState(1); this.props.setPressState(-1)}}>
              <Text style={this.props.calendar_state == 1 ? [styles.nav_text, {color: 'white'}] : styles.nav_text}>Week</Text>
            </TouchableHighlight>
            <TouchableHighlight style={this.props.calendar_state == 2 ? [styles.nav_touch, {borderBottomRightRadius: 25, borderTopRightRadius: 25, backgroundColor: '#f26c4f'}] : [styles.nav_touch, {borderBottomRightRadius: 25, borderTopRightRadius: 25}]} underlayColor='#f26c4f' onPress={() => {this.props.setCalendarState(2); this.props.setPressState(-1)}}>
              <Text style={this.props.calendar_state == 2 ? [styles.nav_text, {color: 'white'}] : styles.nav_text}>Month</Text>
            </TouchableHighlight>
          </View>
          <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 23 : 5}} onPress={() => this.pressPlus()}>
            <Text style={{fontSize: 24, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'}}>+</Text>
          </TouchableOpacity>
        </View>

        {
          this.props.press_state == 0 || this.props.press_state == 1 || this.props.press_state == 2 ? (
            <View style={[styles.sBtn_view, {flexDirection: 'row', alignItems: 'center'}]}>
              <TouchableOpacity style={{position: 'absolute', left: 10}} onPress={() => this.props.setPressState(-1)}>
                <Text style={{fontFamily: 'Montserrat',textAlign: 'center',fontSize: 12,color: 'white'}}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.loginBtntext}>{this.props.press_state == 0 || this.props.press_state == 1 ? 'Select Start Time' : 'Select Day'}</Text>
            </View>
          ) : (
            <TouchableOpacity onPress={NavigationActions.calendarSync}>
              <View style={styles.sBtn_view}>
                <Text style={styles.loginBtntext}>Sync with calendar</Text>
              </View>
            </TouchableOpacity>
          )
        }

        {
          this.props.calendar_state == 2 ? (
            <TouchableOpacity  style={{position: 'absolute', left: 30, top: Platform.OS === 'ios' ? 125 : 105, zIndex: 1}} onPress={NavigationActions.manageSchedule}>
              <Image source={require('../../../img/settings.png')}  style={{width: 20,height: 20}}/>
            </TouchableOpacity>
          ) : null
        }

        <View style={[styles.sBtn_view, {flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0)'}]}>
          <TouchableOpacity  style={{marginLeft: 30}} onPress={NavigationActions.manageSchedule}>
            <Image source={require('../../../img/settings.png')}  style={{width: 20,height: 20}}/>
          </TouchableOpacity>
          <TouchableOpacity  style={{marginLeft: 30}} onPress={() => this.previousButton()}>
            <Image source={require('../../../img/left-arrow-black.png')}  style={{width: 14,height: 14}}/>
          </TouchableOpacity>
          {
            this.props.calendar_state == 1 ? (
              <View style={{flexDirection: 'column'}}>
                <Text style={{width: width-133, fontSize: 15, fontFamily: 'Montserrat', textAlign: 'center'}}>{this.state.fullDays[0]+' - '+this.state.fullDays[6]}</Text>
                {
                  this.state.week_step == 0 ? (
                    <Text style={{width: width-133, fontSize: 12, fontFamily: 'Montserrat', color: 'gray', textAlign: 'center'}}>This Week</Text>
                  ) : null
                }
              </View>
            ) : this.props.calendar_state == 0 ? (
              <View style={{flexDirection: 'column'}}>
                <Text style={{width: width-133, fontSize: 15, fontFamily: 'Montserrat', textAlign: 'center'}}>{this.state.full_days}</Text>
                <Text style={{width: width-133, fontSize: 12, fontFamily: 'Montserrat', color: 'gray', textAlign: 'center'}}>{this.state.date_step == 0 ? 'Today - ' + this.state.full_day : this.state.full_day}</Text>
              </View>
            ) : (
              <Text style={{width: width-133}}/>
            )
          }
          <TouchableOpacity  style={{marginRight: 25}} onPress={() => this.nextButton()}>
            <Image source={require('../../../img/right-arrow-black.png')}  style={{width: 14,height: 14}}/>
          </TouchableOpacity>
        </View>

        {
          this.props.calendar_state == 1 ? (
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
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
                              : this.state.day_values[j] == 1 ?
                                this.props.value0 <= i/2 && this.props.value1 > i/2 && this.props.checked1 == true ?
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
                              : this.state.day_values[j] == 2 ?
                                this.props.value2 <= i/2 && this.props.value3 > i/2 && this.props.checked2 == true ?
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
                              : this.state.day_values[j] == 3 ?
                                this.props.value4 <= i/2 && this.props.value5 > i/2 && this.props.checked3 == true ?
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
                              : this.state.day_values[j] == 4 ?
                                this.props.value6 <= i/2 && this.props.value7 > i/2 && this.props.checked4 == true ?
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
                              : this.state.day_values[j] == 5 ?
                                this.props.value8 <= i/2 && this.props.value9 > i/2 && this.props.checked5 == true ?
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
                              : this.state.day_values[j] == 6 ?
                                this.props.value10 <= i/2 && this.props.value11 > i/2 && this.props.checked6 == true ?
                                  <TouchableOpacity key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2}] : styles.day_view} onPress={() => this.pressTime(this.state.fullDays[j], hours)}/>
                                : <View key={i} style={Math.abs(i % 2) == 1 ? [styles.day_view, {borderBottomWidth: 1.2, backgroundColor: '#d3d3d3'}] : [styles.day_view, {backgroundColor: '#d3d3d3'}]}/>
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
          ) : this.props.calendar_state == 0 ? (
            <View style={{width: width, height: Platform.OS === 'ios' ? height - 210 : height - 219}}>
              <View style={{height: 1, borderBottomWidth: 1, borderColor: 'gray'}}/>
              <ScrollView contentOffset={{ x: 0, y: 720}}>
                {
                  hours_minutes.map((hour_minute, i) =>
                    <View key={i} style={{flexDirection: 'row'}}>
                      <View style={styles.day_text}>
                        <Text style={{fontFamily: 'Montserrat', textAlign: 'right', fontSize: 8, width: 40}}>{hour_minute}</Text>
                      </View>
                      {
                        this.state.full_day_value == 0 ?
                          this.props.value12 <= i/2 && this.props.value13 > i/2 && this.props.checked7 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : this.state.full_day_value == 1 ?
                          this.props.value0 <= i/2 && this.props.value1 > i/2 && this.props.checked1 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : this.state.full_day_value == 2 ?
                          this.props.value2 <= i/2 && this.props.value3 > i/2 && this.props.checked2 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : this.state.full_day_value == 3 ?
                          this.props.value4 <= i/2 && this.props.value5 > i/2 && this.props.checked3 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : this.state.full_day_value == 4 ?
                          this.props.value6 <= i/2 && this.props.value7 > i/2 && this.props.checked4 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : this.state.full_day_value == 5 ?
                          this.props.value8 <= i/2 && this.props.value9 > i/2 && this.props.checked5 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : this.state.full_day_value == 6 ?
                          this.props.value10 <= i/2 && this.props.value11 > i/2 && this.props.checked6 == true ?
                            <TouchableOpacity style={styles.day_sub_view} onPress={() => this.pressTime(this.state.full_days, hour_minute)}/>
                          : <View style={[styles.day_sub_view, {backgroundColor: '#d3d3d3'}]}/>
                        : null
                      }
                    </View>
                  )
                }
              </ScrollView>
            </View>
          ) : (
            <Calendar
              ref="calendar"
              eventDates={[]}
              dayHeadings={dayNames}
              showEventIndicators
              scrollEnabled
              showControls
              customStyle={customStyle}
              titleFormat={'MMMM, YYYY'}
              prevButtonText={''}
              nextButtonText={''}
              weekStart={0}
              onDateSelect={(date) => {
                var res = date.split("-");
                var year = res[0]
                var month = res[1]
                var day = res[2].split("T")[0]

                var date1 = new Date();
                var date2 = new Date(year, month-1, day);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                if(date1 < date2){
                  this.setState({date_step: diffDays})
                  this.props.setCalendarState(0)
                  this.props.setPressState(-1)
                }else {
                  this.setState({date_step: -(diffDays-1)})
                  this.props.setCalendarState(0)
                  this.props.setPressState(-1)
                }

                var full_month = full_monthNames[date2.getMonth()]
                var full_date = date2.getDate()
                var full_year = date2.getFullYear()
                var full_day = full_dayNames[date2.getDay()]
                var full_day_value = date2.getDay()
                var full_days = full_month + ' ' + full_date + ', ' + full_year

                this.setState({full_days: full_days, full_day: full_day, full_day_value: full_day_value})
              }}
              onTouchPrev={(e) => console.log('onTouchPrev: ', e)}
              onTouchNext={(e) => console.log('onTouchNext: ', e)}
              onSwipePrev={(e) => console.log('onSwipePrev: ', e)}
              onSwipeNext={(e) => console.log('onSwipeNext', e)}
            />
          )
        }
        </View>
      )
    }

    render() {
      return (
        <View style={styles.container}>
          {
            this.state.calendar_state == 0 ? (
              <View style={{width: width-40, alignSelf: 'center', marginTop: 80}}>
                <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 30}}>Calendar</Text>
                <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 16, marginTop: 50, color: '#4c4c4c'}}>When you publish your profile you'll be able to see and edit your calendar here.</Text>
              </View>
            ) : this.calendarView()
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
    borderColor: 'gray'
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

export default connect(mapStateToProps, mapDispatchToProps)(Calendars)
