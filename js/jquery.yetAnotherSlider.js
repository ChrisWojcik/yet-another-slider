/**
 * Yet Another Slider Plugin
 * Copyright (c) 2013 Chris Wojcik <hello@chriswojcik.net>
 * Dual licensed under MIT and GPL.
 * @author Chris Wojcik
 * @version 1.0.0
 */

// Utility
if (typeof Object.create !== 'function') {
    Object.create = function(obj) {
        function F() {}
        F.prototype = obj;
        return new F();
    };
}

(function($, window, document, undefined) {
    "use strict";
    
    var YetAnotherSlider = {
        
        init: function(container) {
            
            this.container = container;            
            this.$container = $(container);
            this.$panels = this.$container.find('.slider-panel');
            this.$sliderNav = this.$container.find('.slider-nav')
            this.$controls = this.$sliderNav.find('button');
            this.$panelLinks = this.$sliderNav.find('a');
            
            this.panelWidth = this.$panels.eq(0).outerWidth();
            this.numPanels = this.$panels.length;
            this.currentPanel = 0;
            
            this.wrapPanels();
            this.bindEvents();
        },
        
        bindEvents: function() {
            var self = this;
            
            this.$controls.on('click.slider', function(e) {
                e.preventDefault();
                self.setCurrentPanel($(this).data('dir'));
                self.transition(self.currentPanel);
                self.manageLinks(self.currentPanel);
            });
            
            this.$panelLinks.on('click.slider', function(e) {
               e.preventDefault();
               self.currentPanel = self.$panelLinks.index(this);
               self.transition(self.currentPanel);
               self.manageLinks(self.currentPanel);
            });
        },
        
        // Dynamicly sized container
        wrapPanels: function() {
            this.$panels.wrapAll('<div class="slider-panel-wrap"></div>');
            this.$panelWrap = $('.slider-panel-wrap')
            this.$panelWrap.css('width', this.panelWidth * this.numPanels);
        },
        
        transition: function(position) {
            this.$panelWrap.animate({ 'left':  -(position * this.panelWidth) });
        },
        
        setCurrentPanel: function(direction) {
            var position = this.currentPanel;
            
            position = (direction === 'next') ? position += 1 : position -= 1;
            
            this.currentPanel = ( position < 0 ) ? 
                this.numPanels - 1 : position % this.numPanels;           
        },
        
        manageLinks: function(position) {
            this.$panelLinks.removeClass('current');
            this.$panelLinks.eq(position).addClass('current');
        }
    };
    
    $.fn.yetAnotherSlider = function() {
        return this.each(function() {
            var slider = Object.create(YetAnotherSlider);
            slider.init(this);
        });
    };
    
})(jQuery, window, document);