import React from 'react';
import { Text, View } from 'react-native';

// Create Component

// Header defines the output of the header.js component
const Header = (props) => {
  // gets the styles desired from the "styles" const
  const { textStyle, viewStyle } = styles;

  // returns the actual JSX output defined by the styles
  //  and content
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>

  );
};

// styles defines how the content appears
//
const styles = {
  viewStyle: {
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20
  }
};

// Make component available to other parts of the app for use
export { Header };
