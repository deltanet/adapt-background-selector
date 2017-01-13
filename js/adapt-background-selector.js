define(function(require) {

var Adapt = require('coreJS/adapt');
var Backbone = require('backbone');

var BackgroundSelectorView = Backbone.View.extend({

    initialize: function () {
      this.render();
      this.listenTo(Adapt, "remove", this.remove);
      this.listenTo(Adapt, 'device:changed', this.setBackgroundImage);
    },

    events: {},

    render: function () {
      // Set modelID based on view, if a menu then add ''.menu-' to the _id
      if(this.model.get('_type') == "menu") {
        this.modelID = '.menu-'+this.model.get('_id');
      } else {
        this.modelID = '.'+this.model.get('_id');
      }

      this.position = this.model.get('_backgroundSelector')._position;
      this.size = this.model.get('_backgroundSelector')._size;
      this.repeat = this.model.get('_backgroundSelector')._repeat;
      this.attachment = this.model.get('_backgroundSelector')._attachment;
      this.color = this.model.get('_backgroundSelector')._color;

      this.setBackgroundImage();

      return this;
    },

    setBackgroundImage: function () {
      // Reset
      this.image = "none";
      // Check device size
      if (Adapt.device.screenSize === 'large' && this.model.get('_backgroundSelector')._large._isEnabled) {
          this.image = 'url('+this.model.get('_backgroundSelector')._large._src+')';
      } else if (Adapt.device.screenSize === 'medium' && this.model.get('_backgroundSelector')._medium._isEnabled) {
          this.image = 'url('+this.model.get('_backgroundSelector')._medium._src+')';
      } else if (Adapt.device.screenSize === 'small' && this.model.get('_backgroundSelector')._small._isEnabled) {
          this.image = 'url('+this.model.get('_backgroundSelector')._small._src+')';
      }

      $(this.modelID).css({
          "background-image": this.image,
          "background-position": this.position,
          "background-size": this.size,
          "background-repeat": this.repeat,
          "background-attachment": this.attachment,
          "background-color": this.color
      });

    }

});

Adapt.on('menuView:postRender articleView:postRender blockView:postRender componentView:postRender', function(view) {
    if (view.model.get("_backgroundSelector") && view.model.get('_backgroundSelector')._isEnabled) {
        new BackgroundSelectorView({
            model:view.model
        });
    }
});

});
