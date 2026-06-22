
let tasks = [];

/** Unique ID counter (also stored in localStorage so it never resets) */
let idCounter = parseInt(localStorage.getItem('tf_idCounter') || '0', 10);

/** Current active filter */
let activeFilter = 'all';

/** Load tasks persisted from a previous session */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem('tf_tasks');
    if (raw) tasks = JSON.parse(raw);
  } catch {
    tasks = [];
  }
}

/** Persist tasks to localStorage */
function saveToStorage() {
  localStorage.setItem('tf_tasks', JSON.stringify(tasks));
  localStorage.setItem('tf_idCounter', String(idCounter));
}


/* ══════════════════════════════════════════
   SECTION 2 — DOM REFERENCES
══════════════════════════════════════════ */

const taskTitleInput  = document.getElementById('taskTitle');
const taskCategoryEl  = document.getElementById('taskCategory');
const addTaskBtn      = document.getElementById('addTaskBtn');
const taskList        = document.getElementById('taskList');
const emptyHint       = document.getElementById('emptyHint');
const searchInput     = document.getElementById('searchInput');
const filterBtnsEl    = document.getElementById('filterBtns');
const clearAllBtn     = document.getElementById('clearAll');
const themeToggle     = document.getElementById('themeToggle');
const countTotal      = document.getElementById('countTotal');
const countPending    = document.getElementById('countPending');
const countDone       = document.getElementById('countDone');
const htmlRoot        = document.documentElement;


/* ══════════════════════════════════════════
   SECTION 3 — TASK CREATION
   Uses: createElement, createTextNode, append, appendChild
══════════════════════════════════════════ */

/**
 * Build a task-card DOM element from a task object.
 * Demonstrates: createElement, createTextNode, append, setAttribute, dataset.
 */
function createTaskCard(task) {
  // ── wrapper ──
  const card = document.createElement('div');
  card.className = 'task-card';

  // Custom data attributes (Attributes vs Properties demo)
  card.setAttribute('data-id',       task.id);
  card.setAttribute('data-status',   task.status);
  card.setAttribute('data-category', task.category);
  /*
   * ATTRIBUTES: stored in the HTML element's attribute list.
   * card.getAttribute('data-id')  → string "42"
   *
   * PROPERTIES: live values on the JS object.
   * card.dataset.id               → string "42"  (shortcut to data-* attrs)
   * card.dataset.status           → "pending" | "complete"
   *
   * For non-data attributes the gap is clearer:
   * input.getAttribute('value')   → initial HTML value (static)
   * input.value                   → current user-typed value (live)
   */

  // ── top row: title + category badge ──
  const topRow = document.createElement('div');
  topRow.className = 'task-top';

  const titleSpan = document.createElement('span');
  titleSpan.className = 'task-title';
  // createTextNode — safest way to insert user content (no XSS)
  titleSpan.appendChild(document.createTextNode(task.title));

  const badge = document.createElement('span');
  badge.className = 'cat-badge';
  badge.setAttribute('data-cat', task.category);
  badge.appendChild(document.createTextNode(task.category));

  topRow.append(titleSpan, badge);

  // ── action buttons ──
  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const editBtn     = makeBtn('Edit',     'btn-edit task-btn',     'edit');
  const completeBtn = makeBtn('Complete', 'btn-complete task-btn', 'complete');
  const deleteBtn   = makeBtn('Delete',   'btn-delete task-btn',   'delete');

  // If already complete, swap button label
  if (task.status === 'complete') {
    completeBtn.textContent = 'Undo';
  }

  actions.append(editBtn, completeBtn, deleteBtn);

  // ── meta row (shows data-* values) ──
  const meta = document.createElement('div');
  meta.className = 'task-meta';

  const idTag  = document.createElement('span');
  idTag.innerHTML = `id: <code>${task.id}</code>`;

  const catTag = document.createElement('span');
  catTag.innerHTML = `category: <code>${task.category}</code>`;

  const statTag = document.createElement('span');
  statTag.innerHTML = `status: <code>${task.status}</code>`;

  meta.append(idTag, catTag, statTag);

  // ── assemble ──
  card.append(topRow, actions, meta);
  return card;
}

/** Tiny helper: create a labelled button with action data-attribute */
function makeBtn(label, className, action) {
  const btn = document.createElement('button');
  btn.className = className;
  btn.textContent = label;
  btn.dataset.action = action; // used in event delegation
  return btn;
}


/* ══════════════════════════════════════════
   SECTION 4 — RENDER / SYNC
══════════════════════════════════════════ */

/**
 * Re-render the whole task list.
 * Uses DocumentFragment for performance (single reflow).
 */
function renderTasks() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = tasks.filter(t => {
    const matchFilter   = activeFilter === 'all' || t.category === activeFilter;
    const matchSearch   = !query || t.title.toLowerCase().includes(query);
    return matchFilter && matchSearch;
  });

  // Clear list
  taskList.innerHTML = '';

  if (filtered.length === 0) {
    emptyHint.classList.add('visible');
    return;
  }
  emptyHint.classList.remove('visible');

  // Use DocumentFragment — appends all cards in one DOM operation
  const fragment = document.createDocumentFragment();
  filtered.forEach(t => fragment.appendChild(createTaskCard(t)));
  taskList.appendChild(fragment);

  updateStats();
}

/** Update counter chips */
function updateStats() {
  const total   = tasks.length;
  const done    = tasks.filter(t => t.status === 'complete').length;
  const pending = total - done;

  countTotal.textContent   = total;
  countPending.textContent = pending;
  countDone.textContent    = done;
}


/* ══════════════════════════════════════════
   SECTION 5 — ADD TASK
══════════════════════════════════════════ */

function addTask() {
  const title    = taskTitleInput.value.trim();
  const category = taskCategoryEl.value;

  /*
   * ATTRIBUTES VS PROPERTIES DEMO — in action:
   *
   * taskTitleInput.value              → live DOM property (what user typed right now)
   * taskTitleInput.getAttribute('value') → the initial attribute (always "" for this input
   *                                        because we wrote value="" in HTML)
   *
   * We read the PROPERTY (.value) because we want the current content.
   */
  if (!title) {
    taskTitleInput.focus();
    taskTitleInput.style.borderColor = 'var(--warn)';
    setTimeout(() => { taskTitleInput.style.borderColor = ''; }, 1000);
    return;
  }

  idCounter++;
  const task = {
    id:        idCounter,
    title,
    category,
    status:    'pending',
    createdAt: new Date().toISOString(),
  };

  tasks.push(task);
  saveToStorage();
  renderTasks();

  // Reset form
  taskTitleInput.value = '';
  taskTitleInput.focus();

  /* ── Demonstrate append / prepend / before / after ──
   *
   * The freshly-created card was appended via the fragment above (append/appendChild).
   * Below we log a reference showing all five manipulation APIs:
   *
   * append()     — adds node(s) or strings as last children
   * prepend()    — adds node(s) or strings as first children
   * before()     — inserts node(s) before the element in its parent
   * after()      — inserts node(s) after the element in its parent
   * replaceWith()— swaps the element with new node(s)
   * remove()     — removes the element from the DOM
   *
   * All of these are called elsewhere in this file (see editTask, deleteTask, etc.)
   */
  console.log(`[TaskFlow] Task #${task.id} added via append() on DocumentFragment.`);
}


/* ══════════════════════════════════════════
   SECTION 6 — EVENT DELEGATION
   One listener on #taskList handles ALL card actions.
══════════════════════════════════════════ */

/*
 * EVENT DELEGATION explained:
 *
 * Instead of:
 *   card.querySelector('.btn-delete').addEventListener('click', deleteHandler);
 *   card.querySelector('.btn-edit').addEventListener('click', editHandler);
 *   … for every card …
 *
 * We attach ONE listener to the parent #taskList.
 * When a button is clicked, the event BUBBLES up to #taskList.
 * We inspect e.target.dataset.action to decide what to do.
 *
 * Benefits:
 * ① Scales to any number of cards with zero extra listeners.
 * ② Works for cards added dynamically after page load.
 * ③ Less memory — one handler object instead of N.
 */
taskList.addEventListener('click', function (e) {
  const btn    = e.target.closest('[data-action]');  // walk up to action button
  if (!btn) return;

  const action = btn.dataset.action;
  const card   = btn.closest('.task-card');
  if (!card) return;

  const taskId = parseInt(card.getAttribute('data-id'), 10);

  if (action === 'delete')   deleteTask(taskId, card);
  if (action === 'complete') toggleComplete(taskId, card);
  if (action === 'edit')     startEdit(taskId, card);
  if (action === 'save')     saveEdit(taskId, card);
});


/* ══════════════════════════════════════════
   SECTION 7 — TASK ACTIONS
══════════════════════════════════════════ */

/** Delete — demonstrates .remove() */
function deleteTask(id, card) {
  tasks = tasks.filter(t => t.id !== id);
  saveToStorage();

  // Animate out, then remove()
  card.style.opacity = '0';
  card.style.transform = 'translateX(40px)';
  card.style.transition = 'opacity .2s, transform .2s';
  setTimeout(() => {
    card.remove(); // ← DOM remove()
    updateStats();
    if (tasks.length === 0) emptyHint.classList.add('visible');
  }, 200);

  console.log(`[TaskFlow] deleteTask #${id} — card.remove() called.`);
}

/** Toggle complete — demonstrates setAttribute / removeAttribute */
function toggleComplete(id, card) {
  const task   = tasks.find(t => t.id === id);
  if (!task) return;

  const isDone = task.status === 'complete';
  task.status  = isDone ? 'pending' : 'complete';
  saveToStorage();

  /*
   * setAttribute / removeAttribute demo:
   * We update data-status directly on the card node so CSS can respond
   * without re-rendering the whole list.
   */
  card.setAttribute('data-status', task.status);    // setAttribute()
  // If we wanted to remove it: card.removeAttribute('data-status');
  // We can check: card.hasAttribute('data-status') → true

  // Update status in meta row
  const statCode = card.querySelector('.task-meta code:last-of-type');
  if (statCode) statCode.textContent = task.status;

  // Swap button label
  const btn = card.querySelector('[data-action="complete"]');
  if (btn) btn.textContent = isDone ? 'Complete' : 'Undo';

  updateStats();
  console.log(`[TaskFlow] toggleComplete #${id} — setAttribute('data-status', '${task.status}').`);
}

/** Edit — replaces title span with an input using replaceWith() */
function startEdit(id, card) {
  const task  = tasks.find(t => t.id === id);
  if (!task) return;

  const titleSpan = card.querySelector('.task-title');
  if (!titleSpan) return;

  // Build a text input
  const input = document.createElement('input');
  input.type      = 'text';
  input.className = 'task-title-input';
  input.value     = task.title;

  /*
   * replaceWith() — replaces titleSpan with the new input in-place.
   * This is cleaner than removing + inserting manually.
   */
  titleSpan.replaceWith(input); // ← replaceWith()
  input.focus();
  input.select();

  // Swap Edit → Save button
  const editBtn = card.querySelector('[data-action="edit"]');
  if (editBtn) {
    editBtn.textContent    = 'Save';
    editBtn.dataset.action = 'save';
    editBtn.className      = editBtn.className.replace('btn-edit', 'btn-save');
  }

  console.log(`[TaskFlow] startEdit #${id} — titleSpan.replaceWith(input).`);
}

/** Save edit — restores the span using replaceWith() again */
function saveEdit(id, card) {
  const task  = tasks.find(t => t.id === id);
  if (!task) return;

  const input = card.querySelector('.task-title-input');
  if (!input) return;

  const newTitle = input.value.trim() || task.title;
  task.title = newTitle;
  saveToStorage();

  // Rebuild span
  const titleSpan  = document.createElement('span');
  titleSpan.className = 'task-title';
  titleSpan.appendChild(document.createTextNode(newTitle));
  input.replaceWith(titleSpan); // ← replaceWith() again

  // Restore Save → Edit
  const saveBtn = card.querySelector('[data-action="save"]');
  if (saveBtn) {
    saveBtn.textContent    = 'Edit';
    saveBtn.dataset.action = 'edit';
    saveBtn.className      = saveBtn.className.replace('btn-save', 'btn-edit');
  }

  console.log(`[TaskFlow] saveEdit #${id} — input.replaceWith(titleSpan).`);
}


/* ══════════════════════════════════════════
   SECTION 8 — SEARCH & FILTER
══════════════════════════════════════════ */

searchInput.addEventListener('input', renderTasks);

// Filter buttons — delegation on the filter row
filterBtnsEl.addEventListener('click', function (e) {
  const btn = e.target.closest('.filter-btn');
  if (!btn) return;

  // Toggle active class
  filterBtnsEl.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  activeFilter = btn.dataset.filter;
  renderTasks();
});

// Clear all tasks
clearAllBtn.addEventListener('click', function () {
  if (tasks.length === 0) return;
  if (!confirm('Delete all tasks?')) return;
  tasks = [];
  saveToStorage();
  renderTasks();
});

// Add task
addTaskBtn.addEventListener('click', addTask);
taskTitleInput.addEventListener('keydown', e => { if (e.key === 'Enter') addTask(); });


/* ══════════════════════════════════════════
   SECTION 9 — THEME TOGGLE
   Uses classList, dataset, setAttribute
══════════════════════════════════════════ */

function applyTheme(theme) {
  /*
   * setAttribute() — sets data-theme on <html>.
   * CSS [data-theme="dark"] { … } selectors pick it up.
   */
  htmlRoot.setAttribute('data-theme', theme); // setAttribute

  // Also store theme in dataset (another way to read/write data-*)
  htmlRoot.dataset.theme = theme; // dataset shorthand

  const isDark = theme === 'dark';
  themeToggle.querySelector('.theme-icon').textContent  = isDark ? '☀' : '☽';
  themeToggle.querySelector('.theme-label').textContent = isDark ? 'Light Mode' : 'Dark Mode';

  // classList to show the toggle is active
  themeToggle.classList.toggle('active', isDark); // classList.toggle

  localStorage.setItem('tf_theme', theme);
}

themeToggle.addEventListener('click', function () {
  const current = htmlRoot.getAttribute('data-theme'); // getAttribute
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme
applyTheme(localStorage.getItem('tf_theme') || 'light');


/* ══════════════════════════════════════════
   SECTION 10 — EVENT PROPAGATION DEMO
══════════════════════════════════════════ */

/* ── BUBBLING ──────────────────────────────
 * Listeners registered WITHOUT the capture flag (default = false).
 * Events travel bottom-up: Child → Parent → Grandparent.
 * This is the default DOM event flow.
 */
const bubbleLog = document.getElementById('bubbleLog');
let bubbleTimeout;

function logBubble(who) {
  clearTimeout(bubbleTimeout);
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `▶ ${who}`;
  if (bubbleLog.querySelector('em')) bubbleLog.innerHTML = '';
  bubbleLog.appendChild(entry);
  // Auto-reset after 4s
  bubbleTimeout = setTimeout(() => {
    bubbleLog.innerHTML = '<em>Click the Child Button…</em>';
  }, 4000);
}

// useCapture = false (bubbling phase)
document.getElementById('grandparent').addEventListener('click', () => logBubble('Grandparent'), false);
document.getElementById('parent').addEventListener('click',      () => logBubble('Parent'),      false);
document.getElementById('childBtn').addEventListener('click',    () => logBubble('Child'),       false);
/*
 * Console will show:
 *   Child
 *   Parent
 *   Grandparent
 * — because events bubble upward from the target element.
 */
document.getElementById('grandparent').addEventListener('click', () => console.log('[Bubble] Grandparent'), false);
document.getElementById('parent').addEventListener('click',      () => console.log('[Bubble] Parent'),      false);
document.getElementById('childBtn').addEventListener('click',    () => console.log('[Bubble] Child'),       false);


/* ── CAPTURING ─────────────────────────────
 * Listeners registered WITH useCapture = true.
 * Events travel top-down: Grandparent → Parent → Child.
 * The capture phase runs BEFORE the bubbling phase.
 */
const captureLog = document.getElementById('captureLog');
let captureTimeout;

function logCapture(who) {
  clearTimeout(captureTimeout);
  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.textContent = `▶ ${who}`;
  if (captureLog.querySelector('em')) captureLog.innerHTML = '';
  captureLog.appendChild(entry);
  captureTimeout = setTimeout(() => {
    captureLog.innerHTML = '<em>Click the Child Button…</em>';
  }, 4000);
}

// useCapture = true (capture phase)
document.getElementById('grandparentC').addEventListener('click', () => logCapture('Grandparent'), true);
document.getElementById('parentC').addEventListener('click',      () => logCapture('Parent'),      true);
document.getElementById('childBtnC').addEventListener('click',    () => logCapture('Child'),       true);
/*
 * Console will show:
 *   Grandparent
 *   Parent
 *   Child
 * — because capturing fires outer-to-inner before the event reaches the target.
 */
document.getElementById('grandparentC').addEventListener('click', () => console.log('[Capture] Grandparent'), true);
document.getElementById('parentC').addEventListener('click',      () => console.log('[Capture] Parent'),      true);
document.getElementById('childBtnC').addEventListener('click',    () => console.log('[Capture] Child'),       true);


/* ── TABS to switch bubbling / capturing view ── */
document.getElementById('tabBubble').addEventListener('click', function () {
  document.getElementById('demoBubble').classList.remove('hidden');
  document.getElementById('demoCapture').classList.add('hidden');
  this.classList.add('active');
  document.getElementById('tabCapture').classList.remove('active');
});
document.getElementById('tabCapture').addEventListener('click', function () {
  document.getElementById('demoCapture').classList.remove('hidden');
  document.getElementById('demoBubble').classList.add('hidden');
  this.classList.add('active');
  document.getElementById('tabBubble').classList.remove('active');
});


/* ══════════════════════════════════════════
   SECTION 11 — ATTRIBUTES vs PROPERTIES LIVE DEMO
══════════════════════════════════════════ */

const attrDemoInput = document.getElementById('attrDemo');
const attrResult    = document.getElementById('attrResult');
const propResult    = document.getElementById('propResult');

attrDemoInput.addEventListener('input', function () {
  /*
   * getAttribute('value') returns the *attribute* — the initial HTML value.
   * It never changes just because the user types.
   * It only changes if you call setAttribute('value', …) explicitly.
   *
   * this.value (the DOM property) always reflects what is currently in the box.
   */
  attrResult.textContent = attrDemoInput.getAttribute('value'); // static attribute
  propResult.textContent = attrDemoInput.value;                 // live property
});


/* ══════════════════════════════════════════
   SECTION 12 — INIT
══════════════════════════════════════════ */

loadFromStorage();
renderTasks();

// Show empty hint on first load if no tasks
if (tasks.length === 0) emptyHint.classList.add('visible');

console.log('[TaskFlow] App initialised. Tasks loaded:', tasks.length);