var addBookmarkObj = {
    addTextLink:function(parId){
        var a=addBookmarkObj.makeLink(parId);
    },
    makeLink:function(parId) {
        if(!document.getElementById || !document.createTextNode) return null;
        parId=((typeof(parId)=='string')&&!isEmpty(parId))
                ?parId:'addBookmarkContainer';
        var cont=document.getElementById(parId);
        if(!cont) return null;
        var a=document.getElementById('bookmarkLink');
        a.href=location.href;
        if(window.opera) {
            a.rel='sidebar'; // this makes it work in Opera 7+
        } else {
            a.onclick=function() {
                addBookmarkObj.exec(location.href, document.title);
                return false;
            }
        }
        a.title=document.title;
        return;
    },
    exec:function(url, title) {
        var ua=navigator.userAgent.toLowerCase();
        var isKonq=(ua.indexOf('konqueror')!=-1);
        var isSafari=(ua.indexOf('webkit')!=-1);
        var isMac=(ua.indexOf('mac')!=-1);
        var buttonStr=isMac?'Command/Cmd':'CTRL';
        if(window.external && (!document.createTextNode ||
                               (typeof(window.external.AddFavorite)=='unknown'))) {
            window.external.AddFavorite(url, title); 
        } else if(isKonq) {
            alert('Нажмите CTRL + B для сохранения страницы в закладках.');
        } else if(window.opera) {
            void(0);
        } else if(window.home || isSafari) {
            alert('Нажмите '+buttonStr+' + D для сохранения страницы в закладках.');
        } else if(!window.print || isMac) { 
            alert('Нажмите Command/Cmd + D для сохранения страницы в закладках.');
        } else {
            alert('Ваш браузер не поддерживает автоматическое добавление закладок.');
        }
    }
}
function isEmpty(s){return ((s=='')||/^\s*$/.test(s));}
function dss_addEvent(el,etype,fn) {
    if(el.addEventListener && (!window.opera || opera.version) &&
       (etype!='load')) {
        el.addEventListener(etype,fn,false);
    } else if(el.attachEvent) {
        el.attachEvent('on'+etype,fn);
    } else {
        if(typeof(fn) != "function") return;
        if(typeof(window.earlyNS4)=='undefined') {
            // to prevent this function from crashing Netscape versions before 4.02
            window.earlyNS4=((navigator.appName.toLowerCase()=='netscape')&&
                             (parseFloat(navigator.appVersion)<4.02)&&document.layers);
        }
        if((typeof(el['on'+etype])=="function")&&!window.earlyNS4) {
            var tempFunc = el['on'+etype];
            el['on'+etype]=function(e){
                var a=tempFunc(e),b=fn(e);
                a=(typeof(a)=='undefined')?true:a;
                b=(typeof(b)=='undefined')?true:b;
                return (a&&b);
            }
        } else {
            el['on'+etype]=fn;
        }
    }
}
dss_addEvent(window,'load',addBookmarkObj.addTextLink);

//document.ondragstart = test;
//document.onselectstart = test;
// document.oncontextmenu = test;

function test() {
   return false
}

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "http://connect.facebook.net/en_US/all.js#xfbml=1&version=2.0&status=0";
    fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));