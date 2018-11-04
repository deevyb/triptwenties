import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Image, Dimensions, SafeAreaView, StyleSheet, ScrollView, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import { RkButton } from 'react-native-ui-kitten';
import t from 'tcomb-form-native';


export default class App extends Component {
  render() {
    return(
      <Balances />
    );
  }
}

var chargeList = [];
var outgoingCharges = {};

const Form = t.form.Form;

const charge = t.struct({
  from: t.String,
  to: t.String,
  description: t.String,
  amount: t.Number
})

class Charges {
  constructor(desc, charger, to, amount) {
    this.desc = desc;
    this.charger = charger;
    this.to = to;
    this.amount = amount;
  }

  desc() { return this.desc; }
  charger() { return this.charger; }
  to() { return this.to; }
  amount() { return this.amount; }
}

class Balances extends Component {
  constructor(props) {
    super(props);
    this.state = { 'chargesPerPerson': '' };
  }

  calculate() {
    for (let i = 0; i < chargeList.length; i++) {
      let curr = chargeList[i];
      let chargr = curr.charger;
      let value = curr.amount;
      let index = curr.to;

      if (index in Object.keys(outgoingCharges)) {
        if (chargr in Object.keys(outgoingCharges[index])) {
          outgoingCharges[index][chargr] += value;
        } else {
          outgoingCharges[index][chargr] = value;
        }
      } else {
        outgoingCharges[index] = {[chargr]: value};
      }
    }

    // let findSum = (arr) => arr.reduce((a,b) => a + b, 0);
    
    this.setState( { chargesPerPerson: JSON.stringify(outgoingCharges) } );
  }

  processInput() {
    const value = this._form.getValue();
    let charger = value.from;
    let charged = value.to;
    let description = value.description;
    let amount = value.amount;

    chargeList.push(new Charges(description, charger, charged, amount));
  }

  render() {
    return(
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <Form ref={c => this._form = c} type={charge}/>
        
        <RkButton onPress={() => this.processInput()} style={{backgroundColor: 'darkblue', borderRadius: 10}} contentStyle={{color: 'white'}}>
          Add Charges
        </RkButton>

        <RkButton onPress={() => this.calculate()} style={{backgroundColor: 'mediumvioletred', borderRadius: 10, marginTop: 10}} contentStyle={{color: 'white'}}>
          Balance!
        </RkButton>

        <Text> {"\n"} {this.state.chargesPerPerson}</Text>

     </SafeAreaView>
    );
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

AppRegistry.registerComponent('TT', () => App);