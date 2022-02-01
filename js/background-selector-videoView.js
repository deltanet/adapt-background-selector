import Adapt from 'core/js/adapt';

export default class BackgroundSelectorVideoView extends Backbone.View {

  className() {
    return 'background-selector-video';
  }

  initialize() {
    this.render();

    this.listenTo(Adapt, {
      'remove': this.remove,
      'popup:opened': this.popupOpened,
      'popup:closed': this.popupClosed,
      'device:changed': this.deviceChanged
    });
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates['videoBackground'];

    $(this.el).html(template(data)).prependTo('.'+this.model.get("_id"));

    this.isIE = $('html').is('.ie');

    if (this.isIE) {
      this.$el.addClass('is-ie');
    }

    this.modelID = '.'+this.model.get('_id');
    this.video = this.$('video')[0];
    this.firstRun = true;
    this.notifyIsOpen = false;
    this.audioPromptIsOpen = false;
    this.videoIsInView = false;

    $(this.modelID).on('onscreen', this.onscreen.bind(this));

    this.deviceChanged();

    _.delay(() => {
      this.popupOpened();
    }, 500);
  }

  popupOpened() {
    if ($('body').children('.audio-prompt').css('visibility') == 'visible') {
      this.playVideo(false);
      this.audioPromptOpened();
    } else if ($('body').children('.notify').css('visibility') == 'visible') {
      this.playVideo(false);
      this.notifyOpened();
    }
  }

  notifyOpened() {
    this.notifyIsOpen = true;
  }

  audioPromptOpened() {
    this.audioPromptIsOpen = true;
  }

  popupClosed() {
    if (this.audioPromptIsOpen) {
      this.audioPromptIsOpen = false;

      if (this.videoIsInView) {
        _.delay(() => {
          this.playVideo(true);
          this.deviceChanged();
        }, 400);
      }
    }

    if (this.notifyIsOpen) {
      this.notifyIsOpen = false;

      if (this.videoIsInView && this.firstRun) {
        _.delay(() => {
          this.playVideo(true);
          this.deviceChanged();
        }, 400);
      }
    }
  }

  onscreen(event, measurements) {
    const visible = this.model.get('_isVisible');
    const isOnscreenX = measurements.percentInviewHorizontal == 100;
    const isOnscreenY = (measurements.percentFromTop < 50) && (measurements.percentFromTop > -10);

    if (visible && isOnscreenX && isOnscreenY) {
      if (!this.notifyIsOpen && !this.audioPromptIsOpen) {
        this.playVideo(true);
      }
      this.videoIsInView = true;
    } else {
      this.playVideo(false);
      this.videoIsInView = false;
    }
  }

  playVideo(state) {
    this.deviceChanged();

    if (state) {
      this.video.play();
      this.firstRun = false;
    } else if (state === false) {
      this.video.pause();
    }
  }

  deviceChanged() {
    if (Adapt.device.screenSize === 'small' && this.model.get('_backgroundSelector')._video._disableOnMobile) {
      this.$el.addClass('is-hidden');
    } else {
      this.$el.removeClass('is-hidden');
    }
  }
}
