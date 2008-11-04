/*
 * @class Ext.ux.Media,
 *        Ext.ux.MediaComponent (xtype: media),
 *        Ext.ux.MediaPanel     (xtype: mediapanel)
 *        Ext.ux.MediaWindow
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

 License: ux.Media classes are licensed under the terms of
 the Open Source LGPL 3.0 license.  Commercial use is permitted to the extent
 that the code/component(s) do NOT become part of another Open Source or Commercially
 licensed development library or toolkit without explicit permission.

 Donations are welcomed: http://donate.theactivegroup.com

 License details: http://www.gnu.org/licenses/lgpl.html

 Notes: the <embed> tag is NOT used(or necessary) in this implementation
 Version:  Rc1
           Adds inline media rendering within markup: <div><script>document.write(String(new Ext.ux.Media(mediaCfg)));</script></div>
           New extensible classes :
              ux.Media
              ux.MediaComponent
              ux.MediaPanel

           Solves the Firefox reinitialization problem for Ext.Components with embedded <OBJECT> tags
           when the upstream DOM is reflowed.

           See Mozilla https://bugzilla.mozilla.org/show_bug.cgi?id=262354

 Version:  .31 Fixes to canned WMV config.
 Version:  .3  New class Heirarchy.  Adds renderMedia(mediaCfg) method for refreshing
               a mediaPanels body with a new/current mediaCfg.
 Version:  .2  Adds JW FLV Player Support and enhances mediaClass defaults mechanism.
 Version:  .11 Modified width/height defaults since CSS does not seem to
                honor height/width rules
 Version:  .1  initial release

 mediaCfg: {Object}
     { mediaType : mediaClass defined by ux.Media.mediaTypes[mediaClass]
      ,url       : Url resource to load when rendered
      ,requiredVersion : may specify a specific player/plugin version (for use with inline plugin updates where implemented)
      ,loop      : (true/false) (@macro enabled)
      ,scripting : (true/false) (@macro enabled)
      ,start     : (true/false) (@macro enabled)
      ,volume    : (number) audio volume level (@macro enabled)
      ,height    : (defaults 100%) (@macro enabled)
      ,width     : (defaults 100%) (@macro enabled)
      ,autoSize  : (true/false) If true the rendered <object> consumes 100% height/width of its
                     containing Element.  Actual container height/width are available to macro substitution
                     engine.
      ,controls  : optional: show plugins control menu (true/false) (@macro enabled)
      ,unsupportedText: (String,DomHelper cfg) Text to render if plugin is not installed/available.
      ,listeners  : {"mouseover": function() {}, .... } DOM listeners to set each time the Media is rendered.
      ,params   : { }  members/values unique to Plugin provider
     }

*/
(function(){

    /*
    * Base Media Class
    */

    var ux = Ext.ux.Media = function(config){
        Ext.apply(this,config||{});
        this.toString = this.mediaMarkup;
        this.initMedia();
        };

    ux.mediaTypes =
     {
       "PDF" : Ext.apply({
                tag     :'object'
               ,cls     : 'x-media x-media-pdf'
               ,type    : "application/pdf"
               ,style   :{position:'absolute',top:'0px',left:'0px','z-index':11002}
               ,data    : "@url"
               ,autoSize:true
               ,params  : { src : "@url" }

               },Ext.isIE?{classid :"CLSID:CA8A9780-280D-11CF-A24D-444553540000"}:false)

      ,"WMV" : Ext.apply(
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

       ,"SWF" :  Ext.apply({
                  tag      :'object'
                 ,cls      : 'x-media x-media-swf'
                 ,type     : 'application/x-shockwave-flash'
                 ,data     : "@url"
                 ,scripting: 'sameDomain'
                 ,loop     :  true
                 ,start    :  false
                 ,unsupportedText : {cn:['The Adobe Flash Player{0}is required.',{tag:'br'},{tag:'a',cn:'The free download is available here.',href:'http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash',target:'_flash'}]}
                 ,params   : {
                      movie     : "@url"
                     ,menu      : "@controls"
                     ,play      : "@start"
                     ,quality   : "high"
                     ,allowscriptaccess : "@scripting"
                     ,bgcolor   : "#FFFFFF"
                     ,wmode     : "opaque"
                     ,loop      : "@loop"
                    }

                },Ext.isIE?{classid :"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
                           ,codebase:"http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0"
                           }:false)
        ,"JWP" :  Ext.apply({
              tag      :'object'
             ,cls      : 'x-media x-media-swf x-media-flv'
             ,type     : 'application/x-shockwave-flash'
             ,data     : "@url"
             ,loop     :  false
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
        ,"MOV" : Ext.apply({
                  tag      :'object'
                 ,cls      : 'x-media x-media-mov'
                 ,type     : "video/quicktime"
                 ,data     : "@url"
                 ,params   : {
                       src          : "@url"
                      ,autoplay     : "@start"
                      ,controller   : "@controls"
                      ,enablejavascript : "@scripting"
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
        ,"REAL" : Ext.apply({
                    tag     :'object'
                   ,cls     : 'x-media x-media-real'
                   ,type    : "audio/x-pn-realaudio"
                   ,data    : "@url"
                   ,standby : "Loading Real Media Player components..."
                   ,params   : {
                              src        : "@url"
                             ,autostart  : "@start"
                             ,controller : "@controls"
                             ,controlls  : "@controls"
                             ,loop       : "@loop"
                             ,console    : "TES"
                             }

                    },Ext.isIE?{classid :"clsid:CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA"}:false)

        ,"SVG" : {
                  tag      : 'object'
                 ,cls      : 'x-media x-media-img x-media-svg'
                 ,type     : "image/svg+xml"
                 ,data     : "@url"
        }
        ,"GIF" : {
                  tag      : 'img'
                 ,cls      : 'x-media x-media-img x-media-gif'
                 ,src     : "@url"
        }
        ,"JPEG" : {
                  tag      : 'img'
                 ,cls      : 'x-media x-media-img x-media-jpeg'
                 ,src     : "@url"
        }
        ,"JP2" :{
                          tag      : 'object'
                         ,cls      : 'x-media x-media-img x-media-jp2'
                         ,type     : "image/jpeg2000-image"
                         ,data     : "@url"
                }

        ,"PNG" : {
                  tag      : 'img'
                 ,cls      : 'x-media x-media-img x-media-png'
                 ,src     : "@url"
        }
        ,"HTM" : {
                  tag      : 'iframe'
                 ,cls      : 'x-media x-media-html'
                 ,frameBorder : 0
                 ,style    : {overflow:'auto'}
                 ,src     : "@url"
        }
        ,"TXT" : {
                  tag      : 'object'
                 ,cls      : 'x-media x-media-text'
                 ,type     : "text/plain"
                 ,style    : {overflow:'auto'}
                 ,data     : "@url"
        }
        ,"SILVER" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-silverlight'
             ,type      :"application/x-silverlight"
             ,data     : "@url"
        }

        ,"OFFICE" : {
              tag      : 'object'
             ,cls      : 'x-media x-media-office'
             ,type      :"application/x-msoffice"
             ,data     : "@url"
        }
        ,"XML" : {  //outright dangerous on IE !
              tag      : 'iframe'
             ,cls      : 'x-media x-media-xml'
             ,style    : {overflow:'auto'}
             ,src     : "@url"
        }
        ,"QTMIDI" : Ext.apply({
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
                           ,enablejavascript : "@scripting"
                          }
              }
              :false)
        ,"QTMP3" : Ext.apply({
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
                                ,enablejavascript : "@scripting"
                               }
                   }
              :false)
       ,"QTWAV" : Ext.apply({
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
                              ,enablejavascript : "@scripting"
                             }
                 }
              :false)

    };


    Ext.apply(ux.prototype , {

         mediaObject     : null,
         mediaCfg        : null,
         mediaVersion    : null,
         requiredVersion : null,
         unsupportedText : null,


         /* Component Plugins Interface
           extends the Component instance with ux.Media.* interfaces
         */
         init        : function(component){

            if(component && this.getEl == undefined){
                Ext.applyIf(component,this);
            }

         },

         initMedia      : function(){ },

         onBeforeMedia  : function(mediaCfg, ct, domPosition ){

              var m = mediaCfg || this.mediaCfg, mt;

              if( m && (mt = this.getMediaType(m.mediaType)) ){

                  m.autoSize = (m.autoSize == undefined? mt.autoSize===true:m.autoSize===true);

                  //Calculate parent container size for macros (if available)
                  if(m.autoSize && (ct = Ext.isReady?Ext.get(ct||this.lastCt):null)){
                    m.height = ct.getHeight(true) || this.assert(m.height,'100%');
                    m.width  = ct.getWidth(true)  || this.assert(m.width ,'100%');
                  }

               }

        },

         onAfterMedia   : function(){
             //Reattach any DOM Listeners after rendering.
             var L = this.mediaCfg?this.mediaCfg.listeners:null;
             if(L && this.mediaObject){  this.mediaObject.on(L); }
         },

         getMediaType: function(type){
             return ux.mediaTypes[type];
         },

         assert : function(v,def){
              v= typeof v == 'function'?v.call(v.scope||null):v;
              return Ext.value(v ,def);
         },

         mediaMarkup : function(mediaCfg, width, height, ct){

             mediaCfg = mediaCfg ||this.mediaCfg;

             if(!mediaCfg){return '';}

             var m= Ext.apply({url:false,autoSize:false}, mediaCfg); //make a copy

             m.url = this.assert(m.url,false);

             if( m.url ){

                 var value,p, El = Ext.Element;

                 var media = Ext.apply({}, this.getMediaType(m.mediaType) || false );

                 var params = Ext.apply(media.params||{},m.params || {});

                 for(var key in params){
                    if(params.hasOwnProperty(key)){
                      m.children || (m.children = []);

                      p = this.assert(params[key],null);
                      if(p !== null){
                         m.children.push({tag:'param'
                                         ,name:key
                                         ,value: typeof p == 'object'?Ext.urlEncode(p):encodeURI(p)
                                         });
                      }
                    }
                 }
                 delete   media.params;

                 //Convert height and width to inline style to avoid issues with display:none;
                 media.style = this.assert(media.style , {});

                 m.height = this.assert(height || m.height || media.height, '100%');
                 m.width  = this.assert(width  || m.width  || media.width , '100%');

                 Ext.apply(media.style , {
                     height:El.addUnits( (m.autoSize ? '100%' : m.height ),El.prototype.defaultUnit),
                     width :El.addUnits( (m.autoSize ? '100%' : m.width ),El.prototype.defaultUnit)
                     });


                 //childNode Text if plugin/object is not installed.

                 media.html = this.assert(m.unsupportedText|| this.unsupportedText || media.unsupportedText,null);

                 m = Ext.apply({tag:'object'},m,media);

                 m.id || (m.id = Ext.id());

                 var _macros= {
                   url       : m.url || ''
                  ,height    : parseInt(m.height,10)||100
                  ,width     : parseInt(m.width,10)||100
                  ,scripting : this.assert(m.scripting,false)
                  ,controls  : this.assert(m.controls,false)
                  ,start     : this.assert(m.start, false)
                  ,loop      : this.assert(m.loop, false)
                  ,volume    : this.assert(m.volume, 10)
                  ,id        : m.id
                 };

                 delete   m.url;
                 delete   m.mediaType;
                 delete   m.controls;
                 delete   m.start;
                 delete   m.loop;
                 delete   m.scripting;
                 delete   m.volume;
                 delete   m.autoSize;
                 delete   m.params;
                 delete   m.unsupportedText;
                 delete   m.renderOnResize;
                 delete   m.listeners
                 delete   m.height;
                 delete   m.width;


                 return Ext.DomHelper.markup(m)
                   .replace(/(%40url|@url)/g          ,_macros.url)
                   .replace(/(%40start|@start)/g      ,_macros.start+'')
                   .replace(/(%40controls|@controls)/g,_macros.controls+'')
                   .replace(/(%40id|@id)/g            ,_macros.id+'')
                   .replace(/(%40loop|@loop)/g        ,_macros.loop+'')
                   .replace(/(%40volume|@volume)/g    ,_macros.volume+'')
                   .replace(/(%40scripting|@scripting)/g ,_macros.scripting+'')
                   .replace(/(%40width|@width)/g      ,_macros.width+'')
                   .replace(/(%40height|@height)/g    ,_macros.height+'')

             }else{
                 var unsup = this.assert(m.unsupportedText|| this.unsupportedText || media.unsupportedText,null);
                 unsup = unsup ? Ext.DomHelper.markup(unsup): null;
                 return String.format(unsup || 'Media Configuration/Plugin Error',' ',' ');
             }

         }
          /*
          *  This method updates the target Element with a new mediaCfg object,
          *  or supports a refresh of the target based on the current mediaCfg object
          *  This method may be invoked inline (in Markup) before the DOM is ready
          *  param position indicate the DomHeper position for Element insertion (ie 'afterbegin' the default)
          */
          ,renderMedia : function(mediaCfg, ct, domPosition , w , h){
              if(!Ext.isReady){
                  Ext.onReady(this.renderMedia.createDelegate(this,Array.prototype.slice.call(arguments,0)));
              }
              var mc = this.mediaCfg = mediaCfg || this.mediaCfg ;
              ct = Ext.get(ct || this.lastCt || (this.mediaObject?this.mediaObject.parentNode:null));

              this.onBeforeMedia.call(this, mc, ct, domPosition , w , h);

              if(ct){
                  var markup;

                  if(ct && mc && (markup = this.mediaMarkup(mc, w, h, ct))){
                     this.clearMedia();
                     this.mediaObject = Ext.get(Ext.DomHelper.insertHtml(domPosition||'afterbegin',ct.dom,markup));
                  }
              }
              this.onAfterMedia(ct);
              this.lastCt = ct;

          }
          //Remove an existing mediaObject from the DOM.
          ,clearMedia : function(){
            if(Ext.isReady ){
                Ext.destroy(this.mediaObject);
            }
            this.mediaObject = null;
          }
         ,getInterface  : function(){
              return this.mediaObject?this.mediaObject.dom:null;
          }

         ,detectVersion  : Ext.emptyFn

    });
    //Private adapter class
    var mediaComponentAdapter = function(){};
    Ext.apply(mediaComponentAdapter.prototype, {

         hideMode      : !Ext.isIE?'nosize':'display'

        ,animCollapse  : false  //should be false for all others

        ,visibilityCls : !Ext.isIE ?'x-hide-nosize':null

        ,autoScroll    : true

        ,shadow        : false

        ,bodyStyle     : {position: 'relative'}

        ,resizeMedia        : function(comp, w, h){
            var mc = this.mediaCfg;

            if(mc && this.boxReady){

                // Ext.Window.resizer fires this event a second time
                if(arguments.length > 3 && (!this.mediaObject || mc.renderOnResize )){
                    this.refreshMedia(this.body||this.el);
                }
            }

         }

        ,adjustVisibility : function(els){
            els = [].concat(els||[]);
            var El = Ext.Element;
            var mode = this.visibilityCls || El[this.hideMode.toUpperCase()] || El.VISIBILITY;
            Ext.each(els, function(el){
                    if(el)el.setVisibilityMode(mode);
               });

            if(this.loadMask){
              (this.loadMask = new Ext.LoadMask(this.bwrap||this.getEl(),Ext.apply({},this.loadMask)))
                .removeMask = false;
            }
            this.on('resize', this.resizeMedia, this);
        }

        ,doAutoLoad : Ext.emptyFn

        ,refreshMedia  : function(target){
            if(this.mediaCfg) this.renderMedia(null,target);
        }
        ,loadMask  : false

    });

    /* Generic Media BoxComponent */
    Ext.ux.MediaComponent = Ext.extend(Ext.BoxComponent, {
        ctype           : "Ext.ux.MediaComponent",
        autoEl          : 'div',
        cls             : "x-media-comp",

        getId           : function(){
            return this.id || (this.id = "media-comp" + (++Ext.Component.AUTO_ID));
        },
        initComponent   : function(){
            this.initMedia();

            Ext.ux.MediaComponent.superclass.initComponent.apply(this,arguments);
        },

        afterRender     :  function(){

            this.setAutoScroll();

            Ext.ux.MediaComponent.superclass.afterRender.apply(this,arguments);

            this.adjustVisibility(this.getEl());

        },
        beforeDestroy   : function(){
            this.clearMedia();
            Ext.ux.MediaComponent.superclass.beforeDestroy.call(this);
         },
         //private
        setAutoScroll   : function(){
            if(this.rendered && this.autoScroll){
                this.getEl().setOverflow('auto');
            }
        }

    });

    //Inherit the Media.Flash class interface
    Ext.apply(Ext.ux.MediaComponent.prototype, Ext.ux.Media.prototype);
    Ext.apply(Ext.ux.MediaComponent.prototype, mediaComponentAdapter.prototype);
    Ext.reg('media', Ext.ux.MediaComponent);

    ux.Panel = Ext.extend( Ext.Panel, {

         ctype         : "Ext.ux.Media.Panel"
        ,cls           : "x-media-panel"
        ,initComponent : function(){

            this.initMedia();
            delete this.html;
            this.contentEl = null;
            this.items = null;

            ux.Panel.superclass.initComponent.call(this);
        }
        ,onRender  : function(){

              ux.Panel.superclass.onRender.apply(this, arguments);
              this.adjustVisibility ([this[this.collapseEl],this.floating? null: this.getActionEl()]);

         }
        ,beforeDestroy : function(){
            this.clearMedia();
            ux.Panel.superclass.beforeDestroy.call(this);
         }
    });

    //Inherit the Media class interface
    Ext.apply(ux.Panel.prototype,ux.prototype);
    Ext.apply(ux.Panel.prototype, mediaComponentAdapter.prototype);
    Ext.reg('mediapanel', Ext.ux.MediaPanel = ux.Panel);

    ux.Window = Ext.extend( Ext.Window ,{

         cls           : "x-media-window"
        ,ctype         : "Ext.ux.Media.Window"

        ,initComponent : function(){

            this.initMedia();
            delete this.html;
            this.contentEl = null;
            this.items = null;

            ux.Window.superclass.initComponent.call(this);
        }

        ,onRender  : function(){
           ux.Window.superclass.onRender.apply(this, arguments);
           this.adjustVisibility ([this[this.collapseEl]],this.floating? null: this.getActionEl()); //,this.mask
         }
         ,beforeDestroy : function(){
            this.clearMedia();
            ux.Window.superclass.beforeDestroy.call(this);
         }

    });

    //Inherit the Media.Flash class interface
    Ext.apply(ux.Window.prototype, ux.prototype);
    Ext.apply(ux.Window.prototype, mediaComponentAdapter.prototype);
    Ext.ux.MediaWindow = ux.Window;


    Ext.onReady(function(){
        //Generate CSS Rules if not defined in markup
        var CSS = Ext.util.CSS, rules=[];
        CSS.getRule('.x-media') || (rules.push('.x-media{width:100%;height:100%;display:block;overflow:none;}'));
        CSS.getRule('.x-media-mask') || (rules.push('.x-media-mask{position:absolute;top:0px;left:0px;background-color:transparent;width:auto;height:auto;zoom:1;}'));
        CSS.getRule('.x-hide-nosize .x-media') || (rules.push('.x-hide-nosize,.x-hide-nosize .x-media {height:0!important;width:0!important;border:none!important;}'));

        if(!!rules.length){
             CSS.createStyleSheet(rules.join(''));
        }

    });

  /* overrides add a third visibility feature to Ext.Element:
    * Now an elements' visibility may be handled by application of a custom (hiding) CSS className.
    * The class is removed to make the Element visible again
    */

    Ext.apply(Ext.Element.prototype, {
      setVisible : function(visible, animate){
            if(!animate || !Ext.lib.Anim){
                if(this.visibilityMode == Ext.Element.DISPLAY){
                    this.setDisplayed(visible);
                }else if(this.visibilityMode == Ext.Element.VISIBILITY){
                    this.fixDisplay();
                    this.dom.style.visibility = visible ? "visible" : "hidden";
                }else {
                    this[visible?'removeClass':'addClass'](String(this.visibilityMode));
                }

            }else{
                // closure for composites
                var dom = this.dom;
                var visMode = this.visibilityMode;

                if(visible){
                    this.setOpacity(.01);
                    this.setVisible(true);
                }
                this.anim({opacity: { to: (visible?1:0) }},
                      this.preanim(arguments, 1),
                      null, .35, 'easeIn', function(){

                         if(!visible){
                             if(visMode == Ext.Element.DISPLAY){
                                 dom.style.display = "none";
                             }else if(visMode == Ext.Element.VISIBILITY){
                                 dom.style.visibility = "hidden";
                             }else {
                                 Ext.get(dom).addClass(String(visMode));
                             }
                             Ext.get(dom).setOpacity(1);
                         }
                     });
            }
            return this;
        },
        /**
         * Checks whether the element is currently visible using both visibility and display properties.
         * @param {Boolean} deep (optional) True to walk the dom and see if parent elements are hidden (defaults to false)
         * @return {Boolean} True if the element is currently visible, else false
         */
        isVisible : function(deep) {
            var vis = !(this.getStyle("visibility") == "hidden" || this.getStyle("display") == "none" || this.hasClass(this.visibilityMode));
            if(deep !== true || !vis){
                return vis;
            }
            var p = this.dom.parentNode;
            while(p && p.tagName.toLowerCase() != "body"){
                if(!Ext.fly(p, '_isVisible').isVisible()){
                    return false;
                }
                p = p.parentNode;
            }
            return true;
        }
    });

})();