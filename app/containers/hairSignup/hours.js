import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    ListView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions,
    AsyncStorage
} from 'react-native';

import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from '../../styles/hairSignupStyles'

import CheckBox from 'react-native-check-box'
import Modal from 'react-native-modalbox';

import { connect } from 'react-redux'

import RadioButton from 'radio-button-react-native';

import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import {s_value0,s_value1,s_value2,s_value3,s_value4,s_value5,s_value6,s_value7,s_value8,s_value9,s_value10,s_value11,s_value12,s_value13} from '../../actions';

let checked = (<Image source={require('../../img/checked1.png')} style={{width:15,height:15}}/>)
let unchecked = (<Image source={require('../../img/unchecked.png')} style={{width:15,height:15}}/>)

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

class hours extends React.Component{

  constructor(props) {
    super(props);

    const rowHasChanged = (r1, r2) => r1 !== r2
    const ds = new ListView.DataSource({rowHasChanged})

    this.state = {
      checked1: true,
      checked2: true,
      checked3: true,
      checked4: true,
      checked5: true,
      checked6: true,
      checked7: true,
      open: false,
      dataSource: ds.cloneWithRows(time),
      offsetY : 0
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
          <RadioButton currentValue={currentValue} value={rowData.value} onPress={() => this.handleOnPress(rowData.value)} outerCircleColor='#63b7b7' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#63b7b7' innerCircleSize={10}/>
        </View>
      </TouchableOpacity>
    )
  }

  _goToTabbar() {
    let availability = {}
    let mon = {}
    let tue = {}
    let wed = {}
    let thu = {}
    let fri = {}
    let sat = {}
    let sun = {}

    if (this.state.checked1) {
      mon = {"open": this.props.value0 * 30, "close": this.props.value1 * 30}
    } else {
      mon = {"open": 0, "close": 0}
    }

    if (this.state.checked2) {
      tue = {"open": this.props.value2 * 30, "close": this.props.value3 * 30}
    } else {
      tue = {"open": 0, "close": 0}
    }

    if (this.state.checked3) {
      wed = {"open": this.props.value4 * 30, "close": this.props.value5 * 30}
    } else {
      wed = {"open": 0, "close": 0}
    }

    if (this.state.checked4) {
      thu = {"open": this.props.value6 * 30, "close": this.props.value7 * 30}
    } else {
      thu = {"open": 0, "close": 0}
    }

    if (this.state.checked5) {
      fri = {"open": this.props.value8 * 30, "close": this.props.value9 * 30}
    } else {
      fri = {"open": 0, "close": 0}
    }

    if (this.state.checked6) {
      sat = {"open": this.props.value10 * 30, "close": this.props.value11 * 30}
    } else {
      sat = {"open": 0, "close": 0}
    }

    if (this.state.checked7) {
      sun = {"open": this.props.value12 * 30, "close": this.props.value13 * 30}
    } else {
      sun = {"open": 0, "close": 0}
    }

    availability = {"mon": mon, "tue": tue, "wed": wed, "thu": thu, "fri": fri, "sat": sat, "sun": sun}
    let phone = this.props.phone.replace(/\D/g,'');

    let user = {
      password: this.props.password,
      lastName: this.props.last,
      firstName: this.props.first,
      email: this.props.email,
      role: 'Provider',
      phoneNumber: phone,
      providerType: this.props.provider,
      travelType: this.props.travel,
      travelCost: this.props.price,
      availability: availability
    }

    this.props.auth.registerClient(user).then(() => {
      const { authState } = this.props;
      if (authState.isAuthenticated) {
        AsyncStorage.setItem("about_state", '0');
        AsyncStorage.setItem("photo_state", '0');
        AsyncStorage.setItem("service_state", '0');
        AsyncStorage.setItem("address_state", '0');
        NavigationActions.tabbar();
      } else {
        console.log('error registering');
        console.log(user);
      }
    });
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flexDirection:'column'}}>
          <View style={{width: width, height: height - 420, backgroundColor: '#63b7b7'}}>
            <View style={{flexDirection:'column', alignSelf: 'center', width: width-40, height: height - 420}}>
              <View style={{flexDirection: 'row', width: width-40, height: 20, alignSelf: 'center', alignItems: 'center', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f'}}/>
                <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f', marginLeft: 20}}/>
                <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f', marginLeft: 20}}/>
                <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f', marginLeft: 20}}/>
              </View>
              <TouchableOpacity style={{marginTop: 5}} onPress={NavigationActions.pop}>
                <Image source={require('../../img/back_white.png')}  style={styles.backBtn}/>
              </TouchableOpacity>
              <Text style={styles.text}>Add your availability so{'\n'}clients can see it.</Text>
            </View>
          </View>

          <View style={styles.active_view}>
            <View style={this.state.checked1 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked1 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Monday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=> {
                   if(this.state.checked1){
                     this.setState({checked1:false})
                   }else{
                     this.setState({checked1:true})
                   }
                 }}
                 isChecked={this.state.checked1}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked1){
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
                  <Text style={this.state.checked1 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value0].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked1){
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
                  <Text style={this.state.checked1 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value1].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.active_view}>
            <View style={this.state.checked2 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked2 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Tuesday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.checked2){
                     this.setState({checked2:false})
                   }else{
                     this.setState({checked2:true})
                   }
                 }}
                 isChecked={this.state.checked2}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
            <TouchableOpacity  onPress={() => {
              if(this.state.checked2){
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
                  <Text style={this.state.checked2 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value2].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked2){
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
                  <Text style={this.state.checked2 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value3].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.active_view}>
            <View style={this.state.checked3 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked3 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Wednesday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.checked3){
                     this.setState({checked3:false})
                   }else{
                     this.setState({checked3:true})
                   }
                 }}
                 isChecked={this.state.checked3}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
            <TouchableOpacity  onPress={() => {
              if(this.state.checked3){
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
                  <Text style={this.state.checked3 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value4].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked3){
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
                  <Text style={this.state.checked3 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value5].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.active_view}>
            <View style={this.state.checked4 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked4 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Thursday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.checked4){
                     this.setState({checked4:false})
                   }else{
                     this.setState({checked4:true})
                   }
                 }}
                 isChecked={this.state.checked4}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
            <TouchableOpacity  onPress={() => {
              if(this.state.checked4){
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
                  <Text style={this.state.checked4 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value6].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked4){
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
                  <Text style={this.state.checked4 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value7].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.active_view}>
            <View style={this.state.checked5 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked5 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Friday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.checked5){
                     this.setState({checked5:false})
                   }else{
                     this.setState({checked5:true})
                   }
                 }}
                 isChecked={this.state.checked5}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
            <TouchableOpacity  onPress={() => {
              if(this.state.checked5){
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
                  <Text style={this.state.checked5 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value8].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked5){
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
                  <Text style={this.state.checked5 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value9].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.active_view}>
            <View style={this.state.checked6 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked6 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Saturday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.checked6){
                     this.setState({checked6:false})
                   }else{
                     this.setState({checked6:true})
                   }
                 }}
                 isChecked={this.state.checked6}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
            <TouchableOpacity  onPress={() => {
              if(this.state.checked6){
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
                  <Text style={this.state.checked6 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value10].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked6){
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
                  <Text style={this.state.checked6 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value11].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.active_view}>
            <View style={this.state.checked7 ? [styles.day_view, {backgroundColor: '#f26c4f'}] : styles.day_view}>
              <Text style={this.state.checked7 ? styles.day_text : [styles.day_text, {color: '#808080'}]}>Sunday</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.checked7){
                     this.setState({checked7:false})
                   }else{
                     this.setState({checked7:true})
                   }
                 }}
                 isChecked={this.state.checked7}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>
            <View style={styles.time_view}>
            <TouchableOpacity  onPress={() => {
              if(this.state.checked7){
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
                  <Text style={this.state.checked7 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value12].label}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity  onPress={() => {
                if(this.state.checked7){
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
                  <Text style={this.state.checked7 ? styles.dropdown_text : [styles.dropdown_text, {color: '#808080'}]}>{time[this.props.value13].label}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {
            (!this.state.checked1 && !this.state.checked2 && !this.state.checked3 && !this.state.checked4 && !this.state.checked5 && !this.state.checked6 && !this.state.checked7) ? (
              <TouchableOpacity style={{marginTop: 20}}>
                <View style={styles.sBtn_view_gray}>
                  <Text style={styles.loginBtntext}>Complete</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{marginTop: 20}} onPress={() => this._goToTabbar()}>
                <View style={styles.sBtn_view}>
                  <Text style={styles.loginBtntext}>Complete</Text>
                </View>
              </TouchableOpacity>
            )
          }
          
        </ScrollView>
        <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.time_modal} position={"center"} swipeToClose={false} startOpen={false}>
          <View style={{flex:1}}>
            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              contentOffset={{ x: 0, y: this.state.offsetY }}
            />
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { auth } = state;
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
      authState: auth
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
        auth: bindActionCreators(ActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(hours)
