/* Original code:
 * The jsAMP demo from the SoundManager2 Javascript/Flash library
 * Modifications/enhancements:
 * Nour Sharabash for Quran.com
 */
(function(q) {
(function($) {
  function get_sound_id(i) {
    var id = "spsound"+i;
    if (!soundManager.getSoundById(id)) {
      createSound(id,i);
    }
    return id;
  }
  function createSound(id,i) {
    try {
      if (typeof id == 'number') {
        i = id;
        id = "spsound"+i;//hack
        if (!(i >= 0)) {
          return false;
        }
      }
      var self = quran.player.oPlaylist;
      var oParent = quran.player;
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
          //self.whileloading.call(this);
          oParent.whileloading.call(this);
        },
        'whileplaying': oParent.whileplaying,
        'onbeforefinishtime': 2000,
        'onbeforefinish': function() {
          self.onbeforefinish.call(this);
          oParent.onbeforefinish.call(this);
        },
        'onjustbeforefinishtime': 200,
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
/**************************************
 *                                    *
 *             SMUtils()              *
 *                                    *
 **************************************/
  function SMUtils() {
    var self = this;
    this.isSafari = navigator.userAgent.match(/safari/);
    this.isMac = navigator.platform.match(/mac/);
    this.isIE = (navigator.appVersion.match(/MSIE/) && !navigator.userAgent.match(/Opera/));
    this.isNewIE = (this.isIE && !this.isMac && (!navigator.userAgent.match(/MSIE (5|6)/)));
    this.isOldIE = (this.isIE && !this.isNewIE);

    this.$ = function(sID) {
      return document.getElementById(sID);
    }

    this.isChildOf = function(oChild, oParent) {
      while (oChild.parentNode && oChild != oParent) {
        oChild = oChild.parentNode;
      }
      return (oChild == oParent);
    }

    this.addEventHandler = function(o, evtName, evtHandler) {
      typeof(attachEvent) == 'undefined' ? o.addEventListener(evtName, evtHandler, false) : o.attachEvent('on' + evtName, evtHandler);
    }

    this.removeEventHandler = function(o, evtName, evtHandler) {
      typeof(attachEvent) == 'undefined' ? o.removeEventListener(evtName, evtHandler, false) : o.detachEvent('on' + evtName, evtHandler);
    }

    this.classContains = function(o, cStr) {
      return (typeof(o.className) != 'undefined' ? o.className.indexOf(cStr) + 1 : false);
    }

    this.addClass = function(o, cStr) {
      if (!o) return false; // safety net
      if (self.classContains(o, cStr)) return false;
      o.className = (o.className ? o.className + ' ': '') + cStr;
    }

    this.removeClass = function(o, cStr) {
      if (!o) return false; // safety net
      if (!self.classContains(o, cStr)) return false;
      o.className = o.className.replace(new RegExp('( ' + cStr + ')|(' + cStr + ')', 'g'), '');
    }

    this.getElementsByClassName = function(className, tagNames, oParent) {
      var doc = (oParent || document);
      var matches = [];
      var i, j;
      var nodes = [];
      if (typeof(tagNames) != 'undefined' && typeof(tagNames) != 'string') {
        for (i = tagNames.length; i--;) {
          if (!nodes || !nodes[tagNames[i]]) {
            nodes[tagNames[i]] = doc.getElementsByTagName(tagNames[i]);
          }
        }
      } else if (tagNames) {
        nodes = doc.getElementsByTagName(tagNames);
      } else {
        nodes = doc.all || doc.getElementsByTagName('*');
      }
      if (typeof(tagNames) != 'string') {
        for (i = tagNames.length; i--;) {
          for (j = nodes[tagNames[i]].length; j--;) {
            if (self.classContains(nodes[tagNames[i]][j], className)) {
              matches[matches.length] = nodes[tagNames[i]][j];
            }
          }
        }
      } else {
        for (i = 0; i < nodes.length; i++) {
          if (self.classContains(nodes[i], className)) {
            matches[matches.length] = nodes[i];
          }
        }
      }
      return matches;
    }

    this.getOffX = function(o) {
      // http://www.xs4all.nl/~ppk/js/findpos.html
      var curleft = 0;
      if (o.offsetParent) {
        while (o.offsetParent) {
          curleft += o.offsetLeft;
          o = o.offsetParent;
        }
      } else if (o.x) curleft += o.x;
      return curleft;
    }

    this.getOffY = function(o) {
      // http://www.xs4all.nl/~ppk/js/findpos.html
      var curtop = 0;
      if (!o) return false;
      if (o.offsetParent) {
        while (o.offsetParent) {
          curtop += o.offsetTop;
          o = o.offsetParent;
        }
      } else if (o.y) curtop += o.y;
      return curtop;
    }

    this.setOpacity = this.isIE ?
    function(o, nOpacity) {
      o.style.filter = 'alpha(opacity=' + nOpacity + ')';
    }: function(o, nOpacity) {
      o.style.opacity = nOpacity / 100;
    }

    this.copy = function(oArray) {
      // there *must* be a cleaner way to do this..
      var o2 = [];
      for (var i = 0,
      j = oArray.length; i < j; i++) {
        o2[i] = oArray[i];
      }
      return o2;
    }

  };

  var smUtils = new SMUtils();
/**************************************
 *                                    *
 *      SMPlayer < SoundPlayer        *
 *                                    *
 **************************************/
  function SMPlayer(oSoundPlayer) {
    var self = this;
    this.oParent = oSoundPlayer;
    var u = smUtils; // alias
    var getEBCN = u.getElementsByClassName;
    this.oMain = u.$('player-template');
    this.o = this.oMain.getElementsByTagName('div')[0];
    this.oLeft = getEBCN('left', 'div', this.o)[0];
    this.oBar = getEBCN('mid', 'div', this.o)[0];
    this.oRangeStart = getEBCN('range-start', 'a', this.o)[0];
    this.oRangeEnd = getEBCN('range-end', 'a', this.o)[0];
    this.oSlider = getEBCN('slider', 'a', this.o)[0];
    this.oTitle = getEBCN('caption', 'span', this.oBar)[0];
    this.oSeek = getEBCN('seek', 'div', this.oBar)[0];
    this.oDivider = getEBCN('divider', 'div', this.oBar)[0];
    this.sFormat = (this.oTitle.innerHTML || '%artist - %title');
    this.sFormatSeek = (this.oSeek.innerHTML || '%{time1}/%{time2} (%{percent}%)');
    this.oProgress = getEBCN('progress', 'div', this.oBar)[0];
    this.oRangeBackground = this.oProgress;
    this.oRight = getEBCN('right', 'div', this.o)[0];
    this.oTime = getEBCN('time', 'div', this.o)[0];
    this.oAutoPlay = getEBCN('autoplay', 'a', this.o)[0];
    this.oRepeat = getEBCN('loop', 'a', this.o)[0];
    this.oMute = getEBCN('mute', 'a', this.o)[0];
    this.oVolume = getEBCN('volume', 'a', this.o)[0];
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
    this.xRangeEnd = 0; // check if setting this to something else will init it there
    this.xMaxLoaded = 0;
    // this.value = 0;
    this.timer = null;
    this._className = this.oBar.className;
    this.tween = [];
    this.frame = 0;
    this.playState = 0;
    this.busy = false; // when being dragged/animated/moved by user
    this.maxOpacity = 100; // barber pole opacity (when animating in)
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

    var useAltFont = u.isMac; // specific letter-spacing CSS tweak (OSX has better-kerned/tighter spacing)
    // set default caption
    this.oTitle.innerHTML = getEBCN('default', 'div', this.oBar)[0].innerHTML;
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
      self.coords.offX = e.clientX - u.getOffX(self.oMain);
      self.coords.offY = e.clientY - u.getOffY(self.oMain);
      u.addEventHandler(document, 'mousemove', self.barMove);
      u.addEventHandler(document, 'mouseup', self.barUp);
      return false;
    }

    this.barMove = function(e) {
      try {
        var e = e ? e: event;
        if (!self.didDrag) {
          if (Math.abs(e.clientX - self.coords.x) < 3 && Math.abs(e.clientY - self.coords.y) < 3) {
            // drag threshold
            return false;
          } else {
            self.didDrag = true;
          }
        }
        if ($.browser.safari) {
          //hack
          self.oMain.style.left = (e.clientX - self.coords.offX - 722) + 'px';
          self.oMain.style.top = (e.clientY - self.coords.offY - 7) + 'px';
        } else {
          //hack
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
      //q.d.bug('barUp');
      u.removeEventHandler(document, 'mousemove', self.barMove);
      u.removeEventHandler(document, 'mouseup', self.barUp);
    }

    this.barClick = function(e) {
      //q.d.bug('barClick');
      if (!self.oParent.currentSound) return false;
      if (self.didDrag) return false;
      var tgt = (e ? e.target: event.srcElement);
      var e = e ? e: event;
      if (tgt.tagName.toLowerCase() == 'a') return false; // ignore clicks on links (eg. dragging slider)
      var xNew = Math.min(e.clientX - u.getOffX(self.oBar), self.xMaxLoaded);
      self.slide(self.x, xNew);
    }

    // volume x/y offsets
    this.volumeX = 0;
    this.volumeWidth = 0;

    this.volumeDown = function(e) {
      // set initial volume based on offset?
      self.volumeX = u.getOffX(self.oVolume);
      self.volumeWidth = parseInt(self.oVolume.offsetWidth);
      q.d.bug('offsets: ' + self.volumeX + ', ' + self.volumeWidth);
      document.onmousemove = self.volumeMove;
      document.onmouseup = self.volumeUp;
      self.volumeMove(e);
      return false;
    }

    this.volumeMove = function(e) {
      // set volume based on position
      var e = e ? e: event;
      var vol = ((e.clientX - self.volumeX) / (self.volumeWidth));
      vol = Math.min(1, Math.max(0, vol));
      self.setVolume(vol * 100);
      return false;
    }

    this.volumeUp = function(e) {
      var e = e ? e: event;
      document.onmousemove = null;
      document.onmouseup = null;
      return false;
    }

    this.setVolume = function(nVol) {
      try {
        if (!self.oParent.currentSound || self.volume == nVol) return false;
        soundManager.defaultOptions.volume = nVol;
        self.volume = nVol;
        if (!self.muted) soundManager.setVolume(self.oParent.currentSound, nVol);
        u.setOpacity(self.oVolume, nVol);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.setRangeBackground = function() {
      self.oRangeBackground.style.marginLeft = self.xRangeStart + 7 + 'px';
      self.oRangeBackground.style.width = self.xRangeEnd - self.xRangeStart + 'px';
      if ((self.xRangeEnd == self.xMax) && (self.xRangeStart == self.xMin)) {
        $(self.oRangeBackground).animate({
            opacity: 0
        },500);
      } else {
        u.setOpacity(self.oRangeBackground, 100);
      }
    }

    this.rangeStartDown = function(e) {
      try {
        if (!self.oParent.currentSound) return false;
        self.didDrag = false;
        var e = e ? e: event;
        self.offX = e.clientX - (u.getOffX(self.oRangeStart) - u.getOffX(self.oBar));
        self.rangeBusy = true;
        self.refreshSeek('rangeStart');
        self.setSeekVisibility(1);
        u.addClass(self.oRangeStart, 'active');
        u.addEventHandler(document, 'mousemove', self.rangeStartMove);
        u.addEventHandler(document, 'mouseup', self.rangeStartUp);
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
      self.oRangeStart.style.marginLeft = (Math.floor(x) + 1) + 'px';
      self.setRangeBackground();
    }
    this.rangeStartUp = function(e) {
      try {
        u.removeEventHandler(document, 'mousemove', self.rangeStartMove);
        u.removeEventHandler(document, 'mouseup', self.rangeStartUp);
        u.removeClass(self.oRangeStart, 'active');
        self.rangeBusy = false;
        var x;
        if (!self.oParent.options.allowScrub || self.oParent.paused) {
          if (self.x >= self.xRangeEnd) {
            x = self.xRangeEnd;
          } else
          if (self.x <= self.xRangeStart) {
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
        self.offX = e.clientX - (u.getOffX(self.oSlider) - u.getOffX(self.oBar));
        self.busy = true;
        self.refreshSeek();
        self.setSeekVisibility(1);
        u.addClass(self.oSlider, 'active');
        u.addEventHandler(document, 'mousemove', self.sliderMove);
        u.addEventHandler(document, 'mouseup', self.sliderUp);
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
      } else
      if (x < self.xRangeStart) {
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
      self.oSlider.style.marginLeft = (Math.floor(x) + 1) + 'px'; // 1 offset
    }
    this.sliderUp = function(e) {
      try {
        u.removeEventHandler(document, 'mousemove', self.sliderMove);
        u.removeEventHandler(document, 'mouseup', self.sliderUp);
        u.removeClass(self.oSlider, 'active');
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
        self.offX = e.clientX - (u.getOffX(self.oRangeEnd) - u.getOffX(self.oBar));
        self.rangeBusy = true;
        self.refreshSeek('rangeEnd');
        self.setSeekVisibility(1);
        u.addClass(self.oRangeEnd, 'active');
        u.addEventHandler(document, 'mousemove', self.rangeEndMove);
        u.addEventHandler(document, 'mouseup', self.rangeEndUp);
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
      self.oRangeEnd.style.marginLeft = (Math.floor(x) + 1 + 6) + 'px'; // 1 offset
      self.setRangeBackground();
    }
    this.rangeEndUp = function(e) {
      try {
        u.removeEventHandler(document, 'mousemove', self.rangeEndMove);
        u.removeEventHandler(document, 'mouseup', self.rangeEndUp);
        u.removeClass(self.oRangeEnd, 'active');
        self.rangeBusy = false;
        var x;
        if (!self.oParent.options.allowScrub || self.oParent.paused) {
          if (self.x >= self.xRangeEnd) {
            x = self.xRangeEnd;
          } else
          if (self.x <= self.xRangeStart) {
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
      // refreshes seek text in the progress bar
      var position,action;
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
      // remove any empty/null fields
      var aData = sData.split(' ');
      for (var i = aData.length; i--;) {
        if (aData[i].indexOf('!null!') + 1) aData[i] = null;
      }
      self.oSeek.innerHTML = aData.join(' ');
    }

    this.setSeekVisibility = function(bVisible) {
      // controls whether the refreshed seek text is visible?
      self.oTitle.style.visibility = bVisible ? 'hidden': 'visible';
      self.oSeek.style.display = bVisible ? 'block': 'none';
    }

    this.animateComplete = function() {
      self.busy = false;
      // set sound position, if needed
      if (self.oParent) self.oParent.onUserSetSlideValue(self.x);
    }


    this.moveSliderToEnd = function() {
      q.d.bug(self.xMax);
      self.moveSliderTo(self.xMax);
    }

    this.moveRangeStartToStart = function(x) {
      self.moveRangeStartTo(self.xMin);
    }

    this.moveRangeEndToEnd = function(x) {
      self.moveRangeEndTo(self.xMax);
    }

    this.slideLastExec = new Date();

    this.animate = function() {
      self.moveSliderTo(self.tween[self.frame]);
      self.frame = Math.max(++self.frame, animator.determineFrame(self.slideLastExec, 40));
      // if (self.frame++>=self.tween.length-1) {
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

    this.randomize = function() {
      self.slide(self.x, parseInt(Math.random() * self.xMax));
    }

    this.getTimeEstimate = function(oSound) {
      // try to estimate song length within first 128 KB (or total bytes), updating n times
      var byteCeiling = Math.min(1048576 || oSound.bytes);
      var samples = (byteCeiling == oSound.bytes ? 2 : 4);
      var milestone = Math.floor(oSound.bytesLoaded / byteCeiling * samples);
      if (oSound.bytesLoaded > byteCeiling && self.gotTimeEstimate > 0) return false;
      if (self.gotTimeEstimate == milestone) return false;
      self.gotTimeEstimate = milestone;
      self.setMetaData(oSound);
    }

    this.getTime = function(nMSec, bAsString) {
      // convert milliseconds to mm:ss, return as object literal or string
      var nSec = Math.floor(nMSec / 1000);
      var min = Math.floor(nSec / 60);
      var sec = nSec - (min * 60);
      if (min == 0 && sec == 0) return null; // return 0:00 as null
      return (bAsString ? (min + ':' + (sec < 10 ? '0' + sec: sec)).replace(/NaN/g,'0') : {
        'min': min,
        'sec': sec
      });
    }

    this.updateTime = function(nMSec) {
      // update "current playing" time
      self.lastTime = nMSec;
      self.oTime.innerHTML = (self.getTime(nMSec, true) || '0:00');
    }

    this.setTitle = function(sTitle) {
      // used in the absence of ID3 info
      self.oTitle.innerHTML = unescape(sTitle);
      self.titleString = unescape(sTitle);
      self.refreshScroll();
    }

    this.isEmpty = function(o) {
      return (typeof o == 'undefined' || o == null || o == 'null' || (typeof o == 'string' && o.toLowerCase() == 'n/a' || o.toLowerCase == 'undefined'));
    }

    this.setMetaData = function(oSound) {
      // get id3 data and populate according to formatting string (%artist - %title [%album] etc.)
      var friendlyAttrs = {
        // ID3V1 inherits from ID3V2 if populated
        'title': 'songname',
        // songname/TIT2
        'artist': 'artist',
        // artist/TPE1
        'album': 'album',
        // album/TALB
        'track': 'track',
        // track/TRCK
        'year': 'year',
        // year/TYER
        'genre': 'genre',
        // genre/TCON
        'comment': 'comment',
        // comment/COMM
        'url': 'WXXX'
      }
      var sTime = self.getTime(oSound.durationEstimate, true);
      sTime = (sTime && !oSound.loaded ? '~': '') + sTime;
      var metaAttrs = {
        // custom attributes taken directly from sound data
        'time': sTime // get time as mm:ss
      }
      // get normalised data, build string, replace
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
      // remove any empty/null fields
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
      } catch (e) {
        q.d.bug(e);
      }
    }

    this.setLoading = function(bLoading) {
      try {
        if (self.isLoading == bLoading) return false;
        self.isLoading = bLoading;
        var f = bLoading ? u.addClass: u.removeClass;
        f(self.oProgress, 'loading');
        self.setLoadingAnimation(bLoading);
      } catch (e) {
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
            // reverse animation while active
            // self.loadingTween.reverse();
            self.loadingAnimateFrame = (self.loadingTween.length - self.loadingAnimateFrame);
          } else {
            self.loadingTween = self.loadingTweens[1];
            animator.addMethod(self.loadingAnimateSlide, self.loadingAnimateSlideComplete);
          }
        }
      } catch (e) {
        q.d.bug(e);
      }
    }

    this.loadingAnimate = function() {
      var d = new Date();
      if (d - self.loadingLastExec < 50) return true; // throttle fps
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
      if (d - self.loadingLastExec < 50) return true; // throttle to 20fps
      u.setOpacity(self.oProgress, self.loadingTween[self.loadingAnimateFrame++]);
      if (!self.isLoading) self.loadingAnimate(); // show update if not actively loading
      self.loadingLastExec = d; // updates time, prevents loadingAnimate()
      return (++self.loadingAnimateFrame < self.loadingTweens[0].length);
    }

    this.loadingAnimateSlideComplete = function() {
      try {
        self.loadingAnimateFrame = 0;
        // self.loadingDirection = !self.loadingDirection;
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

    this.togglePlaylist = function() {
      // show UI changes here in main player?
    }

    this.setAutoPlay = function(bAutoPlay) {
      var f = (bAutoPlay ? u.addClass : u.removeClass);
      f(self.oAutoPlay,'active');
    }

    this.setRepeat = function(bRepeat) {
      var f = (bRepeat ? u.addClass: u.removeClass);
      f(self.oRepeat, 'active');
    }

    this.setMute = function(bMute) {
      var f = (bMute ? u.addClass: u.removeClass);
      f(self.oMute, 'active');
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
      // q.d.bug('scrollTo(): '+nOffset);
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
          document.title = str; // str.replace(/&nbsp;/i,' ');
        } catch(e) {
          // oh well
        }
      }
    }

    this.doScroll = function() {
      var d = new Date();
      if (d - self.scrollLastExec < self.scrollInterval) return true; // throttle
      self.scrollLastExec = d;
      self.scrollOffset += self.scrollAmount;
      if (self.scrollOffset > self.coords.titleWidth) {
        // q.d.bug('wrapping around');
        self.scrollOffset = (smUtils.isIE ? 5 : 1);
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

    this.titleString = ''; // for document title
    this.refreshScroll = function() {
      // self.scrollOffsetMax = 25; // self.oTitle.innerHTML.length;
      // q.d.bug('refreshScroll(): '+self.scrollOffsetMax);
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
      // if (doScroll) self.oTitle.innerHTML = (self.oTitle.innerHTML+' *** '+self.oTitle.innerHTML); // fake the "repeat"
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

    this.destructor = function() {
      self.oBar.onmouseover = null;
      self.oBar.onmouseout = null;
      self.o.onmousedown = null;
      self.o = null;
      self.oV = null;
      self.oB.onclick = null;
      self.oB = null;
    }

    if (u.isIE) {
      // IE is lame, no :hover
      this.oBar.onmouseover = this.over;
      this.oBar.onmouseout = this.out;
    }

    if (u.isSafari) u.addClass(this.oMain, 'noOpacity'); // stupid transparency tweak
    if (useAltFont) u.addClass(this.oMain, 'altFont');

    // this.setScroll(true); // test
    this.oSlider.onmousedown = this.sliderDown;
    this.oRangeStart.onmousedown = this.rangeStartDown;
    this.oRangeEnd.onmousedown = this.rangeEndDown;
    this.oBar.onmousedown = this.barDown;
    this.oBar.onclick = this.barClick;
    //  self.update();
    // start scrolling, if needed
    self.refreshScroll();

  }
/**************************************
 *                                    *
 *              Animator              *
 *                                    *
 **************************************/
  function Animator() {
    var self = this;
    this.timer = null;
    this.active = null;
    this.methods = [];
    this.tweenStep = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    this.frameCount = this.tweenStep.length;
    // this.lastExec = new Date();
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
        // floor/ceiling checks (rounding errors?)
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
      // var tElapsed = (new Date()-tStart);
      // determine current frame, including lag
      return Math.min(self.frameCount, Math.floor(self.frameCount * ((new Date() - tStart) / (nInterval * self.frameCount))));
    }

    this.animate = function(e) {
      if (!self.active) return false;
      /*
        var now = new Date();
        if (now-self.lastExec<50) return false; // no more than 20 fps
        self.lastExec = now;
        */
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

  }

  var animator = new Animator();
/**************************************
 *                                    *
 *      SPPlaylist < SoundPlayer      *
 *                                    *
 **************************************/
  function SPPlaylist(oSoundPlayer, oPlaylist) {
    var self = this;
    var oParent = oSoundPlayer;
    var seamlessDelay = 0; // offset for justBeforeFinish
    this.o = oPlaylist || null; // containing element
    this.links = [];
    this.items = [];
    this.playlistItems = []; // pointer
    this.playlistItemsUnsorted = [];
    this.playlistItemsShuffled = [];
    this.history = [];
    this.index = -1;
    this.lastIndex = null;
    this.isVisible = false;
    this.doShuffle = false;
    this.doAutoPlay = false;
    this.doRepeat = false;
    this._ignoreCurrentSound = false;

    this.resetArrays = function() {
      try {
        self.links = [];
        self.items = [];
        self.playlistItems = []; // pointer
        self.playlistItemsUnsorted = [];
        self.playlistItemsShuffled = [];
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
        $('#playlist-template').html('<div class="hd"><div class="c"></div></div>' + '<div class="bd">' + '<ul>' + '</ul>' + '</div>' + '<div class="ft"><div class="c"></div></div>');
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

    this.getItem = function(sURL) {
      try {
        for (var i = self.items.length; i--;) {
          if (self.items[i].url == sURL) return self.items[i];
        }
        return null;
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

    this.getRandomItem = function() {
      try {
        return parseInt(Math.random() * self.items.length);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.calcNextItem = function() {
      try {
        var nextItem = self.index + 1;
        if (nextItem >= self.items.length) nextItem = -1;
        return nextItem;
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.getNextItem = function() {
      try {
        self.index++;
        if (self.index >= self.items.length) {
          self.index = -1; // reset
          return false;
        }
        return true;
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.calcPreviousItem = function() {
      try {
        var prevItem = self.index - 1;
        if (prevItem < 0) prevItem = self.items.length - 1;
        return prevItem;
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.getPreviousItem = function() {
      try {
        if (--self.index < 0) {
          self.index = self.items.length - 1;
          return false;
        }
        return true;
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
          q.d.bug('loading current');
          sound.load();
          oParent.oSMPlayer.updateTime(1);
        }
        if (sound && (sound.readyState == 1)) {
          q.d.bug('time w/ estimate');
          oParent.oSMPlayer.updateTime(sound.durationEstimate);
        }
        if (sound && (sound.readyState == 3)) {
          q.d.bug('time w/ duration');
          oParent.oSMPlayer.updateTime(sound.duration);
        }
        if (play && sound && ((sound.readyState == 1) || (sound.readyState == 3))) {
          self.play(self.index);
        } else {
          if (play && sound) {
            q.d.bug('problem loading sound, id was ',oParent.currentSound,' last was ',oParent.lastSound,' and readyState was ',sound.readyState," and name was ",self.items[self.index].name," and url was ",self.items[self.index].url[0]);
          } else
          if (play && !sound) {
            q.d.bug('sound was undefined, oParent.currentSound =',oParent.currentSound);
          }
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

    this.next = function() {
      try {
        quran.trigger('change-aya','next');
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.previous = function() {
      try {
        quran.trigger('change-aya','prev');
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

    this.selectItem = function(i) {
      try {
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
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.selectAya = function(a) {
      try {
        self.selectItem(a-1);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.playItem = function(i) {
      try {
        self.selectItem(i);
        self.play(i);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.playAya = function(a) {
      try {
        self.playItem(a-1);
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
      q.d.bug('onbefore playlist');
      try {
        self.preloadNext();
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.onjustbeforefinish = function() {
      q.d.bug('onjustbefore playlist');
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.onfinish = function() {
      q.d.bug('onfinish playlist');
      try {
        if (self.doAutoPlay) {
          self.next();
        }
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.onbeforefinishcomplete = function() {
      q.d.bug('onbeforefinishcomplete playlist');
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }


    this.show = function() {
      try {
        self.setDisplay(true);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.hide = function() {
      try {
        self.setDisplay();
      } catch(e) {
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

    this.createTweens = function() {
      try {
        var base = (smUtils.isOldIE ? 16 : 0); // IE<7 needs vertical offset for playlist.
        self.displayTweens = [animator.createTween(base, self.o.offsetHeight), animator.createTween(self.o.offsetHeight, base)];
        self.widthTweens = [animator.createTween(self.o.offsetWidth, 1), animator.createTween(1, self.o.offsetWidth)];
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.setCoords = function(nHeight, nOpacity, nWidth) {
      try {
        self.o.style.marginTop = -nHeight + 'px';
        if (!smUtils.isIE) smUtils.setOpacity(self.o, nOpacity);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.animate = function() {
      try {
        self.frame = Math.max(++self.frame, animator.determineFrame(self.displayLastExec, 35));
        self.setCoords(self.displayTween[self.frame], self.opacityTween[self.frame], self.widthTween[self.frame]);
        if (self.frame >= self.displayTween.length - 1) {
          self.frame = 0;
          return false;
        }
        return true;
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.displayLastExec = new Date();

    this.setDisplay = function(bDisplay) {
      try {
        self.displayTween = self.displayTweens[self.isVisible ? 1 : 0];
        self.opacityTween = self.opacityTweens[self.isVisible ? 1 : 0];
        self.widthTween = self.widthTweens[self.isVisible ? 1 : 0];
        if (self.frame > 0) self.frame = self.displayTweens[0].length - self.frame;
        self.displayLastExec = new Date();
        animator.addMethod(self.animate, self.animateComplete);
        animator.start();
      } catch (e) {
        q.d.bug(e);
      }
    }

    this.animateComplete = function() {
      try {
      } catch (e) {
        q.d.bug(e);
      }
    }

    this.toggleDisplay = function() {
      try {
        self.isVisible = !self.isVisible;
        if (!self.isVisible) self.o.style.display = 'block';
        self.setDisplay(self.isVisible);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.clearPlaylist = function() {
      try {
        var sID;
        for (var i = 0, j = self.items.length; i < j; i++) {
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
        for (var i = 0, j = self.items.length; i < j; i++) {
          self.playlistItems[i] = new SPPlaylistItem(self.links[i], self, i);
        }
        self.playlistItemsUnsorted = smUtils.copy(self.playlistItems);
        self.playlistItemsShuffled = smUtils.copy(self.playlistItems);
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
          function get_mirror() {
            return q.config.mp3_mirrors[0];
          }
          function get_recitor() {
            return q.get_state('recitor');
          }
          var data = get_data(index);
          var name = get_name(data.sura, data.aya);
          var mirror = get_mirror();
          var recitor = get_recitor();
          var url = mirror + recitor + '/' + name;
          return url;
        }
        var ayas = smUtils.getElementsByClassName('aya', 'option');
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
          q.d.bug('reloading existing sound');
          var thisOptions = {
            'autoPlay': false,
            'url': s.url,
            'stream': true
          }
          s.load(thisOptions);
        } else {
          q.d.bug('preloading new sound');
          createSound(i);
        }
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.play = function(i) {
      try {
        if (i === undefined) {
          i = self.getAya()-1;
          createSound(i);
        }
        
        if (!self.items[i]) { 
          return false;
        }
        if (self.doShuffle) {
          i = self.playlistItems[i].index;
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
  
        // apply URL hash
        if (oParent.options.allowBookmarking) window.location.hash = 'track=' + encodeURI(self.items[i].url.substr(self.items[i].url.lastIndexOf('/') + 1));
  
        if (exists) {
          var s = soundManager.getSoundById(sID);
          oParent.setMetaData(s);
          if (s.loaded) {
            // already loaded before playing started - calculate time estimates, re-call onload() now
            oParent.onload.apply(s);
          }
        }
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.init = function() {
      try {
        self.o = smUtils.$('playlist-template');
        self.o.style.width = (parseInt(oParent.oSMPlayer.oMain.offsetWidth) - 2) + 'px';
      } catch (e) {
        q.d.bug(e);
      }
    }

    this.loadFromHash = function() {
      try {
        if (!oParent.options.allowBookmarking) return false;
        var hash = oParent.options.hashPrefix;
        var hashOffset = hash.length + 1;
        var i = (window.location.hash.indexOf(hash));
        if (i == -1) return false;
        var url = decodeURI(window.location.hash.substr(hashOffset));
        var index = self.findItemByURL(encodeURI(url));
        if (index == -1) {
          index = self.findItemByURL(escape(url));
        }
        if (index != -1) {
          self.selectItem(index);
          self.play(index);
          smUtils.addEventHandler(window, 'beforeunload', self.removeHash);
        }
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.removeHash = function() {
      try {
        window.location.hash = ''; // prevent reload from maintaining current state
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.findItemByURL = function(sURL) {
      try {
        for (var i = self.items.length; i--;) {
          if (self.items[i].url.indexOf(sURL) != -1) {
            return i;
          }
        }
        return - 1;
      } catch(e) {
        q.d.bug(e);
      }
    }
    
    this.init();
  }
/**************************************
 *                                    *
 *     SPPlaylistItem < SPPlaylist    *
 *                                    *
 **************************************/
  function SPPlaylistItem(oLink, oPlaylist, nIndex) {
    var self = this;
    var oParent = oPlaylist;
    this.index = nIndex;
    this.origIndex = nIndex;
    this.userTitle = oLink.innerHTML;
    var sURL = oParent.items[this.index].url;
    this.o = document.createElement('li');
    if (nIndex % 2 == 0) this.o.className = 'alt'; // striping
    this.o.innerHTML = '<a href="' + sURL + '"><span></span></a>';
    this.o.getElementsByTagName('span')[0].innerHTML = this.userTitle;

    this.setHighlight = function() {
      smUtils.addClass(self.o, 'highlight');
    }

    this.removeHighlight = function() {
      smUtils.removeClass(self.o, 'highlight');
    }

    this.setTooltip = function(sHTML) {
      self.o.title = sHTML;
    }

    this.onclick = function() {
      try {
        if (oParent.doShuffle) q.player.toggleShuffle(); // disable shuffle, if on (should be oParent.oParent too, ideally)
        oParent.selectItem(self.index);
        oParent.play(self.index);
        return false;
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.init = function() {
      // append self.o somewhere
      // oParent.o.appendChild(self.o);
      document.getElementById('playlist-template').getElementsByTagName('ul')[0].appendChild(self.o);
      self.o.onclick = self.onclick;
    }

    this.init();

  }
/**************************************
 *                                    *
 *            SoundPlayer()           *
 *                                    *
 **************************************/
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
      // let sound play when possible while user is dragging the slider (seeking)
      scrubThrottle: false,
      // prevent scrub update call on every mouse move while dragging - "true" may be nicer on CPU, but track will update less
      allowBookmarking: false,
      // change URL to reflect currently-playing MP3
      usePageTitle: false,
      // change document.title (window title) to reflect track data
      hashPrefix: 'track=' // eg. #track=foo%20bar.mp3
    }
    var u = smUtils; // alias

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
        if (this.sID != self.currentSound) return false;
        // force slider calculation (position) update?
        self.oSMPlayer.setLoadingProgress(1); // ensure complete
        self.setMetaData(this);
        self.oSMPlayer.setLoading(false);
        self.oSMPlayer.updateTime(this.duration);

      } catch(e) {
        q.d.bug(e);
      }
    }

    this.onid3 = function() {
      try {
        if (this.sID != self.currentSound) return false;
        // update with received ID3 data
        self.setMetaData(this);
      } catch(e) {
        q.d.bug(e);
      }
    }


    this.onstop = function() {
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onpause = function() {
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onresume = function() {
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.onplay = function() {
      try {
        setTimeout(function() {
          if (self.oSMPlayer.xRangeStart != self.oSMPlayer.xMin) {
            self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
            if (self.options.allowScrub) {
              self.oSMPlayer.doScrub();
            }
            self.onUserSetSlideValue(self.oSMPlayer.xRangeStart); 
            self.oSMPlayer.updateTime(self.oSMPlayer.xRangeStart);
          }
        }, 1);
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.whileplaying = function() {
      try {

        if (this.sID != self.currentSound) return false;
        // this.sID, this.position, this.duration
        // with short MP3s when loading for >1st time, this.duration can be null??
        self.duration = (!this.loaded ? this.durationEstimate: this.duration); // use estimated duration until completely loaded
        if (this.position > self.duration) return false; // can happen when resuming from an unloaded state?
        var newPos = Math.floor(this.position / self.duration * self.oSMPlayer.xMax);
  
  
        if (newPos != self.oSMPlayer.x) { // newPos > self.oSMPlayer.x
          if ((newPos >= self.oSMPlayer.xRangeStart) && (newPos <= self.oSMPlayer.xRangeEnd)) {
            if (!self.oSMPlayer.busy) {
              self.oSMPlayer.moveSliderTo(newPos);
              return false;
            }
          } else
          if ((!self.oSMPlayer.rangeBusy) && (!self.oSMPlayer.busy)) {
            if (newPos <= self.oSMPlayer.xRangeStart) {
              self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
              self.onUserSetSlideValue(self.oSMPlayer.xRangeStart); 
              self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
              return false;
            } else
            if (newPos >= self.oSMPlayer.xRangeEnd) {
              if (self.oPlaylist.doRepeat) {
                self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
                self.onUserSetSlideValue(self.oSMPlayer.xRangeStart); 
                self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
              } else {
                self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeEnd);
                self.onUserSetSlideValue(self.oSMPlayer.xRangeStart); 
                self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeEnd / self.oSMPlayer.xMax * self.duration));
                self.togglePause(); // (because onfinish never fires)
              }
              return false;
            }
          }
        }
  
        if (Math.abs(this.position - self.oSMPlayer.lastTime) > 667) {
          self.oSMPlayer.updateTime(this.position);
        }
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onbeforefinish = function() {
      q.d.bug('onbefore player');
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onjustbeforefinish = function() {
      q.d.bug('onjustbefore player');
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onfinish = function() {
      q.d.bug('onfinish player');
      try {
        if (self.oPlaylist.doRepeat) {
          self.togglePause();
          self.onUserSetSlideValue(self.oSMPlayer.xRangeStart); 
          self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeStart);
          self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeStart / self.oSMPlayer.xMax * self.duration));
        } else {
          self.oSMPlayer.moveSliderTo(self.oSMPlayer.xRangeEnd);
          self.oSMPlayer.updateTime(Math.floor(self.oSMPlayer.xRangeEnd / self.oSMPlayer.xMax * self.duration));
          self.setPlayState(0);
        }
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onbeforefinishcomplete = function() {
      q.d.bug('onbeforefinishcomplete player');
      try {
      } catch(e) {
        q.d.bug(e);
      }
    }
    this.onUserSetSlideValue = function(nX) {
      try {
        // called from slider control
        var x = parseInt(nX);
        // play sound at this position
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
      // pass sound to oSMPlayer
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

    this.togglePlaylist = function() {
      try {
        self.oPlaylist.toggleDisplay();
        self.oSMPlayer.togglePlaylist();
      } catch(e) {
        q.d.bug(e);
      }
    }

    this.init = function() {
      self.oSMPlayer = new SMPlayer(self);
    }

  }

  q.player = new SoundPlayer();
/**************************************
 *                                    *
 *             Other Stuff            *
 *                                    *
 **************************************/
  var sura_set, init_stuff;

  function initStuff() {
    //console.log('init stuff');
    q.player.init(); // load mp3, etc.
    q.player.oPlaylist = new SPPlaylist(q.player, null);

    if (sura_set) {
      //console.log('init stuff sura set');
      var playlist = q.player.oPlaylist;
      playlist.clearPlaylist();
      playlist.searchForSoundLinks();
      playlist.createPlaylist();
      playlist.createTweens(); // make tweens for playlist
      playlist.loadFromHash();
    }
    init_stuff = true;

  }

  var aya = 1;
  q.bind('sura-set',
  function() {
    q.d.bug('q.bind("sura-set")',aya);
    //console.log('sura set');
    if (init_stuff) {
      //console.log('sura set init stuff');
      var playlist = q.player.oPlaylist;
      try {
        playlist.clearPlaylist();
        playlist.searchForSoundLinks();
        playlist.createPlaylist();
        playlist.createTweens(); // make tweens for playlist
        playlist.loadFromHash();
        playlist.selectAya(aya);
      } catch (e) {
        q.d.bug(e);
      }
    }
    sura_set = true;
  });

  q.bind('aya-changed',
  function(ev,aya) {
    q.d.bug('q.bind("aya-changed") selectAya ',aya);
    q.player.oPlaylist.selectAya(aya)
  });

  q.bind('application-state-restored',
  function() {
    aya = q.get_state('aya').aya;
  });

  soundManager.url = 'res/ui/swf/';
  soundManager.flashVersion = (window.location.toString().match(/flash9/) ? 9 : 8);
  soundManager.debugMode = (window.location.toString().match(/debug=1/) ? true: false); // set debug mode
  soundManager.useConsole = false;
  soundManager.defaultOptions.multiShot = false;
  soundManager.defaultOptions.stream = true;

  soundManager.onload = function() {
    // called after window.onload() + SoundManager is loaded
    q.d.bug('<b><a href="http://www.schillmania.com/projects/soundmanager2/">www.schillmania.com/projects/soundmanager2/</a></b>');
    q.d.bug('<b>-- jsAMP v0.99a.20080331 --</b>', 1);
    initStuff();
  }
})(jQuery);
})(quran);
