(function($) {
$.quran.trigger = function(ev,data) {
    $($.quran).trigger(ev,data);
};
$.quran.bind = function(ev,fn) {
    $($.quran).bind(ev,fn);
}; 
$.quran._state = {};
$.quran.set_state = function(key,data) {
    $.quran._state[key] = data;
};
$.quran.get_state = function(key) {
    return $.quran._state[key];
};
$.quran.save_application_state = function() {
  //--console.log('Save app state');
    var keys = new Array();
    for (var key in $.quran._state) {
        if (typeof $.quran._state[key] == 'object') {
            for (var key2 in $.quran._state[key]) {
                if ((typeof $.quran._state[key][key2] == 'number') || (typeof $.quran._state[key][key2] == 'string')) {
                    keys.push(key + '_' + key2);
                    $.cookie(key + '_' + key2, $.quran._state[key][key2], { expires: 365 });
                }
            }
        } else if ((typeof $.quran._state[key] == 'number') || (typeof $.quran._state[key] == 'string')) {
            keys.push(key);
            $.cookie(key, $.quran._state[key], { expires: 365 });
        }
    }
    $.cookie('keys',keys);
};
$.quran.restore_application_state = function() {
  //--console.log('Restore app state');
    if ($.cookie('keys')) {
        var keys = $.cookie('keys').split(',');
        var objects = {};
        $.each(keys, function(n,key) {
            if (key.match(/_/)) {
                var key1 = key.split('_')[0];
                var key2 = key.split('_')[1];
                eval('objects.'+ key1 +' = objects.'+ key1 +' || {};');
                eval('$.extend(objects.'+ key1 +',{ '+ key2 +':'+ $.cookie(key) +' });');
                //eval('console.log(objects.'+ key1 +');');
            } else {
                $.quran.set_state(key, $.cookie(key));
            }
        });
        for (var key in objects) {
            $.quran.set_state(key, objects[key]);
        }
    }
    $.quran.trigger('application-state-restored');
};
$(window).load(function() {
    $.quran.restore_application_state();
});
$(window).unload(function() {
    $.quran.save_application_state();
});
var widgets_selector = '#widgets';
$.quran._init_widget = function(widget,options) {
    var callbacks = options.bind;
    $.each(callbacks, function(ev_name, callback) {
        $.quran.bind(ev_name, function(ev,data) {
            callback.call(widget,data);
        });
    });

    var name = options.name || 'give me a name!';
    var node = $('<div class="widget" id="'+ widget.widgetBaseClass +'">');
    var head = $('<div class="head">');
    var name_label = $('<div class="name-label">'+ name +'</div>');
    var sort_handle = $('<div class="sort-handle">');
    var drag_handle = $('<div class="drag-handle">');
    var body = $('<div class="body">');
    $(document).ready(function() {
        head
            .append(name_label)
            .append(sort_handle)
            .append(drag_handle)
        ;
        node
            .append(head)
            .append(body)
            .resizable()
        ;
        $(widgets_selector)
            .append(node)
        ;
    });
    return body;
};
$.quran.add_widget = function(widget_name) {
    $(document).ready(function() {
        $(widgets_selector)[widget_name]();
    });
};
$.quran.remove_widget = function(id) {
};
function get_aya_obj_with_keyword(keyword) {
    var aya_obj = $.quran.get_state('aya');
    if (aya_obj) {
        if (keyword == 'next') {
            if ((aya_obj.id + 1) <= $.quran.data.sura[aya_obj.sura + 1][0]) {
                return {
                    id: aya_obj.id + 1,
                    sura: aya_obj.sura,
                    aya: aya_obj.aya + 1
                };
            } else
            if (aya_obj.sura < 114) {
                return {
                    id: aya_obj.id + 1,
                    sura: aya_obj.sura + 1,
                    aya: 1
                };
            }
        } else
        if (keyword == 'prev') {
            if ((aya_obj.id - 1) > $.quran.data.sura[aya_obj.sura][0]) {
                return {
                    id: aya_obj.id - 1,
                    sura: aya_obj.sura,
                    aya: aya_obj.aya - 1
                };
            } else {
                if (aya_obj.sura > 1) {
                    return {
                        id: aya_obj.id - 1,
                        sura: aya_obj.sura - 1,
                        aya: $.quran.data.sura[aya_obj.sura - 1][1]
                    };
                } else {
                    return {
                        id: 6236,
                        sura: 114,
                        aya: 6
                    };
                }
            }
        }
    }
    return {
        id: 1,
        sura: 1,
        aya: 1
    };
}
function get_aya_obj_with_id(id) {
    var sura, aya;
    id = parseInt(id);
    for (var i=1; i<($.quran.data.sura.length-1); i++) {
        if ($.quran.data.sura[i+1][0] >= id) {
            sura = i;
            aya = id - $.quran.data.sura[i][0];
            break;
        }
    }
    if (id && sura && aya) {
        return {
            id: id,
            sura: sura,
            aya: aya
        };
    } else {
        return {
            id: 1,
            sura: 1,
            aya: 1
        };
    }
}
function get_aya_obj_with_sura_and_aya(sura,aya) {
    var id;
    sura = parseInt(sura);
    aya  = parseInt(aya);
    if ($.quran.data.sura[sura] && (aya <= $.quran.data.sura[sura][1])) {
        id = $.quran.data.sura[sura][0] + aya;
    }
    if (id && sura && aya) {
        return {
            id: id,
            sura: sura,
            aya: aya
        };
    } else {
        return {
            id: 1,
            sura: 1,
            aya: 1
        };
    }
}
function get_aya_obj_with_sura(sura) {
    var id, aya;
    sura = parseInt(sura);
    if ($.quran.data.sura[sura] && (sura >= 1) && (sura <= 114)) {
        id = $.quran.data.sura[sura][0] + 1;
        aya = 1;
    }
    if (id && sura && aya) {
        return {
            id: id,
            sura: sura,
            aya: aya
        };
    } else {
        return {
            id: 1,
            sura: 1,
            aya: 1
        };
    }
}
function change_aya(ev, keyword_or_obj) {
    var keyword, obj;
    var aya_before, aya_after;
    
    aya_before = $.quran.get_state('aya');

    if (typeof keyword_or_obj == 'string') {
        keyword = keyword_or_obj;
    } else 
    if (typeof keyword_or_obj == 'object') {
        obj = keyword_or_obj;
    }
    if (keyword) { // next, prev
        if ((keyword == 'next') || (keyword == 'prev')) {
            $.quran.set_state('aya',get_aya_obj_with_keyword(keyword));
        }
    }
    if (obj) {
        if (obj.id) {
            $.quran.set_state('aya',get_aya_obj_with_id(obj.id));
        } else
        if (obj.sura && obj.aya) {
            $.quran.set_state('aya',get_aya_obj_with_sura_and_aya(obj.sura,obj.aya));
        } else
        if (obj.sura) {
            $.quran.set_state('aya',get_aya_obj_with_sura(obj.sura));
        }
    }

    aya_after = $.quran.get_state('aya');

    if (!aya_before || (aya_before.sura != aya_after.sura)) {
        $.quran.trigger('sura-changed', { previous: aya_before.sura, current: aya_after.sura });
    }
    if (!aya_before || (aya_before.id != aya_after.id)) {
        $.quran.trigger('aya-changed', aya_after);
    }
}
function change_recitor(ev, recitor) {
    var recitor_before, recitor_after;

    recitor_before = $.quran.get_state('recitor');

    $.quran.set_state('recitor', recitor);

    recitor_after = $.quran.get_state('recitor');

    if (!recitor_before || (recitor_before != recitor_after)) {
        $.quran.trigger('recitor-changed', recitor_after);
    }
}
$.quran.bind('change-aya', change_aya);
$.quran.bind('change-recitor', change_recitor);
})(jQuery);
(function($) {
$.widget('quran.controller', {
    _init: function() {
      //--console.log('controller');
        this.body = $.quran._init_widget(this, {
            name: 'Controller',
            bind: {
                'aya-changed': this.set_aya,
                'recitor-changed': this.set_recitor,
                'application-state-restored': function() {
                    //console.log('state restore',arguments);
                    var aya_obj = $.quran.get_state('aya');
                    if (aya_obj) {
                        this.set_aya(aya_obj);
                    }
                    var recitor = $.quran.get_state('recitor');
                    if (recitor) {
                        this.set_recitor(recitor);
                    }
                }
            }
        });

        this.body.css({
            height: '60px'
        });

        this.recitor_select = $('<select>');
        this.sura_select = $('<select>');
        this.aya_select = $('<select>');

        var my = this;
        function populate_recitors() {
          //--console.log('populate recitors');
            for (var i=0; i < $.quran.config.recitors.length; i++) {
                my.recitor_select
                    .append('<option value='+ $.quran.config.recitors[i][1] +'>'+ $.quran.config.recitors[i][0] +'</option>');
            }
        }
        function populate_suras() {
          //--console.log('populate suras');
            for (var i=1; i < $.quran.data.sura.length - 1; i++) {
                 my.sura_select
                    .append('<option value='+ i +'>'+ $.quran.data.sura[i][5] + '</option>');
            }
        }
        function set_defaults() {
            if (!$.quran.get_state('recitor')) {
                $.quran.set_state('recitor', my.recitor_select[0].options[my.recitor_select[0].selectedIndex].value);
            }
            if (!$.quran.get_state('aya')) {
                $.quran.set_state('aya', { id: 1, aya: 1, sura: 1 });
            }
        }

        populate_recitors();
        populate_suras();
        set_defaults();

        this.recitor_select.change(function() {
          //--console.log('recitor select change setting state');
            $.quran.trigger('change-recitor', $(this)[0].options[$(this)[0].selectedIndex].value);
        });
        this.sura_select.change(function() {
          //--console.log('sura select change setting state');
            $.quran.trigger('change-aya', { sura: $(this)[0].options[$(this)[0].selectedIndex].value });
        });
        this.aya_select.change(function() {
          //--console.log('aya select change setting state');
            $.quran.trigger('change-aya', { id: $(this)[0].options[$(this)[0].selectedIndex].value });
        });

        this.body.append(this.recitor_select);
        this.body.append(this.sura_select);
        this.body.append(this.aya_select);

        this.body.append($('<div>'));

        this.prev_sura_button = $('<div class="icon-resultset-first">&#160;</div>');
        this.prev_aya_button = $('<div class="icon-resultset-previous">&#160;</div>');
        this.next_aya_button = $('<div class="icon-resultset-next">&#160;</div>');
        this.next_sura_button = $('<div class="icon-resultset-last">&#160;</div>');

        this.prev_sura_button.click(function() { my.prev_sura.call(my); });
        this.prev_aya_button.click(function() { my.prev_aya.call(my); });
        this.next_aya_button.click(function() { my.next_aya.call(my); });
        this.next_sura_button.click(function() { my.next_sura.call(my); });

        this.body.append(this.prev_sura_button);
        this.body.append(this.prev_aya_button);
        this.body.append(this.next_aya_button);
        this.body.append(this.next_sura_button);
    },
    set_aya: function(aya_obj) {
      //--console.log('set_aya',aya_obj);
        if (!this.last_sura || (this.last_sura != aya_obj.sura)) {
            //console.log('!= sura');
            this.set_sura(aya_obj.sura);
            this.aya_select.html('');
            for (var i=1; i <= $.quran.data.sura[aya_obj.sura][1]; i++) {
                var index = $.quran.data.sura[aya_obj.sura][0] + i;
                this.aya_select
                    .append('<option value='+ index +'>'+ i + '</option>');
            }
            this.last_sura = aya_obj.sura;
        }
        var selectedIndex = 0;
        for (var i = 0; i < this.aya_select[0].options.length; i++) {
            var option = this.aya_select[0].options[i];
            if (option.value == aya_obj.id) {
                selectedIndex = i;
                break;
            }
        }
        this.aya_select[0].selectedIndex = selectedIndex;
    },
    get_aya: function() {
        return parseInt(this.aya_select[0].options[this.aya_select[0].selectedIndex].value);
    },
    set_sura: function(sura) {
        //console.log('set sura',sura);
        var selectedIndex = 0;
        for (var i = 0; i < this.sura_select[0].options.length; i++) {
            var option = this.sura_select[0].options[i];
            if (option.value == sura) {
                selectedIndex = i;
                break;
            }
        }
        this.sura_select[0].selectedIndex = selectedIndex;
    },
    get_sura: function() {
        return parseInt(this.sura_select[0].options[this.sura_select[0].selectedIndex].value);
    },
    set_recitor: function(recitor) {
        if (recitor != this.get_recitor()) { 
          //--console.log('set recitor',recitor);
            var selectedIndex = 0;
            for (var i = 0; i < this.recitor_select[0].options.length; i++) {
                var option = this.recitor_select[0].options[i];
                if (option.value == recitor) {
                    selectedIndex = i;
                    break;
                }
            }
            this.recitor_select[0].selectedIndex = selectedIndex;
        }
    },
    get_recitor: function() {
        return this.recitor_select[0].options[this.recitor_select[0].selectedIndex].value;
    },
    prev_aya: function() {
        $.quran.trigger('change-aya','prev');
    },
    prev_sura: function() {
        var sura = this.get_sura() - 1;
        if ((sura <= 0) || (sura > 114)) {
            sura = 114;
        }
        $.quran.trigger('change-aya', { sura: sura });
    },
    next_aya: function() {
        $.quran.trigger('change-aya','next');
    },
    next_sura: function() {
        var sura = this.get_sura() + 1;
        if ((sura <= 0) || (sura > 114)) {
            sura = 1;
        }
        $.quran.trigger('change-aya', { sura: sura });
    }
});
$(document).ready(function() {
    $.quran.add_widget('controller');
});
$.widget('quran.player', {
    _init: function() {
      //--console.log('player');
        this.body = $.quran._init_widget(this, {
            name: 'Player',
            bind: {
                'application-state-restored': function() {
                    var aya_obj = $.quran.get_state('aya');
                    var recitor = $.quran.get_state('recitor');
                    if (aya_obj && recitor) {
                        this.set_track(aya_obj,recitor);
                    }
                },
                'aya-changed': this.set_track,
                'sura-changed': this.clear_cache,
                'recitor-changed': function(recitor) {
                    this.set_track(undefined, recitor);
                }
            }
        });

        var my = this;
        my.bind = function(ev, fn) {
            $(my).bind(ev, fn);
        };
        my.one = function(ev, fn) {
            $(my).one(ev, fn);
        };
        my.trigger = function(ev, data) {
            $(my).trigger(ev, data);
        };
        soundManager.onload  = function() {
            function display_play_button() {
                my.play_button.removeClass('pause-button');
                my.play_button.addClass('play-button');
            }
            function display_pause_button() {
                my.play_button.removeClass('play-button');
                my.play_button.addClass('pause-button');
            }
            function turn_button_on() {
                my.play_button.addClass('on');
            }
            function turn_button_off() {
                my.play_button.removeClass('on');
            }
            my.play_button = $('<div class="play-button">')
                .hover(
                    function() {
                        $(this).toggleClass('hover');
                    },
                    function() {
                        $(this).toggleClass('hover');
                    }
                )
                .click(
                    function() {
                        if ($(this).hasClass('play-button')) {
                            turn_button_off();
                            display_pause_button();
                            my.play();
                        } else
                        if ($(this).hasClass('pause-button') && $(this).hasClass('on')) {
                            turn_button_off();
                            my.resume();
                        } else {
                            turn_button_on();
                            my.pause();
                        }
                    }
                )
                .appendTo(my.body)
            ;
            function update_elapsed_time_with(ms) {
                var sec = ms/1000;
                var min = sec/60;
                min = min.toString();
                min = min.replace(/\./,":");
                my.time_elapsed.html(min);
            }
            function update_duration() {
                var ms = my.get_duration_ms();
                var sec =  my.get_duration_sec();
                my.time_duration.html(sec);

                function reinit_position_slider(start,min,max,range_min,range_max) {
                    if (!range_min) {
                        range_min = min;
                    }
                    if (!range_max) {
                        range_max = max;
                    }
                    my.position_slider.slider('destroy');
                    var was_paused;
                    my.position_slider
                        .slider({
                            handle: '.handle.position',
                            min: min,
                            max: max,
                            handles: [{
                                id: '.handle.position',
                                start: start,
                                min: range_min,
                                max: range_max
                            }],
                            animate: false,
                            axis: 'horizontal',
                            slide: function(ev,ui) {
                                if (was_paused) {
                                    update_elapsed_time_with(ui.value);
                                }
                            },
                            start: function(ev,ui) {
                                if (my._handle_mousedown) {
                                    if (!my.get_track().paused && (my.get_track().playState == 1)) {
                                        my.pause();
                                        was_paused = true;
                                    }
                                    my._handle_mousedown = false;
                                }
                            },
                            stop: function(ev,ui) {
                            },
                            change: function(ev,ui) {
                                console.log('change && was_paused?', was_paused);
                                if (my._slider_mousedown) {
                                    my.set_position_ms(ui.value);
                                    my._slider_mousedown = false;
                                }
                                if (was_paused) {
                                    if (!my._handle_mousedown) {
                                        was_paused = false;
                                        my.resume();
                                    }
                                }
                            }
                        })
                    ;
                    my.set_position_ms(start);
                }
                function reinit_range_slider(min,max) {
                    my.range_slider.slider('destroy');
                    my.range_slider
                        .slider({
                            handle: '.handle.range',
                            handles: [{
                                id: '.start',
                                start: min
                            },{
                                id: '.end',
                                start: max
                            }],
                            range: true,
                            axis: 'horizontal',
                            animate: false,
                            min: min,
                            max: max,
                            change: function(ev,ui) {
                                var range_start = my.range_slider.slider('value',0);
                                var range_end   = my.range_slider.slider('value',1);
                                var current_position = my.position_slider.slider('value');
                                var start_position;
                                if (current_position <= range_start) {
                                    start_position = range_start;
                                } else
                                if (current_position >= range_end) {
                                    start_position = range_end;
                                } else {
                                    start_position = current_position;
                                }
                                reinit_position_slider(start_position,0,ms,range_start,range_end);
                            }
                        })
                    ;
                }

                reinit_position_slider(0,0,ms);
                reinit_range_slider(0,ms);
            }
            function update_position(to) {
                function update(sec,ms) {
                    my.time_elapsed.html(sec);
                    if (typeof ms == 'number') {
                        my.position_slider.slider('moveTo', ms);
                    }
                }
                if (to == 'end') {
                    update(my.get_duration_sec(), my.get_duration_ms());
                } else
                if (to == 'start') {
                    update('--:--',0);
                } else {
                    if (!my._slider_mousedown) {
                       update(my.get_position_sec(),my.get_position_ms());
                    } else {
                        update(my.get_position_sec());
                    }
                }
            }









            my.bind('track-changed', function() {
                update_position('start');
                my.time_duration.html('--:--');
                my.position_slider.slider('disable');
                if (my.get_duration_sec()) {
                    update_duration();
                    my.position_slider.slider('enable');
                }
            });
            my.bind('track-played', function() {
                display_pause_button();
            });
            my.bind('track-paused', function() {
                turn_button_on();
            });
            my.bind('track-resumed', function() {
                turn_button_off();
            });
            my.bind('track-stopped', function() {
                display_play_button();
            });

            var transition_from_finish = false;
            my.bind('track-finished', function() {
                update_position('end');
                if (my.get_mode() === 'continuous') {
                    transition_from_finish = true;
                    $.quran.trigger('change-aya','next');
                } else
                if (my.get_mode() === 'single') {
                    display_play_button();
                }
            });
            my.bind('track-playing', function() {
                update_position();
            });
            my.bind('track-loading', function() {
            });
            my.bind('track-loaded', function() {
                update_duration();
                my.position_slider.slider('enable');

                if ((my.get_mode() === 'continuous') && transition_from_finish) {
                    transition_from_finish = false;
                    my.play();
                }
            });






            my.position_slider = $('<div class="position-slider">')
                .mousedown(function() {
                    my._slider_mousedown = true;
                })
            ;
            my.position_slider_handle = $('<div class="handle position">')
                .appendTo(my.position_slider)
                .mousedown(function() {
                    my._handle_mousedown = true;
                })
                .mouseup(function() {
                    my._handle_mousedown = false;
                })
                .mouseover(function() {
                    $(this).addClass('focus');
                    my._handle_mouseover = true;
                })
                .mouseout(function() {
                    $(this).removeClass('focus');
                    my._handle_mouseover = false;
                })
            ;
            my.position_slider
                .appendTo(my.body)
            ;
            my.range_slider = $('<div class="range-slider"><div class="handle range start"></div><div class="handle range end"></div></div>')
                .css({
                    width: my.position_slider.width() - 5
                })
                .appendTo(my.body)
            ;
            my.time_elapsed = $('<div class="time-elapsed">--:--</div>');
            my.time_duration = $('<div class="time-duration">--:--</div>');
            my.volume_slider = $('<div class="volume-slider"><div class="handle"></div></div>')
                .slider({
                    handle: '.handle',
                    axis: 'vertical',
                    min: 0,
                    max: 100,
                    change: function(e,ui) {
                        var value = Math.abs(ui.value-100);
                        if (value !== my.get_volume()) {
                          //--console.log('volume change', value, my.get_volume());
                            my.set_volume(value);
                        }
                    }
                })
                .hide()
            ;
            my.volume_button = $('<div class="volume-button icon-sound">')
                .click(
                    function() {
                        my.volume_slider
                            .css({
                                position: 'fixed',
                                left: $(this).offset().left,
                                top: $(this).offset().top + 16
                            })
                        ;
                        my.volume_slider.slider('moveTo',Math.abs(my.get_volume()-100));
                        my.volume_slider.toggle()
                    }
                )
            ;
            my.more_options_button = $('<div title="More Options" class="more-options-button">')
                .click(
                    function() {
                        my.more_options_menu.css({
                            position: 'fixed',
                            left: $(this).offset().left,
                            top: $(this).offset().top + 16
                        });
                        my.more_options_menu.toggle();
                    }
                )
            ;

            my.more_options_menu = $('<div class="more-options-menu">')
                .hide()
            ;




            function handle_mode(jq_obj, mode) {
                jq_obj.toggleClass('on');
                if (jq_obj.hasClass('on')) {
                    my.set_mode(mode);
                    turn_others_off(jq_obj);
                } else {
                    revert_to_default();
                }
            }
            function turn_others_off(jq_obj) {
                var mode_buttons = [
                    my.single_play_mode_button,
                    my.interval_repeat_mode_button,
                    my.aya_repeat_mode_button,
                    my.sura_repeat_mode_button,
                    my.continuous_play_mode_button
                ];
                $.each(mode_buttons, function(i,obj) {
                    if (obj.hasClass('on') && (jq_obj.attr('class') !== obj.attr('class'))) {
                        obj.removeClass('on');
                    }
                });
            }
            function revert_to_default() {
                my.set_mode('single');
                my.single_play_mode_button.addClass('on');
            }
            my.single_play_mode_button = $('<div title="Single Play Mode" class="single-play-mode-button on">')
                .appendTo(my.more_options_menu)
                .click(function() {
                    handle_mode($(this),'single');
                })
            ;
            my.continuous_play_mode_button = $('<div title="Continuous Play Mode" class="continuous-play-mode-button">')
                .appendTo(my.more_options_menu)
                .click(function() {
                    handle_mode($(this),'continuous');
                })
            ;
            my.interval_repeat_mode_button = $('<div title="Interval Repeat Mode" class="interval-repeat-mode-button">')
                .appendTo(my.more_options_menu)
                .click(function() {
                    handle_mode($(this),'repeat-interval');
                })
            ;
            my.aya_repeat_mode_button = $('<div title="Aya Repeat Mode" class="aya-repeat-mode-button">')
                .appendTo(my.more_options_menu)
                .click(function() {
                    handle_mode($(this),'repeat-aya');
                })
            ;
            my.sura_repeat_mode_button = $('<div title="Sura Repeat Mode" class="sura-repeat-mode-button">')
                .appendTo(my.more_options_menu)
                .click(function() {
                    handle_mode($(this),'repeat-sura');
                })
            ;






            //my.body.append(my.play_button);
            //my.body.append(my.position_slider);
            //my.body.append(my.range_slider);
            my.body.append(my.time_elapsed);
            my.body.append(my.time_duration);
            my.body.append(my.volume_button);
            my.body.append(my.volume_slider);
            my.body.append(my.more_options_button);
            my.body.append(my.more_options_menu);
            my.body.css({
                height: '200px'
            });
        }
    },
    clear_cache: function(sura_obj) {
      //--console.log('clear cache');
        this.stop();
        function get_sura_prefix(sura) {
            var prepend = '';
            sura = sura.toString();

            for (var i = sura.length; i < 3; i++) {
                prepend = prepend.concat('0');
            }
            sura = prepend.concat(sura);

            return sura;
        }
        var clear = $.grep(soundManager.soundIDs, function(id,n) {
            var result = eval("id.match(/^"+ get_sura_prefix(sura_obj.previous) +"/)")? true : false;
            return result;
        });
        $.each(clear, function(n,id) {
            soundManager.destroySound(id);
        });
      //--console.log('cache cleared');
    },
    set_track: function(aya_obj,recitor) {
      //--console.log('set track', aya_obj, recitor);
        if (this.get_track()) {
          //--console.log('if this.get_track()',this.get_track());
            if (this.get_track().playState == 1) {
              //--console.log('if this.get_track().playState == 1',this.get_track().playState);
                this.stop();
            }
        } else {
          //--console.log('no existing track');
        }
        var mp3_id, mp3_url, mp3_name;
        if (aya_obj === undefined) { //recitor change
            aya_obj = $.quran.get_state('aya');
        }
        if (recitor === undefined) { //aya change
            recitor = $.quran.get_state('recitor');
        }
        function get_mp3_name(sura,aya) {
            var prepend;
                
            sura = sura.toString();
            aya = aya.toString();

            prepend = '';
            for (var i = sura.length; i < 3; i++) {
                prepend = prepend.concat('0');
            }
            sura = prepend.concat(sura);

            prepend = '';
            for (var i = aya.length; i < 3; i++) {
                prepend = prepend.concat('0');
            }
            aya = prepend.concat(aya);

            return sura + aya + '.mp3';
        }
        function get_mp3_url(mp3_name) {
            return $.quran.config.mp3_mirrors[0] + recitor + '/' + mp3_name;
        }
        mp3_name = get_mp3_name(aya_obj.sura, aya_obj.aya);
        mp3_url = get_mp3_url(mp3_name);
        mp3_id = mp3_name + ':' + recitor;

        var my = this;
        if (($.inArray(mp3_id, soundManager.soundIDs) == -1)) {
            this._track = soundManager.createSound({
                id: mp3_id,
                url: mp3_url,
                onfinish: function() {
                    my.trigger('track-finished');
                },
                onload: function() {
                    my.trigger('track-loaded');
                },
                onplay: function() {
                    my.trigger('track-played');
                },
                onpause: function() {
                    my.trigger('track-paused');
                },
                onresume: function() {
                    my.trigger('track-resumed');
                },
                onstop: function() {
                    my.trigger('track-stopped');
                },
                whileloading: function() {
                    my.trigger('track-loading');
                },
                whileplaying: function() {
                    my.trigger('track-playing');
                }
            });
        } else {
            this._track = soundManager.getSoundById(mp3_id);
        }
        my.trigger('track-changed');
        //debug
        window.player = this;
        window.sound = this._track;
    },
    get_track: function() {
        return this._track;
    },
    set_range_start: function(start) {
    },
    get_range_start: function() {
        return this._range_start;
    },
    set_range_end: function(end) {
    },
    get_range_end: function() {
        return this._range_end;
    },
    set_position_sec: function(time) {
        this.get_track().setPosition(time*1000);
    },
    set_position_ms: function(position) {
        this.get_track().setPosition(position);
    },
    get_position_sec: function() {
        return this.get_track().position / 1000;
    },
    get_position_ms: function() {
        return this.get_track().position;
    },
    get_duration_sec: function() {
        return this.get_track().duration / 1000;
    },
    get_duration_ms: function() {
        return this.get_track().duration;
    },
    set_volume: function(volume) {
        volume = parseInt(volume);
        this.get_track().setVolume(volume);
        soundManager.defaultOptions.volume = volume;
    },
    get_volume: function() {
        return soundManager.defaultOptions.volume;
    },
    set_mode: function(mode) {
        this._mode = mode;
    },
    get_mode: function() {
        return this._mode || 'single';
    },
    play: function() {
      //--console.log('play');
        this.get_track().play();
    },
    pause: function() {
      //--console.log('pause');
        this.get_track().pause();
    },
    resume: function() {
      //--console.log('resume');
        this.get_track().resume();
    },
    stop: function() {
      //--console.log('stop');
        soundManager.stopAll();
    }
});
$(document).ready(function() {
    $.quran.add_widget('player');
});
})(jQuery);
