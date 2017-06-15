import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, ListView, TextInput, Picker, Image, TouchableOpacity, TouchableHighlight, Dimensions, Platform, AsyncStorage} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions} from 'react-native-router-flux'

import Modal from 'react-native-modalbox';
import { connect } from 'react-redux'
import { setPhotoState, setServiceState, setAddressState, setAboutState, ActionCreators } from '../../../actions';
import { bindActionCreators } from 'redux';

import RadioButton from 'radio-button-react-native';

import Geocoder from 'react-native-geocoder';

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

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const category = []
const sub_category = []
var category_data = [];

class profileComplete extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          open: false,
          category_open: false,
          own_open: false,
          about_open: false,
          details_open: false,
          pre_image: require('../../../img/stylist.png'),
          complete_state: 4,
          category_data: this._genRow(),
          category_dataSource: ds,
          sub_category_dataSource: ds,
          service_name: "First Service",
          second_service_name: "Second Service",
          service_index: 0,
          time_open: false,
          dataSource: ds.cloneWithRows(time),
          offsetY : 0,
          time_value: 3,
          position: {
            lat: null,
            lng: null
          },
          error: null,
          services: [],
          price: ['', ''],
          time: [0, 0]
        }
    }

    componentDidMount(){
      this._getParentSerivces()
      this._getProfileState()
    }

    _getParentSerivces() {
      this.props.actions.getParentServices().then(() => {
        const { apiState } = this.props
        category_data = []
        category = []
        category = apiState.service
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
        const { apiState } = this.props;
        sub_category = []
        for (i=0;i<apiState.childService.length;i++) {
          sub_category.push({
            value: apiState.childService[i].name,
            id: apiState.childService[i]._id,
            isSelect: false
          })
        }

        sub_category.sort( function( a, b ) {
          a = a.value.toLowerCase();
          b = b.value.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });

        this.setState({
          sub_category_data: sub_category
        })
        this.setState({
          sub_category_dataSource: this.state.sub_category_dataSource.cloneWithRows(this.state.sub_category_data)
        })
      });
    }

    _getProfileState() {
      AsyncStorage.getItem("service_state").then((value) => {
        this.setState({service_state: parseInt(value)})
      }).catch((error) => {
        this.setState({service_state: 0})
      })
      AsyncStorage.getItem("photo_state").then((value) => {
        this.setState({photo_state: parseInt(value)})
      }).catch((error) => {
        this.setState({photo_state: 0})
      })
      AsyncStorage.getItem("address_state").then((value) => {
        this.setState({address_state: parseInt(value)})
      }).catch((error) => {
        this.setState({address_state: 0})
      })
      AsyncStorage.getItem("about_state").then((value) => {
        this.setState({about_state: parseInt(value)})
      }).catch((error) => {
        this.setState({about_state: 0})
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
      console.log(categoryClone);
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      this.setState({
        category_dataSource: ds.cloneWithRows(categoryClone),
        category_selected: true
      })
      this._getChildService(rowData.id)
    }

    _showService(data) {
      if (data.value == 'Create Your Own'){
        this.setState({category_open: false, own_open: true})
      } else if (this.state.service_index ==0 ) {
        this.setState({category_open: false, service_name: data.value})
      } else {
        this.setState({category_open: false, second_service_name: data.value})
      }
      var tmp = this.state.services;
      tmp[this.state.service_index] = data
      this.setState({
        services: tmp
      });
    }

    _saveService() {
      const { authState } = this.props;
      for (i=0; i<this.state.services.length; i++) {
        if (this.state.services[i].value == "First Service" || this.state.services[i].value == "Second Service") continue
        this.props.actions.addService(authState.token, this.state.services[i].id, this.state.services[i].value, "", this.state.time[i],
        this.state.price[i], true).then(()=>{
          if (authState.isAuthenticated) {

          } else {
            console.log('error saving');
            console.log(authState);
          }
        })
      }

      this.setState({open: false, service_state: 1}); 
      this.props.setServiceState(1);
      AsyncStorage.setItem("service_state", '1')
    }

    _saveAddress () {
      const { authState } = this.props;
      let location = {}
        let address = {}
        let fullAddress = ""
        if (this.state.street && this.state.street != undefined) {
          address["street1"] = this.state.street
          if (fullAddress == "") {
            fullAddress = this.state.street
          } else {
            this.setState({address_open: false}); 
            this.props.setAddressState(1);
            AsyncStorage.setItem("address_state", '1');
            return;
            // fullAddress += (" " + this.state.street)
          }
        }
        if (this.state.building && this.state.building != undefined) {
          address["street2"] = this.state.building
          if (fullAddress == "") {
            fullAddress = this.state.building
          } else {
            fullAddress += (" " + this.state.building)
          }
        }
        if (this.state.city && this.state.city != undefined) {
          address["city"] = this.state.city
          if (fullAddress == "") {
            fullAddress = this.state.city
          } else {
            fullAddress += (" " + this.state.city)
          }
        }
        if (this.state.county && this.state.county != undefined) {
          address["state"] = this.state.county
          if (fullAddress == "") {
            fullAddress = this.state.county
          } else {
            fullAddress += (" " + this.state.county)
          }
        }
        if (this.state.country && this.state.country != undefined) {
          address["country"] = this.state.country
          if (fullAddress == "") {
            fullAddress = this.state.country
          } else {
            fullAddress += (" " + this.state.country)
          }
        }
        if (this.state.position) {
          let coordinates = [this.state.position.lng, this.state.position.lat]
          let geolocation = {}
          geolocation["coordinates"] = coordinates
          geolocation["type"] = "Point"
          address["geoLocation"] = geolocation
        }
        let isNum = /^\d+$/.test(this.state.zip)
        if (isNum) {
          address["zipCode"] = this.state.zip
        } else {
          address["postalCode"] = this.state.zip
        }
        location["address"] = address
        this.props.actions.editUserLocation(authState.token, location).then(()=>{
          this.setState({address_open: false, address_state: 1}); 
          this.props.setAddressState(1);
          AsyncStorage.setItem("address_state", '1');
        });
    }

    _saveDescription() {
      const { authState } = this.props;
      this.props.actions.editUserDescription(authState.token, this.state.about).then(() => {
        this.setState({about_open: false, about_state: 1}); 
        this.props.setAboutState(1)
        AsyncStorage.setItem("about_state", '1');
      });
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
        <TouchableHighlight  onPress={() => this._showService(rowData)} underlayColor='#f26c4f'>
          <View style={styles.sub_category_view}>
            <Text style={rowData == 'Create Your Own' ? {fontSize: 14, fontFamily: 'Montserrat', alignSelf: 'center', color: '#f26c4f'} : {fontSize: 14, fontFamily: 'Montserrat', alignSelf: 'center'}}>{rowData.value}</Text>
          </View>
        </TouchableHighlight>
      )
    }

    handleOnPress(value){
      this.setState({time_open: false})
      var tmp = this.state.time
      tmp[this.state.service_index] = value
      this.setState({
        time: tmp
      })
    }
    renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.handleOnPress(rowData.value)} >
          <View style={styles.row}>
            <Text style={styles.row_text}>{rowData.label}</Text>
            <View  style={{alignSelf: 'center', alignItems:'center'}}>
              <RadioButton currentValue={this.state.time[this.state.service_index]} value={rowData.value} onPress={() => this.handleOnPress(rowData.value)} outerCircleColor='#63b7b7' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#63b7b7' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    setOwnService(event) {
      let service_name = event.nativeEvent.text;
      this.setState({service_name})
    }

    setFirstPrice(event) {
      let price = event.nativeEvent.text;
      var tmp = this.state.price
      tmp[0] = price
      this.setState({price:tmp})
    }

    setSecondPrice(event) {
      let price = event.nativeEvent.text;
      var tmp = this.state.price
      tmp[1] = price
      this.setState({price:tmp})
    }

    setStreet(event) {
      let street = event.nativeEvent.text;
      this.setState({street})
    }
    setBuilding(event) {
      let building = event.nativeEvent.text;
      this.setState({building})
    }
    setCity(event) {
      let city = event.nativeEvent.text;
      this.setState({city})
    }
    setCounty(event) {
      let county = event.nativeEvent.text;
      this.setState({county})
    }
    setZip(event) {
      let zip = event.nativeEvent.text;
      this.setState({zip})
    }
    setCountry(event) {
      let country = event.nativeEvent.text;
      this.setState({country})
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
            this.setState({street: res[0].streetName + ', ' + res[0].streetNumber, city: res[0].locality, county: res[0].adminArea, zip: res[0].postalCode, country: res[0].country})
          })
          .catch(err => console.log(err))
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

    setAbout(event) {
      let about = event.nativeEvent.text;
      this.setState({about})
    }

    render() {
        var complete_state = this.state.complete_state - this.state.photo_state - this.state.service_state - this.state.address_state - this.state.about_state;

        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 15,height: 15}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center',  marginTop: Platform.OS === 'ios' ? 25 : 5}}>List Your Profile</Text>
              <TouchableOpacity  style={{position: 'absolute', right: 10, top: Platform.OS === 'ios' ? 38 : 18}} onPress={NavigationActions.stylistProfile}>
                <Text style={{fontSize:12, fontFamily: 'Montserrat', color: 'white'}}>PREVIEW</Text>
              </TouchableOpacity>
            </View>

            <Image source={this.state.pre_image} style={{width: width, height: 180}} blurRadius={10}>
              <TouchableOpacity  style={styles.photo_view} onPress={() => {NavigationActions.managePhotos(); this.props.setPhotoState(1); AsyncStorage.setItem("photo_state", '1');this.setState({
                photo_state:1})}}>
                <Text style={{fontSize:16, fontFamily: 'Montserrat', color: 'white'}}>Add Photos</Text>
                <Image source={this.state.photo_state == 0 ? require('../../../img/check_empty_white.png') : require('../../../img/check_red.png')} style={styles.check_img}/>
              </TouchableOpacity>
            </Image>

            <TouchableOpacity  style={styles.sub_view} onPress={() => this.setState({open: true})}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize:16}}>Services</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize:14, color: '#363636'}} numberOfLines={1}>{this.state.price == undefined ? 'Add some basic services to get started' : this.state.service_name + '          ' + time[this.state.time[this.state.service_index]].label + '     $' + this.state.price[this.state.service_index]}</Text>
              </View>
              <Image source={this.state.service_state == 0 ? require('../../../img/check_empty.png') : require('../../../img/check_red.png')} style={styles.check_img}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.sub_view} onPress={() => this.setState({address_open: true})}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize:16}}>Set Address</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize:14, color: '#363636'}} numberOfLines={1}>{this.state.country == undefined ? 'Only confirmed clients see your address' : this.state.city + ', ' + this.state.county + ', ' + this.state.country}</Text>
              </View>
              <Image source={this.state.address_state == 0 ? require('../../../img/check_empty.png') : require('../../../img/check_red.png')} style={styles.check_img}/>
            </TouchableOpacity>
            <TouchableOpacity  style={[styles.sub_view, {borderBottomWidth: 0}]} onPress={() => this.setState({about_open: true})}>
              <View style={{flexDirection: 'column'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize:16}}>About Me</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize:14, color: '#363636'}} numberOfLines={1}>{this.state.about == undefined ? 'Tell us more about yourself' : this.state.about}</Text>
              </View>
              <Image source={this.state.about_state == 0 ? require('../../../img/check_empty.png') : require('../../../img/check_red.png')} style={styles.check_img}/>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.optional_view} onPress={() => this.setState({details_open: true})}>
              <Text style={{fontFamily: 'Montserrat', fontSize:16}}>Optional Details</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filter_btn_view} onPress={NavigationActions.pop}>
              {<Text style={styles.filter_btn}>{complete_state > 1 ? complete_state + ' steps to list' : 
                complete_state == 1 ? complete_state + ' step to list':'Finish'}</Text>}
            </TouchableOpacity>

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={styles.sub_form}>
                <View style={{flexDirection:'row', height: 60, backgroundColor: "#63b7b7",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                  <TouchableOpacity  onPress={() => this._saveService()}>
                    <Image source={require('../../../img/checked_white.png')}  style={{marginTop: 32,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 20,color: 'white',textAlign: 'center'}}>Done</Text>
                </View>

                <View style={{width: width - 40, height: 80, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 13, textAlign: 'center'}}>Add some basic services to get started.{'\n'}You can edit these, include descriptions and add{'\n'}more services later.</Text>
                </View>
                <View style={{width: width, height: height, alignItems: 'center', backgroundColor: '#f1f0f0'}}>
                  <View style={styles.service_view}>
                    <TouchableOpacity style={styles.service_touch} onPress={() => this.setState({category_open: true, service_index: 0})}>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 15}}>{this.state.service_name}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={[styles.service_touch, {width:(width-40)/2, borderBottomWidth: 0, borderRightWidth: 0.2}]} onPress={() => {
                        if(this.state.time[0] > 27){
                          this.setState({time_open: true, offsetY: (height - 50)/13 * 27, service_index: 0})
                        }else{
                          this.setState({time_open: true, offsetY: (height - 50)/13 * this.state.time[0], service_index: 0})
                        }
                      }}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 15}}>{time[this.state.time[0]].label}</Text>
                      </TouchableOpacity>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 15}}>$</Text>
                        <TextInput
                          style={{fontFamily: 'Montserrat', width: 60, height: 40, fontSize: 14}}
                          keyboardType='numeric'
                          value={this.state.price[0]}
                          onChange={this.setFirstPrice.bind(this)}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={[styles.service_view, {marginTop: 10}]}>
                    <TouchableOpacity style={styles.service_touch} onPress={() => this.setState({category_open: true, service_index: 1})}>
                      <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 15}}>{this.state.second_service_name}</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={[styles.service_touch, {width:(width-40)/2, borderBottomWidth: 0, borderRightWidth: 0.2}]} onPress={() => {
                        if(this.state.time[1] > 27){
                          this.setState({time_open: true, offsetY: (height - 50)/13 * 27, service_index: 1})
                        }else{
                          this.setState({time_open: true, offsetY: (height - 50)/13 * this.state.time[1], service_index: 1})
                        }
                      }}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 15}}>{time[this.state.time[1]].label}</Text>
                      </TouchableOpacity>
                      <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 15}}>$</Text>
                        <TextInput
                          style={{fontFamily: 'Montserrat', width: 60, height: 40, fontSize: 14}}
                          keyboardType='numeric'
                          value={this.state.price[1]}
                          onChange={this.setSecondPrice.bind(this)}
                        />
                      </View>
                    </View>
                  </View>

                  <Text style={{fontFamily: 'Montserrat', fontSize: 13, color: '#f26c4f', marginTop: 10}}>Note: Braids, twists and locs can be added later.</Text>
                </View>
              </View>
            </Modal>

            <Modal isOpen={this.state.address_open} onClosed={() => this.setState({address_open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={styles.sub_form}>
                <View style={{flexDirection:'row', width: width, height: 60, backgroundColor: "#63b7b7",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                  <TouchableOpacity  onPress={() => this._saveAddress()}>
                    <Image source={require('../../../img/checked_white.png')}  style={{marginTop: 32,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 20,color: 'white',textAlign: 'center'}}>Done</Text>
                  <TouchableOpacity style={{position: 'absolute', top: 32, right: 15,}} onPress={() => this.getGeolocation()}>
                    <Image source={require('../../../img/geolocation.png')}  style={{width: 18,height: 18}}/>
                  </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', width: width - 60, height: 80, alignSelf: 'center', alignItems: 'center', }}>
                  <Image source={require('../../../img/address_user.png')}  style={{width: 25,height: 25}}/>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14, textAlign: 'left', marginLeft: 30}}>Your exact address, location, and{'\n'}directions are only visible to clients{'\n'}with a confirmed reservation</Text>
                </View>
                <View style={{flexDirection: 'column', width: width, height: height, alignItems: 'center', backgroundColor: '#f1f0f0'}}>
                  <View style={styles.address_view}>
                    <TextInput
                      style={styles.address_text}
                      placeholder="Street / Road Name"
                      value={this.state.street}
                      onChange={this.setStreet.bind(this)}
                    />
                  </View>
                  <View style={styles.address_view}>
                    <TextInput
                      style={styles.address_text}
                      placeholder="Apt / Suite / Building"
                      value={this.state.building}
                      onChange={this.setBuilding.bind(this)}
                    />
                  </View>
                  <View style={styles.address_view}>
                    <TextInput
                      style={styles.address_text}
                      placeholder="City / Town / District"
                      value={this.state.city}
                      onChange={this.setCity.bind(this)}
                    />
                  </View>
                  <View style={styles.address_view}>
                    <TextInput
                      style={styles.address_text}
                      placeholder="State / Province / County"
                      value={this.state.county}
                      onChange={this.setCounty.bind(this)}
                    />
                  </View>
                  <View style={styles.address_view}>
                    <TextInput
                      style={styles.address_text}
                      placeholder="Zip / Postal Code"
                      value={this.state.zip}
                      onChange={this.setZip.bind(this)}
                    />
                  </View>
                  <View style={styles.address_view}>
                    <TextInput
                      style={styles.address_text}
                      placeholder="Country"
                      value={this.state.country}
                      onChange={this.setCountry.bind(this)}
                    />
                  </View>
                </View>
              </View>
            </Modal>

            <Modal isOpen={this.state.about_open} onClosed={() => this.setState({about_open: false})} style={[styles.modal, {backgroundColor: '#f1f0f0'}]} position={"bottom"} swipeToClose={false}>
              <View style={styles.sub_form}>
                <View style={{flexDirection:'row', height: 60, backgroundColor: "#63b7b7",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                  <TouchableOpacity  onPress={() => this._saveDescription()}>
                    <Image source={require('../../../img/checked_white.png')}  style={{marginTop: 32,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 20,color: 'white',textAlign: 'center'}}>Done</Text>
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>About me</Text>
                  <TextInput
                    style={styles.textinput_about}
                    multiline = {true}
                    placeholder = "I've been a hairstylist for 5 years and I'm a braiding expert."
                    value={this.state.about}
                    onChange={this.setAbout.bind(this)}
                  />
                </View>
              </View>
            </Modal>

            <Modal isOpen={this.state.details_open} onClosed={() => this.setState({details_open: false})} style={[styles.modal, {backgroundColor: '#f1f0f0'}]} position={"bottom"} swipeToClose={false}>
              <View style={styles.sub_form}>
                <View style={{flexDirection:'row', height: 60, backgroundColor: "#63b7b7",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                  <TouchableOpacity  onPress={() => this.setState({details_open: false})}>
                    <Image source={require('../../../img/checked_white.png')}  style={{marginTop: 32,marginLeft: 20,width: 18,height: 18}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 20,color: 'white',textAlign: 'center'}}>Done</Text>
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Public Web Address</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center', }}>
                    <View style={{width: (width-30)/3, height: 40, borderRadius: 2, alignItems: 'center',justifyContent: 'center', marginTop: 10, backgroundColor: '#f26c4f'}}>
                      <Text style={{fontFamily: 'Montserrat', fontSize:14, color: 'white', alignSelf:'center'}}>froapp.ca/</Text>
                    </View>
                    <TextInput
                      style={[styles.textinput, {width: (width-30)*2/3}]}
                    />
                  </View>
                  <Text style={{fontFamily: 'Montserrat', fontSize:10, marginTop: 10, alignSelf: 'center', textAlign: 'center'}}>Pick something short, memorable and recognizable{'\n'}for your public web address.</Text>
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Salon Name</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="your salon name"
                  />
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Instagram Username</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="Username"
                  />
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Facebook URL</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="www.facebook.com/yourpage"
                  />
                </View>

                <View style={{flexDirection: 'column', marginTop: 20}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Business Website</Text>
                  <TextInput
                    style={styles.textinput}
                    placeholder="www.yoursalon.com"
                  />
                </View>
              </View>
            </Modal>

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
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 1,width: 0},
    zIndex: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  sub_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:width - 50,
    height: 140,
    borderRadius: 2
  },
  modal_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    alignSelf: 'center',
    padding: 15,
    width: width - 60,
    height: 100
  },
  photo_view: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
    width: width - 50,
    alignSelf: 'center',
    alignItems: 'center',
    height: 30,
    position: "absolute",
    bottom: 10,
  },
  sub_view: {
    width: width-50,
    height: 80,
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    flexDirection: 'row'
  },
  check_img: {
    width: 15,
    height: 15,
    position: "absolute",
    right: 0
  },
  optional_view: {
    width: width- 50,
    height: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7d7d7',
    borderRadius: 2
  },
  filter_btn: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  filter_btn_view: {
    width:width,
    height:50,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0
  },
  service_view: {
    flexDirection: 'column',
    width: width-40,
    height: 80,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: 'white',
    borderRadius: 2
  },
  service_touch: {
    width: width-40,
    height: 40,
    alignSelf: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2,
    backgroundColor: 'rgba(0,0,0,0)',
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
    textAlignVertical: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
 },
 address_view: {
   width: width-40,
   height: 50,
   borderBottomWidth: 0.2,
   alignSelf: 'center'
 },
 address_text: {
   fontFamily: 'Montserrat',
   fontSize: 14,
   width: width-40,
   height: 50,
   position: 'absolute',
   bottom: 0
 },
 textinput_about: {
   fontFamily: 'Montserrat',
   width:Dimensions.get('window').width - 30,
   fontSize: 14,
   backgroundColor: 'white',
   paddingLeft: 10,
   borderColor:'#808080',
   borderRadius:2,
   marginTop:10,
   textAlign: 'left',
   height: 100,
   alignSelf: 'center'
 },
});

const mapStateToProps = (state) => {
  const {api} = state
  const {auth} = state
    const props = {
      photo_state: state.daily.photo_state,
      service_state: state.daily.service_state,
      address_state: state.daily.address_state,
      about_state: state.daily.about_state,
      apiState: api,
      authState: auth
    };
    return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
      setPhotoState: (photo_state) => {
          dispatch(setPhotoState(photo_state));
      },
      setAddressState: (address_state) => {
          dispatch(setAddressState(address_state));
      },
      setServiceState: (service_state) => {
          dispatch(setServiceState(service_state));
      },
      setAboutState: (about_state) => {
          dispatch(setAboutState(about_state));
      },
      actions: bindActionCreators(ActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(profileComplete)
