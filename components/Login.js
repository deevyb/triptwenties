import React, { Component } from 'react';
import { View, StyleSheet, Alert, Keyboard, Text, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { Button } from 'react-native-elements';
import styles from "./LoginStyle";
import * as firebase from 'firebase';
import Main from './Main';

class Login extends Component {
	constructor(props) {
	  super(props);
	  this.state = { email: '', pass: ''};
	}

	handleLogin = () => {
		firebase.auth().signOut().then(function() {

		}).catch(function(error) {
			console.log(error.message);
		})

		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass).catch((error) => {
			var errorMessage = error.message;
			Alert.alert(
				'Login Error!',
				errorMessage,
				{text: 'Ok', onPress: () => console.log('Ok pressed.')},
			)
		})
		firebase.auth().onAuthStateChanged(function(user) {
			console.log(user);
			if (user) {
				this.props.navigation.navigate('Main');
			}
		}.bind(this))
	}

	storeEmail = text => {
		this.setState({email: text})
		//not 100% sure if text is what the input is called
	}

	storePass = text => {
		this.setState({pass: text})
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
	      <KeyboardAvoidingView style={styles.containerView} behavior="padding">

	      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
	        <View style={styles.loginScreenContainer}>
	          <View style={styles.loginFormView}>
	          <Text style={styles.logoText}>Welcome</Text>
	            <TextInput placeholder="Email" placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
	            	ref={node => {this.emailInput = node}} onChangeText={this.storeEmail}/>
	            <TextInput placeholder="Password" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true}
	            	ref={node => {this.passInput = node}} onChangeText={this.storePass}/>
	            <Button
	              buttonStyle={styles.loginButton}
	              onPress={this.handleLogin}
	              title="Login"
	            />
	            <Button
	              buttonStyle={styles.signUpButton}
	              onPress={() => navigate('SignUp')}
	              title="or Sign Up"
	              color="#3897f1"
	            />
	          </View>
	        </View>
	      </TouchableWithoutFeedback>
	      </KeyboardAvoidingView>
	    );
	}
}

export default Login; 