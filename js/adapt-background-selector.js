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

  loadView(view) {
    if (view.model.get("_backgroundSelector") && view.model.get('_backgroundSelector')._isEnabled) {
      // Add video if enabled
      if (view.model.get("_backgroundSelector")._video && view.model.get('_backgroundSelector')._video._isEnabled) {
        new BackgroundSelectorVideoView({
          model: view.model
        });
      }
      // Add image
      new BackgroundSelectorImageView({
        model: view.model
      });
    }
  }
}

export default new BackgroundSelector();
