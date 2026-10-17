var Co=r=>{throw TypeError(r)};var $c=(r,t,e)=>t.has(r)||Co("Cannot "+e);var Mr=(r,t,e)=>t.has(r)?Co("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e);var fn=(r,t,e)=>($c(r,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function i(n){if(n.ep)return;n.ep=!0;const s=e(n);fetch(n.href,s)}})();const to="180",Zc=0,Po=1,Jc=2,$l=1,Zl=2,yi=3,Hi=0,He=1,Ce=2,bi=0,an=1,be=2,Lo=3,Do=4,jc=5,tn=100,Qc=101,th=102,eh=103,ih=104,nh=200,sh=201,rh=202,ah=203,la=204,ca=205,oh=206,lh=207,ch=208,hh=209,uh=210,dh=211,fh=212,ph=213,mh=214,ha=0,ua=1,da=2,Fn=3,fa=4,pa=5,ma=6,ga=7,eo=0,gh=1,_h=2,Bi=0,Jl=1,jl=2,Ql=3,io=4,tc=5,ec=6,ic=7,nc=300,On=301,zn=302,_a=303,va=304,mr=306,hs=1e3,sn=1001,xa=1002,Ke=1003,vh=1004,Ss=1005,hi=1006,yr=1007,rn=1008,pi=1009,sc=1010,rc=1011,us=1012,no=1013,on=1014,ui=1015,Ti=1016,so=1017,ro=1018,ds=1020,ac=35902,oc=35899,lc=1021,cc=1022,ni=1023,fs=1026,ps=1027,ao=1028,oo=1029,hc=1030,lo=1031,co=1033,ir=33776,nr=33777,sr=33778,rr=33779,Ma=35840,ya=35841,Sa=35842,wa=35843,ba=36196,Ta=37492,Ea=37496,Aa=37808,Ra=37809,Ca=37810,Pa=37811,La=37812,Da=37813,Ia=37814,Ua=37815,Na=37816,Fa=37817,Oa=37818,za=37819,Ba=37820,ka=37821,Ha=36492,Ga=36494,Va=36495,Wa=36283,Xa=36284,qa=36285,Ya=36286,xh=3200,Mh=3201,ho=0,yh=1,Si="",we="srgb",Bn="srgb-linear",lr="linear",ee="srgb",pn=7680,Io=519,Sh=512,wh=513,bh=514,uc=515,Th=516,Eh=517,Ah=518,Rh=519,Ka=35044,Uo="300 es",di=2e3,cr=2001;class Wn{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const i=this._listeners;i[t]===void 0&&(i[t]=[]),i[t].indexOf(e)===-1&&i[t].push(e)}hasEventListener(t,e){const i=this._listeners;return i===void 0?!1:i[t]!==void 0&&i[t].indexOf(e)!==-1}removeEventListener(t,e){const i=this._listeners;if(i===void 0)return;const n=i[t];if(n!==void 0){const s=n.indexOf(e);s!==-1&&n.splice(s,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const i=e[t.type];if(i!==void 0){t.target=this;const n=i.slice(0);for(let s=0,a=n.length;s<a;s++)n[s].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Sr=Math.PI/180,hr=180/Math.PI;function ki(){const r=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Le[r&255]+Le[r>>8&255]+Le[r>>16&255]+Le[r>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[i&255]+Le[i>>8&255]+Le[i>>16&255]+Le[i>>24&255]).toLowerCase()}function Vt(r,t,e){return Math.max(t,Math.min(e,r))}function Ch(r,t){return(r%t+t)%t}function wr(r,t,e){return(1-e)*r+e*t}function ci(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function ne(r,t){switch(t.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("Invalid component type.")}}class ct{constructor(t=0,e=0){ct.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,i=this.y,n=t.elements;return this.x=n[0]*e+n[3]*i+n[6],this.y=n[1]*e+n[4]*i+n[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Vt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y;return e*e+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const i=Math.cos(e),n=Math.sin(e),s=this.x-t.x,a=this.y-t.y;return this.x=s*i-a*n+t.x,this.y=s*n+a*i+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xn{constructor(t=0,e=0,i=0,n=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=i,this._w=n}static slerpFlat(t,e,i,n,s,a,o){let l=i[n+0],c=i[n+1],h=i[n+2],u=i[n+3];const d=s[a+0],f=s[a+1],m=s[a+2],_=s[a+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(o===1){t[e+0]=d,t[e+1]=f,t[e+2]=m,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==m){let g=1-o;const p=l*d+c*f+h*m+u*_,b=p>=0?1:-1,T=1-p*p;if(T>Number.EPSILON){const A=Math.sqrt(T),R=Math.atan2(A,p*b);g=Math.sin(g*R)/A,o=Math.sin(o*R)/A}const y=o*b;if(l=l*g+d*y,c=c*g+f*y,h=h*g+m*y,u=u*g+_*y,g===1-o){const A=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=A,c*=A,h*=A,u*=A}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,i,n,s,a){const o=i[n],l=i[n+1],c=i[n+2],h=i[n+3],u=s[a],d=s[a+1],f=s[a+2],m=s[a+3];return t[e]=o*m+h*u+l*f-c*d,t[e+1]=l*m+h*d+c*u-o*f,t[e+2]=c*m+h*f+o*d-l*u,t[e+3]=h*m-o*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,i,n){return this._x=t,this._y=e,this._z=i,this._w=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const i=t._x,n=t._y,s=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(i/2),h=o(n/2),u=o(s/2),d=l(i/2),f=l(n/2),m=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"YXZ":this._x=d*h*u+c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"ZXY":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u-d*f*m;break;case"ZYX":this._x=d*h*u-c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u+d*f*m;break;case"YZX":this._x=d*h*u+c*f*m,this._y=c*f*u+d*h*m,this._z=c*h*m-d*f*u,this._w=c*h*u-d*f*m;break;case"XZY":this._x=d*h*u-c*f*m,this._y=c*f*u-d*h*m,this._z=c*h*m+d*f*u,this._w=c*h*u+d*f*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const i=e/2,n=Math.sin(i);return this._x=t.x*n,this._y=t.y*n,this._z=t.z*n,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,i=e[0],n=e[4],s=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=i+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(a-n)*f}else if(i>o&&i>u){const f=2*Math.sqrt(1+i-o-u);this._w=(h-l)/f,this._x=.25*f,this._y=(n+a)/f,this._z=(s+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-i-u);this._w=(s-c)/f,this._x=(n+a)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-i-o);this._w=(a-n)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let i=t.dot(e)+1;return i<1e-8?(i=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=i):(this._x=0,this._y=-t.z,this._z=t.y,this._w=i)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=i),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Vt(this.dot(t),-1,1)))}rotateTowards(t,e){const i=this.angleTo(t);if(i===0)return this;const n=Math.min(1,e/i);return this.slerp(t,n),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const i=t._x,n=t._y,s=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=i*h+a*o+n*c-s*l,this._y=n*h+a*l+s*o-i*c,this._z=s*h+a*c+i*l-n*o,this._w=a*h-i*o-n*l-s*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const i=this._x,n=this._y,s=this._z,a=this._w;let o=a*t._w+i*t._x+n*t._y+s*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=i,this._y=n,this._z=s,this;const l=1-o*o;if(l<=Number.EPSILON){const f=1-e;return this._w=f*a+e*this._w,this._x=f*i+e*this._x,this._y=f*n+e*this._y,this._z=f*s+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=a*u+this._w*d,this._x=i*u+this._x*d,this._y=n*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,i){return this.copy(t).slerp(e,i)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),i=Math.random(),n=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(n*Math.sin(t),n*Math.cos(t),s*Math.sin(e),s*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class x{constructor(t=0,e=0,i=0){x.prototype.isVector3=!0,this.x=t,this.y=e,this.z=i}set(t,e,i){return i===void 0&&(i=this.z),this.x=t,this.y=e,this.z=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(No.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(No.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[3]*i+s[6]*n,this.y=s[1]*e+s[4]*i+s[7]*n,this.z=s[2]*e+s[5]*i+s[8]*n,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=t.elements,a=1/(s[3]*e+s[7]*i+s[11]*n+s[15]);return this.x=(s[0]*e+s[4]*i+s[8]*n+s[12])*a,this.y=(s[1]*e+s[5]*i+s[9]*n+s[13])*a,this.z=(s[2]*e+s[6]*i+s[10]*n+s[14])*a,this}applyQuaternion(t){const e=this.x,i=this.y,n=this.z,s=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*n-o*i),h=2*(o*e-s*n),u=2*(s*i-a*e);return this.x=e+l*c+a*u-o*h,this.y=i+l*h+o*c-s*u,this.z=n+l*u+s*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,i=this.y,n=this.z,s=t.elements;return this.x=s[0]*e+s[4]*i+s[8]*n,this.y=s[1]*e+s[5]*i+s[9]*n,this.z=s[2]*e+s[6]*i+s[10]*n,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const i=t.x,n=t.y,s=t.z,a=e.x,o=e.y,l=e.z;return this.x=n*l-s*o,this.y=s*a-i*l,this.z=i*o-n*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const i=t.dot(this)/e;return this.copy(t).multiplyScalar(i)}projectOnPlane(t){return br.copy(this).projectOnVector(t),this.sub(br)}reflect(t){return this.sub(br.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const i=this.dot(t)/e;return Math.acos(Vt(i,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,i=this.y-t.y,n=this.z-t.z;return e*e+i*i+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,i){const n=Math.sin(e)*t;return this.x=n*Math.sin(i),this.y=Math.cos(e)*t,this.z=n*Math.cos(i),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,i){return this.x=t*Math.sin(e),this.y=i,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),i=this.setFromMatrixColumn(t,1).length(),n=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=i,this.z=n,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,i=Math.sqrt(1-e*e);return this.x=i*Math.cos(t),this.y=e,this.z=i*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const br=new x,No=new Xn;class zt{constructor(t,e,i,n,s,a,o,l,c){zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,l,c)}set(t,e,i,n,s,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=n,h[2]=o,h[3]=e,h[4]=s,h[5]=l,h[6]=i,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],this}extractBasis(t,e,i){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],m=i[8],_=n[0],g=n[3],p=n[6],b=n[1],T=n[4],y=n[7],A=n[2],R=n[5],P=n[8];return s[0]=a*_+o*b+l*A,s[3]=a*g+o*T+l*R,s[6]=a*p+o*y+l*P,s[1]=c*_+h*b+u*A,s[4]=c*g+h*T+u*R,s[7]=c*p+h*y+u*P,s[2]=d*_+f*b+m*A,s[5]=d*g+f*T+m*R,s[8]=d*p+f*y+m*P,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-i*s*h+i*o*l+n*s*c-n*a*l}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=h*a-o*c,d=o*l-h*s,f=c*s-a*l,m=e*u+i*d+n*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return t[0]=u*_,t[1]=(n*c-h*i)*_,t[2]=(o*i-n*a)*_,t[3]=d*_,t[4]=(h*e-n*l)*_,t[5]=(n*s-o*e)*_,t[6]=f*_,t[7]=(i*l-c*e)*_,t[8]=(a*e-i*s)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,i,n,s,a,o){const l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*a+c*o)+a+t,-n*c,n*l,-n*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Tr.makeScale(t,e)),this}rotate(t){return this.premultiply(Tr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Tr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,i,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<9;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<9;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Tr=new zt;function dc(r){for(let t=r.length-1;t>=0;--t)if(r[t]>=65535)return!0;return!1}function ur(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function Ph(){const r=ur("canvas");return r.style.display="block",r}const Fo={};function ms(r){r in Fo||(Fo[r]=!0,console.warn(r))}function Lh(r,t,e){return new Promise(function(i,n){function s(){switch(r.clientWaitSync(t,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:n();break;case r.TIMEOUT_EXPIRED:setTimeout(s,e);break;default:i()}}setTimeout(s,e)})}const Oo=new zt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),zo=new zt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Dh(){const r={enabled:!0,workingColorSpace:Bn,spaces:{},convert:function(n,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===ee&&(n.r=Ei(n.r),n.g=Ei(n.g),n.b=Ei(n.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(n.applyMatrix3(this.spaces[s].toXYZ),n.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===ee&&(n.r=Nn(n.r),n.g=Nn(n.g),n.b=Nn(n.b))),n},workingToColorSpace:function(n,s){return this.convert(n,this.workingColorSpace,s)},colorSpaceToWorking:function(n,s){return this.convert(n,s,this.workingColorSpace)},getPrimaries:function(n){return this.spaces[n].primaries},getTransfer:function(n){return n===Si?lr:this.spaces[n].transfer},getToneMappingMode:function(n){return this.spaces[n].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(n,s=this.workingColorSpace){return n.fromArray(this.spaces[s].luminanceCoefficients)},define:function(n){Object.assign(this.spaces,n)},_getMatrix:function(n,s,a){return n.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(n){return this.spaces[n].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(n=this.workingColorSpace){return this.spaces[n].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(n,s){return ms("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(n,s)},toWorkingColorSpace:function(n,s){return ms("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(n,s)}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],i=[.3127,.329];return r.define({[Bn]:{primaries:t,whitePoint:i,transfer:lr,toXYZ:Oo,fromXYZ:zo,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:we},outputColorSpaceConfig:{drawingBufferColorSpace:we}},[we]:{primaries:t,whitePoint:i,transfer:ee,toXYZ:Oo,fromXYZ:zo,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:we}}}),r}const $t=Dh();function Ei(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function Nn(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let mn;class Ih{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let i;if(t instanceof HTMLCanvasElement)i=t;else{mn===void 0&&(mn=ur("canvas")),mn.width=t.width,mn.height=t.height;const n=mn.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),i=mn}return i.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ur("canvas");e.width=t.width,e.height=t.height;const i=e.getContext("2d");i.drawImage(t,0,0,t.width,t.height);const n=i.getImageData(0,0,t.width,t.height),s=n.data;for(let a=0;a<s.length;a++)s[a]=Ei(s[a]/255)*255;return i.putImageData(n,0,0),e}else if(t.data){const e=t.data.slice(0);for(let i=0;i<e.length;i++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[i]=Math.floor(Ei(e[i]/255)*255):e[i]=Ei(e[i]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Uh=0;class uo{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=ki(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):e instanceof VideoFrame?t.set(e.displayHeight,e.displayWidth,0):e!==null?t.set(e.width,e.height,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const i={uuid:this.uuid,url:""},n=this.data;if(n!==null){let s;if(Array.isArray(n)){s=[];for(let a=0,o=n.length;a<o;a++)n[a].isDataTexture?s.push(Er(n[a].image)):s.push(Er(n[a]))}else s=Er(n);i.url=s}return e||(t.images[this.uuid]=i),i}}function Er(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?Ih.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Nh=0;const Ar=new x;class Ne extends Wn{constructor(t=Ne.DEFAULT_IMAGE,e=Ne.DEFAULT_MAPPING,i=sn,n=sn,s=hi,a=rn,o=ni,l=pi,c=Ne.DEFAULT_ANISOTROPY,h=Si){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=ki(),this.name="",this.source=new uo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=i,this.wrapT=n,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ct(0,0),this.repeat=new ct(1,1),this.center=new ct(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Ar).x}get height(){return this.source.getSize(Ar).y}get depth(){return this.source.getSize(Ar).z}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Texture.setValues(): property '${e}' does not exist.`);continue}n&&i&&n.isVector2&&i.isVector2||n&&i&&n.isVector3&&i.isVector3||n&&i&&n.isMatrix3&&i.isMatrix3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),e||(t.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case hs:t.x=t.x-Math.floor(t.x);break;case sn:t.x=t.x<0?0:1;break;case xa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case hs:t.y=t.y-Math.floor(t.y);break;case sn:t.y=t.y<0?0:1;break;case xa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Ne.DEFAULT_IMAGE=null;Ne.DEFAULT_MAPPING=nc;Ne.DEFAULT_ANISOTROPY=1;class se{constructor(t=0,e=0,i=0,n=1){se.prototype.isVector4=!0,this.x=t,this.y=e,this.z=i,this.w=n}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,i,n){return this.x=t,this.y=e,this.z=i,this.w=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,i=this.y,n=this.z,s=this.w,a=t.elements;return this.x=a[0]*e+a[4]*i+a[8]*n+a[12]*s,this.y=a[1]*e+a[5]*i+a[9]*n+a[13]*s,this.z=a[2]*e+a[6]*i+a[10]*n+a[14]*s,this.w=a[3]*e+a[7]*i+a[11]*n+a[15]*s,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,i,n,s;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],m=l[9],_=l[2],g=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,y=(f+1)/2,A=(p+1)/2,R=(h+d)/4,P=(u+_)/4,I=(m+g)/4;return T>y&&T>A?T<.01?(i=0,n=.707106781,s=.707106781):(i=Math.sqrt(T),n=R/i,s=P/i):y>A?y<.01?(i=.707106781,n=0,s=.707106781):(n=Math.sqrt(y),i=R/n,s=I/n):A<.01?(i=.707106781,n=.707106781,s=0):(s=Math.sqrt(A),i=P/s,n=I/s),this.set(i,n,s,e),this}let b=Math.sqrt((g-m)*(g-m)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(b)<.001&&(b=1),this.x=(g-m)/b,this.y=(u-_)/b,this.z=(d-h)/b,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Vt(this.x,t.x,e.x),this.y=Vt(this.y,t.y,e.y),this.z=Vt(this.z,t.z,e.z),this.w=Vt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Vt(this.x,t,e),this.y=Vt(this.y,t,e),this.z=Vt(this.z,t,e),this.w=Vt(this.w,t,e),this}clampLength(t,e){const i=this.length();return this.divideScalar(i||1).multiplyScalar(Vt(i,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,i){return this.x=t.x+(e.x-t.x)*i,this.y=t.y+(e.y-t.y)*i,this.z=t.z+(e.z-t.z)*i,this.w=t.w+(e.w-t.w)*i,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fh extends Wn{constructor(t=1,e=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:hi,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=i.depth,this.scissor=new se(0,0,t,e),this.scissorTest=!1,this.viewport=new se(0,0,t,e);const n={width:t,height:e,depth:i.depth},s=new Ne(n);this.textures=[];const a=i.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(t={}){const e={minFilter:hi,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,i=1){if(this.width!==t||this.height!==e||this.depth!==i){this.width=t,this.height=e,this.depth=i;for(let n=0,s=this.textures.length;n<s;n++)this.textures[n].image.width=t,this.textures[n].image.height=e,this.textures[n].image.depth=i,this.textures[n].isArrayTexture=this.textures[n].image.depth>1;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,i=t.textures.length;e<i;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const n=Object.assign({},t.textures[e].image);this.textures[e].source=new uo(n)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class si extends Fh{constructor(t=1,e=1,i={}){super(t,e,i),this.isWebGLRenderTarget=!0}}class fc extends Ne{constructor(t=null,e=1,i=1,n=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oh extends Ne{constructor(t=null,e=1,i=1,n=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:i,depth:n},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=sn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ie{constructor(t=new x(1/0,1/0,1/0),e=new x(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e+=3)this.expandByPoint(ti.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,i=t.count;e<i;e++)this.expandByPoint(ti.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,i=t.length;e<i;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const i=ti.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(i),this.max.copy(t).add(i),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const i=t.geometry;if(i!==void 0){const s=i.getAttribute("position");if(e===!0&&s!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,ti):ti.fromBufferAttribute(s,a),ti.applyMatrix4(t.matrixWorld),this.expandByPoint(ti);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ws.copy(i.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const n=t.children;for(let s=0,a=n.length;s<a;s++)this.expandByObject(n[s],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,ti),ti.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,i;return t.normal.x>0?(e=t.normal.x*this.min.x,i=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,i=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,i+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,i+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,i+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,i+=t.normal.z*this.min.z),e<=-t.constant&&i>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($n),bs.subVectors(this.max,$n),gn.subVectors(t.a,$n),_n.subVectors(t.b,$n),vn.subVectors(t.c,$n),Li.subVectors(_n,gn),Di.subVectors(vn,_n),Xi.subVectors(gn,vn);let e=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-Xi.z,Xi.y,Li.z,0,-Li.x,Di.z,0,-Di.x,Xi.z,0,-Xi.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-Xi.y,Xi.x,0];return!Rr(e,gn,_n,vn,bs)||(e=[1,0,0,0,1,0,0,0,1],!Rr(e,gn,_n,vn,bs))?!1:(Ts.crossVectors(Li,Di),e=[Ts.x,Ts.y,Ts.z],Rr(e,gn,_n,vn,bs))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,ti).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(ti).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(gi),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const gi=[new x,new x,new x,new x,new x,new x,new x,new x],ti=new x,ws=new Ie,gn=new x,_n=new x,vn=new x,Li=new x,Di=new x,Xi=new x,$n=new x,bs=new x,Ts=new x,qi=new x;function Rr(r,t,e,i,n){for(let s=0,a=r.length-3;s<=a;s+=3){qi.fromArray(r,s);const o=n.x*Math.abs(qi.x)+n.y*Math.abs(qi.y)+n.z*Math.abs(qi.z),l=t.dot(qi),c=e.dot(qi),h=i.dot(qi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const zh=new Ie,Zn=new x,Cr=new x;class hn{constructor(t=new x,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const i=this.center;e!==void 0?i.copy(e):zh.setFromPoints(t).getCenter(i);let n=0;for(let s=0,a=t.length;s<a;s++)n=Math.max(n,i.distanceToSquared(t[s]));return this.radius=Math.sqrt(n),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const i=this.center.distanceToSquared(t);return e.copy(t),i>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zn.subVectors(t,this.center);const e=Zn.lengthSq();if(e>this.radius*this.radius){const i=Math.sqrt(e),n=(i-this.radius)*.5;this.center.addScaledVector(Zn,n/i),this.radius+=n}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Cr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zn.copy(t.center).add(Cr)),this.expandByPoint(Zn.copy(t.center).sub(Cr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}const _i=new x,Pr=new x,Es=new x,Ii=new x,Lr=new x,As=new x,Dr=new x;class gr{constructor(t=new x,e=new x(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,_i)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const i=e.dot(this.direction);return i<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=_i.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(_i.copy(this.origin).addScaledVector(this.direction,e),_i.distanceToSquared(t))}distanceSqToSegment(t,e,i,n){Pr.copy(t).add(e).multiplyScalar(.5),Es.copy(e).sub(t).normalize(),Ii.copy(this.origin).sub(Pr);const s=t.distanceTo(e)*.5,a=-this.direction.dot(Es),o=Ii.dot(this.direction),l=-Ii.dot(Es),c=Ii.lengthSq(),h=Math.abs(1-a*a);let u,d,f,m;if(h>0)if(u=a*l-o,d=a*o-l,m=s*h,u>=0)if(d>=-m)if(d<=m){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;else d<=-m?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=m?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),n&&n.copy(Pr).addScaledVector(Es,d),f}intersectSphere(t,e){_i.subVectors(t.center,this.origin);const i=_i.dot(this.direction),n=_i.dot(_i)-i*i,s=t.radius*t.radius;if(n>s)return null;const a=Math.sqrt(s-n),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const i=-(this.origin.dot(t.normal)+t.constant)/e;return i>=0?i:null}intersectPlane(t,e){const i=this.distanceToPlane(t);return i===null?null:this.at(i,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let i,n,s,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(t.min.x-d.x)*c,n=(t.max.x-d.x)*c):(i=(t.max.x-d.x)*c,n=(t.min.x-d.x)*c),h>=0?(s=(t.min.y-d.y)*h,a=(t.max.y-d.y)*h):(s=(t.max.y-d.y)*h,a=(t.min.y-d.y)*h),i>a||s>n||((s>i||isNaN(i))&&(i=s),(a<n||isNaN(n))&&(n=a),u>=0?(o=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(o=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),i>l||o>n)||((o>i||i!==i)&&(i=o),(l<n||n!==n)&&(n=l),n<0)?null:this.at(i>=0?i:n,e)}intersectsBox(t){return this.intersectBox(t,_i)!==null}intersectTriangle(t,e,i,n,s){Lr.subVectors(e,t),As.subVectors(i,t),Dr.crossVectors(Lr,As);let a=this.direction.dot(Dr),o;if(a>0){if(n)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Ii.subVectors(this.origin,t);const l=o*this.direction.dot(As.crossVectors(Ii,As));if(l<0)return null;const c=o*this.direction.dot(Lr.cross(Ii));if(c<0||l+c>a)return null;const h=-o*Ii.dot(Dr);return h<0?null:this.at(h/a,s)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jt{constructor(t,e,i,n,s,a,o,l,c,h,u,d,f,m,_,g){jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,i,n,s,a,o,l,c,h,u,d,f,m,_,g)}set(t,e,i,n,s,a,o,l,c,h,u,d,f,m,_,g){const p=this.elements;return p[0]=t,p[4]=e,p[8]=i,p[12]=n,p[1]=s,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=m,p[11]=_,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jt().fromArray(this.elements)}copy(t){const e=this.elements,i=t.elements;return e[0]=i[0],e[1]=i[1],e[2]=i[2],e[3]=i[3],e[4]=i[4],e[5]=i[5],e[6]=i[6],e[7]=i[7],e[8]=i[8],e[9]=i[9],e[10]=i[10],e[11]=i[11],e[12]=i[12],e[13]=i[13],e[14]=i[14],e[15]=i[15],this}copyPosition(t){const e=this.elements,i=t.elements;return e[12]=i[12],e[13]=i[13],e[14]=i[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,i){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(t,e,i){return this.set(t.x,e.x,i.x,0,t.y,e.y,i.y,0,t.z,e.z,i.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,i=t.elements,n=1/xn.setFromMatrixColumn(t,0).length(),s=1/xn.setFromMatrixColumn(t,1).length(),a=1/xn.setFromMatrixColumn(t,2).length();return e[0]=i[0]*n,e[1]=i[1]*n,e[2]=i[2]*n,e[3]=0,e[4]=i[4]*s,e[5]=i[5]*s,e[6]=i[6]*s,e[7]=0,e[8]=i[8]*a,e[9]=i[9]*a,e[10]=i[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,i=t.x,n=t.y,s=t.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(n),c=Math.sin(n),h=Math.cos(s),u=Math.sin(s);if(t.order==="XYZ"){const d=a*h,f=a*u,m=o*h,_=o*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+m*c,e[5]=d-_*c,e[9]=-o*l,e[2]=_-d*c,e[6]=m+f*c,e[10]=a*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d+_*o,e[4]=m*o-f,e[8]=a*c,e[1]=a*u,e[5]=a*h,e[9]=-o,e[2]=f*o-m,e[6]=_+d*o,e[10]=a*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,m=c*h,_=c*u;e[0]=d-_*o,e[4]=-a*u,e[8]=m+f*o,e[1]=f+m*o,e[5]=a*h,e[9]=_-d*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const d=a*h,f=a*u,m=o*h,_=o*u;e[0]=l*h,e[4]=m*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-m,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const d=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=_-d*u,e[8]=m*u+f,e[1]=u,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=f*u+m,e[10]=d-_*u}else if(t.order==="XZY"){const d=a*l,f=a*c,m=o*l,_=o*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=a*h,e[9]=f*u-m,e[2]=m*u-f,e[6]=o*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Bh,t,kh)}lookAt(t,e,i){const n=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Ui.crossVectors(i,qe),Ui.lengthSq()===0&&(Math.abs(i.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Ui.crossVectors(i,qe)),Ui.normalize(),Rs.crossVectors(qe,Ui),n[0]=Ui.x,n[4]=Rs.x,n[8]=qe.x,n[1]=Ui.y,n[5]=Rs.y,n[9]=qe.y,n[2]=Ui.z,n[6]=Rs.z,n[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const i=t.elements,n=e.elements,s=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],m=i[2],_=i[6],g=i[10],p=i[14],b=i[3],T=i[7],y=i[11],A=i[15],R=n[0],P=n[4],I=n[8],w=n[12],S=n[1],L=n[5],U=n[9],B=n[13],V=n[2],W=n[6],k=n[10],q=n[14],X=n[3],rt=n[7],ft=n[11],Et=n[15];return s[0]=a*R+o*S+l*V+c*X,s[4]=a*P+o*L+l*W+c*rt,s[8]=a*I+o*U+l*k+c*ft,s[12]=a*w+o*B+l*q+c*Et,s[1]=h*R+u*S+d*V+f*X,s[5]=h*P+u*L+d*W+f*rt,s[9]=h*I+u*U+d*k+f*ft,s[13]=h*w+u*B+d*q+f*Et,s[2]=m*R+_*S+g*V+p*X,s[6]=m*P+_*L+g*W+p*rt,s[10]=m*I+_*U+g*k+p*ft,s[14]=m*w+_*B+g*q+p*Et,s[3]=b*R+T*S+y*V+A*X,s[7]=b*P+T*L+y*W+A*rt,s[11]=b*I+T*U+y*k+A*ft,s[15]=b*w+T*B+y*q+A*Et,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],i=t[4],n=t[8],s=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],m=t[3],_=t[7],g=t[11],p=t[15];return m*(+s*l*u-n*c*u-s*o*d+i*c*d+n*o*f-i*l*f)+_*(+e*l*f-e*c*d+s*a*d-n*a*f+n*c*h-s*l*h)+g*(+e*c*u-e*o*f-s*a*u+i*a*f+s*o*h-i*c*h)+p*(-n*o*h-e*l*u+e*o*d+n*a*u-i*a*d+i*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,i){const n=this.elements;return t.isVector3?(n[12]=t.x,n[13]=t.y,n[14]=t.z):(n[12]=t,n[13]=e,n[14]=i),this}invert(){const t=this.elements,e=t[0],i=t[1],n=t[2],s=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],m=t[12],_=t[13],g=t[14],p=t[15],b=u*g*c-_*d*c+_*l*f-o*g*f-u*l*p+o*d*p,T=m*d*c-h*g*c-m*l*f+a*g*f+h*l*p-a*d*p,y=h*_*c-m*u*c+m*o*f-a*_*f-h*o*p+a*u*p,A=m*u*l-h*_*l-m*o*d+a*_*d+h*o*g-a*u*g,R=e*b+i*T+n*y+s*A;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return t[0]=b*P,t[1]=(_*d*s-u*g*s-_*n*f+i*g*f+u*n*p-i*d*p)*P,t[2]=(o*g*s-_*l*s+_*n*c-i*g*c-o*n*p+i*l*p)*P,t[3]=(u*l*s-o*d*s-u*n*c+i*d*c+o*n*f-i*l*f)*P,t[4]=T*P,t[5]=(h*g*s-m*d*s+m*n*f-e*g*f-h*n*p+e*d*p)*P,t[6]=(m*l*s-a*g*s-m*n*c+e*g*c+a*n*p-e*l*p)*P,t[7]=(a*d*s-h*l*s+h*n*c-e*d*c-a*n*f+e*l*f)*P,t[8]=y*P,t[9]=(m*u*s-h*_*s-m*i*f+e*_*f+h*i*p-e*u*p)*P,t[10]=(a*_*s-m*o*s+m*i*c-e*_*c-a*i*p+e*o*p)*P,t[11]=(h*o*s-a*u*s-h*i*c+e*u*c+a*i*f-e*o*f)*P,t[12]=A*P,t[13]=(h*_*n-m*u*n+m*i*d-e*_*d-h*i*g+e*u*g)*P,t[14]=(m*o*n-a*_*n-m*i*l+e*_*l+a*i*g-e*o*g)*P,t[15]=(a*u*n-h*o*n+h*i*l-e*u*l-a*i*d+e*o*d)*P,this}scale(t){const e=this.elements,i=t.x,n=t.y,s=t.z;return e[0]*=i,e[4]*=n,e[8]*=s,e[1]*=i,e[5]*=n,e[9]*=s,e[2]*=i,e[6]*=n,e[10]*=s,e[3]*=i,e[7]*=n,e[11]*=s,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],i=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],n=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,i,n))}makeTranslation(t,e,i){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,i,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),i=Math.sin(t);return this.set(1,0,0,0,0,e,-i,0,0,i,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,0,i,0,0,1,0,0,-i,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),i=Math.sin(t);return this.set(e,-i,0,0,i,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const i=Math.cos(e),n=Math.sin(e),s=1-i,a=t.x,o=t.y,l=t.z,c=s*a,h=s*o;return this.set(c*a+i,c*o-n*l,c*l+n*o,0,c*o+n*l,h*o+i,h*l-n*a,0,c*l-n*o,h*l+n*a,s*l*l+i,0,0,0,0,1),this}makeScale(t,e,i){return this.set(t,0,0,0,0,e,0,0,0,0,i,0,0,0,0,1),this}makeShear(t,e,i,n,s,a){return this.set(1,i,s,0,t,1,a,0,e,n,1,0,0,0,0,1),this}compose(t,e,i){const n=this.elements,s=e._x,a=e._y,o=e._z,l=e._w,c=s+s,h=a+a,u=o+o,d=s*c,f=s*h,m=s*u,_=a*h,g=a*u,p=o*u,b=l*c,T=l*h,y=l*u,A=i.x,R=i.y,P=i.z;return n[0]=(1-(_+p))*A,n[1]=(f+y)*A,n[2]=(m-T)*A,n[3]=0,n[4]=(f-y)*R,n[5]=(1-(d+p))*R,n[6]=(g+b)*R,n[7]=0,n[8]=(m+T)*P,n[9]=(g-b)*P,n[10]=(1-(d+_))*P,n[11]=0,n[12]=t.x,n[13]=t.y,n[14]=t.z,n[15]=1,this}decompose(t,e,i){const n=this.elements;let s=xn.set(n[0],n[1],n[2]).length();const a=xn.set(n[4],n[5],n[6]).length(),o=xn.set(n[8],n[9],n[10]).length();this.determinant()<0&&(s=-s),t.x=n[12],t.y=n[13],t.z=n[14],ei.copy(this);const c=1/s,h=1/a,u=1/o;return ei.elements[0]*=c,ei.elements[1]*=c,ei.elements[2]*=c,ei.elements[4]*=h,ei.elements[5]*=h,ei.elements[6]*=h,ei.elements[8]*=u,ei.elements[9]*=u,ei.elements[10]*=u,e.setFromRotationMatrix(ei),i.x=s,i.y=a,i.z=o,this}makePerspective(t,e,i,n,s,a,o=di,l=!1){const c=this.elements,h=2*s/(e-t),u=2*s/(i-n),d=(e+t)/(e-t),f=(i+n)/(i-n);let m,_;if(l)m=s/(a-s),_=a*s/(a-s);else if(o===di)m=-(a+s)/(a-s),_=-2*a*s/(a-s);else if(o===cr)m=-a/(a-s),_=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,i,n,s,a,o=di,l=!1){const c=this.elements,h=2/(e-t),u=2/(i-n),d=-(e+t)/(e-t),f=-(i+n)/(i-n);let m,_;if(l)m=1/(a-s),_=a/(a-s);else if(o===di)m=-2/(a-s),_=-(a+s)/(a-s);else if(o===cr)m=-1/(a-s),_=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=_,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,i=t.elements;for(let n=0;n<16;n++)if(e[n]!==i[n])return!1;return!0}fromArray(t,e=0){for(let i=0;i<16;i++)this.elements[i]=t[i+e];return this}toArray(t=[],e=0){const i=this.elements;return t[e]=i[0],t[e+1]=i[1],t[e+2]=i[2],t[e+3]=i[3],t[e+4]=i[4],t[e+5]=i[5],t[e+6]=i[6],t[e+7]=i[7],t[e+8]=i[8],t[e+9]=i[9],t[e+10]=i[10],t[e+11]=i[11],t[e+12]=i[12],t[e+13]=i[13],t[e+14]=i[14],t[e+15]=i[15],t}}const xn=new x,ei=new jt,Bh=new x(0,0,0),kh=new x(1,1,1),Ui=new x,Rs=new x,qe=new x,Bo=new jt,ko=new Xn;class ke{constructor(t=0,e=0,i=0,n=ke.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=i,this._order=n}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,i,n=this._order){return this._x=t,this._y=e,this._z=i,this._order=n,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,i=!0){const n=t.elements,s=n[0],a=n[4],o=n[8],l=n[1],c=n[5],h=n[9],u=n[2],d=n[6],f=n[10];switch(e){case"XYZ":this._y=Math.asin(Vt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Vt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Vt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Vt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Vt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Vt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,i===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,i){return Bo.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Bo,e,i)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ko.setFromEuler(this),this.setFromQuaternion(ko,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ke.DEFAULT_ORDER="XYZ";class fo{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Hh=0;const Ho=new x,Mn=new Xn,vi=new jt,Cs=new x,Jn=new x,Gh=new x,Vh=new Xn,Go=new x(1,0,0),Vo=new x(0,1,0),Wo=new x(0,0,1),Xo={type:"added"},Wh={type:"removed"},yn={type:"childadded",child:null},Ir={type:"childremoved",child:null};class ce extends Wn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ce.DEFAULT_UP.clone();const t=new x,e=new ke,i=new Xn,n=new x(1,1,1);function s(){i.setFromEuler(e,!1)}function a(){e.setFromQuaternion(i,void 0,!1)}e._onChange(s),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:n},modelViewMatrix:{value:new jt},normalMatrix:{value:new zt}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new fo,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mn.setFromAxisAngle(t,e),this.quaternion.multiply(Mn),this}rotateOnWorldAxis(t,e){return Mn.setFromAxisAngle(t,e),this.quaternion.premultiply(Mn),this}rotateX(t){return this.rotateOnAxis(Go,t)}rotateY(t){return this.rotateOnAxis(Vo,t)}rotateZ(t){return this.rotateOnAxis(Wo,t)}translateOnAxis(t,e){return Ho.copy(t).applyQuaternion(this.quaternion),this.position.add(Ho.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Go,t)}translateY(t){return this.translateOnAxis(Vo,t)}translateZ(t){return this.translateOnAxis(Wo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vi.copy(this.matrixWorld).invert())}lookAt(t,e,i){t.isVector3?Cs.copy(t):Cs.set(t,e,i);const n=this.parent;this.updateWorldMatrix(!0,!1),Jn.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vi.lookAt(Jn,Cs,this.up):vi.lookAt(Cs,Jn,this.up),this.quaternion.setFromRotationMatrix(vi),n&&(vi.extractRotation(n.matrixWorld),Mn.setFromRotationMatrix(vi),this.quaternion.premultiply(Mn.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Xo),yn.child=t,this.dispatchEvent(yn),yn.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wh),Ir.child=t,this.dispatchEvent(Ir),Ir.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vi.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vi.multiply(t.parent.matrixWorld)),t.applyMatrix4(vi),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Xo),yn.child=t,this.dispatchEvent(yn),yn.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let i=0,n=this.children.length;i<n;i++){const a=this.children[i].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,i=[]){this[t]===e&&i.push(this);const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].getObjectsByProperty(t,e,i);return i}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jn,t,Gh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Jn,Vh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let i=0,n=e.length;i<n;i++)e[i].updateMatrixWorld(t)}updateWorldMatrix(t,e){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const n=this.children;for(let s=0,a=n.length;s<a;s++)n[s].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",i={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const n={};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.castShadow===!0&&(n.castShadow=!0),this.receiveShadow===!0&&(n.receiveShadow=!0),this.visible===!1&&(n.visible=!1),this.frustumCulled===!1&&(n.frustumCulled=!1),this.renderOrder!==0&&(n.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(n.userData=this.userData),n.layers=this.layers.mask,n.matrix=this.matrix.toArray(),n.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(n.matrixAutoUpdate=!1),this.isInstancedMesh&&(n.type="InstancedMesh",n.count=this.count,n.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(n.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(n.type="BatchedMesh",n.perObjectFrustumCulled=this.perObjectFrustumCulled,n.sortObjects=this.sortObjects,n.drawRanges=this._drawRanges,n.reservedRanges=this._reservedRanges,n.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),n.instanceInfo=this._instanceInfo.map(o=>({...o})),n.availableInstanceIds=this._availableInstanceIds.slice(),n.availableGeometryIds=this._availableGeometryIds.slice(),n.nextIndexStart=this._nextIndexStart,n.nextVertexStart=this._nextVertexStart,n.geometryCount=this._geometryCount,n.maxInstanceCount=this._maxInstanceCount,n.maxVertexCount=this._maxVertexCount,n.maxIndexCount=this._maxIndexCount,n.geometryInitialized=this._geometryInitialized,n.matricesTexture=this._matricesTexture.toJSON(t),n.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(n.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(n.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(n.boundingBox=this.boundingBox.toJSON()));function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?n.background=this.background.toJSON():this.background.isTexture&&(n.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(n.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){n.geometry=s(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];s(t.shapes,u)}else s(t.shapes,l)}}if(this.isSkinnedMesh&&(n.bindMode=this.bindMode,n.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(t.skeletons,this.skeleton),n.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(t.materials,this.material[l]));n.material=o}else n.material=s(t.materials,this.material);if(this.children.length>0){n.children=[];for(let o=0;o<this.children.length;o++)n.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){n.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];n.animations.push(s(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),u=a(t.shapes),d=a(t.skeletons),f=a(t.animations),m=a(t.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=n,i;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let i=0;i<t.children.length;i++){const n=t.children[i];this.add(n.clone())}return this}}ce.DEFAULT_UP=new x(0,1,0);ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const ii=new x,xi=new x,Ur=new x,Mi=new x,Sn=new x,wn=new x,qo=new x,Nr=new x,Fr=new x,Or=new x,zr=new se,Br=new se,kr=new se;class Qe{constructor(t=new x,e=new x,i=new x){this.a=t,this.b=e,this.c=i}static getNormal(t,e,i,n){n.subVectors(i,e),ii.subVectors(t,e),n.cross(ii);const s=n.lengthSq();return s>0?n.multiplyScalar(1/Math.sqrt(s)):n.set(0,0,0)}static getBarycoord(t,e,i,n,s){ii.subVectors(n,e),xi.subVectors(i,e),Ur.subVectors(t,e);const a=ii.dot(ii),o=ii.dot(xi),l=ii.dot(Ur),c=xi.dot(xi),h=xi.dot(Ur),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;const d=1/u,f=(c*l-o*h)*d,m=(a*h-o*l)*d;return s.set(1-f-m,m,f)}static containsPoint(t,e,i,n){return this.getBarycoord(t,e,i,n,Mi)===null?!1:Mi.x>=0&&Mi.y>=0&&Mi.x+Mi.y<=1}static getInterpolation(t,e,i,n,s,a,o,l){return this.getBarycoord(t,e,i,n,Mi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,Mi.x),l.addScaledVector(a,Mi.y),l.addScaledVector(o,Mi.z),l)}static getInterpolatedAttribute(t,e,i,n,s,a){return zr.setScalar(0),Br.setScalar(0),kr.setScalar(0),zr.fromBufferAttribute(t,e),Br.fromBufferAttribute(t,i),kr.fromBufferAttribute(t,n),a.setScalar(0),a.addScaledVector(zr,s.x),a.addScaledVector(Br,s.y),a.addScaledVector(kr,s.z),a}static isFrontFacing(t,e,i,n){return ii.subVectors(i,e),xi.subVectors(t,e),ii.cross(xi).dot(n)<0}set(t,e,i){return this.a.copy(t),this.b.copy(e),this.c.copy(i),this}setFromPointsAndIndices(t,e,i,n){return this.a.copy(t[e]),this.b.copy(t[i]),this.c.copy(t[n]),this}setFromAttributeAndIndices(t,e,i,n){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,i),this.c.fromBufferAttribute(t,n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return ii.subVectors(this.c,this.b),xi.subVectors(this.a,this.b),ii.cross(xi).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return Qe.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return Qe.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,i,n,s){return Qe.getInterpolation(t,this.a,this.b,this.c,e,i,n,s)}containsPoint(t){return Qe.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return Qe.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const i=this.a,n=this.b,s=this.c;let a,o;Sn.subVectors(n,i),wn.subVectors(s,i),Nr.subVectors(t,i);const l=Sn.dot(Nr),c=wn.dot(Nr);if(l<=0&&c<=0)return e.copy(i);Fr.subVectors(t,n);const h=Sn.dot(Fr),u=wn.dot(Fr);if(h>=0&&u<=h)return e.copy(n);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),e.copy(i).addScaledVector(Sn,a);Or.subVectors(t,s);const f=Sn.dot(Or),m=wn.dot(Or);if(m>=0&&f<=m)return e.copy(s);const _=f*c-l*m;if(_<=0&&c>=0&&m<=0)return o=c/(c-m),e.copy(i).addScaledVector(wn,o);const g=h*m-f*u;if(g<=0&&u-h>=0&&f-m>=0)return qo.subVectors(s,n),o=(u-h)/(u-h+(f-m)),e.copy(n).addScaledVector(qo,o);const p=1/(g+_+d);return a=_*p,o=d*p,e.copy(i).addScaledVector(Sn,a).addScaledVector(wn,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const pc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ni={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function Hr(r,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?r+(t-r)*6*e:e<1/2?t:e<2/3?r+(t-r)*6*(2/3-e):r}class It{constructor(t,e,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,i)}set(t,e,i){if(e===void 0&&i===void 0){const n=t;n&&n.isColor?this.copy(n):typeof n=="number"?this.setHex(n):typeof n=="string"&&this.setStyle(n)}else this.setRGB(t,e,i);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=we){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.colorSpaceToWorking(this,e),this}setRGB(t,e,i,n=$t.workingColorSpace){return this.r=t,this.g=e,this.b=i,$t.colorSpaceToWorking(this,n),this}setHSL(t,e,i,n=$t.workingColorSpace){if(t=Ch(t,1),e=Vt(e,0,1),i=Vt(i,0,1),e===0)this.r=this.g=this.b=i;else{const s=i<=.5?i*(1+e):i+e-i*e,a=2*i-s;this.r=Hr(a,s,t+1/3),this.g=Hr(a,s,t),this.b=Hr(a,s,t-1/3)}return $t.colorSpaceToWorking(this,n),this}setStyle(t,e=we){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let n;if(n=/^(\w+)\(([^\)]*)\)/.exec(t)){let s;const a=n[1],o=n[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,e);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,e);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(n=/^\#([A-Fa-f\d]+)$/.exec(t)){const s=n[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(s,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=we){const i=pc[t.toLowerCase()];return i!==void 0?this.setHex(i,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ei(t.r),this.g=Ei(t.g),this.b=Ei(t.b),this}copyLinearToSRGB(t){return this.r=Nn(t.r),this.g=Nn(t.g),this.b=Nn(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=we){return $t.workingToColorSpace(De.copy(this),t),Math.round(Vt(De.r*255,0,255))*65536+Math.round(Vt(De.g*255,0,255))*256+Math.round(Vt(De.b*255,0,255))}getHexString(t=we){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.workingToColorSpace(De.copy(this),e);const i=De.r,n=De.g,s=De.b,a=Math.max(i,n,s),o=Math.min(i,n,s);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case i:l=(n-s)/u+(n<s?6:0);break;case n:l=(s-i)/u+2;break;case s:l=(i-n)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=$t.workingColorSpace){return $t.workingToColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=we){$t.workingToColorSpace(De.copy(this),t);const e=De.r,i=De.g,n=De.b;return t!==we?`color(${t} ${e.toFixed(3)} ${i.toFixed(3)} ${n.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(i*255)},${Math.round(n*255)})`}offsetHSL(t,e,i){return this.getHSL(Ni),this.setHSL(Ni.h+t,Ni.s+e,Ni.l+i)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,i){return this.r=t.r+(e.r-t.r)*i,this.g=t.g+(e.g-t.g)*i,this.b=t.b+(e.b-t.b)*i,this}lerpHSL(t,e){this.getHSL(Ni),t.getHSL(Ps);const i=wr(Ni.h,Ps.h,e),n=wr(Ni.s,Ps.s,e),s=wr(Ni.l,Ps.l,e);return this.setHSL(i,n,s),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,i=this.g,n=this.b,s=t.elements;return this.r=s[0]*e+s[3]*i+s[6]*n,this.g=s[1]*e+s[4]*i+s[7]*n,this.b=s[2]*e+s[5]*i+s[8]*n,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new It;It.NAMES=pc;let Xh=0;class Ci extends Wn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=ki(),this.name="",this.type="Material",this.blending=an,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=la,this.blendDst=ca,this.blendEquation=tn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=Fn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Io,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pn,this.stencilZFail=pn,this.stencilZPass=pn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const i=t[e];if(i===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const n=this[e];if(n===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}n&&n.isColor?n.set(i):n&&n.isVector3&&i&&i.isVector3?n.copy(i):this[e]=i}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(t).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(t).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(t).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(t).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(t).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==an&&(i.blending=this.blending),this.side!==Hi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==la&&(i.blendSrc=this.blendSrc),this.blendDst!==ca&&(i.blendDst=this.blendDst),this.blendEquation!==tn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Fn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Io&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pn&&(i.stencilFail=this.stencilFail),this.stencilZFail!==pn&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==pn&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function n(s){const a=[];for(const o in s){const l=s[o];delete l.metadata,a.push(l)}return a}if(e){const s=n(t.textures),a=n(t.images);s.length>0&&(i.textures=s),a.length>0&&(i.images=a)}return i}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let i=null;if(e!==null){const n=e.length;i=new Array(n);for(let s=0;s!==n;++s)i[s]=e[s].clone()}return this.clippingPlanes=i,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class ue extends Ci{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ke,this.combine=eo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Se=new x,Ls=new ct;let qh=0;class Me{constructor(t,e,i=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:qh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=i,this.usage=Ka,this.updateRanges=[],this.gpuType=ui,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,i){t*=this.itemSize,i*=e.itemSize;for(let n=0,s=this.itemSize;n<s;n++)this.array[t+n]=e.array[i+n];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,i=this.count;e<i;e++)Ls.fromBufferAttribute(this,e),Ls.applyMatrix3(t),this.setXY(e,Ls.x,Ls.y);else if(this.itemSize===3)for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix3(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyMatrix4(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyMatrix4(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.applyNormalMatrix(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Se.fromBufferAttribute(this,e),Se.transformDirection(t),this.setXYZ(e,Se.x,Se.y,Se.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let i=this.array[t*this.itemSize+e];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.array[t*this.itemSize+e]=i,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ci(e,this.array)),e}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ci(e,this.array)),e}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ci(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ci(e,this.array)),e}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,i){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.array[t+0]=e,this.array[t+1]=i,this}setXYZ(t,e,i,n){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t*=this.itemSize,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.array[t+0]=e,this.array[t+1]=i,this.array[t+2]=n,this.array[t+3]=s,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ka&&(t.usage=this.usage),t}}class mc extends Me{constructor(t,e,i){super(new Uint16Array(t),e,i)}}class gc extends Me{constructor(t,e,i){super(new Uint32Array(t),e,i)}}class re extends Me{constructor(t,e,i){super(new Float32Array(t),e,i)}}let Yh=0;const Je=new jt,Gr=new ce,bn=new x,Ye=new Ie,jn=new Ie,Re=new x;class ye extends Wn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=ki(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(dc(t)?gc:mc)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,i=0){this.groups.push({start:t,count:e,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const i=this.attributes.normal;if(i!==void 0){const s=new zt().getNormalMatrix(t);i.applyNormalMatrix(s),i.needsUpdate=!0}const n=this.attributes.tangent;return n!==void 0&&(n.transformDirection(t),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Je.makeRotationFromQuaternion(t),this.applyMatrix4(Je),this}rotateX(t){return Je.makeRotationX(t),this.applyMatrix4(Je),this}rotateY(t){return Je.makeRotationY(t),this.applyMatrix4(Je),this}rotateZ(t){return Je.makeRotationZ(t),this.applyMatrix4(Je),this}translate(t,e,i){return Je.makeTranslation(t,e,i),this.applyMatrix4(Je),this}scale(t,e,i){return Je.makeScale(t,e,i),this.applyMatrix4(Je),this}lookAt(t){return Gr.lookAt(t),Gr.updateMatrix(),this.applyMatrix4(Gr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bn).negate(),this.translate(bn.x,bn.y,bn.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const i=[];for(let n=0,s=t.length;n<s;n++){const a=t[n];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new re(i,3))}else{const i=Math.min(t.length,e.count);for(let n=0;n<i;n++){const s=t[n];e.setXYZ(n,s.x,s.y,s.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ie);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new x(-1/0,-1/0,-1/0),new x(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let i=0,n=e.length;i<n;i++){const s=e[i];Ye.setFromBufferAttribute(s),this.morphTargetsRelative?(Re.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Re),Re.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Re)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hn);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new x,1/0);return}if(t){const i=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let s=0,a=e.length;s<a;s++){const o=e[s];jn.setFromBufferAttribute(o),this.morphTargetsRelative?(Re.addVectors(Ye.min,jn.min),Ye.expandByPoint(Re),Re.addVectors(Ye.max,jn.max),Ye.expandByPoint(Re)):(Ye.expandByPoint(jn.min),Ye.expandByPoint(jn.max))}Ye.getCenter(i);let n=0;for(let s=0,a=t.count;s<a;s++)Re.fromBufferAttribute(t,s),n=Math.max(n,i.distanceToSquared(Re));if(e)for(let s=0,a=e.length;s<a;s++){const o=e[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Re.fromBufferAttribute(o,c),l&&(bn.fromBufferAttribute(t,c),Re.add(bn)),n=Math.max(n,i.distanceToSquared(Re))}this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const i=e.position,n=e.normal,s=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Me(new Float32Array(4*i.count),4));const a=this.getAttribute("tangent"),o=[],l=[];for(let I=0;I<i.count;I++)o[I]=new x,l[I]=new x;const c=new x,h=new x,u=new x,d=new ct,f=new ct,m=new ct,_=new x,g=new x;function p(I,w,S){c.fromBufferAttribute(i,I),h.fromBufferAttribute(i,w),u.fromBufferAttribute(i,S),d.fromBufferAttribute(s,I),f.fromBufferAttribute(s,w),m.fromBufferAttribute(s,S),h.sub(c),u.sub(c),f.sub(d),m.sub(d);const L=1/(f.x*m.y-m.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(m.y).addScaledVector(u,-f.y).multiplyScalar(L),g.copy(u).multiplyScalar(f.x).addScaledVector(h,-m.x).multiplyScalar(L),o[I].add(_),o[w].add(_),o[S].add(_),l[I].add(g),l[w].add(g),l[S].add(g))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let I=0,w=b.length;I<w;++I){const S=b[I],L=S.start,U=S.count;for(let B=L,V=L+U;B<V;B+=3)p(t.getX(B+0),t.getX(B+1),t.getX(B+2))}const T=new x,y=new x,A=new x,R=new x;function P(I){A.fromBufferAttribute(n,I),R.copy(A);const w=o[I];T.copy(w),T.sub(A.multiplyScalar(A.dot(w))).normalize(),y.crossVectors(R,w);const L=y.dot(l[I])<0?-1:1;a.setXYZW(I,T.x,T.y,T.z,L)}for(let I=0,w=b.length;I<w;++I){const S=b[I],L=S.start,U=S.count;for(let B=L,V=L+U;B<V;B+=3)P(t.getX(B+0)),P(t.getX(B+1)),P(t.getX(B+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new Me(new Float32Array(e.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);const n=new x,s=new x,a=new x,o=new x,l=new x,c=new x,h=new x,u=new x;if(t)for(let d=0,f=t.count;d<f;d+=3){const m=t.getX(d+0),_=t.getX(d+1),g=t.getX(d+2);n.fromBufferAttribute(e,m),s.fromBufferAttribute(e,_),a.fromBufferAttribute(e,g),h.subVectors(a,s),u.subVectors(n,s),h.cross(u),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,_),c.fromBufferAttribute(i,g),o.add(h),l.add(h),c.add(h),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(_,l.x,l.y,l.z),i.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)n.fromBufferAttribute(e,d+0),s.fromBufferAttribute(e,d+1),a.fromBufferAttribute(e,d+2),h.subVectors(a,s),u.subVectors(n,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,i=t.count;e<i;e++)Re.fromBufferAttribute(t,e),Re.normalize(),t.setXYZ(e,Re.x,Re.y,Re.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h);let f=0,m=0;for(let _=0,g=l.length;_<g;_++){o.isInterleavedBufferAttribute?f=l[_]*o.data.stride+o.offset:f=l[_]*h;for(let p=0;p<h;p++)d[m++]=c[f++]}return new Me(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ye,i=this.index.array,n=this.attributes;for(const o in n){const l=n[o],c=t(l,i);e.setAttribute(o,c)}const s=this.morphAttributes;for(const o in s){const l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,i);l.push(f)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const i=this.attributes;for(const l in i){const c=i[l];t.data.attributes[l]=c.toJSON(t.data)}const n={};let s=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(n[l]=h,s=!0)}s&&(t.data.morphAttributes=n,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const i=t.index;i!==null&&this.setIndex(i.clone());const n=t.attributes;for(const c in n){const h=n[c];this.setAttribute(c,h.clone(e))}const s=t.morphAttributes;for(const c in s){const h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Yo=new jt,Yi=new gr,Ds=new hn,Ko=new x,Is=new x,Us=new x,Ns=new x,Vr=new x,Fs=new x,$o=new x,Os=new x;class O extends ce{constructor(t=new ye,e=new ue){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(t,e){const i=this.geometry,n=i.attributes.position,s=i.morphAttributes.position,a=i.morphTargetsRelative;e.fromBufferAttribute(n,t);const o=this.morphTargetInfluences;if(s&&o){Fs.set(0,0,0);for(let l=0,c=s.length;l<c;l++){const h=o[l],u=s[l];h!==0&&(Vr.fromBufferAttribute(u,t),a?Fs.addScaledVector(Vr,h):Fs.addScaledVector(Vr.sub(e),h))}e.add(Fs)}return e}raycast(t,e){const i=this.geometry,n=this.material,s=this.matrixWorld;n!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ds.copy(i.boundingSphere),Ds.applyMatrix4(s),Yi.copy(t.ray).recast(t.near),!(Ds.containsPoint(Yi.origin)===!1&&(Yi.intersectSphere(Ds,Ko)===null||Yi.origin.distanceToSquared(Ko)>(t.far-t.near)**2))&&(Yo.copy(s).invert(),Yi.copy(t.ray).applyMatrix4(Yo),!(i.boundingBox!==null&&Yi.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(t,e,Yi)))}_computeIntersections(t,e,i){let n;const s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),T=Math.min(o.count,Math.min(g.start+g.count,f.start+f.count));for(let y=b,A=T;y<A;y+=3){const R=o.getX(y),P=o.getX(y+1),I=o.getX(y+2);n=zs(this,p,t,i,c,h,u,R,P,I),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const m=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const b=o.getX(g),T=o.getX(g+1),y=o.getX(g+2);n=zs(this,a,t,i,c,h,u,b,T,y),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,_=d.length;m<_;m++){const g=d[m],p=a[g.materialIndex],b=Math.max(g.start,f.start),T=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let y=b,A=T;y<A;y+=3){const R=y,P=y+1,I=y+2;n=zs(this,p,t,i,c,h,u,R,P,I),n&&(n.faceIndex=Math.floor(y/3),n.face.materialIndex=g.materialIndex,e.push(n))}}else{const m=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let g=m,p=_;g<p;g+=3){const b=g,T=g+1,y=g+2;n=zs(this,a,t,i,c,h,u,b,T,y),n&&(n.faceIndex=Math.floor(g/3),e.push(n))}}}}function Kh(r,t,e,i,n,s,a,o){let l;if(t.side===He?l=i.intersectTriangle(a,s,n,!0,o):l=i.intersectTriangle(n,s,a,t.side===Hi,o),l===null)return null;Os.copy(o),Os.applyMatrix4(r.matrixWorld);const c=e.ray.origin.distanceTo(Os);return c<e.near||c>e.far?null:{distance:c,point:Os.clone(),object:r}}function zs(r,t,e,i,n,s,a,o,l,c){r.getVertexPosition(o,Is),r.getVertexPosition(l,Us),r.getVertexPosition(c,Ns);const h=Kh(r,t,e,i,Is,Us,Ns,$o);if(h){const u=new x;Qe.getBarycoord($o,Is,Us,Ns,u),n&&(h.uv=Qe.getInterpolatedAttribute(n,o,l,c,u,new ct)),s&&(h.uv1=Qe.getInterpolatedAttribute(s,o,l,c,u,new ct)),a&&(h.normal=Qe.getInterpolatedAttribute(a,o,l,c,u,new x),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new x,materialIndex:0};Qe.getNormal(Is,Us,Ns,d.normal),h.face=d,h.barycoord=u}return h}class lt extends ye{constructor(t=1,e=1,i=1,n=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:i,widthSegments:n,heightSegments:s,depthSegments:a};const o=this;n=Math.floor(n),s=Math.floor(s),a=Math.floor(a);const l=[],c=[],h=[],u=[];let d=0,f=0;m("z","y","x",-1,-1,i,e,t,a,s,0),m("z","y","x",1,-1,i,e,-t,a,s,1),m("x","z","y",1,1,t,i,e,n,a,2),m("x","z","y",1,-1,t,i,-e,n,a,3),m("x","y","z",1,-1,t,e,i,n,s,4),m("x","y","z",-1,-1,t,e,-i,n,s,5),this.setIndex(l),this.setAttribute("position",new re(c,3)),this.setAttribute("normal",new re(h,3)),this.setAttribute("uv",new re(u,2));function m(_,g,p,b,T,y,A,R,P,I,w){const S=y/P,L=A/I,U=y/2,B=A/2,V=R/2,W=P+1,k=I+1;let q=0,X=0;const rt=new x;for(let ft=0;ft<k;ft++){const Et=ft*L-B;for(let Gt=0;Gt<W;Gt++){const oe=Gt*S-U;rt[_]=oe*b,rt[g]=Et*T,rt[p]=V,c.push(rt.x,rt.y,rt.z),rt[_]=0,rt[g]=0,rt[p]=R>0?1:-1,h.push(rt.x,rt.y,rt.z),u.push(Gt/P),u.push(1-ft/I),q+=1}}for(let ft=0;ft<I;ft++)for(let Et=0;Et<P;Et++){const Gt=d+Et+W*ft,oe=d+Et+W*(ft+1),de=d+(Et+1)+W*(ft+1),Qt=d+(Et+1)+W*ft;l.push(Gt,oe,Qt),l.push(oe,de,Qt),X+=6}o.addGroup(f,X,w),f+=X,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function kn(r){const t={};for(const e in r){t[e]={};for(const i in r[e]){const n=r[e][i];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][i]=null):t[e][i]=n.clone():Array.isArray(n)?t[e][i]=n.slice():t[e][i]=n}}return t}function ze(r){const t={};for(let e=0;e<r.length;e++){const i=kn(r[e]);for(const n in i)t[n]=i[n]}return t}function $h(r){const t=[];for(let e=0;e<r.length;e++)t.push(r[e].clone());return t}function _c(r){const t=r.getRenderTarget();return t===null?r.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}const gs={clone:kn,merge:ze};var Zh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Jh=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Ue extends Ci{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Zh,this.fragmentShader=Jh,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=kn(t.uniforms),this.uniformsGroups=$h(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const n in this.uniforms){const a=this.uniforms[n].value;a&&a.isTexture?e.uniforms[n]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[n]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[n]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[n]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[n]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[n]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[n]={type:"m4",value:a.toArray()}:e.uniforms[n]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const i={};for(const n in this.extensions)this.extensions[n]===!0&&(i[n]=!0);return Object.keys(i).length>0&&(e.extensions=i),e}}class vc extends ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=di,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Fi=new x,Zo=new ct,Jo=new ct;class Be extends vc{constructor(t=50,e=1,i=.1,n=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=i,this.far=n,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=hr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Sr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return hr*2*Math.atan(Math.tan(Sr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,i){Fi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Fi.x,Fi.y).multiplyScalar(-t/Fi.z),Fi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Fi.x,Fi.y).multiplyScalar(-t/Fi.z)}getViewSize(t,e){return this.getViewBounds(t,Zo,Jo),e.subVectors(Jo,Zo)}setViewOffset(t,e,i,n,s,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Sr*.5*this.fov)/this.zoom,i=2*e,n=this.aspect*i,s=-.5*n;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*n/l,e-=a.offsetY*i/c,n*=a.width/l,i*=a.height/c}const o=this.filmOffset;o!==0&&(s+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+n,e,e-i,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Tn=-90,En=1;class jh extends ce{constructor(t,e,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;const n=new Be(Tn,En,t,e);n.layers=this.layers,this.add(n);const s=new Be(Tn,En,t,e);s.layers=this.layers,this.add(s);const a=new Be(Tn,En,t,e);a.layers=this.layers,this.add(a);const o=new Be(Tn,En,t,e);o.layers=this.layers,this.add(o);const l=new Be(Tn,En,t,e);l.layers=this.layers,this.add(l);const c=new Be(Tn,En,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[i,n,s,a,o,l]=e;for(const c of e)this.remove(c);if(t===di)i.up.set(0,1,0),i.lookAt(1,0,0),n.up.set(0,1,0),n.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===cr)i.up.set(0,-1,0),i.lookAt(-1,0,0),n.up.set(0,-1,0),n.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:i,activeMipmapLevel:n}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),m=t.xr.enabled;t.xr.enabled=!1;const _=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,t.setRenderTarget(i,0,n),t.render(e,s),t.setRenderTarget(i,1,n),t.render(e,a),t.setRenderTarget(i,2,n),t.render(e,o),t.setRenderTarget(i,3,n),t.render(e,l),t.setRenderTarget(i,4,n),t.render(e,c),i.texture.generateMipmaps=_,t.setRenderTarget(i,5,n),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=m,i.texture.needsPMREMUpdate=!0}}class xc extends Ne{constructor(t=[],e=On,i,n,s,a,o,l,c,h){super(t,e,i,n,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Qh extends si{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const i={width:t,height:t,depth:1},n=[i,i,i,i,i,i];this.texture=new xc(n),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},n=new lt(5,5,5),s=new Ue({name:"CubemapFromEquirect",uniforms:kn(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:He,blending:bi});s.uniforms.tEquirect.value=e;const a=new O(n,s),o=e.minFilter;return e.minFilter===rn&&(e.minFilter=hi),new jh(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,i=!0,n=!0){const s=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,i,n);t.setRenderTarget(s)}}class Jt extends ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const tu={type:"move"};class Wr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new x,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new x),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new x,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new x),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const i of t.hand.values())this._getHandJoint(e,i)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,i){let n=null,s=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const _ of t.hand.values()){const g=e.getJointPose(_,i),p=this._getHandJoint(c,_);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(s=e.getPose(t.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(n=e.getPose(t.targetRaySpace,i),n===null&&s!==null&&(n=s),n!==null&&(o.matrix.fromArray(n.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,n.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(n.linearVelocity)):o.hasLinearVelocity=!1,n.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(n.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(tu)))}return o!==null&&(o.visible=n!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const i=new Jt;i.matrixAutoUpdate=!1,i.visible=!1,t.joints[e.jointName]=i,t.add(i)}return t.joints[e.jointName]}}class po{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new It(t),this.density=e}clone(){return new po(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class mo extends ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ke,this.environmentIntensity=1,this.environmentRotation=new ke,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class eu{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ka,this.updateRanges=[],this.version=0,this.uuid=ki()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,i){t*=this.stride,i*=e.stride;for(let n=0,s=this.stride;n<s;n++)this.array[t+n]=e.array[i+n];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(e,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ki()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Oe=new x;class dr{constructor(t,e,i,n=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=i,this.normalized=n}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,i=this.data.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyMatrix4(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}applyNormalMatrix(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.applyNormalMatrix(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}transformDirection(t){for(let e=0,i=this.count;e<i;e++)Oe.fromBufferAttribute(this,e),Oe.transformDirection(t),this.setXYZ(e,Oe.x,Oe.y,Oe.z);return this}getComponent(t,e){let i=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(i=ci(i,this.array)),i}setComponent(t,e,i){return this.normalized&&(i=ne(i,this.array)),this.data.array[t*this.data.stride+this.offset+e]=i,this}setX(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ne(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ci(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ci(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ci(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ci(e,this.array)),e}setXY(t,e,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this}setXYZ(t,e,i,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this}setXYZW(t,e,i,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=ne(e,this.array),i=ne(i,this.array),n=ne(n,this.array),s=ne(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=i,this.data.array[t+2]=n,this.data.array[t+3]=s,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return new Me(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new dr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let i=0;i<this.count;i++){const n=i*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)e.push(this.data.array[n+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Ai extends Ci{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let An;const Qn=new x,Rn=new x,Cn=new x,Pn=new ct,ts=new ct,Mc=new jt,Bs=new x,es=new x,ks=new x,jo=new ct,Xr=new ct,Qo=new ct;class zi extends ce{constructor(t=new Ai){if(super(),this.isSprite=!0,this.type="Sprite",An===void 0){An=new ye;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new eu(e,5);An.setIndex([0,1,2,0,2,3]),An.setAttribute("position",new dr(i,3,0,!1)),An.setAttribute("uv",new dr(i,2,3,!1))}this.geometry=An,this.material=t,this.center=new ct(.5,.5),this.count=1}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Rn.setFromMatrixScale(this.matrixWorld),Mc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Cn.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Rn.multiplyScalar(-Cn.z);const i=this.material.rotation;let n,s;i!==0&&(s=Math.cos(i),n=Math.sin(i));const a=this.center;Hs(Bs.set(-.5,-.5,0),Cn,a,Rn,n,s),Hs(es.set(.5,-.5,0),Cn,a,Rn,n,s),Hs(ks.set(.5,.5,0),Cn,a,Rn,n,s),jo.set(0,0),Xr.set(1,0),Qo.set(1,1);let o=t.ray.intersectTriangle(Bs,es,ks,!1,Qn);if(o===null&&(Hs(es.set(-.5,.5,0),Cn,a,Rn,n,s),Xr.set(0,1),o=t.ray.intersectTriangle(Bs,ks,es,!1,Qn),o===null))return;const l=t.ray.origin.distanceTo(Qn);l<t.near||l>t.far||e.push({distance:l,point:Qn.clone(),uv:Qe.getInterpolation(Qn,Bs,es,ks,jo,Xr,Qo,new ct),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Hs(r,t,e,i,n,s){Pn.subVectors(r,e).addScalar(.5).multiply(i),n!==void 0?(ts.x=s*Pn.x-n*Pn.y,ts.y=n*Pn.x+s*Pn.y):ts.copy(Pn),r.copy(t),r.x+=ts.x,r.y+=ts.y,r.applyMatrix4(Mc)}class iu extends Ne{constructor(t=null,e=1,i=1,n,s,a,o,l,c=Ke,h=Ke,u,d){super(null,a,o,l,c,h,n,s,u,d),this.isDataTexture=!0,this.image={data:t,width:e,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class tl extends Me{constructor(t,e,i,n=1){super(t,e,i),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=n}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ln=new jt,el=new jt,Gs=[],il=new Ie,nu=new jt,is=new O,ns=new hn;class su extends O{constructor(t,e,i){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new tl(new Float32Array(i*16),16),this.instanceColor=null,this.morphTexture=null,this.count=i,this.boundingBox=null,this.boundingSphere=null;for(let n=0;n<i;n++)this.setMatrixAt(n,nu)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Ie),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ln),il.copy(t.boundingBox).applyMatrix4(Ln),this.boundingBox.union(il)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new hn),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let i=0;i<e;i++)this.getMatrixAt(i,Ln),ns.copy(t.boundingSphere).applyMatrix4(Ln),this.boundingSphere.union(ns)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const i=e.morphTargetInfluences,n=this.morphTexture.source.data.data,s=i.length+1,a=t*s+1;for(let o=0;o<i.length;o++)i[o]=n[a+o]}raycast(t,e){const i=this.matrixWorld,n=this.count;if(is.geometry=this.geometry,is.material=this.material,is.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ns.copy(this.boundingSphere),ns.applyMatrix4(i),t.ray.intersectsSphere(ns)!==!1))for(let s=0;s<n;s++){this.getMatrixAt(s,Ln),el.multiplyMatrices(i,Ln),is.matrixWorld=el,is.raycast(t,Gs);for(let a=0,o=Gs.length;a<o;a++){const l=Gs[a];l.instanceId=s,l.object=this,e.push(l)}Gs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new tl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const i=e.morphTargetInfluences,n=i.length+1;this.morphTexture===null&&(this.morphTexture=new iu(new Float32Array(n*this.count),n,this.count,ao,ui));const s=this.morphTexture.source.data.data;let a=0;for(let c=0;c<i.length;c++)a+=i[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=n*t;s[l]=o,s.set(i,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const qr=new x,ru=new x,au=new zt;class Ji{constructor(t=new x(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,i,n){return this.normal.set(t,e,i),this.constant=n,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,i){const n=qr.subVectors(i,e).cross(ru.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(n,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const i=t.delta(qr),n=this.normal.dot(i);if(n===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const s=-(t.start.dot(this.normal)+this.constant)/n;return s<0||s>1?null:e.copy(t.start).addScaledVector(i,s)}intersectsLine(t){const e=this.distanceToPoint(t.start),i=this.distanceToPoint(t.end);return e<0&&i>0||i<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const i=e||au.getNormalMatrix(t),n=this.coplanarPoint(qr).applyMatrix4(t),s=this.normal.applyMatrix3(i).normalize();return this.constant=-n.dot(s),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ki=new hn,ou=new ct(.5,.5),Vs=new x;class go{constructor(t=new Ji,e=new Ji,i=new Ji,n=new Ji,s=new Ji,a=new Ji){this.planes=[t,e,i,n,s,a]}set(t,e,i,n,s,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(i),o[3].copy(n),o[4].copy(s),o[5].copy(a),this}copy(t){const e=this.planes;for(let i=0;i<6;i++)e[i].copy(t.planes[i]);return this}setFromProjectionMatrix(t,e=di,i=!1){const n=this.planes,s=t.elements,a=s[0],o=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],m=s[8],_=s[9],g=s[10],p=s[11],b=s[12],T=s[13],y=s[14],A=s[15];if(n[0].setComponents(c-a,f-h,p-m,A-b).normalize(),n[1].setComponents(c+a,f+h,p+m,A+b).normalize(),n[2].setComponents(c+o,f+u,p+_,A+T).normalize(),n[3].setComponents(c-o,f-u,p-_,A-T).normalize(),i)n[4].setComponents(l,d,g,y).normalize(),n[5].setComponents(c-l,f-d,p-g,A-y).normalize();else if(n[4].setComponents(c-l,f-d,p-g,A-y).normalize(),e===di)n[5].setComponents(c+l,f+d,p+g,A+y).normalize();else if(e===cr)n[5].setComponents(l,d,g,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Ki.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Ki.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Ki)}intersectsSprite(t){Ki.center.set(0,0,0);const e=ou.distanceTo(t.center);return Ki.radius=.7071067811865476+e,Ki.applyMatrix4(t.matrixWorld),this.intersectsSphere(Ki)}intersectsSphere(t){const e=this.planes,i=t.center,n=-t.radius;for(let s=0;s<6;s++)if(e[s].distanceToPoint(i)<n)return!1;return!0}intersectsBox(t){const e=this.planes;for(let i=0;i<6;i++){const n=e[i];if(Vs.x=n.normal.x>0?t.max.x:t.min.x,Vs.y=n.normal.y>0?t.max.y:t.min.y,Vs.z=n.normal.z>0?t.max.z:t.min.z,n.distanceToPoint(Vs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let i=0;i<6;i++)if(e[i].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class yc extends Ci{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new It(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const fr=new x,pr=new x,nl=new jt,ss=new gr,Ws=new hn,Yr=new x,sl=new x;class lu extends ce{constructor(t=new ye,e=new yc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,i=[0];for(let n=1,s=e.count;n<s;n++)fr.fromBufferAttribute(e,n-1),pr.fromBufferAttribute(e,n),i[n]=i[n-1],i[n]+=fr.distanceTo(pr);t.setAttribute("lineDistance",new re(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Line.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Ws.copy(i.boundingSphere),Ws.applyMatrix4(n),Ws.radius+=s,t.ray.intersectsSphere(Ws)===!1)return;nl.copy(n).invert(),ss.copy(t.ray).applyMatrix4(nl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){const f=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=h.getX(_),b=h.getX(_+1),T=Xs(this,t,ss,l,p,b,_);T&&e.push(T)}if(this.isLineLoop){const _=h.getX(m-1),g=h.getX(f),p=Xs(this,t,ss,l,_,g,m-1);p&&e.push(p)}}else{const f=Math.max(0,a.start),m=Math.min(d.count,a.start+a.count);for(let _=f,g=m-1;_<g;_+=c){const p=Xs(this,t,ss,l,_,_+1,_);p&&e.push(p)}if(this.isLineLoop){const _=Xs(this,t,ss,l,m-1,f,m-1);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Xs(r,t,e,i,n,s,a){const o=r.geometry.attributes.position;if(fr.fromBufferAttribute(o,n),pr.fromBufferAttribute(o,s),e.distanceSqToSegment(fr,pr,Yr,sl)>i)return;Yr.applyMatrix4(r.matrixWorld);const c=t.ray.origin.distanceTo(Yr);if(!(c<t.near||c>t.far))return{distance:c,point:sl.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}class Sc extends Ci{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const rl=new jt,$a=new gr,qs=new hn,Ys=new x;class wc extends ce{constructor(t=new ye,e=new Sc){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const i=this.geometry,n=this.matrixWorld,s=t.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),qs.copy(i.boundingSphere),qs.applyMatrix4(n),qs.radius+=s,t.ray.intersectsSphere(qs)===!1)return;rl.copy(n).invert(),$a.copy(t.ray).applyMatrix4(rl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,u=i.attributes.position;if(c!==null){const d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,_=f;m<_;m++){const g=c.getX(m);Ys.fromBufferAttribute(u,g),al(Ys,g,l,n,t,e,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let m=d,_=f;m<_;m++)Ys.fromBufferAttribute(u,m),al(Ys,m,l,n,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,i=Object.keys(e);if(i.length>0){const n=e[i[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=n.length;s<a;s++){const o=n[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function al(r,t,e,i,n,s,a){const o=$a.distanceSqToPoint(r);if(o<e){const l=new x;$a.closestPointToPoint(r,l),l.applyMatrix4(i);const c=n.ray.origin.distanceTo(l);if(c<n.near||c>n.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class un extends Ne{constructor(t,e,i,n,s,a,o,l,c){super(t,e,i,n,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bc extends Ne{constructor(t,e,i=on,n,s,a,o=Ke,l=Ke,c,h=fs,u=1){if(h!==fs&&h!==ps)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:t,height:e,depth:u};super(d,n,s,a,o,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new uo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Tc extends Ne{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class Hn extends ye{constructor(t=1,e=32,i=0,n=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:i,thetaLength:n},e=Math.max(3,e);const s=[],a=[],o=[],l=[],c=new x,h=new ct;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=i+u/e*n;c.x=t*Math.cos(f),c.y=t*Math.sin(f),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/t+1)/2,h.y=(a[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new re(a,3)),this.setAttribute("normal",new re(o,3)),this.setAttribute("uv",new re(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Hn(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class me extends ye{constructor(t=1,e=1,i=1,n=32,s=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:i,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};const c=this;n=Math.floor(n),s=Math.floor(s);const h=[],u=[],d=[],f=[];let m=0;const _=[],g=i/2;let p=0;b(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(d,3)),this.setAttribute("uv",new re(f,2));function b(){const y=new x,A=new x;let R=0;const P=(e-t)/i;for(let I=0;I<=s;I++){const w=[],S=I/s,L=S*(e-t)+t;for(let U=0;U<=n;U++){const B=U/n,V=B*l+o,W=Math.sin(V),k=Math.cos(V);A.x=L*W,A.y=-S*i+g,A.z=L*k,u.push(A.x,A.y,A.z),y.set(W,P,k).normalize(),d.push(y.x,y.y,y.z),f.push(B,1-S),w.push(m++)}_.push(w)}for(let I=0;I<n;I++)for(let w=0;w<s;w++){const S=_[w][I],L=_[w+1][I],U=_[w+1][I+1],B=_[w][I+1];(t>0||w!==0)&&(h.push(S,L,B),R+=3),(e>0||w!==s-1)&&(h.push(L,U,B),R+=3)}c.addGroup(p,R,0),p+=R}function T(y){const A=m,R=new ct,P=new x;let I=0;const w=y===!0?t:e,S=y===!0?1:-1;for(let U=1;U<=n;U++)u.push(0,g*S,0),d.push(0,S,0),f.push(.5,.5),m++;const L=m;for(let U=0;U<=n;U++){const V=U/n*l+o,W=Math.cos(V),k=Math.sin(V);P.x=w*k,P.y=g*S,P.z=w*W,u.push(P.x,P.y,P.z),d.push(0,S,0),R.x=W*.5+.5,R.y=k*.5*S+.5,f.push(R.x,R.y),m++}for(let U=0;U<n;U++){const B=A+U,V=L+U;y===!0?h.push(V,V+1,B):h.push(V+1,V,B),I+=3}c.addGroup(p,I,y===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new me(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Pi{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const i=this.getUtoTmapping(t);return this.getPoint(i,e)}getPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPoint(i/t));return e}getSpacedPoints(t=5){const e=[];for(let i=0;i<=t;i++)e.push(this.getPointAt(i/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let i,n=this.getPoint(0),s=0;e.push(0);for(let a=1;a<=t;a++)i=this.getPoint(a/t),s+=i.distanceTo(n),e.push(s),n=i;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const i=this.getLengths();let n=0;const s=i.length;let a;e?a=e:a=t*i[s-1];let o=0,l=s-1,c;for(;o<=l;)if(n=Math.floor(o+(l-o)/2),c=i[n]-a,c<0)o=n+1;else if(c>0)l=n-1;else{l=n;break}if(n=l,i[n]===a)return n/(s-1);const h=i[n],d=i[n+1]-h,f=(a-h)/d;return(n+f)/(s-1)}getTangent(t,e){let n=t-1e-4,s=t+1e-4;n<0&&(n=0),s>1&&(s=1);const a=this.getPoint(n),o=this.getPoint(s),l=e||(a.isVector2?new ct:new x);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const i=this.getUtoTmapping(t);return this.getTangent(i,e)}computeFrenetFrames(t,e=!1){const i=new x,n=[],s=[],a=[],o=new x,l=new jt;for(let f=0;f<=t;f++){const m=f/t;n[f]=this.getTangentAt(m,new x)}s[0]=new x,a[0]=new x;let c=Number.MAX_VALUE;const h=Math.abs(n[0].x),u=Math.abs(n[0].y),d=Math.abs(n[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),o.crossVectors(n[0],i).normalize(),s[0].crossVectors(n[0],o),a[0].crossVectors(n[0],s[0]);for(let f=1;f<=t;f++){if(s[f]=s[f-1].clone(),a[f]=a[f-1].clone(),o.crossVectors(n[f-1],n[f]),o.length()>Number.EPSILON){o.normalize();const m=Math.acos(Vt(n[f-1].dot(n[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(o,m))}a[f].crossVectors(n[f],s[f])}if(e===!0){let f=Math.acos(Vt(s[0].dot(s[t]),-1,1));f/=t,n[0].dot(o.crossVectors(s[0],s[t]))>0&&(f=-f);for(let m=1;m<=t;m++)s[m].applyMatrix4(l.makeRotationAxis(n[m],f*m)),a[m].crossVectors(n[m],s[m])}return{tangents:n,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ec extends Pi{constructor(t=0,e=0,i=1,n=1,s=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=i,this.yRadius=n,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new ct){const i=e,n=Math.PI*2;let s=this.aEndAngle-this.aStartAngle;const a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=n;for(;s>n;)s-=n;s<Number.EPSILON&&(a?s=0:s=n),this.aClockwise===!0&&!a&&(s===n?s=-n:s=s-n);const o=this.aStartAngle+t*s;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class cu extends Ec{constructor(t,e,i,n,s,a){super(t,e,i,i,n,s,a),this.isArcCurve=!0,this.type="ArcCurve"}}function _o(){let r=0,t=0,e=0,i=0;function n(s,a,o,l){r=s,t=o,e=-3*s+3*a-2*o-l,i=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){n(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,f=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,f*=h,n(a,o,d,f)},calc:function(s){const a=s*s,o=a*s;return r+t*s+e*a+i*o}}}const Ks=new x,Kr=new _o,$r=new _o,Zr=new _o;class Ac extends Pi{constructor(t=[],e=!1,i="centripetal",n=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=i,this.tension=n}getPoint(t,e=new x){const i=e,n=this.points,s=n.length,a=(s-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/s)+1)*s:l===0&&o===s-1&&(o=s-2,l=1);let c,h;this.closed||o>0?c=n[(o-1)%s]:(Ks.subVectors(n[0],n[1]).add(n[0]),c=Ks);const u=n[o%s],d=n[(o+1)%s];if(this.closed||o+2<s?h=n[(o+2)%s]:(Ks.subVectors(n[s-1],n[s-2]).add(n[s-1]),h=Ks),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let m=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),m<1e-4&&(m=_),g<1e-4&&(g=_),Kr.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,m,_,g),$r.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,m,_,g),Zr.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,m,_,g)}else this.curveType==="catmullrom"&&(Kr.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),$r.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),Zr.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(Kr.calc(l),$r.calc(l),Zr.calc(l)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new x().fromArray(n))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ol(r,t,e,i,n){const s=(i-t)*.5,a=(n-e)*.5,o=r*r,l=r*o;return(2*e-2*i+s+a)*l+(-3*e+3*i-2*s-a)*o+s*r+e}function hu(r,t){const e=1-r;return e*e*t}function uu(r,t){return 2*(1-r)*r*t}function du(r,t){return r*r*t}function ls(r,t,e,i){return hu(r,t)+uu(r,e)+du(r,i)}function fu(r,t){const e=1-r;return e*e*e*t}function pu(r,t){const e=1-r;return 3*e*e*r*t}function mu(r,t){return 3*(1-r)*r*r*t}function gu(r,t){return r*r*r*t}function cs(r,t,e,i,n){return fu(r,t)+pu(r,e)+mu(r,i)+gu(r,n)}class _u extends Pi{constructor(t=new ct,e=new ct,i=new ct,n=new ct){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new ct){const i=e,n=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(cs(t,n.x,s.x,a.x,o.x),cs(t,n.y,s.y,a.y,o.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vu extends Pi{constructor(t=new x,e=new x,i=new x,n=new x){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=i,this.v3=n}getPoint(t,e=new x){const i=e,n=this.v0,s=this.v1,a=this.v2,o=this.v3;return i.set(cs(t,n.x,s.x,a.x,o.x),cs(t,n.y,s.y,a.y,o.y),cs(t,n.z,s.z,a.z,o.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class xu extends Pi{constructor(t=new ct,e=new ct){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ct){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ct){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mu extends Pi{constructor(t=new x,e=new x){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new x){const i=e;return t===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(t).add(this.v1)),i}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new x){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yu extends Pi{constructor(t=new ct,e=new ct,i=new ct){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new ct){const i=e,n=this.v0,s=this.v1,a=this.v2;return i.set(ls(t,n.x,s.x,a.x),ls(t,n.y,s.y,a.y)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rc extends Pi{constructor(t=new x,e=new x,i=new x){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=i}getPoint(t,e=new x){const i=e,n=this.v0,s=this.v1,a=this.v2;return i.set(ls(t,n.x,s.x,a.x),ls(t,n.y,s.y,a.y),ls(t,n.z,s.z,a.z)),i}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Su extends Pi{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ct){const i=e,n=this.points,s=(n.length-1)*t,a=Math.floor(s),o=s-a,l=n[a===0?a:a-1],c=n[a],h=n[a>n.length-2?n.length-1:a+1],u=n[a>n.length-3?n.length-1:a+2];return i.set(ol(o,l.x,c.x,h.x,u.x),ol(o,l.y,c.y,h.y,u.y)),i}copy(t){super.copy(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(n.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,i=this.points.length;e<i;e++){const n=this.points[e];t.points.push(n.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,i=t.points.length;e<i;e++){const n=t.points[e];this.points.push(new ct().fromArray(n))}return this}}var wu=Object.freeze({__proto__:null,ArcCurve:cu,CatmullRomCurve3:Ac,CubicBezierCurve:_u,CubicBezierCurve3:vu,EllipseCurve:Ec,LineCurve:xu,LineCurve3:Mu,QuadraticBezierCurve:yu,QuadraticBezierCurve3:Rc,SplineCurve:Su});class Ve extends ye{constructor(t=1,e=1,i=1,n=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:i,heightSegments:n};const s=t/2,a=e/2,o=Math.floor(i),l=Math.floor(n),c=o+1,h=l+1,u=t/o,d=e/l,f=[],m=[],_=[],g=[];for(let p=0;p<h;p++){const b=p*d-a;for(let T=0;T<c;T++){const y=T*u-s;m.push(y,-b,0),_.push(0,0,1),g.push(T/o),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let b=0;b<o;b++){const T=b+c*p,y=b+c*(p+1),A=b+1+c*(p+1),R=b+1+c*p;f.push(T,y,R),f.push(y,A,R)}this.setIndex(f),this.setAttribute("position",new re(m,3)),this.setAttribute("normal",new re(_,3)),this.setAttribute("uv",new re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ve(t.width,t.height,t.widthSegments,t.heightSegments)}}class _s extends ye{constructor(t=.5,e=1,i=32,n=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:i,phiSegments:n,thetaStart:s,thetaLength:a},i=Math.max(3,i),n=Math.max(1,n);const o=[],l=[],c=[],h=[];let u=t;const d=(e-t)/n,f=new x,m=new ct;for(let _=0;_<=n;_++){for(let g=0;g<=i;g++){const p=s+g/i*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/e+1)/2,m.y=(f.y/e+1)/2,h.push(m.x,m.y)}u+=d}for(let _=0;_<n;_++){const g=_*(i+1);for(let p=0;p<i;p++){const b=p+g,T=b,y=b+i+1,A=b+i+2,R=b+1;o.push(T,y,R),o.push(y,A,R)}}this.setIndex(o),this.setAttribute("position",new re(l,3)),this.setAttribute("normal",new re(c,3)),this.setAttribute("uv",new re(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ln extends ye{constructor(t=1,e=32,i=16,n=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:i,phiStart:n,phiLength:s,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),i=Math.max(2,Math.floor(i));const l=Math.min(a+o,Math.PI);let c=0;const h=[],u=new x,d=new x,f=[],m=[],_=[],g=[];for(let p=0;p<=i;p++){const b=[],T=p/i;let y=0;p===0&&a===0?y=.5/e:p===i&&l===Math.PI&&(y=-.5/e);for(let A=0;A<=e;A++){const R=A/e;u.x=-t*Math.cos(n+R*s)*Math.sin(a+T*o),u.y=t*Math.cos(a+T*o),u.z=t*Math.sin(n+R*s)*Math.sin(a+T*o),m.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),g.push(R+y,1-T),b.push(c++)}h.push(b)}for(let p=0;p<i;p++)for(let b=0;b<e;b++){const T=h[p][b+1],y=h[p][b],A=h[p+1][b],R=h[p+1][b+1];(p!==0||a>0)&&f.push(T,y,R),(p!==i-1||l<Math.PI)&&f.push(y,A,R)}this.setIndex(f),this.setAttribute("position",new re(m,3)),this.setAttribute("normal",new re(_,3)),this.setAttribute("uv",new re(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ln(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Oi extends ye{constructor(t=1,e=.4,i=12,n=48,s=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:i,tubularSegments:n,arc:s},i=Math.floor(i),n=Math.floor(n);const a=[],o=[],l=[],c=[],h=new x,u=new x,d=new x;for(let f=0;f<=i;f++)for(let m=0;m<=n;m++){const _=m/n*s,g=f/i*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(_),u.y=(t+e*Math.cos(g))*Math.sin(_),u.z=e*Math.sin(g),o.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(m/n),c.push(f/i)}for(let f=1;f<=i;f++)for(let m=1;m<=n;m++){const _=(n+1)*f+m-1,g=(n+1)*(f-1)+m-1,p=(n+1)*(f-1)+m,b=(n+1)*f+m;a.push(_,g,b),a.push(g,p,b)}this.setIndex(a),this.setAttribute("position",new re(o,3)),this.setAttribute("normal",new re(l,3)),this.setAttribute("uv",new re(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Oi(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class vo extends ye{constructor(t=new Rc(new x(-1,-1,0),new x(-1,1,0),new x(1,1,0)),e=64,i=1,n=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:i,radialSegments:n,closed:s};const a=t.computeFrenetFrames(e,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new x,l=new x,c=new ct;let h=new x;const u=[],d=[],f=[],m=[];_(),this.setIndex(m),this.setAttribute("position",new re(u,3)),this.setAttribute("normal",new re(d,3)),this.setAttribute("uv",new re(f,2));function _(){for(let T=0;T<e;T++)g(T);g(s===!1?e:0),b(),p()}function g(T){h=t.getPointAt(T/e,h);const y=a.normals[T],A=a.binormals[T];for(let R=0;R<=n;R++){const P=R/n*Math.PI*2,I=Math.sin(P),w=-Math.cos(P);l.x=w*y.x+I*A.x,l.y=w*y.y+I*A.y,l.z=w*y.z+I*A.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+i*l.x,o.y=h.y+i*l.y,o.z=h.z+i*l.z,u.push(o.x,o.y,o.z)}}function p(){for(let T=1;T<=e;T++)for(let y=1;y<=n;y++){const A=(n+1)*(T-1)+(y-1),R=(n+1)*T+(y-1),P=(n+1)*T+y,I=(n+1)*(T-1)+y;m.push(A,R,I),m.push(R,P,I)}}function b(){for(let T=0;T<=e;T++)for(let y=0;y<=n;y++)c.x=T/e,c.y=y/n,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new vo(new wu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class bu extends Ue{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class qt extends Ci{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ho,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ke,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Tu extends Ci{constructor(t){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ho,this.normalScale=new ct(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ke,this.combine=eo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Eu extends Ci{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Au extends Ci{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class vs extends ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class Ru extends vs{constructor(t,e,i){super(t,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const Jr=new jt,ll=new x,cl=new x;class xo{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ct(512,512),this.mapType=pi,this.map=null,this.mapPass=null,this.matrix=new jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new go,this._frameExtents=new ct(1,1),this._viewportCount=1,this._viewports=[new se(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,i=this.matrix;ll.setFromMatrixPosition(t.matrixWorld),e.position.copy(ll),cl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cl),e.updateMatrixWorld(),Jr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Jr,e.coordinateSystem,e.reversedDepth),e.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(Jr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Cu extends xo{constructor(){super(new Be(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(t){const e=this.camera,i=hr*2*t.angle*this.focus,n=this.mapSize.width/this.mapSize.height*this.aspect,s=t.distance||e.far;(i!==e.fov||n!==e.aspect||s!==e.far)&&(e.fov=i,e.aspect=n,e.far=s,e.updateProjectionMatrix()),super.updateMatrices(t)}copy(t){return super.copy(t),this.focus=t.focus,this}}class Pu extends vs{constructor(t,e,i=0,n=Math.PI/3,s=0,a=2){super(t,e),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.distance=i,this.angle=n,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Cu}get power(){return this.intensity*Math.PI}set power(t){this.intensity=t/Math.PI}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.angle=t.angle,this.penumbra=t.penumbra,this.decay=t.decay,this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}const hl=new jt,rs=new x,jr=new x;class Lu extends xo{constructor(){super(new Be(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ct(4,2),this._viewportCount=6,this._viewports=[new se(2,1,1,1),new se(0,1,1,1),new se(3,1,1,1),new se(1,1,1,1),new se(3,0,1,1),new se(1,0,1,1)],this._cubeDirections=[new x(1,0,0),new x(-1,0,0),new x(0,0,1),new x(0,0,-1),new x(0,1,0),new x(0,-1,0)],this._cubeUps=[new x(0,1,0),new x(0,1,0),new x(0,1,0),new x(0,1,0),new x(0,0,1),new x(0,0,-1)]}updateMatrices(t,e=0){const i=this.camera,n=this.matrix,s=t.distance||i.far;s!==i.far&&(i.far=s,i.updateProjectionMatrix()),rs.setFromMatrixPosition(t.matrixWorld),i.position.copy(rs),jr.copy(i.position),jr.add(this._cubeDirections[e]),i.up.copy(this._cubeUps[e]),i.lookAt(jr),i.updateMatrixWorld(),n.makeTranslation(-rs.x,-rs.y,-rs.z),hl.multiplyMatrices(i.projectionMatrix,i.matrixWorldInverse),this._frustum.setFromProjectionMatrix(hl,i.coordinateSystem,i.reversedDepth)}}class fi extends vs{constructor(t,e,i=0,n=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=i,this.decay=n,this.shadow=new Lu}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Mo extends vc{constructor(t=-1,e=1,i=1,n=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=i,this.bottom=n,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,i,n,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=i,this.view.offsetY=n,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,n=(this.top+this.bottom)/2;let s=i-t,a=i+t,o=n+e,l=n-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Du extends xo{constructor(){super(new Mo(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Cc extends vs{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ce.DEFAULT_UP),this.updateMatrix(),this.target=new ce,this.shadow=new Du}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Pc extends vs{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class Iu extends Be{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t}}class Uu{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=performance.now();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}const ul=new jt;class xs{constructor(t,e,i=0,n=1/0){this.ray=new gr(t,e),this.near=i,this.far=n,this.camera=null,this.layers=new fo,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return ul.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ul),this}intersectObject(t,e=!0,i=[]){return Za(t,this,i,e),i.sort(dl),i}intersectObjects(t,e=!0,i=[]){for(let n=0,s=t.length;n<s;n++)Za(t[n],this,i,e);return i.sort(dl),i}}function dl(r,t){return r.distance-t.distance}function Za(r,t,e,i){let n=!0;if(r.layers.test(t.layers)&&r.raycast(t,e)===!1&&(n=!1),n===!0&&i===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)Za(s[a],t,e,!0)}}function fl(r,t,e,i){const n=Nu(i);switch(e){case lc:return r*t;case ao:return r*t/n.components*n.byteLength;case oo:return r*t/n.components*n.byteLength;case hc:return r*t*2/n.components*n.byteLength;case lo:return r*t*2/n.components*n.byteLength;case cc:return r*t*3/n.components*n.byteLength;case ni:return r*t*4/n.components*n.byteLength;case co:return r*t*4/n.components*n.byteLength;case ir:case nr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case sr:case rr:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case ya:case wa:return Math.max(r,16)*Math.max(t,8)/4;case Ma:case Sa:return Math.max(r,8)*Math.max(t,8)/2;case ba:case Ta:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*8;case Ea:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((r+3)/4)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((r+4)/5)*Math.floor((t+3)/4)*16;case Ca:return Math.floor((r+4)/5)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((r+5)/6)*Math.floor((t+4)/5)*16;case La:return Math.floor((r+5)/6)*Math.floor((t+5)/6)*16;case Da:return Math.floor((r+7)/8)*Math.floor((t+4)/5)*16;case Ia:return Math.floor((r+7)/8)*Math.floor((t+5)/6)*16;case Ua:return Math.floor((r+7)/8)*Math.floor((t+7)/8)*16;case Na:return Math.floor((r+9)/10)*Math.floor((t+4)/5)*16;case Fa:return Math.floor((r+9)/10)*Math.floor((t+5)/6)*16;case Oa:return Math.floor((r+9)/10)*Math.floor((t+7)/8)*16;case za:return Math.floor((r+9)/10)*Math.floor((t+9)/10)*16;case Ba:return Math.floor((r+11)/12)*Math.floor((t+9)/10)*16;case ka:return Math.floor((r+11)/12)*Math.floor((t+11)/12)*16;case Ha:case Ga:case Va:return Math.ceil(r/4)*Math.ceil(t/4)*16;case Wa:case Xa:return Math.ceil(r/4)*Math.ceil(t/4)*8;case qa:case Ya:return Math.ceil(r/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Nu(r){switch(r){case pi:case sc:return{byteLength:1,components:1};case us:case rc:case Ti:return{byteLength:2,components:1};case so:case ro:return{byteLength:2,components:4};case on:case no:case ui:return{byteLength:4,components:1};case ac:case oc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:to}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=to);function Lc(){let r=null,t=!1,e=null,i=null;function n(s,a){e(s,a),i=r.requestAnimationFrame(n)}return{start:function(){t!==!0&&e!==null&&(i=r.requestAnimationFrame(n),t=!0)},stop:function(){r.cancelAnimationFrame(i),t=!1},setAnimationLoop:function(s){e=s},setContext:function(s){r=s}}}function Fu(r){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,u=c.byteLength,d=r.createBuffer();r.bindBuffer(l,d),r.bufferData(l,c,h),o.onUploadCallback();let f;if(c instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=r.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=r.SHORT;else if(c instanceof Uint32Array)f=r.UNSIGNED_INT;else if(c instanceof Int32Array)f=r.INT;else if(c instanceof Int8Array)f=r.BYTE;else if(c instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function i(o,l,c){const h=l.array,u=l.updateRanges;if(r.bindBuffer(c,o),u.length===0)r.bufferSubData(c,0,h);else{u.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<u.length;f++){const m=u[d],_=u[f];_.start<=m.start+m.count+1?m.count=Math.max(m.count,_.start+_.count-m.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,m=u.length;f<m;f++){const _=u[f];r.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function n(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(r.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:n,remove:s,update:a}}var Ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,zu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Bu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,ku=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Hu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Gu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,qu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ku=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,$u=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Zu=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Ju=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,id=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,nd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,sd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,rd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,ad=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,od=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,ld=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,hd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,dd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,fd="gl_FragColor = linearToOutputTexel( gl_FragColor );",pd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,md=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,_d=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,vd=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Md=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,yd=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,wd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Td=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Ed=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ad=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Rd=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Cd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Pd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ld=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Dd=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Id=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Ud=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Fd=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Od=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,zd=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,kd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Gd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Kd=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,$d=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Zd=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Jd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,jd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Qd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ef=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,af=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,df=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,vf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,xf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSED_DEPTH_BUFFER
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare, distribution.x );
		#endif
		if ( hard_shadow != 1.0 ) {
			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,yf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Sf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,wf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,bf=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Tf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ef=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Af=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ff=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Of=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,zf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Bf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,kf=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Kf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$f=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Jf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,jf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,ip=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,np=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,mp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,kt={alphahash_fragment:Ou,alphahash_pars_fragment:zu,alphamap_fragment:Bu,alphamap_pars_fragment:ku,alphatest_fragment:Hu,alphatest_pars_fragment:Gu,aomap_fragment:Vu,aomap_pars_fragment:Wu,batching_pars_vertex:Xu,batching_vertex:qu,begin_vertex:Yu,beginnormal_vertex:Ku,bsdfs:$u,iridescence_fragment:Zu,bumpmap_pars_fragment:Ju,clipping_planes_fragment:ju,clipping_planes_pars_fragment:Qu,clipping_planes_pars_vertex:td,clipping_planes_vertex:ed,color_fragment:id,color_pars_fragment:nd,color_pars_vertex:sd,color_vertex:rd,common:ad,cube_uv_reflection_fragment:od,defaultnormal_vertex:ld,displacementmap_pars_vertex:cd,displacementmap_vertex:hd,emissivemap_fragment:ud,emissivemap_pars_fragment:dd,colorspace_fragment:fd,colorspace_pars_fragment:pd,envmap_fragment:md,envmap_common_pars_fragment:gd,envmap_pars_fragment:_d,envmap_pars_vertex:vd,envmap_physical_pars_fragment:Cd,envmap_vertex:xd,fog_vertex:Md,fog_pars_vertex:yd,fog_fragment:Sd,fog_pars_fragment:wd,gradientmap_pars_fragment:bd,lightmap_pars_fragment:Td,lights_lambert_fragment:Ed,lights_lambert_pars_fragment:Ad,lights_pars_begin:Rd,lights_toon_fragment:Pd,lights_toon_pars_fragment:Ld,lights_phong_fragment:Dd,lights_phong_pars_fragment:Id,lights_physical_fragment:Ud,lights_physical_pars_fragment:Nd,lights_fragment_begin:Fd,lights_fragment_maps:Od,lights_fragment_end:zd,logdepthbuf_fragment:Bd,logdepthbuf_pars_fragment:kd,logdepthbuf_pars_vertex:Hd,logdepthbuf_vertex:Gd,map_fragment:Vd,map_pars_fragment:Wd,map_particle_fragment:Xd,map_particle_pars_fragment:qd,metalnessmap_fragment:Yd,metalnessmap_pars_fragment:Kd,morphinstance_vertex:$d,morphcolor_vertex:Zd,morphnormal_vertex:Jd,morphtarget_pars_vertex:jd,morphtarget_vertex:Qd,normal_fragment_begin:tf,normal_fragment_maps:ef,normal_pars_fragment:nf,normal_pars_vertex:sf,normal_vertex:rf,normalmap_pars_fragment:af,clearcoat_normal_fragment_begin:of,clearcoat_normal_fragment_maps:lf,clearcoat_pars_fragment:cf,iridescence_pars_fragment:hf,opaque_fragment:uf,packing:df,premultiplied_alpha_fragment:ff,project_vertex:pf,dithering_fragment:mf,dithering_pars_fragment:gf,roughnessmap_fragment:_f,roughnessmap_pars_fragment:vf,shadowmap_pars_fragment:xf,shadowmap_pars_vertex:Mf,shadowmap_vertex:yf,shadowmask_pars_fragment:Sf,skinbase_vertex:wf,skinning_pars_vertex:bf,skinning_vertex:Tf,skinnormal_vertex:Ef,specularmap_fragment:Af,specularmap_pars_fragment:Rf,tonemapping_fragment:Cf,tonemapping_pars_fragment:Pf,transmission_fragment:Lf,transmission_pars_fragment:Df,uv_pars_fragment:If,uv_pars_vertex:Uf,uv_vertex:Nf,worldpos_vertex:Ff,background_vert:Of,background_frag:zf,backgroundCube_vert:Bf,backgroundCube_frag:kf,cube_vert:Hf,cube_frag:Gf,depth_vert:Vf,depth_frag:Wf,distanceRGBA_vert:Xf,distanceRGBA_frag:qf,equirect_vert:Yf,equirect_frag:Kf,linedashed_vert:$f,linedashed_frag:Zf,meshbasic_vert:Jf,meshbasic_frag:jf,meshlambert_vert:Qf,meshlambert_frag:tp,meshmatcap_vert:ep,meshmatcap_frag:ip,meshnormal_vert:np,meshnormal_frag:sp,meshphong_vert:rp,meshphong_frag:ap,meshphysical_vert:op,meshphysical_frag:lp,meshtoon_vert:cp,meshtoon_frag:hp,points_vert:up,points_frag:dp,shadow_vert:fp,shadow_frag:pp,sprite_vert:mp,sprite_frag:gp},at={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new zt}},envmap:{envMap:{value:null},envMapRotation:{value:new zt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new zt},normalScale:{value:new ct(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0},uvTransform:{value:new zt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new ct(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new zt},alphaMap:{value:null},alphaMapTransform:{value:new zt},alphaTest:{value:0}}},li={basic:{uniforms:ze([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.fog]),vertexShader:kt.meshbasic_vert,fragmentShader:kt.meshbasic_frag},lambert:{uniforms:ze([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new It(0)}}]),vertexShader:kt.meshlambert_vert,fragmentShader:kt.meshlambert_frag},phong:{uniforms:ze([at.common,at.specularmap,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.fog,at.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:kt.meshphong_vert,fragmentShader:kt.meshphong_frag},standard:{uniforms:ze([at.common,at.envmap,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.roughnessmap,at.metalnessmap,at.fog,at.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag},toon:{uniforms:ze([at.common,at.aomap,at.lightmap,at.emissivemap,at.bumpmap,at.normalmap,at.displacementmap,at.gradientmap,at.fog,at.lights,{emissive:{value:new It(0)}}]),vertexShader:kt.meshtoon_vert,fragmentShader:kt.meshtoon_frag},matcap:{uniforms:ze([at.common,at.bumpmap,at.normalmap,at.displacementmap,at.fog,{matcap:{value:null}}]),vertexShader:kt.meshmatcap_vert,fragmentShader:kt.meshmatcap_frag},points:{uniforms:ze([at.points,at.fog]),vertexShader:kt.points_vert,fragmentShader:kt.points_frag},dashed:{uniforms:ze([at.common,at.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:kt.linedashed_vert,fragmentShader:kt.linedashed_frag},depth:{uniforms:ze([at.common,at.displacementmap]),vertexShader:kt.depth_vert,fragmentShader:kt.depth_frag},normal:{uniforms:ze([at.common,at.bumpmap,at.normalmap,at.displacementmap,{opacity:{value:1}}]),vertexShader:kt.meshnormal_vert,fragmentShader:kt.meshnormal_frag},sprite:{uniforms:ze([at.sprite,at.fog]),vertexShader:kt.sprite_vert,fragmentShader:kt.sprite_frag},background:{uniforms:{uvTransform:{value:new zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:kt.background_vert,fragmentShader:kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new zt}},vertexShader:kt.backgroundCube_vert,fragmentShader:kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:kt.cube_vert,fragmentShader:kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:kt.equirect_vert,fragmentShader:kt.equirect_frag},distanceRGBA:{uniforms:ze([at.common,at.displacementmap,{referencePosition:{value:new x},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:kt.distanceRGBA_vert,fragmentShader:kt.distanceRGBA_frag},shadow:{uniforms:ze([at.lights,at.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:kt.shadow_vert,fragmentShader:kt.shadow_frag}};li.physical={uniforms:ze([li.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new zt},clearcoatNormalScale:{value:new ct(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new zt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new zt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new zt},transmissionSamplerSize:{value:new ct},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new zt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new zt},anisotropyVector:{value:new ct},anisotropyMap:{value:null},anisotropyMapTransform:{value:new zt}}]),vertexShader:kt.meshphysical_vert,fragmentShader:kt.meshphysical_frag};const $s={r:0,b:0,g:0},$i=new ke,_p=new jt;function vp(r,t,e,i,n,s,a){const o=new It(0);let l=s===!0?0:1,c,h,u=null,d=0,f=null;function m(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?e:t).get(y)),y}function _(T){let y=!1;const A=m(T);A===null?p(o,l):A&&A.isColor&&(p(A,1),y=!0);const R=r.xr.getEnvironmentBlendMode();R==="additive"?i.buffers.color.setClear(0,0,0,1,a):R==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,a),(r.autoClear||y)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function g(T,y){const A=m(y);A&&(A.isCubeTexture||A.mapping===mr)?(h===void 0&&(h=new O(new lt(1,1,1),new Ue({name:"BackgroundCubeMaterial",uniforms:kn(li.backgroundCube.uniforms),vertexShader:li.backgroundCube.vertexShader,fragmentShader:li.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,P,I){this.matrixWorld.copyPosition(I.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(h)),$i.copy(y.backgroundRotation),$i.x*=-1,$i.y*=-1,$i.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&($i.y*=-1,$i.z*=-1),h.material.uniforms.envMap.value=A,h.material.uniforms.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(_p.makeRotationFromEuler($i)),h.material.toneMapped=$t.getTransfer(A.colorSpace)!==ee,(u!==A||d!==A.version||f!==r.toneMapping)&&(h.material.needsUpdate=!0,u=A,d=A.version,f=r.toneMapping),h.layers.enableAll(),T.unshift(h,h.geometry,h.material,0,0,null)):A&&A.isTexture&&(c===void 0&&(c=new O(new Ve(2,2),new Ue({name:"BackgroundMaterial",uniforms:kn(li.background.uniforms),vertexShader:li.background.vertexShader,fragmentShader:li.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=A,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=$t.getTransfer(A.colorSpace)!==ee,A.matrixAutoUpdate===!0&&A.updateMatrix(),c.material.uniforms.uvTransform.value.copy(A.matrix),(u!==A||d!==A.version||f!==r.toneMapping)&&(c.material.needsUpdate=!0,u=A,d=A.version,f=r.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null))}function p(T,y){T.getRGB($s,_c(r)),i.buffers.color.setClear($s.r,$s.g,$s.b,y,a)}function b(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(T,y=1){o.set(T),l=y,p(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(T){l=T,p(o,l)},render:_,addToRenderList:g,dispose:b}}function xp(r,t){const e=r.getParameter(r.MAX_VERTEX_ATTRIBS),i={},n=d(null);let s=n,a=!1;function o(S,L,U,B,V){let W=!1;const k=u(B,U,L);s!==k&&(s=k,c(s.object)),W=f(S,B,U,V),W&&m(S,B,U,V),V!==null&&t.update(V,r.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(S,L,U,B),V!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,t.get(V).buffer))}function l(){return r.createVertexArray()}function c(S){return r.bindVertexArray(S)}function h(S){return r.deleteVertexArray(S)}function u(S,L,U){const B=U.wireframe===!0;let V=i[S.id];V===void 0&&(V={},i[S.id]=V);let W=V[L.id];W===void 0&&(W={},V[L.id]=W);let k=W[B];return k===void 0&&(k=d(l()),W[B]=k),k}function d(S){const L=[],U=[],B=[];for(let V=0;V<e;V++)L[V]=0,U[V]=0,B[V]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:B,object:S,attributes:{},index:null}}function f(S,L,U,B){const V=s.attributes,W=L.attributes;let k=0;const q=U.getAttributes();for(const X in q)if(q[X].location>=0){const ft=V[X];let Et=W[X];if(Et===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(Et=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(Et=S.instanceColor)),ft===void 0||ft.attribute!==Et||Et&&ft.data!==Et.data)return!0;k++}return s.attributesNum!==k||s.index!==B}function m(S,L,U,B){const V={},W=L.attributes;let k=0;const q=U.getAttributes();for(const X in q)if(q[X].location>=0){let ft=W[X];ft===void 0&&(X==="instanceMatrix"&&S.instanceMatrix&&(ft=S.instanceMatrix),X==="instanceColor"&&S.instanceColor&&(ft=S.instanceColor));const Et={};Et.attribute=ft,ft&&ft.data&&(Et.data=ft.data),V[X]=Et,k++}s.attributes=V,s.attributesNum=k,s.index=B}function _(){const S=s.newAttributes;for(let L=0,U=S.length;L<U;L++)S[L]=0}function g(S){p(S,0)}function p(S,L){const U=s.newAttributes,B=s.enabledAttributes,V=s.attributeDivisors;U[S]=1,B[S]===0&&(r.enableVertexAttribArray(S),B[S]=1),V[S]!==L&&(r.vertexAttribDivisor(S,L),V[S]=L)}function b(){const S=s.newAttributes,L=s.enabledAttributes;for(let U=0,B=L.length;U<B;U++)L[U]!==S[U]&&(r.disableVertexAttribArray(U),L[U]=0)}function T(S,L,U,B,V,W,k){k===!0?r.vertexAttribIPointer(S,L,U,V,W):r.vertexAttribPointer(S,L,U,B,V,W)}function y(S,L,U,B){_();const V=B.attributes,W=U.getAttributes(),k=L.defaultAttributeValues;for(const q in W){const X=W[q];if(X.location>=0){let rt=V[q];if(rt===void 0&&(q==="instanceMatrix"&&S.instanceMatrix&&(rt=S.instanceMatrix),q==="instanceColor"&&S.instanceColor&&(rt=S.instanceColor)),rt!==void 0){const ft=rt.normalized,Et=rt.itemSize,Gt=t.get(rt);if(Gt===void 0)continue;const oe=Gt.buffer,de=Gt.type,Qt=Gt.bytesPerElement,$=de===r.INT||de===r.UNSIGNED_INT||rt.gpuType===no;if(rt.isInterleavedBufferAttribute){const j=rt.data,gt=j.stride,Ut=rt.offset;if(j.isInstancedInterleavedBuffer){for(let Tt=0;Tt<X.locationSize;Tt++)p(X.location+Tt,j.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Tt=0;Tt<X.locationSize;Tt++)g(X.location+Tt);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let Tt=0;Tt<X.locationSize;Tt++)T(X.location+Tt,Et/X.locationSize,de,ft,gt*Qt,(Ut+Et/X.locationSize*Tt)*Qt,$)}else{if(rt.isInstancedBufferAttribute){for(let j=0;j<X.locationSize;j++)p(X.location+j,rt.meshPerAttribute);S.isInstancedMesh!==!0&&B._maxInstanceCount===void 0&&(B._maxInstanceCount=rt.meshPerAttribute*rt.count)}else for(let j=0;j<X.locationSize;j++)g(X.location+j);r.bindBuffer(r.ARRAY_BUFFER,oe);for(let j=0;j<X.locationSize;j++)T(X.location+j,Et/X.locationSize,de,ft,Et*Qt,Et/X.locationSize*j*Qt,$)}}else if(k!==void 0){const ft=k[q];if(ft!==void 0)switch(ft.length){case 2:r.vertexAttrib2fv(X.location,ft);break;case 3:r.vertexAttrib3fv(X.location,ft);break;case 4:r.vertexAttrib4fv(X.location,ft);break;default:r.vertexAttrib1fv(X.location,ft)}}}}b()}function A(){I();for(const S in i){const L=i[S];for(const U in L){const B=L[U];for(const V in B)h(B[V].object),delete B[V];delete L[U]}delete i[S]}}function R(S){if(i[S.id]===void 0)return;const L=i[S.id];for(const U in L){const B=L[U];for(const V in B)h(B[V].object),delete B[V];delete L[U]}delete i[S.id]}function P(S){for(const L in i){const U=i[L];if(U[S.id]===void 0)continue;const B=U[S.id];for(const V in B)h(B[V].object),delete B[V];delete U[S.id]}}function I(){w(),a=!0,s!==n&&(s=n,c(s.object))}function w(){n.geometry=null,n.program=null,n.wireframe=!1}return{setup:o,reset:I,resetDefaultState:w,dispose:A,releaseStatesOfGeometry:R,releaseStatesOfProgram:P,initAttributes:_,enableAttribute:g,disableUnusedAttributes:b}}function Mp(r,t,e){let i;function n(c){i=c}function s(c,h){r.drawArrays(i,c,h),e.update(h,i,1)}function a(c,h,u){u!==0&&(r.drawArraysInstanced(i,c,h,u),e.update(h,i,u))}function o(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let m=0;m<u;m++)f+=h[m];e.update(f,i,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let m=0;m<c.length;m++)a(c[m],h[m],d[m]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let m=0;for(let _=0;_<u;_++)m+=h[_]*d[_];e.update(m,i,1)}}this.setMode=n,this.render=s,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function yp(r,t,e,i){let n;function s(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const P=t.get("EXT_texture_filter_anisotropic");n=r.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function a(P){return!(P!==ni&&i.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){const I=P===Ti&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(P!==pi&&i.convert(P)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&P!==ui&&!I)}function l(P){if(P==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),m=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=r.getParameter(r.MAX_TEXTURE_SIZE),g=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),b=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),T=r.getParameter(r.MAX_VARYING_VECTORS),y=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),A=m>0,R=r.getParameter(r.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:_,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:b,maxVaryings:T,maxFragmentUniforms:y,vertexTextures:A,maxSamples:R}}function Sp(r){const t=this;let e=null,i=0,n=!1,s=!1;const a=new Ji,o=new zt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||i!==0||n;return n=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const m=u.clippingPlanes,_=u.clipIntersection,g=u.clipShadows,p=r.get(u);if(!n||m===null||m.length===0||s&&!g)s?h(null):c();else{const b=s?0:i,T=b*4;let y=p.clippingState||null;l.value=y,y=h(m,d,T,f);for(let A=0;A!==T;++A)y[A]=e[A];p.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=i>0),t.numPlanes=i,t.numIntersection=0}function h(u,d,f,m){const _=u!==null?u.length:0;let g=null;if(_!==0){if(g=l.value,m!==!0||g===null){const p=f+_*4,b=d.matrixWorldInverse;o.getNormalMatrix(b),(g===null||g.length<p)&&(g=new Float32Array(p));for(let T=0,y=f;T!==_;++T,y+=4)a.copy(u[T]).applyMatrix4(b,o),a.normal.toArray(g,y),g[y+3]=a.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,g}}function wp(r){let t=new WeakMap;function e(a,o){return o===_a?a.mapping=On:o===va&&(a.mapping=zn),a}function i(a){if(a&&a.isTexture){const o=a.mapping;if(o===_a||o===va)if(t.has(a)){const l=t.get(a).texture;return e(l,a.mapping)}else{const l=a.image;if(l&&l.height>0){const c=new Qh(l.height);return c.fromEquirectangularTexture(r,a),t.set(a,c),a.addEventListener("dispose",n),e(c.texture,a.mapping)}else return null}}return a}function n(a){const o=a.target;o.removeEventListener("dispose",n);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function s(){t=new WeakMap}return{get:i,dispose:s}}const Un=4,pl=[.125,.215,.35,.446,.526,.582],en=20,Qr=new Mo,ml=new It;let ta=null,ea=0,ia=0,na=!1;const ji=(1+Math.sqrt(5))/2,Dn=1/ji,gl=[new x(-ji,Dn,0),new x(ji,Dn,0),new x(-Dn,0,ji),new x(Dn,0,ji),new x(0,ji,-Dn),new x(0,ji,Dn),new x(-1,1,-1),new x(1,1,-1),new x(-1,1,1),new x(1,1,1)],bp=new x;class Ja{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,i=.1,n=100,s={}){const{size:a=256,position:o=bp}=s;ta=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,i,n,l,o),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=xl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ta,ea,ia),this._renderer.xr.enabled=na,t.scissorTest=!1,Zs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===On||t.mapping===zn?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ta=this._renderer.getRenderTarget(),ea=this._renderer.getActiveCubeFace(),ia=this._renderer.getActiveMipmapLevel(),na=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const i=e||this._allocateTargets();return this._textureToCubeUV(t,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,i={magFilter:hi,minFilter:hi,generateMipmaps:!1,type:Ti,format:ni,colorSpace:Bn,depthBuffer:!1},n=_l(t,e,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=_l(t,e,i);const{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Tp(s)),this._blurMaterial=Ep(s,t,e)}return n}_compileMaterial(t){const e=new O(this._lodPlanes[0],t);this._renderer.compile(e,Qr)}_sceneToCubeUV(t,e,i,n,s){const l=new Be(90,1,e,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(ml),u.toneMapping=Bi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(n),u.clearDepth(),u.setRenderTarget(null));const _=new ue({name:"PMREM.Background",side:He,depthWrite:!1,depthTest:!1}),g=new O(new lt,_);let p=!1;const b=t.background;b?b.isColor&&(_.color.copy(b),t.background=null,p=!0):(_.color.copy(ml),p=!0);for(let T=0;T<6;T++){const y=T%3;y===0?(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[T],s.y,s.z)):y===1?(l.up.set(0,0,c[T]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[T],s.z)):(l.up.set(0,c[T],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[T]));const A=this._cubeSize;Zs(n,y*A,T>2?A:0,A,A),u.setRenderTarget(n),p&&u.render(g,l),u.render(t,l)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=b}_textureToCubeUV(t,e){const i=this._renderer,n=t.mapping===On||t.mapping===zn;n?(this._cubemapMaterial===null&&(this._cubemapMaterial=xl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=vl());const s=n?this._cubemapMaterial:this._equirectMaterial,a=new O(this._lodPlanes[0],s),o=s.uniforms;o.envMap.value=t;const l=this._cubeSize;Zs(e,0,0,3*l,2*l),i.setRenderTarget(e),i.render(a,Qr)}_applyPMREM(t){const e=this._renderer,i=e.autoClear;e.autoClear=!1;const n=this._lodPlanes.length;for(let s=1;s<n;s++){const a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=gl[(n-s-1)%gl.length];this._blur(t,s-1,s,a,o)}e.autoClear=i}_blur(t,e,i,n,s){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,i,n,"latitudinal",s),this._halfBlur(a,t,i,i,n,"longitudinal",s)}_halfBlur(t,e,i,n,s,a,o){const l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new O(this._lodPlanes[n],c),d=c.uniforms,f=this._sizeLods[i]-1,m=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*en-1),_=s/m,g=isFinite(s)?1+Math.floor(h*_):en;g>en&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${en}`);const p=[];let b=0;for(let P=0;P<en;++P){const I=P/_,w=Math.exp(-I*I/2);p.push(w),P===0?b+=w:P<g&&(b+=2*w)}for(let P=0;P<p.length;P++)p[P]=p[P]/b;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:T}=this;d.dTheta.value=m,d.mipInt.value=T-i;const y=this._sizeLods[n],A=3*y*(n>T-Un?n-T+Un:0),R=4*(this._cubeSize-y);Zs(e,A,R,3*y,2*y),l.setRenderTarget(e),l.render(u,Qr)}}function Tp(r){const t=[],e=[],i=[];let n=r;const s=r-Un+1+pl.length;for(let a=0;a<s;a++){const o=Math.pow(2,n);e.push(o);let l=1/o;a>r-Un?l=pl[a-r+Un-1]:a===0&&(l=0),i.push(l);const c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,m=6,_=3,g=2,p=1,b=new Float32Array(_*m*f),T=new Float32Array(g*m*f),y=new Float32Array(p*m*f);for(let R=0;R<f;R++){const P=R%3*2/3-1,I=R>2?0:-1,w=[P,I,0,P+2/3,I,0,P+2/3,I+1,0,P,I,0,P+2/3,I+1,0,P,I+1,0];b.set(w,_*m*R),T.set(d,g*m*R);const S=[R,R,R,R,R,R];y.set(S,p*m*R)}const A=new ye;A.setAttribute("position",new Me(b,_)),A.setAttribute("uv",new Me(T,g)),A.setAttribute("faceIndex",new Me(y,p)),t.push(A),n>Un&&n--}return{lodPlanes:t,sizeLods:e,sigmas:i}}function _l(r,t,e){const i=new si(r,t,e);return i.texture.mapping=mr,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Zs(r,t,e,i,n){r.viewport.set(t,e,i,n),r.scissor.set(t,e,i,n)}function Ep(r,t,e){const i=new Float32Array(en),n=new x(0,1,0);return new Ue({name:"SphericalGaussianBlur",defines:{n:en,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:n}},vertexShader:yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function vl(){return new Ue({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function xl(){return new Ue({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yo(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:bi,depthTest:!1,depthWrite:!1})}function yo(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Ap(r){let t=new WeakMap,e=null;function i(o){if(o&&o.isTexture){const l=o.mapping,c=l===_a||l===va,h=l===On||l===zn;if(c||h){let u=t.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return e===null&&(e=new Ja(r)),u=c?e.fromEquirectangular(o,u):e.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return c&&f&&f.height>0||h&&f&&n(f)?(e===null&&(e=new Ja(r)),u=c?e.fromEquirectangular(o):e.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,t.set(o,u),o.addEventListener("dispose",s),u.texture):null}}}return o}function n(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function s(o){const l=o.target;l.removeEventListener("dispose",s);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:i,dispose:a}}function Rp(r){const t={};function e(i){if(t[i]!==void 0)return t[i];let n;switch(i){case"WEBGL_depth_texture":n=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":n=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":n=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":n=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:n=r.getExtension(i)}return t[i]=n,n}return{has:function(i){return e(i)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(i){const n=e(i);return n===null&&ms("THREE.WebGLRenderer: "+i+" extension not supported."),n}}}function Cp(r,t,e,i){const n={},s=new WeakMap;function a(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const m in d.attributes)t.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete n[d.id];const f=s.get(d);f&&(t.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function o(u,d){return n[d.id]===!0||(d.addEventListener("dispose",a),n[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],r.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,m=u.attributes.position;let _=0;if(f!==null){const b=f.array;_=f.version;for(let T=0,y=b.length;T<y;T+=3){const A=b[T+0],R=b[T+1],P=b[T+2];d.push(A,R,R,P,P,A)}}else if(m!==void 0){const b=m.array;_=m.version;for(let T=0,y=b.length/3-1;T<y;T+=3){const A=T+0,R=T+1,P=T+2;d.push(A,R,R,P,P,A)}}else return;const g=new(dc(d)?gc:mc)(d,1);g.version=_;const p=s.get(u);p&&t.remove(p),s.set(u,g)}function h(u){const d=s.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function Pp(r,t,e){let i;function n(d){i=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function l(d,f){r.drawElements(i,f,s,d*a),e.update(f,i,1)}function c(d,f,m){m!==0&&(r.drawElementsInstanced(i,f,s,d*a,m),e.update(f,i,m))}function h(d,f,m){if(m===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,m);let g=0;for(let p=0;p<m;p++)g+=f[p];e.update(g,i,1)}function u(d,f,m,_){if(m===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<d.length;p++)c(d[p]/a,f[p],_[p]);else{g.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,_,0,m);let p=0;for(let b=0;b<m;b++)p+=f[b]*_[b];e.update(p,i,1)}}this.setMode=n,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Lp(r){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,a,o){switch(e.calls++,a){case r.TRIANGLES:e.triangles+=o*(s/3);break;case r.LINES:e.lines+=o*(s/2);break;case r.LINE_STRIP:e.lines+=o*(s-1);break;case r.LINE_LOOP:e.lines+=o*s;break;case r.POINTS:e.points+=o*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function n(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:n,update:i}}function Dp(r,t,e){const i=new WeakMap,n=new se;function s(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=i.get(o);if(d===void 0||d.count!==u){let S=function(){I.dispose(),i.delete(o),o.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const m=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,g=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let y=0;m===!0&&(y=1),_===!0&&(y=2),g===!0&&(y=3);let A=o.attributes.position.count*y,R=1;A>t.maxTextureSize&&(R=Math.ceil(A/t.maxTextureSize),A=t.maxTextureSize);const P=new Float32Array(A*R*4*u),I=new fc(P,A,R,u);I.type=ui,I.needsUpdate=!0;const w=y*4;for(let L=0;L<u;L++){const U=p[L],B=b[L],V=T[L],W=A*R*4*L;for(let k=0;k<U.count;k++){const q=k*w;m===!0&&(n.fromBufferAttribute(U,k),P[W+q+0]=n.x,P[W+q+1]=n.y,P[W+q+2]=n.z,P[W+q+3]=0),_===!0&&(n.fromBufferAttribute(B,k),P[W+q+4]=n.x,P[W+q+5]=n.y,P[W+q+6]=n.z,P[W+q+7]=0),g===!0&&(n.fromBufferAttribute(V,k),P[W+q+8]=n.x,P[W+q+9]=n.y,P[W+q+10]=n.z,P[W+q+11]=V.itemSize===4?n.w:1)}}d={count:u,texture:I,size:new ct(A,R)},i.set(o,d),o.addEventListener("dispose",S)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(r,"morphTexture",a.morphTexture,e);else{let m=0;for(let g=0;g<c.length;g++)m+=c[g];const _=o.morphTargetsRelative?1:1-m;l.getUniforms().setValue(r,"morphTargetBaseInfluence",_),l.getUniforms().setValue(r,"morphTargetInfluences",c)}l.getUniforms().setValue(r,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(r,"morphTargetsTextureSize",d.size)}return{update:s}}function Ip(r,t,e,i){let n=new WeakMap;function s(l){const c=i.render.frame,h=l.geometry,u=t.get(l,h);if(n.get(u)!==c&&(t.update(u),n.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),n.get(l)!==c&&(e.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,r.ARRAY_BUFFER),n.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;n.get(d)!==c&&(d.update(),n.set(d,c))}return u}function a(){n=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:s,dispose:a}}const Dc=new Ne,Ml=new bc(1,1),Ic=new fc,Uc=new Oh,Nc=new xc,yl=[],Sl=[],wl=new Float32Array(16),bl=new Float32Array(9),Tl=new Float32Array(4);function qn(r,t,e){const i=r[0];if(i<=0||i>0)return r;const n=t*e;let s=yl[n];if(s===void 0&&(s=new Float32Array(n),yl[n]=s),t!==0){i.toArray(s,0);for(let a=1,o=0;a!==t;++a)o+=e,r[a].toArray(s,o)}return s}function Te(r,t){if(r.length!==t.length)return!1;for(let e=0,i=r.length;e<i;e++)if(r[e]!==t[e])return!1;return!0}function Ee(r,t){for(let e=0,i=t.length;e<i;e++)r[e]=t[e]}function _r(r,t){let e=Sl[t];e===void 0&&(e=new Int32Array(t),Sl[t]=e);for(let i=0;i!==t;++i)e[i]=r.allocateTextureUnit();return e}function Up(r,t){const e=this.cache;e[0]!==t&&(r.uniform1f(this.addr,t),e[0]=t)}function Np(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2fv(this.addr,t),Ee(e,t)}}function Fp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(r.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;r.uniform3fv(this.addr,t),Ee(e,t)}}function Op(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4fv(this.addr,t),Ee(e,t)}}function zp(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;r.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,i))return;Tl.set(i),r.uniformMatrix2fv(this.addr,!1,Tl),Ee(e,i)}}function Bp(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;r.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,i))return;bl.set(i),r.uniformMatrix3fv(this.addr,!1,bl),Ee(e,i)}}function kp(r,t){const e=this.cache,i=t.elements;if(i===void 0){if(Te(e,t))return;r.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(Te(e,i))return;wl.set(i),r.uniformMatrix4fv(this.addr,!1,wl),Ee(e,i)}}function Hp(r,t){const e=this.cache;e[0]!==t&&(r.uniform1i(this.addr,t),e[0]=t)}function Gp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2iv(this.addr,t),Ee(e,t)}}function Vp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;r.uniform3iv(this.addr,t),Ee(e,t)}}function Wp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4iv(this.addr,t),Ee(e,t)}}function Xp(r,t){const e=this.cache;e[0]!==t&&(r.uniform1ui(this.addr,t),e[0]=t)}function qp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(r.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;r.uniform2uiv(this.addr,t),Ee(e,t)}}function Yp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(r.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;r.uniform3uiv(this.addr,t),Ee(e,t)}}function Kp(r,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(r.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;r.uniform4uiv(this.addr,t),Ee(e,t)}}function $p(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n);let s;this.type===r.SAMPLER_2D_SHADOW?(Ml.compareFunction=uc,s=Ml):s=Dc,e.setTexture2D(t||s,n)}function Zp(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture3D(t||Uc,n)}function Jp(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTextureCube(t||Nc,n)}function jp(r,t,e){const i=this.cache,n=e.allocateTextureUnit();i[0]!==n&&(r.uniform1i(this.addr,n),i[0]=n),e.setTexture2DArray(t||Ic,n)}function Qp(r){switch(r){case 5126:return Up;case 35664:return Np;case 35665:return Fp;case 35666:return Op;case 35674:return zp;case 35675:return Bp;case 35676:return kp;case 5124:case 35670:return Hp;case 35667:case 35671:return Gp;case 35668:case 35672:return Vp;case 35669:case 35673:return Wp;case 5125:return Xp;case 36294:return qp;case 36295:return Yp;case 36296:return Kp;case 35678:case 36198:case 36298:case 36306:case 35682:return $p;case 35679:case 36299:case 36307:return Zp;case 35680:case 36300:case 36308:case 36293:return Jp;case 36289:case 36303:case 36311:case 36292:return jp}}function tm(r,t){r.uniform1fv(this.addr,t)}function em(r,t){const e=qn(t,this.size,2);r.uniform2fv(this.addr,e)}function im(r,t){const e=qn(t,this.size,3);r.uniform3fv(this.addr,e)}function nm(r,t){const e=qn(t,this.size,4);r.uniform4fv(this.addr,e)}function sm(r,t){const e=qn(t,this.size,4);r.uniformMatrix2fv(this.addr,!1,e)}function rm(r,t){const e=qn(t,this.size,9);r.uniformMatrix3fv(this.addr,!1,e)}function am(r,t){const e=qn(t,this.size,16);r.uniformMatrix4fv(this.addr,!1,e)}function om(r,t){r.uniform1iv(this.addr,t)}function lm(r,t){r.uniform2iv(this.addr,t)}function cm(r,t){r.uniform3iv(this.addr,t)}function hm(r,t){r.uniform4iv(this.addr,t)}function um(r,t){r.uniform1uiv(this.addr,t)}function dm(r,t){r.uniform2uiv(this.addr,t)}function fm(r,t){r.uniform3uiv(this.addr,t)}function pm(r,t){r.uniform4uiv(this.addr,t)}function mm(r,t,e){const i=this.cache,n=t.length,s=_r(e,n);Te(i,s)||(r.uniform1iv(this.addr,s),Ee(i,s));for(let a=0;a!==n;++a)e.setTexture2D(t[a]||Dc,s[a])}function gm(r,t,e){const i=this.cache,n=t.length,s=_r(e,n);Te(i,s)||(r.uniform1iv(this.addr,s),Ee(i,s));for(let a=0;a!==n;++a)e.setTexture3D(t[a]||Uc,s[a])}function _m(r,t,e){const i=this.cache,n=t.length,s=_r(e,n);Te(i,s)||(r.uniform1iv(this.addr,s),Ee(i,s));for(let a=0;a!==n;++a)e.setTextureCube(t[a]||Nc,s[a])}function vm(r,t,e){const i=this.cache,n=t.length,s=_r(e,n);Te(i,s)||(r.uniform1iv(this.addr,s),Ee(i,s));for(let a=0;a!==n;++a)e.setTexture2DArray(t[a]||Ic,s[a])}function xm(r){switch(r){case 5126:return tm;case 35664:return em;case 35665:return im;case 35666:return nm;case 35674:return sm;case 35675:return rm;case 35676:return am;case 5124:case 35670:return om;case 35667:case 35671:return lm;case 35668:case 35672:return cm;case 35669:case 35673:return hm;case 5125:return um;case 36294:return dm;case 36295:return fm;case 36296:return pm;case 35678:case 36198:case 36298:case 36306:case 35682:return mm;case 35679:case 36299:case 36307:return gm;case 35680:case 36300:case 36308:case 36293:return _m;case 36289:case 36303:case 36311:case 36292:return vm}}class Mm{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.setValue=Qp(e.type)}}class ym{constructor(t,e,i){this.id=t,this.addr=i,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=xm(e.type)}}class Sm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,i){const n=this.seq;for(let s=0,a=n.length;s!==a;++s){const o=n[s];o.setValue(t,e[o.id],i)}}}const sa=/(\w+)(\])?(\[|\.)?/g;function El(r,t){r.seq.push(t),r.map[t.id]=t}function wm(r,t,e){const i=r.name,n=i.length;for(sa.lastIndex=0;;){const s=sa.exec(i),a=sa.lastIndex;let o=s[1];const l=s[2]==="]",c=s[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===n){El(e,c===void 0?new Mm(o,r,t):new ym(o,r,t));break}else{let u=e.map[o];u===void 0&&(u=new Sm(o),El(e,u)),e=u}}}class ar{constructor(t,e){this.seq=[],this.map={};const i=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let n=0;n<i;++n){const s=t.getActiveUniform(e,n),a=t.getUniformLocation(e,s.name);wm(s,a,this)}}setValue(t,e,i,n){const s=this.map[e];s!==void 0&&s.setValue(t,i,n)}setOptional(t,e,i){const n=e[i];n!==void 0&&this.setValue(t,i,n)}static upload(t,e,i,n){for(let s=0,a=e.length;s!==a;++s){const o=e[s],l=i[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,n)}}static seqWithValue(t,e){const i=[];for(let n=0,s=t.length;n!==s;++n){const a=t[n];a.id in e&&i.push(a)}return i}}function Al(r,t,e){const i=r.createShader(t);return r.shaderSource(i,e),r.compileShader(i),i}const bm=37297;let Tm=0;function Em(r,t){const e=r.split(`
`),i=[],n=Math.max(t-6,0),s=Math.min(t+6,e.length);for(let a=n;a<s;a++){const o=a+1;i.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return i.join(`
`)}const Rl=new zt;function Am(r){$t._getMatrix(Rl,$t.workingColorSpace,r);const t=`mat3( ${Rl.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(r)){case lr:return[t,"LinearTransferOETF"];case ee:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",r),[t,"LinearTransferOETF"]}}function Cl(r,t,e){const i=r.getShaderParameter(t,r.COMPILE_STATUS),s=(r.getShaderInfoLog(t)||"").trim();if(i&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+Em(r.getShaderSource(t),o)}else return s}function Rm(r,t){const e=Am(t);return[`vec4 ${r}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function Cm(r,t){let e;switch(t){case Jl:e="Linear";break;case jl:e="Reinhard";break;case Ql:e="Cineon";break;case io:e="ACESFilmic";break;case ec:e="AgX";break;case ic:e="Neutral";break;case tc:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+r+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Js=new x;function Pm(){$t.getLuminanceCoefficients(Js);const r=Js.x.toFixed(4),t=Js.y.toFixed(4),e=Js.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Lm(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function Dm(r){const t=[];for(const e in r){const i=r[e];i!==!1&&t.push("#define "+e+" "+i)}return t.join(`
`)}function Im(r,t){const e={},i=r.getProgramParameter(t,r.ACTIVE_ATTRIBUTES);for(let n=0;n<i;n++){const s=r.getActiveAttrib(t,n),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),e[a]={type:s.type,location:r.getAttribLocation(t,a),locationSize:o}}return e}function os(r){return r!==""}function Pl(r,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ll(r,t){return r.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Um=/^[ \t]*#include +<([\w\d./]+)>/gm;function ja(r){return r.replace(Um,Fm)}const Nm=new Map;function Fm(r,t){let e=kt[t];if(e===void 0){const i=Nm.get(t);if(i!==void 0)e=kt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,i);else throw new Error("Can not resolve #include <"+t+">")}return ja(e)}const Om=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(r){return r.replace(Om,zm)}function zm(r,t,e,i){let n="";for(let s=parseInt(t);s<parseInt(e);s++)n+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return n}function Il(r){let t=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?t+=`
#define HIGH_PRECISION`:r.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Bm(r){let t="SHADOWMAP_TYPE_BASIC";return r.shadowMapType===$l?t="SHADOWMAP_TYPE_PCF":r.shadowMapType===Zl?t="SHADOWMAP_TYPE_PCF_SOFT":r.shadowMapType===yi&&(t="SHADOWMAP_TYPE_VSM"),t}function km(r){let t="ENVMAP_TYPE_CUBE";if(r.envMap)switch(r.envMapMode){case On:case zn:t="ENVMAP_TYPE_CUBE";break;case mr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Hm(r){let t="ENVMAP_MODE_REFLECTION";return r.envMap&&r.envMapMode===zn&&(t="ENVMAP_MODE_REFRACTION"),t}function Gm(r){let t="ENVMAP_BLENDING_NONE";if(r.envMap)switch(r.combine){case eo:t="ENVMAP_BLENDING_MULTIPLY";break;case gh:t="ENVMAP_BLENDING_MIX";break;case _h:t="ENVMAP_BLENDING_ADD";break}return t}function Vm(r){const t=r.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,i=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:i,maxMip:e}}function Wm(r,t,e,i){const n=r.getContext(),s=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=Bm(e),c=km(e),h=Hm(e),u=Gm(e),d=Vm(e),f=Lm(e),m=Dm(s),_=n.createProgram();let g,p,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(g=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(os).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m].filter(os).join(`
`),p.length>0&&(p+=`
`)):(g=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),p=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,m,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bi?"#define TONE_MAPPING":"",e.toneMapping!==Bi?kt.tonemapping_pars_fragment:"",e.toneMapping!==Bi?Cm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",kt.colorspace_pars_fragment,Rm("linearToOutputTexel",e.outputColorSpace),Pm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),a=ja(a),a=Pl(a,e),a=Ll(a,e),o=ja(o),o=Pl(o,e),o=Ll(o,e),a=Dl(a),o=Dl(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,g=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",e.glslVersion===Uo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Uo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const T=b+g+a,y=b+p+o,A=Al(n,n.VERTEX_SHADER,T),R=Al(n,n.FRAGMENT_SHADER,y);n.attachShader(_,A),n.attachShader(_,R),e.index0AttributeName!==void 0?n.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&n.bindAttribLocation(_,0,"position"),n.linkProgram(_);function P(L){if(r.debug.checkShaderErrors){const U=n.getProgramInfoLog(_)||"",B=n.getShaderInfoLog(A)||"",V=n.getShaderInfoLog(R)||"",W=U.trim(),k=B.trim(),q=V.trim();let X=!0,rt=!0;if(n.getProgramParameter(_,n.LINK_STATUS)===!1)if(X=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(n,_,A,R);else{const ft=Cl(n,A,"vertex"),Et=Cl(n,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+n.getError()+" - VALIDATE_STATUS "+n.getProgramParameter(_,n.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+W+`
`+ft+`
`+Et)}else W!==""?console.warn("THREE.WebGLProgram: Program Info Log:",W):(k===""||q==="")&&(rt=!1);rt&&(L.diagnostics={runnable:X,programLog:W,vertexShader:{log:k,prefix:g},fragmentShader:{log:q,prefix:p}})}n.deleteShader(A),n.deleteShader(R),I=new ar(n,_),w=Im(n,_)}let I;this.getUniforms=function(){return I===void 0&&P(this),I};let w;this.getAttributes=function(){return w===void 0&&P(this),w};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=n.getProgramParameter(_,bm)),S},this.destroy=function(){i.releaseStatesOfProgram(this),n.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Tm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=A,this.fragmentShader=R,this}let Xm=0;class qm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,i=t.fragmentShader,n=this._getShaderStage(e),s=this._getShaderStage(i),a=this._getShaderCacheForMaterial(t);return a.has(n)===!1&&(a.add(n),n.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const i of e)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let i=e.get(t);return i===void 0&&(i=new Set,e.set(t,i)),i}_getShaderStage(t){const e=this.shaderCache;let i=e.get(t);return i===void 0&&(i=new Ym(t),e.set(t,i)),i}}class Ym{constructor(t){this.id=Xm++,this.code=t,this.usedTimes=0}}function Km(r,t,e,i,n,s,a){const o=new fo,l=new qm,c=new Set,h=[],u=n.logarithmicDepthBuffer,d=n.vertexTextures;let f=n.precision;const m={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return c.add(w),w===0?"uv":`uv${w}`}function g(w,S,L,U,B){const V=U.fog,W=B.geometry,k=w.isMeshStandardMaterial?U.environment:null,q=(w.isMeshStandardMaterial?e:t).get(w.envMap||k),X=q&&q.mapping===mr?q.image.height:null,rt=m[w.type];w.precision!==null&&(f=n.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const ft=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Et=ft!==void 0?ft.length:0;let Gt=0;W.morphAttributes.position!==void 0&&(Gt=1),W.morphAttributes.normal!==void 0&&(Gt=2),W.morphAttributes.color!==void 0&&(Gt=3);let oe,de,Qt,$;if(rt){const te=li[rt];oe=te.vertexShader,de=te.fragmentShader}else oe=w.vertexShader,de=w.fragmentShader,l.update(w),Qt=l.getVertexShaderID(w),$=l.getFragmentShaderID(w);const j=r.getRenderTarget(),gt=r.state.buffers.depth.getReversed(),Ut=B.isInstancedMesh===!0,Tt=B.isBatchedMesh===!0,Yt=!!w.map,Pe=!!w.matcap,C=!!q,fe=!!w.aoMap,Ft=!!w.lightMap,Lt=!!w.bumpMap,xt=!!w.normalMap,pe=!!w.displacementMap,Mt=!!w.emissiveMap,Bt=!!w.metalnessMap,Ae=!!w.roughnessMap,xe=w.anisotropy>0,E=w.clearcoat>0,v=w.dispersion>0,z=w.iridescence>0,K=w.sheen>0,J=w.transmission>0,Y=xe&&!!w.anisotropyMap,bt=E&&!!w.clearcoatMap,nt=E&&!!w.clearcoatNormalMap,yt=E&&!!w.clearcoatRoughnessMap,St=z&&!!w.iridescenceMap,et=z&&!!w.iridescenceThicknessMap,ut=K&&!!w.sheenColorMap,Pt=K&&!!w.sheenRoughnessMap,wt=!!w.specularMap,ot=!!w.specularColorMap,Ot=!!w.specularIntensityMap,D=J&&!!w.transmissionMap,it=J&&!!w.thicknessMap,st=!!w.gradientMap,mt=!!w.alphaMap,Q=w.alphaTest>0,Z=!!w.alphaHash,vt=!!w.extensions;let Nt=Bi;w.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(Nt=r.toneMapping);const le={shaderID:rt,shaderType:w.type,shaderName:w.name,vertexShader:oe,fragmentShader:de,defines:w.defines,customVertexShaderID:Qt,customFragmentShaderID:$,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:Tt,batchingColor:Tt&&B._colorsTexture!==null,instancing:Ut,instancingColor:Ut&&B.instanceColor!==null,instancingMorph:Ut&&B.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:j===null?r.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Bn,alphaToCoverage:!!w.alphaToCoverage,map:Yt,matcap:Pe,envMap:C,envMapMode:C&&q.mapping,envMapCubeUVHeight:X,aoMap:fe,lightMap:Ft,bumpMap:Lt,normalMap:xt,displacementMap:d&&pe,emissiveMap:Mt,normalMapObjectSpace:xt&&w.normalMapType===yh,normalMapTangentSpace:xt&&w.normalMapType===ho,metalnessMap:Bt,roughnessMap:Ae,anisotropy:xe,anisotropyMap:Y,clearcoat:E,clearcoatMap:bt,clearcoatNormalMap:nt,clearcoatRoughnessMap:yt,dispersion:v,iridescence:z,iridescenceMap:St,iridescenceThicknessMap:et,sheen:K,sheenColorMap:ut,sheenRoughnessMap:Pt,specularMap:wt,specularColorMap:ot,specularIntensityMap:Ot,transmission:J,transmissionMap:D,thicknessMap:it,gradientMap:st,opaque:w.transparent===!1&&w.blending===an&&w.alphaToCoverage===!1,alphaMap:mt,alphaTest:Q,alphaHash:Z,combine:w.combine,mapUv:Yt&&_(w.map.channel),aoMapUv:fe&&_(w.aoMap.channel),lightMapUv:Ft&&_(w.lightMap.channel),bumpMapUv:Lt&&_(w.bumpMap.channel),normalMapUv:xt&&_(w.normalMap.channel),displacementMapUv:pe&&_(w.displacementMap.channel),emissiveMapUv:Mt&&_(w.emissiveMap.channel),metalnessMapUv:Bt&&_(w.metalnessMap.channel),roughnessMapUv:Ae&&_(w.roughnessMap.channel),anisotropyMapUv:Y&&_(w.anisotropyMap.channel),clearcoatMapUv:bt&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:yt&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:et&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:ut&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Pt&&_(w.sheenRoughnessMap.channel),specularMapUv:wt&&_(w.specularMap.channel),specularColorMapUv:ot&&_(w.specularColorMap.channel),specularIntensityMapUv:Ot&&_(w.specularIntensityMap.channel),transmissionMapUv:D&&_(w.transmissionMap.channel),thicknessMapUv:it&&_(w.thicknessMap.channel),alphaMapUv:mt&&_(w.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(xt||xe),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:B.isPoints===!0&&!!W.attributes.uv&&(Yt||mt),fog:!!V,useFog:w.fog===!0,fogExp2:!!V&&V.isFogExp2,flatShading:w.flatShading===!0&&w.wireframe===!1,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:gt,skinning:B.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Et,morphTextureStride:Gt,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:r.shadowMap.enabled&&L.length>0,shadowMapType:r.shadowMap.type,toneMapping:Nt,decodeVideoTexture:Yt&&w.map.isVideoTexture===!0&&$t.getTransfer(w.map.colorSpace)===ee,decodeVideoTextureEmissive:Mt&&w.emissiveMap.isVideoTexture===!0&&$t.getTransfer(w.emissiveMap.colorSpace)===ee,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===Ce,flipSided:w.side===He,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:vt&&w.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&w.extensions.multiDraw===!0||Tt)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return le.vertexUv1s=c.has(1),le.vertexUv2s=c.has(2),le.vertexUv3s=c.has(3),c.clear(),le}function p(w){const S=[];if(w.shaderID?S.push(w.shaderID):(S.push(w.customVertexShaderID),S.push(w.customFragmentShaderID)),w.defines!==void 0)for(const L in w.defines)S.push(L),S.push(w.defines[L]);return w.isRawShaderMaterial===!1&&(b(S,w),T(S,w),S.push(r.outputColorSpace)),S.push(w.customProgramCacheKey),S.join()}function b(w,S){w.push(S.precision),w.push(S.outputColorSpace),w.push(S.envMapMode),w.push(S.envMapCubeUVHeight),w.push(S.mapUv),w.push(S.alphaMapUv),w.push(S.lightMapUv),w.push(S.aoMapUv),w.push(S.bumpMapUv),w.push(S.normalMapUv),w.push(S.displacementMapUv),w.push(S.emissiveMapUv),w.push(S.metalnessMapUv),w.push(S.roughnessMapUv),w.push(S.anisotropyMapUv),w.push(S.clearcoatMapUv),w.push(S.clearcoatNormalMapUv),w.push(S.clearcoatRoughnessMapUv),w.push(S.iridescenceMapUv),w.push(S.iridescenceThicknessMapUv),w.push(S.sheenColorMapUv),w.push(S.sheenRoughnessMapUv),w.push(S.specularMapUv),w.push(S.specularColorMapUv),w.push(S.specularIntensityMapUv),w.push(S.transmissionMapUv),w.push(S.thicknessMapUv),w.push(S.combine),w.push(S.fogExp2),w.push(S.sizeAttenuation),w.push(S.morphTargetsCount),w.push(S.morphAttributeCount),w.push(S.numDirLights),w.push(S.numPointLights),w.push(S.numSpotLights),w.push(S.numSpotLightMaps),w.push(S.numHemiLights),w.push(S.numRectAreaLights),w.push(S.numDirLightShadows),w.push(S.numPointLightShadows),w.push(S.numSpotLightShadows),w.push(S.numSpotLightShadowsWithMaps),w.push(S.numLightProbes),w.push(S.shadowMapType),w.push(S.toneMapping),w.push(S.numClippingPlanes),w.push(S.numClipIntersection),w.push(S.depthPacking)}function T(w,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),S.gradientMap&&o.enable(22),w.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reversedDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),w.push(o.mask)}function y(w){const S=m[w.type];let L;if(S){const U=li[S];L=gs.clone(U.uniforms)}else L=w.uniforms;return L}function A(w,S){let L;for(let U=0,B=h.length;U<B;U++){const V=h[U];if(V.cacheKey===S){L=V,++L.usedTimes;break}}return L===void 0&&(L=new Wm(r,S,w,s),h.push(L)),L}function R(w){if(--w.usedTimes===0){const S=h.indexOf(w);h[S]=h[h.length-1],h.pop(),w.destroy()}}function P(w){l.remove(w)}function I(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:y,acquireProgram:A,releaseProgram:R,releaseShaderCache:P,programs:h,dispose:I}}function $m(){let r=new WeakMap;function t(a){return r.has(a)}function e(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function i(a){r.delete(a)}function n(a,o,l){r.get(a)[o]=l}function s(){r=new WeakMap}return{has:t,get:e,remove:i,update:n,dispose:s}}function Zm(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.material.id!==t.material.id?r.material.id-t.material.id:r.z!==t.z?r.z-t.z:r.id-t.id}function Ul(r,t){return r.groupOrder!==t.groupOrder?r.groupOrder-t.groupOrder:r.renderOrder!==t.renderOrder?r.renderOrder-t.renderOrder:r.z!==t.z?t.z-r.z:r.id-t.id}function Nl(){const r=[];let t=0;const e=[],i=[],n=[];function s(){t=0,e.length=0,i.length=0,n.length=0}function a(u,d,f,m,_,g){let p=r[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:m,renderOrder:u.renderOrder,z:_,group:g},r[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=m,p.renderOrder=u.renderOrder,p.z=_,p.group=g),t++,p}function o(u,d,f,m,_,g){const p=a(u,d,f,m,_,g);f.transmission>0?i.push(p):f.transparent===!0?n.push(p):e.push(p)}function l(u,d,f,m,_,g){const p=a(u,d,f,m,_,g);f.transmission>0?i.unshift(p):f.transparent===!0?n.unshift(p):e.unshift(p)}function c(u,d){e.length>1&&e.sort(u||Zm),i.length>1&&i.sort(d||Ul),n.length>1&&n.sort(d||Ul)}function h(){for(let u=t,d=r.length;u<d;u++){const f=r[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:i,transparent:n,init:s,push:o,unshift:l,finish:h,sort:c}}function Jm(){let r=new WeakMap;function t(i,n){const s=r.get(i);let a;return s===void 0?(a=new Nl,r.set(i,[a])):n>=s.length?(a=new Nl,s.push(a)):a=s[n],a}function e(){r=new WeakMap}return{get:t,dispose:e}}function jm(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new x,color:new It};break;case"SpotLight":e={position:new x,direction:new x,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new x,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new x,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new x,halfWidth:new x,halfHeight:new x};break}return r[t.id]=e,e}}}function Qm(){const r={};return{get:function(t){if(r[t.id]!==void 0)return r[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ct,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[t.id]=e,e}}}let t0=0;function e0(r,t){return(t.castShadow?2:0)-(r.castShadow?2:0)+(t.map?1:0)-(r.map?1:0)}function i0(r){const t=new jm,e=Qm(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new x);const n=new x,s=new jt,a=new jt;function o(c){let h=0,u=0,d=0;for(let w=0;w<9;w++)i.probe[w].set(0,0,0);let f=0,m=0,_=0,g=0,p=0,b=0,T=0,y=0,A=0,R=0,P=0;c.sort(e0);for(let w=0,S=c.length;w<S;w++){const L=c[w],U=L.color,B=L.intensity,V=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=U.r*B,u+=U.g*B,d+=U.b*B;else if(L.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(L.sh.coefficients[k],B);P++}else if(L.isDirectionalLight){const k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const q=L.shadow,X=e.get(L);X.shadowIntensity=q.intensity,X.shadowBias=q.bias,X.shadowNormalBias=q.normalBias,X.shadowRadius=q.radius,X.shadowMapSize=q.mapSize,i.directionalShadow[f]=X,i.directionalShadowMap[f]=W,i.directionalShadowMatrix[f]=L.shadow.matrix,b++}i.directional[f]=k,f++}else if(L.isSpotLight){const k=t.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(U).multiplyScalar(B),k.distance=V,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,i.spot[_]=k;const q=L.shadow;if(L.map&&(i.spotLightMap[A]=L.map,A++,q.updateMatrices(L),L.castShadow&&R++),i.spotLightMatrix[_]=q.matrix,L.castShadow){const X=e.get(L);X.shadowIntensity=q.intensity,X.shadowBias=q.bias,X.shadowNormalBias=q.normalBias,X.shadowRadius=q.radius,X.shadowMapSize=q.mapSize,i.spotShadow[_]=X,i.spotShadowMap[_]=W,y++}_++}else if(L.isRectAreaLight){const k=t.get(L);k.color.copy(U).multiplyScalar(B),k.halfWidth.set(L.width*.5,0,0),k.halfHeight.set(0,L.height*.5,0),i.rectArea[g]=k,g++}else if(L.isPointLight){const k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity),k.distance=L.distance,k.decay=L.decay,L.castShadow){const q=L.shadow,X=e.get(L);X.shadowIntensity=q.intensity,X.shadowBias=q.bias,X.shadowNormalBias=q.normalBias,X.shadowRadius=q.radius,X.shadowMapSize=q.mapSize,X.shadowCameraNear=q.camera.near,X.shadowCameraFar=q.camera.far,i.pointShadow[m]=X,i.pointShadowMap[m]=W,i.pointShadowMatrix[m]=L.shadow.matrix,T++}i.point[m]=k,m++}else if(L.isHemisphereLight){const k=t.get(L);k.skyColor.copy(L.color).multiplyScalar(B),k.groundColor.copy(L.groundColor).multiplyScalar(B),i.hemi[p]=k,p++}}g>0&&(r.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=at.LTC_FLOAT_1,i.rectAreaLTC2=at.LTC_FLOAT_2):(i.rectAreaLTC1=at.LTC_HALF_1,i.rectAreaLTC2=at.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;const I=i.hash;(I.directionalLength!==f||I.pointLength!==m||I.spotLength!==_||I.rectAreaLength!==g||I.hemiLength!==p||I.numDirectionalShadows!==b||I.numPointShadows!==T||I.numSpotShadows!==y||I.numSpotMaps!==A||I.numLightProbes!==P)&&(i.directional.length=f,i.spot.length=_,i.rectArea.length=g,i.point.length=m,i.hemi.length=p,i.directionalShadow.length=b,i.directionalShadowMap.length=b,i.pointShadow.length=T,i.pointShadowMap.length=T,i.spotShadow.length=y,i.spotShadowMap.length=y,i.directionalShadowMatrix.length=b,i.pointShadowMatrix.length=T,i.spotLightMatrix.length=y+A-R,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=P,I.directionalLength=f,I.pointLength=m,I.spotLength=_,I.rectAreaLength=g,I.hemiLength=p,I.numDirectionalShadows=b,I.numPointShadows=T,I.numSpotShadows=y,I.numSpotMaps=A,I.numLightProbes=P,i.version=t0++)}function l(c,h){let u=0,d=0,f=0,m=0,_=0;const g=h.matrixWorldInverse;for(let p=0,b=c.length;p<b;p++){const T=c[p];if(T.isDirectionalLight){const y=i.directional[u];y.direction.setFromMatrixPosition(T.matrixWorld),n.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(g),u++}else if(T.isSpotLight){const y=i.spot[f];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(g),y.direction.setFromMatrixPosition(T.matrixWorld),n.setFromMatrixPosition(T.target.matrixWorld),y.direction.sub(n),y.direction.transformDirection(g),f++}else if(T.isRectAreaLight){const y=i.rectArea[m];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(g),a.identity(),s.copy(T.matrixWorld),s.premultiply(g),a.extractRotation(s),y.halfWidth.set(T.width*.5,0,0),y.halfHeight.set(0,T.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),m++}else if(T.isPointLight){const y=i.point[d];y.position.setFromMatrixPosition(T.matrixWorld),y.position.applyMatrix4(g),d++}else if(T.isHemisphereLight){const y=i.hemi[_];y.direction.setFromMatrixPosition(T.matrixWorld),y.direction.transformDirection(g),_++}}}return{setup:o,setupView:l,state:i}}function Fl(r){const t=new i0(r),e=[],i=[];function n(h){c.camera=h,e.length=0,i.length=0}function s(h){e.push(h)}function a(h){i.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:i,camera:null,lights:t,transmissionRenderTarget:{}};return{init:n,state:c,setupLights:o,setupLightsView:l,pushLight:s,pushShadow:a}}function n0(r){let t=new WeakMap;function e(n,s=0){const a=t.get(n);let o;return a===void 0?(o=new Fl(r),t.set(n,[o])):s>=a.length?(o=new Fl(r),a.push(o)):o=a[s],o}function i(){t=new WeakMap}return{get:e,dispose:i}}const s0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,r0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function a0(r,t,e){let i=new go;const n=new ct,s=new ct,a=new se,o=new Eu({depthPacking:Mh}),l=new Au,c={},h=e.maxTextureSize,u={[Hi]:He,[He]:Hi,[Ce]:Ce},d=new Ue({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ct},radius:{value:4}},vertexShader:s0,fragmentShader:r0}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const m=new ye;m.setAttribute("position",new Me(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new O(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$l;let p=this.type;this.render=function(R,P,I){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const w=r.getRenderTarget(),S=r.getActiveCubeFace(),L=r.getActiveMipmapLevel(),U=r.state;U.setBlending(bi),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const B=p!==yi&&this.type===yi,V=p===yi&&this.type!==yi;for(let W=0,k=R.length;W<k;W++){const q=R[W],X=q.shadow;if(X===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;n.copy(X.mapSize);const rt=X.getFrameExtents();if(n.multiply(rt),s.copy(X.mapSize),(n.x>h||n.y>h)&&(n.x>h&&(s.x=Math.floor(h/rt.x),n.x=s.x*rt.x,X.mapSize.x=s.x),n.y>h&&(s.y=Math.floor(h/rt.y),n.y=s.y*rt.y,X.mapSize.y=s.y)),X.map===null||B===!0||V===!0){const Et=this.type!==yi?{minFilter:Ke,magFilter:Ke}:{};X.map!==null&&X.map.dispose(),X.map=new si(n.x,n.y,Et),X.map.texture.name=q.name+".shadowMap",X.camera.updateProjectionMatrix()}r.setRenderTarget(X.map),r.clear();const ft=X.getViewportCount();for(let Et=0;Et<ft;Et++){const Gt=X.getViewport(Et);a.set(s.x*Gt.x,s.y*Gt.y,s.x*Gt.z,s.y*Gt.w),U.viewport(a),X.updateMatrices(q,Et),i=X.getFrustum(),y(P,I,X.camera,q,this.type)}X.isPointLightShadow!==!0&&this.type===yi&&b(X,I),X.needsUpdate=!1}p=this.type,g.needsUpdate=!1,r.setRenderTarget(w,S,L)};function b(R,P){const I=t.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new si(n.x,n.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,r.setRenderTarget(R.mapPass),r.clear(),r.renderBufferDirect(P,null,I,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,r.setRenderTarget(R.map),r.clear(),r.renderBufferDirect(P,null,I,f,_,null)}function T(R,P,I,w){let S=null;const L=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)S=L;else if(S=I.isPointLight===!0?l:o,r.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){const U=S.uuid,B=P.uuid;let V=c[U];V===void 0&&(V={},c[U]=V);let W=V[B];W===void 0&&(W=S.clone(),V[B]=W,P.addEventListener("dispose",A)),S=W}if(S.visible=P.visible,S.wireframe=P.wireframe,w===yi?S.side=P.shadowSide!==null?P.shadowSide:P.side:S.side=P.shadowSide!==null?P.shadowSide:u[P.side],S.alphaMap=P.alphaMap,S.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,S.map=P.map,S.clipShadows=P.clipShadows,S.clippingPlanes=P.clippingPlanes,S.clipIntersection=P.clipIntersection,S.displacementMap=P.displacementMap,S.displacementScale=P.displacementScale,S.displacementBias=P.displacementBias,S.wireframeLinewidth=P.wireframeLinewidth,S.linewidth=P.linewidth,I.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const U=r.properties.get(S);U.light=I}return S}function y(R,P,I,w,S){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===yi)&&(!R.frustumCulled||i.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const B=t.update(R),V=R.material;if(Array.isArray(V)){const W=B.groups;for(let k=0,q=W.length;k<q;k++){const X=W[k],rt=V[X.materialIndex];if(rt&&rt.visible){const ft=T(R,rt,w,S);R.onBeforeShadow(r,R,P,I,B,ft,X),r.renderBufferDirect(I,null,B,ft,R,X),R.onAfterShadow(r,R,P,I,B,ft,X)}}}else if(V.visible){const W=T(R,V,w,S);R.onBeforeShadow(r,R,P,I,B,W,null),r.renderBufferDirect(I,null,B,W,R,null),R.onAfterShadow(r,R,P,I,B,W,null)}}const U=R.children;for(let B=0,V=U.length;B<V;B++)y(U[B],P,I,w,S)}function A(R){R.target.removeEventListener("dispose",A);for(const I in c){const w=c[I],S=R.target.uuid;S in w&&(w[S].dispose(),delete w[S])}}}const o0={[ha]:ua,[da]:ma,[fa]:ga,[Fn]:pa,[ua]:ha,[ma]:da,[ga]:fa,[pa]:Fn};function l0(r,t){function e(){let D=!1;const it=new se;let st=null;const mt=new se(0,0,0,0);return{setMask:function(Q){st!==Q&&!D&&(r.colorMask(Q,Q,Q,Q),st=Q)},setLocked:function(Q){D=Q},setClear:function(Q,Z,vt,Nt,le){le===!0&&(Q*=Nt,Z*=Nt,vt*=Nt),it.set(Q,Z,vt,Nt),mt.equals(it)===!1&&(r.clearColor(Q,Z,vt,Nt),mt.copy(it))},reset:function(){D=!1,st=null,mt.set(-1,0,0,0)}}}function i(){let D=!1,it=!1,st=null,mt=null,Q=null;return{setReversed:function(Z){if(it!==Z){const vt=t.get("EXT_clip_control");Z?vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.ZERO_TO_ONE_EXT):vt.clipControlEXT(vt.LOWER_LEFT_EXT,vt.NEGATIVE_ONE_TO_ONE_EXT),it=Z;const Nt=Q;Q=null,this.setClear(Nt)}},getReversed:function(){return it},setTest:function(Z){Z?j(r.DEPTH_TEST):gt(r.DEPTH_TEST)},setMask:function(Z){st!==Z&&!D&&(r.depthMask(Z),st=Z)},setFunc:function(Z){if(it&&(Z=o0[Z]),mt!==Z){switch(Z){case ha:r.depthFunc(r.NEVER);break;case ua:r.depthFunc(r.ALWAYS);break;case da:r.depthFunc(r.LESS);break;case Fn:r.depthFunc(r.LEQUAL);break;case fa:r.depthFunc(r.EQUAL);break;case pa:r.depthFunc(r.GEQUAL);break;case ma:r.depthFunc(r.GREATER);break;case ga:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}mt=Z}},setLocked:function(Z){D=Z},setClear:function(Z){Q!==Z&&(it&&(Z=1-Z),r.clearDepth(Z),Q=Z)},reset:function(){D=!1,st=null,mt=null,Q=null,it=!1}}}function n(){let D=!1,it=null,st=null,mt=null,Q=null,Z=null,vt=null,Nt=null,le=null;return{setTest:function(te){D||(te?j(r.STENCIL_TEST):gt(r.STENCIL_TEST))},setMask:function(te){it!==te&&!D&&(r.stencilMask(te),it=te)},setFunc:function(te,mi,ri){(st!==te||mt!==mi||Q!==ri)&&(r.stencilFunc(te,mi,ri),st=te,mt=mi,Q=ri)},setOp:function(te,mi,ri){(Z!==te||vt!==mi||Nt!==ri)&&(r.stencilOp(te,mi,ri),Z=te,vt=mi,Nt=ri)},setLocked:function(te){D=te},setClear:function(te){le!==te&&(r.clearStencil(te),le=te)},reset:function(){D=!1,it=null,st=null,mt=null,Q=null,Z=null,vt=null,Nt=null,le=null}}}const s=new e,a=new i,o=new n,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,b=null,T=null,y=null,A=null,R=null,P=new It(0,0,0),I=0,w=!1,S=null,L=null,U=null,B=null,V=null;const W=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,q=0;const X=r.getParameter(r.VERSION);X.indexOf("WebGL")!==-1?(q=parseFloat(/^WebGL (\d)/.exec(X)[1]),k=q>=1):X.indexOf("OpenGL ES")!==-1&&(q=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),k=q>=2);let rt=null,ft={};const Et=r.getParameter(r.SCISSOR_BOX),Gt=r.getParameter(r.VIEWPORT),oe=new se().fromArray(Et),de=new se().fromArray(Gt);function Qt(D,it,st,mt){const Q=new Uint8Array(4),Z=r.createTexture();r.bindTexture(D,Z),r.texParameteri(D,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(D,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let vt=0;vt<st;vt++)D===r.TEXTURE_3D||D===r.TEXTURE_2D_ARRAY?r.texImage3D(it,0,r.RGBA,1,1,mt,0,r.RGBA,r.UNSIGNED_BYTE,Q):r.texImage2D(it+vt,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,Q);return Z}const $={};$[r.TEXTURE_2D]=Qt(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=Qt(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=Qt(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=Qt(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),j(r.DEPTH_TEST),a.setFunc(Fn),Lt(!1),xt(Po),j(r.CULL_FACE),fe(bi);function j(D){h[D]!==!0&&(r.enable(D),h[D]=!0)}function gt(D){h[D]!==!1&&(r.disable(D),h[D]=!1)}function Ut(D,it){return u[D]!==it?(r.bindFramebuffer(D,it),u[D]=it,D===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=it),D===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=it),!0):!1}function Tt(D,it){let st=f,mt=!1;if(D){st=d.get(it),st===void 0&&(st=[],d.set(it,st));const Q=D.textures;if(st.length!==Q.length||st[0]!==r.COLOR_ATTACHMENT0){for(let Z=0,vt=Q.length;Z<vt;Z++)st[Z]=r.COLOR_ATTACHMENT0+Z;st.length=Q.length,mt=!0}}else st[0]!==r.BACK&&(st[0]=r.BACK,mt=!0);mt&&r.drawBuffers(st)}function Yt(D){return m!==D?(r.useProgram(D),m=D,!0):!1}const Pe={[tn]:r.FUNC_ADD,[Qc]:r.FUNC_SUBTRACT,[th]:r.FUNC_REVERSE_SUBTRACT};Pe[eh]=r.MIN,Pe[ih]=r.MAX;const C={[nh]:r.ZERO,[sh]:r.ONE,[rh]:r.SRC_COLOR,[la]:r.SRC_ALPHA,[uh]:r.SRC_ALPHA_SATURATE,[ch]:r.DST_COLOR,[oh]:r.DST_ALPHA,[ah]:r.ONE_MINUS_SRC_COLOR,[ca]:r.ONE_MINUS_SRC_ALPHA,[hh]:r.ONE_MINUS_DST_COLOR,[lh]:r.ONE_MINUS_DST_ALPHA,[dh]:r.CONSTANT_COLOR,[fh]:r.ONE_MINUS_CONSTANT_COLOR,[ph]:r.CONSTANT_ALPHA,[mh]:r.ONE_MINUS_CONSTANT_ALPHA};function fe(D,it,st,mt,Q,Z,vt,Nt,le,te){if(D===bi){_===!0&&(gt(r.BLEND),_=!1);return}if(_===!1&&(j(r.BLEND),_=!0),D!==jc){if(D!==g||te!==w){if((p!==tn||y!==tn)&&(r.blendEquation(r.FUNC_ADD),p=tn,y=tn),te)switch(D){case an:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case be:r.blendFunc(r.ONE,r.ONE);break;case Lo:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case Do:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case an:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case be:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case Lo:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Do:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}b=null,T=null,A=null,R=null,P.set(0,0,0),I=0,g=D,w=te}return}Q=Q||it,Z=Z||st,vt=vt||mt,(it!==p||Q!==y)&&(r.blendEquationSeparate(Pe[it],Pe[Q]),p=it,y=Q),(st!==b||mt!==T||Z!==A||vt!==R)&&(r.blendFuncSeparate(C[st],C[mt],C[Z],C[vt]),b=st,T=mt,A=Z,R=vt),(Nt.equals(P)===!1||le!==I)&&(r.blendColor(Nt.r,Nt.g,Nt.b,le),P.copy(Nt),I=le),g=D,w=!1}function Ft(D,it){D.side===Ce?gt(r.CULL_FACE):j(r.CULL_FACE);let st=D.side===He;it&&(st=!st),Lt(st),D.blending===an&&D.transparent===!1?fe(bi):fe(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const mt=D.stencilWrite;o.setTest(mt),mt&&(o.setMask(D.stencilWriteMask),o.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),o.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Mt(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?j(r.SAMPLE_ALPHA_TO_COVERAGE):gt(r.SAMPLE_ALPHA_TO_COVERAGE)}function Lt(D){S!==D&&(D?r.frontFace(r.CW):r.frontFace(r.CCW),S=D)}function xt(D){D!==Zc?(j(r.CULL_FACE),D!==L&&(D===Po?r.cullFace(r.BACK):D===Jc?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):gt(r.CULL_FACE),L=D}function pe(D){D!==U&&(k&&r.lineWidth(D),U=D)}function Mt(D,it,st){D?(j(r.POLYGON_OFFSET_FILL),(B!==it||V!==st)&&(r.polygonOffset(it,st),B=it,V=st)):gt(r.POLYGON_OFFSET_FILL)}function Bt(D){D?j(r.SCISSOR_TEST):gt(r.SCISSOR_TEST)}function Ae(D){D===void 0&&(D=r.TEXTURE0+W-1),rt!==D&&(r.activeTexture(D),rt=D)}function xe(D,it,st){st===void 0&&(rt===null?st=r.TEXTURE0+W-1:st=rt);let mt=ft[st];mt===void 0&&(mt={type:void 0,texture:void 0},ft[st]=mt),(mt.type!==D||mt.texture!==it)&&(rt!==st&&(r.activeTexture(st),rt=st),r.bindTexture(D,it||$[D]),mt.type=D,mt.texture=it)}function E(){const D=ft[rt];D!==void 0&&D.type!==void 0&&(r.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function v(){try{r.compressedTexImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function z(){try{r.compressedTexImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function K(){try{r.texSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function J(){try{r.texSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Y(){try{r.compressedTexSubImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function bt(){try{r.compressedTexSubImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function nt(){try{r.texStorage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{r.texStorage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function St(){try{r.texImage2D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{r.texImage3D(...arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ut(D){oe.equals(D)===!1&&(r.scissor(D.x,D.y,D.z,D.w),oe.copy(D))}function Pt(D){de.equals(D)===!1&&(r.viewport(D.x,D.y,D.z,D.w),de.copy(D))}function wt(D,it){let st=c.get(it);st===void 0&&(st=new WeakMap,c.set(it,st));let mt=st.get(D);mt===void 0&&(mt=r.getUniformBlockIndex(it,D.name),st.set(D,mt))}function ot(D,it){const mt=c.get(it).get(D);l.get(it)!==mt&&(r.uniformBlockBinding(it,mt,D.__bindingPointIndex),l.set(it,mt))}function Ot(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),h={},rt=null,ft={},u={},d=new WeakMap,f=[],m=null,_=!1,g=null,p=null,b=null,T=null,y=null,A=null,R=null,P=new It(0,0,0),I=0,w=!1,S=null,L=null,U=null,B=null,V=null,oe.set(0,0,r.canvas.width,r.canvas.height),de.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:j,disable:gt,bindFramebuffer:Ut,drawBuffers:Tt,useProgram:Yt,setBlending:fe,setMaterial:Ft,setFlipSided:Lt,setCullFace:xt,setLineWidth:pe,setPolygonOffset:Mt,setScissorTest:Bt,activeTexture:Ae,bindTexture:xe,unbindTexture:E,compressedTexImage2D:v,compressedTexImage3D:z,texImage2D:St,texImage3D:et,updateUBOMapping:wt,uniformBlockBinding:ot,texStorage2D:nt,texStorage3D:yt,texSubImage2D:K,texSubImage3D:J,compressedTexSubImage2D:Y,compressedTexSubImage3D:bt,scissor:ut,viewport:Pt,reset:Ot}}function c0(r,t,e,i,n,s,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ct,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,v){return f?new OffscreenCanvas(E,v):ur("canvas")}function _(E,v,z){let K=1;const J=xe(E);if((J.width>z||J.height>z)&&(K=z/Math.max(J.width,J.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const Y=Math.floor(K*J.width),bt=Math.floor(K*J.height);u===void 0&&(u=m(Y,bt));const nt=v?m(Y,bt):u;return nt.width=Y,nt.height=bt,nt.getContext("2d").drawImage(E,0,0,Y,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+Y+"x"+bt+")."),nt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),E;return E}function g(E){return E.generateMipmaps}function p(E){r.generateMipmap(E)}function b(E){return E.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?r.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function T(E,v,z,K,J=!1){if(E!==null){if(r[E]!==void 0)return r[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let Y=v;if(v===r.RED&&(z===r.FLOAT&&(Y=r.R32F),z===r.HALF_FLOAT&&(Y=r.R16F),z===r.UNSIGNED_BYTE&&(Y=r.R8)),v===r.RED_INTEGER&&(z===r.UNSIGNED_BYTE&&(Y=r.R8UI),z===r.UNSIGNED_SHORT&&(Y=r.R16UI),z===r.UNSIGNED_INT&&(Y=r.R32UI),z===r.BYTE&&(Y=r.R8I),z===r.SHORT&&(Y=r.R16I),z===r.INT&&(Y=r.R32I)),v===r.RG&&(z===r.FLOAT&&(Y=r.RG32F),z===r.HALF_FLOAT&&(Y=r.RG16F),z===r.UNSIGNED_BYTE&&(Y=r.RG8)),v===r.RG_INTEGER&&(z===r.UNSIGNED_BYTE&&(Y=r.RG8UI),z===r.UNSIGNED_SHORT&&(Y=r.RG16UI),z===r.UNSIGNED_INT&&(Y=r.RG32UI),z===r.BYTE&&(Y=r.RG8I),z===r.SHORT&&(Y=r.RG16I),z===r.INT&&(Y=r.RG32I)),v===r.RGB_INTEGER&&(z===r.UNSIGNED_BYTE&&(Y=r.RGB8UI),z===r.UNSIGNED_SHORT&&(Y=r.RGB16UI),z===r.UNSIGNED_INT&&(Y=r.RGB32UI),z===r.BYTE&&(Y=r.RGB8I),z===r.SHORT&&(Y=r.RGB16I),z===r.INT&&(Y=r.RGB32I)),v===r.RGBA_INTEGER&&(z===r.UNSIGNED_BYTE&&(Y=r.RGBA8UI),z===r.UNSIGNED_SHORT&&(Y=r.RGBA16UI),z===r.UNSIGNED_INT&&(Y=r.RGBA32UI),z===r.BYTE&&(Y=r.RGBA8I),z===r.SHORT&&(Y=r.RGBA16I),z===r.INT&&(Y=r.RGBA32I)),v===r.RGB&&(z===r.UNSIGNED_INT_5_9_9_9_REV&&(Y=r.RGB9_E5),z===r.UNSIGNED_INT_10F_11F_11F_REV&&(Y=r.R11F_G11F_B10F)),v===r.RGBA){const bt=J?lr:$t.getTransfer(K);z===r.FLOAT&&(Y=r.RGBA32F),z===r.HALF_FLOAT&&(Y=r.RGBA16F),z===r.UNSIGNED_BYTE&&(Y=bt===ee?r.SRGB8_ALPHA8:r.RGBA8),z===r.UNSIGNED_SHORT_4_4_4_4&&(Y=r.RGBA4),z===r.UNSIGNED_SHORT_5_5_5_1&&(Y=r.RGB5_A1)}return(Y===r.R16F||Y===r.R32F||Y===r.RG16F||Y===r.RG32F||Y===r.RGBA16F||Y===r.RGBA32F)&&t.get("EXT_color_buffer_float"),Y}function y(E,v){let z;return E?v===null||v===on||v===ds?z=r.DEPTH24_STENCIL8:v===ui?z=r.DEPTH32F_STENCIL8:v===us&&(z=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===on||v===ds?z=r.DEPTH_COMPONENT24:v===ui?z=r.DEPTH_COMPONENT32F:v===us&&(z=r.DEPTH_COMPONENT16),z}function A(E,v){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ke&&E.minFilter!==hi?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function R(E){const v=E.target;v.removeEventListener("dispose",R),I(v),v.isVideoTexture&&h.delete(v)}function P(E){const v=E.target;v.removeEventListener("dispose",P),S(v)}function I(E){const v=i.get(E);if(v.__webglInit===void 0)return;const z=E.source,K=d.get(z);if(K){const J=K[v.__cacheKey];J.usedTimes--,J.usedTimes===0&&w(E),Object.keys(K).length===0&&d.delete(z)}i.remove(E)}function w(E){const v=i.get(E);r.deleteTexture(v.__webglTexture);const z=E.source,K=d.get(z);delete K[v.__cacheKey],a.memory.textures--}function S(E){const v=i.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),i.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(v.__webglFramebuffer[K]))for(let J=0;J<v.__webglFramebuffer[K].length;J++)r.deleteFramebuffer(v.__webglFramebuffer[K][J]);else r.deleteFramebuffer(v.__webglFramebuffer[K]);v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer[K])}else{if(Array.isArray(v.__webglFramebuffer))for(let K=0;K<v.__webglFramebuffer.length;K++)r.deleteFramebuffer(v.__webglFramebuffer[K]);else r.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&r.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&r.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let K=0;K<v.__webglColorRenderbuffer.length;K++)v.__webglColorRenderbuffer[K]&&r.deleteRenderbuffer(v.__webglColorRenderbuffer[K]);v.__webglDepthRenderbuffer&&r.deleteRenderbuffer(v.__webglDepthRenderbuffer)}const z=E.textures;for(let K=0,J=z.length;K<J;K++){const Y=i.get(z[K]);Y.__webglTexture&&(r.deleteTexture(Y.__webglTexture),a.memory.textures--),i.remove(z[K])}i.remove(E)}let L=0;function U(){L=0}function B(){const E=L;return E>=n.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+n.maxTextures),L+=1,E}function V(E){const v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function W(E,v){const z=i.get(E);if(E.isVideoTexture&&Bt(E),E.isRenderTargetTexture===!1&&E.isExternalTexture!==!0&&E.version>0&&z.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(z,E,v);return}}else E.isExternalTexture&&(z.__webglTexture=E.sourceTexture?E.sourceTexture:null);e.bindTexture(r.TEXTURE_2D,z.__webglTexture,r.TEXTURE0+v)}function k(E,v){const z=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){$(z,E,v);return}e.bindTexture(r.TEXTURE_2D_ARRAY,z.__webglTexture,r.TEXTURE0+v)}function q(E,v){const z=i.get(E);if(E.isRenderTargetTexture===!1&&E.version>0&&z.__version!==E.version){$(z,E,v);return}e.bindTexture(r.TEXTURE_3D,z.__webglTexture,r.TEXTURE0+v)}function X(E,v){const z=i.get(E);if(E.version>0&&z.__version!==E.version){j(z,E,v);return}e.bindTexture(r.TEXTURE_CUBE_MAP,z.__webglTexture,r.TEXTURE0+v)}const rt={[hs]:r.REPEAT,[sn]:r.CLAMP_TO_EDGE,[xa]:r.MIRRORED_REPEAT},ft={[Ke]:r.NEAREST,[vh]:r.NEAREST_MIPMAP_NEAREST,[Ss]:r.NEAREST_MIPMAP_LINEAR,[hi]:r.LINEAR,[yr]:r.LINEAR_MIPMAP_NEAREST,[rn]:r.LINEAR_MIPMAP_LINEAR},Et={[Sh]:r.NEVER,[Rh]:r.ALWAYS,[wh]:r.LESS,[uc]:r.LEQUAL,[bh]:r.EQUAL,[Ah]:r.GEQUAL,[Th]:r.GREATER,[Eh]:r.NOTEQUAL};function Gt(E,v){if(v.type===ui&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===hi||v.magFilter===yr||v.magFilter===Ss||v.magFilter===rn||v.minFilter===hi||v.minFilter===yr||v.minFilter===Ss||v.minFilter===rn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(E,r.TEXTURE_WRAP_S,rt[v.wrapS]),r.texParameteri(E,r.TEXTURE_WRAP_T,rt[v.wrapT]),(E===r.TEXTURE_3D||E===r.TEXTURE_2D_ARRAY)&&r.texParameteri(E,r.TEXTURE_WRAP_R,rt[v.wrapR]),r.texParameteri(E,r.TEXTURE_MAG_FILTER,ft[v.magFilter]),r.texParameteri(E,r.TEXTURE_MIN_FILTER,ft[v.minFilter]),v.compareFunction&&(r.texParameteri(E,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(E,r.TEXTURE_COMPARE_FUNC,Et[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ke||v.minFilter!==Ss&&v.minFilter!==rn||v.type===ui&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||i.get(v).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");r.texParameterf(E,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,n.getMaxAnisotropy())),i.get(v).__currentAnisotropy=v.anisotropy}}}function oe(E,v){let z=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",R));const K=v.source;let J=d.get(K);J===void 0&&(J={},d.set(K,J));const Y=V(v);if(Y!==E.__cacheKey){J[Y]===void 0&&(J[Y]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,z=!0),J[Y].usedTimes++;const bt=J[E.__cacheKey];bt!==void 0&&(J[E.__cacheKey].usedTimes--,bt.usedTimes===0&&w(v)),E.__cacheKey=Y,E.__webglTexture=J[Y].texture}return z}function de(E,v,z){return Math.floor(Math.floor(E/z)/v)}function Qt(E,v,z,K){const Y=E.updateRanges;if(Y.length===0)e.texSubImage2D(r.TEXTURE_2D,0,0,0,v.width,v.height,z,K,v.data);else{Y.sort((et,ut)=>et.start-ut.start);let bt=0;for(let et=1;et<Y.length;et++){const ut=Y[bt],Pt=Y[et],wt=ut.start+ut.count,ot=de(Pt.start,v.width,4),Ot=de(ut.start,v.width,4);Pt.start<=wt+1&&ot===Ot&&de(Pt.start+Pt.count-1,v.width,4)===ot?ut.count=Math.max(ut.count,Pt.start+Pt.count-ut.start):(++bt,Y[bt]=Pt)}Y.length=bt+1;const nt=r.getParameter(r.UNPACK_ROW_LENGTH),yt=r.getParameter(r.UNPACK_SKIP_PIXELS),St=r.getParameter(r.UNPACK_SKIP_ROWS);r.pixelStorei(r.UNPACK_ROW_LENGTH,v.width);for(let et=0,ut=Y.length;et<ut;et++){const Pt=Y[et],wt=Math.floor(Pt.start/4),ot=Math.ceil(Pt.count/4),Ot=wt%v.width,D=Math.floor(wt/v.width),it=ot,st=1;r.pixelStorei(r.UNPACK_SKIP_PIXELS,Ot),r.pixelStorei(r.UNPACK_SKIP_ROWS,D),e.texSubImage2D(r.TEXTURE_2D,0,Ot,D,it,st,z,K,v.data)}E.clearUpdateRanges(),r.pixelStorei(r.UNPACK_ROW_LENGTH,nt),r.pixelStorei(r.UNPACK_SKIP_PIXELS,yt),r.pixelStorei(r.UNPACK_SKIP_ROWS,St)}}function $(E,v,z){let K=r.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(K=r.TEXTURE_2D_ARRAY),v.isData3DTexture&&(K=r.TEXTURE_3D);const J=oe(E,v),Y=v.source;e.bindTexture(K,E.__webglTexture,r.TEXTURE0+z);const bt=i.get(Y);if(Y.version!==bt.__version||J===!0){e.activeTexture(r.TEXTURE0+z);const nt=$t.getPrimaries($t.workingColorSpace),yt=v.colorSpace===Si?null:$t.getPrimaries(v.colorSpace),St=v.colorSpace===Si||nt===yt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);let et=_(v.image,!1,n.maxTextureSize);et=Ae(v,et);const ut=s.convert(v.format,v.colorSpace),Pt=s.convert(v.type);let wt=T(v.internalFormat,ut,Pt,v.colorSpace,v.isVideoTexture);Gt(K,v);let ot;const Ot=v.mipmaps,D=v.isVideoTexture!==!0,it=bt.__version===void 0||J===!0,st=Y.dataReady,mt=A(v,et);if(v.isDepthTexture)wt=y(v.format===ps,v.type),it&&(D?e.texStorage2D(r.TEXTURE_2D,1,wt,et.width,et.height):e.texImage2D(r.TEXTURE_2D,0,wt,et.width,et.height,0,ut,Pt,null));else if(v.isDataTexture)if(Ot.length>0){D&&it&&e.texStorage2D(r.TEXTURE_2D,mt,wt,Ot[0].width,Ot[0].height);for(let Q=0,Z=Ot.length;Q<Z;Q++)ot=Ot[Q],D?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ot.width,ot.height,ut,Pt,ot.data):e.texImage2D(r.TEXTURE_2D,Q,wt,ot.width,ot.height,0,ut,Pt,ot.data);v.generateMipmaps=!1}else D?(it&&e.texStorage2D(r.TEXTURE_2D,mt,wt,et.width,et.height),st&&Qt(v,et,ut,Pt)):e.texImage2D(r.TEXTURE_2D,0,wt,et.width,et.height,0,ut,Pt,et.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){D&&it&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,wt,Ot[0].width,Ot[0].height,et.depth);for(let Q=0,Z=Ot.length;Q<Z;Q++)if(ot=Ot[Q],v.format!==ni)if(ut!==null)if(D){if(st)if(v.layerUpdates.size>0){const vt=fl(ot.width,ot.height,v.format,v.type);for(const Nt of v.layerUpdates){const le=ot.data.subarray(Nt*vt/ot.data.BYTES_PER_ELEMENT,(Nt+1)*vt/ot.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,Nt,ot.width,ot.height,1,ut,le)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,ot.width,ot.height,et.depth,ut,ot.data)}else e.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Q,wt,ot.width,ot.height,et.depth,0,ot.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else D?st&&e.texSubImage3D(r.TEXTURE_2D_ARRAY,Q,0,0,0,ot.width,ot.height,et.depth,ut,Pt,ot.data):e.texImage3D(r.TEXTURE_2D_ARRAY,Q,wt,ot.width,ot.height,et.depth,0,ut,Pt,ot.data)}else{D&&it&&e.texStorage2D(r.TEXTURE_2D,mt,wt,Ot[0].width,Ot[0].height);for(let Q=0,Z=Ot.length;Q<Z;Q++)ot=Ot[Q],v.format!==ni?ut!==null?D?st&&e.compressedTexSubImage2D(r.TEXTURE_2D,Q,0,0,ot.width,ot.height,ut,ot.data):e.compressedTexImage2D(r.TEXTURE_2D,Q,wt,ot.width,ot.height,0,ot.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):D?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ot.width,ot.height,ut,Pt,ot.data):e.texImage2D(r.TEXTURE_2D,Q,wt,ot.width,ot.height,0,ut,Pt,ot.data)}else if(v.isDataArrayTexture)if(D){if(it&&e.texStorage3D(r.TEXTURE_2D_ARRAY,mt,wt,et.width,et.height,et.depth),st)if(v.layerUpdates.size>0){const Q=fl(et.width,et.height,v.format,v.type);for(const Z of v.layerUpdates){const vt=et.data.subarray(Z*Q/et.data.BYTES_PER_ELEMENT,(Z+1)*Q/et.data.BYTES_PER_ELEMENT);e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,Z,et.width,et.height,1,ut,Pt,vt)}v.clearLayerUpdates()}else e.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,et.width,et.height,et.depth,ut,Pt,et.data)}else e.texImage3D(r.TEXTURE_2D_ARRAY,0,wt,et.width,et.height,et.depth,0,ut,Pt,et.data);else if(v.isData3DTexture)D?(it&&e.texStorage3D(r.TEXTURE_3D,mt,wt,et.width,et.height,et.depth),st&&e.texSubImage3D(r.TEXTURE_3D,0,0,0,0,et.width,et.height,et.depth,ut,Pt,et.data)):e.texImage3D(r.TEXTURE_3D,0,wt,et.width,et.height,et.depth,0,ut,Pt,et.data);else if(v.isFramebufferTexture){if(it)if(D)e.texStorage2D(r.TEXTURE_2D,mt,wt,et.width,et.height);else{let Q=et.width,Z=et.height;for(let vt=0;vt<mt;vt++)e.texImage2D(r.TEXTURE_2D,vt,wt,Q,Z,0,ut,Pt,null),Q>>=1,Z>>=1}}else if(Ot.length>0){if(D&&it){const Q=xe(Ot[0]);e.texStorage2D(r.TEXTURE_2D,mt,wt,Q.width,Q.height)}for(let Q=0,Z=Ot.length;Q<Z;Q++)ot=Ot[Q],D?st&&e.texSubImage2D(r.TEXTURE_2D,Q,0,0,ut,Pt,ot):e.texImage2D(r.TEXTURE_2D,Q,wt,ut,Pt,ot);v.generateMipmaps=!1}else if(D){if(it){const Q=xe(et);e.texStorage2D(r.TEXTURE_2D,mt,wt,Q.width,Q.height)}st&&e.texSubImage2D(r.TEXTURE_2D,0,0,0,ut,Pt,et)}else e.texImage2D(r.TEXTURE_2D,0,wt,ut,Pt,et);g(v)&&p(K),bt.__version=Y.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function j(E,v,z){if(v.image.length!==6)return;const K=oe(E,v),J=v.source;e.bindTexture(r.TEXTURE_CUBE_MAP,E.__webglTexture,r.TEXTURE0+z);const Y=i.get(J);if(J.version!==Y.__version||K===!0){e.activeTexture(r.TEXTURE0+z);const bt=$t.getPrimaries($t.workingColorSpace),nt=v.colorSpace===Si?null:$t.getPrimaries(v.colorSpace),yt=v.colorSpace===Si||bt===nt?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,v.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,v.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);const St=v.isCompressedTexture||v.image[0].isCompressedTexture,et=v.image[0]&&v.image[0].isDataTexture,ut=[];for(let Z=0;Z<6;Z++)!St&&!et?ut[Z]=_(v.image[Z],!0,n.maxCubemapSize):ut[Z]=et?v.image[Z].image:v.image[Z],ut[Z]=Ae(v,ut[Z]);const Pt=ut[0],wt=s.convert(v.format,v.colorSpace),ot=s.convert(v.type),Ot=T(v.internalFormat,wt,ot,v.colorSpace),D=v.isVideoTexture!==!0,it=Y.__version===void 0||K===!0,st=J.dataReady;let mt=A(v,Pt);Gt(r.TEXTURE_CUBE_MAP,v);let Q;if(St){D&&it&&e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,Ot,Pt.width,Pt.height);for(let Z=0;Z<6;Z++){Q=ut[Z].mipmaps;for(let vt=0;vt<Q.length;vt++){const Nt=Q[vt];v.format!==ni?wt!==null?D?st&&e.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,0,0,Nt.width,Nt.height,wt,Nt.data):e.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,Ot,Nt.width,Nt.height,0,Nt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,0,0,Nt.width,Nt.height,wt,ot,Nt.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt,Ot,Nt.width,Nt.height,0,wt,ot,Nt.data)}}}else{if(Q=v.mipmaps,D&&it){Q.length>0&&mt++;const Z=xe(ut[0]);e.texStorage2D(r.TEXTURE_CUBE_MAP,mt,Ot,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(et){D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,ut[Z].width,ut[Z].height,wt,ot,ut[Z].data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ot,ut[Z].width,ut[Z].height,0,wt,ot,ut[Z].data);for(let vt=0;vt<Q.length;vt++){const le=Q[vt].image[Z].image;D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,0,0,le.width,le.height,wt,ot,le.data):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,Ot,le.width,le.height,0,wt,ot,le.data)}}else{D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,wt,ot,ut[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Ot,wt,ot,ut[Z]);for(let vt=0;vt<Q.length;vt++){const Nt=Q[vt];D?st&&e.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,0,0,wt,ot,Nt.image[Z]):e.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+Z,vt+1,Ot,wt,ot,Nt.image[Z])}}}g(v)&&p(r.TEXTURE_CUBE_MAP),Y.__version=J.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function gt(E,v,z,K,J,Y){const bt=s.convert(z.format,z.colorSpace),nt=s.convert(z.type),yt=T(z.internalFormat,bt,nt,z.colorSpace),St=i.get(v),et=i.get(z);if(et.__renderTarget=v,!St.__hasExternalTextures){const ut=Math.max(1,v.width>>Y),Pt=Math.max(1,v.height>>Y);J===r.TEXTURE_3D||J===r.TEXTURE_2D_ARRAY?e.texImage3D(J,Y,yt,ut,Pt,v.depth,0,bt,nt,null):e.texImage2D(J,Y,yt,ut,Pt,0,bt,nt,null)}e.bindFramebuffer(r.FRAMEBUFFER,E),Mt(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,K,J,et.__webglTexture,0,pe(v)):(J===r.TEXTURE_2D||J>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,K,J,et.__webglTexture,Y),e.bindFramebuffer(r.FRAMEBUFFER,null)}function Ut(E,v,z){if(r.bindRenderbuffer(r.RENDERBUFFER,E),v.depthBuffer){const K=v.depthTexture,J=K&&K.isDepthTexture?K.type:null,Y=y(v.stencilBuffer,J),bt=v.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,nt=pe(v);Mt(v)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,nt,Y,v.width,v.height):z?r.renderbufferStorageMultisample(r.RENDERBUFFER,nt,Y,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,Y,v.width,v.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,bt,r.RENDERBUFFER,E)}else{const K=v.textures;for(let J=0;J<K.length;J++){const Y=K[J],bt=s.convert(Y.format,Y.colorSpace),nt=s.convert(Y.type),yt=T(Y.internalFormat,bt,nt,Y.colorSpace),St=pe(v);z&&Mt(v)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,St,yt,v.width,v.height):Mt(v)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,St,yt,v.width,v.height):r.renderbufferStorage(r.RENDERBUFFER,yt,v.width,v.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Tt(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(r.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const K=i.get(v.depthTexture);K.__renderTarget=v,(!K.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),W(v.depthTexture,0);const J=K.__webglTexture,Y=pe(v);if(v.depthTexture.format===fs)Mt(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,J,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,J,0);else if(v.depthTexture.format===ps)Mt(v)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,J,0,Y):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,J,0);else throw new Error("Unknown depthTexture format")}function Yt(E){const v=i.get(E),z=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){const K=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),K){const J=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,K.removeEventListener("dispose",J)};K.addEventListener("dispose",J),v.__depthDisposeCallback=J}v.__boundDepthTexture=K}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(z)throw new Error("target.depthTexture not supported in Cube render targets");const K=E.texture.mipmaps;K&&K.length>0?Tt(v.__webglFramebuffer[0],E):Tt(v.__webglFramebuffer,E)}else if(z){v.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[K]),v.__webglDepthbuffer[K]===void 0)v.__webglDepthbuffer[K]=r.createRenderbuffer(),Ut(v.__webglDepthbuffer[K],E,!1);else{const J=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer[K];r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,Y)}}else{const K=E.texture.mipmaps;if(K&&K.length>0?e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer[0]):e.bindFramebuffer(r.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=r.createRenderbuffer(),Ut(v.__webglDepthbuffer,E,!1);else{const J=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,Y=v.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,Y),r.framebufferRenderbuffer(r.FRAMEBUFFER,J,r.RENDERBUFFER,Y)}}e.bindFramebuffer(r.FRAMEBUFFER,null)}function Pe(E,v,z){const K=i.get(E);v!==void 0&&gt(K.__webglFramebuffer,E,E.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),z!==void 0&&Yt(E)}function C(E){const v=E.texture,z=i.get(E),K=i.get(v);E.addEventListener("dispose",P);const J=E.textures,Y=E.isWebGLCubeRenderTarget===!0,bt=J.length>1;if(bt||(K.__webglTexture===void 0&&(K.__webglTexture=r.createTexture()),K.__version=v.version,a.memory.textures++),Y){z.__webglFramebuffer=[];for(let nt=0;nt<6;nt++)if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer[nt]=[];for(let yt=0;yt<v.mipmaps.length;yt++)z.__webglFramebuffer[nt][yt]=r.createFramebuffer()}else z.__webglFramebuffer[nt]=r.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){z.__webglFramebuffer=[];for(let nt=0;nt<v.mipmaps.length;nt++)z.__webglFramebuffer[nt]=r.createFramebuffer()}else z.__webglFramebuffer=r.createFramebuffer();if(bt)for(let nt=0,yt=J.length;nt<yt;nt++){const St=i.get(J[nt]);St.__webglTexture===void 0&&(St.__webglTexture=r.createTexture(),a.memory.textures++)}if(E.samples>0&&Mt(E)===!1){z.__webglMultisampledFramebuffer=r.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(r.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let nt=0;nt<J.length;nt++){const yt=J[nt];z.__webglColorRenderbuffer[nt]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,z.__webglColorRenderbuffer[nt]);const St=s.convert(yt.format,yt.colorSpace),et=s.convert(yt.type),ut=T(yt.internalFormat,St,et,yt.colorSpace,E.isXRRenderTarget===!0),Pt=pe(E);r.renderbufferStorageMultisample(r.RENDERBUFFER,Pt,ut,E.width,E.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+nt,r.RENDERBUFFER,z.__webglColorRenderbuffer[nt])}r.bindRenderbuffer(r.RENDERBUFFER,null),E.depthBuffer&&(z.__webglDepthRenderbuffer=r.createRenderbuffer(),Ut(z.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(r.FRAMEBUFFER,null)}}if(Y){e.bindTexture(r.TEXTURE_CUBE_MAP,K.__webglTexture),Gt(r.TEXTURE_CUBE_MAP,v);for(let nt=0;nt<6;nt++)if(v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)gt(z.__webglFramebuffer[nt][yt],E,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,yt);else gt(z.__webglFramebuffer[nt],E,v,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+nt,0);g(v)&&p(r.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let nt=0,yt=J.length;nt<yt;nt++){const St=J[nt],et=i.get(St);let ut=r.TEXTURE_2D;(E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(ut=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(ut,et.__webglTexture),Gt(ut,St),gt(z.__webglFramebuffer,E,St,r.COLOR_ATTACHMENT0+nt,ut,0),g(St)&&p(ut)}e.unbindTexture()}else{let nt=r.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(nt=E.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),e.bindTexture(nt,K.__webglTexture),Gt(nt,v),v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)gt(z.__webglFramebuffer[yt],E,v,r.COLOR_ATTACHMENT0,nt,yt);else gt(z.__webglFramebuffer,E,v,r.COLOR_ATTACHMENT0,nt,0);g(v)&&p(nt),e.unbindTexture()}E.depthBuffer&&Yt(E)}function fe(E){const v=E.textures;for(let z=0,K=v.length;z<K;z++){const J=v[z];if(g(J)){const Y=b(E),bt=i.get(J).__webglTexture;e.bindTexture(Y,bt),p(Y),e.unbindTexture()}}}const Ft=[],Lt=[];function xt(E){if(E.samples>0){if(Mt(E)===!1){const v=E.textures,z=E.width,K=E.height;let J=r.COLOR_BUFFER_BIT;const Y=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,bt=i.get(E),nt=v.length>1;if(nt)for(let St=0;St<v.length;St++)e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+St,r.RENDERBUFFER,null),e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+St,r.TEXTURE_2D,null,0);e.bindFramebuffer(r.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer);const yt=E.texture.mipmaps;yt&&yt.length>0?e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer[0]):e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let St=0;St<v.length;St++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(J|=r.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(J|=r.STENCIL_BUFFER_BIT)),nt){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);const et=i.get(v[St]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,et,0)}r.blitFramebuffer(0,0,z,K,0,0,z,K,J,r.NEAREST),l===!0&&(Ft.length=0,Lt.length=0,Ft.push(r.COLOR_ATTACHMENT0+St),E.depthBuffer&&E.resolveDepthBuffer===!1&&(Ft.push(Y),Lt.push(Y),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Lt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,Ft))}if(e.bindFramebuffer(r.READ_FRAMEBUFFER,null),e.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),nt)for(let St=0;St<v.length;St++){e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+St,r.RENDERBUFFER,bt.__webglColorRenderbuffer[St]);const et=i.get(v[St]).__webglTexture;e.bindFramebuffer(r.FRAMEBUFFER,bt.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+St,r.TEXTURE_2D,et,0)}e.bindFramebuffer(r.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const v=E.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[v])}}}function pe(E){return Math.min(n.maxSamples,E.samples)}function Mt(E){const v=i.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function Bt(E){const v=a.render.frame;h.get(E)!==v&&(h.set(E,v),E.update())}function Ae(E,v){const z=E.colorSpace,K=E.format,J=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||z!==Bn&&z!==Si&&($t.getTransfer(z)===ee?(K!==ni||J!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",z)),v}function xe(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=B,this.resetTextureUnits=U,this.setTexture2D=W,this.setTexture2DArray=k,this.setTexture3D=q,this.setTextureCube=X,this.rebindTextures=Pe,this.setupRenderTarget=C,this.updateRenderTargetMipmap=fe,this.updateMultisampleRenderTarget=xt,this.setupDepthRenderbuffer=Yt,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=Mt}function h0(r,t){function e(i,n=Si){let s;const a=$t.getTransfer(n);if(i===pi)return r.UNSIGNED_BYTE;if(i===so)return r.UNSIGNED_SHORT_4_4_4_4;if(i===ro)return r.UNSIGNED_SHORT_5_5_5_1;if(i===ac)return r.UNSIGNED_INT_5_9_9_9_REV;if(i===oc)return r.UNSIGNED_INT_10F_11F_11F_REV;if(i===sc)return r.BYTE;if(i===rc)return r.SHORT;if(i===us)return r.UNSIGNED_SHORT;if(i===no)return r.INT;if(i===on)return r.UNSIGNED_INT;if(i===ui)return r.FLOAT;if(i===Ti)return r.HALF_FLOAT;if(i===lc)return r.ALPHA;if(i===cc)return r.RGB;if(i===ni)return r.RGBA;if(i===fs)return r.DEPTH_COMPONENT;if(i===ps)return r.DEPTH_STENCIL;if(i===ao)return r.RED;if(i===oo)return r.RED_INTEGER;if(i===hc)return r.RG;if(i===lo)return r.RG_INTEGER;if(i===co)return r.RGBA_INTEGER;if(i===ir||i===nr||i===sr||i===rr)if(a===ee)if(s=t.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===ir)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===nr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===sr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===rr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=t.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===ir)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===nr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===sr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===rr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ma||i===ya||i===Sa||i===wa)if(s=t.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Ma)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===ya)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Sa)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===wa)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===ba||i===Ta||i===Ea)if(s=t.get("WEBGL_compressed_texture_etc"),s!==null){if(i===ba||i===Ta)return a===ee?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===Ea)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===Aa||i===Ra||i===Ca||i===Pa||i===La||i===Da||i===Ia||i===Ua||i===Na||i===Fa||i===Oa||i===za||i===Ba||i===ka)if(s=t.get("WEBGL_compressed_texture_astc"),s!==null){if(i===Aa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ra)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ca)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Pa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===La)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Da)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ia)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Ua)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Na)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Fa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Oa)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===za)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Ba)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===ka)return a===ee?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ha||i===Ga||i===Va)if(s=t.get("EXT_texture_compression_bptc"),s!==null){if(i===Ha)return a===ee?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Ga)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Va)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Wa||i===Xa||i===qa||i===Ya)if(s=t.get("EXT_texture_compression_rgtc"),s!==null){if(i===Wa)return s.COMPRESSED_RED_RGTC1_EXT;if(i===Xa)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===qa)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Ya)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ds?r.UNSIGNED_INT_24_8:r[i]!==void 0?r[i]:null}return{convert:e}}const u0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,d0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class f0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const i=new Tc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,i=new Ue({vertexShader:u0,fragmentShader:d0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new O(new Ve(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class p0 extends Wn{constructor(t,e){super();const i=this;let n=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,m=null;const _=typeof XRWebGLBinding<"u",g=new f0,p={},b=e.getContextAttributes();let T=null,y=null;const A=[],R=[],P=new ct;let I=null;const w=new Be;w.viewport=new se;const S=new Be;S.viewport=new se;const L=[w,S],U=new Iu;let B=null,V=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let j=A[$];return j===void 0&&(j=new Wr,A[$]=j),j.getTargetRaySpace()},this.getControllerGrip=function($){let j=A[$];return j===void 0&&(j=new Wr,A[$]=j),j.getGripSpace()},this.getHand=function($){let j=A[$];return j===void 0&&(j=new Wr,A[$]=j),j.getHandSpace()};function W($){const j=R.indexOf($.inputSource);if(j===-1)return;const gt=A[j];gt!==void 0&&(gt.update($.inputSource,$.frame,c||a),gt.dispatchEvent({type:$.type,data:$.inputSource}))}function k(){n.removeEventListener("select",W),n.removeEventListener("selectstart",W),n.removeEventListener("selectend",W),n.removeEventListener("squeeze",W),n.removeEventListener("squeezestart",W),n.removeEventListener("squeezeend",W),n.removeEventListener("end",k),n.removeEventListener("inputsourceschange",q);for(let $=0;$<A.length;$++){const j=R[$];j!==null&&(R[$]=null,A[$].disconnect(j))}B=null,V=null,g.reset();for(const $ in p)delete p[$];t.setRenderTarget(T),f=null,d=null,u=null,n=null,y=null,Qt.stop(),i.isPresenting=!1,t.setPixelRatio(I),t.setSize(P.width,P.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&_&&(u=new XRWebGLBinding(n,e)),u},this.getFrame=function(){return m},this.getSession=function(){return n},this.setSession=async function($){if(n=$,n!==null){if(T=t.getRenderTarget(),n.addEventListener("select",W),n.addEventListener("selectstart",W),n.addEventListener("selectend",W),n.addEventListener("squeeze",W),n.addEventListener("squeezestart",W),n.addEventListener("squeezeend",W),n.addEventListener("end",k),n.addEventListener("inputsourceschange",q),b.xrCompatible!==!0&&await e.makeXRCompatible(),I=t.getPixelRatio(),t.getSize(P),_&&"createProjectionLayer"in XRWebGLBinding.prototype){let gt=null,Ut=null,Tt=null;b.depth&&(Tt=b.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,gt=b.stencil?ps:fs,Ut=b.stencil?ds:on);const Yt={colorFormat:e.RGBA8,depthFormat:Tt,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(Yt),n.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new si(d.textureWidth,d.textureHeight,{format:ni,type:pi,depthTexture:new bc(d.textureWidth,d.textureHeight,Ut,void 0,void 0,void 0,void 0,void 0,void 0,gt),stencilBuffer:b.stencil,colorSpace:t.outputColorSpace,samples:b.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const gt={antialias:b.antialias,alpha:!0,depth:b.depth,stencil:b.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(n,e,gt),n.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new si(f.framebufferWidth,f.framebufferHeight,{format:ni,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:b.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await n.requestReferenceSpace(o),Qt.setContext(n),Qt.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(n!==null)return n.environmentBlendMode},this.getDepthTexture=function(){return g.getDepthTexture()};function q($){for(let j=0;j<$.removed.length;j++){const gt=$.removed[j],Ut=R.indexOf(gt);Ut>=0&&(R[Ut]=null,A[Ut].disconnect(gt))}for(let j=0;j<$.added.length;j++){const gt=$.added[j];let Ut=R.indexOf(gt);if(Ut===-1){for(let Yt=0;Yt<A.length;Yt++)if(Yt>=R.length){R.push(gt),Ut=Yt;break}else if(R[Yt]===null){R[Yt]=gt,Ut=Yt;break}if(Ut===-1)break}const Tt=A[Ut];Tt&&Tt.connect(gt)}}const X=new x,rt=new x;function ft($,j,gt){X.setFromMatrixPosition(j.matrixWorld),rt.setFromMatrixPosition(gt.matrixWorld);const Ut=X.distanceTo(rt),Tt=j.projectionMatrix.elements,Yt=gt.projectionMatrix.elements,Pe=Tt[14]/(Tt[10]-1),C=Tt[14]/(Tt[10]+1),fe=(Tt[9]+1)/Tt[5],Ft=(Tt[9]-1)/Tt[5],Lt=(Tt[8]-1)/Tt[0],xt=(Yt[8]+1)/Yt[0],pe=Pe*Lt,Mt=Pe*xt,Bt=Ut/(-Lt+xt),Ae=Bt*-Lt;if(j.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ae),$.translateZ(Bt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),Tt[10]===-1)$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{const xe=Pe+Bt,E=C+Bt,v=pe-Ae,z=Mt+(Ut-Ae),K=fe*C/E*xe,J=Ft*C/E*xe;$.projectionMatrix.makePerspective(v,z,K,J,xe,E),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Et($,j){j===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(j.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(n===null)return;let j=$.near,gt=$.far;g.texture!==null&&(g.depthNear>0&&(j=g.depthNear),g.depthFar>0&&(gt=g.depthFar)),U.near=S.near=w.near=j,U.far=S.far=w.far=gt,(B!==U.near||V!==U.far)&&(n.updateRenderState({depthNear:U.near,depthFar:U.far}),B=U.near,V=U.far),U.layers.mask=$.layers.mask|6,w.layers.mask=U.layers.mask&3,S.layers.mask=U.layers.mask&5;const Ut=$.parent,Tt=U.cameras;Et(U,Ut);for(let Yt=0;Yt<Tt.length;Yt++)Et(Tt[Yt],Ut);Tt.length===2?ft(U,w,S):U.projectionMatrix.copy(w.projectionMatrix),Gt($,U,Ut)};function Gt($,j,gt){gt===null?$.matrix.copy(j.matrixWorld):($.matrix.copy(gt.matrixWorld),$.matrix.invert(),$.matrix.multiply(j.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(j.projectionMatrix),$.projectionMatrixInverse.copy(j.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=hr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return g.texture!==null},this.getDepthSensingMesh=function(){return g.getMesh(U)},this.getCameraTexture=function($){return p[$]};let oe=null;function de($,j){if(h=j.getViewerPose(c||a),m=j,h!==null){const gt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let Ut=!1;gt.length!==U.cameras.length&&(U.cameras.length=0,Ut=!0);for(let C=0;C<gt.length;C++){const fe=gt[C];let Ft=null;if(f!==null)Ft=f.getViewport(fe);else{const xt=u.getViewSubImage(d,fe);Ft=xt.viewport,C===0&&(t.setRenderTargetTextures(y,xt.colorTexture,xt.depthStencilTexture),t.setRenderTarget(y))}let Lt=L[C];Lt===void 0&&(Lt=new Be,Lt.layers.enable(C),Lt.viewport=new se,L[C]=Lt),Lt.matrix.fromArray(fe.transform.matrix),Lt.matrix.decompose(Lt.position,Lt.quaternion,Lt.scale),Lt.projectionMatrix.fromArray(fe.projectionMatrix),Lt.projectionMatrixInverse.copy(Lt.projectionMatrix).invert(),Lt.viewport.set(Ft.x,Ft.y,Ft.width,Ft.height),C===0&&(U.matrix.copy(Lt.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Ut===!0&&U.cameras.push(Lt)}const Tt=n.enabledFeatures;if(Tt&&Tt.includes("depth-sensing")&&n.depthUsage=="gpu-optimized"&&_){u=i.getBinding();const C=u.getDepthInformation(gt[0]);C&&C.isValid&&C.texture&&g.init(C,n.renderState)}if(Tt&&Tt.includes("camera-access")&&_){t.state.unbindTexture(),u=i.getBinding();for(let C=0;C<gt.length;C++){const fe=gt[C].camera;if(fe){let Ft=p[fe];Ft||(Ft=new Tc,p[fe]=Ft);const Lt=u.getCameraImage(fe);Ft.sourceTexture=Lt}}}}for(let gt=0;gt<A.length;gt++){const Ut=R[gt],Tt=A[gt];Ut!==null&&Tt!==void 0&&Tt.update(Ut,j,c||a)}oe&&oe($,j),j.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:j}),m=null}const Qt=new Lc;Qt.setAnimationLoop(de),this.setAnimationLoop=function($){oe=$},this.dispose=function(){}}}const Zi=new ke,m0=new jt;function g0(r,t){function e(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function i(g,p){p.color.getRGB(g.fogColor.value,_c(r)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function n(g,p,b,T,y){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(g,p):p.isMeshToonMaterial?(s(g,p),u(g,p)):p.isMeshPhongMaterial?(s(g,p),h(g,p)):p.isMeshStandardMaterial?(s(g,p),d(g,p),p.isMeshPhysicalMaterial&&f(g,p,y)):p.isMeshMatcapMaterial?(s(g,p),m(g,p)):p.isMeshDepthMaterial?s(g,p):p.isMeshDistanceMaterial?(s(g,p),_(g,p)):p.isMeshNormalMaterial?s(g,p):p.isLineBasicMaterial?(a(g,p),p.isLineDashedMaterial&&o(g,p)):p.isPointsMaterial?l(g,p,b,T):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,e(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===He&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,e(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===He&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,e(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,e(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const b=t.get(p),T=b.envMap,y=b.envMapRotation;T&&(g.envMap.value=T,Zi.copy(y),Zi.x*=-1,Zi.y*=-1,Zi.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Zi.y*=-1,Zi.z*=-1),g.envMapRotation.value.setFromMatrix4(m0.makeRotationFromEuler(Zi)),g.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,e(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,g.aoMapTransform))}function a(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform))}function o(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,b,T){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*b,g.scale.value=T*.5,p.map&&(g.map.value=p.map,e(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,e(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,e(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function h(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function u(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function d(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function f(g,p,b){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===He&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=b.texture,g.transmissionSamplerSize.value.set(b.width,b.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,g.specularIntensityMapTransform))}function m(g,p){p.matcap&&(g.matcap.value=p.matcap)}function _(g,p){const b=t.get(p).light;g.referencePosition.value.setFromMatrixPosition(b.matrixWorld),g.nearDistance.value=b.shadow.camera.near,g.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:n}}function _0(r,t,e,i){let n={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,T){const y=T.program;i.uniformBlockBinding(b,y)}function c(b,T){let y=n[b.id];y===void 0&&(m(b),y=h(b),n[b.id]=y,b.addEventListener("dispose",g));const A=T.program;i.updateUBOMapping(b,A);const R=t.render.frame;s[b.id]!==R&&(d(b),s[b.id]=R)}function h(b){const T=u();b.__bindingPointIndex=T;const y=r.createBuffer(),A=b.__size,R=b.usage;return r.bindBuffer(r.UNIFORM_BUFFER,y),r.bufferData(r.UNIFORM_BUFFER,A,R),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,T,y),y}function u(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(b){const T=n[b.id],y=b.uniforms,A=b.__cache;r.bindBuffer(r.UNIFORM_BUFFER,T);for(let R=0,P=y.length;R<P;R++){const I=Array.isArray(y[R])?y[R]:[y[R]];for(let w=0,S=I.length;w<S;w++){const L=I[w];if(f(L,R,w,A)===!0){const U=L.__offset,B=Array.isArray(L.value)?L.value:[L.value];let V=0;for(let W=0;W<B.length;W++){const k=B[W],q=_(k);typeof k=="number"||typeof k=="boolean"?(L.__data[0]=k,r.bufferSubData(r.UNIFORM_BUFFER,U+V,L.__data)):k.isMatrix3?(L.__data[0]=k.elements[0],L.__data[1]=k.elements[1],L.__data[2]=k.elements[2],L.__data[3]=0,L.__data[4]=k.elements[3],L.__data[5]=k.elements[4],L.__data[6]=k.elements[5],L.__data[7]=0,L.__data[8]=k.elements[6],L.__data[9]=k.elements[7],L.__data[10]=k.elements[8],L.__data[11]=0):(k.toArray(L.__data,V),V+=q.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,U,L.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(b,T,y,A){const R=b.value,P=T+"_"+y;if(A[P]===void 0)return typeof R=="number"||typeof R=="boolean"?A[P]=R:A[P]=R.clone(),!0;{const I=A[P];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return A[P]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function m(b){const T=b.uniforms;let y=0;const A=16;for(let P=0,I=T.length;P<I;P++){const w=Array.isArray(T[P])?T[P]:[T[P]];for(let S=0,L=w.length;S<L;S++){const U=w[S],B=Array.isArray(U.value)?U.value:[U.value];for(let V=0,W=B.length;V<W;V++){const k=B[V],q=_(k),X=y%A,rt=X%q.boundary,ft=X+rt;y+=rt,ft!==0&&A-ft<q.storage&&(y+=A-ft),U.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=q.storage}}}const R=y%A;return R>0&&(y+=A-R),b.__size=y,b.__cache={},this}function _(b){const T={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(T.boundary=4,T.storage=4):b.isVector2?(T.boundary=8,T.storage=8):b.isVector3||b.isColor?(T.boundary=16,T.storage=12):b.isVector4?(T.boundary=16,T.storage=16):b.isMatrix3?(T.boundary=48,T.storage=48):b.isMatrix4?(T.boundary=64,T.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),T}function g(b){const T=b.target;T.removeEventListener("dispose",g);const y=a.indexOf(T.__bindingPointIndex);a.splice(y,1),r.deleteBuffer(n[T.id]),delete n[T.id],delete s[T.id]}function p(){for(const b in n)r.deleteBuffer(n[b]);a=[],n={},s={}}return{bind:l,update:c,dispose:p}}class v0{constructor(t={}){const{canvas:e=Ph(),context:i=null,depth:n=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=a;const m=new Uint32Array(4),_=new Int32Array(4);let g=null,p=null;const b=[],T=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Bi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const y=this;let A=!1;this._outputColorSpace=we;let R=0,P=0,I=null,w=-1,S=null;const L=new se,U=new se;let B=null;const V=new It(0);let W=0,k=e.width,q=e.height,X=1,rt=null,ft=null;const Et=new se(0,0,k,q),Gt=new se(0,0,k,q);let oe=!1;const de=new go;let Qt=!1,$=!1;const j=new jt,gt=new x,Ut=new se,Tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Yt=!1;function Pe(){return I===null?X:1}let C=i;function fe(M,N){return e.getContext(M,N)}try{const M={alpha:!0,depth:n,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${to}`),e.addEventListener("webglcontextlost",st,!1),e.addEventListener("webglcontextrestored",mt,!1),e.addEventListener("webglcontextcreationerror",Q,!1),C===null){const N="webgl2";if(C=fe(N,M),C===null)throw fe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}let Ft,Lt,xt,pe,Mt,Bt,Ae,xe,E,v,z,K,J,Y,bt,nt,yt,St,et,ut,Pt,wt,ot,Ot;function D(){Ft=new Rp(C),Ft.init(),wt=new h0(C,Ft),Lt=new yp(C,Ft,t,wt),xt=new l0(C,Ft),Lt.reversedDepthBuffer&&d&&xt.buffers.depth.setReversed(!0),pe=new Lp(C),Mt=new $m,Bt=new c0(C,Ft,xt,Mt,Lt,wt,pe),Ae=new wp(y),xe=new Ap(y),E=new Fu(C),ot=new xp(C,E),v=new Cp(C,E,pe,ot),z=new Ip(C,v,E,pe),et=new Dp(C,Lt,Bt),nt=new Sp(Mt),K=new Km(y,Ae,xe,Ft,Lt,ot,nt),J=new g0(y,Mt),Y=new Jm,bt=new n0(Ft),St=new vp(y,Ae,xe,xt,z,f,l),yt=new a0(y,z,Lt),Ot=new _0(C,pe,Lt,xt),ut=new Mp(C,Ft,pe),Pt=new Pp(C,Ft,pe),pe.programs=K.programs,y.capabilities=Lt,y.extensions=Ft,y.properties=Mt,y.renderLists=Y,y.shadowMap=yt,y.state=xt,y.info=pe}D();const it=new p0(y,C);this.xr=it,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const M=Ft.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=Ft.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return X},this.setPixelRatio=function(M){M!==void 0&&(X=M,this.setSize(k,q,!1))},this.getSize=function(M){return M.set(k,q)},this.setSize=function(M,N,H=!0){if(it.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}k=M,q=N,e.width=Math.floor(M*X),e.height=Math.floor(N*X),H===!0&&(e.style.width=M+"px",e.style.height=N+"px"),this.setViewport(0,0,M,N)},this.getDrawingBufferSize=function(M){return M.set(k*X,q*X).floor()},this.setDrawingBufferSize=function(M,N,H){k=M,q=N,X=H,e.width=Math.floor(M*H),e.height=Math.floor(N*H),this.setViewport(0,0,M,N)},this.getCurrentViewport=function(M){return M.copy(L)},this.getViewport=function(M){return M.copy(Et)},this.setViewport=function(M,N,H,G){M.isVector4?Et.set(M.x,M.y,M.z,M.w):Et.set(M,N,H,G),xt.viewport(L.copy(Et).multiplyScalar(X).round())},this.getScissor=function(M){return M.copy(Gt)},this.setScissor=function(M,N,H,G){M.isVector4?Gt.set(M.x,M.y,M.z,M.w):Gt.set(M,N,H,G),xt.scissor(U.copy(Gt).multiplyScalar(X).round())},this.getScissorTest=function(){return oe},this.setScissorTest=function(M){xt.setScissorTest(oe=M)},this.setOpaqueSort=function(M){rt=M},this.setTransparentSort=function(M){ft=M},this.getClearColor=function(M){return M.copy(St.getClearColor())},this.setClearColor=function(){St.setClearColor(...arguments)},this.getClearAlpha=function(){return St.getClearAlpha()},this.setClearAlpha=function(){St.setClearAlpha(...arguments)},this.clear=function(M=!0,N=!0,H=!0){let G=0;if(M){let F=!1;if(I!==null){const tt=I.texture.format;F=tt===co||tt===lo||tt===oo}if(F){const tt=I.texture.type,ht=tt===pi||tt===on||tt===us||tt===ds||tt===so||tt===ro,_t=St.getClearColor(),pt=St.getClearAlpha(),Ct=_t.r,Dt=_t.g,At=_t.b;ht?(m[0]=Ct,m[1]=Dt,m[2]=At,m[3]=pt,C.clearBufferuiv(C.COLOR,0,m)):(_[0]=Ct,_[1]=Dt,_[2]=At,_[3]=pt,C.clearBufferiv(C.COLOR,0,_))}else G|=C.COLOR_BUFFER_BIT}N&&(G|=C.DEPTH_BUFFER_BIT),H&&(G|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",st,!1),e.removeEventListener("webglcontextrestored",mt,!1),e.removeEventListener("webglcontextcreationerror",Q,!1),St.dispose(),Y.dispose(),bt.dispose(),Mt.dispose(),Ae.dispose(),xe.dispose(),z.dispose(),ot.dispose(),Ot.dispose(),K.dispose(),it.dispose(),it.removeEventListener("sessionstart",ri),it.removeEventListener("sessionend",wo),Vi.stop()};function st(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),A=!0}function mt(){console.log("THREE.WebGLRenderer: Context Restored."),A=!1;const M=pe.autoReset,N=yt.enabled,H=yt.autoUpdate,G=yt.needsUpdate,F=yt.type;D(),pe.autoReset=M,yt.enabled=N,yt.autoUpdate=H,yt.needsUpdate=G,yt.type=F}function Q(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Z(M){const N=M.target;N.removeEventListener("dispose",Z),vt(N)}function vt(M){Nt(M),Mt.remove(M)}function Nt(M){const N=Mt.get(M).programs;N!==void 0&&(N.forEach(function(H){K.releaseProgram(H)}),M.isShaderMaterial&&K.releaseShaderCache(M))}this.renderBufferDirect=function(M,N,H,G,F,tt){N===null&&(N=Tt);const ht=F.isMesh&&F.matrixWorld.determinant()<0,_t=Vc(M,N,H,G,F);xt.setMaterial(G,ht);let pt=H.index,Ct=1;if(G.wireframe===!0){if(pt=v.getWireframeAttribute(H),pt===void 0)return;Ct=2}const Dt=H.drawRange,At=H.attributes.position;let Wt=Dt.start*Ct,ie=(Dt.start+Dt.count)*Ct;tt!==null&&(Wt=Math.max(Wt,tt.start*Ct),ie=Math.min(ie,(tt.start+tt.count)*Ct)),pt!==null?(Wt=Math.max(Wt,0),ie=Math.min(ie,pt.count)):At!=null&&(Wt=Math.max(Wt,0),ie=Math.min(ie,At.count));const ve=ie-Wt;if(ve<0||ve===1/0)return;ot.setup(F,G,_t,H,pt);let he,ae=ut;if(pt!==null&&(he=E.get(pt),ae=Pt,ae.setIndex(he)),F.isMesh)G.wireframe===!0?(xt.setLineWidth(G.wireframeLinewidth*Pe()),ae.setMode(C.LINES)):ae.setMode(C.TRIANGLES);else if(F.isLine){let Rt=G.linewidth;Rt===void 0&&(Rt=1),xt.setLineWidth(Rt*Pe()),F.isLineSegments?ae.setMode(C.LINES):F.isLineLoop?ae.setMode(C.LINE_LOOP):ae.setMode(C.LINE_STRIP)}else F.isPoints?ae.setMode(C.POINTS):F.isSprite&&ae.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)ms("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ae.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ft.get("WEBGL_multi_draw"))ae.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Rt=F._multiDrawStarts,ge=F._multiDrawCounts,Zt=F._multiDrawCount,We=pt?E.get(pt).bytesPerElement:1,dn=Mt.get(G).currentProgram.getUniforms();for(let Xe=0;Xe<Zt;Xe++)dn.setValue(C,"_gl_DrawID",Xe),ae.render(Rt[Xe]/We,ge[Xe])}else if(F.isInstancedMesh)ae.renderInstances(Wt,ve,F.count);else if(H.isInstancedBufferGeometry){const Rt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,ge=Math.min(H.instanceCount,Rt);ae.renderInstances(Wt,ve,ge)}else ae.render(Wt,ve)};function le(M,N,H){M.transparent===!0&&M.side===Ce&&M.forceSinglePass===!1?(M.side=He,M.needsUpdate=!0,ys(M,N,H),M.side=Hi,M.needsUpdate=!0,ys(M,N,H),M.side=Ce):ys(M,N,H)}this.compile=function(M,N,H=null){H===null&&(H=M),p=bt.get(H),p.init(N),T.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),M!==H&&M.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const G=new Set;return M.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const tt=F.material;if(tt)if(Array.isArray(tt))for(let ht=0;ht<tt.length;ht++){const _t=tt[ht];le(_t,H,F),G.add(_t)}else le(tt,H,F),G.add(tt)}),p=T.pop(),G},this.compileAsync=function(M,N,H=null){const G=this.compile(M,N,H);return new Promise(F=>{function tt(){if(G.forEach(function(ht){Mt.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){F(M);return}setTimeout(tt,10)}Ft.get("KHR_parallel_shader_compile")!==null?tt():setTimeout(tt,10)})};let te=null;function mi(M){te&&te(M)}function ri(){Vi.stop()}function wo(){Vi.start()}const Vi=new Lc;Vi.setAnimationLoop(mi),typeof self<"u"&&Vi.setContext(self),this.setAnimationLoop=function(M){te=M,it.setAnimationLoop(M),M===null?Vi.stop():Vi.start()},it.addEventListener("sessionstart",ri),it.addEventListener("sessionend",wo),this.render=function(M,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(A===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),it.enabled===!0&&it.isPresenting===!0&&(it.cameraAutoUpdate===!0&&it.updateCamera(N),N=it.getCamera()),M.isScene===!0&&M.onBeforeRender(y,M,N,I),p=bt.get(M,T.length),p.init(N),T.push(p),j.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),de.setFromProjectionMatrix(j,di,N.reversedDepth),$=this.localClippingEnabled,Qt=nt.init(this.clippingPlanes,$),g=Y.get(M,b.length),g.init(),b.push(g),it.enabled===!0&&it.isPresenting===!0){const tt=y.xr.getDepthSensingMesh();tt!==null&&vr(tt,N,-1/0,y.sortObjects)}vr(M,N,0,y.sortObjects),g.finish(),y.sortObjects===!0&&g.sort(rt,ft),Yt=it.enabled===!1||it.isPresenting===!1||it.hasDepthSensing()===!1,Yt&&St.addToRenderList(g,M),this.info.render.frame++,Qt===!0&&nt.beginShadows();const H=p.state.shadowsArray;yt.render(H,M,N),Qt===!0&&nt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=g.opaque,F=g.transmissive;if(p.setupLights(),N.isArrayCamera){const tt=N.cameras;if(F.length>0)for(let ht=0,_t=tt.length;ht<_t;ht++){const pt=tt[ht];To(G,F,M,pt)}Yt&&St.render(M);for(let ht=0,_t=tt.length;ht<_t;ht++){const pt=tt[ht];bo(g,M,pt,pt.viewport)}}else F.length>0&&To(G,F,M,N),Yt&&St.render(M),bo(g,M,N);I!==null&&P===0&&(Bt.updateMultisampleRenderTarget(I),Bt.updateRenderTargetMipmap(I)),M.isScene===!0&&M.onAfterRender(y,M,N),ot.resetDefaultState(),w=-1,S=null,T.pop(),T.length>0?(p=T[T.length-1],Qt===!0&&nt.setGlobalState(y.clippingPlanes,p.state.camera)):p=null,b.pop(),b.length>0?g=b[b.length-1]:g=null};function vr(M,N,H,G){if(M.visible===!1)return;if(M.layers.test(N.layers)){if(M.isGroup)H=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(N);else if(M.isLight)p.pushLight(M),M.castShadow&&p.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||de.intersectsSprite(M)){G&&Ut.setFromMatrixPosition(M.matrixWorld).applyMatrix4(j);const ht=z.update(M),_t=M.material;_t.visible&&g.push(M,ht,_t,H,Ut.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||de.intersectsObject(M))){const ht=z.update(M),_t=M.material;if(G&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),Ut.copy(M.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),Ut.copy(ht.boundingSphere.center)),Ut.applyMatrix4(M.matrixWorld).applyMatrix4(j)),Array.isArray(_t)){const pt=ht.groups;for(let Ct=0,Dt=pt.length;Ct<Dt;Ct++){const At=pt[Ct],Wt=_t[At.materialIndex];Wt&&Wt.visible&&g.push(M,ht,Wt,H,Ut.z,At)}}else _t.visible&&g.push(M,ht,_t,H,Ut.z,null)}}const tt=M.children;for(let ht=0,_t=tt.length;ht<_t;ht++)vr(tt[ht],N,H,G)}function bo(M,N,H,G){const F=M.opaque,tt=M.transmissive,ht=M.transparent;p.setupLightsView(H),Qt===!0&&nt.setGlobalState(y.clippingPlanes,H),G&&xt.viewport(L.copy(G)),F.length>0&&Ms(F,N,H),tt.length>0&&Ms(tt,N,H),ht.length>0&&Ms(ht,N,H),xt.buffers.depth.setTest(!0),xt.buffers.depth.setMask(!0),xt.buffers.color.setMask(!0),xt.setPolygonOffset(!1)}function To(M,N,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new si(1,1,{generateMipmaps:!0,type:Ft.has("EXT_color_buffer_half_float")||Ft.has("EXT_color_buffer_float")?Ti:pi,minFilter:rn,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));const tt=p.state.transmissionRenderTarget[G.id],ht=G.viewport||L;tt.setSize(ht.z*y.transmissionResolutionScale,ht.w*y.transmissionResolutionScale);const _t=y.getRenderTarget(),pt=y.getActiveCubeFace(),Ct=y.getActiveMipmapLevel();y.setRenderTarget(tt),y.getClearColor(V),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),Yt&&St.render(H);const Dt=y.toneMapping;y.toneMapping=Bi;const At=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),Qt===!0&&nt.setGlobalState(y.clippingPlanes,G),Ms(M,H,G),Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt),Ft.has("WEBGL_multisampled_render_to_texture")===!1){let Wt=!1;for(let ie=0,ve=N.length;ie<ve;ie++){const he=N[ie],ae=he.object,Rt=he.geometry,ge=he.material,Zt=he.group;if(ge.side===Ce&&ae.layers.test(G.layers)){const We=ge.side;ge.side=He,ge.needsUpdate=!0,Eo(ae,H,G,Rt,ge,Zt),ge.side=We,ge.needsUpdate=!0,Wt=!0}}Wt===!0&&(Bt.updateMultisampleRenderTarget(tt),Bt.updateRenderTargetMipmap(tt))}y.setRenderTarget(_t,pt,Ct),y.setClearColor(V,W),At!==void 0&&(G.viewport=At),y.toneMapping=Dt}function Ms(M,N,H){const G=N.isScene===!0?N.overrideMaterial:null;for(let F=0,tt=M.length;F<tt;F++){const ht=M[F],_t=ht.object,pt=ht.geometry,Ct=ht.group;let Dt=ht.material;Dt.allowOverride===!0&&G!==null&&(Dt=G),_t.layers.test(H.layers)&&Eo(_t,N,H,pt,Dt,Ct)}}function Eo(M,N,H,G,F,tt){M.onBeforeRender(y,N,H,G,F,tt),M.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),F.onBeforeRender(y,N,H,G,M,tt),F.transparent===!0&&F.side===Ce&&F.forceSinglePass===!1?(F.side=He,F.needsUpdate=!0,y.renderBufferDirect(H,N,G,F,M,tt),F.side=Hi,F.needsUpdate=!0,y.renderBufferDirect(H,N,G,F,M,tt),F.side=Ce):y.renderBufferDirect(H,N,G,F,M,tt),M.onAfterRender(y,N,H,G,F,tt)}function ys(M,N,H){N.isScene!==!0&&(N=Tt);const G=Mt.get(M),F=p.state.lights,tt=p.state.shadowsArray,ht=F.state.version,_t=K.getParameters(M,F.state,tt,N,H),pt=K.getProgramCacheKey(_t);let Ct=G.programs;G.environment=M.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(M.isMeshStandardMaterial?xe:Ae).get(M.envMap||G.environment),G.envMapRotation=G.environment!==null&&M.envMap===null?N.environmentRotation:M.envMapRotation,Ct===void 0&&(M.addEventListener("dispose",Z),Ct=new Map,G.programs=Ct);let Dt=Ct.get(pt);if(Dt!==void 0){if(G.currentProgram===Dt&&G.lightsStateVersion===ht)return Ro(M,_t),Dt}else _t.uniforms=K.getUniforms(M),M.onBeforeCompile(_t,y),Dt=K.acquireProgram(_t,pt),Ct.set(pt,Dt),G.uniforms=_t.uniforms;const At=G.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(At.clippingPlanes=nt.uniform),Ro(M,_t),G.needsLights=Xc(M),G.lightsStateVersion=ht,G.needsLights&&(At.ambientLightColor.value=F.state.ambient,At.lightProbe.value=F.state.probe,At.directionalLights.value=F.state.directional,At.directionalLightShadows.value=F.state.directionalShadow,At.spotLights.value=F.state.spot,At.spotLightShadows.value=F.state.spotShadow,At.rectAreaLights.value=F.state.rectArea,At.ltc_1.value=F.state.rectAreaLTC1,At.ltc_2.value=F.state.rectAreaLTC2,At.pointLights.value=F.state.point,At.pointLightShadows.value=F.state.pointShadow,At.hemisphereLights.value=F.state.hemi,At.directionalShadowMap.value=F.state.directionalShadowMap,At.directionalShadowMatrix.value=F.state.directionalShadowMatrix,At.spotShadowMap.value=F.state.spotShadowMap,At.spotLightMatrix.value=F.state.spotLightMatrix,At.spotLightMap.value=F.state.spotLightMap,At.pointShadowMap.value=F.state.pointShadowMap,At.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Dt,G.uniformsList=null,Dt}function Ao(M){if(M.uniformsList===null){const N=M.currentProgram.getUniforms();M.uniformsList=ar.seqWithValue(N.seq,M.uniforms)}return M.uniformsList}function Ro(M,N){const H=Mt.get(M);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function Vc(M,N,H,G,F){N.isScene!==!0&&(N=Tt),Bt.resetTextureUnits();const tt=N.fog,ht=G.isMeshStandardMaterial?N.environment:null,_t=I===null?y.outputColorSpace:I.isXRRenderTarget===!0?I.texture.colorSpace:Bn,pt=(G.isMeshStandardMaterial?xe:Ae).get(G.envMap||ht),Ct=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Dt=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),At=!!H.morphAttributes.position,Wt=!!H.morphAttributes.normal,ie=!!H.morphAttributes.color;let ve=Bi;G.toneMapped&&(I===null||I.isXRRenderTarget===!0)&&(ve=y.toneMapping);const he=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ae=he!==void 0?he.length:0,Rt=Mt.get(G),ge=p.state.lights;if(Qt===!0&&($===!0||M!==S)){const Fe=M===S&&G.id===w;nt.setState(G,M,Fe)}let Zt=!1;G.version===Rt.__version?(Rt.needsLights&&Rt.lightsStateVersion!==ge.state.version||Rt.outputColorSpace!==_t||F.isBatchedMesh&&Rt.batching===!1||!F.isBatchedMesh&&Rt.batching===!0||F.isBatchedMesh&&Rt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Rt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Rt.instancing===!1||!F.isInstancedMesh&&Rt.instancing===!0||F.isSkinnedMesh&&Rt.skinning===!1||!F.isSkinnedMesh&&Rt.skinning===!0||F.isInstancedMesh&&Rt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Rt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Rt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Rt.instancingMorph===!1&&F.morphTexture!==null||Rt.envMap!==pt||G.fog===!0&&Rt.fog!==tt||Rt.numClippingPlanes!==void 0&&(Rt.numClippingPlanes!==nt.numPlanes||Rt.numIntersection!==nt.numIntersection)||Rt.vertexAlphas!==Ct||Rt.vertexTangents!==Dt||Rt.morphTargets!==At||Rt.morphNormals!==Wt||Rt.morphColors!==ie||Rt.toneMapping!==ve||Rt.morphTargetsCount!==ae)&&(Zt=!0):(Zt=!0,Rt.__version=G.version);let We=Rt.currentProgram;Zt===!0&&(We=ys(G,N,F));let dn=!1,Xe=!1,Kn=!1;const _e=We.getUniforms(),$e=Rt.uniforms;if(xt.useProgram(We.program)&&(dn=!0,Xe=!0,Kn=!0),G.id!==w&&(w=G.id,Xe=!0),dn||S!==M){xt.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),_e.setValue(C,"projectionMatrix",M.projectionMatrix),_e.setValue(C,"viewMatrix",M.matrixWorldInverse);const Ge=_e.map.cameraPosition;Ge!==void 0&&Ge.setValue(C,gt.setFromMatrixPosition(M.matrixWorld)),Lt.logarithmicDepthBuffer&&_e.setValue(C,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&_e.setValue(C,"isOrthographic",M.isOrthographicCamera===!0),S!==M&&(S=M,Xe=!0,Kn=!0)}if(F.isSkinnedMesh){_e.setOptional(C,F,"bindMatrix"),_e.setOptional(C,F,"bindMatrixInverse");const Fe=F.skeleton;Fe&&(Fe.boneTexture===null&&Fe.computeBoneTexture(),_e.setValue(C,"boneTexture",Fe.boneTexture,Bt))}F.isBatchedMesh&&(_e.setOptional(C,F,"batchingTexture"),_e.setValue(C,"batchingTexture",F._matricesTexture,Bt),_e.setOptional(C,F,"batchingIdTexture"),_e.setValue(C,"batchingIdTexture",F._indirectTexture,Bt),_e.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&_e.setValue(C,"batchingColorTexture",F._colorsTexture,Bt));const Ze=H.morphAttributes;if((Ze.position!==void 0||Ze.normal!==void 0||Ze.color!==void 0)&&et.update(F,H,We),(Xe||Rt.receiveShadow!==F.receiveShadow)&&(Rt.receiveShadow=F.receiveShadow,_e.setValue(C,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&($e.envMap.value=pt,$e.flipEnvMap.value=pt.isCubeTexture&&pt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&($e.envMapIntensity.value=N.environmentIntensity),Xe&&(_e.setValue(C,"toneMappingExposure",y.toneMappingExposure),Rt.needsLights&&Wc($e,Kn),tt&&G.fog===!0&&J.refreshFogUniforms($e,tt),J.refreshMaterialUniforms($e,G,X,q,p.state.transmissionRenderTarget[M.id]),ar.upload(C,Ao(Rt),$e,Bt)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ar.upload(C,Ao(Rt),$e,Bt),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&_e.setValue(C,"center",F.center),_e.setValue(C,"modelViewMatrix",F.modelViewMatrix),_e.setValue(C,"normalMatrix",F.normalMatrix),_e.setValue(C,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const Fe=G.uniformsGroups;for(let Ge=0,xr=Fe.length;Ge<xr;Ge++){const Wi=Fe[Ge];Ot.update(Wi,We),Ot.bind(Wi,We)}}return We}function Wc(M,N){M.ambientLightColor.needsUpdate=N,M.lightProbe.needsUpdate=N,M.directionalLights.needsUpdate=N,M.directionalLightShadows.needsUpdate=N,M.pointLights.needsUpdate=N,M.pointLightShadows.needsUpdate=N,M.spotLights.needsUpdate=N,M.spotLightShadows.needsUpdate=N,M.rectAreaLights.needsUpdate=N,M.hemisphereLights.needsUpdate=N}function Xc(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return I},this.setRenderTargetTextures=function(M,N,H){const G=Mt.get(M);G.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,G.__autoAllocateDepthBuffer===!1&&(G.__useRenderToTexture=!1),Mt.get(M.texture).__webglTexture=N,Mt.get(M.depthTexture).__webglTexture=G.__autoAllocateDepthBuffer?void 0:H,G.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,N){const H=Mt.get(M);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0};const qc=C.createFramebuffer();this.setRenderTarget=function(M,N=0,H=0){I=M,R=N,P=H;let G=!0,F=null,tt=!1,ht=!1;if(M){const pt=Mt.get(M);if(pt.__useDefaultFramebuffer!==void 0)xt.bindFramebuffer(C.FRAMEBUFFER,null),G=!1;else if(pt.__webglFramebuffer===void 0)Bt.setupRenderTarget(M);else if(pt.__hasExternalTextures)Bt.rebindTextures(M,Mt.get(M.texture).__webglTexture,Mt.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const At=M.depthTexture;if(pt.__boundDepthTexture!==At){if(At!==null&&Mt.has(At)&&(M.width!==At.image.width||M.height!==At.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Bt.setupDepthRenderbuffer(M)}}const Ct=M.texture;(Ct.isData3DTexture||Ct.isDataArrayTexture||Ct.isCompressedArrayTexture)&&(ht=!0);const Dt=Mt.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Dt[N])?F=Dt[N][H]:F=Dt[N],tt=!0):M.samples>0&&Bt.useMultisampledRTT(M)===!1?F=Mt.get(M).__webglMultisampledFramebuffer:Array.isArray(Dt)?F=Dt[H]:F=Dt,L.copy(M.viewport),U.copy(M.scissor),B=M.scissorTest}else L.copy(Et).multiplyScalar(X).floor(),U.copy(Gt).multiplyScalar(X).floor(),B=oe;if(H!==0&&(F=qc),xt.bindFramebuffer(C.FRAMEBUFFER,F)&&G&&xt.drawBuffers(M,F),xt.viewport(L),xt.scissor(U),xt.setScissorTest(B),tt){const pt=Mt.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+N,pt.__webglTexture,H)}else if(ht){const pt=N;for(let Ct=0;Ct<M.textures.length;Ct++){const Dt=Mt.get(M.textures[Ct]);C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0+Ct,Dt.__webglTexture,H,pt)}}else if(M!==null&&H!==0){const pt=Mt.get(M.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,pt.__webglTexture,H)}w=-1},this.readRenderTargetPixels=function(M,N,H,G,F,tt,ht,_t=0){if(!(M&&M.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let pt=Mt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(pt=pt[ht]),pt){xt.bindFramebuffer(C.FRAMEBUFFER,pt);try{const Ct=M.textures[_t],Dt=Ct.format,At=Ct.type;if(!Lt.textureFormatReadable(Dt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Lt.textureTypeReadable(At)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=M.width-G&&H>=0&&H<=M.height-F&&(M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+_t),C.readPixels(N,H,G,F,wt.convert(Dt),wt.convert(At),tt))}finally{const Ct=I!==null?Mt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(C.FRAMEBUFFER,Ct)}}},this.readRenderTargetPixelsAsync=async function(M,N,H,G,F,tt,ht,_t=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let pt=Mt.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&ht!==void 0&&(pt=pt[ht]),pt)if(N>=0&&N<=M.width-G&&H>=0&&H<=M.height-F){xt.bindFramebuffer(C.FRAMEBUFFER,pt);const Ct=M.textures[_t],Dt=Ct.format,At=Ct.type;if(!Lt.textureFormatReadable(Dt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Lt.textureTypeReadable(At))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Wt=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,Wt),C.bufferData(C.PIXEL_PACK_BUFFER,tt.byteLength,C.STREAM_READ),M.textures.length>1&&C.readBuffer(C.COLOR_ATTACHMENT0+_t),C.readPixels(N,H,G,F,wt.convert(Dt),wt.convert(At),0);const ie=I!==null?Mt.get(I).__webglFramebuffer:null;xt.bindFramebuffer(C.FRAMEBUFFER,ie);const ve=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Lh(C,ve,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,Wt),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,tt),C.deleteBuffer(Wt),C.deleteSync(ve),tt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,N=null,H=0){const G=Math.pow(2,-H),F=Math.floor(M.image.width*G),tt=Math.floor(M.image.height*G),ht=N!==null?N.x:0,_t=N!==null?N.y:0;Bt.setTexture2D(M,0),C.copyTexSubImage2D(C.TEXTURE_2D,H,0,0,ht,_t,F,tt),xt.unbindTexture()};const Yc=C.createFramebuffer(),Kc=C.createFramebuffer();this.copyTextureToTexture=function(M,N,H=null,G=null,F=0,tt=null){tt===null&&(F!==0?(ms("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),tt=F,F=0):tt=0);let ht,_t,pt,Ct,Dt,At,Wt,ie,ve;const he=M.isCompressedTexture?M.mipmaps[tt]:M.image;if(H!==null)ht=H.max.x-H.min.x,_t=H.max.y-H.min.y,pt=H.isBox3?H.max.z-H.min.z:1,Ct=H.min.x,Dt=H.min.y,At=H.isBox3?H.min.z:0;else{const Ze=Math.pow(2,-F);ht=Math.floor(he.width*Ze),_t=Math.floor(he.height*Ze),M.isDataArrayTexture?pt=he.depth:M.isData3DTexture?pt=Math.floor(he.depth*Ze):pt=1,Ct=0,Dt=0,At=0}G!==null?(Wt=G.x,ie=G.y,ve=G.z):(Wt=0,ie=0,ve=0);const ae=wt.convert(N.format),Rt=wt.convert(N.type);let ge;N.isData3DTexture?(Bt.setTexture3D(N,0),ge=C.TEXTURE_3D):N.isDataArrayTexture||N.isCompressedArrayTexture?(Bt.setTexture2DArray(N,0),ge=C.TEXTURE_2D_ARRAY):(Bt.setTexture2D(N,0),ge=C.TEXTURE_2D),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,N.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,N.unpackAlignment);const Zt=C.getParameter(C.UNPACK_ROW_LENGTH),We=C.getParameter(C.UNPACK_IMAGE_HEIGHT),dn=C.getParameter(C.UNPACK_SKIP_PIXELS),Xe=C.getParameter(C.UNPACK_SKIP_ROWS),Kn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,he.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,he.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ct),C.pixelStorei(C.UNPACK_SKIP_ROWS,Dt),C.pixelStorei(C.UNPACK_SKIP_IMAGES,At);const _e=M.isDataArrayTexture||M.isData3DTexture,$e=N.isDataArrayTexture||N.isData3DTexture;if(M.isDepthTexture){const Ze=Mt.get(M),Fe=Mt.get(N),Ge=Mt.get(Ze.__renderTarget),xr=Mt.get(Fe.__renderTarget);xt.bindFramebuffer(C.READ_FRAMEBUFFER,Ge.__webglFramebuffer),xt.bindFramebuffer(C.DRAW_FRAMEBUFFER,xr.__webglFramebuffer);for(let Wi=0;Wi<pt;Wi++)_e&&(C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Mt.get(M).__webglTexture,F,At+Wi),C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Mt.get(N).__webglTexture,tt,ve+Wi)),C.blitFramebuffer(Ct,Dt,ht,_t,Wt,ie,ht,_t,C.DEPTH_BUFFER_BIT,C.NEAREST);xt.bindFramebuffer(C.READ_FRAMEBUFFER,null),xt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else if(F!==0||M.isRenderTargetTexture||Mt.has(M)){const Ze=Mt.get(M),Fe=Mt.get(N);xt.bindFramebuffer(C.READ_FRAMEBUFFER,Yc),xt.bindFramebuffer(C.DRAW_FRAMEBUFFER,Kc);for(let Ge=0;Ge<pt;Ge++)_e?C.framebufferTextureLayer(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ze.__webglTexture,F,At+Ge):C.framebufferTexture2D(C.READ_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Ze.__webglTexture,F),$e?C.framebufferTextureLayer(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,Fe.__webglTexture,tt,ve+Ge):C.framebufferTexture2D(C.DRAW_FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_2D,Fe.__webglTexture,tt),F!==0?C.blitFramebuffer(Ct,Dt,ht,_t,Wt,ie,ht,_t,C.COLOR_BUFFER_BIT,C.NEAREST):$e?C.copyTexSubImage3D(ge,tt,Wt,ie,ve+Ge,Ct,Dt,ht,_t):C.copyTexSubImage2D(ge,tt,Wt,ie,Ct,Dt,ht,_t);xt.bindFramebuffer(C.READ_FRAMEBUFFER,null),xt.bindFramebuffer(C.DRAW_FRAMEBUFFER,null)}else $e?M.isDataTexture||M.isData3DTexture?C.texSubImage3D(ge,tt,Wt,ie,ve,ht,_t,pt,ae,Rt,he.data):N.isCompressedArrayTexture?C.compressedTexSubImage3D(ge,tt,Wt,ie,ve,ht,_t,pt,ae,he.data):C.texSubImage3D(ge,tt,Wt,ie,ve,ht,_t,pt,ae,Rt,he):M.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,tt,Wt,ie,ht,_t,ae,Rt,he.data):M.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,tt,Wt,ie,he.width,he.height,ae,he.data):C.texSubImage2D(C.TEXTURE_2D,tt,Wt,ie,ht,_t,ae,Rt,he);C.pixelStorei(C.UNPACK_ROW_LENGTH,Zt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,We),C.pixelStorei(C.UNPACK_SKIP_PIXELS,dn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Xe),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Kn),tt===0&&N.generateMipmaps&&C.generateMipmap(ge),xt.unbindTexture()},this.initRenderTarget=function(M){Mt.get(M).__webglFramebuffer===void 0&&Bt.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?Bt.setTextureCube(M,0):M.isData3DTexture?Bt.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?Bt.setTexture2DArray(M,0):Bt.setTexture2D(M,0),xt.unbindTexture()},this.resetState=function(){R=0,P=0,I=null,xt.reset(),ot.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return di}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}}class x0 extends mo{constructor(){super();const t=new lt;t.deleteAttribute("uv");const e=new qt({side:He}),i=new qt,n=new fi(16777215,900,28,2);n.position.set(.418,16.199,.3),this.add(n);const s=new O(t,e);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);const a=new su(t,i,6),o=new ce;o.position.set(-10.906,2.009,1.846),o.rotation.set(0,-.195,0),o.scale.set(2.328,7.905,4.651),o.updateMatrix(),a.setMatrixAt(0,o.matrix),o.position.set(-5.607,-.754,-.758),o.rotation.set(0,.994,0),o.scale.set(1.97,1.534,3.955),o.updateMatrix(),a.setMatrixAt(1,o.matrix),o.position.set(6.167,.857,7.803),o.rotation.set(0,.561,0),o.scale.set(3.927,6.285,3.687),o.updateMatrix(),a.setMatrixAt(2,o.matrix),o.position.set(-2.017,.018,6.124),o.rotation.set(0,.333,0),o.scale.set(2.002,4.566,2.064),o.updateMatrix(),a.setMatrixAt(3,o.matrix),o.position.set(2.291,-.756,-2.621),o.rotation.set(0,-.286,0),o.scale.set(1.546,1.552,1.496),o.updateMatrix(),a.setMatrixAt(4,o.matrix),o.position.set(-2.193,-.369,-5.547),o.rotation.set(0,.516,0),o.scale.set(3.875,3.487,2.986),o.updateMatrix(),a.setMatrixAt(5,o.matrix),this.add(a);const l=new O(t,In(50));l.position.set(-16.116,14.37,8.208),l.scale.set(.1,2.428,2.739),this.add(l);const c=new O(t,In(50));c.position.set(-16.109,18.021,-8.207),c.scale.set(.1,2.425,2.751),this.add(c);const h=new O(t,In(17));h.position.set(14.904,12.198,-1.832),h.scale.set(.15,4.265,6.331),this.add(h);const u=new O(t,In(43));u.position.set(-.462,8.89,14.52),u.scale.set(4.38,5.441,.088),this.add(u);const d=new O(t,In(20));d.position.set(3.235,11.486,-12.541),d.scale.set(2.5,2,.1),this.add(d);const f=new O(t,In(100));f.position.set(0,20,0),f.scale.set(1,.1,1),this.add(f)}dispose(){const t=new Set;this.traverse(e=>{e.isMesh&&(t.add(e.geometry),t.add(e.material))});for(const e of t)e.dispose()}}function In(r){return new Tu({color:0,emissive:16777215,emissiveIntensity:r})}const or={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class Yn{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const M0=new Mo(-1,1,1,-1,0,1);class y0 extends ye{constructor(){super(),this.setAttribute("position",new re([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new re([0,2,0,0,2,0],2))}}const S0=new y0;class So{constructor(t){this._mesh=new O(S0,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,M0)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class w0 extends Yn{constructor(t,e="tDiffuse"){super(),this.textureID=e,this.uniforms=null,this.material=null,t instanceof Ue?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=gs.clone(t.uniforms),this.material=new Ue({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this._fsQuad=new So(this.material)}render(t,e,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ol extends Yn{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,i){const n=t.getContext(),s=t.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(n.REPLACE,n.REPLACE,n.REPLACE),s.buffers.stencil.setFunc(n.ALWAYS,a,4294967295),s.buffers.stencil.setClear(o),s.buffers.stencil.setLocked(!0),t.setRenderTarget(i),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(n.EQUAL,1,4294967295),s.buffers.stencil.setOp(n.KEEP,n.KEEP,n.KEEP),s.buffers.stencil.setLocked(!0)}}class b0 extends Yn{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class T0{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const i=t.getSize(new ct);this._width=i.width,this._height=i.height,e=new si(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:Ti}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new w0(or),this.copyPass.material.blending=bi,this.clock=new Uu}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let i=!1;for(let n=0,s=this.passes.length;n<s;n++){const a=this.passes[n];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(n),a.render(this.renderer,this.writeBuffer,this.readBuffer,t,i),a.needsSwap){if(i){const o=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}Ol!==void 0&&(a instanceof Ol?i=!0:a instanceof b0&&(i=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new ct);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const i=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(i,n),this.renderTarget2.setSize(i,n);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,n)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class E0 extends Yn{constructor(t,e,i=null,n=null,s=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=i,this.clearColor=n,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new It}render(t,e,i){const n=t.autoClear;t.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor,t.getClearAlpha())),this.clearAlpha!==null&&(s=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),t.autoClear=n}}const A0={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new It(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class Gn extends Yn{constructor(t,e=1,i,n){super(),this.strength=e,this.radius=i,this.threshold=n,this.resolution=t!==void 0?new ct(t.x,t.y):new ct(256,256),this.clearColor=new It(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new si(s,a,{type:Ti}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let h=0;h<this.nMips;h++){const u=new si(s,a,{type:Ti});u.texture.name="UnrealBloomPass.h"+h,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const d=new si(s,a,{type:Ti});d.texture.name="UnrealBloomPass.v"+h,d.texture.generateMipmaps=!1,this.renderTargetsVertical.push(d),s=Math.round(s/2),a=Math.round(a/2)}const o=A0;this.highPassUniforms=gs.clone(o.uniforms),this.highPassUniforms.luminosityThreshold.value=n,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Ue({uniforms:this.highPassUniforms,vertexShader:o.vertexShader,fragmentShader:o.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let h=0;h<this.nMips;h++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[h])),this.separableBlurMaterials[h].uniforms.invSize.value=new ct(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1),new x(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=gs.clone(or.uniforms),this.blendMaterial=new Ue({uniforms:this.copyUniforms,vertexShader:or.vertexShader,fragmentShader:or.fragmentShader,blending:be,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new It,this._oldClearAlpha=1,this._basic=new ue,this._fsQuad=new So(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,e){let i=Math.round(t/2),n=Math.round(e/2);this.renderTargetBright.setSize(i,n);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,n),this.renderTargetsVertical[s].setSize(i,n),this.separableBlurMaterials[s].uniforms.invSize.value=new ct(1/i,1/n),i=Math.round(i/2),n=Math.round(n/2)}render(t,e,i,n,s){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const a=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),s&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let o=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=o.texture,this.separableBlurMaterials[l].uniforms.direction.value=Gn.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=Gn.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this._fsQuad.render(t),o=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(i),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=a}_getSeparableBlurMaterial(t){const e=[];for(let i=0;i<t;i++)e.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new Ue({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new ct(.5,.5)},direction:{value:new ct(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(t){return new Ue({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}Gn.BlurDirectionX=new ct(1,0);Gn.BlurDirectionY=new ct(0,1);const js={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class R0 extends Yn{constructor(){super(),this.uniforms=gs.clone(js.uniforms),this.material=new bu({name:js.name,uniforms:this.uniforms,vertexShader:js.vertexShader,fragmentShader:js.fragmentShader}),this._fsQuad=new So(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},$t.getTransfer(this._outputColorSpace)===ee&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Jl?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===jl?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ql?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===io?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ec?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ic?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===tc&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this._fsQuad.render(t))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const Xt=(r,t,e)=>Math.min(e,Math.max(t,r)),Qi=(r,t,e)=>r+(t-r)*e,Ht=(r,t,e,i)=>Qi(r,t,1-Math.exp(-e*i)),ra=(r,t,e,i)=>{let n=(t-r+Math.PI)%(Math.PI*2)-Math.PI;return n<-Math.PI&&(n+=Math.PI*2),r+n*(1-Math.exp(-e*i))},dt=(r,t)=>r+Math.random()*(t-r),nn=(r,t=!0)=>{const e=Math.max(0,r),i=Math.floor(e/60),n=Math.floor(e%60);if(!t)return`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}`;const s=Math.floor(e%1*10);return`${String(i).padStart(2,"0")}:${String(n).padStart(2,"0")}.${s}`};function Fc(r){let t=r>>>0;return function(){t|=0,t=t+1831565813|0;let i=Math.imul(t^t>>>15,1|t);return i=i+Math.imul(i^i>>>7,61|i)^i,((i^i>>>14)>>>0)/4294967296}}var Vn,Oc,zc;class C0{constructor(){Mr(this,Vn);this.items=[]}get size(){return this.items.length}push(t,e){const i={value:t,priority:e};this.items.push(i),fn(this,Vn,Oc).call(this,this.items.length-1)}pop(){if(this.items.length===0)return null;const t=this.items[0],e=this.items.pop();return this.items.length>0&&(this.items[0]=e,fn(this,Vn,zc).call(this,0)),t.value}}Vn=new WeakSet,Oc=function(t){const e=this.items[t];for(;t>0;){const i=t-1>>1,n=this.items[i];if(n.priority<=e.priority)break;this.items[i]=e,this.items[t]=n,t=i}},zc=function(t){const e=this.items.length,i=this.items[t];for(;;){const n=t*2+1,s=n+1;let a=t;if(n<e&&this.items[n].priority<this.items[a].priority&&(a=n),s<e&&this.items[s].priority<this.items[a].priority&&(a=s),a===t)break;this.items[t]=this.items[a],this.items[a]=i,t=a}};class P0{constructor(){this.ctx=null,this.master=null,this.comp=null,this.ambientGain=null,this.volume=.65,this.ready=!1,this._noiseBuffer=null,this._ambientStarted=!1}async unlock(){if(this.ctx){if(this.ctx.state==="suspended")try{await this.ctx.resume()}catch{}return!0}const t=window.AudioContext||window.webkitAudioContext;if(!t)return!1;try{return this.ctx=new t({latencyHint:"interactive"}),this.comp=this.ctx.createDynamicsCompressor(),this.comp.threshold.value=-16,this.comp.knee.value=18,this.comp.ratio.value=5,this.comp.attack.value=.003,this.comp.release.value=.22,this.master=this.ctx.createGain(),this.master.gain.value=this.volume,this.master.connect(this.comp),this.comp.connect(this.ctx.destination),this._noiseBuffer=this._createNoiseBuffer(2.2),await this.ctx.resume(),this.ready=!0,this.startAmbience(),!0}catch{return this.ready=!1,!1}}setVolume(t){this.volume=Xt(t,0,1),this.master&&this.ctx&&this.master.gain.setTargetAtTime(this.volume,this.ctx.currentTime,.08)}setPaused(t){!this.ctx||!this.ambientGain||this.ambientGain.gain.setTargetAtTime(t?.012:.05,this.ctx.currentTime,.6)}_createNoiseBuffer(t){const e=Math.floor(this.ctx.sampleRate*t),i=this.ctx.createBuffer(1,e,this.ctx.sampleRate),n=i.getChannelData(0);let s=0;for(let a=0;a<e;a+=1){const o=Math.random()*2-1;s=s*.72+o*.28,n[a]=o*.72+s*.5}return i}_noiseSource(){const t=this.ctx.createBufferSource();return t.buffer=this._noiseBuffer,t.loop=!0,t}_panner(t=0){if(!this.ctx.createStereoPanner)return null;const e=this.ctx.createStereoPanner();return e.pan.value=Xt(t,-1,1),e.connect(this.master),e}_envelope(t,e,i,n){const s=this.ctx.createGain(),a=this.ctx.currentTime;return s.gain.setValueAtTime(1e-4,a),s.gain.linearRampToValueAtTime(n,a+t),s.gain.setValueAtTime(n,a+t+e),s.gain.exponentialRampToValueAtTime(1e-4,a+t+e+i),{gain:s,end:a+t+e+i+.02}}startAmbience(){if(!this.ctx||this._ambientStarted)return;const t=this.ctx;this._ambientStarted=!0,this.ambientGain=t.createGain(),this.ambientGain.gain.value=.05,this.ambientGain.connect(this.master);const e=t.createGain();e.gain.value=.45,e.connect(this.ambientGain);const i=t.createOscillator();i.type="sine",i.frequency.value=44;const n=t.createOscillator();n.type="triangle",n.frequency.value=66.2;const s=t.createBiquadFilter();s.type="lowpass",s.frequency.value=160,s.Q.value=3;const a=t.createGain();a.gain.value=.18,i.connect(s),n.connect(a),a.connect(s),s.connect(e),i.start(),n.start();const o=this._noiseSource(),l=t.createBiquadFilter();l.type="bandpass",l.frequency.value=190,l.Q.value=.6;const c=t.createGain();c.gain.value=.07,o.connect(l),l.connect(c),c.connect(this.ambientGain),o.start();const h=t.createOscillator();h.type="sine",h.frequency.value=.045;const u=t.createGain();u.gain.value=55,h.connect(u),u.connect(s.frequency),h.start()}shoot(t="rifle",e=0){if(!this.ready)return;const i=this.ctx,n=i.currentTime,s=t==="pistol",a=this._panner(e)||this.master,o=this._noiseSource(),l=i.createBiquadFilter();l.type=s?"bandpass":"highpass",l.frequency.value=s?1300:720,l.Q.value=.8;const c=i.createGain();c.gain.setValueAtTime(s?.62:.45,n),c.gain.exponentialRampToValueAtTime(1e-4,n+(s?.13:.09)),o.connect(l),l.connect(c),c.connect(a),o.start(n),o.stop(n+.16);const h=i.createOscillator(),u=i.createGain();h.type="triangle",h.frequency.setValueAtTime(s?170:125,n),h.frequency.exponentialRampToValueAtTime(s?48:36,n+.13),u.gain.setValueAtTime(s?.5:.36,n),u.gain.exponentialRampToValueAtTime(1e-4,n+.17),h.connect(u),u.connect(a),h.start(n),h.stop(n+.18);const d=i.createOscillator(),f=i.createGain();d.type="square",d.frequency.value=s?940:620,f.gain.setValueAtTime(.035,n),f.gain.exponentialRampToValueAtTime(1e-4,n+.055),d.connect(f),f.connect(a),d.start(n),d.stop(n+.06)}reloadStart(){this._click(.06,480,.08),setTimeout(()=>this._click(.05,330,.07),120)}reloadMag(){this._click(.1,240,.11),setTimeout(()=>this._click(.07,410,.05),60)}reloadEnd(){this._click(.09,620,.05),setTimeout(()=>this._click(.08,760,.04),55)}_click(t,e,i){if(!this.ready)return;const n=this.ctx,s=n.currentTime,a=n.createOscillator(),o=n.createGain(),l=n.createBiquadFilter();a.type="square",a.frequency.setValueAtTime(e,s),a.frequency.exponentialRampToValueAtTime(Math.max(60,e*.55),s+i),l.type="bandpass",l.frequency.value=e*1.4,l.Q.value=2.5,o.gain.setValueAtTime(t,s),o.gain.exponentialRampToValueAtTime(1e-4,s+i),a.connect(l),l.connect(o),o.connect(this.master),a.start(s),a.stop(s+i+.02)}hit(t=!1){if(!this.ready)return;const e=this.ctx,i=e.currentTime,n=e.createOscillator(),s=e.createGain();if(n.type="sine",n.frequency.setValueAtTime(t?1480:980,i),n.frequency.exponentialRampToValueAtTime(t?980:620,i+.06),s.gain.setValueAtTime(.11,i),s.gain.exponentialRampToValueAtTime(1e-4,i+.09),n.connect(s),s.connect(this.master),n.start(i),n.stop(i+.1),t){const a=e.createOscillator(),o=e.createGain();a.type="triangle",a.frequency.value=2350,o.gain.setValueAtTime(.045,i+.015),o.gain.exponentialRampToValueAtTime(1e-4,i+.12),a.connect(o),o.connect(this.master),a.start(i+.015),a.stop(i+.13)}}kill(){if(!this.ready)return;const t=this.ctx,e=t.currentTime;[420,620,880].forEach((i,n)=>{const s=t.createOscillator(),a=t.createGain();s.type="triangle",s.frequency.value=i;const o=e+n*.055;a.gain.setValueAtTime(1e-4,o),a.gain.linearRampToValueAtTime(.09,o+.012),a.gain.exponentialRampToValueAtTime(1e-4,o+.22),s.connect(a),a.connect(this.master),s.start(o),s.stop(o+.24)})}enemyShoot(t=0){if(!this.ready)return;const e=this.ctx,i=e.currentTime,n=this._panner(t)||this.master,s=e.createOscillator(),a=e.createGain(),o=e.createBiquadFilter();s.type="sawtooth",s.frequency.setValueAtTime(520,i),s.frequency.exponentialRampToValueAtTime(120,i+.18),o.type="bandpass",o.frequency.value=800,o.Q.value=1.2,a.gain.setValueAtTime(.11,i),a.gain.exponentialRampToValueAtTime(1e-4,i+.2),s.connect(o),o.connect(a),a.connect(n),s.start(i),s.stop(i+.22)}hurt(t=1){if(!this.ready)return;const e=this.ctx,i=e.currentTime,n=e.createOscillator(),s=e.createGain();n.type="sine",n.frequency.setValueAtTime(90,i),n.frequency.exponentialRampToValueAtTime(36,i+.35),s.gain.setValueAtTime(.2*Xt(t,.4,2),i),s.gain.exponentialRampToValueAtTime(1e-4,i+.4),n.connect(s),s.connect(this.master),n.start(i),n.stop(i+.42);const a=this._noiseSource(),o=e.createBiquadFilter();o.type="lowpass",o.frequency.value=520;const l=e.createGain();l.gain.setValueAtTime(.1,i),l.gain.exponentialRampToValueAtTime(1e-4,i+.15),a.connect(o),o.connect(l),l.connect(this.master),a.start(i),a.stop(i+.17)}footstep(t=!1){if(!this.ready)return;const e=this.ctx,i=e.currentTime,n=this._noiseSource(),s=e.createBiquadFilter();s.type="bandpass",s.frequency.value=t?260:180,s.Q.value=.8;const a=e.createGain();a.gain.setValueAtTime(t?.045:.028,i),a.gain.exponentialRampToValueAtTime(1e-4,i+.09),n.connect(s),s.connect(a),a.connect(this.master),n.start(i),n.stop(i+.1)}jump(){this._click(.035,190,.08)}land(){if(!this.ready)return;const t=this.ctx,e=t.currentTime,i=this._noiseSource(),n=t.createBiquadFilter();n.type="lowpass",n.frequency.value=220;const s=t.createGain();s.gain.setValueAtTime(.15,e),s.gain.exponentialRampToValueAtTime(1e-4,e+.15),i.connect(n),n.connect(s),s.connect(this.master),i.start(e),i.stop(e+.17)}impact(t=0){if(!this.ready)return;const e=this.ctx,i=e.currentTime,n=this._panner(t)||this.master,s=this._noiseSource(),a=e.createBiquadFilter();a.type="highpass",a.frequency.value=1900;const o=e.createGain();o.gain.setValueAtTime(.035,i),o.gain.exponentialRampToValueAtTime(1e-4,i+.06),s.connect(a),a.connect(o),o.connect(n),s.start(i),s.stop(i+.07)}explosion(t=0){if(!this.ready)return;const e=this.ctx,i=e.currentTime,n=this._panner(t)||this.master,s=this._noiseSource(),a=e.createBiquadFilter();a.type="lowpass",a.frequency.setValueAtTime(1600,i),a.frequency.exponentialRampToValueAtTime(120,i+.7);const o=e.createGain();o.gain.setValueAtTime(.28,i),o.gain.exponentialRampToValueAtTime(1e-4,i+.85),s.connect(a),a.connect(o),o.connect(n),s.start(i),s.stop(i+.9);const l=e.createOscillator(),c=e.createGain();l.type="sine",l.frequency.setValueAtTime(72,i),l.frequency.exponentialRampToValueAtTime(28,i+.5),c.gain.setValueAtTime(.24,i),c.gain.exponentialRampToValueAtTime(1e-4,i+.6),l.connect(c),c.connect(n),l.start(i),l.stop(i+.62)}pickup(){if(!this.ready)return;const t=this.ctx,e=t.currentTime;[660,990].forEach((i,n)=>{const s=t.createOscillator(),a=t.createGain();s.type="sine",s.frequency.value=i;const o=e+n*.07;a.gain.setValueAtTime(1e-4,o),a.gain.linearRampToValueAtTime(.07,o+.02),a.gain.exponentialRampToValueAtTime(1e-4,o+.25),s.connect(a),a.connect(this.master),s.start(o),s.stop(o+.27)})}uiHover(){this._click(.018,1900,.025)}uiClick(){this._click(.035,760,.05)}victory(){if(!this.ready)return;const t=this.ctx,e=t.currentTime;[196,293.66,392,587.33].forEach((i,n)=>{const s=t.createOscillator(),a=t.createGain();s.type=n===3?"triangle":"sine",s.frequency.value=i;const o=e+n*.18;a.gain.setValueAtTime(1e-4,o),a.gain.linearRampToValueAtTime(.075,o+.05),a.gain.exponentialRampToValueAtTime(1e-4,o+1.2),s.connect(a),a.connect(this.master),s.start(o),s.stop(o+1.25)})}defeat(){if(!this.ready)return;const t=this.ctx,e=t.currentTime;[148,116,73].forEach((i,n)=>{const s=t.createOscillator(),a=t.createGain();s.type="sawtooth",s.frequency.value=i;const o=e+n*.24,l=t.createBiquadFilter();l.type="lowpass",l.frequency.value=420,a.gain.setValueAtTime(1e-4,o),a.gain.linearRampToValueAtTime(.055,o+.04),a.gain.exponentialRampToValueAtTime(1e-4,o+1.4),s.connect(l),l.connect(a),a.connect(this.master),s.start(o),s.stop(o+1.45)})}heartbeat(){if(!this.ready)return;const t=this.ctx,e=t.currentTime;for(let i=0;i<2;i+=1){const n=t.createOscillator(),s=t.createGain();n.type="sine",n.frequency.value=i===0?54:48;const a=e+i*.15;s.gain.setValueAtTime(1e-4,a),s.gain.linearRampToValueAtTime(.18,a+.02),s.gain.exponentialRampToValueAtTime(1e-4,a+.16),n.connect(s),s.connect(this.master),n.start(a),n.stop(a+.18)}}setLowHealth(t){this.ctx&&(this.lowHealth=t)}}class L0{constructor(t){this.element=t,this.locked=!1,this.keys=new Set,this.pressedKeys=new Set,this.mouse={left:!1,right:!1,leftPressed:!1,rightPressed:!1},this.mouseDX=0,this.mouseDY=0,this.wheel=0,this.enabled=!1,this.onLockChange=null,this.onLockError=null,this._bind()}_bind(){this._onKeyDown=t=>{const e=t.code;["Space","KeyW","KeyA","KeyS","KeyD","KeyR","KeyQ","KeyF","Tab","ShiftLeft"].includes(e)&&this.locked&&t.preventDefault(),t.repeat||this.pressedKeys.add(e),this.keys.add(e)},this._onKeyUp=t=>{this.keys.delete(t.code)},this._onMouseDown=t=>{this.locked&&(t.button===0&&(this.mouse.left=!0,this.mouse.leftPressed=!0),t.button===2&&(this.mouse.right=!0,this.mouse.rightPressed=!0))},this._onMouseUp=t=>{t.button===0&&(this.mouse.left=!1),t.button===2&&(this.mouse.right=!1)},this._onMouseMove=t=>{this.locked&&(this.mouseDX+=t.movementX||0,this.mouseDY+=t.movementY||0)},this._onWheel=t=>{this.locked&&(t.preventDefault(),this.wheel+=Math.sign(t.deltaY))},this._onContextMenu=t=>{this.locked&&t.preventDefault()},this._onBlur=()=>this.releaseAll(),this._onPointerLockChange=()=>{const t=document.pointerLockElement===this.element;t!==this.locked&&(this.locked=t,document.body.classList.toggle("is-locked",t),t?(this.mouse.left=!1,this.mouse.right=!1,this.mouse.leftPressed=!1,this.mouse.rightPressed=!1):this.releaseAll(),this.onLockChange&&this.onLockChange(t))},this._onPointerLockError=()=>{this.onLockError&&this.onLockError()},window.addEventListener("keydown",this._onKeyDown,{passive:!1}),window.addEventListener("keyup",this._onKeyUp),window.addEventListener("mousedown",this._onMouseDown),window.addEventListener("mouseup",this._onMouseUp),window.addEventListener("mousemove",this._onMouseMove),window.addEventListener("wheel",this._onWheel,{passive:!1}),window.addEventListener("contextmenu",this._onContextMenu),window.addEventListener("blur",this._onBlur),document.addEventListener("pointerlockchange",this._onPointerLockChange),document.addEventListener("pointerlockerror",this._onPointerLockError)}_waitForLock(t=700){return document.pointerLockElement===this.element?Promise.resolve(!0):new Promise(e=>{let i=0;const n=o=>{clearTimeout(i),document.removeEventListener("pointerlockchange",s),document.removeEventListener("pointerlockerror",a),e(o)},s=()=>n(document.pointerLockElement===this.element),a=()=>n(!1);document.addEventListener("pointerlockchange",s),document.addEventListener("pointerlockerror",a),i=window.setTimeout(()=>n(document.pointerLockElement===this.element),t)})}async requestLock(){if(this.locked)return!0;const t=this._waitForLock();try{const e=this.element.requestPointerLock({unadjustedMovement:!0});e&&typeof e.then=="function"&&await e.catch(()=>{})}catch{try{this.element.requestPointerLock()}catch{return this.onLockError&&this.onLockError(),!1}}return t}exitLock(){document.pointerLockElement&&document.exitPointerLock()}isDown(t){return this.keys.has(t)}wasPressed(t){return this.pressedKeys.has(t)}consumeMouseDelta(){const t={x:this.mouseDX,y:this.mouseDY};return this.mouseDX=0,this.mouseDY=0,t}consumeWheel(){const t=this.wheel;return this.wheel=0,t}releaseAll(){this.keys.clear(),this.pressedKeys.clear(),this.mouse.left=!1,this.mouse.right=!1,this.mouse.leftPressed=!1,this.mouse.rightPressed=!1,this.mouseDX=0,this.mouseDY=0,this.wheel=0}endFrame(){this.pressedKeys.clear(),this.mouse.leftPressed=!1,this.mouse.rightPressed=!1}dispose(){window.removeEventListener("keydown",this._onKeyDown),window.removeEventListener("keyup",this._onKeyUp),window.removeEventListener("mousedown",this._onMouseDown),window.removeEventListener("mouseup",this._onMouseUp),window.removeEventListener("mousemove",this._onMouseMove),window.removeEventListener("wheel",this._onWheel),window.removeEventListener("contextmenu",this._onContextMenu),window.removeEventListener("blur",this._onBlur),document.removeEventListener("pointerlockchange",this._onPointerLockChange),document.removeEventListener("pointerlockerror",this._onPointerLockError)}}const zl="phantom.settings.v1",ai=Object.freeze({sensitivity:1,fov:78,volume:.65,quality:"high",invertY:!1,reducedMotion:!1}),Bl=new Set(["high","medium","low"]);var cn,Bc,Qa;class D0{constructor(){Mr(this,cn);this.values={...ai},fn(this,cn,Bc).call(this)}get(t){return this.values[t]}set(t,e){if(!(t in ai))return this.values[t];switch(t){case"sensitivity":e=Xt(Number(e)||ai.sensitivity,.2,3);break;case"fov":e=Xt(Number(e)||ai.fov,65,105);break;case"volume":e=Xt(Number(e),0,1);break;case"quality":e=Bl.has(e)?e:ai.quality;break;case"invertY":case"reducedMotion":e=!!e;break}return this.values[t]=e,fn(this,cn,Qa).call(this),e}reset(){return this.values={...ai},fn(this,cn,Qa).call(this),{...this.values}}}cn=new WeakSet,Bc=function(){try{const t=localStorage.getItem(zl);if(!t)return;const e=JSON.parse(t);if(!e||typeof e!="object")return;this.values.sensitivity=Xt(Number(e.sensitivity)||ai.sensitivity,.2,3),this.values.fov=Xt(Number(e.fov)||ai.fov,65,105),this.values.volume=Xt(Number(e.volume??ai.volume),0,1),this.values.quality=Bl.has(e.quality)?e.quality:ai.quality,this.values.invertY=!!e.invertY,this.values.reducedMotion=!!e.reducedMotion}catch{}},Qa=function(){try{localStorage.setItem(zl,JSON.stringify(this.values))}catch{}};function I0(r="rgba(255,255,255,1)",t="rgba(255,255,255,0)"){const e=document.createElement("canvas");e.width=64,e.height=64;const i=e.getContext("2d"),n=i.createRadialGradient(32,32,0,32,32,32);n.addColorStop(0,r),n.addColorStop(1,t),i.fillStyle=n,i.fillRect(0,0,64,64);const s=new un(e);return s.colorSpace=we,s}function U0(){const r=document.createElement("canvas");r.width=128,r.height=128;const t=r.getContext("2d");t.clearRect(0,0,128,128);const e=t.createRadialGradient(64,64,2,64,64,60);e.addColorStop(0,"rgba(2,5,7,0.95)"),e.addColorStop(.35,"rgba(5,9,11,0.8)"),e.addColorStop(.62,"rgba(20,28,32,0.35)"),e.addColorStop(1,"rgba(20,28,32,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),t.strokeStyle="rgba(170,205,214,0.18)",t.lineWidth=1.5,t.beginPath(),t.arc(64,64,34,0,Math.PI*2),t.stroke();const i=new un(r);return i.colorSpace=we,i}class kl{constructor(t,e,i,n=!0){this.count=e,this.cursor=0,this.particles=new Array(e),this.positions=new Float32Array(e*3),this.colors=new Float32Array(e*3),this.sizes=new Float32Array(e),this.alphas=new Float32Array(e);for(let o=0;o<e;o+=1)this.particles[o]={life:0,maxLife:1,vx:0,vy:0,vz:0,gravity:0,drag:0,baseSize:0,grow:0},this.positions[o*3+1]=-1e3;const s=new ye;s.setAttribute("position",new Me(this.positions,3)),s.setAttribute("aColor",new Me(this.colors,3)),s.setAttribute("aSize",new Me(this.sizes,1)),s.setAttribute("aAlpha",new Me(this.alphas,1));const a=new Ue({transparent:!0,depthWrite:!1,blending:i,toneMapped:!1,vertexShader:`
        attribute float aSize;
        attribute float aAlpha;
        attribute vec3 aColor;
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(aSize * (420.0 / max(0.2, -mv.z)), 0.0, 56.0);
          gl_Position = projectionMatrix * mv;
          vAlpha = aAlpha;
          vColor = aColor;
        }
      `,fragmentShader:`
        varying float vAlpha;
        varying vec3 vColor;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.03, d) * vAlpha;
          gl_FragColor = vec4(vColor, a);
        }
      `});this.points=new wc(s,a),this.points.frustumCulled=!1,this.points.renderOrder=8,t.add(this.points),this.geometry=s,this.material=a,this._additive=n}spawn(t,e,i,n,s,a,o,l,c,h=0,u=0,d=0){const f=this.cursor;this.cursor=(this.cursor+1)%this.count;const m=this.particles[f];m.life=c,m.maxLife=c,m.vx=n,m.vy=s,m.vz=a,m.gravity=h,m.drag=u,m.baseSize=l,m.grow=d;const _=f*3;this.positions[_]=t,this.positions[_+1]=e,this.positions[_+2]=i,this.colors[_]=o.r,this.colors[_+1]=o.g,this.colors[_+2]=o.b,this.sizes[f]=l,this.alphas[f]=1,this.geometry.attributes.aColor.needsUpdate=!0}update(t){const{positions:e,alphas:i,sizes:n,particles:s}=this;for(let a=0;a<this.count;a+=1){const o=s[a];if(o.life<=0){i[a]!==0&&(i[a]=0);continue}if(o.life-=t,o.life<=0){i[a]=0;continue}o.vy+=o.gravity*t;const l=Math.max(0,1-o.drag*t);o.vx*=l,o.vz*=l;const c=a*3;e[c]+=o.vx*t,e[c+1]+=o.vy*t,e[c+2]+=o.vz*t,e[c+1]<.02&&o.gravity<0&&(e[c+1]=.02,o.vy*=-.28,o.vx*=.55,o.vz*=.55);const h=o.life/o.maxLife;i[a]=Math.min(1,h*2.2)*.9,n[a]=o.baseSize+(1-h)*o.grow}this.geometry.attributes.position.needsUpdate=!0,this.geometry.attributes.aSize.needsUpdate=!0,this.geometry.attributes.aAlpha.needsUpdate=!0}reset(){for(let t=0;t<this.count;t+=1)this.particles[t].life=0,this.alphas[t]=0;this.geometry.attributes.aAlpha.needsUpdate=!0}}class N0{constructor(t,e,i="high"){this.scene=t,this.camera=e,this.quality=i,this.time=0;const n=i==="low"?260:620,s=i==="low"?90:180;this.sparks=new kl(t,n,be,!0),this.smoke=new kl(t,s,an,!1),this._color=new It,this._color2=new It,this._tmp=new x,this._tmp2=new x,this._quat=new Xn,this._createTracers(),this._createDecals(),this._createShells(),this._createShockwaves(),this._createMuzzleEffects()}_createTracers(){this.tracers=[];for(let t=0;t<22;t+=1){const e=new ye,i=new Float32Array(6);e.setAttribute("position",new Me(i,3));const n=new yc({color:8384255,transparent:!0,opacity:0,blending:be,depthWrite:!1,toneMapped:!1}),s=new lu(e,n);s.frustumCulled=!1,s.visible=!1,this.scene.add(s),this.tracers.push({line:s,life:0,maxLife:.09,material:n})}this._tracerCursor=0}tracer(t,e,i="rifle"){const n=this.tracers[this._tracerCursor];this._tracerCursor=(this._tracerCursor+1)%this.tracers.length;const s=n.line.geometry.attributes.position;s.setXYZ(0,t.x,t.y,t.z),s.setXYZ(1,e.x,e.y,e.z),s.needsUpdate=!0,n.line.visible=!0,n.material.color.setHex(i==="pistol"?16760939:9236479),n.material.opacity=i==="pistol"?.95:.8,n.life=n.maxLife,n.line.geometry.computeBoundingSphere()}_createDecals(){const t=U0(),e=new Ve(1,1);this.decals=[];for(let i=0;i<36;i+=1){const n=new ue({map:t,transparent:!0,opacity:0,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),s=new O(e,n);s.visible=!1,s.renderOrder=2,this.scene.add(s),this.decals.push({mesh:s,life:0,maxLife:26,material:n})}this._decalCursor=0}impact(t,e,i="rifle"){const n=e.clone();this._color.setHex(16756838),this._color2.setHex(10481663);for(let s=0;s<8;s+=1)this.sparks.spawn(t.x+n.x*.04,t.y+n.y*.04,t.z+n.z*.04,n.x*dt(.6,2.8)+dt(-3.2,3.2),n.y*dt(.6,2.6)+dt(-1.4,3.2),n.z*dt(.6,2.8)+dt(-3.2,3.2),Math.random()>.55?this._color2:this._color,dt(.012,.034),dt(.18,.5),-7,1.5);this._color.setRGB(.24,.28,.3);for(let s=0;s<3;s+=1)this.smoke.spawn(t.x+n.x*.08,t.y+n.y*.08,t.z+n.z*.08,n.x*dt(.05,.4)+dt(-.25,.25),dt(.1,.5),n.z*dt(.05,.4)+dt(-.25,.25),this._color,dt(.07,.12),dt(.55,1.1),.2,2.1,.26);this._placeDecal(t,n)}_placeDecal(t,e){const i=this.decals[this._decalCursor];this._decalCursor=(this._decalCursor+1)%this.decals.length,i.mesh.visible=!0,i.mesh.position.copy(t).addScaledVector(e,.012),this._tmp.copy(i.mesh.position).add(e),i.mesh.lookAt(this._tmp);const n=dt(.055,.1);i.mesh.scale.set(n,n,n),i.mesh.rotation.z=Math.random()*Math.PI,i.material.opacity=.88,i.life=i.maxLife}enemyImpact(t,e,i=!1){this._color.setHex(i?16765806:16743516),this._color2.setHex(10155263);for(let n=0;n<12;n+=1)this.sparks.spawn(t.x,t.y,t.z,e.x*dt(.2,1.9)+dt(-3.2,3.2),e.y*dt(.2,1.6)+dt(-.8,3.3),e.z*dt(.2,1.9)+dt(-3.2,3.2),Math.random()>.35?this._color:this._color2,dt(.015,.04),dt(.2,.55),-7,1.8);this._color.setRGB(.05,.45,.5);for(let n=0;n<2;n+=1)this.smoke.spawn(t.x,t.y,t.z,dt(-.2,.2),dt(.2,.7),dt(-.2,.2),this._color,.08,.3,0,2.5,.24)}deathBurst(t,e=16740181){this._color.setHex(e),this._color2.setHex(10352383);for(let i=0;i<34;i+=1){const n=Math.random()*Math.PI*2,s=dt(1.2,7);this.sparks.spawn(t.x,t.y+dt(.4,1.5),t.z,Math.cos(n)*s,dt(.4,5),Math.sin(n)*s,Math.random()>.35?this._color:this._color2,dt(.02,.06),dt(.45,1.15),-8,1.1)}for(let i=0;i<8;i+=1)this.smoke.spawn(t.x,t.y+dt(.3,1.6),t.z,dt(-1.2,1.2),dt(.2,1.2),dt(-1.2,1.2),new It(1845036),dt(.18,.32),dt(.8,1.7),-.2,1.1,.4);this._spawnShockwave(t,e),this._flashLight(t,e,16,.16)}_createShockwaves(){this.shockwaves=[];for(let t=0;t<4;t+=1){const e=new O(new _s(.2,.24,32),new ue({color:16743007,transparent:!0,opacity:0,side:Ce,depthWrite:!1,blending:be,toneMapped:!1}));e.rotation.x=-Math.PI/2,e.visible=!1,this.scene.add(e),this.shockwaves.push({mesh:e,life:0,maxLife:.42,material:e.material})}this._waveCursor=0}_spawnShockwave(t,e){const i=this.shockwaves[this._waveCursor];this._waveCursor=(this._waveCursor+1)%this.shockwaves.length,i.mesh.position.copy(t),i.mesh.position.y=Math.max(.04,t.y),i.mesh.visible=!0,i.mesh.material.color.setHex(e),i.mesh.material.opacity=.6,i.mesh.scale.setScalar(.6),i.life=i.maxLife}_createShells(){const t=new me(.007,.008,.028,6),e=new qt({color:11111250,metalness:.9,roughness:.34});this.shells=[];for(let i=0;i<20;i+=1){const n=new O(t,e);n.visible=!1,n.castShadow=!1,this.scene.add(n),this.shells.push({mesh:n,life:0,vx:0,vy:0,vz:0,rx:0,ry:0,rz:0})}this._shellCursor=0}ejectShell(t,e="rifle"){const i=this.shells[this._shellCursor];this._shellCursor=(this._shellCursor+1)%this.shells.length;const n=this._tmp.set(.3,-.22,-.48).applyMatrix4(t.matrixWorld),s=new x().setFromMatrixColumn(t.matrixWorld,0),a=new x().setFromMatrixColumn(t.matrixWorld,1),o=new x().setFromMatrixColumn(t.matrixWorld,2);i.mesh.position.copy(n),i.mesh.visible=!0;const l=e==="pistol"?1.7:2.2;i.vx=s.x*l+a.x*dt(.8,1.5)+o.x*dt(-.4,.2),i.vy=s.y*l+a.y*dt(.8,1.5)+1.2,i.vz=s.z*l+a.z*dt(.8,1.5)+o.z*dt(-.4,.2),i.rx=dt(-12,12),i.ry=dt(-12,12),i.rz=dt(-12,12),i.life=2.6}_createMuzzleEffects(){const t=I0("rgba(210,250,255,1)","rgba(80,220,255,0)");this.muzzleSprite=new zi(new Ai({map:t,color:11071743,transparent:!0,opacity:0,blending:be,depthWrite:!1,toneMapped:!1})),this.muzzleSprite.scale.set(.4,.4,1),this.scene.add(this.muzzleSprite),this.muzzleLight=new fi(9235199,0,7,2),this.scene.add(this.muzzleLight),this._muzzleLife=0,this.flashLight=new fi(16746340,0,10,2),this.scene.add(this.flashLight),this._flashLife=0,this._flashMaxLife=.2}playerMuzzleFlash(t,e="rifle"){this.muzzleSprite.position.copy(t),this.muzzleSprite.material.color.setHex(e==="pistol"?16765083:11071743);const i=e==="pistol"?.34:.48;this.muzzleSprite.scale.set(i,i,1),this.muzzleSprite.material.rotation=Math.random()*Math.PI*2,this.muzzleSprite.material.opacity=.95,this.muzzleLight.position.copy(t),this.muzzleLight.color.setHex(e==="pistol"?16760714:9235199),this.muzzleLight.intensity=e==="pistol"?7:10,this._muzzleLife=.065,this._color.setRGB(.38,.48,.5);for(let n=0;n<2;n+=1)this.smoke.spawn(t.x,t.y,t.z,dt(-.16,.16),dt(.06,.3),dt(-.16,.16),this._color,dt(.03,.05),dt(.3,.6),-.3,1.2,.1)}_flashLight(t,e,i,n){this.flashLight.position.copy(t),this.flashLight.color.setHex(e),this.flashLight.intensity=i,this._flashLife=n,this._flashMaxLife=n}damagePulse(){}update(t){this.time+=t,this.sparks.update(t),this.smoke.update(t);for(const e of this.tracers)if(!(e.life<=0)){if(e.life-=t,e.life<=0){e.line.visible=!1;continue}e.material.opacity=Xt(e.life/e.maxLife,0,1)*.9}for(const e of this.decals)if(!(e.life<=0)){if(e.life-=t,e.life<=0){e.mesh.visible=!1;continue}e.life<3&&(e.material.opacity=e.life/3*.88)}for(const e of this.shells)e.life<=0||(e.life-=t,e.vy-=12*t,e.mesh.position.x+=e.vx*t,e.mesh.position.y+=e.vy*t,e.mesh.position.z+=e.vz*t,e.mesh.rotation.x+=e.rx*t,e.mesh.rotation.y+=e.ry*t,e.mesh.rotation.z+=e.rz*t,e.mesh.position.y<.02&&(e.mesh.position.y=.02,e.vy*=-.42,e.vx*=.7,e.vz*=.7,e.rx*=.65,e.rz*=.65),e.life<=0&&(e.mesh.visible=!1));for(const e of this.shockwaves){if(e.life<=0)continue;if(e.life-=t,e.life<=0){e.mesh.visible=!1;continue}const i=1-e.life/e.maxLife;e.mesh.scale.setScalar(.6+i*9),e.material.opacity=(1-i)*.55}if(this._muzzleLife>0){this._muzzleLife-=t;const e=Xt(this._muzzleLife/.065,0,1);this.muzzleSprite.material.opacity=e*.95,this.muzzleLight.intensity=e*10,this._muzzleLife<=0&&(this.muzzleSprite.material.opacity=0,this.muzzleLight.intensity=0)}if(this._flashLife>0){this._flashLife-=t;const e=Xt(this._flashLife/this._flashMaxLife,0,1);this.flashLight.intensity=e*16}}reset(){this.sparks.reset(),this.smoke.reset();for(const t of this.tracers)t.life=0,t.line.visible=!1;for(const t of this.decals)t.life=0,t.mesh.visible=!1;for(const t of this.shells)t.life=0,t.mesh.visible=!1;for(const t of this.shockwaves)t.life=0,t.mesh.visible=!1;this._muzzleLife=0,this.muzzleSprite.material.opacity=0,this.muzzleLight.intensity=0,this._flashLife=0,this.flashLight.intensity=0}}const F0=.36,O0=1.78,z0=1.64,B0=.52,k0=20,H0=5.1,G0=8.55,V0=6.35;class W0{constructor({camera:t,world:e,input:i,audio:n,settings:s,callbacks:a={}}){this.camera=t,this.world=e,this.input=i,this.audio=n,this.settings=s,this.callbacks=a,this.position=new x,this.velocity=new x,this.cameraOffset=new x,this.eyePosition=new x,this.yaw=0,this.pitch=0,this.recoilPitch=0,this.recoilYaw=0,this.shake=0,this.shakeTime=0,this.bobPhase=0,this.bobAmount=0,this.landDip=0,this.health=100,this.maxHealth=100,this.shield=50,this.maxShield=50,this.grounded=!0,this.dead=!1,this.sprinting=!1,this.aiming=!1,this.lastDamageAt=-100,this.lastFootstep=0,this.accumulatedTime=0,this.walkSpeed=H0,this.sprintSpeed=G0,this.jumpSpeed=V0,this.gravity=k0,this.radius=F0,this.height=O0,this.eyeHeight=z0,this.lookDX=0,this.lookDY=0,this.speedRatio=0,this._tmpForward=new x,this._tmpRight=new x,this._tmpDesired=new x,this.reset()}reset(){this.position.copy(this.world.playerSpawn),this.position.y=0,this.velocity.set(0,0,0),this.yaw=this.world.playerYaw||0,this.pitch=0,this.recoilPitch=0,this.recoilYaw=0,this.health=this.maxHealth,this.shield=this.maxShield,this.grounded=!0,this.dead=!1,this.sprinting=!1,this.aiming=!1,this.lastDamageAt=-100,this.bobPhase=0,this.bobAmount=0,this.landDip=0,this.shake=0,this.shakeTime=0,this.accumulatedTime=0,this.cameraOffset.set(0,0,0),this._applyCamera()}get isAlive(){return!this.dead&&this.health>0}getEyePosition(t=new x){return t.set(this.position.x,this.position.y+this.eyeHeight,this.position.z)}getForward(t=new x){return t.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw))}getAimDirection(t=new x){return this.camera.getWorldDirection(t)}update(t){if(this.dead){this._updateDeath(t);return}this.accumulatedTime+=t,this.aiming=this.input.mouse.right&&!this.sprinting,this._updateLook(t),this._updateMovement(t),this._updateShield(t),this._updateCameraEffects(t),this._applyCamera()}_updateLook(t){const e=(this.settings.get("sensitivity")||1)*.00195,i=this.input.consumeMouseDelta();this.lookDX=Ht(this.lookDX,Xt(i.x,-80,80),18,t),this.lookDY=Ht(this.lookDY,Xt(i.y,-80,80),18,t),i.x===0&&i.y===0&&(this.lookDX=Ht(this.lookDX,0,7,t),this.lookDY=Ht(this.lookDY,0,7,t));const n=this.aiming?.64:1,s=this.settings.get("invertY")?-1:1;this.yaw-=i.x*e*n,this.pitch-=i.y*e*n*s,this.pitch=Xt(this.pitch,-1.49,1.49),this.recoilPitch=Ht(this.recoilPitch,0,12,t),this.recoilYaw=Ht(this.recoilYaw,0,12,t)}_updateMovement(t){const e=(this.input.isDown("KeyW")?1:0)-(this.input.isDown("KeyS")?1:0),i=(this.input.isDown("KeyD")?1:0)-(this.input.isDown("KeyA")?1:0),n=this.input.isDown("ShiftLeft")||this.input.isDown("ShiftRight"),s=e!==0||i!==0;this.sprinting=n&&s&&!this.input.mouse.right&&e>-.1;let a=this.sprinting?this.sprintSpeed:this.walkSpeed;this.aiming&&(a*=.62);const o=this._tmpForward.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),l=this._tmpRight.set(Math.cos(this.yaw),0,-Math.sin(this.yaw)),c=this._tmpDesired.set(0,0,0);c.addScaledVector(o,e),c.addScaledVector(l,i),c.lengthSq()>1&&c.normalize(),c.multiplyScalar(a);const h=this.grounded?14:3.4;this.velocity.x=Ht(this.velocity.x,c.x,h,t),this.velocity.z=Ht(this.velocity.z,c.z,h,t),this.grounded&&this.input.wasPressed("Space")&&(this.velocity.y=this.jumpSpeed,this.grounded=!1,this.audio.jump(),this.callbacks.onJump&&this.callbacks.onJump());const u=this.grounded,d=this.velocity.y;this.grounded=!1,this.velocity.y-=this.gravity*t,this._moveHorizontal(t),this._moveVertical(t),!u&&this.grounded&&d<-4&&(this.audio.land(),this.landDip=Xt(-d*.022,.035,.16),this.callbacks.onLand&&this.callbacks.onLand(d));const f=Math.hypot(this.velocity.x,this.velocity.z);if(this.speedRatio=Xt(f/this.sprintSpeed,0,1),this.grounded&&f>.6){const m=this.sprinting?.34:.48;this.accumulatedTime-this.lastFootstep>m&&(this.lastFootstep=this.accumulatedTime,this.audio.footstep(this.sprinting))}this.position.y<-2.5&&(this.position.copy(this.world.playerSpawn),this.velocity.set(0,0,0),this.health=Math.max(1,this.health-10),this.callbacks.onOutOfBounds&&this.callbacks.onOutOfBounds())}_moveHorizontal(t){const e=this.velocity.x*t,i=this.velocity.z*t;e!==0&&this._moveAxis("x",e),i!==0&&this._moveAxis("z",i)}_moveAxis(t,e){const i=this.position[t];this.position[t]+=e;for(const n of this.world.colliders){const s=n.box;if(this.position.x+this.radius<=s.min.x||this.position.x-this.radius>=s.max.x||this.position.z+this.radius<=s.min.z||this.position.z-this.radius>=s.max.z)continue;const a=s.max.y,o=s.min.y;if(!(this.position.y+.08<a&&this.position.y+this.height>o))continue;if(a-this.position.y<=B0&&a>this.position.y&&this.velocity.y<=.1&&this._hasHeadroom(this.position.x,a,this.position.z,s)){this.position.y=a,this.grounded=!0,this.velocity.y=0;continue}this.position[t]=i,t==="x"?this.velocity.x=0:this.velocity.z=0;return}}_hasHeadroom(t,e,i,n){for(const s of this.world.colliders){if(s.box===n)continue;const a=s.box;if(!(t+this.radius<=a.min.x||t-this.radius>=a.max.x||i+this.radius<=a.min.z||i-this.radius>=a.max.z)&&e+.05<a.max.y&&e+this.height>a.min.y)return!1}return!0}_moveVertical(t){const e=this.position.y;let i=e+this.velocity.y*t;if(i<=0&&(i=0,this.velocity.y=0,this.grounded=!0),this.velocity.y<=0){let n=this.grounded?0:-1/0;for(const s of this.world.colliders){const a=s.box;if(this.position.x+this.radius*.86<=a.min.x||this.position.x-this.radius*.86>=a.max.x||this.position.z+this.radius*.86<=a.min.z||this.position.z-this.radius*.86>=a.max.z)continue;const o=a.max.y;e>=o-.06&&i<=o+.001&&(n=Math.max(n,o))}n>i&&(i=n,this.velocity.y=0,this.grounded=!0)}else for(const n of this.world.colliders){const s=n.box;if(this.position.x+this.radius*.8<=s.min.x||this.position.x-this.radius*.8>=s.max.x||this.position.z+this.radius*.8<=s.min.z||this.position.z-this.radius*.8>=s.max.z)continue;const a=e+this.height,o=i+this.height;a<=s.min.y+.02&&o>=s.min.y&&(i=s.min.y-this.height,this.velocity.y=0)}this.position.y=i}_updateShield(t){if(this.health<=0)return;this.accumulatedTime-this.lastDamageAt>4.2&&this.shield<this.maxShield&&(this.shield=Math.min(this.maxShield,this.shield+11*t),this.callbacks.onShieldChange&&this.callbacks.onShieldChange(this.shield))}_updateCameraEffects(t){const e=this.settings.get("reducedMotion")?.3:1,i=Math.hypot(this.velocity.x,this.velocity.z),n=this.grounded&&i>.4?this.speedRatio:0;this.bobAmount=Ht(this.bobAmount,n,8,t),this.grounded&&(this.bobPhase+=t*(7.2+this.speedRatio*3.2)),this.landDip=Ht(this.landDip,0,9,t),this.shake=Ht(this.shake,0,7,t),this.shakeTime+=t;const s=Math.sin(this.bobPhase*2)*.015*this.bobAmount*e,a=Math.cos(this.bobPhase)*.018*this.bobAmount*e,o=Math.sin(this.shakeTime*47)*this.shake*.8,l=Math.cos(this.shakeTime*39)*this.shake*.55;this.cameraOffset.set(a+o,s+l-this.landDip,0)}_applyCamera(){this.camera.position.set(this.position.x+this.cameraOffset.x,this.position.y+this.eyeHeight+this.cameraOffset.y,this.position.z+this.cameraOffset.z),this.camera.rotation.order="YXZ",this.camera.rotation.set(this.pitch+this.recoilPitch,this.yaw+this.recoilYaw,0)}addRecoil(t,e){this.recoilPitch=Xt(this.recoilPitch+t,-.15,.22),this.recoilYaw=Xt(this.recoilYaw+e,-.12,.12),this.shake=Xt(this.shake+.01,0,.05)}takeDamage(t,e=null){if(this.dead||t<=0)return 0;const i=this.shield;let n=t;if(this.shield>0){const s=Math.min(this.shield,n);this.shield-=s,n-=s}return n>0&&(this.health=Math.max(0,this.health-n)),this.lastDamageAt=this.accumulatedTime,this.shake=Xt(this.shake+Math.min(.3,t*.014),0,.2),this.callbacks.onDamage&&this.callbacks.onDamage({amount:t,health:this.health,shield:this.shield,shieldAbsorbed:i-this.shield,sourcePosition:e}),this.audio.hurt(Xt(t/12,.5,1.8)),this.health<=0&&(this.dead=!0,this.velocity.set(0,0,0),this.callbacks.onDeath&&this.callbacks.onDeath()),t}heal(t){const e=this.health;return this.health=Math.min(this.maxHealth,this.health+t),this.callbacks.onHeal&&this.callbacks.onHeal(this.health-e),this.health-e}_updateDeath(t){this.landDip=Ht(this.landDip,.85,2.2,t),this.pitch=Ht(this.pitch,-.32,2.4,t),this.yaw+=t*.18,this.camera.position.set(this.position.x,this.position.y+this.eyeHeight-this.landDip,this.position.z),this.camera.rotation.set(this.pitch,this.yaw,Ht(this.camera.rotation.z,.32,2,t))}getDebugState(){return{position:this.position.toArray().map(t=>Number(t.toFixed(2))),yaw:Number(this.yaw.toFixed(3)),pitch:Number(this.pitch.toFixed(3)),health:Number(this.health.toFixed(1)),shield:Number(this.shield.toFixed(1)),grounded:this.grounded,time:nn(this.accumulatedTime)}}}const as=new x;function je(r,t,e,i,n,s){const a=2*Math.PI*n/4,o=Math.max(s-2*n,0),l=Math.PI/4;as.copy(t),as[i]=0,as.normalize();const c=.5*a/(a+o),h=1-as.angleTo(r)/l;return Math.sign(as[e])===1?h*c:o/(a+o)+c+c*(1-h)}class wi extends lt{constructor(t=1,e=1,i=1,n=2,s=.1){const a=n*2+1;if(s=Math.min(t/2,e/2,i/2,s),super(1,1,1,a,a,a),this.type="RoundedBoxGeometry",this.parameters={width:t,height:e,depth:i,segments:n,radius:s},a===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const l=new x,c=new x,h=new x(t,e,i).divideScalar(2).subScalar(s),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,m=u.length/6,_=new x,g=.5/a;for(let p=0,b=0;p<u.length;p+=3,b+=2)switch(l.fromArray(u,p),c.copy(l),c.x-=Math.sign(c.x)*g,c.y-=Math.sign(c.y)*g,c.z-=Math.sign(c.z)*g,c.normalize(),u[p+0]=h.x*Math.sign(l.x)+c.x*s,u[p+1]=h.y*Math.sign(l.y)+c.y*s,u[p+2]=h.z*Math.sign(l.z)+c.z*s,d[p+0]=c.x,d[p+1]=c.y,d[p+2]=c.z,Math.floor(p/m)){case 0:_.set(1,0,0),f[b+0]=je(_,c,"z","y",s,i),f[b+1]=1-je(_,c,"y","z",s,e);break;case 1:_.set(-1,0,0),f[b+0]=1-je(_,c,"z","y",s,i),f[b+1]=1-je(_,c,"y","z",s,e);break;case 2:_.set(0,1,0),f[b+0]=1-je(_,c,"x","z",s,t),f[b+1]=je(_,c,"z","x",s,i);break;case 3:_.set(0,-1,0),f[b+0]=1-je(_,c,"x","z",s,t),f[b+1]=1-je(_,c,"z","x",s,i);break;case 4:_.set(0,0,1),f[b+0]=1-je(_,c,"x","y",s,t),f[b+1]=1-je(_,c,"y","x",s,e);break;case 5:_.set(0,0,-1),f[b+0]=je(_,c,"x","y",s,t),f[b+1]=1-je(_,c,"y","x",s,e);break}}static fromJSON(t){return new wi(t.width,t.height,t.depth,t.segments,t.radius)}}function kc(r,t=!1){const e=r[0].index!==null,i=new Set(Object.keys(r[0].attributes)),n=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new ye;let c=0;for(let h=0;h<r.length;++h){const u=r[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;s[f]===void 0&&(s[f]=[]),s[f].push(u.attributes[f]),d++}if(d!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[f]===void 0&&(a[f]=[]),a[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const u=[];for(let d=0;d<r.length;++d){const f=r[d].index;for(let m=0;m<f.count;++m)u.push(f.getX(m)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(const h in s){const u=Hl(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(const h in a){const u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let _=0;_<a[h].length;++_)f.push(a[h][_][d]);const m=Hl(f);if(!m)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(m)}}return l}function Hl(r){let t,e,i,n=-1,s=0;for(let c=0;c<r.length;++c){const h=r[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(i===void 0&&(i=h.normalized),i!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(n===-1&&(n=h.gpuType),n!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*e}const a=new t(s),o=new Me(a,e,i);let l=0;for(let c=0;c<r.length;++c){const h=r[c];if(h.isInterleavedBufferAttribute){const u=l/e;for(let d=0,f=h.count;d<f;d++)for(let m=0;m<e;m++){const _=h.getComponent(d,m);o.setComponent(d+u,m,_)}}else a.set(h.array,l);l+=h.count*e}return n!==void 0&&(o.gpuType=n),o}function X0(){const r=document.createElement("canvas");r.width=128,r.height=128;const t=r.getContext("2d");t.clearRect(0,0,128,128),t.translate(64,64);const e=t.createRadialGradient(0,0,0,0,0,58);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.08,"rgba(220,250,255,0.95)"),e.addColorStop(.3,"rgba(120,230,255,0.5)"),e.addColorStop(1,"rgba(30,120,180,0)"),t.fillStyle=e,t.fillRect(-64,-64,128,128),t.globalCompositeOperation="lighter";for(let n=0;n<4;n+=1){t.save(),t.rotate(n/4*Math.PI*2+Math.PI/4);const s=t.createLinearGradient(0,0,0,-62);s.addColorStop(0,"rgba(255,255,255,0.9)"),s.addColorStop(1,"rgba(80,220,255,0)"),t.fillStyle=s,t.beginPath(),t.moveTo(-4,0),t.lineTo(0,-58),t.lineTo(4,0),t.closePath(),t.fill(),t.restore()}const i=new un(r);return i.colorSpace=we,i}function Gl(r,t){const e=document.createElement("canvas");e.width=256,e.height=64;const i=e.getContext("2d");i.clearRect(0,0,256,64),i.fillStyle="rgba(4,7,9,0.55)",i.fillRect(0,0,256,64),i.strokeStyle="rgba(107,231,255,0.55)",i.lineWidth=2,i.strokeRect(1,1,254,62),i.fillStyle="#dff8ff",i.font="600 25px monospace",i.fillText(r,13,30),i.fillStyle="rgba(107,231,255,0.8)",i.font="11px monospace",i.fillText(t,14,48);const n=new un(e);return n.colorSpace=we,n}class q0{constructor(t){this.scene=new mo,this.camera=new Be(68,t,.01,12),this.camera.position.set(0,0,0),this.time=0,this.adsProgress=0,this.kick=0,this.swayX=0,this.swayY=0,this.flashTimer=0,this.current="rifle",this._tmpMuzzle=new x,this._lookX=0,this._lookY=0,this._createLights(),this._createMaterials(),this.rig=new Jt,this.rig.position.set(.46,-.35,-.7),this.rig.scale.setScalar(.88),this.scene.add(this.rig),this.rifle=this._buildRifle(),this.pistol=this._buildPistol(),this.pistol.visible=!1,this.rig.add(this.rifle,this.pistol),this.groups={rifle:this.rifle,pistol:this.pistol},this._batchWeapon(this.rifle),this._batchWeapon(this.pistol),this.models={rifle:{hip:new x(.46,-.35,-.7),ads:new x(0,-.167,-.56),hipRot:new ke(-.015,-.065,.02),adsRot:new ke(0,0,0),muzzle:this.rifle.userData.muzzle,magazine:this.rifle.userData.magazine,sightDot:this.rifle.userData.sightDot},pistol:{hip:new x(.36,-.31,-.6),ads:new x(0,-.101,-.47),hipRot:new ke(-.01,-.09,.02),adsRot:new ke(0,0,0),muzzle:this.pistol.userData.muzzle,magazine:this.pistol.userData.magazine,sightDot:this.pistol.userData.sightDot}},this._flashMaterials=[],this._muzzleFlash=new zi(new Ai({map:X0(),color:12252927,transparent:!0,blending:be,depthWrite:!1,toneMapped:!1})),this._muzzleFlash.visible=!1,this._muzzleFlash.scale.set(.36,.36,1),this.scene.add(this._muzzleFlash),this.flashLight=new fi(9431551,0,1.6,2),this.scene.add(this.flashLight)}_batchWeapon(t){if(!t)return;t.updateMatrixWorld(!0);const e=new Set,i=a=>{a&&a.traverse(o=>e.add(o))};i(t.userData.magazine),i(t.userData.sightDot);const n=t.matrixWorld.clone().invert(),s=new Map;t.traverse(a=>{if(!a.isMesh||e.has(a))return;const o=a.material;!o||Array.isArray(o)||o.transparent||o.opacity<1||a.geometry?.attributes?.position&&(s.has(o.uuid)||s.set(o.uuid,{material:o,meshes:[]}),s.get(o.uuid).meshes.push(a))});for(const{material:a,meshes:o}of s.values()){if(o.length<2)continue;const l=[];for(const u of o)try{const d=u.geometry.index?u.geometry.toNonIndexed():u.geometry.clone();for(const m of Object.keys(d.attributes))["position","normal","uv"].includes(m)||d.deleteAttribute(m);if(!d.getAttribute("uv")){const m=d.getAttribute("position").count;d.setAttribute("uv",new Me(new Float32Array(m*2),2))}const f=new jt().multiplyMatrices(n,u.matrixWorld);d.applyMatrix4(f),l.push(d)}catch{l.length=0;break}if(l.length!==o.length)continue;let c=null;try{c=kc(l,!1)}catch{c=null}if(!c)continue;const h=new O(c,a);t.add(h);for(const u of o)u.visible=!1;for(const u of l)u.dispose()}}_createLights(){const t=new Pc(8491162,.95);this.scene.add(t);const e=new Cc(14151156,3.1);e.position.set(-1.3,2,1.2),this.scene.add(e);const i=new fi(6478322,12,3.2,2);i.position.set(.9,.4,-.6),this.scene.add(i);const n=new fi(11125452,3.4,2.8,2);n.position.set(-.8,-.4,-.5),this.scene.add(n)}_createMaterials(){this.mat={body:new qt({color:3423298,roughness:.36,metalness:.82}),bodyDark:new qt({color:1712165,roughness:.46,metalness:.7}),polymer:new qt({color:1514786,roughness:.76,metalness:.18}),brushed:new qt({color:5331809,roughness:.38,metalness:.86}),cyan:new qt({color:463383,emissive:6679039,emissiveIntensity:3,roughness:.22,metalness:.2,toneMapped:!1}),amber:new qt({color:1182724,emissive:16753467,emissiveIntensity:2.5,roughness:.3,metalness:.1,toneMapped:!1}),glass:new ue({color:7530239,transparent:!0,opacity:.28,side:Ce,depthWrite:!1,blending:be,toneMapped:!1}),dot:new ue({color:16731480,toneMapped:!1}),label:new ue({map:Gl("VK-7","SPECTER / PULSE"),transparent:!0,toneMapped:!1}),labelPistol:new ue({map:Gl("M9","WRAITH / ARC"),transparent:!0,toneMapped:!1})}}_box(t,e,i,n,s,a,o,l=.01){const c=l>0?new wi(t,e,i,2,Math.min(l,Math.min(t,e,i)*.22)):new lt(t,e,i),h=new O(c,n);return h.position.set(s,a,o),h}_cylinder(t,e,i,n,s,a,o,l=12){const c=new O(new me(t,e,i,l),n);return c.position.set(s,a,o),c}_buildRifle(){const t=new Jt;t.name="VK-7 SPECTER";const e=this._box(.13,.135,.42,this.mat.body,0,0,-.2,.018);t.add(e);const i=this._box(.115,.045,.44,this.mat.bodyDark,0,.083,-.22,.012);t.add(i);for(let k=0;k<10;k+=1){const q=new O(new lt(.085,.008,.018),this.mat.bodyDark);q.position.set(0,.109,-.41+k*.036),t.add(q)}const n=this._box(.1,.1,.28,this.mat.polymer,0,-.01,-.5,.02);t.add(n);for(let k=0;k<4;k+=1){const q=new O(new lt(.012,.034,.04),this.mat.bodyDark);q.position.set(.052,-.004,-.43-k*.052),t.add(q)}const s=this._cylinder(.016,.017,.31,this.mat.brushed,0,.002,-.7,10);s.rotation.x=Math.PI/2,t.add(s);const a=this._cylinder(.027,.032,.1,this.mat.bodyDark,0,.002,-.63,10);a.rotation.x=Math.PI/2,t.add(a);const o=this._cylinder(.031,.026,.09,this.mat.body,0,.002,-.815,8);o.rotation.x=Math.PI/2,t.add(o);for(let k=0;k<3;k+=1){const q=new O(new lt(.055,.008,.012),this.mat.cyan);q.position.set(0,.002,-.84+k*.018),t.add(q)}const l=this._box(.105,.115,.25,this.mat.polymer,0,-.01,.12,.02);t.add(l);const c=this._box(.12,.14,.045,this.mat.bodyDark,0,-.012,.26,.012);t.add(c);const h=this._box(.09,.04,.14,this.mat.body,0,.06,.13,.01);t.add(h);const u=this._box(.062,.16,.085,this.mat.polymer,0,-.135,-.015,.02);u.rotation.x=-.22,t.add(u);const d=new O(new lt(.068,.012,.07),this.mat.bodyDark);d.position.set(0,-.11,-.01),d.rotation.x=-.22,t.add(d);const f=new Jt;f.position.set(0,-.16,-.18),f.rotation.x=-.1,t.add(f);const m=this._box(.072,.22,.115,this.mat.bodyDark,0,0,0,.015);f.add(m);const _=this._box(.078,.028,.12,this.mat.polymer,0,-.12,0,.008);f.add(_);const g=new O(new lt(.018,.14,.006),this.mat.cyan);g.position.set(.038,.01,.06),f.add(g);const p=this._box(.07,.012,.09,this.mat.bodyDark,0,-.09,-.1,.005);t.add(p);const b=new O(new lt(.018,.045,.016),this.mat.brushed);b.position.set(0,-.075,-.1),b.rotation.x=.2,t.add(b);const T=this._box(.075,.028,.12,this.mat.bodyDark,0,.132,-.13,.006);t.add(T);const y=new Jt;y.position.set(0,.19,-.13),t.add(y);const A=new O(new lt(.013,.095,.016),this.mat.brushed);A.position.x=-.052,y.add(A);const R=A.clone();R.position.x=.052,y.add(R);const P=new O(new lt(.117,.013,.016),this.mat.brushed);P.position.y=.052,y.add(P);for(const k of[-1,1]){const q=new O(new lt(.005,.088,.005),this.mat.cyan);q.position.set(k*.062,0,.002),y.add(q)}const I=new O(new lt(.118,.005,.005),this.mat.cyan);I.position.set(0,.061,.002),y.add(I);const w=new O(new Ve(.084,.084),this.mat.glass);w.position.set(0,0,.002),y.add(w);const S=new O(new Hn(.005,12),this.mat.dot);S.position.set(0,0,.006),y.add(S);const L=new O(new Ve(.155,.039),this.mat.label);L.position.set(.0665,-.026,-.16),L.rotation.y=Math.PI/2,t.add(L);for(const k of[-1,1]){const q=new O(new lt(.005,.018,.18),this.mat.cyan);q.position.set(k*.066,-.038,-.3),t.add(q)}const U=new O(new lt(.032,.02,.07),this.mat.brushed);U.position.set(-.08,.04,-.05),t.add(U);const B=new O(new lt(.003,.036,.095),this.mat.bodyDark);B.position.set(.066,.035,-.08),t.add(B);const V=this._box(.055,.12,.07,this.mat.polymer,0,-.1,-.48,.012);V.rotation.x=.15,t.add(V);for(let k=0;k<4;k+=1){const q=new O(new me(.006,.006,.004,6),this.mat.brushed);q.rotation.z=Math.PI/2,q.position.set(.067,-.02+k%2*.035,-.35+Math.floor(k/2)*.15),t.add(q)}const W=new ce;return W.position.set(0,.002,-.865),t.add(W),t.userData={muzzle:W,magazine:f,sightDot:S},t}_buildPistol(){const t=new Jt;t.name="M9 WRAITH";const e=this._box(.075,.08,.34,this.mat.body,0,.03,-.15,.012);t.add(e);const i=this._box(.068,.055,.27,this.mat.polymer,0,-.045,-.13,.012);t.add(i);const n=this._cylinder(.012,.012,.07,this.mat.brushed,0,.03,-.33,10);n.rotation.x=Math.PI/2,t.add(n);for(let A=0;A<3;A+=1){const R=new O(new lt(.078,.018,.022),this.mat.bodyDark);R.position.set(0,.055,-.22+A*.045),t.add(R)}const s=this._box(.065,.18,.085,this.mat.polymer,0,-.145,.01,.016);s.rotation.x=-.14,t.add(s);const a=new Jt;a.position.set(0,-.18,.012),t.add(a);const o=this._box(.056,.15,.07,this.mat.bodyDark,0,0,0,.008);a.add(o);const l=this._box(.067,.018,.08,this.mat.brushed,0,-.082,0,.006);a.add(l);const c=this._box(.052,.01,.075,this.mat.bodyDark,0,-.082,-.065,.004);t.add(c);const h=new O(new lt(.014,.036,.012),this.mat.brushed);h.position.set(0,-.072,-.07),t.add(h);const u=this._box(.05,.02,.08,this.mat.bodyDark,0,.08,-.14,.004);t.add(u);const d=new Jt;d.position.set(0,.115,-.14),t.add(d);const f=new O(new lt(.01,.06,.014),this.mat.brushed);f.position.x=-.035,d.add(f);const m=f.clone();m.position.x=.035,d.add(m);const _=new O(new lt(.08,.01,.014),this.mat.brushed);_.position.y=.03,d.add(_);const g=new O(new Ve(.055,.05),this.mat.glass);g.position.z=.001,d.add(g);const p=new O(new Hn(.0038,10),this.mat.dot);p.position.z=.006,d.add(p);const b=new O(new Ve(.11,.028),this.mat.labelPistol);b.position.set(.0405,-.02,-.11),b.rotation.y=Math.PI/2,t.add(b);const T=new O(new lt(.004,.012,.11),this.mat.cyan);T.position.set(.0405,-.05,-.14),t.add(T);const y=new ce;return y.position.set(0,.03,-.365),t.add(y),t.userData={muzzle:y,magazine:a,sightDot:p},t}setWeapon(t){this.groups[t]&&(this.current=t,this.rifle.visible=t==="rifle",this.pistol.visible=t==="pistol")}triggerShot(t){this.kick=Math.min(1.5,this.kick+(t==="pistol"?.9:.55)),this.flashTimer=.055,this.models[this.current].muzzle.getWorldPosition(this._tmpMuzzle),this._muzzleFlash.position.copy(this._tmpMuzzle),this._muzzleFlash.material.rotation=Math.random()*Math.PI*2;const i=t==="pistol"?.26:.36;this._muzzleFlash.scale.set(i*(.8+Math.random()*.6),i*(.8+Math.random()*.6),1),this._muzzleFlash.visible=!0,this.flashLight.position.copy(this._tmpMuzzle),this.flashLight.intensity=5}getMuzzleWorldPosition(t,e=new x){return this.models[this.current].muzzle.getWorldPosition(e),e.applyMatrix4(t.matrixWorld)}getCurrentGroup(){return this.groups[this.current]}update(t,e){this.time+=t;const i=e.reducedMotion?.25:1,n=e.aiming?1:0;this.adsProgress=Ht(this.adsProgress,n,14,t);const s=this.models[this.current],a=s.hip,o=s.ads,l=Qi(a.x,o.x,this.adsProgress),c=Qi(a.y,o.y,this.adsProgress),h=Qi(a.z,o.z,this.adsProgress);this.swayX=Ht(this.swayX,Xt(e.lookDX||0,-30,30),10,t),this.swayY=Ht(this.swayY,Xt(e.lookDY||0,-30,30),10,t);const u=1-this.adsProgress*.72,d=-this.swayX*42e-5*u*i,f=this.swayY*36e-5*u*i,m=e.speedRatio*i,_=Math.cos(e.bobPhase||this.time*6)*.0085*m,g=Math.sin((e.bobPhase||this.time*6)*2)*.0065*m,p=this.adsProgress<.4?Math.sin(this.time*1.2)*.0022:8e-4;this.kick=Ht(this.kick,0,18,t);const b=this.kick*.045,T=this.kick*.055,y=e.reloadProgress??0,A=e.reloading?Math.sin(Xt(y,0,1)*Math.PI):0,R=-A*.58,P=-A*.08,I=A*.36,w=e.switchProgress??0,L=-Math.sin(Xt(w,0,1)*Math.PI)*.28;if(this.rig.position.x=Ht(this.rig.position.x,l+d+_,18,t),this.rig.position.y=Ht(this.rig.position.y,c+f+g+p+P+L,18,t),this.rig.position.z=Ht(this.rig.position.z,h+b,22,t),this.rig.rotation.x=Ht(this.rig.rotation.x,Qi(s.hipRot.x,s.adsRot.x,this.adsProgress)+R+T,16,t),this.rig.rotation.y=Ht(this.rig.rotation.y,Qi(s.hipRot.y,s.adsRot.y,this.adsProgress)-d*2.2,16,t),this.rig.rotation.z=Ht(this.rig.rotation.z,Qi(s.hipRot.z,s.adsRot.z,this.adsProgress)+I,16,t),s.magazine){const U=A;s.magazine.position.y=s.magazine.userData.baseY??(s.magazine.userData.baseY=s.magazine.position.y),s.magazine.position.y=(s.magazine.userData.baseY||0)-U*.28,s.magazine.rotation.z=U*.18}if(s.sightDot){const U=.72+Math.sin(this.time*3)*.14;s.sightDot.material=s.sightDot.material,s.sightDot.scale.setScalar(U)}if(this.flashTimer>0)if(this.flashTimer-=t,this.flashTimer<=0)this._muzzleFlash.visible=!1,this.flashLight.intensity=0;else{const U=Xt(this.flashTimer/.055,0,1);this._muzzleFlash.material.opacity=U,this.flashLight.intensity=U*5}}resize(t){this.camera.aspect=t,this.camera.updateProjectionMatrix()}setFov(t){this.camera.fov=t,this.camera.updateProjectionMatrix()}}const Vl=Math.PI/180,oi={rifle:{id:"rifle",name:"VK-7 SPECTER",category:"PULSE RIFLE",slot:1,mode:"FULL AUTO",ammo:30,reserve:210,rpm:660,damage:17,headMultiplier:2.25,reloadTime:1.7,spreadHip:1.15,spreadAds:.34,bloomPerShot:.19,maxBloom:1.8,recoilPitch:.0068,recoilYaw:.0023,range:140,adsSpreadMultiplier:1},pistol:{id:"pistol",name:"M9 WRAITH",category:"ARC SIDEARM",slot:2,mode:"SEMI AUTO",ammo:12,reserve:96,rpm:300,damage:34,headMultiplier:2.55,reloadTime:1.35,spreadHip:.76,spreadAds:.18,bloomPerShot:.34,maxBloom:1.6,recoilPitch:.012,recoilYaw:.0035,range:90,adsSpreadMultiplier:1}};class Y0{constructor({camera:t,player:e,world:i,input:n,audio:s,effects:a,callbacks:o={}}){this.camera=t,this.player=e,this.world=i,this.input=n,this.audio=s,this.effects=a,this.callbacks=o,this.enemyManager=null,this.model=new q0(window.innerWidth/Math.max(1,window.innerHeight)),this.currentId="rifle",this.magazines={rifle:oi.rifle.ammo,pistol:oi.pistol.ammo},this.reserves={rifle:oi.rifle.reserve,pistol:oi.pistol.reserve},this.cooldown=0,this.reloadTimer=0,this.reloading=!1,this.magInserted=!1,this.switchTimer=0,this.switchProgress=0,this.aiming=!1,this.adsProgress=0,this.bloom=0,this.lastShotAt=-100,this.dryFireCooldown=0,this.shotsFired=0,this.shotsHit=0,this.headshots=0,this.damageDealt=0,this._raycaster=new xs,this._direction=new x,this._right=new x,this._up=new x,this._origin=new x,this._muzzle=new x,this._end=new x,this._tmp=new x,this._emitAmmo(),this._emitWeapon()}get weapon(){return oi[this.currentId]}get currentAmmo(){return this.magazines[this.currentId]}get currentReserve(){return this.reserves[this.currentId]}get weaponModel(){return this.model}setEnemyManager(t){this.enemyManager=t}reset(){this.currentId="rifle",this.magazines.rifle=oi.rifle.ammo,this.magazines.pistol=oi.pistol.ammo,this.reserves.rifle=oi.rifle.reserve,this.reserves.pistol=oi.pistol.reserve,this.cooldown=0,this.reloadTimer=0,this.reloading=!1,this.magInserted=!1,this.switchTimer=0,this.switchProgress=0,this.aiming=!1,this.adsProgress=0,this.bloom=0,this.shotsFired=0,this.shotsHit=0,this.headshots=0,this.damageDealt=0,this.model.setWeapon("rifle"),this.model.adsProgress=0,this._emitAmmo(),this._emitWeapon()}update(t,e){const i=this.reloading;if(!e||this.player.dead){this.aiming=!1,this.adsProgress=Ht(this.adsProgress,0,10,t),this.model.update(t,this._modelState());return}if(this.cooldown=Math.max(0,this.cooldown-t),this.dryFireCooldown=Math.max(0,this.dryFireCooldown-t),this.switchTimer=Math.max(0,this.switchTimer-t),this.switchProgress=1-this.switchTimer/.5,this.bloom=Ht(this.bloom,0,5.5,t),this.aiming=this.input.mouse.right&&!this.player.sprinting,this.adsProgress=Ht(this.adsProgress,this.aiming?1:0,12,t),this._handleSwitch(),this._handleReload(t),!this.reloading&&this.switchTimer<=0&&this._handleFire(),i&&!this.reloading&&this._emitAmmo(),this.reloading){const n=1-this.reloadTimer/this.weapon.reloadTime;this.callbacks.onReloadProgress&&this.callbacks.onReloadProgress(n)}this.model.update(t,this._modelState())}_modelState(){return{aiming:this.aiming,lookDX:this.player.lookDX,lookDY:this.player.lookDY,speedRatio:this.player.speedRatio,bobPhase:this.player.bobPhase,grounded:this.player.grounded,reloading:this.reloading,reloadProgress:this.reloading?1-this.reloadTimer/this.weapon.reloadTime:0,switchProgress:this.switchProgress,reducedMotion:this.player.settings.get("reducedMotion")}}_handleSwitch(){const t=this.input.consumeWheel();let e=null;this.input.wasPressed("Digit1")?e="rifle":this.input.wasPressed("Digit2")?e="pistol":this.input.wasPressed("KeyQ")?e=this.currentId==="rifle"?"pistol":"rifle":t!==0&&(e=this.currentId==="rifle"?"pistol":"rifle"),e&&e!==this.currentId&&this.switchTimer<=0&&(this._cancelReload(),this.currentId=e,this.switchTimer=.5,this.switchProgress=0,this.cooldown=Math.max(this.cooldown,.28),this.model.setWeapon(e),this.audio.reloadStart(),this._emitAmmo(),this._emitWeapon(),this.callbacks.onWeaponSwitch&&this.callbacks.onWeaponSwitch(oi[e]))}_handleReload(t){if(this.reloading){this.reloadTimer-=t;const e=this.weapon.reloadTime-this.reloadTimer;if(!this.magInserted&&e>=this.weapon.reloadTime*.52&&(this.magInserted=!0,this.audio.reloadMag()),this.reloadTimer<=0){const i=this.weapon.ammo-this.magazines[this.currentId],n=Math.min(i,this.reserves[this.currentId]);this.magazines[this.currentId]+=n,this.reserves[this.currentId]-=n,this.reloading=!1,this.reloadTimer=0,this.audio.reloadEnd(),this._emitAmmo(),this.callbacks.onReloadEnd&&this.callbacks.onReloadEnd()}return}this.input.wasPressed("KeyR")&&this.startReload(),this.magazines[this.currentId]===0&&this.reserves[this.currentId]>0&&this.input.mouse.leftPressed&&this.audio._click(.025,240,.03)}startReload(){const t=this.weapon;return this.reloading||this.currentAmmo>=t.ammo||this.currentReserve<=0?!1:(this.reloading=!0,this.magInserted=!1,this.reloadTimer=t.reloadTime,this.audio.reloadStart(),this.callbacks.onReloadStart&&this.callbacks.onReloadStart(t.reloadTime),!0)}_cancelReload(){this.reloading&&(this.reloading=!1,this.reloadTimer=0,this.magInserted=!1,this.callbacks.onReloadEnd&&this.callbacks.onReloadEnd())}_handleFire(){if(!(!(this.weapon.mode==="FULL AUTO"?this.input.mouse.left:this.input.mouse.leftPressed)||this.cooldown>0)){if(this.currentAmmo<=0){this.dryFireCooldown<=0&&(this.audio._click(.03,220,.04),this.dryFireCooldown=.28,this.callbacks.onEmpty&&this.callbacks.onEmpty());return}this._shoot()}}_shoot(){const t=this.weapon,e=performance.now();this.magazines[this.currentId]-=1,this.cooldown=60/t.rpm,this.lastShotAt=e,this.shotsFired+=1,this.player.camera.updateMatrixWorld();const i=this.player.camera;this._origin.copy(i.position),i.getWorldDirection(this._direction),this._right.setFromMatrixColumn(i.matrixWorld,0).normalize(),this._up.setFromMatrixColumn(i.matrixWorld,1).normalize();const n=(this.player.speedRatio*.9+(this.player.grounded?0:.7))*Vl,a=(this.aiming?t.spreadAds:t.spreadHip)*Vl+n+this.bloom*.0045,o=Math.random()*Math.PI*2,l=Math.sqrt(Math.random())*a;this._direction.addScaledVector(this._right,Math.cos(o)*l).addScaledVector(this._up,Math.sin(o)*l).normalize(),this._raycaster.set(this._origin,this._direction),this._raycaster.far=t.range;const c=this.enemyManager?this.enemyManager.getHitMeshes():[],h=c.length?this._raycaster.intersectObjects(c,!1):[],u=this._raycaster.intersectObjects(this.world.collisionMeshes,!1);let d=null,f=null;h.length&&(d=h[0]),u.length&&(f=u[0]);const m=d?d.distance:1/0,_=f?f.distance:1/0;this._end.copy(this._origin).addScaledVector(this._direction,Math.min(Math.min(m,_),t.range)),d&&m<_?this._resolveEnemyHit(d,t):f&&this._resolveWorldHit(f,t),this.model.getMuzzleWorldPosition(i,this._muzzle),this.effects.tracer(this._muzzle,this._end,t.id),this.effects.playerMuzzleFlash(this._muzzle,t.id),this.effects.ejectShell(i,t.id),this.audio.shoot(t.id),this.player.addRecoil(t.recoilPitch*dt(.75,1.25),t.recoilYaw*dt(-1,1)),this.bloom=Xt(this.bloom+t.bloomPerShot,0,t.maxBloom),this.callbacks.onShot&&this.callbacks.onShot(t),this._emitAmmo()}_resolveEnemyHit(t,e){const i=t.object.userData.enemy;if(!i||!i.alive)return;const s=(t.object.userData.hitZone||"body")==="head",a=e.damage*(s?e.headMultiplier:1);this.shotsHit+=1,s&&(this.headshots+=1);const o=t.point,l=this._tmp.copy(this._direction).negate();this.effects.enemyImpact(o,l,s),this.effects.damagePulse(),this.audio.hit(s);const c=i.takeDamage(a,{headshot:s,point:o.clone(),direction:this._direction.clone(),weapon:e.id});this.damageDealt+=a,this.callbacks.onHit&&this.callbacks.onHit({headshot:s,killed:!!c?.killed,damage:a,weapon:e.id}),c?.killed&&this.callbacks.onKill&&this.callbacks.onKill(i,{headshot:s,weapon:e.id})}_resolveWorldHit(t,e){const i=t.face?t.face.normal.clone().transformDirection(t.object.matrixWorld):this._tmp.copy(this._direction).negate().clone();this.effects.impact(t.point,i,e.id),this.audio.impact(this._panForPosition(t.point)),this.callbacks.onWorldHit&&this.callbacks.onWorldHit(t)}_panForPosition(t){const i=this._tmp.copy(t).sub(this.camera.position).applyQuaternion(this.camera.quaternion.clone().invert());return Xt(i.x/(Math.abs(i.z)+.001),-1,1)*.7}getSpreadNormalized(){const t=this.weapon,e=this.player.speedRatio*.9+(this.player.grounded?0:.7),n=(this.aiming?t.spreadAds:t.spreadHip)+e+this.bloom*3.6;return Xt(n/5.2,.08,1)}getFov(t,e){const i=e?4.5:0,n=this.currentId==="pistol"?58:52;return t+i-(t+i-n)*this.adsProgress}getStats(){return{shotsFired:this.shotsFired,shotsHit:this.shotsHit,headshots:this.headshots,accuracy:this.shotsFired>0?this.shotsHit/this.shotsFired:0,damageDealt:this.damageDealt}}_emitAmmo(){this.callbacks.onAmmoChange&&this.callbacks.onAmmoChange({current:this.currentAmmo,reserve:this.currentReserve,max:this.weapon.ammo,reloading:this.reloading,id:this.currentId})}_emitWeapon(){this.callbacks.onWeaponChange&&this.callbacks.onWeaponChange(this.weapon)}resize(t){this.model.resize(t)}dispose(){this.model.scene.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){const e=Array.isArray(t.material)?t.material:[t.material];for(const i of e)i.map&&i.map.dispose(),i.dispose()}})}}function Ri(r,t){const e=document.createElement("canvas");return e.width=r,e.height=t,{canvas:e,ctx:e.getContext("2d")}}function Gi(r,{repeat:t=[1,1],srgb:e=!0,anisotropy:i=4}={}){const n=new un(r);return n.wrapS=hs,n.wrapT=hs,n.repeat.set(t[0],t[1]),n.anisotropy=i,n.colorSpace=e?we:Si,n.needsUpdate=!0,n}function K0(r=4){const{canvas:e,ctx:i}=Ri(512,512),{canvas:n,ctx:s}=Ri(512,512),a=Fc(9001);i.fillStyle="#6d7377",i.fillRect(0,0,512,512),s.fillStyle="#808080",s.fillRect(0,0,512,512);for(let c=0;c<30;c+=1){const h=a()*512,u=a()*512,d=18+a()*90,f=i.createRadialGradient(h,u,0,h,u,d),m=45+Math.floor(a()*25);f.addColorStop(0,`rgba(${m},${m+3},${m+5},${.035+a()*.06})`),f.addColorStop(1,"rgba(50,54,57,0)"),i.fillStyle=f,i.fillRect(h-d,u-d,d*2,d*2);const _=s.createRadialGradient(h,u,0,h,u,d);_.addColorStop(0,`rgba(110,110,110,${.04+a()*.06})`),_.addColorStop(1,"rgba(128,128,128,0)"),s.fillStyle=_,s.fillRect(h-d,u-d,d*2,d*2)}for(let c=0;c<16e3;c+=1){const h=a()*512,u=a()*512,d=80+Math.floor(a()*90),f=.03+a()*.1;i.fillStyle=`rgba(${d},${d+2},${d+3},${f})`;const m=a()*1.7;i.fillRect(h,u,m,m),s.fillStyle=`rgba(${d},${d},${d},${f})`,s.fillRect(h,u,m,m)}i.strokeStyle="rgba(32,35,37,0.4)",i.lineWidth=.7;for(let c=0;c<8;c+=1){let h=a()*512,u=a()*512;i.beginPath(),i.moveTo(h,u);for(let d=0;d<8;d+=1)h+=(a()-.5)*44,u+=(a()-.3)*36,i.lineTo(h,u);i.stroke()}const o=(c,h,u,d)=>{i.fillStyle="rgba(33,37,40,0.72)",i.fillRect(c,h,u,d),s.fillStyle="rgba(38,38,38,0.7)",s.fillRect(c,h,u,d)};o(0,0,512,3),o(0,0,3,512),o(0,512/2,512,2),o(512/2,0,2,512);const l=i.createLinearGradient(0,0,0,12);return l.addColorStop(0,"rgba(255,255,255,0.05)"),l.addColorStop(1,"rgba(0,0,0,0)"),i.fillStyle=l,i.fillRect(0,3,512,9),{map:Gi(e,{repeat:[7,8],anisotropy:r}),bumpMap:Gi(n,{repeat:[7,8],srgb:!1,anisotropy:r})}}function $0(r=4){const{canvas:e,ctx:i}=Ri(512,512),{canvas:n,ctx:s}=Ri(512,512),a=Fc(4407),o=i.createLinearGradient(0,0,512,512);o.addColorStop(0,"#62686c"),o.addColorStop(.45,"#555c61"),o.addColorStop(1,"#60666a"),i.fillStyle=o,i.fillRect(0,0,512,512),s.fillStyle="#808080",s.fillRect(0,0,512,512);for(let c=0;c<2600;c+=1){const h=a()*512,u=a()*512,d=8+a()*90,f=.015+a()*.055;i.strokeStyle=a()>.5?`rgba(225,230,232,${f})`:`rgba(24,28,31,${f})`,i.lineWidth=.6,i.beginPath(),i.moveTo(u,h),i.lineTo(u+d,h+(a()-.5)*1.2),i.stroke(),s.strokeStyle=`rgba(${a()>.5?148:90},${a()>.5?148:90},${a()>.5?148:90},${f*2})`,s.beginPath(),s.moveTo(u,h),s.lineTo(u+d,h),s.stroke()}for(let c=0;c<9;c+=1){const h=a()*512,u=2+a()*11,d=i.createLinearGradient(0,0,0,512);d.addColorStop(0,`rgba(28,32,35,${.05+a()*.08})`),d.addColorStop(.7,"rgba(28,32,35,0.02)"),d.addColorStop(1,"rgba(28,32,35,0)"),i.fillStyle=d,i.fillRect(h,0,u,512)}i.fillStyle="rgba(23,27,30,0.7)",i.fillRect(0,0,512,3),i.fillRect(0,509,512,3),i.fillRect(0,0,3,512),i.fillRect(509,0,3,512),i.fillStyle="rgba(200,210,214,0.08)",i.fillRect(0,3,512,1),i.fillRect(3,0,1,512),s.fillStyle="rgba(32,32,32,0.8)",s.fillRect(0,0,512,3),s.fillRect(0,0,3,512);const l=(c,h)=>{i.beginPath(),i.arc(c,h,3.2,0,Math.PI*2),i.fillStyle="rgba(24,28,31,0.72)",i.fill(),i.beginPath(),i.arc(c-.8,h-.8,2,0,Math.PI*2),i.fillStyle="rgba(190,199,203,0.2)",i.fill(),s.beginPath(),s.arc(c,h,3.5,0,Math.PI*2),s.fillStyle="rgba(160,160,160,0.9)",s.fill()};for(let c=0;c<2;c+=1)for(let h=0;h<2;h+=1)l(26+c*460,26+h*460);return{map:Gi(e,{repeat:[3,2],anisotropy:r}),bumpMap:Gi(n,{repeat:[3,2],srgb:!1,anisotropy:r})}}function Z0(r=4){const{canvas:t,ctx:e}=Ri(512,128);e.fillStyle="#1b1d1e",e.fillRect(0,0,512,128),e.save(),e.translate(0,0),e.fillStyle="#b7893a";for(let n=-160;n<640;n+=64)e.beginPath(),e.moveTo(n,128),e.lineTo(n+32,128),e.lineTo(n+96,0),e.lineTo(n+64,0),e.closePath(),e.fill();e.restore(),e.fillStyle="rgba(20,22,23,0.68)";for(let n=0;n<24;n+=1)e.fillRect(Math.random()*512,Math.random()*128,1+Math.random()*5,1+Math.random()*3);return Gi(t,{repeat:[2,1],anisotropy:r})}function aa(r="SITE-09",t="CORE LINK",e="#6be7ff",i=4){const{canvas:n,ctx:s}=Ri(512,256);s.fillStyle="#02080b",s.fillRect(0,0,512,256);const a=s.createRadialGradient(280,110,0,280,110,220);a.addColorStop(0,"rgba(33,92,106,0.32)"),a.addColorStop(1,"rgba(3,10,12,0)"),s.fillStyle=a,s.fillRect(0,0,512,256),s.strokeStyle="rgba(107,231,255,0.12)",s.lineWidth=1;for(let l=0;l<512;l+=32)s.beginPath(),s.moveTo(l,0),s.lineTo(l,256),s.stroke();for(let l=0;l<256;l+=32)s.beginPath(),s.moveTo(0,l),s.lineTo(512,l),s.stroke();s.fillStyle="rgba(2,8,11,0.76)",s.fillRect(0,0,512,35),s.fillStyle=e,s.font="500 14px monospace",s.fillText("FACILITY CONTROL / SECURE CHANNEL",20,24),s.fillStyle="rgba(107,231,255,0.45)",s.font="10px monospace",s.fillText("SYS 04•17",414,23),s.fillStyle="#dff8ff",s.font="600 52px monospace",s.fillText(r,22,108),s.fillStyle=e,s.font="500 16px monospace",s.fillText(t,24,140),s.strokeStyle="rgba(107,231,255,0.4)",s.beginPath(),s.moveTo(24,170),s.lineTo(488,170),s.stroke(),s.fillStyle="rgba(107,231,255,0.55)",s.font="11px monospace",s.fillText("REACTOR OUTPUT  87.2%",24,196),s.fillText("PRESSURE         1.04",24,215),s.fillText("HOSTILE TRACE    08",300,196),s.fillText("CONTAINMENT      OPEN",300,215);for(let l=0;l<12;l+=1){const c=4+l*37%20;s.fillStyle=l===9?"rgba(255,77,88,0.65)":"rgba(107,231,255,0.35)",s.fillRect(24+l*17,238-c,9,c)}return Gi(n,{repeat:[1,1],anisotropy:i})}function Qs(r,{accent:t="#6be7ff",align:e="left"}={},i=4){const{canvas:n,ctx:s}=Ri(512,160);s.clearRect(0,0,512,160),s.fillStyle="rgba(3,8,11,0.84)",s.fillRect(0,0,512,160),s.fillStyle=t,s.fillRect(0,0,7,160);const a=32;s.textAlign=e;const o=e==="center"?256:28;return s.font="600 46px sans-serif",s.fillStyle="#e6f4f7",s.fillText(r[0]||"",o,a+34),s.font="16px monospace",s.fillStyle=t,s.fillText(r[1]||"",o,a+70),s.font="11px monospace",s.fillStyle="rgba(180,200,208,0.48)",s.fillText(r[2]||"",o,a+98),Gi(n,{repeat:[1,1],anisotropy:i})}function Hc(){const{canvas:r,ctx:t}=Ri(128,128),e=t.createRadialGradient(64,64,0,64,64,64);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.12,"rgba(220,250,255,0.95)"),e.addColorStop(.35,"rgba(110,220,245,0.35)"),e.addColorStop(1,"rgba(50,150,190,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const i=new un(r);return i.colorSpace=we,i}function J0(r=4){const{canvas:t,ctx:e}=Ri(256,256);e.fillStyle="#252a2d",e.fillRect(0,0,256,256),e.strokeStyle="rgba(104,114,119,0.55)",e.lineWidth=4;for(let i=0;i<=256;i+=16)e.beginPath(),e.moveTo(i,0),e.lineTo(i,256),e.stroke();e.strokeStyle="rgba(35,40,43,0.7)",e.lineWidth=8;for(let i=0;i<=256;i+=64)e.beginPath(),e.moveTo(0,i),e.lineTo(256,i),e.stroke();return Gi(t,{repeat:[2,6],anisotropy:r})}const Kt={PATROL:"patrol",ALERT:"alert",CHASE:"chase",ATTACK:"attack",STAGGER:"stagger",DEAD:"dead"},Wl=100,j0=27,Xl=19;function Q0(){const r=document.createElement("canvas");r.width=64,r.height=64;const t=r.getContext("2d");t.clearRect(0,0,64,64),t.translate(32,32),t.rotate(Math.PI/4),t.fillStyle="rgba(255,55,72,0.9)",t.fillRect(-9,-9,18,18),t.strokeStyle="rgba(255,160,170,0.8)",t.lineWidth=2,t.strokeRect(-12,-12,24,24);const e=new un(r);return e.colorSpace=we,e}function tg(){const r=new qt({color:4147278,roughness:.42,metalness:.78}),t=new qt({color:8358287,roughness:.32,metalness:.88}),e=new qt({color:1448992,roughness:.58,metalness:.58}),i=new qt({color:2370609,roughness:.78,metalness:.2}),n=new qt({color:1704966,emissive:16724805,emissiveIntensity:3.4,roughness:.22,metalness:.2,toneMapped:!1}),s=new qt({color:266260,emissive:5558248,emissiveIntensity:1.8,roughness:.3,metalness:.2,toneMapped:!1}),a=new qt({color:3489090,roughness:.34,metalness:.9}),o=Q0(),l=new Ai({map:o,transparent:!0,depthTest:!0,depthWrite:!1,toneMapped:!1}),c=new ue({color:0,transparent:!0,opacity:.34,depthWrite:!1}),h=(d,f,m,_=.02)=>new wi(d,f,m,2,Math.min(_,Math.min(d,f,m)*.2)),u={pelvis:h(.42,.22,.28,.04),torso:h(.56,.5,.34,.05),chest:h(.46,.3,.12,.03),head:h(.29,.24,.3,.05),visor:new lt(.23,.055,.02),visorDot:new me(.014,.014,.01,8),shoulder:h(.17,.17,.28,.035),upperArm:h(.1,.32,.12,.025),forearm:h(.105,.28,.12,.025),hand:h(.08,.1,.1,.02),upperLeg:h(.135,.4,.15,.025),lowerLeg:h(.12,.38,.13,.02),foot:h(.16,.1,.28,.02),knee:new ln(.065,8,6),core:new me(.06,.06,.02,12),backpack:h(.36,.36,.16,.03),antenna:new me(.008,.012,.32,5),gunBody:h(.08,.1,.44,.015),gunBarrel:new me(.012,.012,.26,8),vent:new lt(.16,.028,.02),accent:new lt(.02,.18,.02)};return{armor:r,armorLight:t,joint:e,polymer:i,red:n,cyan:s,gunmetal:a,alertMaterial:l,blobMaterial:c,blobGeometry:new Hn(.47,16),geos:u}}class eg{constructor({scene:t,spawn:e,assets:i,world:n,nav:s,effects:a,audio:o,manager:l,index:c=0}){this.scene=t,this.spawn=e,this.assets=i,this.world=n,this.nav=s,this.effects=a,this.audio=o,this.manager=l,this.index=c,this.position=new x,this.velocity=new x,this.forward=new x(0,0,-1),this.eye=new x,this.playerEye=new x,this.lastKnown=new x,this.lastSeenAt=-100,this.raycaster=new xs,this.maxHealth=Wl,this.health=Wl,this.alive=!0,this.state=Kt.PATROL,this.stateTime=0,this.path=[],this.pathTimer=0,this.patrolIndex=0,this.waitTimer=dt(.4,2.2),this.yaw=Math.random()*Math.PI*2,this.speed=1.4,this.verticalBob=0,this.walkPhase=Math.random()*Math.PI*2,this.detectionTimer=Math.random()*.2,this.hasSight=!1,this.lostSightTime=0,this.shootCooldown=dt(.6,1.8),this.chargeTimer=0,this.charging=!1,this.strafeDirection=Math.random()>.5?1:-1,this.strafeTimer=dt(1.2,2.4),this.hitFlash=0,this.flinch=0,this.deathTimer=0,this.alertMarkerTimer=0,this._tmp=new x,this._desired=new x,this._strafe=new x,this._move=new x,this.visorMaterial=this.assets.red.clone(),this.coreMaterial=this.assets.red.clone(),this.muzzleMaterial=new Ai({color:16761482,transparent:!0,opacity:0,blending:be,depthWrite:!1,toneMapped:!1}),this.root=this._buildModel(),this.blobShadow=new O(this.assets.blobGeometry,this.assets.blobMaterial),this.blobShadow.rotation.x=-Math.PI/2,this.blobShadow.position.y=.025,this.blobShadow.renderOrder=1,this.root.add(this.blobShadow),this.root.traverse(h=>{h.isMesh&&(h.castShadow=!1)}),this.scene.add(this.root),this.healthBar=this._buildHealthBar(),this.alertMarker=new zi(this.assets.alertMaterial.clone()),this.alertMarker.scale.set(.18,.18,1),this.alertMarker.position.y=2.3,this.alertMarker.visible=!1,this.root.add(this.alertMarker),this.hitMeshes=[],this.root.traverse(h=>{h.isMesh&&h.userData.hitZone&&(h.userData.enemy=this,this.hitMeshes.push(h))}),this.reset()}_buildModel(){const{armor:t,armorLight:e,joint:i,polymer:n,cyan:s,gunmetal:a,geos:o}=this.assets,l=new Jt;l.name=`SENTINEL-${this.spawn.id}`,l.scale.setScalar(1.04);const c=new Jt;l.add(c),this.visual=c;const h=new O(o.pelvis,t);h.position.y=.94,h.castShadow=!0,h.userData.hitZone="body",c.add(h);const u=new O(o.torso,t);u.position.y=1.28,u.castShadow=!0,u.userData.hitZone="body",c.add(u);const d=new O(o.chest,e);d.position.set(0,1.34,-.17),d.castShadow=!0,d.userData.hitZone="body",c.add(d);const f=new O(o.vent,i);f.position.set(0,1.45,-.235),c.add(f);const m=new O(o.core,this.coreMaterial);m.rotation.x=Math.PI/2,m.position.set(0,1.28,-.24),c.add(m);for(const U of[-.21,.21]){const B=new O(o.accent,s);B.position.set(U,1.29,-.18),c.add(B)}const _=new O(o.backpack,i);_.position.set(0,1.33,.23),_.castShadow=!0,_.userData.hitZone="body",c.add(_);const g=new O(o.antenna,e);g.position.set(.14,1.64,.18),g.rotation.z=-.18,c.add(g);const p=new O(new ln(.018,6,5),this.visorMaterial);p.position.set(.17,1.8,.18),c.add(p);const b=new Jt;b.position.y=1.69,c.add(b),this.head=b;const T=new O(o.head,t);T.castShadow=!0,T.userData.hitZone="head",b.add(T);const y=new O(o.visor,this.visorMaterial);y.position.set(0,.01,-.155),y.userData.hitZone="head",b.add(y);for(const U of[-.065,.065]){const B=new O(o.visorDot,this.visorMaterial);B.rotation.x=Math.PI/2,B.position.set(U,.012,-.17),B.userData.hitZone="head",b.add(B)}for(const U of[-1,1]){const B=new O(o.shoulder,e);B.position.set(U*.35,1.45,0),B.castShadow=!0,B.userData.hitZone="limb",c.add(B);const V=new Jt;V.position.set(U*.36,1.38,0),c.add(V);const W=new O(o.upperArm,n);W.position.y=-.18,W.castShadow=!0,W.userData.hitZone="limb",V.add(W);const k=new O(o.knee,i);k.position.y=-.36,V.add(k);const q=new O(o.forearm,t);q.position.y=-.51,q.castShadow=!0,q.userData.hitZone="limb",V.add(q);const X=new O(o.hand,i);X.position.y=-.69,V.add(X);const rt=new O(new lt(.01,.2,.01),s);rt.position.set(U*.06,-.18,-.065),V.add(rt),U===1?this.rightArm=V:this.leftArm=V}const A=new Jt;A.position.set(.3,1.17,-.3),A.rotation.x=.05,c.add(A);const R=new O(o.gunBody,a);R.castShadow=!0,A.add(R);const P=new O(o.gunBarrel,a);P.rotation.x=Math.PI/2,P.position.z=-.34,A.add(P);const I=new O(new me(.022,.026,.08,8),e);I.rotation.x=Math.PI/2,I.position.z=-.49,A.add(I);const w=new O(new lt(.02,.02,.2),this.visorMaterial);w.position.set(.05,.065,-.06),A.add(w),this.gun=A;const S=new ce;S.position.set(0,0,-.55),A.add(S),this.muzzle=S;const L=new zi(this.muzzleMaterial);L.scale.set(.28,.28,1),L.position.copy(S.position),A.add(L),this.muzzleFlash=L;for(const U of[-1,1]){const B=new Jt;B.position.set(U*.16,.94,0),c.add(B);const V=new O(o.upperLeg,n);V.position.y=-.2,V.castShadow=!0,V.userData.hitZone="limb",B.add(V);const W=new O(o.knee,i);W.position.y=-.41,W.userData.hitZone="limb",B.add(W);const k=new O(o.lowerLeg,t);k.position.y=-.61,k.castShadow=!0,k.userData.hitZone="limb",B.add(k);const q=new O(o.foot,i);q.position.set(0,-.84,-.055),q.castShadow=!0,q.userData.hitZone="limb",B.add(q),U===1?this.rightLeg=B:this.leftLeg=B}return l}_buildHealthBar(){const t=new Jt;t.position.y=2.16,this.root.add(t);const e=new Ai({color:461582,transparent:!0,opacity:.72,depthTest:!0,depthWrite:!1}),i=new zi(e);i.scale.set(.82,.075,1),t.add(i);const n=new Ai({color:16729942,transparent:!0,opacity:.95,depthTest:!0,depthWrite:!1,toneMapped:!1}),s=new zi(n);return s.center.set(0,.5),s.position.x=-.39,s.position.z=.002,s.scale.set(.78,.032,1),t.add(s),t.visible=!1,this.healthBarGroup=t,this.healthFill=s,this.healthFillMat=n,t}reset(){this.position.set(this.spawn.pos.x,0,this.spawn.pos.z),this.velocity.set(0,0,0),this.health=this.maxHealth,this.alive=!0,this.state=Kt.PATROL,this.stateTime=0,this.path=[],this.pathTimer=0,this.patrolIndex=0,this.waitTimer=dt(.5,2),this.yaw=Math.atan2(-(this.spawn.route[0].x-this.spawn.pos.x),-(this.spawn.route[0].z-this.spawn.pos.z)),this.hasSight=!1,this.lostSightTime=0,this.shootCooldown=dt(.8,2),this.chargeTimer=0,this.charging=!1,this.hitFlash=0,this.flinch=0,this.deathTimer=0,this.alertMarkerTimer=0,this.root.position.copy(this.position),this.root.rotation.set(0,this.yaw,0),this.root.visible=!0,this.visual.visible=!0,this.blobShadow.visible=!0,this.visual.rotation.set(0,0,0),this.visual.position.set(0,0,0),this.visual.scale.set(1,1,1),this.healthBarGroup.visible=!1,this.alertMarker.visible=!1,this.muzzleFlash.material.opacity=0,this.visorMaterial.emissiveIntensity=3.4,this.coreMaterial.emissiveIntensity=2.2,this.head.rotation.set(0,0,0);for(const t of this.hitMeshes)t.visible=!0}get eyePosition(){return this.eye.set(this.position.x,this.position.y+1.55,this.position.z)}getMuzzleWorldPosition(t=new x){return this.muzzle.getWorldPosition(t)}setState(t){this.state!==t&&(this.state=t,this.stateTime=0,t===Kt.ALERT&&(this.alertMarkerTimer=.8,this.alertMarker.visible=!0),t===Kt.PATROL&&(this.healthBarGroup.visible=!1))}update(t,e,i){if(!this.alive){this.deathTimer+=t,this._updateDeath(t);return}this.stateTime+=t,this.hitFlash=Math.max(0,this.hitFlash-t),this.flinch=Ht(this.flinch,0,8,t),this.alertMarkerTimer=Math.max(0,this.alertMarkerTimer-t),this.alertMarkerTimer<=0&&this.state!==Kt.ALERT&&(this.alertMarker.visible=!1),this.detectionTimer-=t,this.detectionTimer<=0&&(this.detectionTimer=.16+Math.random()*.06,this._updatePerception(e));const n=this.position.distanceTo(e.position);switch(this._updateAnimation(t,n),this._updateMaterials(t),this.state){case Kt.PATROL:this._updatePatrol(t,e);break;case Kt.ALERT:this._updateAlert(t,e);break;case Kt.CHASE:this._updateChase(t,e,i,n);break;case Kt.ATTACK:this._updateAttack(t,e,i,n);break;case Kt.STAGGER:this.stateTime>.2&&this.setState(Kt.CHASE);break}if(this.root.position.copy(this.position),this.root.rotation.y=ra(this.root.rotation.y,this.yaw,10,t),this.healthBarGroup.visible){const s=Xt(this.health/this.maxHealth,0,1);this.healthFill.scale.x=.78*s,this.healthFillMat.color.setHex(s<.35?16723519:16735336)}}_updatePerception(t){const e=this.eyePosition,i=t.getEyePosition(this.playerEye),n=e.distanceTo(i),s=this._tmp.copy(t.position).sub(this.position);s.y=0;const a=s.length();a>.001&&s.normalize();const l=this._desired.set(-Math.sin(this.yaw),0,-Math.cos(this.yaw)).dot(s),c=a<8.5,h=l>.28,u=n<j0&&(c||h);let d=!0;u&&(d=this.world.isLineBlocked(e,i,this.raycaster)),this.hasSight=u&&!d,this.hasSight?(this.lastKnown.copy(t.position),this.lastSeenAt=performance.now(),this.lostSightTime=0,this.state===Kt.PATROL&&(this.setState(Kt.ALERT),this.alertMarkerTimer=.85,this.alertMarker.visible=!0,this.manager&&this.manager.alertNearby(this.position,11))):(this.state===Kt.CHASE||this.state===Kt.ATTACK)&&(this.lostSightTime+=.18)}_updatePatrol(t,e){const i=this.spawn.route;if(!i||i.length===0)return;if(this.path.length===0){if(this.waitTimer>0){this.waitTimer-=t,this._idleAnimation(t);return}const s=i[this.patrolIndex%i.length];if(this.path=this.nav.findPath(this.position,s),this.pathTimer=0,this.path.length===0){this.waitTimer=1.2,this.patrolIndex=(this.patrolIndex+1)%i.length;return}}this._followPath(t,1.35,null)&&(this.path=[],this.waitTimer=dt(1.1,2.6),this.patrolIndex=(this.patrolIndex+1)%i.length)}_updateAlert(t,e){this._facePosition(e.position,t,14),this.healthBarGroup.visible=!0,this.stateTime>.42&&(this.setState(this.hasSight?Kt.ATTACK:Kt.CHASE),this.hasSight&&(this.shootCooldown=Math.min(this.shootCooldown,.35)))}_updateChase(t,e,i,n){if(this.healthBarGroup.visible=!0,this.hasSight&&(this._facePosition(e.position,t,9),n<Xl)){this.setState(Kt.ATTACK);return}this.pathTimer-=t,this.pathTimer<=0&&(this.pathTimer=.65+Math.random()*.25,this.path=this.nav.findPath(this.position,this.lastKnown.lengthSq()>0?this.lastKnown:e.position)),this._followPath(t,2.85,i)&&this.lostSightTime>5.5&&(this.setState(Kt.PATROL),this.path=[],this.waitTimer=.4)}_updateAttack(t,e,i,n){if(this.healthBarGroup.visible=!0,this._facePosition(e.position,t,12),!this.hasSight&&(this.lostSightTime+=t,this.lostSightTime>.8)){this.setState(Kt.CHASE),this.path=[];return}if(n>Xl){this.setState(Kt.CHASE);return}this.strafeTimer-=t,this.strafeTimer<=0&&(this.strafeDirection*=-1,this.strafeTimer=dt(1.3,2.6));const s=this._strafe.set(Math.cos(this.yaw)*this.strafeDirection,0,-Math.sin(this.yaw)*this.strafeDirection),a=this._move.copy(s).multiplyScalar(n<9?.8:.5);n>15.5&&(a.x+=-Math.sin(this.yaw)*.9,a.z+=-Math.cos(this.yaw)*.9),this._moveWithCollision(a.x*t,a.z*t,i),this.shootCooldown-=t,this.charging?(this.chargeTimer-=t,this.visorMaterial.emissiveIntensity=5+Math.sin(performance.now()*.04)*2,this.chargeTimer<=0&&(this.charging=!1,this.hasSight&&(this.manager.fireProjectile(this,e),this.audio.enemyShoot(this._panTo(e.position)),this.muzzleFlash.material.opacity=1),this.shootCooldown=dt(1.55,2.25))):this.shootCooldown<=0&&this.hasSight&&(this.charging=!0,this.chargeTimer=.42,this.muzzleFlash.material.opacity=.35)}_facePosition(t,e,i){const n=t.x-this.position.x,s=t.z-this.position.z,a=Math.atan2(-n,-s);this.yaw=ra(this.yaw,a,i,e)}_followPath(t,e,i){if(this.path.length===0)return!0;const n=this.path[0],s=n.x-this.position.x,a=n.z-this.position.z,o=Math.hypot(s,a);if(o<.42&&(this.path.shift(),this.path.length===0))return!0;if(o>.001){this.yaw=ra(this.yaw,Math.atan2(-s,-a),10,t);const l=Math.min(o,e*t);this._moveWithCollision(s/o*l,a/o*l,i)}return this._walkPhaseUpdate(t,e),!1}_moveWithCollision(t,e,i){if(i)for(const o of i){if(o===this||!o.alive)continue;const l=this.position.x-o.position.x,c=this.position.z-o.position.z,h=l*l+c*c;if(h>.001&&h<1.7*1.7){const u=Math.sqrt(h),d=(1.7-u)/1.7;t+=l/u*d*.9*Math.max(.016,Math.abs(t)+Math.abs(e))*5,e+=c/u*d*.9*Math.max(.016,Math.abs(t)+Math.abs(e))*5}}const n=.44,s=this.position.x+t;this._canOccupy(s,this.position.z,n)&&(this.position.x=s);const a=this.position.z+e;this._canOccupy(this.position.x,a,n)&&(this.position.z=a)}_canOccupy(t,e,i){if(t<this.world.navBounds.minX+i||t>this.world.navBounds.maxX-i||e<this.world.navBounds.minZ+i||e>this.world.navBounds.maxZ-i)return!1;for(const n of this.world.colliders){const s=n.box;if(!(s.max.y<.35)&&t+i>s.min.x&&t-i<s.max.x&&e+i>s.min.z&&e-i<s.max.z)return!1}return!0}_walkPhaseUpdate(t,e){this.walkPhase+=t*(4.5+e*1.2)}_idleAnimation(t){this.walkPhase+=t*1.2}_updateAnimation(t,e){const i=this.state===Kt.CHASE||this.state===Kt.PATROL,n=this.state===Kt.CHASE?2.85:this.state===Kt.PATROL?1.35:0;i&&this._walkPhaseUpdate(t,n);const s=i?Math.sin(this.walkPhase)*(n>2?.62:.42):0;this.leftLeg.rotation.x=Ht(this.leftLeg.rotation.x,s,12,t),this.rightLeg.rotation.x=Ht(this.rightLeg.rotation.x,-s,12,t),this.leftArm.rotation.x=Ht(this.leftArm.rotation.x,this.state===Kt.ATTACK?-1.18:-.55-s*.25,9,t),this.rightArm.rotation.x=Ht(this.rightArm.rotation.x,this.state===Kt.ATTACK?-1.35:-.88,9,t),this.state===Kt.ATTACK?this.head.rotation.x=Ht(this.head.rotation.x,-.08,9,t):this.head.rotation.x=Ht(this.head.rotation.x,0,5,t);const a=i?Math.abs(Math.sin(this.walkPhase*2))*.02:Math.sin(this.walkPhase)*.006;if(this.visual.position.y=Ht(this.visual.position.y,a-this.flinch*.04,14,t),this.visual.rotation.z=Ht(this.visual.rotation.z,-this.flinch*.16+s*.015,10,t),this.muzzleFlash.material.opacity=Math.max(0,this.muzzleFlash.material.opacity-t*7),this.charging){const o=.3+(1-this.chargeTimer/.42)*.7;this.muzzleFlash.scale.setScalar(.18+o*.18)}else this.muzzleFlash.scale.setScalar(.28)}_updateMaterials(t){this.hitFlash>0?(this.visorMaterial.emissiveIntensity=8,this.coreMaterial.emissiveIntensity=6):this.charging||(this.visorMaterial.emissiveIntensity=3.2+Math.sin(performance.now()*.003+this.index)*.4,this.coreMaterial.emissiveIntensity=2+Math.sin(performance.now()*.0025+this.index)*.25)}_panTo(t){const e=t.x-this.position.x,i=t.z-this.position.z;return Xt(e/(Math.abs(i)+1),-.7,.7)}takeDamage(t,e={}){return this.alive?(this.health=Math.max(0,this.health-t),this.hitFlash=.16,this.flinch=Math.min(1,this.flinch+.5),this.healthBarGroup.visible=!0,this.alertMarker.visible=!0,this.alertMarkerTimer=.8,(this.state===Kt.PATROL||this.state===Kt.ALERT)&&(this.state=Kt.CHASE,this.stateTime=0),this.manager&&this.manager.alertNearby(this.position,14),this.health<=0?(this._die(e),{killed:!0,damage:t,health:0}):{killed:!1,damage:t,health:this.health}):{killed:!1,damage:0}}_die(t={}){this.alive=!1,this.state=Kt.DEAD,this.deathTimer=0,this.healthBarGroup.visible=!1,this.alertMarker.visible=!1,this.blobShadow.visible=!1,this.charging=!1,this.muzzleFlash.material.opacity=0,this.path=[],this.velocity.set(0,0,0),this.manager&&this.manager.onEnemyKilled(this,t)}_updateDeath(t){const e=Xt(this.deathTimer/.9,0,1);this.visual.rotation.x=Ht(this.visual.rotation.x,1.38,4.2,t),this.visual.rotation.z=Ht(this.visual.rotation.z,.34,3.2,t),this.visual.position.y=Ht(this.visual.position.y,-.14,3.5,t),this.visorMaterial.emissiveIntensity=Math.max(0,3.4*(1-e)),this.coreMaterial.emissiveIntensity=Math.max(0,2.2*(1-e)),this.deathTimer>2.1&&(this.root.visible=!1)}dispose(){this.scene.remove(this.root),this.visorMaterial.dispose(),this.coreMaterial.dispose(),this.muzzleMaterial.dispose(),this.alertMarker&&this.alertMarker.material.dispose(),this.healthFillMat&&this.healthFillMat.dispose(),this.healthBarGroup&&this.healthBarGroup.traverse(t=>{t.material&&t.material.dispose()})}}class ig{constructor(t,e=1.1,i=.46){this.world=t,this.cellSize=e,this.agentRadius=i;const n=t.navBounds;this.minX=n.minX,this.minZ=n.minZ,this.cols=Math.max(1,Math.ceil((n.maxX-n.minX)/e)),this.rows=Math.max(1,Math.ceil((n.maxZ-n.minZ)/e)),this.total=this.cols*this.rows,this.blocked=new Uint8Array(this.total),this.gScore=new Float32Array(this.total),this.cameFrom=new Int32Array(this.total),this.closed=new Uint8Array(this.total),this._build()}_build(){const{cols:t,rows:e,cellSize:i,minX:n,minZ:s,agentRadius:a}=this;for(let o=0;o<e;o+=1)for(let l=0;l<t;l+=1){const c=n+(l+.5)*i,h=s+(o+.5)*i,u=o*t+l;let d=!1;for(const f of this.world.colliders){const m=f.box;if(!(m.max.y<.45)&&c>m.min.x-a&&c<m.max.x+a&&h>m.min.z-a&&h<m.max.z+a){d=!0;break}}this.blocked[u]=d?1:0}}worldToCell(t,e){return{x:Math.floor((t-this.minX)/this.cellSize),z:Math.floor((e-this.minZ)/this.cellSize)}}cellToWorld(t,e){return new x(this.minX+(t+.5)*this.cellSize,0,this.minZ+(e+.5)*this.cellSize)}isInside(t,e){return t>=0&&e>=0&&t<this.cols&&e<this.rows}isWalkableCell(t,e){return this.isInside(t,e)?this.blocked[e*this.cols+t]===0:!1}isWalkablePoint(t,e){const i=this.worldToCell(t,e);return this.isWalkableCell(i.x,i.z)}findNearestWalkable(t,e){const i=this.worldToCell(t,e);if(this.isWalkableCell(i.x,i.z))return i;for(let n=1;n<=8;n+=1)for(let s=-n;s<=n;s+=1)for(let a=-n;a<=n;a+=1){if(Math.abs(a)!==n&&Math.abs(s)!==n)continue;const o=i.x+a,l=i.z+s;if(this.isWalkableCell(o,l))return{x:o,z:l}}return null}findPath(t,e){const i=this.findNearestWalkable(t.x,t.z),n=this.findNearestWalkable(e.x,e.z);if(!i||!n)return[];const s=i.z*this.cols+i.x,a=n.z*this.cols+n.x;if(s===a)return[this.cellToWorld(n.x,n.z)];this.gScore.fill(1/0),this.cameFrom.fill(-1),this.closed.fill(0),this.gScore[s]=0;const o=new C0;o.push(s,this._heuristic(i.x,i.z,n.x,n.z));let l=!1,c=0;const h=this.total*2;for(;o.size>0&&c<h;){c+=1;const m=o.pop();if(m===a){l=!0;break}if(this.closed[m])continue;this.closed[m]=1;const _=m%this.cols,g=Math.floor(m/this.cols);for(let p=-1;p<=1;p+=1)for(let b=-1;b<=1;b+=1){if(b===0&&p===0)continue;const T=_+b,y=g+p;if(!this.isWalkableCell(T,y)||b!==0&&p!==0&&(!this.isWalkableCell(_+b,g)||!this.isWalkableCell(_,g+p)))continue;const A=y*this.cols+T;if(this.closed[A])continue;const R=b!==0&&p!==0?1.414:1,P=this.gScore[m]+R;if(P<this.gScore[A]){this.gScore[A]=P,this.cameFrom[A]=m;const I=P+this._heuristic(T,y,n.x,n.z);o.push(A,I)}}}if(!l)return[];const u=[];let d=a,f=0;for(;d!==s&&d!==-1&&f<this.total;){f+=1;const m=d%this.cols,_=Math.floor(d/this.cols);u.push(this.cellToWorld(m,_)),d=this.cameFrom[d]}return u.reverse(),this._smooth(t,u)}_heuristic(t,e,i,n){const s=Math.abs(t-i),a=Math.abs(e-n);return s+a+(Math.SQRT2-2)*Math.min(s,a)}_smooth(t,e){if(e.length<3)return e;const i=[];let n=new x(t.x,0,t.z);for(let s=0;s<e.length;s+=1)if(e[Math.min(s+1,e.length-1)],!(s+1<e.length&&this._clearLine(n,e[s+1])))i.push(e[s]),n=e[s];else{let o=s+1;for(let l=s+2;l<e.length&&this._clearLine(n,e[l]);l+=1)o=l;o>s+1?(i.push(e[o]),n=e[o],s=o):(i.push(e[s]),n=e[s])}return i}_clearLine(t,e){const i=e.x-t.x,n=e.z-t.z,s=Math.hypot(i,n),a=Math.ceil(s/(this.cellSize*.45));if(a<=0)return!0;for(let o=1;o<=a;o+=1){const l=o/a;if(!this.isWalkablePoint(t.x+i*l,t.z+n*l))return!1}return!0}}class ng{constructor({scene:t,world:e,effects:i,audio:n,callbacks:s={},quality:a="high"}){this.scene=t,this.world=e,this.effects=i,this.audio=n,this.callbacks=s,this.quality=a,this.assets=tg(),this.nav=new ig(e),this.enemies=[],this.projectiles=[],this.missionCompleteFired=!1,this.totalEnemies=e.enemySpawns.length,this._raycaster=new xs,this._tmp=new x,this._tmp2=new x,this._prev=new x,this._dir=new x,this._createEnemies(),this._createProjectiles()}_createEnemies(){this.world.enemySpawns.forEach((t,e)=>{const i=new eg({scene:this.scene,spawn:t,assets:this.assets,world:this.world,nav:this.nav,effects:this.effects,audio:this.audio,manager:this,index:e});this.enemies.push(i)}),this._refreshHitMeshes()}_createProjectiles(){const t=Hc(),e=new ln(.095,10,8),i=new ln(.2,12,8),n=new ue({color:16757386,toneMapped:!1}),s=new ue({color:16736074,transparent:!0,opacity:.16,blending:be,depthWrite:!1,toneMapped:!1}),a=new Ai({map:t,color:16747368,transparent:!0,opacity:.65,blending:be,depthWrite:!1,toneMapped:!1});for(let o=0;o<36;o+=1){const l=new Jt,c=new O(e,n);l.add(c);const h=new O(i,s);l.add(h);const u=new zi(a);u.scale.set(.62,.62,1),l.add(u),l.visible=!1,this.scene.add(l),this.projectiles.push({group:l,active:!1,life:0,damage:0,velocity:new x,origin:new x,pulse:0})}this._projectileCursor=0}getHitMeshes(){return this.hitMeshes}_refreshHitMeshes(){this.hitMeshes=[];for(const t of this.enemies)t.alive&&this.hitMeshes.push(...t.hitMeshes)}get remaining(){return this.enemies.reduce((t,e)=>t+(e.alive?1:0),0)}get killed(){return this.totalEnemies-this.remaining}update(t,e){if(this.remaining>0)for(const i of this.enemies)i.update(t,e,this.enemies);else for(const i of this.enemies)i.alive||i.update(t,e,this.enemies);this._updateProjectiles(t,e)}alertNearby(t,e){for(const i of this.enemies)i.alive&&i.state===Kt.PATROL&&i.position.distanceTo(t)<e&&(i.setState(Kt.ALERT),i.alertMarker.visible=!0,i.alertMarkerTimer=.85)}fireProjectile(t,e){const i=this.projectiles[this._projectileCursor];this._projectileCursor=(this._projectileCursor+1)%this.projectiles.length,t.root.updateMatrixWorld(!0);const n=t.getMuzzleWorldPosition(this._tmp),s=e.getEyePosition(this._tmp2),a=new x().subVectors(s,n),o=a.length();a.normalize();const l=.022+(e.sprinting?.018:0);a.x+=dt(-l,l),a.y+=dt(-l,l),a.z+=dt(-l,l),a.normalize(),i.group.position.copy(n),i.group.visible=!0,i.active=!0,i.life=4.5,i.damage=dt(7.5,11.5),i.velocity.copy(a).multiplyScalar(25),i.origin.copy(n),i.pulse=Math.random()*Math.PI*2,i.distanceToPlayer=o}_updateProjectiles(t,e){for(const i of this.projectiles){if(!i.active)continue;if(i.life-=t,i.life<=0){i.active=!1,i.group.visible=!1;continue}const n=this._prev.copy(i.group.position),s=this._tmp.copy(i.velocity).multiplyScalar(t),a=this._tmp2.copy(n).add(s),o=s.length();this._raycaster.set(n,this._dir.copy(s).normalize()),this._raycaster.far=o+.05;const l=this._raycaster.intersectObjects(this.world.collisionMeshes,!1);if(l.length>0){this.effects.impact(l[0].point,l[0].face?l[0].face.normal.clone().transformDirection(l[0].object.matrixWorld):new x(0,1,0),"pistol"),this.audio.impact(0),i.active=!1,i.group.visible=!1;continue}const c=this._tmp.set(e.position.x,e.position.y+1.05,e.position.z);if(this._pointSegmentDistance(c,n,a)<.48){this._hitPlayer(i,e,c);continue}const h=this._tmp.set(e.position.x,e.position.y+1.62,e.position.z);if(this._pointSegmentDistance(h,n,a)<.32){this._hitPlayer(i,e,h);continue}i.group.position.copy(a),i.pulse+=t*14;const u=.85+Math.sin(i.pulse)*.18;i.group.scale.setScalar(u),i.group.rotation.x+=t*4,i.group.rotation.z+=t*2.5}}_pointSegmentDistance(t,e,i){const n=i.x-e.x,s=i.y-e.y,a=i.z-e.z,o=t.x-e.x,l=t.y-e.y,c=t.z-e.z,h=n*n+s*s+a*a;let u=0;h>1e-5&&(u=(o*n+l*s+c*a)/h,u=Math.max(0,Math.min(1,u)));const d=o-n*u,f=l-s*u,m=c-a*u;return Math.sqrt(d*d+f*f+m*m)}_hitPlayer(t,e,i){t.active=!1,t.group.visible=!1,this.effects.enemyImpact(i,new x(0,.2,1),!1),e.takeDamage(t.damage,t.origin)}onEnemyKilled(t,e={}){const i=new x(t.position.x,1.1,t.position.z);this.effects.deathBurst(i,16740181),this.audio.explosion(0),this._refreshHitMeshes(),this.callbacks.onKill&&this.callbacks.onKill(t,{...e,remaining:this.remaining,killed:this.killed,total:this.totalEnemies}),this.remaining===0&&!this.missionCompleteFired&&(this.missionCompleteFired=!0,this.callbacks.onMissionComplete&&this.callbacks.onMissionComplete())}reset(){this.missionCompleteFired=!1;for(const t of this.enemies)t.reset();for(const t of this.projectiles)t.active=!1,t.group.visible=!1;this._refreshHitMeshes()}dispose(){for(const t of this.enemies)t.dispose();for(const t of this.projectiles)t.group.traverse(e=>{e.geometry&&e.geometry.dispose(),e.material&&e.material.dispose()}),this.scene.remove(t.group)}}const tr='button:not([disabled]), [href], input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])',ql="phantom.bestTime.v1";class sg{constructor({settings:t,audio:e,callbacks:i={}}){this.settings=t,this.audio=e,this.callbacks=i,this.modal=null,this.lastFocus=null,this._timers=new Set,this._hitTimer=null,this._toastTimer=null,this._damageTimer=null,this._lastAmmo=null,this._cache(),this._initCompass(),this._bind(),this._readBestTime(),this.syncSettings(),this._applyMotionPreference()}_cache(){const t=e=>document.getElementById(e);this.el={hud:t("hud"),menu:t("menu"),boot:t("boot"),bootStatus:t("boot-status"),pause:t("pause"),end:t("end-screen"),mobile:t("mobile-notice"),damageFlash:t("damage-flash"),hitFlash:t("hit-flash"),timer:t("timer"),killCount:t("kill-count"),objectiveCount:t("objective-count"),objectiveFill:t("objective-fill"),healthValue:t("health-value"),healthFill:t("health-fill"),shieldValue:t("shield-value"),shieldFill:t("shield-fill"),vitals:document.querySelector(".vitals"),lowHealth:t("low-health"),weaponName:t("weapon-name"),weaponMode:t("weapon-mode"),weaponClass:t("weapon-class"),weaponPanel:document.querySelector(".weapon-panel"),ammoCurrent:t("ammo-current"),ammoReserve:t("ammo-reserve"),ammoFill:t("ammo-fill"),reloadState:t("reload-state"),crosshair:t("crosshair"),hitmarker:t("hitmarker"),damageDirection:t("damage-direction"),killfeed:t("killfeed"),toast:t("toast"),reloadPrompt:t("reload-prompt"),pickupPrompt:t("pickup-prompt"),compassDeg:t("compass-deg"),compassTicks:t("compass-ticks"),pauseTime:t("pause-time"),pauseRemaining:t("pause-remaining"),pauseKills:t("pause-kills"),endKicker:t("end-kicker"),endTitle:t("end-title"),endTitleAccent:t("end-title-accent"),endCopy:t("end-copy"),endGrade:t("end-grade"),endRating:t("end-rating"),endScore:t("end-score"),endTime:t("end-time"),endKills:t("end-kills"),endAccuracy:t("end-accuracy"),endHeadshots:t("end-headshots"),endDamage:t("end-damage"),endStreak:t("end-streak"),bestTime:t("best-time"),sensitivity:t("sensitivity"),sensitivityValue:t("sensitivity-value"),fov:t("fov"),fovValue:t("fov-value"),volume:t("volume"),volumeValue:t("volume-value"),invertY:t("invert-y"),reducedMotion:t("reduced-motion"),qualityNote:t("quality-note"),qualityButtons:Array.from(document.querySelectorAll("[data-quality]")),startButton:t("start-button"),resetSettings:t("reset-settings"),settingsModal:t("settings-modal"),controlsModal:t("controls-modal")}}_initCompass(){if(!this.el.compassTicks)return;this.compassMarks=[];const t={0:"N",90:"E",180:"S",270:"W"};for(let e=0;e<360;e+=15){const i=document.createElement("span");i.className=`compass__tick${e%90===0?" compass__tick--major":""}`,i.textContent=t[e]||(e%30===0?String(e):""),this.el.compassTicks.appendChild(i),this.compassMarks.push({angle:e,mark:i})}}_bind(){const t=this._click.bind(this);this.el.startButton?.addEventListener("click",()=>{t(),this.callbacks.onStart&&this.callbacks.onStart()}),document.getElementById("resume-button")?.addEventListener("click",()=>{t(),this.callbacks.onResume&&this.callbacks.onResume()}),document.getElementById("pause-restart")?.addEventListener("click",()=>{t(),this.callbacks.onRestart&&this.callbacks.onRestart()}),document.getElementById("pause-quit")?.addEventListener("click",()=>{t(),this.callbacks.onAbort&&this.callbacks.onAbort()}),document.getElementById("pause-settings")?.addEventListener("click",()=>{t(),this.openModal("settings-modal")}),document.getElementById("end-restart")?.addEventListener("click",()=>{t(),this.callbacks.onRestart&&this.callbacks.onRestart()}),document.getElementById("end-menu")?.addEventListener("click",()=>{t(),this.callbacks.onAbort&&this.callbacks.onAbort()});for(const e of document.querySelectorAll("[data-open]"))e.addEventListener("click",()=>{t(),this.openModal(e.dataset.open)});for(const e of document.querySelectorAll("[data-close]"))e.addEventListener("click",()=>{t(),this.closeModal()});this.el.sensitivity?.addEventListener("input",e=>{const i=Number(e.target.value);this.settings.set("sensitivity",i),this._updateSlider(this.el.sensitivity,this.el.sensitivityValue,i.toFixed(2),i,.2,3),this._emitSetting("sensitivity",i)}),this.el.fov?.addEventListener("input",e=>{const i=Number(e.target.value);this.settings.set("fov",i),this._updateSlider(this.el.fov,this.el.fovValue,`${i}°`,i,65,105),this._emitSetting("fov",i)}),this.el.volume?.addEventListener("input",e=>{const i=Number(e.target.value);this.settings.set("volume",i),this._updateSlider(this.el.volume,this.el.volumeValue,`${Math.round(i*100)}%`,i,0,1),this.audio.setVolume(i),this._emitSetting("volume",i)}),this.el.invertY?.addEventListener("change",e=>{this.settings.set("invertY",e.target.checked),this._emitSetting("invertY",e.target.checked)}),this.el.reducedMotion?.addEventListener("change",e=>{this.settings.set("reducedMotion",e.target.checked),this._applyMotionPreference(),this._emitSetting("reducedMotion",e.target.checked)});for(const e of this.el.qualityButtons)e.addEventListener("click",()=>{t();const i=e.dataset.quality;this.settings.set("quality",i),this._syncQuality(),this._emitSetting("quality",i)});this.el.resetSettings?.addEventListener("click",()=>{t(),this.settings.reset(),this.syncSettings(),this.audio.setVolume(this.settings.get("volume")),this._emitSetting("reset",!0)}),window.addEventListener("keydown",e=>{e.code==="Escape"&&this.modal&&(e.preventDefault(),this.closeModal())}),document.addEventListener("keydown",e=>{if(!this.modal||e.key!=="Tab")return;const i=Array.from(this.modal.querySelectorAll(tr)).filter(a=>a.offsetParent!==null);if(i.length===0)return;const n=i[0],s=i[i.length-1];e.shiftKey&&document.activeElement===n?(e.preventDefault(),s.focus()):!e.shiftKey&&document.activeElement===s&&(e.preventDefault(),n.focus())});for(const e of document.querySelectorAll(".btn, .icon-btn, .segmented button"))e.addEventListener("pointerenter",()=>this.audio.uiHover())}_click(){this.audio.uiClick()}_updateSlider(t,e,i,n,s,a){if(!t)return;e&&(e.textContent=i);const o=(n-s)/(a-s)*100;t.style.setProperty("--fill",`${o}%`)}_emitSetting(t,e){this.callbacks.onSettingsChange&&this.callbacks.onSettingsChange(t,e)}_applyMotionPreference(){const t=this.settings.get("reducedMotion");document.documentElement.classList.toggle("user-reduced-motion",t)}syncSettings(){const t=this.settings.values;this.el.sensitivity&&(this.el.sensitivity.value=t.sensitivity,this._updateSlider(this.el.sensitivity,this.el.sensitivityValue,Number(t.sensitivity).toFixed(2),t.sensitivity,.2,3)),this.el.fov&&(this.el.fov.value=t.fov,this._updateSlider(this.el.fov,this.el.fovValue,`${t.fov}°`,t.fov,65,105)),this.el.volume&&(this.el.volume.value=t.volume,this._updateSlider(this.el.volume,this.el.volumeValue,`${Math.round(t.volume*100)}%`,t.volume,0,1)),this.el.invertY&&(this.el.invertY.checked=t.invertY),this.el.reducedMotion&&(this.el.reducedMotion.checked=t.reducedMotion),this._syncQuality()}_syncQuality(){const t=this.settings.get("quality");for(const e of this.el.qualityButtons){const i=e.dataset.quality===t;e.setAttribute("aria-checked",String(i))}this.el.qualityNote&&(this.el.qualityNote.textContent=t==="high"?"BLOOM + SHADOWS":t==="medium"?"BALANCED":"PERFORMANCE")}openModal(t){const e=document.getElementById(t);if(!e)return;this.modal&&this.modal!==e&&this.closeModal(!0),this.lastFocus=document.activeElement,this.modal=e,e.hidden=!1,document.body.classList.add("modal-open");const i=e.querySelector(tr);i&&requestAnimationFrame(()=>i.focus({preventScroll:!0}))}closeModal(t=!1){this.modal&&(this.modal.hidden=!0,this.modal=null,document.body.classList.remove("modal-open"),this.lastFocus&&typeof this.lastFocus.focus=="function"&&this.lastFocus.focus({preventScroll:!0}),t||this.audio.uiClick())}showMenu(){this.el.menu.hidden=!1,this.el.menu.classList.remove("is-leaving"),this.el.hud.classList.add("is-hidden"),this.el.hud.setAttribute("aria-hidden","true"),this.el.pause.hidden=!0,this.el.end.hidden=!0,this.el.end.classList.remove("is-defeat"),this.el.damageFlash.classList.remove("is-active"),this.el.toast.classList.remove("is-visible"),this.el.reloadPrompt.classList.remove("is-visible"),this.el.pickupPrompt.classList.remove("is-visible"),this.closeModal(!0),this.syncSettings()}enterGame(){this.el.menu.classList.add("is-leaving"),this.el.hud.classList.remove("is-hidden"),this.el.hud.setAttribute("aria-hidden","false"),this.el.pause.hidden=!0,this.el.end.hidden=!0,this.el.damageFlash.classList.remove("is-active"),this.el.hitFlash.classList.remove("is-active")}showPause(t={}){this.el.pause.hidden=!1,this.el.pauseTime.textContent=nn(t.elapsed||0),this.el.pauseRemaining.textContent=String(t.remaining??0).padStart(2,"0"),this.el.pauseKills.textContent=String(t.kills??0).padStart(2,"0");const e=this.el.pause.querySelector(tr);e&&e.focus({preventScroll:!0})}hidePause(){this.el.pause.hidden=!0}showEnd({victory:t,stats:e}){this.el.hud.classList.add("is-hidden"),this.el.pause.hidden=!0,this.el.end.hidden=!1,this.closeModal(!0),this.el.end.classList.toggle("is-defeat",!t);const i=Xt(e.accuracy||0,0,1),n=e.elapsed||0,s=Math.max(0,Math.round(e.kills||0)),a=Math.max(s,e.total||s||1),o=Math.max(0,Math.round(e.headshots||0)),l=Math.max(0,Math.round(e.damageTaken||0)),c=t?Math.max(0,6e3-Math.round(n*18)):0,h=s*1e3+o*140+Math.round(i*2e3)+c-l*12,u=Math.max(0,h);let d="C",f="COMPLIANT";t?u>=14500?(d="S",f="EXEMPLARY"):u>=11500?(d="A",f="SUPERIOR"):u>=8500?(d="B",f="EFFECTIVE"):(d="C",f="ADEQUATE"):(d="F",f="SIGNAL LOST"),this.el.endKicker.textContent=t?"OPERATION COMPLETE // SITE-09 SECURED":"OPERATIVE DOWN // MISSION FAILED",this.el.endTitle.setAttribute("aria-label",t?"Mission complete":"Signal lost"),this.el.endTitle.childNodes[0].nodeValue=t?"MISSION":"SIGNAL",this.el.endTitleAccent.textContent=t?"COMPLETE":"LOST",this.el.endCopy.textContent=t?"All hostile signals neutralized. The facility is dark again — and nothing followed you out.":"Biometric signal terminated. The sentinels remain active inside SITE-09. Regroup and redeploy.",this.el.endGrade.textContent=d,this.el.endRating.textContent=f,this.el.endScore.textContent=`SCORE ${String(u).padStart(6,"0")}`,this.el.endTime.textContent=nn(n),this.el.endKills.textContent=`${String(s).padStart(2,"0")} / ${String(a).padStart(2,"0")}`,this.el.endAccuracy.textContent=`${Math.round(i*100)}%`,this.el.endHeadshots.textContent=String(o).padStart(2,"0"),this.el.endDamage.textContent=String(l).padStart(3,"0"),this.el.endStreak.textContent=String(e.bestStreak||0).padStart(2,"0"),t&&this._maybeSaveBestTime(n);const m=this.el.end.querySelector(tr);m&&requestAnimationFrame(()=>m.focus({preventScroll:!0}))}showBootDone(){this.el.boot.classList.add("is-done"),setTimeout(()=>{this.el.boot.hidden=!0},800)}showBootStatus(t){this.el.bootStatus&&(this.el.bootStatus.textContent=t)}showFatalError(){document.getElementById("webgl-error").hidden=!1,this.el.boot.hidden=!0}showMobileNotice(){this.el.mobile.hidden=!1,this.el.menu.hidden=!0,this.el.hud.classList.add("is-hidden"),this.el.boot.hidden=!0}updateHealth(t,e){const i=Xt(t,0,100),n=Xt(e,0,50);this.el.healthValue.textContent=String(Math.ceil(i)),this.el.shieldValue.textContent=String(Math.ceil(n)),this.el.healthFill.style.width=`${i}%`,this.el.shieldFill.style.width=`${n/50*100}%`;const s=i<=30;this.el.vitals.classList.toggle("is-critical",s),this.showLowHealthWarning(s)}updateAmmo(t){const{current:e,reserve:i,max:n,reloading:s}=t;this.el.ammoCurrent.textContent=String(e).padStart(2,"0"),this.el.ammoReserve.textContent=String(i).padStart(3,"0");const a=n>0?e/n:0;this.el.ammoFill.style.width=`${a*100}%`,this.el.ammoCurrent.classList.toggle("is-low",e>0&&e<=Math.max(2,Math.ceil(n*.18))),this.el.weaponPanel.classList.toggle("is-low",e===0),this.el.reloadPrompt.classList.toggle("is-visible",e===0&&!s&&i>0),this.el.crosshair.classList.toggle("is-empty",e===0),this.el.reloadState.textContent=s?"RELOADING":e===0?"MAG EMPTY":"",this.el.ammoCurrent.textContent!==this._lastAmmo&&(this._lastAmmo=this.el.ammoCurrent.textContent,this.el.ammoCurrent.animate([{transform:"translateY(-4px)",opacity:.55},{transform:"translateY(0)",opacity:1}],{duration:130,easing:"cubic-bezier(.22,1,.36,1)"}))}updateWeapon(t){this.el.weaponName.textContent=t.name,this.el.weaponMode.textContent=t.mode,this.el.weaponClass.textContent=t.category;const e=this.el.weaponPanel.querySelector(".weapon-panel__slot b");e&&(e.textContent=String(t.slot).padStart(2,"0")),this.el.reloadState.textContent=""}updateObjective(t,e){this.el.objectiveCount.textContent=`${String(t).padStart(2,"0")} / ${String(e).padStart(2,"0")}`,this.el.killCount.childNodes[0].nodeValue=String(t).padStart(2,"0");const i=this.el.killCount.querySelector("span");i&&(i.textContent=`/${String(e).padStart(2,"0")}`),this.el.objectiveFill.style.width=`${e>0?t/e*100:0}%`}updateTimer(t){this.el.timer.textContent=nn(t)}updateCompass(t){const e=(-t*180/Math.PI+360)%360;if(this.el.compassDeg.textContent=String(Math.round(e)%360).padStart(3,"0"),!!this.compassMarks)for(const{angle:i,mark:n}of this.compassMarks){let s=i-e;s=(s+540)%360-180;const a=Math.abs(s)<=64;n.style.left=`${50+s/128*100}%`,n.style.opacity=a?String(1-Math.abs(s)/92):"0",n.style.visibility=a?"visible":"hidden"}}updateCrosshair({spread:t,aiming:e,enemyTarget:i}){const n=Math.round(3+t*17);this.el.crosshair.style.setProperty("--spread",`${n}px`),this.el.crosshair.classList.toggle("is-ads",e),this.el.crosshair.classList.toggle("is-enemy",!!i)}setReloadState(t,e=0){this.el.reloadState.textContent=t?`RELOADING ${Math.round(e*100)}%`:"",this.el.reloadPrompt.classList.toggle("is-visible",!1)}setPickupPrompt(t){this.el.pickupPrompt.classList.toggle("is-visible",!!t)}showHitmarker({headshot:t=!1,killed:e=!1}={}){const i=this.el.hitmarker;i.classList.remove("is-hit","is-kill","is-headshot"),i.offsetWidth,i.classList.add("is-hit"),t&&i.classList.add("is-headshot"),e&&i.classList.add("is-kill"),clearTimeout(this._hitTimer),this._hitTimer=setTimeout(()=>{i.classList.remove("is-hit","is-kill","is-headshot")},220)}flashDamage(){this.el.damageFlash.classList.add("is-active"),clearTimeout(this._damageTimer),this._damageTimer=setTimeout(()=>{this.el.damageFlash.classList.remove("is-active")},280)}flashHit(){this.el.hitFlash.classList.add("is-active"),setTimeout(()=>this.el.hitFlash.classList.remove("is-active"),80)}showDirectionalDamage(t,e,i){if(!t)return;const n=t.x-e.x,s=t.z-e.z,a=Math.atan2(n,-s)*180/Math.PI,o=(-i*180/Math.PI+360)%360,l=(a-o+360)%360;this.el.damageDirection.style.setProperty("--angle",`${l}deg`),this.el.damageDirection.classList.remove("is-active"),this.el.damageDirection.offsetWidth,this.el.damageDirection.classList.add("is-active"),setTimeout(()=>this.el.damageDirection.classList.remove("is-active"),650)}addKillFeed(t="SENTINEL"){const e=document.createElement("div");e.className="killfeed__row";const i=document.createElement("b");i.textContent="PHANTOM-1";const n=document.createElement("i");n.textContent="⌁";const s=document.createElement("b");for(s.textContent=t,e.append(i,n,s,document.createTextNode("NEUTRALIZED")),this.el.killfeed.prepend(e);this.el.killfeed.children.length>4;)this.el.killfeed.lastElementChild?.remove();const a=setTimeout(()=>{e.classList.add("is-fading"),setTimeout(()=>e.remove(),350)},3600);this._timers.add(a)}showToast(t,e=1800){this.el.toast.textContent=t,this.el.toast.classList.add("is-visible"),clearTimeout(this._toastTimer),this._toastTimer=setTimeout(()=>this.el.toast.classList.remove("is-visible"),e)}showLowHealthWarning(t){this.el.lowHealth.style.display=t?"block":""}setMenuRequirementError(t){const e=document.querySelector(".menu__requirements");e&&(e.dataset.error=t)}clearTransient(){this.el.killfeed.replaceChildren(),this.el.toast.classList.remove("is-visible"),this.el.damageDirection.classList.remove("is-active"),this.el.reloadPrompt.classList.remove("is-visible"),this.el.pickupPrompt.classList.remove("is-visible"),this.el.damageFlash.classList.remove("is-active"),this.el.hitFlash.classList.remove("is-active")}_readBestTime(){let t=null;try{const e=Number(localStorage.getItem(ql));Number.isFinite(e)&&e>0&&(t=e)}catch{t=null}this.bestTime=t,this.el.bestTime&&(this.el.bestTime.textContent=t?`BEST TIME ${nn(t)}`:"BEST TIME —:—")}_maybeSaveBestTime(t){if(!(!Number.isFinite(t)||t<=0)&&!(this.bestTime!==null&&t>=this.bestTime)){this.bestTime=t;try{localStorage.setItem(ql,String(t))}catch{}this.el.bestTime&&(this.el.bestTime.textContent=`BEST TIME ${nn(t)}`)}}}new x(0,1,0);class rg{constructor(t,e,i,n="high"){this.scene=t,this.renderer=e,this.materials=i,this.quality=n,this.root=new Jt,this.root.name="SITE-09",this.scene.add(this.root),this.colliders=[],this.collisionMeshes=[],this.medkits=[],this.enemySpawns=[],this.time=0,this.animated=[],this._dust=null,this._dustData=null,this._tempV=new x,this.playerSpawn=new x(0,0,23.2),this.playerYaw=0,this.navBounds={minX:-27.2,maxX:27.2,minZ:-31.4,maxZ:26.6},this._buildShell(),this._buildSouthBay(),this._buildReactorHall(),this._buildCommandDeck(),this._buildServiceCorridors(),this._buildCeiling(),this._buildLighting(),this._buildAtmosphere(),this._buildMedkits(),this._defineSpawns(),this._batchStaticGeometry(),n==="low"&&this.setShadows(!1)}_batchStaticGeometry(){this.root.updateMatrixWorld(!0),this.batchedRoot=new Jt,this.batchedRoot.name="STATIC_BATCHES",this.root.add(this.batchedRoot);const t=new Set,e=s=>{s&&s.traverse(a=>t.add(a))};e(this._reactorCage),e(this._holoGroup);for(const s of this.medkits)e(s.group);const i=new Map;this.root.traverse(s=>{if(!s.isMesh||s.isSkinnedMesh||t.has(s)||!s.visible||s===this.batchedRoot||s.userData.noBatch)return;const a=s.material;if(!a||Array.isArray(a)||a.transparent||a.opacity<1||!s.geometry?.attributes?.position)return;const o=`${a.uuid}|${s.castShadow?1:0}|${s.receiveShadow?1:0}|${s.renderOrder}`;i.has(o)||i.set(o,{material:a,castShadow:s.castShadow,receiveShadow:s.receiveShadow,renderOrder:s.renderOrder,meshes:[]}),i.get(o).meshes.push(s)});let n=0;for(const s of i.values()){if(s.meshes.length<2)continue;const a=[];for(const c of s.meshes)try{const h=c.geometry.index?c.geometry.toNonIndexed():c.geometry.clone();for(const u of Object.keys(h.attributes))["position","normal","uv"].includes(u)||h.deleteAttribute(u);if(!h.getAttribute("uv")){const u=h.getAttribute("position").count;h.setAttribute("uv",new Me(new Float32Array(u*2),2))}h.applyMatrix4(c.matrixWorld),a.push(h)}catch{a.length=0;break}if(a.length!==s.meshes.length||a.length<2)continue;let o=null;try{o=kc(a,!1)}catch{o=null}if(!o)continue;const l=new O(o,s.material);l.castShadow=s.castShadow,l.receiveShadow=s.receiveShadow,l.renderOrder=s.renderOrder,this.batchedRoot.add(l);for(const c of s.meshes)c.visible=!1;for(const c of a)c.dispose();n+=1}this.batchCount=n}addBox({x:t,z:e,w:i,d:n,h:s,y:a=0,material:o,collide:l=!0,cast:c=!0,receive:h=!0,name:u="structure",rounded:d=0}){const f=d>0?new wi(i,s,n,2,Math.min(d,Math.min(i,s,n)*.2)):new lt(i,s,n),m=new O(f,o);if(m.position.set(t,a+s/2,e),m.castShadow=c,m.receiveShadow=h,this.root.add(m),l){const _=new Ie(new x(t-i/2,a,e-n/2),new x(t+i/2,a+s,e+n/2));this.colliders.push({box:_,mesh:m,name:u}),this.collisionMeshes.push(m)}return m}addCylinder({x:t,y:e=0,z:i,radiusTop:n,radiusBottom:s=n,height:a,radialSegments:o=16,material:l,collide:c=!1,cast:h=!0,receive:u=!0,name:d="cylinder"}){const f=new me(n,s,a,o),m=new O(f,l);if(m.position.set(t,e+a/2,i),m.castShadow=h,m.receiveShadow=u,this.root.add(m),c){const _=Math.max(n,s),g=new Ie(new x(t-_,e,i-_),new x(t+_,e+a,i+_));this.colliders.push({box:g,mesh:m,name:d}),this.collisionMeshes.push(m)}return m}addColliderOnly(t,e,i,n,s,a,o="collision"){this.colliders.push({box:new Ie(new x(t-n/2,e,i-a/2),new x(t+n/2,e+s,i+a/2)),mesh:null,name:o})}addWall({x:t,z:e,w:i,d:n,h:s=6,material:a=this.materials.wallDark,cap:o=!0,light:l=!1,name:c="wall"}){const h=this.addBox({x:t,z:e,w:i,d:n,h:s,material:a,name:c});if(o){const u=new O(new lt(i+.08,.1,n+.08),this.materials.steel);u.position.set(t,s+.05,e),u.castShadow=!1,u.receiveShadow=!0,this.root.add(u)}if(l){const u=i>n,d=new O(new lt(u?i*.82:.015,.015,u?.015:n*.82),this.materials.cyanSoft);d.position.set(t,.18,e),this.root.add(d)}return h}addFloorPanel(t,e,i,n,s=this.materials.floorDark){const a=new O(new Ve(i,n),s);return a.rotation.x=-Math.PI/2,a.position.set(t,.012,e),a.receiveShadow=!0,this.root.add(a),a}addSign(t,e,i,n,s,a,o=0){const l=new O(new Ve(s,a),t);return l.position.set(e,i,n),l.rotation.y=o,this.root.add(l),l}addHazardStrip(t,e,i,n,s=0,a=.02){const o=new O(new Ve(i,n),this.materials.hazardStripe);return o.rotation.x=-Math.PI/2,o.rotation.z=s,o.position.set(t,a,e),o.receiveShadow=!0,this.root.add(o),o}addEmissiveStrip(t,e,i,n,s,a,o=this.materials.cyan){const l=new O(new lt(n,s,a),o);return l.position.set(t,e,i),this.root.add(l),l}_buildShell(){const t=this.materials,e=new O(new lt(58,.35,62),t.floor);e.position.set(0,-.175,-2.5),e.receiveShadow=!0,this.root.add(e),this.collisionMeshes.push(e),this.addFloorPanel(0,-4,47,25,t.floorDark),this.addFloorPanel(0,18.5,34,15,t.floorDark),this.addWall({x:0,z:28.1,w:58.4,d:.8,h:8.4,material:t.wallDark,light:!0,name:"south perimeter"}),this.addWall({x:0,z:-32.1,w:58.4,d:.8,h:8.4,material:t.wallDark,light:!0,name:"north perimeter"}),this.addWall({x:-28.1,z:-2,w:.8,d:61,h:8.4,material:t.wallDark,name:"west perimeter"}),this.addWall({x:28.1,z:-2,w:.8,d:61,h:8.4,material:t.wallDark,name:"east perimeter"});for(let i=-28;i<=24;i+=8)this.addBox({x:-27.6,z:i,w:.34,d:.6,h:8.1,material:t.steel,collide:!1,cast:!1,name:"rib"}),this.addBox({x:27.6,z:i,w:.34,d:.6,h:8.1,material:t.steel,collide:!1,cast:!1,name:"rib"});this.addWall({x:-17,z:9.5,w:22,d:.55,h:5.6,material:t.wall,name:"south divider left"}),this.addWall({x:17,z:9.5,w:22,d:.55,h:5.6,material:t.wall,name:"south divider right"}),this._buildDoorFrame(0,9.5,10.6,5.6,0),this.addSign(t.signs.security,0,3.8,9.18,4.6,1.45,Math.PI),this.addHazardStrip(0,10.25,10.4,.55,0,.018),this.addWall({x:-27,z:-12.1,w:2,d:.55,h:5.4,material:t.wall,name:"north divider left edge"}),this.addWall({x:-13.5,z:-12.1,w:17,d:.55,h:5.4,material:t.wall,name:"north divider left"}),this.addWall({x:13.5,z:-12.1,w:17,d:.55,h:5.4,material:t.wall,name:"north divider right"}),this.addWall({x:27,z:-12.1,w:2,d:.55,h:5.4,material:t.wall,name:"north divider right edge"}),this._buildDoorFrame(0,-12.1,10,5.4,Math.PI),this._buildDoorFrame(24,-12.1,3.4,5.4,Math.PI),this._buildDoorFrame(-24,-12.1,3.4,5.4,Math.PI),this.addSign(t.signs.command,0,3.7,-11.75,4.4,1.4,0),this.addSign(t.signs.service,23.9,3.5,-11.75,3.2,1,0),this.addHazardStrip(0,-11.45,9.8,.5,0,.018),this.addWall({x:-23.9,z:-8.1,w:.55,d:8,h:5.8,material:t.wall,name:"reactor west wall north"}),this.addWall({x:-23.9,z:5.9,w:.55,d:7.2,h:5.8,material:t.wall,name:"reactor west wall south"}),this.addWall({x:23.9,z:-8.1,w:.55,d:8,h:5.8,material:t.wall,name:"reactor east wall north"}),this.addWall({x:23.9,z:5.9,w:.55,d:7.2,h:5.8,material:t.wall,name:"reactor east wall south"}),this._buildDoorFrame(-23.9,-1.1,7,5.8,Math.PI/2),this._buildDoorFrame(23.9,-1.1,7,5.8,Math.PI/2),this.addSign(t.signs.core,-23.55,3.55,-4,3.4,1.1,Math.PI/2),this.addSign(t.signs.core,23.55,3.55,-4,3.4,1.1,-Math.PI/2),this.addHazardStrip(-23.4,-1.1,6.6,.45,Math.PI/2,.018),this.addHazardStrip(23.4,-1.1,6.6,.45,Math.PI/2,.018)}_buildDoorFrame(t,e,i,n,s){const a=this.materials,o=new Jt;o.position.set(t,0,e),o.rotation.y=s,this.root.add(o);const l=new lt(.26,n,.34);for(const u of[-1,1]){const d=new O(l,a.blackMetal);d.position.set(i/2*u,n/2,0),d.castShadow=!0,o.add(d);const f=new O(new lt(.035,n*.55,.035),a.cyan);f.position.set(i/2*u-u*.16,n*.48,.18),o.add(f)}const c=new O(new lt(i+.35,.38,.36),a.steel);c.position.set(0,n-.18,0),c.castShadow=!0,o.add(c);const h=new O(new lt(i*.52,.03,.04),a.cyanSoft);h.position.set(0,n-.39,.2),o.add(h)}_buildSouthBay(){const t=this.materials;this.addEmissiveStrip(0,.015,17.4,.09,.008,9.5,t.cyanSoft),this.addEmissiveStrip(-4.7,.014,17.4,.025,.006,9.5,t.cyanSoft),this.addEmissiveStrip(4.7,.014,17.4,.025,.006,9.5,t.cyanSoft),this._buildContainer(-14.2,17.2,5.6,2.6,3,t.darkPanel,.08),this._buildContainer(13.6,19.7,5,2.5,2.9,t.wallDark,-.06),this.addCrate(-20.5,22.4,1.35,1.25,1.35,.16),this.addCrate(-18.8,22.6,1.05,.9,1.05,-.1),this.addCrate(-19.7,20.9,1.2,1.5,1.2,.3),this.addCrate(20.2,14.5,1.4,1.1,1.4,-.14),this.addCrate(21.1,16.1,1,1.35,1,.22),this.addCrate(5.8,22.8,1.1,.9,1.1,.08),this.addCrate(-6.4,14.2,1.25,1.25,1.25,-.2),this.addBarrier(-5.2,13.3,3.6,.28),this.addBarrier(6.1,12.3,3.2,-.22),this.addBarrier(0,19.6,2.8,Math.PI/2);const e=new O(new _s(1.3,1.42,48),new ue({color:6547967,transparent:!0,opacity:.32,side:Ce}));e.rotation.x=-Math.PI/2,e.position.set(0,.02,23.2),this.root.add(e),this.addEmissiveStrip(0,.1,25.5,2.8,.08,.025,t.cyanSoft),this._addWallVent(-27.55,2.4,19.5,Math.PI/2),this._addWallVent(27.55,2.4,19.5,-Math.PI/2),this._addPipeRun(-26.8,4.2,11,13,.16,0),this._addPipeRun(26.8,4.8,20,8,.2,Math.PI)}_buildReactorHall(){const t=this.materials,e=this.addCylinder({x:0,z:-1.4,radiusTop:5.4,radiusBottom:5.7,height:.55,radialSegments:48,material:t.darkPanel,collide:!1,receive:!0});e.castShadow=!0,this.colliders.push({box:new Ie(new x(-4.5,0,-5.9),new x(4.5,4.8,3.1)),mesh:e,name:"reactor core"}),this.collisionMeshes.push(e);const i=new O(new Oi(5.15,.07,8,64),t.steel);i.rotation.x=Math.PI/2,i.position.set(0,.59,-1.4),this.root.add(i);const n=new O(new Oi(4.55,.035,8,64),t.red);n.rotation.x=Math.PI/2,n.position.set(0,.61,-1.4),this.root.add(n);const s=new Jt;s.position.set(0,0,-1.4),this.root.add(s);const a=new me(2.25,2.45,4.7,32,1,!0),o=new O(a,new qt({color:2107952,metalness:.85,roughness:.28,transparent:!0,opacity:.56,side:Ce}));o.position.y=2.9,o.castShadow=!0,s.add(o),this.collisionMeshes.push(o);const l=new ue({color:5562357,transparent:!0,opacity:.38,blending:be,depthWrite:!1,toneMapped:!1}),c=new O(new me(1.15,1.45,4.9,24,1,!0),l);c.position.y=2.9,s.add(c);const h=new O(new me(.52,.62,4.3,16),new ue({color:13958143,transparent:!0,opacity:.75,toneMapped:!1}));h.position.y=2.9,s.add(h);const u=[];for(let f=0;f<6;f+=1){const m=new O(new Oi(2.45+f%2*.24,.055,8,42),f===2?t.red:t.cyan);m.rotation.x=Math.PI/2,m.position.y=.95+f*.72,s.add(m),u.push(m)}for(let f=0;f<6;f+=1){const m=f/6*Math.PI*2,_=new O(new lt(.12,4.8,.12),t.steel);_.position.set(Math.cos(m)*2.6,2.9,Math.sin(m)*2.6),_.rotation.y=-m,s.add(_)}for(let f=0;f<4;f+=1){const m=Math.PI/4+f/4*Math.PI*2,_=Math.cos(m)*3.9,g=Math.sin(m)*3.9-1.4,p=new O(new lt(.8,.55,.8),t.blackMetal);p.position.set(_,.3,g),p.castShadow=!0,this.root.add(p);const b=new O(new lt(.23,3.2,.23),t.steel);b.position.set(_*.82,1.7,g+(g>-1.4?-.25:.25)),b.rotation.z=_>0?-.18:.18,b.castShadow=!0,this.root.add(b)}this._reactorCage=s,this._reactorRings=u,this._reactorCore=c,this.reactorLight=new fi(5562357,68,25,1.6),this.reactorLight.position.set(0,3.1,-1.4),this.scene.add(this.reactorLight),this._addCableCurve([[0,6.5,2],[1.5,5.3,-3],[-1,6.9,-8],[0,7.4,-11]]);for(const[f,m]of[[-14,4.6],[14,4.6],[-14,-7.8],[14,-7.8]])this.addPillar(f,m,.62,7.2);this.addBarrier(-9.4,5.8,4.2,.12),this.addBarrier(9.4,5.8,4.2,-.12),this.addBarrier(-18.2,-1.5,3.4,Math.PI/2),this.addBarrier(18.2,-1.5,3.4,Math.PI/2),this.addCrate(-20.3,6.3,1.5,1.35,1.5,.12),this.addCrate(20.4,6.4,1.3,1.1,1.3,-.18),this.addCrate(-19.4,-6.9,1.4,1.7,1.4,.2),this.addCrate(19.2,-6.7,1.25,1.35,1.25,-.1),this._addGuardRail(-22.6,-1.1,.12,5.8,0),this._addGuardRail(22.6,-1.1,.12,5.8,0);const d=new O(new _s(6.3,6.42,64),new ue({color:5947089,transparent:!0,opacity:.22,side:Ce}));d.rotation.x=-Math.PI/2,d.position.set(0,.018,-1.4),this.root.add(d),this.addHazardStrip(-9.4,7.3,7,.38,0,.02),this._addCatwalk()}_buildCommandDeck(){const t=this.materials;this.addBox({x:0,z:-27.7,w:20,d:2.6,h:.5,material:t.darkPanel,name:"command dais"});const e=this.addBox({x:0,z:-27.3,w:11.5,d:1.7,h:1.05,y:.5,material:t.blackMetal,rounded:.08,name:"command console"});e.castShadow=!0;for(let o=0;o<5;o+=1){const l=t.screens[o%t.screens.length],c=new O(new Ve(1.7,.85),l);c.position.set(-4.4+o*2.2,1.95,-26.47),c.rotation.x=-.08,c.rotation.y=0,this.root.add(c);const h=new O(new lt(1.83,.98,.08),t.blackMetal);h.position.set(-4.4+o*2.2,1.95,-26.57),h.rotation.x=-.08,h.castShadow=!0,this.root.add(h);const u=new O(new lt(1.6,.025,.02),o===3?t.red:t.cyanSoft);u.position.set(-4.4+o*2.2,1.48,-26.5),this.root.add(u)}const i=this.addCylinder({x:0,z:-20.2,radiusTop:1.7,radiusBottom:1.95,height:.9,radialSegments:32,material:t.blackMetal,collide:!0,receive:!0,name:"holo table"});i.castShadow=!0;const n=new O(new me(2,2,.12,32),t.steel);n.position.set(0,.98,-20.2),this.root.add(n);const s=new O(new Hn(1.72,42),t.holo);s.rotation.x=-Math.PI/2,s.position.set(0,1.07,-20.2),this.root.add(s);const a=new Jt;a.position.set(0,1.25,-20.2),this.root.add(a);for(let o=0;o<4;o+=1){const l=new O(new lt(.3,.35+o*.2,.3),t.holo);l.position.set(Math.cos(o*1.7)*.75,.2,Math.sin(o*1.7)*.75),a.add(l)}this._holoGroup=a;for(let o=0;o<5;o+=1)this._addServerRack(-22.8,-22.5+o*2.1,Math.PI/2),o<4&&this._addServerRack(22.8,-24.3+o*2.1,-Math.PI/2);this.addCrate(-12.5,-17.2,1.4,1.2,1.4,.12),this.addCrate(-11.3,-16,1,.95,1,-.2),this.addCrate(12.8,-18.2,1.6,1.5,1.6,.2),this.addCrate(14.1,-16.9,1,.9,1,-.15),this.addBarrier(-7.8,-16.2,3.4,.1),this.addBarrier(8.2,-16.3,3.4,-.1),this.addBarrier(0,-23.4,3,Math.PI/2),this.addHazardStrip(0,-24.8,2.8,.45,0,.02);for(const o of[-8,8])this.addBox({x:o,z:-30.9,w:1.2,d:.5,h:1.4,y:4.5,material:t.blackMetal,collide:!1,cast:!1,name:"junction box"});this.addEmissiveStrip(-16.8,.8,-12.38,.05,1.6,.05,t.cyanSoft),this.addEmissiveStrip(16.8,.8,-12.38,.05,1.6,.05,t.cyanSoft)}_buildServiceCorridors(){const t=this.materials;for(const i of[-1,1]){const n=i*26;this.addFloorPanel(n,-1.2,3.5,20.4,t.floorDark),this._addPipeRun(n-i*1.1,3.35,-10.4,19.6,.18,Math.PI/2),this._addPipeRun(n-i*1.5,3.05,-10.4,19.6,.12,Math.PI/2),this._addWallVent(n,2.2,i>0?-10:-8,i>0?-Math.PI/2:Math.PI/2),this.addCrate(n+i*.8,-9.2,.9,1.1,.9,i*.1),this.addCrate(n-i*.7,7.4,1.1,1.2,1.1,-i*.15),this.addEmissiveStrip(n,.06,-1.1,.035,.012,10.4,i>0?t.amber:t.cyanSoft)}this.emergencyLight=new fi(16724805,28,12,1.8),this.emergencyLight.position.set(26.2,3.4,-7.6),this.scene.add(this.emergencyLight);const e=new O(new ln(.12,10,8),t.red);e.position.set(26.2,4.6,-7.6),this.root.add(e),this.addEmissiveStrip(26.2,4.25,-7.6,.02,.7,.02,t.red),this.addBarrier(26,3.5,2.4,Math.PI/2),this.addBarrier(-26,-6.8,2.4,Math.PI/2)}_buildCeiling(){const t=this.materials;this.addBox({x:-20,z:-2,w:16,d:58,h:.3,y:8.3,material:t.darkPanel,collide:!1,cast:!1,receive:!1,name:"roof"}),this.addBox({x:20,z:-2,w:16,d:58,h:.3,y:8.3,material:t.darkPanel,collide:!1,cast:!1,receive:!1,name:"roof"});for(let i=-28;i<=26;i+=9){const n=new O(new lt(56,.34,.42),t.steel);n.position.set(0,8.05,i),n.castShadow=!0,this.root.add(n);for(const s of[-22.5,-11,11,22.5]){const a=new O(new lt(.22,1.4,.22),t.steel);a.position.set(s,7.45,i+.65),a.rotation.x=.55,this.root.add(a)}}for(const i of[-20,-8,8,20]){const n=new O(new lt(.3,.3,60),t.steel);n.position.set(i,8.28,-2),this.root.add(n)}const e=[[0,7.4,17],[-14,7.4,2],[14,7.4,-4],[0,7.4,-24]];for(const[i,n,s]of e)this._addHangingLamp(i,n,s);this._addCableCurve([[-24,7.3,7],[-11,6.7,6.5],[3,7.1,5.5],[21,6.8,6]]),this._addCableCurve([[23,7.4,-17],[9,6.8,-17.4],[-5,7.2,-18],[-22,6.9,-17.8]])}_buildLighting(){this.ambient=new Pc(3888738,.54),this.scene.add(this.ambient),this.hemi=new Ru(8299698,197894,.46),this.scene.add(this.hemi),this.directional=new Cc(9548993,.58),this.directional.position.set(11,19,9),this.directional.castShadow=this.quality!=="low",this.directional.shadow.mapSize.set(this.quality==="high"?1024:512,this.quality==="high"?1024:512),this.directional.shadow.camera.left=-34,this.directional.shadow.camera.right=34,this.directional.shadow.camera.top=34,this.directional.shadow.camera.bottom=-36,this.directional.shadow.camera.near=1,this.directional.shadow.camera.far=55,this.directional.shadow.bias=-7e-4,this.directional.shadow.normalBias=.035,this.scene.add(this.directional);const t=(i,n,s,a,o,l,c,h,u=!1)=>{const d=new Pu(l,c,32,h,.68,1.45);return d.position.set(i,n,s),d.target.position.set(a,0,o),d.castShadow=u&&this.quality!=="low",d.shadow.mapSize.set(this.quality==="high"?1024:512,this.quality==="high"?1024:512),d.shadow.bias=-.001,d.shadow.normalBias=.025,this.scene.add(d),this.scene.add(d.target),d};this.mainSpot=t(0,8.2,18,0,16,12182765,590,.82,!1),this.centralSpot=t(0,8.3,2,0,-1,10016999,380,.85,!1),this.commandSpot=t(0,7.9,-22,0,-25,9354495,450,.75,!1),this.westLight=new fi(6216946,34,18,1.8),this.westLight.position.set(-20,3.2,-2),this.scene.add(this.westLight),this.warningLight=new fi(16723774,18,14,2),this.warningLight.position.set(0,1.2,6.6),this.scene.add(this.warningLight);const e=Hc();this.glowMaterial=new Ai({map:e,color:8382975,transparent:!0,opacity:.35,blending:be,depthWrite:!1,toneMapped:!1});for(const[i,n,s,a,o]of[[0,3.1,-1.4,7.5,6744063],[0,7.2,17,4.5,10086642],[-14,7.2,2,3.2,10086642],[14,7.2,-4,3.2,10086642],[0,7.2,-24,4,9354495],[26.2,4.6,-7.6,1.6,16733798]]){const l=this.glowMaterial.clone();l.color.setHex(o);const c=new zi(l);c.position.set(i,n,s),c.scale.set(a,a,1),this.root.add(c)}}_buildAtmosphere(){this.scene.fog=new po(329996,.0165),this.scene.background=new It(263946);const t=this.quality==="low"?260:680,e=new Float32Array(t*3),i=new Float32Array(t*2);for(let l=0;l<t;l+=1)e[l*3]=dt(-27,27),e[l*3+1]=dt(.4,8),e[l*3+2]=dt(-31,27),i[l*2]=dt(0,Math.PI*2),i[l*2+1]=dt(.2,.8);const n=new ye;n.setAttribute("position",new Me(e,3));const s=new Sc({color:11263977,size:.035,transparent:!0,opacity:.3,depthWrite:!1,blending:be,sizeAttenuation:!0}),a=new wc(n,s);a.frustumCulled=!1,this.root.add(a),this._dust=a,this._dustData={positions:e,seeds:i,count:t};const o=new O(new Ve(58,40),new ue({color:3363163,transparent:!0,opacity:.025,depthWrite:!1,blending:be}));o.rotation.x=-Math.PI/2,o.position.set(0,.35,-10),this.root.add(o)}_buildMedkits(){const t=[new x(-24.8,.18,18.2),new x(25.2,.18,-4.2),new x(-18.8,.18,-26.8)];for(const e of t){const i=new Jt;i.position.copy(e),this.root.add(i);const n=new O(new wi(.62,.3,.46,2,.045),this.materials.darkPanel);n.castShadow=!0,i.add(n);const s=new O(new lt(.36,.015,.13),this.materials.cyan);s.position.y=.158,i.add(s);const a=new O(new lt(.13,.015,.36),this.materials.cyan);a.position.y=.158,i.add(a);const o=new O(new Oi(.5,.012,6,32),this.materials.cyanSoft);o.rotation.x=Math.PI/2,o.position.y=-.16,i.add(o);const l=new O(new me(.12,.5,1.6,16,1,!0),new ue({color:6613759,transparent:!0,opacity:.06,side:Ce,depthWrite:!1,blending:be}));l.position.y=.8,i.add(l),this.medkits.push({group:i,baseY:e.y,active:!0,position:e.clone(),phase:Math.random()*Math.PI*2})}}_defineSpawns(){this.enemySpawns=[{id:"S-01",pos:new x(-16.2,0,13.8),route:[new x(-17.5,0,14),new x(-10.3,0,14.4),new x(-11.2,0,22)]},{id:"S-02",pos:new x(15.8,0,14.8),route:[new x(18.4,0,13.2),new x(12.2,0,12.4),new x(9,0,21)]},{id:"S-03",pos:new x(-18.2,0,1.6),route:[new x(-16.4,0,-7.4),new x(-14.2,0,-5.2),new x(-16.8,0,2.4)]},{id:"S-04",pos:new x(17.2,0,4.8),route:[new x(20,0,-2.6),new x(14.2,0,-3.8),new x(17.5,0,5.2)]},{id:"S-05",pos:new x(0,0,-8.4),route:[new x(-7.4,0,-7.8),new x(7.4,0,-7.8),new x(0,0,-9.6)]},{id:"S-06",pos:new x(26.2,0,5.4),route:[new x(26.2,0,-7.2),new x(26.2,0,.8),new x(26.2,0,6)]},{id:"S-07",pos:new x(-13.2,0,-20.8),route:[new x(-17.6,0,-20.2),new x(-19.2,0,-26.2),new x(-10.8,0,-25.5)]},{id:"S-08",pos:new x(14.8,0,-22.2),route:[new x(18.2,0,-25.4),new x(7.8,0,-25.4),new x(7.2,0,-20.8)]}]}addCrate(t,e,i,n,s,a=0,o=0){const l=this.materials,c=new Jt;c.position.set(t,o,e),c.rotation.y=a,this.root.add(c);const h=new O(new wi(i,n,s,2,.035),l.darkPanel);h.position.y=n/2,h.castShadow=!0,h.receiveShadow=!0,c.add(h);const u=l.steel;for(const b of[-1,1]){const T=new O(new lt(i*.98,.055,s*.12),u);T.position.set(0,n*.5+b*n*.3,0),T.castShadow=!0,c.add(T)}const d=new O(new lt(i*.08,n*.95,s*.025),u);d.position.set(i*.32,n/2,s/2+.005),c.add(d);const f=new O(new lt(i*.3,n*.16,.01),l.amber);f.position.set(-i*.16,n*.66,s/2+.006),f.material=l.amber,c.add(f);const m=Math.abs(Math.cos(a)),_=Math.abs(Math.sin(a)),g=i*m+s*_,p=i*_+s*m;return this.colliders.push({box:new Ie(new x(t-g/2,o,e-p/2),new x(t+g/2,o+n,e+p/2)),mesh:h,name:"crate"}),this.collisionMeshes.push(h),c}addBarrier(t,e,i,n=0){const s=this.materials,a=new Jt;a.position.set(t,0,e),a.rotation.y=n,this.root.add(a);const o=new O(new wi(i,.72,.22,2,.03),s.steel);o.position.y=.72,o.castShadow=!0,o.receiveShadow=!0,a.add(o);const l=new O(new lt(i*.86,.08,.235),s.hazardStripe);l.position.y=.58,a.add(l);for(const f of[-1,1]){const m=new O(new lt(.28,.36,.6),s.blackMetal);m.position.set(f*(i/2-.25),.18,0),m.castShadow=!0,a.add(m);const _=new O(new lt(.08,.035,.08),s.cyanSoft);_.position.set(f*(i/2-.25),.4,.29),a.add(_)}const c=Math.abs(Math.cos(n)),h=Math.abs(Math.sin(n)),u=i*c+.3*h,d=i*h+.3*c;return this.colliders.push({box:new Ie(new x(t-u/2,0,e-d/2),new x(t+u/2,1.12,e+d/2)),mesh:o,name:"barrier"}),this.collisionMeshes.push(o),a}addPillar(t,e,i,n){const s=this.materials,a=new O(new lt(i*2.9,.35,i*2.9),s.blackMetal);a.position.set(t,.175,e),a.castShadow=!0,this.root.add(a);const o=new O(new me(i,i*1.08,n,12),s.wallDark);o.position.set(t,n/2,e),o.castShadow=!0,o.receiveShadow=!0,this.root.add(o);const l=new O(new Oi(i*1.06,.035,6,12),s.steel);l.rotation.x=Math.PI/2,l.position.set(t,n*.62,e),this.root.add(l);const c=new O(new lt(.055,1.25,.02),s.cyanSoft);c.position.set(t,n*.35,e+i*1.01),this.root.add(c),this.colliders.push({box:new Ie(new x(t-i*1.15,0,e-i*1.15),new x(t+i*1.15,n,e+i*1.15)),mesh:o,name:"pillar"}),this.collisionMeshes.push(o)}_buildContainer(t,e,i,n,s,a,o=0){const l=new Jt;l.position.set(t,0,e),l.rotation.y=o,this.root.add(l);const c=new O(new lt(i,s,n),new qt({color:2765110,roughness:.66,metalness:.52}));c.position.y=s/2,c.castShadow=!0,c.receiveShadow=!0,l.add(c);const h=new lt(i*.02,s*.92,.04);for(let b=0;b<9;b+=1){const T=new O(h,this.materials.wallDark);T.position.set(-i*.405+b/8*i*.81,s/2,n/2+.025),l.add(T)}const u=new O(new lt(i*.86,s*.82,.06),this.materials.blackMetal);u.position.set(0,s/2,n/2+.045),l.add(u);const d=new O(new lt(i*.88,.18,.07),this.materials.hazardStripe);d.position.set(0,s*.2,n/2+.08),l.add(d);const f=new O(new lt(i*.22,.06,.02),this.materials.amber);f.position.set(i*.24,s*.78,n/2+.09),l.add(f);const m=Math.abs(Math.cos(o)),_=Math.abs(Math.sin(o)),g=i*m+n*_,p=i*_+n*m;this.colliders.push({box:new Ie(new x(t-g/2,0,e-p/2),new x(t+g/2,s,e+p/2)),mesh:c,name:"container"}),this.collisionMeshes.push(c)}_addServerRack(t,e,i){const n=new Jt;n.position.set(t,0,e),n.rotation.y=i,this.root.add(n);const s=new O(new wi(1.1,2.2,.85,2,.04),this.materials.blackMetal);s.position.y=1.1,s.castShadow=!0,s.receiveShadow=!0,n.add(s);for(let o=0;o<9;o+=1){const l=new O(new lt(.78,.035,.015),o===6?this.materials.red:this.materials.cyanSoft);l.position.set(0,.36+o*.19,.432),n.add(l)}const a=new O(new lt(.75,.05,.04),this.materials.steel);a.position.set(0,2.15,.44),n.add(a),this.colliders.push({box:new Ie(new x(t-.72,0,e-.72),new x(t+.72,2.2,e+.72)),mesh:s,name:"server rack"}),this.collisionMeshes.push(s)}_addHangingLamp(t,e,i){const n=this.materials,s=new O(new me(.012,.012,1.6,5),n.rubber);s.position.set(t,e+1.1,i),this.root.add(s);const a=new O(new me(.32,.45,.28,12),n.blackMetal);a.position.set(t,e+.25,i),a.castShadow=!0,this.root.add(a);const o=new O(new me(.24,.24,.03,16),n.white);o.position.set(t,e+.1,i),this.root.add(o);const l=new O(new me(.24,3.6,7.2,20,1,!0),new ue({color:10477033,transparent:!0,opacity:.012,side:Ce,depthWrite:!1,blending:be}));l.position.set(t,e-3.5,i),this.root.add(l)}_addPipeRun(t,e,i,n,s,a){const o=new Jt;o.position.set(t,e,i),o.rotation.y=a,this.root.add(o);const l=new O(new me(s,s,n,10),this.materials.steel);l.rotation.z=Math.PI/2,l.castShadow=!0,o.add(l);const c=new Oi(s*1.35,s*.24,6,12);for(let h=-1;h<=1;h+=1){const u=new O(c,this.materials.blackMetal);u.rotation.y=Math.PI/2,u.position.x=h*n*.38,o.add(u)}return o}_addGuardRail(t,e,i,n,s){const a=this.materials,o=new Jt;o.position.set(t,0,e),o.rotation.y=s,this.root.add(o);const l=Math.max(i,n),c=new O(new me(.035,.035,l,6),a.steel);c.rotation.z=Math.PI/2,c.position.y=.9,o.add(c);const h=c.clone();h.position.y=.52,o.add(h);for(let u=-2;u<=2;u+=1){const d=new O(new lt(.06,.95,.06),a.steel);d.position.set(u/2*(l/2),.475,0),o.add(d)}}_addWallVent(t,e,i,n){const s=new Jt;s.position.set(t,e,i),s.rotation.y=n,this.root.add(s);const a=new O(new lt(2.6,1.6,.08),this.materials.blackMetal);s.add(a);for(let l=0;l<6;l+=1){const c=new O(new lt(2.25,.035,.02),this.materials.steel);c.position.set(0,-.55+l*.22,.05),s.add(c)}const o=new O(new lt(.06,.06,.02),this.materials.cyanSoft);o.position.set(1.15,.65,.05),s.add(o)}_addCatwalk(){const t=this.materials;for(const e of[-1,1]){const i=e*19.8,n=new O(new lt(3.2,.16,18),t.grate);n.position.set(i,5.2,-1.4),n.castShadow=!0,n.receiveShadow=!0,this.root.add(n);for(let a=0;a<3;a+=1){const o=new O(new lt(.18,5.2,.18),t.steel);o.position.set(i+e*1.2,2.6,-9+a*7.2),o.castShadow=!0,this.root.add(o)}for(let a=0;a<8;a+=1){const o=new O(new lt(.045,.95,.045),t.steel);o.position.set(i-e*1.5,5.75,-9.4+a*2.2),this.root.add(o)}const s=new O(new me(.035,.035,17.6,6),t.steel);s.rotation.x=Math.PI/2,s.position.set(i-e*1.5,6.2,-1.4),this.root.add(s),this.addEmissiveStrip(i-e*1.57,5.3,-1.4,.02,.02,17.6,t.cyanSoft)}}_addCableCurve(t){const e=new Ac(t.map(([s,a,o])=>new x(s,a,o))),i=new vo(e,24,.028,5,!1),n=new O(i,this.materials.rubber);this.root.add(n)}setShadows(t){this.directional.castShadow=t,this.mainSpot&&(this.mainSpot.castShadow=!1),this.renderer.shadowMap.enabled=t}update(t,e){if(this.time+=t,this._reactorCage){this._reactorCage.rotation.y+=t*.055;for(let i=0;i<this._reactorRings.length;i+=1){const n=this._reactorRings[i];n.rotation.z+=t*(.08+i*.012)*(i%2===0?1:-1),n.position.y=.95+i*.72+Math.sin(e*.6+i)*.03}this._reactorCore&&(this._reactorCore.material.opacity=.32+Math.sin(e*1.7)*.07),this.reactorLight.intensity=64+Math.sin(e*1.9)*8}if(this.emergencyLight){const i=(Math.sin(e*2.2)+1)*.5;this.emergencyLight.intensity=16+i*22}this.warningLight&&(this.warningLight.intensity=16+(Math.sin(e*3.4)+1)*6),this._holoGroup&&(this._holoGroup.rotation.y+=t*.22);for(const i of this.medkits)i.active&&(i.group.rotation.y+=t*.7,i.group.position.y=i.baseY+Math.sin(e*1.8+i.phase)*.045);if(this._dust){const{positions:i,seeds:n,count:s}=this._dustData;for(let a=0;a<s;a+=1){const o=a*3;i[o]+=Math.sin(e*.22+n[a*2])*t*.03,i[o+1]+=Math.sin(e*.17+n[a*2+1])*t*.025,i[o+2]+=Math.cos(e*.19+n[a*2])*t*.025,i[o+1]>8.3&&(i[o+1]=.4),i[o+1]<.3&&(i[o+1]=8.2)}this._dust.geometry.attributes.position.needsUpdate=!0}}tryPickupMedkit(t){for(const e of this.medkits){if(!e.active)continue;const i=e.position.x-t.x,n=e.position.z-t.z;if(i*i+n*n<1.65)return e}return null}consumeMedkit(t){t.active=!1,t.group.visible=!1}resetPickups(){for(const t of this.medkits)t.active=!0,t.group.visible=!0,t.group.position.y=t.baseY}isLineBlocked(t,e,i=new xs){const n=this._tempV.copy(e).sub(t),s=n.length();return s<.001?!1:(n.normalize(),i.set(t,n),i.far=s-.05,i.intersectObjects(this.collisionMeshes,!1).length>0)}raycast(t){return t.intersectObjects(this.collisionMeshes,!1)}dispose(){this.scene.remove(this.root),this.root.traverse(t=>{if(t.geometry&&t.geometry.dispose(),t.material){const e=Array.isArray(t.material)?t.material:[t.material];for(const i of e)i.map&&!i.map.userData?.shared&&i.dispose(),i.dispose()}})}}function ag(r){const t=Math.min(8,r.capabilities.getMaxAnisotropy()),e=K0(t),i=$0(t),n=J0(t),s=Z0(t),a=new qt({map:e.map,bumpMap:e.bumpMap,bumpScale:.055,color:7567998,roughness:.82,metalness:.14}),o=new qt({map:e.map,bumpMap:e.bumpMap,bumpScale:.04,color:5264986,roughness:.88,metalness:.1}),l=new qt({map:i.map,bumpMap:i.bumpMap,bumpScale:.035,color:7963017,roughness:.58,metalness:.68}),c=new qt({map:i.map,bumpMap:i.bumpMap,bumpScale:.03,color:5068122,roughness:.68,metalness:.55}),h=new qt({color:3028282,roughness:.42,metalness:.82}),u=new qt({color:1317149,roughness:.48,metalness:.75}),d=new qt({color:1909801,roughness:.72,metalness:.32}),f=new qt({color:724497,roughness:.92,metalness:.06}),m=new qt({map:n,color:6976633,roughness:.74,metalness:.58,bumpMap:n,bumpScale:.02}),_=new qt({map:s,color:11903083,roughness:.7,metalness:.25}),g=new qt({color:397332,emissive:5892607,emissiveIntensity:3.4,roughness:.25,metalness:.2,toneMapped:!1}),p=new qt({color:463898,emissive:2788518,emissiveIntensity:1.4,roughness:.4,metalness:.1}),b=new qt({color:462874,emissive:6069503,emissiveIntensity:2.4,roughness:.3,metalness:.2,toneMapped:!1}),T=new qt({color:1180934,emissive:16724805,emissiveIntensity:3,roughness:.32,metalness:.16,toneMapped:!1}),y=new qt({color:1051396,emissive:16753981,emissiveIntensity:2.4,roughness:.3,metalness:.16,toneMapped:!1}),A=new qt({color:1119770,emissive:14678527,emissiveIntensity:2.3,roughness:.2,metalness:.1,toneMapped:!1}),R=new ue({color:7727871,transparent:!0,opacity:.1,side:Ce,depthWrite:!1,blending:be}),P=new ue({color:6351103,transparent:!0,opacity:.4,side:Ce,depthWrite:!1,blending:be}),I=[aa("SITE-09","CORE LINK","#6be7ff",t),aa("REACTOR","OUTPUT 87.2%","#77a9ff",t),aa("SECURITY","HOSTILES ACTIVE","#ff7b83",t)].map(S=>new qt({map:S,emissiveMap:S,emissive:16777215,emissiveIntensity:1.15,roughness:.35,metalness:.1,toneMapped:!1})),w={core:new ue({map:Qs(["CORE ACCESS","AUTHORIZED PERSONNEL","SECTOR 09 / SUBLEVEL 04"],{accent:"#6be7ff"},t),transparent:!0,toneMapped:!1}),security:new ue({map:Qs(["SECURITY CHECKPOINT","BIOMETRIC OVERRIDE REQUIRED","THREAT LEVEL / CRITICAL"],{accent:"#ff5d67"},t),transparent:!0,toneMapped:!1}),command:new ue({map:Qs(["COMMAND DECK","AUTONOMOUS DEFENSE GRID","UPLINK / OFFLINE"],{accent:"#87b8ff"},t),transparent:!0,toneMapped:!1}),service:new ue({map:Qs(["SERVICE CORRIDOR","COOLANT / HIGH PRESSURE","KEEP CLEAR"],{accent:"#ffb15c"},t),transparent:!0,toneMapped:!1})};return{floor:a,floorDark:o,wall:l,wallDark:c,steel:h,blackMetal:u,darkPanel:d,rubber:f,grate:m,hazardStripe:_,cyan:g,cyanSoft:p,blue:b,red:T,amber:y,white:A,glass:R,holo:P,screens:I,signs:w,textures:{concrete:e,metal:i,grating:n,hazard:s},anisotropy:t}}const oa={high:1.4,medium:1.15,low:.9};class og{constructor(t){this.canvas=t,this.settings=new D0,this.audio=new P0,this.audio.setVolume(this.settings.get("volume")),this.input=new L0(t),this.state="menu",this.started=!1,this._starting=!1,this._firstFrame=!0,this._last=performance.now(),this._hudAccumulator=0,this._crosshairAccumulator=0,this.gameTime=0,this.menuTime=0,this.kills=0,this.damageTaken=0,this.currentStreak=0,this.bestStreak=0,this.victoryPending=0,this.pickupTarget=null,this.enemyTarget=!1,this._lastHeartbeat=-10,this._lastVitalsKey="",this._center=new ct(0,0),this._targetRaycaster=new xs,this._worldVector=new x,this._cloudTmp=new x,this._setupRenderer(),this._setupScene(),this._setupSystems(),this._bindEvents(),this._setupDebugApi(),this.resetMission(),this.ui.showMenu(),this._setMenuCamera(0),this._applyQuality(),this._loop=this._loop.bind(this),this._raf=requestAnimationFrame(this._loop)}_setupRenderer(){this.renderer=new v0({canvas:this.canvas,antialias:!0,powerPreference:"high-performance",stencil:!1,alpha:!1}),this.renderer.outputColorSpace=we,this.renderer.toneMapping=io,this.renderer.toneMappingExposure=.96,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Zl,this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,oa[this.settings.get("quality")]||1.4)),this.renderer.setSize(window.innerWidth,window.innerHeight,!1)}_setupScene(){this.scene=new mo,this.camera=new Be(this.settings.get("fov"),window.innerWidth/Math.max(1,window.innerHeight),.04,150),this.camera.rotation.order="YXZ",this.scene.add(this.camera);const t=new Ja(this.renderer),e=new x0;this._envRenderTarget=t.fromScene(e,.04),this.scene.environment=this._envRenderTarget.texture,this.scene.environmentIntensity=.2,e.dispose&&e.dispose(),t.dispose(),this.materials=ag(this.renderer),this.world=new rg(this.scene,this.renderer,this.materials,this.settings.get("quality")),this.effects=new N0(this.scene,this.camera,this.settings.get("quality"))}_setupSystems(){this.ui=new sg({settings:this.settings,audio:this.audio,callbacks:{onStart:()=>this.startMission(),onResume:()=>this.resumeMission(),onRestart:()=>this.restartMission(),onAbort:()=>this.abortToMenu(),onSettingsChange:(t,e)=>this._handleSettingChange(t,e)}}),this.player=new W0({camera:this.camera,world:this.world,input:this.input,audio:this.audio,settings:this.settings,callbacks:{onDamage:t=>this._handlePlayerDamage(t),onDeath:()=>this._handlePlayerDeath(),onHeal:t=>{t>0&&this.ui.showToast(`BIOCELL ABSORBED // +${Math.round(t)} INTEGRITY`,2100)}}}),this.weapons=new Y0({camera:this.camera,player:this.player,world:this.world,input:this.input,audio:this.audio,effects:this.effects,callbacks:{onAmmoChange:t=>this.ui.updateAmmo(t),onWeaponChange:t=>this.ui.updateWeapon(t),onShot:()=>{},onHit:t=>this.ui.showHitmarker(t),onKill:()=>this.ui.showHitmarker({killed:!0}),onReloadStart:()=>this.ui.showToast("MAGAZINE RELEASE // RELOADING",1300),onReloadProgress:t=>this.ui.setReloadState(this.weapons.reloading,t),onReloadEnd:()=>this.ui.setReloadState(!1),onEmpty:()=>this.ui.showToast("MAGAZINE EMPTY // PRESS R TO RELOAD",1600),onWeaponSwitch:t=>this.ui.showToast(`${t.name} // ${t.mode}`,1200)}}),this.enemies=new ng({scene:this.scene,world:this.world,effects:this.effects,audio:this.audio,quality:this.settings.get("quality"),callbacks:{onKill:(t,e)=>this._handleEnemyKilled(t,e),onMissionComplete:()=>this._handleAllEnemiesDown()}}),this.weapons.setEnemyManager(this.enemies),this.weapons.weaponModel.scene.environment=this.scene.environment,this.weapons.weaponModel.scene.environmentIntensity=.62}_bindEvents(){this._onResize=()=>this._resize(),window.addEventListener("resize",this._onResize),window.addEventListener("orientationchange",this._onResize),document.addEventListener("visibilitychange",()=>{document.hidden&&this.state==="playing"&&this.pauseMission()}),window.addEventListener("blur",()=>{this.state==="playing"&&this.pauseMission()}),this.input.onLockChange=t=>{!t&&this.state==="playing"&&(this._escapeIgnoreUntil=performance.now()+320,this.pauseMission())},this.input.onLockError=()=>{(this.state==="playing"||this.state==="paused")&&this.ui.showToast("MOUSE CAPTURE BLOCKED // CLICK THE VIEWPORT TO RETRY",2600)},this.canvas.addEventListener("click",()=>{(this.state==="playing"||this.state==="paused")&&!this.input.locked&&this.input.requestLock()}),window.addEventListener("keydown",t=>{if(!t.defaultPrevented){if((t.code==="Escape"||t.key==="Escape")&&this.state==="playing"){this._escapeIgnoreUntil=performance.now()+320,this.pauseMission();return}if((t.code==="Enter"||t.code==="NumpadEnter")&&this.state==="paused"&&!this.ui.modal){t.preventDefault(),this.resumeMission();return}t.code==="KeyR"&&(this.state==="victory"||this.state==="defeat")&&!this.ui.modal&&(t.preventDefault(),this.restartMission()),t.code==="Enter"&&this.state==="menu"&&!this.ui.modal&&this.startMission()}}),this.canvas.addEventListener("webglcontextlost",t=>{t.preventDefault(),this.state==="playing"&&this.pauseMission(),this.ui.showToast("RENDER CONTEXT LOST // REFRESH TO RECOVER",6e3)}),this._onResize()}startMission(){this._starting||this.state==="playing"||this.state==="paused"||(this._starting=!0,this.started=!0,this.input.requestLock().then(t=>{t||this.ui.showToast("CLICK THE VIEWPORT TO CAPTURE THE MOUSE",2600)}),this.audio.unlock().then(()=>{this.audio.setVolume(this.settings.get("volume"))}),this.resetMission(),this.state="playing",this.ui.enterGame(),this.ui.showToast("BLACKOUT PROTOCOL ENGAGED // SITE-09",2300),this.audio.setPaused(!1),this.camera.fov=this.settings.get("fov"),this.camera.updateProjectionMatrix(),this._starting=!1)}async resumeMission(){if(this.state!=="paused")return;if(this.ui.closeModal(!0),!await this.input.requestLock()){this.ui.showToast("MOUSE CAPTURE BLOCKED // CLICK THE VIEWPORT",2600);return}this.state="playing",this.ui.hidePause(),this.audio.setPaused(!1),this._last=performance.now()}pauseMission(){this.state==="playing"&&(this.state="paused",this.audio.setPaused(!0),this.input.releaseAll(),this.ui.showPause({elapsed:this.gameTime,remaining:this.enemies.remaining,kills:this.kills}),document.pointerLockElement&&document.exitPointerLock())}restartMission(){this._starting||(this._starting=!0,this.input.requestLock().catch(()=>{}),this.resetMission(),this.state="playing",this.ui.enterGame(),this.ui.hidePause(),this.ui.closeModal(!0),this.audio.setPaused(!1),this.audio.unlock(),this.ui.showToast("REDEPLOYING // OPERATION RESET",1800),this._last=performance.now(),this._starting=!1)}abortToMenu(){this.audio.setPaused(!1),this.input.releaseAll(),document.pointerLockElement&&document.exitPointerLock(),this.resetMission(),this.state="menu",this.ui.showMenu(),this.audio.setPaused(!1),this._setMenuCamera(this.menuTime),this.camera.fov=58,this.camera.updateProjectionMatrix()}resetMission(){this.gameTime=0,this.kills=0,this.damageTaken=0,this.currentStreak=0,this.bestStreak=0,this.victoryPending=0,this.pickupTarget=null,this.enemyTarget=!1,this._lastHeartbeat=-10,this.player.reset(),this.weapons.reset(),this.enemies.reset(),this.effects.reset(),this.world.resetPickups(),this.ui.clearTransient(),this.ui.updateHealth(this.player.health,this.player.shield),this.ui.updateObjective(0,this.enemies.totalEnemies),this.ui.updateTimer(0),this.ui.updateWeapon(this.weapons.weapon),this.ui.updateAmmo({current:this.weapons.currentAmmo,reserve:this.weapons.currentReserve,max:this.weapons.weapon.ammo,reloading:!1}),this.ui.setPickupPrompt(!1),this.camera.fov=this.settings.get("fov"),this.camera.updateProjectionMatrix()}_handleSettingChange(t,e){t==="volume"?this.audio.setVolume(e):t==="quality"?this._applyQuality():t==="fov"&&(this.state==="menu"||this.state==="paused")?(this.camera.fov=e,this.camera.updateProjectionMatrix()):t==="reset"&&(this._applyQuality(),this.audio.setVolume(this.settings.get("volume")),this.camera.fov=this.settings.get("fov"),this.camera.updateProjectionMatrix())}_setupDebugApi(){}_applyQuality(){const t=this.settings.get("quality");this.quality=t;const e=Math.min(window.devicePixelRatio||1,oa[t]||1.4);this.renderer.setPixelRatio(e),this.world.setShadows(t!=="low"),this.renderer.shadowMap.enabled=t!=="low",this.effects.quality=t,this._setupComposer(),this._resize()}_setupComposer(){if(this.composer&&(this.composer.dispose(),this.composer=null,this.bloomPass=null),this.quality==="low")return;this.composer=new T0(this.renderer),this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(window.innerWidth,window.innerHeight);const t=new E0(this.scene,this.camera);this.bloomPass=new Gn(new ct(window.innerWidth*.55,window.innerHeight*.55),this.quality==="high"?.3:.18,.7,.86),this.composer.addPass(t),this.composer.addPass(this.bloomPass),this.composer.addPass(new R0)}_resize(){const t=window.innerWidth,e=window.innerHeight,i=t/Math.max(1,e),n=Math.min(window.devicePixelRatio||1,oa[this.quality]||1.4);Math.abs(this.renderer.getPixelRatio()-n)>.001&&this.renderer.setPixelRatio(n),this.camera.aspect=i,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e,!1),this.composer&&(this.composer.setPixelRatio(this.renderer.getPixelRatio()),this.composer.setSize(t,e),this.bloomPass?.setSize(t*.55,e*.55)),this.weapons?.resize(i)}_setMenuCamera(t){const e=Math.sin(t*.045)*1.6,i=Math.sin(t*.16)*.12;this.camera.position.set(e,3.35+i,20.25),this.camera.lookAt(e*.12,2.15+Math.sin(t*.11)*.06,-1.65),this.camera.rotation.z=Math.sin(t*.07)*.005}_updateMenu(t){this.menuTime+=t,this.world.update(t,this.menuTime),this._setMenuCamera(this.menuTime),this.camera.fov=58,this.camera.updateProjectionMatrix(),this.enemyTarget=!1}_handlePlayerDamage(t){this.damageTaken+=t.amount,this.currentStreak=0,this.ui.updateHealth(t.health,t.shield),this.ui.flashDamage(),this.ui.showDirectionalDamage(t.sourcePosition,this.player.position,this.player.yaw),this.ui.setPickupPrompt(!1),this.player.health<=30&&this.ui.showLowHealthWarning(!0)}_handlePlayerDeath(){this.state==="playing"&&(this.state="defeat",this.victoryPending=0,this.audio.setPaused(!0),this.audio.defeat(),this.input.releaseAll(),document.pointerLockElement&&document.exitPointerLock(),this._finishMission(!1))}_handleEnemyKilled(t,e){this.state==="playing"&&(this.kills+=1,this.currentStreak+=1,this.bestStreak=Math.max(this.bestStreak,this.currentStreak),this.ui.updateObjective(this.kills,this.enemies.totalEnemies),this.ui.addKillFeed(`SENTINEL-${t.spawn.id.split("-")[1]||t.spawn.id}`),this.audio.kill(),this.ui.flashHit(),this.ui.showToast(e.headshot?"CRITICAL NEUTRALIZATION // HEADSHOT":"HOSTILE SIGNAL NEUTRALIZED",1200))}_handleAllEnemiesDown(){this.state!=="playing"||this.victoryPending>0||(this.victoryPending=1.35,this.ui.showToast("ALL HOSTILE SIGNALS OFFLINE // EXFIL READY",2200),this.audio.pickup())}_finishMission(t){const e={victory:t,stats:{elapsed:this.gameTime,kills:this.kills,total:this.enemies.totalEnemies,accuracy:this.weapons.getStats().accuracy,headshots:this.weapons.getStats().headshots,damageTaken:this.damageTaken,bestStreak:this.bestStreak}};this.ui.showEnd(e),t&&this.audio.victory(),this.gameTime=Number(this.gameTime.toFixed(2))}_handleVictory(){this.state==="playing"&&(this.state="victory",this.victoryPending=0,this.audio.setPaused(!0),this.input.releaseAll(),document.pointerLockElement&&document.exitPointerLock(),this._finishMission(!0))}_checkPickup(){const t=this.world.tryPickupMedkit(this.player.position);t&&this.player.health<this.player.maxHealth?(this.pickupTarget!==t&&(this.pickupTarget=t,this.ui.setPickupPrompt(!0),this.ui.showToast("BIOCELL IN RANGE // PRESS F TO COLLECT",1300)),this.input.wasPressed("KeyF")&&(this.world.consumeMedkit(t),this.player.heal(42),this.audio.pickup(),this.ui.updateHealth(this.player.health,this.player.shield),this.ui.setPickupPrompt(!1),this.pickupTarget=null)):this.pickupTarget&&(this.pickupTarget=null,this.ui.setPickupPrompt(!1))}_updateTargeting(){this.camera.updateMatrixWorld(),this._targetRaycaster.setFromCamera(this._center,this.camera),this._targetRaycaster.far=80;const t=this._targetRaycaster.intersectObjects(this.enemies.getHitMeshes(),!1),e=this._targetRaycaster.intersectObjects(this.world.collisionMeshes,!1),i=t[0]?.distance??1/0,n=e[0]?.distance??1/0;this.enemyTarget=i<n&&i<70}_updatePlaying(t){if(this.gameTime+=t,this.player.update(t),this.player.dead)return;this.weapons.update(t,!0),this.enemies.update(t,this.player),this.effects.update(t),this.world.update(t,this.gameTime);const e=this.weapons.getFov(this.settings.get("fov"),this.player.sprinting);this.camera.fov=Ht(this.camera.fov,e,16,t),this.camera.updateProjectionMatrix(),this._checkPickup(),this.player.health<=30?(this.ui.showLowHealthWarning(!0),this.gameTime-this._lastHeartbeat>1.45&&(this._lastHeartbeat=this.gameTime,this.audio.heartbeat())):this.ui.showLowHealthWarning(!1),this.victoryPending>0&&(this.victoryPending-=t,this.victoryPending<=0&&this._handleVictory()),this._hudAccumulator+=t,this._hudAccumulator>=.08&&(this._hudAccumulator,this._hudAccumulator=0,this.ui.updateTimer(this.gameTime),this.ui.updateCompass(this.player.yaw),this.ui.updateHealth(this.player.health,this.player.shield),this._updateTargeting(),this.ui.updateCrosshair({spread:this.weapons.getSpreadNormalized(),aiming:this.weapons.adsProgress>.55,enemyTarget:this.enemyTarget})),this._crosshairAccumulator+=t,this._crosshairAccumulator>=.034&&(this._crosshairAccumulator=0,this.ui.updateCrosshair({spread:this.weapons.getSpreadNormalized(),aiming:this.weapons.adsProgress>.55,enemyTarget:this.enemyTarget}))}_updateEndState(t){this.state==="defeat"&&this.player.update(t),this.effects.update(t),this.world.update(t,this.gameTime)}_renderWeapon(){(this.state==="playing"||this.state==="paused")&&(this.renderer.autoClear=!1,this.renderer.clearDepth(),this.renderer.setRenderTarget(null),this.renderer.render(this.weapons.weaponModel.scene,this.weapons.weaponModel.camera),this.renderer.autoClear=!0)}_loop(t){this._raf=requestAnimationFrame(this._loop);const e=Math.min(.05,Math.max(0,(t-this._last)/1e3));this._last=t,this.state==="playing"?this._updatePlaying(e):this.state==="menu"?this._updateMenu(e):(this.state==="victory"||this.state==="defeat")&&this._updateEndState(e),this.composer?this.composer.render():(this.renderer.setRenderTarget(null),this.renderer.render(this.scene,this.camera)),this._renderWeapon(),this.input.endFrame(),this._firstFrame&&(this._firstFrame=!1,setTimeout(()=>this.ui.showBootDone(),260))}dispose(){cancelAnimationFrame(this._raf),window.removeEventListener("resize",this._onResize),window.removeEventListener("orientationchange",this._onResize),this.input.dispose(),this.weapons.dispose(),this.enemies.dispose(),this.world.dispose(),this.composer?.dispose(),this.renderer.dispose(),this._envRenderTarget&&this._envRenderTarget.dispose(),delete window.__PHANTOM__}get elapsedLabel(){return nn(this.gameTime)}}const Gc=document.getElementById("scene"),er=document.getElementById("boot-status");function lg(){try{const r=document.createElement("canvas");return!!(window.WebGL2RenderingContext&&r.getContext("webgl2"))}catch{return!1}}function cg(){const r=window.matchMedia("(pointer: coarse)").matches,t=!window.matchMedia("(pointer: fine)").matches,e=navigator.maxTouchPoints>0&&window.innerWidth<820;return r&&t||e}function Yl(r){const t=document.getElementById("webgl-error"),e=document.getElementById("boot");if(e&&(e.hidden=!0),t){const i=t.querySelector("p");i&&r&&(i.textContent=r),t.hidden=!1}}function hg(){const r=document.getElementById("mobile-notice"),t=document.getElementById("menu"),e=document.getElementById("hud"),i=document.getElementById("boot");r&&(r.hidden=!1),t&&(t.hidden=!0),e&&e.classList.add("is-hidden"),i&&(i.hidden=!0),Gc.style.display="none"}function Kl(){if(cg()){hg();return}if(!lg()){Yl("WebGL 2 is not available on this device. Enable hardware acceleration or use a recent desktop browser.");return}er&&(er.textContent="BUILDING SITE-09");try{const r=new og(Gc);window.__PHANTOM_GAME__=r,er&&(er.textContent="NEURAL LINK ESTABLISHED"),console.info("%cPROJECT: PHANTOM%c  //  SITE-09 tactical simulation online","color:#6be7ff;font-weight:700;letter-spacing:.12em","color:#778894")}catch(r){console.error(r),Yl("The renderer failed to initialize. This is commonly caused by disabled hardware acceleration or a lost WebGL context.")}}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Kl,{once:!0}):Kl();
