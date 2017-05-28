import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import stars from '../../../components/stars';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { connect } from 'react-redux'
import {setTabbar} from '../../../actions';

import MapView from 'react-native-maps';
import marker_img from '../../../img/marker.png';
import marker_img_selected from '../../../img/marker_selected.png';

var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var dayNames = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const availableView = []

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;


class Explore extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          index: 0,
          search_text: 'All Services',
          routes: [
            { key: '1', title: 'Results' },
            { key: '2', title: 'Map' },
          ],
          hairstylist: [
            {
              icon: require('../../../img/david.jpg'),
              name: 'John Doe',
              star: 5,
              review: 186,
              rating: 120,
              availabilaty: [
                {date: new Date(2017, 2, 3), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 4), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']},
                {date: new Date(2017, 2, 5), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 6), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 7), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 9), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']}
              ],
              location: {
                latitude: 37.79825,
                longitude: -122.4424,
              },
              map_marker: false
            },
            {
              icon: require('../../../img/stylist.png'),
              name: 'Millena Mill',
              star: 4,
              review: 178,
              rating: 100,
              availabilaty: [
                {date: new Date(2017, 2, 3), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']},
                {date: new Date(2017, 2, 4), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']},
                {date: new Date(2017, 2, 6), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 7), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM']},
                {date: new Date(2017, 2, 9), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']}
              ],
              location: {
                latitude: 37.78834,
                longitude: -122.4343,
              },
              map_marker: false
            },
            {
              icon: require('../../../img/david1.jpeg'),
              name: 'Karim Will',
              star: 4.5,
              review: 160,
              rating: 80,
              availabilaty: [
                {date: new Date(2017, 2, 3), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 4), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']},
                {date: new Date(2017, 2, 6), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM']},
                {date: new Date(2017, 2, 7), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 8), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 9), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 10), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 12), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 13), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']}
              ],
              location: {
                latitude: 37.78422,
                longitude: -122.4844,
              },
              map_marker: false
            },
            {
              icon: require('../../../img/black_message.png'),
              name: 'Thomas Jong',
              star: 3.5,
              review: 80,
              rating: 40,
              availabilaty: [
                {date: new Date(2017, 2, 3), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 4), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM']},
                {date: new Date(2017, 2, 6), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM']},
                {date: new Date(2017, 2, 7), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 8), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']},
                {date: new Date(2017, 2, 9), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM']},
                {date: new Date(2017, 2, 10), time: ['9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '12:00 PM', '12:30 PM']}
              ],
              location: {
                latitude: 37.78565,
                longitude: -122.4124,
              },
              map_marker: false
            }
          ],
          fadeAnim: new Animated.Value(0),
          lastScrollPos: 0,
          marker_idx: null
        }
    }

    componentDidMount() {
      this.getAvailabilaty()

      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            initialRegion: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            },
            error: null
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
    }

    selectMarker(idx){
      var old_hairstylist = this.state.hairstylist
      old_hairstylist.map((marker, i) => {
        if(i == idx)marker.map_marker = true
        else marker.map_marker = false
      })
      this.setState({hairstylist: old_hairstylist, marker_idx: idx})
      console.log(this.state.hairstylist)
    }

    getAvailabilaty(){
      var subView = []
      this.state.hairstylist.map((hairstyle, i) => {
        hairstyle.availabilaty.map((available, j) => {
          if(available.date.getDate() < 10)var day = '0' + available.date.getDate()
          else var day = available.date.getDate()

          if(j < 4){
            subView.push(<View key={j} style={{width: 80, height: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}><View style={{width: 65, height: 18, borderRadius: 10, borderWidth: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 10}}>{monthNames[available.date.getMonth()] + ' ' + day}</Text></View></View>)
          }
        })
        availableView[i] = subView
        subView = []
      })
    }

    _handleChangeTab = (index) => {
      this.setState({ index });
      Animated.timing(
      this.state.fadeAnim,
      {toValue: 0}
      ).start();
    };

    _renderHeader = (props) => {
      return <TabBar {...props} style = {{backgroundColor: '#63b7b7'}} indicatorStyle = {{backgroundColor: 'white', height: 3}}/>;
    };

    _renderScene = ({ route }) => {
      switch (route.key) {
      case '1':
        return (
          <ScrollView style={{flexDirection: 'column', marginBottom: 50}}
            scrollEventThrottle={50}
            onScroll={(e) => {
              const currentScrollPos = e.nativeEvent.contentOffset.y

              if (currentScrollPos <= this.state.lastScrollPos) {
                this.setState({lastScrollPos: currentScrollPos})
                Animated.timing(
                this.state.fadeAnim,
                {toValue: 1}
                ).start();
              }else{
                this.setState({lastScrollPos: currentScrollPos })
                Animated.timing(
                this.state.fadeAnim,
                {toValue: 0}
                ).start();
              }
            }}
          >
            {
              this.state.hairstylist.map((hairstyle, i) =>
                <TouchableOpacity key={i} onPress={NavigationActions.stylistProfile}>
                  <View style={styles.sub_view}>
                    <View style={styles.profile_view}>
                      <Image source={hairstyle.icon} style={styles.profile}/>
                      <View style={styles.name_view}>
                        <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{hairstyle.name}</Text>
                        <View style={styles.review_view}>
                          <Image source={stars[hairstyle.star]} style={styles.rating_star}/>
                          <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{hairstyle.review} Reviews</Text>
                        </View>
                      </View>
                      <Text style={styles.rating_text}>${hairstyle.rating}</Text>
                    </View>
                    <View style={styles.line_view}/>
                    <View style={{flexDirection: 'column'}}>
                      <View style={{height: 30, justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 12, }}>Next Availability</Text>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        {availableView[i]}
                      </View>
                      <View style={{height: 15}}/>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }
            <View style={{height: 10, backgroundColor: '#f1f0f0'}}/>
          </ScrollView>

        )
      case '2':
        return (
              <View style={{...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', alignItems: 'center',}}>
                <MapView
                  initialRegion={this.state.initialRegion}
                  style = {{...StyleSheet.absoluteFillObject,}}
                  showsUserLocation={true}
                >
                {this.state.hairstylist.map((marker, i) => (
                  <MapView.Marker
                    key={i}
                    image={marker.map_marker ? marker_img_selected : marker_img}
                    coordinate={marker.location}
                    onSelect={() => this.selectMarker(i)}
                  />
                ))}
                </MapView>
                {
                  this.state.marker_idx != null ? (
                    <View style={{flexDirection: 'row', backgroundColor:'white', width: Dimensions.get('window').width - 20, height: 70, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',marginBottom: 60, borderRadius: 2}}>
                      <TouchableOpacity style={{flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0}} onPress={NavigationActions.stylistProfile}>
                        <Image source={this.state.hairstylist[this.state.marker_idx].icon} style={styles.profile}/>
                        <View style={styles.name_view}>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{this.state.hairstylist[this.state.marker_idx].name}</Text>
                          <View style={styles.review_view}>
                            <Image source={stars[this.state.hairstylist[this.state.marker_idx].star]} style={styles.rating_star}/>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{this.state.hairstylist[this.state.marker_idx].review} Reviews</Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={{position: 'absolute', right: 10}} onPress={() => {
                        var next_idx = this.state.marker_idx + 1
                        if(next_idx >= this.state.hairstylist.length)next_idx = 0
                        this.selectMarker(next_idx)
                      }}>
                        <Image source={require('../../../img/right-arrow_map.png')}  style={{width: 20,height: 20}}/>
                      </TouchableOpacity>
                    </View>
                  ) : null
                }
              </View>)

      default:
        return null;
      }
    };
    render() {
        return (
          <View style={styles.container}>
            <TouchableOpacity onPress={NavigationActions.category}>
              <View style={styles.search_view}>
                <Image source={require('../../../img/search.png')}  style={{marginLeft: 20, width: 18,height: 18}}/>
                <Text style={styles.search_btn}>{this.state.month && this.state.s_date ? (this.state.search_text + ' • ' + this.state.month + ' ' + this.state.s_date) : this.state.search_text}</Text>
              </View>
            </TouchableOpacity>
            <TabViewAnimated
              style={{flex: 1, backgroundColor: '#f1f0f0'}}
              navigationState={this.state}
              renderScene={this._renderScene}
              renderHeader={this._renderHeader}
              onRequestChangeTab={this._handleChangeTab}
            />
            <TouchableOpacity onPress={NavigationActions.filters}>
              <Animated.View style={{
                flexDirection: 'row',
                width: 90,
                height: 25,
                borderRadius: 20,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                backgroundColor: '#f26c4f',
                bottom: 60,
                opacity: 1,
                transform: [{
                  translateY: this.state.fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [300, 0]
                  }),
                }]
              }}>
                <Text style={{fontFamily: 'Montserrat',  color: 'white', fontSize: 12}}>FILTERS</Text>
                <Image source={require('../../../img/filter.png')}  style={{marginLeft: 5, width: 12,height: 12}}/>
              </Animated.View>
            </TouchableOpacity>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#63b7b7'
  },
  search_view: {
    flexDirection: 'row',
    width:Dimensions.get('window').width - 20,
    height:50,
    marginTop: 25,
    borderRadius: 1,
    backgroundColor: '#82c5c5',
    alignSelf: 'center',
    alignItems: 'center'
  },
  search_btn: {
    fontFamily: 'Montserrat',
    textAlign: 'left',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 15,
    marginLeft: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },

  sub_view: {
    width: Dimensions.get('window').width - 20,
    height: 140,
    alignSelf: 'center',
    borderRadius: 3,
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  profile: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    left: 15
  },
  profile_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 20,
    height: 70,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name_view: {
    position: 'absolute',
    left: 75
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
    fontSize: 16,
    position: 'absolute',
    right: 25
  },
  line_view: {
    width:Dimensions.get('window').width-20,
    alignSelf: 'center',
    height: 1,
    borderBottomWidth: 0.2
  },
});

const mapStateToProps = (state) => {
    const props = {
        tabHide: state.tabbar.tabHide,
    };
    return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTabbar: (tabHide) => {
            dispatch(setTabbar(tabHide));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
