import React, { Component } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import t from 'tcomb-form-native';
import * as firebase from 'firebase';

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
	username: t.String,
	password: t.String,
	terms: t.Boolean
});

class SignUp extends Component {

	handleSubmit = () => {
		const value = this._form.getValue();
		if (!this._form.validate().isValid()) {
			return;
		}
		
		firebase.auth().signOut().then(function() {

		}).catch(function(error) {
			console.log(error.message);
		})

		firebase.auth().createUserWithEmailAndPassword(value.email, value.password).catch(function(error) {
			var errorMessage = error.message;
			Alert.alert(
				'Error!',
				errorMessage,
				{text: 'Ok', onPress: () => console.log('Ok pressed.')},
			
			)
		})
		firebase.auth().onAuthStateChanged(function(user){
			if (user) {
				firebase.database().ref('users/'+user.uid).set({
					username: value.username,
				})
				this.props.navigation.goBack();
			} else {
				console.log("what");
			}
		}.bind(this));
	}

	render() {
		return (
			<View style={styles.container}>
				<Form 
					ref={c => this._form = c}
					type={User}
					options={options}
				/>
				<Button
					title= "Sign Up!"
					onPress={this.handleSubmit}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
		backgroundColor: '#ffffff',
	},
});

export default SignUp; 