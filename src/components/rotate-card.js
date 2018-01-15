import React, { Component } from 'react';
import PropTypes from 'prop-types';

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export default class RotateCard extends Component {
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

  calculateDimensionStyle() {
    let { width, height } = this.props;
    if (isNumeric(width)) {
      width = `${width}px`;
    }
    if (isNumeric(height)) {
      height = `${height}px`;
    }
    const dimensionStyle = {};
    if (width !== null) {
      dimensionStyle['width'] = width;
    }
    if (height !== null) {
      dimensionStyle['height'] = height;
    }
    return dimensionStyle;
  }

  render() {
    const { front, back, wrapper } = this.props.style;
    const { frontChild, backChild, degree, onClick, onMouseOver, onMouseOut } = this.props;
    const dimensionStyle = this.calculateDimensionStyle();
    const _frontStyle = Object.assign({}, frontStyle, front, dimensionStyle, {
      transform: `rotateX(0deg) rotateY(${degree}deg)`
    });
    const _backStyle = Object.assign({}, backStyle, back, dimensionStyle, {
      transform: `rotateX(0deg) rotateY(${180 + degree}deg)`
    });
    const _wrapperStyle = Object.assign({}, wrapperStyle, wrapper, dimensionStyle);

    return (
      <div
        style={_wrapperStyle}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}>
        <div style={_frontStyle}>{frontChild}</div>
        <div style={_backStyle}>{backChild}</div>
      </div>
    );
  }
}

RotateCard.propTypes = {
  style: PropTypes.shape({
    front: PropTypes.object,
    back: PropTypes.object,
    wrapper: PropTypes.wrapper
  }),
  frontChild: PropTypes.element,
  backChild: PropTypes.element,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  degree: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func
};

RotateCard.defaultProps = {
  degree: 0,
  style: {}
};

const wrapperStyle = {
  perspective: '600px',
  position: 'relative'
};

const frontStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  transformStyle: 'preserve-3d',
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden'
};

const backStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  transformStyle: 'preserve-3d',
  WebkitBackfaceVisibility: 'hidden',
  backfaceVisibility: 'hidden'
};
