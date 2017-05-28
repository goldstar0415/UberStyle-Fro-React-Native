import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated, Platform} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import Modal from 'react-native-modalbox';
import Switch from 'react-native-material-switch'

import { connect } from 'react-redux'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Selectclient extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          hairstylist: [
            {
              icon: '',
              name: 'Millena Mill',
              email: 'millena@mail.com',
              phonenumber: '352-323-4234'
            },
            {
              icon: require('../../../img/stylist.png'),
              name: 'John Doe',
              email: 'millena@mail.com',
              phonenumber: '352-323-4234'
            },
            {
              icon: require('../../../img/david1.jpeg'),
              name: 'Karim Will',
              email: 'millena@mail.com',
              phonenumber: '352-323-4234'
            }
          ],
          dataSource: ds,
          notifications: true
        }
    }

    componentDidMount() {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.state.hairstylist)
      })
    }

    searchText(event) {
      let searchText = event.nativeEvent.text.toLowerCase();
      var new_hairstylist = []
      this.state.hairstylist.map((hairstyle, i) => {
        if(((hairstyle.name).toLowerCase()).search(searchText) !== -1 ){
          new_hairstylist.push(hairstyle)
        }
      })
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})

      if(new_hairstylist.length == 0)this.setState({dataSource: ds})
      else this.setState({dataSource: ds.cloneWithRows(new_hairstylist)})
    }

    setEmailText(event) {
      let email_text = event.nativeEvent.text;
      this.setState({email_text})
      if((email_text.toLowerCase()).search("@") !== -1 && ((email_text.toLowerCase()).search(".com") !== -1 || (email_text.toLowerCase()).search(".ca") !== -1 || (email_text.toLowerCase()).search(".net") !== -1)){this.setState({email_flag:true})}else{this.setState({email_flag:false})}
    }

    setPhoneNumber(event) {
      let text = event.nativeEvent.text;
      this.setState({text})
      if(this.state.text_flag && text.length == 3){
        text = '(' + text + ') '
        this.setState({text})
      }if(this.state.text_flag1 && text.length == 9){
        text = text + '-'
        this.setState({text})
      }
      if(text.length > 3){
        this.setState({text_flag:false})
      }else{
        this.setState({text_flag:true})
      }
      if(text.length > 9){
        this.setState({text_flag1:false})
      }else{
        this.setState({text_flag1:true})
      }
      if(text.length == 14){this.setState({flagBtn:true})}else{this.setState({flagBtn:false})}
    }

    renderRow (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableOpacity style={{flexDirection: 'row', width: width, height: 80, borderBottomWidth: 0.2, alignItems: 'center'}} onPress={() => this.setState({open: true, add_state: 1})}>
          {
            rowData.icon != '' ? (
              <Image source={rowData.icon}  style={{width: 45,height: 45, borderRadius: 45/2, marginLeft: 20}}/>
            ) : (
              <View style={{width: 45,height: 45, borderRadius: 45/2, marginLeft: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#f26c4f'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center', color: 'white'}}>{rowData.name.charAt(0)}</Text>
              </View>
            )
          }
          <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center', marginLeft: 15}}>{rowData.name}</Text>
        </TouchableOpacity>
      )
    }

    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar}>
              <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 35 : 15}} onPress={NavigationActions.pop}>
                <Image source={require('../../../img/back_white.png')}  style={{width: 12,height: 12}}/>
              </TouchableOpacity>
              <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>Select Client</Text>
              <TouchableOpacity  style={{alignSelf: 'center', position: 'absolute', right: 12, top: Platform.OS === 'ios' ? 23 : 5}} onPress={() => this.setState({open: true, add_state: 0})}>
                <Text style={{fontSize: 24, fontFamily: 'Montserrat', color: 'white', textAlign: 'center'}}>+</Text>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', width: width-40, height: 40, alignSelf: 'center', alignItems: 'center', borderRadius: 2, borderWidth: 0.2, marginTop: 20, marginBottom: 20}}>
              <Image source={require('../../../img/search_gray.png')}  style={{width: 20,height: 20, marginLeft: 15}}/>
              <TextInput
                style={{width: width-100, height: 40, fontFamily: 'Montserrat', fontSize: 14, textAlign: 'left', marginLeft: 15}}
                placeholder = "Search your contact list"
                onChange={this.searchText.bind(this)}
              />
            </View>

            <ListView
              dataSource={this.state.dataSource}
              renderRow={this.renderRow.bind(this)}
            />

            <Modal isOpen={this.state.open} onClosed={() => this.setState({open: false})} style={styles.container} position={"bottom"} swipeToClose={false}>
              <View style={styles.navBar}>
                <TouchableOpacity  style={{position: 'absolute', left: 15, top: Platform.OS === 'ios' ? 32 : 12}} onPress={() => {this.setState({open: false}); NavigationActions.pop()}}>
                  <Image source={require('../../../img/checked_white.png')}  style={{width: 15,height: 15}}/>
                </TouchableOpacity>
                <Text style={{fontFamily: 'Montserrat', fontSize: 16,position: 'absolute', left: 55, top: Platform.OS === 'ios' ? 28 : 8,color: 'white',textAlign: 'center'}}>Done</Text>
                <Text style={{fontSize: 16, fontFamily: 'Montserrat', color: 'white', textAlign: 'center', marginTop: Platform.OS === 'ios' ? 15 : 0}}>{this.state.add_state == 0 ? 'Add Client' : 'Edit Contact'}</Text>
              </View>

              <View style={{flexDirection: 'column'}}>
                {
                  this.state.add_state == 0 ? (
                    <View style={[styles.sub_view, {height: 100, justifyContent: 'center', alignItems: 'center'}]}>
                      <TouchableOpacity style={{width: 180, height: 32, borderWidth: 1, borderColor: '#f26c4f', borderRadius: 20, alignSelf: 'center', alignItems: 'center', justifyContent: 'center'}}>
                        <Text style={[styles.sub_text, {color: '#f26c4f', textAlign: 'center'}]}>Import From Contacts</Text>
                      </TouchableOpacity>
                    </View>
                  ) : null
                }
                <View style={styles.sub_view}>
                  <Text style={styles.sub_text}>Name</Text>
                  <TextInput
                    style={styles.sub_textinput}
                    placeholder = "John Doe"
                  />
                </View>
                <View style={styles.sub_view}>
                  <Text style={styles.sub_text}>Email Address</Text>
                  <TextInput
                    style={styles.sub_textinput}
                    placeholder = "johnoe147@gmail.com"
                    keyboardType='email-address'
                    onChange={this.setEmailText.bind(this)}
                    value={this.state.email_text}
                  />
                </View>
                <View style={styles.sub_view}>
                  <Text style={styles.sub_text}>Mobile Number</Text>
                  <TextInput
                    style={styles.sub_textinput}
                    placeholder="(___) ___-____"
                    maxLength={14}
                    keyboardType='numeric'
                    onChange={this.setPhoneNumber.bind(this)}
                    value={this.state.text}
                  />
                </View>
                <View style={styles.sub_view}>
                  <Text style={styles.sub_text}>SMS Notifications</Text>
                  <View style={{position: 'absolute', right: 0}}>
                    <Switch
                      activeBackgroundColor='#bce9e9'
                      inactiveBackgroundColor='#afafaf'
                      activeButtonColor='#63b7b7'
                      activeButtonPressedColor='#63b7b7'
                      inactiveButtonColor='#363636'
                      inactiveButtonPressedColor='#363636'
                      switchHeight={18}
                      switchWidth={40}
                      buttonRadius={8}
                      active={this.state.notifications}
                      onChangeState={(state) => {
                        this.setState({notifications: state})
                      }}
                    />
                  </View>
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
  navBar: {
    flexDirection:'row',
    height: Platform.OS === 'ios' ? 60 : 40,
    width: width,
    backgroundColor: "#63b7b7",
    alignItems: 'center',
    justifyContent: 'center'
  },
  sub_view: {
    flexDirection: 'row', width: width-40, height: 50, alignSelf: 'center', alignItems: 'center', borderBottomWidth: 0.2
  },
  sub_text: {
    fontSize: 14, fontFamily: 'Montserrat', textAlign: 'left'
  },
  sub_textinput: {
    width: (width-40)*2/3, height: 50, fontFamily: 'Montserrat', fontSize: 14, textAlign: 'right', position: 'absolute', right: 0
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

export default connect(mapStateToProps, mapDispatchToProps)(Selectclient)
