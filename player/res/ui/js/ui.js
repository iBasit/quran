/*
 * Event
 * Model
 *
 * changed: generic, return aya object with id, sura, and aya
 * aya-changed: returns aya
 * sura-changed: returns sura
 * recitor-changed: returns
 * tafseer-changed
 * translation-changed
 * font-changed
 * etc
 *
 * opposite format indicates the imperative, i.e. "please change the aya", e.g.
 * change
 * change-sura
 * change-recitor
 *
 * ...most of the event model is unimplemented yet
 *
 * other events are triggerred and bound on an as-needed basis for properly sequencing methods
 * without calling each other directly, i.e. in instances where loose coupling is better (for
 * example, when two separate scripts existing in two separate files need to talk to each
 * other)
 *
 * e.g.the player playlist must be created after the ayas have been built, but the
 * ayas are built only changed is triggerred, therefore at the end of the method thats builds
 * the ayas we fire a new event so that the player playlist can bind to it and sequence 
 * correctly...
 *
 * e.g. aya-changed is bound to set_sura which triggers 'sura-set' which binds to a function
 * that builds a new playlist
 *
 */
/*************** app ************/

(function(q) {
(function($) {
  q.d = new function() {
    var self = this;
    this._direction = 1;
    this._chg_color = 'blue';
    if (!this._dec_blue) {
        this._dec_blue = 100;
    }
    if (!this._dec_green) {
        this._dec_green = 100;
    }
    if (!this._dec_red) {
        this._dec_red = 100;
    }
    function do_color() {
        if (self._dec_blue < 100) {
            self._dec_blue = 100;
            self._chg_color = 'green';
        }
        if (self._dec_blue > 255) {
            self._dec_blue = 255;
            self._chg_color = 'green';
        }
        if (self._dec_green < 100) {
            self._dec_green = 100;
            self._chg_color = 'red';
        }
        if (self._dec_green > 255) {
            self._dec_green = 255;
            self._chg_color = 'red';
        } 
        if (self._dec_red < 100) {
            self._direction = 1;
            self._dec_red = 100;
            self._chg_color = 'blue';
        }
        if (self._dec_red > 255) {
            self._dec_red = 255;
            self._chg_color = 'blue';
            self._direction = -1;
        }
        eval("self._dec_"+ self._chg_color + " += self._direction * 16;");
    }
    function resize_debugger() {
    
        $('#soundmanager-debug')
            .height($(window).height()*0.236)
            .resizable({
                handles: 'n,w,nw',
                transparent: true,
                helper: 'proxy',
                containment: 'document.body',
                ghost: true
            })
        ;
    };
    $(window).error(function(e,ev) {
        self.bug('WINDOW ERROR: '+ e +' '+ ev);
    });
    $(window).resize(resize_debugger);
    $(document).ready(resize_debugger);
    this.bug = function() {
        do_color();
        var msg = [];
        var special = false;
        var now = new Date();
        var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
        for (var i=0; i<arguments.length; i++) {
            var m;
            if (arguments[i] === null) {
              m = 'null';
              special = true;
            } else
            if (arguments[i] === undefined) {
              m = 'undefined';
              special = true;
            } else
            if (arguments[i] === true) {
              m = 'true';
              special = true;
            } else
            if (arguments[i] === false) {
              m = 'false';
              special = true;
            } else
            if (typeof arguments[i] == 'object') {
              if (arguments[i].name && arguments[i].lineNumber && arguments[i].message) {
                m = arguments[i].lineNumber +": "+ arguments[i].name +": "+ arguments[i].message;
                special = true;
              } else {
                m = arguments[i];
              }
            } else {
              m = arguments[i];
            }
            msg.push(m);
        }
        msg = msg.join(' ');
        soundManager._writeDebug("<a style='font-family: lime, vixus, neoxis, monospace, sans-serif; font-size: 10px; color: gray; text-decoration: none;' href='#' onclick='$(\"#soundmanager-debug\").html(\"\");'>"+ time +"</a>: <span style='"+ (special? "text-decoration: underline;" : "" ) +"font-family: lime, vixus, neoxis, monospace, sans-serif; font-size: 10px; color: rgb("+ self._dec_red +","+ self._dec_green +","+ self._dec_blue +");'>" + msg + "</span>");
    }
  }
})(jQuery);
})(quran);

(function(q) {
(function($) {
    quran.trigger = function(ev,data) {
        $(quran).trigger(ev,data);
    };
    quran.one = function(ev,data) {
        $(quran).one(ev,data);
    };
    quran.bind = function(ev,fn) {
        $(quran).bind(ev,fn);
    }; 
    quran._state = {};
    quran.set_state = function(key,data) {
        quran._state[key] = data;
        return quran._state[key];
    };
    quran.get_state = function(key) {
        return quran._state[key] || null;
    };
    quran.save_application_state = function() {
      //--console.log('Save app state');
        var keys = new Array();
        for (var key in quran._state) {
            if (typeof quran._state[key] == 'object') {
                for (var key2 in quran._state[key]) {
                    if ((typeof quran._state[key][key2] == 'number') || (typeof quran._state[key][key2] == 'string')) {
                        keys.push(key + '_' + key2);
                        $.cookie(key + '_' + key2, quran._state[key][key2], { expires: 365 });
                    }
                }
            } else if ((typeof quran._state[key] == 'number') || (typeof quran._state[key] == 'string')) {
                keys.push(key);
                $.cookie(key, quran._state[key], { expires: 365 });
            }
        }
        $.cookie('keys',keys);
    };
    quran.restore_application_state = function() {
        if ($.cookie('keys')) {
            var keys = $.cookie('keys').split(',');
            var objects = {};
            $.each(keys, function(n,key) {
                if (key.match(/_/)) {
                    var key1 = key.split('_')[0];
                    var key2 = key.split('_')[1];
                    var value;
                    eval('objects.'+ key1 +' = objects.'+ key1 +' || {};');
                    if ($.cookie(key).match(/^[0-9]+$/)) {
                        value = parseInt($.cookie(key));
                    } else
                    if (typeof ($.cookie(key)) == 'string') {
                        value = "\""+ $.cookie(key) + "\"";
                    }
                    eval("$.extend(objects."+ key1 +",{ "+ key2 +":"+ value +" });");
                } else {
                    quran.set_state(key, $.cookie(key));
                }
            });
            for (var key in objects) {
                quran.set_state(key, objects[key]);
            }
        }
        if (!quran.get_state('recitor')) {
            quran.set_state('recitor', quran.config.recitors[0]);
        }
        if (!quran.get_state('aya')) {
            quran.set_state('aya', {
                id: 1,
                sura: 1,
                aya: 1
            });
        }
        // TODO: make this cleaner by return a comprehensive object as a parameter
        // passed to the callbacks
        // In the same fashion we could pass aya 1, sura 1, defaults etc. if there is no cookie,
        // using this event callback
        quran.trigger('application-state-restored', {
            aya: quran.get_state('aya'),
            recitor: quran.get_state('recitor')
        });
    };
    quran.get_fastest_mirror = function() {
        var fastest;
        $.each(quran.config.mirrors,function(n,o) {
            if (o.status == 200) {
                if ((!fastest) || (o.ping < fastest.ping)) {
                    fastest = o;
                }
            }
        });
        if (fastest) {
            return fastest.url;
        } else {
            return false;
        }
    };
    quran.get_random_mirror = function() {
        function get_random(count) {
            if (!count) {
                count = 0;
            }
            var random = quran.config.mirrors[Math.floor(Math.random()*quran.config.mirrors.length)];
            if (random.status == 200) {
                return random;
            } else {
                count = count + 1;
                if (count > quran.config.mirrors.length) {
                    return false;
                } else {
                    get_random(count);
                }
            }
        }
        var random = get_random();
        if (random) {
            return random.url;
        } else {
            return false;
        }
    };
    $(window).load(function() {
        quran.restore_application_state();
    });
    $(window).unload(function() {
        quran.save_application_state();
    });
    var widgets_selector = '#widgets';
    quran._init_widget = function(widget,options) {
        var callbacks = options.bind;
        $.each(callbacks, function(ev_name, callback) {
            quran.bind(ev_name, function(ev,data) {
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
    quran.add_widget = function(widget_name) {
        $(document).ready(function() {
            $(widgets_selector)[widget_name]();
        });
    };
    quran.remove_widget = function(id) {
    };
    function get_obj_with_sura_keyword(keyword) {
        var obj = quran.get_state('aya');
        var sura,id;
        if (obj) {
            if (keyword == 'next') {
                sura = obj.sura + 1;
            } else
            if (keyword == 'prev') {
                sura = obj.sura - 1;
            }
            if ((sura >= 1) &&  (sura <= 114)) {
                id = quran.data.sura[sura][0] + 1;
                return {
                    id: id,
                    sura: sura,
                    aya: 1
                };
            } else
            if (sura == 0) {
                return {
                    id: 6236,
                    sura: 114,
                    aya: 1
                };
            } else
            if (sura == 115) {
                return {
                    id: 1,
                    sura: 1,
                    aya: 1
                };
            }
            return obj;
        }
        return {
            id: 1,
            sura: 1,
            aya: 1
        };
    }
    function get_obj_with_aya_keyword(keyword,continue_past_sura) {
        continue_past_sura = (continue_past_sura === undefined)?  true : continue_past_sura;
        var obj = quran.get_state('aya');
        if (obj) {
            if (keyword == 'next') {
                if ((obj.id + 1) <= quran.data.sura[obj.sura + 1][0]) {
                    return {
                        id: obj.id + 1,
                        sura: obj.sura,
                        aya: obj.aya + 1
                    };
                } else
                if ((obj.sura < 114) && continue_past_sura) {
                    return {
                        id: obj.id + 1,
                        sura: obj.sura + 1,
                        aya: 1
                    };
                }
            } else
            if (keyword == 'prev') {
                if ((obj.id - 1) > quran.data.sura[obj.sura][0]) {
                    return {
                        id: obj.id - 1,
                        sura: obj.sura,
                        aya: obj.aya - 1
                    };
                } else
                if ((obj.sura > 1) && continue_past_sura) {
                    return {
                        id: obj.id - 1,
                        sura: obj.sura - 1,
                        aya: quran.data.sura[obj.sura - 1][1]
                    };
                }
            }
            return obj;
        }
        return {
            id: 1,
            sura: 1,
            aya: 1
        };
    }
    function get_obj_with_id(id) {
        var sura, aya;
        id = parseInt(id);
        for (var i=1; i<(quran.data.sura.length-1); i++) {
            if (quran.data.sura[i+1][0] >= id) {
                sura = i;
                aya = id - quran.data.sura[i][0];
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
    function get_obj_with_sura_and_aya(sura,aya) {
        var id;
        sura = parseInt(sura);
        aya  = parseInt(aya);
        if (quran.data.sura[sura] && (aya <= quran.data.sura[sura][1])) {
            id = quran.data.sura[sura][0] + aya;
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
    function get_obj_with_sura(sura) {
        var id, aya;
        sura = parseInt(sura);
        if (quran.data.sura[sura] && (sura >= 1) && (sura <= 114)) {
            id = quran.data.sura[sura][0] + 1;
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
    function get_obj_with_aya(aya) {
        var obj = quran.get_state('aya');
        if (obj) {
            var diff = aya - obj.aya;
            if ((aya >= 1) && (aya <= quran.data.sura[obj.sura][1])) {
                return {
                    id: obj.id + diff,
                    aya: aya,
                    sura: obj.sura
                };
            }
            return obj;
        }
        return {
            id: 1,
            sura: 1,
            aya: 1
        };
    }
    function change(ev, keyword_or_obj) {
        var keyword, obj;
        var before, after;
        
        before = quran.get_state('aya');
    
        if (typeof keyword_or_obj == 'string') {
            keyword = keyword_or_obj;
        } else 
        if (typeof keyword_or_obj == 'object') {
            obj = keyword_or_obj;
        }
        if (keyword) { // next, prev
            if ((keyword == 'next') || (keyword == 'prev')) {
                quran.set_state('aya',get_obj_with_aya_keyword(keyword));
            }
        }
        if (obj) {
            if (obj.id) {
                quran.set_state('aya', get_obj_with_id(obj.id));
            } else
            if (obj.sura && obj.aya) {
                quran.set_state('aya', get_obj_with_sura_and_aya(obj.sura,obj.aya));
            } else
            if (obj.sura) {
                quran.set_state('aya', get_obj_with_sura(obj.sura));
            }
        }
    
        after = quran.get_state('aya');
    
        if (!before || (before.id != after.id)) {
            quran.trigger('changed', after);
        }
        if (!before || (before.sura != after.sura)) {
            quran.trigger('sura-changed', after.sura);
        }
        if (!before || (before.aya != after.aya)) {
            quran.trigger('aya-changed', after.aya);
        }
    }
    function change_sura(ev, sura) {
        var before, after;

        before = quran.get_state('aya');

        if ((sura == 'next') || (sura == 'prev')) {
            quran.set_state('aya',get_obj_with_sura_keyword(sura));
        } else
        if (typeof sura == 'number') {
            quran.set_state('aya', get_obj_with_sura(sura));
        }

        after = quran.get_state('aya');

        if (!before || (before.sura != after.sura)) {
            quran.trigger('sura-changed', after.sura);
        }
    }
    function change_aya(ev, aya) {
        //console.log('change aya', ev, aya);
        var before, after;

        before = quran.get_state('aya');

        if ((aya == 'next') || (aya == 'prev')) {
            quran.set_state('aya',get_obj_with_aya_keyword(aya,false));
        } else
        if (typeof aya == 'number') {
            quran.set_state('aya',get_obj_with_aya(aya));
        }

        after = quran.get_state('aya');

        if (!before || (before.aya != after.aya)) {
            quran.trigger('aya-changed', after.aya);
        }
    }
    function change_recitor(ev, recitor) {
        var recitor_before, recitor_after;
    
        recitor_before = quran.get_state('recitor');
    
        quran.set_state('recitor', recitor);
    
        recitor_after = quran.get_state('recitor');
    
        if (!recitor_before || (recitor_before != recitor_after)) {
            quran.trigger('recitor-changed', recitor_after);
        }
    }
    quran.bind('change', change);
    quran.bind('change-sura', change_sura);
    quran.bind('change-aya', change_aya);
    quran.bind('change-recitor', change_recitor);
})(jQuery);
})(quran);
