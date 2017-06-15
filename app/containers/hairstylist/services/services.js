import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../../actions';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

var parent_services = []
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

class Services extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          category: true,
          services: []
        }
    }

    componentDidMount() {

    }

    componentWillMount() {
      this._getUser();
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.test !== nextProps.test) {
        this._getUser()
      }
    }

    _getUser() {
      const { authState } = this.props;
      this.props.fetchUser(authState.user._id, authState.token).then(() => {
        const { apiState } = this.props;
        this.setState({
          services: (apiState.user.providerData) ? this._parseResponse(apiState.user.providerData.services):[]
        });
      });
    }

    _findParent(id) {
      for(var i=0; i<parent_services.length; i++) {
        if (parent_services[i].id == id) return i
      }
      return -1
    }

    _parseResponse(response) {
      parent_services = []
      for(var i=0; i<response.length; i++) {
        let parent_index = this._findParent(response[i].parent._id);
        if (parent_index == -1) {
          var new_parent = {}
          new_parent["id"] = response[i].parent._id
          new_parent["name"] = response[i].parent.name
          new_parent["child"] = [response[i]]
          new_parent["expand"] = true
          parent_services.push(new_parent)
        } else {
          var childs = parent_services[parent_index].child
          childs.push(response[i])
        }
      }
      return parent_services
    }

    btnPress(state){
      if(state == 0)
        NavigationActions.addService(0)
      else
        NavigationActions.addService({data: state})
    }

    _updateState(index) {
      var tmp = this.state.services
      tmp[index].expand = !tmp[index].expand
      this.setState({
        services: tmp
      })
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Service Menu</Text>
              <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 23 : 5}} onPress={() => this.btnPress(0)}>
                <Text style={{fontSize: 24, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'}}>+</Text>
              </TouchableOpacity>
            </View>
            {
              this.state.services.length == 0 ? (
                <View style={styles.top_view}>
                  <Text style={{fontSize: 20, fontFamily: 'Montserrat', textAlign: 'center', marginBottom: 10}}>No Service Added Yet</Text>
                </View>
              ) : (
                <ScrollView style={{flexDirection: 'column'}}>
                  {
                    this.state.services.map((service, i) =>
                      <View key={service.id}>
                        <View style={{flexDirection: 'row', width: width-40, height: 60, alignSelf: 'center', alignItems: 'center', borderBottomWidth: 0.5}}>
                          <Text style={{fontSize: 20, fontFamily: 'Montserrat', width: width-40, textAlign: 'center'}}>{service.name}</Text>
                          <TouchableOpacity  style={{position: "absolute", right: 5, alignSelf: 'center'}}  onPress={() => this._updateState(i)}>
                            <Image source={service.expand ? require('../../../img/down_aroow.png') : require('../../../img/up_arrow.png')} style={{width: 12, height: 6}}/>
                          </TouchableOpacity>
                        </View>
                        <View>
                        {
                          service.expand ? (
                            service.child.map((child)=>
                              <View key = {child.serviceId} style={{flexDirection: 'row', width: width-40, height: 80, alignSelf: 'center', alignItems: 'center', borderBottomWidth: 0.2}}>
                                <View style={{flexDirection: 'column'}}>
                                  <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left'}}>{child.name}</Text>
                                  <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left', color: '#63b7b7'}}>{'$' + child.price + '  ' +  time[child.duration].label}</Text>
                                </View>
                                <TouchableOpacity  style={{position: "absolute", right: 5, alignSelf: 'center'}}  onPress={() => this.btnPress(child)}>
                                  <Image source={require('../../../img/pencil.png')} style={{width: 18, height: 18}}/>
                                </TouchableOpacity>
                              </View>
                            )
                          ):null
                        }
                        </View>           
                      </View>
                    )
                  }
                </ScrollView>
              )
            }
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
  top_view: {
    flexDirection: 'column',
    width: width,
    height: 140,
    alignSelf: 'center',
    justifyContent: 'center'
  },
});

const mapStateToProps = (state) => {
  const {api} = state
  const {auth} = state
  const props = {
    save_data: state.addService.save_data,
    apiState: api,
    authState: auth
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
