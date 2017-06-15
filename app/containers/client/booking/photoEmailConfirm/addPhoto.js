import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import Modal from 'react-native-modalbox';
import ImagePicker from 'react-native-image-crop-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Addphoto extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          photo: ''
        }
    }

    componentDidMount() {

    }

    takePhoto(){
      this.setState({open: false})
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.setState({photo:source});
      }).catch(e => {
        console.log(e);
      });
    }
    chooseImage(){
      this.setState({open: false})
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.setState({photo:source});
      }).catch(e => {
        console.log(e);
      });
    }

    nextPress(){
      if(this.state.photo != ''){
        this.setState({open: true})
      }else{
        let data = {
          "stylist_id" : this.props.stylist_id,
          "service" : this.props.service,
          "stylist_name": this.props.stylist_name
        }
        NavigationActions.selectDesired(data)
      }
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <View style={{width: 10, height: 10, borderRadius: 10/2, backgroundColor: '#bdbfc1'}}/>
              <View style={{width: 10, height: 10, borderRadius: 10/2, marginLeft: 5, borderWidth: 1, borderColor: '#bdbfc1'}}/>
            </View>
            {
              this.state.photo == '' ? (
                <View>
                  <Text style={{fontSize: 24, fontFamily: 'Montserrat', marginTop: 30, textAlign: 'center', color: '#585c5e'}}>Add a profile photo</Text>
                  <Image source={require('../../../../img/profile_photo_empty.png')}  style={{width: 120, height: 120, alignSelf: 'center', borderRadius: 120/2, marginTop: 15, borderWidth: 1, borderColor: '#d3d3d3'}}/>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', marginTop: 15, textAlign: 'center', color: '#585c5e'}}>This will help David recognise you when you{'\n'}meet, so make sure it shows your face.</Text>
                </View>
              ) : (
                <View>
                  <Text style={{fontSize: 24, fontFamily: 'Montserrat', marginTop: 30, textAlign: 'center', color: '#585c5e'}}>Looking good!</Text>
                  <Image source={this.state.photo}  style={{width: 120, height: 120, alignSelf: 'center', borderRadius: 120/2, marginTop: 15}}/>
                  <Image source={require('../../../../img/check.png')} style={{width: 20, height: 20, position: 'absolute', right: width/2-93, top: 173, borderRadius: 20/2, borderWidth: 1, borderColor: 'white'}}/>
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', marginTop: 15, textAlign: 'center', color: '#585c5e'}}>Thanks for putting a face to your name.</Text>
                  <TouchableOpacity style={{marginTop: 50}} onPress={() => this.setState({open: true})}>
                    <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'center', color: '#f26c4f'}}>Change Photo</Text>
                  </TouchableOpacity>
                </View>
              )
            }
            <TouchableOpacity style={styles.sBtn_view} onPress={() => this.nextPress()}>
              <Text style={styles.loginBtntext}>Next</Text>
            </TouchableOpacity>

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.modal} position={"bottom"}>
              <View style={{alignItems: 'center', height: 60, backgroundColor: '#e1f1f0', justifyContent: 'center'}}>
                <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left', color: '#585c5e'}}>Choose a photo that shows your face.</Text>
              </View>
              <TouchableOpacity style={{width: width-40, height: 80, alignSelf: 'center', justifyContent: 'center', borderBottomWidth: 0.2}} onPress={() => this.takePhoto()}>
                <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left', color: '#63b7b7'}}>Take a photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: width-40, height: 80, alignSelf: 'center', justifyContent: 'center', borderBottomWidth: 0.2}} onPress={() => this.chooseImage()}>
                <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left', color: '#63b7b7'}}>Choose from album</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{width: width-40, height: 80, alignSelf: 'center', justifyContent: 'center'}} onPress={() => this.setState({open: false})}>
                <Text style={{fontSize: 18, fontFamily: 'Montserrat', textAlign: 'left', color: '#63b7b7'}}>Cancel</Text>
              </TouchableOpacity>
            </Modal>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  sBtn_view: {
    width:width-40,
    height:50,
    borderRadius: 2,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 380
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  modal: {
    width: width,
    height: 300
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

export default connect(mapStateToProps, mapDispatchToProps)(Addphoto)
