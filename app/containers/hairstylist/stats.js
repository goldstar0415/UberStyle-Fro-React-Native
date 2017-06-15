import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../actions';
import stars from '../../components/stars';

class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          stats: null
        }
    }

    _getStylistStats() {
      const { auth } = this.props;
      this.props.getStylistStat(auth.token).then(() => {
        const { api } = this.props;
        this.setState({
          stats: (api.stats) ? api.stats: null
        });
      });
    }

    componentDidMount() {
      this._getStylistStats();
    }

    _getMonth() {
      let date = new Date()
      var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return monthNames[date.getMonth()]
    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={{flexDirection:'column', marginTop: 20 }}>
              <View style={{height: 80, borderBottomWidth: 0.2, justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 24, marginLeft: 30}}>Stats</Text>
              </View>
              <View style={styles.sub_view}>
                <Text style={styles.text}>{this._getMonth()} Earnings</Text>
                {
                  this.state.stats == null || this.state.stats.monthlyEarnings == 0 ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 30, marginTop: 10, marginBottom: 20}}>You don't have any earnings yet</Text>
                  ) : (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 30, color: '#f26c4f', alignSelf: 'center', marginTop: 10, marginBottom: 20}}>{'$' + this.state.stats.monthlyEarnings}</Text>
                  )
                }
              </View>
              <View style={styles.sub_view}>
                <Text style={styles.text}>Overall Rating</Text>
                {
                  this.state.stats == null || this.state.stats.monthlyEarnings == 0 ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 30, marginTop: 10, marginBottom: 20}}>You don't have any earnings yet</Text>
                  ) : (
                    <View style={{flexDirection:'row', height: 120, borderBottomWidth: 0.2}}>
                      <View style={styles.rating_view}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 38, fontWeight: '100'}}>{this.state.stats.totalOverallRating}</Text>
                        <Image source={stars[this.state.stats.totalOverallRating]} style={{width:80, height:12, marginTop: 5}}/>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 11,marginTop:5}}>Based on {this.state.stats.reviews} reviews</Text>
                      </View>
                      <View style={styles.rating_view_right}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.rating_text}>Cleanliness</Text>
                          <Image source={stars[this.state.stats.cleanlinessOverallRating]} style={styles.rating_star}/>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 5}}>
                          <Text style={styles.rating_text}>Communicaton</Text>
                          <Image source={stars[this.state.stats.communicationOverallRating]} style={styles.rating_star}/>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 5}}>
                          <Text style={styles.rating_text}>Punctuality</Text>
                          <Image source={stars[this.state.stats.punctualityOverallRating]} style={styles.rating_star}/>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 5}}>
                          <Text style={styles.rating_text}>Service</Text>
                          <Image source={stars[this.state.stats.serviceOverallRating]} style={styles.rating_star}/>
                        </View>
                      </View>
                    </View>
                  )
                }
              </View>
              <View style={[styles.sub_view, {borderBottomWidth: 0}]}>
                <Text style={styles.text}>Views and Bookings</Text>
                {
                  this.state.stats == null || this.state.stats.monthlyEarnings == 0 ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 30, marginTop: 10, marginBottom: 20}}>No listing views yet</Text>
                  ) : (
                    <View>
                      <View style={styles.views_view}>
                        <Text style={[styles.views_text, {color: '#f26c4f'}]}>{this.state.stats.views}</Text><Text style={styles.views_text}> Views</Text>
                      </View>
                      <View style={styles.views_view}>
                        <Text style={[styles.views_text, {color: '#f26c4f'}]}>{this.state.stats.requests}</Text><Text style={styles.views_text}> Requests</Text>
                      </View>
                      <View style={styles.views_view}>
                        <Text style={[styles.views_text, {color: '#f26c4f'}]}>{this.state.stats.reservations}</Text><Text style={styles.views_text}> Reservations</Text>
                      </View>
                    </View>
                  )
                }
              </View>
            </ScrollView>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: 'Montserrat', fontSize: 18, textAlign: 'left', marginLeft: 30, marginTop: 20
  },
  sub_view: {
    flexDirection:'column', borderBottomWidth: 0.2,
  },
  rating_view: {
    flexDirection:'column',
    alignSelf: 'center',
    alignItems:'center',
    width:Dimensions.get('window').width/2
  },
  rating_view_right: {
    flexDirection:'column',
    alignSelf: 'center',
    position: 'absolute',
    right: 10,
    width:Dimensions.get('window').width/2
  },
  rating_text: {
    fontFamily: 'Montserrat',
    fontSize: 10,
    textAlign: 'right',
    width: Dimensions.get('window').width/4,
    alignSelf: 'center',
    paddingRight: 10
  },
  rating_star: {
    width:70,
    height:10,
    alignSelf: 'center',
    position: 'absolute',
    right: 20
  },

  views_view: {
    flexDirection: 'row', alignSelf: 'center', marginTop: 10
  },
  views_text: {
    fontFamily: 'Montserrat', fontSize: 16
  }
});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Stats);
