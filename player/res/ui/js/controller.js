/*
 * Quran.com
 *
 *
 *
 *
 *
 *
 */
(function($) {

    // the following is very complex but it works relatively well.
    // please do not refactor unless you ultimately enhance functionality
    // or enhance efficiency in a reasonable cost-benefit trade off
    $.widget('ui.quranController', {
        _init: function() {
            var widget = this;
            var options = widget.options;

            widget.ui = new Object();

            widget.ui.body = $.quran.create_widget({
                widget: widget,
                title: options.title
            });

            widget.ui.body.html(
                widget._make_inner_body()
            );
            
            widget.ui.select_aya     = widget.ui.body.find('.select-aya')
            .change(function() {
                var aya = $(this)[0].selectedIndex+1;
                var index = $(this)[0].value;
                $.quran.set_state('aya', aya);
                $.quran.set_state('index', index);
                console.log('change aya',aya,index);
            });
            widget.ui.select_sura    = widget.ui.body.find('.select-sura')
            .change(function() {
                $.quran.set_state('sura', $(this)[0].value);
                widget._populate_ayas();
                widget.ui.select_aya.trigger('change');
            });
            widget.ui.select_recitor = widget.ui.body.find('.select-recitor')
            .change(function() {
                $.quran.set_state('recitor', $(this)[0].value);
            });

            widget._populate_recitors();
            widget._populate_suras();
            widget._populate_ayas();

            var prev_sura = function(ev,last_aya) {
                var selector = widget.ui.select_sura;
                var dom = selector[0];
                var go_last_next = false;
                if ((last_aya) && (dom.selectedIndex != 0)) {
                    go_last_next = true;
                }
                var prev = dom.selectedIndex-1;
                if ((prev >= 0) && (dom.options[prev])) {
                    dom.selectedIndex = prev;
                    selector.trigger('change');
                }

                if (go_last_next) {
                    var selector = widget.ui.select_aya;
                    var dom = selector[0];
                    dom.selectedIndex = dom.options.length - 1;
                    selector.trigger('change');
                }
            };
            var prev_aya = function(ev) {
                var selector = widget.ui.select_aya;
                var dom = selector[0];
                var prev = dom.selectedIndex-1;
                if ((prev >= 0) && (dom.options[prev])) {
                    dom.selectedIndex = prev;
                    selector.trigger('change');
                } else {
                    var selector = widget.ui.select_sura;
                    var dom = selector[0];
                    if (dom.selectedIndex != 0)
                        prev_sura(ev,true);
                }
            };
            var next_aya = function() {
                var selector = widget.ui.select_aya;
                var dom = selector[0];
                var next = dom.selectedIndex+1;
                if (dom.options[next]) {
                    dom.selectedIndex = next;
                    selector.trigger('change');
                } else {
                    next_sura();
                }
            };
            var next_sura = function() {
                var selector = widget.ui.select_sura;
                var dom = selector[0];
                var next = dom.selectedIndex+1;
                if (dom.options[next]) {
                    dom.selectedIndex = next;
                    selector.trigger('change');
                }
            };
            var mouseup = false;
            var scrolling = false;
            var scroll = function(dir,obj) {
                if (!mouseup && !scrolling)
                    setTimeout(function() {
                        scrolling = true;
                        eval('scroll("'+dir+'",'+'"'+obj+'");');
                    }, 250);
                else if (mouseup)
                    scrolling = false;
                else if (scrolling)
                    setTimeout(function() {
                        eval(dir+'_'+obj+'();');
                        eval('scroll("'+dir+'",'+'"'+obj+'");');
                    }, 50);
            };

            widget.ui.prev_sura = widget.ui.body.find('.icon-resultset-first')
            .click(prev_sura)
            .mousedown(function() {
                mouseup = false;
                scroll('prev','sura');
            })
            .mouseup(function() {
                mouseup = true;
            })
            .mouseout(function() {
                mouseup = true;
            })
            ;
            widget.ui.prev_aya  = widget.ui.body.find('.icon-resultset-previous')
            .click(prev_aya)
            .mousedown(function() {
                mouseup = false;
                scroll('prev','aya');
            })
            .mouseup(function() {
                mouseup = true;
            })
            .mouseout(function() {
                mouseup = true;
            })
            ;
            widget.ui.next_aya  = widget.ui.body.find('.icon-resultset-next')
            .click(next_aya)
            .mousedown(function() {
                mouseup = false;
                scroll('next','aya');
            })
            .mouseup(function() {
                mouseup = true;
            })
            .mouseout(function() {
                mouseup = true;
            })
            ;
            widget.ui.next_sura = widget.ui.body.find('.icon-resultset-last')
            .click(next_sura)
            .mousedown(function() {
                mouseup = false;
                scroll('next','sura');
            })
            .mouseup(function() {
                mouseup = true;
            })
            .mouseout(function() {
                mouseup = true;
            })
            ;
        },
        _make_inner_body: function() {
            var widget = this;
            var inner_body = $(
                '<select class="select-recitor"></select>' +
                '<select class="select-sura"></select>' +
                '<select class="select-aya"></select>' +
                '<div class="icon-resultset-first">&#160;</div>' +
                '<div class="icon-resultset-previous">&#160;</div>' +
                '<div class="icon-resultset-next">&#160;</div>' +
                '<div class="icon-resultset-last">&#160;</div>'
            );

            return inner_body;
        },
        _restore_state: function(key) {
            var widget = this;
            var el = eval('widget.ui.select_' + key);
            if ($.quran.get_state(key)) {
                el[0].selectedIndex = function() {
                var target_value = $.quran.get_state(key);
                var selected_index = 0;
                var arr = el[0].options
                for (var i=0; i < arr.length; i++) {
                    if (arr[i].value == target_value) {
                        selected_index = i;
                        break;
                    }
                }
                return selected_index;
                }();
            } else {
                $.quran.set_state(key, el[0].value);
            }
        },
        _populate_recitors: function() {
            var widget = this;
            for (var i=0; i < $.quran.config.recitors.length; i++) {
                widget.ui.select_recitor.append('<option value='+ $.quran.config.recitors[i][1] +'>'+ $.quran.config.recitors[i][0] + '</option>');
            }

            $.quran.bind('state-restored',function() {
                widget._restore_state('recitor');
            });
        },
        _populate_suras: function() {
            var widget = this;
            for (var i=1; i < $.quran.data.sura.length - 1; i++) { // iterates from '1' to '114'
                 widget.ui.select_sura.append('<option value='+ i +'>'+ $.quran.data.sura[i][5] + '</option>'); // 2nd array index: '5' corresponds to 'transliterated name'
            }

            $.quran.bind('state-restored',function() {
                widget._restore_state('sura');
            });
        },
        _populate_ayas: function() {
            var widget = this;
            function make_ayas() {
                var sura = $.quran.get_state('sura');
                var ayas = $.quran.data.sura[sura][1]; // 2nd array index '1' corresponds to number of ayas
                widget.ui.select_aya.html('');
                for (var i=1; i <= ayas; i++) {
                    var aya_index = parseInt($.quran.data.sura[sura][0]) + parseInt(i);
                    widget.ui.select_aya.append('<option value='+ aya_index +'>'+ i +'</option>');
                }
                var aya = widget.ui.select_aya[0].selectedIndex+1;
                var index = widget.ui.select_aya[0].value;
                $.quran.set_state('aya', aya);
                $.quran.set_state('index', index);
                console.log('change sura',aya,index);
            };
            widget.ui.select_sura.one('change',make_ayas);
            $.quran.bind('state-restored',function() {
                make_ayas();
                widget._restore_state('aya');
            });
        }
    });


    $.extend('ui.quranController', {
        version: '0.1',
        defaults: {
        }
    });

})(jQuery);
