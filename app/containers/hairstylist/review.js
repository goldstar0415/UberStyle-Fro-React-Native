import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, ListView, Image,TextInput, TouchableOpacity, Dimensions, TouchableHighlight, KeyboardAvoidingView, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import Modal from 'react-native-modalbox';

import KeyboardSpacer from 'react-native-keyboard-spacer';

import RadioButton from 'radio-button-react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

import star from '../../img/star.png';
import star_fill from '../../img/star_fill.png';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {ActionCreators} from '../../actions';

const recommend = [
  {label: "Yes", value: 0 },
  {label: "No", value: 1 }
]

const stars = ['1', '2', '3', '4', '5']

class Review extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          dataSource: ds.cloneWithRows(recommend),
          m_open: false,
          message: '',
          cl_state: 0,
          co_state: 0,
          p_state: 0,
          s_state: 0,
          r_state: 0
        };
    }
    componentDidMount(){

    }

    setMessage(event) {
      let message = event.nativeEvent.text;
      this.setState({message})
    }

    cancelPress(value){
      this.setState({sub_open: false, r_state: value})
    }

    _submitReview() {
      this.props.giveReview(this.props.auth.token, this.props.alert.id, this.state.message, 
        this.state.r_state, this.state.cl_state, this.state.co_state, this.state.p_state, true).then(()=>{
          NavigationActions.tabbar1()
        })
    }

    renderRow (rowData) {
      return (
        <TouchableOpacity  onPress={() => this.cancelPress(rowData.value)} >
          <View style={styles.private_sub_view}>
            <Text style={styles.private_text}>{rowData.label}</Text>
            <View  style={styles.right_arrow}>
              <RadioButton currentValue={this.state.r_state} value={rowData.value} onPress={() => this.cancelPress(rowData.value)} outerCircleColor='#f26c4f' outerCircleSize={18} outerCircleWidth={2} innerCircleColor='#f26c4f' innerCircleSize={10}/>
            </View>
          </View>
        </TouchableOpacity>
      )
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView>
              <TouchableOpacity  onPress={NavigationActions.pop}>
                <Image source={require('../../img/back.png')}  style={styles.backBtn}/>
              </TouchableOpacity>

              <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 120, borderBottomWidth: 0.2}}>
                <View style={{flexDirection:'column', alignSelf: 'center'}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 26}}>Review summary</Text>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: '#4c4c4c'}}>John Doe • Mar 3 - 11:00 AM</Text>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Goddess Locs • $194</Text>
                </View>
                <Image source={require('../../img/david.jpg')} style={styles.profile}/>
              </View>

              <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 60, borderBottomWidth: this.state.message == '' ? 0.2 : 0}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>Describe your experience</Text>
                <TouchableOpacity  style={styles.edit_touch}  onPress={() => this.setState({m_open: true})}>
                  <Text style={styles.edit_text}>Edit</Text>
                </TouchableOpacity>
              </View>

              {
                this.state.message != '' ? (
                  <View style={{flexDirection:'column', alignSelf:  'center',width: Dimensions.get('window').width-40, borderBottomWidth: 0.2}}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 13, textAlign: 'left', color: '#4c4c4c'}}>{this.state.message}</Text>
                    <View style={{width: width, height: 30}}/>
                  </View>
                ) : null
              }

              <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 60, borderBottomWidth: 0.2}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>Private feedback</Text>
                <TouchableOpacity  style={styles.edit_touch}  onPress={() => this.setState({p_open: true})}>
                  <Text style={styles.edit_text}>Edit</Text>
                </TouchableOpacity>
              </View>

              <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 60, borderBottomWidth: 0.2}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>Recommend</Text>
                <TouchableOpacity  style={styles.edit_touch}  onPress={() => this.setState({sub_open: true})}>
                  <Text style={styles.edit_text}>{recommend[this.state.r_state].label}</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
            <TouchableOpacity onPress={()=>this._submitReview()}>
              <View style={styles.sBtn_view}>
                <Text style={styles.loginBtntext}>Submit</Text>
              </View>
            </TouchableOpacity>

            <Modal isOpen={this.state.p_open} onClosed={() => this.setState({p_open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={{flexDirection:'row', width:Dimensions.get('window').width, height: 60, backgroundColor: "#63b7b7", alignItems: 'center', justifyContent: 'center'}} >
                <TouchableOpacity style={{position: 'absolute', top: 33, left: 15}} onPress={() => this.setState({p_open: false})}>
                  <Image source={require('../../img/checked_white.png')}  style={{width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 17, position: 'absolute', top: 28, left: 45, color: 'white',textAlign: 'center'}}>Done</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16, marginTop: 17, color: 'white',textAlign: 'center'}}>Private Feedback</Text>
              </View>
              <View style={{flexDirection: 'column', width: width-40, alignSelf: 'center', alignItems: 'center'}}>
                <View style={{width: width-40, height: 80, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 0.2}}>
                  <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: '#808080', textAlign: 'center'}}>This feedback is just for your hairstylist.{'\n'}We won't make it public.</Text>
                </View>

                <View style={styles.star_view}>
                  <Text style={styles.star_title_text}>Cleanliness</Text>
                  <Text style={styles.star_text}>Was the space clean and tidy?</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                    {
                      stars.map((star_value, i) =>
                        <TouchableOpacity key={i} style={styles.star_touch} onPress={() => this.setState({cl_state: i+1})}>
                          <Image source={this.state.cl_state <= i ? star : star_fill}  style={{width: 40,height: 40}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View>

                <View style={styles.star_view}>
                  <Text style={styles.star_title_text}>Communicaton</Text>
                  <Text style={styles.star_text}>How clearly did the hairstylist communicate{'\n'}before and during the appointment?</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                    {
                      stars.map((star_value, i) =>
                        <TouchableOpacity key={i} style={styles.star_touch} onPress={() => this.setState({co_state: i+1})}>
                          <Image source={this.state.co_state <= i ? star : star_fill}  style={{width: 40,height: 40}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View>

                <View style={styles.star_view}>
                  <Text style={styles.star_title_text}>Punctuality</Text>
                  <Text style={styles.star_text}>Was the start time and duration respected?</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                    {
                      stars.map((star_value, i) =>
                        <TouchableOpacity key={i} style={styles.star_touch} onPress={() => this.setState({p_state: i+1})}>
                          <Image source={this.state.p_state <= i ? star : star_fill}  style={{width: 40,height: 40}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View>

                <View style={styles.star_view}>
                  <Text style={styles.star_title_text}>Service</Text>
                  <Text style={styles.star_text}>Did it provide good value for the price?</Text>
                  <View style={{flexDirection: 'row', alignSelf: 'center', alignItems: 'center'}}>
                    {
                      stars.map((star_value, i) =>
                        <TouchableOpacity key={i} style={styles.star_touch} onPress={() => this.setState({s_state: i+1})}>
                          <Image source={this.state.s_state <= i ? star : star_fill}  style={{width: 40,height: 40}} resizeMode={'contain'}/>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                </View>

              </View>
            </Modal>

            <Modal isOpen={this.state.sub_open} onClosed={() => this.setState({sub_open: false})} style={styles.sub_modal} position={"center"}>
              <View style={{flex:1}}>
                <View style={[styles.star_view, {height: 100}]}>
                  <Text style={styles.star_title_text}>Would you recommend David?</Text>
                  <Text style={[styles.star_text, {marginTop: 5}]}>Your answer will not be shared, it is only{'\n'}for Fro.</Text>
                </View>
                <ListView
                  dataSource={this.state.dataSource}
                  renderRow={this.renderRow.bind(this)}
                />
              </View>
            </Modal>

            <Modal isOpen={this.state.m_open} onClosed={() => this.setState({m_open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={{flexDirection:'row', width:Dimensions.get('window').width, height: 60, backgroundColor: "#63b7b7"}} >
                <TouchableOpacity onPress={() => this.setState({m_open: false})}>
                  <Image source={require('../../img/checked_white.png')}  style={{marginTop: 33,marginLeft: 15,width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 25,color: 'white',textAlign: 'center'}}>Done</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 120, borderBottomWidth: 0.2}}>
                  <View style={{flexDirection:'column', alignSelf: 'center'}}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Describe your experience</Text>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 12, width:Dimensions.get('window').width*2/3, marginTop: 5 }}>Your review will be public and will show on David's profile</Text>
                  </View>
                  <Image source={require('../../img/david.jpg')} style={styles.profile}/>
                </View>
                <TextInput
                  style={{alignSelf: 'center', width: width-40, height: width/4, padding: 5, fontFamily: 'Montserrat', fontSize: 12,  textAlign: 'left' }}
                  multiline = {true}
                  placeholder = "What was your appointment like?"
                  value={this.state.message}
                  onChange={this.setMessage.bind(this)}
                />
              </View>
            </Modal>

          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backBtn: {
    marginTop: 40,
    marginLeft: 20,
    width: 15,
    height: 15,
  },
  sBtn_view: {
    width:Dimensions.get('window').width,
    height:50,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width/2 * 1.6,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    alignItems: 'center',
    alignSelf: 'center',
    position: "absolute", top: 50, right: 5
  },
  modal: {
    alignSelf: 'center',
    alignItems: 'center', //#f1f0f0
  },
  sub_form: {
    flex:1,
    flexDirection:'row',
  },
  edit_touch: {
    position: "absolute",
    right: 0,
    alignSelf: 'center'
  },
  edit_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#f26c4f'
  },
  category_unselected: {
    flexDirection:'column',
    width:Dimensions.get('window').width*2/5,
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: 0.2
  },
  category_selected: {
    flexDirection:'column',
    width:Dimensions.get('window').width*2/5,
    justifyContent: 'center',
    height: 50,
    backgroundColor: 'white'
  },
  sub_category_view: {
    flexDirection:'column',
    justifyContent: 'center',
    height: 50,
  },
  photo_view: {
    width: 32, alignItems: 'center', height: 25, position: "absolute", bottom: 5, right: 5
  },
  modal_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    alignSelf: 'center',
    padding: 15,
    width: Dimensions.get('window').width - 60,
    height: 100
  },
  star_view: {
    width: width-40, height: 120, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
  },
  star_title_text: {
    fontFamily: 'Montserrat', fontSize: 16, textAlign: 'center'
  },
  star_text: {
    fontFamily: 'Montserrat', fontSize: 14, color: '#4c4c4c', textAlign: 'center'
  },
  star_touch: {
    width: 70, height: 60, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'
  },
  sub_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    height: 240,
    borderRadius: 2
  },
  private_sub_view: {
    flexDirection:'row',
    width: width - 100,
    alignSelf: 'center',
    height: 50
  },
  right_arrow: {
    alignSelf: 'center', position: "absolute", right: 0
  },
  private_text: {
    fontFamily: 'Montserrat', fontSize: 16, alignSelf: 'center'
  },
});

const mapStateToProps = (state) => {
  const {api} = state
  const {auth} = state
  return {api, auth};
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Review)
