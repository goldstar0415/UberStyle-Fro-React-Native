import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import Modal from 'react-native-modalbox';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const time = ['15 m', '30 m', '45 m','1 h', '1 h 15 m', '1 h 30 m', '1 h 45 m', '2 h', '2 h 15 m', '2 h 30 m', '2 h 45 m', '3 h',
              '3 h 15 m', '3 h 30 m', '3 h 45 m', '4 h', '4 h 15 m', '4 h 30 m', '4 h 45 m', '5 h', '5 h 15 m', '5 h 30 m', '5 h 45 m', 
              '6 h', '6 h 15 m', '6 h 30 m', '6 h 45 m', '7 h', '7 h 15 m', '7 h 30 m', '7 h 45 m', '8 h', '8 h 15 m', '8 h 30 m', 
              '8 h 45 m', '9 h', '9 h 15 m', '9 h 30 m', '9 h 45 m',  '10 h']

class Selectdesired extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          size: 2,
          length: 1
        }
    }

    componentDidMount() {

    }

    _goToSelectDate() {
      let data = {
        "stylist_id" : this.props.stylist_id,
        "service" : this.props.service,
        "stylist_name": this.props.stylist_name,
        "ability": this.props.ability,
        "options": {
          "size": this.state.size,
          "length": this.state.length
        },
        "duration":time[this.props.service.duration],
        "travelType":this.props.travelType,
        "travelCost": this.props.travelCost
      }
      NavigationActions.selectDate(data)
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>{this.props.service.name}</Text>
            </View>
            <ScrollView>
              <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center'}}>Select your desired size</Text>
                <TouchableOpacity style={{marginLeft: 10, marginTop: 3}} onPress={() => this.setState({size_open: true})}>
                  <Image source={require('../../../img/info1.png')}  style={{width: 20,height: 20}}/>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <TouchableOpacity style={this.state.size == 0 ? [styles.size_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.size_view} onPress={() => this.setState({size: 0})}>
                  <Text style={styles.size_text}>Micro</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.size == 1 ? [styles.size_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.size_view} onPress={() => this.setState({size: 1})}>
                  <Text style={styles.size_text}>Small</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.size == 2 ? [styles.size_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.size_view} onPress={() => this.setState({size: 2})}>
                  <Text style={styles.size_text}>Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.size == 3 ? [styles.size_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.size_view} onPress={() => this.setState({size: 3})}>
                  <Text style={styles.size_text}>Large</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.size == 4 ? [styles.size_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.size_view} onPress={() => this.setState({size: 4})}>
                  <Text style={styles.size_text}>Jumbo</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: width, height: 1, borderBottomWidth: 1, borderColor: '#d3d3d3', marginTop: 30}}/>

              <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <Text style={{fontSize: 14, fontFamily: 'Montserrat', textAlign: 'center'}}>Select your desired length</Text>
                <TouchableOpacity style={{marginLeft: 10, marginTop: 3}} onPress={() => this.setState({length_open: true})}>
                  <Image source={require('../../../img/info1.png')}  style={{width: 20,height: 20}}/>
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', width: width, alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                <TouchableOpacity style={this.state.length == 0 ? [styles.length_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.length_view} onPress={() => this.setState({length: 0})}>
                  <Text style={styles.size_text}>10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.length == 1 ? [styles.length_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.length_view} onPress={() => this.setState({length: 1})}>
                  <Text style={styles.size_text}>12</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.length == 2 ? [styles.length_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.length_view} onPress={() => this.setState({length: 2})}>
                  <Text style={styles.size_text}>18</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.length == 3 ? [styles.length_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.length_view} onPress={() => this.setState({length: 3})}>
                  <Text style={styles.size_text}>22</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.length == 4 ? [styles.length_view, {borderWidth: 1, borderColor: '#63b7b7'}] : styles.length_view} onPress={() => this.setState({length: 4})}>
                  <Text style={styles.size_text}>28</Text>
                </TouchableOpacity>
              </View>
              <View style={{width: width, height: 1, borderBottomWidth: 1, borderColor: '#d3d3d3', marginTop: 30}}/>
            </ScrollView>
            <TouchableOpacity style={styles.sBtn_view} onPress={()=>this._goToSelectDate()}>
              <Text style={styles.loginBtntext}>{this.props.service.price + '•' + time[this.props.service.duration]}</Text>
            </TouchableOpacity>

            <Modal isOpen={this.state.size_open} onClosed={() => this.setState({size_open: false})} style={styles.modal} position={"top"} swipeToClose={false}>
              <View style={{flex: 1}}>
                <View style={styles.navBar}>
                  <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 29 : 10}} onPress={() => this.setState({size_open: false})}>
                    <Image source={require('../../../img/close.png')}  style={{width: 20,height: 20}}/>
                  </TouchableOpacity>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Braids Size Chart</Text>
                </View>
                <Text style={{fontFamily: 'Montserrat', fontSize:12, width: width-20, alignSelf: 'center', marginTop: 30, textAlign: 'center'}}>These may appear larger or smaller depending upon{'\n'}your screen resolution. Use the ruler measurements{'\n'}to be more exact.</Text>
                <Image source={require('../../../img/Braids_english.png')}  style={{width: width-20, height: 320, alignSelf: 'center', marginTop: 20}} resizeMode={'contain'}/>
              </View>
              <TouchableOpacity onPress={() => this.setState({size_open: false})}>
                <View style={[styles.sBtn_view, {marginTop: 0}]}>
                  <Text style={styles.loginBtntext}>Got it</Text>
                </View>
              </TouchableOpacity>
            </Modal>

            <Modal isOpen={this.state.length_open} onClosed={() => this.setState({length_open: false})} style={styles.modal} position={"top"} swipeToClose={false}>
              <View style={{flex: 1}}>
                <View style={styles.navBar}>
                  <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 29 : 10}} onPress={() => this.setState({length_open: false})}>
                    <Image source={require('../../../img/close.png')}  style={{width: 20,height: 20}}/>
                  </TouchableOpacity>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Braids Length Chart</Text>
                </View>
                <Image source={require('../../../img/length_english.png')}  style={{width: width-20, height: 400, alignSelf: 'center', marginTop: 20}} resizeMode={'contain'}/>
              </View>
              <TouchableOpacity onPress={() => this.setState({length_open: false})}>
                <View style={[styles.sBtn_view, {marginTop: 0}]}>
                  <Text style={styles.loginBtntext}>Got it</Text>
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
  navBar: {
    flexDirection:'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    width: width,
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
  size_view: {
    width: 80,
    height: 30,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  size_text: {
    fontSize: 13,
    fontFamily: 'Montserrat',
    textAlign: 'center'
  },
  length_view: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
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
  modal: {
    width: width,
    height: 550
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

export default connect(mapStateToProps, mapDispatchToProps)(Selectdesired)
