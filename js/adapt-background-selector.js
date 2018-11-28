define([
  'coreJS/adapt',
  './background-selector-imageView',
  './background-selector-videoView'
], function(Adapt, BackgroundSelectorImageView, BackgroundSelectorVideoView) {

  var BackgroundSelector = _.extend({

    initialize: function() {
      this.listenToOnce(Adapt, "app:dataReady", this.onDataReady);
    },

    onDataReady: function() {
      this.setupEventListeners();
    },

    setupEventListeners: function() {
      this.listenTo(Adapt, 'menuView:postRender articleView:postRender blockView:postRender componentView:postRender', this.loadView);
    },

    loadView: function (view) {
      if (view.model.get("_backgroundSelector") && view.model.get('_backgroundSelector')._isEnabled) {
        new BackgroundSelectorImageView({
          model:view.model
        });

        if (view.model.get("_backgroundSelector")._video && view.model.get('_backgroundSelector')._video._isEnabled) {
          new BackgroundSelectorVideoView({
            model:view.model
          });
        }

      }

    }

  }, Backbone.Events);

  BackgroundSelector.initialize();

  return BackgroundSelector;

});
