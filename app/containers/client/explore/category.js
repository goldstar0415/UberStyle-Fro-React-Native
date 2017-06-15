import React from 'react';
import {PropTypes} from "react";
import {StyleSheet, Text, View, ScrollView, Image, ListView, TouchableHighlight, TouchableOpacity, Dimensions, Animated} from "react-native";
import Button from 'react-native-button';
import { Actions as NavigationActions } from 'react-native-router-flux'
import { bindActionCreators } from 'redux';
import { setFilter, ActionCreators } from '../../../actions';
import { connect } from 'react-redux'

const category = [];
const sub_category = [];
var category_data = {};

class Category extends React.Component {
    constructor(props) {
        super(props);

        const rowHasChanged = (r1, r2) => r1 !== r2
        const ds = new ListView.DataSource({rowHasChanged})

        this.state = {
          category_data: [],
          sub_category_data: [],
          category_dataSource: ds,
          sub_category_dataSource: ds,
          category_selected: false
        }
    }

    componentDidMount() {
      this._getParentSerivces()
    }

    _getParentSerivces() {
      this.props.actions.getParentServices().then(() => {
        const { api } = this.props
        category_data = []
        category = []
        category = api.service
        category.sort( function( a, b ) {
          a = a.name.toLowerCase();
          b = b.name.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });

        for (i=0;i<category.length;i++) {
          category_data.push({
            value: category[i].name,
            id: category[i]._id,
            isSelect: false
          })
        }
        this.setState({
          category_data: category_data
        })
        this.setState({
          category_dataSource: this.state.category_dataSource.cloneWithRows(this.state.category_data)
        })
        
        this.categoryPress(category_data[0], 0)

      });
    }

    _back(data) {
      var filters = {}
      filters["service"] = data
      this.props.setFilter(filters)
      NavigationActions.pop({refresh:{service: data}})
    }

    _getChildService(parent_id) {
      this.props.actions.getChildServices(parent_id).then(() => {
        const { api } = this.props;
        sub_category = []
        for (i=0;i<api.childService.length;i++) {
          sub_category.push({
            value: api.childService[i].name,
            id: api.childService[i]._id,
            isSelect: false
          })
        }

        sub_category.sort( function( a, b ) {
          a = a.value.toLowerCase();
          b = b.value.toLowerCase();

          return a < b ? -1 : a > b ? 1 : 0;
        });

        this.setState({
          sub_category_data: sub_category
        })
        this.setState({
          sub_category_dataSource: this.state.sub_category_dataSource.cloneWithRows(this.state.sub_category_data)
        })
      });
    }

    _genRow(){
      category_data = []
      for (i=0;i<category.length;i++) {
        category_data.push({
          value: category[i].name,
          id: category[i]._id,
          isSelect: false
        })
      }
      return category_data;
    }

    categoryPress(rowData, rowID){
      rowData.isSelect = !rowData.isSelect
      this._genRow()
      var categoryClone = category_data
      categoryClone[rowID] = rowData
      console.log(categoryClone);
      const rowHasChanged = (r1, r2) => r1 !== r2
      const ds = new ListView.DataSource({rowHasChanged})
      this.setState({
        category_dataSource: ds.cloneWithRows(categoryClone),
        category_selected: true
      })
      this._getChildService(rowData.id)
    }

    renderCategory (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableHighlight  onPress={() => this.categoryPress(rowData, rowID)} underlayColor='white'>
          <View style={rowData.isSelect ? styles.category_selected : styles.category_unselected}>
            <Text style={rowData.isSelect ? {fontFamily: 'Montserrat', fontSize: 14, marginLeft: 20, textAlign: 'left'} : {fontFamily: 'Montserrat', fontSize: 14, marginLeft: 20, textAlign: 'left', color: 'white', }}>{rowData.value}</Text>
          </View>
        </TouchableHighlight>
      )
    }
    renderSubCategory (rowData: string , sectionID: number, rowID: number) {
      return (
        <TouchableHighlight  onPress={()=>this._back(rowData)} underlayColor='#f26c4f'>
          <View style={styles.sub_category_view}>
            <Text style={{fontFamily: 'Montserrat', fontSize: 14, alignSelf: 'center'}}>{rowData.value}</Text>
          </View>
        </TouchableHighlight>
      )
    }


    render() {
        return (
          <View style={styles.container}>
            <View style={styles.navBar} >
              <TouchableOpacity onPress={NavigationActions.pop}>
                <Image source={require('../../../img/close.png')}  style={{marginTop: 30,marginLeft: 10,width: 20,height: 20}}/>
              </TouchableOpacity>
              <Text style={{fontFamily: 'Montserrat', fontSize: 24, marginTop: 30,marginLeft: 20, color: 'white'}}>What's your next look?</Text>
            </View>
            <View style={styles.sub_form}>
              <ListView
                style={this.state.category_selected ? {width:Dimensions.get('window').width*2/5, backgroundColor: '#63b7b7'} : {width:Dimensions.get('window').width, backgroundColor: '#63b7b7'}}
                dataSource={this.state.category_dataSource}
                renderRow={this.renderCategory.bind(this)}
              />
              {
                this.state.category_selected ? (
                  <ListView
                    style={{width:Dimensions.get('window').width*3/5}}
                    dataSource={this.state.sub_category_dataSource}
                    renderRow={this.renderSubCategory.bind(this)}
                  />
                ) : null
              }
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
    flexDirection: 'column',
    width:Dimensions.get('window').width,
    height: 150,
    borderBottomWidth: 0.4,
    borderBottomColor: 'white',
    backgroundColor: "#63b7b7"
  },
  sub_form: {
    flex:1,
    flexDirection:'row',
  },
  category_unselected: {
    flexDirection:'column',
    justifyContent: 'center',
    height: 60,
    borderBottomWidth: 0.4,
    borderBottomColor: 'white'
  },
  category_selected: {
    flexDirection:'column',
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'white',
    borderRightWidth: 0.4,
    borderRightColor: '#63b7b7'
  },
  sub_category_view: {
    flexDirection:'column',
    justifyContent: 'center',
    height: 60,
  },

});

const mapStateToProps = (state) => {
  const {api} = state;
  const { auth } = state;
  
  return {auth, api};
};

function mapDispatchToProps(dispatch) {
  return {
    setFilter: (filter) => {
        dispatch(setFilter(filter));
    },
    actions: bindActionCreators(ActionCreators, dispatch), 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
