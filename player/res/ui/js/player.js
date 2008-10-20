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



            $.quran.bind('state-change', function(ev,data) {
                widget.data = widget._get_data();
                console.log('state-change', ev,data);
            });



            widget.ui = new Object();

            widget.ui.body = $.quran.create_widget({
                widget: widget,
                title: options.title
            });

            widget.ui.body.html(
                widget._make_inner_body()
            );


            /*
            widget.ui.pause_icon = widget.ui.body.find('.icon-control-pause').click(function() {
                $(this).addClass('on');
                widget.sound.pause(widget.data.id);
            });
            */
            widget.ui.play_icon = widget.ui.body.find('.icon-control-play').click(function() {
                $(this).addClass('on');
                widget.play_mp3(widget.data);
            });
            widget.ui.position_slider = widget.ui.body.find('.position-slider').slider({
                handle: '.position-slider-handle',
                axis: 'horizontal',
            });
            widget.ui.volume_slider = widget.ui.body.find('.volume-slider').slider({
                handle: '.volume-slider-handle',
                axis: 'vertical',
            }).hide();
            /*
            widget.ui.repeat_icon = widget.ui.body.find('.icon-control-repeat').click(function() {
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
            */
            widget._init_sound();
        },
        _make_inner_body: function() {
            var widget = this;
            var inner_body = $(
                '<div class="icon-control-play">&#160;</div>' + // play, pause, stop all in one
                '<div class="position-slider">' +
                    '<div class="position-slider-handle"></div>' +
                '</div>' +
                // time played / time total
                // volume icon <--
                '<div class="volume-slider">' +
                    '<div class="volume-slider-handle"></div>' +
                '</div>'
                // some other icon
                // other options slide out
                // i.e. familiar youtube layout
                // rating stars hm
            );

            return inner_body;
        },
        _get_data: function() {
            var prepend_zeros, sura_number, aya_number, mp3_id, mp3_url, mp3_data = new Object();
                
            sura_number = $.quran.get_state('sura');
            aya_number  = $.quran.get_state('aya');

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

            //console.log(mp3_data);

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
            //console.log('load_mp3',data,play);
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
                        widget.play_mp3(widget.data);
                },
                onplay: function() {
                    console.log('onplay');
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
                    widget.ui.play_icon.removeClass('on');

                    // if continuous is on, play the next ayah
                    if (widget.play_mode == 'continuous') {
                        $.quran.trigger('next-aya');
                        var data = widget._get_data();
                        widget.load_mp3(widget.data,true);
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
            if (($.inArray(widget.data.id, widget.sound.soundIDs) == -1) || (widget.last_url != data.url)) {
                // if the sound id is not in the sound manager
                // then call the load function with the 'play'
                // parameter set to true, which calls this function
                // back on the soundmanager's onload event

                if (widget.last_url != data.url) // temporary quick hackish diversion from design pattern
                    widget.sound.destroySound(widget.data.id);

                widget.last_url = data.url;
                widget.load_mp3(widget.data,true);
            } else { 
                // otherwise just play it
                widget.sound.play(widget.data.id);
            }
        },
        pause_mp3: function(data) {
            var widget = this;
        },
        resume_mp3: function(data) {
            var widget = this;
            widget.sound.resume(widget.data.id);
        }
    });

    $.extend('ui.quranPlayer', {
        version: '0.1',
        defaults: {
        }
    });

})(jQuery);
