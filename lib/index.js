(function pluginMath() {
  const mathRenderer = require('./render');
  const meta = require.main.require('./src/meta');
  const winston = require.main.require('winston');
  const delimiters = [];
  const bbMath = {
    config: {},
    onLoad(params, callback) {
      function render(req, res) {
        res.render('admin/plugins/math');
      }

      params.router.get('/admin/plugins/math', params.middleware.admin.buildHeader, render);
      params.router.get('/api/admin/plugins/math', render);
      bbMath.init();
      callback();
    },

    init() {
      // Load saved config
      const that = this;
      const defaults = { clientDebug: false, previewRender: false, langPrefix: 'language-' };

      meta.settings.get('math', (err, options) => {
        if (err) {
          winston.error(err);
        }
        Object.keys(defaults).forEach((field) => {
          // use default if not set in config
          if (Object.prototype.hasOwnProperty.call(options, field)) {
            that.config[field] = options[field];
          } else {
            that.config[field] = defaults[field];
          }
        });
        
        // Also fetch the language setting configuration from markdown plugin
        meta.settings.get('markdown', function(err, options) {
					// If not set in config (nil)
					if (!options.hasOwnProperty('langPrefix')) {
						that.config['langPrefix'] = defaults['langPrefix'];
					} else {
						that.config['langPrefix'] = options['langPrefix'];
					}
					delimiters.push({ left: '<pre><code class="' + that.config.langPrefix + 'math">', right: '</code></pre>', display: true });
					
					if(bbMath.config.previewRender === 'on') {
					  winston.verbose('nodebb-plugin-math: Preview render enabled!');
					  delimiters.push({ left: '<pre class="markdown-highlight"><code class="' + that.config.langPrefix + 'math">', right: '</code></pre>', display: true });
					}
			});
      });
    },

    parsePost(data, callback) {
      const post = data;
      if (data && data.postData && data.postData.content) {
        // This is called whenever the post is being opened for viewing
        post.postData.content = mathRenderer.render(data.postData.content, delimiters);
      }
      callback(null, post);
    },

    parseRaw(raw, callback) {
      if(bbMath.config.previewRender === 'on') {
        callback(null, raw ? mathRenderer.renderPreview(raw, delimiters) : raw);
      }
      else {
        callback(null, raw);
      }
    },

    registerFormatting(payload, callback) {
      const formatting = ['percent'];

      formatting.reverse();
      formatting.forEach((format) => {
        payload.options.unshift({ name: format, className: `fa fa-${format}`, title: 'Math' });
      });

      callback(null, payload);
    },

    admin: {
      menu(customHeader, callback) {
        customHeader.plugins.push({ route: '/plugins/math', icon: 'fa-percent', name: 'Math' });

        callback(null, customHeader);
      },
    },
    
    // Expose part of the configuration to client
    getConfig: function(config, callback) {
			config.math = {
				clientDebug: bbMath.config.clientDebug,
				previewRender: bbMath.config.previewRender
			};
			callback(null, config);
		},
  };

  module.exports = bbMath;
}());
