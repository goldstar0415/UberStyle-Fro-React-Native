import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, AsyncStorage} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'

import { connect } from 'react-redux'

import stars from '../../components/stars';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


class Saved extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        saved_pictures: [
          {
            icon: require('../../img/david.jpg'),
            name: 'John Doe',
            star: 5,
            review: 186,
            rating: 120
          },
          {
            icon: require('../../img/black_message.png'),
            name: 'Millena Mill',
            star: 4,
            review: 178,
            rating: 100
          },
          {
            icon: require('../../img/david1.jpeg'),
            name: 'Karim Will',
            star: 3.5,
            review: 130,
            rating: 80
          }
        ]
      }

    }

    render() {
        return (
          <View style={styles.container}>
            <ScrollView style={{marginTop: 20, marginBottom: 50}}>
              <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 26, fontWeight: 'bold', marginTop: 60, marginLeft: 20}}>Saved</Text>
              {
                this.state.saved_pictures.length == 0 ? (
                  <View style={{width: width-40, alignSelf: 'center'}}>
                    <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14 , marginTop: 50}}>When you see something you like, tap on the heart to save it.</Text>
                    <TouchableOpacity style={{marginTop: 50}} onPress={NavigationActions.explore}>
                      <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14, color: '#63b7b7'}}>Start exploring</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{width: width-40, alignSelf: 'center'}}>
                    {
                      this.state.saved_pictures.map((picture, i) =>
                        <View key={i} style={{width: width-40, marginTop: 50, alignSelf: 'center'}}>
                          <TouchableOpacity onPress={NavigationActions.stylistProfile}>
                            <Image source={picture.icon} style={{width: width-40, height: 200}} resizeMode={'contain'}>
                              <TouchableOpacity onPress={this.props.press}>
                                <Image source={require('../../img/ic_heart_filled.png')} style={{width: 20, height: 20, position: 'absolute', top: 5, right: 5}} resizeMode={'contain'}/>
                              </TouchableOpacity>
                            </Image>
                          </TouchableOpacity>
                          <Text style={{fontFamily: 'Montserrat', textAlign: 'left', fontSize: 14}}>{picture.name}</Text>
                          <View style={styles.review_view}>
                            <Image source={stars[picture.star]} style={styles.rating_star}/>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 5, textAlign: 'left', fontSize: 10}}>{picture.review} Reviews</Text>
                            <Text style={{fontFamily: 'Montserrat', paddingLeft: 20, textAlign: 'left', fontSize: 10}}>${picture.rating}</Text>
                          </View>
                        </View>
                      )
                    }
                  </View>
                )
              }
            </ScrollView>

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
    height: 60,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
    position: 'absolute',
    left: 15,
    top: 30,
  },
  rating_star: {
    marginTop: 2,
    width:70,
    height:10,
  },
  review_view: {
    flexDirection: 'row',
    height: 20,
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(Saved)
