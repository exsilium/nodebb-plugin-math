"use strict";

/* global document $ config renderMathInElement */

$(document).ready(function() {
  // Add the $ composer button
  var bbMath = {};
  
  $(window).on('action:topic.loaded', function() {
    if(config.math.clientDebug === 'on') {
      console.log("nodebb-plugin-math: client.js - action:topic.loaded");
    }
    renderMathInElement(document.body);
  });
  
  $(window).on('action:posts.edited', function() {
    if(config.math.clientDebug === 'on') {
      console.log("nodebb-plugin-math: client.js - action:posts.edited");
    }
    renderMathInElement(document.body);
  });

  $(window).on('action:composer.enhanced', function() {
    if(config.math.clientDebug === 'on') {
      console.log("nodebb-plugin-math: client.js - action:composer.enhanced");
    }
    bbMath.prepareFormattingTools();
  });
  
  /**
   * Check if previewRender is enabled
   */
  if(config.math.previewRender === 'on') {
    $(window).on('action:composer.preview', function() {
      if(config.math.clientDebug === 'on') {
        console.log("nodebb-plugin-math: client.js - action:composer.preview");
      }
      renderMathInElement(document.body);
    });
  }

  /**
  * Add a percent button to the composer
  */
  bbMath.prepareFormattingTools = function() {
    require(['composer/formatting', 'composer/controls'], function(formatting, controls) {
      formatting.addButtonDispatch('percent', function(textarea, selectionStart, selectionEnd) {
        if (selectionStart === selectionEnd) {
          controls.insertIntoTextarea(textarea, '```math\nG_{\\mu \\nu }+\\Lambda g_{\\mu \\nu }={8\\pi G \\over c^{4}}T_{\\mu \\nu }\n```');
          controls.updateTextareaSelection(textarea, selectionStart + 8, selectionStart + 74);
        } else {
          controls.wrapSelectionInTextareaWith(textarea, '```math\n', '\n```');
          controls.updateTextareaSelection(textarea, selectionStart + 8, selectionEnd + 8);
        }
      });
    });
  };

});
