/*
 * Author: Doug Hendricks. doug[always-At]theactivegroup.com
 * Copyright 2007-2008, Active Group, Inc.  All rights reserved.
 *
 ************************************************************************************
 *   This file is distributed on an AS IS BASIS WITHOUT ANY WARRANTY;
 *   without even the implied warranty of MERCHANTABILITY or
 *   FITNESS FOR A PARTICULAR PURPOSE.
 ************************************************************************************
*/


//Permits Container creation without items.
Ext.override(Ext.Container,{
 add : function(comp){
        if(!this.items){
            this.initItems();
        }
        var a = arguments, len = a.length;
        if(len > 1){
            for(var i = 0; i < len; i++) {
                this.add(a[i]);
            }
            return;
        }
    if(comp){
        var c = this.lookupComponent(this.applyDefaults(comp));
        var pos = this.items.length;
        if(this.fireEvent('beforeadd', this, c, pos) !== false && this.onBeforeAdd(c) !== false){
            this.items.add(c);
            c.ownerCt = this;
            this.fireEvent('add', this, c, pos);
        }
        return c;
   } else {return null;}
    }
});

//'Plugins unavailable' shortcuts
var not = {

     QT : 'Get QuickTime: <a href="http://www.apple.com/quicktime/download" target="_fdownload">Here</a>'
    ,FLASH: {tag:'span',cls:'noJoy'
              ,html:'<p>Note: The Ext.MediaPanel Demo requires Flash Player 8.0 or higher. The latest version of Flash Player is available at the <a href="http://www.adobe.com/go/getflashplayer" target="_fdownload">Adobe Flash Player Download Center</a>.</p>'
            }
    ,FLASHV:{tag:'span',cls:'noJoy'
              ,html:'<p>Note: The Ext.MediaPanel Demo requires Flash Player {0} or higher. The latest version of Flash Player is available at the <a href="http://www.adobe.com/go/getflashplayer" target="_fdownload">Adobe Flash Player Download Center</a>.</p>'}
    ,PDF   : 'Get Acrobat Reader: <a href="http://www.adobe.com/products/acrobat/readstep2.html" target="_fdownload">Here</a>'
    ,REAL  : 'Get RealPlayer Plugin: <a href="http://www.realplayer.com/" target="_fdownload">Here</a>'
    ,OFFICE: 'MSOffice Is not installed'
    ,JWP   : '<p>FLV Player can handle (FLV, but also MP3, H264, SWF, JPG, PNG and GIF). It also supports RTMP and HTTP (Lighttpd) streaming, RSS, XSPF and ASX playlists, a wide range of flashvars (variables), an extensive  javascript API and accessibility features.</p>'+
             'Get FLV Player <a href="http://www.jeroenwijering.com/?item=JW_FLV_Player" target="_fdownload">Here</a>.'
    ,JWROT  :'The JW Image Rotator (built with Adobe\'s Flash) enables you to show photos in sequence, with fluid transitions between them. It supports rotation of an RSS, XSPF or ASX playlists with JPG, GIF and PNG images.'+
              '<p>Get JW ImageRotator <a href="http://www.jeroenwijering.com/?item=JW_Image_Rotator" target="_fdownload">Here</a>.'
};

var sampleNodes = [
   {'text':'Video'
    ,'id':'\/video'
    ,'leaf':false
    ,iconCls:'folder'
    ,expanded:true
    ,children: [
            {
             text:'Flash(Win)'
            ,id:'\/video\/flash'
            ,leaf:true
            ,tabTitle:'Fire vs Police'
            ,mediaClass :'flashpanel'
            ,handler    : 'winView'
            ,config:{
                 mediaType:'SWF'
                ,url:'http://www.youtube.com/v/Jr8n0ww3pio&rel=1'
                ,autoSize:true
                ,height : 355
                ,width  : 425
                ,id:'utube'
                ,controls:true
                ,start:true
                ,loop :false
                ,unsupportedText : not['FLASH']
                ,params:{wmode:'opaque'
                      ,allowscriptaccess : 'always'
                }

                }
             }
            ,{
            text:'Quicktime'
            ,id:'\/video\/qmov'
            ,leaf:true
            ,config:{ mediaType:'MOV'
                ,url:'http://www.sarahsnotecards.com/catalunyalive/diables.mov'
                ,width:425
                ,height:355
                ,id:'qtime'
                ,unsupportedText : not['QT']
                ,controls:true
                ,start:false}
              }
            ,{
            text:'Real Video'
            ,id:'\/video\/realv'
            ,leaf:true
            ,tabTitle:'Sarrah\'s Chronicles'
            ,config:{
                      mediaType:'REAL'
                     ,url       :'http://show.real.com/_/action/ram/playlistid/16988690/clipnum/2/rampos/1/'
                     ,height    :'100%'
                     ,width     :'100%'
                     ,unsupportedText : not['REAL']
                     ,controls:'ImageWindow'
                     ,start:true}
          }
        ,{
            text:'Windows Media'
            ,id:'\/video\/wmedia'
            ,leaf:true
            //,iconCls:'folder'
            ,config:{
                 mediaType  :'WMV'
                ,url        :'http://www.sarahsnotecards.com/catalunyalive/fishstore.wmv'
                ,height     :300
                ,width      :250
                ,id         :'wmv'
                ,unsupportedText : not['WMV']
                ,controls   :false
                ,start      :true}
          }
        ]
    }
  ,
  {
       text     :'Audio'
      ,id       :'\/audio'
      ,leaf     :false
      ,iconCls  :'folder'
      ,expanded :true
      ,children : [
            {
                 text   :'QuickTime MP3 (w/Loop)'
                ,id     :'\/audio\/sit'
                ,leaf   :true
                ,config:{
                          mediaType :'QTMP3'
                         ,url       :'sit.mp3'
                         ,start     :true
                         ,controls  :true
                         ,params    :{loop:true}
                         ,unsupportedText : not['QT']
                         ,height    :44
                         ,width     :280}
            }
            ,{
             text   :'QuickTime Midi'
            ,id     :'\/audio\/canyon'
            ,leaf   :true
            ,config:{ mediaType     :'QTMIDI'
                     ,url           :'canyon.mid'
                     ,id            :'canyon'
                     ,start         :true
                     ,controls      :true
                     ,unsupportedText : not['QT']
                     ,height        :44
                     ,width         :280}
            }
          ,{
               text     :'QuickTime WAV'
              ,id       :'\/audio\/ring'
              ,leaf     :true
              ,config:{ mediaType   :'QTWAV'
                       ,url         :'callring.wav'
                       ,start       :true
                       ,controls     :true
                       ,unsupportedText : not['QT']
                       ,height      :44
                       ,width       :280}
            }

        ]

    },
    {
       text:'Documents'
      ,id:'\/docs'
      ,leaf:false
      ,iconCls:'folder'
      ,expanded:true
      ,children: [
         {
           text:'Acrobat(Win)'
          ,id:'\/docs\/pdf'
          ,leaf:true
          ,handler    : 'winView'
          ,config:{ mediaType   :'PDF'
                   ,url         :'ex1.pdf'
                   ,id          :'ex1pdf'
                   //,autoSize:false
                   ,unsupportedText : not['PDF']
                   ,params      :{page:2}

             }
          }
        ,{
           text     :'HTML'
          ,id       :'\/docs\/html'
          ,width    :'100%'
          ,height   :'100%'
          ,leaf     :true
          ,config   :{ mediaType:'HTM'
                      ,url      :'http://www.google.com/'
                      ,id       :'bgoogle'}
          }
         ,{
            text:'Excel'
           ,id:'\/docs\/excel'
           ,leaf:true
           ,config:{ mediaType  :'OFFICE'
                    ,url        :'svc_pricing.xls'
                    ,unsupportedText : not['OFFICE']
                    ,id         :'xlspricing'}
          }
       ]

    }
   ,
   {
      text  :'Images'
     ,id    :'\/image'
     ,leaf  :false
     ,iconCls:'folder'
     ,expanded:true
     ,children: [
        {
          text  :'Jpeg'
         ,id    :'\/image\/boat'
         ,leaf  :true
         ,mediaClass :'media'
         ,tabTitle: 'Boating Accidents Happen'
         ,config:{ mediaType    :'JPEG'
                  ,url          :'how boating accidents happen.jpg'
                  ,id           :'accidents'
                  ,height:380
                  ,width:600
                  }
         }
      ]
    }
    ,{
       text     :'Advanced Flash Class'
      ,id       :'\/cflash'
      ,leaf     :false
      ,iconCls  :'folder'
      ,expanded :true
      ,children : [
         {   text       :'YouTube(again)'
            ,id         :'\/cflash\/cutube'
            ,leaf       :true
            ,mediaClass :'flashpanel'
            ,tabTitle   : 'Flash Detection'
            ,listeners  : { render : function(panel){
                             var version = panel.detectVersion();
                             if(version){
                                Ext.DomHelper.append(panel.body,
                                  {tag:'p',html: 'Flash Version ' + version + ' detected.'});
                             }
                           }
                           ,single:true
                        }
            ,config:{
                 url        :'http://www.youtube.com/v/Jr8n0ww3pio&rel=1'
                ,width      :425
                ,height     :355
                ,controls   :true
                ,start      :false
                ,unsupportedText : not['FLASHV']
                ,installUrl:'playerProductInstall.swf'
                ,requiredVersion : '9.0.45'
                ,params:{wmode:'transparent'}

                }
         }
        ,{   text       :'w\/Express Install'
            ,id         :'\/cflash\/cexpress'
            ,leaf       :true
            ,mediaClass :'flashpanel'
            ,listeners  : { render : function(panel){
                             var version = panel.detectVersion();
                             if(version){
                                Ext.DomHelper.append(panel.body,
                                  {tag:'p',html: 'Flash Version ' + version + ' detected, but Version '+(panel.requiredVersion||panel.mediaCfg.requiredVersion)+' is required.'});
                             }
                           }
                           ,single:true
                        }
            ,config:{
                 url        :'http://www.youtube.com/v/Jr8n0ww3pio&rel=1'
                ,width      :425
                ,height     :355
                ,controls   :false
                ,start      : false
                ,unsupportedText : not['FLASHV']
                ,installUrl :'playerProductInstall.swf' //No Express install without specifying this
                ,requiredVersion : '9.0.300'  //a bogus version forces Update
                ,params     :{ scale     :'exactfit'
                              ,salign    :'t'}

                }
         }
         ]

    },
    {
           text     :'JW Players/Viewers'
          ,id       :'\/JW'
          ,leaf     :false
          ,iconCls  :'folder'
          ,expanded :true
          ,children : [
             {   text       :'JW Media Player Audio Sample(Win)'
                ,id         :'\/JW\/flvaudio'
                ,leaf       :true
                ,handler    : 'winView'
                ,tabTitle   : 'Peter Jones'
                ,config:{
                     mediaType   : 'JWP'
                    ,url        : 'http://www.jeroenwijering.com/upload/mediaplayer.swf'
                    ,width      :390
                    ,height     :20
                    ,autoSize   : false
                    ,volume     : 25
                    ,start      :true
                    ,loop       :false
                    ,params:{
                              wmode    :'transparent'
                             ,allowscriptaccess : 'always'
                             ,flashVars: {
                                             autostart  :'@start'
                                            ,file       :'http://www.jeroenwijering.com/upload/peterjones.mp3'
                                            ,showdigits : true
                                            ,volume     :'@volume'
                                          }

                            }
                   }
            },
           {    text       :'JW ImageRotator (via Flickr)(Win)'
               ,id         :'\/JW\/ImgRotation'
               ,leaf       :true
               ,mediaClass :'flashpanel'
               ,items      : [{title:'About JW ImageRotator',html:not['JWROT'],border:false}]
               ,tabTitle   : 'JW-FlikrCasting'
               ,handler    : 'winView'
               ,config:{
                    mediaType   : 'JWP'
                   ,url         : 'http://www.jeroenwijering.com/upload/imagerotator.swf'
                   ,start       : true
                   ,controls    :true
                   //,width      :500
                   //,height     :300
                   ,autoSize  : true
                   ,renderOnResize : true
                   ,unsupportedText : 'JW ImageRotator is not installed/available.'
                   ,params:{
                        wmode               :'transparent'
                       ,allowscriptaccess   : 'always'
                       ,allowfullscreen     : true
                       ,quality             : 'high'
                       ,salign              :'tl'

                       ,flashVars:{
                           width      :'@width'
                          ,height     :'@height'
                           ,file       :'http://api.flickr.com/services/feeds/photos_public.gne?tags=macro&format=rss_200'
                          ,shownavigation:true
                          ,transition : 'random'
                          ,lightcolor: 0x990066
                          //,overstretch :'true'
                          ,autostart  :'@start'
                         }

                      }
                 }
            }
          ]
    }
 ];

var Demo = {

    init    : function(){

        var get = Ext.getCmp;

        this.tree = get('samples');
        this.tabs = get('demoTabs');
        var sm = this.tree.getSelectionModel();

        this.tree.on('click', this.handlers.nodeSelect.createDelegate(this,[sm],0));
        },
    destroy  : function(){
        Ext.destroy(Ext.getCmp('viewWin'),this.view)

    },

    handlers:{
           nodeSelect:function( smodel, treeNode, e ){

                    //A folder or already selected
                    if(!treeNode.isLeaf()) {return false;}

                    var NA = treeNode.attributes || {};

                    if(NA.handler){

                        (Demo.handlers[NA.handler]?Demo.handlers[NA.handler]:NA.handler)(NA,treeNode.ui.anchor);
                        return;
                    }
                    var id = NA.id.split('\/')[2] || false; //derive a tab id from node.id

                    var tab;
                    if(tab = this.tabs.getItem(id)){
                        this.tabs.setActiveTab(tab);
                        tab.refreshMedia();    //force media Refresh

                    } else {

                        tab = this.tabs.add(
                                 {
                                    xtype   : NA.mediaClass || 'mediapanel'
                                   ,id      : id || (id=Ext.id())
                                   ,mediaCfg: NA.config
                                   ,title   : NA.tabTitle || NA.text || id
                                   ,listeners: NA.listeners || false
                                   ,items   : NA.items || []
                                  });
                        this.tabs.doLayout();
                        this.tabs.setActiveTab(tab);

                    }
            },
            winView   : function(NA,animTarget){

                var win = Ext.getCmp('viewWin');

                if(win){
                    Ext.destroy(win);
                    win=null;
                }
                var mConfig = Ext.apply({},NA.config);

                new Ext.ux.MediaWindow
                           ({id         :'viewWin'
                            ,height     : 430
                            ,width      : 430
                            ,minHeight  :(parseInt(mConfig.height,10)||0)+32
                            ,collapsible:true
                            ,renderTo   :Ext.getBody()
                            ,title      : (NA.tabTitle || NA.text || "Who  knows?")
                            ,mediaCfg   : mConfig
                            ,autoScroll : true
                            ,listeners  : NA.listeners || false
                            ,tools: [{id:'gear',handler:function(e,t,p){p.refreshMedia();}}]
                            }).show(animTarget);



            }
    }
};

//Ext.useShims = true;
Ext.BLANK_IMAGE_URL = '../../resources/images/default/s.gif';
Ext.onReady(function(){
   Ext.QuickTips.init();
   Ext.QuickTips.getQuickTip().interceptTitles = true;

   Ext.QuickTips.enable();

   Demo.view = new Ext.Viewport({
        layout:'border',

        listeners:{ render: Demo.init,
                    scope : Demo,
                    single : true},
        items:[
            new Ext.BoxComponent({ // raw element
                region:'north',
                el: 'header',
                height:32
            }),
            {
                region:'west',
                id:'demos',
                title:'Demos and Notes',
                split:true,


                width:200,
                minSize: 175,
                maxSize: 400,
                collapsible: true,
                cmargins:'5 5 5 5',
                layout:'accordion',
                layoutConfig:{
                     animate:false
                    ,activeOnTop : false
                    ,autoWidth: true
                    ,autoHeight: true
                    ,fill:true
                },
                defaults:{autoScroll:true},
                items:[
                    {
                        id:'samples',
                        xtype:'treepanel',
                        autoScroll:true,
                        title: 'Media Samples',
                        loader: new Ext.tree.TreeLoader(),
                        rootVisible:false,
                        lines:false,

                        root: new Ext.tree.AsyncTreeNode({
                            text:'Online',
                            expanded:true,
                            children:sampleNodes
                        })
                   } ,
                   {
                        title: 'Hit Parade'
                       ,id : 'hits'
                       ,xtype: 'mediapanel'

                       ,mediaCfg:{
                             mediaType:'GIF'
                             ,height:30
                            ,url:'speeddial.gif'
                            ,id:'odometer'
                            ,start : true
                        }
                    } ,
                     {
                       title    : 'Clock'
                      ,id       : 'clockPanel'
                      ,xtype    : 'flashpanel'
                      ,autoHeight :  true
                      ,autoWidth: true
                      ,mediaCfg : {
                            mediaType:'SWF'
                            ,url: 'clock.swf'
                            ,id:  'clock'
                            ,start    : true
                            ,loop     : true
                            ,controls :true
                            ,height:130  //fixed height for aspect ratio
                            ,params: {
                                wmode     :'transparent'
                               ,scale     :'exactfit'
                               ,salign    :'t'
                            }
                       }
                    }

                ]
             },
             { xtype:'tabpanel',
               region:'center',
               id    :'demoTabs',
               activeTab: 0,
               split:true,

               enableTabScroll: true,
               monitorResize: true,
               autoDestroy:true,

               defaults:{

                 closable      :true

                }
               ,items:[{title:'BackGrounder'
                       ,contentEl:'background'
                       ,autoScroll : true
                       ,closable:false
                       }]

            }
    ]
  });

   Ext.EventManager.on(window,   "beforeunload",  Demo.destroy ,Demo,{single:true});

});
