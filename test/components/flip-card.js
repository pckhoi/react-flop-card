import 'should';
import React from 'react';
import { unmountComponentAtNode, findDOMNode, render } from 'react-dom';
import {
  renderIntoDocument, findRenderedComponentWithType
} from 'react-dom/test-utils';
import { spy, stub } from 'sinon';

import 'polyfill';
import FlipCard from 'components/flip-card';
import RotateCard from 'components/rotate-card';

describe('FlipCard component', function () {
  let element;

  afterEach(function () {
    unmountComponentAtNode(findDOMNode(element).parentNode);
  });

  it('should stay flipped', function (callback) {
    element = renderIntoDocument(<FlipCard flipped={ true }/>);
    findRenderedComponentWithType(element, RotateCard).props.degree.should.equal(180);
    setTimeout(() => {
      findRenderedComponentWithType(element, RotateCard).props.degree.should.equal(180);
      callback();
    }, 50);
  });

  it('should stay unflipped', function (callback) {
    element = renderIntoDocument(<FlipCard flipped={ false }/>);
    findRenderedComponentWithType(element, RotateCard).props.degree.should.equal(0);
    setTimeout(() => {
      findRenderedComponentWithType(element, RotateCard).props.degree.should.equal(0);
      callback();
    }, 50);
  });

  it('should animate when flipped', function (callback) {
    let rootEl = document.createElement('div');
    element = render(<FlipCard flipped={ false }/>, rootEl);
    findRenderedComponentWithType(element, RotateCard).props.degree.should.equal(0);
    element = render(<FlipCard flipped={ true }/>, rootEl);
    setTimeout(() => {
      findRenderedComponentWithType(element, RotateCard).props.degree.should.not.equal(0);
      callback();
    }, 50);
  });

  it('should animate when unflipped', function (callback) {
    let rootEl = document.createElement('div');
    element = render(<FlipCard flipped={ true }/>, rootEl);
    findRenderedComponentWithType(element, RotateCard).props.degree.should.equal(180);
    element = render(<FlipCard flipped={ false }/>, rootEl);
    setTimeout(() => {
      findRenderedComponentWithType(element, RotateCard).props.degree.should.not.equal(180);
      callback();
    }, 50);
  });

  it('should not re-render when prop does not change', function () {
    let rootEl = document.createElement('div');
    element = render(<FlipCard flipped={ true }/>, rootEl);
    element.render = spy();
    element = render(<FlipCard flipped={ true }/>, rootEl);
    element.render.called.should.be.false();
  });

  it('should re-render when prop changes', function () {
    let rootEl = document.createElement('div');
    element = render(<FlipCard flipped={ true }/>, rootEl);
    element.render = stub().returns(<div/>);
    element = render(<FlipCard flipped={ false }/>, rootEl);
    element.render.called.should.be.true();
  });
});
