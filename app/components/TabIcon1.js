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


const TabIcon1 = (props) => (props.title == 'EXPLORE' ?
  (<View style={{flexDirection:'column', alignItems: 'center'}}>
    <Image source={props.selected ? require('../img/explore_selected.png') : require('../img/explore.png')}  style={styles.selected_icon}/>
    <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 9, paddingTop: 5}}>
      {props.title}
    </Text>
  </View>) : props.title == 'SAVED' ?
    (<View style={{flexDirection:'column', alignItems: 'center'}}>
      <Image source={props.selected ? require('../img/saved_selected.png') : require('../img/saved.png')}  style={styles.selected_icon}/>
      <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 9, paddingTop: 5}}>
        {props.title}
      </Text>
    </View>) : props.title == 'APPOINTMENTS' ?
      (<View style={{flexDirection:'column', width: 80, alignItems: 'center'}}>
          <IconBadge
            MainElement={
              <View style={{ alignSelf: 'center', alignItems: 'center'}}>
                <Image source={props.selected ? require('../img/calendar_selected.png') : require('../img/calendar.png')}  style={{width: 24, height: 24}}/>
                <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 9, paddingTop: 5}}>
                  {props.title}
                </Text>
              </View>
            }
            BadgeElement={
              props.badge != 0 ? <Text style={{fontFamily: 'Montserrat', color:'#f26c4f', fontSize: 9}}>{props.badge}</Text> : null
            }

            IconBadgeStyle={props.badge != 0 ? {width:15,height:15, position:'absolute', top:-4, left: 40, backgroundColor: '#f26c4f'} : {backgroundColor: 'rgba(0,0,0,0)'}}
          />
      </View>) : props.title == 'INBOX' ?
        (<View style={{flexDirection:'column', alignItems: 'center'}}>
          <Image source={props.selected ? require('../img/inbox_selected.png') : require('../img/inbox.png')}  style={styles.selected_icon}/>
          <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 9, paddingTop: 5}}>
            {props.title}
          </Text>
        </View>) : (<View style={{flexDirection:'column', alignItems: 'center'}}>
            <Image source={props.selected ? require('../img/user_selected.png') : require('../img/user.png')}  style={styles.selected_icon}/>
            <Text style={{ color: props.selected ? '#f26c4f' : 'black', fontFamily: 'Montserrat', fontSize: 9, paddingTop: 5}}>
              {props.title}
            </Text>
          </View>)
);

var styles = StyleSheet.create({
  selected_icon:{
    width: 24,
    height: 24
  }
});

const mapStateToProps = (state) => {
    const props = {
        badge: state.message.badge,
        daily_badge: state.daily.daily_badge
    };
    return props;
};

TabIcon1.propTypes = propTypes;

export default connect(mapStateToProps)(TabIcon1)
