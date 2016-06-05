import React, { Component } from 'react';

import FlipCard from 'components/flip-card';


export default class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flippedKey: null
    };
    this.cards = Array.apply(null, {length: 64}).map((val, ind) => ({
      key: String(ind),
      style: {
        front: this.getFrontStyle(ind),
        back: backStyle,
        wrapper: wrapperStyle
      },
      frontChild: (<noscript/>),
      backChild: (<p style={ letterStyle }>{ randomLetter() }</p>),
      onMouseOver: () => { this.setState({ flippedKey: String(ind) }); },
      onMouseOut: () => { this.setState({ flippedKey: null }); }
    }));
  }

  getFrontStyle(ind) {
    const y = (ind - ind % 8) / 8 * -104;
    const x = ind % 8 * -104 -300;
    const backgroundStyle = `url("img/food-dinner-lemon-rice.jpg") ${x}px ${y}px/auto`;
    return {
      background: backgroundStyle,
      borderRadius: '20px'
    };
  }

  render() {
    return (
      <div style={ containerStyle }>
        { this.cards.map(({
          key, frontChild, backChild, onMouseOver, onMouseOut, style
        }) => (

          <FlipCard
            key={ key }
            flipped={ this.state.flippedKey === key }
            onMouseOut={ onMouseOut } onMouseOver={ onMouseOver }
            frontChild={ frontChild } backChild={ backChild }
            width={ 100 } height={ 100 } style={ style }/>

        )) }
      </div>
    );
  }
}

const backStyle = {
  backgroundColor: 'green',
  borderRadius: '20px'
};

const letterStyle = {
  color: 'white',
  fontSize: '40px',
  margin: '28px 0',
  textAlign: 'center',
  fontFamily: 'sans-serif'
};

const containerStyle = {
  fontSize: 0,
  width: '832px',
  margin: '0 auto'
};

const wrapperStyle = {
  display: 'inline-block',
  margin: '2px'
};

function randomLetter() {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return possible.charAt(
    Math.floor(Math.random() * possible.length)
  );
}
