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

    // e.g. temporary placed here as an example, 
    // hopefully not more confusing then beneficial;
    // the code for these should go in the widget that created them
    // todo: extract all this sura/aya selection stuff out of here and put it in the control widget
    $.quran.bind('selectsura',function(ev,data) {
        $.quran.state.sura = data;
    });
    $.quran.bind('selectaya',function(ev,data) {
        //console.log('selectaya',data);
        $.quran.state.aya   = data.number;
        $.quran.state.index = data.index;
    });
    $.quran.bind('nextaya',function() {
        $('#aya').map(function() {
            var dom = $(this)[0];
            var next = dom.selectedIndex+1;
            if (dom.options[next]) {
                this.selectedIndex = next;
                var index = parseInt(dom.value);
                var number = parseInt($(dom.options[next]).text());
                $.quran.trigger('selectaya', {
                    index: index,
                    number: number
                });
            }
        });
    });
    $.quran.bind('selectrecitor', function(ev,data) {
        // generically set it to the first listing for now
        // todo: dynamically set this based on existence
        var mirror = $.quran.config.mp3_mirrors[0];
        $.quran.state.mp3_url = mirror + data + '/';
    });

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

    });
    $(window).resize(function() {
        // resize the app components to fit if they don't behave elastically
    });
    $(window).scroll(function() {
        // attempt to reposition window to 0, 0
    });
    $(window).unload(function() {
        // maybe some garbage collection? who knows
    });
    $(window).error(function(msg, url, line) {
        // maybe send an ajax post to our server so that we can log it
    });


    /* run-time */
    $(document).ready(function() {
        $(document.body).quranPlayer({
            title: 'Quran Player'
        });
    });

})(jQuery);
