import React, { Component } from 'react';
import { View, StyleSheet, Animated, PanResponder } from 'react-native';

export default class BlackBox extends Component {
  constructor(props) {
    super(props);
    const position = new Animated.ValueXY();
    const panResponder = new PanResponder.create({
        onStartShouldSetPanResponder : ()=> true,
        onPanResponderMove : (event, gesture)=>{
            position.setValue({x: gesture.dx, y : gesture.dy})
        },
        onPanResponderRelease : ()=>{
            position.setValue({x: 0, y : 0})
        }
    })
    this.state = {
        panResponder,
        position
    };
  }

  render() {
    return (
        <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.state.position.getLayout()}
        >
            <View  style={styles.boxstyle}/>
        </Animated.View>
      
    );
  }
}

const styles = StyleSheet.create({
    boxstyle : {
        height : 150,
        width : 150,
        borderRadius: 5,
        backgroundColor : '#0984e3'
    }
})