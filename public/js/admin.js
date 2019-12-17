/* globals define, socket, app, $ */
define('admin/plugins/math', ['settings'], function(Settings) {
  'use strict';

  var ACP = {};

  ACP.init = function() {
    Settings.load('math', $('.math-settings'));

    $('#save').on('click', function() {
      Settings.save('math', $('.math-settings'), function() {
        app.alert({
          type: 'success',
          alert_id: 'math-saved',
          title: 'Settings Saved',
          message: 'Please reload your NodeBB to apply these settings',
          clickfn: function() {
            socket.emit('admin.reload');
          }
        });
      });
    });
  };

  return ACP;
});