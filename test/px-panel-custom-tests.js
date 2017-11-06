document.addEventListener("WebComponentsReady", function () {
  runCustomTests();
});

function runCustomTests() {

  describe('Basic tests for px-panel', function() {
    var panelFixture, panel, container;

    beforeEach(function() {
      panelFixture = fixture('panelFixture'),
      panel = panelFixture.querySelector('#panel'),
      container = panel.querySelector('.container');
      // disable animations to avoid need for setTimeouts
      container.style.transition = "none";
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
        expect(width).to.equal(60);
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
}
