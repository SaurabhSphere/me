// ===== SITE CONFIG =====
// Update links here — they'll reflect everywhere on the page.
const SITE_CONFIG = {
  linkedin: 'https://www.linkedin.com/in/SaurabhSphere/',
  github:   'https://github.com/SaurabhSphere',
  email:    'Saurabhbadal7262@gmail.com',
  siteUrl:  'https://saurabh-codes.onrender.com/',
};

function applySiteConfig(){
  // Wire up all [data-link] elements
  document.querySelectorAll('[data-link]').forEach(el => {
    const key = el.getAttribute('data-link');
    if(key === 'email'){
      if(el.tagName === 'A'){
        el.href = `mailto:${SITE_CONFIG.email}`;
      } else {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => location.href = `mailto:${SITE_CONFIG.email}`);
      }
    } else if(SITE_CONFIG[key]){
      if(el.tagName === 'A'){
        el.href = SITE_CONFIG[key];
        el.target = '_blank';
        el.rel = 'noopener';
      } else {
        el.style.cursor = 'pointer';
        el.addEventListener('click', () => window.open(SITE_CONFIG[key], '_blank'));
      }
    }
  });

  // Update JSON-LD schema sameAs
  const schemaScript = document.querySelector('script[type="application/ld+json"]');
  if(schemaScript){
    try{
      const schema = JSON.parse(schemaScript.textContent);
      schema.sameAs = [SITE_CONFIG.linkedin, SITE_CONFIG.github].filter(Boolean);
      schema.url = SITE_CONFIG.siteUrl || schema.url;
      schemaScript.textContent = JSON.stringify(schema, null, 2);
    }catch(e){ console.warn('Failed to update schema:', e); }
  }
}

// Hamburger
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  if (!menu || !icon) return;
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Theme toggle
const THEME_KEY = "theme-preference";
function applyTheme(theme){
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelectorAll(".theme-toggle").forEach(btn=>{
    btn.textContent = theme === "dark" ? "☀️" : "🌙";
    btn.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
  });
}
function getPreferredTheme(){
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function initTheme(){ applyTheme(getPreferredTheme()); }
function toggleTheme(){
  const current = document.documentElement.getAttribute("data-theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

// Reveal
function setupReveal(){
  const targets = document.querySelectorAll("[data-reveal], .xt__item, .details-container, .color-container");
  if (!targets.length) return;
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){ e.target.classList.add("in"); obs.unobserve(e.target); }
    });
  },{threshold:0.18, rootMargin:"0px 0px -10% 0px"});
  targets.forEach(t=>obs.observe(t));
}

// 3D Tilt
function setupTilt(){
  const cards = document.querySelectorAll("#projects .details-container.color-container");
  cards.forEach(card=>{
    card.classList.add("tilt");
    const img = card.querySelector(".project-img");
    if (img && !img.classList.contains("tilt__inner")) img.classList.add("tilt__inner");

    function moveLikeMouse(x,y){
      const r = card.getBoundingClientRect();
      const nx = (x - r.left) / r.width;
      const ny = (y - r.top) / r.height;
      const rx = (0.5 - ny) * 12;
      const ry = (nx - 0.5) * 12;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
    card.addEventListener("mousemove", e=>moveLikeMouse(e.clientX, e.clientY));
    card.addEventListener("mouseleave", ()=> card.style.transform = "perspective(900px) rotateX(0) rotateY(0)");
    card.addEventListener("touchmove", e=>{
      if(!e.touches.length) return;
      const t = e.touches[0];
      moveLikeMouse(t.clientX, t.clientY);
    }, {passive:true});
    card.addEventListener("touchend", ()=> card.style.transform = "perspective(900px) rotateX(0) rotateY(0)");
  });
}


// GitHub Last Commit Date
async function updateLastCommitDate() {
  const repo = "SaurHub123/me";
  const lastUpdatedElement = document.getElementById("last-updated");
  if (!lastUpdatedElement) return;

  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/commits?per_page=1`);
    if (!response.ok) throw new Error("Failed to fetch commits");
    
    const data = await response.json();
    if (data && data.length > 0 && data[0].commit && data[0].commit.committer) {
      const commitDate = new Date(data[0].commit.committer.date);
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      lastUpdatedElement.textContent = commitDate.toLocaleDateString('en-US', options);
    }
  } catch (error) {
    console.error("Error fetching last commit date:", error);
  }
}

// Init function
function initializeApp(){
  console.log('initializeApp() called');
  initTheme();
  applySiteConfig();
  document.querySelectorAll(".theme-toggle").forEach(b=>b.addEventListener("click", toggleTheme));
  setupReveal();
  setupTilt();
  updateLastCommitDate();
  console.log('About to initialize chat...');
  initChat();
  console.log('App initialization complete');
}

// Call init if DOM is already loaded (script at end of body)
if(document.readyState === 'loading'){
  document.addEventListener("DOMContentLoaded", initializeApp);
}else{
  console.log('DOM already loaded, calling initializeApp directly');
  initializeApp();
}

// ===== CHAT INITIALIZATION =====
const CHAT_BASE_URL = 'https://saurabh-s-assistant.onrender.com';

function initChat(){
  try{
    console.log('=== CHAT INIT START ===');
    const fab = document.getElementById('chatFab');
    console.log('fab found:', !!fab);
    const overlay = document.getElementById('chatOverlay');
    console.log('overlay found:', !!overlay);
    const closeBtn = document.getElementById('chatClose');
    console.log('closeBtn found:', !!closeBtn);
    const sendBtn = document.getElementById('chatSend');
    console.log('sendBtn found:', !!sendBtn);
    const input = document.getElementById('chatInput');
    console.log('input found:', !!input);
    const messagesEl = document.getElementById('chatMessages');
    console.log('messagesEl found:', !!messagesEl);
    const metaAiSection = document.getElementById('metaAiSection');
    console.log('metaAiSection found:', !!metaAiSection);
    const fabLabelContainer = document.getElementById('fabLabelContainer');
    console.log('fabLabelContainer found:', !!fabLabelContainer);
    const modeModal = document.getElementById('modeModal');
    console.log('modeModal found:', !!modeModal);
    const chatModeBtn = document.getElementById('chatModeBtn');
    console.log('chatModeBtn found:', !!chatModeBtn);
    const imageModeBtn = document.getElementById('imageModeBtn');
    console.log('imageModeBtn found:', !!imageModeBtn);
    const topbarMode = document.getElementById('topbarMode');
    console.log('topbarMode found:', !!topbarMode);
    
    // Safety check - ensure all elements exist
    if(!fab || !overlay || !closeBtn || !sendBtn || !input || !messagesEl || !modeModal || !chatModeBtn || !imageModeBtn){
      console.error('❌ CRITICAL: Chat elements not found!', {fab, overlay, closeBtn, sendBtn, input, messagesEl, modeModal, chatModeBtn, imageModeBtn});
      return;
    }
    console.log('✅ All elements found!');

    // Disable send button until health check passes
    let backendReady = false;
    sendBtn.disabled = true;
    sendBtn.style.opacity = '0.5';
    sendBtn.style.cursor = 'not-allowed';
    input.placeholder = 'Connecting to server...';
    input.disabled = true;

    async function checkBackendHealth(){
      try{
        console.log('🔄 Checking backend health...');
        const res = await fetch(`${CHAT_BASE_URL}/health`);
        const data = await res.json();
        if(data && data.status === 'ok'){
          backendReady = true;
          sendBtn.disabled = false;
          sendBtn.style.opacity = '1';
          sendBtn.style.cursor = 'pointer';
          input.disabled = false;
          input.placeholder = 'Type a message...';
          console.log('✅ Backend is healthy, send button enabled');
        } else {
          console.warn('⚠️ Health check returned unexpected status:', data);
          input.placeholder = 'Server unavailable, try later...';
        }
      }catch(err){
        console.error('❌ Health check failed:', err);
        input.placeholder = 'Server unavailable, try later...';
      }
    }
    checkBackendHealth();
  
  let conversationId = null;
  let labelHideTimer = null;
  let currentMode = null;
  let imageCount = 0;
  const MAX_IMAGES = 3;
  
  function updateModeDisplay(){
    if(currentMode === 'image'){
      topbarMode.textContent = `🎨 Image (${imageCount}/${MAX_IMAGES})`;
      topbarMode.style.display = 'inline-block';
      input.placeholder = 'Describe the image you want...';
    }else if(currentMode === 'chat'){
      topbarMode.textContent = '💬 Chat';
      topbarMode.style.display = 'inline-block';
      input.placeholder = 'Type a message...';
    }
  }
  
  function setMode(mode){
    currentMode = mode;
    modeModal.classList.remove('show');
    updateModeDisplay();
    input.focus();
  }
  
  function showModeModal(){
    modeModal.classList.add('show');
  }
  
  function hideModeModal(){
    modeModal.classList.remove('show');
  }
  
  function hideMetaAi(){
    if(metaAiSection) metaAiSection.style.display = 'none';
  }
  
  function showMetaAi(){
    if(metaAiSection) metaAiSection.style.display = 'flex';
  }
  
  function hideFabLabel(){
    if(fabLabelContainer) fabLabelContainer.style.display = 'none';
  }
  
  function showFabLabel(){
    if(fabLabelContainer) fabLabelContainer.style.display = 'block';
    if(labelHideTimer) clearTimeout(labelHideTimer);
    labelHideTimer = setTimeout(hideFabLabel, 8000);
  }

  function openChat(){
    try{
      console.log('🔵 openChat() TRIGGERED by FAB click');
      console.log('Overlay element:', overlay);
      console.log('Overlay HTML:', overlay.outerHTML.substring(0, 200));
      console.log('Before: overlay classList=', Array.from(overlay.classList));
      console.log('Before: overlay inline styles=', overlay.getAttribute('style'));
      console.log('Before: computed display=', getComputedStyle(overlay).display);
      console.log('Before: computed opacity=', getComputedStyle(overlay).opacity);
      console.log('Before: computed visibility=', getComputedStyle(overlay).visibility);
      console.log('Before: computed pointer-events=', getComputedStyle(overlay).pointerEvents);
      
      // Add the .open class
      overlay.classList.add('open');
      console.log('✅ Added .open class');
      console.log('After: overlay classList=', Array.from(overlay.classList));
      
      // Force inline styles as fallback
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
      overlay.style.visibility = 'visible';
      overlay.style.display = 'block';
      console.log('✅ Set inline styles for visibility');
      console.log('After: computed opacity=', getComputedStyle(overlay).opacity);
      console.log('After: computed pointer-events=', getComputedStyle(overlay).pointerEvents);
      
      overlay.setAttribute('aria-hidden','false');
      
      // Make chat-shell visible too
      const chatShell = overlay.querySelector('.chat-shell');
      if(chatShell){
        chatShell.style.opacity = '1';
        chatShell.style.visibility = 'visible';
        chatShell.style.display = 'grid';
        console.log('✅ Made chat-shell visible');
      }
      
      fab.classList.add('hidden');
      hideFabLabel();
      if(!messagesEl.children.length){
        addBotMessage("Welcome to Saurabh's AI — how can I help you today.");
        showModeModal();
        showMetaAi();
      }else{
        hideMetaAi();
      }
      setTimeout(()=>input.focus(),120);
      console.log('✅ openChat() COMPLETE - overlay should be visible now');
    }catch(err){
      console.error('❌ ERROR in openChat:', err);
      console.error('Stack:', err.stack);
    }
  }
  
  function closeChat(){
    console.log('❌ closeChat() triggered');
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    // Remove inline styles
    overlay.style.opacity = '';
    overlay.style.pointerEvents = '';
    overlay.style.visibility = '';
    overlay.style.display = '';
    fab.classList.remove('hidden');
    showFabLabel();
    hideModeModal();
    console.log('✅ Chat closed');
  }

  function escapeHtml(s){return s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");}
  function linkify(s){return s.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');}
  function nl2br(s){return s.replace(/\n/g,'<br>');}
  function getTimeStr(){const now=new Date();return now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'})}
  
  function smartParse(text){
    let escaped = text.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
    escaped = escaped.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>');
    escaped = escaped.replace(/(?<!\*)\*([^*\n]+?)\*(?!\*)/g,'<em>$1</em>');
    escaped = escaped.replace(/_(.+?)_/g,'<em>$1</em>');
    escaped = escaped.replace(/`([^`]+)`/g,'<code style="background:#f0f0f0;padding:2px 6px;border-radius:4px;font-family:monospace;font-size:0.9em">$1</code>');
    escaped = linkify(escaped);
    escaped = nl2br(escaped);
    return escaped;
  }
  
  function addUserMessage(text){
    const group=document.createElement('div');group.className='chat-msg-group';
    const d=document.createElement('div');d.className='chat-msg user';d.textContent=text;
    const t=document.createElement('div');t.className='chat-msg-time';t.textContent=getTimeStr();t.style.textAlign='right';
    group.appendChild(d);group.appendChild(t);
    messagesEl.appendChild(group);messagesEl.scrollTop=messagesEl.scrollHeight;
    hideMetaAi();
  }
  
  function addLoadingMessage(){
    const group=document.createElement('div');group.className='chat-msg-group';
    const d=document.createElement('div');d.className='chat-msg bot';
    d.innerHTML='<div class="loading-dots"><span></span><span></span><span></span></div>';
    const t=document.createElement('div');t.className='chat-msg-time';t.textContent=getTimeStr();
    group.appendChild(d);group.appendChild(t);
    messagesEl.appendChild(group);messagesEl.scrollTop=messagesEl.scrollHeight;
    return group;
  }
  
  async function typeMessage(element, htmlContent, speed=20){
    element.innerHTML = htmlContent;
    let visibleText = element.textContent || '';
    element.innerHTML = '';
    let charIndex = 0;
    let finalHtml = htmlContent;
    
    return new Promise(resolve=>{
      function addNextChar(){
        if(charIndex < visibleText.length){
          charIndex++;
          element.style.opacity = '1';
          element.innerHTML = '<span style="opacity:0.9">' + visibleText.substring(0, charIndex) + '</span><span class="typing-cursor"></span>';
          setTimeout(addNextChar, speed);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }else{
          element.innerHTML = finalHtml;
          resolve();
        }
      }
      addNextChar();
    });
  }
  
  function addBotMessage(text){
    const group=document.createElement('div');group.className='chat-msg-group';
    const d=document.createElement('div');d.className='chat-msg bot';const safe = linkify(nl2br(escapeHtml(text)));d.innerHTML=safe;
    const t=document.createElement('div');t.className='chat-msg-time';t.textContent=getTimeStr();
    group.appendChild(d);group.appendChild(t);
    messagesEl.appendChild(group);messagesEl.scrollTop=messagesEl.scrollHeight
  }
  
  function addImageMessage(imageUrl, prompt){
    const group=document.createElement('div');group.className='chat-msg-group';
    const d=document.createElement('div');d.className='chat-msg image-msg bot';
    const img=document.createElement('img');img.src=imageUrl;img.alt='Generated image';
    const prompt_div = document.createElement('div');prompt_div.className='image-prompt';prompt_div.textContent=`"${prompt}"`;
    d.appendChild(img);d.appendChild(prompt_div);
    const t=document.createElement('div');t.className='chat-msg-time';t.textContent=getTimeStr();
    group.appendChild(d);group.appendChild(t);
    messagesEl.appendChild(group);messagesEl.scrollTop=messagesEl.scrollHeight;
  }

  async function sendMessage(){
    const txt = input.value.trim();
    if(!txt || !backendReady) return;
    
    if(currentMode === 'image'){
      await sendImageGenerationRequest(txt);
    }else{
      await sendChatMessage(txt);
    }
    
    input.value='';
  }
  
  async function sendChatMessage(txt){
    addUserMessage(txt);
    const loadingGroup = addLoadingMessage();
    try{
      const res = await fetch(`${CHAT_BASE_URL}/api/chat`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:txt,conversation_id:conversationId,stream:false})});
      const data = await res.json();
      conversationId = data.conversation_id || conversationId;
      const safe = smartParse(data.reply || 'No reply.');
      const botMsg = loadingGroup.querySelector('.chat-msg.bot');
      if(botMsg){
        await typeMessage(botMsg, safe, 25);
      }
    }catch(e){
      const botMsg = loadingGroup.querySelector('.chat-msg.bot');
      if(botMsg) botMsg.innerHTML = 'Error contacting server.';
      console.error(e);
    }
  }
  
  async function sendImageGenerationRequest(prompt){
    if(imageCount >= MAX_IMAGES){
      addBotMessage(`Image generation limit reached. You can generate maximum ${MAX_IMAGES} images per conversation.`);
      return;
    }
    
    addUserMessage(`Generate: ${prompt}`);
    const loadingGroup = addLoadingMessage();
    
    try{
      const res = await fetch(`${CHAT_BASE_URL}/api/generate-image`,{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          prompt:prompt,
          conversation_id:conversationId,
          width:1344,
          height:768
        })
      });
      
      if(!res.ok){
        const error = await res.json();
        throw new Error(error.detail || 'Image generation failed');
      }
      
      const data = await res.json();
      conversationId = data.conversation_id || conversationId;
      
      // Check for content filter or other errors
      if(data.finish_reason === 'CONTENT_FILTERED' || !data.image_url){
        throw new Error('Image blocked by content filter. Try a different prompt.');
      }
      
      loadingGroup.remove();
      addImageMessage(data.image_url, data.prompt);
      imageCount++;
      updateModeDisplay();
      
      if(imageCount >= MAX_IMAGES){
        addBotMessage(`You've generated ${MAX_IMAGES} images. Image generation for this conversation is now disabled.`);
        imageModeBtn.disabled = true;
      }
    }catch(e){
      const botMsg = loadingGroup.querySelector('.chat-msg.bot');
      if(botMsg) botMsg.innerHTML = `Error: ${e.message || 'Could not generate image'}`;
      console.error(e);
    }
  }

  fab.addEventListener('click',openChat);
  closeBtn.addEventListener('click',closeChat);
  sendBtn.addEventListener('click',sendMessage);
  input.addEventListener('keydown',(e)=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMessage();}});
  document.addEventListener('keydown',(e)=>{if(e.key==='Escape') closeChat();});
  
  chatModeBtn.addEventListener('click',()=>setMode('chat'));
  imageModeBtn.addEventListener('click',()=>setMode('image'));
  
  modeModal.addEventListener('click',(e)=>{
    if(e.target === modeModal) hideModeModal();
  });
  
  if(metaAiSection){
    metaAiSection.addEventListener('click', ()=>{
      if(!currentMode) showModeModal();
      else input.focus();
    });
  }
  
  console.log('✅ Chat initialized successfully - FAB button is ready');
  console.log('✅ Click the FAB button to open chat');
  showFabLabel();
  }catch(err){
    console.error('❌ FATAL ERROR in initChat:', err);
    console.error('Stack:', err.stack);
  }
}
