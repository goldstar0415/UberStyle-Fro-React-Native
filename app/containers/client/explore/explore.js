import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import stars from '../../../components/stars';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';

import { connect } from 'react-redux'
import {setTabbar, ActionCreators} from '../../../actions';
import { bindActionCreators } from 'redux';

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
          hairstylist: [],
          fadeAnim: new Animated.Value(0),
          lastScrollPos: 0,
          marker_idx: null,
          data: null
        }
    }

    componentDidMount() {
      // this.getAvailabilaty()
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

    _getAllProviderWithFilter(filters) {
      const { authState } = this.props
      this.props.actions.getProvidersWithFilter(authState.token, filters).then(() => {
        const {apiState} = this.props
        this.setState({
          hairstylist: (apiState.filterData) ? apiState.filterData:[]
        })
        this.getAvailabilaty()
      })
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.filters!=undefined) {
        this.setState({
          search_text: (nextProps.filters.service)?nextProps.filters.service.value:'All Services'
        })
        if (this.props.filters !== nextProps.filters) {
          this._getAllProviderWithFilter(nextProps.filters)
        }
      }
    }

    componentWillMount() {
      this._getAllProviderWithFilter(null)
    }

    selectMarker(idx){
      var old_hairstylist = this.state.hairstylist
      old_hairstylist.map((marker, i) => {
        if(i == idx)marker.map_marker = true
        else marker.map_marker = false
      })
      this.setState({hairstylist: old_hairstylist, marker_idx: idx})
    }

    _gotoStylist(id) {
      NavigationActions.stylistProfile(id)
    }

    _getDateFromString(str) {
      let dateStr = str.substring(0, 4) + "-" + str.substring(4 ,6) + "-" + str.substring(6,8)
      return new Date(dateStr)
    }

    getAvailabilaty(){
      var subView = []
      this.state.hairstylist.map((hairstyle, i) => {
        hairstyle.daysAvailabilities.map((available, j) => {
          let date = this._getDateFromString(available)
          if(date.getDate() < 10)var day = '0' + date.getDate()
          else var day = date.getDate()

          if(j < 4){
            subView.push(<View key={j} style={{width: 80, height: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}><View style={{width: 65, height: 18, borderRadius: 10, borderWidth: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}><Text style={{fontSize: 10}}>{monthNames[date.getMonth()] + ' ' + day}</Text></View></View>)
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
              this.state.hairstylist.length == 0 ? (
                <View style={styles.top_view}>
                  <Text style={{fontSize: 20, fontFamily: 'Montserrat', textAlign: 'center', marginBottom: 10}}>Sorry, no result found</Text>
                </View>
              ) : (
                this.state.hairstylist.map((hairstyle, i) =>
                  <TouchableOpacity key={i} onPress={()=>this._gotoStylist(hairstyle._id)}>
                    <View style={styles.sub_view}>
                      <View style={styles.profile_view}>
                        <Image source={(hairstyle.icon)?hairstyle.icon:require('../../../img/stylist.png')} style={styles.profile}/>
                        <View style={styles.name_view}>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{hairstyle.name}</Text>
                          <View style={styles.review_view}>
                            {
                              (hairstyle.star) ? (
                                <Image source={stars[(hairstyle.star)?hairstyle.star:4.5]} style={styles.rating_star}/>
                              ):null
                            }
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{(hairstyle.review)?hairstyle.review+" Reviews":""}</Text>
                          </View>
                        </View>
                        <Text style={styles.rating_text}>{(hairstyle.rating)?'$'+hairstyle.rating:""}</Text>
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
                    coordinate={(marker.location && marker.location.address && marker.location.address.geoLocation.coordinates[0])?{latitude: marker.location.address.geoLocation.coordinates[1], longitude: marker.location.address.geoLocation.coordinates[0]}: {latitude: 37.78565 + i*10, longitude: -122.4124+ i*10}}
                    onSelect={() => this.selectMarker(i)}
                  />
                ))}
                </MapView>
                {
                  this.state.marker_idx != null ? (
                    <View style={{flexDirection: 'row', backgroundColor:'white', width: Dimensions.get('window').width - 20, height: 70, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',marginBottom: 60, borderRadius: 2}}>
                      <TouchableOpacity style={{flexDirection: 'row',  justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0}} onPress={NavigationActions.stylistProfile(this.state.hairstylist[this.state.marker_idx]._id)}>
                        <Image source={(this.state.hairstylist[this.state.marker_idx].icon)?this.state.hairstylist[this.state.marker_idx].icon:require('../../../img/stylist.png')} style={styles.profile}/>
                        <View style={styles.name_view}>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{this.state.hairstylist[this.state.marker_idx].name}</Text>
                          <View style={styles.review_view}>
                            <Image source={(this.state.hairstylist[this.state.marker_idx].star)?stars[this.state.hairstylist[this.state.marker_idx].star]:stars[4.5]} style={styles.rating_star}/>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{(this.state.hairstylist[this.state.marker_idx].review)?this.state.hairstylist[this.state.marker_idx].review:160} Reviews</Text>
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
  top_view: {
    flexDirection: 'column',
    width: width,
    height: 140,
    alignSelf: 'center',
    justifyContent: 'center'
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
  const { api } = state
  const { auth } = state
  const props = {
      tabHide: state.tabbar.tabHide,
      filters: state.service.filters,
      apiState: api,
      authState: auth,
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setTabbar: (tabHide) => {
            dispatch(setTabbar(tabHide));
        },
        actions: bindActionCreators(ActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Explore)
