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
      // Set modelID based on view, if a menu then add '.menu-' to the _id
      if(this.model.get('_type') == "menu") {
        this.modelID = '.menu-'+this.model.get('_id');
      } else {
        this.modelID = '.'+this.model.get('_id');
      }

      this.image = 'url('+this.model.get('_backgroundSelector')._src+')';
      this.altEnabled = false;
      this.altText = "";
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
        if(this.model.get('_backgroundSelector').alt && !this.model.get('_backgroundSelector').alt == "") {
          this.altEnabled = true;
          this.altText = this.model.get('_backgroundSelector').alt;
        }
      } else {
        if(this.model.get('_backgroundSelector')._mobile._isEnabled){
          this.image = 'url('+this.model.get('_backgroundSelector')._mobile._src+')';
          if(this.model.get('_backgroundSelector')._mobile.alt && !this.model.get('_backgroundSelector')._mobile.alt == "") {
            this.altEnabled = true;
            this.altText = this.model.get('_backgroundSelector')._mobile.alt;
          }
        }
        if(this.model.get('_backgroundSelector')._hideOnMobile){
          this.image = 'none';
          this.altEnabled = false;
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

      // Check for image alt tag
      if(this.altEnabled) {
        $(this.modelID).attr({
            "aria-label": this.altText
        });
      }

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
