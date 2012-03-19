// vim: expandtab:ts=2:sts=2:sw=2
(function($){
  $.multInput = {
      defaults: {
        delete: true
      , order: true
      , add: true
      , images: 'images/'
      , items: '.items'
    }
  }

  $.fn.multInput = function(opts) {
    if (!$(this).length) return;
    if ($(this).data('multInput')) return;
    var cont = $(this)
      , inputs = cont.find(options.items)
      , options = $.extend({}, $.multInput.defaults, opts)
      , controls = (options.delete?'<a class="multInput-control delete"></a>':'')
                  + (options.order?'<a class="multInput-control up"></a><a class="multInput-control down"></a>':'');

    // add controls to existing inputs
    // create input wireframe
    // add add button
  }
})(jQuery);
