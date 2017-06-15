import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  Navigator,
  TextInput,
  TouchableHighlight,
  ListView,
  View
} from 'react-native';

import {Scene, Router, TabBar, Modal, Schema, Actions, Reducer, ActionConst} from 'react-native-router-flux';
import { connect } from 'react-redux'
import SplashScreen from 'react-native-smart-splash-screen'

import Styles from './styles/NavigationContainerStyle'
import NavItems from './components/NavItems'

import signup from './containers/signup/signup';
import phonenumber from './containers/signup/phonenumber';
import email from './containers/signup/email';
import digitcode from './containers/signup/digitcode';
import password from './containers/signup/password';
import city from './containers/signup/city';
import name from './containers/signup/name';

import first from './containers/hairSignup/first';
import second from './containers/hairSignup/second';
import service from './containers/hairSignup/service';
import hours from './containers/hairSignup/hours';

import login from './containers/login/login';
import forgotPassword from './containers/login/forgotPassword';

import TabView from './components/TabView';
import TabIcon from './components/TabIcon';
import TabIcon1 from './components/TabIcon1';

import profileEdit from './containers/hairstylist/profileEdit';
import messageRoom from './containers/hairstylist/messageRoom';
import alerts from './containers/hairstylist/alerts';
import profileComplete from './containers/hairstylist/daily/profileComplete';
import services from './containers/hairstylist/services/services';
import addService from './containers/hairstylist/services/addService';
import managePhotos from './containers/hairstylist/managePhotos';
import manualBooking from './containers/hairstylist/calendar/manualBooking';
import selectClient from './containers/hairstylist/calendar/selectClient';
import calendarSync from './containers/hairstylist/calendar/calendarSync';
import manageSchedule from './containers/hairstylist/calendar/manageSchedule';
import review from './containers/hairstylist/review';
import settings from './containers/hairstylist/settings/settings';
import notifications from './containers/hairstylist/settings/notifications';
import about from './containers/hairstylist/settings/about';
import help from './containers/hairstylist/help';
import promote from './containers/hairstylist/promote';

import pending from './containers/hairstylist/appointment/pending';
import confirmed from './containers/hairstylist/appointment/confirmed';
import editAppointment from './containers/hairstylist/appointment/editAppointment';

import Profile1 from './containers/client/profile';
import profileEdit1 from './containers/client/profileEdit';
import inbox1 from './containers/client/inbox';
import explore from './containers/client/explore/explore';
import category from './containers/client/explore/category';
import filters from './containers/client/explore/filters';
import settings1 from './containers/client/settings/settings';
import notifications1 from './containers/client/settings/notifications';
import about1 from './containers/client/settings/about';
import help1 from './containers/client/help';
import promote1 from './containers/client/promote';

import appointments from './containers/client/appointments/appointments';
import details from './containers/client/appointments/details';
import saved from './containers/client/saved';

import stylistProfile from './containers/client/stylistProfile';
import message from './containers/client/message';
import check from './containers/client/check';

import firstStep from './containers/client/booking/photoEmailConfirm/firstStep';
import addPhoto from './containers/client/booking/photoEmailConfirm/addPhoto';
import emailConfirm from './containers/client/booking/photoEmailConfirm/emailConfirm';
import selectDesired from './containers/client/booking/selectDesired';
import selectDate from './containers/client/booking/selectDate';
import finalStep from './containers/client/booking/finalStep';
import finalConfirm from './containers/client/booking/finalConfirm';
import enjoy from './containers/client/booking/enjoy';

class app extends Component{
  componentDidMount () {
     //SplashScreen.close(SplashScreen.animationType.scale, 850, 500)
     SplashScreen.close({
        animationType: SplashScreen.animationType.scale,
        duration: 850,
        delay: 500,
     })
   }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene initial key="signup" hideNavBar={true} navigationBarStyle={Styles.navBar} component={signup} renderLeftButton={NavItems.backButton} leftButtonIconStyle={Styles.leftButton} rightTitle='Log in' rightButtonTextStyle={Styles.rightButton} onRight={() => this.props.press} />
          <Scene key="phonenumber" hideNavBar={true} panHandlers={null} component={phonenumber} />
          <Scene key="email" hideNavBar={true} panHandlers={null} component={email} />
          <Scene key="digitcode" hideNavBar={true} panHandlers={null} component={digitcode} />
          <Scene key="password" hideNavBar={true} panHandlers={null} component={password} />
          <Scene key="city" hideNavBar={true} panHandlers={null} component={city} />
          <Scene key="name" hideNavBar={true} panHandlers={null} component={name} />
          <Scene key="first" hideNavBar={true} panHandlers={null} component={first} />
          <Scene key="second" hideNavBar={true} panHandlers={null} component={second} />
          <Scene key="service" hideNavBar={true} panHandlers={null} component={service} />
          <Scene key="hours" hideNavBar={true} panHandlers={null} component={hours} />
          <Scene key="login" hideNavBar={true} panHandlers={null} component={login} />
          <Scene key="forgotPassword" hideNavBar={true} panHandlers={null} component={forgotPassword} />
          <Scene key="tabbar" type={ActionConst.RESET} tabs={true} tabBarStyle={Styles.tabBar}>
            <Scene key="Daily" type={ActionConst.REFRESH} initial={true} component={TabView} hideNavBar={true} title="DAILY" icon={TabIcon} />
            <Scene key="Calendar" type={ActionConst.REFRESH} component={TabView} hideNavBar={true} title="CALENDAR" icon={TabIcon}/>
            <Scene key="Inbox" type={ActionConst.REFRESH} component={TabView} hideNavBar={true} title="INBOX" icon={TabIcon}/>
            <Scene key="Stats" type={ActionConst.REFRESH} component={TabView} hideNavBar={true} title="STATS" icon={TabIcon}/>
            <Scene key="Profile" type={ActionConst.REFRESH} component={TabView} hideNavBar={true} title="PROFILE" icon={TabIcon} />
          </Scene>
          <Scene key="profileEdit" hideNavBar={true} panHandlers={null} component={profileEdit} />
          <Scene key="messageRoom" hideNavBar={true} panHandlers={null} component={messageRoom} />
          <Scene key="alerts" hideNavBar={true} panHandlers={null} component={alerts} />
          <Scene key="profileComplete" hideNavBar={true} panHandlers={null} component={profileComplete} />
          <Scene key="services" hideNavBar={true} panHandlers={null} component={services} />
          <Scene key="addService" hideNavBar={true} panHandlers={null} component={addService} />
          <Scene key="managePhotos" hideNavBar={true} panHandlers={null} component={managePhotos} />
          <Scene key="manualBooking" hideNavBar={true} panHandlers={null} component={manualBooking} />
          <Scene key="selectClient" hideNavBar={true} panHandlers={null} component={selectClient} />
          <Scene key="calendarSync" hideNavBar={true} panHandlers={null} component={calendarSync} />
          <Scene key="manageSchedule" hideNavBar={true} panHandlers={null} component={manageSchedule} />
          <Scene key="pending" hideNavBar={true} direction={'vertical'} panHandlers={null} component={pending} />
          <Scene key="confirmed" hideNavBar={true} direction={'vertical'} panHandlers={null} component={confirmed} />
          <Scene key="editAppointment" hideNavBar={true} panHandlers={null} component={editAppointment} />
          <Scene key="review" hideNavBar={true} panHandlers={null} component={review} />
          <Scene key="settings" hideNavBar={true} panHandlers={null} component={settings} />
          <Scene key="notifications" hideNavBar={true} panHandlers={null} component={notifications} />
          <Scene key="about" hideNavBar={true} panHandlers={null} component={about} />
          <Scene key="help" hideNavBar={true} panHandlers={null} component={help} />
          <Scene key="promote" hideNavBar={true} panHandlers={null} component={promote} />

          <Scene key="tabbar1" type={ActionConst.RESET} hideTabBar={this.props.tabHide} tabs={true} tabBarStyle={Styles.tabBar}>
            <Scene key="explore" type={ActionConst.REFRESH} initial={true} component={explore} hideNavBar={true} title="EXPLORE" icon={TabIcon1} />
            <Scene key="saved" type={ActionConst.REFRESH} component={saved} hideNavBar={true} title="SAVED" icon={TabIcon1}/>
            <Scene key="appointments" type={ActionConst.REFRESH} component={appointments} hideNavBar={true} title="APPOINTMENTS" icon={TabIcon1}/>
            <Scene key="inbox1" type={ActionConst.REFRESH} component={inbox1} hideNavBar={true} title="INBOX" icon={TabIcon1}/>
            <Scene key="Profile1" type={ActionConst.REFRESH} component={Profile1} hideNavBar={true} title="PROFILE" icon={TabIcon1} />
          </Scene>
          <Scene key="profileEdit1" hideNavBar={true} panHandlers={null} component={profileEdit1} />
          <Scene key="category" hideNavBar={true} direction={'vertical'} panHandlers={null} component={category} />
          <Scene key="filters" hideNavBar={true} direction={'vertical'} panHandlers={null} component={filters} />
          <Scene key="details" hideNavBar={true} direction={'vertical'} panHandlers={null} component={details} />
          <Scene key="settings1" hideNavBar={true} panHandlers={null} component={settings1} />
          <Scene key="notifications1" hideNavBar={true} panHandlers={null} component={notifications1} />
          <Scene key="about1" hideNavBar={true} panHandlers={null} component={about1} />
          <Scene key="help1" hideNavBar={true} panHandlers={null} component={help1} />
          <Scene key="promote1" hideNavBar={true} panHandlers={null} component={promote1} />

          <Scene key="stylistProfile" hideNavBar={true} panHandlers={null} component={stylistProfile} />
          <Scene key="message" hideNavBar={true} panHandlers={null} component={message} />
          <Scene key="check" hideNavBar={true} direction={'vertical'} panHandlers={null} component={check} />

          <Scene key="firstStep" hideNavBar={true} panHandlers={null} component={firstStep} />
          <Scene key="addPhoto" hideNavBar={true} panHandlers={null} component={addPhoto} />
          <Scene key="emailConfirm" hideNavBar={true} panHandlers={null} component={emailConfirm} />
          <Scene key="selectDesired" hideNavBar={true} panHandlers={null} component={selectDesired} />
          <Scene key="selectDate" hideNavBar={true} panHandlers={null} component={selectDate} />
          <Scene key="finalStep" hideNavBar={true} panHandlers={null} component={finalStep} />
          <Scene key="finalConfirm" hideNavBar={true} panHandlers={null} component={finalConfirm} />
          <Scene key="enjoy" hideNavBar={true} panHandlers={null} component={enjoy} />
        </Scene>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
    const props = {
      tabHide: state.tabbar.tabHide,
    };
    return props;
};

export default connect(mapStateToProps)(app)
