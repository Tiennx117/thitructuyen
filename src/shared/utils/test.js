var _0x3af4=['timeout','userCount','pageCount','string','members','comments','result','INFINITY','log','RUNNING\x20|\x20TIMEOUT\x20','innerHeight','scrollY','body','offsetHeight','scrollBy','getElementsByClassName','uiMorePagerLoader\x20pam\x20uiBoxLightblue','length','pam\x20uiBoxLightblue\x20uiMorePagerPrimary','click','TRY\x20SCROLL:\x20','floor','random','toFixed','Timing\x20','\x20|\x20Scroll\x20','getElementsByTagName','UFIPagerLink','REMAINING\x20COMMENT\x20LINKS:\x20','UFIReplySocialSentenceLinkText','GET\x20COMMENT\x20POST..','UFICommentActorName','GET\x20TAG\x20NAME..','UFICommentBody','GET\x20POST\x20USER\x20NAME..','getAttribute','data-hovercard','indexOf','push','join','DONE\x20|\x20TOTAL\x20UID\x20','now','location','pathname','split','clear','object'];(function(_0x48b51d,_0x29e64e){var _0xadcb97=function(_0x459128){while(--_0x459128){_0x48b51d['push'](_0x48b51d['shift']());}};_0xadcb97(++_0x29e64e);}(_0x3af4,0x143));var _0x1e16=function(_0x19a6f6,_0x2a7d8e){_0x19a6f6=_0x19a6f6-0x0;var _0x4a2053=_0x3af4[_0x19a6f6];return _0x4a2053;};var wStartTime,wStopScroll,wTryScroll,wScrollCount,wUsers,wTimeout,wUserCount,wScroll,wViewMore,wViewMoreComments,wViewMoreReplies,segment;function wDefaultOptions(){wStartTime=performance[_0x1e16('0x0')]();wStopScroll=![];wTryScroll=0x0;wScrollCount=0x0;wUsers=[];wTimeout=0x0;wUserCount=0x0;wScroll=!![];wViewMore=!![];wViewMoreComments=!![];wViewMoreReplies=![];segment=window[_0x1e16('0x1')][_0x1e16('0x2')][_0x1e16('0x3')]('/');};function wRun(_0x343524){console[_0x1e16('0x4')]();wDefaultOptions();if(typeof _0x343524===_0x1e16('0x5')){if(_0x343524[_0x1e16('0x6')]!==undefined){wTimeout=_0x343524[_0x1e16('0x6')];}if(_0x343524[_0x1e16('0x7')]!==undefined){wUserCount=_0x343524[_0x1e16('0x7')];}if(_0x343524[_0x1e16('0x8')]!==undefined){wPageCount=_0x343524['pageCount'];}}else if(typeof _0x343524==='number'){wTimeout=_0x343524;}else if(typeof _0x343524===_0x1e16('0x9')){switch(_0x343524){case'auto':wTimeout=segment[0x3]===_0x1e16('0xa')?0xa:0x1;wUserCount=0x3e8;wScroll=!![];wViewMore=!![];wViewMoreComments=!![];wViewMoreReplies=![];break;case'infinity':wTimeout=0x0;wUserCount=0x0;wScroll=!![];wViewMore=!![];wViewMoreComments=!![];wViewMoreReplies=!![];break;case _0x1e16('0xb'):wScroll=![];wViewMore=!![];wViewMoreComments=!![];wViewMoreReplies=![];break;case'replies':wScroll=![];wViewMore=!![];wViewMoreComments=![];wViewMoreReplies=!![];break;case _0x1e16('0xc'):wExtractUID();wShowResult();break;default:wTimeout=0xa;wUserCount=0x3e8;wScroll=!![];wViewMore=!![];wViewMoreComments=!![];wViewMoreReplies=![];}}else{wTimeout=segment[0x3]===_0x1e16('0xa')?0xa:0x1;wUserCount=0x3e8;wScroll=!![];wViewMore=!![];wViewMoreComments=!![];wViewMoreReplies=![];}var _0x5f5ab1=wTimeout===0x0?_0x1e16('0xd'):wTimeout;var _0x5ac85b=wUserCount===0x0?_0x1e16('0xd'):wUserCount;console[_0x1e16('0xe')](_0x1e16('0xf')+_0x5f5ab1+'\x20MINUTE(S)\x20|\x20USER\x20COUNT\x20'+_0x5ac85b);if(wScroll){wStopScroll=![];wLoopProcess();}if(wTimeout!==0x0){setTimeout(function(){wStopScroll=!![];},0x3c*wTimeout*0x3e8);}}function wScrollProcess(){if(window[_0x1e16('0x10')]+window[_0x1e16('0x11')]<document[_0x1e16('0x12')][_0x1e16('0x13')]){window[_0x1e16('0x14')](0x0,0x3e8);wTryScroll=0x0;++wScrollCount;}else{if(wTryScroll===0xa){if(window[_0x1e16('0x10')]+window['scrollY']===document[_0x1e16('0x12')][_0x1e16('0x13')]){var _0x25b9e7=document[_0x1e16('0x15')](_0x1e16('0x16'));if(_0x25b9e7[_0x1e16('0x17')]>0x0){console[_0x1e16('0xe')]('FAILURE.\x20CANT\x20SCROLL\x20MORE.');}else{console[_0x1e16('0xe')]('COMPLETED');}}wStopScroll=!![];}var _0x229ef2=document[_0x1e16('0x15')](_0x1e16('0x18'));if(_0x229ef2[_0x1e16('0x17')]>0x0){document[_0x1e16('0x15')](_0x1e16('0x18'))[_0x229ef2[_0x1e16('0x17')]-0x1][_0x1e16('0x19')]();}++wTryScroll;console[_0x1e16('0xe')](_0x1e16('0x1a')+wTryScroll);}};function wLoopProcess(){if(!wStopScroll){var _0x102216=wScrollCount%0x64*0.005+0x1;var _0x294981=Math[_0x1e16('0x1b')](Math[_0x1e16('0x1c')]()*0x12c+0x1f4)*_0x102216;setTimeout(function(){wScrollProcess();wLoopProcess();},_0x294981);var _0x5e626b=performance[_0x1e16('0x0')]();var _0x1f808f=_0x5e626b-wStartTime;var _0x292aa2=Math[_0x1e16('0x1b')](_0x1f808f/0xea60);var _0x3f5c81=(_0x1f808f%0xea60/0x3e8)[_0x1e16('0x1d')](0x0);console[_0x1e16('0xe')](_0x1e16('0x1e')+(_0x292aa2<0xa?'0':'')+_0x292aa2+':'+(_0x3f5c81<0xa?'0':'')+_0x3f5c81+_0x1e16('0x1f')+ ++wScrollCount+'\x20|\x20Scale\x20'+_0x102216);}else if(wViewMore){wViewMoreProcess();}else{wExtractUID();}};function wViewMoreProcess(){document[_0x1e16('0x20')](_0x1e16('0x12'))[0x0]['scrollIntoView']();var _0x578693=function(){var _0x1c0acb=document[_0x1e16('0x15')](_0x1e16('0x21'));if(_0x1c0acb['length']>0x0){console[_0x1e16('0xe')](_0x1e16('0x22')+_0x1c0acb['length']);_0x1c0acb[0x0]['click']();setTimeout(function(){_0x578693();},0x64);}else{if(wViewMoreReplies){_0x566e1f();}else{wExtractUID();}}};var _0x566e1f=function(){var _0x509ae8=document[_0x1e16('0x15')](_0x1e16('0x23'));if(_0x509ae8['length']>0x0){console[_0x1e16('0xe')]('REMAINING\x20REPLY\x20LINKS:\x20'+_0x509ae8[_0x1e16('0x17')]);_0x509ae8[0x0][_0x1e16('0x19')]();setTimeout(function(){_0x566e1f();},0x64);}else{wExtractUID();}};if(wViewMoreComments){_0x578693();}else if(wViewMoreReplies){_0x566e1f();}};function wExtractUID(){console[_0x1e16('0xe')](_0x1e16('0x24'));var _0x29858c=document[_0x1e16('0x15')](_0x1e16('0x25'));for(var _0x4353e2=0x0;_0x4353e2<_0x29858c[_0x1e16('0x17')];_0x4353e2+=0x1){wExtractHoverCard(_0x29858c[_0x4353e2]);}console[_0x1e16('0xe')](_0x1e16('0x26'));var _0x55146f=document[_0x1e16('0x15')](_0x1e16('0x27'));for(var _0x4353e2=0x0;_0x4353e2<_0x55146f[_0x1e16('0x17')];_0x4353e2+=0x1){wExtractHoverCard(_0x55146f[_0x4353e2]);}console[_0x1e16('0xe')](_0x1e16('0x28'));var _0x1c2fa0='';if(segment[0x3]==='members'){_0x1c2fa0='fsl\x20fwb\x20fcb';}else{_0x1c2fa0='fwb\x20fcg';}var _0x5cebf9=document[_0x1e16('0x15')](_0x1c2fa0);for(var _0x4353e2=0x0;_0x4353e2<_0x5cebf9[_0x1e16('0x17')];_0x4353e2+=0x1){var _0x3e580c=_0x5cebf9[_0x4353e2][_0x1e16('0x20')]('a');for(var _0x19d1f8=0x0;_0x19d1f8<_0x3e580c[_0x1e16('0x17')];_0x19d1f8+=0x1){wExtractHoverCard(_0x3e580c[_0x19d1f8]);}}wShowResult();};function wExtractHoverCard(_0x28d0a5){var _0x5e2a6c=_0x28d0a5[_0x1e16('0x29')](_0x1e16('0x2a'));if(typeof _0x5e2a6c!=='undefined'&&_0x5e2a6c!==null){_0x5e2a6c=_0x5e2a6c[_0x1e16('0x3')]('=');var _0x3a287c=_0x5e2a6c[0x1][_0x1e16('0x3')]('&')[0x0];if(_0x3a287c&&wUsers[_0x1e16('0x2b')](_0x3a287c)===-0x1){wUsers[_0x1e16('0x2c')](_0x3a287c);}}};function wShowResult(){console[_0x1e16('0xe')]('DONE\x20|\x20TOTAL\x20UID\x20'+wUsers['length']);console['log'](wUsers[_0x1e16('0x2d')]('\x0d\x0a'));console[_0x1e16('0xe')](_0x1e16('0x2e')+wUsers[_0x1e16('0x17')]);};

wRun('auto');