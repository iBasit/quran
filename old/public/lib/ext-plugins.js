Ext.namespace('Ext.ux');
/**
 * @class Ext.ux.SliderTip
 * @extends Ext.Tip
 * Simple plugin for using an Ext.Tip with a slider to show the slider value
 */
Ext.ux.SliderTip = Ext.extend(Ext.Tip, {
    minWidth: 10,
    offsets : [0, -10],
    init : function(slider) {
        slider.on('dragstart', this.onSlide, this);
        slider.on('drag', this.onSlide, this);
        slider.on('dragend', this.hide, this);
        slider.on('destroy', this.destroy, this);
    },
    onSlide : function(slider){
        this.show();
        this.body.update(this.getText(slider));
        this.doAutoWidth();
        this.el.alignTo(slider.thumb, 'b-t?', this.offsets);
    },
    getText : function(slider){
        return slider.getValue();
    }
});
Ext.ux.Slider = function(config){
	Ext.ux.Slider.superclass.constructor.call(this, config);
	this.addEvents({
		'slide' : true,
    'slidestart': true,
    'slideend': true,
		'slideup' : true,
		'slidedown' : true
	});
};
Ext.extend(Ext.ux.Slider, Ext.Slider, {
    animate: false
    ,onRender: function() {
        Ext.ux.Slider.superclass.onRender.apply(this, arguments);

    }
    ,afterRender: function() {
        Ext.ux.Slider.superclass.afterRender.apply(this, arguments);

        //this.on('dragstart', function() { this.tooltip.onSlide.call(this.tooltip,this); }, this);
        this.on('dragstart', function() { this.fireEvent('slidestart'); }, this);
        this.on('dragend', function() { this.fireEvent('slideend'); }, this);
        this.on('drag', function() { this.fireEvent('slide'); }, this);

        this.on('slidestart', this.onSlideStart, this);//this.tooltip.show, this.tooltip);
        this.on('slideend',   this.onSlideEnd, this);//this.tooltip.hide, this.tooltip);
        this.on('slide',      this.onSlide, this);
        //this.on('destroy',    this.tooltip.destroy, this.tooltip);
    		this.innerEl.on("mousewheel", this.handleMouseWheel, this);
        //Ext.util.Observable.capture
    }
    ,wheel: {
        timestamp: 0,
        diff: 0
    }
// <BB[AtWork]> so, thing.onMousedown=thing.onMouseup=thing.onMousemove=function() { if (iHaveATimeout) clearTimeout(iHaveATimeout); iHaveATimeout = setTimeout("somecode", 250); };
    ,handleMouseWheel: function(e) {
        var delta = e.getWheelDelta();
        var $this = this;
        this.wheel.diff = this.wheel.timestamp - e.browserEvent.timeStamp;
        if (this.wheel.diff <= -1000) {
            this.fireEvent('slidestart');
        }
        if(delta > 0) {
            this.onSlideUp.call(this, delta);
            e.stopEvent();
        } else if (delta < 0) {
            this.onSlideDown.call(this, delta);
            e.stopEvent();
    		}
        if (this.wheel.timeout) clearTimeout(this.wheel.timeout);
        this.fireEvent('slide');
        this.wheel.timeout = setTimeout(function(){
            $this.fireEvent('slideend');
        },600);
    }
    ,onSlideStart: function() {
        this.tooltip.show();
    }
    ,onSlideEnd: function() {
        this.tooltip.hide.defer(400,this.tooltip);
        // Ajax, fire only once, not multiple times
        Ext.Ajax.autoAbort = true;
        Ext.Ajax.request({
            url: 'page/get',
            method: 'GET',
            params: { id: this.getValue() },
            success: function(response, options) {
                $.response = response;
                //console.log('response',response);
                /*
                $.response = response;
                var page = new Ext.Panel({

                    bodyStyle: {
                        'font-size': font_size + 'em',
                        'direction': 'rtl',
                        'text-align': 'justify',
                        'padding-left': '25px',
                        'padding-right': '25px',
                        'padding-top': '10px',
                        'padding-bottom': '10px',
                        'border': '1px solid black'
                    },
                    html: response.responseText,

                    bbar: [{ xtype: 'tbfill' }, font_minus, font_plus]
                });
                */
                //$.page = page;
                var content = Ext.getCmp('quran-reader-content');
                //content.body.dom.textContent = response.responseXML;
                content.body.update(response.responseText)
                content.format_appearance(true);
                //$.content = content;
                //$.content = content;
                //content.html = response.responseText;
                //if (content.items) content.remove(0);
                //content.add(page);
                //content.doLayout();
            }
        });
    }
    ,onSlideUp: function(delta) {
        this.setValue(this.getValue()+1);
    }
    ,onSlideDown: function(delta) {
        this.setValue(this.getValue()-1);
        //this.onSlideStart();
        //this.onSlide();
        //this.onSlideEnd();
    }
    ,onSlide: function() {
        this.tooltip.onSlide.call(this.tooltip, this);
    }
    ,tooltip: new (Ext.extend(Ext.Tip, {
            minWidth: 10,
            offsets : [0, -10],
            onSlide : function(slider) {
                this.body.update(this.getText(slider));
                this.el.alignTo(slider.thumb, 'b-t?', this.offsets);
            },
            getText : function(slider) {
                return String.format('<strong>Page {0}</strong>', slider.getValue());
            }
        }))
    /*
    ,listeners: {
    }
    */
    /*,handleMouseWheel: function(e) {
        var delta = e.getWheelDelta();
        var value = this.getValue();
        if(delta > 0) {
            this.setValue(value+1);
            e.stopEvent();
        } else if (delta < 0) {
            this.setValue(value-1);
            e.stopEvent();
    		}
    }*/
    /*,plugins: new Ext.ux.SliderTip({
                    getText: function(slider) {
                        return String.format('<strong>Page {0}</strong>', slider.getValue());
                    }
                })*/
    /*,plugins: new (Ext.extend(Ext.Tip, {
        minWidth: 10,
        offsets : [0, -10],
        init : function(slider) {
            slider.on('dragstart', this.onSlide, this);
            slider.on('drag', this.onSlide, this);
            slider.on('dragend', this.hide, this);
            slider.on('destroy', this.destroy, this);
        },
        onSlide : function(slider){
            this.show();
            this.body.update(this.getText(slider));
            this.doAutoWidth();
            this.el.alignTo(slider.thumb, 'b-t?', this.offsets);
        },
        getText : function(slider){
            return slider.getValue();
        }
    }))*/
});


