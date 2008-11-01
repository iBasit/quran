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
    quran.config = {};

    $.extend(quran.config, {
        /*
        mirrors: [
            'http://dev.globalquran.com/audio/www.everyayah.com/data/',
            'http://everyayah.com/data/'
        ],
        */
        /* mirrors has been replaced with config.mirrors.js, a file whose data is refreshed
           periodically via a cron job that runs config.mirrors.php, pinging the mirrors, 
           getting their http status (200, 404, etc), and writing the resultant js file */

        // todo: extract recitors to a similar script which recurses the directories and finds
        // complete verse-by-verse mp3s
        recitors: [ // [name, path]
            { name: 'Muhamad Ayyoub', path: 'Muhammad_Ayyoub_128kbps' },
            { name: 'Hudhaify', path: 'Hudhaify_128kbps' },
            { name: 'Alafasy', path: 'Alafasy_128kbps' },
            { name: 'Abdullah Basfar', path: 'Abdullah_Basfar_192kbps' },
            { name: 'Abu Bakr Ash-Shatree', path: 'Abu%20Bakr%20Ash-Shaatree_128kbps' },
            { name: 'Abdul Basit Murattal', path: 'Abdul_Basit_Murattal_192kbps' }
        ]
    });

})(jQuery);
