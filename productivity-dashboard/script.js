(function(){
"use strict";

  /* ---------- Storage helpers (falls back to memory if Local Storage is unavailable) ---------- */
  const memoryStore = {};
  const storage = {
    get(key, fallback){
      try{
        const raw = localStorage.getItem(key);
        return raw !== null ? JSON.parse(raw) : fallback;
      }catch(e){
        return (key in memoryStore) ? memoryStore[key] : fallback;
      }
    },
    set(key, value){
      try{
        localStorage.setItem(key, JSON.stringify(value));
      }catch(e){
        memoryStore[key] = value;
      }
    }
  };

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById('themeToggle');
  function applyTheme(theme){
    document.body.setAttribute('data-theme', theme);
    themeToggle.textContent = theme === 'dark' ? '◑' : '◐';
    storage.set('daybook_theme', theme);
  }
  applyTheme(storage.get('daybook_theme', 'light'));
  themeToggle.addEventListener('click', () => {
    const next = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });

  /* ---------- Navigation ---------- */
  const dashboard = document.getElementById('dashboard');
  const featureViews = document.querySelectorAll('.feature-view');
  let activeFeature = null;
  let navLocked = false;

  function showFeature(name){
    if(navLocked) return;
    navLocked = true;
    setTimeout(() => navLocked = false, 250);
    if(activeFeature === name) return;
    dashboard.style.display = 'none';
    featureViews.forEach(v => v.classList.remove('active'));
    const target = document.getElementById('feature-' + name);
    if(target){ target.classList.add('active'); activeFeature = name; }
  }
  function showDashboard(){
    featureViews.forEach(v => v.classList.remove('active'));
    dashboard.style.display = 'block';
    activeFeature = null;
  }
  document.querySelectorAll('[data-feature]').forEach(card => {
    card.addEventListener('click', () => showFeature(card.dataset.feature));
  });
  document.querySelectorAll('[data-back]').forEach(btn => {
    btn.addEventListener('click', showDashboard);
  });

  /* ---------- Date & Time + Day Arc + Dynamic Background ---------- */
  const dateValue = document.getElementById('dateValue');
  const timeValue = document.getElementById('timeValue');
  const dayMarker = document.getElementById('dayMarker');
  const dayPhaseLabel = document.getElementById('dayPhaseLabel');
  const greeting = document.getElementById('greeting');
  const backdrop = document.getElementById('backdrop');

  const phases = [
    { start: 5,  end: 11, name:'Morning',   a:'#FFF6E5', b:'#FFE1C4', text:'#141821', greetVerb:'Good morning' },
    { start: 11, end: 17, name:'Afternoon', a:'#EAF4F4', b:'#CDEAE7', text:'#141821', greetVerb:'Good afternoon' },
    { start: 17, end: 21, name:'Evening',   a:'#3A2C4D', b:'#5C3A5E', text:'#F7F3F0', greetVerb:'Good evening' },
    { start: 21, end: 29, name:'Night',     a:'#10131C', b:'#1B2338', text:'#E8ECF5', greetVerb:'Working late' }
  ];
  function currentPhase(hour){
    const h = hour < 5 ? hour + 24 : hour;
    return phases.find(p => h >= p.start && h < p.end) || phases[3];
  }
  function updateClock(){
    const now = new Date();
    const dateStr = now.toLocaleDateString(undefined, { weekday:'long', day:'numeric', month:'long' });
    const timeStr = now.toLocaleTimeString(undefined, { hour:'2-digit', minute:'2-digit' });
    dateValue.textContent = dateStr;
    timeValue.textContent = timeStr;

    const hour = now.getHours() + now.getMinutes()/60;
    const phase = currentPhase(now.getHours());
    dayPhaseLabel.textContent = phase.name;
    greeting.innerHTML = `${phase.greetVerb}. <em>Ready to focus?</em>`;
    backdrop.style.setProperty('--backdrop-a', phase.a);
    backdrop.style.setProperty('--backdrop-b', phase.b);
    document.documentElement.style.setProperty('--backdrop-text', phase.text);

    const pct = (hour / 24) * 100;
    dayMarker.style.left = pct + '%';
  }
  updateClock();
  setInterval(updateClock, 1000);

  /* ---------- Todo List ---------- */
  const todoList = document.getElementById('todoList');
  const todoInput = document.getElementById('todoInput');
  const todoAddBtn = document.getElementById('todoAddBtn');
  const todoStat = document.getElementById('todoStat');
  let todos = storage.get('daybook_todos', []);

  function renderTodos(){
    todoList.innerHTML = '';
    if(todos.length === 0){
      todoList.innerHTML = '<li class="empty-note" style="border:none; background:none;">No tasks yet — add your first one above.</li>';
    }
    todos.forEach(todo => {
      const li = document.createElement('li');
      li.className = (todo.completed ? 'completed ' : '') + (todo.important ? 'important' : '');
      li.dataset.id = todo.id;
      li.innerHTML = `
        <button class="task-btn" data-action="complete" title="Mark complete">${todo.completed ? '☑' : '☐'}</button>
        <span class="task-text">${escapeHtml(todo.text)}</span>
        <button class="task-btn" data-action="important" title="Mark important">${todo.important ? '★' : '☆'}</button>
        <button class="task-btn" data-action="delete" title="Delete">✕</button>
      `;
      todoList.appendChild(li);
    });
    const open = todos.filter(t => !t.completed).length;
    todoStat.textContent = open === 0 ? 'All clear' : `${open} open`;
    storage.set('daybook_todos', todos);
  }
  function addTodo(){
    const text = todoInput.value.trim();
    if(!text) return;
    todos.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), text, completed:false, important:false });
    todoInput.value = '';
    renderTodos();
  }
  todoAddBtn.addEventListener('click', addTodo);
  todoInput.addEventListener('keydown', e => { if(e.key === 'Enter') addTodo(); });
  todoList.addEventListener('click', e => {
    const btn = e.target.closest('.task-btn');
    if(!btn) return;
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const todo = todos.find(t => t.id === id);
    if(!todo) return;
    const action = btn.dataset.action;
    if(action === 'complete') todo.completed = !todo.completed;
    if(action === 'important') todo.important = !todo.important;
    if(action === 'delete') todos = todos.filter(t => t.id !== id);
    renderTodos();
  });
  renderTodos();

  /* ---------- Daily Planner ---------- */
  const plannerList = document.getElementById('plannerList');
  const plannerStat = document.getElementById('plannerStat');
  let plannerData = storage.get('daybook_planner', {});
  const SLOT_START = 6, SLOT_END = 22; // 6am - 10pm

  function formatSlotLabel(h){
    const period = h >= 12 ? 'PM' : 'AM';
    let hr = h % 12; if(hr === 0) hr = 12;
    return `${hr}:00 ${period}`;
  }
  function renderPlanner(){
    plannerList.innerHTML = '';
    const nowHour = new Date().getHours();
    let filled = 0;
    for(let h = SLOT_START; h < SLOT_END; h++){
      const key = String(h);
      const val = plannerData[key] || '';
      if(val.trim()) filled++;
      const row = document.createElement('div');
      row.className = 'slot-row' + (h === nowHour ? ' current' : '');
      row.innerHTML = `
        <span class="slot-time">${formatSlotLabel(h)}</span>
        <input class="slot-input" type="text" data-hour="${h}" maxlength="120" placeholder="Nothing planned" value="${escapeAttr(val)}">
      `;
      plannerList.appendChild(row);
    }
    plannerStat.textContent = `${filled} filled`;
  }
  let plannerSaveTimer = null;
  plannerList.addEventListener('input', e => {
    const input = e.target.closest('.slot-input');
    if(!input) return;
    plannerData[input.dataset.hour] = input.value;
    clearTimeout(plannerSaveTimer);
    plannerSaveTimer = setTimeout(() => {
      storage.set('daybook_planner', plannerData);
      const filled = Object.values(plannerData).filter(v => v && v.trim()).length;
      plannerStat.textContent = `${filled} filled`;
    }, 400);
  });
  renderPlanner();

  /* ---------- Daily Goals ---------- */
  const goalsList = document.getElementById('goalsList');
  const goalInput = document.getElementById('goalInput');
  const goalAddBtn = document.getElementById('goalAddBtn');
  const goalsFill = document.getElementById('goalsFill');
  const goalsProgressLabel = document.getElementById('goalsProgressLabel');
  const goalsStat = document.getElementById('goalsStat');
  let goals = storage.get('daybook_goals', []);

  function renderGoals(){
    goalsList.innerHTML = '';
    if(goals.length === 0){
      goalsList.innerHTML = '<li class="empty-note" style="border:none; background:none;">No goals yet — set one for today.</li>';
    }
    goals.forEach(g => {
      const li = document.createElement('li');
      li.className = g.completed ? 'completed' : '';
      li.dataset.id = g.id;
      li.innerHTML = `
        <button class="task-btn" data-action="toggle" title="Mark done">${g.completed ? '☑' : '☐'}</button>
        <span class="task-text">${escapeHtml(g.text)}</span>
        <button class="task-btn" data-action="delete" title="Delete">✕</button>
      `;
      goalsList.appendChild(li);
    });
    const done = goals.filter(g => g.completed).length;
    const total = goals.length;
    const pct = total === 0 ? 0 : (done/total)*100;
    goalsFill.style.width = pct + '%';
    goalsProgressLabel.textContent = `${done} of ${total} completed`;
    goalsStat.textContent = `${done} of ${total}`;
    storage.set('daybook_goals', goals);
  }
  function addGoal(){
    const text = goalInput.value.trim();
    if(!text) return;
    goals.push({ id: Date.now().toString(36) + Math.random().toString(36).slice(2,6), text, completed:false });
    goalInput.value = '';
    renderGoals();
  }
  goalAddBtn.addEventListener('click', addGoal);
  goalInput.addEventListener('keydown', e => { if(e.key === 'Enter') addGoal(); });
  goalsList.addEventListener('click', e => {
    const btn = e.target.closest('.task-btn');
    if(!btn) return;
    const li = e.target.closest('li');
    const id = li.dataset.id;
    const goal = goals.find(g => g.id === id);
    if(!goal) return;
    if(btn.dataset.action === 'toggle') goal.completed = !goal.completed;
    if(btn.dataset.action === 'delete') goals = goals.filter(g => g.id !== id);
    renderGoals();
  });
  renderGoals();

  /* ---------- Pomodoro Timer ---------- */
  const pomoTimeEl = document.getElementById('pomoTime');
  const pomoSessionLabel = document.getElementById('pomoSessionLabel');
  const pomoStart = document.getElementById('pomoStart');
  const pomoPause = document.getElementById('pomoPause');
  const pomoReset = document.getElementById('pomoReset');
  const pomoStatCard = document.getElementById('pomoStat');

  const WORK_SECONDS = 25 * 60;
  const BREAK_SECONDS = 5 * 60;
  let pomoRemaining = WORK_SECONDS;
  let pomoIsBreak = false;
  let pomoInterval = null;

  function formatMMSS(totalSeconds){
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  function renderPomo(){
    pomoTimeEl.textContent = formatMMSS(pomoRemaining);
    pomoSessionLabel.textContent = pomoIsBreak ? 'Break' : 'Work Session';
    pomoStatCard.textContent = formatMMSS(pomoRemaining);
  }
  function pomoTick(){
    pomoRemaining--;
    if(pomoRemaining <= 0){
      pomoIsBreak = !pomoIsBreak;
      pomoRemaining = pomoIsBreak ? BREAK_SECONDS : WORK_SECONDS;
      renderPomo();
      alert(pomoIsBreak ? "Work session complete — time for a break." : "Break's over — back to focus.");
      return;
    }
    renderPomo();
  }
  pomoStart.addEventListener('click', () => {
    if(pomoInterval) return; // prevent multiple intervals
    pomoInterval = setInterval(pomoTick, 1000);
  });
  pomoPause.addEventListener('click', () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
  });
  pomoReset.addEventListener('click', () => {
    clearInterval(pomoInterval);
    pomoInterval = null;
    pomoIsBreak = false;
    pomoRemaining = WORK_SECONDS;
    renderPomo();
  });
  renderPomo();

  /* ---------- Motivation Quote ---------- */
  const quoteText = document.getElementById('quoteText');
  const quoteAuthor = document.getElementById('quoteAuthor');
  const quoteBtn = document.getElementById('quoteBtn');

  const fallbackQuotes = [
    { text:"The secret of getting ahead is getting started.", author:"Mark Twain" },
    { text:"Focus on being productive instead of busy.", author:"Tim Ferriss" },
    { text:"Small daily improvements are the key to staggering long-term results.", author:"Unknown" },
    { text:"Discipline is choosing between what you want now and what you want most.", author:"Abraham Lincoln" },
    { text:"Action is the foundational key to all success.", author:"Pablo Picasso" }
  ];
  async function fetchQuote(){
    quoteText.textContent = 'Loading a quote…';
    quoteText.classList.add('quote-loading');
    quoteAuthor.textContent = '';
    try{
      const res = await fetch('https://api.quotable.io/random');
      if(!res.ok) throw new Error('Request failed');
      const data = await res.json();
      quoteText.textContent = `“${data.content}”`;
      quoteAuthor.textContent = data.author ? `— ${data.author}` : '';
    }catch(err){
      const q = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
      quoteText.textContent = `“${q.text}”`;
      quoteAuthor.textContent = `— ${q.author}`;
    }finally{
      quoteText.classList.remove('quote-loading');
    }
  }
  quoteBtn.addEventListener('click', fetchQuote);

  /* ---------- Weather Widget ---------- */
  const weatherMini = document.getElementById('weatherMini');
  const weatherMiniSub = document.getElementById('weatherMiniSub');
  const weatherStat = document.getElementById('weatherStat');
  const weatherTempFull = document.getElementById('weatherTempFull');
  const weatherCondFull = document.getElementById('weatherCondFull');
  const weatherLoc = document.getElementById('weatherLoc');
  const weatherHumidity = document.getElementById('weatherHumidity');
  const weatherWind = document.getElementById('weatherWind');

  const weatherCodes = {
    0:'Clear sky', 1:'Mostly clear', 2:'Partly cloudy', 3:'Overcast',
    45:'Fog', 48:'Fog', 51:'Light drizzle', 53:'Drizzle', 55:'Heavy drizzle',
    61:'Light rain', 63:'Rain', 65:'Heavy rain', 71:'Light snow', 73:'Snow',
    75:'Heavy snow', 80:'Rain showers', 81:'Rain showers', 82:'Violent showers',
    95:'Thunderstorm', 96:'Thunderstorm w/ hail', 99:'Severe thunderstorm'
  };

  // Fetch with a hard timeout so a slow/unreachable API can't hang the widget forever.
  function fetchWithTimeout(url, ms){
    ms = ms || 7000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ms);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
  }

  function renderWeather(temp, cond, humidity, wind, placeName){
    weatherMini.textContent = `${temp}°`;
    weatherMiniSub.textContent = cond;
    weatherStat.textContent = `${temp}° · ${cond}`;
    weatherTempFull.textContent = `${temp}°C`;
    weatherCondFull.textContent = cond;
    weatherLoc.textContent = placeName;
    weatherHumidity.textContent = humidity;
    weatherWind.textContent = wind;
  }
  function weatherError(msg){
    weatherMini.textContent = '—';
    weatherMiniSub.textContent = msg;
    weatherStat.textContent = 'Unavailable';
    weatherCondFull.textContent = msg;
    weatherLoc.textContent = '—';
    weatherHumidity.textContent = '—';
    weatherWind.textContent = '—';
  }

  // Primary provider: Open-Meteo (no key, CORS-enabled).
  async function tryOpenMeteo(lat, lon, placeName){
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const res = await fetchWithTimeout(url);
    if(!res.ok) throw new Error('Open-Meteo request failed: ' + res.status);
    const data = await res.json();
    const c = data.current;
    renderWeather(
      Math.round(c.temperature_2m),
      weatherCodes[c.weather_code] || 'Conditions unavailable',
      `${c.relative_humidity_2m}%`,
      `${Math.round(c.wind_speed_10m)} km/h`,
      placeName
    );
  }

  // Backup provider: wttr.in JSON endpoint (no key, used if Open-Meteo is unreachable).
  async function tryWttrIn(lat, lon, placeName){
    const url = `https://wttr.in/${lat},${lon}?format=j1`;
    const res = await fetchWithTimeout(url);
    if(!res.ok) throw new Error('wttr.in request failed: ' + res.status);
    const data = await res.json();
    const cur = data.current_condition[0];
    renderWeather(
      Math.round(parseFloat(cur.temp_C)),
      cur.weatherDesc && cur.weatherDesc[0] ? cur.weatherDesc[0].value : 'Conditions unavailable',
      `${cur.humidity}%`,
      `${Math.round(parseFloat(cur.windspeedKmph))} km/h`,
      placeName
    );
  }

  async function loadWeather(lat, lon, placeName){
    weatherMiniSub.textContent = 'Loading…';
    try{
      await tryOpenMeteo(lat, lon, placeName);
    }catch(primaryErr){
      try{
        await tryWttrIn(lat, lon, placeName);
      }catch(backupErr){
        weatherError('Could not load weather — check your connection');
      }
    }
  }

  // Location: browser geolocation first; if denied/unavailable/timed out, fall back to
  // IP-based geolocation; if that also fails, fall back to a fixed default location.
  function getBrowserLocation(){
    return new Promise((resolve, reject) => {
      if(!('geolocation' in navigator)){ reject(new Error('Geolocation unsupported')); return; }
      navigator.geolocation.getCurrentPosition(
        pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude, name: 'Your location' }),
        err => reject(err),
        { timeout: 6000 }
      );
    });
  }
  async function getIpLocation(){
    const res = await fetchWithTimeout('https://ipapi.co/json/', 5000);
    if(!res.ok) throw new Error('IP geolocation failed');
    const data = await res.json();
    if(typeof data.latitude !== 'number' || typeof data.longitude !== 'number'){
      throw new Error('IP geolocation returned no coordinates');
    }
    return { lat: data.latitude, lon: data.longitude, name: data.city || 'Your area' };
  }
  async function initWeather(){
    try{
      const loc = await getBrowserLocation();
      loadWeather(loc.lat, loc.lon, loc.name);
      return;
    }catch(e){ /* fall through to IP-based location */ }
    try{
      const loc = await getIpLocation();
      loadWeather(loc.lat, loc.lon, loc.name);
      return;
    }catch(e){ /* fall through to fixed default */ }
    loadWeather(51.5074, -0.1278, 'Default location');
  }
  initWeather();

  /* ---------- Utilities ---------- */
  function escapeHtml(str){
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
  function escapeAttr(str){
    return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
  }
})();