import React, { Component } from 'react';
import { View,
          Text, 
          StyleSheet, 
          TouchableOpacity,
          LayoutAnimation,
          Animated,
          UIManager,
          Platform,
          PanResponder } from 'react-native';

export default class TextStudy extends Component {
  constructor(props) {
    super(props);
    const Question = ' What is chiefly responsible <> for the  increase in the average length <> of life in the USA <>  during the last fifty years?';
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    } 
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder : ()=> true,
      onPanResponderMove : (event, gesture)=>{
        //position.setValue({x: gesture.dx, y : gesture.dy})
        //console.log(gesture.dx, gesture.dy )
        //console.log(gesture.dx, gesture.dy , )
        const postionX = (gesture.x0+ gesture.dx);
        const postionY = (gesture.y0+ gesture.dy);
        console.log(postionX,postionY);
        //console.log( gesture);
    },
      onPanResponderRelease : (event, gesture)=>{
        //position.setValue({x: 0, y : 0})
        console.log(gesture.dx, gesture.dy,(gesture.x0+ gesture.dx),(gesture.y0+ gesture.dy));
        const postionX = (gesture.x0+ gesture.dx);
        const postionY = (gesture.y0+ gesture.dy);
         const coOrdinate = this.state.blanckCoordinate[0];
        if(postionX>=coOrdinate.hx && postionX <=coOrdinate.tx &&
            postionY>=coOrdinate.hy && postionY<=coOrdinate.ty
          ){
            console.log('you are in Right position',postionX,postionY, coOrdinate);
          }else{
            console.log('not in rite position',postionX,postionY, coOrdinate);
          }
        //console.log(this.state.blanckCoordinate);
    }
    })
    this.state = {
      measurements : {},
      quesArray : Question.split(' '),
      panResponder,
      blanckCoordinate : []
    };
  }
//   onLayout = (event) => {
//     console.log('on layout:')
//     const {
//       x,
//       y,
//       width,
//       height,
//     } = event.nativeEvent.layout;
//     // this.marker.measure((x, y, width, height, pageX, pageY) => {
//     //     console.log(x, y, width, height, pageX, pageY);
//     // })
// }

  onUpdatePostionState =(hx , hy , tx, ty)=>{
    this.setState((prevState)=>{
      const coordinates = prevState.blanckCoordinate.concat({hx,hy,tx,ty});
      return {
        ...prevState,
        blanckCoordinate : coordinates

      }
    })
  }
  
  onRemove = (id)=>{
    this.setState((prevState)=>{
      const updatedArray = prevState.quesArray.map((data,index)=>{
        if(id===index){
          return ' _____ '
        }
        return data
      })
      return{
        ...prevState,
        quesArray : updatedArray,
        blanckCoordinate  : []
        
      }
    })
  }

  componentDidUpdate (){
    LayoutAnimation.configureNext({
      ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 250
    })
  }

  render() {
    return (
      <View style={styles.container}>

      <View style={styles.questionArea}>
        {this.state.quesArray.map((data,index)=>{
          if (data === '<>'){
            const mandata = ' Removing Text '
            return (
              <RemoveText 
              onLayout={this.onLayout}
              key={index}
              text={mandata}
              index={index}
              onRemove={this.onRemove}
              onUpdateState = {this.onUpdatePostionState}
              clearArray = {this.state.blanckCoordinate}
              />
            )
          }
          return (
          <Text 
            key={index}
            style={styles.questionText}
            >
            {data+' '} 
            </Text>)
        })}
      </View>
      <View style={styles.choiceArea}>
        <View style={styles.choiceStyle}
        {...this.state.panResponder.panHandlers}
        >
          <Text style={styles.choiceText}>
           Option 1
          </Text>
        </View>
        <View style={styles.choiceStyle}>
          <Text style={styles.choiceText}>
           Option 2
          </Text>
        </View>
        <View style={styles.choiceStyle}>
          <Text style={styles.choiceText}>
           Option 3
          </Text>
        </View>
        <View style={styles.choiceStyle}>
          <Text style={styles.choiceText}>
           Option 4
          </Text>
        </View>
      </View>
      </View>
    );
  }
}



class RemoveText extends Component{

  constructor(props){
    super(props);
    
  }

  handleLayoutChange = ()=>{

    if(this.removeComp){
      this.removeComp.measure( (fx, fy, width, height, px, py) => {

        this.props.onUpdateState(px,py,(px+width),(py+height));
        console.log('Component width is: ' + width)
        console.log('Component height is: ' + height)
        console.log('X offset to page: ' + px)
        console.log('Y offset to page: ' + py)
  
      })
    }
    

  }
  render(){
    const {text, onRemove, index} = this.props;
    return (
      <TouchableOpacity
      onPress={()=> onRemove(index)}
      style={styles.removedView}
      onLayout={(event)=> this.handleLayoutChange(event)}
      ref={view=> {
          //console.log(this.props.clearArray);
          if(this.props.clearArray.length ===0){
            return  this.removeComp = view;
          }
      }}>
        <Text style={styles.questionText}>{text+' '}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    container  : {
      flex : 1,
    },
    questionArea : {
        marginHorizontal: 10,
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    removedView : {
      backgroundColor : '#fab1a0',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: '#d63031'
    },
    questionText : {
      fontSize : 20,
      color : '#FC427B',
      marginVertical : 2
    },
    choiceArea : {
      marginHorizontal : 15,
      marginVertical : 20,
      flexDirection : 'column'
    },
    choiceStyle : {
      alignItems : 'stretch',
      backgroundColor  : '#F8EFBA',
      borderColor : '#EAB543',
      borderWidth : 1 ,
      marginVertical :  5,
      padding: 5,
    },
    choiceText : {
      fontSize  : 20
    }
})
