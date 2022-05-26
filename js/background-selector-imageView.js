import Adapt from 'core/js/adapt';

export default class BackgroundSelectorImageView extends Backbone.View {

  className() {
    return 'background-selector-image';
  }

  initialize() {
    this.render();
    this.listenTo(Adapt, 'remove', this.remove);
    this.listenTo(Adapt, 'device:changed', this.setBackgroundImage);
    this.listenToOnce(Adapt, 'menuView:ready', this.setBackgroundImage);
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates['imageBackground'];

    // Set container based on the view, if a menu then add '.menu-' to the _id
    if (this.model.get('_type') == "menu") {
      this.container = $('.menu');
      $(this.el).html(template(data)).prependTo(this.container);
    } else if (this.model.get('_type') == "page") {
      // Do not render template as the image will be added to the page directly with css
      this.container = $('.page');
    } else {
      this.container = $('.'+this.model.get("_id"));
      $(this.el).html(template(data)).prependTo(this.container);
    }

    $(this.container).addClass('background-selector-enabled');

    this.config = this.model.get('_backgroundSelector')._image;

    this.position = this.config._position;
    this.size = this.config._size;
    this.repeat = this.config._repeat;
    this.attachment = this.config._attachment;

    this.setBackgroundImage();
  }

  setBackgroundImage() {
    this.image = 'none';
    this.altText = null;

    // Check device size
    if (Adapt.device.screenSize === 'large') {
      if (this.config._largeSrc) {
        this.image = 'url('+this.config._largeSrc+')';
      }
      if (this.config.largeAlt && !this.config.largeAlt == "") {
        this.altText = this.config.largeAlt;
      }
    } else if (Adapt.device.screenSize === 'medium') {
      if (this.config._mediumSrc) {
        this.image = 'url('+this.config._mediumSrc+')';
      }
      if (this.config.mediumAlt && !this.config.mediumAlt == "") {
        this.altText = this.config.mediumAlt;
      }
    } else if (Adapt.device.screenSize === 'small') {
      if (this.config._smallSrc) {
        this.image = 'url('+this.config._smallSrc+')';
      }
      if (this.config.smallAlt && !this.config.smallAlt == "") {
        this.altText = this.config.smallAlt;
      }
    }

    if (this.model.get('_type') == "page") {
      $(this.container).css({
        "background-image": this.image,
        "background-position": this.position,
        "background-size": this.size,
        "background-repeat": this.repeat,
        "background-attachment": this.attachment
      });
    } else {
      $(this.el).css({
        "background-image": this.image,
        "background-position": this.position,
        "background-size": this.size,
        "background-repeat": this.repeat,
        "background-attachment": this.attachment
      });
    }

    // Check for image alt tag
    if (this.altEnabled) {
      if (this.model.get('_type') == "page") {
        $(this.container).attr("aria-label", this.altText);
      } else {
        $(this.el).attr("aria-label", this.altText);
      }
    }
  }
}
