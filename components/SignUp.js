import React, { Component } from 'react';
import { Keyboard, Text, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView, View, StyleSheet, Button, Alert } from 'react-native';
import t from 'tcomb-form-native';
import { RkCard } from 'react-native-ui-kitten';
import { withNavigation } from 'react-navigation';
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
			return;
		})
		firebase.auth().onAuthStateChanged(function(user){
			if (user) {
				firebase.database().ref('users/'+user.uid).set({
					username: value.username,
				})
				this.props.navigation.navigate('Groups');
			} else {
				this.props.navigation.navigate('Groups');
			}
		}.bind(this));
	}

	render() {
		return (
			<View flex style={{justifyContent: 'center', alignItems: 'stretch'}}>
			<RkCard rkType='shadowed' style={{marginLeft: 30, marginRight: 30}} >
				<View rkCardContent style={styles.container}>
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
			</RkCard>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		marginTop: 50,
		padding: 20,
	},
});

export default withNavigation(SignUp); 