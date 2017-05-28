import {
    StyleSheet,
    Dimensions
} from 'react-native';

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#63b7b7'
  },
  sub_form: {
    flexDirection:'column',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  backBtn: {
    width: 18,
    height: 18,
  },
  text: {
    fontFamily: 'Montserrat',
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    paddingTop: 9,
    color: 'white',
    textAlign: 'center'
  },
  view: {
    width:Dimensions.get('window').width,
    height:60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#808080'
  },
  view1_bottom: {
    width:Dimensions.get('window').width,
    height:60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  name: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width-145,
    height: 60,
    textAlign: 'right',
    fontSize: 14,
  },
  view_text: {
    fontFamily: 'Montserrat',
    width:110,
    fontSize: 14,
    marginLeft:18,
    textAlign: 'left'
  },
  hypertext: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    color: '#008489',
  },

  p_text: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    textAlign: 'left',
    color: '#808080'
  },
  check: {
    alignSelf: 'center',
  },

  button_view: {
    width:Dimensions.get('window').width,
    height:100,
    backgroundColor: 'white',
    alignSelf: 'center',
  },
  loginbutton: {
    width: Dimensions.get('window').width - 32,
    height: 55,
    backgroundColor: '#f26c4f',
    borderRadius: 30,
    alignSelf: 'center',
    marginTop: 20
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width/2 * 1.6,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    marginTop: 14
  },

  s_text: {
    fontFamily: 'Montserrat',
    marginTop: 20,
    marginLeft: 25,
    fontSize: 17,
    paddingTop: 9,
  },
  sBtn_view: {
    width:Dimensions.get('window').width,
    height:60,
    backgroundColor: '#f26c4f',
    alignSelf: 'center',
  },
  sBtn_view_gray: {
    width:Dimensions.get('window').width,
    height:60,
    backgroundColor: '#ee8169', //ee8169
    alignSelf: 'center',
  },
  s_view: {
    width:Dimensions.get('window').width,
    height:60,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderColor: '#808080'
  },
  icon_view: {
    width: 30,
    height: 30,
    marginLeft:18,
    alignSelf: 'center'
  },
  s_view_text: {
    fontFamily: 'Montserrat',
    width:Dimensions.get('window').width-100,
    fontSize: 14,
    paddingTop: 20,
    marginLeft:18,
    textAlign: 'left',
    color: '#808080'
  },

  active_view: {
    width:Dimensions.get('window').width - 30,
    height:80,
    flexDirection: 'column',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius:3,
    marginTop: 20
  },
  day_view: {
    width:Dimensions.get('window').width - 32,
    height:40,
    flexDirection: 'row',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: '#808080'
  },
  time_view: {
    width:Dimensions.get('window').width - 32,
    height:38,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius:3,
  },
  time_right_view: {
    width:(Dimensions.get('window').width - 32)/2,
    height:36,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRightWidth: 1,
    borderColor: '#808080',
    alignItems: 'center'
  },
  time_left_view: {
    width:(Dimensions.get('window').width - 32)/2,
    height:36,
    flexDirection: 'row',
    alignSelf: 'center',
    borderRadius:3,
    alignItems: 'center'
  },
  day_text: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width/2,
    marginLeft: 12,
    fontSize: 14,
    paddingTop: 9,
    color: 'white',
    textAlign: 'left'
  },
  checkbox: {
    marginLeft: Dimensions.get('window').width/2 - 70,
    paddingTop: 11,
  },

  time_dropdown: {
    width:(Dimensions.get('window').width - 32)/2 - 28,
    alignSelf: 'center',
    marginLeft: 12,
    borderRadius: 3,
  },
  dropdown_time_dropdown: {
    width:(Dimensions.get('window').width - 32)/2 - 30,
  },
  dropdown_text: {
    fontFamily: 'Montserrat',
    marginLeft: 10,
    fontSize: 14,
    justifyContent: 'center'
 },

  time_modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height - 50,
    width: Dimensions.get('window').width - 50,
  },
  row:{
    flexDirection: 'row',
    height: (Dimensions.get('window').height - 50)/13,
    width: Dimensions.get('window').width - 50,
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#808080',
    alignItems: 'center'
  },
  row_text: {
    fontFamily: 'Montserrat',
    width : Dimensions.get('window').width - 90,
    marginLeft: 10,
    fontSize: 16,
 },

 service_btn: {
   flexDirection: 'column',
   width: 100,
   height: 70,
   borderRadius: 2,
   borderWidth: 0.8,
   alignItems: 'center',
   justifyContent: 'center'
 },
 service_selected_btn: {
   flexDirection: 'column',
   width: 100,
   height: 70,
   borderRadius: 2,
   backgroundColor: '#f26c4f',
   alignItems: 'center',
   justifyContent: 'center'
 },
});

export default styles;
