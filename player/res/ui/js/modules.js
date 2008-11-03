(function(sm) {
(function(q) {
(function($) {
/****** modules ***********/
    $.widget('ui.quranController', {
        _init: function() {
            quran._controller = this;
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
            this.sura_select = $('<select>');
            this.aya_select = $('<select>');
    
            var self = this;
            function populate_suras() {
                for (var i=1; i < quran.data.sura.length - 1; i++) {
                     self.sura_select
                        .append('<option class="sura" value='+ i +'>'+ quran.data.sura[i][5] + '</option>');
                }
            }
            function set_defaults() {
                if (!quran.get_state('aya')) {
                    quran.set_state('aya', { id: 1, aya: 1, sura: 1 });
                }
            }
    
            //populate_recitors();
            populate_suras();
            set_defaults();
    
            //this.recitor_select.change(function() {
                //quran.trigger('change-recitor', $(this)[0].options[$(this)[0].selectedIndex].value);
            //});
            this.sura_select.change(function() {
                quran.trigger('change', { sura: $(this)[0].options[$(this)[0].selectedIndex].value });
            });
            this.aya_select.change(function() {
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
            var sura = self.get_sura() - 1;
            if ((sura <= 0) || (sura > 114)) {
                sura = 114;
            }
            quran.trigger('change', { sura: sura });
        },
        next_aya: function() {
            quran.trigger('change','next');
        },
        next_sura: function() {
            var sura = self.get_sura() + 1;
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

                var aya_div = $('<span name="'+ aya.attr('id') +'" title="'+ aya.attr('index') +'" class="aya '+ ((aya.attr('id') == self.id)? 'active' : '') +'">'+ aya.text() +'</span>');

                aya_div.mousedown(function() {
                    var div = $(this);
                    var id = parseInt(div.attr('name'));
                    q.d.bug('clicked aya id ',id);
                    quran.trigger('change', { id: id });
                });

                oBody.append(aya_div);
            });

            var title = $('<span>'+ sura_start_index +':'+ aya_start_index +' - '+ sura_end_index +':'+ aya_end_index + '</span>');
            oHead.append(title);
        });
    };

    this.set_active = function() {
        try {
            self.find('.active').removeClass('active');
            var active = self.find('[name='+ self.id +']');
            active.addClass('active');
            var offset = active.position().top;
            var center = self.find('.b').height()/2;
            if ((offset > self.find('.b').height()) || (offset < 0)) {
                active[0].scrollIntoView()
            }
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
            url: '/quran/old/public/page/get',
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
        this.oRight = $('.player>div.ui>div.right')[0];
        this.oTime = $('.player>div.ui>div.right div.time')[0];
        this.oAutoPlay = $('.player>div.ui>div.right a.autoplay')[0];
        this.oRepeat = $('.player>div.ui>div.right a.loop')[0];
        this.oMute = $('.player>div.ui>div.right a.mute')[0];
        this.oVolume = $('.player>div.ui>div.right a.volume')[0];
        this.lastTime = 0;
        this.scale = 100;
        this.percentLoaded = 0;
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
        this.mute = false;
        this.volume = sm.defaultOptions.volume;
        this.oTitle.innerHTML = $('.player>div.ui>div.mid div.default')[0].innerHTML;
        this.oTitle.style.visibility = 'visible';


        this.oSplitPoints = $('.player>div.split-points div.mid')
            .mousedown(function(ev) {
                q.d.bug('split points down');
                var relative_x = ev.clientX - $(self.oSplitPoints).offset().left;
                var point = $('<a class="point"><div></div></a>')
                    .css({
                        position: 'absolute',
                        left: relative_x - 4 
                    })
                    .mousedown(function(e) {
                        var sp_self = this;
                        self.offX = e.clientX - $(self.oSplitPoints).offset().left;
                        q.d.bug('split POINT down',self.offX);
                        $(document).bind('mousemove', function(e) {
                            self.split_point_move.call(sp_self,e);
                            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                            return false;
                        });
                        $(document).bind('mouseup', function(e) {
                            self.split_point_up.call(sp_self,e);
                            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                            return false;
                        });
                        e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                        return false;
                    })
                ;
                $(this)
                    .append(point)
                ;
                ev.stopPropgation ? ev.stopPropagation() : ev.cancelBubble = true;
                return false;
            })
        ;
        this.split_point_move = function(e) {
            var e = e ? e: event;
            var x = e.clientX - $(self.oSplitPoints).offset().left;// - self.offX;
            if (x < self.xMin) {
                x = self.xMin;
            }
            if (x > self.xMax + 6) {
                x = self.xMax + 6;
            }
            self.move_split_point_to.call(this,x);
            q.d.bug('split POINT moving',x,self.offX);
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        };
        this.move_split_point_to = function(x) {
            var left = Math.floor(x);
            q.d.bug(left);
            $(this).css({
                position: 'absolute',
                left: left
            });
        }
        this.split_point_up = function(e) {
            q.d.bug('split POINT up');
            $(document).unbind('mousemove');
            $(document).unbind('mouseup');
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        };
        this.move_split_points_after_resize = function(growth) {
        };
        /*
        this.oSplitPoints = $('.player>div.split-points')[0];
        this.oSplitPoints.onmousedown = this.split_points_down;
        this.split_points_down = function(e) {
            var e = e ? e: event;
            self.offX = e.clientX - $(self.oSplitPoints).offset().left;
            q.d.bug('split points down',self.offX);
            $(document).bind('mousemove', self.split_points_move);
            $(document).bind('mouseup', self.split_points_up);
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        };
        this.split_points_move = function(e) {
            var e = e ? e: event;
            var x = e.clientX - $(self.oSplitPoints).offset().left;// - self.offX;
            q.d.bug('split points move', x,self.offX);
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        };
        this.split_points_up = function(e) {
            var e = e ? e: event;
            var x = e.clientX - $(self.oSplitPoints).offset().left;// - self.offX;
            q.d.bug('split points up',x,self.offX);
            $(document).unbind('mousemove', self.split_points_move);
            $(document).unbind('mouseup', self.split_points_up);
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        };
        */
        /*
            .click(function(ev) {
                var relative_x = ev.clientX - $(self.oMain).offset().left;
                var point = $('<a class="point"><span></span></a>')
                    .css({
                        position: 'absolute',
                        left: relative_x
                    })
                ;
                $(this)
                    .append(point)
                ;
            })
        ;
        */
        this.set_split_point = function() {
        };


        this.bar_down = function(e) {
            var e = e ? e: event;
            self.didDrag = false;
            self.coords.x = e.clientX;
            self.coords.y = e.clientY;
            self.coords.offX = e.clientX - $(self.oMain).offset().left;
            self.coords.offY = e.clientY - $(self.oMain).offset().top;
            $(document).bind('mousemove', self.bar_move);
            $(document).bind('mouseup', self.bar_up);
            return false;
        }
        this.bar_move = function(e) {
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
        this.bar_up = function(e) {
            $(document).unbind('mousemove', self.bar_move);
            $(document).unbind('mouseup', self.bar_up);
        }
        this.bar_click = function(e) {
            if (!self.oParent.current) {
                return false;
            }
            if (self.didDrag) {
                return false;
            }
            var tgt = (e ? e.target: event.srcElement);
            var e = e ? e: event;
            if (tgt.tagName.toLowerCase() == 'a') return false; // ignore clicks on links (eg. dragging slider)
            var xNew = Math.min(e.clientX - $(self.oBar).offset().left, self.xMaxLoaded);
            self.slide(self.x, xNew);
        }
        this.volume_x = 0;
        this.volume_width = 0;
        this.volume_down = function(e) {
            q.d.bug(630,'volume_down');
            self.volume_x = $(self.oVolume).offset().left;
            self.volume_width = parseInt(self.oVolume.offsetWidth);
            $(document).bind('mousemove', self.volume_move);
            $(document).bind('mouseup', self.volume_up);
            self.volume_move(e);
            return false;
        }
        this.volume_move = function(e) {
            var e = e ? e: event;
            var vol = ((e.clientX - self.volume_x) / (self.volume_width));
            vol = Math.min(1, Math.max(0, vol));
            q.d.bug(642,'volume_move',vol,vol*100);
            self.set_volume(vol * 100);
            return false;
        }
        this.volume_up = function(e) {
            var e = e ? e: event;
            $(document).unbind('mousemove', self.volume_move);
            $(document).unbind('mouseup', self.volume_up);
            return false;
        }
        this.set_volume = function(nVol) {
            try {
                if (!self.oParent.current || self.volume == nVol) {
                    q.d.bug(655,'set_volume, returning false');
                    return false;
                }
                sm.defaultOptions.volume = nVol;
                self.volume = nVol;
                if (!self.mute) {
                    self.oParent.current.set_volume(nVol);
                }
                $(self.oVolume).css({
                    opacity: nVol / 100
                });
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.range_start_down = function(e) {
            try {
                q.d.bug('range_start_down 1');
                if (!self.oParent.current) {
                    return false;
                }
                q.d.bug('range_start_down 2');
                self.didDrag = false;
                var e = e ? e: event;
                self.offX = e.clientX - ($(self.oRangeStart).offset().left - $(self.oBar).offset().left);
                self.rangeBusy = true;
                self.refresh_seek('rangeStart');
                self.set_seek_visibility(1);
                $(self.oRangeStart).addClass('active');
                $(document).bind('mousemove', self.range_start_move);
                $(document).bind('mouseup', self.range_start_up);
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.range_start_move = function(e) {
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
                self.move_slider_to(x);
                if (self.oParent.options.allow_scrub) {
                    self.do_scrub();
                }
            }
            if (x != self.xRangeStart) {
                self.move_range_start_to(x);
                self.refresh_seek('rangeStart');
            }
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        }
        this.move_range_start_to = function(x) {
            self.xRangeStart = x;
            self.oRangeStart.style.marginLeft = (Math.floor(x) + 0) + 'px';
        }
        this.range_start_up = function(e) {
            try {
                q.d.bug('rangeStart up');
                $(document).unbind('mousemove', self.range_start_move);
                $(document).unbind('mouseup', self.range_start_up);
                $(self.oRangeStart).removeClass('active');
                self.rangeBusy = false;
                var x;
                if (!self.oParent.options.allow_scrub || self.oParent.paused) {
                    if (self.x >= self.xRangeEnd) {
                        x = self.xRangeEnd;
                    } else if (self.x <= self.xRangeStart) {
                        x = self.xRangeStart;
                    } else {
                        x = self.x;
                    }
                    if (x != self.x) {
                        self.move_slider_to(x);
                        if (self.oParent.options.allow_scrub) {
                            self.do_scrub();
                        }
                        self.oParent.set_position(x); // notify parent of update
                    }
                }
                self.set_seek_visibility();
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.slider_down = function(e) {
            try {
                if (!self.oParent.current) return false;
                self.didDrag = false;
                var e = e ? e: event;
                self.offX = e.clientX - ($(self.oSlider).offset().left - $(self.oBar).offset().left);
                self.busy = true;
                self.refresh_seek();
                self.set_seek_visibility(1);
                $(self.oSlider).addClass('active');
                $(document).bind('mousemove', self.slider_move);
                $(document).bind('mouseup', self.slider_up);
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.slider_move = function(e) {
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
                self.move_slider_to(x);
                if (self.oParent.options.allow_scrub) self.do_scrub();
                self.refresh_seek();
            }
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        }
        this.move_slider_to = function(x) {
            self.x = x;
            self.oSlider.style.marginLeft = (Math.floor(x) + 2) + 'px'; // 1 offset
        }
        this.slider_up = function(e) {
            try {
                $(document).unbind('mousemove', self.slider_move);
                $(document).unbind('mouseup', self.slider_up);
                $(self.oSlider).removeClass('active');
                self.busy = false;

                if (!self.oParent.options.allow_scrub || self.oParent.paused) {
                    self.oParent.set_position(self.x); // notify parent of update
                }
                self.set_seek_visibility();
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.range_end_down = function(e) {
            try {
                if (!self.oParent.current) return false;
                self.didDrag = false;
                var e = e ? e: event;
                self.offX = e.clientX - ($(self.oRangeEnd).offset().left - $(self.oBar).offset().left);
                self.rangeBusy = true;
                self.refresh_seek('rangeEnd');
                self.set_seek_visibility(1);
                $(self.oRangeEnd).addClass('active');
                $(document).bind('mousemove', self.range_end_move);
                $(document).bind('mouseup', self.range_end_up);
                e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.range_end_move = function(e) {
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
                self.move_slider_to(x);
                if (self.oParent.options.allow_scrub) {
                    self.do_scrub();
                }
            }
            if (x != self.xRangeEnd) {
                self.move_range_end_to(x);
                self.refresh_seek('rangeEnd');
            }
            e.stopPropgation ? e.stopPropagation() : e.cancelBubble = true;
            return false;
        }
        this.move_range_end_to = function(x) {
            self.xRangeEnd = x;
            self.oRangeEnd.style.marginLeft = Math.floor(x) + 4 + 'px'; // 1 offset
            //self.setRangeBackground();
        }
        this.range_end_up = function(e) {
            try {
                $(document).unbind('mousemove', self.range_end_move);
                $(document).unbind('mouseup', self.range_end_up);
                $(self.oRangeEnd).removeClass('active');
                self.rangeBusy = false;
                var x;
                if (!self.oParent.options.allow_scrub || self.oParent.paused) {
                    if (self.x >= self.xRangeEnd) {
                        x = self.xRangeEnd;
                    } else if (self.x <= self.xRangeStart) {
                        x = self.xRangeStart;
                    } else {
                        x = self.x;
                    }
                    if (x != self.x) {
                        self.move_slider_to(x);
                        if (self.oParent.options.allow_scrub) {
                            self.do_scrub();
                        }
                        self.oParent.set_position(x); // notify parent of update
                    }
                }
                self.set_seek_visibility();
                return false;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.slide = function(a,b) {
            self.move_slider_to(b);
            self.oParent.set_position(b);
        };
        this.refresh_seek = function(handleName) {
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
            var oSound = self.oParent.current;
            var sliderMSec = position / self.xMaxLoaded * oSound.duration;
            var attrs = {
                'action': action,
                'time1': self.get_time(sliderMSec, true),
                'time2': (!oSound.loaded ? '~': '') + self.get_time(oSound.durationEstimate, true),
                'percent': Math.floor(sliderMSec / oSound.durationEstimate * 100)
            }
            for (var attr in attrs) {
                data = attrs[attr];
                if (self.is_empty(data)) data = '!null!';
                sData = sData.replace('\%\{' + attr + '\}', data);
            }
            var aData = sData.split(' ');
            for (var i = aData.length; i--;) {
                if (aData[i].indexOf('!null!') + 1) aData[i] = null;
            }
            self.oSeek.innerHTML = aData.join(' ');
        }
        this.set_seek_visibility = function(bVisible) {
            self.oTitle.style.visibility = bVisible ? 'hidden': 'visible';
            self.oSeek.style.display = bVisible ? 'block': 'none';
        }
        this.do_scrub = function(t) {
            if (self.oParent.paused) return false;
            if (self.oParent.options.scrob_throttle) {
                if (!self.timer) self.timer = setTimeout(self.scrub, t || 20);
            } else {
                self.scrub();
            }
        }
        this.scrub = function() {
            self.timer = null;
            self.oParent.set_position(self.x)
        }
        this.get_time = function(nMSec, bAsString) {
            var nSec = Math.floor(nMSec / 1000);
            var min = Math.floor(nSec / 60);
            var sec = nSec - (min * 60);
            return (bAsString ? (min + ':' + (sec < 10 ? '0' + sec: sec)).replace(/NaN/g, '0') : {
                'min': min,
                'sec': sec
            });
        }
        this.update_time = function(nMSec) {
            if (nMSec === false) {
                self.oTime.innerHTML = '-:--';
                return false;
            }
            self.lastTime = nMSec;
            self.oTime.innerHTML = (self.get_time(nMSec, true) || '-:--');
        }
        this.set_title = function(sTitle) {
            self.oTitle.innerHTML = unescape(sTitle);
            self.titleString = unescape(sTitle);
        }
        this.is_empty = function(o) {
            return (typeof o == 'undefined' || o == null || o == 'null' || (typeof o == 'string' && o.toLowerCase() == 'n/a' || o.toLowerCase == 'undefined'));
        }
        this.set_progress = function(nPercentage) {
            try {
                $(self.oProgress).width(parseInt(nPercentage * $(self.oBar).width()));
                if ((nPercentage != 1) && !$(self.oProgress).hasClass('loading')) {
                    $(self.oProgress).css({ opacity: 100 }).addClass('loading');
                } else
                if (nPercentage == 1) {
                    $(self.oProgress).animate({ opacity: 0 },1000);
                    setTimeout(function() { $(self.oProgress).removeClass('loading'); },999);
                }
                self.percentLoaded = nPercentage;
                self.xMaxLoaded = self.percentLoaded * self.xMax;
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.set_playing = function(bPlayState) {
            try {
                self.playState = bPlayState;
                self.oLeft.getElementsByTagName('span')[0].className = (self.playState ? 'playing': '');
            } catch(e) {
                q.d.bug(e);
            }
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
        this.reset = function(current) {
            try {
                if (current) {
                    self.move_slider_to(self.oParent.current.position);
                    self.move_range_start_to(self.xRangeMin);
                    self.move_range_end_to(self.xRangeMax);
                } else {
                    self.move_slider_to(self.xMin);
                    self.move_range_start_to(self.xMin);
                    self.move_range_end_to(self.xMax);
                }
                if (self.oParent.current) {
                    if (self.oParent.current.loaded) {
                        self.update_time(self.oParent.current.duration);
                    } else
                    if (self.oParent.current.readyState == 1) {
                        self.update_time(self.oParent.current.durationEstimate);
                    }
                } else {
                    self.update_time(false);
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.oSlider.onmousedown = this.slider_down;
        this.oRangeStart.onmousedown = this.range_start_down;
        this.oRangeEnd.onmousedown = this.range_end_down;
        this.oBar.onmousedown = this.bar_down;
        this.oBar.onclick = this.bar_click;
    }
    /* SoundPlayer */
    function SoundPlayer() {
        var self = this;
        this.current = null; // current sound ID (offset/count)
        this.last = null;
        this.oSMPlayer = null;
        this.playing = false;
        this.paused = false;
        this.auto = false;
        this.repeat = false;
        this.mute = false;
        this.options = {
            allow_scrub: true,
            scrob_throttle: false
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
                if (this.sID != self.current.sID) {
                    return false;
                }
                var progress = Math.max(0, this.bytesLoaded / this.bytesTotal);
                self.oSMPlayer.set_progress(progress);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onload = function() {
            try {
                if (this.sID != self.current.sID) {
                    return false;
                }
                q.d.bug('onload');
                self.oSMPlayer.set_progress(1);
                self.oSMPlayer.update_time(this.duration);

            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onid3 = function() {
            try {
                if (this.sID != self.current.sID) {
                    return false;
                }
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
                    self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeStart);
                    self.set_position(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.update_time(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onplay = function() {
            q.d.bug('onplay');
            try {
                if (self.oSMPlayer.xRangeStart != self.oSMPlayer.xMin) {
                    self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeStart);
                    self.set_position(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.update_time(self.oSMPlayer.xRangeStart);
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.whileplaying = function() {
            try {
                if (this.sID != self.current.sID) { 
                    return false;
                }
                self.duration = (!this.loaded ? this.durationEstimate: this.duration); // use estimated duration until completely loaded
                if (this.position > self.duration) return false; // can happen when resuming from an unloaded state?
                var newPos = Math.floor(this.position / self.duration * self.oSMPlayer.xMax);
                if (Math.abs(this.position - self.oSMPlayer.lastTime) >= 1000) {
                    self.oSMPlayer.update_time(this.position);
                }
                if (newPos != self.oSMPlayer.x) { // newPos > self.oSMPlayer.x
                    if ((newPos >= self.oSMPlayer.xRangeStart) && (newPos <= self.oSMPlayer.xRangeEnd)) {
                        if (!self.oSMPlayer.busy) {
                            self.oSMPlayer.move_slider_to(newPos);
                        }
                    } else if ((!self.oSMPlayer.rangeBusy) && (!self.oSMPlayer.busy)) {
                        if (newPos <= self.oSMPlayer.xRangeStart) {
                            self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeStart);
                            self.set_position(self.oSMPlayer.xRangeStart);
                            self.oSMPlayer.update_time(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                        } else if (newPos >= self.oSMPlayer.xRangeEnd) {
                            if (self.repeat) {
                                self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeStart);
                                self.set_position(self.oSMPlayer.xRangeStart);
                                self.oSMPlayer.update_time(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                            } else {
                                self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeEnd);
                                self.set_position(self.oSMPlayer.xRangeEnd);
                                self.oSMPlayer.update_time(Math.floor(self.oSMPlayer.xRangeEnd / self.oSMPlayer.xMax * self.duration));
                                self.toggle_pause(); // (because onfinish never fires)
                            }
                        }
                    }
                }

            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onbeforefinish = function() {
            self.preload_next();
        }
        this.onjustbeforefinish = function() {
            try {} catch(e) {
                q.d.bug(e);
            }
        }
        this.onfinish = function() {
            try {
                if (self.repeat) {
                    if (!self.auto) {
                        self.toggle_pause();
                    }
                    self.set_position(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeStart);
                    self.oSMPlayer.update_time(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
                } else {
                    self.oSMPlayer.move_slider_to(self.oSMPlayer.xRangeEnd);
                    self.oSMPlayer.update_time(Math.floor(self.oSMPlayer.xRangeEnd / self.oSMPlayer.xMax * self.duration));

                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.onbeforefinishcomplete = function() {
            try {
                self.set_playing(self.current.playState);
                q.d.bug(2165,'onbeforefinishcomplete');
                if (self.current.playState == 0) {
                    q.d.bug(2167,'onbeforefinishcomplete');
                    self.set_playing(0);
                    if (self.repeat && self.auto && (self.get_aya() == self.get_last_aya())) {
                        q.d.bug(2176,'onbeforefinishcomplete');
                        self.first();
                    } else if (self.auto) {
                        q.d.bug(2179,'onbeforefinishcomplete');
                        self.next();
                    }
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.set_position = function(nX) {
            try {
                var x = parseInt(nX);
                var s = self.current;
                if (!s) {
                    return false;
                }
                var nMsecOffset = Math.floor(x / self.oSMPlayer.xMax * s.durationEstimate);
                self.current.setPosition(nMsecOffset);
                self.oSMPlayer.update_time(self.current.position);
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.set_title = function(sTitle) {
            var title = (typeof sTitle == 'undefined' ? 'Untitled': sTitle);
            self.oSMPlayer.set_title(title);
        }
        this.set_playing = function(bPlaying) {
            self.playing = bPlaying;
            self.oSMPlayer.set_playing(bPlaying);
        }
        this.volume_down = function(e) {
            self.oSMPlayer.volume_down(e);
        }
        this.toggle_pause = function() {
            try {
                if (!self.last || (self.current.sID == self.last.sID)) {
                    self.current.togglePause();
                    self.paused = self.current.paused;
                    self.oSMPlayer.set_playing(!self.paused);
                } else {
                    self.set_aya();
                    self.play_aya();
                }
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.toggle_auto = function() {
            self.auto = !self.auto;
            self.oSMPlayer.setAutoPlay(self.auto);
        }
        this.toggle_repeat = function() {
            self.repeat = !self.repeat;
            self.oSMPlayer.setRepeat(self.repeat);
        }
        this.toggle_mute = function() {
            self.mute = !self.mute;
            if (self.mute) {
                soundManager.mute();
            } else {
                soundManager.unmute();
            }
            self.oSMPlayer.setMute(self.mute);
        }
        this.toggle_recitors = function() {
            try {
                $('.more-options').toggle();
            } catch(e) {
                q.d.bug(e);
            }
        }
        this.first = function() {
            q.d.bug(2260,'first');
            try {
                q.trigger('change-aya', 1);
            } catch(e) {
                q.d.bug(e);
            }
        };
        this.next = function() {
            q.d.bug(2268,'next');
            try {
                if (self.auto && (self.get_aya() == self.get_last_aya())) {
                    q.trigger('change', 'next');
                } else {
                    quran.trigger('change-aya', 'next');
                }
            } catch(e) {
                q.d.bug(e);
            }
        };
        this.previous = function() {
            q.d.bug(2280,'previous');
            try {
                if (self.auto && (self.get_aya() == 1)) {
                    q.trigger('change', 'prev');
                } else {
                    quran.trigger('change-aya', 'prev');
                }
            } catch(e) {
                q.d.bug(e);
            }
        };
        this.preload_next = function() {
            q.d.bug('preload next');
            if (self.get_aya() == self.get_last_aya()) {
                return false;
            }
            var id = self.get_id(self.get_aya() + 1);
            if (sm.getSoundById(id)) {
                return false;
            }
            q.d.bug('preloading next');
            self.load_aya(self.get_aya() + 1);
        };
        this.get_id = function(a,filename) {
            if (!a) {
                a = self.get_aya();
            }
            var aya = a.toString();
            var sura = self.get_sura().toString();
            var zeros = '';
            for (var i = sura.length; i < 3; i++) {
                zeros = zeros.concat('0');
            }
            sura = zeros.concat(sura);
            zeros = '';
            for (var i = aya.length; i < 3; i++) {
                zeros = zeros.concat('0');
            }
            aya = zeros.concat(aya);

            if (!filename) {
                return self.get_recitor().id + ':' + sura + aya + '.mp3';
            } else {
                return sura + aya + '.mp3';
            }
        };
        this.get_url = function(a) {
            if (!a) {
                a = self.get_aya();
            }
            return q.get_random_mirror() + self.get_recitor().path + self.get_id(a,true);
        };
        this.load_aya = function(a) {
            var sound = sm.getSoundById(self.get_id(a), true);
            if (!sound) {
                sound = sm.createSound({
                    'id': a? self.get_id(a) : self.get_id(),
                    'url': a? self.get_url(a) : self.get_url(),
                    'stream': true,
                    'autoLoad': true,
                    'autoPlay': false,
                    'multiShot': false,
                    'onid3': self.onid3,
                    'onload': self.onload,
                    'onplay': self.onplay,
                    'onpause': self.onpause,
                    'onresume': self.onresume,
                    'onstop': self.onstop,
                    'whileloading': self.whileloading,
                    'whileplaying': self.whileplaying,
                    'onjustbeforefinish': self.onjustbeforefinish,
                    'onbeforefinish': self.onbeforefinish,
                    'onfinish': self.onfinish,
                    'onbeforefinishcomplete': self.onbeforefinishcomplete,
                    'onjustbeforefinishtime': 2000,
                    'onbeforefinishtime': 4000
                });
            }
            return sound;
        };
        this.set_aya = function(a) {
            q.d.bug('set_aya');
            if (!a) {
                a = self.get_aya();
            }
            self.last = self.current;
            var id = self.get_id(a);
            var sound = sm.getSoundById(id);
            if (!sound) {
                self.current = self.load_aya(a);
            } else {
                self.current = sound;
            }
            // debug
            window.sound = self.current;
            window.player = self;
            // end debug
            if (self.last && self.last.playState) {
                self.last.stop();
                self.set_playing(self.last.playState);
            }
            self.reset(true);
            if (self.auto) {
                if ((self.current.readyState == 1) || (self.current.readyState == 3)) {
                    self.play_aya();
                } else {
                    self.current._onload = self.play_aya;
                }
            }
            q.trigger('change-aya', a);
        };
        this.play_aya = function() {
            self.set_playing(true);
            self.current.play();
        };
        this.get_aya = function() {
            try {
                return q.get_state('aya').aya;
            } catch(e) {
                q.d.bug(e);
            }
        };
        this.get_sura = function() {
            try {
                return q.get_state('aya').sura;
            } catch(e) {
                q.d.bug(e);
            }
        };
        this.get_recitor = function() {
            return q.get_state('recitor');
        };
        this.set_recitor = function(recitor) {
            q.set_state('recitor', recitor);
            self.set_aya();
            return self.get_recitor();
        };
        this.get_last_aya = function() {
            try {
                return q.data.sura[self.get_sura()][1];
            } catch(e) {
                q.d.bug(e);
            } 
        };
        this.init = function() {
            q.d.bug('init!');
            self.oSMPlayer = new SMPlayer(self);
            function foo_bar(bar_width) {
                if (!bar_width) {
                    return false;
                }
                $(self.oSMPlayer.oBar).width(bar_width);
                $(self.oSMPlayer.oSplitPoints).width(bar_width);
                self.oSMPlayer._xMax = self.oSMPlayer.xMax;
                self.oSMPlayer.barWidth = self.oSMPlayer.oBar.offsetWidth;
                self.oSMPlayer.xMax = self.oSMPlayer.barWidth - self.oSMPlayer.oSlider.offsetWidth;
                var growth = self.oSMPlayer.xMax / self.oSMPlayer._xMax;
                self.oSMPlayer.move_split_points_after_resize(growth);
                var loaded = Math.ceil(self.oSMPlayer.xMaxLoaded * growth);
                self.oSMPlayer.xMaxLoaded = (loaded > self.oSMPlayer.xMax) ? self.oSMPlayer.xMax: loaded;
                var result = {
                    growth: growth,
                    x: self.oSMPlayer.x * growth,
                    start: self.oSMPlayer.xRangeStart * growth,
                    end: self.oSMPlayer.xRangeEnd * growth
                };
                self.oSMPlayer.move_slider_to(result.x);
                self.oSMPlayer.move_range_start_to(result.start);
                self.oSMPlayer.move_range_end_to(result.end);
            }
            $(self.oSMPlayer.oMain).resizable({
                handles: 'e,w',
                helper: 'proxy',
                transparent: true,
                stop: function(ev, ui) {
                    var bar_width = ui.size.width - 179;
                    foo_bar(bar_width);
                }
            });
            self.set_aya();
            q.bind('aya-changed', function() {
                q.d.bug('aya-changed');
                self.set_aya();
            });
            q.bind('sura-changed', function() {
                q.d.bug('sura-changed');
                self.set_aya();
            });
        };
    }
    return this.each(function() {
        var o = $(this);

        var template = $(
            '<div class="player">' +
                '<div class="split-points">' +
                    '<div class="left"></div>' +
                    '<div class="mid"></div>' +
                    '<div class="right"></div>' +
                '</div>' +
                '<div class="ui">' +
                    '<div class="left">' +
                        //'<a href="#" title="Pause/Play" onclick="quran.player.toggle_pause();return false" class="trigger pauseplay"><span></span></a>' +
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
                        '<div class="time" title="Time">-:--</div>' +
                        //'<a href="#" title="Previous" class="trigger prev" onclick="quran.player.oPlaylist.previous();return false"><span></span></a>' +
                        //'<a href="#" title="Next" class="trigger next" onclick="quran.player.oPlaylist.next();return false"><span></span></a>' +
                        //'<a href="#" title="Auto-Play/Continuous" class="trigger s1 autoplay" onclick="quran.player.toggle_auto();return false"><span></span></a>' +
                        //'<a href="#" title="Repeat" class="trigger s2 loop" onclick="quran.player.toggle_repeat();return false"><span></span></a>' +
                        //'<a href="#" title="Mute" class="trigger s3 mute" onclick="quran.player.toggle_mute();return false"><span></span></a>' +
                        //'<a href="#" title="Volume" onmousedown="quran.player.volume_down(event);return false" onclick="return false" class="trigger s4 volume"><span></span></a>' +
                        //'<a href="#" class="trigger help" onmousedown="alert(\'hi\');return false" onclick="return false;"><span></span></a>' +
                        //'<a href="#" title="More..." class="trigger dropdown" onclick="quran.player.toggle_recitors();return false"><span></span></a>' +
                    '</div>' +
                '</div>' +
                '<div class="more-options" style="display: none;">' +
                    '<div class="recitor-list">' +
                        '<ul>' +
                        '</ul>' +
                    '</div>' +
                    /*
                    '<div class="title" style="display: none;">Playlist</div>' +
                        '<div class="body track-list" style="display: none;">' +
                        '<ul style="display: none;">' +
                        '</ul>' +
                    '</div>' +
                    */
                '</div>' +
            '</div>'
        );

        var pauseplay = $('<a href="#" title="Pause/Play" class="trigger pauseplay"><span></span></a>').click(function() {
            o.player.toggle_pause();
            return false;
        });
        template.find('div.ui>div.left').append(pauseplay);
        var previous = $('<a href="#" title="Previous" class="trigger prev"><span></span></a>').click(function() {
            o.player.previous();
            return false;
        });
        template.find('div.ui>div.right').append(previous);
        var next = $('<a href="#" title="Next" class="trigger next"><span></span></a>').click(function() {
            o.player.next();
            return false;
        });
        template.find('div.ui>div.right').append(next);
        var autoplay = $('<a href="#" title="Auto-Play/Continuous" class="trigger s1 autoplay"><span></span></a>').click(function() {
            o.player.toggle_auto();
            return false;
        });
        template.find('div.ui>div.right').append(autoplay);
        var repeat = $('<a href="#" title="Repeat" class="trigger s2 loop"><span></span></a>').click(function() {
            o.player.toggle_repeat();
            return false;
        });
        template.find('div.ui>div.right').append(repeat);
        var mute = $('<a href="#" title="Mute" class="trigger s3 mute"><span></span></a>').click(function() {
            o.player.toggle_mute();
            return false;
        });
        template.find('div.ui>div.right').append(mute);
        var volume = $('<a href="#" title="Volume" class="trigger s4 volume"><span></span></a>').mousedown(function(ev) {
            o.player.volume_down(ev);
            return false;
        }).click(function() {
            return false;
        });
        template.find('div.ui>div.right').append(volume);
        var help = $('<a href="#" class="trigger help"><span></span></a>').click(function() {
            return false;
        });
        template.find('div.ui>div.right').append(help);
        var more = $('<a href="#" title="More..." class="trigger dropdown"><span></span></a>').click(function() {
            o.player.toggle_recitors();
            return false;
        });
        template.find('div.ui>div.right').append(more);

        o.append(template);
        
        $.each(quran.config.recitors, function(i,recitor) {
            var li = $('<li class="'+ ((i%2 == 0)? 'alt' : '') +'">');
            var a = $('<a href="#" onclick="return false;"><span>'+ recitor.name +'</span></a>')
                .mousedown(function() {
                    o.player.set_recitor(recitor);
                })
                .appendTo(li);
            ;
            o.find('.recitor-list>ul')
                .append(li)
            ;
        });

        o.player = new SoundPlayer();
        q.bind('application-state-restored',
        function(ev, state) {
            if (q._sound_ready) {
                o.player.init();
            }
            q._state_restored = true;
        });
        q.bind('sm-onload', function() {
            if (q._state_restored) {
                o.player.init();
            }
            q._sound_ready = true;
        });
    });
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
        q.trigger('sm-onload');
    }
}); 



$(document).ready(function() {
    $('#player').player({
    });
});
$(window).load(function() {

});
})(jQuery);
})(quran);
})(soundManager);
