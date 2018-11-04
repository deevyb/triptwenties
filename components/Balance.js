import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View, Image, KeyboardAvoidingView, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';


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
      <SafeAreaView style={styles.MainContainer}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.headerText}>Money Management</Text>
        <Form ref={c => this._form = c} type={charge}/>
        
        <Button
          title='Add Charge'
          onPress={() => this.processInput()}
          buttonStyle={styles.buttonBlue}
        />

        <Button
          title='Balance Charges!'
          onPress={() => this.calculate()}
          buttonStyle={styles.buttonRed}
        />

        <Text> {"\n"} {this.state.chargesPerPerson}</Text>
        <View style={{ height: 60 }} />
      </KeyboardAvoidingView>
     </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 20
  },
  TextStyle: {
    fontSize : 22,
    textAlign: 'center'
  },
  headerText: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonBlue: {
    backgroundColor: 'darkblue',
    borderRadius: 5,
    height: 45
  },
  buttonRed: {
    backgroundColor: 'mediumvioletred',
    borderRadius: 5,
    height: 45,
    marginTop: 10
  }
});

AppRegistry.registerComponent('TT', () => App);