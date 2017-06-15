import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, ListView, Animated, TextInput, Image, TouchableOpacity, Dimensions, KeyboardAvoidingView, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions, ActionConst } from 'react-native-router-flux'

import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';

var diffDate

class messageRoom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          translateAnim: new Animated.Value(0),
          sub_open: false,
          conversations: [
            {
              icon: require('../../img/david.jpg'),
              text: 'hello!',
              date: new Date(2017, 2, 23, 11, 5),
              image: '',
              answer: true,
              animated: false
            },
            {
              icon: require('../../img/stylist.png'),
              text: this.props.messages[0].message,
              date: new Date(this.props.messages[0].meta.dateTime),
              image: '',
              answer: false,
              animated: false
            }
          ],
          message_text: '',
          image: ''
        }

    }

    componentDidMount() {
      this.getDates()
    }

    getDates(){
      var date = new Date(this.props.messages[0].meta.dateTime)
      var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var month = monthNames[date.getMonth()] + ' ' + date.getDate()
      var hours = date.getHours()
      hours = (hours+24)%24
      var mid='AM'
      if(hours==0){
        hours=12
      }else if(hours>12){
        hours=hours%12
        mid='PM'
      }
      if(date.getMinutes() < 10)var minutes = '0' + date.getMinutes()
      else var minutes = date.getMinutes()
      var hour = hours + ':' + minutes + ' ' + mid
      var book_date = month + ' ・ ' + hour
      this.setState({book_date})
    }

    getDateDiff(dates){
      var today = new Date();
      var diffMs = (today - dates);
      var diffMons = diffMs / 86400000 / 30;
      var diffDays = diffMs / 86400000;
      var diffHrs = diffMs / 86400000 * 24;
      var diffMins = diffMs / 86400000 * 24 * 60;
      if(diffMins < 60){
        diffDate = Math.round(diffMins) + ' mins ago'
      }else if(diffHrs < 24){
        diffDate = Math.round(diffHrs) + ' hrs ago'
      }else if(diffDays < 30){
        diffDate = Math.round(diffDays) + ' days ago'
      }else{
        diffDate = Math.round(diffMons) + ' months ago'
      }
    }


    setMessage(event) {
      let message_text = event.nativeEvent.text;
      this.setState({message_text})
    }

    sendMessage(){
      var new_message = {
        icon: require('../../img/david.jpg'),
        text: this.state.message_text,
        date: new Date(),
        image: this.state.image,
        answer: true,
        animated: true
      }

      this.state.conversations.map((conversation, i) => {
        conversation.animated = false
      })

      var old_messages = this.state.conversations
      old_messages.push(new_message);

      this.setState({conversations: old_messages, message_text: '', image: ''})

      Animated.timing(
       this.state.translateAnim,
       {toValue: 1},
      ).start();
    }

    scrollToBottom(animated = true) {
        const scrollHeight = this.contentHeight - this.scrollViewHeight;
        if (scrollHeight > 0) {
            this.refs.scrollView.scrollTo({y: scrollHeight, animated});
        }
    }

    takePhoto(){
      this.setState({sub_open: false})
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.setState({image:source});
      }).catch(e => {
        console.log(e);
      });
    }
    chooseImage(){
      this.setState({sub_open: false})
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.setState({image:source});
      }).catch(e => {
        console.log(e);
      });
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={styles.back_touch} onPress={Actions.pop}>
                <Image source={require('../../img/back_white.png')}  style={{width: 15,height: 15}}/>
              </TouchableOpacity>
              <Text style={styles.name}>{this.props.messages[0].meta.sender.name}</Text>
            </View>

            {
              this.props.status == 0 || this.props.status == 1 ? (
                <View style={styles.status_view}>
                  <Text style={styles.status_text}>{this.props.status == 0 ? 'Pending' : this.props.status == 1 ? 'Confirmed' : 'Not Possible'}</Text>
                  <TouchableOpacity  style={styles.details_touch}  onPress={this.props.press}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: '#f26c4f'}}>Details</Text>
                  </TouchableOpacity>
                </View>
              ) : null
            }

            <ScrollView style={{flexDirection: 'column' , width: Dimensions.get('window').width, height: Dimensions.get('window').height - 160}}
              ref='scrollView'
              onContentSizeChange={(w, h) => {
                  this.contentHeight = h;
                  this.scrollToBottom();
              }}
              onLayout={ev => this.scrollViewHeight = ev.nativeEvent.layout.height}
            >
              <View style={{flexDirection:'column',  width: Dimensions.get('window').width, height: 60, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14, color: 'gray'}}>Inquiry sent for Goddess Locs</Text>
                {
                  this.props.status == 0 || this.props.status == 1 ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, paddingTop: 5, color: 'gray'}}>{this.state.book_date}</Text>
                  ) : null
                }
              </View>

              {
                this.state.conversations.map((conversation, i) => <Animated.View key={i}
                  style={conversation.animated ? {
                     opacity: 1,
                     transform: [{
                       translateY: this.state.translateAnim.interpolate({
                         inputRange: [0, 1],
                         outputRange: [300, 0]
                       }),
                     }]
                   } : null}
                >
                  {
                    this.getDateDiff(conversation.date)
                  }

                  {
                    conversation.answer ? (
                      <View style={styles.answer_view}>
                        <View style={{flexDirection: 'column'}}>
                          <View style={styles.answer_text_view}>
                            {
                              conversation.text != '' ? (
                                <Text style={styles.answer_text}>{conversation.text}</Text>
                              ) : null
                            }

                            {
                              conversation.image != '' ? (
                                <Image source={conversation.image} style={styles.image_message}/>
                              ) : null
                            }
                          </View>
                          <Text style={styles.answer_date}>{diffDate}</Text>
                        </View>
                        <Image source={conversation.icon} style={styles.answer_icon}/>
                      </View>
                    ) : (
                      <View style={styles.answer_view}>
                        <Image source={conversation.icon} style={styles.question_icon}/>
                        <View style={{flexDirection: 'column'}}>
                          <View style={styles.question_text_view}>
                            {
                              conversation.text != '' ? (
                                <Text style={styles.question_text}>{conversation.text}</Text>
                              ) : null
                            }

                            {
                              conversation.image != '' ? (
                                <Image source={conversation.image} style={styles.image_message}/>
                              ) : null
                            }
                          </View>
                          <Text style={styles.question_date}>{diffDate}</Text>
                        </View>
                      </View>
                    )
                  }

                </Animated.View>)
              }
            </ScrollView>

            <View style={this.state.image != '' ? styles.image_message_view : styles.message_view}>
              <TouchableOpacity style = {styles.camera_touch} onPress={() => this.setState({sub_open: true})}>
                <Image source={require('../../img/photo-camera.png')} style={{width: 22, height: 22}}/>
              </TouchableOpacity>
              {
                this.state.image != '' ? (
                  <Image source={this.state.image} style={styles.image_message}/>
                ) : (
                  <TextInput
                    style={styles.text_input}
                    placeholder = "Send a message ..."
                    value={this.state.message_text}
                    onChange={this.setMessage.bind(this)}
                  />
                )
              }

              {
                this.state.message_text != '' || this.state.image != ''? (
                  <TouchableOpacity  style={styles.send_touch}  onPress={() => this.sendMessage()}>
                    <Text style={styles.send_text}>Send</Text>
                  </TouchableOpacity>
                ) : (
                  <View  style={styles.send_touch}>
                    <Text style={styles.send_text_gray}>Send</Text>
                  </View>
                )
              }
            </View>

            {
              this.props.status == 2 ? (
                <TouchableOpacity onPress={this.props.press}>
                  <View style={styles.book_view}>
                    <Text style={styles.book_btn}>Complete Booking</Text>
                  </View>
                </TouchableOpacity>
              ) : null
            }

            <Modal isOpen={this.state.sub_open} onClosed={() => this.setState({sub_open: false})} style={styles.sub_modal} position={"center"}>
              <View style={{flexDirection:'column',alignItems:'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 18, paddingLeft: 15, width: Dimensions.get('window').width - 60, alignSelf: 'center'}}>Take Picture</Text>
                <Text style={styles.modal_text}>Take a new photo or select one from your existing photo library.</Text>
                <View style={{flexDirection:'row',position: "absolute", bottom: 5, right: 20}}>
                  <Button onPress={this.chooseImage.bind(this)} style={{fontFamily: 'Montserrat', fontSize: 14,alignSelf: 'center', color:'#63b7b7'}}>GALLERY</Button>
                  <Button onPress={this.takePhoto.bind(this)} style={{fontFamily: 'Montserrat', fontSize: 14,alignSelf: 'center', color:'#63b7b7', marginLeft: 15}}>CAMERA</Button>
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
    alignItems: 'center',
  },
  navBar: {
    flexDirection:'row',
    height: 60,
    width: Dimensions.get('window').width,
    backgroundColor: "#63b7b7",
  },
  back_touch: {
    alignSelf: 'center',
    position: 'absolute',
    left: 15,
    top: 30,
    zIndex: 1
  },
  name: {
    fontFamily: 'Montserrat',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    width: Dimensions.get('window').width,
    marginTop: 25
  },
  status_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 50,
    alignSelf:'center',
    justifyContent: 'center',
    borderBottomWidth: 0.2
  },
  status_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    alignSelf: 'center',
    position: "absolute",
    left: 20
  },
  details_touch: {
    position: "absolute",
    right: 20,
    alignSelf: 'center'
  },
  message_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 50,
    alignSelf:'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: '#d2d2d2',
  },
  image_message_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width,
    height: 170,
    alignSelf:'center',
    justifyContent: 'center',
    borderTopWidth: 0.5,
    borderColor: '#d2d2d2',
  },
  answer_icon: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
    marginLeft: 15
  },
  answer_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    color: 'white',
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 10
  },
  camera_touch: {
    width: 40,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 15
  },
  text_input: {
    fontFamily: 'Montserrat',
    alignSelf: 'center',
    width: Dimensions.get('window').width-110,
    height: 50,
    fontSize: 14,
    textAlign: 'left'
  },
  send_touch: {
    width:40,
    height: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 12
  },
  send_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 'bold',
    color: '#63b7b7'
  },
  send_text_gray: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    fontWeight: 'bold',
    color: 'gray'
  },
  answer_view: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 40,
    paddingTop: 5,
    alignSelf: 'center'
  },
  answer_text_view: {
    flexDirection: 'column',
    width: Dimensions.get('window').width - 100,
    backgroundColor: '#f9ad81',
    borderRadius: 2
  },
  answer_date: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width - 100,
    textAlign: 'right',
    color: '#363636',
    fontSize: 12
  },

  question_icon: {
    width: 40,
    height: 40,
    borderRadius: 40/2,
  },
  question_text_view: {
    flexDirection: 'column',
    width: Dimensions.get('window').width - 100,
    backgroundColor: '#e1e1e1',
    borderRadius: 2,
    marginLeft: 15
  },
  question_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    textAlign: 'left',
    backgroundColor: 'rgba(0,0,0,0)',
    padding: 10
  },
  question_date: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width - 100,
    textAlign: 'left',
    color: '#363636',
    fontSize: 12,
    marginLeft: 15
  },

  book_view: {
    width:Dimensions.get('window').width,
    height:50,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  book_btn: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width,
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  sub_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    width:Dimensions.get('window').width - 50,
    height: 140,
    borderRadius: 2
  },
  modal_text: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    alignSelf: 'center',
    padding: 15,
    width: Dimensions.get('window').width - 60,
    height: 100
  },

  image_message: {
    alignSelf: 'center',
    width: 200,
    height: 150,
    resizeMode: 'cover'
  }
});


export default messageRoom;
