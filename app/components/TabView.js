import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from 'react-native-button';
import { Actions } from 'react-native-router-flux';

import Profile from '../containers/hairstylist/profile';
import Inbox from '../containers/hairstylist/inbox';
import Daily from '../containers/hairstylist/daily/daily';
import Stats from '../containers/hairstylist/stats';
import Calendar from '../containers/hairstylist/calendar/calendar';

const contextTypes = {
  drawer: React.PropTypes.object,
};

const propTypes = {
  name: PropTypes.string,
  sceneStyle: View.propTypes.style,
  title: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

const TabView = (props, context) => {
  const drawer = context.drawer;
  return (
    props.title == 'PROFILE' ? <Profile/> :
    props.title == 'INBOX' ? <Inbox/> :
    props.title == 'DAILY' ? <Daily/> :
    props.title == 'STATS' ? <Stats/> :
    props.title == 'CALENDAR' ? <Calendar/> : null
  );
};

TabView.contextTypes = contextTypes;
TabView.propTypes = propTypes;

export default TabView;
