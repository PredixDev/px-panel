/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

describe('Basic tests for px-panel', function() {
  var panelFixture, panel, container;

  beforeEach(function(done) {
    panelFixture = fixture('panelFixture');
    flush(()=>{
      panel = panelFixture.querySelector('#panel');
      container = Polymer.dom(panel.root).querySelector('.container');
      // disable animations to avoid need for setTimeouts
      container.style.transition = "none";
      done();
    });
  });

  it('has default settings', function(){
    expect(panel.opened).to.be.false;
    expect(panel.fixed).to.be.false;
    expect(panel.persistent).to.be.false;
    expect(panel.floating).to.be.false;
    expect(panel.minimizable).to.be.false;
  });
  it('is hidden by default', function(done) {
    flush(function() {
      var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width')),
          height = parseFloat(window.getComputedStyle(container).getPropertyValue('height'));
      expect(width).to.equal(0);
      expect(height).to.be.closeTo(300,1);
      done();
    });
  });
  it('expands with .open()', function(done){
    panel.open();
    expect(panel.opened).to.be.true;
    flush(function() {
      var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width')),
          height = parseFloat(window.getComputedStyle(container).getPropertyValue('height'));
      expect(width).to.be.closeTo(320,2);
      expect(height).to.be.closeTo(300,1);
      done();
    });
  });
  it('expands with opened property', function(done){
    panel.opened = true;
    flush(function() {
      var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width')),
          height = parseFloat(window.getComputedStyle(container).getPropertyValue('height'));
      expect(width).to.be.closeTo(320,2);
      expect(height).to.be.closeTo(300,1);
      done();
    });
  });
  it('works as expected with persistent', function(){
    panel.persistent = true;
    expect(panel.opened).to.be.true;
    panel.close();
    expect(panel.opened).to.be.true;
  });
  it('appears when minimized', function(done){
    panel.minimizable = true;
    flush(function() {
      var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width')),
          height = parseFloat(window.getComputedStyle(container).getPropertyValue('height'));
      expect(width).to.be.closeTo(60,1);
      expect(height).to.be.closeTo(300,1);
      done();
    });
  });
  it('works as expected with fixed', function(done) {
    panel.fixed = true;
    panel.open();
    flush(function() {
      var width = parseFloat(window.getComputedStyle(container).getPropertyValue('width')),
          height = parseFloat(window.getComputedStyle(container).getPropertyValue('height')),
          docHeight = document.documentElement.clientHeight,
          docWidth = document.documentElement.clientWidth;
      if(docWidth < 600) {
        expect(width).to.equal(docWidth);
      }
      else {
        expect(width).to.be.closeTo(320,2);
      }
      expect(height).to.equal(docHeight);
      done();
    });
  });


});
