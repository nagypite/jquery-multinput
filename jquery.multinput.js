// vim: expandtab:ts=2:sts=2:sw=2
(function($){
  $.multInput = {
      defaults: {
        delete: true
      , deleteConfirm: null
      , order: true
      , add: true
      , images: 'images/'
      , items: '.item'
      , empty: '.empty'
      , uniqueId: true
    }
  }

  $.fn.multInput = function(opts) {
    $(this).each( function() {
      if ($(this).hasClass('multInput-container')) return;

      var cont = $(this)
        , options = $.extend({}, $.multInput.defaults, opts)
        , inputs = cont.find(options.items)
        , controls = '<div class="multInput-controls">'
                    + (options.delete?'<a class="multInput-control delete" title="delete item"></a>':'')
                    + (options.order?'<a class="multInput-control up" title="move item up"></a><a class="multInput-control down" title="move item down"></a>':'')
                    + '</div>'
        , addbutton = '<div class="multInput-row add"><a class="multInput-add">add new item</a></div>'
        , inputContainer = '<div class="multInput-row input clearfix">'+controls+'</div>'
        , wireframe;

      cont.addClass('multInput-container clearfix');

      // add controls, containers to existing inputs
      inputs.each( function() {
        var input = $(this), container = $(inputContainer);
        if (input.parents('multInput-row').length) return;

        input.after(container);
        input.addClass('multInput-input');
        container.prepend(input);

        if (options.empty && input.is(options.empty)) {
          wireframe = container.clone();
        }
      });

      // add add button
      cont.find('.multInput-row:last-child').after(addbutton);

      // create input wireframe if not given (options.empty)
      if (!wireframe) {
        wireframe = cont.find('.multInput-row:first-child').clone();
        wireframe.find('input[type=text], textarea').val('');
        wireframe.find('input[type=radio]').attr('checked', false);
        wireframe.find('input[id], textarea[id], select[id]').attr('id', '');
      }

      // add listeners
      if (options.delete) {
        cont.delegate('.multInput-control.delete', 'click', function() {
          if ((options.deleteConfirm && confirm(options.deleteConfirm)) || !options.deleteConfirm) {
            $(this).parents('.multInput-row').remove();
            cont.trigger('reorder');
          }
        });
      }

      if (options.order) {
        cont.delegate('.multInput-control.up', 'click', function() {
          var row = $(this).parents('.multInput-row');
          if (row.prev().length) row.after(row.prev());
          cont.trigger('reorder');
        }).delegate('.multInput-control.down', 'click', function() {
          var row = $(this).parents('.multInput-row');
          if (row.next().length) row.before(row.next());
          cont.trigger('reorder');
        });
      }

      cont.delegate('.multInput-add', 'click', function() {
        var newRow = wireframe.clone();
        if (options.uniqueId) {
          var newId = 'new_'+((new Date).getTime());
          newRow.find('[name*="[]"]').each( function() {
            $(this).attr('name', $(this).attr('name').replace('[]', '['+newId+']'));
          });
        }
        $(this).parents('.multInput-row').before(newRow);
        cont.trigger('reorder');
      });

      cont.bind('reorder', function() {
        cont.find('.multInput-row.last').removeClass('last');
        cont.find('.multInput-row.input').last().addClass('last');
      }).trigger('reorder');
    })
  }
})(jQuery);
