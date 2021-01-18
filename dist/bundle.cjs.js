"use strict";var e,t=(e=require("react"))&&"object"==typeof e&&"default"in e?e.default:e;function n(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function a(e){return(a=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function c(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function u(e,t){return!t||"object"!=typeof t&&"function"!=typeof t?c(e):t}function l(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=a(e);if(t){var o=a(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return u(this,n)}}var f=require("shaka-player/dist/shaka-player.ui.js"),d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(d,t.PureComponent);var r,o,a,u=l(d);function d(e){var n;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,d),(n=u.call(this,e)).videoRef=t.createRef(),n.videoContainer=t.createRef(),n.onErrorEvent=n.onErrorEvent.bind(c(n)),n.onError=n.onError.bind(c(n)),n}return r=d,(o=[{key:"onErrorEvent",value:function(e){this.onError(e.detail)}},{key:"onError",value:function(e){console.error("Error code",e.code,"object",e)}},{key:"componentDidMount",value:function(){var e=this.props,t=e.src,n=e.srcKey,r=e.authToken,o=e.seekTime,a=void 0===o?0:o,s=e.streamingConfig,c=e.abrConfig,u=e.restrictions,l=void 0===u?{}:u,d=e.drmConfig,p=e.uiConfig,h=e.onVideoEnd,v=e.onPlayFailed,y=e.getCurrentSeekTime,m=e.removeRightClick,b=e.disableControls,g=e.disableConsoleControls,E=this.videoRef.current,k=this.videoContainer.current,O=new f.Player(E);if(O.configure({streaming:i({},s),abr:i({},c),drm:i({},d),restrictions:i({},l)}),O.getNetworkingEngine().registerRequestFilter((function(e,t){2===e&&(t.uris[0]+="/".concat(n),t.headers["Content-Type"]="application/octet-stream",t.headers.Authorization="Bearer ".concat(r))})),new f.ui.Overlay(O,k,E,p).configure(p),b?(E.controls=!1,E.hasAttribute("controls")&&E.removeAttribute("controls"),E.style.pointerEvents="none"):E.controls=!0,m&&E.addEventListener("contextmenu",(function(e){e.preventDefault()}),!1),g&&(E.addEventListener("pause",(function(){E.play()})),E.addEventListener("timeupdate",(function(e){!0===e.currentTarget.controls&&(e.currentTarget.controls=!1)}))),E.onloadedmetadata=function(){!isNaN(a)&&a>E.duration&&h&&h()},E.addEventListener("loadeddata",(function(){var e;y&&y(),isNaN(a)||(E.currentTime=a),E.paused&&void 0!==(e=E.play())&&e.then((function(e){})).catch((function(){v&&v()}))})),O.addEventListener("error",this.onErrorEvent),O.load(t).then((function(){console.log("The video has now been loaded!")})).catch(this.onError),document.getElementsByClassName("shaka-video-container")[0].setAttribute("shaka-controls","true"),!document.getElementsByClassName("shaka-skim-container")[0]){var j=document.createElement("div");j.setAttribute("class","shaka-skim-container"),document.getElementsByClassName("shaka-controls-container")[0].insertBefore(j,document.getElementsByClassName("shaka-bottom-controls")[0])}var C=document.getElementsByClassName("shaka-settings-menu");C[0].classList.contains("shaka-hidden")||C[0].classList.add("shaka-hidden"),C[1].classList.contains("shaka-hidden")||C[1].classList.add("shaka-hidden")}},{key:"componentDidUpdate",value:function(e){if(e.seekTime!==this.props.seekTime){var t=this.videoRef.current;if(t.duration&&!isNaN(seekTime)){var n=this.props,r=n.seekTime,o=n.onVideoEnd;r>t.duration?o&&o():(t.currentTime=r,t.play())}}}},{key:"render",value:function(){var e=this.props.src;return t.createElement("div",{className:"video-container",ref:this.videoContainer},t.createElement("video",{className:"shaka-video",ref:this.videoRef,src:e,autoPlay:!0,style:{maxWidth:"100%"},playsInline:!0}))}}])&&n(r.prototype,o),a&&n(r,a),d}();module.exports=d;
