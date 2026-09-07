(function(){
'use strict';
var KEY='sagarai_demo_users_v4';
function getUsers(){try{return JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){return[]}}
function setUsers(a){try{localStorage.setItem(KEY,JSON.stringify(a));return true}catch(e){return false}}
function message(form,text,ok){var m=form.querySelector('[data-auth-message]');if(!m){m=document.createElement('div');m.setAttribute('data-auth-message','1');m.style.cssText='margin-top:12px;font-size:13px;text-align:center;min-height:18px';form.appendChild(m)}m.textContent=text;m.style.color=ok?'#22c55e':'#ef4444'}
function init(){
 var form=document.querySelector('form'); if(!form)return;
 var buttons=Array.from(document.querySelectorAll('button'));
 var sign=buttons.find(function(b){return b.textContent.trim()==='Sign In'});
 var create=buttons.find(function(b){return b.textContent.trim()==='Create Account'});
 var submit=form.querySelector('button[type="submit"]');
 var email=form.querySelector('input[name="email"]');
 var password=form.querySelector('input[name="password"]');
 if(!submit||!email||!password)return;
 var mode='signin', nameInput=null;
 function setMode(m){
  mode=m; message(form,'',true);
  if(m==='signup'){
   if(create)create.classList.add('btn-primary');
   if(sign)sign.classList.remove('btn-primary');
   if(!nameInput){
    var wrap=document.createElement('div');
    wrap.setAttribute('data-demo-name','1');
    wrap.innerHTML='<label class="block text-sm font-medium text-foreground mb-1.5">Full Name</label><input type="text" name="fullName" placeholder="Your name" class="w-full px-4 py-3 rounded-lg text-sm text-foreground" style="background:var(--card);border:1px solid var(--border)">';
    form.insertBefore(wrap,form.firstElementChild); nameInput=wrap.querySelector('input');
   }
   submit.type='button'; submit.disabled=false; submit.textContent='Create SAGAR AI Account  →';
   email.placeholder='you@example.com'; password.placeholder='At least 6 characters';
  }else{
   if(sign)sign.classList.add('btn-primary');
   if(create)create.classList.remove('btn-primary');
   var old=form.querySelector('[data-demo-name]'); if(old)old.remove(); nameInput=null;
   submit.type='button'; submit.disabled=false; submit.textContent='Sign In to SAGAR AI  →';
   email.placeholder='fleet.mgr@sagarai.in'; password.placeholder='••••••••';
  }
 }
 function submitNow(){
  var em=(email.value||'').trim().toLowerCase(), pw=password.value||'';
  if(mode==='signup'){
   var n=nameInput?(nameInput.value||'').trim():'';
   if(!n){message(form,'Please enter your full name.',false);return}
   if(!em){message(form,'Please enter your email address.',false);return}
   if(!/^\S+@\S+\.\S+$/.test(em)){message(form,'Please enter a valid email address.',false);return}
   if(pw.length<6){message(form,'Password must be at least 6 characters.',false);return}
   var a=getUsers(); if(a.some(function(u){return u.email===em})){message(form,'An account with this email already exists. Please sign in.',false);return}
   a.push({name:n,email:em,password:pw});
   if(!setUsers(a)){message(form,'Browser storage is unavailable.',false);return}
   try{localStorage.setItem('sagarai_demo_session',JSON.stringify({name:n,email:em}))}catch(e){}
   message(form,'Account created successfully. Opening SAGAR AI dashboard…',true);
   setTimeout(function(){window.location.href='../main-dashboard/';},400);
  }else{
   var found=getUsers().find(function(u){return u.email===em&&u.password===pw});
   if(!found){
    // Built-in demo accounts from the original captured page.
    var demo={'admin@sagarai.in':'admin','fleet.mgr@sagarai.in':'fleet','cargo.ops@sagarai.in':'cargo','port.auth@sagarai.in':'port','logistics@sagarai.in':'logistics'};
    if(!(demo[em]&&pw)){message(form,'Invalid email or password. Create an account first.',false);return}
    found={name:em.split('@')[0],email:em,password:pw};
   }
   try{localStorage.setItem('sagarai_demo_session',JSON.stringify({name:found.name,email:found.email}))}catch(e){}
   message(form,'Signed in successfully. Opening SAGAR AI dashboard…',true);
   setTimeout(function(){window.location.href='../main-dashboard/';},300);
  }
 }
 if(sign)sign.addEventListener('click',function(e){e.preventDefault();setMode('signin');});
 if(create)create.addEventListener('click',function(e){e.preventDefault();setMode('signup');});
 submit.addEventListener('click',function(e){e.preventDefault();submitNow();});
 form.addEventListener('submit',function(e){e.preventDefault();submitNow();});
 setMode('signin');
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
