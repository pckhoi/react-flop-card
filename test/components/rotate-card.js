import 'should';
import React from 'react';
import { unmountComponentAtNode, findDOMNode, render } from 'react-dom';
import {
  renderIntoDocument, findRenderedDOMComponentWithTag, Simulate
} from 'react-addons-test-utils';
import { spy, stub } from 'sinon';

import 'polyfill';
import RotateCard from 'components/rotate-card';


describe('RotateCard component', function () {
  let element;

  afterEach(function () {
    unmountComponentAtNode(findDOMNode(element).parentNode);
  });

  it('should render frontChild', function () {
    element = renderIntoDocument(<RotateCard frontChild={ <p>a b c</p> }/>);
    findRenderedDOMComponentWithTag(element, 'p').textContent.should.equal('a b c');
  });

  it('should render backChild', function () {
    element = renderIntoDocument(<RotateCard backChild={ <p>d e f</p> }/>);
    findRenderedDOMComponentWithTag(element, 'p').textContent.should.equal('d e f');
  });

  it('should trigger onClick', function () {
    const callback = spy();
    element = renderIntoDocument(<RotateCard onClick={ callback }/>);
    Simulate.click(findDOMNode(element));
    callback.called.should.be.true();
  });

  it('should trigger onMouseOver', function () {
    const callback = spy();
    element = renderIntoDocument(<RotateCard onMouseOver={ callback }/>);
    Simulate.mouseOver(findDOMNode(element));
    callback.called.should.be.true();
  });

  it('should trigger onMouseOut', function () {
    const callback = spy();
    element = renderIntoDocument(<RotateCard onMouseOut={ callback }/>);
    Simulate.mouseOut(findDOMNode(element));
    callback.called.should.be.true();
  });

  it('should not re-render when prop does not change', function () {
    let rootEl = document.createElement('div');
    element = render(<RotateCard/>, rootEl);
    element.render = spy();
    element = render(<RotateCard/>, rootEl);
    element.render.called.should.be.false();
  });

  it('should re-render when prop changes', function () {
    let rootEl = document.createElement('div');
    element = render(<RotateCard/>, rootEl);
    element.render = stub().returns(<div/>);
    element = render(<RotateCard frontChild={ <p/> }/>, rootEl);
    element.render.called.should.be.true();
  });
});
