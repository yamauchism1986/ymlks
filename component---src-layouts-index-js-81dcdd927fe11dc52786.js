webpackJsonp([0x67ef26645b2a,60335399758886],{157:function(e,n){e.exports={layoutContext:{}}},324:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var a=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var o in t)Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o])}return e},l=t(1),i=o(l),r=t(338),d=o(r),c=t(157),s=o(c);n.default=function(e){return i.default.createElement(d.default,a({},e,s.default))},e.exports=n.default},328:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,n){return e.raw=n,e}n.__esModule=!0;var l=a(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin: 0 auto;\n  max-width: ",";\n"],["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  margin: 0 auto;\n  max-width: ",";\n"]),i=a(["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 100%;\n  border-top: 1px solid ",";\n  padding: 1em 0 2em;\n  margin: 0 1.5em;\n"],["\n  display: flex;\n  flex-flow: row wrap;\n  justify-content: space-between;\n  align-items: flex-start;\n  width: 100%;\n  border-top: 1px solid ",";\n  padding: 1em 0 2em;\n  margin: 0 1.5em;\n"]),r=a(["\n  display: inline-block;\n  padding: 0.25em 0;\n  width: 100%;\n  @media screen and (min-width: ",") {\n    width: auto;\n  }\n  a {\n    font-weight: 600;\n    transition: all 0.2s;\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n    &:visited {\n      color: ",";\n    }\n  }\n"],["\n  display: inline-block;\n  padding: 0.25em 0;\n  width: 100%;\n  @media screen and (min-width: ",") {\n    width: auto;\n  }\n  a {\n    font-weight: 600;\n    transition: all 0.2s;\n    color: ",";\n    &:hover {\n      color: ",";\n    }\n    &:visited {\n      color: ",";\n    }\n  }\n"]),d=t(1),c=o(d),s=t(7),u=o(s),f=u.default.footer(l,function(e){return e.theme.sizes.maxWidth}),m=u.default.ul(i,function(e){return e.theme.colors.secondary}),p=u.default.li(r,function(e){return e.theme.responsive.small},function(e){return e.theme.colors.base},function(e){return e.theme.colors.highlight},function(e){return e.theme.colors.base}),h=function(){return c.default.createElement(f,null,c.default.createElement(m,null,c.default.createElement(p,null,c.default.createElement("a",{href:"https://www.contentful.com/",rel:"nofollow noopener noreferrer",target:"_blank"},c.default.createElement("img",{src:"https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg",style:{width:"100px"},alt:"Powered by Contentful"}))),c.default.createElement(p,null,c.default.createElement("a",{href:"https://github.com/ryanwiemer/gatsby-starter-gcn",target:"_blank",rel:"noopener noreferrer"},"gatsby-starter-gcn")," ","by"," ",c.default.createElement("a",{href:"https://github.com/ryanwiemer",target:"_blank",rel:"noopener noreferrer"},"@ryanwiemer"))))};n.default=h,e.exports=n.default},330:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,n){return e.raw=n,e}n.__esModule=!0;var l=a(["\n  background: ",";\n  width: 100%;\n  padding: 1.5em 0;\n"],["\n  background: ",";\n  width: 100%;\n  padding: 1.5em 0;\n"]),i=a(["\n  width: 100%;\n  max-width: ",";\n  margin: 0 auto;\n  padding: 0 1.5em;\n\n  ul {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  li {\n    display: inline-block;\n    margin-left: 1em;\n    &:first-child {\n      position: relative;\n      margin: 0;\n      flex-basis: 100%;\n    }\n  }\n\n  a {\n    text-decoration: none;\n    color: DarkGray;\n    font-weight: 600;\n    transition: all 0.2s;\n    border-bottom: 2px solid ",";\n    &:hover {\n      color: white;\n    }\n  }\n"],["\n  width: 100%;\n  max-width: ",";\n  margin: 0 auto;\n  padding: 0 1.5em;\n\n  ul {\n    display: flex;\n    justify-content: space-between;\n  }\n\n  li {\n    display: inline-block;\n    margin-left: 1em;\n    &:first-child {\n      position: relative;\n      margin: 0;\n      flex-basis: 100%;\n    }\n  }\n\n  a {\n    text-decoration: none;\n    color: DarkGray;\n    font-weight: 600;\n    transition: all 0.2s;\n    border-bottom: 2px solid ",";\n    &:hover {\n      color: white;\n    }\n  }\n"]),r=t(1),d=o(r),c=t(35),s=o(c),u=t(7),f=o(u),m=f.default.header(l,function(e){return e.theme.colors.base}),p=f.default.nav(i,function(e){return e.theme.sizes.maxWidth},function(e){return e.theme.colors.base}),h={color:"white"},b=function(){return d.default.createElement(m,null,d.default.createElement(p,null,d.default.createElement("ul",null,d.default.createElement("li",null,d.default.createElement(s.default,{to:"/",exact:!0,activeStyle:h},"Home")),d.default.createElement("li",null,d.default.createElement(s.default,{to:"/about/",activeStyle:h},"About")),d.default.createElement("li",null,d.default.createElement(s.default,{to:"/contact/",activeStyle:h},"Contact")))))};n.default=b,e.exports=n.default},446:function(e,n,t){e.exports=t.p+"static/favicon.6c9cb8e2.ico"},338:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}n.__esModule=!0;var a=t(1),l=o(a),i=t(49),r=o(i),d=t(7),c=t(51),s=o(c);t(341);var u=t(342),f=o(u),m=t(330),p=o(m),h=t(328),b=(o(h),t(446)),g=o(b),w=function(e){var n=e.children;return l.default.createElement("div",{className:"siteRoot"},l.default.createElement(r.default,null,l.default.createElement("title",null,s.default.siteTitle),l.default.createElement("meta",{charSet:"utf-8"}),l.default.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),l.default.createElement("link",{rel:"icon",href:g.default}),l.default.createElement("meta",{name:"description",content:s.default.siteDescription}),l.default.createElement("meta",{property:"og:title",content:s.default.siteTitle}),l.default.createElement("meta",{property:"og:url",content:s.default.siteUrl}),l.default.createElement("meta",{property:"og:locale",content:"en_US"}),l.default.createElement("meta",{property:"og:type",content:"website"}),l.default.createElement("meta",{property:"og:site_name",content:s.default.siteTitle})),l.default.createElement(d.ThemeProvider,{theme:f.default},l.default.createElement("div",{className:"siteContent"},l.default.createElement(p.default,null),n())),l.default.createElement(d.ThemeProvider,{theme:f.default}),l.default.createElement("script",{src:"//accaii.com/yamaleaks/script.js",async:!0}),l.default.createElement("noscript",null,l.default.createElement("img",{src:"//accaii.com/yamaleaks/script?guid=on"})))};n.default=w,e.exports=n.default},341:function(e,n,t){"use strict";function o(e,n){return e.raw=n,e}var a=o(['\n  /* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n  */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed,\n  figure, figcaption, footer, header, hgroup,\n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n\n  /* Added to Fix Footer to bottom of viewport */\n  html, body {\n    height: 100%;\n  }\n  .siteRoot {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n  }\n  .siteContent {\n    flex: 1 0 auto;\n  }\n  footer {\n    width: 100%;\n  }\n\n  /* End Fix to Place Footer on Bottom of Viewport */\n\n  article, aside, details, figcaption, figure,\n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n\n  @media screen and (min-width: 35em) {\n    html {\n      margin-right: calc(-100vw + 100%);\n      overflow-x: hidden;\n    }\n  }\n\n  ol, ul {\n    list-style: none;\n  }\n\n  blockquote, q {\n    quotes: none;\n  }\n\n  blockquote::before, blockquote::after,\n  q::before, q::after {\n    content: \'\';\n    content: none;\n  }\n\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    background: white;\n    line-height: 1;\n    font-size: 100%;\n    font-variant-ligatures: none;\n    text-rendering: optimizeLegibility;\n    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;\n    font-weight: 400;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  }\n\n  img {\n    display: block;\n  \twidth: 100%;\n  \theight: auto;\n  }\n'],['\n  /* http://meyerweb.com/eric/tools/css/reset/\n   v2.0 | 20110126\n   License: none (public domain)\n  */\n  html, body, div, span, applet, object, iframe,\n  h1, h2, h3, h4, h5, h6, p, blockquote, pre,\n  a, abbr, acronym, address, big, cite, code,\n  del, dfn, em, img, ins, kbd, q, s, samp,\n  small, strike, strong, sub, sup, tt, var,\n  b, u, i, center,\n  dl, dt, dd, ol, ul, li,\n  fieldset, form, label, legend,\n  table, caption, tbody, tfoot, thead, tr, th, td,\n  article, aside, canvas, details, embed,\n  figure, figcaption, footer, header, hgroup,\n  menu, nav, output, ruby, section, summary,\n  time, mark, audio, video {\n    margin: 0;\n    padding: 0;\n    border: 0;\n    font-size: 100%;\n    font: inherit;\n    vertical-align: baseline;\n  }\n\n  /* Added to Fix Footer to bottom of viewport */\n  html, body {\n    height: 100%;\n  }\n  .siteRoot {\n    height: 100vh;\n    display: flex;\n    flex-direction: column;\n  }\n  .siteContent {\n    flex: 1 0 auto;\n  }\n  footer {\n    width: 100%;\n  }\n\n  /* End Fix to Place Footer on Bottom of Viewport */\n\n  article, aside, details, figcaption, figure,\n  footer, header, hgroup, menu, nav, section {\n    display: block;\n  }\n\n  @media screen and (min-width: 35em) {\n    html {\n      margin-right: calc(-100vw + 100%);\n      overflow-x: hidden;\n    }\n  }\n\n  ol, ul {\n    list-style: none;\n  }\n\n  blockquote, q {\n    quotes: none;\n  }\n\n  blockquote::before, blockquote::after,\n  q::before, q::after {\n    content: \'\';\n    content: none;\n  }\n\n  table {\n    border-collapse: collapse;\n    border-spacing: 0;\n  }\n\n  * {\n    box-sizing: border-box;\n  }\n\n  body {\n    background: white;\n    line-height: 1;\n    font-size: 100%;\n    font-variant-ligatures: none;\n    text-rendering: optimizeLegibility;\n    text-shadow: rgba(0, 0, 0, .01) 0 0 1px;\n    font-weight: 400;\n    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";\n  }\n\n  img {\n    display: block;\n  \twidth: 100%;\n  \theight: auto;\n  }\n']),l=t(7);(0,l.injectGlobal)(a)},342:function(e,n){"use strict";n.__esModule=!0;var t={colors:{base:"#121212",secondary:"#e9e9e9",tertiary:"#f3f3f3",highlight:"#5b8bf7"},sizes:{maxWidth:"1200px",maxWidthCentered:"650px"},responsive:{small:"35em",medium:"50em",large:"70em"}};n.default=t,e.exports=n.default}});
//# sourceMappingURL=component---src-layouts-index-js-81dcdd927fe11dc52786.js.map