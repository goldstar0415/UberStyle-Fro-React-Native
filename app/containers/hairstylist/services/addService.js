import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, ListView, TouchableHighlight, Alert, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import {dataSave, dataDelete, ActionCreators} from '../../../actions';
import { bindActionCreators } from 'redux';

import Modal from 'react-native-modalbox';
import RadioButton from 'radio-button-react-native';

import Switch from 'react-native-material-switch'
import CheckBox from 'react-native-check-box'

let checked = (<Image source={require('../../../img/checked1.png')} style={{width:15,height:15}}/>)
let unchecked = (<Image source={require('../../../img/unchecked.png')} style={{width:15,height:15}}/>)

var sizeNames = [ '10" - Neck', '12" - Shoulder', '18" - Mid Black', '22" - Waist', '28" - Hip'];

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

var sub_category = [];
var category_data = [];
var category = {}

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Addservice extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          checked: false,
          show_checked: true,
          power_booking: false,
          micro_state: false,
          medium_state: false,
          category_data: [],
          sub_category_data: [],
          category_dataSource: ds,
          sub_category_dataSource: ds,
          service_name: null,
          time_open: false,
          dataSource: ds.cloneWithRows(time),
          offsetY : 0,
          time_value: null,
          initial_value: null,
          processing_value: null,
          finishing_value: null,
          clean_value: null,
          medium_time_0: null,
          medium_time_1: null,
          medium_time_2: null,
          medium_time_3: null,
          medium_time_4: null,
          size_selected: false,
          length_selected: false,
          main_category: null,
          price_value: null,
          flag: true,
          parent_id: 0,
          child_id: 0,
          description: '',
        }
    }

    componentDidMount(){
      this._getParentSerivces()

      if(this.props.data != 0){
        this.setState({main_category: this.props.save_data[0],  service_name: this.props.data.name, time_value: this.props.data.duration, price_value: this.props.data.price.toString(), checked: false})
      }
    }

    _getParentSerivces() {
      this.props.actions.getParentServices().then(() => {
        category_data = []
        category = []
        category = this.props.serviceState
        category.sort( function( a, b ) {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });

        for (i=0;i<category.length;i++) {
          category_data.push({
            value: category[i].name,
            id: category[i]._id,
            isSelect: false
          })
        }
        this.setState({
          category_data: category_data
        })
        this.setState({
          category_dataSource: this.state.category_dataSource.cloneWithRows(this.state.category_data)
        })
        this.categoryPress(category_data[0], 0)
      });
    }

    _getChildService(parent_id) {
      this.props.actions.getChildServices(parent_id).then(() => {
        sub_category = []
        for (i=0;i<this.props.childService.length;i++) {
          sub_category.push({
            value: this.props.childService[i].name,
            id: this.props.childService[i]._id,
            isSelect: false
          })
        }

        sub_category.sort( function( a, b ) {
          a = a.value.toLowerCase();
          b = b.value.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });
        
        sub_category.push({
          value: "Create Your Own",
          id: 0,
          isSelect: false
        })

        this.setState({
          sub_category_data: sub_category
        })
        this.setState({
          sub_category_dataSource: this.state.sub_category_dataSource.cloneWithRows(this.state.sub_category_data)
        })
      });
    }

    saveData(){
      var data = [this.state.main_category, this.state.service_name, this.state.price_value, this.state.checked, time[this.state.time_value].label, this.state.time_value]
      const { authState } = this.props;
      this.props.actions.addService(authState.token, this.state.child_id, this.state.service_name, this.state.description, this.state.time_value,
      this.state.price_value, this.state.checked).then(()=>{
        if (authState.isAuthenticated) {
          this.props.dataSave(data)    
          NavigationActions.pop({refresh:{test:true}})
        } else {
          console.log('error saving');
          console.log(authState);
        }
      })
      
    }

    _genRow(){
      category_data = []
      for (i=0;i<category.length;i++) {
        category_data.push({
          value: category[i].name,
          id: category[i]._id,
          isSelect: false
        })
      }
      return category_data;
    }

    categoryPress(rowData, rowID){
      rowData.isSelect = !rowData.isSelect
      this._genRow()
      var categoryClone = category_data
      categoryClone[rowID] = rowData
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      this.setState({
        category_dataSource: ds.cloneWithRows(categoryClone)
      })
      this._getChildService(rowData.id)
      this.setState({main_category: rowData})
    }

    renderCategory (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableHighlight  onPress={() => this.categoryPress(rowData, rowID)} underlayColor='white'>
          <View style={rowData.isSelect ? styles.category_selected : styles.category_unselected}>
            <Text style={{fontSize: 14, fontFamily: 'Montserrat', alignSelf: 'center'}}>{rowData.value}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    renderSubCategory (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableHighlight  onPress={() => rowData.value == 'Create Your Own' ? this.setState({category_open: false, own_open: true}) : 
          this.setState({category_open: false, service_name: rowData.value, child_id: rowData.id})} underlayColor='#f26c4f'>
          <View style={styles.sub_category_view}>
            <Text style={rowData.value == 'Create Your Own' ? {fontSize: 14, fontFamily: 'Montserrat', alignSelf: 'center', color: '#f26c4f'} : {fontSize: 14, fontFamily: 'Montserrat', alignSelf: 'center'}}>{rowData.value}</Text>
          </View>
        </TouchableHighlight>
      )
    }

    setOwnService(event) {
      let service_name = event.nativeEvent.text;
      if((service_name.toLowerCase()).search("@") !== -1 || (service_name.toLowerCase()).search(".com") !== -1 || (service_name.toLowerCase()).search(".ca") !== -1 || (service_name.toLowerCase()).search(".net") !== -1){
        this.setState({service_name: ''})
        Alert.alert('Warning!', "You cannot write an email address, your phone number or add a website link")
      }else{
        this.setState({service_name})
      }
    }

    setDescription(event) {
      let description = event.nativeEvent.text;
      if((description.toLowerCase()).search("@") !== -1 || (description.toLowerCase()).search(".com") !== -1 || (description.toLowerCase()).search(".ca") !== -1 || (description.toLowerCase()).search(".net") !== -1){
        this.setState({description: ''})
        Alert.alert('Warning!', "You cannot write an email address, your phone number or add a website link")
      }else{
        this.setState({description:description})
      }
    }

    setPrice(event) {
      let price_value = event.nativeEvent.text;
      // if(price_value.length == 1 && this.state.flag == true){price_value = '$' + price_value; this.setState({flag: false})}
      // else if(price_value.length == 0)this.setState({flag: true})
      this.setState({price_value, medium_price_1: price_value})
    }

    setMediumPrice(event, i) {
      let medium_price = event.nativeEvent.text
      if(medium_price.length == 1 && this.state.flag == true){medium_price = '$' + medium_price; this.setState({flag: false})}
      else if(medium_price.length == 0)this.setState({flag: true})

      if(i == 0)this.setState({medium_price_0: medium_price})
      if(i == 1)this.setState({medium_price_1: medium_price, price_value: medium_price})
      if(i == 2)this.setState({medium_price_2: medium_price})
      if(i == 3)this.setState({medium_price_3: medium_price})
      if(i == 4)this.setState({medium_price_4: medium_price})
    }

    setMediumDuration(i){
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      this.setState({time_open: true, time_state: null, dataSource: ds.cloneWithRows(time)})
      if(i == 0){
        if(this.state.medium_time_0 > 27){
          this.setState({offsetY: (height - 50)/13 * 27})
        }else{
          this.setState({offsetY: (height - 50)/13 * this.state.medium_time_0})
        }
        this.setState({medium_time_state: i, currentValue: this.state.medium_time_0})
      }else if(i == 1){
        if(this.state.medium_time_1 > 27){
          this.setState({offsetY: (height - 50)/13 * 27})
        }else{
          this.setState({offsetY: (height - 50)/13 * this.state.medium_time_1})
        }
        this.setState({medium_time_state: i, currentValue: this.state.medium_time_1})
      }else if(i == 2){
        if(this.state.medium_time_2 > 27){
          this.setState({offsetY: (height - 50)/13 * 27})
        }else{
          this.setState({offsetY: (height - 50)/13 * this.state.medium_time_2})
        }
        this.setState({medium_time_state: i, currentValue: this.state.medium_time_2})
      }else if(i == 3){
        if(this.state.medium_time_3 > 27){
          this.setState({offsetY: (height - 50)/13 * 27})
        }else{
          this.setState({offsetY: (height - 50)/13 * this.state.medium_time_3})
        }
        this.setState({medium_time_state: i, currentValue: this.state.medium_time_3})
      }else if(i == 4){
        if(this.state.medium_time_4 > 27){
          this.setState({offsetY: (height - 50)/13 * 27})
        }else{
          this.setState({offsetY: (height - 50)/13 * this.state.medium_time_4})
        }
        this.setState({medium_time_state: i, currentValue: this.state.medium_time_4})
      }
    }

    timeSelected(state){
      this.setState({time_open: true})
      if(state == 0){
        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        if(this.state.time_value > 27){
          this.setState({offsetY: (height - 50)/13 * 27})
        }else{
          this.setState({offsetY: (height - 50)/13 * this.state.time_value})
        }
        this.setState({time_state: state, medium_time_state: 1, currentValue: this.state.time_value, dataSource: ds.cloneWithRows(time)})
      }else if(state == 1){
        var pop_value = 0
        if((this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value == null)){
          pop_value = this.state.processing_value + this.state.finishing_value + this.state.clean_value + 1
        }else if((this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value != null) || (this.state.processing_value != null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value != null)){
          pop_value = this.state.processing_value + this.state.finishing_value + this.state.clean_value + 2
        }else if(this.state.processing_value != null && this.state.finishing_value != null && this.state.clean_value != null){
          pop_value = this.state.processing_value + this.state.finishing_value + this.state.clean_value + 3
        }
        const new_time = []
        for(var i = 0; i < time.length - pop_value; i++){
          new_time[i] = time[i]
        }

        if(new_time.length == 0)this.setState({time_open: false})

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.setState({time_state: state, currentValue: this.state.initial_value, offsetY: (height - 50)/13 * this.state.initial_value, dataSource: ds.cloneWithRows(new_time)})
      }else if(state == 2){

        var pop_value = 0
        if((this.state.initial_value == null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.finishing_value == null && this.state.clean_value == null)){
          pop_value = this.state.initial_value + this.state.finishing_value + this.state.clean_value + 1
        }else if((this.state.initial_value == null && this.state.finishing_value != null && this.state.clean_value != null) || (this.state.initial_value != null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.finishing_value == null && this.state.clean_value != null)){
          pop_value = this.state.initial_value + this.state.finishing_value + this.state.clean_value + 2
        }else if(this.state.initial_value != null && this.state.finishing_value != null && this.state.clean_value != null){
          pop_value = this.state.initial_value + this.state.finishing_value + this.state.clean_value + 3
        }
        const new_time = []
        for(var i = 0; i < time.length - pop_value; i++){
          new_time[i] = time[i]
        }

        if(new_time.length == 0)this.setState({time_open: false})

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.setState({time_state: state, currentValue: this.state.processing_value, offsetY: (height - 50)/13 * this.state.processing_value, dataSource: ds.cloneWithRows(new_time)})
      }else if(state == 3){
        var pop_value = 0
        if((this.state.initial_value == null && this.state.processing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.clean_value == null)){
          pop_value = this.state.initial_value + this.state.processing_value + this.state.clean_value + 1
        }else if((this.state.initial_value == null && this.state.processing_value != null && this.state.clean_value != null) || (this.state.initial_value != null && this.state.processing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.clean_value != null)){
          pop_value = this.state.initial_value + this.state.processing_value + this.state.clean_value + 2
        }else if(this.state.initial_value != null && this.state.processing_value != null && this.state.clean_value != null){
          pop_value = this.state.initial_value + this.state.processing_value + this.state.clean_value + 3
        }
        const new_time = []
        for(var i = 0; i < time.length - pop_value; i++){
          new_time[i] = time[i]
        }

        if(new_time.length == 0)this.setState({time_open: false})

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.setState({time_state: state, currentValue: this.state.finishing_value, offsetY: (height - 50)/13 * this.state.finishing_value, dataSource: ds.cloneWithRows(new_time)})
      }else if(state == 4){
        var pop_value = 0
        if((this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value != null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value == null)){
          pop_value = this.state.initial_value + this.state.processing_value + this.state.finishing_value + 1
        }else if((this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value != null) || (this.state.initial_value != null && this.state.processing_value != null && this.state.finishing_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value != null)){
          pop_value = this.state.initial_value + this.state.processing_value + this.state.finishing_value + 2
        }else if(this.state.initial_value != null && this.state.processing_value != null && this.state.finishing_value != null){
          pop_value = this.state.initial_value + this.state.processing_value + this.state.finishing_value + 3
        }
        const new_time = []
        for(var i = 0; i < time.length - pop_value; i++){
          new_time[i] = time[i]
        }

        if(new_time.length == 0)this.setState({time_open: false})

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.setState({time_state: state, currentValue: this.state.clean_value, offsetY: (height - 50)/13 * this.state.clean_value, dataSource: ds.cloneWithRows(new_time)})
      }
    }

    handleOnPress(value){
      this.setState({time_open: false})
      if(this.state.time_state == 0 && !this.state.power_booking)this.setState({time_value: value, medium_time_1: value})
      if(this.state.time_state == 1){
        this.setState({initial_value: value})
        if(this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value == null){
          this.setState({time_value: value})
        }else if((this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value == null)){
          this.setState({time_value: this.state.processing_value + this.state.finishing_value + this.state.clean_value + value + 1})
        }else if((this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value != null) || (this.state.processing_value != null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value != null)){
          this.setState({time_value: this.state.processing_value + this.state.finishing_value + this.state.clean_value + value + 2})
        }else{
          this.setState({time_value: this.state.processing_value + this.state.finishing_value + this.state.clean_value + value + 3})
        }
      }
      if(this.state.time_state == 2){
        this.setState({processing_value: value})
        if(this.state.initial_value == null && this.state.finishing_value == null && this.state.clean_value == null){
          this.setState({time_value: value})
        }else if((this.state.initial_value == null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.finishing_value == null && this.state.clean_value == null)){
          this.setState({time_value: this.state.initial_value + this.state.finishing_value + this.state.clean_value + value + 1})
        }else if((this.state.initial_value == null && this.state.finishing_value != null && this.state.clean_value != null) || (this.state.initial_value != null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.finishing_value == null && this.state.clean_value != null)){
          this.setState({time_value: this.state.initial_value + this.state.finishing_value + this.state.clean_value + value + 2})
        }else{
          this.setState({time_value: this.state.initial_value + this.state.finishing_value + this.state.clean_value + value + 3})
        }
      }
      if(this.state.time_state == 3){
        this.setState({finishing_value: value})
        if(this.state.initial_value == null && this.state.processing_value == null && this.state.clean_value == null){
          this.setState({time_value: value})
        }else if((this.state.initial_value == null && this.state.processing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.clean_value == null)){
          this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.clean_value + value + 1})
        }else if((this.state.initial_value == null && this.state.processing_value != null && this.state.clean_value != null) || (this.state.initial_value != null && this.state.processing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.clean_value != null)){
          this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.clean_value + value + 2})
        }else{
          this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.clean_value + value + 3})
        }
      }
      if(this.state.time_state == 4){
        this.setState({clean_value: value})
        if(this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value == null){
          this.setState({time_value: value})
        }else if((this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value != null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value == null)){
          this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + value + 1})
        }else if((this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value != null) || (this.state.initial_value != null && this.state.processing_value != null && this.state.finishing_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value != null)){
          this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + value + 2})
        }else{
          this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + value + 3})
        }
      }

      if(this.state.medium_time_state == 0)this.setState({medium_time_0: value})
      if(this.state.medium_time_state == 1 && !this.state.power_booking)this.setState({medium_time_1: value, time_value: value})
      if(this.state.medium_time_state == 2)this.setState({medium_time_2: value})
      if(this.state.medium_time_state == 3)this.setState({medium_time_3: value})
      if(this.state.medium_time_state == 4)this.setState({medium_time_4: value})
    }
    renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.handleOnPress(rowData.value)} >
          <View style={styles.row}>
            <Text style={styles.row_text}>{rowData.label}</Text>
            <View  style={{alignSelf: 'center', alignItems:'center'}}>
              <RadioButton currentValue={this.state.currentValue} value={rowData.value} onPress={() => this.handleOnPress(rowData.value)} outerCircleColor='#63b7b7' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#63b7b7' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 33 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>{this.props.data == 0 ? 'Add Service' : 'Edit Service'}</Text>
              {
                this.props.data != 0 ? (
                  <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 32 : 15}} onPress={() => Alert.alert(
                        'Warning!',
                        "Do you really want to delete this service?",
                        [
                          {text: 'Yes', onPress: () => {this.props.dataDelete(); NavigationActions.pop()}},
                          {text: 'No', onPress: () => console.log('No Pressed!')},
                        ]
                      )}>
                    <Image source={require('../../../img/bin.png')}  style={{width: 12,height: 15}} resizeMode={'contain'}/>
                  </TouchableOpacity>
                ) : null
              }
            </View>
            <ScrollView style={styles.container}>
              <View style={{flexDirection: 'column', width: width-40, alignSelf: 'center'}}>
                <Text style={styles.sub_title}>Service Name</Text>
                <TouchableOpacity  style={styles.sub_touch} onPress={() => this.setState({category_open: true})}>
                  <Text style={this.state.service_name == null ? [styles.sub_text, {color: 'gray'}] : styles.sub_text}>{this.state.service_name == null ? "Select Service" : this.state.service_name}</Text>
                </TouchableOpacity>

                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.sub_title}>Description</Text>
                  <Text style={{fontSize: 12, fontFamily: 'Montserrat', marginTop:23, marginBottom: 10, textAlign: 'left'}}> (e.g. "Includes a wash & blow dry")</Text>
                </View>
                <TextInput
                  style={styles.textinput_about}
                  multiline = {true}
                  maxLength={250}
                  placeholder = "Lorem ipsum dolor sit ament, nam illud posse ei. At has sale dicta zril. Id nam cibo eius, vl ne in ni laudem scaevola,"
                  value={this.state.description}
                  onChange={this.setDescription.bind(this)}
                />
                <Text style={{fontFamily: 'Montserrat', fontSize:10, textAlign: 'right', marginTop: 5}}>max. 250 characters</Text>

                <Text style={styles.sub_title}>Duration</Text>
                <TouchableOpacity  style={styles.sub_touch} onPress={() => this.timeSelected(0)}>
                  <Text style={this.state.time_value == null ? [styles.sub_text, {color: 'gray'}] : styles.sub_text}>{this.state.time_value == null ? '1 h' : time[this.state.time_value].label}</Text>
                  <Image source={require('../../../img/up_down_arrow.png')} style={styles.up_arrow_view}/>
                </TouchableOpacity>

                <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: 15}}>
                  <TouchableOpacity onPress={() => this.setState({power_open: true})}>
                    <Image source={require('../../../img/info1.png')}  style={{width: 20,height: 20}}/>
                  </TouchableOpacity>
                  <Text style={[styles.sub_text, {marginRight: 10}]}>Power Booking</Text>
                  <Switch
                    activeBackgroundColor='#bce9e9'
                    inactiveBackgroundColor='#afafaf'
                    activeButtonColor='#63b7b7'
                    activeButtonPressedColor='#63b7b7'
                    inactiveButtonColor='#363636'
                    inactiveButtonPressedColor='#363636'
                    switchHeight={18}
                    switchWidth={40}
                    buttonRadius={8}
                    enableSlide={this.state.checked ? false : true}
                    onChangeState={(state) => {
                      this.setState({power_booking: state})
                      if(this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value == null){
                        this.setState({time_value: null})
                      }else if((this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value == null)){
                        this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + this.state.clean_value})
                      }else if((this.state.initial_value != null && this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value != null)){
                        this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + this.state.clean_value + 1})
                      }else if((this.state.initial_value != null && this.state.processing_value != null && this.state.finishing_value != null && this.state.clean_value == null) || (this.state.initial_value != null && this.state.processing_value != null && this.state.finishing_value == null && this.state.clean_value != null) || (this.state.initial_value != null && this.state.processing_value == null && this.state.finishing_value != null && this.state.clean_value != null) || (this.state.initial_value == null && this.state.processing_value != null && this.state.finishing_value != null && this.state.clean_value != null)){
                        this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + this.state.clean_value + 2})
                      }else{
                        this.setState({time_value: this.state.initial_value + this.state.processing_value + this.state.finishing_value + this.state.clean_value + 3})
                      }
                    }}
                  />
                </View>

                {
                  this.state.power_booking ? (
                    <View>
                      <Text style={[styles.sub_title, {marginTop: 10}]}>Initial</Text>
                      <TouchableOpacity  style={styles.sub_touch} onPress={() => this.timeSelected(1)}>
                        {
                          this.state.initial_value == null ? (
                            <Text style={[styles.sub_text, {color: 'gray'}]}>Duration</Text>
                          ) : (
                            <Text style={styles.sub_text}>{time[this.state.initial_value].label}</Text>
                          )
                        }
                        <Image source={require('../../../img/up_down_arrow.png')} style={styles.up_arrow_view}/>
                      </TouchableOpacity>
                      <Text style={[styles.sub_title, {marginTop: 10}]}>Processing</Text>
                      <TouchableOpacity  style={styles.sub_touch} onPress={() => this.timeSelected(2)}>
                        {
                          this.state.processing_value == null ? (
                            <Text style={[styles.sub_text, {color: 'gray'}]}>Duration</Text>
                          ) : (
                            <Text style={styles.sub_text}>{time[this.state.processing_value].label}</Text>
                          )
                        }
                        <Image source={require('../../../img/up_down_arrow.png')} style={styles.up_arrow_view}/>
                      </TouchableOpacity>
                      <Text style={[styles.sub_title, {marginTop: 10}]}>Finishing</Text>
                      <TouchableOpacity  style={styles.sub_touch} onPress={() => this.timeSelected(3)}>
                        {
                          this.state.finishing_value == null ? (
                            <Text style={[styles.sub_text, {color: 'gray'}]}>Duration</Text>
                          ) : (
                            <Text style={styles.sub_text}>{time[this.state.finishing_value].label}</Text>
                          )
                        }
                        <Image source={require('../../../img/up_down_arrow.png')} style={styles.up_arrow_view}/>
                      </TouchableOpacity>
                      <Text style={[styles.sub_title, {marginTop: 10}]}>Clean up</Text>
                      <TouchableOpacity  style={styles.sub_touch} onPress={() => this.timeSelected(4)}>
                        {
                          this.state.clean_value == null ? (
                            <Text style={[styles.sub_text, {color: 'gray'}]}>Duration</Text>
                          ) : (
                            <Text style={styles.sub_text}>{time[this.state.clean_value].label}</Text>
                          )
                        }
                        <Image source={require('../../../img/up_down_arrow.png')} style={styles.up_arrow_view}/>
                      </TouchableOpacity>
                    </View>
                  ) : null
                }

                <Text style={styles.sub_title}>Price</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    style={[styles.textinput_about, {width: (width-40)/2, height: 45}]}
                    placeholder = "0"
                    onFocus={() => this.state.price_value == null ? this.setState({flag: true}) : this.setState({flag: false})}
                    value={this.state.price_value}
                    onChange={this.setPrice.bind(this)}
                  />
                  {
                    this.state.power_booking ? (
                      <Image source={require('../../../img/unchecked.png')} style={{width:15,height:15, marginLeft: 20}}/>
                    ) : (
                      <CheckBox
                         style={{marginLeft: 20}}
                         onClick={()=> {
                           this.setState({checked:!this.state.checked})
                         }}
                         isChecked={this.state.checked}
                         checkedImage={checked}
                         unCheckedImage={unchecked}
                       />
                    )
                  }
                  <Text style={{fontFamily: 'Montserrat', fontSize:12, marginLeft: 10, marginBottom: 2}}>And Up</Text>
                  <TouchableOpacity style={{marginLeft: 10, marginTop: 2}} onPress={() => this.setState({price_open: true})}>
                    <Image source={require('../../../img/info1.png')}  style={{width: 20,height: 20}}/>
                  </TouchableOpacity>
                </View>

                {
                  this.state.checked ? (
                    <View>
                      <Text style={[styles.sub_text, {textAlign: 'center', fontSize: 12, marginTop: 30, marginBottom: 20}]}>Make sure to select all the sizes you offer and enter the proper price and duration for each length.</Text>
                      <TouchableOpacity  style={this.state.micro_state ? [styles.sub_touch, {marginTop: 10, borderWidth: 0, backgroundColor: '#f26c4f'}] : [styles.sub_touch, {marginTop: 10}]} onPress={() => this.setState({micro_state: !this.state.micro_state})}>
                        <Text style={this.state.micro_state ? [styles.sub_text, {color: 'white'}] : styles.sub_text}>Micro (XS)</Text>
                        <Image source={this.state.micro_state ? require('../../../img/up_arrow_white.png') : require('../../../img/down_aroow.png')} style={styles.arrow_view}/>
                      </TouchableOpacity>

                      {
                        this.state.micro_state ? (
                          <View style={[styles.sub_touch, {flexDirection: 'column', height: 225}]}>
                            {
                              sizeNames.map((sizename, i) =>
                                <View key={i} style={{flexDirection: 'row'}}>
                                  <View style={{width: 120, height: 45, borderBottomWidth: 0.2, borderRightWidth: 0.2, justifyContent: 'center'}}>
                                    <Text style={styles.sub_text}>{sizename}</Text>
                                  </View>
                                  <View style={{width: width-280, height: 45, borderBottomWidth: 0.2, borderRightWidth: 0.2}}>
                                    <TextInput
                                      style={{fontFamily: 'Montserrat', fontSize: 14, textAlign: 'center', width: width-280, height: 45}}
                                      placeholder = "$"
                                    />
                                  </View>
                                  <TouchableOpacity  style={{width: 120, height: 45, borderBottomWidth: 0.2, justifyContent: 'center'}} onPress={this.props.press}>
                                    <Text style={styles.sub_text}>1 hour</Text>
                                    <Image source={require('../../../img/up_down_arrow.png')} style={[styles.up_arrow_view, {width: 15, height: 20}]}/>
                                  </TouchableOpacity>
                                </View>
                              )
                            }
                          </View>
                        ) : null
                      }

                      <TouchableOpacity  style={[styles.sub_touch, {marginTop: 10}]} onPress={this.props.press}>
                        <Text style={styles.sub_text}>Small (S)</Text>
                        <Image source={require('../../../img/down_aroow.png')} style={styles.arrow_view}/>
                      </TouchableOpacity>
                      <TouchableOpacity  style={this.state.medium_state ? [styles.sub_touch, {marginTop: 10, borderWidth: 0, backgroundColor: '#f26c4f'}] : [styles.sub_touch, {marginTop: 10}]} onPress={() => this.setState({medium_state: !this.state.medium_state})}>
                        <Text style={this.state.medium_state ? [styles.sub_text, {color: 'white'}] : styles.sub_text}>Medium (M)</Text>
                        <Image source={this.state.medium_state ? require('../../../img/up_arrow_white.png') : require('../../../img/down_aroow.png')} style={styles.arrow_view}/>
                      </TouchableOpacity>
                      {
                        this.state.medium_state ? (
                          <View style={[styles.sub_touch, {flexDirection: 'column', height: 225}]}>
                            {
                              sizeNames.map((sizename, i) =>
                                <View key={i} style={{flexDirection: 'row'}}>
                                  <View style={{width: 120, height: 45, borderBottomWidth: 0.2, borderRightWidth: 0.2, justifyContent: 'center'}}>
                                    <Text style={styles.sub_text}>{sizename}</Text>
                                  </View>
                                  <View style={{width: width-280, height: 45, borderBottomWidth: 0.2, borderRightWidth: 0.2}}>
                                    <TextInput
                                      style={{fontFamily: 'Montserrat', fontSize: 14, textAlign: 'center', width: width-280, height: 45}}
                                      placeholder = "$"
                                      onFocus={() => (i == 0 && this.state.medium_price_0 == null) || (i == 1 && this.state.medium_price_1 == null) || (i == 2 && this.state.medium_price_2 == null) || (i == 3 && this.state.medium_price_3 == null) || (i == 4 && this.state.medium_price_4 == null) ? this.setState({flag: true}) : this.setState({flag: false})}
                                      value={i == 0 ? this.state.medium_price_0 : i == 1 ? this.state.medium_price_1 : i == 2 ? this.state.medium_price_2 : i == 3 ? this.state.medium_price_3 : i == 4 ? this.state.medium_price_4 : null}
                                      onChange={(text) => this.setMediumPrice(text, i)}
                                    />
                                  </View>
                                  <TouchableOpacity  style={{width: 120, height: 45, borderBottomWidth: 0.2, justifyContent: 'center'}} onPress={() => this.setMediumDuration(i)}>
                                    <Text style={this.state.medium_time_0 != null && i == 0 || this.state.medium_time_1 != null && i == 1 || this.state.medium_time_2 != null && i == 2 || this.state.medium_time_3 != null && i == 3 || this.state.medium_time_4 != null && i == 4 ? styles.sub_text : [styles.sub_text, {color: 'gray'}]}>{this.state.medium_time_0 != null && i == 0 ? time[this.state.medium_time_0].label : this.state.medium_time_1 != null && i == 1 ? time[this.state.medium_time_1].label : this.state.medium_time_2 != null && i == 2 ? time[this.state.medium_time_2].label : this.state.medium_time_3 != null && i == 3 ? time[this.state.medium_time_3].label : this.state.medium_time_4 != null && i == 4 ? time[this.state.medium_time_4].label : 'Duration'}</Text>
                                    <Image source={require('../../../img/up_down_arrow.png')} style={[styles.up_arrow_view, {width: 15, height: 20}]}/>
                                  </TouchableOpacity>
                                </View>
                              )
                            }
                          </View>
                        ) : null
                      }

                      <TouchableOpacity  style={[styles.sub_touch, {marginTop: 10}]} onPress={this.props.press}>
                        <Text style={styles.sub_text}>Large (L)</Text>
                        <Image source={require('../../../img/down_aroow.png')} style={styles.arrow_view}/>
                      </TouchableOpacity>
                      <TouchableOpacity  style={[styles.sub_touch, {marginTop: 10}]} onPress={this.props.press}>
                        <Text style={styles.sub_text}>Jumbo (XL)</Text>
                        <Image source={require('../../../img/down_aroow.png')} style={styles.arrow_view}/>
                      </TouchableOpacity>
                    </View>
                  ) : null
                }

                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 40}}>
                  <CheckBox
                     onClick={()=> {
                       this.setState({show_checked:!this.state.show_checked})
                     }}
                     isChecked={this.state.show_checked}
                     checkedImage={checked}
                     unCheckedImage={unchecked}
                   />
                  <Text style={{fontFamily: 'Montserrat', fontSize:12, marginLeft: 10, marginBottom: 2}}>Show on my profile</Text>
                </View>
              </View>
              {
                this.state.power_booking || this.state.checked ? (

                  this.state.main_category == null || this.state.service_name == null || this.state.price_value == null || this.state.time_value == null ? (
                    <View style={[styles.sBtn_view, {marginTop: 40}]}>
                      <Text style={styles.loginBtntext}>Save</Text>
                    </View>
                  ) : (
                    <TouchableOpacity onPress={() => this.saveData()}>
                      <View style={[styles.sBtn_view, {marginTop: 40}]}>
                        <Text style={styles.loginBtntext}>Save</Text>
                      </View>
                    </TouchableOpacity>
                  )

                ) : null
              }

            </ScrollView>
            {
              !this.state.power_booking && !this.state.checked ? (

                this.state.main_category == null || this.state.service_name == null || this.state.price_value == null || this.state.time_value == null ? (
                  <View style={styles.sBtn_view}>
                    <Text style={styles.loginBtntext}>Save</Text>
                  </View>
                ) : (
                  <TouchableOpacity onPress={() => this.saveData()}>
                    <View style={styles.sBtn_view}>
                      <Text style={styles.loginBtntext}>Save</Text>
                    </View>
                  </TouchableOpacity>
                )

              ) : null
            }

            <Modal isOpen={this.state.category_open} onClosed={() => this.setState({category_open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={{width, height: 60, backgroundColor: "#63b7b7"}} >
                <TouchableOpacity onPress={() => this.setState({category_open: false})}>
                  <Image source={require('../../../img/close.png')}  style={{marginTop: 30,marginLeft: 10,width: 20,height: 20}}/>
                </TouchableOpacity>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
                <ListView
                  style={{width:width*2/5, backgroundColor: '#f1f0f0'}}
                  dataSource={this.state.category_dataSource}
                  renderRow={this.renderCategory.bind(this)}
                />
                <ListView
                  style={{width:width*3/5}}
                  dataSource={this.state.sub_category_dataSource}
                  renderRow={this.renderSubCategory.bind(this)}
                />
              </View>
            </Modal>

            <Modal isOpen={this.state.own_open} onClosed={() => this.setState({own_open: false})} style={[styles.modal, {backgroundColor: '#f1f0f0'}]} position={"bottom"} swipeToClose={false}>
              <View style={styles.sub_form}>
                <View style={{flexDirection:'row', height: 60, backgroundColor: "#63b7b7",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                  <TouchableOpacity  onPress={() => this.setState({own_open: false})}>
                    <Image source={require('../../../img/checked_white.png')}  style={{marginTop: 32,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 20,color: 'white',textAlign: 'center'}}>Done</Text>
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Service Name</Text>
                  <TextInput
                    style={[styles.textinput, {borderWidth: 0}]}
                    maxLength={35}
                    onChange={this.setOwnService.bind(this)}
                  />
                  <Text style={{fontFamily: 'Montserrat', fontSize:10, position: 'absolute', bottom: -20, right: 15}}>max 35 characters</Text>
                </View>
              </View>
            </Modal>

            <Modal isOpen={this.state.time_open} onClosed={() => this.setState({time_open: false})} style={styles.time_modal} position={"center"} swipeToClose={false} startOpen={false}>
              <View style={{flex:1}}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                  contentOffset={{ x: 0, y: this.state.offsetY }}
                />
              </View>
            </Modal>

            <Modal isOpen={this.state.power_open} onClosed={() => this.setState({power_open: false})} style={styles.power_modal} position={"top"} swipeToClose={false}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{zIndex: 1}} onPress={() => this.setState({power_open: false})}>
                    <Image source={require('../../../img/cancel.png')}  style={{marginTop: 35,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize:20, color: '#7f7f7f', width: width, textAlign:'center', position: 'absolute', top: 30}}>Power Booking</Text>
                </View>
                <Text style={{fontFamily: 'Montserrat', fontSize:12, width: width-20, alignSelf: 'center', marginTop: 30, fontWeight: 'bold', textAlign: 'center', color: '#0f243e'}}>This feature lets you book an appointment during another appointment while your other client is processing.</Text>
                <Text style={[styles.power_text, {marginTop: 30}]}><Text style={[styles.power_text, {fontWeight: 'bold'}]}>Initial:</Text> This is the time it takes for the initial service ONLY.{'\n'}Example: if your service is "color" you would mark the "Initial" as 60 min (the initial time spent applying foil to a client) then add in the processing, finishing, and clean up times after.</Text>
                <Text style={styles.power_text}><Text style={[styles.power_text, {fontWeight: 'bold'}]}>Processing:</Text> This is the times you have available while your client is waiting (i.e. hair color is setting)</Text>
                <Text style={styles.power_text}><Text style={[styles.power_text, {fontWeight: 'bold'}]}>Finishing:</Text> This is the time you will be back with your client completing the service (i.e. taking foils out, blow dry)</Text>
                <Text style={styles.power_text}><Text style={[styles.power_text, {fontWeight: 'bold'}]}>Clean Up:</Text> This is the time you set aside to clean up in preparation for your next client.</Text>
              </View>
              <TouchableOpacity onPress={() => this.setState({power_open: false})}>
                <View style={[styles.sBtn_view, {marginTop: 0}]}>
                  <Text style={styles.loginBtntext}>GOT IT</Text>
                </View>
              </TouchableOpacity>
            </Modal>

            <Modal isOpen={this.state.price_open} onClosed={() => this.setState({price_open: false})} style={this.state.size_selected || this.state.length_selected ? [styles.power_modal, {height: height}] : [styles.power_modal, {height: 350}]} position={"top"} swipeToClose={false}>
              <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity style={{zIndex: 1}} onPress={() => this.setState({price_open: false})}>
                    <Image source={require('../../../img/cancel.png')}  style={{marginTop: 35,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize:20, color: '#7f7f7f', width: width, textAlign:'center', position: 'absolute', top: 30}}>Price Variation</Text>
                </View>
                <Text style={{fontFamily: 'Montserrat', fontSize:12, width: width-20, alignSelf: 'center', marginTop: 30, textAlign: 'center'}}>In some instances, the price and duration of a hairstyle (i.e. Single Braids) may vary depending on the length and/or size. In these cases, select "And Up".</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize:12, width: width-20, alignSelf: 'center', marginTop: 20, textAlign: 'center', fontWeight: 'bold'}}>It is important to be transparent with your clients. This will save you time and make you more money.</Text>
                <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 30}}>
                  <TouchableOpacity onPress={() => this.setState({size_selected: true, length_selected: false})}>
                    <View style={this.state.size_selected ? styles.rating_selected_view : styles.rating_view}>
                      <Text style={this.state.size_selected ? {fontFamily: 'Montserrat', fontSize: 12, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 12}}>Size Chart</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.setState({length_selected: true, size_selected: false})}>
                    <View style={this.state.length_selected ? [styles.rating_selected_view, {marginLeft: 15}] : [styles.rating_view, {marginLeft: 15}]}>
                      <Text style={this.state.length_selected ? {fontFamily: 'Montserrat', fontSize: 12, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 12}}>Length Chart</Text>
                    </View>
                  </TouchableOpacity>
                </View>

                {
                  this.state.length_selected ? (
                    <Image source={require('../../../img/length_english.png')}  style={{width: width-40, height: 300, alignSelf: 'center', marginTop: 20}} resizeMode={'contain'}/>
                  ) : this.state.size_selected ? (
                    <View style={{flexDirection: 'column', alignSelf: 'center'}}>
                      <Text style={{fontFamily: 'Montserrat', fontSize:10, width: width-100, alignSelf: 'center', marginTop: 30, textAlign: 'center'}}>These may appear larger or smaller depending upon your screen resolution. User the ruler measurements to be more exact.</Text>
                      <Image source={require('../../../img/Braids_english.png')}  style={{width: width-40, height: 250, alignSelf: 'center', marginTop: 10}} resizeMode={'contain'}/>
                    </View>
                  ) : null
                }

              </View>
              <TouchableOpacity onPress={() => this.setState({price_open: false})}>
                <View style={[styles.sBtn_view, {marginTop: 0}]}>
                  <Text style={styles.loginBtntext}>GOT IT</Text>
                </View>
              </TouchableOpacity>
            </Modal>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_form: {
    flex:1,
    flexDirection:'column',
    width:width,
    height:height,
  },
  navBar: {
    flexDirection:'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    width: width,
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
  top_view: {
    flexDirection: 'column',
    width: width,
    height: 140,
    alignSelf: 'center',
    borderBottomWidth: 0.2,
    justifyContent: 'center'
  },
  sub_title: {
    fontSize: 16, fontFamily: 'Montserrat', marginTop: 20, marginBottom: 10, textAlign: 'left'
  },
  textinput_about: {
    fontFamily: 'Montserrat',
    width:width - 40,
    fontSize: 14,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderWidth:0.5,
    borderColor:'#808080',
    borderRadius:2,
    textAlign: 'left',
    height: 80,
  },
  sub_touch: {
    flexDirection: 'row', width: width-40, height: 45, borderWidth: 0.2, borderRadius: 2, alignItems: 'center'
  },
  sub_text: {
    fontSize: 14, fontFamily: 'Montserrat', textAlign: 'left', marginLeft: 10, backgroundColor: 'rgba(0,0,0,0)',
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
  arrow_view: {
    width: 12, height: 8, position: 'absolute', right: 15
  },
  up_arrow_view: {
    width: 18, height: 23, position: 'absolute', right: 10
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  category_unselected: {
    flexDirection:'column',
    width:width*2/5,
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 0.2
  },
  category_selected: {
    flexDirection:'column',
    width:width*2/5,
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'white'
  },
  sub_category_view: {
    flexDirection:'column',
    justifyContent: 'center',
    height: 50,
  },
  textinput: {
    fontFamily: 'Montserrat',
    width:width - 30,
    fontSize: 14,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderWidth:0.8,
    borderColor:'#808080',
    borderRadius:2,
    marginTop:10,
    textAlign: 'left',
    height: 40,
    alignSelf: 'center'
  },
  time_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 50,
    width: width - 50,
  },
  row:{
    flexDirection: 'row',
    height: (height - 50)/13,
    width: width - 50,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#808080',
  },
  row_text: {
    fontFamily: 'Montserrat',
    height: null,
    width : width - 90,
    marginLeft: 10,
    fontSize: 16,
    marginTop: 12,
    backgroundColor: 'rgba(0,0,0,0)',
    textAlignVertical: 'center',
 },

 power_modal: {
   height: 500,
   width: width,
 },
 power_text: {
   fontFamily: 'Montserrat', fontSize:12, width: width-30, alignSelf: 'center', marginTop: 20, textAlign: 'left'
 },

 rating_view: {
   width: 120,
   height: 35,
   borderRadius: 2,
   borderWidth: 0.5,
   alignItems: 'center',
   justifyContent: 'center'
 },
 rating_selected_view: {
   width: 120,
   height: 35,
   borderRadius: 2,
   backgroundColor: '#63b7b7',
   alignItems: 'center',
   justifyContent: 'center'
 },
});

const mapStateToProps = (state) => {
  const { auth } = state;
  const props = {
    save_data: state.addService.save_data,
    serviceState: state.api.service,
    childService: state.api.childService,
    authState: auth
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
      dataSave: (save_data) => {
          dispatch(dataSave(save_data));
      },
      dataDelete: () => {
          dispatch(dataDelete());
      },
      actions: bindActionCreators(ActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Addservice)
