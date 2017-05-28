import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import Modal from 'react-native-modalbox';
import CheckBox from 'react-native-check-box'

import {setCalendarState, setPressState} from '../../../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let checked = (<Image source={require('../../../img/checked1.png')} style={{width:15,height:15}}/>)
let unchecked = (<Image source={require('../../../img/unchecked.png')} style={{width:15,height:15}}/>)

const time = [
  {label: '15 m', value: 0 },
  {label: '30 m', value: 1 },
  {label: '45 m', value: 2 },
  {label: '1 h', value: 3 },
  {label: '1 h 15 m', value: 4 },
  {label: '1 h 30 m', value: 5 },
  {label: '1 h 45 m', value: 6 },
  {label: '2 h', value: 7 },
  {label: '2 h 15 m', value: 8 },
  {label: '2 h 30 m', value: 9 },
  {label: '2 h 45 m', value: 10 },
  {label: '3 h', value: 11 },
  {label: '3 h 15 m', value: 12 },
  {label: '3 h 30 m', value: 13 },
  {label: '3 h 45 m', value: 14 },
  {label: '4 h', value: 15 },
  {label: '4 h 15 m', value: 16 },
  {label: '4 h 30 m', value: 17 },
  {label: '4 h 45 m', value: 18 },
  {label: '5 h', value: 19 },
  {label: '5 h 15 m', value: 20 },
  {label: '5 h 30 m', value: 21 },
  {label: '5 h 45 m', value: 22 },
  {label: '6 h', value: 23 },
  {label: '6 h 15 m', value: 24 },
  {label: '6 h 30 m', value: 25 },
  {label: '6 h 45 m', value: 26 },
  {label: '7 h', value: 27 },
  {label: '7 h 15 m', value: 28 },
  {label: '7 h 30 m', value: 29 },
  {label: '7 h 45 m', value: 30 },
  {label: '8 h', value: 31 },
  {label: '8 h 15 m', value: 32 },
  {label: '8 h 30 m', value: 33 },
  {label: '8 h 45 m', value: 34 },
  {label: '9 h', value: 35 },
  {label: '9 h 15 m', value: 36 },
  {label: '9 h 30 m', value: 37 },
  {label: '9 h 45 m', value: 38 },
  {label: '10 h', value: 39 }
]

class Editappointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          client_state: 0,
          flag: true,
          category: true,
          checked: false,
          duration: 7
        }
    }

    componentDidMount() {

    }

    setCost(event) {
      let cost = event.nativeEvent.text;
      if(cost.length == 1 && this.state.flag == true){cost = '$' + cost; this.setState({flag: false})}
      else if(cost.length == 0)this.setState({flag: true})
      this.setState({cost})
    }
    setNote(event) {
      let note = event.nativeEvent.text;
      this.setState({note})
    }

    pressButton(){
      this.props.setCalendarState(1)
      this.props.setPressState(-1)
      NavigationActions.pop()
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Edit Appointment</Text>
            </View>
          <ScrollView>
            <View style={{flexDirection: 'column', width: width-40, alignSelf: 'center'}}>

              <TouchableOpacity style={styles.sub_view} >
                <Text style={styles.sub_text}>Service</Text>
                <Text style={[styles.client_text, {position: 'absolute', right: 40}]}>Full Color</Text>
                <Image source={require('../../../img/right-arrow.png')}  style={{position: 'absolute', right: 10, width: 15,height: 15}}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.sub_view} onPress={() => this.setState({open: true})}>
                <View style={{width: 22, height: 22, borderRadius: 22/2, backgroundColor: '#f26c4f', marginLeft: 15, alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontSize: 20, color: 'white', backgroundColor: 'rgba(0,0,0,0)', marginBottom: 3}}>+</Text>
                </View>
                <Text style={[styles.sub_text, {color: '#f26c4f', marginLeft: 15}]}>Add Another Service</Text>
              </TouchableOpacity>
              <View style={styles.sub_view}>
                <Text style={styles.sub_text}>Cost</Text>
                <TextInput
                  style={{width: 100, height: 40, fontFamily: 'Montserrat', fontSize: 14, textAlign: 'right', position: 'absolute', right: 20, color: '#63b7b7'}}
                  placeholder = "$"
                  keyboardType='numeric'
                  value={this.state.cost}
                  onChange={this.setCost.bind(this)}
                />
              </View>

              <Text style={[styles.client_text, {color: 'black', marginTop: 10, textAlign: 'left'}]}>Duration</Text>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity style={styles.plus_view} onPress={() => {
                  this.state.duration--;
                  if(this.state.duration >= 0){
                    this.setState({duration: this.state.duration})
                  }else{
                    this.setState({duration: 0})
                  }
                }}>
                  <Text style={[styles.client_text, {color: 'black', fontSize: 40, marginBottom: 5}]}>-</Text>
                </TouchableOpacity>
                <View style={{width: (width-40)/2, height: 40, backgroundColor: '#f26c4f', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={[styles.client_text, {color: 'white'}]}>{time[this.state.duration].label}</Text>
                </View>
                <TouchableOpacity style={[styles.plus_view, {borderLeftWidth: 0, borderRightWidth: 0.2}]} onPress={() => {
                  this.state.duration++;
                  if(this.state.duration <= 39){
                    this.setState({duration: this.state.duration})
                  }else{
                    this.setState({duration: 39})
                  }
                }}>
                  <Text style={[styles.client_text, {color: 'black', fontSize: 30, marginBottom: 4}]}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={[styles.client_text, {color: 'black', marginTop: 10, textAlign: 'left'}]}>Note</Text>
              <TextInput
                style={styles.textinput_about}
                multiline = {true}
                placeholder = "Add Note"
                value={this.state.note}
                onChange={this.setNote.bind(this)}
              />
            </View>
          </ScrollView>
            <TouchableOpacity onPress={() => this.pressButton()}>
              <View style={styles.sBtn_view}>
                <Text style={styles.loginBtntext}>Save</Text>
              </View>
            </TouchableOpacity>

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.container} position={"bottom"} swipeToClose={false}>
              <View style={styles.navBar}>
                <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 32 : 12}} onPress={() => this.setState({open: false})}>
                  <Image source={require('../../../img/checked_white.png')}  style={{width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16,position: 'absolute', left: 55, top: Platform.OS === 'ios' ? 28 : 8,color: 'white',textAlign: 'center'}}>Done</Text>
                <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Service Menu</Text>
              </View>

              {
                this.props.save_data.length != 0 ? (
                  <ScrollView style={{flexDirection: 'column'}}>
                    <View style={{flexDirection: 'row', width: width-40, height: 60, alignSelf: 'center', alignItems: 'center', borderBottomWidth: 0.5}}>
                      <Text style={{fontSize: 20, fontFamily: 'Montserrat', width: width-40, textAlign: 'center'}}>{this.props.save_data[0].value}</Text>
                      <TouchableOpacity  style={{position: "absolute", right: 5, alignSelf: 'center'}}  onPress={() => this.setState({category: !this.state.category})}>
                        <Image source={this.state.category ? require('../../../img/down_aroow.png') : require('../../../img/up_arrow.png')} style={{width: 12, height: 6}}/>
                      </TouchableOpacity>
                    </View>
                    {
                      this.state.category ? (
                        <View style={{flexDirection: 'row', width: width-40, height: 80, alignSelf: 'center', alignItems: 'center', borderBottomWidth: 0.2}}>
                          <View style={{flexDirection: 'column'}}>
                            <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left'}}>{this.props.save_data[1]}</Text>
                            <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left', color: '#63b7b7'}}>{this.props.save_data[3] ? this.props.save_data[2] + '  and up  ' + this.props.save_data[4] : this.props.save_data[2] + '     ' + this.props.save_data[4]}</Text>
                          </View>
                          <CheckBox
                             style={{position: 'absolute', right: 5}}
                             onClick={()=> {
                               this.setState({checked:!this.state.checked})
                             }}
                             isChecked={this.state.checked}
                             checkedImage={checked}
                             unCheckedImage={unchecked}
                           />
                        </View>
                      ) : null
                    }
                  </ScrollView>
                ) : null
              }
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
  client_view: {
    width: (width-40)/2, height: 40, alignItems: 'center', justifyContent: 'center', borderRadius: 2, backgroundColor: '#d7d7d7'
  },
  client_text: {
    fontSize: 14, fontFamily: 'Montserrat', color: 'gray', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0)'
  },
  sub_view: {
    flexDirection: 'row', width: width-40, height: 40, borderWidth: 0.2, alignItems: 'center', borderRadius: 2, marginTop: 10
  },
  sub_text: {
    fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', textAlign: 'left', marginLeft: 10
  },
  plus_view: {
    width: (width-40)/4, height: 40, borderRadius: 2, borderTopWidth: 0.2, borderBottomWidth: 0.2, borderLeftWidth: 0.2, alignItems: 'center', justifyContent: 'center'
  },
  textinput_about: {
    fontFamily: 'Montserrat',
    width: width - 40,
    fontSize: 14,
    paddingLeft: 10,
    borderWidth:0.2,
    borderRadius:2,
    marginTop:10,
    textAlign: 'left',
    height: 80,
    alignSelf: 'center'
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
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

const mapStateToProps = (state) => {
    const props = {
      save_data: state.addService.save_data
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

export default connect(mapStateToProps, mapDispatchToProps)(Editappointment)
