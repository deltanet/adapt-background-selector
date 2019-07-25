define([
    'core/js/adapt'
], function(Adapt) {

    var BackgroundSelectorVideoView = Backbone.View.extend({

    className: "background-selector-video",

    initialize: function () {
      this.render();

      this.listenTo(Adapt, {
        'remove': this.remove,
        'popup:opened': this.notifyOpened,
        'popup:closed': this.notifyClosed,
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
      this.videoIsInView = false;

      // Check if notify is visible
      if ($('body').children('.notify').css('visibility') == 'visible') {
        this.notifyOpened();
      }

      $(this.modelID).on('onscreen', _.bind(this.onscreen, this));

      this.deviceResize();

      return this;
    },

    notifyOpened: function() {
      this.notifyIsOpen = true;
      this.playVideo(false);
    },

    notifyClosed: function() {
      this.notifyIsOpen = false;
      if (this.videoIsInView == true && this.firstRun) {
        _.delay(_.bind(function() {
          this.playVideo(true);
        }, this), 400);
      }
    },

    onscreen: function(event, measurements) {
      var isOnscreenY = measurements.percentFromTop < 70 && measurements.percentFromTop > 0;
      var isOnscreenX = measurements.percentInviewHorizontal == 100;

      if (this.model.get('_isVisible') && isOnscreenY && isOnscreenX) {
        if (this.notifyIsOpen == false) {
          this.playVideo(true);
        }
        this.videoIsInView = true;
      } else {
        this.playVideo(false);
        this.videoIsInView = false;
      }
    },

    playVideo: function(state) {
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
        this.$el.addClass('hidden');
      } else {
        this.$el.removeClass('hidden');
      }
    }

  });

  return BackgroundSelectorVideoView;

});
