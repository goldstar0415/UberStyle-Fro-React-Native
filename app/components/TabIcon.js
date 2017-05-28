import React, {
  PropTypes,
} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux'
import IconBadge from 'react-native-icon-badge';

const propTypes = {
  selected: PropTypes.bool,
  title: PropTypes.string,
};


const TabIcon = (props) => (props.title == 'DAILY' ?
  (<View style={{flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
      <IconBadge
        MainElement={
          <View>
            <Image source={props.selected ? require('../img/daily_orange.png') : require('../img/daily_black.png')}  style={{width: 20, height: 25, marginTop:2, marginLeft: 8}}/>
            <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 10, paddingTop: 2, paddingLeft: 5}}>
              {props.title}
            </Text>
          </View>
        }
        BadgeElement={
          props.daily_badge != 0 ? <Text style={{fontFamily: 'Montserrat', color:'#f26c4f', fontSize: 9}}>{props.daily_badge}</Text> : null
        }

        IconBadgeStyle={props.daily_badge != 0 ? {width:15,height:15, position:'absolute', top:-3, left: 20, backgroundColor: '#f26c4f'} : {backgroundColor: 'rgba(0,0,0,0)'}}
      />
  </View>) : props.title == 'CALENDAR' ?
    (<View style={{flexDirection:'column', alignItems: 'center'}}>
      <Image source={props.selected ? require('../img/calendar_selected.png') : require('../img/calendar.png')}  style={styles.selected_icon}/>
      <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 10, paddingTop: 5}}>
        {props.title}
      </Text>
    </View>) : props.title == 'INBOX' ?
      (<View style={{flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
          <IconBadge
            MainElement={
              <View>
                <Image source={props.selected ? require('../img/inbox_selected.png') : require('../img/inbox.png')}  style={{width: 23, height: 23, marginTop:2, marginLeft: 10}}/>
                <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 10, paddingTop: 2, paddingLeft: 5}}>
                  {props.title}
                </Text>
              </View>
            }
            BadgeElement={
              props.badge != 0 ? <Text style={{fontFamily: 'Montserrat', color:'#f26c4f', fontSize: 9}}>{props.badge}</Text> : null
            }

            IconBadgeStyle={props.badge != 0 ? {width:15,height:15, position:'absolute', top:-4, left: 23, backgroundColor: '#f26c4f'} : {backgroundColor: 'rgba(0,0,0,0)'}}
          />
      </View>) : props.title == 'STATS' ?
        (<View style={{flexDirection:'column', alignItems: 'center'}}>
          <Image source={props.selected ? require('../img/stats_selected.png') : require('../img/stats.png')}  style={styles.selected_icon}/>
          <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 10, paddingTop: 5}}>
            {props.title}
          </Text>
        </View>) : (<View style={{flexDirection:'column', alignItems: 'center'}}>
            <Image source={props.selected ? require('../img/user_selected.png') : require('../img/user.png')}  style={styles.selected_icon}/>
            <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 10, paddingTop: 5}}>
              {props.title}
            </Text>
          </View>)
);

var styles = StyleSheet.create({
  selected_icon:{
    width: 23,
    height: 23
  }
});

const mapStateToProps = (state) => {
    const props = {
        badge: state.message.badge,
        daily_badge: state.daily.daily_badge
    };
    return props;
};

TabIcon.propTypes = propTypes;

export default connect(mapStateToProps)(TabIcon)
