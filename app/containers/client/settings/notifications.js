import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import CheckBox from 'react-native-check-box'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

let checked = (<Image source={require('../../../img/checked1.png')} style={{width:15,height:15}}/>)
let unchecked = (<Image source={require('../../../img/unchecked.png')} style={{width:15,height:15}}/>)

class Notifications extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          p_notifications: true,
          t_notifications: true,
          messages: true,
          reservations: false,
          account: false,
          fro: true
        }
    }

    componentDidMount() {

    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Notifications</Text>
            </View>

            <View style={styles.sub_view}>
              <Text style={styles.text}>Push Notifications</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.p_notifications){
                     this.setState({p_notifications:false})
                   }else{
                     this.setState({p_notifications:true})
                   }
                 }}
                 isChecked={this.state.p_notifications}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>

            <View style={styles.sub_view}>
              <Text style={styles.text}>Text Notifications</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.t_notifications){
                     this.setState({t_notifications:false})
                   }else{
                     this.setState({t_notifications:true})
                   }
                 }}
                 isChecked={this.state.t_notifications}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>

            <View style={[styles.sub_view, {marginTop: 20}]}>
              <Text style={[styles.text, {fontSize: 18}]}>Receive notifications for:</Text>
            </View>

            <View style={styles.sub_view}>
              <Text style={styles.text}>Messages</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.messages){
                     this.setState({messages:false})
                   }else{
                     this.setState({messages:true})
                   }
                 }}
                 isChecked={this.state.messages}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>

            <View style={styles.sub_view}>
              <Text style={styles.text}>Reservations</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.reservations){
                     this.setState({reservations:false})
                   }else{
                     this.setState({reservations:true})
                   }
                 }}
                 isChecked={this.state.reservations}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>

            <View style={styles.sub_view}>
              <Text style={styles.text}>Account Activity</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.account){
                     this.setState({account:false})
                   }else{
                     this.setState({account:true})
                   }
                 }}
                 isChecked={this.state.account}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>

            <View style={styles.sub_view}>
              <Text style={styles.text}>Fro Recommendations</Text>
              <CheckBox
                 style={styles.checkbox}
                 onClick={()=>{
                   if(this.state.fro){
                     this.setState({fro:false})
                   }else{
                     this.setState({fro:true})
                   }
                 }}
                 isChecked={this.state.fro}
                 checkedImage={checked}
                 unCheckedImage={unchecked}
             />
            </View>

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
  text: {
    fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'
  },
  checkbox: {
    position: 'absolute',
    right: 0
  },
  sub_view: {
    flexDirection:'row', width: width-40, alignSelf: 'center', alignItems: 'center', height: 60, borderBottomWidth: 0.2
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

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
