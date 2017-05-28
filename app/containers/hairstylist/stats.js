import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

class Stats extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          stats: {
            earing: 234,
            rating: 4.5,
            views: 152,
            requests: 12,
            reservations: 3
          }
        }
    }


    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={{flexDirection:'column', marginTop: 20 }}>
              <View style={{height: 80, borderBottomWidth: 0.2, justifyContent: 'center'}}>
                <Text style={{fontFamily: 'Montserrat', fontSize: 24, marginLeft: 30}}>Stats</Text>
              </View>
              <View style={styles.sub_view}>
                <Text style={styles.text}>March Earnings</Text>
                {
                  this.state.stats == null ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 30, marginTop: 10, marginBottom: 20}}>You don't have any earnings yet</Text>
                  ) : (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 30, color: '#f26c4f', alignSelf: 'center', marginTop: 10, marginBottom: 20}}>{'$' + this.state.stats.earing}</Text>
                  )
                }
              </View>
              <View style={styles.sub_view}>
                <Text style={styles.text}>Overall Rating</Text>
                {
                  this.state.stats == null ? (
                    <Text style={{fontFamily: 'Montserrat', fontSize: 14, marginLeft: 30, marginTop: 10, marginBottom: 20}}>You don't have any earnings yet</Text>
                  ) : (
                    <View style={{flexDirection:'row', height: 120, borderBottomWidth: 0.2}}>
                      <View style={styles.rating_view}>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 38, fontWeight: '100'}}>{this.state.stats.rating}</Text>
                        <Image source={require('../../img/4_5_stars_small.png')} style={{width:80, height:12, marginTop: 5}}/>
                        <Text style={{fontFamily: 'Montserrat', fontSize: 11,marginTop:5}}>Based on 1,262 reviews</Text>
                      </View>
                      <View style={styles.rating_view_right}>
                        <View style={{flexDirection:'row'}}>
                          <Text style={styles.rating_text}>Cleanliness</Text>
                          <Image source={require('../../img/4_stars_small.png')} style={styles.rating_star}/>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 5}}>
                          <Text style={styles.rating_text}>Communicaton</Text>
                          <Image source={require('../../img/4_5_stars_small.png')} style={styles.rating_star}/>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 5}}>
                          <Text style={styles.rating_text}>Punctuality</Text>
                          <Image source={require('../../img/4_5_stars_small.png')} style={styles.rating_star}/>
                        </View>
                        <View style={{flexDirection:'row', marginTop: 5}}>
                          <Text style={styles.rating_text}>Service</Text>
                          <Image source={require('../../img/4_5_stars_small.png')} style={styles.rating_star}/>
                        </View>
                      </View>
                    </View>
                  )
                }
              </View>
              <View style={[styles.sub_view, {borderBottomWidth: 0}]}>
                <Text style={styles.text}>Views and Bookings</Text>
                {
                  this.state.stats == null ? (
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


export default Stats;
