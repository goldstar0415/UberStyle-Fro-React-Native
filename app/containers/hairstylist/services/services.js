import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Services extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          category: true
        }
    }

    componentDidMount() {

    }

    btnPress(state){
      if(state == 0)
        NavigationActions.addService(0)
      else
        NavigationActions.addService(1)
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
              this.props.save_data.length == 0 ? (
                <View style={styles.top_view}>
                  <Text style={{fontSize: 20, fontFamily: 'Montserrat', textAlign: 'center', marginBottom: 10}}>No Service Added Yet</Text>
                </View>
              ) : (
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
                        <TouchableOpacity  style={{position: "absolute", right: 5, alignSelf: 'center'}}  onPress={() => this.btnPress(1)}>
                          <Image source={require('../../../img/pencil.png')} style={{width: 18, height: 18}}/>
                        </TouchableOpacity>
                      </View>
                    ) : null
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
    const props = {
      save_data: state.addService.save_data
    };
    return props;
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Services)
