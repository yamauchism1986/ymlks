webpackJsonp([0x67ef26645b2a,60335399758886],{157:function(e,n){e.exports={layoutContext:{}}},324:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},l=t(1),i=o(l),r=t(338),d=o(r),s=t(157),c=o(s);n.default=function(e){return i.default.createElement(d.default,a({},e,c.default))},e.exports=n.default},328:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,n){return e.raw=n,e}n.__esModule=!0;var l=a(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin: 0 auto;\n  max-width: ",";\n"],["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin: 0 auto;\n  max-width: ",";\n"]),i=a(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 100%;\n  border-top: 1px solid ",";\n  padding: 1em 0 2em;\n  margin: 0 1.5em;\n"],["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 100%;\n  border-top: 1px solid ",";\n  padding: 1em 0 2em;\n  margin: 0 1.5em;\n"]),r=a(["\n  display: inline-block;\n  padding: 0.25em 0;\n  width: 100%;\n  @media screen and (min-width: ",") {\n    width: auto;\n  }\n  a {\n    font-weight: 600;\n    transition: all 0.2s;\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n    &:visited {\n      color: ",";\n    }\n  }\n"],["\n  display: inline-block;\n  padding: 0.25em 0;\n  width: 100%;\n  @media screen and (min-width: ",") {\n    width: auto;\n  }\n  a {\n    font-weight: 600;\n    transition: all 0.2s;\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n    &:visited {\n      color: ",";\n    }\n  }\n"]),d=t(1),s=o(d),c=t(7),u=o(c),f=u.default.footer(l,function(e){return e.theme.sizes.maxWidth}),m=u.default.ul(i,function(e){return e.theme.colors.secondary}),h=u.default.li(r,function(e){return e.theme.responsive.small},function(e){return e.theme.colors.base},function(e){return e.theme.colors.highlight},function(e){return e.theme.colors.base}),p=function(){return s.default.createElement(f,null,s.default.createElement(m,null,s.default.createElement(h,null,s.default.createElement("a",{href:"https://www.contentful.com/",rel:"nofollow noopener noreferrer",target:"_blank"},s.default.createElement("img",{src:"https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg",style:{width:"100px"},alt:"Powered by Contentful"}))),s.default.createElement(h,null,s.default.createElement("a",{href:"https://github.com/ryanwiemer/gatsby-starter-gcn",target:"_blank",rel:"noopener noreferrer"},"gatsby-starter-gcn")," ","by"," ",s.default.createElement("a",{href:"https://github.com/ryanwiemer",target:"_blank",rel:"noopener noreferrer"},"@ryanwiemer"))))};n.default=p,e.exports=n.default},330:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,n){return e.raw=n,e}n.__esModule=!0;var l=a(["\n  background: ",";\n  width: 100%;\n  padding: 1.5em 0;\n"],["\n  background: ",";\n  width: 100%;\n  padding: 1.5em 0;\n"]),i=a(["\n  width: 100%;\n  max-width: ",";\n  margin: 0 auto;\n  padding: 0 1.5em;\n\n  ul {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  li {\n    display: inline-block;\n    margin-left: 1em;\n    &:first-child {\n      position: relative;\n      margin: 0;\n      flex-basis: 100%;\n    }\n  }\n\n  a {\n    text-decoration: none;\n    color: DarkGray;\n    font-weight: 600;\n    transition: all 0.2s;\n    border-bottom: 2px solid ",";\n    &:hover {\n      color: white;\n    }\n  }\n"],["\n  width: 100%;\n  max-width: ",";\n  margin: 0 auto;\n  padding: 0 1.5em;\n\n  ul {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  li {\n    display: inline-block;\n    margin-left: 1em;\n    &:first-child {\n      position: relative;\n      margin: 0;\n      flex-basis: 100%;\n    }\n  }\n\n  a {\n    text-decoration: none;\n    color: DarkGray;\n    font-weight: 600;\n    transition: all 0.2s;\n    border-bottom: 2px solid ",";\n    &:hover {\n      color: white;\n    }\n  }\n"]),r=t(1),d=o(r),s=t(35),c=o(s),u=t(7),f=o(u),m=f.default.header(l,function(e){return e.theme.colors.base}),h=f.default.nav(i,function(e){return e.theme.sizes.maxWidth},function(e){return e.theme.colors.base}),p={color:"white"},b=function(){return d.default.createElement(m,null,d.default.createElement(h,null,d.default.createElement("ul",null,d.default.createElement("li",null,d.default.createElement(c.default,{to:"/",exact:!0,activeStyle:p},"Home")),d.default.createElement("li",null,d.default.createElement(c.default,{to:"/about/",activeStyle:p},"About")),d.default.createElement("li",null,d.default.createElement(c.default,{to:"/contact/",activeStyle:p},"Contact")))))};n.default=b,e.exports=n.default},446:function(e,n,t){e.exports=t.p+"static/favicon.6c9cb8e2.ico"},338:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var a=t(1),l=o(a),i=t(49),r=o(i),d=t(7),s=t(51),c=o(s);t(341);var u=t(342),f=o(u),m=t(330),h=o(m),p=t(328),b=(o(p),t(446)),g=o(b),w=function(e){var n=e.children;return l.default.createElement("div",{className:"siteRoot"},l.default.createElement(r.default,null,l.default.createElement("title",null,c.default.siteTitle),l.default.createElement("meta",{charSet:"utf-8"}),l.default.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),l.default.createElement("link",{rel:"icon",href:g.default}),l.default.createElement("meta",{name:"description",content:c.default.siteDescription}),l.default.createElement("meta",{property:"og:title",content:c.default.siteTitle}),l.default.createElement("meta",{property:"og:url",content:c.default.siteUrl}),l.default.createElement("meta",{property:"og:locale",content:"en_US"}),l.default.createElement("meta",{property:"og:type",content:"website"}),l.default.createElement("meta",{property:"og:site_name",content:c.default.siteTitle})),l.default.createElement(d.ThemeProvider,{theme:f.default},l.default.createElement("div",{className:"siteContent"},l.default.createElement(h.default,null),n())),l.default.createElement(d.ThemeProvider,{theme:f.default}))};n.default=w,e.exports=n.default},341:function(e,n,t){"use strict";function o(e,n){return e.raw=n,e}var a=o(['\n  /* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n  */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed,\n  figure, figcaption, footer, header, hgroup,\n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n\n  /* Added to Fix Footer to bottom of viewport */\n  html, body {\n    height: 100%;\n  }\n  .siteRoot {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n  }\n  .siteContent {\n    flex: 1 0 auto;\n  }\n  footer {\n    width: 100%;\n  }\n\n  /* End Fix to Place Footer on Bottom of Viewport */\n\n  article, aside, details, figcaption, figure,\n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n\n  @media screen and (min-width: 35em) {\n    html {\n      margin-right: calc(-100vw + 100%);\n      overflow-x: hidden;\n    }\n  }\n\n  ol, ul {\n    list-style: none;\n  }\n\n  blockquote, q {\n    quotes: none;\n  }\n\n  blockquote::before, blockquote::after,\n  q::before, q::after {\n    content: \'\';\n    content: none;\n  }\n\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    background: white;\n    line-height: 1;\n    font-size: 100%;\n    font-variant-ligatures: none;\n    text-rendering: optimizeLegibility;\n    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;\n    font-weight: 400;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  }\n\n  img {\n    display: block;\n  \twidth: 100%;\n  \theight: auto;\n  }\n'],['\n  /* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n  */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed,\n  figure, figcaption, footer, header, hgroup,\n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n\n  /* Added to Fix Footer to bottom of viewport */\n  html, body {\n    height: 100%;\n  }\n  .siteRoot {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n  }\n  .siteContent {\n    flex: 1 0 auto;\n  }\n  footer {\n    width: 100%;\n  }\n\n  /* End Fix to Place Footer on Bottom of Viewport */\n\n  article, aside, details, figcaption, figure,\n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n\n  @media screen and (min-width: 35em) {\n    html {\n      margin-right: calc(-100vw + 100%);\n      overflow-x: hidden;\n    }\n  }\n\n  ol, ul {\n    list-style: none;\n  }\n\n  blockquote, q {\n    quotes: none;\n  }\n\n  blockquote::before, blockquote::after,\n  q::before, q::after {\n    content: \'\';\n    content: none;\n  }\n\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    background: white;\n    line-height: 1;\n    font-size: 100%;\n    font-variant-ligatures: none;\n    text-rendering: optimizeLegibility;\n    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;\n    font-weight: 400;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  }\n\n  img {\n    display: block;\n  \twidth: 100%;\n  \theight: auto;\n  }\n']),l=t(7);(0,l.injectGlobal)(a)},342:function(e,n){"use strict";n.__esModule=!0;var t={colors:{base:"#121212",secondary:"#e9e9e9",tertiary:"#f3f3f3",highlight:"#5b8bf7"},sizes:{maxWidth:"1200px",maxWidthCentered:"650px"},responsive:{small:"35em",medium:"50em",large:"70em"}};n.default=t,e.exports=n.default}});
//# sourceMappingURL=component---src-layouts-index-js-57a0917b116ed1c60969.js.map