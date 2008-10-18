/*
   SoundManager 2: Javascript Sound for the Web
   ----------------------------------------------
   http://schillmania.com/projects/soundmanager2/

   Copyright (c) 2008, Scott Schiller. All rights reserved.
   Code licensed under the BSD License:
   http://www.schillmania.com/projects/soundmanager2/license.txt

   V2.80a.20081005

   Flash 9 / ActionScript 3 version
*/

package {

  import flash.events.Event;
  import flash.external.*;
  import flash.events.*;
  import flash.media.Sound;
  import flash.media.SoundChannel;
  import flash.media.SoundLoaderContext;
  import flash.media.SoundTransform;
  import flash.media.SoundMixer;
  import flash.net.URLRequest;
  import flash.utils.ByteArray;
  import flash.display.Sprite;

  import flash.net.NetConnection;
  import flash.net.NetStream;

  public class SoundManager2_SMSound_AS3 extends Sound {

    public var sm:SoundManager2_AS3 = null;
    // externalInterface references (for Javascript callbacks)
    public var baseJSController:String = "soundManager";
    public var baseJSObject:String = baseJSController+".sounds";
    public var soundChannel:SoundChannel = new SoundChannel();
    public var urlRequest:URLRequest;
    public var soundLoaderContext:SoundLoaderContext;
    public var waveformData:ByteArray = new ByteArray();
    public var waveformDataArray:Array = [];
    public var eqData:ByteArray = new ByteArray();
    public var eqDataArray:Array = [];
    public var usePeakData:Boolean = false;
    public var useWaveformData:Boolean = false;
    public var useEQData:Boolean = false;
    public var sID:String;
    public var sURL:String;
    public var justBeforeFinishOffset:int;
    public var didJustBeforeFinish:Boolean;
    public var didFinish:Boolean;
    public var loaded:Boolean;
    public var paused:Boolean;
    public var duration:Number;
    public var lastValues:Object = {
      bytes: 0,
      position: 0,
      volume: 100,
      pan: 0,
      nLoops: 1,
      leftPeak: 0,
      rightPeak: 0,
      waveformDataArray: null,
      eqDataArray: null
    };
    public var didLoad:Boolean = false;
    public var sound:Sound = new Sound();

	public var cc:Object;
	public var nc:NetConnection;
	public var ns:NetStream;
	public var st:SoundTransform;
	
	public var useNetstream:Boolean;

    public function SoundManager2_SMSound_AS3(oSoundManager:SoundManager2_AS3, sIDArg:String=null, sURLArg:String=null, usePeakData:Boolean = false, useWaveformData:Boolean = false, useEQData:Boolean = false, useNetstreamArg:Boolean = false) {
	  this.sm = oSoundManager;
      this.sID = sIDArg;
      this.sURL = sURLArg;
      this.usePeakData = usePeakData;
      this.useWaveformData = useWaveformData;
      this.useEQData = useEQData;
      this.urlRequest = new URLRequest(sURLArg);
      this.justBeforeFinishOffset = 0;
      this.didJustBeforeFinish = false;
      this.didFinish = false; // non-MP3 formats only
      this.loaded = false;
      this.soundChannel = null;
	  this.useNetstream = useNetstreamArg;
	  if (this.useNetstream) {
	  	this.cc = new Object();
		this.nc = new NetConnection();
		this.nc.addEventListener(NetStatusEvent.NET_STATUS, doNetStatus);
		// TODO: security/IO error handling
        // this.nc.addEventListener(SecurityErrorEvent.SECURITY_ERROR, doSecurityError);
	    // this.nc.addEventListener(IOErrorEvent.IO_ERROR, doIOError);
		this.nc.connect(null);
		this.ns = new NetStream(this.nc);
        this.ns.checkPolicyFile = true;
		this.st = new SoundTransform();
		this.cc.onMetaData = this.metaDataHandler;
		this.ns.client = this.cc;
		this.ns.receiveAudio(true);
		this.ns.receiveVideo(false);
	  }
    }

    public function writeDebug(s:String,bTimestamp:Boolean=false):Boolean {
	  return this.sm.writeDebug(s,bTimestamp); // defined in main SM object
    }

	/*
    public function doSecurityError(e:SecurityErrorEvent):void {
      writeDebug('securityError: '+e.text);
      // lack of crossdomain.xml, usually
    }
   
    public function doIOError(e:IOErrorEvent):void {
      writeDebug('ioError: '+e.text);
      // 404 or dropped connection
    }
	*/

    public function doNetStatus(e:NetStatusEvent):void {
      writeDebug('netStatusEvent: '+e.info.code);
    }

    public function metaDataHandler(infoObject:Object):void {
	  var data:String = new String();
	  for (var prop:* in infoObject) {
		data += prop+': '+infoObject[prop];
	  }
	  ExternalInterface.call('soundManager._writeDebug','Metadata: '+data);
      if (!this.loaded) {
        ExternalInterface.call(baseJSObject+"['"+this.sID+"']._whileloading",this.bytesLoaded,this.bytesTotal,infoObject.duration);
      }
      this.duration = infoObject.duration*1000;
    }

    public function getWaveformData():void {
      // http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/media/SoundMixer.html#computeSpectrum()
      SoundMixer.computeSpectrum(this.waveformData, false, 0); // sample wave data at 44.1 KHz
      this.waveformDataArray = [];
      for (var i:int=0,j:int=this.waveformData.length/8; i<j; i++) {
        this.waveformDataArray.push(int(this.waveformData.readFloat()*1000)/1000);
      }
    }

    public function getEQData():void {
      // http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/media/SoundMixer.html#computeSpectrum()
      SoundMixer.computeSpectrum(this.eqData, true, 0); // sample EQ data at 44.1 KHz
      this.eqDataArray = [];
      for (var i:int=0,j:int=this.eqData.length/8; i<j; i++) {
        this.eqDataArray.push(int(this.eqData.readFloat()*1000)/1000);
      }
    }

    public function start(nMsecOffset:int,nLoops:int):void {
      if (this.useNetstream) {
	    // writeDebug('start: seeking to '+nMsecOffset);
        this.ns.seek(nMsecOffset);
        if (!this.didLoad) {
          this.ns.play(this.sURL);
          this.didLoad = true;
        } else {
	      this.ns.resume(); // get the sound going again
        }
        // this.ns.addEventListener(Event.SOUND_COMPLETE, _onfinish);
        this.applyTransform();
      } else {
        this.soundChannel = this.play(nMsecOffset,nLoops);
        this.addEventListener(Event.SOUND_COMPLETE, _onfinish);
        this.applyTransform();
      }
    }
	
    private function _onfinish():void {
      this.removeEventListener(Event.SOUND_COMPLETE, _onfinish);
    }

    public function stop():void {
      if (this.useNetstream) {
       this.ns.pause();
      } else {
        this.soundChannel.stop();
      }
      // _onfinish();
    }

    public function loadSound(sURL:String,bStream:Boolean):void {
      if (this.useNetstream) {
	    if (this.didLoad != true) {
		ExternalInterface.call('loadSound(): loading '+this.sURL);
          this.ns.play(this.sURL);
          this.didLoad = true;
        }
        // this.addEventListener(Event.SOUND_COMPLETE, _onfinish);
        this.applyTransform();
      } else {
        this.didLoad = true;
        this.urlRequest = new URLRequest(sURL);
        this.soundLoaderContext = new SoundLoaderContext(1000, true); // check for policy (crossdomain.xml) file on remote domains - http://livedocs.adobe.com/flash/9.0/ActionScriptLangRefV3/flash/media/SoundLoaderContext.html
        this.load(this.urlRequest,this.soundLoaderContext);
      }
    }

    public function setVolume(nVolume:Number):void {
      this.lastValues.volume = nVolume/100;
      this.applyTransform();
    }

    public function setPan(nPan:Number):void {
      this.lastValues.pan = nPan/100;
      this.applyTransform();
    }

    public function applyTransform():void {
      var st:SoundTransform = new SoundTransform(this.lastValues.volume, this.lastValues.pan);
      if (this.useNetstream) {
        this.ns.soundTransform = st;
      } else if (this.soundChannel) {
        this.soundChannel.soundTransform = st; // new SoundTransform(this.lastValues.volume, this.lastValues.pan);
      }
    }

  }

}
