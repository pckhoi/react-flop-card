import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import RotateCard from './rotate-card';

export default class FlipCard extends Component {
  componentWillMount() {
    if (this.props.flipped) {
      this.initialDegree = 180;
      this.targetDegree = 180;
    } else {
      this.initialDegree = 0;
      this.targetDegree = 0;
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.flipped) {
      this.initialDegree = 0;
      this.targetDegree = 180;
    } else {
      this.initialDegree = 180;
      this.targetDegree = 0;
    }
  }

  shouldComponentUpdate(nextProps) {
    for (let key in nextProps) {
      if (nextProps.hasOwnProperty(key)) {
        if (nextProps[key] !== this.props[key]) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    return (
      <Motion defaultStyle={{ deg: this.initialDegree }} style={{ deg: spring(this.targetDegree) }}>
        {interpolatingStyle => <RotateCard degree={interpolatingStyle.deg} {...this.props} />}
      </Motion>
    );
  }
}

FlipCard.propTypes = {
  flipped: PropTypes.bool
};
