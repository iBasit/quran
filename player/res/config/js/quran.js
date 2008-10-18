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

    // setup namespace
    $.quran = new function(){};

    $.extend($.quran, {
        _version : '2.0',
        _notice  : 'Project Quran.com, Copyleft 2008 GPL',
        _mode    : 'development'
    });

    $.quran.config = new Object();

    $.extend($.quran.config, {
        mp3_mirrors: [
            'http://dev.globalquran.com/audio/www.everyayah.com/data/'
        ],
        recitors: [
            ['Muhamad Ayyoub', 'Muhammad_Ayyoub_128kbps'],
            ['Hudhaify', 'Hudhaify_128kbps'],
            ['Alafasy', 'Alafasy_128kbps'],
            ['Abdullah Basfar', 'Abdullah_Basfar_192kbps'],
            ['Abu Bakr Ash-Shatree', 'Abu%20Bakr%20Ash-Shaatree_128kbps'],
            ['Abdul Basit Murattal', 'Abdul_Basit_Murattal_192kbps']
        ]
    });

})(jQuery);
