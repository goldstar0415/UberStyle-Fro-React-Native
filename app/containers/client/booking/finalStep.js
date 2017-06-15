import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import Modal from 'react-native-modalbox';
import RadioButton from 'radio-button-react-native';

var {GooglePlacesAutocomplete} = require('react-native-google-places-autocomplete');

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const size = ["Micro", "Small", "Medium", "Large", "Jumbo"]
const length = [10, 12 ,18, 22, 28]
const full_monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const services = []

class Finalstep extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          dataSource: ds.cloneWithRows(services),
          service: 0,
          position: {
            lat: null,
            lng: null
          },
          error: null,
          country: null,
          locality: null,
          area: null,
          geo_value: '',
          coupon: '',
          message: '',
        }
    }

    _configServices(){
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      services = []
      for (var i=0; i<this.props.travelType.length; i++) {
        services.push({
          label: this.props.travelType[i],
          value: i
        })
      }
      this.setState({
        dataSource: ds.cloneWithRows(services)
      })
    }

    componentWillMount() {
      this._configServices()
    }

    setGeolocation(data, details) {
      this.setState({
        position: {
          lat: details.geometry.location.lat,
          lng: details.geometry.location.lng
        },
        geo_value: data.description
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

    servicePress(value){
      this.setState({sub_open: false, service: value})
    }

    setCoupon(event) {
      let coupon = event.nativeEvent.text;
      this.setState({coupon})
    }

    setMessage(event) {
      let message = event.nativeEvent.text;
      this.setState({message})
    }

    _goFinalConfirm() {
      let data = {
        "stylist_id" : this.props.stylist_id,
        "service" : this.props.service,
        "stylist_name": this.props.stylist_name,
        "options": {
          "size": this.props.options.size,
          "length": this.props.options.length
        },
        "startDataTime": new Date(this.props.day + " 2017 " + this.props.startTime),
        "price": this.props.service.price,
        "travelType": ["Client"],
        "coupon": this.state.coupon,
        "message":this.state.message, 
        "payment": "Cash",
        "duration": (this.props.service.duration+1)*15,
        "location": this.state.position
      }
      NavigationActions.finalConfirm(data)
    }

    _getDay() {
      console.log(this.props)
      var date = new Date(this.props.day + " 2017")
      console.log(date)
      return full_monthNames[date.getMonth()] + " " + date.getDate().toString()
    }

    renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.servicePress(rowData.value)} >
          <View style={styles.private_sub_view}>
            <Text style={styles.private_text}>{rowData.label}</Text>
            <View  style={styles.right_arrow}>
              <RadioButton currentValue={this.state.service} value={rowData.value} onPress={() => this.servicePress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Review Appointment</Text>
            </View>
            <ScrollView>
              <View style={{width: width-60, alignSelf: 'center'}}>
                <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 30}}>
                  <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left'}}>{this.props.service.name} - {size[this.props.options.size]} {length[this.props.options.length]}</Text>
                    <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'left'}}>{this._getDay()}, {this.props.startTime} - {this.props.duration+'\n'+this.props.stylist_name}</Text>
                  </View>
                  <Image source={require('../../../img/david.jpg')} style={styles.profile}/>
                </View>

                <Text style={styles.sub_title}>Service Location</Text>
                <TouchableOpacity style={{flexDirection: 'row', width: width-60, height: 50, backgroundColor: 'white', marginTop: 10, alignItems: 'center'}} onPress={() => this.setState({sub_open: true})}>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', textAlign: 'left', marginLeft: 15}}>{services[this.state.service].label}</Text>
                  <Image source={require('../../../img/down-arrow.png')}  style={{width: 12,height: 12, position: 'absolute', right: 20}}/>
                </TouchableOpacity>
                {
                  services[this.state.service].label == "Client" ? (
                    <View style={{width: width-60, height: 50, backgroundColor: 'white', zIndex: 1}}>
                      <View style={{width: width-90, height: 1, backgroundColor: '#d3d3d3', alignSelf: 'center'}}/>
                      <View  style={{width: width-60, height: 50, alignSelf: 'center'}}>
                        <GooglePlacesAutocomplete
                              placeholder='Enter your address'
                              placeholderTextColor = '#d3d3d3'
                              minLength={1}
                              autoFocus={false}
                              listViewDisplayed='auto'
                              fetchDetails={true}
                              renderDescription={(row) => row.description}
                              onPress={this.setGeolocation.bind(this)}
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
                                  width: width - 90,
                                  fontFamily: 'Montserrat',
                                  fontSize: 16,
                                  textAlign: 'left',
                                  height: 40,
                                  alignSelf: 'center',
                                  marginLeft: -10
                                },
                                listView: {
                                  width: width - 60,
                                  alignSelf: 'center',
                                  position: 'absolute',
                                  top: 50,
                                  backgroundColor: '#f1f0f0'
                                },
                                container: {
                                  width: width - 90,
                                  marginLeft: 15,
                                },
                                description: {
                                  marginLeft: 0,
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
                        </View>
                    </View>
                  ) : null
                }

                <Text style={styles.sub_title}>Price</Text>
                <View style={{width: width-60, height: 100, backgroundColor: 'white', marginTop: 10}}>
                  <View style={{flexDirection: 'row', width: width-90, height: 50, alignSelf: 'center', borderBottomWidth: 1, borderColor: '#d3d3d3', alignItems: 'center'}}>
                    <Text style={{fontSize: 16, fontFamily: 'Montserrat', textAlign: 'left'}}>Total</Text>
                    <Text style={{fontSize: 16, fontFamily: 'Montserrat', textAlign: 'right', color: '#63c174', position: 'absolute', right: 0}}>{services[this.state.service].label == "Client" ? '$'+(this.props.service.price+this.props.travelCost) : '$'+this.props.service.price}</Text>
                  </View>
                  <TextInput
                    style={{width: width-90, height: 50, fontSize: 16, fontFamily: 'Montserrat', textAlign: 'left', alignSelf: 'center'}}
                    placeholder='Have a coupon code?'
                    onChange={this.setCoupon.bind(this)}
                  />
                </View>

                <Text style={styles.sub_title}>Payment</Text>
                <View style={{flexDirection: 'row', width: width-60, height: 50, backgroundColor: 'white', marginTop: 10, alignItems: 'center'}}>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', textAlign: 'left', marginLeft: 15}}>Cash</Text>
                  <Image source={require('../../../img/down-arrow.png')}  style={{width: 12,height: 12, marginLeft: 10, marginTop: 3}}/>
                  <Image source={require('../../../img/green_tick.png')}  style={{width: 20,height: 20, position: 'absolute', right: 15}}/>
                </View>

                <Text style={styles.sub_title}>Message</Text>
                <TextInput
                  style={{width: width-60, height: 100, fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center', backgroundColor: 'white', marginTop: 10, padding: 10, marginBottom: 50}}
                  multiline = {true}
                  placeholder='Share details about your hair, the style your want to do or ask a question.'
                  onChange={this.setMessage.bind(this)}
                />

              </View>
              <TouchableOpacity style={styles.sBtn_view} onPress={()=>this._goFinalConfirm()}>
                <Text style={styles.loginBtntext}>Book Now</Text>
              </TouchableOpacity>
            </ScrollView>

            <Modal isOpen={this.state.sub_open} onClosed={() => this.setState({sub_open: false})} style={styles.modal} position={"center"}>
              <View style={{flex:1}}>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
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
    backgroundColor: '#f1f0f0',
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
  profile: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    right: 0
  },
  sub_title: {
    fontSize: 16,
    fontFamily: 'Montserrat',
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 30
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    height: 119,
    borderRadius: 2
  },
  private_sub_view: {
    flexDirection:'row',
    width: width - 100,
    alignSelf: 'center',
    height: 40,
    borderBottomWidth: 0.2
  },
  private_text: {
    fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'
  },
  right_arrow: {
    alignSelf: 'center', position: "absolute", right: 0
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Finalstep)
