// SoundManager 2 - Documentation/home page javascript
// DEMO/example code only - not needed for general use.

var $ = function(sID) { return document.getElementById(sID); }

// Detect success/fail of SM2 loading, for warning purposes on demo page, and some utility functions

soundManager.flashVersion = 8;

soundManager.debugMode = true;

soundManager.consoleOnly = false; // for demo page, allow debug output to be written inline even when console is available (for help in troubleshooting)

soundManager.waitForWindowLoad = true; // wait for page load before creating a bunch of sounds

soundManager.flashBlockHelper.enabled = true; // if blocked by special moz/firefox extension, try to handle nicely

var isCrappyIE = (navigator.userAgent.match(/msie/i));
if (isCrappyIE) soundManager.autoLoad = false; // IE 6 seems to enjoy crashing on page load if autoLoad is true by default, for this demo page.

soundManager.onload = function() {
  // success
  checkConsole();
  soundManager._writeDebug('SM2 demo: Creating some demo sounds');
  soundManager.createSound('button0','demo/_mp3/button-0.mp3'); // create sound (simple method)
  soundManager.createSound({id:'button1',url:'demo/_mp3/button-1.mp3'}); // (more flexible object literal method)
  soundManager.createSound({id:'clickLow',url:'demo/_mp3/click-low.mp3',autoLoad:!isCrappyIE});
  soundManager.createSound({id:'clickHigh',url:'demo/_mp3/click-high.mp3',autoLoad:!isCrappyIE});
  if (!navigator.userAgent.match(/msie 6/i)) enableChicken();
}

var chicken = false;
var chickenUp = false;

function enableChicken() {
  soundManager._writeDebug('Enabling chicken...');
  chicken = {
    head: utils.getElementsByClassName('redthing','div',$('header'))[0],
    body: utils.getElementsByClassName('chicken','div',$('header'))[0]
  };
  chicken.body.title = 'See? Now look what you\'ve done!';
  document.getElementById('toggle-light').title = 'Toggle light. Remember, don\'t tease the chicken.'
  chickenUp = true; // for initial reset
  randoChicken();
}

function randoChicken() {
  var rndX = parseInt(Math.random()*800);
  chicken.head.style.marginLeft = (rndX+26)+'px';
  chicken.body.style.marginLeft = rndX+'px';
  chickenPan = (rndX<400?(-80+(80*(rndX/400))):80*((rndX-400)/400));
}

function doChicken() {
  soundManager.play('chicken'+(parseInt(Math.random()*6)),{pan:chickenPan});
  chicken.head.style.display = 'none';
  chicken.body.style.display = 'block';
  chickenUp = true;
  $('definition').innerHTML = 'See? <em>Now</em> look what you\'ve done!';
}

function resetChicken() {
  if (!chickenUp) return false;
  var frame = 0;
  var anim = [1,7,16,29,41,56,80,91,100];
  for (var j=0,k=anim.length; j<k; j++) {
    setTimeout(function(){chicken.body.style.marginBottom=((anim[frame++]*-0.01)*90)+'px';},20*(j+1));
  }
  setTimeout(function(){randoChicken();undoChicken()},(20*anim.length+1)+parseInt(Math.random()*3000));
}

function mak() {
  soundManager.play('background'+(parseInt(Math.random()*3)),{pan:chickenPan});
}

function undoChicken() {
  var rnd = parseInt(Math.random()*5);
  for (var i=0; i<rnd; i++) {
    setTimeout(mak,(150+parseInt(Math.random()*150))*i);
  }
  chicken.head.style.marginBottom = '-20px';
  chicken.body.style.marginBottom = '0px';
  chicken.head.style.display = 'block';
  chicken.body.style.display = 'none';
  var frame = 0;
  var anim = [19,18,17,16,14,12,10,8,6,5,4,3,-1,1,2,3,1,-1,2,3,1,0];
  for (var j=0,k=anim.length; j<k; j++) {
    setTimeout(function(){chicken.head.style.marginBottom=(anim[frame++]*-1)+'px';},20*(j+1));
  }
  if (!soundManager.sounds['chicken0']) {
    setTimeout(function(){
    for (var i=0; i<6; i++) {
      soundManager.createSound({id:'chicken'+i,url:'demo/_mp3/chicken'+i+'.mp3',autoLoad:true});
    }
    },1000);
  }
  var x = new Image();
  x.src = 'chicken.png';
  chickenUp = false;
  $('definition').innerHTML = 'Because the web is better with a rubber chicken.';
}

soundManager.onerror = function() {
  // failed to load
  var o = $('sm2-support');
  o.innerHTML = '<p class="error"><strong>Warning: SoundManager failed to load/initialize.</strong> May be due to missing .SWF, lack of Flash/support, or Flash security restrictions. Refer to debug output <a href="#debug-output">live on this page</a> for troubleshooting.</p>';
  o.style.display = 'block';
  $('demo-list').className = 'debug-only';
  checkConsole();
}

function checkConsole() {
  if (soundManager.useConsole && soundManager._hasConsole) {
    if (soundManager.useConsoleOnly) {
      $('soundmanager-debug').innerHTML = '[ Firebug/console.log()-compatible debug console support detected - refer to that console for output ]';
    } else {
      soundManager._writeDebug('<strong>Note:</strong> Console support has been detected. Debug output is also being echoed to the console.',1);
    }
  }
}

function Utils() {

  var self = this;

  this.hasClass = function(o,cStr) {
    return (typeof(o.className)!='undefined'?o.className.indexOf(cStr)+1:false);
  }

  this.addClass = function(o,cStr) {
    if (!o || !cStr) return false; // safety net
    if (self.hasClass(o,cStr)) return false;
    o.className = (o.className?o.className+' ':'')+cStr;
  }

  this.removeClass = function(o,cStr) {
    if (!o || !cStr) return false; // safety net
    if (!self.hasClass(o,cStr)) return false;
    o.className = o.className.replace(new RegExp('( '+cStr+')|('+cStr+')','g'),'');
  }

  this.toggleClass = function(o,cStr) {
    var m = (self.hasClass(o,cStr)?self.removeClass:self.addClass);
    m(o,cStr);
  }

  this.getElementsByClassName = function(className,tagNames,oParent) {
    var doc = (oParent||document);
    var matches = [];
    var i,j;
    var nodes = [];
    if (typeof(tagNames)!='undefined' && typeof(tagNames)!='string') {
      for (i=tagNames.length; i--;) {
        if (!nodes || !nodes[tagNames[i]]) {
          nodes[tagNames[i]] = doc.getElementsByTagName(tagNames[i]);
        }
      }
    } else if (tagNames) {
      nodes = doc.getElementsByTagName(tagNames);
    } else {
      nodes = doc.all||doc.getElementsByTagName('*');
    }
    if (typeof(tagNames)!='string') {
      for (i=tagNames.length; i--;) {
        for (j=nodes[tagNames[i]].length; j--;) {
          if (self.hasClass(nodes[tagNames[i]][j],className)) {
            matches[matches.length] = nodes[tagNames[i]][j];
          }
        }
      }
    } else {
      for (i=0; i<nodes.length; i++) {
        if (self.hasClass(nodes[i],className)) {
          matches[matches.length] = nodes[i];
        }
      }
    }
    return matches;
  }

  this.findParent = function(o) {
    if (!o || !o.parentNode) return false;
    o = o.parentNode;
    if (o.nodeType == 2) {
      while (o && o.parentNode && o.parentNode.nodeType == 2) {
        o = o.parentNode;
      }
    }
    return o;
  }

  this.getOffY = function(o) {
    // http://www.xs4all.nl/~ppk/js/findpos.html
    var curtop = 0;
    if (o.offsetParent) {
      while (o.offsetParent) {
        curtop += o.offsetTop;
        o = o.offsetParent;
      }
    }
    else if (o.y) curtop += o.y;
    return curtop;
  }

  this.isChildOfClass = function(oChild,oClass) {
    if (!oChild || !oClass) return false;
    while (oChild.parentNode && !self.hasClass(oChild,oClass)) {
      oChild = self.findParent(oChild);
    }
    return (self.hasClass(oChild,oClass));
  }

  this.getParentByClassName = function(oChild,sParentClassName) {
    if (!oChild || !sParentClassName) return false;
    sParentClassName = sParentClassName.toLowerCase();
    while (oChild.parentNode && !self.hasClass(oChild.parentNode,sParentClassName)) {
      oChild = self.findParent(oChild);
    }
    return (oChild.parentNode && self.hasClass(oChild.parentNode,sParentClassName)?oChild.parentNode:null);
  }

}

var utils = new Utils();

// domain check fix for when viewing on local file system vs. web server (links point to open-ended directory, no index.html)

function checkDomain(oLink,useHash) {
  var o = oLink.toString();
  if ((!document.domain || !window.location.protocol.match(/http/i)) && o.indexOf('index.html')==-1) oLink.href=(useHash?o.substr(0,o.lastIndexOf('#')):o)+'index.html'+(useHash?(o.substr(o.lastIndexOf('#'))):'');
}

var lastLanguage = 'whatis-plain-english';

function chooseLanguage(oLink) {
  var o = oLink.hash.substr(1);
  if (lastLanguage != o) soundManager.play('click'+(o.match(/english/)?'High':'Low'));
  $('lang-tabs').className = 'tabs '+o;
  $('whatis').className = o;
  lastLanguage = o;
  return false;
}

function setStyle(n) {
  var isSafari = (navigator.appVersion.match(/safari/i));
  var css = (document.styleSheets && !isSafari)?document.styleSheets:document.getElementsByTagName('head')[0].getElementsByTagName('link');
  for (var i=css.length; i--;) {
    css[i].disabled = (i!=n?'disabled':'');
  }
}

var activeTheme = 1;
var chickenTrigger = 0;
var chickenSet = false;
var chickenThreshold = 2+parseInt(Math.random()*5);
var chickenPan = 0;

function toggleTheme(e) {
  activeTheme = !activeTheme;
  if (soundManager._didInit) soundManager.play('button'+(activeTheme?1:0),{pan:75});
  setStyle(activeTheme);
  if (e && e.preventDefault) {
    e.preventDefault();
  } else if (e && typeof e.cancelBubble != 'undefined') {
    e.cancelBubble = true;
  }
  if (chicken) {
    chickenTrigger++;
    if (!soundManager.sounds['background0']) {
      setTimeout(function(){
      for (i=0; i<3; i++) {
        soundManager.createSound({id:'background'+i,url:'demo/_mp3/background'+i+'.mp3',autoLoad:true});
      }
      },500);
    }
  }
  if (chicken && !chickenSet && chickenTrigger == chickenThreshold) {
    setTimeout(undoChicken,500);
    chickenSet = true;
  }
  if (chicken && chickenSet && chickenTrigger > chickenThreshold && chickenTrigger%10 == 0 && !chickenUp) {
    doChicken();
  }
}

function timeCheck() {
  var hour = new Date().getHours();
  if (hour<8 || hour>17) toggleTheme(); // night time
}

timeCheck();

function getLiveData() {
  getDynamicData();
  // reinvigorate.net is a handy (and free!) stats tracking service thingy. you should check it out.
  var is_live = (document.domain && document.domain.match(/schillmania.com/i) && typeof re_ != 'undefined');
  loadScript('http://include.reinvigorate.net/re_.js');
  setTimeout(function(){
    if (typeof re_ != 'undefined') re_(is_live?'f6795-v062d0xv4u':'u8v2l-jvr8058c6n');
  },3000);
}

function getDynamicData() {
  // Attempt to fetch data from schillmania.com: "Get Satisfaction" topics, version updates etc.
  loadScript('http://schillmania.com/services/soundmanager2/info/?version='+soundManager.versionNumber+'&rnd='+parseInt(Math.random()*1048576));
}

function loadScript(sURL) {
  var oS = document.createElement('script');
  oS.type = 'text/javascript';
  oS.src = sURL;
  document.getElementsByTagName('head')[0].appendChild(oS);
}

var lastSelected = null;

function resetFilter(o) {
  // reset everything
  var oParent = null;
  $('search-results').style.display = 'none';
  $('reset-filter').style.display = 'none';
  $('left').style.marginTop = '0px';
  var blocks = utils.getElementsByClassName('f-block','div',$('main'));
  for (var i=blocks.length; i--;) {
    blocks[i].style.display = 'block';
    oParent = utils.getParentByClassName(blocks[i],'f-block',$('main'));
    if (oParent) oParent.style.display = 'block';
  }
  if (lastSelected) utils.removeClass(lastSelected,'active');
  if (o) lastSelected = o;
  return true;
}

function setFilter(e,sFilterPrefix) {
  var o = e?e.target||e.srcElement:event.srcElement;
  var oName = o.nodeName.toLowerCase();
  var sClass = '';
  var blocks = utils.getElementsByClassName('f-block','div',$('main'));
  var oParent = null;
  var matchingParents = [];
  if (oName != 'li' || o.className == 'ignore') return true;
  var isClear = (lastSelected && lastSelected == o && utils.hasClass(lastSelected,'active'));
  if (oName == 'li' && isClear) {
    return resetFilter();
  }
  if (oName == 'li') {
    sClass = sFilterPrefix+o.innerHTML.substr(0,o.innerHTML.indexOf('()')!=-1?o.innerHTML.indexOf('()'):999).toLowerCase().replace(/\s+/i,'-');
    var last = sClass.substr(sClass.length-1);
    if (last == '-' || last == ' ') sClass = sClass.substr(0,sClass.length-1); // IE innerHTML trailing whitespace hack (?)
    for (var i=blocks.length; i--;) {
      oParent = utils.getParentByClassName(blocks[i],'f-block',$('main'));
      if (oParent) {
        matchingParents.push(oParent);
      }
      if (utils.hasClass(blocks[i],sClass)) {
        blocks[i].style.display = 'block';
        if (oParent) {
          matchingParents.push(oParent);
        }
      } else {
        blocks[i].style.display = 'none';
      }
    }
    for (i=matchingParents.length; i--;) {
      matchingParents[i].style.display = 'block';
    }
    $('search-results').innerHTML = '<h3><span class="option"><a href="#" title="Restore full content" onclick="resetFilter();return false" style="text-decoration:none"> clear filter </a></span>Content filter: '+(sFilterPrefix=='f-'?'soundManager.':(sFilterPrefix=='s-'?'[SMSound object].':''))+'<b style="font-weight:bold">'+o.innerHTML+'</b></h3>';
    $('search-results').style.display = 'block';
    if ((document.documentElement.scrollTop || window.scrollY)>utils.getOffY($('main'))) $('reset-filter').style.display = 'block';
    $('main').className = (isClear?'f-block '+sClass:'');
    if (isClear || (!document.documentElement.scrollTop && !window.scrollY)) {
      $('left').style.marginTop = '0px';
      $('reset-filter').style.display = 'none';
    } else {
      $('left').style.marginTop = Math.max(0,(document.documentElement.scrollTop || window.scrollY)-utils.getOffY($('main'))+20)+'px';
      if ((!document.documentElement.scrollTop && !window.scrollY)) $('reset-filter').style.display = 'none';
    }
    if (lastSelected) {
      if (lastSelected == o) {
        utils.toggleClass(lastSelected,'active'); // (utils.hasClass(lastSelected,'active'?'':'active');
      } else {
        utils.removeClass(lastSelected,'active');
        utils.addClass(o,'active');
      }
    } else {
      // o.className = 'active';
      utils.addClass(o,'active');
    }
    lastSelected = o;
  }
}

function randomTagline() {
  var oTags = $('taglines').getElementsByTagName('li');
  var n = parseInt(Math.random()*oTags.length+1);
  if (n<oTags.length) {
    $('definition').innerHTML = oTags[n].innerHTML;	
  }
}

function initMisc() {
  // reposition "what is" text under tabs
  var o = $('whatis');
  o.appendChild($('whatis-web-20-speak'));
  o.appendChild($('whatis-web-30-speak'));
}

window.onload = function() {
  document.getElementById('reset-filter').innerHTML = '<a href="#" onclick="resetFilter();return false">clear filter</a>';
  var web2Speak = '#whatis-web-20-speak';
  if (window.location.href.indexOf(web2Speak)+1) chooseLanguage(window.location);
}

if (navigator.appVersion.match(/webkit/i)) document.getElementsByTagName('html')[0].className = 'iswebkit'; // stupid font render fix