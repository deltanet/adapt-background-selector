import Adapt from 'core/js/adapt';

export default class BackgroundSelectorParallaxView extends Backbone.View {

  className() {
    return 'background-selector-parallax';
  }

  initialize() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.render();
  }

  render() {
    const data = this.model.toJSON();
    const template = Handlebars.templates['parallaxBackground'];

    // Set container based on the view, if a menu then add '.menu-' to the _id
    if (this.model.get('_type') == "menu") {
      this.container = $('.menu');
      $(this.el).html(template(data)).prependTo(this.container);
    } else if (this.model.get('_type') == "page") {
      // Do not render template as the image will be added to the page directly with css
      this.container = $('.page');
    } else {
      this.container = $('.'+this.model.get('_id'));
      $(this.el).html(template(data)).prependTo(this.container);
    }

    $(this.container).addClass('background-selector-enabled');

    this.initParallax();
  }

  initParallax() {
    const element = document.getElementById("parallax-"+this.model.get('_id'));
    let navHeight;
    let scrollPos;

    // update css property on scroll
    function animation() {
      // Check nav height
      navHeight = $('.nav').height();
      // check the scroll position has changed
      if (scrollPos !== (element.getBoundingClientRect().top - navHeight)) {
        // reset the seen scroll position
        scrollPos = element.getBoundingClientRect().top - navHeight;
        // update css property --scrollPos with scroll position in pixels
        element.style.setProperty('--scrollPos', scrollPos + 'px');
      }
      // call animation again on next animation frame
      window.requestAnimationFrame(animation);
    }

    // start animation on next animation frame
    window.requestAnimationFrame(animation);
  }
}
