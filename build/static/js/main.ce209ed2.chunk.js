(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{126:function(e,t,a){},136:function(e,t,a){e.exports=a.p+"static/media/t3logo.a4f1a328.png"},145:function(e,t,a){e.exports=a(603)},150:function(e,t,a){},152:function(e,t,a){},548:function(e,t,a){},603:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(43),s=a.n(o),l=(a(150),a(37)),c=a(38),i=a(41),u=a(39),m=a(42),d=a(8),h=a(609),p=a(610),b=(a(152),a(16)),f=function(e){function t(){return Object(l.a)(this,t),Object(i.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(c.a)(t,[{key:"signIn",value:function(){var e=b.b.configure(),t=e.oauth,a=t.domain,n=t.redirectSignIn,r=(t.redirectSignOut,"https://"+a+"/oauth2/authorize?redirect_uri="+n+"&response_type="+t.responseType+"&client_id="+e.userPoolWebClientId+"&identity_provider=UAIdP");window.location.assign(r)}},{key:"render",value:function(){return r.a.createElement(p.a,{variant:this.props.variant?this.props.variant:"primary",size:this.props.size?this.props.size:"default",onClick:this.signIn},this.props.children)}}]),t}(n.Component),E="production"===Object({NODE_ENV:"production",PUBLIC_URL:"/antigen-testing"}).REACT_APP_STAGE?{apiGateway:{REGION:"us-gov-west-1",URL:"https://7zj1u3rfy9.execute-api.us-gov-west-1.amazonaws.com/prd"},cognito:{REGION:"us-gov-west-1",USER_POOL_ID:"us-gov-west-1_Yerqo6rUv",APP_CLIENT_ID:"4e450ll69pq651l3o3dkjsda5g",DOMAIN:"ctrds.auth-fips.us-gov-west-1.amazoncognito.com",REDIRECT_SIGNIN:"https://towicode.github.io/antigen/",REDIRECT_SIGNOUT:"https://shibboleth.arizona.edu/cgi-bin/logout.pl"}}:{apiGateway:{REGION:"us-west-2",URL:"https://9bm89pl9ak.execute-api.us-west-2.amazonaws.com/dev"},cognito:{REGION:"us-west-2",USER_POOL_ID:"us-west-2_s5072pJC9",APP_CLIENT_ID:"14tnphml63ovpdvmq9vo3093pu",DOMAIN:"applinnov.auth.us-west-2.amazoncognito.com",REDIRECT_SIGNIN:"http://localhost:4200/",REDIRECT_SIGNOUT:"https://shibboleth.arizona.edu/cgi-bin/logout.pl"}},v={apiGateway:E.apiGateway,cognito:E.cognito},g=function(){return b.b.currentSession().then(function(e){var t={headers:{Authorization:e.idToken.jwtToken}};return b.a.get("authzVialScanner","/authzVialScanner",t).then(function(e){return!0}).catch(function(e){return console.log(e),console.log("Error in authz API call: "+e.response),!1})}).catch(function(e){return console.log("Error in Auth.currentSession: "+e.response),!1})},y=a(611),S=a(612),O=(a(548),function(){return r.a.createElement("div",{className:"NotFound"},r.a.createElement("h3",null,"Sorry, page not found!"))}),N=a(32),w=a.n(N),k=a(46),j=a(60),I=a.n(j),C=(a(119),a(126),a(35)),D=(a(127),function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e)))._handleKeyDown=function(e){if("Backspace"==e.key)return a.st0buffer="",a.buffer="",void a.setState({barcode:"",tempCassetteBarcode:"",cassetteBarcode:""});if("Enter"==e.key){if(0==a.state.formState&&(a.st0buffer.length>5?(console.log("subbmiting with "+a.st0buffer),a.handleSubmit(a.st0buffer),a.st0buffer="",a.setState({barcode:""})):(a.st0buffer="",a.setState({barcode:""}),C.b.info("Unknown enter press detected, resetting...",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}))),1==a.state.formState)return a.buffer.length>10?(a.verify(),void e.preventDefault()):a.buffer.startsWith("r")?(a.preject(),void e.preventDefault()):a.buffer.startsWith("x")&&1==a.state.formState?(a.buffer="",a.cancel(),void e.preventDefault()):(a.buffer="",void e.preventDefault());if(console.log(a.state.formState),2==a.state.formState){if(console.log("HELLOO"),console.log(a.buffer),a.buffer.startsWith("x"))return a.buffer="",a.rejectCancel(),void e.preventDefault();if(a.buffer.startsWith("y"))return a.reject(),void e.preventDefault()}}return 1===e.key.length?(console.log(e.key),0==a.state.formState?(a.st0buffer+=e.key,a.setState({barcode:a.st0buffer}),void e.preventDefault()):1==a.state.formState?(a.buffer+=e.key,a.setState({tempCassetteBarcode:a.buffer}),void e.preventDefault()):2==a.state.formState?(a.buffer+=e.key,a.setState({tempCassetteBarcode:a.buffer}),void e.preventDefault()):void e.preventDefault()):void 0},a.state={formState:0,barcode:"",fname:"",lname:"",dob:"",uid:"",spinner:!1,err:"",cassetteBarcode:null,tempCassetteBarcode:"",vialBarcodeFinal:""},a.buffer="",a.st0buffer="",a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a.verify=a.verify.bind(Object(d.a)(Object(d.a)(a))),a.cancel=a.cancel.bind(Object(d.a)(Object(d.a)(a))),a.reject=a.reject.bind(Object(d.a)(Object(d.a)(a))),a.preject=a.preject.bind(Object(d.a)(Object(d.a)(a))),a.resetAll=a.resetAll.bind(Object(d.a)(Object(d.a)(a))),a.rejectCancel=a.rejectCancel.bind(Object(d.a)(Object(d.a)(a))),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"resetAll",value:function(){this.setState({formState:0,barcode:"",fname:"",lname:"",dob:"",uid:"",spinner:!1,err:"",cassetteBarcode:null,tempCassetteBarcode:"",vialBarcodeFinal:""})}},{key:"componentDidUpdate",value:function(){document.addEventListener("keydown",this._handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this._handleKeyDown)}},{key:"handleSubmit",value:function(e){var t=this;this.setState({vialBarcodeFinal:e,spinner:!0}),b.b.currentSession().then(function(){var a=Object(k.a)(w.a.mark(function a(n){var r,o,s,l;return w.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return r=n.idToken.jwtToken,o={headers:{Authorization:r,"Content-Type":"application/json"},body:{vialBarcode:e}},a.next=4,b.a.post("barcodeLookup","/barcodeLookup",o);case 4:s=a.sent,t.setState({formState:1,spinner:!1}),l=s.barcode,delete s.barcode,t.setState(s),t.setState({cassetteBarcode:l});case 10:case"end":return a.stop()}},a,this)}));return function(e){return a.apply(this,arguments)}}()).catch(function(e){return console.log("Error in Auth.currentSession: "+e),t.setState({spinner:!1}),[]})}},{key:"renderDormForm",value:function(){return r.a.createElement("div",null,r.a.createElement(C.a,{position:"top-center",autoClose:2e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),1==this.state.spinner?r.a.createElement(I.a,null):r.a.createElement("div",null,0==this.state.formState?r.a.createElement("div",null,r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,r.a.createElement("h2",null,"Vial Barcode #")),r.a.createElement("div",{className:"cursor"},r.a.createElement("i",null),r.a.createElement("input",{autoFocus:!0,ref:function(e){return e&&e.focus()},id:"bcode99",className:"formatted-input form-control",value:this.state.barcode}))),r.a.createElement("button",{type:"submit",value:"Submit",className:"btn btn-lg btn-blue mb-8 mt-4"}," Submit ")):null,r.a.createElement("div",null,1==this.state.formState?r.a.createElement("div",null,r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"NetID:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.uid))),r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"Name:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.lname,", ",this.state.fname))),r.a.createElement("tr",null,r.a.createElement("th",{id:"altfocus",scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"DOB:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.dob.substring(0,4),"/",this.state.dob.substring(4,6),"/",this.state.dob.substring(6,8)))),r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"Cassette:")),r.a.createElement("td",null,r.a.createElement("h2",null,null==this.state.cassetteBarcode?r.a.createElement("div",{className:"cursor"},r.a.createElement("i",null),r.a.createElement("input",{autoFocus:!0,ref:function(e){return e&&e.focus()},id:"bcode99",className:"formatted-input form-control",value:this.state.tempCassetteBarcode})):r.a.createElement("div",{style:{width:"400px",overflowX:"scroll",fontSize:"smaller"}},this.state.cassetteBarcode)))))),r.a.createElement("div",null,r.a.createElement("div",{className:"col-xs-4",style:{textAlign:"center"}},r.a.createElement("div",{className:"dropdown",style:{marginTop:"1.5rem !important"}},r.a.createElement("button",{className:"btn btn-default dropdown-toggle",style:{marginTop:"1.5em",height:"50px"},type:"button",id:"dropdownMenu1","data-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"true"},"More...",r.a.createElement("span",{className:"caret"})),r.a.createElement("ul",{className:"dropdown-menu","aria-labelledby":"dropdownMenu1"},r.a.createElement("li",null,r.a.createElement("a",{onClick:this.cancel,href:"#"},"Cancel")),r.a.createElement("li",null,r.a.createElement("a",{onClick:this.preject,href:"#"},"Reject")),r.a.createElement("li",{role:"separator",className:"divider"})))),r.a.createElement("div",{className:"col-xs-4",style:{textAlign:"center"}}),r.a.createElement("div",{className:"col-xs-4"},r.a.createElement("button",{onClick:this.verify,type:"button",style:{color:"white",background:"green"},className:"btn btn-btn btn-lg btn-blue mb-8 mt-4"},"Verify")))):null,2==this.state.formState?r.a.createElement("div",null,r.a.createElement("h2",null," Confirm Reject? "),r.a.createElement("div",{className:"col-xs-2"}),r.a.createElement("div",{className:"col-xs-4",style:{textAlign:"center"}},r.a.createElement("button",{onClick:this.reject,type:"button",className:"btn btn-lg btn-red mb-8 mt-4"},"Reject")),r.a.createElement("div",{className:"col-xs-4",style:{textAlign:"center"}},r.a.createElement("button",{onClick:this.rejectCancel,type:"button",className:"btn btn-lg btn-gray mb-8 mt-4"},"Cancel")),r.a.createElement("div",{className:"col-xs-2"})):null)))}},{key:"sendStatus",value:function(e){var t=this,a=""==this.buffer?this.state.cassetteBarcode:this.buffer;this.setState({spinner:!0}),b.b.currentSession().then(function(){var n=Object(k.a)(w.a.mark(function n(r){var o,s;return w.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return o=r.idToken.jwtToken,s={headers:{Authorization:o,"Content-Type":"application/json"},body:{cassetteBarcode:a,vialBarcode:t.state.vialBarcodeFinal,accepted:e}},t.buffer="",n.next=5,b.a.post("vialScannerStatus","/vialScannerStatus",s);case 5:t.resetAll(),e?C.b.success("\ud83e\udd84 Confirmed!",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}):C.b.error("\ud83e\udd2c Rejected!",{position:"top-center",autoClose:2e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0});case 7:case"end":return n.stop()}},n,this)}));return function(e){return n.apply(this,arguments)}}()).catch(function(e){return 400===e.response.status?(console.log(e.response.data),C.b.info(e.response.data.error,{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})):C.b.info("network error",{position:"top-center",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0}),t.setState({spinner:!1}),[]})}},{key:"verify",value:function(){this.sendStatus(!0)}},{key:"preject",value:function(){this.buffer="",this.setState({formState:2})}},{key:"reject",value:function(){this.sendStatus(!1)}},{key:"cancel",value:function(){this.resetAll()}},{key:"rejectCancel",value:function(){this.setState({formState:1})}},{key:"renderLander",value:function(){return r.a.createElement("div",{className:"lander"},r.a.createElement("h2",null,"COVID-19 Vial Scanner"),r.a.createElement("p",null,"Log-in with your NetID."),r.a.createElement(f,{variant:"primary",size:"lg"},"LOGIN"))}},{key:"renderUnauthorized",value:function(){return r.a.createElement("div",{className:"lander"},r.a.createElement("h2",null,"COVID-19 Vial Scanner"),r.a.createElement("p",null,"Log-in with your NetID"),r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"You do not have the appropriate permissions to use this application."))}},{key:"render",value:function(){return r.a.createElement("div",{className:"Home"},"signedIn"===this.props.authn&&this.props.authz&&this.renderDormForm(),"signedIn"===this.props.authn&&!this.props.authz&&this.renderUnauthorized(),"signedIn"!==this.props.authn&&this.renderLander())}}]),t}(n.Component)),x=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e)))._handleKeyDown=function(e){0!=a.state.formState&&(1==a.state.formState&&"Enter"==e.key&&a.setState({barcode:a.state.nextScan},function(){this.handleSubmit(null)}),e.altKey&&("v"==e.key&&a.verify(),"r"==e.key&&a.reject(),"c"==e.key&&a.cancel()))},a.state={formState:0,barcode:"",fname:"",lname:"",dob:"",uid:"",spinner:!1,nextScan:""},a.handleChange=a.handleChange.bind(Object(d.a)(Object(d.a)(a))),a.handleSubmit=a.handleSubmit.bind(Object(d.a)(Object(d.a)(a))),a.handleChangeNextScan=a.handleChangeNextScan.bind(Object(d.a)(Object(d.a)(a))),a.again=a.again.bind(Object(d.a)(Object(d.a)(a))),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidUpdate",value:function(){null!=document.getElementById("bcode99")&&document.getElementById("bcode99").focus(),document.addEventListener("keydown",this._handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this._handleKeyDown)}},{key:"handleChange",value:function(e){this.setState({barcode:e.target.value})}},{key:"handleChangeNextScan",value:function(e){this.setState({nextScan:e.target.value})}},{key:"handleSubmit",value:function(e){var t=this;this.setState({spinner:!0}),b.b.currentSession().then(function(){var e=Object(k.a)(w.a.mark(function e(a){var n,r,o;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=a.idToken.jwtToken,r={headers:{Authorization:n,"Content-Type":"application/json"},body:{cassetteBarcode:t.state.barcode}},e.next=4,b.a.post("barcodeLookup","/barcodeLookup",r);case 4:o=e.sent,t.setState({formState:1,spinner:!1,nextScan:""}),t.setState(o);case 7:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()).catch(function(e){return console.log("Error in Auth.currentSession: "+e),t.setState({spinner:!1}),[]}),null!=e&&e.preventDefault()}},{key:"renderDormForm",value:function(){return r.a.createElement("div",null,r.a.createElement(C.a,{position:"top-center",autoClose:2e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0}),1==this.state.spinner?r.a.createElement(I.a,null):r.a.createElement("div",null,0==this.state.formState?r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,r.a.createElement("h2",null,"Cassette Barcode #")),r.a.createElement("input",{autoFocus:!0,ref:function(e){return e&&e.focus()},id:"bcode99",className:"formatted-input form-control",value:this.state.barcode,onChange:this.handleChange})),r.a.createElement("input",{disabled:!1,type:"submit",value:"Submit",className:"btn btn-lg btn-blue mb-8 mt-4"})):null,r.a.createElement("div",null,1==this.state.formState?r.a.createElement("div",null,r.a.createElement("table",{className:"table table-bordered"},r.a.createElement("tbody",null,r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"NetID:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.uid))),r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"Name:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.lname,", ",this.state.fname))),r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"DOB:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.dob.substring(0,4),"/",this.state.dob.substring(4,6),"/",this.state.dob.substring(6,8)))),r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"Vial #:")),r.a.createElement("td",null,r.a.createElement("h2",null,this.state.barcode))),r.a.createElement("tr",null,r.a.createElement("th",{scope:"row",className:"bg-primary"},r.a.createElement("h2",{style:{color:"white"}},"Next Scan:")),r.a.createElement("td",null,r.a.createElement("h2",null,r.a.createElement("input",{autoFocus:!0,ref:function(e){return e&&e.focus()},id:"bcode99",className:"formatted-input form-control",value:this.state.nextScan,onChange:this.handleChangeNextScan})))))),r.a.createElement("div",null,r.a.createElement("div",{className:"col-xs-4"}),r.a.createElement("div",{className:"col-xs-4"},r.a.createElement("button",{onClick:this.again,type:"button",className:"btn btn-lg btn-green mb-8 mt-4"},"Again")),r.a.createElement("div",{className:"col-xs-4"}))):null)))}},{key:"again",value:function(){this.setState({formState:0,barcode:"",fname:"",lname:"",dob:"",uid:"",spinner:!1,nextScan:""})}},{key:"renderLander",value:function(){return r.a.createElement("div",{className:"lander"},r.a.createElement("h2",null,"COVID-19 Vial Scanner"),r.a.createElement("p",null,"Log-in with your NetID."),r.a.createElement(f,{variant:"primary",size:"lg"},"LOGIN"))}},{key:"renderUnauthorized",value:function(){return r.a.createElement("div",{className:"lander"},r.a.createElement("h2",null,"COVID-19 Vial Scanner"),r.a.createElement("p",null,"Log-in with your NetID"),r.a.createElement("div",{className:"alert alert-danger",role:"alert"},"You do not have the appropriate permissions to use this application."))}},{key:"render",value:function(){return r.a.createElement("div",{className:"Home"},"signedIn"===this.props.authn&&this.props.authz&&this.renderDormForm(),"signedIn"===this.props.authn&&!this.props.authz&&this.renderUnauthorized(),"signedIn"!==this.props.authn&&this.renderLander())}}]),t}(n.Component),A=a(140),z=function(e){var t=e.component,a=e.props,n=Object(A.a)(e,["component","props"]);return r.a.createElement(S.a,Object.assign({},n,{render:function(e){return r.a.createElement(t,Object.assign({},e,a))}}))},B=function(e){var t=e.childProps;return r.a.createElement(y.a,null,r.a.createElement(z,{path:"/",exact:!0,component:D,props:t}),r.a.createElement(z,{path:"/lab",exact:!0,component:D,props:t}),r.a.createElement(z,{path:"/check",exact:!0,component:x,props:t}),r.a.createElement(S.a,{component:O}))},L=a(136),T=a.n(L),_={domain:v.cognito.DOMAIN,scope:["phone","email","profile","openid","aws.cognito.signin.user.admin"],redirectSignIn:v.cognito.REDIRECT_SIGNIN,redirectSignOut:v.cognito.REDIRECT_SIGNOUT,responseType:"code"};b.d.configure({Auth:{oauth:_,region:v.cognito.REGION,userPoolId:v.cognito.USER_POOL_ID,userPoolWebClientId:v.cognito.APP_CLIENT_ID},API:{endpoints:[{name:"barcodeLookup",endpoint:v.apiGateway.URL,region:v.apiGateway.REGION},{name:"authzVialScanner",endpoint:v.apiGateway.URL,region:v.apiGateway.REGION},{name:"vialScannerStatus",endpoint:v.apiGateway.URL,region:v.apiGateway.REGION}]}});var R=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(i.a)(this,Object(u.a)(t).call(this,e))).signOut=a.signOut.bind(Object(d.a)(Object(d.a)(a))),a.refreshAuthNZ=a.refreshAuthNZ.bind(Object(d.a)(Object(d.a)(a))),a.state={authn:"loading",authz:!1},b.c.listen("auth",function(e){var t=e.payload;a.onAuthEvent(t)}),a}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.b.currentAuthenticatedUser().then(function(t){g().then(function(t){e.refreshAuthNZ({data:{authn:"signedIn",authz:t}})})}).catch(function(t){e.refreshAuthNZ({data:{authn:"signIn",authz:!1}})})}},{key:"onAuthEvent",value:function(e){var t=this;switch(e.event){case"signIn":g().then(function(e){t.refreshAuthNZ({data:{authn:"signedIn",authz:e}})});break;case"signIn_failure":this.refreshAuthNZ({data:{authn:"signIn",authz:!1}})}}},{key:"signOut",value:function(){this.refreshAuthNZ({data:{authn:"signIn",authz:!1}}),b.b.signOut({global:!0})}},{key:"refreshAuthNZ",value:function(e){console.log(e),this.setState({authn:e.data.authn}),this.setState({authz:e.data.authz})}},{key:"render",value:function(){var e=this.state.authn;return"loading"!==e&&r.a.createElement("div",{className:"App container"},r.a.createElement(h.a,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-md-3 col-xs-6 col-sm-4 my-2"},r.a.createElement("a",{href:"https://www.arizona.edu/test-trace-treat",title:"Test All Test Smart | Home",target:"_blank",className:"remove-external-link-icon"},r.a.createElement("img",{src:T.a,style:{maxWidth:"200px"},alt:"Test Trace Treat | Home"}))),r.a.createElement("div",{className:"col-md-1 col-md-offset-7 col-sm-1 col-sm-offset-6 col-xs-offset-2 col-xs-1"},"signIn"===e&&r.a.createElement(f,null,"Login"),"signedIn"===e&&r.a.createElement(p.a,{bsstyle:"primary",onClick:this.signOut},"Logout"))))),r.a.createElement(B,{childProps:{authn:this.state.authn,authz:this.state.authz}}))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var G=a(608);s.a.render(r.a.createElement(G.a,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},69:function(e,t){}},[[145,2,1]]]);
//# sourceMappingURL=main.ce209ed2.chunk.js.map