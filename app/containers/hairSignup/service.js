import React, { Component, PropTypes } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Dimensions
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'

import { Actions as NavigationActions } from 'react-native-router-flux'
import styles from '../../styles/hairSignupStyles'
import RoundCheckbox from 'rn-round-checkbox';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import {selected1,selected2,selected3,unselected} from '../../actions';

import { connect } from 'react-redux'

class service extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      price: '',
      travel: []
    }
  }

  setPrice(event) {
    let price = event.nativeEvent.text;
    this.setState({price})
  }

  buttonPress = () => {
    if (this.props.isSelected1) {
      this.state.travel.push("Provider Home");
    }
    if (this.props.isSelected2) {
      this.state.travel.push("Salon");
    }
    if (this.props.isSelected3) {
      this.state.travel.push("Client");
    }
    this._goToNextView(NavigationActions.hours, {first: this.props.first, last: this.props.last,
              email: this.props.email, password: this.props.password, phone: this.props.phone, 
              provider: "Hair Stylist", price: this.state.price, travel: this.state.travel});
  }

  _goToNextView(nextView, data) {
    nextView(data);
  }

  back_button = () => {
    this.props.unselected()
    NavigationActions.first()
  }

  render(){
    return (
      <View style={{flex: 1}}>
        <View style={[styles.sub_form, {width: width, height: this.props.data == 0 ? 120 : height - 420, backgroundColor: this.props.data == 0 ? '#ffffff' : '#63b7b7'}]}>
          {
            this.props.data == 0 ? (
              <View>
                <TouchableOpacity style={{flexDirection: 'row'}} onPress={NavigationActions.pop}>
                  <Image source={require('../../img/checked.png')}  style={{marginTop: 35,marginLeft: 25,width: 22,height: 22}}/>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 35,marginLeft: 20,color: '#808080',textAlign: 'center'}}>Done</Text>
                </TouchableOpacity>
                <Text style={styles.s_text}>Where do you perform your services?</Text>
              </View>
            ) : (
              <View style={{flexDirection:'column', alignSelf: 'center', width: width-40, height: height - 420}}>
                <View style={{flexDirection: 'row', width: width-40, height: 20, alignSelf: 'center', alignItems: 'center', marginTop: Platform.OS === 'ios' ? 20 : 0}}>
                  <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f'}}/>
                  <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f', marginLeft: 20}}/>
                  <View style={{width: (width-100)/4, height: 3, backgroundColor: '#f26c4f', marginLeft: 20}}/>
                  <View style={{width: (width-100)/4, height: 3, backgroundColor: '#ffffff', marginLeft: 20}}/>
                </View>
                <TouchableOpacity style={{marginTop: 5}} onPress={NavigationActions.pop}>
                  <Image source={require('../../img/back_white.png')}  style={styles.backBtn}/>
                </TouchableOpacity>
                <Text style={styles.text}>Where do you perform{'\n'}your services?</Text>
              </View>
            )
          }
        </View>
        <ScrollView>
        <View style={{flexDirection: 'row', alignSelf: 'center', marginTop: 20}}>
          <TouchableOpacity onPress={() => this.props.selected1(!this.props.isSelected1)}>
            <View style={this.props.isSelected1 ? styles.service_selected_btn : styles.service_btn}>
              <Image source={this.props.isSelected1  ? require('../../img/home_white.png') : require('../../img/home_black.png')}  style={{width: 25,height: 25}}/>
              <Text style={this.props.isSelected1  ? {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10}}>My Home</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selected2(!this.props.isSelected2)}>
            <View style={this.props.isSelected2  ? [styles.service_selected_btn, {marginLeft: 12}] : [styles.service_btn, {marginLeft: 12}]}>
              <Image source={this.props.isSelected2  ? require('../../img/salon_white.png') : require('../../img/salon_black.png')}  style={{width: 25,height: 25}}/>
              <Text style={this.props.isSelected2  ? {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10}}>A Salon</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.selected3(!this.props.isSelected3)}>
            <View style={this.props.isSelected3  ? [styles.service_selected_btn, {marginLeft: 12}] : [styles.service_btn, {marginLeft: 12}]}>
              <Image source={this.props.isSelected3  ? require('../../img/car_white.png') : require('../../img/car_black.png')}  style={{width: 25,height: 25}}/>
              <Text style={this.props.isSelected3  ? {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10, color: 'white'} : {fontFamily: 'Montserrat', fontSize: 14, marginTop: 10}}>Client's Place</Text>
            </View>
          </TouchableOpacity>
        </View>
        {
          this.props.isSelected3 ? (
            <View style={{flexDirection:'column',  marginTop: 50, alignSelf: 'center', alignItems: 'center'}}>
              <Text style={{fontFamily: 'Montserrat', fontSize: 14,textAlign: 'center'}}>How much is your travel fee?</Text>
              <View style={{alignItems: 'center', flexDirection: 'row', marginTop: 30, width: 100, height: 55, borderRadius: 2, backgroundColor: "#ffffff",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                <Text style={{fontFamily: 'Montserrat', width: 40, fontSize: 22, color: '#f26c4f',textAlign: 'right'}}>$</Text>
                <TextInput
                  style={{fontFamily: 'Montserrat', width:60, fontSize: 22, color:'#f26c4f'}}
                  keyboardType='numeric'
                  autoFocus={true}
                  onChange={this.setPrice.bind(this)}
                  value={this.state.price}
                />
              </View>
            </View>
          ) : null
        }
        </ScrollView>
        {
          this.props.data != 0 ? (
            this.props.isSelected1 || this.props.isSelected2 || this.props.isSelected3 ? (
              <TouchableOpacity onPress={this.buttonPress}>
                <View style={styles.sBtn_view}>
                  <Text style={styles.loginBtntext}>Continue</Text>
                </View>
              </TouchableOpacity>
            ) : (
              <View style={styles.sBtn_view_gray}>
                <Text style={styles.loginBtntext}>Continue</Text>
              </View>
            )
          ) : null
        }


      </View>
    );
  }
}

const mapStateToProps = (state) => {
    const props = {
        isSelected1: state.service.isSelected1,
        isSelected2: state.service.isSelected2,
        isSelected3: state.service.isSelected3
    };

    return props;
};
const mapDispatchToProps = (dispatch) => {
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
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(service)
