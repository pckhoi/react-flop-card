import React, { Component, PropTypes } from 'react';


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

  render() {
    const { front, back, wrapper } = this.props.style;
    const {
      frontChild, backChild, width, height, degree, onClick,
      onMouseOver, onMouseOut
    } = this.props;
    const dimensionStyle = {
      width: `${width}px`,
      height: `${height}px`
    };
    const _frontStyle = Object.assign({},
      frontStyle, front, dimensionStyle,
      {
        transform: `rotateX(0deg) rotateY(${degree}deg)`
      }
    );
    const _backStyle = Object.assign({},
      backStyle, back, dimensionStyle,
      {
        transform: `rotateX(0deg) rotateY(${180 + degree}deg)`
      }
    );
    const _wrapperStyle = Object.assign({},
      wrapperStyle, wrapper, dimensionStyle
    );

    return (
      <div style={ _wrapperStyle } onClick={ onClick }
        onMouseOver={ onMouseOver } onMouseOut={ onMouseOut }>
        <div style={ _frontStyle }>
          { frontChild }
        </div>
        <div style={ _backStyle }>
          { backChild }
        </div>
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
  width: PropTypes.number,
  height: PropTypes.number,
  degree: PropTypes.number,
  onClick: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseOver: PropTypes.func
};

RotateCard.defaultProps = {
  width: 100,
  height: 100,
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
  backfaceVisibility: 'hidden'
};

const backStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  transformStyle: 'preserve-3d',
  backfaceVisibility: 'hidden'
};
