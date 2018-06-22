define([
    'coreJS/adapt'
], function(Adapt) {

    var BackgroundSelectorImageView = Backbone.View.extend({

    initialize: function () {
      this.render();
      this.listenTo(Adapt, 'remove', this.remove);
      this.listenTo(Adapt, 'device:changed', this.setBackgroundImage);
    },

    render: function () {
      // Set modelID based on view, if a menu then add '.menu-' to the _id
      if (this.model.get('_type') == "menu") {
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
      // Check if Gradient is enabled
      if (this.model.get('_backgroundSelector')._gradient && this.model.get('_backgroundSelector')._gradient._isEnabled) {
        this.gradientType = this.model.get('_backgroundSelector')._gradient._type;
        this.gradientColors = this.model.get('_backgroundSelector')._gradient._colors;

        var type = "";

        switch (this.gradientType) {
        case "Bottom Left to Top Right":
          type = "linear-gradient(to right top,";
          break;
        case "Left to Right":
          type = "linear-gradient(to right,";
          break;
        case "Top Left to Bottom Right":
          type = "linear-gradient(to right bottom,";
          break;
        case "Top to Bottom":
          type = "linear-gradient(to bottom,";
          break;
        case "Radial":
          type = "radial-gradient(";
          break;
        case "Radial Top":
          type = "radial-gradient(ellipse at top,";
          break;
        case "Radial Bottom":
          type = "radial-gradient(ellipse at bottom,";
          break;
        case "Radial Left":
          type = "radial-gradient(ellipse at left,";
          break;
        case "Radial Right":
          type = "radial-gradient(ellipse at right,";
          break;
        }
        this.image = type+this.gradientColors+')';
        $(this.modelID).css("background-image", this.image);

      } else {

        // Check device size
        if (Adapt.device.screenSize === 'large' || Adapt.device.screenSize === 'medium') {
          this.image = 'url('+this.model.get('_backgroundSelector')._src+')';
          if(this.model.get('_backgroundSelector').alt && !this.model.get('_backgroundSelector').alt == "") {
            this.altEnabled = true;
            this.altText = this.model.get('_backgroundSelector').alt;
          }
        } else {
          if (this.model.get('_backgroundSelector')._mobile._isEnabled) {
            this.image = 'url('+this.model.get('_backgroundSelector')._mobile._src+')';
            if (this.model.get('_backgroundSelector')._mobile.alt && !this.model.get('_backgroundSelector')._mobile.alt == "") {
              this.altEnabled = true;
              this.altText = this.model.get('_backgroundSelector')._mobile.alt;
            }
          }
          if (this.model.get('_backgroundSelector')._hideOnMobile) {
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
        if (this.altEnabled) {
          $(this.modelID).attr({
              "aria-label": this.altText
          });
        }
      }
    }

  });

  return BackgroundSelectorImageView;

})