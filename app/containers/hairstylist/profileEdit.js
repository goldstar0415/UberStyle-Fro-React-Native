import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, ListView, TextInput, Image, TouchableOpacity, Dimensions, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions} from 'react-native-router-flux'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators, selected1,selected2,selected3,unselected } from '../../actions';

import Styles from '../../styles/hairSignupStyles'

import Modal from 'react-native-modalbox';

import DatePicker from 'react-native-datepicker'
import ImagePicker from 'react-native-image-crop-picker';
import RadioButton from 'radio-button-react-native';

import Geocoder from 'react-native-geocoder';

const gender = [
  {label: 'Male', value: 'M' },
  {label: 'Female', value: 'F' },
  {label: 'Other', value: 'O' }
]
const language = [
  {label: 'English', value: 'en' },
  {label: 'Français', value: 'fr' }
]

class profileEdit extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          date:"",
          open: false,
          sub_open: false,
          modal_state: 0,
          sub_modal_state: 0,
          f_name: "David",
          l_name: "L'Heureux",
          image: require('../../img/david.jpg'),
          gender_dataSource: ds.cloneWithRows(gender),
          gender: "",
          lan_dataSource: ds.cloneWithRows(language),
          language: "en",
          about: "About me",
          email: 'don_david_l@hotmail.com',
          phone: '+1(514) 449-4366',
          street1: '',
          street2: '',
          city: '',
          province: '',
          postal: '',
          zip: '',
          country: '',
          facebook: '',
          instagram: '',
          twitter: '',
          website: '',
          position: {
            lat: null,
            lng: null
          },
          error: null
        }
    }

    componentWillMount() {
      this._getUser();
    }

    _getUser() {
      const { auth } = this.props;
      this.props.actions.fetchUser(auth.user._id, auth.token).then(() => {
        const { api } = this.props;
        this.setState({
          f_name: api.user.firstName,
          l_name: api.user.lastName,   
          about: api.user.description != null ? api.user.description : "About me",
          gender: api.user.gender != null ? api.user.gender : '',
          date: api.user.birthdate != null ? api.user.birthdate : "",
          language: api.user.language != null ? api.user.language : 'en',
          email: api.user.email != null ? api.user.email : 'don_david_l@hotmail.com',
          phone: api.user.phoneNumber != null ? api.user.phoneNumber : '+1(514) 449-4366'
        });

        this._getStylist();
      });
    }

    _getStylist() {
      const { auth } = this.props;
      this.props.actions.getStylist(auth.token, this.props.auth.user.provider).then(() => {
        const { api } = this.props;
        
        this.setState({
          travelCost: (api.provider.travelCost) ? api.provider.travelCost : "0",
          travelType: (api.provider.travelType) ? api.provider.travelType : [],
          providerType: (api.provider.providerType) ? api.provider.providerType : "",
          street1: (api.provider.location) ? api.provider.location.address.street1 : "",
          street2: (api.provider.location) ? api.provider.location.address.street2 : "",
          province: (api.provider.location) ? api.provider.location.address.state : "",
          city: (api.provider.location) ? api.provider.location.address.city : "",
          country: (api.provider.location) ? api.provider.location.address.country : "",
          position: (api.provider.location && api.provider.location.address.geoLocation.coordinates[0] != null) ? api.provider.location.address.geoLocation.coordinates:[0,0],
          zip: (!api.provider.location) ? "" : (api.provider.location.address.zipCode) ? api.provider.location.address.zipCode.toString() : 
          (api.provider.location.address.postalCode) ? api.provider.location.address.postalCode : ""
        });
        this._showTravelType();
      });
    }

    _showTravelType() {
      for(i=0; i<this.state.travelType.length; i++) {
        switch (this.state.travelType[i]) {
          case "Provider Home":
            this.props.selected1(1)
            break
          case "Salon":
            this.props.selected2(1)
            break
          default:
            this.props.selected3(1)
        }
      }
    }

    _updateUser() {
      this.state.modal_state == 2 ? this.setState({open: false, sub_open: true, sub_modal_state: 1}) : this.setState({open: false})
      const { auth } = this.props;
      if (this.state.modal_state == 0) {
        this.props.actions.editUserName(auth.token, this.state.f_name, this.state.l_name).then(() => {
          const { api } = this.props;
        });
      } else if (this.state.modal_state == 1){
        this.props.actions.editUserDescription(auth.token, this.state.about).then(() => {
          const { api } = this.props;
        });
      } else if (this.state.modal_state == 3){
        this.props.actions.editUserPhoneNumber(auth.token, this.state.phone).then(()=>{
          const { api } = this.props;
        });
      } else if (this.state.modal_state == 4){
        let location = {}
        let address = {}
        let fullAddress = ""
        if (this.state.street1 && this.state.street1 != undefined) {
          address["street1"] = this.state.street1
          if (fullAddress == "") {
            fullAddress = this.state.street1
          } else {
            fullAddress += (" " + this.state.street1)
          }
        }
        if (this.state.street2 && this.state.street2 != undefined) {
          address["street2"] = this.state.street2
          if (fullAddress == "") {
            fullAddress = this.state.street2
          } else {
            fullAddress += (" " + this.state.street2)
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
        if (this.state.province && this.state.province != undefined) {
          address["state"] = this.state.province
          if (fullAddress == "") {
            fullAddress = this.state.province
          } else {
            fullAddress += (" " + this.state.province)
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
        this.props.actions.editUserLocation(auth.token, location).then(()=>{
          const { api } = this.props;
        });

      } else if(this.state.modal_state == 5){
        let social = {}
        if (this.state.facebook && this.state.facebook != "") {
          social["facebook"] = this.state.facebook
        }
        if (this.state.instagram && this.state.instagram != "") {
          social["instagram"] = this.state.instagram
        }
        if (this.state.website && this.state.website != "") {
          social["website"] = this.state.website
        }
        this.props.editUserSocial(auth.token, social).then(()=>{
          const { api } = this.props;
        });
      }
    }

    _updateUserEmail() {
      this.setState({sub_open: false});
      const { auth } = this.props;
      this.props.actions.editUserEmail(auth.token, this.state.email).then(()=>{
        const { api } = this.props;
      });
    }

    _updateUserBirthDay(date) {
      this.setState({date: date})
      const { auth } = this.props;
      this.props.actions.editUserBirthDay(auth.token, date).then(() => {
        const { api } = this.props;
      });
    }

    _getCurrentLocation() {
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
            this.setState({street1: res[0].streetName, street2: res[0].streetNumber, city: res[0].locality, province: res[0].adminArea, zip: res[0].postalCode, country: res[0].country})
          })
          .catch(err => console.log(err))
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

    setFirstName(event) {
      let f_name = event.nativeEvent.text;
      this.setState({f_name})
    }
    setLastName(event) {
      let l_name = event.nativeEvent.text;
      this.setState({l_name})
    }
    setAbout(event) {
      let about = event.nativeEvent.text;
      this.setState({about})
    }
    setEmail(event) {
      let email = event.nativeEvent.text;
      this.setState({email})
    }
    setPhone(event) {
      let phone = event.nativeEvent.text;
      this.setState({phone})
    }
    setStreet1(event) {
      let street1 = event.nativeEvent.text;
      this.setState({street1})
    }
    setStreet2(event) {
      let street2 = event.nativeEvent.text;
      this.setState({street2})
    }
    setProvince(event) {
      let province = event.nativeEvent.text;
      this.setState({province})
    }
    setCity(event) {
      let city = event.nativeEvent.text;
      this.setState({city})
    }
    setZip(event) {
      let zip = event.nativeEvent.text;
      this.setState({zip})
    }
    setCountry(event) {
      let country = event.nativeEvent.text;
      this.setState({country})
    }
    setFacebook(event) {
      let facebook = event.nativeEvent.text;
      this.setState({facebook})
    }
    setInstagram(event) {
      let instagram = event.nativeEvent.text;
      this.setState({instagram})
    }
    setTwitter(event) {
      let twitter = event.nativeEvent.text;
      this.setState({twitter})
    }
    setWebsite(event) {
      let website = event.nativeEvent.text;
      this.setState({website})
    }
    takePhoto(){
      this.setState({sub_open: false})
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.setState({image:source});
      }).catch(e => {
        console.log(e);
      });
    }
    chooseImage(){
      this.setState({sub_open: false})
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.setState({image:source});
      }).catch(e => {
        console.log(e);
      });
    }

    genderPress(value){
      this.setState({sub_open: false, gender: value})
      const { auth } = this.props;
      this.props.actions.editUserGender(auth.token, value).then(() => {
        const { api } = this.props;
      });
    }
    gender_renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.genderPress(rowData.value)} >
          <View style={styles.private_sub_view}>
            <Text style={styles.private_text}>{rowData.label}</Text>
            <View  style={styles.right_arrow}>
              <RadioButton currentValue={this.state.gender} value={rowData.value} onPress={() => this.genderPress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    languagePress(value){
      this.setState({sub_open: false, language: value})
      const { auth } = this.props;
      this.props.actions.editUserLanguage(auth.token, value).then(() => {
        const { api } = this.props;
      });
    }
    lan_renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.languagePress(rowData.value)} >
          <View style={styles.private_sub_view}>
            <Text style={styles.private_text}>{rowData.label}</Text>
            <View  style={styles.right_arrow}>
              <RadioButton currentValue={this.state.language} value={rowData.value} onPress={() => this.languagePress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{width: 50, alignSelf: 'center', padding: 15, marginTop: 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../img/back_white.png')}  style={{width: 15,height: 15}}/>
              </TouchableOpacity>
              <Text style={{fontFamily: 'Montserrat', fontSize: 20, color: 'white', textAlign: 'center', width: Dimensions.get('window').width - 110, marginTop: 25}}>Profile</Text>
              <TouchableOpacity  style={{width: 70, marginTop: 32}} onPress={()=>NavigationActions.stylistProfile(this.props.auth.user.provider)}>
                <Text style={{fontFamily: 'Montserrat', fontSize:12, color: 'white'}}>PREVIEW</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={{flexDirection:'column', backgroundColor: '#f1f0f0'}}>
              <Image source={this.state.image} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*3/5}}>
                <TouchableOpacity  style={styles.photo_view} onPress={() => this.setState({sub_open: true, sub_modal_state: 0})}>
                  <Image source={require('../../img/camera.png')} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
              </Image>
              <View style={{flexDirection:'column', width: Dimensions.get('window').width - 30, alignSelf: 'center', alignItems: 'center', height: 70, borderBottomWidth: 0.2}}>
                <Text style={{fontFamily: 'Montserrat', width:Dimensions.get('window').width - 30, fontSize: 24, marginTop:5, textAlign: 'center', height: 40, alignSelf: 'center'}}>{this.state.f_name + ' ' + this.state.l_name}</Text>
                <TouchableOpacity onPress={() => this.setState({open: true, modal_state: 0})}>
                  <Text style={styles.edit_text}>Edit name</Text>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection:'column', width: Dimensions.get('window').width - 30, alignSelf: 'center', alignItems: 'center', height: 100, borderBottomWidth: 0.2}}>
                <Text style={{fontFamily: 'Montserrat', width:Dimensions.get('window').width - 30, fontSize: 12, marginTop:5, textAlign: 'left', height: 70}}>{this.state.about}</Text>
                <TouchableOpacity onPress={() => this.setState({open: true, modal_state: 1, about: ''})}>
                  <Text style={styles.edit_text}>Edit about me</Text>
                </TouchableOpacity>
              </View>
              <Text style={{fontFamily: 'Montserrat', fontSize: 12, marginTop: 30, alignSelf: 'center', textAlign: 'center'}}>Private Details</Text>
              <View style={styles.private_details}>
                <View style={styles.private_sub_view}>
                  <Text style={styles.private_text}>Gender</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => this.setState({sub_open: true, sub_modal_state: 2})}>
                    <Text style={styles.edit_text}>{(this.state.gender!='')?gender.find(item=>item.value==this.state.gender).label:"      "}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.private_sub_view}>
                  <Text style={styles.private_text}>Birth Date</Text>
                  <DatePicker
                    style={{position: "absolute", right: -35}}
                    date={this.state.date}
                    showIcon={false}
                    customStyles={{
                      dateInput: {
                        borderWidth: 0,
                      },
                      dateText: {
                          color: '#f26c4f',
                          fontSize: 12
                      },
                    }}
                    mode="date"
                    format="YYYY-MM-DD"
                    confirmBtnText="OKAY"
                    cancelBtnText="CANCEL"
                    onDateChange={(date) => {this._updateUserBirthDay(date)}}
                  />
                </View>
                <View style={styles.private_sub_view}>
                  <Text style={styles.private_text}>Email</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => this.setState({open: true, modal_state: 2})}>
                    <Text style={styles.edit_text}>{this.state.email}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.private_sub_view}>
                  <Text style={styles.private_text}>Phone</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => this.setState({open: true, modal_state: 3})}>
                    <Text style={styles.edit_text}>{this.state.phone}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.private_sub_view}>
                  <Text style={styles.private_text}>Address</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => this.setState({open: true, modal_state: 4})}>
                    <Image source={require('../../img/right-arrow.png')}  style={{width: 15,height: 15}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',width: Dimensions.get('window').width - 60,alignSelf: 'center',height: 40,}} >
                  <Text style={styles.private_text}>Service Location</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => NavigationActions.service(0)}>
                    <Image source={require('../../img/right-arrow.png')}  style={{width: 15,height: 15}}/>
                  </TouchableOpacity>
                </View>
              </View>


              <Text style={{fontFamily: 'Montserrat', fontSize: 12, marginTop: 20, alignSelf: 'center', textAlign: 'center'}}>Optional Details</Text>
              <View style={styles.optional_details}>
                <View style={styles.private_sub_view}>
                  <Text style={styles.private_text}>Social Media</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => this.setState({open: true, modal_state: 5})}>
                    <Image source={require('../../img/right-arrow.png')}  style={{width: 15,height: 15}}/>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',width: Dimensions.get('window').width - 60,alignSelf: 'center',height: 40,}} >
                  <Text style={styles.private_text}>Language</Text>
                  <TouchableOpacity  style={styles.right_arrow} onPress={() => this.setState({sub_open: true, sub_modal_state: 3})}>
                    <Text style={styles.edit_text}>{language.find(item=>item.value==this.state.language).label}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.modal} position={"bottom"}>
              <View style={styles.sub_form}>
                <View style={{flexDirection:'row', height: 70, backgroundColor: "#63b7b7",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                  <TouchableOpacity  onPress={() => this._updateUser()}>
                    <Image source={require('../../img/checked_white.png')}  style={{marginTop: 35,marginLeft: 25,width: 22,height: 22}}/>
                  </TouchableOpacity>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 35,marginLeft: 20,color: 'white',textAlign: 'center'}}>Done</Text>
                </View>

                { this.state.modal_state == 4 ? (
                    <TouchableOpacity  onPress={() => this._getCurrentLocation()}>
                      <Image source={require('../../img/map_pin.png')}  style={{flexDirection:'row', position: 'absolute', marginTop: -40,right: 25,width: 30,height: 30}}/>
                    </TouchableOpacity>
                  ) : null                 
                }

                { this.state.modal_state == 0 ? (
                  <View style={{flexDirection: 'column', marginTop: 20}}>
                    <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>First Name</Text>
                    <TextInput
                      style={styles.textinput}
                      value={this.state.f_name}
                      onChange={this.setFirstName.bind(this)}
                    />
                    <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center', marginTop: 20}}>Last Name</Text>
                    <TextInput
                      style={styles.textinput}
                      value={this.state.l_name}
                      onChange={this.setLastName.bind(this)}
                    />
                  </View>) : this.state.modal_state == 1 ? (
                    <View style={{flexDirection: 'column', marginTop: 20}}>
                      <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>About me</Text>
                      <TextInput
                        style={styles.textinput_about}
                        multiline = {true}
                        placeholder = "I've been a hairstylist for 5 years and I'm a braiding expert."
                        value={this.state.about}
                        onChange={this.setAbout.bind(this)}
                      />
                    </View>) : this.state.modal_state == 2 ? (
                      <View style={{flexDirection: 'column', marginTop: 20}}>
                        <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Email</Text>
                        <TextInput
                          style={styles.textinput}
                          placeholder="don_david_l@hotmail.com"
                          value = {this.state.email}
                          onChangeText={text => {
                            if(!text){
                            }
                          }}
                          onChange={this.setEmail.bind(this)}
                        />
                        <Text style={{fontFamily: 'Montserrat', fontSize:14, marginTop: 10, alignSelf:'center'}}>This is used for login and emails from Fro, and is not shared with other users.</Text>
                      </View>) : this.state.modal_state == 3 ? (
                        <View style={{flexDirection: 'column', marginTop: 20}}>
                          <Text style={{fontFamily: 'Montserrat', fontSize:14, alignSelf:'center'}}>Phone</Text>
                          <TextInput
                            style={styles.textinput}
                            value = {this.state.phone.toString()}
                            placeholder="+1(514) 449-4366"
                            onChangeText={text => {
                              if(!text){
                              }
                            }}
                            onChange={this.setPhone.bind(this)}
                          />
                        </View>) :this.state.modal_state == 4 ? (
                          <View style={{flexDirection: 'column'}}>
                            <View style={{flexDirection: 'row', height: 100, alignItems: 'center', backgroundColor: 'white'}}>
                              <Image source={require('../../img/address_user.png')} style={styles.address_icon}/>
                              <View style={styles.address_notice}>
                                <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>Your exact address, location, and{'\n'} 
                                  + directions are visible to clients{'\n'}with a confirmed reservation</Text>
                              </View>
                            </View>
                            <View style={styles.address_wrap}>
                              <TextInput
                                style={styles.address_input}
                                placeholder='Street / Road Name'
                                value={this.state.street1}
                                onChangeText={text => {
                                  
                                }}
                                onChange={this.setStreet1.bind(this)}
                              />
                            </View>
                            <View style={styles.address_wrap}>
                              <TextInput
                                style={styles.address_input}
                                placeholder='Apt / Suite / Building'
                                value={this.state.street2}
                                onChangeText={text => {
                                  
                                }}
                                onChange={this.setStreet2.bind(this)}
                              />
                            </View>
                            <View style={styles.address_wrap}>
                              <TextInput
                                style={styles.address_input}
                                placeholder='City / Town / District'
                                value={this.state.city}
                                onChangeText={text => {
                                  
                                }}
                                onChange={this.setCity.bind(this)}
                              />
                            </View>
                            <View style={styles.address_wrap}>
                              <TextInput
                                style={styles.address_input}
                                placeholder='State / Province / Country'
                                value={this.state.province}
                                onChangeText={text => {
                                  
                                }}
                                onChange={this.setProvince.bind(this)}
                              />
                            </View>
                            <View style={styles.address_wrap}>
                              <TextInput
                                style={styles.address_input}
                                placeholder='Zip / Postal Code'
                                value={this.state.zip}
                                onChangeText={text => {
                                  
                                }}
                                onChange={this.setZip.bind(this)}
                              />
                            </View>
                            <View style={styles.address_wrap}>
                              <TextInput
                                style={styles.address_input}
                                placeholder='Canada'
                                value={this.state.country}
                                onChangeText={text => {
                                  
                                }}
                                onChange={this.setCountry.bind(this)}
                              />
                            </View>
                          </View>) : this.state.modal_state == 5 ? (
                            <View style={{flexDirection: 'column', marginTop: 20}}>
                              <Text style={{fontFamily: 'Montserrat', fontSize:16, alignSelf:'center'}}>Public Web Address</Text>
                              <TextInput
                                style={styles.textinput}
                                placeholder="donjohn"
                              />
                              <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 12, marginTop: 15}}>Pick something short, memorable and recognizable{'\n'}
                                for your public web address.</Text>
                              <Text style={{fontFamily: 'Montserrat', fontSize:16, alignSelf:'center', marginTop: 20}}>Salon Name</Text>
                              <TextInput
                                style={styles.textinput}
                                value={this.state.twitter}
                                placeholder="Your salon name"
                                onChange={this.setInstagram.bind(this)}
                              />
                              <Text style={{fontFamily: 'Montserrat', fontSize:16, alignSelf:'center', marginTop: 20}}>Instagram Username</Text>
                              <TextInput
                                style={styles.textinput}
                                placeholder="Username"
                                onChange={this.setInstagram.bind(this)}
                              />
                              <Text style={{fontFamily: 'Montserrat', fontSize:16, alignSelf:'center', marginTop: 20}}>Facebook URL</Text>
                              <TextInput
                                style={styles.textinput}
                                value={this.state.facebook}
                                placeholder="www.facebook.com/yourpage"
                                onChange={this.setFacebook.bind(this)}
                              />
                              <Text style={{fontFamily: 'Montserrat', fontSize:16, alignSelf:'center', marginTop: 20}}>Business Website</Text>
                              <TextInput
                                style={styles.textinput}
                                value={this.state.website}
                                placeholder = "www.yoursalon.com"
                                onChange={this.setWebsite.bind(this)}
                              />
                            </View>
                          ) :null
                }
              </View>
            </Modal>

            <Modal isOpen={this.state.sub_open} onClosed={() => this.setState({sub_open: false})} style={this.state.sub_modal_state == 2 ? styles.gender_modal : this.state.sub_modal_state == 3 ? styles.lan_modal : styles.sub_modal} position={"center"}>
              {
                this.state.sub_modal_state == 1 ? (
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={styles.modal_text}>Changing your email address will also change your Fro email login. Are you sure you want to continue?</Text>
                    <View style={{flexDirection:'row', height: 30, alignSelf: 'center', }}>
                      <Button onPress={() => this.setState({sub_open: false})} style={{fontFamily: 'Montserrat', fontSize: 14,alignSelf: 'center', color:'black'}}>CANCEL</Button>
                      <Button onPress={() => this.setState({sub_open: false})} style={{fontFamily: 'Montserrat', fontSize: 14,alignSelf: 'center', color:'#f26c4f', marginLeft: 15}}>CONTINUE</Button>
                    </View>
                  </View>
                ) : this.state.sub_modal_state == 2 ? (
                  <View style={{flex:1}}>
                    <ListView
                      dataSource={this.state.gender_dataSource}
                      renderRow={this.gender_renderRow.bind(this)}
                    />
                  </View>
                ) : this.state.sub_modal_state == 3 ? (
                  <View style={{flex:1}}>
                    <ListView
                      dataSource={this.state.lan_dataSource}
                      renderRow={this.lan_renderRow.bind(this)}
                    />
                  </View>
                ) : (
                  <View style={{flexDirection:'column',alignItems:'center'}}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 18, paddingLeft: 15, width: Dimensions.get('window').width - 60, alignSelf: 'center'}}>Take Picture</Text>
                    <Text style={styles.modal_text}>Take a new photo or select one from your existing photo library.</Text>
                    <View style={{flexDirection:'row',position: "absolute", bottom: 5, right: 20}}>
                      <Button onPress={this.chooseImage.bind(this)} style={{fontFamily: 'Montserrat', fontSize: 14,alignSelf: 'center', color:'#63b7b7'}}>GALLERY</Button>
                      <Button onPress={this.takePhoto.bind(this)} style={{fontFamily: 'Montserrat', fontSize: 14,alignSelf: 'center', color:'#63b7b7', marginLeft: 15}}>CAMERA</Button>
                    </View>
                  </View>
                )
              }
            </Modal>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sub_form: {
    flex:1,
    flexDirection:'column',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  navBar: {
    flexDirection:'row',
    height: 60,
    width: Dimensions.get('window').width,
    backgroundColor: "#63b7b7",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 1,width: 0},
    zIndex: 0,
  },
  profile: {
    width: 80,
    height: 80
  },
  profile_view: {
    width: Dimensions.get('window').width/3,
    alignItems: 'center',
    alignSelf: 'center'
  },
  icon: {
    width: 25,
    height: 25
  },
  text: {
    fontFamily: 'Montserrat', fontSize: 18, alignSelf: 'center', width:Dimensions.get('window').width*4/5,  marginLeft: 30
  },
  icon_view: {
    width: Dimensions.get('window').width/5 - 60,
    alignItems: 'center',
    alignSelf: 'center'
  },
  photo_view: {
    width: 32, alignItems: 'center', height: 25, position: "absolute", bottom: 5, right: 5
  },
  edit_text: {
    fontFamily: 'Montserrat', fontSize: 12, color: '#f26c4f', alignSelf: 'center', textAlign: 'center'
  },
  private_details: {
    flexDirection:'column',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 240,
    width: Dimensions.get('window').width - 30,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 2,
    shadowOffset: {height: 0.1,width: 0},
  },
  optional_details: {
    flexDirection:'column',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 15,
    height: 80,
    width: Dimensions.get('window').width - 30,
    backgroundColor: "#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.5,
    shadowRadius: 2,
    borderRadius: 2,
    shadowOffset: {height: 0.1,width: 0},
    marginBottom: 30
  },
  private_sub_view: {
    flexDirection:'row',
    width: Dimensions.get('window').width - 60,
    alignSelf: 'center',
    height: 40,
    borderBottomWidth: 0.2
  },
  private_text: {
    fontFamily: 'Montserrat', fontSize: 12, alignSelf: 'center'
  },
  right_arrow: {
    alignSelf: 'center', position: "absolute", right: 0
  },
  number: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width/2 * 1.6,
    height: 37,
    fontSize:12,
    color: '#f26c4f',
    textAlign: 'right',
    alignSelf: 'center', position: "absolute", right: 0
  },

  modal: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0f0',
  },
  textinput: {
    fontFamily: 'Montserrat',
    width:Dimensions.get('window').width - 30,
    fontSize: 14,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderWidth:0.8,
    borderColor:'#808080',
    borderRadius:2,
    marginTop:10,
    textAlign: 'left',
    height: 50,
    alignSelf: 'center'
  },
  textinput_about: {
    fontFamily: 'Montserrat',
    width:Dimensions.get('window').width - 30,
    fontSize: 14,
    backgroundColor: 'white',
    paddingLeft: 10,
    borderWidth:0.8,
    borderColor:'#808080',
    borderRadius:2,
    marginTop:10,
    textAlign: 'left',
    height: 100,
    alignSelf: 'center'
  },
  sub_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:Dimensions.get('window').width - 50,
    height: 140,
    borderRadius: 2
  },
  modal_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    alignSelf: 'center',
    padding: 15,
    width: Dimensions.get('window').width - 60,
    height: 100
  },
  gender_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:Dimensions.get('window').width - 50,
    height: 119,
    borderRadius: 2
  },
  lan_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:Dimensions.get('window').width - 50,
    height: 79,
    borderRadius: 2
  },
  address_input: {
    fontFamily: 'Montserrat',
    width:Dimensions.get('window').width - 30,
    backgroundColor: 'rgba(0, 0, 0, 0)',
    fontSize: 14,
    marginTop:10,
    textAlign: 'left',
    height: 37,
    alignSelf: 'center',
  },
  address_wrap : {
    width:Dimensions.get('window').width - 30,
    borderBottomWidth: 0.8,
    borderBottomColor:'#808080',
    alignSelf: 'center',
  },
  address_icon: {
    width: 30,
    height: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 45
  },
  address_notice: {
    height: 80,
    justifyContent: 'center',
    marginLeft: 40
  }
});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

function mapDispatchToProps(dispatch) {
  return {
        selected1: (isSelected1) => {
            dispatch(selected1(isSelected1));
        },
        selected2: (isSelected2) => {
            dispatch(selected2(isSelected2));
        },
        selected3: (isSelected3) => {
            dispatch(selected3(isSelected3));
        },
        unselected: () => {
            dispatch(unselected());
        },
        actions: bindActionCreators(ActionCreators, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(profileEdit);
