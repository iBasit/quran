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
    

    /* internal api */

    // application-level events
    $.quran.trigger = function(ev,data) {
        $($.quran).trigger(ev,data);
    };
    $.quran.bind = function(ev,fn) {
        $($.quran).bind(ev,fn);
    }; 

    // application-level state
    $.quran.state = new Object();

    $.quran.get_state = function(key) {
        return $.quran.state[key] || false;
    };

    $.quran.set_state = function(key, value) {
        $.quran.state[key] = value;
    };

    $.quran.restore_state = function() {
        console.log('restore_state');
        if ($.cookie('keys')) {
            var keys_object = $.cookie('keys').split(',');
            $.each(keys_object, function(n,key) {
                $.quran.set_state(key, $.cookie(key));
            });
        }

        $.quran.trigger('state-restored');
    };

    $.quran.save_state = function() {
        var keys = new Array();
        for (var key in $.quran.state) {
            keys.push(key);
            $.cookie(key, $.quran.state[key]);
        }
        $.cookie('keys',keys);
    };

    // user interface notification
    $.quran.notify_user = function(options) {
    };

    // standard widget composition
    $.quran.widgets = new Object();

    $.quran.create_widget = function(options) {
        var widget = options.widget;
        var title = options.title;

        $.quran.widgets[widget.widgetName] = widget;

        var element   = $('<div class="widget">');
        var head      = $('<div class="head">'+ title +'</div>');
        var body      = $('<div class="body">');

        element
            .append(head)
            .append(body);

        widget.element
            .append(element);

        return body;
    };


    // private
    function doSomething() {
    };

    // browser events
    $(window).load(function() {
        // restore state from cookies
        console.log('load');
        function get_working_mirror() {
            // this should ping mirrors and check paths
            return $.quran.config.mp3_mirrors[0]; // just return the first thing for now
        };
        var mirror = get_working_mirror();
        $.quran.set_state('mirror', mirror);

        $.quran.restore_state();
    });
    $(window).unload(function() {
        // save state in cookies
        $.quran.save_state();
    });
    $(window).resize(function() {
        // resize the app components to fit if they don't behave elastically
    });
    $(window).scroll(function() {
        // attempt to reposition window to 0, 0
    });
    $(window).error(function(msg, url, line) {
        // maybe send an ajax post to our server so that we can log it
    });


    /* run-time */
    $(document).ready(function() {
        console.log('ready');
        $(document.body).quranController({
            title: 'Quran Controller'
        });
        $(document.body).quranPlayer({
            title: 'Quran Player'
        });
    });

})(jQuery);
