/*!
   JW Player version 8.8.2
   Copyright (c) 2019, JW Player, All Rights Reserved 
   This source code and its use and distribution is subject to the terms 
   and conditions of the applicable license agreement. 
   https://www.jwplayer.com/tos/
   This product includes portions of other software. For the full text of licenses, see
   https://ssl.p.jwpcdn.com/player/v/8.8.2/notice.txt
*/
(window.webpackJsonpjwplayer=window.webpackJsonpjwplayer||[]).push([[11],{150:function(e,t,a){"use strict";a.r(t);var i=a(3),r=a(0),n=a(8),s=a(1),c=function(e){var t=this,a=window.chrome.cast,c=a.media,d=window.cast.framework,u=d.CastContext.getInstance(),o=null,l=d.CastContextEventType.CAST_STATE_CHANGED,f=e||c.DEFAULT_MEDIA_RECEIVER_APP_ID;function v(e,a,i){var n=e.allSources.slice(0).sort(function(e,t){return!e.default&&t.default?1:0}),s=Object(r.l)(n,function(e){var t=!Object(r.G)(e.mediaTypes)||!Object(r.e)(e.mediaTypes,'video/webm; codecs="vp9"'),a=!Object(r.G)(e.drm)||Object(r.b)(e.drm,function(e,t){return"fairplay"!==t});return t&&a});if(s){var d=function(e){switch(e){case"mp4":case"webm":return"video/"+e;case"mpd":case"dash":return"application/dash+xml";case"m3u8":case"hls":return"application/x-mpegURL";case"aac":return"audio/x-aac";case"mp3":return"audio/mpeg";default:return e}}(s.type),u=T(s.file),o=e.image?T(e.image):null,l=s.drm,f=new c.MediaInfo(u,d);return f.metadata=new c.GenericMediaMetadata,f.metadata.title=e.title,f.metadata.subtitle=e.description,f.metadata.index=a||0,f.metadata.playerId=t.getPlayerId(),e.tracks&&e.tracks.length&&(f.tracks=e.tracks.map(function(e,t){var a=t+1,i=new c.Track(a,c.TrackType.TEXT);return i.trackContentId=e.file,i.trackContentType="text/vtt",i.subtype=c.TextTrackType.SUBTITLES,i.name=e.label||a,i.language="en-US",i.customData="side-loaded captions",i})),i&&(f.textTrackStyle=t.obtainTrackStyles(i)),o&&(f.metadata.images=[{url:o}]),l&&(f.customData={drm:l}),f}}function T(e){var t=document.createElement("a");return t.href=e,t.href}function m(){var e=u.getCastState()!==d.CastState.NO_DEVICES_AVAILABLE,a="";(o=u.getCurrentSession())&&(a=o.getCastDevice().friendlyName||a),t.trigger("castState",{available:e,active:!!o,deviceName:a})}function h(){var e=t.getMedia();e&&t.trigger("mediaUpdate",{field:"media",value:e})}function k(e){e.removeUpdateListener(h),e.addUpdateListener(h)}Object(r.j)(t,n.a),u.removeEventListener(l,m),u.addEventListener(l,m),u.setOptions({receiverApplicationId:f,autoJoinPolicy:a.AutoJoinPolicy.ORIGIN_SCOPED}),t.updateCastState=m,t.setPlaylist=function(e){var a,i=e.get("playlist"),r=e.get("item"),n=e.mediaModel.get("currentTime"),s=e.get("repeat"),d=e.get("captions"),u=[],l=1;"complete"===e.get("state")&&(r=0,n=0);for(var f=r;f<i.length;f++){var T=v(i[f],f,d),m=void 0;if(T){m=new c.QueueItem(T),T.metadata.index===r&&(m.startTime=n);var h=JSON.stringify(m).length+1;if(!(l+h<32e3))break;u.push(m),l+=h}}(a=new c.QueueLoadRequest(u)).startIndex=0,s&&(a.repeatMode=c.RepeatMode.ALL),o.getSessionObj().queueLoad(a,t.loaded,t.error)},t.getPlayerId=function(){var e=t.getMedia();return e&&e.media?e.media.metadata.playerId:o?o.getSessionObj().playerId:null},t.setPlayerId=function(e){o&&(o.getSessionObj().playerId=e)},t.loaded=function(e){t.trigger("mediaUpdate",{field:"volume",value:{volume:o.getVolume(),isMute:o.isMute()}}),k(e),t.play()},t.addListeners=function(){var e;if(!o)return null;(e=o.getSessionObj()).removeUpdateListener(m),e.addUpdateListener(m),e.removeMediaListener(k),e.addMediaListener(k),o.addEventListener(d.SessionEventType.VOLUME_CHANGED,function(e){t.trigger("mediaUpdate",{field:"volume",value:e})})},t.reset=function(){t.removeListeners(),u&&u.removeEventListener(l,m)},t.removeListeners=function(){if(o){var e=o.getSessionObj();e.removeUpdateListener(m),e.media.forEach(function(e){e.removeUpdateListener(h)}),o.removeEventListener(d.SessionEventType.VOLUME_CHANGED)}},t.getMedia=function(){if(o){var e=o.getSessionObj().media;if(e&&e.length)return e[0]}return null},t.error=function(e){t.trigger(i.ub,new s.s(null,305e3,{errorCode:e})),t.disconnect()},t.item=function(e){var a=t.getMedia();if(a){var i=v(e),n=Object(r.l)(a.items,function(e){return e.media.contentId===i.contentId&&e.media.index===i.index});n?a.queueJumpToItem(n.itemId):t.trigger("setPlaylist")}else t.trigger("setPlaylist")},t.play=function(){t.getMedia()&&t.getMedia().play()},t.pause=function(){t.getMedia().pause()},t.next=function(){t.getMedia().queueNext()},t.disconnect=function(){o.endSession(!0)},t.seek=function(e,a){var i=new c.SeekRequest;i.currentTime=e,i.resumeState=c.ResumeState.PLAYBACK_START,t.getMedia().seek(i,a)},t.mute=function(e){o.setMute(e)},t.volume=function(e){o.setVolume(e/100)},t.editTracksInfo=function(e,a){var i=t.getMedia();if(i){var r=new c.EditTracksInfoRequest(e,a);i.editTracksInfo(r)}},t.extractEmbeddedCaptions=function(){var e=t.getMedia();if(e&&e.media.tracks){var a=e.media.tracks.filter(function(e){return"TEXT"===e.type&&"side-loaded captions"!==e.customData}).map(function(e,t){return e.mapId=t,e.kind="subtitles",e.cues=[],e});a.length&&t.trigger("mediaUpdate",{field:"captions",value:{tracks:a}})}},t.obtainTrackStyles=function(e){var t=function(e){return Math.round(e/100*255).toString(16)},a=new c.TextTrackStyle;return a.foregroundColor=e.color+t(e.fontOpacity),a.backgroundColor=e.backgroundColor+t(e.backgroundOpacity),a.windowColor=e.windowColor+t(e.windowOpacity),a.fontFamily=e.fontFamily,a.fontStyle=c.TextTrackFontStyle.NORMAL,a.fontScale=e.fontSize/14,a.edgeType=function(e){var t=c.TextTrackEdgeType;switch(e){case"dropshadow":return t.DROP_SHADOW;case"raised":return t.RAISED;case"depressed":return t.DEPRESSED;case"uniform":return t.OUTLINE;default:return t.NONE}}(e.edgeStyle),a.windowType=c.TextTrackWindowType.NORMAL,a}},d=a(9),u=a(55),o=a(77),l=a(70),f=function(e,t){var a,n,s,c=this,u=t.minDvrWindow;function o(){var e=0,t=n.getMedia();if(!t)return e;var a=t.media.tracks;if(!a)return e;for(var i=0;i<a.length;i++){if("TEXT"===a[i].type){e=i;break}}return e}function f(e){if(n){var t=Array.prototype.slice.call(arguments,1);n[e]&&n[e].apply(n,t)}}function v(e){if(n){var t=n.getMedia();return t?"currentTime"!==e||t.liveSeekableRange?t[e]||t.media&&t.media[e]:t.getEstimatedTime():null}}c.destroy=function(){clearInterval(c.timeInterval)},c.setService=function(e){n=e,c.updateScreen()},c.setup=function(e){c.setState(i.kb),f("setup",e)},c.init=function(e){s!==e&&(s=e,f("item",e))},c.load=function(e){c.init(e),c.play()},c.play=function(){f("play")},c.pause=function(){f("pause")},c.seek=function(e){(c.trigger(i.Q,{position:c.getPosition(),offset:e}),e<0)&&(e+=c.getSeekRange().end);f("seek",e,function(){c.trigger(i.R)})},c.next=function(e){f("next",e)},c.volume=function(e){f("volume",e)},c.mute=function(e){f("mute",e)},c.setSubtitlesTrack=function(e){e>0&&n.editTracksInfo([e+o()])},c.updateScreen=function(e,t){Object(d.p)(a,function(e,t){var a=t?'background-image:url("'.concat(t,'")'):"";return'<div class="jw-cast jw-reset jw-preview" style="'.concat(a,'">')+'<div class="jw-cast-container"><div class="jw-cast-text jw-reset">'+"".concat(e||"")+"</div></div></div>"}(e,t))},c.setContainer=function(e){a=e},c.getContainer=function(){return a},c.remove=function(){clearInterval(c.timeInterval)},c.getPosition=function(){var e=v("currentTime")||0,t=c.getDuration();if(v("liveSeekableRange")||t<0){var a=c.getSeekRange(),i=a.end,r=i-a.start;if(Object(l.a)(r,u))return e-i}return e},c.getDuration=function(){var e=v("duration")||0;if(v("liveSeekableRange")||e<0){var t=c.getSeekRange(),a=t.end-t.start;return Object(l.a)(a,u)?-a:1/0}return e},c.getSeekRange=function(){var e=v("liveSeekableRange")||{start:0,end:Math.max(v("duration")||0,0)};return{start:e.start,end:e.end}},c.triggerTime=function(){var e=v("currentTime");Object(r.v)(e)&&c.trigger(i.S,{position:c.getPosition(),duration:c.getDuration(),currentTime:e,seekRange:c.getSeekRange(),metadata:{currentTime:e}})},c.stop=function(){c.clearTracks()},c.castEventHandlers={media:function(e){var t=v("items"),a="IDLE"===e.playerState&&"FINISHED"===e.idleReason,i="IDLE"===e.playerState&&"ERROR"===e.idleReason,r=a&&!t;c.castEventHandlers.playerState(r?"complete":e.playerState),c.castEventHandlers.currentTime(),clearInterval(c.timeInterval),"PLAYING"===e.playerState?c.timeInterval=setInterval(c.castEventHandlers.currentTime,100):r?(c.setState("complete"),n.disconnect()):i&&(c.setState("error"),n.disconnect())},volume:function(e){c.trigger("volume",{volume:Math.round(100*e.volume)}),c.trigger("mute",{mute:e.isMute})},captions:function(e){c.clearTracks(),c.setTextTracks(e.tracks)},playerState:function(e){var t=[i.kb,i.nb,i.qb,i.pb,i.rb,i.ob,i.lb,i.mb];if(e&&-1!==t.indexOf(e.toLowerCase())){var a=e.toLowerCase();if(a===i.nb||a===i.kb){var n=v("currentTime");Object(r.v)(n)&&c.trigger(i.D,{bufferPercent:0,position:c.getPosition(),duration:c.getDuration(),currentTime:n,seekRange:c.getSeekRange()})}c.setState(a)}},currentTime:c.triggerTime,duration:c.triggerTime,isPaused:function(e){e?c.setState(i.pb):c.setState(i.qb)},supports:function(){return!0}}};Object(r.j)(f.prototype,u.a,n.a,o.a,{getName:function(){return{name:"chromecast"}},getQualityLevels:Object(r.d)(["Auto"])});var v,T=f,m=a(24),h="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1";var k=v||(v=new Promise(function(e,t){window.__onGCastApiAvailable=function(a){a?e(a):t(),delete window.__onGCastApiAvailable},new m.a(h).load().catch(t)})),g={};t.default=function(e,t){var a=g[t.get("id")],n=null;function s(){var e=this,r=t.get("cast")||{};t.set("castState",{available:!1,active:!1,deviceName:""}),a&&(a.off(),a.reset()),(a=new c(r.customAppId)).on("castState",y),a.on("mediaUpdate",m),a.on("mediaUpdate",h),a.on("setPlaylist",d),a.on(i.ub,function(t){e.trigger(i.ub,t)}),a.updateCastState(),g[t.get("id")]=a}function d(){t.set("state",i.kb);var e=t.get("playlistItem");n.updateScreen("Connecting",e.image),a.setPlaylist(t)}function u(){var i;t.get("castClicked")&&!a.getPlayerId()&&a.setPlayerId(t.get("id")),_()&&(e.setFullscreen(!1),n=new T(t.get("id"),t.getConfiguration()),e.castVideo(n,t.get("playlistItem")),n.setService(a),a.addListeners(),(i=a.getMedia())?a.loaded(i):(a.on("mediaUpdate",p),d()),t.on("change:playlist",d),t.on("change:itemReady",f),t.change("captions",v))}function o(r){r?u():n&&function(){var r=t.get("state"),s=r===i.lb,c=r===i.nb,u=r===i.mb,o=t.get("item"),l=t.get("playlist"),v=t.get("playlistItem");if(a.removeListeners(),n&&n.remove(),v&&u&&(void 0===(v=l[o+1])?s=!0:(t.set("item",o+1),t.set("playlistItem",v))),t.set("castActive",!1),t.set("castClicked",!1),e.stopCast(),t.off("change:playlist",d),t.off("change:itemReady",f),v)if(s)e.trigger(i.cb,{});else if(!c){var T=t.mediaModel;e.playVideo("interaction").catch(function(e){n&&T===t.mediaModel&&n.trigger("error",{message:e.message})})}}()}function f(){a.extractEmbeddedCaptions(),n.setSubtitlesTrack(t.get("captionsIndex"))}function v(e,t){var i=a.getMedia();if(i){var r=a.obtainTrackStyles(t);a.editTracksInfo(i.activeTrackIds,r)}}function m(e){var a=e.field,i=e.value;if(n){"media"===a&&function(e){var a,i=t.get("playlist");if(e.media){a=e.media.metadata;var s=i[a.index];Object(r.v)(a.index)&&a.index!==t.get("item")&&(t.attributes.itemReady=!1,t.set("item",a.index),t.set("playlistItem",s),t.set("itemReady",!0));var c=t.get("castState").deviceName,d=c?"Casting to "+c:"";n.updateScreen(d,s.image)}}(i);var s=n.castEventHandlers[a];s&&s(i)}}function h(e){"media"===e.field&&(a.off("mediaUpdate",h),f())}function p(e){if("media"===e.field){a.off("mediaUpdate",p);var i=e.value,r=i.currentTime,n=i.liveSeekableRange;if(!r&&n){var s=n.start,c=n.end;if(!t.mediaModel.get("currentTime")&&Object(l.a)(c-s,t.get("minDvrWindow"))){var d=c-t.get("dvrSeekLimit");a.seek(d)}}}}function y(e){var a=t.get("castActive"),i=e.active;a!==i&&o(i),i=i&&_(),t.set("castAvailable",e.available),t.set("castActive",i),t.set("castState",{available:e.available,active:i,deviceName:e.deviceName})}function _(){return a.getPlayerId()===t.get("id")}this.init=function(){return k.then(s)},this.castToggle=function(){}}},74:function(e,t,a){"use strict";a.d(t,"c",function(){return r}),a.d(t,"b",function(){return n}),a.d(t,"a",function(){return s});var i={TIT2:"title",TT2:"title",WXXX:"url",TPE1:"artist",TP1:"artist",TALB:"album",TAL:"album"};function r(e,t){for(var a,i,r,n=e.length,s="",c=t||0;c<n;)if(0!==(a=e[c++])&&3!==a)switch(a>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:s+=String.fromCharCode(a);break;case 12:case 13:i=e[c++],s+=String.fromCharCode((31&a)<<6|63&i);break;case 14:i=e[c++],r=e[c++],s+=String.fromCharCode((15&a)<<12|(63&i)<<6|(63&r)<<0)}return s}function n(e){var t=function(e){for(var t="0x",a=0;a<e.length;a++)e[a]<16&&(t+="0"),t+=e[a].toString(16);return parseInt(t)}(e);return 127&t|(32512&t)>>1|(8323072&t)>>2|(2130706432&t)>>3}function s(){return(arguments.length>0&&void 0!==arguments[0]?arguments[0]:[]).reduce(function(e,t){if(!("value"in t)&&"data"in t&&t.data instanceof ArrayBuffer){var a=new Uint8Array(t.data),s=a.length;t={value:{key:"",data:""}};for(var c=10;c<14&&c<a.length&&0!==a[c];)t.value.key+=String.fromCharCode(a[c]),c++;var d=19,u=a[d];3!==u&&0!==u||(u=a[++d],s--);var o=0;if(1!==u&&2!==u)for(var l=d+1;l<s;l++)if(0===a[l]){o=l-d;break}if(o>0){var f=r(a.subarray(d,d+=o),0);if("PRIV"===t.value.key){if("com.apple.streaming.transportStreamTimestamp"===f){var v=1&n(a.subarray(d,d+=4)),T=n(a.subarray(d,d+=4))+(v?4294967296:0);t.value.data=T}else t.value.data=r(a,d+1);t.value.info=f}else t.value.info=f,t.value.data=r(a,d+1)}else{var m=a[d];t.value.data=1===m||2===m?function(e,t){for(var a=e.length-1,i="",r=t||0;r<a;)254===e[r]&&255===e[r+1]||(i+=String.fromCharCode((e[r]<<8)+e[r+1])),r+=2;return i}(a,d+1):r(a,d+1)}}if(i.hasOwnProperty(t.value.key)&&(e[i[t.value.key]]=t.value.data),t.value.info){var h=e[t.value.key];h!==Object(h)&&(h={},e[t.value.key]=h),h[t.value.info]=t.value.data}else e[t.value.key]=t.value.data;return e},{})}},77:function(e,t,a){"use strict";var i=a(69),r=a(68),n=a(74),s=a(6),c=a(3),d=a(0),u={_itemTracks:null,_textTracks:null,_tracksById:null,_cuesByTrackId:null,_cachedVTTCues:null,_metaCuesByTextTime:null,_currentTextTrackIndex:-1,_unknownCount:0,_activeCues:null,_initTextTracks:function(){this._textTracks=[],this._tracksById={},this._metaCuesByTextTime={},this._cuesByTrackId={},this._cachedVTTCues={},this._unknownCount=0},addTracksListener:function(e,t,a){if(!e)return;if(o(e,t,a),this.instreamMode)return;e.addEventListener?e.addEventListener(t,a):e["on"+t]=a},clearTracks:function(){Object(i.a)(this._itemTracks);var e=this._tracksById&&this._tracksById.nativemetadata;(this.renderNatively||e)&&(v(this.renderNatively,this.video.textTracks),e&&(e.oncuechange=null));this._itemTracks=null,this._textTracks=null,this._tracksById=null,this._cuesByTrackId=null,this._metaCuesByTextTime=null,this._unknownCount=0,this._currentTextTrackIndex=-1,this._activeCues=null,this.renderNatively&&(this.removeTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),v(this.renderNatively,this.video.textTracks))},clearMetaCues:function(){var e=this._tracksById&&this._tracksById.nativemetadata;e&&(v(this.renderNatively,[e]),e.mode="hidden",e.inuse=!0,this._cachedVTTCues[e._id]={})},clearCueData:function(e){var t=this._cachedVTTCues;t&&t[e]&&(t[e]={},this._tracksById&&(this._tracksById[e].data=[]))},disableTextTrack:function(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];if(e){e.mode="disabled";var t=e._id;t&&0===t.indexOf("nativecaptions")&&(e.mode="hidden")}}},enableTextTrack:function(){if(this._textTracks){var e=this._textTracks[this._currentTextTrackIndex];e&&(e.mode="showing")}},getSubtitlesTrack:function(){return this._currentTextTrackIndex},removeTracksListener:o,addTextTracks:l,setTextTracks:function(e){if(this._currentTextTrackIndex=-1,!e)return;this._textTracks?(this._unknownCount=0,this._textTracks=this._textTracks.filter(function(e){var t=e._id;return this.renderNatively&&t&&0===t.indexOf("nativecaptions")?(delete this._tracksById[t],!1):(e.name&&0===e.name.indexOf("Unknown")&&this._unknownCount++,!0)},this),delete this._tracksById.nativemetadata):this._initTextTracks();if(e.length)for(var t=0,a=e.length;t<a;t++){var i=e[t];if(!i._id){if("captions"===i.kind||"metadata"===i.kind){if(i._id="native"+i.kind+t,!i.label&&"captions"===i.kind){var n=Object(r.b)(i,this._unknownCount);i.name=n.label,this._unknownCount=n.unknownCount}}else i._id=Object(r.a)(i,this._textTracks.length);if(this._tracksById[i._id])continue;i.inuse=!0}if(i.inuse&&!this._tracksById[i._id])if("metadata"===i.kind)i.mode="hidden",i.oncuechange=k.bind(this),this._tracksById[i._id]=i;else if(T(i.kind)){var c=i.mode,u=void 0;if(i.mode="hidden",!i.cues.length&&i.embedded)continue;if(i.mode=c,this._cuesByTrackId[i._id]&&!this._cuesByTrackId[i._id].loaded){for(var o=this._cuesByTrackId[i._id].cues;u=o.shift();)f(this.renderNatively,i,u);i.mode=c,this._cuesByTrackId[i._id].loaded=!0}h.call(this,i)}}this.renderNatively&&(this.textTrackChangeHandler=this.textTrackChangeHandler||function(){var e=this.video.textTracks,t=Object(d.k)(e,function(e){return(e.inuse||!e._id)&&T(e.kind)});if(!this._textTracks||function(e){if(e.length>this._textTracks.length)return!0;for(var t=0;t<e.length;t++){var a=e[t];if(!a._id||!this._tracksById[a._id])return!0}return!1}.call(this,t))return void this.setTextTracks(e);for(var a=-1,i=0;i<this._textTracks.length;i++)if("showing"===this._textTracks[i].mode){a=i;break}a!==this._currentTextTrackIndex&&this.setSubtitlesTrack(a+1)}.bind(this),this.addTracksListener(this.video.textTracks,"change",this.textTrackChangeHandler),(s.Browser.edge||s.Browser.firefox||s.Browser.safari)&&(this.addTrackHandler=this.addTrackHandler||function(){this.setTextTracks(this.video.textTracks)}.bind(this),this.addTracksListener(this.video.textTracks,"addtrack",this.addTrackHandler)));this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks})},setupSideloadedTracks:function(e){if(!this.renderNatively)return;var t=e===this._itemTracks;t||Object(i.a)(this._itemTracks);if(this._itemTracks=e,!e)return;t||(this.disableTextTrack(),function(){if(!this._textTracks)return;var e=this._textTracks.filter(function(e){return e.embedded||"subs"===e.groupid});this._initTextTracks(),e.forEach(function(e){this._tracksById[e._id]=e}),this._textTracks=e}.call(this),this.addTextTracks(e))},setSubtitlesTrack:function(e){if(!this.renderNatively)return void(this.setCurrentSubtitleTrack&&this.setCurrentSubtitleTrack(e-1));if(!this._textTracks)return;0===e&&this._textTracks.forEach(function(e){e.mode=e.embedded?"hidden":"disabled"});if(this._currentTextTrackIndex===e-1)return;this.disableTextTrack(),this._currentTextTrackIndex=e-1,this._textTracks[this._currentTextTrackIndex]&&(this._textTracks[this._currentTextTrackIndex].mode="showing");this.trigger("subtitlesTrackChanged",{currentTrack:this._currentTextTrackIndex+1,tracks:this._textTracks})},textTrackChangeHandler:null,addTrackHandler:null,addCuesToTrack:function(e){var t=this._tracksById[e.name];if(!t)return;t.source=e.source;for(var a=e.captions||[],r=[],n=!1,s=0;s<a.length;s++){var c=a[s],d=e.name+"_"+c.begin+"_"+c.end;this._metaCuesByTextTime[d]||(this._metaCuesByTextTime[d]=c,r.push(c),n=!0)}n&&r.sort(function(e,t){return e.begin-t.begin});var u=Object(i.b)(r);Array.prototype.push.apply(t.data,u)},addCaptionsCue:function(e){if(!e.text||!e.begin||!e.end)return;var t,a=e.trackid.toString(),r=this._tracksById&&this._tracksById[a];r||(r={kind:"captions",_id:a,data:[]},this.addTextTracks([r]),this.trigger("subtitlesTracks",{tracks:this._textTracks}));e.useDTS&&(r.source||(r.source=e.source||"mpegts"));t=e.begin+"_"+e.text;var n=this._metaCuesByTextTime[t];if(!n){n={begin:e.begin,end:e.end,text:e.text},this._metaCuesByTextTime[t]=n;var s=Object(i.b)([n])[0];r.data.push(s)}},addVTTCue:function(e,t){this._tracksById||this._initTextTracks();var a=e.track?e.track:"native"+e.type,i=this._tracksById[a],r="captions"===e.type?"Unknown CC":"ID3 Metadata",n=e.cue;if(!i){var s={kind:e.type,_id:a,label:r,embedded:!0};i=m.call(this,s),this.renderNatively||"metadata"===i.kind?this.setTextTracks(this.video.textTracks):l.call(this,[i])}if(function(e,t,a){var i=e.kind;this._cachedVTTCues[e._id]||(this._cachedVTTCues[e._id]={});var r,n=this._cachedVTTCues[e._id];switch(i){case"captions":case"subtitles":r=a||Math.floor(20*t.startTime);var s="_"+t.line,c=Math.floor(20*t.endTime),d=n[r+s]||n[r+1+s]||n[r-1+s];return!(d&&Math.abs(d-c)<=1)&&(n[r+s]=c,!0);case"metadata":var u=t.data?new Uint8Array(t.data).join(""):t.text;return r=a||t.startTime+u,n[r]?!1:(n[r]=t.endTime,!0);default:return!1}}.call(this,i,n,t))return this.renderNatively||"metadata"===i.kind?f(this.renderNatively,i,n):i.data.push(n),n;return null},addVTTCuesToTrack:function(e,t){if(!this.renderNatively)return;var a,i=this._tracksById[e._id];if(!i)return this._cuesByTrackId||(this._cuesByTrackId={}),void(this._cuesByTrackId[e._id]={cues:t,loaded:!1});if(this._cuesByTrackId[e._id]&&this._cuesByTrackId[e._id].loaded)return;this._cuesByTrackId[e._id]={cues:t,loaded:!0};for(;a=t.shift();)f(this.renderNatively,i,a)},triggerActiveCues:function(e){var t=this;if(!e||!e.length)return void(this._activeCues=null);var a=this._activeCues||[],i=Array.prototype.filter.call(e,function(e){if(a.some(function(t){return i=t,(a=e).startTime===i.startTime&&a.endTime===i.endTime&&a.text===i.text&&a.data===i.data&&a.value===i.value;var a,i}))return!1;if(e.data||e.value)return!0;if(e.text){var i=JSON.parse(e.text),r=e.startTime,n={metadataTime:r,metadata:i};i.programDateTime&&(n.programDateTime=i.programDateTime),i.metadataType&&(n.metadataType=i.metadataType,delete i.metadataType),t.trigger(c.K,n)}return!1});if(i.length){var r=Object(n.a)(i),s=i[0].startTime;this.trigger(c.K,{metadataType:"id3",metadataTime:s,metadata:r})}this._activeCues=Array.prototype.slice.call(e)},renderNatively:!1};function o(e,t,a){e&&(e.removeEventListener?e.removeEventListener(t,a):e["on"+t]=null)}function l(e){var t=this;e&&(this._textTracks||this._initTextTracks(),e.forEach(function(e){if(!e.kind||T(e.kind)){var a=m.call(t,e);h.call(t,a),e.file&&(e.data=[],Object(i.c)(e,function(e){t.addVTTCuesToTrack(a,e)},function(e){t.trigger(c.ub,e)}))}}),this._textTracks&&this._textTracks.length&&this.trigger("subtitlesTracks",{tracks:this._textTracks}))}function f(e,t,a){var i=a;s.Browser.ie&&e&&(i=new window.TextTrackCue(a.startTime,a.endTime,a.text)),s.Browser.ie?function(e,t){var a=[],i=e.mode;e.mode="hidden";for(var r=e.cues,n=r.length-1;n>=0&&r[n].startTime>t.startTime;n--)a.unshift(r[n]),e.removeCue(r[n]);e.addCue(t),a.forEach(function(t){return e.addCue(t)}),e.mode=i}(t,i):t.addCue(i)}function v(e,t){t&&t.length&&Object(d.i)(t,function(t){if(!(s.Browser.ie&&e&&/^(native|subtitle|cc)/.test(t._id))){t.mode="disabled",t.mode="hidden";for(var a=t.cues.length;a--;)t.removeCue(t.cues[a]);t.embedded||(t.mode="disabled"),t.inuse=!1}})}function T(e){return"subtitles"===e||"captions"===e}function m(e){var t,a=Object(r.b)(e,this._unknownCount),i=a.label;if(this._unknownCount=a.unknownCount,this.renderNatively||"metadata"===e.kind){var n=this.video.textTracks;(t=Object(d.m)(n,{label:i}))||(t=this.video.addTextTrack(e.kind,i,e.language||"")),t.default=e.default,t.mode="disabled",t.inuse=!0}else(t=e).data=t.data||[];return t._id||(t._id=Object(r.a)(e,this._textTracks.length)),t}function h(e){this._textTracks.push(e),this._tracksById[e._id]=e}function k(e){this.triggerActiveCues(e.currentTarget.activeCues)}t.a=u}}]);