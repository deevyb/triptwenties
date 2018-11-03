import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Image, Dimensions, SafeAreaView, StyleSheet, ScrollView, Button } from 'react-native';


class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = { paying_person: 'person1', amount_owed: 0 };
  }

  calculate() {
    let dict = { 'person1': [1,2,3], 'person2': [4,5,6] };
    let person1 = dict['person1'];
    let person2 = dict['person2'];

    let find_sum = (arr) => arr.reduce((a,b) => a + b, 0);
    let person1_total = find_sum(person1);
    let person2_total = find_sum(person2);
    let difference = person1_total - person2_total;
    
    let person1_owes = true;
    let balanced = false;

    if (difference > 0) {
      person1_owes = false;
    } else if (difference == 0) {
      balanced = true;
    }

    if (person1_owes == false) {
      this.setState( {paying_person: 'person2'} );
    }
    this.setState( {amount_owed: Math.abs(difference)} );
  }

  render() {
    return(
      <SafeAreaView>
        <Button
          onPress={() => this.calculate()}
          title="Find Balance!"
          color="#841584"
        />
        <Text> { this.state.paying_person } pays ${this.state.amount_owed}</Text>
     </SafeAreaView>
    );
  }
}

export default class App extends Component {
  render() {
    return(
      <Balances/>
    )
  }
}

const styles = StyleSheet.create({
 MainContainer: {
   flex: 1,
   margin: 10
   
 },
 TextStyle:{
  fontSize : 22,
  textAlign: 'center'
 }
});

AppRegistry.registerComponent('TripTwenties', () => App);