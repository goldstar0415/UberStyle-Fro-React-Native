import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import stars from '../../../components/stars';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { connect } from 'react-redux'

const { width, height } = Dimensions.get('window');

class Appointments extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          index: 1,
          routes: [
            { key: '1', title: 'Past' },
            { key: '2', title: 'Upcoming' },
          ],
          hairstylist: [
            {
              icon: require('../../../img/david.jpg'),
              name: 'John Doe',
              star: 5,
              review: 186,
              rating: 120,
              availabilaty: "Mon, Mar 25, 2017 • 11:00 AM",
              location: {
                latitude: 37.79825,
                longitude: -122.4424,
              },
              state: 0
            },
            {
              icon: require('../../../img/stylist.png'),
              name: 'Millena Mill',
              star: 4,
              review: 178,
              rating: 100,
              availabilaty: "Mon, Mar 25, 2017 • 11:00 AM",
              location: {
                latitude: 37.78834,
                longitude: -122.4343,
              },
              state: 1
            },
            {
              icon: require('../../../img/david1.jpeg'),
              name: 'Karim Will',
              star: 4.5,
              review: 160,
              rating: 80,
              availabilaty: "Mon, Mar 25, 2017 • 11:00 AM",
              location: {
                latitude: 37.78422,
                longitude: -122.4844,
              },
              state: 2
            },
            {
              icon: require('../../../img/black_message.png'),
              name: 'Thomas Jong',
              star: 3.5,
              review: 80,
              rating: 40,
              availabilaty: "Mon, Mar 25, 2017 • 11:00 AM",
              location: {
                latitude: 37.78565,
                longitude: -122.4124,
              },
              state: 2
            }
          ]
        }
    }

    componentDidMount() {

    }

    _handleChangeTab = (index) => {
      this.setState({ index });
    };

    _renderHeader = (props) => {
      return <TabBar {...props} style = {{backgroundColor: '#63b7b7'}} indicatorStyle = {{backgroundColor: 'white', height: 3}}/>;
    };

    _renderScene = ({ route }) => {
      switch (route.key) {
      case '1':
        return (
          <View style={{width: width, height: height-130, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../../../img/ic_cal_light_grey.png')}  style={{width: 90,height: 90}}/>
            <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 22, marginTop: 20}}>No past reservations</Text>
            <Text style={{fontFamily: 'Montserrat', textAlign: 'center', fontSize: 16, marginTop: 5}}>Past reservations will be available here</Text>
            <TouchableOpacity style={styles.sBtn_view} onPress={NavigationActions.explore}>
              <Text style={styles.loginBtntext}>Start Exploring</Text>
            </TouchableOpacity>
          </View>
        )
      case '2':
        return (
          <ScrollView style={{marginBottom: 50}}>
            {
              this.state.hairstylist.map((hairstyle, i) =>
                <TouchableOpacity key={i} onPress={() => NavigationActions.details(hairstyle)}>
                  <View style={styles.sub_view}>
                    <Image source={hairstyle.icon} style={styles.profile}/>
                    <View style={styles.details_view}>
                      <View style={styles.profile_view}>
                        <View style={styles.name_view}>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{hairstyle.name}</Text>
                          <View style={styles.review_view}>
                            <Image source={stars[hairstyle.star]} style={styles.rating_star}/>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{hairstyle.review} Reviews</Text>
                          </View>
                        </View>
                        <Text style={hairstyle.state == 0 ? [styles.rating_text, {color: '#18e409'}] : hairstyle.state == 2 ? [styles.rating_text, {color: '#ff0606'}] : [styles.rating_text, {color: '#808080'}]}>{hairstyle.state == 0 ? 'Confirmed' : hairstyle.state == 2 ? 'Canceled' : 'Pending'}</Text>
                      </View>
                      <View style={styles.line_view}/>
                      <Text style={{fontFamily: 'Montserrat', marginTop: 10, textAlign: 'left', fontSize: 13}}>{hairstyle.availabilaty}{'\n'}Goddess Locs - ${hairstyle.rating}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            <View style={{height: 10, backgroundColor: '#f1f0f0'}}/>
          </ScrollView>
        )

      default:
        return null;
      }
    };
    render() {
        return (
          <View style={styles.container}>
            <TabViewAnimated
              style={{flex: 1, backgroundColor: '#f1f0f0', marginTop: 20}}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderHeader={this._renderHeader}
              onRequestChangeTab={this._handleChangeTab}
            />
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63b7b7'
  },

  sub_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 30,
    height: 130,
    alignSelf: 'center',
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: 'white'
  },
  details_view: {
    width: Dimensions.get('window').width - 140,
    height: 130,
    alignSelf: 'center',
    marginLeft: 20
  },
  profile: {
    width: 65,
    height: 65,
    borderRadius: 65/2,
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: 20
  },
  profile_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 140,
    height: 45,
    alignSelf: 'center',
    marginTop: 20
  },
  name_view: {
    position: 'absolute',
    left: 0
  },
  rating_star: {
    width:70,
    height:10,
  },
  review_view: {
    flexDirection: 'row',
    height: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rating_text: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    position: 'absolute',
    right: 10
  },
  line_view: {
    width:Dimensions.get('window').width-140,
    alignSelf: 'center',
    height: 1,
    borderBottomWidth: 0.2
  },
  sBtn_view: {
    width:260,
    height:50,
    borderRadius: 30,
    marginTop: 25,
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

export default connect(mapStateToProps, mapDispatchToProps)(Appointments)
