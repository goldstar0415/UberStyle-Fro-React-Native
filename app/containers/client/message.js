import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, ListView, Image,TextInput, TouchableOpacity, Dimensions, TouchableHighlight, KeyboardAvoidingView, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { ActionCreators } from '../../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';

import KeyboardSpacer from 'react-native-keyboard-spacer';

const category = ['Barber', 'Haircut', 'Weaves', 'Color', 'Natural Hair', 'Straightening']
const sub_category = ['All Specialities', "Men's haircut", 'Line-Up', 'Haircut & Beard Trim', 'Fade', 'Taper', 'Clipper Haircut']
var category_data = [];

class Message extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          open: false,
          m_open: false,
          sub_open: false,
          btn_flag: 0,
          category_data: this._genRow(),
          category_dataSource: ds,
          sub_category_dataSource: ds,
          hairstyle: 'Service',
          message: '',
          image: '',
        };
    }

    componentDidMount() {
      this._getParentSerivces()
    }

    _getParentSerivces() {
      this.props.getParentServices().then(() => {
        const { api } = this.props
        category_data = []
        category = []
        category = api.service
        category.sort( function( a, b ) {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });

        for (i=0;i<category.length;i++) {
          category_data.push({
            value: category[i].name,
            id: category[i]._id,
            isSelect: false
          })
        }
        this.setState({
          category_data: category_data
        })
        this.setState({
          category_dataSource: this.state.category_dataSource.cloneWithRows(this.state.category_data)
        })
        
        this.categoryPress(category_data[0], 0)

      });
    }

    _getChildService(parent_id) {
      this.props.getChildServices(parent_id).then(() => {
        const { api } = this.props;
        sub_category = []
        for (i=0;i<api.childService.length;i++) {
          sub_category.push({
            value: api.childService[i].name,
            id: api.childService[i]._id,
            isSelect: false
          })
        }

        sub_category.sort( function( a, b ) {
          a = a.value.toLowerCase();
          b = b.value.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });

        this.setState({
          sub_category_data: sub_category
        })
        this.setState({
          sub_category_dataSource: this.state.sub_category_dataSource.cloneWithRows(this.state.sub_category_data)
        })
      });
    }

    _genRow(){
      category_data = []
      for (i=0;i<category.length;i++) {
        category_data.push({
          value: category[i].name,
          id: category[i]._id,
          isSelect: false
        })
      }
      return category_data;
    }

    categoryPress(rowData, rowID){
      rowData.isSelect = !rowData.isSelect
      this._genRow()
      var categoryClone = category_data
      categoryClone[rowID] = rowData
      console.log(categoryClone);
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      this.setState({
        category_dataSource: ds.cloneWithRows(categoryClone),
        category_selected: true
      })
      this._getChildService(rowData.id)
    }

    renderCategory (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableHighlight  onPress={() => this.categoryPress(rowData, rowID)} underlayColor='white'>
          <View style={rowData.isSelect ? styles.category_selected : styles.category_unselected}>
            <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>{rowData.value}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    renderSubCategory (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableHighlight  onPress={() => this.setState({open: false, hairstyle: rowData, btn_flag: 1})} underlayColor='#f26c4f'>
          <View style={styles.sub_category_view}>
            <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>{rowData}</Text>
          </View>
        </TouchableHighlight>
      )
    }

    setMessage(event) {
      let message = event.nativeEvent.text;
      this.setState({message})
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
            <TouchableOpacity  onPress={NavigationActions.pop}>
              <Image source={require('../../img/close-button.png')}  style={styles.backBtn}/>
            </TouchableOpacity>

            <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 120, borderBottomWidth: 0.2}}>
              <View style={{flexDirection:'column', alignSelf: 'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 24}}>Message</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Hairstyled by David</Text>
              </View>
              <Image source={require('../../img/david.jpg')} style={styles.profile}/>
            </View>

            <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 60, borderBottomWidth: 0.2}}>
              <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>{this.state.hairstyle}</Text>
              <TouchableOpacity  style={styles.edit_touch}  onPress={() => this.setState({open: true})}>
                <Text style={styles.edit_text}>Edit</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 80, borderBottomWidth: 0.2}}>
              <View style={{flexDirection:'column', alignSelf: 'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Your Message</Text>
                <Text style={{fontFamily: 'Montserrat', fontSize: 12, marginTop: 5, width: Dimensions.get('window').width*2/3}} numberOfLines= {1}>{this.state.message == '' ? 'Tell me a bit more...' : this.state.message}</Text>
              </View>
              <TouchableOpacity  style={styles.edit_touch}  onPress={() => this.setState({m_open: true})}>
                <Text style={styles.edit_text}>Change</Text>
              </TouchableOpacity>
            </View>
            {
              this.state.btn_flag == 0 ? (
                <View style={styles.sBtn_view_gray}>
                  <Text style={styles.loginBtntext}>Select Service</Text>
                </View>
              ) : this.state.btn_flag == 1 ? (
                <View style={styles.sBtn_view_gray}>
                  <Text style={styles.loginBtntext}>Write Message</Text>
                </View>
              ) : (
                <TouchableOpacity onPress={this.props.press}>
                  <View style={styles.sBtn_view}>
                    <Text style={styles.loginBtntext}>Send</Text>
                  </View>
                </TouchableOpacity>
              )
            }

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={{width:Dimensions.get('window').width, height: 60, backgroundColor: "#63b7b7"}} >
                <TouchableOpacity onPress={() => this.setState({open: false})}>
                  <Image source={require('../../img/close.png')}  style={{marginTop: 30,marginLeft: 10,width: 20,height: 20}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.sub_form}>
                <ListView
                  style={{width:Dimensions.get('window').width*2/5, backgroundColor: '#f1f0f0'}}
                  dataSource={this.state.category_dataSource}
                  renderRow={this.renderCategory.bind(this)}
                />
                <ListView
                  style={{width:Dimensions.get('window').width*3/5}}
                  dataSource={this.state.sub_category_dataSource}
                  renderRow={this.renderSubCategory.bind(this)}
                />
              </View>
            </Modal>

            <Modal isOpen={this.state.m_open} onClosed={() => this.setState({m_open: false})} style={styles.modal} position={"bottom"} swipeToClose={false}>
              <View style={{flexDirection:'row', width:Dimensions.get('window').width, height: 60, backgroundColor: "#63b7b7"}} >
                <TouchableOpacity onPress={() => this.setState({m_open: false, btn_flag: 2})}>
                  <Image source={require('../../img/checked_white.png')}  style={{marginTop: 33,marginLeft: 15,width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 17,marginTop: 30,marginLeft: 25,color: 'white',textAlign: 'center'}}>Done</Text>
              </View>
              <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection:'row', alignSelf:  'center',width: Dimensions.get('window').width-40, height: 120, borderBottomWidth: 0.2}}>
                  <View style={{flexDirection:'column', alignSelf: 'center'}}>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14}}>Introduce yourself</Text>
                    <Text style={{fontFamily: 'Montserrat', fontSize: 12, width:Dimensions.get('window').width*2/3, marginTop: 5 }}>Tell David a bit more about the look you want to achieve.</Text>
                  </View>
                  <Image source={require('../../img/david.jpg')} style={styles.profile}/>
                </View>
                <TextInput
                  style={{alignSelf: 'center', width: Dimensions.get('window').width-40, height: Dimensions.get('window').width/4, padding: 5, fontFamily: 'Montserrat', fontSize: 12,  textAlign: 'left' }}
                  multiline = {true}
                  placeholder = "Write a message..."
                  placeholderColor = 'gray'
                  value={this.state.message}
                  onChange={this.setMessage.bind(this)}
                />
                {
                  this.state.image != '' ? (
                    <Image source={this.state.image} style={{alignSelf: 'center', width: 200, padding: 15, height: 150, resizeMode: 'cover'}}/>
                  ) : null
                }
              </View>
              <KeyboardAvoidingView
                style={styles.photo_view}
                behavior="position"
              >
                <TouchableOpacity  onPress={() => this.setState({sub_open: true})}>
                  <Image source={require('../../img/photo-camera.png')} style={{width: 25, height: 25}}/>
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </Modal>

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
  },
  backBtn: {
    marginTop: 40,
    marginLeft: 25,
    width: 10,
    height: 10,
  },
  sBtn_view: {
    width:Dimensions.get('window').width,
    height:50,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    position: "absolute", bottom: -(Dimensions.get('window').height-310)
  },
  sBtn_view_gray: {
    width:Dimensions.get('window').width,
    height:50,
    backgroundColor: '#ee8169', //ee8169
    alignSelf: 'center',
    justifyContent: 'center',
    position: "absolute", bottom: 0
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
    width: 60,
    height: 60,
    borderRadius: 60/2,
    alignItems: 'center',
    alignSelf: 'center',
    position: "absolute", right: 5
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
});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
