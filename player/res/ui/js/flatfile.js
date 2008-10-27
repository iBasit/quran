/****** modules ***********/
(function($) {
    $.widget('ui.quranController', {
        _init: function() {
            quran._controller = this;
          //--console.log('controller');
            this.body = quran._init_widget(this, {
                name: 'Controller',
                bind: {
                    'aya-changed'  : this.set_aya,
                    'sura-changed' : this.set_sura,
                    'recitor-changed': this.set_recitor,
                    'application-state-restored': function() {
                        var obj = quran.get_state('aya');
                        if (obj) {
                            this.set_sura(obj.sura);
                            this.set_aya(obj.aya);
                        }
                        var recitor = quran.get_state('recitor');
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
    
            var self = this;
            function populate_recitors() {
              //--console.log('populate recitors');
                for (var i=0; i < quran.config.recitors.length; i++) {
                    self.recitor_select
                        .append('<option class="recitor" value='+ quran.config.recitors[i][1] +'>'+ quran.config.recitors[i][0] +'</option>');
                }
            }
            function populate_suras() {
              //--console.log('populate suras');
                for (var i=1; i < quran.data.sura.length - 1; i++) {
                     self.sura_select
                        .append('<option class="sura" value='+ i +'>'+ quran.data.sura[i][5] + '</option>');
                }
            }
            function set_defaults() {
                if (!quran.get_state('recitor')) {
                    quran.set_state('recitor', self.recitor_select[0].options[self.recitor_select[0].selectedIndex].value);
                }
                if (!quran.get_state('aya')) {
                    quran.set_state('aya', { id: 1, aya: 1, sura: 1 });
                }
            }
    
            populate_recitors();
            populate_suras();
            set_defaults();
    
            this.recitor_select.change(function() {
              //--console.log('recitor select change setting state');
                quran.trigger('change-recitor', $(this)[0].options[$(this)[0].selectedIndex].value);
            });
            this.sura_select.change(function() {
              //--console.log('sura select change setting state');
                quran.trigger('change', { sura: $(this)[0].options[$(this)[0].selectedIndex].value });
            });
            this.aya_select.change(function() {
              //--console.log('aya select change setting state');
                quran.trigger('change', { id: $(this)[0].options[$(this)[0].selectedIndex].value });
            });
    
            this.body.append(this.recitor_select);
            this.body.append(this.sura_select);
            this.body.append(this.aya_select);
    
            this.body.append($('<div>'));
    
            this.prev_sura_button = $('<div class="icon-resultset-first">&#160;</div>');
            this.prev_aya_button = $('<div class="icon-resultset-previous">&#160;</div>');
            this.next_aya_button = $('<div class="icon-resultset-next">&#160;</div>');
            this.next_sura_button = $('<div class="icon-resultset-last">&#160;</div>');
    
            this.prev_sura_button.click(function() { self.prev_sura.call(self); });
            this.prev_aya_button.click(function() { self.prev_aya.call(self); });
            this.next_aya_button.click(function() { self.next_aya.call(self); });
            this.next_sura_button.click(function() { self.next_sura.call(self); });
    
            this.body.append(this.prev_sura_button);
            this.body.append(this.prev_aya_button);
            this.body.append(this.next_aya_button);
            this.body.append(this.next_sura_button);
        },
        set_aya: function(aya) {
            this.aya_select[0].selectedIndex = aya - 1;
            quran.trigger('aya-set');
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

            this.aya_select.html('');
            for (var i=1; i <= quran.data.sura[sura][1]; i++) {
                var index = quran.data.sura[sura][0] + i;
                this.aya_select
                    .append('<option class="aya" value='+ index +'>'+ i + '</option>');
            }
            this.last_sura = sura;
            quran.trigger('sura-set');
        },
        get_sura: function() {
            return parseInt(this.sura_select[0].options[this.sura_select[0].selectedIndex].value);
        },
        set_recitor: function(recitor) {
            if (recitor != this.get_recitor()) { 
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
            quran.trigger('change','prev');
        },
        prev_sura: function() {
            var sura = this.get_sura() - 1;
            if ((sura <= 0) || (sura > 114)) {
                sura = 114;
            }
            quran.trigger('change', { sura: sura });
        },
        next_aya: function() {
            quran.trigger('change','next');
        },
        next_sura: function() {
            var sura = this.get_sura() + 1;
            if ((sura <= 0) || (sura > 114)) {
                sura = 1;
            }
            quran.trigger('change', { sura: sura });
        }
    });
    
    $(document).ready(function() {
        quran.add_widget('quranController');
    });
    
    
    
    /********** PLAYER ************/
    
    
    $.widget('ui.quranPlayer', {
        _init: function() {
            quran._player = this;
          //--console.log('player');
            this.body = quran._init_widget(this, {
                name: 'Player',
                bind: {
                    'application-state-restored': function() {
                        var obj = quran.get_state('aya');
                        var recitor = quran.get_state('recitor');
                        if (obj && recitor) {
                            this.set_track(obj,recitor);
                        }
                    },
                    'changed': this.set_track,
                    'recitor-changed': function(recitor) {
                        this.set_track(undefined, recitor);
                    }
                }
            });
            var template = $(
                '<div id="player-template" class="sm2player">' +
                    '<div class="ui">' +
                        '<div class="left">' +
                            '<a href="#" title="Pause/Play" onclick="quran.player.togglePause();return false" class="trigger pauseplay"><span></span></a>' +
                        '</div>' +
                        '<div class="mid">' +
                            '<div class="progress"></div>' +
                            '<div class="info"><span class="caption text">%{artist} - %{title} [%{album}], (%{year}) (%{time})</span></div>' +
                            '<div class="default">player</div>' +
                            '<div class="seek">%{action} %{time1} of %{time2} (%{percent}%)</div>' +
                            '<div class="divider">&nbsp;&nbsp;---&nbsp;&nbsp;</div>' +
                            '<a href="#" title="" class="range-start"></a>' +
                            '<a href="#" title="" class="slider"></a>' +
                            '<a href="#" title="" class="range-end"></a>' +
                        '</div>' +
                        '<div class="right">' +
                            '<div class="divider"></div>' +
                            '<div class="time" title="Time">0:00</div>' +
                            '<a href="#" title="Previous" class="trigger prev" onclick="quran.player.oPlaylist.previous();return false"><span></span></a>' +
                            '<a href="#" title="Next" class="trigger next" onclick="quran.player.oPlaylist.next();return false"><span></span></a>' +
                            '<a href="#" title="Auto-Play/Continuous" class="trigger s1 autoplay" onclick="quran.player.toggleAutoPlay();return false"><span></span></a>' +
                            '<a href="#" title="Repeat" class="trigger s2 loop" onclick="quran.player.toggleRepeat();return false"><span></span></a>' +
                            '<a href="#" title="Mute" class="trigger s3 mute" onclick="quran.player.toggleMute();return false"><span></span></a>' +
                            '<a href="#" title="Volume" onmousedown="quran.player.volumeDown(event);return false" onclick="return false" class="trigger s4 volume"><span></span></a>' +
                            '<a href="#" title="Playlist" class="trigger dropdown" onclick="quran.player.togglePlaylist();return false"><span></span></a>' +
                        '</div>' +
                    '</div>' +
                    '<div class="sm2playlist-box">' +
                        '<div id="playlist-template" class="sm2playlist">' +
                            '<div class="hd"><div class="c"></div></div>' +
                            '<div class="bd">' +
                                '<ul>' +
                                '</ul>' +
                            '</div>' +
                            '<div class="ft"><div class="c"></div></div>' +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
            this.body.append(template);
            var self = this;
            self.bind = function(ev, fn) {
                $(self).bind(ev, fn);
            };
            self.one = function(ev, fn) {
                $(self).one(ev, fn);
            };
            self.trigger = function(ev, data) {
                $(self).trigger(ev, data);
            };
        },
        set_track: function(obj,recitor) {
          /*
          //--console.log('set track', obj, recitor);
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
            if (obj === undefined) { //recitor change
                obj = quran.get_state('aya');
            }
            if (recitor === undefined) { //aya change
                recitor = quran.get_state('recitor');
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
                return quran.config.mp3_mirrors[0] + recitor + '/' + mp3_name;
            }
            mp3_name = get_mp3_name(obj.sura, obj.aya);
            mp3_url = get_mp3_url(mp3_name);
            mp3_id = mp3_name + ':' + recitor;
    
            var self = this;
            if (($.inArray(mp3_id, soundManager.soundIDs) == -1)) {
                this._track = soundManager.createSound({
                    id: mp3_id,
                    url: mp3_url,
                    onfinish: function() {
                        self.trigger('track-finished');
                    },
                    onload: function() {
                        self.trigger('track-loaded');
                    },
                    onplay: function() {
                        self.trigger('track-played');
                    },
                    onpause: function() {
                        self.trigger('track-paused');
                    },
                    onresume: function() {
                        self.trigger('track-resumed');
                    },
                    onstop: function() {
                        self.trigger('track-stopped');
                    },
                    whileloading: function() {
                        self.trigger('track-loading');
                    },
                    whileplaying: function() {
                        self.trigger('track-playing');
                    }
                });
            } else {
                this._track = soundManager.getSoundById(mp3_id);
            }
            self.trigger('track-changed');
            */
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
        quran.add_widget('quranPlayer');
    });
})(jQuery);
/*
$.widget('quran.player', {
    _init: function() {
      //--console.log('player');
        this.body = quran._init_widget(this, {
            name: 'Player',
            bind: {
                'application-state-restored': function() {
                    var obj = quran.get_state('aya');
                    var recitor = quran.get_state('recitor');
                    if (obj && recitor) {
                        this.set_track(obj,recitor);
                    }
                },
                'changed': this.set_track,
                'sura-changed': this.clear_cache,
                'recitor-changed': function(recitor) {
                    this.set_track(undefined, recitor);
                }
            }
        });

        var self = this;
        self.bind = function(ev, fn) {
            $(self).bind(ev, fn);
        };
        self.one = function(ev, fn) {
            $(self).one(ev, fn);
        };
        self.trigger = function(ev, data) {
            $(self).trigger(ev, data);
        };
        soundManager.onload  = function() {
            function display_play_button() {
                self.play_button.removeClass('pause-button');
                self.play_button.addClass('play-button');
            }
            function display_pause_button() {
                self.play_button.removeClass('play-button');
                self.play_button.addClass('pause-button');
            }
            function turn_button_on() {
                self.play_button.addClass('on');
            }
            function turn_button_off() {
                self.play_button.removeClass('on');
            }
            self.play_button = $('<div class="play-button">')
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
                            self.play();
                        } else
                        if ($(this).hasClass('pause-button') && $(this).hasClass('on')) {
                            turn_button_off();
                            self.resume();
                        } else {
                            turn_button_on();
                            self.pause();
                        }
                    }
                )
                .appendTo(self.body)
            ;
            function update_elapsed_time_with(ms) {
                var sec = ms/1000;
                var min = sec/60;
                min = min.toString();
                min = min.replace(/\./,":");
                self.time_elapsed.html(min);
            }
            function update_duration() {
                var ms = self.get_duration_ms();
                var sec =  self.get_duration_sec();
                self.time_duration.html(sec);

                function reinit_position_slider(start,min,max,range_min,range_max) {
                    if (!range_min) {
                        range_min = min;
                    }
                    if (!range_max) {
                        range_max = max;
                    }
                    self.position_slider.slider('destroy');
                    var was_paused;
                    self.position_slider
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
                                if (self._handle_mousedown) {
                                    if (!self.get_track().paused && (self.get_track().playState == 1)) {
                                        self.pause();
                                        was_paused = true;
                                    }
                                    self._handle_mousedown = false;
                                }
                            },
                            stop: function(ev,ui) {
                            },
                            change: function(ev,ui) {
                                //--console.log('change && was_paused?', was_paused);
                                if (self._slider_mousedown) {
                                    self.set_position_ms(ui.value);
                                    self._slider_mousedown = false;
                                }
                                if (was_paused) {
                                    if (!self._handle_mousedown) {
                                        was_paused = false;
                                        self.resume();
                                    }
                                }
                            }
                        })
                    ;
                    self.set_position_ms(start);
                }
                function reinit_range_slider(min,max) {
                    self.range_slider.slider('destroy');
                    self.range_slider
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
                                var range_start = self.range_slider.slider('value',0);
                                var range_end   = self.range_slider.slider('value',1);
                                var current_position = self.position_slider.slider('value');
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
                    self.time_elapsed.html(sec);
                    if (typeof ms == 'number') {
                        self.position_slider.slider('moveTo', ms);
                    }
                }
                if (to == 'end') {
                    update(self.get_duration_sec(), self.get_duration_ms());
                } else
                if (to == 'start') {
                    update('--:--',0);
                } else {
                    if (!self._slider_mousedown) {
                       update(self.get_position_sec(),self.get_position_ms());
                    } else {
                        update(self.get_position_sec());
                    }
                }
            }









            self.bind('track-changed', function() {
                update_position('start');
                self.time_duration.html('--:--');
                self.position_slider.slider('disable');
                if (self.get_duration_sec()) {
                    update_duration();
                    self.position_slider.slider('enable');
                }
            });
            self.bind('track-played', function() {
                display_pause_button();
            });
            self.bind('track-paused', function() {
                turn_button_on();
            });
            self.bind('track-resumed', function() {
                turn_button_off();
            });
            self.bind('track-stopped', function() {
                display_play_button();
            });

            var transition_from_finish = false;
            self.bind('track-finished', function() {
                update_position('end');
                if (self.get_mode() === 'continuous') {
                    transition_from_finish = true;
                    quran.trigger('change','next');
                } else
                if (self.get_mode() === 'single') {
                    display_play_button();
                }
            });
            self.bind('track-playing', function() {
                update_position();
            });
            self.bind('track-loading', function() {
            });
            self.bind('track-loaded', function() {
                update_duration();
                self.position_slider.slider('enable');

                if ((self.get_mode() === 'continuous') && transition_from_finish) {
                    transition_from_finish = false;
                    self.play();
                }
            });






            self.position_slider = $('<div class="position-slider">')
                .mousedown(function() {
                    self._slider_mousedown = true;
                })
            ;
            self.position_slider_handle = $('<div class="handle position">')
                .appendTo(self.position_slider)
                .mousedown(function() {
                    self._handle_mousedown = true;
                })
                .mouseup(function() {
                    self._handle_mousedown = false;
                })
                .mouseover(function() {
                    $(this).addClass('focus');
                    self._handle_mouseover = true;
                })
                .mouseout(function() {
                    $(this).removeClass('focus');
                    self._handle_mouseover = false;
                })
            ;
            self.position_slider
                .appendTo(self.body)
            ;
            self.range_slider = $('<div class="range-slider"><div class="handle range start"></div><div class="handle range end"></div></div>')
                .css({
                    width: self.position_slider.width() - 5
                })
                .appendTo(self.body)
            ;
            self.time_elapsed = $('<div class="time-elapsed">--:--</div>');
            self.time_duration = $('<div class="time-duration">--:--</div>');
            self.volume_slider = $('<div class="volume-slider"><div class="handle"></div></div>')
                .slider({
                    handle: '.handle',
                    axis: 'vertical',
                    min: 0,
                    max: 100,
                    change: function(e,ui) {
                        var value = Math.abs(ui.value-100);
                        if (value !== self.get_volume()) {
                          //--console.log('volume change', value, self.get_volume());
                            self.set_volume(value);
                        }
                    }
                })
                .hide()
            ;
            self.volume_button = $('<div class="volume-button icon-sound">')
                .click(
                    function() {
                        self.volume_slider
                            .css({
                                position: 'fixed',
                                left: $(this).offset().left,
                                top: $(this).offset().top + 16
                            })
                        ;
                        self.volume_slider.slider('moveTo',Math.abs(self.get_volume()-100));
                        self.volume_slider.toggle()
                    }
                )
            ;
            self.more_options_button = $('<div title="More Options" class="more-options-button">')
                .click(
                    function() {
                        self.more_options_menu.css({
                            position: 'fixed',
                            left: $(this).offset().left,
                            top: $(this).offset().top + 16
                        });
                        self.more_options_menu.toggle();
                    }
                )
            ;

            self.more_options_menu = $('<div class="more-options-menu">')
                .hide()
            ;




            function handle_mode(jq_obj, mode) {
                jq_obj.toggleClass('on');
                if (jq_obj.hasClass('on')) {
                    self.set_mode(mode);
                    turn_others_off(jq_obj);
                } else {
                    revert_to_default();
                }
            }
            function turn_others_off(jq_obj) {
                var mode_buttons = [
                    self.single_play_mode_button,
                    self.interval_repeat_mode_button,
                    self.aya_repeat_mode_button,
                    self.sura_repeat_mode_button,
                    self.continuous_play_mode_button
                ];
                $.each(mode_buttons, function(i,obj) {
                    if (obj.hasClass('on') && (jq_obj.attr('class') !== obj.attr('class'))) {
                        obj.removeClass('on');
                    }
                });
            }
            function revert_to_default() {
                self.set_mode('single');
                self.single_play_mode_button.addClass('on');
            }
            self.single_play_mode_button = $('<div title="Single Play Mode" class="single-play-mode-button on">')
                .appendTo(self.more_options_menu)
                .click(function() {
                    handle_mode($(this),'single');
                })
            ;
            self.continuous_play_mode_button = $('<div title="Continuous Play Mode" class="continuous-play-mode-button">')
                .appendTo(self.more_options_menu)
                .click(function() {
                    handle_mode($(this),'continuous');
                })
            ;
            self.interval_repeat_mode_button = $('<div title="Interval Repeat Mode" class="interval-repeat-mode-button">')
                .appendTo(self.more_options_menu)
                .click(function() {
                    handle_mode($(this),'repeat-interval');
                })
            ;
            self.aya_repeat_mode_button = $('<div title="Aya Repeat Mode" class="aya-repeat-mode-button">')
                .appendTo(self.more_options_menu)
                .click(function() {
                    handle_mode($(this),'repeat-aya');
                })
            ;
            self.sura_repeat_mode_button = $('<div title="Sura Repeat Mode" class="sura-repeat-mode-button">')
                .appendTo(self.more_options_menu)
                .click(function() {
                    handle_mode($(this),'repeat-sura');
                })
            ;






            //self.body.append(self.play_button);
            //self.body.append(self.position_slider);
            //self.body.append(self.range_slider);
            self.body.append(self.time_elapsed);
            self.body.append(self.time_duration);
            self.body.append(self.volume_button);
            self.body.append(self.volume_slider);
            self.body.append(self.more_options_button);
            self.body.append(self.more_options_menu);
            self.body.css({
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
    set_track: function(obj,recitor) {
      //--console.log('set track', obj, recitor);
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
        if (obj === undefined) { //recitor change
            obj = quran.get_state('aya');
        }
        if (recitor === undefined) { //aya change
            recitor = quran.get_state('recitor');
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
            return quran.config.mp3_mirrors[0] + recitor + '/' + mp3_name;
        }
        mp3_name = get_mp3_name(obj.sura, obj.aya);
        mp3_url = get_mp3_url(mp3_name);
        mp3_id = mp3_name + ':' + recitor;

        var self = this;
        if (($.inArray(mp3_id, soundManager.soundIDs) == -1)) {
            this._track = soundManager.createSound({
                id: mp3_id,
                url: mp3_url,
                onfinish: function() {
                    self.trigger('track-finished');
                },
                onload: function() {
                    self.trigger('track-loaded');
                },
                onplay: function() {
                    self.trigger('track-played');
                },
                onpause: function() {
                    self.trigger('track-paused');
                },
                onresume: function() {
                    self.trigger('track-resumed');
                },
                onstop: function() {
                    self.trigger('track-stopped');
                },
                whileloading: function() {
                    self.trigger('track-loading');
                },
                whileplaying: function() {
                    self.trigger('track-playing');
                }
            });
        } else {
            this._track = soundManager.getSoundById(mp3_id);
        }
        self.trigger('track-changed');
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
    quran.add_widget('player');
});
})(jQuery);
*/
