/* SAGAR AI GitHub Pages demo authentication
   Frontend-only demo: accounts are stored in this browser's localStorage.
*/
(function () {
  'use strict';
  function init() {
    var form = document.querySelector('form');
    if (!form) return;
    var tabs = Array.prototype.slice.call(document.querySelectorAll('button')).filter(function (b) {
      var t = (b.textContent || '').trim();
      return t === 'Sign In' || t === 'Create Account';
    });
    var signTab = tabs.find(function(b){return (b.textContent||'').trim()==='Sign In';});
    var createTab = tabs.find(function(b){return (b.textContent||'').trim()==='Create Account';});
    var submit = form.querySelector('button[type="submit"]');
    var email = form.querySelector('input[name="email"]');
    var password = form.querySelector('input[name="password"]');
    if (!submit || !email || !password) return;

    var title = document.querySelector('h1');
    var message = document.createElement('div');
    message.setAttribute('role','status');
    message.style.cssText='margin-top:12px;font-size:13px;text-align:center;min-height:18px;';
    form.appendChild(message);

    var nameInput = null;
    var mode = 'signin';
    var STORAGE='sagarai_demo_users_v1';

    function users(){
      try { return JSON.parse(localStorage.getItem(STORAGE)||'[]'); } catch(e){ return []; }
    }
    function saveUsers(v){ localStorage.setItem(STORAGE, JSON.stringify(v)); }
    function msg(text, ok){ message.textContent=text; message.style.color=ok?'var(--success, #22c55e)':'var(--destructive, #ef4444)'; }
    function styleTab(active, inactive){
      if(active){active.classList.add('btn-primary');active.classList.remove('text-muted-foreground');}
      if(inactive){inactive.classList.remove('btn-primary');inactive.classList.add('text-muted-foreground');}
    }
    function setMode(m){
      mode=m; msg('',true);
      if(m==='signup'){
        styleTab(createTab,signTab);
        if(!nameInput){
          var wrap=document.createElement('div');
          wrap.setAttribute('data-demo-name','1');
          wrap.innerHTML='<label class="block text-sm font-medium text-foreground mb-1.5">Full Name</label><input type="text" name="fullName" placeholder="Your name" autocomplete="name" class="w-full px-4 py-3 rounded-lg text-sm text-foreground placeholder-muted-foreground outline-none transition-colors focus:border-primary" style="background:var(--card);border:1px solid var(--border)"/>';
          form.insertBefore(wrap, form.firstElementChild);
          nameInput=wrap.querySelector('input[name="fullName"]');
        }
        submit.innerHTML='Create SAGAR AI Account <span aria-hidden="true">→</span>';
        email.setAttribute('autocomplete','email'); password.setAttribute('autocomplete','new-password');
        email.placeholder='you@example.com'; password.placeholder='At least 6 characters';
        var remember=form.querySelector('input[type="checkbox"]'); if(remember){var rw=remember.closest('div'); if(rw) rw.style.display='none';}
        var forgot=Array.prototype.slice.call(form.querySelectorAll('button')).find(function(b){return (b.textContent||'').toLowerCase().indexOf('forgot password')>=0;}); if(forgot) forgot.style.display='none';
      } else {
        styleTab(signTab,createTab);
        if(nameInput && nameInput.parentElement) nameInput.parentElement.remove(); nameInput=null;
        submit.innerHTML='Sign In to SAGAR AI <span aria-hidden="true">→</span>';
        email.setAttribute('autocomplete','email'); password.setAttribute('autocomplete','current-password');
        email.placeholder='fleet.mgr@sagarai.in'; password.placeholder='••••••••';
        var remember=form.querySelector('input[type="checkbox"]'); if(remember){var rw=remember.closest('div'); if(rw) rw.style.display='';}
        var forgot=Array.prototype.slice.call(form.querySelectorAll('button')).find(function(b){return (b.textContent||'').toLowerCase().indexOf('forgot password')>=0;}); if(forgot) forgot.style.display='';
      }
    }
    if(signTab) signTab.addEventListener('click',function(){setMode('signin');});
    if(createTab) createTab.addEventListener('click',function(){setMode('signup');});

    form.addEventListener('submit',function(e){
      e.preventDefault();
      var em=(email.value||'').trim().toLowerCase(), pw=password.value||'';
      if(!em || !pw){msg('Please enter your email and password.',false);return;}
      if(mode==='signup'){
        var nm=(nameInput&&nameInput.value||'').trim();
        if(!nm){msg('Please enter your full name.',false);return;}
        if(pw.length<6){msg('Password must be at least 6 characters.',false);return;}
        var list=users();
        if(list.some(function(u){return u.email===em;})){msg('An account with this email already exists. Please sign in.',false);return;}
        list.push({name:nm,email:em,password:pw,createdAt:new Date().toISOString()}); saveUsers(list);
        localStorage.setItem('sagarai_demo_session',JSON.stringify({name:nm,email:em}));
        msg('Account created successfully. Opening SAGAR AI dashboard…',true);
        setTimeout(function(){location.href='../main-dashboard/';},500);
      } else {
        var list=users(), found=list.find(function(u){return u.email===em && u.password===pw;});
        if(!found){msg('Invalid email or password. Create an account first if you are a new user.',false);return;}
        localStorage.setItem('sagarai_demo_session',JSON.stringify({name:found.name,email:found.email}));
        msg('Signed in successfully. Opening SAGAR AI dashboard…',true);
        setTimeout(function(){location.href='../main-dashboard/';},400);
      }
    });

    // Make the existing "Create one" link switch to the create-account tab.
    Array.prototype.slice.call(document.querySelectorAll('button')).forEach(function(b){
      if((b.textContent||'').trim()==='Create one') b.addEventListener('click',function(){setMode('signup');});
    });
    setMode('signin');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
