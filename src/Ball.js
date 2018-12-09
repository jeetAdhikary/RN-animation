import React, { Component } from 'react';
import { View, StyleSheet, Animated} from 'react-native';

export default class Ball extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
      this.position = new Animated.ValueXY(0,0);
      Animated.spring(this.position, {
          toValue : {x : 100, y : 200}
      }).start();
  }
  render() {
    return (
        <Animated.View style={this.position.getLayout()}>
            <View  style={styles.ball}/>
        </Animated.View>
      
    );
  }
}

const styles = StyleSheet.create({
    ball : {
        backgroundColor : 'black',
        height : 80,
        width : 80,
        borderRadius: 50,

    }
})