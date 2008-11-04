/*
 * @class
 *        Ext.ux.Media.Flash,
 *        Ext.ux.FlashComponent (xtype: uxflash)
 *        Ext.ux.FlashPanel     (xtype: uxflashpanel, flashpanel)
 *        Ext.ux.FlashWindow
 *
 * Version:  RC1
 * Author: Doug Hendricks. doug[always-At]theactivegroup.com
 * Copyright 2007-2008, Active Group, Inc.  All rights reserved.
 *
 ************************************************************************************
 *   This file is distributed on an AS IS BASIS WITHOUT ANY WARRANTY;
 *   without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE.
 ************************************************************************************

 License: ux.Media.Flash classes are licensed under the terms of
 the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 that the code/component(s) do NOT become part of another Open Source or Commercially
 licensed development library or toolkit without explicit permission.

 Donations are welcomed: http://donate.theactivegroup.com

 License details: http://www.gnu.org/licenses/lgpl.html

 Notes: the <embed> tag is NOT used(or necessary) in this implementation
 Version:  Rc1
           Adds inline media rendering within markup: <div><script>document.write(String(new Ext.ux.Media.Flash(mediaCfg)));</script></div>
           New extensible classes :
              ux.Media.Flash
              ux.FlashComponent
              ux.FlashPanel
              ux.FlashWindow

   A custom implementation for advanced Flash object interaction
       Supports:
            version detection,
            version assertion,
            Flash Express Installation (inplace version upgrades),
            and custom Event Sync for interaction with SWF.ActionScript.

    mediaCfg: {Object}
         {
           url       : Url resource to load when rendered
          ,loop      : (true/false)
          ,start     : (true/false)
          ,height    : (defaults 100%)
          ,width     : (defaults 100%)
          ,scripting : (true/false) (@macro enabled)
          ,controls  : optional: show plugins control menu (true/false)
          ,eventSynch: (Bool) If true, this class initializes an internal event Handler for
                       ActionScript event synchronization
          ,listeners  : {"mouseover": function() {}, .... } DOM listeners to set each time the Media is rendered.
          ,requiredVersion: (String,Array,Number) If specified, used in version detection.
          ,unsupportedText: (String,DomHelper cfg) Text to render if plugin is not installed/available.
          ,installUrl:(string) Url to inline SWFInstaller, if specified activates inline Express Install.
          ,installRedirect : (string) optional post install redirect
          ,installDescriptor: (Object) optional Install descriptor config
         }
    */

(function(){

   var ux = Ext.ux.Media;

    ux.Flash = Ext.extend( ux, {
        constructor: function() {
            ux.Flash.superclass.constructor.apply(this, arguments);
        },

        SWFObject      : null,

        varsName       :'flashVars',

        mediaType: Ext.apply({
              tag      : 'object'
             ,cls      : 'x-media x-media-swf'
             ,type     : 'application/x-shockwave-flash'
             ,data     : "@url"
             ,loop     : null
             ,scripting: "sameDomain"
             ,start    : true
             ,unsupportedText : {cn:['The Adobe Flash Player{0}is required. Current Version:{1}',{tag:'br'},{tag:'a',cn:'The free download is available here.',href:'http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash',target:'_flash'}]}
             ,params   : {
                  movie     : "@url"
                 ,play      : "@start"
                 ,loop      : "@loop"
                 ,menu      : "@controls"
                 ,quality   : "high"
                 ,bgcolor   : "#FFFFFF"
                 ,wmode     : "opaque"
                 ,allowscriptaccess : "@scripting"
                }
             },Ext.isIE?{classid :"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                   ,codebase:"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"
                   }:false),

        getMediaType: function(){
             return this.mediaType;
        },
        // private
        initMedia : function(){

            var mc = Ext.apply({url:false}, this.mediaCfg||{});

            if(mc.url ){

                var requiredVersion = (this.requiredVersion = mc.requiredVersion || this.requiredVersion|| false ) ;

                var hasFlash  = !!(this.playerVersion = this.detectVersion());
                var hasRequired = hasFlash && (requiredVersion?this.assertVersion(requiredVersion):true);

                var unsupportedText = this.assert(mc.unsupportedText || this.unsupportedText || (this.getMediaType()||{}).unsupportedText,null);
                if(unsupportedText){
                     unsupportedText = Ext.DomHelper.markup(unsupportedText);
                     unsupportedText = mc.unsupportedText = String.format(unsupportedText,
                         (requiredVersion?' '+requiredVersion+' ':' '),
                         (this.playerVersion?' '+this.playerVersion+' ':' Not installed.'));
                }

                if(!hasRequired ){

                    //Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
                    var canInstall = hasFlash && this.assertVersion('6.0.65');

                    if(canInstall && mc.installUrl){

                           mc =  mc.installDescriptor || {
                                 tag      : 'object'
                                ,cls      : 'x-media x-media-swf'
                                ,id       : 'SWFInstaller'
                                ,type     : 'application/x-shockwave-flash'
                                ,data     : "@url"
                                ,url              : mc.installUrl
                                //The dimensions of playerProductInstall.swf must be at least 215 x 138 pixels,
                                ,width            : (parseInt(mc.width,10) || 0) < 215 ? 215 :mc.width
                                ,height           : (parseInt(mc.height,10) || 0) < 138 ? 138 :mc.height
                                ,loop             : false
                                ,start            : true
                                ,unsupportedText  : unsupportedText
                                ,params:{
                                          quality          : "high"
                                         ,movie            : '@url'
                                         ,allowScriptAcess : "always"
                                         ,align            : "middle"
                                         ,bgcolor          : "#3A6EA5"
                                         ,pluginspage      : mc.pluginsPage || this.pluginsPage || "http://www.adobe.com/go/getflashplayer"
                                       }
                            };
                            mc.params[this.varsName] = "MMredirectURL="+( mc.installRedirect || window.location)+
                                                "&MMplayerType="+(Ext.isIE?"ActiveX":"Plugin")+
                                                "&MMdoctitle="+(document.title = document.title.slice(0, 47) + " - Flash Player Installation")
                    } else {
                        //Let superclass handle with unsupportedText property
                        mc.url=null;
                    }
                }

                /*
                *  Sets up a eventSynch between the ActionScript environment
                *  and converts it's events into native Ext events.
                */

                if(mc.eventSynch){
                    mc.params || (mc.params = {});
                    var vars = mc.params[this.varsName] || (mc.params[this.varsName] = {});
                    if(typeof vars == 'string'){ vars = Ext.urlDecode(vars,true); }
                    var eventVars = (mc.eventSynch === true ? {
                             allowedDomain  : vars.allowedDomain || document.location.hostname
                            ,elementID      : mc.id || (mc.id = Ext.id())
                            ,eventHandler   : 'Ext.ux.Media.Flash.eventSynch'
                            }: mc.eventSynch );

                    Ext.apply(mc.params,{
                         allowscriptaccess  : 'always'
                    })[this.varsName] = Ext.applyIf(vars,eventVars);
                }

                delete mc.requiredVersion;
                delete mc.installUrl;
                delete mc.installRedirect;
                delete mc.installDescriptor;
                delete mc.eventSynch;
            }

            mc.mediaType = "SWF";
            this.mediaCfg = mc;
            ux.Flash.superclass.initMedia.call(this);

        }

        ,onAfterMedia : function(){

              ux.Flash.superclass.onAfterMedia.apply(this,arguments);
              if(this.SWFObject = this.getInterface()){
                   this.mediaObject.owner = this; //eventSynch binding
              }
         }

        /*
        * Asserts the desired version against the installed Flash Object version.
        * Acceptable parameter formats for versionMap:
        *
        *  '9.0.40' (string)
        *   9  or 9.1  (number)
        *   [9,0,43]  (array)
        *
        *  Returns true if the desired version is => installed version
        *  and false for all other conditions
        */
        ,assertVersion : function(versionMap){

            var compare;
            versionMap || (versionMap = []);

            if(Ext.isArray(versionMap)){
                compare = versionMap;
            } else {
                compare = String(versionMap).split('.');
            }
            compare = (compare.concat([0,0,0,0])).slice(0,3); //normalize

            var tpv;
            if(!(tpv = this.playerVersion || (this.playerVersion = this.detectVersion()) )){ return false; }

            if (tpv.major > parseFloat(compare[0])) {
                        return true;
            } else if (tpv.major == parseFloat(compare[0])) {
                   if (tpv.minor > parseFloat(compare[1]))
                            return true;
                   else if (tpv.minor == parseFloat(compare[1])) {
                        if (tpv.rev >= parseFloat(compare[2]))
                            return true;
                        }
                   }
            return false;
        },
        /*
        * Flash version detection function
        * Modifed version of the detection strategy of SWFObject library : http://blog.deconcept.com/swfobject/
        * returns a {major,minor,rev} version object or
        * false if Flash is not installed or detection failed.
        */
        detectVersion : function(){
            if(this.mediaVersion){
                return this.mediaVersion;
            }
            var version=false;
            var formatVersion = function(version){
              return version && !!version.length?
                {major:version[0] != null? parseInt(version[0],10): 0
                ,minor:version[1] != null? parseInt(version[1],10): 0
                ,rev  :version[2] != null? parseInt(version[2],10): 0
                ,toString : function(){return this.major+'.'+this.minor+'.'+this.rev;}
                }:false;
            };

            if(Ext.isIE){
                var sfo= null;
                try{
                    sfo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                }catch(e){
                    try {
                        sfo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                        version = [6,0,21];
                        // error if player version < 6.0.47 (thanks to Michael Williams @ Adobe for this solution)
                        sfo.allowscriptaccess = "always";
                    } catch(e) {
                        if(version && version[0] == 6)
                            {return formatVersion(version); }
                        }
                    try {
                        sfo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                    } catch(e) {}
                }
                if (sfo) {
                    version = sfo.GetVariable("$version").split(" ")[1].split(",");
                }
             }else if(navigator.plugins && navigator.mimeTypes.length){
                var sfo = navigator.plugins["Shockwave Flash"];
                if(sfo && sfo.description) {
                    version = sfo.description.replace(/([a-zA-Z]|\s)+/, "").replace(/(\s+r|\s+b[0-9]+)/, ".").split(".");
                }
            }
            return this.mediaVersion = formatVersion(version);

        }
        //Private
        ,_applyFixes : function() {

             // Fix streaming media troubles for IE
            if(Ext.isIE && this.mediaObject){
                this.mediaVersion || (this.detectVersion());
                // only cleanup if the Flash Player version supports External Interface on IE
                if(this.mediaVersion && this.mediaVersion.major > 7 ){
                        var o = this.mediaObject.dom;
                        o.style.display = 'none';
                        for (var x in o) {
                            if (typeof o[x] == 'function') {
                                o[x] = Ext.emptyFn;
                            }
                        }

                }
            }

        },
        //Remove (safely) an existing mediaObject from the Panels body.
        clearMedia  : function(){

           this._applyFixes();
           ux.Flash.superclass.clearMedia.call(this);
           this.SWFObject = null;
        },

        getSWFObject : function() {
            return this.getInterface();
        },
        /**
         * Dispatches events received from the SWF object.
         *
         * @method _handleEvent
         * @private
         */
        _handleSWFEvent: function(SWF, event)
        {
            var type = event.type||event||false;
            if(type){
                 return this.fireEvent(type, this, SWF, event);
            }
        }

    });
    // Class Method to handle defined Flash interface events
    ux.Flash.eventSynch = function(elementID, event){
            var SWF = Ext.get(elementID);
            if(SWF && SWF.owner){
                return SWF.owner._handleSWFEvent.call(SWF.owner, SWF.dom, event);
            }
        };

    /* Generic Flash BoxComponent */
   Ext.ux.FlashComponent = Ext.extend(Ext.ux.MediaComponent,{
           ctype : "Ext.ux.FlashComponent",
           getId : function(){
                 return this.id || (this.id = "flash-comp" + (++Ext.Component.AUTO_ID));
           }

   });

   //Inherit the Media.Flash class interface
   Ext.apply(Ext.ux.FlashComponent.prototype, ux.Flash.prototype);
   Ext.reg('uxflash', Ext.ux.FlashComponent);

   ux.Panel.Flash = Ext.extend(ux.Panel,{
          ctype : "Ext.ux.Media.Panel.Flash"
   });

   Ext.apply(ux.Panel.Flash.prototype, ux.Flash.prototype);

   Ext.reg('flashpanel', Ext.ux.MediaPanel.Flash = Ext.ux.FlashPanel = ux.Panel.Flash);
   Ext.reg('uxflashpanel', ux.Panel.Flash);

   Ext.ux.FlashWindow = ux.Window.Flash = Ext.extend(ux.Window, {ctype : "Ext.ux.FlashWindow"});
   Ext.apply(ux.Window.Flash.prototype, ux.Flash.prototype);

})();