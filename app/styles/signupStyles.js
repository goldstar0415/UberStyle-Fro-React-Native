import {
    StyleSheet,
    Dimensions
} from 'react-native';

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#63b7b7'
  },
  form: {
    flexDirection:'column',
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
  },
  logo_view: {
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center'
  },
  welcome_text: {
    fontFamily: 'Montserrat',
    width: null,
    height: null,
    fontSize: 30,
    color: 'white',
    paddingTop: 9,
    marginLeft: 12
  },
  facebook: {
    marginTop: 40,
    alignSelf: 'center',
  },
  facebutton: {
    width: Dimensions.get('window').width/2 * 1.6,
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#63b7b7',
    borderRadius: 22,
  },
  facetext: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width/2,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 17,
    color: '#ffffff',
  },
  facebook_Btn: {
    alignSelf: 'center',
    marginLeft: 15,
    backgroundColor: 'rgba(0,0,0,0)',
    width: 40
  },
  google: {
    marginTop: 15,
    alignSelf: 'center',
  },
  loginbutton: {
    width: Dimensions.get('window').width/2 * 1.6,
    height: 44,
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 22,
  },
  loginBtntext: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width/2 * 1.6,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 15,
    color: '#63b7b7',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  or_view: {
    marginTop: 30,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  line: {
    marginTop: 7,
    width: Dimensions.get('window').width/2 * 0.65,
    height: 0.5,
    backgroundColor: 'white'
  },
  or: {
    fontFamily: 'Montserrat',
    width: null,
    height: null,
    fontSize: 12,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)',
    marginLeft: 12,
    marginRight: 12
  },
  sign_text: {
    fontFamily: 'Montserrat',
    marginTop: 25,
    width: Dimensions.get('window').width/2 * 1.6,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 12,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0)'
  },
  bottom: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  bottomtext: {
    fontFamily: 'Montserrat',
    width: null,
    fontSize: 10,
    color: 'white',
  },
  hypertext: {
    fontFamily: 'Montserrat',
    width: null,
    fontSize: 10,
    color: 'white',
    textDecorationLine: "underline",
    textDecorationColor: "white",
  },

  sub_mainContainer: {
    flex: 1,
  },
  sub_form: {
    flex:1,
    flexDirection:'column',
    padding:25,
    width:Dimensions.get('window').width,
    height:Dimensions.get('window').height,
    marginTop:15
  },
  backBtn: {
    width: 18,
    height: 18,
  },
  text: {
    fontFamily: 'Montserrat',
    marginTop: 40,
    fontSize: 17,
    paddingTop: 9,
  },
  error_text: {
    fontFamily: 'Montserrat',
    marginTop: 40,
    fontSize: 17,
    paddingTop: 9,
    color: 'red'
  },
  number_view: {
    flexDirection:'row',
    marginTop:15,
    borderBottomWidth: 1
  },
  number: {
    width: Dimensions.get('window').width/2 * 1.6,
    height: 37,
  },
  rightBtn: {
    width: 60,
    height: 60,
    marginBottom: 20,
    marginLeft: Dimensions.get('window').width - 80
  },

  digit_view: {
    alignSelf: 'center',
    borderBottomWidth: 1
  },
  digit_number: {
    textAlign: 'center',
    width: 22,
    height: 22,
  },

  digit_text: {
    fontFamily: 'Montserrat',
    width: Dimensions.get('window').width - 110,
    marginTop: 10,
    marginLeft: 25,
    fontSize: 12,
    paddingTop: 9,
  },
  digit_rightBtn: {
    width: 60,
    height: 60,
    marginBottom: 20,
    marginLeft: 5
  },

  name_view: {
    width: Dimensions.get('window').width/2 * 0.6,
    flexDirection:'row',
    borderBottomWidth: 1
  },
  name: {
    width: Dimensions.get('window').width/2 * 0.6,
    height: 37,
  },
  name_hypertext: {
    fontFamily: 'Montserrat',
    width: null,
    fontSize: 11,
    color: '#008489',
  },
  name_bottom: {
    flexDirection:'row',
    width: Dimensions.get('window').width/2 * 0.9,
    height: null,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  name_text: {
    fontFamily: 'Montserrat',
    width: null,
    fontSize: 11,
  },

  modal: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height*2/3,
    width: Dimensions.get('window').width,
  },
  mail_icon: {
    width: 150,
    height: 150
  },
  resend_btn: {
    margin: 10,
    color: "black",
    padding: 10,
    borderWidth: 1,
    borderColor: '#808080',
    width: 150,
    borderRadius: 2
  },
  ok_btn: {
    margin: 10,
    backgroundColor: "black",
    color: 'white',
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    width: 150,
    borderRadius: 2
  },
  modal_text: {
    fontFamily: 'Montserrat',
    color: "black",
    fontSize: 24,
    marginTop: 10
  },
  modal_text_gray: {
    fontFamily: 'Montserrat',
    color: "#808080",
    fontSize: 14,
    marginTop: 15,
    textAlign: 'center'
  }
});

export default styles;
