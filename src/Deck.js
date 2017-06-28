import React, { Component } from 'react';
import {
  View,
  Animated,
  PanResponder,
  Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width

class Deck extends Component {
  constructor(props) {
    super(props);

    const position = new Animated.ValueXY(); // no default position

    const panResponder = PanResponder.create({
      // called anytime user presses the screen
      onStartShouldSetPanResponder: () => true,
      // called anytime user drags across the screen
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy }) // manually update position
      },
      onPanResponderRelease: () => {}
    });

    this.state = { panResponder, position };
  }

  getCardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(),
      transform: [{ rotate: rotate }]
    }
  }

  renderCards() {
    return this.props.data.map((item, index) => {
      if (index === 0) {
        return (
          <Animated.View
            key={item.id}
            style={this.getCardStyle()}
            {...this.state.panResponder.panHandlers}
          >
            {this.props.renderCard(item)}
          </Animated.View>
        );
      }

      return this.props.renderCard(item);
    });
  }

  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  }
}

export default Deck;
