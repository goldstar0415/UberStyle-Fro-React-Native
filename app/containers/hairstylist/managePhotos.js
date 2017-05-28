import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform, Alert} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-crop-picker';

import Menu, {
  MenuContext,
  MenuTrigger,
  MenuOptions,
  MenuOption,
  renderers
} from 'react-native-popup-menu';

import CheckBox from 'react-native-check-box'

let checked = (<Image source={require('../../img/checked1.png')} style={{width:15,height:15}}/>)
let unchecked = (<Image source={require('../../img/unchecked.png')} style={{width:15,height:15}}/>)

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Managephotos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          photos: [],
          photo_take: false,
          remove_state: false,
          ch_idx: 0,
          checked: false,
          edit_state: false,
          ed_idx: 0
        }
    }

    componentDidMount() {

    }

    backPress(){
      if(this.state.photo_take){
        this.setState({photo_take: false})
      }else if(this.state.remove_state){
        this.setState({remove_state: false, ch_idx: 0, ed_idx: 0})
        this.state.photos.map((photo, i) => photo.check = true )
      }else if(this.state.edit_state){
        this.setState({edit_state: false})
      }else{
        NavigationActions.pop()
      }
    }

    takePhoto(){
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        let source = {uri: image.path};
        this.state.photos.push({image: source, check: true, hairstyle: '', price: ''})
        this.setState({photos: this.state.photos, photo_take: false});
      }).catch(e => {
        console.log(e);
      });
    }
    chooseImage(){
      ImagePicker.openPicker({
        multiple: true,
        waitAnimationEnd: false
      }).then(images => {
        images.map((image, i) => {
          let source = {uri: image.path}
          this.state.photos.push({image: source, check: true, hairstyle: '', price: ''})
        })
        this.setState({photos: this.state.photos, photo_take: false});
      }).catch(e => {
        console.log(e);
      });
    }

    menuSelect(value){
      if(value == 'remove'){
        this.setState({remove_state: true})
      }else{
        this.setState({edit_state: true})
      }
    }

    photoDelete(){
      var new_photos = []
      this.state.photos.map((photo, i) =>
        photo.check == true ? new_photos.push({image: photo.image, check: true, hairstyle: photo.hairstyle, price: photo.price}) : null
      )
      this.setState({photos: new_photos, checked: false, remove_state: false, ch_idx: 0, ed_idx: 0})
    }

    setHairstyle(event) {
      let hairstyle = event.nativeEvent.text;
      this.setState({hairstyle})
      this.state.photos[this.state.ed_idx].hairstyle = hairstyle
    }
    setPrice(event) {
      let price = event.nativeEvent.text;
      this.setState({price})
      this.state.photos[this.state.ed_idx].price = price
    }

    render() {
        return (
          <MenuContext style={styles.container} lazyRender={200}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={() => this.backPress()}>
                <Image source={require('../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              {
                this.state.edit_state == false ? (
                  <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>{this.state.remove_state == true ? this.state.ch_idx + ' selected' : this.state.photos.length + ' Photos'}</Text>
                ) : null
              }

              {
                this.state.photos.length != 0 && this.state.photo_take == false && this.state.remove_state == false & this.state.edit_state == false ? (
                  <TouchableOpacity  style={{position: 'absolute', right: 40, top: Platform.OS === 'ios' ? 30 : 15}} onPress={() => this.setState({photo_take: true})}>
                    <Image source={require('../../img/photography.png')}  style={{width: 20,height: 20}} resizeMode={'contain'}/>
                  </TouchableOpacity>
                ) : null
              }
              {
                this.state.photos.length != 0 && this.state.photo_take == false && this.state.remove_state == false && this.state.edit_state == false ? (
                  <Menu style={{position: 'absolute', right: 10, top: Platform.OS === 'ios' ? 30 : 15}} onSelect={(value) => this.menuSelect(value)}>
                    <MenuTrigger >
                      <Image source={require('../../img/more_options.png')} style={{width: 10, height: 18}} resizeMode={'contain'}/>
                    </MenuTrigger>
                    <MenuOptions>
                      <MenuOption value="remove">
                        <Text style={{fontFamily: 'Montserrat'}}>Remove photos</Text>
                      </MenuOption>
                      <MenuOption value="edit">
                        <Text style={{fontFamily: 'Montserrat'}}>Edit captions</Text>
                      </MenuOption>
                    </MenuOptions>
                  </Menu>
                ) : this.state.remove_state == true ? (
                  <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 30 : 15}} onPress={() => Alert.alert(
                        'Warning!',
                        "Do you really want to delete the photo?",
                        [
                          {text: 'Yes', onPress: () => this.photoDelete()},
                          {text: 'No', onPress: () => console.log('No Pressed!')},
                        ]
                      )}>
                    <Image source={require('../../img/bin.png')}  style={{width: 18,height: 18}} resizeMode={'contain'}/>
                  </TouchableOpacity>
                ) : this.state.edit_state == true ? (
                  <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 50, top: Platform.OS === 'ios' ? 30 : 15}} onPress={() => {
                    this.state.ed_idx--;
                    if(this.state.ed_idx == -1){
                      this.setState({ed_idx: this.state.photos.length-1})
                    }else{
                      this.setState({ed_idx: this.state.ed_idx})
                    }
                  }}>
                    <Image source={require('../../img/left_arrow.png')}  style={{width: 18,height: 18}} resizeMode={'contain'}/>
                  </TouchableOpacity>
                ) : null
              }

              {
                this.state.edit_state == true ? (
                  <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 30 : 15}} onPress={() => {
                    this.state.ed_idx++;
                    if(this.state.ed_idx == this.state.photos.length){
                      this.setState({ed_idx: 0})
                    }else{
                      this.setState({ed_idx: this.state.ed_idx})
                    }
                  }}>
                    <Image source={require('../../img/right_arrow.png')}  style={{width: 18,height: 18}} resizeMode={'contain'}/>
                  </TouchableOpacity>
                ) : null
              }
            </View>

            {
              this.state.photos.length == 0 || this.state.photo_take ? (
                <View style={styles.body_view}>
                  <TouchableOpacity style={styles.sub_touch} onPress={this.takePhoto.bind(this)}>
                    <Image source={require('../../img/camera_red.png')} style={{width: 40, height: 40}} resizeMode={'contain'}/>
                    <Text style={styles.sub_text}>Take A Photo</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.sub_touch, {height: 130, marginTop: 15}]} onPress={this.chooseImage.bind(this)}>
                    <Image source={require('../../img/library.png')} style={{width: 32, height: 32}} resizeMode={'contain'}/>
                    <Text style={styles.sub_text}>Import From{'\n'}Photo Library</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.sub_touch, {height: 130, marginTop: 15}]}>
                    <Image source={require('../../img/insta.png')} style={{width: 35, height: 35}} resizeMode={'contain'}/>
                    <Text style={styles.sub_text}>Import From{'\n'}Instagram</Text>
                  </TouchableOpacity>
                </View>
              ) : this.state.edit_state == true && this.state.photos.length != 0 ? (
                <View style={{flexDirection: 'column'}}>
                  <Image source={this.state.photos[this.state.ed_idx].image} style={{width: width, height: 200}} resizeMode={'contain'}/>
                  <View style={{flexDirection: 'row'}}>
                    <TextInput
                      style={{fontFamily: 'Montserrat', width: width*2/3, height: 40, fontSize: 18, marginLeft: 15, marginTop: 10}}
                      placeholder="What's the hairstyle?"
                      autoFocus={true}
                      value={this.state.photos[this.state.ed_idx].hairstyle}
                      onChange={this.setHairstyle.bind(this)}
                    />
                    <View style={{alignItems: 'center', flexDirection: 'row', position: 'absolute', right: 15, top:10, width: 70, height: 40, borderRadius: 2, backgroundColor: "#ffffff",shadowColor: "#000000",shadowOpacity: 0.8,shadowRadius: 2,shadowOffset: {height: 1,width: 0}}}>
                      <Text style={{fontFamily: 'Montserrat', width: 20, fontSize: 18, color: '#f26c4f',textAlign: 'right'}}>$</Text>
                      <TextInput
                        style={{fontFamily: 'Montserrat', width:50, fontSize: 16, color:'#f26c4f'}}
                        keyboardType='numeric'
                        value={this.state.photos[this.state.ed_idx].price}
                        onChange={this.setPrice.bind(this)}
                      />
                    </View>
                  </View>
                </View>
              ) : (
                <ScrollView>
                  <View style={styles.mediaWrapper}>
                  {
                  this.state.photos.map((photo, i) =>
                    <View key={i} style={styles.imageWrapper}>
                      <Image style={styles.media} source={photo.image}>
                        {
                          this.state.remove_state ? (
                            <CheckBox
                               style={{position: 'absolute', right: 2, top: 2}}
                               onClick={()=> {console.log(i, photo.check, this.state.ch_idx);
                                 if(photo.check == false){photo.check = true; this.state.ch_idx--}
                                 else {photo.check = false; this.state.ch_idx++}
                                 this.setState({ch_idx: this.state.ch_idx})
                               }}
                               isChecked={this.state.checked}
                               checkedImage={checked}
                               unCheckedImage={unchecked}
                             />
                          ) : null
                        }
                      </Image>
                    </View>)
                  }
                  </View>
                </ScrollView>
              )
            }
          </MenuContext>
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
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
  body_view: {
    flexDirection: 'column', height: height-50, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'
  },
  sub_touch: {
    width:150, height: 110, borderWidth: 1, borderColor: '#f26c4f', borderRadius: 2, alignItems: 'center', justifyContent: 'center'
  },
  sub_text: {
    fontFamily: 'Montserrat', color: '#f26c4f', fontSize: 16, marginTop: 10, textAlign: 'center'
  },

  mediaWrapper: {
    flexGrow: 1,
    flexDirection: "row",
    width: width,
    height: width/3,
    flexWrap: 'wrap'
  },
  imageWrapper: {
    borderWidth: 2,
    borderColor: "white"
  },
  media: {
    height: width/3-4,
    width: width/3-4,
    resizeMode: "cover"
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

export default connect(mapStateToProps, mapDispatchToProps)(Managephotos)
