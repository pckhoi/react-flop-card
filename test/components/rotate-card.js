import 'should';
import React from 'react';
import { unmountComponentAtNode, findDOMNode, render } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
  findRenderedDOMComponentWithClass,
  Simulate
} from 'react-dom/test-utils';
import { spy, stub } from 'sinon';

import 'polyfill';
import RotateCard from 'components/rotate-card';

describe('RotateCard component', function() {
  let element;

  afterEach(function() {
    unmountComponentAtNode(findDOMNode(element).parentNode);
  });

  it('should render frontChild', function() {
    element = renderIntoDocument(<RotateCard frontChild={<p>a b c</p>} />);
    findRenderedDOMComponentWithTag(element, 'p').textContent.should.equal('a b c');
  });

  it('should render backChild', function() {
    element = renderIntoDocument(<RotateCard backChild={<p>d e f</p>} />);
    findRenderedDOMComponentWithTag(element, 'p').textContent.should.equal('d e f');
  });

  it('should trigger onClick', function() {
    const callback = spy();
    element = renderIntoDocument(<RotateCard onClick={callback} />);
    Simulate.click(findDOMNode(element));
    callback.called.should.be.true();
  });

  it('should trigger onMouseOver', function() {
    const callback = spy();
    element = renderIntoDocument(<RotateCard onMouseOver={callback} />);
    Simulate.mouseOver(findDOMNode(element));
    callback.called.should.be.true();
  });

  it('should trigger onMouseOut', function() {
    const callback = spy();
    element = renderIntoDocument(<RotateCard onMouseOut={callback} />);
    Simulate.mouseOut(findDOMNode(element));
    callback.called.should.be.true();
  });

  it('should not re-render when prop does not change', function() {
    let rootEl = document.createElement('div');
    element = render(<RotateCard />, rootEl);
    element.render = spy();
    element = render(<RotateCard />, rootEl);
    element.render.called.should.be.false();
  });

  it('should re-render when prop changes', function() {
    let rootEl = document.createElement('div');
    element = render(<RotateCard />, rootEl);
    element.render = stub().returns(<div />);
    element = render(<RotateCard frontChild={<p />} />, rootEl);
    element.render.called.should.be.true();
  });

  it('should pass width and height as px if prop is number', function() {
    element = renderIntoDocument(
      <RotateCard
        frontChild={<div className="frontChild" />}
        backChild={<div className="backChild" />}
        width={100}
        height={100}
      />
    );
    const wrapper = findDOMNode(element);
    wrapper.style.width.should.equal('100px');
    wrapper.style.height.should.equal('100px');

    const frontChildWrapper = findRenderedDOMComponentWithClass(element, 'frontChild')
      .parentElement;
    frontChildWrapper.style.width.should.equal('100px');
    frontChildWrapper.style.height.should.equal('100px');

    const backChildWrapper = findRenderedDOMComponentWithClass(element, 'backChild').parentElement;
    backChildWrapper.style.width.should.equal('100px');
    backChildWrapper.style.height.should.equal('100px');
  });

  it('should pass width and height as is if prop is string', function() {
    element = renderIntoDocument(
      <RotateCard
        frontChild={<div className="frontChild" />}
        backChild={<div className="backChild" />}
        width={'100%'}
        height={'100%'}
      />
    );
    const wrapper = findDOMNode(element);
    wrapper.style.width.should.equal('100%');
    wrapper.style.height.should.equal('100%');

    const frontChildWrapper = findRenderedDOMComponentWithClass(element, 'frontChild')
      .parentElement;
    frontChildWrapper.style.width.should.equal('100%');
    frontChildWrapper.style.height.should.equal('100%');

    const backChildWrapper = findRenderedDOMComponentWithClass(element, 'backChild').parentElement;
    backChildWrapper.style.width.should.equal('100%');
    backChildWrapper.style.height.should.equal('100%');
  });

  it('should not pass width and height if props are empty', function() {
    element = renderIntoDocument(
      <RotateCard
        frontChild={<div className="frontChild" />}
        backChild={<div className="backChild" />}
      />
    );
    const wrapper = findDOMNode(element);
    wrapper.style.width.should.equal('');
    wrapper.style.height.should.equal('');

    const frontChildWrapper = findRenderedDOMComponentWithClass(element, 'frontChild')
      .parentElement;
    frontChildWrapper.style.width.should.equal('');
    frontChildWrapper.style.height.should.equal('');

    const backChildWrapper = findRenderedDOMComponentWithClass(element, 'backChild').parentElement;
    backChildWrapper.style.width.should.equal('');
    backChildWrapper.style.height.should.equal('');
  });
});
