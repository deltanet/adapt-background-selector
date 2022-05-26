import Adapt from 'core/js/adapt';
import BackgroundSelectorImageView from './background-selector-imageView';
import BackgroundSelectorVideoView from './background-selector-videoView';

class BackgroundSelector extends Backbone.Controller {

  initialize() {
    this.listenToOnce(Adapt, 'app:dataReady', this.onDataReady);
  }

  onDataReady() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.listenTo(Adapt, 'contentObjectView:postRender articleView:postRender blockView:postRender componentView:postRender', this.loadView);
  }

  setColor(view) {
    $(view.el).css({
      "background-color": view.model.get('_backgroundSelector')._color
    });
  }

  setGradient(view) {
    this.gradientType = view.model.get('_backgroundSelector')._gradient._type;
    this.gradientColors = view.model.get('_backgroundSelector')._gradient._colors;

    let type = "";

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

    if (view.model.get('_type') == "page") {
      $('.page').css("background-image", this.image);
    } else {
      $(view.el).css("background-image", this.image);
    }
  }

  loadView(view) {
    if (!view.model.get('_backgroundSelector') || !view.model.get('_backgroundSelector')._isEnabled) return;

    // Color or Gradient
    if (view.model.get('_backgroundSelector')._gradient && view.model.get('_backgroundSelector')._gradient._isEnabled) {
      this.setGradient(view);
    } else {
      this.setColor(view);
    }

    // Video
    if (view.model.get('_backgroundSelector')._video && view.model.get('_backgroundSelector')._video._isEnabled) {
      new BackgroundSelectorVideoView({
        model: view.model
      });
    }

    // Image
    if (view.model.get('_backgroundSelector')._image && view.model.get('_backgroundSelector')._image._isEnabled) {
      new BackgroundSelectorImageView({
        model: view.model
      });
    }
  }
}

export default new BackgroundSelector();
