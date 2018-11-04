// Import components
import React, { Component } from 'react';
import * as firebase from 'firebase';
import Login from './components/Login';
import SignUp  from './components/SignUp';
import Main from './components/Main';
import Balance from './components/Balance';
import ToDoNav from './components/ToDoNav';
import Groups from './components/Groups';

import { createStackNavigator } from 'react-navigation';

export class FirebaseManager extends Component {

  constructor() {
    super();
    // Temporary state for debugging
    this.state = {
      loading: false,
    };
  }

  // App component mounts, checks whether user has been logged
  // in before, if not, send to log in screen
  componentDidMount() {
    var config = {
      apiKey: "AIzaSyDOWTgWTVtPyslbMQf2HOdvEYzo52481Vw",
      authDomain: "roommater-f66ed.firebaseapp.com",
      databaseURL: "https://roommater-f66ed.firebaseio.com",
      projectId: "roommater-f66ed",
      storageBucket: "roommater-f66ed.appspot.com",
      messagingSenderId: "917021886044"
    };
    firebase.initializeApp(config);
  }

  // componentWillUnmount() {
  //   this.authSubscription();
  // }

  render() {
    if (this.state.loading) return null;

    // if (this.state.user) return <Main />;
    return (
      <Login navigation={this.props.navigation} />
    )
  }
}

const App = createStackNavigator({
  FirebaseManager: FirebaseManager,
  Login: Login,
  SignUp: SignUp,
  Groups: Groups,
  Main: ToDoNav
},
{
  headerMode: 'none',
  initialRouteName: 'FirebaseManager',
  headerBackTitleVisible: false
})

export default App;
