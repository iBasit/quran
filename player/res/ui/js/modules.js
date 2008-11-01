(function(sm) {
(function(q) {
(function($) {
/****** modules ***********/
    $.widget('ui.quranController', {
        _init: function() {
            quran._controller = this;
          //--console.log('controller');
            this.body = quran._init_widget(this, {
                name: 'Controller',
                bind: {
                    'aya-changed'  : this.set_aya,
                    'sura-changed' : this.set_sura,
                    'application-state-restored': function() {
                        var obj = quran.get_state('aya');
                        if (obj) {
                            this.set_sura(obj.sura);
                            this.set_aya(obj.aya);
                        }
                        /*
                        var recitor = quran.get_state('recitor');
                        if (recitor) {
                            this.set_recitor(recitor);
                        }
                        */
                    }
                }
            });
    
            this.body.css({
                height: '60px'
            });
    
            this.locale_select = $('<select>');
            this.translation_select = $('<select>');
            this.pronounciation_select = $('<select>');
            this.tafseer_select = $('<select>');
            this.font_select = $('<select>');
            //this.recitor_select = $('<select>');
            this.sura_select = $('<select>');
            this.aya_select = $('<select>');
    
            var self = this;
                    /*
            //function populate_recitors() {
              //--console.log('populate recitors');

                    self.recitor_select
                        .append('<option class="recitor" value='+ quran.config.recitors[i][1] +'>'+ quran.config.recitors[i][0] +'</option>');
            //}
                    */
            function populate_suras() {
              //--console.log('populate suras');
                for (var i=1; i < quran.data.sura.length - 1; i++) {
                     self.sura_select
                        .append('<option class="sura" value='+ i +'>'+ quran.data.sura[i][5] + '</option>');
                }
            }
            function set_defaults() {
                //if (!quran.get_state('recitor')) {
                    //quran.set_state('recitor', self.recitor_select[0].options[self.recitor_select[0].selectedIndex].value);
                //}
                if (!quran.get_state('aya')) {
                    quran.set_state('aya', { id: 1, aya: 1, sura: 1 });
                }
            }
    
            //populate_recitors();
            populate_suras();
            set_defaults();
    
            //this.recitor_select.change(function() {
              //--console.log('recitor select change setting state');
                //quran.trigger('change-recitor', $(this)[0].options[$(this)[0].selectedIndex].value);
            //});
            this.sura_select.change(function() {
              //--console.log('sura select change setting state');
                quran.trigger('change', { sura: $(this)[0].options[$(this)[0].selectedIndex].value });
            });
            this.aya_select.change(function() {
              //--console.log('aya select change setting state');
                quran.trigger('change', { id: $(this)[0].options[$(this)[0].selectedIndex].value });
            });
    
            //this.body.append(this.recitor_select);
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
        /*
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
        */
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
    



    /************ QURAN ************/

$.fn.verse_panel = function(config) {
    var self = this;

    this.xml     = null;
    this.type    = config.type    || 'quran';
    this.id      = config.id      || 1;
    this.count   = config.count   || 10;
    this.size    = config.size    || 12;
    this.display = config.display || 'inline';
    this.css     = config.css     || {};
    this.cls     = config.cls     || null;

    this.set_count = function(n) {
    };

    this.set_font = function(font) {
    };

    this.set_size = function(size) {
        self.each(function() {
            var o = $(this);
            var oBody = o.find('.b');
            var oHead = o.find('.h');
            var oFoot = o.find('.f');

            oBody.find('.aya').each(function() {
                var aya = $(this);
                aya.css({
                    'font-size': self.size + 'pt'
                });
            });
        });
    };

    this.set_style = function(style) {
    };

    this.set_content = function() {
        self.each(function() {
            var o = $(this);
            var oBody = o.find('.b');
            var oHead = o.find('.h');
            var oFoot = o.find('.f');

            oBody.html('');
            oHead.html('');

            var sura_start_index, sura_end_index, aya_start_index, aya_end_index;

            var suras = $(self.xml).find('sura');
            suras.each(function(n) {
                var sura = $(this);
                if (n == 0) {
                    sura_start_index = sura.attr('index');
                }
                if (n == suras.length - 1) {
                    sura_end_index = sura.attr('index');
                }
            });

            var ayas = $(self.xml).find('aya');
            ayas.each(function(n) {
                var aya = $(this);
                if (n == 0) {
                    aya_start_index = aya.attr('index');
                }
                if (n == ayas.length - 1) {
                    aya_end_index = aya.attr('index');
                }

                var aya_div = $('<span name="'+ aya.attr('id') +'" title="'+ aya.attr('index') +'" class="aya aya-'+ aya.attr('id') +'">'+ aya.text() +'</span>');

                aya_div.mousedown(function() {
                    var div = $(this);
                    var id = parseInt(div.attr('name'));
                    q.d.bug('clicked aya id ',id);
                    quran.trigger('change', { id: id });
                });

                oBody.append(aya_div);

                self.set_active();
            });

            var title = $('<span>'+ sura_start_index +':'+ aya_start_index +' - '+ sura_end_index +':'+ aya_end_index + '</span>');
            oHead.append(title);
        });
    };

    this.set_active = function() {
        try {
            self.each(function() {
                var o = $(this);
                var oBody = o.find('.b');
                var oHead = o.find('.h');
                var oFoot = o.find('.f');
                var oAya  = oBody.find('.aya-'+ self.id);

                o.find('.aya').removeClass('active');

                oAya.addClass('active');

                var offset = oAya.position().top;
                var center = oBody.height()/2;

                if ((offset > oBody.height()) || (offset < 0)) {
                    oAya[0].scrollIntoView()
                }
            });
        } catch(e) {
            q.d.bug(e);
        }
    }

    this.load = function(id,count) {
        if ((self.id === undefined) || (self.count === undefined) || (typeof self.id != 'number') || (typeof self.count != 'number')) {
            return false;
        }
        $.ajax({
            type: 'POST',
            url: '/old_quran/public/page/get',
            data: {
                id: self.id,
                count: self.count,
                type: self.type
            },
            dataType: 'xml',
            success: function(r) {
                self.xml = r;
                self.set_content();
            }
        });
    };

    this.init = function() {
        q.bind('application-state-restored', function() {
            var aya = q.get_state('aya');
            self.id = aya.id;
            self._last_id = self.id;
            self._last_loaded_count = self.count;
            self.load();
        });
        q.bind('aya-changed', function(ev,aya) {
            var aya = q.get_state('aya');

            self.id = aya.id;

            if ((self.id - self._last_id >= self.count) || (self.id < self._last_id)) {
                self.load();
                self._last_id = self.id;
            } else {
                self.set_active();
            }
        });
        q.bind('sura-changed', function(ev,sura) {
            var aya = q.get_state('aya');
            self.id = aya.id;
            self.load();
        });

        self.set_size();

        $[self.type] = self;
    };


    self.init();

    return this.each(function() {
        // all css is temporary, will remove and extrapolate to css before production

        var o = $(this);

        var oHead = $('<div class="h">');
        var oBody = $('<div class="b">');
        var oFoot = $('<div class="f">');

        o.css(self.css);

        var left   = $('<div class="l">');
        var center = $('<div class="c">');
        var right  = $('<div class="r">');

        var dec  = $('<div class="trigger font-decrease"><a href="#" onclick="return false;"><span>-</span></a></div>')
            .appendTo(left)
        ;
        var size = $('<input class="input-text" type="text" value="'+ self.size +'"/>')
            .appendTo(left)
        ;
        var inc  = $('<div class="trigger font-increase"><a href="#" onclick="return false;"><span>+</span></a></div>')
            .appendTo(left)
        ;

        var page = $('<div><a href="#" onclick="return false;"><span>page #</span></a></div>')
            .appendTo(center)
        ;

        var prev  = $('<div class="trigger prev-page"><a href="#" onclick="return false;"><span>&lt;</span></a></div>')
            .appendTo(right)
        ;
        var count = $('<input class="input-text" type="text" value="'+ self.count +'"/>')
            .appendTo(right)
        ;
        var next  = $('<div class="trigger next-page"><a href="#" onclick="return false;"><span>&gt;</span></a></div>')
            .appendTo(right)
        ;

        dec.click(function() {
            if (self.size <= 1) {
                return false;
            }
            self.size--;
            size[0].value = self.size;
            self.set_size();
        });
        size.change(function(ev) {
            var value = parseInt(ev.target.value);
            if (!(value >= 1)) {
                ev.target.value = self.size;
                return false;
            } else {
                self.size = value;
            }
            self.set_size();
        });
        inc.mousedown(function() {
            self.size++;
            size[0].value = self.size;
            self.set_size();
        });

        prev.mousedown(function() {
            if (self.id <= 1) {
                return false;
            }
            quran.trigger('change', { id: self.id - self.count });
        });

        count.change(function(ev) {
            var value = parseInt(ev.target.value);
            if (!(value >= 1)) {
                ev.target.value = self.count;
                return false;
            } else {
                self.count = value;
            }
            self.load();
        });

        next.mousedown(function() {
            if (self.id >= 6236) {
                return false;
            }
            quran.trigger('change', { id: self.id + self.count });
        });

        oFoot.append(left)
             .append(center)
             .append(right)
        ;

        o.append(oHead)
         .append(oBody)
         .append(oFoot)
        ;

        oBody.height(
            o.height() - oHead.height() - oFoot.height()
        );
        function resize(ev,ui) {
            oBody.height(
                ui.size.height - oHead.height() - oFoot.height() - 2
            );
        }
        o.resizable({
            handle: '.f',
            handles: 'all',
            helper: 'proxy',
            transparent: true,
            stop: resize
        });

        o.draggable({
            handle: '.h'
        });
    });

};
    
    

$(document).ready(function() {
    $('#tafseer').verse_panel({
        type: 'tafseer',
        css: {
            direction: 'rtl',
            width: '300px',
            height: '300px',
            border: '1px solid black'
        }
    });
    $('#quran').verse_panel({
        type: 'quran',
        css: {
            direction: 'rtl',
            'text-align': 'justify',
            width: '300px',
            height: '300px',
            border: '1px solid black'
        }
    });
    $('#translation').verse_panel({
        type: 'translation',
        css: {
            direction: 'ltr',
            width: '300px',
            height: '300px',
            border: '1px solid black'
        }
    });
});

/* PLAYER */
$.fn.player = function(config) {
    var self = this;

    /* SMUtils */
    var smUtils = new function SMUtils() {
        var self = this;
        this.isSafari = navigator.userAgent.match(/safari/);
        this.isMac = navigator.platform.match(/mac/);
        this.isIE = (navigator.appVersion.match(/MSIE/) && !navigator.userAgent.match(/Opera/));
        this.isNewIE = (this.isIE && !this.isMac && (!navigator.userAgent.match(/MSIE (5|6)/)));
        this.isOldIE = (this.isIE && !this.isNewIE);
        this.copy = function(oArray) {
            var o2 = [];
            for (var i = 0,
            j = oArray.length; i < j; i++) {
                o2[i] = oArray[i];
            }
            return o2;
        }
    }();
    /* SMPlayer */
    function SMPlayer(oSoundPlayer) {
        var self = this;
        this.oParent = oSoundPlayer;
        this.oMain = $('.player')[0];
        this.o = $('.player>div.ui')[0];
        this.oLeft = $('.player>div.ui>div.left')[0];
        this.oBar = $('.player>div.ui>div.mid')[0];
        this.oRangeStart = $('.player>div.ui>div.mid a.range-start')[0];
        this.oRangeEnd = $('.player>div.ui>div.mid a.range-end')[0];
        this.oSlider = $('.player>div.ui>div.mid a.slider')[0];
        this.oTitle = $('.player>div.ui>div.mid span.caption')[0];
        this.oSeek = $('.player>div.ui>div.mid div.seek')[0];
        this.oDivider = $('.player>div.ui>div.mid div.divider')[0];
        this.sFormat = (this.oTitle.innerHTML || '%artist - %title');
        this.sFormatSeek = (this.oSeek.innerHTML || '%{time1}/%{time2} (%{percent}%)');
        this.oProgress = $('.player>div.ui>div.mid div.progress')[0];
        this.oRangeBackground = this.oProgress;
        this.oRight = $('.player>div.ui>div.right')[0];
        this.oTime = $('.player>div.ui>div.right div.time')[0];
        this.oAutoPlay = $('.player>div.ui>div.right a.autoplay')[0];
        this.oRepeat = $('.player>div.ui>div.right a.loop')[0];
        this.oMute = $('.player>div.ui>div.right a.mute')[0];
        this.oVolume = $('.player>div.ui>div.right a.volume')[0];
        this.lastTime = 0;
        this.scale = 100;
        this.percentLoaded = 0;
        this.gotTimeEstimate = 0;
        this.offX = 0;
        this.x = 0;
        this.xMin = 0;
        this.barWidth = self.oBar.offsetWidth;
        this.xMax = self.barWidth - self.oSlider.offsetWidth;
        this.xRangeStart = 0;
        this.xRangeEnd = 0;
        this.xMaxLoaded = 0;
        this.timer = null;
        this._className = this.oBar.className;
        this.tween = [];
        this.frame = 0;
        this.playState = 0;
        this.busy = false;
        this.maxOpacity = 100;
        this.didDrag = false;
        this.coords = {
            'x': 0,
            'y': 0,
            'offX': 0,
            'offY': 0,
            'titleWidth': 0
        }
        this.muted = false;
        this.volume = soundManager.defaultOptions.volume;
        this.oTitle.innerHTML = $('.player>div.ui>div.mid div.default')[0].innerHTML;
        this.oTitle.style.visibility = 'visible';
        this.over = function() {
            this.className = self._className + ' hover';
            event.cancelBubble = true;
            return false;
        }
        this.out = function() {
            try {
                this.className = self._className;
                event.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.barDown = function(e) {
            var e = e ? e: event;
            self.didDrag = false;
            self.coords.x = e.clientX;
            self.coords.y = e.clientY;
            self.coords.offX = e.clientX - $(self.oMain).offset().left;
            self.coords.offY = e.clientY - $(self.oMain).offset().top;
            $(document).bind('mousemove', self.barMove);
            $(document).bind('mouseup', self.barUp);
            return false;
        }
        this.barMove = function(e) {
            try {
                var e = e ? e: event;
                if (!self.didDrag) {
                    if (Math.abs(e.clientX - self.coords.x) < 3 && Math.abs(e.clientY - self.coords.y) < 3) {
                        return false;
                    } else {
                        self.didDrag = true;
                    }
                }
                if ($.browser.safari) {
                    self.oMain.style.left = (e.clientX - self.coords.offX - 722) + 'px';
                    self.oMain.style.top = (e.clientY - self.coords.offY - 7) + 'px';
                } else {
                    self.oMain.style.left = (e.clientX - self.coords.offX) + 'px';
                    self.oMain.style.top = (e.clientY - self.coords.offY) + 'px';
                }
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.barUp = function(e) {
            $(document).unbind('mousemove', self.barMove);
            $(document).unbind('mouseup', self.barUp);
        }
        this.barClick = function(e) {
            if (!self.oParent.currentSound) return false;
            if (self.didDrag) return false;
            var tgt = (e ? e.target: event.srcElement);
            var e = e ? e: event;
            if (tgt.tagName.toLowerCase() == 'a') return false; // ignore clicks on links (eg. dragging slider)
            var xNew = Math.min(e.clientX - $(self.oBar).offset().left, self.xMaxLoaded);
            self.slide(self.x, xNew);
        }
        this.volumeX = 0;
        this.volumeWidth = 0;
        this.volumeDown = function(e) {
            self.volumeX = $(self.oVolume).offset().left;
            self.volumeWidth = parseInt(self.oVolume.offsetWidth);
            $(document).bind('mousemove', self.volumeMove);
            $(document).bind('mouseup', self.volumeUp);
            self.volumeMove(e);
            return false;
        }
        this.volumeMove = function(e) {
            var e = e ? e: event;
            var vol = ((e.clientX - self.volumeX) / (self.volumeWidth));
            vol = Math.min(1, Math.max(0, vol));
            self.setVolume(vol * 100);
            return false;
        }
        this.volumeUp = function(e) {
            var e = e ? e: event;
            $(document).unbind('mousemove', self.volumeMove);
            $(document).unbind('mouseup', self.volumeUp);
            return false;
        }
        this.setVolume = function(nVol) {
            try {
                if (!self.oParent.currentSound || self.volume == nVol) return false;
                soundManager.defaultOptions.volume = nVol;
                self.volume = nVol;
                if (!self.muted) soundManager.setVolume(self.oParent.currentSound, nVol);
                $(self.oVolume).css({
                    opacity: nVol / 100
                });
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.setRangeBackground = function() {
            self.oRangeBackground.style.marginLeft = self.xRangeStart + 2 + 'px';
            self.oRangeBackground.style.width = self.xRangeEnd - self.xRangeStart + 5 + 'px';
            if ((self.xRangeEnd == self.xMax) && (self.xRangeStart == self.xMin)) {
                $(self.oRangeBackground).animate({
                    opacity: 0
                },
                500);
            } else {
                $(self.oRangeBackground).css({
                    opacity: 1
                });
            }
        }
        this.rangeStartDown = function(e) {
            try {
                if (!self.oParent.currentSound) return false;
                self.didDrag = false;
                var e = e ? e: event;
                self.offX = e.clientX - ($(self.oRangeStart).offset().left - $(self.oBar).offset().left);
                self.rangeBusy = true;
                self.refreshSeek('rangeStart');
                self.setSeekVisibility(1);
                $(self.oRangeStart).addClass('active');
                $(document).bind('mousemove', self.rangeStartMove);
                $(document).bind('mouseup', self.rangeStartUp);
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.rangeStartMove = function(e) {
            var e = e ? e: event;
            var x = e.clientX - self.offX;
            if (x > self.xMaxLoaded) {
                x = self.xMaxLoaded;
            } else if (x < self.xMin) {
                x = self.xMin;
            }
            if (x >= self.xRangeEnd) {
                x = self.xRangeEnd;
            }
            if (self.x < x) {
                self.moveSliderTo(x);
                if (self.oParent.options.allowScrub) {
                    self.doScrub();
                }
            }
            if (x != self.xRangeStart) {
                self.moveRangeStartTo(x);
                self.refreshSeek('rangeStart');
            }
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        }
        this.moveRangeStartTo = function(x) {
            self.xRangeStart = x;
            self.oRangeStart.style.marginLeft = (Math.floor(x) + 0) + 'px';
            self.setRangeBackground();
        }
        this.rangeStartUp = function(e) {
            try {
                $(document).unbind('mousemove', self.rangeStartMove);
                $(document).unbind('mouseup', self.rangeStartUp);
                $(self.oRangeStart).removeClass('active');
                self.rangeBusy = false;
                var x;
                if (!self.oParent.options.allowScrub || self.oParent.paused) {
                    if (self.x >= self.xRangeEnd) {
                        x = self.xRangeEnd;
                    } else if (self.x <= self.xRangeStart) {
                        x = self.xRangeStart;
                    } else {
                        x = self.x;
                    }
                    if (x != self.x) {
                        self.moveSliderTo(x);
                        if (self.oParent.options.allowScrub) {
                            self.doScrub();
                        }
                        self.oParent.onUserSetSlideValue(x); // notify parent of update
                    }
                }
                self.setSeekVisibility();
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.sliderDown = function(e) {
            try {
                if (!self.oParent.currentSound) return false;
                self.didDrag = false;
                var e = e ? e: event;
                self.offX = e.clientX - ($(self.oSlider).offset().left - $(self.oBar).offset().left);
                self.busy = true;
                self.refreshSeek();
                self.setSeekVisibility(1);
                $(self.oSlider).addClass('active');
                $(document).bind('mousemove', self.sliderMove);
                $(document).bind('mouseup', self.sliderUp);
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.sliderMove = function(e) {
            var e = e ? e: event;
            var x = e.clientX - self.offX;
            if (x > self.xMaxLoaded) {
                x = self.xMaxLoaded;
            } else if (x < self.xMin) {
                x = self.xMin;
            }
            if (x > self.xRangeEnd) {
                x = self.xRangeEnd;
            } else if (x < self.xRangeStart) {
                x = self.xRangeStart;
            }
            if (x != self.x) {
                self.moveSliderTo(x);
                if (self.oParent.options.allowScrub) self.doScrub();
                self.refreshSeek();
            }
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        }
        this.moveSliderTo = function(x) {
            self.x = x;
            self.oSlider.style.marginLeft = (Math.floor(x) + 2) + 'px'; // 1 offset
        }
        this.sliderUp = function(e) {
            try {
                $(document).unbind('mousemove', self.sliderMove);
                $(document).unbind('mouseup', self.sliderUp);
                $(self.oSlider).removeClass('active');
                self.busy = false;

                if (!self.oParent.options.allowScrub || self.oParent.paused) {
                    self.oParent.onUserSetSlideValue(self.x); // notify parent of update
                }
                self.setSeekVisibility();
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.rangeEndDown = function(e) {
            try {
                if (!self.oParent.currentSound) return false;
                self.didDrag = false;
                var e = e ? e: event;
                self.offX = e.clientX - ($(self.oRangeEnd).offset().left - $(self.oBar).offset().left);
                self.rangeBusy = true;
                self.refreshSeek('rangeEnd');
                self.setSeekVisibility(1);
                $(self.oRangeEnd).addClass('active');
                $(document).bind('mousemove', self.rangeEndMove);
                $(document).bind('mouseup', self.rangeEndUp);
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.rangeEndMove = function(e) {
            var e = e ? e: event;
            var x = e.clientX - self.offX;
            if (x > self.xMaxLoaded) {
                x = self.xMaxLoaded;
            } else if (x < self.xMin) {
                x = self.xMin;
            }
            if (x <= self.xRangeStart) {
                x = self.xRangeStart;
            }
            if (self.x > x) {
                self.moveSliderTo(x);
                if (self.oParent.options.allowScrub) {
                    self.doScrub();
                }
            }
            if (x != self.xRangeEnd) {
                self.moveRangeEndTo(x);
                self.refreshSeek('rangeEnd');
            }
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        }
        this.moveRangeEndTo = function(x) {
            self.xRangeEnd = x;
            self.oRangeEnd.style.marginLeft = Math.floor(x) + 4 + 'px'; // 1 offset
            self.setRangeBackground();
        }
        this.rangeEndUp = function(e) {
            try {
                $(document).unbind('mousemove', self.rangeEndMove);
                $(document).unbind('mouseup', self.rangeEndUp);
                $(self.oRangeEnd).removeClass('active');
                self.rangeBusy = false;
                var x;
                if (!self.oParent.options.allowScrub || self.oParent.paused) {
                    if (self.x >= self.xRangeEnd) {
                        x = self.xRangeEnd;
                    } else if (self.x <= self.xRangeStart) {
                        x = self.xRangeStart;
                    } else {
                        x = self.x;
                    }
                    if (x != self.x) {
                        self.moveSliderTo(x);
                        if (self.oParent.options.allowScrub) {
                            self.doScrub();
                        }
                        self.oParent.onUserSetSlideValue(x); // notify parent of update
                    }
                }
                self.setSeekVisibility();
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.slide = function(x0, x1) {
            try {
                self.tween = animator.createTween(x0, x1);
                self.busy = true;
                self.slideLastExec = new Date();
                animator.addMethod(self.animate, self.animateComplete);
                animator.start();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.refreshSeek = function(handleName) {
            var position, action;
            switch (handleName) {
            case 'rangeStart':
                position = self.xRangeStart;
                action = 'Start at';
                break;
            case 'rangeEnd':
                position = self.xRangeEnd;
                action = 'End at';
                break;
            default:
                position = self.x;
                action = 'Seek to';
                break;
            }
            var sData = self.sFormatSeek;
            var oSound = soundManager.getSoundById(self.oParent.currentSound);
            var sliderMSec = position / self.xMaxLoaded * oSound.duration;
            var attrs = {
                'action': action,
                'time1': self.getTime(sliderMSec, true),
                'time2': (!oSound.loaded ? '~': '') + self.getTime(oSound.durationEstimate, true),
                'percent': Math.floor(sliderMSec / oSound.durationEstimate * 100)
            }
            for (var attr in attrs) {
                data = attrs[attr];
                if (self.isEmpty(data)) data = '!null!';
                sData = sData.replace('\%\{' + attr + '\}', data);
            }
            var aData = sData.split(' ');
            for (var i = aData.length; i--;) {
                if (aData[i].indexOf('!null!') + 1) aData[i] = null;
            }
            self.oSeek.innerHTML = aData.join(' ');
        }
        this.setSeekVisibility = function(bVisible) {
            self.oTitle.style.visibility = bVisible ? 'hidden': 'visible';
            self.oSeek.style.display = bVisible ? 'block': 'none';
        }
        this.animateComplete = function() {
            self.busy = false;
            if (self.oParent) self.oParent.onUserSetSlideValue(self.x);
        }
        this.slideLastExec = new Date();
        this.animate = function() {
            self.moveSliderTo(self.tween[self.frame]);
            self.frame = Math.max(++self.frame, animator.determineFrame(self.slideLastExec, 40));
            if (self.frame >= self.tween.length - 1) {
                self.active = false;
                self.frame = 0;
                if (self._oncomplete) self._oncomplete();
                return false;
            }
            return true;
        }
        this.doScrub = function(t) {
            if (self.oParent.paused) return false;
            if (self.oParent.options.scrubThrottle) {
                if (!self.timer) self.timer = setTimeout(self.scrub, t || 20);
            } else {
                self.scrub();
            }
        }
        this.scrub = function() {
            self.timer = null;
            self.oParent.onUserSetSlideValue(self.x)
        }
        this.getTimeEstimate = function(oSound) {
            var byteCeiling = Math.min(1048576 || oSound.bytes);
            var samples = (byteCeiling == oSound.bytes ? 2 : 4);
            var milestone = Math.floor(oSound.bytesLoaded / byteCeiling * samples);
            if (oSound.bytesLoaded > byteCeiling && self.gotTimeEstimate > 0) return false;
            if (self.gotTimeEstimate == milestone) return false;
            self.gotTimeEstimate = milestone;
            self.setMetaData(oSound);
        }
        this.getTime = function(nMSec, bAsString) {
            var nSec = Math.floor(nMSec / 1000);
            var min = Math.floor(nSec / 60);
            var sec = nSec - (min * 60);
            if (min == 0 && sec == 0) return null;
            return (bAsString ? (min + ':' + (sec < 10 ? '0' + sec: sec)).replace(/NaN/g, '0') : {
                'min': min,
                'sec': sec
            });
        }
        this.updateTime = function(nMSec) {
            self.lastTime = nMSec;
            self.oTime.innerHTML = (self.getTime(nMSec, true) || '0:00');
        }
        this.setTitle = function(sTitle) {
            self.oTitle.innerHTML = unescape(sTitle);
            self.titleString = unescape(sTitle);
            self.refreshScroll();
        }
        this.isEmpty = function(o) {
            return (typeof o == 'undefined' || o == null || o == 'null' || (typeof o == 'string' && o.toLowerCase() == 'n/a' || o.toLowerCase == 'undefined'));
        }
        this.setMetaData = function(oSound) {
            var friendlyAttrs = {
                'title': 'songname',
                'artist': 'artist',
                'album': 'album',
                'track': 'track',
                'year': 'year',
                'genre': 'genre',
                'comment': 'comment',
                'url': 'WXXX'
            }
            var sTime = self.getTime(oSound.durationEstimate, true);
            sTime = (sTime && !oSound.loaded ? '~': '') + sTime;
            var metaAttrs = {
                'time': sTime // get time as mm:ss
            }
            var sData = self.sFormat; // eg. %{artist} - %{title}
            var data = null;
            var useID3 = (!self.isEmpty(oSound.id3.songname) && !self.isEmpty(oSound.id3.artist)); // artist & title must be present to consider using ID3
            for (var attr in friendlyAttrs) {
                data = oSound.id3[friendlyAttrs[attr]];
                if (self.isEmpty(data)) data = '!null!';
                sData = sData.replace('\%\{' + attr + '\}', data);
            }
            for (var attr in metaAttrs) {
                data = metaAttrs[attr];
                if (self.isEmpty(data)) data = '!null!';
                sData = sData.replace('\%\{' + attr + '\}', data);
            }
            var aData = sData.split(' ');
            for (var i = aData.length; i--;) {
                if (aData[i].indexOf('!null!') + 1) aData[i] = null;
            }
            var sMetaData = (useID3 ? unescape(aData.join(' ')) : unescape(self.oParent.oPlaylist.getCurrentItem().userTitle) + (!self.isEmpty(metaAttrs.time) ? ' (' + metaAttrs.time + ')': '')).replace(/\s+/g, ' ');
            self.oTitle.innerHTML = sMetaData;
            self.titleString = sMetaData;
            self.oParent.oPlaylist.getCurrentItem().setTooltip(sMetaData);
            self.refreshScroll();
        }
        this.setLoadingProgress = function(nPercentage) {
            try {
                self.percentLoaded = nPercentage;
                self.xMaxLoaded = self.percentLoaded * self.xMax;
                self.oProgress.style.width = parseInt(nPercentage * self.barWidth) + 'px';
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.setLoading = function(bLoading) {
            try {
                if (self.isLoading == bLoading) return false;
                self.isLoading = bLoading;
                if (bLoading) {
                    $(self.oProgress).addClass('loading');
                } else {
                    $(self.oProgress).removeClass('loading');
                }
                self.setLoadingAnimation(bLoading);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.setLoadingAnimation = function(bLoading) {
            try {
                if (bLoading) {
                    self.loadingTween = self.loadingTweens[0];
                    animator.addMethod(self.loadingAnimate);
                    animator.addMethod(self.loadingAnimateSlide, self.loadingAnimateSlideComplete);
                    animator.start();
                } else {
                    self.loadingTween = self.loadingTweens[1];
                    if (self.loadingAnimateFrame > 0) {
                        self.loadingAnimateFrame = (self.loadingTween.length - self.loadingAnimateFrame);
                    } else {
                        self.loadingTween = self.loadingTweens[1];
                        animator.addMethod(self.loadingAnimateSlide, self.loadingAnimateSlideComplete);
                    }
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.loadingAnimate = function() {
            var d = new Date();
            if (d - self.loadingLastExec < 50) {
                return true;
            }
            self.loadingLastExec = d;
            self.loadingX--;
            self.oProgress.style.backgroundPosition = self.loadingX + 'px ' + self.loadingY + 'px';
            return self.isLoading;
        }
        this.loadingLastExec = new Date();
        this.loadingTweens = [animator.createTween(0, self.maxOpacity), animator.createTween(self.maxOpacity, 0)];
        this.loadingDirection = 0;
        this.loadingTween = this.loadingTweens[this.loadingDirection];
        this.loadingAnimateFrame = 0;
        this.loadingAnimateSlide = function() {
            var d = new Date();
            if (d - self.loadingLastExec < 50) {
                return true;
            }
            $(self.oProgress).css({
                opacity: self.loadingTween[self.loadingAnimateFrame++] / 100
            });
            if (!self.isLoading) {
                self.loadingAnimate();
            }
            self.loadingLastExec = d;
            return (++self.loadingAnimateFrame < self.loadingTweens[0].length);
        }
        this.loadingAnimateSlideComplete = function() {
            try {
                self.loadingAnimateFrame = 0;
                self.loadingX = 0;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.isLoading = false;
        this.loadingTimer = null;
        this.loadingX = 0;
        this.loadingY = 0;
        this.setPlayState = function(bPlayState) {
            try {
                self.playState = bPlayState;
                self.oLeft.getElementsByTagName('span')[0].className = (self.playState ? 'playing': '');
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.togglePause = function() {
            try {
                if (self.oParent.currentSound) {
                    soundManager.togglePause(self.oParent.currentSound);
                } else {
                    self.oParent.oPlaylist.playAya(self.oParent.oPlaylist.getAya());
                }
                var isPaused;
                if (self.oParent.currentSound) {
                    isPaused = soundManager.getSoundById(self.oParent.currentSound).paused;
                    self.oParent.paused = isPaused;
                    self.setPlayState(!isPaused);
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleAutoPlay = function() {
            try {
                self.oParent.oPlaylist.toggleAutoPlay();
                self.setAutoPlay(self.oParent.oPlaylist.doAutoPlay);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleRepeat = function() {
            try {
                self.oParent.oPlaylist.toggleRepeat();
                self.setRepeat(self.oParent.oPlaylist.doRepeat);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleMute = function() {
            try {
                self.muted = !self.muted;
                if (self.muted) {
                    soundManager.mute();
                } else {
                    soundManager.unmute();
                }
                self.setMute(self.muted);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleMore = function() {
        }
        this.setAutoPlay = function(bAutoPlay) {
            if (bAutoPlay) {
                $(self.oAutoPlay).addClass('active');
            } else {
                $(self.oAutoPlay).removeClass('active');
            }
        }
        this.setRepeat = function(bRepeat) {
            if (bRepeat) {
                $(self.oRepeat).addClass('active');
            } else {
                $(self.oRepeat).removeClass('active');
            }
        }
        this.setMute = function(bMute) {
            if (bMute) {
                $(self.oMute).addClass('active');
            } else {
                $(self.oMute).removeClass('active');
            }
        }
        this.scrollOffset = 0;
        this.scrollOffsetMax = self.oBar.offsetWidth;
        this.scrollInterval = 100;
        this.scrollAmount = 2; // pixels
        this.scrollLastExec = new Date();
        this.scrollTimer = null;
        this.isScrolling = null;
        this.scrollTo = function(nOffset) {
            self.oTitle.style.marginLeft = (nOffset * -1) + 'px';
            self.refreshDocumentTitle();
        }
        var tmp = document.createElement('p');
        tmp.innerHTML = '&nbsp;';
        var nbsp = tmp.innerHTML;
        this.refreshDocumentTitle = function(nOffset) {
            var offset = (typeof nOffset != 'undefined' ? nOffset: null);
            var str = (self.titleString).substr(nOffset != null ? nOffset: Math.max(self.scrollOffset - self.scrollAmount, 0));
            str = str.replace(/ /i, ' ');
            if (self.oParent.options.usePageTitle) {
                try {
                    document.title = str;
                } catch(e) {
                }
            }
        }
        this.doScroll = function() {
            var d = new Date();
            if (d - self.scrollLastExec < self.scrollInterval) return true; // throttle
            self.scrollLastExec = d;
            self.scrollOffset += self.scrollAmount;
            if (self.scrollOffset > self.coords.titleWidth) {
                self.scrollOffset = ($.browser.msie ? 5 : 1);
            }
            self.scrollTo(self.scrollOffset);
            return self.isScrolling;
        }
        this.resetScroll = function() {
            self.scrollOffset = 0;
            self.scrollTo(self.scrollOffset);
            self.refreshDocumentTitle(0);
        }
        this.setScroll = function(bScroll) {
            try {
                if (bScroll && !self.isScrolling) {
                    self.isScrolling = true;
                    animator.addMethod(self.doScroll, self.resetScroll);
                    animator.start();
                }
                if (!bScroll && self.isScrolling) {
                    self.isScrolling = false;
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.titleString = '';
        this.refreshScroll = function() {
            self.coords.titleWidth = self.oTitle.offsetWidth;
            var doScroll = (self.coords.titleWidth > self.scrollOffsetMax);
            if (doScroll) {
                var sHTML = self.oTitle.innerHTML;
                var dHTML = self.oDivider.innerHTML; // heh
                self.oTitle.innerHTML = sHTML + dHTML;
                self.coords.titleWidth = self.oTitle.offsetWidth;
                self.setScroll(doScroll);
                self.titleString = sHTML;
                self.oTitle.innerHTML = sHTML + dHTML + sHTML;
            } else {
                self.setScroll(doScroll);
                self.titleString = self.oTitle.innerHTML;
            }
        }
        this.reset = function() {
            try {
                self.moveSliderTo(0);
                self.moveRangeStartTo(self.xMin);
                self.moveRangeEndTo(self.xMax);
                self.setLoadingProgress(0);
                self.gotTimeEstimate = 0;
                self.updateTime(1);
                self.resetScroll();
            } catch(e) {
                q.d.bug(e);
            }
        }
        if ($.browser.msie) {
            self.oBar.onmouseover = self.over;
            self.oBar.onmouseout = self.out;
        }
        if ($.browser.safari) {
            $(this.oMain).addClass('noOpacity');
        }
        this.oSlider.onmousedown = this.sliderDown;
        this.oRangeStart.onmousedown = this.rangeStartDown;
        this.oRangeEnd.onmousedown = this.rangeEndDown;
        this.oBar.onmousedown = this.barDown;
        this.oBar.onclick = this.barClick;
        self.refreshScroll();
        this.init = function() {
            function foo_bar(bar_width) {
                if (!bar_width) {
                    return false;
                }
                $(self.oBar).width(bar_width);
                self._xMax = self.xMax;
                self.barWidth = self.oBar.offsetWidth;
                self.xMax = self.barWidth - self.oSlider.offsetWidth;
                var growth = self.xMax / self._xMax;
                var loaded = Math.ceil(self.xMaxLoaded * growth);
                self.xMaxLoaded = (loaded > self.xMax) ? self.xMax: loaded;
                return {
                    growth: growth,
                    x: self.x * growth,
                    start: self.xRangeStart * growth,
                    end: self.xRangeEnd * growth
                }
            }
            $(self.oMain).resizable({
                handles: 'e,w',
                helper: 'proxy',
                transparent: true,
                stop: function(ev, ui) {
                    var bar_width = ui.size.width - 176;
                    var new_bar = foo_bar(bar_width);
                    self.moveSliderTo(new_bar.x);
                    self.moveRangeStartTo(new_bar.start);
                    self.moveRangeEndTo(new_bar.end);
                }
            });
        }
        this.init();
    }
    /* Animator */
    var animator = new function Animator() {
        var self = this;
        this.timer = null;
        this.active = null;
        this.methods = [];
        this.tweenStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2];
        this.frameCount = this.tweenStep.length;
        this.start = function() {
            if (self.active == true) return false;
            self.active = true;
            self.timer = window.setInterval(self.animate, 20);
        }
        this.stop = function() {
            if (self.timer) {
                window.clearInterval(self.timer);
                self.timer = null;
                self.active = false;
            }
        }
        this.reset = function() {
            self.methods = [];
        }
        this.addMethod = function(oMethod, oncomplete) {
            for (var i = self.methods.length; i--;) {
                if (self.methods[i] == oMethod) {
                    if (oncomplete) {
                        self.methods[i]._oncomplete = oncomplete;
                    }
                    return false;
                }
            }
            self.methods[self.methods.length] = oMethod;
            self.methods[self.methods.length - 1]._oncomplete = oncomplete || null;
        }
        this.createTween = function(start, end) {
            var start = parseInt(start);
            var end = parseInt(end);
            var tweenStepData = self.tweenStep;
            var tween = [start];
            var tmp = start;
            var diff = end - start;
            var j = tweenStepData.length;
            var isAscending = end > start;
            for (var i = 0; i < j; i++) {
                tmp += diff * tweenStepData[i] * 0.01;
                tween[i] = parseInt(tmp);
                if (isAscending) {
                    if (tween[i] > end) tween[i] = end;
                } else {
                    if (tween[i] < end) tween[i] = end;
                }
            }
            if (tween[i] != end) tween[i] = end;
            return tween;
        }
        this.determineFrame = function(tStart, nInterval) {
            var d = new Date();
            return Math.min(self.frameCount, Math.floor(self.frameCount * ((new Date() - tStart) / (nInterval * self.frameCount))));
        }
        this.animate = function(e) {
            if (!self.active) return false;
            var active = false;
            for (var i = self.methods.length; i--;) {
                if (self.methods[i]) {
                    if (self.methods[i]()) {
                        active = true;
                    } else {
                        if (self.methods[i]._oncomplete) {
                            self.methods[i]._oncomplete();
                            self.methods[i]._oncomplete = null;
                        }
                        self.methods[i] = null;
                    }
                }
            }
            if (!active) {
                self.stop();
                self.reset();
            }
        }

    }();
    /* SPPlaylist */
    function SPPlaylist(oSoundPlayer, oPlaylist) {
        var self = this;
        var oParent = oSoundPlayer;
        var seamlessDelay = 0; // offset for justBeforeFinish
        this.o = oPlaylist || null; // containing element
        this.links = [];
        this.items = [];
        this.playlistItems = []; // pointer
        this.playlistItemsUnsorted = [];
        this.history = [];
        this.index = -1;
        this.lastIndex = null;
        this.isVisible = false;
        this.doAutoPlay = false;
        this.doRepeat = false;
        this._ignoreCurrentSound = false;
        function get_sound_id(i) {
            var id = "spsound" + i;
            if (!soundManager.getSoundById(id)) {
                createSound(id, i);
            }
            return id;
        }
        function createSound(id, i) {
            try {
                if (typeof id == 'number') {
                    i = id;
                    id = "spsound" + i; //hack
                    if (! (i >= 0)) {
                        return false;
                    }
                }
                soundManager.createSound({
                    'id': id,
                    'url': self.items[i].url,
                    'stream': true,
                    'autoPlay': false,
                    'onload': function() {
                        oParent.onload.call(this);
                    },
                    'onid3': oParent.onid3,
                    'onplay': oParent.onplay,
                    'onpause': oParent.onpause,
                    'onstop': oParent.onstop,
                    'onresume': oParent.onresume,
                    'whileloading': function() {
                        oParent.whileloading.call(this);
                    },
                    'whileplaying': oParent.whileplaying,
                    'onbeforefinishtime': 4000,
                    'onbeforefinish': function() {
                        self.onbeforefinish.call(this);
                        oParent.onbeforefinish.call(this);
                    },
                    'onjustbeforefinishtime': 2000,
                    'onjustbeforefinish': function() {
                        self.onjustbeforefinish.call(this);
                        oParent.onjustbeforefinish.call(this);
                    },
                    'onfinish': function() {
                        self.onfinish.call(this);
                        oParent.onfinish.call(this);
                    },
                    'onbeforefinishcomplete': function() {
                        self.onbeforefinishcomplete.call(this);
                        oParent.onbeforefinishcomplete.call(this);
                    },
                    'multiShot': false
                });
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.resetArrays = function() {
            try {
                self.links = [];
                self.items = [];
                self.playlistItems = []; // pointer
                self.playlistItemsUnsorted = [];
                self.history = [];
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.resetMisc = function() {
            try {
                oParent.reset();
                if (oParent.currentSound) {
                    soundManager.stop(oParent.currentSound);
                    soundManager.unload(oParent.currentSound);
                }
                oParent.lastSound = null;
                oParent.currentSound = null
                oParent.setPlayState(false);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.resetTemplate = function() {
            try {
                $('.track-list').html('<div class="hd">' + '<div class="l"></div>' + '<div class="c"></div>' + '<div class="r"></div>' + '</div>' + '<div class="bd">' + '<ul>' + '</ul>' + '</div>' + '<div class="ft">' + '<div class="c">' + '</div>' + '</div>');
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.findURL = function(sURL) {
            try {
                for (var i = self.items.length; i--;) {
                    if (self.items[i].url == sURL) return true;
                }
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.addItem = function(oOptions) {
            try {

                var sURL = oOptions.url || null;
                var sName = oOptions.name || null;
                if (!sURL || self.findURL(sURL)) return false;
                self.items[self.items.length] = {
                    url: sURL,
                    name: (sName || sURL.substr(sURL.lastIndexOf('/') + 1))
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.getCurrentItem = function() {
            try {
                return self.playlistItems[self.index];
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.resetSliders = function() {
            oParent.oSMPlayer.moveRangeStartTo(oParent.oSMPlayer.xMin);
            oParent.oSMPlayer.moveSliderTo(oParent.oSMPlayer.xMin);
            oParent.oSMPlayer.moveRangeEndTo(oParent.oSMPlayer.xMax);
        }
        this.preloadCurrent = function(play) {
            try {
                var sound = soundManager.getSoundById(oParent.currentSound);
                if (sound && (sound.readyState == 0)) {
                    sound.load();
                    oParent.oSMPlayer.updateTime(1);
                }
                if (sound && (sound.readyState == 1)) {
                    oParent.oSMPlayer.updateTime(sound.durationEstimate);
                }
                if (sound && (sound.readyState == 3)) {
                    oParent.oSMPlayer.updateTime(sound.duration);
                }
                if (play && sound && ((sound.readyState == 1) || (sound.readyState == 3))) {
                    self.play(self.index);
                } else {
                    if (play && sound) {} else if (play && !sound) {}
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.preloadNext = function() {
            try {
                if ((self.index + 1) == self.items.length) {
                    return false;
                }
                var id = get_sound_id(self.index + 1);
                var sound = soundManager.getSoundById(id);
                if (sound && ((sound.readyState == 0) || (sound.readyState == 2))) {
                    sound.load();
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.first = function() {
            try {
                q.trigger('change-aya', 1);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.next = function() {
            try {
                if (self.doAutoPlay && (self.getAya() == self.items.length)) {
                    q.trigger('change', 'next');
                } else {
                    quran.trigger('change-aya', 'next');
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.previous = function() {
            try {
                if (self.doAutoPlay && (self.getAya() == 1)) {
                    q.trigger('change', 'prev');
                } else {
                    quran.trigger('change-aya', 'prev');
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.setHighlight = function(i) {
            try {
                if (self.playlistItems[i]) self.playlistItems[i].setHighlight();
                if (self.lastIndex != null && self.lastIndex != i) {
                    self.removeHighlight(self.lastIndex);
                }
                self.lastIndex = i;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.removeHighlight = function(i) {
            try {
                if (self.playlistItems[i]) self.playlistItems[i].removeHighlight();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.selectAya = function(a) {
            try {
                var i = a - 1;
                oParent.lastSound = oParent.currentSound;
                oParent.currentSound = get_sound_id(i);
                self.index = i;
                self.setHighlight(i);
                oParent.refreshDetails();

                var last;
                if (oParent.lastSound) {
                    last = soundManager.getSoundById(oParent.lastSound);
                }
                if (last && last.playState) {
                    last.stop();
                    oParent.setPlayState(last.playState);
                }
                self.resetSliders();
                var play;
                if (self.doAutoPlay) {
                    play = true;
                } else {
                    play = false;
                }
                self.preloadCurrent(play);
                quran.trigger('change-aya',a);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.playAya = function(a) {
            try {
                var i = a - 1;
                self.selectAya(a);
                self.play(i);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.getAya = function() {
            try {
                var aya = self.index + 1;
                if (!aya) {
                    aya = q.get_state('aya').aya;
                }
                return aya;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onbeforefinish = function() {
            try {
                self.preloadNext();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onjustbeforefinish = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.onfinish = function() {
            try {
                if (self.doAutoPlay) {
                    self.next();
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onbeforefinishcomplete = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleAutoPlay = function() {
            try {
                self.doAutoPlay = !self.doAutoPlay;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleRepeat = function() {
            try {
                self.doRepeat = !self.doRepeat;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.displayTweens = null;
        this.opacityTweens = [animator.createTween(90, 0), animator.createTween(0, 90)];
        this.displayTween = null;
        this.opacityTween = null;
        this.widthTweens = null;
        this.widthTween = null;
        this.frame = 0;
        this.setCoords = function(nHeight, nOpacity, nWidth) {
            try {
                self.o.style.marginTop = -nHeight + 'px';
                if (!$.browser.msie) $(self.o).css({
                    opacity: nOpacity / 100
                });
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.clearPlaylist = function() {
            try {
                var sID;
                for (var i = 0,
                j = self.items.length; i < j; i++) {
                    sID = 'spsound' + i;
                    soundManager.destroySound(sID);
                }
                self.resetArrays();
                self.resetMisc();
                self.resetTemplate();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.createPlaylist = function() {
            try {
                for (var i = 0,
                j = self.items.length; i < j; i++) {
                    self.playlistItems[i] = new SPPlaylistItem(self.links[i], self, i);
                }
                self.playlistItemsUnsorted = smUtils.copy(self.playlistItems);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.searchForSoundLinks = function(oContainer) {
            try {
                var o = oContainer || document.body;
                if (!o) return false;
                self.links = [];
                function get_url(index) {
                    function get_data(index) {
                        var sura, aya;
                        id = parseInt(index);
                        for (var i = 1; i < (q.data.sura.length - 1); i++) {
                            if (q.data.sura[i + 1][0] >= id) {
                                sura = i;
                                aya = id - q.data.sura[i][0];
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
                    function get_name(sura, aya) {
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
                    var data = get_data(index);
                    var name = get_name(data.sura, data.aya);
                    var mirror = q.get_random_mirror();
                    var recitor = q.get_state('recitor').path;
                    var url = mirror + recitor + '/' + name;
                    return url;
                }
                var ayas = $('option.aya');
                $.each(ayas,
                function(i, item) {
                    self.links[self.links.length] = item;
                    self.addItem({
                        url: get_url(item.value)
                    });
                });
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.load = function(i) {
            try {
                var sID = 'spsound' + i;
                var s = soundManager.getSoundById(sID, true);
                if (s) {
                    var thisOptions = {
                        'autoPlay': false,
                        'url': s.url,
                        'stream': true
                    }
                    s.load(thisOptions);
                } else {
                    createSound(i);
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.play = function(i) {
            try {
                if (i === undefined) {
                    i = self.getAya() - 1;
                    createSound(i);
                }
                if (!self.items[i]) {
                    return false;
                }
                var sID = 'spsound' + i;
                var exists = false;
                if (oParent.currentSound) {
                    if (!self._ignoreCurrentSound) {
                        soundManager.stop(oParent.currentSound);
                        soundManager.unload(oParent.currentSound);
                    } else {
                        self._ignoreCurrentSound = false;
                    }
                }
                if (!soundManager.getSoundById(sID, true)) {
                    createSound(i);
                } else {
                    exists = true;
                }
                oParent.refreshDetails(sID);
                oParent.lastSound = oParent.currentSound;
                oParent.currentSound = sID;
                oParent.reset();
                oParent.setLoading(true);
                soundManager.play(sID);
                oParent.setPlayState(true);
                if (oParent.options.allowBookmarking) window.location.hash = 'track=' + encodeURI(self.items[i].url.substr(self.items[i].url.lastIndexOf('/') + 1));
                if (exists) {
                    var s = soundManager.getSoundById(sID);
                    oParent.setMetaData(s);
                    if (s.loaded) {
                        oParent.onload.apply(s);
                    }
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.init = function() {
            try {
                self.o = $('.track-list')[0];
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.init();
    }
    /* SPPlaylistItem */
    function SPPlaylistItem(oLink, oPlaylist, nIndex) {
        var self = this;
        var oParent = oPlaylist;
        this.index = nIndex;
        this.origIndex = nIndex;
        this.userTitle = oLink.innerHTML;
        var sURL = oParent.items[this.index].url;
        this.o = document.createElement('li');
        if (nIndex % 2 == 0) {
            this.o.className = 'alt';
        }
        this.o.innerHTML = '<a href="' + sURL + '"><span></span></a>';
        this.o.getElementsByTagName('span')[0].innerHTML = this.userTitle;
        this.setHighlight = function() {
            $(self.o).addClass('highlight');
        }
        this.removeHighlight = function() {
            $(self.o).removeClass('highlight');
        }
        this.setTooltip = function(sHTML) {
            self.o.title = sHTML;
        }
        this.onclick = function() {
            try {
                oParent.selectAya(self.index + 1);
                oParent.play(self.index);
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.init = function() {
            $('.track-list .bd ul').append($(self.o));
            self.o.onclick = self.onclick;
        }
        this.init();
    }
    /* SoundPlayer */
    function SoundPlayer() {
        var self = this;
        this.urls = []; // will get from somewhere..
        this.currentSound = null; // current sound ID (offset/count)
        this.lastSound = null;
        this.oPlaylist = null;
        this.oSMPlayer = null;
        this.playState = 0;
        this.paused = false;
        this._mode1 = null;
        this._mode2 = null;
        this.options = {
            allowScrub: true,
            scrubThrottle: false,
            allowBookmarking: false,
            usePageTitle: false,
            hashPrefix: 'track='
        }
        this.toggleRecitorList = function() {
            $('.recitor-list').toggle();
        }
        this.reset = function() {
            try {
                self.oSMPlayer.reset();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.whileloading = function() {
            try {
                if (this.sID != self.currentSound) return false;
                self.oSMPlayer.setLoadingProgress(Math.max(0, this.bytesLoaded / this.bytesTotal));
                self.oSMPlayer.getTimeEstimate(this);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onload = function() {
            try {
                if (this.sID != self.currentSound) {
                    return false;
                }
                self.oSMPlayer.setLoadingProgress(1);
                self.setMetaData(this);
                self.oSMPlayer.setLoading(false);
                self.oSMPlayer.updateTime(this.duration);

            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onid3 = function() {
            try {
                if (this.sID != self.currentSound) {
                    return false;
                }
                self.setMetaData(this);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onstop = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.onpause = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.onresume = function() {
            try {
                if (self.oSMPlayer.x >= self.oSMPlayer.xRangeEnd) {
                    self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
                    self.onUserSetSlideValue(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onplay = function() {
            try {
                if (self.oSMPlayer.xRangeStart != self.oSMPlayer.xMin) {
                    self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
                    self.onUserSetSlideValue(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.updateTime(self.oSMPlayer.xRangeStart);
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.whileplaying = function() {
            try {
                if (this.sID != self.currentSound) return false;
                self.duration = (!this.loaded ? this.durationEstimate: this.duration); // use estimated duration until completely loaded
                if (this.position > self.duration) return false; // can happen when resuming from an unloaded state?
                var newPos = Math.floor(this.position / self.duration * self.oSMPlayer.xMax);
                if (Math.abs(this.position - self.oSMPlayer.lastTime) >= 1000) {
                    self.oSMPlayer.updateTime(this.position);
                }
                if (newPos != self.oSMPlayer.x) { // newPos > self.oSMPlayer.x
                    if ((newPos >= self.oSMPlayer.xRangeStart) && (newPos <= self.oSMPlayer.xRangeEnd)) {
                        if (!self.oSMPlayer.busy) {
                            self.oSMPlayer.moveSliderTo(newPos);
                        }
                    } else if ((!self.oSMPlayer.rangeBusy) && (!self.oSMPlayer.busy)) {
                        if (newPos <= self.oSMPlayer.xRangeStart) {
                            self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
                            self.onUserSetSlideValue(self.oSMPlayer.xRangeStart);
                            self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                        } else if (newPos >= self.oSMPlayer.xRangeEnd) {
                            if (self.oPlaylist.doRepeat) {
                                self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
                                self.onUserSetSlideValue(self.oSMPlayer.xRangeStart);
                                self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                            } else {
                                self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeEnd);
                                self.onUserSetSlideValue(self.oSMPlayer.xRangeEnd);
                                self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeEnd / self.oSMPlayer.xMax * self.duration));
                                self.togglePause(); // (because onfinish never fires)
                            }
                        }
                    }
                }

            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onbeforefinish = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.onjustbeforefinish = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.onfinish = function() {
            try {
                if (self.oPlaylist.doRepeat) {
                    if (!self.oPlaylist.doAutoPlay) {
                        self.togglePause();
                    }
                    self.onUserSetSlideValue(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                } else {
                    self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeEnd);
                    self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeEnd / self.oSMPlayer.xMax * self.duration));

                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onbeforefinishcomplete = function() {
            try {
                if (sm.getSoundById(self.currentSound).playState == 0) {
                    self.setPlayState(0);
                    if (self.oPlaylist.doRepeat && self.oPlaylist.doAutoPlay && (self.oPlaylist.getAya() == self.oPlaylist.items.length)) {
                        self.oPlaylist.first();
                    } else if (self.oPlaylist.doAutoPlay && (self.oPlaylist.getAya() == self.oPlaylist.items.length)) {
                        self.oPlaylist.next();
                    }
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onUserSetSlideValue = function(nX) {
            try {
                var x = parseInt(nX);
                var s = soundManager.sounds[self.currentSound];
                if (!s) return false;
                var nMsecOffset = Math.floor(x / self.oSMPlayer.xMax * s.durationEstimate);
                soundManager.setPosition(self.currentSound, nMsecOffset);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.setTitle = function(sTitle) {
            var title = (typeof sTitle == 'undefined' ? 'Untitled': sTitle);
            self.oSMPlayer.setTitle(title);
            self.oSMPlayer.refreshScroll();
        }
        this.setMetaData = function(oSound) {
            self.oSMPlayer.setMetaData(oSound);
        }
        this.setLoading = function(bLoading) {
            self.oSMPlayer.setLoading(bLoading);
        }
        this.setPlayState = function(bPlaying) {
            self.playState = bPlaying;
            self.oSMPlayer.setPlayState(bPlaying);
        }
        this.refreshDetails = function(sID) {
            self.setTitle(self.oPlaylist.getCurrentItem().userTitle);
        }
        this.volumeDown = function(e) {
            self.oSMPlayer.volumeDown(e);
        }
        this.togglePause = function() {
            try {
                self.oSMPlayer.togglePause();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggleAutoPlay = function() {
            self.oSMPlayer.toggleAutoPlay();
        }
        this.toggleRepeat = function() {
            self.oSMPlayer.toggleRepeat();
        }
        this.toggleMute = function() {
            self.oSMPlayer.toggleMute();
        }
        this.toggleMore = function() {
            try {
                $('.more-options').toggle();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.init = function() {
            self.oSMPlayer = new SMPlayer(self);
        }
    }

    return this.each(function() {
        var o = $(this);

        var template = $(
            '<div class="player">' +
                '<div class="ui">' +
                    '<div class="left">' +
                        //'<a href="#" title="Pause/Play" onclick="quran.player.togglePause();return false" class="trigger pauseplay"><span></span></a>' +
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
                        //'<a href="#" title="Previous" class="trigger prev" onclick="quran.player.oPlaylist.previous();return false"><span></span></a>' +
                        //'<a href="#" title="Next" class="trigger next" onclick="quran.player.oPlaylist.next();return false"><span></span></a>' +
                        //'<a href="#" title="Auto-Play/Continuous" class="trigger s1 autoplay" onclick="quran.player.toggleAutoPlay();return false"><span></span></a>' +
                        //'<a href="#" title="Repeat" class="trigger s2 loop" onclick="quran.player.toggleRepeat();return false"><span></span></a>' +
                        //'<a href="#" title="Mute" class="trigger s3 mute" onclick="quran.player.toggleMute();return false"><span></span></a>' +
                        //'<a href="#" title="Volume" onmousedown="quran.player.volumeDown(event);return false" onclick="return false" class="trigger s4 volume"><span></span></a>' +
                        //'<a href="#" class="trigger help" onmousedown="alert(\'hi\');return false" onclick="return false;"><span></span></a>' +
                        //'<a href="#" title="More..." class="trigger dropdown" onclick="quran.player.toggleMore();return false"><span></span></a>' +
                    '</div>' +
                '</div>' +
                '<div class="more-options" style="display: none;">' +
                    '<div class="title">Recitor</div>' +
                    '<div class="body recitor-list">' +
                        '<ul>' +
                        '</ul>' +
                    '</div>' +
                    '<div class="title">Playlist</div>' +
                        '<div class="body track-list">' +
                        '<ul>' +
                        '</ul>' +
                    '</div>' +
                '</div>' +
            '</div>'
        );

        var pauseplay = $('<a href="#" title="Pause/Play" class="trigger pauseplay"><span></span></a>').click(function() {
            o.player.togglePause();
            return false;
        });
        template.find('div.left').append(pauseplay);
        var previous = $('<a href="#" title="Previous" class="trigger prev"><span></span></a>').click(function() {
            o.player.oPlaylist.previous();
            return false;
        });
        template.find('div.right').append(previous);
        var next = $('<a href="#" title="Next" class="trigger next"><span></span></a>').click(function() {
            o.player.oPlaylist.next();
            return false;
        });
        template.find('div.right').append(next);
        var autoplay = $('<a href="#" title="Auto-Play/Continuous" class="trigger s1 autoplay"><span></span></a>').click(function() {
            o.player.toggleAutoPlay();
            return false;
        });
        template.find('div.right').append(autoplay);
        var repeat = $('<a href="#" title="Repeat" class="trigger s2 loop"><span></span></a>').click(function() {
            o.player.toggleRepeat();
            return false;
        });
        template.find('div.right').append(repeat);
        var mute = $('<a href="#" title="Mute" class="trigger s3 mute"><span></span></a>').click(function() {
            o.player.toggleMute();
            return false;
        });
        template.find('div.right').append(mute);
        var volume = $('<a href="#" title="Volume" class="trigger s4 volume"><span></span></a>').mousedown(function(ev) {
            o.player.volumeDown(ev);
            return false;
        }).click(function() {
            return false;
        });
        template.find('div.right').append(volume);
        var help = $('<a href="#" class="trigger help"><span></span></a>').click(function() {
            return false;
        });
        template.find('div.right').append(help);
        var more = $('<a href="#" title="More..." class="trigger dropdown"><span></span></a>').click(function() {
            o.player.toggleMore();
            return false;
        });
        template.find('div.right').append(more);

        o.append(template);

        o.player = new SoundPlayer();

        var sura_set, init_stuff;

        function initStuff() {
            q.d.bug('player initialized');
            o.player.init(); // load mp3, etc.
            o.player.oPlaylist = new SPPlaylist(o.player, null);

            if (sura_set) {
                var playlist = o.player.oPlaylist;
                playlist.clearPlaylist();
                playlist.searchForSoundLinks();
                playlist.createPlaylist();
            }

            init_stuff = true;
        }

        var aya = 1;

        q.bind('sura-set',
        function() {
            if (init_stuff) {
                var playlist = o.player.oPlaylist;
                try {
                    playlist.clearPlaylist();
                    playlist.searchForSoundLinks();
                    playlist.createPlaylist();
                } catch(e) {
                    q.d.bug(e);
                }
            }

            sura_set = true;
        });

        q.bind('aya-changed',
        function(ev, aya) {
            o.player.oPlaylist.selectAya(aya)
        });

        q.bind('application-state-restored',
        function() {
            aya = q.get_state('aya').aya;
        });

        q.bind('sound-ready',
        function() {
            initStuff();
        });
    });
    /*
            function make_recitor_list() {
                for (var i=0; i < quran.config.recitors.length; i++) {
                    var recitor = $(
                        '<li class="'+ ((i%2 == 0)? 'alt' : '') +'">' +
                            '<a href="#" onmousedown="quran.player.set_recitor(\''+ quran.config.recitors[i][1] +'\'); return false;" onclick="return false;">' + 
                                '<span>' + 
                                    quran.config.recitors[i][0] +
                                '</span>' + 
                            '</a>' +
                        '</li>'
                    );
                    $('.recitor-list>ul')
                        .append(recitor)
                    ;
                }
            }
            make_recitor_list();
    */
};
    


$.extend(sm, {
    url: 'res/ui/swf/',
    flashVersion: (window.location.toString().match(/flash9/) ? 9 : 8),
    debugMode: (window.location.toString().match(/debug=1/) ? true: false),
    useConsole: false,
    multiShot: false,
    defaultOptions: {
        stream: true
    },
    onload: function() {
        quran.trigger('sound-ready');
    }
});

quran.bind('sound-ready', function() {
    q.d.bug('sound-ready fired');
});

$(document).ready(function() {
    $('#player').player({
    });
});
})(jQuery);
})(quran);
})(soundManager);
