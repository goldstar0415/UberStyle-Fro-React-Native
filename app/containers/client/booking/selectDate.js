import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var full_monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
var full_dayNames =  ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

const time = [
  {label: '09:30', value: 0 },
  {label: '09:45', value: 1 },
  {label: '10:00', value: 2 },
  {label: '10:15', value: 3 },
  {label: '10:30', value: 4 },
  {label: '10:45', value: 5 },
  {label: '14:30', value: 6 },
  {label: '14:45', value: 7 },
  {label: '15:00', value: 8 },
  {label: '15:15', value: 9 },
  {label: '15:30', value: 10 }
]

const times = ['15 m', '30 m', '45 m','1 h', '1 h 15 m', '1 h 30 m', '1 h 45 m', '2 h', '2 h 15 m', '2 h 30 m', '2 h 45 m', '3 h',
              '3 h 15 m', '3 h 30 m', '3 h 45 m', '4 h', '4 h 15 m', '4 h 30 m', '4 h 45 m', '5 h', '5 h 15 m', '5 h 30 m', '5 h 45 m', 
              '6 h', '6 h 15 m', '6 h 30 m', '6 h 45 m', '7 h', '7 h 15 m', '7 h 30 m', '7 h 45 m', '8 h', '8 h 15 m', '8 h 30 m', 
              '8 h 45 m', '9 h', '9 h 15 m', '9 h 30 m', '9 h 45 m',  '10 h']

class Selectdate extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          step: 0,
          days: [],
          dataSource: ds,
          end_state: 0,
          expand: false
        }
    }

    componentDidMount() {
      this.getAvailableDate()
    }

    getAvailableDate(){
      var firstDay = new Date();
      var days = []
      days = this.state.days
      for(var i = this.state.step;i < this.state.step+18; i++){
        var nextStep = new Date(firstDay.getTime() + i * 24 * 60 * 60 * 1000);
        if(nextStep.getMonth() != 0){
          var date = nextStep.getDate()
          var day = full_dayNames[nextStep.getDay()]
          var month = full_monthNames[nextStep.getMonth()]
          var year = nextStep.getFullYear()
          days.push(day + ' ' + month + ' ' + date)
        }else{
          this.setState({end_state: 1})
        }
      }
      this.setState({days: days, dataSource: this.state.dataSource.cloneWithRows(days)})
    }

    _goFinalStep() {
      if (this.state.rowId && this.state.press_state >= 0) {
        let data = {
          "stylist_id" : this.props.stylist_id,
          "service" : this.props.service,
          "stylist_name": this.props.stylist_name,
          "options": {
            "size": (this.props.options)?this.props.options.size:null,
            "length": (this.props.options)?this.props.options.length:null
          },
          "startTime": time[this.state.press_state].label,
          "day": this.state.days[this.state.rowId],
          "duration": (this.props.duration)?this.props.duration:times[this.props.service.duration],
          "travelType":this.props.travelType,
          "travelCost": this.props.travelCost
        }
        NavigationActions.finalStep(data)
      }
    }

    _isAvailableDay(index) {
      let day = new Date();
      let weekday = (day.getDay() + parseInt(index)) % 7;
      console.log(typeof(day.getDay()))
      console.log(typeof(index))
      console.log(weekday)
      switch (weekday) {
        case 0:
          if (this.props.ability.sun.open == 0 && this.props.ability.sun.close == 0) return false
          break
        case 1:
          if (this.props.ability.mon.open == 0 && this.props.ability.mon.close == 0) return false
          break
        case 2:
          if (this.props.ability.thu.open == 0 && this.props.ability.thu.close == 0) return false
          break
        case 3:
          if (this.props.ability.wed.open == 0 && this.props.ability.wed.close == 0) return false
          break
        case 4:
          if (this.props.ability.tue.open == 0 && this.props.ability.tue.close == 0) return false
          break
        case 5:
          if (this.props.ability.fri.open == 0 && this.props.ability.fri.close == 0) return false
          break
        case 6:
          if (this.props.ability.sat.open == 0 && this.props.ability.sat.open == 0) return false
          break
        default:
          break
      }
      return true;
    }

    renderRow (rowData: string , sectionID: number, rowID: number) {
      return (
        <View>
          <TouchableOpacity style={styles.row} onPress={() => {
            const rowHasChanged = (r1, r2) => r1 !== r2
            const ds = new ListView.DataSource({rowHasChanged})
            this.setState({dataSource: ds.cloneWithRows(this.state.days), rowId: rowID, press_state: -1})
          }}>
            <Text style={styles.row_text}>{rowData}</Text>
            <View style={{width: 8, height: 8, borderRadius: 4, backgroundColor: '#9bd01a', position: 'absolute', right: 20}}/>
          </TouchableOpacity>
          {
            this.state.rowId == rowID && this._isAvailableDay(rowID) ? (
              <View style={styles.expand_view}>
                {
                  time.map((times, i) =>
                    <View key={i} style={styles.sub_time_view}>
                      <TouchableOpacity style={this.state.press_state == i ? [styles.sub_time_touch, {backgroundColor: '#f26c4f'}] : styles.sub_time_touch} onPress={() => this.setState({press_state: i})}>
                        <Text style={[styles.row_text, {color: 'white'}]}>{times.label}</Text>
                      </TouchableOpacity>
                    </View>
                  )
                }
              </View>
            ) : null
          }
        </View>
      )
    }


    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Select Date & Time</Text>
            </View>
            <ListView
              style={{backgroundColor: '#f9f9f9'}}
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
              onEndReached={() => {
                if(this.state.end_state == 0){
                  this.state.step = this.state.step + 18
                  this.setState({step: this.state.step})
                  this.getAvailableDate()
                }
              }}
              onEndReachedThreshold={100}
            />
            <TouchableOpacity style={styles.sBtn_view} onPress={()=>this._goFinalStep()}>
              <Text style={styles.loginBtntext}>Continue</Text>
            </TouchableOpacity>

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
  row:{
    flexDirection: 'row',
    height: 40,
    width: width - 40,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 2
  },
  row_text: {
    fontFamily: 'Montserrat',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 14,
 },
 expand_view: {
   flexDirection: 'row',
   flexWrap: 'wrap',
   width: width-40,
   backgroundColor: 'white',
   borderTopWidth: 1,
   borderColor: '#d3d3d3',
   alignSelf: 'center'
 },
 sub_time_view: {
   width: (width-40)/3,
   height: 50,
   alignItems: 'center',
   justifyContent: 'center'
 },
 sub_time_touch: {
   width: (width-40)/3-20,
   height: 35,
   alignSelf: 'center',
   alignItems: 'center',
   justifyContent: 'center',
   borderRadius: 2,
   backgroundColor: '#63b7b7'
 }
});

const mapStateToProps = (state) => {
    const props = {

    };
    return props;
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Selectdate)
