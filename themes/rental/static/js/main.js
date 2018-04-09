Function.prototype.debounce = function(delay) {
  var fn = this;
  return function() {
    fn.args = arguments;
    fn.timeout_id && clearTimeout(fn.timeout_id);
    fn.timeout_id = setTimeout(function() {
      return fn.apply(fn, fn.args);
    }, delay);
  };
};

jQuery(function($) {
  // Navigation Toggler
  $(".component-button-menu").click(function() {
    $("body").toggleClass("nav-open");
  });

  function initGallery() {
    $(".gallery").each(function(el) {
      $(this).slick({
        arrows: true,
        dots: true,
        prevArrow:
          '<svg class="slick-prev"><use xlink:href="#left-arrow"></use></svg>',
        nextArrow:
          '<svg class="slick-next"><use xlink:href="#right-arrow"></use></svg>',
        infinite: false,
        centerMode: true,
        slidesToShow: 1,
        centerPadding: "20%",
        autoplay: true,
        autoplaySpeed: 9000,
        pauseOnHover: false
      });
    });
  }
  initGallery();

  // HTML tag with data-trigger-passed-offset="number of selector" data-passed-offset-class="passed_class_name"
  var scrollPassedOffset = function() {
    var scrollY = window.scrollY;
    $("[data-trigger-passed-offset]").each(function() {
      var eleData = $(this).data();
      var passedClass = eleData.passedOffsetClass;
      var offset = eleData.triggerPassedOffset;
      var adjustDistance = eleData.passedOffsetAdjustDistance
        ? parseInt($(this).data("passedOffsetAdjustDistance"))
        : 0;
      if (isNaN(offset)) {
        var offsetEle = $(offset).get(0);
        offset =
          offsetEle.offsetTop +
          offsetEle.getBoundingClientRect().height +
          adjustDistance;
      } else {
        offset = parseInt(offset);
      }
      $(this).toggleClass(passedClass || "passed", offset < scrollY);
    });
  }.debounce(10);

  scrollPassedOffset();
  $(window).on("scroll", function() {
    scrollPassedOffset();
  });
});
