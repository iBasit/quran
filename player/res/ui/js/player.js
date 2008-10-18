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


    $.widget('ui.quranPlayer', {
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

            widget.ui.volume_slider = widget.ui.body.find('.volume-slider').slider({
                handle: '.volume-slider-handle',
                axis: 'vertical',
            }).hide();

            widget.ui.position_slider = widget.ui.body.find('.position-slider').slider({
                handle: '.position-slider-handle',
                axis: 'horizontal',
            });

            widget.ui.play_icon = widget.ui.body.find('.icon-control-play').click(function() {
                var data = widget._mp3_data();
                //console.log(data.url);
                widget.play_mp3(data);
            });

            widget.ui.repeat_icon = widget.ui.body.find('.icon-control-repeat').click(function() {
                // set continuous/loop/repeat mode
                widget.ui.repeat_icon.toggleClass('on');
            });

            widget.ui.volume_icon = widget.ui.body.find('.icon-control-equalizer').click(function() {
                // show the vertical slider and make it control volume
                widget.ui.volume_icon.toggleClass('on');
                widget.ui.volume_slider.toggle();
            });

            widget.ui.continuous_icon = widget.ui.body.find('.icon-tux').click(function() {
                $(this).toggleClass('on');
                widget.play_mode = 'continuous';
            });

            widget._init_sound();
        },
        _make_inner_body: function() {
            var widget = this;
            var inner_body = $(
                '<div class="icon-control-start">&#160;</div>' + // loop
                '<div class="icon-control-rewind">&#160;</div>' + // loop
                '<div class="icon-control-fastforward">&#160;</div>' + // loop
                '<div class="icon-control-end">&#160;</div>' + // loop
                '<div class="icon-control-stop">&#160;</div>' + // loop
                '<div class="icon-control-play">&#160;</div>' + // play, pause, stop all in one
                '<div class="icon-control-pause">&#160;</div>' + // loop
                '<div class="icon-control-repeat">&#160;</div>' + // loop
                '<div class="icon-control-equalizer">&#160;</div>' + // volume
                '<div class="icon-tux">&#160;</div>' + // continuous
                '<div class="icon-star">&#160;</div>' + // undecided yet
                '<div class="position-slider">' +
                    '<div class="position-slider-handle"></div>' +
                '</div>' +
                '<div class="volume-slider">' +
                    '<div class="volume-slider-handle"></div>' +
                '</div>'
            );

            return inner_body;
        },
        _mp3_data: function() {
            var prepend_zeros, sura_number, aya_number, mp3_id, mp3_url, mp3_data = new Object();
                
            sura_number = $.quran.state.sura;
            aya_number  = $.quran.state.aya;

            sura_number  = sura_number.toString();
            aya_number   = aya_number.toString();

            prepend_zeros = '';
            for (var i = sura_number.length; i < 3; i++) {
                prepend_zeros = prepend_zeros.concat('0');
            }
            sura_number = prepend_zeros.concat(sura_number);

            prepend_zeros = '';
            for (var i = aya_number.length; i < 3; i++) {
                prepend_zeros = prepend_zeros.concat('0');
            }
            aya_number = prepend_zeros.concat(aya_number);

            mp3_id  = sura_number + aya_number + '.mp3';
            mp3_url = $.quran.get_state('mirror') + $.quran.get_state('recitor') + '/' + mp3_id;

            mp3_data = {
                id  : mp3_id,
                url : mp3_url
            };

            console.log(mp3_data);

            return mp3_data;
        },
        _init_sound: function() {
            var widget = this;
            // the only thing being done here is creating
            // an internal pointer to the soundManager instance
            widget.sound = soundManager;
        },
        load_mp3: function(data, play) {
            var widget = this;
            console.log('load_mp3',data,play);
            widget.sound.createSound({
                id: data.id,
                url: data.url,
                onload: function() {
                    console.log('onload');
                    var sound = this;
                    widget.ui.position_slider.slider('destroy');
                    widget.ui.position_slider.slider({
                        handle: '.position-slider-handle',
                        axis: 'horizontal',
                        min: 0,
                        max: sound.durationEstimate
                    });
                    if (play)
                        widget.play_mp3(data);
                },
                onplay: function() {
                    console.log('onplay');
                    widget.ui.play_icon.toggleClass('on');
                },
                onpause: function() {
                    console.log('onpause');
                },
                onresume: function() {
                    console.log('onresume');
                },
                onstop: function() {
                    console.log('onstop');
                },
                onfinish: function() {
                    console.log('onfinish');
                    widget.ui.play_icon.toggleClass('on');

                    // if continuous is on, play the next ayah
                    if (widget.play_mode == 'continuous') {
                        $.quran.trigger('nextaya');
                        var data = widget._mp3_data();
                        widget.load_mp3(data,true);
                    }
                },
                onjustbeforefinish: function() {
                    console.log('onjustbeforefinish');
                },
                onbeforefinishcomplete: function() {
                    console.log('onbeforefinishcomplete');
                },
                onbeforefinish: function() {
                    console.log('onbeforefinish');
                },
                onid3: function() {
                    console.log('onid3');
                },
                whileplaying: function() {
                    var sound = this;
                    widget.ui.position_slider.slider('moveTo',sound.position)
                }
            });
        },
        play_mp3: function(data) {
            var widget = this;
            if (($.inArray(data.id, widget.sound.soundIDs) == -1) || (widget.last_url != data.url)) {
                // if the sound id is not in the sound manager
                // then call the load function with the 'play'
                // parameter set to true, which calls this function
                // back on the soundmanager's onload event

                if (widget.last_url != data.url) // temporary quick hackish diversion from design pattern
                    widget.sound.destroySound(data.id);

                widget.last_url = data.url;
                widget.load_mp3(data,true);
            } else { 
                // otherwise just play it
                widget.sound.play(data.id);
            }
        },
        pause_mp3: function(data) {
            var widget = this;
            widget.sound.pause(data.id);
        },
        resume_mp3: function(data) {
            var widget = this;
            widget.sound.resume(data.id);
        }
    });

    $.extend('ui.quranPlayer', {
        version: '0.1',
        defaults: {
        }
    });

})(jQuery);
