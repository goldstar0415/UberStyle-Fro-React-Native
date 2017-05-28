import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class About extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

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
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>About</Text>
            </View>

            <TouchableOpacity style={styles.sub_view} onPress={this.props.press}>
              <Text style={styles.text}>Rate us in App Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={this.props.press}>
              <Text style={styles.text}>Like us on Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={this.props.press}>
              <Text style={styles.text}>Terms of Service</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={this.props.press}>
              <Text style={styles.text}>Privacy Policy</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sub_view} onPress={this.props.press}>
              <Text style={styles.text}>Version</Text>
              <Text style={[styles.text, {position: 'absolute', right: 0}]}>5.43.0 / 160725</Text>
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
  text: {
    fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'
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

export default connect(mapStateToProps, mapDispatchToProps)(About)
