import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import Modal from 'react-native-modalbox';

import CheckBox from 'react-native-check-box'
import CalendarPicker from 'react-native-calendar-picker';

import RadioButton from 'radio-button-react-native';

import {s_value0,s_value1,s_value2,s_value3,s_value4,s_value5,s_value6,s_value7,s_value8,s_value9,s_value10,s_value11,s_value12,s_value13, s_checked1, s_checked2, s_checked3, s_checked4, s_checked5, s_checked6, s_checked7} from '../../../actions';

let checked = (<Image source={require('../../../img/checked1.png')} style={{width:15,height:15}}/>)
let unchecked = (<Image source={require('../../../img/unchecked.png')} style={{width:15,height:15}}/>)

var currentValue

const time = [
  {label: '12:00am', value: 0 },
  {label: '12:30am', value: 1 },
  {label: '1:00am', value: 2 },
  {label: '1:30am', value: 3 },
  {label: '2:00am', value: 4 },
  {label: '2:30am', value: 5 },
  {label: '3:00am', value: 6 },
  {label: '3:30am', value: 7 },
  {label: '4:00am', value: 8 },
  {label: '4:30am', value: 9 },
  {label: '5:00am', value: 10 },
  {label: '5:30am', value: 11 },
  {label: '6:00am', value: 12 },
  {label: '6:30am', value: 13 },
  {label: '7:00am', value: 14 },
  {label: '7:30am', value: 15 },
  {label: '8:00am', value: 16 },
  {label: '8:30am', value: 17 },
  {label: '9:00am', value: 18 },
  {label: '9:30am', value: 19 },
  {label: '10:00am', value: 20 },
  {label: '10:30am', value: 21 },
  {label: '11:00am', value: 22 },
  {label: '11:30am', value: 23 },
  {label: '12:00pm', value: 24 },
  {label: '12:30pm', value: 25 },
  {label: '1:00pm', value: 26 },
  {label: '1:30pm', value: 27 },
  {label: '2:00pm', value: 28 },
  {label: '2:30pm', value: 29 },
  {label: '3:00pm', value: 30 },
  {label: '3:30pm', value: 31 },
  {label: '4:00pm', value: 32 },
  {label: '4:30pm', value: 33 },
  {label: '5:00pm', value: 34 },
  {label: '5:30pm', value: 35 },
  {label: '6:00pm', value: 36 },
  {label: '6:30pm', value: 37 },
  {label: '7:00pm', value: 38 },
  {label: '7:30pm', value: 39 },
  {label: '8:00pm', value: 40 },
  {label: '8:30pm', value: 41 },
  {label: '9:00pm', value: 42 },
  {label: '9:30pm', value: 43 },
  {label: '10:00pm', value: 44 },
  {label: '10:30pm', value: 45},
  {label: '11:00pm', value: 46 },
  {label: '11:30pm', value: 47 }
]

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Manageschedule extends React.Component {
  constructor(props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      open: false,
      dataSource: ds.cloneWithRows(time),
      offsetY : 0,
      s_year: '',
      s_month: '',
      s_day: '',
      s_date: '',
      s_mon: '',
      e_year: '',
      e_month: '',
      e_day: '',
      e_date: '',
      e_mon: '',
    };
  }

  handleOnPress(value){
    this.setState({open: false})
    if(this.state.index == 0)this.props.s_value0(value);
    else if(this.state.index == 1)this.props.s_value1(value);
    else if(this.state.index == 2)this.props.s_value2(value);
    else if(this.state.index == 3)this.props.s_value3(value);
    else if(this.state.index == 4)this.props.s_value4(value);
    else if(this.state.index == 5)this.props.s_value5(value);
    else if(this.state.index == 6)this.props.s_value6(value);
    else if(this.state.index == 7)this.props.s_value7(value);
    else if(this.state.index == 8)this.props.s_value8(value);
    else if(this.state.index == 9)this.props.s_value9(value);
    else if(this.state.index == 10)this.props.s_value10(value);
    else if(this.state.index == 11)this.props.s_value11(value);
    else if(this.state.index == 12)this.props.s_value12(value);
    else if(this.state.index == 13)this.props.s_value13(value);
  }

  renderRow (rowData) {
    if(this.state.index == 0)currentValue = this.props.value0;
    else if(this.state.index == 1)currentValue = this.props.value1;
    else if(this.state.index == 2)currentValue = this.props.value2;
    else if(this.state.index == 3)currentValue = this.props.value3;
    else if(this.state.index == 4)currentValue = this.props.value4;
    else if(this.state.index == 5)currentValue = this.props.value5;
    else if(this.state.index == 6)currentValue = this.props.value6;
    else if(this.state.index == 7)currentValue = this.props.value7;
    else if(this.state.index == 8)currentValue = this.props.value8;
    else if(this.state.index == 9)currentValue = this.props.value9;
    else if(this.state.index == 10)currentValue = this.props.value10;
    else if(this.state.index == 11)currentValue = this.props.value11;
    else if(this.state.index == 12)currentValue = this.props.value12;
    else if(this.state.index == 13)currentValue = this.props.value13;

    return (
      <TouchableOpacity style={styles.row} onPress={() => this.handleOnPress(rowData.value)} >
        <Text style={styles.row_text}>{rowData.label}</Text>
        <View  style={{alignSelf: 'center', alignItems:'center'}}>
          <RadioButton currentValue={currentValue} value={rowData.value} onPress={() => this.handleOnPress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
        </View>
      </TouchableOpacity>
    )
  }

  onDateChange(date) {
    if(this.state.start_end_state == 0){
      var s_year = date.getFullYear()
      var s_month = monthNames[date.getMonth()]
      var s_day = dayNames[date.getDay()]
      var s_date = date.getDate()
      var s_mon = date.getMonth() + 1
      this.setState({s_year,s_month,s_day,s_date,s_mon})
    }else if(this.state.start_end_state == 1){
      var e_year = date.getFullYear()
      var e_month = monthNames[date.getMonth()]
      var e_day = dayNames[date.getDay()]
      var e_date = date.getDate()
      var e_mon = date.getMonth() + 1
      this.setState({e_year,e_month,e_day,e_date,e_mon})
    }
  }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Manage Schedule</Text>
            </View>

            <View style={{flexDirection: 'column', alignItems: 'center'}}>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 60}}>Need to update your weekly schedule?</Text>
              <TouchableOpacity style={styles.button_view} onPress={() => this.setState({weekly_open: true})}>
                <Text style={styles.button_text}>Manage Weekly Schedule</Text>
              </TouchableOpacity>
              <View style={{width: width-40, height: 1, alignSelf: 'center', borderBottomWidth: 0.2, marginTop: 40}}/>
              <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', marginTop: 40}}>Taking a break? Block off some time on your{'\n'}calendar.</Text>
              <TouchableOpacity style={styles.button_view} onPress={() => this.setState({vacation_open: true})}>
                <Text style={styles.button_text}>Manage Vacation Time</Text>
              </TouchableOpacity>
            </View>

            <Modal isOpen={this.state.weekly_open} onClosed={() => this.setState({weekly_open: false})} style={styles.container} position={"bottom"} swipeToClose={false}>
              <View style={styles.navBar}>
                <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 32 : 12}} onPress={() => this.setState({weekly_open: false})}>
                  <Image source={require('../../../img/checked_white.png')}  style={{width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16,position: 'absolute', left: 55, top: Platform.OS === 'ios' ? 28 : 8,color: 'white',textAlign: 'center'}}>Done</Text>
              </View>

              <ScrollView style={{flexDirection:'column'}}>
                <View style={styles.active_view}>
                  <View style={this.props.checked1 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked1 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Monday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=> {
                         if(this.props.checked1){
                           this.props.s_checked1(false)
                         }else{
                           this.props.s_checked1(true)
                         }
                       }}
                       isChecked={this.props.checked1}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked1){
                        if(this.props.value0 > 35){
                          this.setState({open: true, index: 0, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 0, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value0})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked1 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value0].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked1){
                        if(this.props.value1 > 35){
                          this.setState({open: true, index: 1, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 1, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value1})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked1 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value1].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.active_view}>
                  <View style={this.props.checked2 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked2 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Tuesday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=>{
                         if(this.props.checked2){
                           this.props.s_checked2(false)
                         }else{
                           this.props.s_checked2(true)
                         }
                       }}
                       isChecked={this.props.checked2}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                  <TouchableOpacity  onPress={() => {
                    if(this.props.checked2){
                      if(this.props.value2 > 35){
                        this.setState({open: true, index: 2, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                      }else{
                        this.setState({open: true, index: 2, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value2})
                      }
                    }else{
                      this.setState({open: false})
                    }
                  }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked2 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value2].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked2){
                        if(this.props.value3 > 35){
                          this.setState({open: true, index: 3, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 3, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value3})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked2 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value3].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.active_view}>
                  <View style={this.props.checked3 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked3 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Wednesday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=>{
                         if(this.props.checked3){
                           this.props.s_checked3(false)
                         }else{
                           this.props.s_checked3(true)
                         }
                       }}
                       isChecked={this.props.checked3}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                  <TouchableOpacity  onPress={() => {
                    if(this.props.checked3){
                      if(this.props.value4 > 35){
                        this.setState({open: true, index: 4, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                      }else{
                        this.setState({open: true, index: 4, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value4})
                      }
                    }else{
                      this.setState({open: false})
                    }
                  }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked3 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value4].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked3){
                        if(this.props.value5 > 35){
                          this.setState({open: true, index: 5, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 5, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value5})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked3 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value5].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.active_view}>
                  <View style={this.props.checked4 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked4 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Thursday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=>{
                         if(this.props.checked4){
                           this.props.s_checked4(false)
                         }else{
                           this.props.s_checked4(true)
                         }
                       }}
                       isChecked={this.props.checked4}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                  <TouchableOpacity  onPress={() => {
                    if(this.props.checked4){
                      if(this.props.value6 > 35){
                        this.setState({open: true, index: 6, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                      }else{
                        this.setState({open: true, index: 6, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value6})
                      }
                    }else{
                      this.setState({open: false})
                    }
                  }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked4 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value6].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked4){
                        if(this.props.value7 > 35){
                          this.setState({open: true, index: 7, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 7, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value7})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked4 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value7].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.active_view}>
                  <View style={this.props.checked5 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked5 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Friday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=>{
                         if(this.props.checked5){
                           this.props.s_checked5(false)
                         }else{
                           this.props.s_checked5(true)
                         }
                       }}
                       isChecked={this.props.checked5}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                  <TouchableOpacity  onPress={() => {
                    if(this.props.checked5){
                      if(this.props.value8 > 35){
                        this.setState({open: true, index: 8, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                      }else{
                        this.setState({open: true, index: 8, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value8})
                      }
                    }else{
                      this.setState({open: false})
                    }
                  }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked5 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value8].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked5){
                        if(this.props.value9 > 35){
                          this.setState({open: true, index: 9, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 9, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value9})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked5 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value9].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.active_view}>
                  <View style={this.props.checked6 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked6 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Saturday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=>{
                         if(this.props.checked6){
                           this.props.s_checked6(false)
                         }else{
                           this.props.s_checked6(true)
                         }
                       }}
                       isChecked={this.props.checked6}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                  <TouchableOpacity  onPress={() => {
                    if(this.props.checked6){
                      if(this.props.value10 > 35){
                        this.setState({open: true, index: 10, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                      }else{
                        this.setState({open: true, index: 10, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value10})
                      }
                    }else{
                      this.setState({open: false})
                    }
                  }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked6 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value10].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked6){
                        if(this.props.value11 > 35){
                          this.setState({open: true, index: 11, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 11, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value11})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked6 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value11].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={[styles.active_view, {marginBottom: 20}]}>
                  <View style={this.props.checked7 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
                    <Text style={this.props.checked7 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Sunday</Text>
                    <CheckBox
                       style={styles.checkbox}
                       onClick={()=>{
                         if(this.props.checked7){
                           this.props.s_checked7(false)
                         }else{
                           this.props.s_checked7(true)
                         }
                       }}
                       isChecked={this.props.checked7}
                       checkedImage={checked}
                       unCheckedImage={unchecked}
                   />
                  </View>
                  <View style={styles.time_view}>
                  <TouchableOpacity  onPress={() => {
                    if(this.props.checked7){
                      if(this.props.value12 > 35){
                        this.setState({open: true, index: 12, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                      }else{
                        this.setState({open: true, index: 12, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value12})
                      }
                    }else{
                      this.setState({open: false})
                    }
                  }}>
                      <View style={styles.time_right_view}>
                        <Text style={this.props.checked7 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value12].label}</Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                      if(this.props.checked7){
                        if(this.props.value13 > 35){
                          this.setState({open: true, index: 13, offsetY: (Dimensions.get('window').height - 50)/13 * 35})
                        }else{
                          this.setState({open: true, index: 13, offsetY: (Dimensions.get('window').height - 50)/13 * this.props.value13})
                        }
                      }else{
                        this.setState({open: false})
                      }
                    }}>
                      <View style={styles.time_left_view}>
                        <Text style={this.props.checked7 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value13].label}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </Modal>

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.time_modal} position={"center"} swipeToClose={false} startOpen={false}>
              <View style={{flex:1}}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  contentOffset={{ x: 0, y: this.state.offsetY }}
                />
              </View>
            </Modal>

            <Modal isOpen={this.state.vacation_open} onClosed={() => this.setState({vacation_open: false})} style={styles.container} position={"bottom"} swipeToClose={false}>
              <View style={styles.navBar}>
                <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 32 : 12}} onPress={() => this.setState({vacation_open: false})}>
                  <Image source={require('../../../img/checked_white.png')}  style={{width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16,position: 'absolute', left: 55, top: Platform.OS === 'ios' ? 28 : 8,color: 'white',textAlign: 'center'}}>Done</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={[styles.sub_view, {flexDirection: 'column', height: 120, justifyContent: 'center', alignItems: 'center'}]}>
                  <Text style={[styles.sub_text, {height: 30, textAlign: 'center'}]}>Manage Vacation Time</Text>
                  <Text style={[styles.sub_text, {color: 'gray', textAlign: 'center', fontSize: 12}]}>Setting vacation time will block off your{'\n'}availability for the selected time span.</Text>
                </View>
                <TouchableOpacity style={styles.sub_view} onPress={() => this.setState({calendar_open: true, start_end_state: 0, s_pre_year: this.state.s_year, s_pre_month: this.state.s_month, s_pre_day: this.state.s_day, s_pre_date: this.state.s_date, s_pre_mon: this.state.s_mon})}>
                  <Text style={[styles.sub_text, {color: '#63b7b7'}]}>Start On</Text>
                  <Text style={[styles.sub_text, {color: 'gray', position: 'absolute', right: 0}]}>{this.state.s_day != '' ? this.state.s_year + '-' + this.state.s_mon + '-' + this.state.s_date : null}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sub_view} onPress={() => this.setState({calendar_open: true, start_end_state: 1, e_pre_year: this.state.e_year, e_pre_month: this.state.e_month, e_pre_day: this.state.e_day, e_pre_date: this.state.e_date, e_pre_mon: this.state.e_mon})}>
                  <Text style={styles.sub_text}>End On</Text>
                  <Text style={[styles.sub_text, {color: 'gray', position: 'absolute', right: 0}]}>{this.state.e_day != '' ? this.state.e_year + '-' + this.state.e_mon + '-' + this.state.e_date : null}</Text>
                </TouchableOpacity>
              </View>
            </Modal>

            <Modal isOpen={this.state.calendar_open} onClosed={() => this.setState({calendar_open: false})} style={styles.calendar_modal} position={"center"} swipeToClose={false}>
              <View style={{flexDirection: 'column', height: 430}}>
                <View style={{flexDirection: 'column', width:width - 60, marginBottom: 10, height: 80, justifyContent: 'center', backgroundColor: '#63b7b7'}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 18, marginLeft: 20, color: 'white'}}>{this.state.start_end_state == 0 ? this.state.s_year : this.state.e_year}</Text>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 22, marginLeft: 20, color: 'white'}}>{this.state.start_end_state == 0 && this.state.s_day != '' ? (this.state.s_day + ', ' + this.state.s_month + ' ' + this.state.s_date) : this.state.start_end_state == 1 && this.state.e_day != '' ? (this.state.e_day + ', ' + this.state.e_month + ' ' + this.state.e_date) : null}</Text>
                </View>
                <CalendarPicker
                  scaleFactor={430}
                  selectedDayColor="#63b7b7"
                  onDateChange={(date) => this.onDateChange(date)}
                />
                <View style={{flexDirection: 'row', width: width - 100, alignSelf: 'center', position: 'absolute', bottom: 15}}>
                  <TouchableOpacity onPress={() => {
                    if(this.state.start_end_state == 0){
                      this.setState({s_year: '', s_month: '', s_day: '', s_date: '', s_mon: ''})
                    }else if(this.state.start_end_state == 1){
                      this.setState({e_year: '', e_month: '', e_day: '', e_date: '', e_mon: ''})
                    }
                  }}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Clear</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', right: 40}} onPress={() => {
                    if(this.state.start_end_state == 0){
                      this.setState({calendar_open: false, s_year: this.state.s_pre_year, s_month: this.state.s_pre_month, s_day: this.state.s_pre_day, s_date: this.state.s_pre_date, s_mon: this.state.s_pre_mon})
                    }else if(this.state.start_end_state == 1){
                      this.setState({calendar_open: false, e_year: this.state.e_pre_year, e_month: this.state.e_pre_month, e_day: this.state.e_pre_day, e_date: this.state.e_pre_date, e_mon: this.state.e_pre_mon})
                    }
                  }}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{position: 'absolute', right: 0}} onPress={() => this.setState({calendar_open: false})}>
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
  navBar: {
    flexDirection:'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    width: width,
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
  button_view: {
    width: width-100, height: 50, borderRadius: 30, backgroundColor: '#f26c4f', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: 15
  },
  button_text: {
    fontSize: 14, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'
  },
  row:{
    flexDirection: 'row',
    height: (height - 50)/13,
    width: width - 50,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#808080',
    alignItems: 'center'
  },
  row_text: {
    fontFamily: 'Montserrat',
    width : width - 90,
    marginLeft: 10,
    fontSize: 16,
 },
 active_view: {
   width:width - 30,
   height:80,
   flexDirection: 'column',
   alignSelf: 'center',
   borderWidth: 1,
   borderColor: '#808080',
   borderRadius:3,
   marginTop: 20
 },
 day_view: {
   width:width - 32,
   height:40,
   flexDirection: 'row',
   alignSelf: 'center',
   borderBottomWidth: 1,
   borderColor: '#808080'
 },
 checkbox: {
   marginLeft: width/2 - 70,
   paddingTop: 11,
 },
 time_view: {
   width:width - 32,
   height:38,
   flexDirection: 'row',
   alignSelf: 'center',
   borderRadius:3,
 },
 time_right_view: {
   width:(width - 32)/2,
   height:36,
   flexDirection: 'row',
   alignSelf: 'center',
   borderRightWidth: 1,
   borderColor: '#808080',
   alignItems: 'center'
 },
 time_left_view: {
   width:(width - 32)/2,
   height:36,
   flexDirection: 'row',
   alignSelf: 'center',
   borderRadius:3,
   alignItems: 'center'
 },
 dropdown_text: {
   fontFamily: 'Montserrat',
   marginLeft: 10,
   fontSize: 14,
   justifyContent: 'center'
},
 day_text: {
   fontFamily: 'Montserrat',
   width: width/2,
   marginLeft: 12,
   fontSize: 14,
   paddingTop: 9,
   color: 'white',
   textAlign: 'left'
 },
 time_modal: {
   justifyContent: 'center',
   alignItems: 'center',
   height: height - 50,
   width: width - 50,
 },
 sub_view: {
   flexDirection: 'row', width: width-40, height: 50, alignSelf: 'center', alignItems: 'center', borderBottomWidth: 0.2
 },
 sub_text: {
   fontSize: 14, fontFamily: 'Montserrat', textAlign: 'left'
 },
 calendar_modal: {
   width: width - 60,
   height: 430,
   alignItems: 'center', //#f1f0f0
   borderRadius: 2
 },
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
    };

    return props;
};
const mapDispatchToProps = (dispatch) => {
    return {
        s_value0: (value0) => {
            dispatch(s_value0(value0));
        },
        s_value1: (value1) => {
            dispatch(s_value1(value1));
        },
        s_value2: (value2) => {
            dispatch(s_value2(value2));
        },
        s_value3: (value3) => {
            dispatch(s_value3(value3));
        },
        s_value4: (value4) => {
            dispatch(s_value4(value4));
        },
        s_value5: (value5) => {
            dispatch(s_value5(value5));
        },
        s_value6: (value6) => {
            dispatch(s_value6(value6));
        },
        s_value7: (value7) => {
            dispatch(s_value7(value7));
        },
        s_value8: (value8) => {
            dispatch(s_value8(value8));
        },
        s_value9: (value9) => {
            dispatch(s_value9(value9));
        },
        s_value10: (value10) => {
            dispatch(s_value10(value10));
        },
        s_value11: (value11) => {
            dispatch(s_value11(value11));
        },
        s_value12: (value12) => {
            dispatch(s_value12(value12));
        },
        s_value13: (value13) => {
            dispatch(s_value13(value13));
        },
        s_checked1: (checked1) => {
            dispatch(s_checked1(checked1));
        },
        s_checked2: (checked2) => {
            dispatch(s_checked2(checked2));
        },
        s_checked3: (checked3) => {
            dispatch(s_checked3(checked3));
        },
        s_checked4: (checked4) => {
            dispatch(s_checked4(checked4));
        },
        s_checked5: (checked5) => {
            dispatch(s_checked5(checked5));
        },
        s_checked6: (checked6) => {
            dispatch(s_checked6(checked6));
        },
        s_checked7: (checked7) => {
            dispatch(s_checked7(checked7));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Manageschedule)
