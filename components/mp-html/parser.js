"use strict";function t(t){for(var i=Object.create(null),e=t.split(","),s=e.length;s--;)i[e[s]]=!0;return i}function i(t,i){for(var e=t.indexOf("&");-1!==e;){var s=t.indexOf(";",e+3),a=void 0;if(-1===s)break;"#"===t[e+1]?(a=parseInt(("x"===t[e+2]?"0":"")+t.substring(e+2,s)),isNaN(a)||(t=t.substr(0,e)+String.fromCharCode(a)+t.substr(s+1))):(a=t.substring(e+1,s),(r.entities[a]||"amp"===a&&i)&&(t=t.substr(0,e)+(r.entities[a]||"&")+t.substr(s+1))),e=t.indexOf("&",e+1)}return t}function e(t){for(var i=t.length-1,e=i;e>=-1;e--)(-1===e||t[e].c||!t[e].name||"div"!==t[e].name&&"p"!==t[e].name&&"h"!==t[e].name[0]||(t[e].attrs.style||"").includes("inline"))&&(i-e>=5&&t.splice(e+1,i-e,{name:"div",attrs:{},children:t.slice(e+1,i+1)}),i=e-1)}function s(t){this.options=t.data||{},this.tagStyle=Object.assign({},r.tagStyle,this.options.tagStyle),this.imgList=t.imgList||[],this.imgList._unloadimgs=0,this.plugins=t.plugins||[],this.attrs=Object.create(null),this.stack=[],this.nodes=[],this.pre=(this.options.containerStyle||"").includes("white-space")&&this.options.containerStyle.includes("pre")?2:0}function a(t){this.handler=t}var n=["minappershortcode","minapperad","minappermap","minapperglobalgoods","minappergoods","baidupan","minappergallery","minapperqqvideo","minapperchannelsactivity","minapperchannelsevent","minapperchannels","minappershopsgoods","wechatshopproduct","wechatshop"],r={trustTags:t("a,abbr,ad,audio,b,blockquote,br,code,col,colgroup,dd,del,dl,dt,div,em,fieldset,h1,h2,h3,h4,h5,h6,hr,i,img,ins,label,legend,li,ol,p,q,ruby,rt,source,span,strong,sub,sup,table,tbody,td,tfoot,th,thead,tr,title,ul,video,"+n.join(",")),blockTags:t("address,article,aside,body,caption,center,cite,footer,header,html,nav,pre,section,"+n.join(",")),ignoreTags:t("area,base,canvas,embed,frame,head,iframe,input,link,map,meta,param,rp,script,source,style,textarea,title,track,wbr"),voidTags:t("area,base,br,col,circle,ellipse,embed,frame,hr,img,input,line,link,meta,param,path,polygon,rect,source,track,use,wbr,"+n.join(",")),entities:{lt:"<",gt:">",quot:'"',apos:"'",ensp:" ",emsp:" ",nbsp:" ",semi:";",ndash:"–",mdash:"—",middot:"·",lsquo:"‘",rsquo:"’",ldquo:"“",rdquo:"”",bull:"•",hellip:"…",larr:"←",uarr:"↑",rarr:"→",darr:"↓"},tagStyle:{address:"font-style:italic",big:"display:inline;font-size:1.2em",caption:"display:table-caption;text-align:center",center:"text-align:center",cite:"font-style:italic",dd:"margin-left:40px",mark:"background-color:yellow",pre:"font-family:monospace;white-space:pre",s:"text-decoration:line-through",small:"display:inline;font-size:0.8em",strike:"text-decoration:line-through",u:"text-decoration:underline"},svgDict:{animatetransform:"animateTransform",lineargradient:"linearGradient",viewbox:"viewBox",attributename:"attributeName",repeatcount:"repeatCount",repeatdur:"repeatDur"}},o={},l=wx.getSystemInfoSync(),h=l.windowWidth,c=l.system,d=t(" ,\r,\n,\t,\f"),p=0;s.prototype.parse=function(t){for(var i=this.plugins.length;i--;)this.plugins[i].onUpdate&&(t=this.plugins[i].onUpdate(t,r)||t);for(new a(this).parse(t);this.stack.length;)this.popNode();return this.nodes.length>50&&e(this.nodes),this.nodes},s.prototype.expose=function(){for(var t=this.stack.length;t--;){var i=this.stack[t];if(n.includes(i.name))return;if(i.c||"a"===i.name||"video"===i.name||"audio"===i.name)return;i.c=1}},s.prototype.hook=function(t){for(var i=this.plugins.length;i--;)if(this.plugins[i].onParse&&!1===this.plugins[i].onParse(t,this))return!1;return!0},s.prototype.getUrl=function(t){var i=this.options.domain;return"/"===t[0]?"/"===t[1]?t=(i?i.split("://")[0]:"http")+":"+t:i&&(t=i+t):!i||t.includes("data:")||t.includes("://")||(t=i+"/"+t),t},s.prototype.parseStyle=function(t){var i=t.attrs,e=(this.tagStyle[t.name]||"").split(";").concat((i.style||"").split(";")),s={},a="";if(i.id&&!this.xml&&(this.options.useAnchor?this.expose():"img"!==t.name&&"a"!==t.name&&"video"!==t.name&&"audio"!==t.name&&(i.id=void 0)),i.width&&(s.width=parseFloat(i.width)+(i.width.includes("%")?"%":"px"),i.width=void 0),i.height){if("video"===t.name){var n=i.height.includes("%");s.height=n?void 0:parseFloat(i.height)+"px"}else s.height=parseFloat(i.height)+(i.height.includes("%")?"%":"px");i.height=void 0}for(var r=0,o=e.length;r<o;r++){var l=e[r].split(":");if(!(l.length<2)){var c=l.shift().trim().toLowerCase(),p=l.join(":").trim();if("-"===p[0]&&p.lastIndexOf("-")>0||p.includes("safe"))a+=";".concat(c,":").concat(p);else if(!s[c]||p.includes("import")||!s[c].includes("import")){if(p.includes("url")){var u=p.indexOf("(")+1;if(u){for(;'"'===p[u]||"'"===p[u]||d[p[u]];)u++;p=p.substr(0,u)+this.getUrl(p.substr(u))}}else p.includes("rpx")&&(p=p.replace(/[0-9.]+\s*rpx/g,function(t){return parseFloat(t)*h/750+"px"}));s[c]=p}}}return t.attrs.style=a,s},s.prototype.onTagName=function(t){this.tagName=this.xml?t:t.toLowerCase(),"svg"===this.tagName&&(this.xml=(this.xml||0)+1)},s.prototype.onAttrName=function(t){t=this.xml?t:t.toLowerCase(),"data-"===t.substr(0,5)?"data-src"!==t||this.attrs.src?"img"===this.tagName||"a"===this.tagName?this.attrName=t:this.attrName=void 0:this.attrName="src":(this.attrName=t,this.attrs[t]="T")},s.prototype.onAttrVal=function(t){var e=this.attrName||"";"style"===e||"href"===e?this.attrs[e]=i(t,!0):e.includes("src")?this.attrs[e]=this.getUrl(i(t,!0)):e&&(this.attrs[e]=t)},s.prototype.onOpenTag=function(t){var i=Object.create(null);i.name=this.tagName,i.attrs=this.attrs,this.attrs=Object.create(null);var e=i.attrs,s=this.stack[this.stack.length-1],a=s?s.children:this.nodes,l=this.xml?t:r.voidTags[i.name];if(o[i.name]&&(e.class=o[i.name]+(e.class?" "+e.class:"")),"embed"===i.name){var c=e.src||"";c.includes(".mp4")||c.includes(".3gp")||c.includes(".m3u8")||(e.type||"").includes("video")?i.name="video":(c.includes(".mp3")||c.includes(".wav")||c.includes(".aac")||c.includes(".m4a")||(e.type||"").includes("audio"))&&(i.name="audio"),e.autostart&&(e.autoplay="T"),e.controls="T"}if("video"!==i.name&&"audio"!==i.name||("video"!==i.name||e.id||(e.id="v"+p++),e.controls||e.autoplay||(e.controls="T"),i.src=[],e.src&&(i.src.push(e.src),e.src=void 0),this.expose()),"minappergallery"===i.name){var d=e.images||"",u=d.split(",http")||[],g=[];if(u&&u.length){var m=u.map(function(t,i){return i&&(t="http"+t),t});g=m.map(function(t,i){var e={};return e.imageurl=t,e.id=i,e.allimages=m,e})}e.images=g}if("minappermap"===i.name){var f=[],v={},y={latitude:e.latitude,longitude:e.longitude,title:e.title,width:30,height:40,id:1};v.display="ALWAYS",v.content=e.title,v.fontSize=16,y.callout=v,f.push(y),e.markers=f}if(n.includes(i.name)&&this.expose(),l){if(!this.hook(i)||r.ignoreTags[i.name])return void("base"!==i.name||this.options.domain?"source"===i.name&&s&&("video"===s.name||"audio"===s.name)&&e.src&&s.src.push(e.src):this.options.domain=e.href);var x=this.parseStyle(i);if("img"===i.name){if(e.src&&(e.src.includes("webp")&&(i.webp="T"),e.src.includes("data:")&&!e["original-src"]&&(e.ignore="T"),!e.ignore||i.webp||e.src.includes("cloud://"))){for(var b=this.stack.length;b--;){var w=this.stack[b];"a"===w.name&&(i.a=w.attrs),"table"!==w.name||i.webp||e.src.includes("cloud://")||(!x.display||x.display.includes("inline")?i.t="inline-block":i.t=x.display,x.display=void 0);var k=w.attrs.style||"";if(!k.includes("flex:")||k.includes("flex:0")||k.includes("flex: 0")||x.width&&!(parseInt(x.width)>100))if(k.includes("flex")&&"100%"===x.width)for(var N=b+1;N<this.stack.length;N++){var T=this.stack[N].attrs.style||"";if(!T.includes(";width")&&!T.includes(" width")&&0!==T.indexOf("width")){x.width="";break}}else k.includes("inline-block")&&(x.width&&"%"===x.width[x.width.length-1]?(w.attrs.style+=";max-width:"+x.width,x.width=""):w.attrs.style+=";max-width:100%");else{x.width="100% !important",x.height="";for(var O=b+1;O<this.stack.length;O++)this.stack[O].attrs.style=(this.stack[O].attrs.style||"").replace("inline-","")}w.c=1}i.i=this.imgList.length;var C=e["original-src"]||e.src;if(this.imgList.includes(C)){var S=C.indexOf("://");if(-1!==S){S+=3;for(var j=C.substr(0,S);S<C.length&&"/"!==C[S];S++)j+=Math.random()>.5?C[S].toUpperCase():C[S];j+=C.substr(S),C=j}}this.imgList.push(C),i.t||(this.imgList._unloadimgs+=1)}"inline"===x.display&&(x.display=""),e.ignore&&(x["max-width"]=x["max-width"]||"100%",e.style+=";-webkit-touch-callout:none"),parseInt(x.width)>h&&(x.height=void 0),isNaN(parseInt(x.width))||(i.w="T"),!isNaN(parseInt(x.height))&&(!x.height.includes("%")||s&&(s.attrs.style||"").includes("height"))&&(i.h="T")}else if("svg"===i.name)return a.push(i),this.stack.push(i),void this.popNode();for(var I in x)x[I]&&(e.style+=";".concat(I,":").concat(x[I].replace(" !important","")));e.style=e.style.substr(1)||void 0}else("pre"===i.name||(e.style||"").includes("white-space")&&e.style.includes("pre"))&&2!==this.pre&&(this.pre=i.pre=1),i.children=[],this.stack.push(i);a.push(i)},s.prototype.onCloseTag=function(t){t=this.xml?t:t.toLowerCase();var i;for(i=this.stack.length;i--&&this.stack[i].name!==t;);if(-1!==i)for(;this.stack.length>i;)this.popNode();else if("p"===t||"br"===t){var e=this.stack.length?this.stack[this.stack.length-1].children:this.nodes;e.push({name:t,attrs:{class:o[t],style:this.tagStyle[t]}})}},s.prototype.popNode=function(){var t=this.stack.pop(),i=t.attrs,s=t.children,a=this.stack[this.stack.length-1],o=a?a.children:this.nodes;if(!this.hook(t)||r.ignoreTags[t.name])return"title"===t.name&&s.length&&"text"===s[0].type&&this.options.setTitle&&wx.setNavigationBarTitle({title:s[0].text}),void o.pop();if(t.pre&&2!==this.pre){this.pre=t.pre=void 0;for(var l=this.stack.length;l--;)this.stack[l].pre&&(this.pre=1)}if("svg"===t.name){if(this.xml>1)return void this.xml--;var c="",d=i.style;return i.style="",i.xmlns="http://www.w3.org/2000/svg",function t(i){if("text"===i.type)return void(c+=i.text);var e=r.svgDict[i.name]||i.name;c+="<"+e;for(var s in i.attrs){var a=i.attrs[s];a&&(c+=" ".concat(r.svgDict[s]||s,'="').concat(a,'"'))}if(i.children){c+=">";for(var n=0;n<i.children.length;n++)t(i.children[n]);c+="</"+e+">"}else c+="/>"}(t),t.name="img",t.attrs={src:"data:image/svg+xml;utf8,"+c.replace(/#/g,"%23"),style:d,ignore:"T"},t.children=void 0,void(this.xml=!1)}var p={};if(i.align&&("table"===t.name?"center"===i.align?p["margin-inline-start"]=p["margin-inline-end"]="auto":p.float=i.align:p["text-align"]=i.align,i.align=void 0),i.dir&&(p.direction=i.dir,i.dir=void 0),"font"===t.name&&(i.color&&(p.color=i.color,i.color=void 0),i.face&&(p["font-family"]=i.face,i.face=void 0),i.size)){var u=parseInt(i.size);isNaN(u)||(u<1?u=1:u>7&&(u=7),p["font-size"]=["x-small","small","medium","large","x-large","xx-large","xxx-large"][u-1]),i.size=void 0}if((i.class||"").includes("align-center")&&(p["text-align"]="center"),Object.assign(p,this.parseStyle(t)),"table"!==t.name&&parseInt(p.width)>h&&(p["max-width"]="100%",p["box-sizing"]="border-box"),r.blockTags[t.name])t.name="div";else if(r.trustTags[t.name]||this.xml)if(n.includes(t.name))this.expose();else if("a"===t.name||"ad"===t.name)this.expose();else if("video"===t.name||"audio"===t.name)(p.height||"").includes("auto")&&(p.height=void 0),t.children=void 0;else if("ul"!==t.name&&"ol"!==t.name||!t.c){if("table"===t.name){var g=parseFloat(i.cellpadding),m=parseFloat(i.cellspacing),f=parseFloat(i.border),v=p["border-color"],y=p["border-style"];if(t.c&&(isNaN(g)&&(g=2),isNaN(m)&&(m=2)),f&&(i.style+=";border:".concat(f,"px ").concat(y||"solid"," ").concat(v||"gray")),t.flag&&t.c){t.flag=void 0,p.display="grid",m?(p["grid-gap"]=m+"px",p.padding=m+"px"):f&&(i.style+=";border-left:0;border-top:0");var x=[],b=[],w=[],k={};!function t(i){for(var e=0;e<i.length;e++)"tr"===i[e].name?b.push(i[e]):t(i[e].children||[])}(s);for(var N=1;N<=b.length;N++){for(var T=1,O=0;O<b[N-1].children.length;O++){var C=b[N-1].children[O];if("td"===C.name||"th"===C.name){for(;k[N+"."+T];)T++;C.c=1;var S=C.attrs.style||"",j=S.indexOf("width")?S.indexOf(";width"):0;if(-1!==j){var I=S.indexOf(";",j+6);-1===I&&(I=S.length),C.attrs.colspan||(x[T]=S.substring(j?j+7:6,I)),S=S.substr(0,j)+S.substr(I)}if(S+=";display:flex",-1!==(j=S.indexOf("vertical-align"))){var A=S.substr(j+15,10);A.includes("middle")?S+=";align-items:center":A.includes("bottom")&&(S+=";align-items:flex-end")}else S+=";align-items:center";if(-1!==(j=S.indexOf("text-align"))){var L=S.substr(j+11,10);L.includes("center")?S+=";justify-content: center":L.includes("right")&&(S+=";justify-content: right")}if(S=(f?";border:".concat(f,"px ").concat(y||"solid"," ").concat(v||"gray")+(m?"":";border-right:0;border-bottom:0"):"")+(g?";padding:".concat(g,"px"):"")+";"+S,C.attrs.colspan&&(S+=";grid-column-start:".concat(T,";grid-column-end:").concat(T+parseInt(C.attrs.colspan)),C.attrs.rowspan||(S+=";grid-row-start:".concat(N,";grid-row-end:").concat(N+1)),T+=parseInt(C.attrs.colspan)-1),C.attrs.rowspan){S+=";grid-row-start:".concat(N,";grid-row-end:").concat(N+parseInt(C.attrs.rowspan)),C.attrs.colspan||(S+=";grid-column-start:".concat(T,";grid-column-end:").concat(T+1));for(var z=1;z<C.attrs.rowspan;z++)for(var q=0;q<(C.attrs.colspan||1);q++)k[N+z+"."+(T-q)]=1}S&&(C.attrs.style=S),w.push(C),T++}}if(1===N){for(var F="",U=1;U<T;U++)F+=(x[U]?x[U]:"auto")+" ";p["grid-template-columns"]=F}}t.children=w}else t.c&&(p.display="table"),isNaN(m)||(p["border-spacing"]=m+"px"),(f||g||t.c)&&function i(e){for(var s=0;s<e.length;s++){var a=e[s];t.c&&(a.c=1),"th"===a.name||"td"===a.name?(f&&(a.attrs.style="border:".concat(f,"px ").concat(y||"solid"," ").concat(v||"gray",";").concat(a.attrs.style||"")),g&&(a.attrs.style="padding:".concat(g,"px;").concat(a.attrs.style||""))):a.children&&i(a.children)}}(s);if(this.options.scrollTable&&!(i.style||"").includes("inline")){var V=Object.assign({},t);t.name="div",t.attrs={style:"overflow-x:auto;padding:1px"},t.children=[V],i=V.attrs}}else if("td"!==t.name&&"th"!==t.name||!i.colspan&&!i.rowspan){if("ruby"===t.name){t.name="span";for(var D=0;D<s.length-1;D++)"text"===s[D].type&&"rt"===s[D+1].name&&(s[D]={name:"span",attrs:{style:"display:inline-block;text-align:center"},children:[{name:"div",attrs:{style:"font-size:50%;"+(s[D+1].attrs.style||"")},children:s[D+1].children},s[D]]},s.splice(D+1,1))}}else for(var B=this.stack.length;B--;)if("table"===this.stack[B].name){this.stack[B].flag=1;break}}else{var P={a:"lower-alpha",A:"upper-alpha",i:"lower-roman",I:"upper-roman"};P[i.type]&&(i.style+=";list-style-type:"+P[i.type],i.type=void 0),t.c=1;for(var W=s.length;W--;)"li"===s[W].name&&(s[W].c=1)}else t.name="span";if((p.display||"").includes("flex")&&!t.c)for(var Z=s.length;Z--;){var _=s[Z];_.f&&(_.attrs.style=(_.attrs.style||"")+_.f,_.f=void 0)}var G=a&&((a.attrs.style||"").includes("flex")||(a.attrs.style||"").includes("grid"))&&!t.c&&!(p.display||"").includes("inline");G&&(t.f=";max-width:100%"),s.length>=50&&t.c&&!(p.display||"").includes("flex")&&e(s);for(var M in p)if(p[M]){var Y=";".concat(M,":").concat(p[M].replace(" !important",""));G&&(M.includes("flex")&&"flex-direction"!==M||"align-self"===M||M.includes("grid")||"-"===p[M][0]||M.includes("width")&&Y.includes("%"))?(t.f+=Y,"width"===M&&(i.style+=";width:100%")):i.style+=Y}i.style=i.style.substr(1)||void 0},s.prototype.onText=function(t){if(!this.pre){for(var e,s="",a=0,n=t.length;a<n;a++)d[t[a]]?(" "!==s[s.length-1]&&(s+=" "),"\n"!==t[a]||e||(e=!0)):s+=t[a];if(" "===s&&e)return;t=s}var r=Object.create(null);if(r.type="text",r.text=i(t),this.hook(r)){"force"===this.options.selectable&&c.includes("iOS")&&!wx.canIUse("rich-text.user-select")&&this.expose();(this.stack.length?this.stack[this.stack.length-1].children:this.nodes).push(r)}},a.prototype.parse=function(t){this.content=t||"",this.i=0,this.start=0,this.state=this.text;for(var i=this.content.length;-1!==this.i&&this.i<i;)this.state()},a.prototype.checkClose=function(t){var i="/"===this.content[this.i];return!!(">"===this.content[this.i]||i&&">"===this.content[this.i+1])&&(t&&this.handler[t](this.content.substring(this.start,this.i)),this.i+=i?2:1,this.start=this.i,this.handler.onOpenTag(i),"script"===this.handler.tagName?(this.i=this.content.indexOf("</",this.i),-1!==this.i&&(this.i+=2,this.start=this.i),this.state=this.endTag):this.state=this.text,!0)},a.prototype.text=function(){if(this.i=this.content.indexOf("<",this.i),-1===this.i)return void(this.start<this.content.length&&this.handler.onText(this.content.substring(this.start,this.content.length)));var t=this.content[this.i+1];if(t>="a"&&t<="z"||t>="A"&&t<="Z")this.start!==this.i&&this.handler.onText(this.content.substring(this.start,this.i)),this.start=++this.i,this.state=this.tagName;else if("/"===t||"!"===t||"?"===t){this.start!==this.i&&this.handler.onText(this.content.substring(this.start,this.i));var i=this.content[this.i+2];if("/"===t&&(i>="a"&&i<="z"||i>="A"&&i<="Z"))return this.i+=2,this.start=this.i,void(this.state=this.endTag);var e="--\x3e";"!"===t&&"-"===this.content[this.i+2]&&"-"===this.content[this.i+3]||(e=">"),this.i=this.content.indexOf(e,this.i),-1!==this.i&&(this.i+=e.length,this.start=this.i)}else this.i++},a.prototype.tagName=function(){if(d[this.content[this.i]]){for(this.handler.onTagName(this.content.substring(this.start,this.i));d[this.content[++this.i]];);this.i<this.content.length&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)}else this.checkClose("onTagName")||this.i++},a.prototype.attrName=function(){var t=this.content[this.i];if(d[t]||"="===t){this.handler.onAttrName(this.content.substring(this.start,this.i));for(var i="="===t,e=this.content.length;++this.i<e;)if(t=this.content[this.i],!d[t]){if(this.checkClose())return;if(i)return this.start=this.i,void(this.state=this.attrVal);if("="!==this.content[this.i])return this.start=this.i,void(this.state=this.attrName);i=!0}}else this.checkClose("onAttrName")||this.i++},a.prototype.attrVal=function(){var t=this.content[this.i],i=this.content.length;if('"'===t||"'"===t){if(this.start=++this.i,this.i=this.content.indexOf(t,this.i),-1===this.i)return;this.handler.onAttrVal(this.content.substring(this.start,this.i))}else for(;this.i<i;this.i++){if(d[this.content[this.i]]){this.handler.onAttrVal(this.content.substring(this.start,this.i));break}if(this.checkClose("onAttrVal"))return}for(;d[this.content[++this.i]];);this.i<i&&!this.checkClose()&&(this.start=this.i,this.state=this.attrName)},a.prototype.endTag=function(){var t=this.content[this.i];if(d[t]||">"===t||"/"===t){if(this.handler.onCloseTag(this.content.substring(this.start,this.i)),">"!==t&&(this.i=this.content.indexOf(">",this.i),-1===this.i))return;this.start=++this.i,this.state=this.text}else this.i++},module.exports=s;