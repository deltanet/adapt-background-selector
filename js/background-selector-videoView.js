define([
  'core/js/adapt'
], function (Adapt) {

  var BackgroundSelectorVideoView = Backbone.View.extend({

    className: "background-selector-video",

    initialize: function () {
      this.render();

      this.listenTo(Adapt, {
        'remove': this.remove,
        'popup:opened': this.popupOpened,
        'popup:closed': this.popupClosed,
        'pageView:ready': this.pageReady,
        'device:resize': this.deviceResize
      });
    },

    render: function () {
      var data = this.model.toJSON();
      var template = Handlebars.templates['videoBackground'];

      $(this.el).html(template(data)).prependTo('.'+this.model.get("_id"));

      this.modelID = '.'+this.model.get('_id');

      this.video = this.$('video')[0];

      this.firstRun = true;
      this.notifyIsOpen = false;
      this.audioPromptIsOpen = false;
      this.videoIsInView = false;

      this.deviceResize();

      _.delay(function() {
        this.popupOpened();
      }.bind(this), 500);
    },

    pageReady: function () {
      $(this.modelID).on('onscreen', this.onscreen.bind(this));
    },

    popupOpened: function() {
      if ($('body').children('.audio-prompt').css('visibility') == 'visible') {
        this.playVideo(false);
        this.audioPromptOpened();
      } else if ($('body').children('.notify').css('visibility') == 'visible') {
        this.playVideo(false);
        this.notifyOpened();
      }
    },

    notifyOpened: function() {
      this.notifyIsOpen = true;
    },

    audioPromptOpened: function() {
      this.audioPromptIsOpen = true;
    },

    popupClosed: function() {
      if (this.audioPromptIsOpen) {
        this.audioPromptIsOpen = false;

        if (this.videoIsInView) {
          _.delay(function() {
            this.playVideo(true);
            this.deviceResize();
          }.bind(this), 400);
        }
      }

      if (this.notifyIsOpen) {
        this.notifyIsOpen = false;

        if (this.videoIsInView && this.firstRun) {
          _.delay(function() {
            this.playVideo(true);
            this.deviceResize();
          }.bind(this), 400);
        }
      }
    },

    onscreen: function(event, measurements) {
      var visible = this.model.get('_isVisible');
      var isOnscreenX = measurements.percentInviewHorizontal == 100;
      var isOnscreenY = measurements.percentFromTop > 30 && measurements.percentFromTop < 101;

      if (visible && isOnscreenX && isOnscreenY) {
        if (!this.notifyIsOpen && !this.audioPromptIsOpen) {
          this.playVideo(true);
        }
        this.videoIsInView = true;
      } else {
        this.playVideo(false);
        this.videoIsInView = false;
      }
    },

    playVideo: function(state) {
      this.deviceResize();
      if (state) {
        this.video.play();
        this.firstRun = false;
      } else if (state === false) {
        this.video.pause();
      }
    },

    deviceResize: function () {
      var width = $(this.modelID).width();
      var height = $(this.modelID).height();

      var videoWidth = this.$('video').width();
      var videoHeight = this.$('video').height();

      this.$('video').removeAttr("style");
      this.$('video').width(width);

      videoWidth = this.$('video').width();
      videoHeight = this.$('video').height();

      if (height > videoHeight) {
        this.$('video').removeAttr("style");
        this.$('video').height(height);
      }
      this.checkDevice();
    },

    checkDevice: function () {
      if (Adapt.device.screenSize === 'small' && this.model.get('_backgroundSelector')._video._disableOnMobile) {
        this.$el.addClass('is-hidden');
      } else {
        this.$el.removeClass('is-hidden');
      }
    }

  });

  return BackgroundSelectorVideoView;

});
