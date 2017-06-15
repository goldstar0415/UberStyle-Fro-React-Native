import React from 'react';
import {PropTypes} from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ListView,
  TextInput,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Clipboard,
  ToastAndroid,
  AlertIOS,
  Platform
} from "react-native";

import { Actions as NavigationActions } from 'react-native-router-flux'
import Styles from '../../styles/hairSignupStyles'

import Modal from 'react-native-modalbox';

import DatePicker from 'react-native-datepicker'

import RadioButton from 'radio-button-react-native';

import Swiper from 'react-native-swiper'
import PhotoView from 'react-native-photo-view'

import MapView from 'react-native-maps';
import ViewMoreText from 'react-native-view-more-text';

import Share, {ShareSheet, Button} from 'react-native-share';
import stars from '../../components/stars';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';

const { width, height } = Dimensions.get('window')
var idx

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import marker_img from '../../img/marker.png';

var parent_services = []

const renderPagination = (index, total, context) => {
  var view = (<View style={{position: 'absolute',alignItems: 'center',left: 15,bottom: 35}}><Text style={{fontFamily: 'Montserrat', color: '#fff',fontSize: 14}}>{index + 1} / {total}</Text></View>)
  idx = index
  return  view
}

const Viewer = props => <Swiper index={props.index} style={styles.wrapper} renderPagination={renderPagination}>
  {
    props.imgList.map((item, i) => <View key={i} style={styles.slide}>
      <TouchableWithoutFeedback onPress={e => {props.pressHandle()}}>
        <PhotoView
          source={item}
          resizeMode='contain'
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType='center'
          style={styles.photo} />
      </TouchableWithoutFeedback>
    </View>)
  }
</Swiper>

class stylistProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          color_info: false,
          balayage_info: false,
          category: true,
          imgList: [
            require('../../img/david.jpg'),
            require('../../img/david1.jpeg'),
            require('../../img/stylist.png'),
            require('../../img/black_message.png')
          ],
          showViewer: false,
          showIndex: 0,
          i: 2,
          visible: false,
          name: '',
          travelType: [],
          business_hours:{},
          services: [],
          travelCost: '',
          providerType: '',
          social: {},
        }
    }

    _getStylist() {
      const { auth } = this.props;
      this.props.getStylist(auth.token, this.props.data).then(() => {
        const { api } = this.props;
        
        this.setState({
          name: (api.provider.name) ? api.provider.name : "",
          travelCost: (api.provider.travelCost) ? api.provider.travelCost : "0",
          travelType: (api.provider.travelType) ? api.provider.travelType : [],
          services:(api.provider.services) ? this._parseResponse(api.provider.services): [],
          description:(api.provider.description) ? api.provider.description: "",
          social: (api.provider.social) ? api.provider.social: {},
          business_hours: (api.provider.availability) ? api.provider.availability: {},
          providerType: (api.provider.providerType) ? api.provider.providerType : "",
          initialRegion: {
            latitude: (api.provider.location && api.provider.location.address && api.provider.location.address.geoLocation.coordinates[1]) ? api.provider.location.address.geoLocation.coordinates[1] : 0,
            longitude: (api.provider.location && api.provider.location.address && api.provider.location.address.geoLocation.coordinates[1]) ? api.provider.location.address.geoLocation.coordinates[0] : 0,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          },
          overall: (api.provider.overall) ? api.provider.overall: null,
          clean: (api.provider.clean) ? api.provider.clean: null,
          communication: (api.provider.communication) ? api.provider.communication: null,
          punctuality: (api.provider.punctuality) ? api.provider.punctuality: null,
          service: (api.provider.service) ? api.provider.service: null,
          reviews: (api.provider.reviews) ? api.provider.reviews: 0
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
          new_parent["child_status"] = [[false]]
          parent_services.push(new_parent)
        } else {
          var childs = parent_services[parent_index].child
          childs.push(response[i])
          var child_status = parent_services[parent_index].child_status
          child_status.push(false)
        }
      }
      return parent_services
    }

    componentDidMount() {
      this._getStylist();
    }

    onCancel() {
      this.setState({visible:false});
    }

    onOpen() {
      this.setState({visible:true});
    }

    renderSeeMore(onPress){
			return(
				<Text style={styles.seemore_text} onPress={onPress}>See More</Text>
			)
		}

		renderSeeLess(onPress){
			return(
				<Text style={styles.seemore_text} onPress={onPress}>See Less</Text>
			)
		}

    viewerPressHandle () {
      this.setState({
        showViewer: false,
      })
    }

    thumbPressHandle (i) {
      this.setState({
        showIndex: i,
        showViewer: true
      })
    }

    _getFormatAMPM(minutes) {
      var hours = Math.floor(minutes / 60);
      minutes = minutes % 60;
      var apm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12
      hours = hours ? hours : 12;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + apm;
      return strTime;
    }

    _getHours(duration) {
      if (duration == undefined) {
        return "Closed"
      }
      if (duration.open == 0 && duration.close == 0) {
        return "Closed"
      }
      return this._getFormatAMPM(duration.open) + " - " + this._getFormatAMPM(duration.close);
    }

    _gotoFristStep(service) {
      let data = {
        "stylist_id" : this.props.api.provider._id,
        "service" : service,
        "stylist_name": this.state.name,
        "ability": this.state.business_hours,
        "travelType": this.state.travelType,
        "travelCost": (this.state.travelCost)?parseInt(this.state.travelCost):0
      }
      if (service.andUp) {
        NavigationActions.selectDesired(data)
      } else {
        NavigationActions.selectDate(data)
      }
    }

    _getTravelTypeString() {
      var str = ""
      for (i=0; i<this.state.travelType.length; i++) {
        if (str!="") {
          str += " or "
        }
        switch (this.state.travelType[i]) {
          case "Provider Home":
            str += (str=="")?"I host at my home":"home"
            break;
          case "Salon":
            str += (str=="")?"I host at my salon":"salon"
            break;
          default:
            str += "I go to my client's place";
        }
      }
      return str;
    }

    _gotoMessage() {
      // console.log(this.props.data)
      // console.log(this.props.api.provider._id)
      // if (this.props.data != this.props.api.provider._id) {
        NavigationActions.message();
      // }
    }

    _updateParentState(index) {
      var tmp = this.state.services
      tmp[index].expand = !tmp[index].expand
      this.setState({
        services: tmp
      })
    }

    _updateState(parent_index, child_index) {
      var tmp = this.state.services
      tmp[parent_index].child_status[child_index] = !tmp[parent_index].child_status[child_index]
      this.setState({
        services: tmp
      })
    }

    render() {

      let shareOptions = {
        title: "Hairstyle",
        message: "Share hairstyle",
        url: "http://facebook.github.io/react-native/",
        subject: "Share Link"
      };


      return (
        <View style={styles.container}>
          <ScrollView style={{flexDirection:'column'}}>

          {
            this.state.showViewer ? (
              <View>
                <Viewer
                index={this.state.showIndex}
                pressHandle={this.viewerPressHandle}
                imgList={this.state.imgList} />
                <TouchableOpacity style={{position: 'absolute',alignItems: 'center',left: 0,bottom: height-35}} onPress={() => this.setState({showViewer: false, i: idx})}>
                  <Image source={require('../../img/close.png')}  style={{marginTop: 30,marginLeft: 10,width: 20,height: 20}}/>
                </TouchableOpacity>
                <TouchableOpacity  style={{position: "absolute", alignItems: 'center',right: 15,bottom: height-35}}  onPress={this.onOpen.bind(this)}>
                  <Image source={require('../../img/share.png')} style={{width: 17, height: 15}}/>
                </TouchableOpacity>
              </View>) : null
          }

            <TouchableOpacity key={this.state.i} onPress={e => this.thumbPressHandle(this.state.i)}>
              <Image source={this.state.imgList[this.state.i]} style={{width: Dimensions.get('window').width, height: Dimensions.get('window').width*3/5}}>
                <View style={styles.navBar}>
                  <TouchableOpacity  style={{width: 50, alignSelf: 'center', marginLeft: 15}} onPress={NavigationActions.pop}>
                    <Image source={require('../../img/back_white.png')}  style={{width: 15,height: 15}}/>
                  </TouchableOpacity>
                  <TouchableOpacity  style={{position: "absolute", right: 50,  marginTop:15}}  onPress={this.onOpen.bind(this)}>
                    <Image source={require('../../img/share.png')} style={{width: 17, height: 15}}/>
                  </TouchableOpacity>
                  <TouchableOpacity  style={{position: "absolute", right: 15,  marginTop:15}}  onPress={this.props.press}>
                    <Image source={require('../../img/favorite.png')} style={{width: 15, height: 15}}/>
                  </TouchableOpacity>
                </View>
              </Image>
            </TouchableOpacity>

            <View style={{flexDirection:'row', height: 80, borderBottomWidth: 0.2}}>
              <View style={{flexDirection:'column', alignSelf: 'center', width:Dimensions.get('window').width}}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 20}}>Hairstyled by </Text><Text style={{fontSize: 14, color: '#f26c4f'}}>{this.state.name}</Text>
                </View>
                <Text style={{fontFamily: 'Montserrat', fontSize: 12, marginLeft: 20, color: 'gray'}}>{this._getTravelTypeString()}</Text>
              </View>
              <Image source={require('../../img/david.jpg')} style={styles.profile}/>
            </View>
            {
              this.state.services.length == 0 ? (
                <View style={{flexDirection:'row', height: 40, borderBottomWidth: 0.2}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center', width: Dimensions.get('window').width, textAlign: 'center'}}>
                    No Registered Service
                  </Text>
                </View>
              ):(
                this.state.services.map((service, i) =>
                <View key={service.id}>
                  <View style={{flexDirection:'row', height: 40, borderBottomWidth: 0.2}}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center', width: Dimensions.get('window').width, textAlign: 'center'}}>
                      {service.name}
                    </Text>
                    <TouchableOpacity  style={{position: "absolute", right: 30, alignSelf: 'center'}}  onPress={() => this._updateParentState(i)}>
                      <Image source={service.expand ? require('../../img/down_aroow.png') : require('../../img/up_arrow.png')} style={{width: 12, height: 8}}/>
                    </TouchableOpacity>
                  </View>
                  {
                    service.expand ? (
                      service.child.map((child, j) =>
                        <View key = {child.serviceId}>
                          <View style={{flexDirection:'row', width:Dimensions.get('window').width-40, alignSelf: 'center', height: 80}}>
                            <View style={{flexDirection:'column', alignSelf: 'center', width:Dimensions.get('window').width}}>
                              <Text style={{fontFamily: 'Montserrat', fontSize: 13}}>{child.name}</Text>
                              <View style={styles.info_view}>
                                <Text style={styles.info_text}>${child.price} and up for {(child.duration+1)*15} minutes</Text>
                                {
                                  (child.description)?(
                                    <TouchableOpacity  onPress={() => this._updateInfo(i,j)}>
                                      <Image source={require('../../img/info.png')} style={styles.info_img}/>
                                    </TouchableOpacity>
                                  ):null
                                }
                              </View>
                            </View>
                            <TouchableOpacity style={styles.book_touch}  onPress={()=>this._gotoFristStep(child)}>
                              <View style={styles.book_view}>
                                <Text style={styles.book_text}>Book</Text>
                              </View>
                            </TouchableOpacity>
                            {
                              service.child_status[j] ? (
                                <View style={styles.expand_view}>
                                  <Text style={styles.expand_text}>{child.description}</Text>
                                </View>
                              ) : null
                            }
                            <View style={this.state.balayage_info ? styles.expand_line : styles.expand_line_empty}/>
                          </View>
                        </View>
                      )
                    ):null
                  }
                </View>
                )
              )
            }
            {
              (this.state.overall)?(
                <TouchableOpacity style={{flexDirection:'row', height: 120, borderBottomWidth: 0.2}} onPress={() => this.setState({m_open: true})}>
                  <View style={styles.rating_view}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 40, fontWeight: '100'}}>{this.state.overall.toString()}</Text>
                    <Image source={stars[this.state.overall]} style={{width:80, height:12, marginTop: 5}}/>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 11,marginTop:5}}>Based on {this.state.reviews} reviews</Text>
                  </View>
                  <View style={styles.rating_view_right}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={styles.rating_text}>Cleanliness</Text>
                      <Image source={stars[this.state.clean]} style={styles.rating_star}/>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 5}}>
                      <Text style={styles.rating_text}>Communicaton</Text>
                      <Image source={stars[this.state.communication]} style={styles.rating_star}/>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 5}}>
                      <Text style={styles.rating_text}>Punctuality</Text>
                      <Image source={stars[this.state.punctuality]} style={styles.rating_star}/>
                    </View>
                    <View style={{flexDirection:'row', marginTop: 5}}>
                      <Text style={styles.rating_text}>Service</Text>
                      <Image source={stars[this.state.service]} style={styles.rating_star}/>
                    </View>
                  </View>
                </TouchableOpacity>
              ):null
            }
            

            <View style={styles.contact_view}>
              <Text style={styles.contact_text}>Availability</Text>
              <TouchableOpacity  style={styles.contact_touch}  onPress={NavigationActions.check}>
                <Text style={{fontSize: 14, color: '#f26c4f'}}>Check</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.contact_view}>
              <Text style={styles.contact_text}>Contact {this.state.name}</Text>
              <TouchableOpacity  style={styles.contact_touch}  onPress={()=>this._gotoMessage()}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: '#f26c4f'}}>Message</Text>
              </TouchableOpacity>
            </View>

            <MapView
              initialRegion={this.state.initialRegion}
              style = {{width:Dimensions.get('window').width, height: 150}}
            >
              {
                this.state.initialRegion != undefined ? (
                  <MapView.Marker
                    image={marker_img}
                    coordinate={{latitude: this.state.initialRegion.latitude, longitude: this.state.initialRegion.longitude}}
                  />
                ) : null
              }
            </MapView>

            <View style={{width:Dimensions.get('window').width-40, margin: 20, alignSelf: 'center'}}>
              <ViewMoreText
      			    numberOfLines={3}
      			    renderViewMore={this.renderSeeMore}
      			    renderViewLess={this.renderSeeLess}>
      			    <Text style={styles.detail_text}>
      			      {this.state.description}
      			    </Text>
      			  </ViewMoreText>
            </View>
            <View style={{width:Dimensions.get('window').width, borderBottomWidth: 0.2, height: 1}}/>

            <View style={{flexDirection:'column', alignSelf: 'center', justifyContent: 'center',width:Dimensions.get('window').width, height: 200, borderBottomWidth: 0.2}}>
              <Text style={{fontFamily: 'Montserrat', fontSize: 14, textAlign: 'left', marginLeft: 20, marginBottom: 10}}>Business Hours</Text>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Sunday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.sun)}</Text>
              </View>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Monday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.mon)}</Text>
              </View>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Tuesday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.thu)}</Text>
              </View>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Wednesday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.wed)}</Text>
              </View>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Thursday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.tue)}</Text>
              </View>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Friday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.fri)}</Text>
              </View>
              <View style={styles.day_view}>
                <Text style={styles.day_text}>Saturday:</Text>
                <Text style={styles.time_text}>{this._getHours(this.state.business_hours.sat)}</Text>
              </View>
            </View>

            <View style={{flexDirection:'column', alignSelf: 'center', justifyContent: 'center',width:Dimensions.get('window').width, height: 100}}>
              <Text style={{fontFamily: 'Montserrat', fontSize: 14, textAlign: 'left', marginLeft: 20}}>Share Profile</Text>
              <View style={{flexDirection:'row', width:Dimensions.get('window').width-40, alignSelf: 'center', justifyContent: 'center',}}>
                <TouchableOpacity  onPress={this.props.press}>
                  <Image source={require('../../img/facebook.png')} style={styles.social_icon}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={this.props.press}>
                  <Image source={require('../../img/twitter.png')} style={styles.social_icon}/>
                </TouchableOpacity>
                <TouchableOpacity  onPress={this.props.press}>
                  <Image source={require('../../img/gmail.png')} style={styles.social_icon}/>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>

          <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
            <Button iconSrc={{ uri: TWITTER_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "twitter"
                  }));
                },300);
              }}>Twitter</Button>
            <Button iconSrc={{ uri: FACEBOOK_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "facebook"
                  }));
                },300);
              }}>Facebook</Button>
            <Button iconSrc={{ uri: WHATSAPP_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "whatsapp"
                  }));
                },300);
              }}>Whatsapp</Button>
            <Button iconSrc={{ uri: GOOGLE_PLUS_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "googleplus"
                  }));
                },300);
              }}>Google +</Button>
            <Button iconSrc={{ uri: EMAIL_ICON }}
                    onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.shareSingle(Object.assign(shareOptions, {
                    "social": "email"
                  }));
                },300);
              }}>Email</Button>
            <Button
              iconSrc={{ uri: CLIPBOARD_ICON }}
              onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  if(typeof shareOptions["url"] !== undefined) {
                    Clipboard.setString(shareOptions["url"]);
                    if (Platform.OS === "android") {
                      ToastAndroid.show('Link copied to clipboard', ToastAndroid.SHORT);
                    } else if (Platform.OS === "ios") {
                      AlertIOS.alert('Link copied to clipboard');
                    }
                  }
                },300);
              }}>Copy Link</Button>
            <Button iconSrc={{ uri: MORE_ICON }}
              onPress={()=>{
                this.onCancel();
                setTimeout(() => {
                  Share.open(shareOptions)
                },300);
              }}>More</Button>
          </ShareSheet>

          <Modal isOpen={this.state.m_open} onClosed={() => this.setState({m_open: false})} style={{flex: 1}} position={"bottom"} swipeToClose={false}>
            <TouchableOpacity  onPress={() => this.setState({m_open: false})}>
              <Image source={require('../../img/close-button.png')}  style={styles.backBtn}/>
            </TouchableOpacity>

            <View style={{alignSelf:  'center',width: Dimensions.get('window').width-40, height: 120, borderBottomWidth: 0.2, justifyContent: 'center'}}>
              <Text style={{fontFamily: 'Montserrat', fontSize: 24}}>{(this.state.reviews)?this.state.reviews.toString():"0"} Reviews</Text>
              <Image source={stars[this.state.overall]} style={{width:120, height:20, marginTop: 5}} resizeMode={'contain'}/>
            </View>

            <View style={{alignSelf:  'center',width: Dimensions.get('window').width-40, height: 200, borderBottomWidth: 0.2, justifyContent: 'center'}}>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'}}>Cleanliness</Text>
                <Image source={stars[this.state.clean]} style={{width: 80, height: 28, position: 'absolute', right: 0}} resizeMode={'contain'}/>
              </View>
              <View style={{flexDirection:'row', marginTop: 15}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'}}>Communicaton</Text>
                <Image source={stars[this.state.communication]} style={{width: 80, height: 28, position: 'absolute', right: 0}} resizeMode={'contain'}/>
              </View>
              <View style={{flexDirection:'row', marginTop: 15}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'}}>Punctuality</Text>
                <Image source={stars[this.state.punctuality]} style={{width: 80, height: 28, position: 'absolute', right: 0}} resizeMode={'contain'}/>
              </View>
              <View style={{flexDirection:'row', marginTop: 15, marginBottom: 15}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16, textAlign: 'left'}}>Service</Text>
                <Image source={stars[this.state.service]} style={{width: 80, height: 28, position: 'absolute', right: 0}} resizeMode={'contain'}/>
              </View>
            </View>

            <View style={{flexDirection: 'row', width: width-40, height: 100, alignSelf: 'center', alignItems: 'center'}}>
              <Image source={require('../../img/david.jpg')} style={{width: 50, height: 50, borderRadius: 25, justifyContent: 'center'}}/>
              <View style={{height: 100, marginLeft: 20, justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>David</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 12, color: '#4c4c4c'}}>Mar 2017</Text>
              </View>
            </View>

          </Modal>

        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  navBar: {
    flexDirection:'row',
    height: 40,
    width: Dimensions.get('window').width,
    backgroundColor: 'rgba(0,0,0,0)',
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {height: 1,width: 0},
    zIndex: 0,
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    alignItems: 'center',
    alignSelf: 'center',
    position: "absolute", right: 20
  },
  book_view: {
    width: 82,
    height: 27,
    alignSelf: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f26c4f'
  },
  book_touch: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0
  },
  book_text: {
    fontFamily: 'Montserrat',
    color: 'white',
    fontSize: 12,
    textAlign: 'center'
  },
  info_img: {
    marginLeft: 10,
    width: 18,
    height: 18
  },
  info_text: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: 'gray'
  },
  info_view: {
    flexDirection:'row',
    height: 20,
    alignItems: 'center'
  },
  expand_view: {
    width:Dimensions.get('window').width-40,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#eef5f5'
  },
  expand_text: {
    fontFamily: 'Montserrat',
    fontSize: 13,
    alignSelf: 'center',
    width: Dimensions.get('window').width - 60,
    padding: 10,
    textAlign: 'left'
  },
  expand_line_empty: {
    width:Dimensions.get('window').width-40,
    alignSelf: 'center',
    borderBottomWidth: 0.2,
    height: 1
  },
  expand_line: {
    width:Dimensions.get('window').width-40,
    alignSelf: 'center',
    height: 20,
    borderBottomWidth: 0.2
  },
  rating_view: {
    flexDirection:'column',
    alignSelf: 'center',
    alignItems:'center',
    width:Dimensions.get('window').width/2
  },
  rating_view_right: {
    flexDirection:'column',
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    width:Dimensions.get('window').width/2
  },
  rating_text: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    textAlign: 'right',
    width: Dimensions.get('window').width/4,
    alignSelf: 'center',
    paddingRight: 10
  },
  rating_star: {
    width:70,
    height:10,
    alignSelf: 'center',
    position: 'absolute',
    right: 20
  },
  contact_view: {
    flexDirection:'row',
    height: 50,
    borderBottomWidth: 0.2
  },
  contact_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    alignSelf: 'center',
    paddingLeft: 20
  },
  contact_touch: {
    position: "absolute",
    right: 20,
    alignSelf: 'center'
  },
  detail_text: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    color: 'gray',
    textAlign: 'center'
  },
  seemore_text: {
    fontFamily: 'Montserrat',
    fontSize: 11,
    textAlign: 'center',
    marginTop: 12,
    color: '#f26c4f'
  },
  day_view: {
    flexDirection:'row', width:Dimensions.get('window').width-40, alignSelf: 'center'
  },
  day_text: {
    fontFamily: 'Montserrat', fontSize: 14,color: 'gray'
  },
  time_text: {
    fontFamily: 'Montserrat', fontSize: 14,color: 'gray', position: 'absolute',right: 0
  },
  social_icon: {
    width:35, height: 35, margin: 7
  },

  wrapper: {
    backgroundColor: '#000',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  photo: {
    width,
    height,
    flex: 1
  },
  text: {
    fontFamily: 'Montserrat',
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  backBtn: {
    marginTop: 15,
    marginLeft: 20,
    width: 15,
    height: 15,
  },
});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

//  twitter icon
const TWITTER_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABvFBMVEUAAAAA//8AnuwAnOsAneoAm+oAm+oAm+oAm+oAm+kAnuwAmf8An+0AqtUAku0AnesAm+oAm+oAnesAqv8An+oAnuoAneoAnOkAmOoAm+oAm+oAn98AnOoAm+oAm+oAmuoAm+oAmekAnOsAm+sAmeYAnusAm+oAnOoAme0AnOoAnesAp+0Av/8Am+oAm+sAmuoAn+oAm+oAnOoAgP8Am+sAm+oAmuoAm+oAmusAmucAnOwAm+oAmusAm+oAm+oAm+kAmusAougAnOsAmukAn+wAm+sAnesAmeoAnekAmewAm+oAnOkAl+cAm+oAm+oAmukAn+sAmukAn+0Am+oAmOoAmesAm+oAm+oAm+kAme4AmesAm+oAjuMAmusAmuwAm+kAm+oAmuoAsesAm+0Am+oAneoAm+wAmusAm+oAm+oAm+gAnewAm+oAle0Am+oAm+oAmeYAmeoAmukAoOcAmuoAm+oAm+wAmuoAneoAnOkAgP8Am+oAm+oAn+8An+wAmusAnuwAs+YAmegAm+oAm+oAm+oAmuwAm+oAm+kAnesAmuoAmukAm+sAnukAnusAm+oAmuoAnOsAmukAqv9m+G5fAAAAlHRSTlMAAUSj3/v625IuNwVVBg6Z//J1Axhft5ol9ZEIrP7P8eIjZJcKdOU+RoO0HQTjtblK3VUCM/dg/a8rXesm9vSkTAtnaJ/gom5GKGNdINz4U1hRRdc+gPDm+R5L0wnQnUXzVg04uoVSW6HuIZGFHd7WFDxHK7P8eIbFsQRhrhBQtJAKN0prnKLvjBowjn8igenQfkQGdD8A7wAAAXRJREFUSMdjYBgFo2AUDCXAyMTMwsrGzsEJ5nBx41HKw4smwMfPKgAGgkLCIqJi4nj0SkhKoRotLSMAA7Jy8gIKing0KwkIKKsgC6gKIAM1dREN3Jo1gSq0tBF8HV1kvax6+moG+DULGBoZw/gmAqjA1Ay/s4HA3MISyrdC1WtthC9ebGwhquzsHRxBfCdUzc74Y9UFrtDVzd3D0wtVszd+zT6+KKr9UDX749UbEBgULIAbhODVHCoQFo5bb0QkXs1RAvhAtDFezTGx+DTHEchD8Ql4NCcSyoGJYTj1siQRzL/JKeY4NKcSzvxp6RmSWPVmZhHWnI3L1TlEFDu5edj15hcQU2gVqmHTa1pEXJFXXFKKqbmM2ALTuLC8Ak1vZRXRxa1xtS6q3ppaYrXG1NWjai1taCRCG6dJU3NLqy+ak10DGImx07LNFCOk2js6iXVyVzcLai7s6SWlbnIs6rOIbi8ViOifIDNx0uTRynoUjIIRAgALIFStaR5YjgAAAABJRU5ErkJggg==";

//  facebook icon
const FACEBOOK_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAYFBMVEUAAAAAQIAAWpwAX5kAX5gAX5gAX5gAXJwAXpgAWZ8AX5gAXaIAX5gAXpkAVaoAX5gAXJsAX5gAX5gAYJkAYJkAXpoAX5gAX5gAX5kAXpcAX5kAX5gAX5gAX5YAXpoAYJijtTrqAAAAIHRSTlMABFis4vv/JL0o4QvSegbnQPx8UHWwj4OUgo7Px061qCrcMv8AAAB0SURBVEjH7dK3DoAwDEVRqum9BwL//5dIscQEEjFiCPhubziTbVkc98dsx/V8UGnbIIQjXRvFQMZJCnScAR3nxQNcIqrqRqWHW8Qd6cY94oGER8STMVioZsQLLnEXw1mMr5OqFdGGS378wxgzZvwO5jiz2wFnjxABOufdfQAAAABJRU5ErkJggg==";

//  whatsapp icon
const WHATSAPP_ICON = "data:image/png;base64,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";

//  gplus icon
const GOOGLE_PLUS_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAACQ1BMVEUAAAD/RDP/STX9Sjb+STT+SjX+SjX+SjX+STT/SzP/Sjb/SzX/VVX/SDb+SDP+SjX9RzT9STT9SjT+STX+SjT9SjT/SST/TTP+SjX+SjX/RDP/RzP+SjX+SjX/STf9SDX/SjX/TU3+Sjb+SjX/Qyz/Szb+SjX/TTP+SjX9STX+SjP/TTX9Szb+Szb/YCD/SzX/SzX+Sjb+STX/TTX/SzX/Szb/TDT+SjX9SzX/STf+TDX/SjT9SzX9Szb+SjX/SjX/SzX/STT9SjT9TDT+SDT/VQD9STX/STX9SjX+SjX9STX+SzT/UDD9Sjb+SjX9RzT/QED+SjT+SjX/XS7+SjX/Ui7/RC3+SjX/TTz/RzP+SjX/TTP/STf+SjX/STT/RjP+Sjb/SzX/Szz/Rjr/RzL+RzP+SjX/Szf/SjX9Sjb+SjX+Sjb+SjX+SjX+SjX/STf/SjT/SjT9SjX9SzT+RzT+STT/STT+SjX/STP/Tjf+SjX/Szb/SjX/STX9SjX/SjT/AAD/SjH/STb+SzX+Sjb+SjT9SDT+Sjb+SjX9STf9STT/SDX/TDf+STb/TjT/TjH+SjX+SDT/Sjb9SzX9RzX+TDT/TUD/STX+SjX+STX/VTn/QjH/SjX+SjX/Ri7+Szb/TTP+SjX/SDX/STT9SjX+SjX/SDL/TjT9Sjb/RjL+SjX9SzX/QED/TDT+SjX+SjX9STX/RjX/VSv/Rzb/STX/ORz/UDD9SzX+Sjb/STT9SzP+SzX+SjX+SjX9Szb/Ti//ZjPPn7DtAAAAwXRSTlMAD1uiy+j5/8FBZHQDY9zvnYSc5dGhBwr+1S0Zqu44mz4KtNkXY7Yo8YLcfp3bCGZ+sLhWaks2z4wO6VOklrtWRFSXos4DoD+D/ZnoEKasjwS7+gvfHC3kHmjtMlTXYjfZXBEWa+/nQRiK5u7c8vVGRWepp6+5eulQF/dfSHSQdQEfdrzguZzm+4KSQyW1JxrAvCaCiLYUc8nGCR9h6gvzFM41MZHhYDGYTMejCEDi3osdBj1+CSCWyGyp1PC3hUEF/yhErwAAAjFJREFUSMft1tdfE0EQB/ADJD+JKAomHoqKxhJLFCnSpdgIxobYgqhYaJKIHVQUsSFiBSuCvWPv3T/N2ZPD3EucvVcyL3sz2W8+l73ZvShKKEIxcCIsPGJQpAV9MThK1KzAEAaNHjosZviI2DgBR9psVrvCx6Ni1fjRNI5JIDx2nF5m4ejxsCRqVxMmknZMksGTVUzpu5zqJD1NAodNB2boyUzCrlnK7CSKOUCyGJOC4BSan6onaWLN5irpCIwgOAMBt5eZRVk2H+fQx7n92TzK8pT8AopCwCbGgiB4Pk1fsFDPFlG2mL9gRTTdnahnxcASDx/nq6SX6tkyYLnEo1qxknBJ2t9kVSlcq2WaZM1a0qXrtOv18Jbp9Q3l5Rv/39ubHKQ3V2xRtm7bXlkluyGra2qJ76jzwb/TxH721O9K3U1fsMfsgbCXcLFZvI+wL8ok3i/6+ECDOdxYJ/TBQ9Kw+nDTkRyHtodKjjbLyGMtx304cTKi8NRpoVutfJp5xgtv21ntxGw/J7T3PNdeuAhcuqxn9o5W0p1Ma78CpF/9lzdfI3ydiStobrjhIL4BRN7k4WRa3i5D5RbQ3cPDMcDtO4ZKGXCXedtuQL1nqNwHHjDxQ/rNGYbKI/gfM/ETwv6ngafSM3RwH3O7eK86Wzz9L582PO9lN9iLl6KpXr2uf9P7tvHde4e75oNEZ3/85NQ2hKUyzg/1c57klur68vXbd9XtdP34+et36C9WKAZo/AEHHmXeIIIUCQAAAABJRU5ErkJggg==";

//  email icon
const EMAIL_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABC1BMVEUAAAA/Pz8/Pz9AQEA/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz8/Pz8+Pj4+Pj4/Pz8/Pz8/Pz9AQEA+Pj5AQEA/Pz87Ozs7Ozs/Pz8+Pj47OztAQEA/Pz89PT01NTVBQUFBQUE/Pz8/Pz8+Pj4/Pz9BQUE+Pj4/Pz8/Pz89PT0+Pj4/Pz9BQUFAQEA9PT09PT0/Pz87Ozs9PT05OTk/Pz8+Pj4/Pz9AQEA/Pz8/Pz8/Pz8/Pz+AgIA+Pj4/Pz8/Pz9AQEA/Pz8/Pz8/Pz8/Pz8+Pj4/Pz8/Pz8/Pz9AQEA+Pj4/Pz8+Pj4/Pz85OTk/Pz8/Pz8/Pz8/Pz88PDw9PT0/Pz88PDw8PDw+Pj45OTlktUJVAAAAWXRSTlMA/7N4w+lCWvSx8etGX/XlnmRO7+1KY/fjOGj44DU7UvndMec/VvLbLj7YKyiJdu9O7jZ6Um1w7DnzWQJz+tpE6uY9t8D9QehAOt7PVRt5q6duEVDwSEysSPRjqHMAAAEfSURBVEjH7ZTXUgIxGEa/TwURUFyKYgMURLCvbe2gYAV7ff8nMRksgEDiKl7lXOxM5p8zO3s2CWAwGAx/CjXontzT25Y+pezxtpv2+xTygJ+BYOvh4BBDwx1lKxxhNNZqNjLK+JjVWUYsykj4+2h8gpNTUMkIBuhPNE+SKU7PQC3D62E60ziYzXIuBx0Z+XRTc9F5fgF6MhKNzWXnRejKWGJdc9GZy8AP3kyurH52Ju01XTkjvnldNN+Qi03RecthfFtPlrXz8rmzi739Ax7mUCjy6FhH/vjPonmqVD6pdT718excLX/tsItLeRAqtc7VLIsFlVy/t6+ub27v7t8XD490niy3p+rZpv3i+jy/Or+5SUrdvcNcywaDwfD/vAF2TBl+G6XvQwAAAABJRU5ErkJggg==";

//  clipboard icon
const CLIPBOARD_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAB5lBMVEUAAAA8PDw+Pj4/Pz8/Pz8/Pz8/Pz8+Pj47OzsAAAA5OTk+Pj4/Pz8/Pz8+Pj49PT0/Pz8/Pz85OTlAQEA/Pz87Ozs+Pj4+Pj4/Pz8/Pz8/Pz8zMzNBQUE/Pz8/Pz8/Pz9AQEA7Ozs9PT0/Pz9AQEA+Pj4/Pz8+Pj4AAABAQEA/Pz87OztBQUE/Pz8+Pj4zMzNDQ0M/Pz89PT03Nzc/Pz8/Pz8/Pz8/Pz88PDw8PDwAAABCQkI7Ozs9PT0/Pz9AQEA/Pz8uLi4rKytAQEA/Pz89PT0+Pj4/Pz8/Pz8/Pz9CQkJAQEA/Pz9CQkI/Pz8/Pz8/Pz8+Pj49PT0/Pz8yMjI/Pz88PDw/Pz9BQUE8PDw/Pz9AQEA/Pz8/Pz8/Pz89PT0/Pz9CQkI9PT1EREQ9PT08PDw4ODg+Pj6AgIA/Pz8/Pz82NjZVVVU7Ozs/Pz81NTVAQEA/Pz8+Pj49PT1BQUE/Pz8/Pz8/Pz8vLy8/Pz87OztAQEA3Nzc9PT0+Pj4/Pz89PT0/Pz8/Pz89PT1AQEA9PT04ODgzMzM/Pz8/Pz9AQEA/Pz9AQEA/Pz83Nzc9PT0/Pz9AQEA/Pz8+Pj4+Pj5AQEA/Pz89PT1FRUU5OTk/Pz8/Pz8+Pj47Ozs/Pz89PT08PDw+Pj6z1Mg0AAAAonRSTlMAEXTG8/7pslICKMn//J0u2LcSLNu9Y0523KoKL9b7hggauZsEOuJ/ARS7VifkiwUX0bEq1f1p6KGQAz4NpnpY8AsGtMIyb46NbSOMcRuh+fGTFc0z1yKFKy/dpKff1CqKMoYPp+lAgAKd6kIDhdorJJExNjflktMr3nkQDoXbvaCe2d2EijIUn3JsbjDDF1jjOOdWvIDhmhoJfWrAK7bYnMgx8fGWAAACNUlEQVRIx+2W6V8SURSGBxEVeydMbVER1DCwRNTCEhMNsywqExXcUrNVU9NK2wy1fd9sMyvrP+1cmYH5eK5f5f3APef85hnuvfPeM6MoaaW1dWXKMGdasrJzrJtgc7dhQ+p2kzRry4OuHfmSbEEhUTt37d5TRGNxiRRrLwUczjKKyiuI3uuSYCv3ARa3ZyOu2k/xAT5b7aXra3xaVlsH1LPZg4cAvzM10wbgMBs+QqtsDKTyJroXGz7a7AgandECtPLXfKzFY8hCbcBxFudpP3Gy49RpQ8UXtgBnOOzZc53CU+e7Ism7uYnt5ji0p1e3pDmqzTnmAEr7GGz/AGEDg0MXaBgeERXrKIWFBQz2IvlYHbtEh/EycOUqVQLXVCDPxvGz+MPYdRGWjE/coGFyyg9M32SwM8PkydlQIim7JX6DxHpvM9g7c+SjoLESmqd9vjvDYO9NEzs1aahYY7SK+3Zm31Ddmp8jDx4qysIj2qt4O6dviH4xqvk5soj40vJjqjzh7HOf6BtPtb1SnulG6X3O6bHdqb5BejHbKtDOl+UcQ78iNuwzFKKvwx1v3npYJ+kd0BYynqz3Eu2OZvnB+IyCRVE+TD5qSmWBRuDjJzb8GWhIJq4xv36kWKoH6mr1vlFDnvRW86e9Qtd/qUrs1VeKv1VKbJjrOz3Wih8UrTpF37ArMlotFmfg58raLxrjvyXfifl/ku/TdZsiK9NfNcH+y93Ed4A1JzvLkmnOMClppbV19R+iQFSQ2tNASwAAAABJRU5ErkJggg==";

//  more icon
const MORE_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAAQlBMVEUAAABEREQ9PT0/Pz8/Pz9AQEA7OzszMzM/Pz8/Pz9FRUU/Pz8/Pz9VVVUAAAA/Pz8+Pj4/Pz8/Pz9BQUFAQEA/Pz+e9yGtAAAAFnRSTlMAD5bv9KgaFJ/yGv+zAwGltPH9LyD5QNQoVwAAAF5JREFUSMft0EkKwCAQRFHHqEnUON3/qkmDuHMlZlVv95GCRsYAAAD+xYVU+hhprHPWjDy1koJPx+L63L5XiJQx9PQPpZiOEz3n0qs2ylZ7lkyZ9oyXzl76MAAAgD1eJM8FMZg0rF4AAAAASUVORK5CYII=";

export default connect(mapStateToProps, mapDispatchToProps)(stylistProfile);
