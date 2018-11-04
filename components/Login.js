import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import t from 'tcomb-form-native';
import { RkButton } from 'react-native-ui-kitten';
import * as firebase from 'firebase';
import Main from './Main';

const Form = t.form.Form;

var options = {
	fields: {
		password: {
			secureTextEntry: true,
		}
	}
}

const User = t.struct({
	email: t.String,
	password: t.String,
});

class Login extends Component {

	handleLogin = () => {
		const formValues = this._form.getValue();	
		if (!this._form.validate().isValid()) {
			return;
		}

		firebase.auth().signOut().then(function() {

		}).catch(function(error) {
			console.log(error.message);
		})

		firebase.auth().signInWithEmailAndPassword(formValues.email, formValues.password).catch((error) => {
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

	render() {
		const { navigate } = this.props.navigation;
		return (
				<View style={styles.container}>
					<Form 
						ref= {c => this._form = c}
						type={User}
						options={options}
					/>

					<View style={styles.buttons}>
						<RkButton onPress={this.handleLogin} style={{backgroundColor: 'darkblue'}} contentStyle={{color: 'white'}}>
							Login!
						</RkButton>
						<RkButton onPress={() => navigate('SignUp')} style={{backgroundColor: 'darkred'}} contentStyle={{color: 'white'}}>
							Sign Up!
						</RkButton>
					</View>
				</View>
			
		)
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
		backgroundColor: '#ffffff',
	},
	buttons: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'stretch'
	}
});

export default Login; 