/*
 * @class Ext.ux.MediaPanel
 * Version:  0.31
 * Author: Doug Hendricks. doug[always-At]theactivegroup.com
 * Copyright 2007-2008, Active Group, Inc.  All rights reserved.
 *
 ************************************************************************************
 *   This file is distributed on an AS IS BASIS WITHOUT ANY WARRANTY;
 *   without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE.
 ************************************************************************************

 License: ux.MediaPanel is licensed under the terms of
 the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 that the code/component(s) do NOT become part of another Open Source or Commercially
 licensed development library or toolkit without explicit permission.

 Donations are welcomed: http://donate.theactivegroup.com

 License details: http://www.gnu.org/licenses/lgpl.html

 Notes: the <embed> tag is NOT used in this implementation
 Version:  .31 Fixes to canned WMV config.
 Version:  .3  New class Heirarchy.  Adds renderMedia(mediaCfg) method for refreshing
               a mediaPanels body with a new/current mediaCfg.
 Version:  .2  Adds JW FLV Player Support and enhances mediaClass defaults mechanism.
 Version:  .11 Modified width/height defaults since CSS does not seem to
                honor height/width rules
 Version:  .1  initial release

mediaCfg: {Object}
     { mediaType : mediaClass defined by ux.MediaBase.prototype[mediaClass]
      ,url       : Url resource to load when rendered
      ,loop      : (true/false) (@macro enabled)
      ,start     : (true/false) (@macro enabled)
      ,height    : (defaults 100%) (@macro enabled)
      ,width     : (defaults 100%) (@macro enabled)
      ,controls  : optional: show plugins control menu (true/false) (@macro enabled)
      ,unsupportedText: (String,DomHelper cfg) Text to render if plugin is not installed/available.
      ,params   : { }  members/values unique to Plugin provider
     }

*/

/* Abstract Base Media Class
* This object should not be instantiated.
*/
Ext.ux.MediaBase = function(){};
Ext.apply(Ext.ux.MediaBase.prototype , {
     _macros : null,

     applyMacros : function(markup,macros){
          var m = macros ||this._macros;

          return m?Ext.DomHelper.markup(markup)
              .replace(/(%40url|@url)/g          ,m.url)
              .replace(/(%40start|@start)/g      ,(m.start||!!this.autoStart)+'')
              .replace(/(%40controls|@controls)/g,m.controls+'')
              .replace(/(%40id|@id)/g            ,m.id+'')
              .replace(/(%40loop|@loop)/g        ,m.loop+'')
              .replace(/(%40width|@width)/g      ,m.width+'')
              .replace(/(%40height|@height)/g    ,m.height+''):markup;

     },

     mediaMarkup : function(mediaCfg){


         var m= mediaCfg ? Ext.apply({url:false}, mediaCfg ):{}; //make a copy

         if(m && m.unsupportedText && typeof m.unsupportedText == 'object'){
             m.unsupportedText = Ext.DomHelper.markup(m.unsupportedText);
         }
         var media = Ext.apply({type:false}, this['_'+m.mediaType] || false );

         if( m.url && media.type ){

             var params = Ext.apply(media.params||{},m.params || {});
             for(var key in params){
                if(params.hasOwnProperty(key)){
                  m.children || (m.children = []);
                  if(params[key] !== null){
                   m.children.push({tag:'param',name:key,value:(typeof params[key] == 'object'?Ext.urlEncode(params[key]):encodeURI(params[key])) } );
                  }
                }
             }
             delete   media.params;

             //Convert height and width to style
             media.style || (media.style = {});
             media.style = Ext.apply({height:'@height',width:'@width'} ,m.style||{}, media.style );

             if(m.unsupportedText){  //childNode Text if plugin/object is not installed.
                  media.html = m.unsupportedText;
             }

             m = Ext.apply({tag:'object'},m,media);

             m.id || (m.id = Ext.id());

             var assert = function(v,def,last){
                 return Ext.value(Ext.value(v ,def), last);
             };

             this._macros= {
               url       : m.url || ''
              ,height    : m.height || '100%'  //CSS does appear to honor h/w rules for <object>
              ,width     : m.width  || '100%'  //so must default to something
              ,controls  : assert(m.controls,false)
              ,start     : assert(m.start, false)
              ,loop      : assert(m.loop, false)
              ,id        : m.id
             };

             delete   m.url;
             delete   m.mediaType;
             delete   m.height;
             delete   m.width;
             delete   m.controls;
             delete   m.start;
             delete   m.loop;
             delete   m.params;
             delete   m.unsupportedText;

             return m;
         }else{
             return null;
         }

     }
  , "_PDF" : Ext.apply({
            tag     :'object'
           ,cls     : 'x-media x-media-pdf'
           ,type    : "application/pdf"
           ,data    : "@url"
           ,params  : { src : "@url" }
           },Ext.isIE?{classid :"CLSID:CA8A9780-280D-11CF-A24D-444553540000"}:false)

  ,"_WMV" : Ext.apply(
          {tag      :'object'
          ,cls      : 'x-media x-media-wmv'
          ,type      :'video/x-ms-wmv'
          ,data     : "@url"
          ,params  : {
              src          : "@url"
             ,url          : "@url"
             ,autostart    : "@start"
             ,showcontrols : "@controls"
           }
           },Ext.isIE?{classid :"CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6"}:false)

   ,"_SWF" :  Ext.apply({
              tag      :'object'
             ,cls      : 'x-media x-media-swf'
             ,type     : 'application/x-shockwave-flash'
             ,data     : "@url"
             ,loop     :  true
             ,start    :  true
             ,params   : {
                  movie     : "@url"
                 ,menu      : "@controls"
                 ,play      : "@start"
                 ,quality   : "high"
                 ,bgcolor   : "#FFFFFF"
                 ,loop      : "@loop"
                }

            },Ext.isIE?{classid :"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}:false)
    ,"_JWP" :  Ext.apply({
          tag      :'object'
         ,cls      : 'x-media x-media-swf x-media-flv'
         ,type     : 'application/x-shockwave-flash'
         ,data     : "@url"
         ,loop     :  true
         ,start    :  false
         ,params   : {
             movie     : "@url"
            ,flashVars : {
                           autostart:'@start'
                          ,repeat   :'@loop'
                          ,height   :'@height'
                          ,width    :'@width'
                          ,id       : '@id'
                          }
            }

    },Ext.isIE?{classid :"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}:false)
    ,"_MOV" : Ext.apply({
              tag      :'object'
             ,cls      : 'x-media x-media-mov'
             ,type     : "video/quicktime"
             ,data     : "@url"
             ,params   : {
                   src          : "@url"
                  ,autoplay     : "@start"
                  ,controller   : "@controls"
                         }
             },Ext.isIE?
                    {  classid      :'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'
                      ,codebase     :'http://www.apple.com/qtactivex/qtplugin.cab'
                      ,type         : 'application/x-oleobject'
                      ,params   : { src         : "@url"
                                   ,controller  :'@controls'
                                   ,autostart   :'@start'
                                  }
                }:false)
    ,"_REAL" : Ext.apply({
                tag     :'object'
               ,cls     : 'x-media x-media-real'
               ,type    : "audio/x-pn-realaudio"
               ,data    : "@url"
               ,standby : "Loading Real Media Player components..."
               ,params   : {
                          src        : "@url"
                         ,autostart  : "@start"
                         ,controller : "@controls"
                         ,loop       : "@loop"
                         ,console    : "TES"
                         }

                },Ext.isIE?{classid :"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA",controls:'All'}:false)

    ,"_SVG" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-img x-media-svg'
             ,type     : "image/svg+xml"
             ,data     : "@url"

    }
    ,"_GIF" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-img x-media-gif'
             ,type     : "image/gif"
             ,data     : "@url"
    }
    ,"_JPEG" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-img x-media-jpeg'
             ,type     : "image/jpeg"
             ,data     : "@url"
    }
    ,"_PNG" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-img x-media-png'
             ,type     : "image/png"
             ,data     : "@url"
    }
    ,"_HTM" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-html'
             ,type     : "text/html"
             ,style    : {overflow:'auto'}//,height:'100%',width:'100%'}
             ,data     : "@url"
    }
    ,"_TXT" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-text'
             ,type     : "text/plain"
             ,style    : {overflow:'auto'}
             ,data     : "@url"
    }

    ,"_XLS" : {
          tag      : 'object'
         ,cls      : 'x-media x-media-excel'
         //,type     : "application/vnd.ms-excel"
         ,type      :"application/x-msexcel"
         ,data     : "@url"
    }
    ,"_XML" : {  //outright dangerous on IE !
          tag      : 'object'
         ,cls      : 'x-media x-media-xml'
         ,type     : "text/xml"
         ,style    : {overflow:'auto'}
         ,data     : "@url"
    }
    ,"_QTMIDI" : Ext.apply({
          tag      : 'object'
         ,cls      : 'x-media x-media-audio x-media-midi'
         ,type     : "audio/midi"
         ,style    : {overflow:'auto'}
         ,data     : "@url"
         ,params   : {autostart    :'@start'}

        },Ext.isIE?
         { classid      :'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'
          ,codebase     :'http://www.apple.com/qtactivex/qtplugin.cab'
          ,type         : 'application/x-oleobject'
          ,params   : { src   : "@url"
                       ,controller   :'@controls'
                       ,autostart    :'@start'
                      }
          }
          :false)
    ,"_QTMP3" : Ext.apply({
           tag      : 'object'
          ,cls      : 'x-media x-media-audio x-media-mpeg'
          ,type     : "audio/mpeg"
          ,data     : '@url'
          ,params   : {autostart    :'@start'}

         },Ext.isIE?
              { classid      :'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'
               ,codebase     :'http://www.apple.com/qtactivex/qtplugin.cab'
               ,type         : 'application/x-oleobject'
               ,params   : { src   : "@url"
                            ,controller   :'@controls'
                            ,autostart    :'@start'
                           }
               }
          :false)
   ,"_QTWAV" : Ext.apply({
             tag      : 'object'
            ,cls      : 'x-media x-media-audio x-media-wav'
            ,type     : "audio/wav"
            ,data     : '@url'
            ,params   : {autostart    :'@start'}
       },Ext.isIE?
            { classid      :'clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B'
             ,codebase     :'http://www.apple.com/qtactivex/qtplugin.cab'
             ,type         : 'application/x-oleobject'
             ,params   : { src   : "@url"
                          ,controller   :'@controls'
                          ,autostart    :'@start'
                         }
             }
          :false)

});


Ext.ux.MediaPanel = Ext.extend(Ext.Panel , Ext.apply({

     animCollapse  :false
    ,ctype         : "Ext.ux.MediaPanel"
    ,initComponent : function(){

        this.bodyCfg || (this.bodyCfg= {tag:'div',cls:this.baseCls + '-body',children:[]});

        this.autoLoad = false;
        var markup;

        this.bodyCfg.children || (this.bodyCfg.children =[]);

        if(markup = this.mediaMarkup(this.mediaCfg)){

            this.bodyCfg.children.push(markup);

        } else {

            this.bodyCfg.html = this.mediaCfg?this.mediaCfg.unsupportedText||false:false;
        }



        Ext.ux.MediaPanel.superclass.initComponent.call(this);
    }

    ,onRender  : function(ct, position){

         //Final macro substition for rendered tag attributes

        if(this.bodyCfg){
             this.bodyCfg = this.applyMacros(this.bodyCfg);
        }

        Ext.ux.MediaPanel.superclass.onRender.call(this, ct, position);

        // Set the Visibility Mode for el, bwrap for collapse/expands/hide/show

        Ext.each(
            [this[this.collapseEl],this.el , this.body.child('x-media')]
            ,function(el){
                if(el){
                    el.setVisibilityMode(Ext.Element[this.hideMode.toUpperCase()] || 1 )
                          .originalDisplay = (this.hideMode != 'display'?'visible':'block');
                }
          },this);

     }

     /*
     *  This method updates the mediaPanel's body with a new mediaCfg object,
     *  or supports a refresh of the panel based on the initialConfig.mediaCfg value
     */
     ,renderMedia : function(mediaCfg){
         mediaCfg || (mediaCfg = this.initialConfig.mediaCfg);
         var markup;
         if(this.rendered && (markup = this.mediaMarkup(mediaCfg))){
            this.body.update(this.applyMacros(markup));
         }
     }

}, Ext.ux.MediaBase.prototype));

Ext.reg('mediapanel', Ext.ux.MediaPanel);

/* A custom implementation for advanced Flash object interaction
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
      ,controls  : optional: show plugins control menu (true/false)
      ,eventSynch: (Bool) If true, this class initializes an internal event Handler for
                   ActionScript event synchronization
      ,requiredVersion: (String,Array,Number) If specified, used in version detection.
      ,unsupportedText: (String,DomHelper cfg) Text to render if plugin is not installed/available.
      ,installUrl:(string) Url to inline SWFInstaller, if specified activates inline Express Install.
      ,installRedirect : (string) optional post install redirect
      ,installDescriptor: (Object) optional Install descriptor config
     }
*/

Ext.ux.MediaPanel.Flash = Ext.extend(Ext.ux.MediaPanel, {
    autoStart      : false,
    requiredVersion: false,
    playerVersion  : null,
    ctype          : "Ext.ux.MediaPanel.Flash",
    SWFObject      : null,
    varsName       :'flashVars',
    "_SWF" : Ext.apply({
          tag      : 'object'
         ,cls      : 'x-media x-media-swf'
         ,type     : 'application/x-shockwave-flash'
         ,data     : "@url"
         ,loop     : true
         ,start    : true
         ,params   : {
              movie     : "@url"
             ,play      : "@start"
             ,loop      : "@loop"
             ,menu      : "@controls"
             ,quality   : "high"
             ,bgcolor   : "#FFFFFF"
            }
    },Ext.isIE?{classid :"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"}:false),

    // private
    initComponent : function(){

        var mc = Ext.apply({url:false}, this.mediaCfg||{});
        if(mc.url){

            this.requiredVersion = mc.requiredVersion||false;

            var hasFlash  = !!(this.playerVersion = this.detectVersion());
            var hasRequired = hasFlash && (this.requiredVersion?this.assertVersion(this.requiredVersion):true);

            if(mc.unsupportedText){
                 if(typeof mc.unsupportedText == 'object'){
                       mc.unsupportedText = Ext.DomHelper.markup(mc.unsupportedText);
                 }
                 mc.unsupportedText = String.format(mc.unsupportedText,mc.requiredVersion,this.playerVersion || 'Not installed');
            }

            if(!hasRequired ){

                //Version check for the Flash Player that has the ability to start Player Product Install (6.0r65)
                var canInstall = hasFlash && this.assertVersion('6.0.65');

                if(canInstall && mc.installUrl){

                       this.initialConfig.mediaCfg = mc =  mc.installDescriptor || {
                             tag      : 'object'
                            ,cls      : 'x-media x-media-swf'
                            ,id       : 'SWFInstaller'
                            ,type     : 'application/x-shockwave-flash'
                            ,data     : "@url"
                            ,url              : mc.installUrl
                            ,width            : 550
                            ,height           : 300
                            ,loop             : false
                            ,start            : true
                            ,unsupportedText  : mc.unsupportedText
                            ,params:{
                                      quality          : "high"
                                     ,movie            : '@url'
                                     ,allowScriptAcess : "always"
                                     ,align            : "middle"
                                     ,bgcolor          : "#3A6EA5"
                                     ,pluginspage      : this.pluginsPage || "http://www.adobe.com/go/getflashplayer"
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
                        ,eventHandler   : 'Ext.ux.MediaPanel.Flash.eventSynch'
                        }: mc.eventSynch );

                Ext.apply(mc.params,{
                     allowScriptAccess  : 'always'
                    //,flashVars          : Ext.applyIf(vars,eventVars)
                })[this.varsName] = Ext.applyIf(vars,eventVars);
            }

            delete mc.requiredVersion;
            delete mc.installUrl;
            delete mc.installRedirect;
            delete mc.installDescriptor;
            delete mc.eventSynch;
        }

        mc.mediaType = "SWF";
        this.mediaCfg = this.initialConfig.mediaCfg = mc;

        Ext.ux.MediaPanel.Flash.superclass.initComponent.call(this);


    }
    ,onRender  : function(ct, position){

       Ext.ux.MediaPanel.Flash.superclass.onRender.call(this, ct, position);

       this._setSWFObject.defer(20,this);
     }
     //See superclass for details
    ,renderMedia : function(mediaCfg){
       this._applyFixes();
       this.SWFObject = null;
       Ext.ux.MediaPanel.Flash.superclass.renderMedia.call(this, mediaCfg);
       this._setSWFObject.defer(20,this);

     }

     //Private
    ,_setSWFObject: function(){
       if(this.SWFObject = Ext.get(this.body.child('object.x-media-swf'))){
            this.SWFObject.owner = this;  //required for eventSync support
            this.SWFObject.setVisibilityMode(Ext.Element[this.hideMode.toUpperCase()] || 1 ).originalDisplay = (this.hideMode != 'display'?'visible':'block');
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

        if(versionMap instanceof Array){
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
                    sfo.AllowScriptAccess = "always";
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
        return formatVersion(version);

    }
    //Private
    ,_applyFixes : function() {

         // Fix streaming media troubles for IE
        if(this.rendered && Ext.isIE && this.SWFObject){
            this.playerVersion || (this.playerVersion = this.detectVersion());
            // only cleanup if the Flash Player version supports External Interface on IE
            if(this.playerVersion && this.playerVersion.major > 7 ){
                    var o = this.SWFObject.dom;
                    o.style.display = 'none';
                    for (var x in o) {
                        if (typeof o[x] == 'function') {
                            o[x] = Ext.emptyFn;
                        }
                    }
            }
        }

    },
    beforeDestroy : function(){

        this._applyFixes();
        Ext.ux.MediaPanel.Flash.superclass.beforeDestroy.call(this);
    },
    /*
      Calls an ActionScript function from javascript. Requires ExternalInterface.
    */

    call         : function(fn){
         var SWF;
         if(SWF = this.getSWFObject()){
            var result = SWF.CallFunction("<invoke name=\"" + fn + "\" returntype=\"javascript\">" + __flash__argumentsToXML(arguments, 1) + "</invoke>");
            return eval(result);
         }
         return undefined;
    },
    getSWFObject : function() {
        return this.rendered?this.SWFObject.dom||null:null;
    },
    /**
     * Dispatches events received from the SWF object.
     *
     * @method _handleEvent
     * @private
     */
    _handleSWFEvent: function(SWF, event)
    {
        var type = event.type||false;
        if(type){
             return this.fireEvent(type, this, SWF, event);
        }
    }
     // private
    ,onShow : function(){
         if(this.SWFObject){
           this.SWFObject.setVisible(true);
         }
         Ext.ux.MediaPanel.Flash.superclass.onShow.call(this);
     }

     // private
    ,onHide : function(){
        if(this.SWFObject){
         this.SWFObject.setVisible(false);
        }
        Ext.ux.MediaPanel.Flash.superclass.onHide.call(this);
    }

});

//Class Method to handle defined Flash interface events
Ext.ux.MediaPanel.Flash.eventSynch = function(elementID, event){
    var SWF = Ext.get(elementID);
    if(SWF && SWF.owner){
        return SWF.owner._handleSWFEvent.call(SWF.owner, SWF.dom, event);
   }
};

Ext.reg('flashpanel', Ext.ux.MediaPanel.Flash);

