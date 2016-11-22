define(function(require) {

var Adapt = require('coreJS/adapt');
var Backbone = require('backbone');

var BackgroundSelectorView = Backbone.View.extend({

    initialize: function () {
      if (this.model.get('_backgroundSelector') && this.model.get('_backgroundSelector')._isEnabled) {
        this.render();
        this.listenTo(Adapt, "remove", this.remove);
        this.listenTo(Adapt, 'device:changed', this.setBackgroundImage);
      }
    },

    events: {},

    render: function () {
      // Set modelID based on view, if a menu then add ''.menu-' to the _id
      if(this.model.get('_type') == "menu") {
        this.modelID = '.menu-'+this.model.get('_id');
      } else {
        this.modelID = '.'+this.model.get('_id');
      }

      this.image = 'url('+this.model.get('_backgroundSelector')._src+')';
      this.position = this.model.get('_backgroundSelector')._position;
      this.size = this.model.get('_backgroundSelector')._size;
      this.repeat = this.model.get('_backgroundSelector')._repeat;
      this.attachment = this.model.get('_backgroundSelector')._attachment;
      this.color = this.model.get('_backgroundSelector')._color;

      this.setBackgroundImage();

      return this;
    },

    setBackgroundImage: function () {
      // Check device size
      if (Adapt.device.screenSize === 'large' || Adapt.device.screenSize === 'medium') {
        this.image = 'url('+this.model.get('_backgroundSelector')._src+')';
      } else {
        if(this.model.get('_backgroundSelector')._mobile._isEnabled){
          this.image = 'url('+this.model.get('_backgroundSelector')._mobile._src+')';
        }
        if(this.model.get('_backgroundSelector')._hideOnMobile){
          this.image = 'none';
        }
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
    if (view.model.get("_backgroundSelector")) {
        new BackgroundSelectorView({
            model:view.model
        });
    }
});

});
