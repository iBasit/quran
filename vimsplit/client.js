$.fn.splitPanel = function(a,b) {
    var config = {};
    if ((typeof a == 'object') && a.type && ((a.type == 'n') || (a.type == 'h') || (a.type || 'v') || (a.type == 'horizontal') || (a.type == 'vertical'))) {
        if (a.type == 'horizontal') {
            a.type = 'h';
        } else
        if (a.type == 'vertical') {
            a.type = 'v';
        }
        config = a;
    } else {
        if (!a) {
            return false;
        } else {
            if (b) {
                config = b;
            }
            if ((a == 'n') || (a == 'h') || (a == 'horizontal')) {
                config.type = 'h';
            } else
            if ((a == 'v') || (a == 'vertical')) {
                config.type = 'v';
            } else {
                return false;
            }
        }
    }

    var self = this;

    if (config.toolbar === undefined) {
        self.toolbar = $('<div class="toolbar">');
        self.toolbar
            .addClass('split-toolbar')
            .append(
                $('<a class="item" onclick="return false;">--</a>')
                .mousedown(function() {
                    self.split($(this).parent().parent(),{
                        type: 'h'
                    });
                })
            )
            .append(
                $('<a class="item" onclick="return false;">|</a>')
                .mousedown(function() {
                    self.split($(this).parent().parent(),{
                        type: 'v'
                    });
                })
            )
            .append(
                $('<a class="item" onclick="return false;">X</a>')
                .mousedown(function() {
                    self.close($(this).parent().parent());
                })
            )
            .append(
                $('<a class="fill" onclick="return false;">&#160;</a>')
                .mousedown(function() {
                })
            )
        ;
    } else {
        self.toolbar = config.toolbar;
    }

    if (self.toolbar && !((typeof self.toolbar == 'object') && self.toolbar.jquery)) {
        self.toolbar = false;
    }

    if (config.handle === undefined) {
        self.handle = $('<div class="handle">');
        self.handle.addClass('split-handle');

        self.handle
            .append('<img src="/shared/img/space.gif" width="1" height="1" style="visibility: hidden;" />')
        ;
    } else {
        self.handle = config.handle;
    }

    this.close = function(o) {

        if (o.next().length == 0) {
            o = $(o.parent().find('.split')[0]);
        } else {
            o = $(o.parent().find('.split')[1]);
        }
        var content = $(o[0].childNodes).clone(true);

        o = o.parent();
        o.empty();
        o.append(content);

    };

    this.split = function(o,conf) {
        conf = conf || {
            type: self.type,
            content: $('<div><span>empty</span></div>')
        };
        if (o.parent().hasClass('split') && !o.hasClass('split')) {
            o = o.parent();
        } else
        if (!o.parent().hasClass('split') && !o.hasClass('split')) {
            o.css({
                'overflow-y': 'hidden',
                'overflow-x': 'hidden',
                'position': 'relative'
            });
        }

        var split1 = $('<div>');
        split1.addClass(conf.type);
        split1.addClass('split');

        var split2 = $('<div>');
        split2.addClass(conf.type);
        split2.addClass('split');

        var content = $(o[0].childNodes).clone(true);
        content = $.grep(content,function(a,b) {
            if ($(a).hasClass('handle')) {
                return false;
            } else
            if ($(a).hasClass('toolbar')) {
                return false;
            } else {
                return true;
            }
        });
        o.empty();

        if (self.toolbar) {
            split1.append(new Toolbar(conf.type));
            split2.append(new Toolbar(conf.type));
        }

        split1.append(content);
        split2.append(conf.content);

        o.append(split1);
        o.append(split2);

        if (self.handle) {
            new Handle(split2,conf).insertBefore(split2);
        }

        setTimeout(function() {
            self.do_size(o);
            o.bind('resize', function(e,params) {
                //console.log('resize?',o[0],params.dir,params.chg);
                // if dir = left & this = left, target = right
                // if dir = left & this = right, target = left
                // if dir = right & this = left, target = right
                // if dir = right & this = right, target = left
                var target, sibling, handle, which = params.foo;
                if (which == 'left') {
                    target = $(o.find('>.split')[1]);
                    sibling = $(o.find('>.split')[0]);
                } else
                if (which == 'right') {
                    target = $(o.find('>.split')[0]);
                    sibling = $(o.find('>.split')[1]);
                }
                handle = o.find('>.handle');

                var sign, dir = params.dir;
                if ((dir == 'left') && (which == 'left')) {
                    sign = -1;
                } else
                if ((dir == 'right') && (which == 'left')) {
                    sign = +1;
                } else
                if ((dir == 'left') && (which == 'right')) {
                    sign = +1;
                } else
                if ((dir == 'right') && (which == 'right')) {
                    sign = -1;
                }

                var min, property, type, method;
                if (o.hasClass('v')) {
                    min = 30;
                    type = 'v';
                    property = 'width';
                    method = 'innerWidth';
                } else {
                    min = 21;
                    type = 'h';
                    property = 'height';
                    method = 'innerHeight';
                }

                var change = sign * params.chg;

                var sum, goal, diff;
                sum = target[method]() + sibling[method]() + handle[method]() + change;
                goal = o[method]();
                diff = goal - sum;

                if (diff) {
                    change += -sign * diff;
                }

                var current = target[method]();
                var css = {};

                function set_size(size) {
                }

                if (current + change < min) {
                    css[property] = min;
                    target.css(css);
                } else {
                    css[property] = current + change;
                    target.css(css);
                }
            });
        },10);

        return {
            split1: split1,
            split2: split2
        };
    };

    this.do_size = function(a,b) {
        var o, change, action;

        o = a;

        if (typeof b == 'number') {
            change = b;
        } else {
            change = 0;
            if (typeof b == 'string') {
                action = b;
            } else {
                action = '';
            }
        }

        var type, property, method;
        if ($(o.children()[0]).hasClass('v')) {
            type = 'v';
            property = 'width';
            method = 'innerWidth';
        } else {
            type = 'h';
            property = 'height';
            method = 'innerHeight';
        }

        var left = $(o.find('>.split')[0]);
        var right = $(o.find('>.split')[1]);
        var handle = $(o.find('>.handle')[0]);

        var l = left[method]() - change;
        var r = right[method]() + change;

        var lsize, rsize;
        lsize = Math.floor((l / (l + r)) * o[method]() - handle[method]()/2);
        rsize = Math.floor((r / (l + r)) * o[method]() - handle[method]()/2);

        /*
        var min = 30;
        if (lsize < min) {
            lsize = Math.floor(min - handle[method]()/2);
            rsize = Math.floor(o[method]() - min - handle[method]()/2);
        }
        if (rsize < min) {
            rsize = Math.floor(min - handle[method]()/2);
            lsize = Math.floor(o[method]() - min - handle[method]()/2);
        }
        */

        var sum, goal, sgdiff;
        sum  = lsize + rsize + handle[method]();
        goal = o[method]();
        diff = goal - sum;
        if (sum < goal) {
            if (!(diff%2)) {
                lsize += diff/2;
                rsize += diff/2;
            } else {
                lsize += (diff-1)/2;
                rsize += (diff-1)/2;
                if (Math.round(Math.random())) {
                    lsize += 1;
                } else {
                    rsize += 1;
                }
            }
        }

        var css = {};
        if (lsize < rsize) {
            css[property] = lsize;
            left.css(css);
            css[property] = rsize;
            right.css(css);
        } else {
            css[property] = rsize;
            right.css(css);
            css[property] = lsize;
            left.css(css);
        }
        
        var direction;
        if (-change < 0) {
            direction = 'left'
        } else
        if (-change > 0) {
            direction = 'right';
        }

        if (direction) {
            left.trigger('resize',{ foo: 'left', dir: direction, chg: Math.abs(change) });
            right.trigger('resize',{ foo: 'right', dir: direction, chg: Math.abs(change) });
        }
    };

    function Toolbar(type) {
        var my = this;

        my.toolbar = self.toolbar.clone(true);
        my.toolbar.addClass(type);

        return my.toolbar;
    };
    
    function Handle(o,conf) {
        var my = this;

        my.handle = self.handle.clone(true);
        my.handle
            .addClass(conf.type)
            .mousedown(function(e) {
                new handleHandler(e);
                e.stopPropogation? e.stopPropogation() : e.cancelBubble = true;
                return false;
            })

        function handleHandler(e) {
            var my = this;
    
            this.o     = $(e.originalTarget);
            this.ocx   = e.clientX;
            this.ocy   = e.clientY;
            this.op    = my.o.parent();
            this.onext = my.o.next();
            this.oprev = my.o.prev();

            this.proxy = $('<div><span>&#160;</span></div>');
    
            this.get_diff = function(x,y) {
                var diff, keyword, comparison;

                if (conf.type == 'v') {
                    diff = x - my.ocx;
                    keyword = 'width';
                } else
                if (conf.type == 'h') {
                    diff = y - my.ocy;
                    keyword = 'height';
                }
    
                if (diff < 0) {
                    comparison = 'oprev';
                } else {
                    comparison = 'op';
                }
    
                return -diff;
            };
    
            this.mousemove = function(e) {
                var offset, diff = my.get_diff(e.clientX, e.clientY);
                if (conf.type == 'v') {
                    offset = my.o.offset().left - diff;
                    my.proxy.css({
                        left: offset
                    });
                } else
                if (conf.type == 'h') {
                    offset = my.o.offset().top - diff;
                    my.proxy.css({
                        top: offset
                    });
                }
            };
    
            this.mouseup = function(e) {
                var diff = my.get_diff(e.clientX, e.clientY);
    
                self.do_size(my.op,diff);
    
                $(document.body).css({
                    cursor: 'auto'
                });
                $(document).unbind('mousemove');
                $(document).unbind('mouseup');
    
                my.proxy.remove();
                
            };
    
            this.mousedown_init = function() {
                $(document).bind('mousemove', my.mousemove);
                $(document).bind('mouseup', my.mouseup);
    
                my.proxy.css({
                    border: '1px dotted black',
                    position: 'fixed',
                    left: my.o.offset().left,
                    top: my.o.offset().top
                });
                if (conf.type == 'v') {
                    $(document.body).css({
                        cursor: 'ew-resize'
                    });
                    my.proxy.css({
                        height: my.onext.innerHeight(),
                        width: 1
                    });
                } else
                if (conf.type == 'h') {
                    $(document.body).css({
                        cursor: 'ns-resize'
                    });
                    my.proxy.css({
                        height: 1,
                        width: my.onext.innerWidth(),
                    });
                }
                my.op.append(my.proxy);
            };
    
            this.mousedown_init();
        };

        return my.handle;
    };


    return this.each(function() {
        var o = $(this);
        var splits = self.split(o,config);
    });
};
$(document).ready(function() {
$('#test').splitPanel('v',{
    content: 'foo'
});
/*
$('#foo').splitPanel('h',{
    s1_id: 'two',
    s2_id: 'bar',
    s2_content: 'bar'
});
*/
});
/*
function default_widths(o) {
    var w = o.parent().width();
    var n = o.parent().find('>div[addClass$=box]').length;
    o.css({
        width: (100/n) + '%'
    });
    if (!o[0].nextElementSibling) {
        //o.prepend('<div style="width: '+ v_handle_size +'px; height: 100%; display: inline; position: relative; z-index:9999999999999; float: left;" class="'+ v_handle_addClass +'"></div>');
        var v_split = $('<div class="'+ v_handle_addClass +'"></div>')
            .css({
                width: '5px',
                height: '100%',
                position: 'absolute',
                left: '0px',
                'z-index': '99' 
            })
        ;
        o.prepend(v_split);
    }
};

function default_heights(o) {
    var h = o.parent().height();
    var n = o.parent().find('>div[addClass$=box]').length;
    o.css({
        //height: Math.ceil(h / n)
        height: (100/n) + '%'
    });

    if (!o[0].nextElementSibling) {
        o.prepend('<div style="height: '+ h_handle_size +'px; width: 100%; position: relative; top: 0px; z-index: 98;" class="'+ h_handle_addClass +'"></div>');
    }
};

function proportional_widths(o) {
};

function proportional_heights(o) {
};

var foo = function() {
    var self = this;

    this.box_wrap   = $('.box_wrap');
    this.h_divs = $('.h-box>div[addClass$=box]');
    this.v_divs = $('.v-box>div[addClass$=box]');

    self.box_wrap.each(function() {
        var o = $(this);
        var a = 20;
        var b = 20;
        var mh = 40;
        var mw = 80;
        var h = o.parent().innerHeight();
        var w = o.parent().innerWidth();
        o.height(
            h - (b + mh) - a
        );
        o.width(
            w - (b + mw) - a
        );
    });

    self.v_divs.each(function() {
        default_widths.call(foo,$(this));
    });
    self.h_divs.each(function() {
        default_heights.call(foo,$(this));
    });
};
foo.prototype.bar = function() {
    this.h_divs.each(function() {
        proportional_widths.call(foo,$(this));
    });
    this.v_divs.each(function() {
        proportional_heights.call(foo,$(this));
    });
};
};
$(document).ready(function() {
    $('.vim-split').vim_split('v', {
    });
});
*/
/*
function default_widths(o) {
    var w = o.parent().width();
    var n = o.parent().find('>div[addClass$=box]').length;
    o.css({
        width: (100/n) + '%'
    });
    if (!o[0].nextElementSibling) {
        //o.prepend('<div style="width: '+ v_handle_size +'px; height: 100%; display: inline; position: relative; z-index:9999999999999; float: left;" class="'+ v_handle_addClass +'"></div>');
        var v_split = $('<div class="'+ v_handle_addClass +'"></div>')
            .css({
                width: '5px',
                height: '100%',
                position: 'absolute',
                left: '0px',
                'z-index': '99' 
            })
        ;
        o.prepend(v_split);
    }
};

function default_heights(o) {
    var h = o.parent().height();
    var n = o.parent().find('>div[addClass$=box]').length;
    o.css({
        //height: Math.ceil(h / n)
        height: (100/n) + '%'
    });

    if (!o[0].nextElementSibling) {
        o.prepend('<div style="height: '+ h_handle_size +'px; width: 100%; position: relative; top: 0px; z-index: 98;" class="'+ h_handle_addClass +'"></div>');
    }
};

function proportional_widths(o) {
};

function proportional_heights(o) {
};

var foo = function() {
    var self = this;

    this.box_wrap   = $('.box_wrap');
    this.h_divs = $('.h-box>div[addClass$=box]');
    this.v_divs = $('.v-box>div[addClass$=box]');

    self.box_wrap.each(function() {
        var o = $(this);
        var a = 20;
        var b = 20;
        var mh = 40;
        var mw = 80;
        var h = o.parent().innerHeight();
        var w = o.parent().innerWidth();
        o.height(
            h - (b + mh) - a
        );
        o.width(
            w - (b + mw) - a
        );
    });

    self.v_divs.each(function() {
        default_widths.call(foo,$(this));
    });
    self.h_divs.each(function() {
        default_heights.call(foo,$(this));
    });
};
foo.prototype.bar = function() {
    this.h_divs.each(function() {
        proportional_widths.call(foo,$(this));
    });
    this.v_divs.each(function() {
        proportional_heights.call(foo,$(this));
    });
};
$(document).ready(function() {
    if (foo._ready) {
        foo = new foo();
    } else {
        foo._ready = true;
    }
});
$(window).load(function() {
    if (foo._ready) {
        foo = new foo();
    } else {
        foo._ready = true;
    }
});
$(window).resize(foo.bar);
*/

