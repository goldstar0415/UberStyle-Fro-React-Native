import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, AsyncStorage} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/FontAwesome'

import { connect } from 'react-redux'
import {setBadge, ActionCreators} from '../../actions';
import { bindActionCreators } from 'redux';

import IconBadge from 'react-native-icon-badge';

var date

class Inbox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          messages: []
        }
    }

    _getConversation() {
      const { authState } = this.props;
      this.props.actions.getConversation(authState.token).then(() => {
        const {apiState} = this.props;
        this.setState({
          messages: apiState.conversation
        });
      });
    }

    componentDidMount(){
      this._getConversation()
    }

    getDate(m_date, reading) {
      m_date = new Date(m_date)
      var diffmonths
      diffmonths = (new Date().getFullYear() - m_date.getFullYear()) * 12
      diffmonths -= m_date.getMonth() + 1
      diffmonths += new Date().getMonth()
      diffmonths <= 0 ? diffmonths = 0 : diffmonths += 1

      if(diffmonths == 0){
        if(new Date().getFullYear() == m_date.getFullYear() && new Date().getMonth() == m_date.getMonth() && new Date().getDate() == m_date.getDate()){
          var hours = m_date.getHours()
          hours = (hours+24)%24
          var mid='AM'
          if(hours==0){
            hours=12
          }else if(hours>12){
            hours=hours%12
            mid='PM'
          }
          if(m_date.getMinutes() < 10)var minutes = '0' + m_date.getMinutes()
          else var minutes = m_date.getMinutes()
          date = hours + ':' + minutes + ' ' + mid
        }else{
          var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          date = monthNames[m_date.getMonth()] + ' ' + m_date.getDate() + ', ' + m_date.getFullYear()
        }
      }else{
        diffmonths == 1 ? date = diffmonths + ' month ago' : date = diffmonths + ' months ago'
      }
      return date
    }

    messagePress(message, i){
      var change_messages = this.state.messages
      change_messages[i].meta.delivered = true
      this.setState({messages:change_messages})

      var badge = 0
      this.state.messages.map((message, i) => {
        if(!message.meta.delivered)badge++
      })

      this.props.setBadge(badge)

      NavigationActions.messageRoom(message)
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.inbox_view}>
              <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 30,}}>Inbox</Text>
              <TouchableOpacity style={{position:'absolute', right: -10, top: 20}} onPress={NavigationActions.alerts}>
                <IconBadge
                  MainElement={
                    <Icon name="bell-o" size={20} />
                  }
                  BadgeElement={
                    this.props.badge != 0 ? <Text style={{fontFamily: 'Montserrat', color:'#f26c4f', fontSize: 9, backgroundColor: 'rgba(0,0,0,0)'}}>{this.props.badge}</Text> : null
                  }

                  IconBadgeStyle={this.props.badge != 0 ? {width:13,height:13, position:'absolute', top:1, left: 10, backgroundColor: '#f26c4f', borderWidth: 1, borderColor: '#ffffff'} : {backgroundColor: 'rgba(0,0,0,0)'}}
                />
              </TouchableOpacity>
              {
                this.state.messages == '' ? (
                  <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 16, marginTop: 5, color: '#4c4c4c'}}>You have no unread messages.</Text>
                ) : null
              }

            </View>
            {
              this.state.messages != '' ? (
                <ScrollView style={{flexDirection:'column', height: Dimensions.get('window').height }}>
                  {
                    this.state.messages.map((message, i) => <TouchableOpacity key={i} onPress={() => this.messagePress(message, i)}>
                      <View style={styles.message_view}>
                        <View style={{flexDirection: 'column'}}>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={require('../../img/stylist.png')} style={styles.profile}/>
                            <View style={{flexDirection: 'column', marginLeft:15, width: Dimensions.get('window').width-120}}>
                              <View style={{flexDirection: 'row'}}>
                                <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 16, marginBottom: 5}}>{message.sender.name}</Text>
                                {
                                  this.getDate(message.messages[0].meta.dateTime, message.meta.delivered),
                                  message.meta.delivered ? <Text style={{fontFamily: 'Montserrat', position: 'absolute', bottom: 5, right: 0, fontSize: 14, color: 'gray'}}>{date}</Text> : <Text style={{position: 'absolute', bottom: 5, right: 0, fontSize: 14, color: 'green'}}>{date}</Text>
                                }
                              </View>
                              <Text style={{fontFamily: 'Montserrat', textAlign: 'left', color: '#242424',fontSize: 14}} numberOfLines= {2}>{message.messages[0].message}</Text>
                            </View>
                          </View>
                          <View style={{flexDirection: 'row'}}>
                            {/*{
                              message.status == 0 ? <Text style={{fontFamily: 'Montserrat', textAlign: 'left', color: 'gray',fontSize: 14, marginLeft: 65, marginTop: 5}}>Pending</Text>
                              : message.status == 1 ? <Text style={{fontFamily: 'Montserrat', textAlign: 'left', color: 'green',fontSize: 14, marginLeft: 65, marginTop: 5}}>Confirmed</Text>
                              : message.status == 2 ? <Text style={{fontFamily: 'Montserrat', textAlign: 'left', color: 'red',fontSize: 14, marginLeft: 65, marginTop: 5}}>Not Possible</Text> : null
                            }*/}
                            <Text style={{fontFamily: 'Montserrat', textAlign: 'left', color: 'green',fontSize: 14, marginLeft: 65, marginTop: 5}}>Confirmed</Text>

                            <Text style={{fontFamily: 'Montserrat', textAlign: 'left', color: 'gray',fontSize: 14, marginTop: 5}}> •  Goddess Locs</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>)
                  }
                </ScrollView>
              ) : null
            }

          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    resizeMode: 'cover',
    marginTop: 20
  },
  title_text: {
    fontFamily: 'Montserrat',
    fontSize: 30,
    color: 'white',
    position: 'absolute',
    left: 18,
    top: 25,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  sub_form: {
    flexDirection:'column',
    alignItems:'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width-40,
    height: 200,
    borderRadius: 3,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 95
  },
  modal_text: {
    fontFamily: 'Montserrat',
    fontSize: 18,
    height: 40
  },
  modal_text_gray: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: '#242424',
    textAlign: 'center',
    alignItems: 'center',
    height: 72
  },
  text_btn: {
    fontFamily: 'Montserrat',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  btn_view: {
    width: 170,
    height: 40,
    backgroundColor: '#f26c4f',
    borderRadius: 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inbox_view: {
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: Dimensions.get('window').width-60,
    height: Dimensions.get('window').height/5,
    borderBottomWidth: 0.2
  },
  message_view: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width-60,
    height: Dimensions.get('window').height*0.9/5,
    borderBottomWidth: 0.2
  },
  profile: {
    width: 50,
    height: 50,
    borderRadius: 50/2,
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  const { auth } = state;
  const { api } = state;
  const props = {
      badge: state.message.badge,
      authState: auth,
      apiState: api
  };
  return props;
};

const mapDispatchToProps = (dispatch) => {
    return {
        setBadge: (badge) => {
            dispatch(setBadge(badge));
        },
        actions: bindActionCreators(ActionCreators, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Inbox)
