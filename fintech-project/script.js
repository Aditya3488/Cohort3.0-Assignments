// ============================================
// FinTrack Pro - script.js
// All the app logic lives here
// ============================================

// keep track of which filter is currently active
let currentFilter = "all";

// this will hold our Chart.js chart so we can destroy/redraw it
let cashFlowChart = null;

// email of whoever is currently logged in - blank until they log in
let currentUserEmail = "";

// holds the id of the transaction being edited, or null when adding a new one
let editingId = null;

// currency symbols for each currency code
const currencySymbols = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥"
};

// run this stuff as soon as the page loads
window.onload = function () {
  // check if someone is already logged in from before
  const savedUser = localStorage.getItem("currentUser");

  if (savedUser) {
    currentUserEmail = savedUser;
    enterPortal();
  } else {
    // nobody logged in - stay on the auth page (it's shown by default)
  }
};


// ============================================
// STORAGE HELPERS
// (data is saved per user so everyone's stuff stays separate)
// ============================================

function loadTransactions() {
  const saved = localStorage.getItem("transactions_" + currentUserEmail);
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

function saveTransactions(transactions) {
  localStorage.setItem("transactions_" + currentUserEmail, JSON.stringify(transactions));
}

function getSettings() {
  const saved = localStorage.getItem("settings_" + currentUserEmail);
  if (saved) {
    return JSON.parse(saved);
  }
  // default settings if nothing saved yet
  return {
    name: "",
    currency: "INR",
    darkMode: false
  };
}

function saveSettingsToStorage(settings) {
  localStorage.setItem("settings_" + currentUserEmail, JSON.stringify(settings));
}

function getAllUsers() {
  const saved = localStorage.getItem("users");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

function saveAllUsers(users) {
  localStorage.setItem("users", JSON.stringify(users));
}


// ============================================
// PAGE NAVIGATION (no routing needed)
// ============================================

function showPage(pageName) {
  // hide both pages first
  document.getElementById("dashboard").classList.add("hidden");
  document.getElementById("settings").classList.add("hidden");

  // remove active class from all nav links
  const links = document.querySelectorAll(".nav-link");
  for (let i = 0; i < links.length; i++) {
    links[i].classList.remove("active");
  }

  // show the one we want
  document.getElementById(pageName).classList.remove("hidden");

  // highlight the right nav link
  if (pageName === "dashboard") {
    links[0].classList.add("active");
  } else {
    links[1].classList.add("active");
  }
}


// ============================================
// MODAL CONTROLS
// ============================================

function openModal() {
  editingId = null; // null means we are adding a new transaction, not editing one

  document.getElementById("modalTitle").innerText = "Add Transaction";
  document.getElementById("modalSaveBtn").innerText = "Save Transaction";

  // clear the form fields and set today's date
  document.getElementById("typeInput").value = "income";
  document.getElementById("descInput").value = "";
  document.getElementById("amountInput").value = "";
  document.getElementById("categoryInput").value = "Food & Dining";
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateInput").value = today;

  document.getElementById("formError").classList.add("hidden");
  document.getElementById("transactionModal").classList.remove("hidden");
}

function openEditModal(id) {
  const transactions = loadTransactions();
  const transaction = transactions.find(function (t) {
    return t.id === id;
  });

  if (!transaction) {
    return;
  }

  editingId = id; // remember which transaction we're editing

  document.getElementById("modalTitle").innerText = "Edit Transaction";
  document.getElementById("modalSaveBtn").innerText = "Update Transaction";

  // fill the form with the existing transaction's values
  document.getElementById("typeInput").value = transaction.type;
  document.getElementById("descInput").value = transaction.description;
  document.getElementById("amountInput").value = transaction.amount;
  document.getElementById("dateInput").value = transaction.date;
  document.getElementById("categoryInput").value = transaction.category;

  document.getElementById("formError").classList.add("hidden");
  document.getElementById("transactionModal").classList.remove("hidden");
}

function closeModal() {
  document.getElementById("transactionModal").classList.add("hidden");
  document.getElementById("formError").classList.add("hidden");
  editingId = null;

  // clear the form fields
  document.getElementById("descInput").value = "";
  document.getElementById("amountInput").value = "";
}

// closes the modal if you click the dark area outside the box
function closeModalOutside(event) {
  if (event.target.id === "transactionModal") {
    closeModal();
  }
}


// ============================================
// ADD / DELETE TRANSACTIONS
// ============================================

function saveTransaction() {
  const type = document.getElementById("typeInput").value;
  const description = document.getElementById("descInput").value.trim();
  const amount = document.getElementById("amountInput").value;
  const date = document.getElementById("dateInput").value;
  const category = document.getElementById("categoryInput").value;

  // basic validation - make sure nothing is empty
  if (description === "" || amount === "" || date === "" || amount <= 0) {
    document.getElementById("formError").classList.remove("hidden");
    return;
  }

  const transactions = loadTransactions();

  if (editingId === null) {
    // ---- ADD MODE ----
    const newTransaction = {
      id: Date.now(), // timestamp works fine as a unique id for this
      type: type,
      description: description,
      amount: parseFloat(amount),
      date: date,
      category: category
    };
    transactions.push(newTransaction);
  } else {
    // ---- EDIT MODE ----
    // find the transaction with the matching id and update its values
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id === editingId) {
        transactions[i].type = type;
        transactions[i].description = description;
        transactions[i].amount = parseFloat(amount);
        transactions[i].date = date;
        transactions[i].category = category;
        break;
      }
    }
  }

  saveTransactions(transactions);

  editingId = null;
  closeModal();
  refreshEverything();
}

function deleteTransaction(id) {
  let transactions = loadTransactions();
  transactions = transactions.filter(function (t) {
    return t.id !== id;
  });
  saveTransactions(transactions);
  refreshEverything();
}


// ============================================
// FILTERING
// ============================================

function filterTransactions(filterType, buttonEl) {
  currentFilter = filterType;

  // update which filter button looks active
  const buttons = document.querySelectorAll(".filter-btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("active");
  }
  buttonEl.classList.add("active");

  renderTable();
}


// ============================================
// CALCULATIONS
// ============================================

function calculateTotals(transactions) {
  let totalIncome = 0;
  let totalExpense = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income") {
      totalIncome += transactions[i].amount;
    } else {
      totalExpense += transactions[i].amount;
    }
  }

  return {
    income: totalIncome,
    expense: totalExpense,
    balance: totalIncome - totalExpense
  };
}

function formatMoney(amount) {
  const settings = getSettings();
  const symbol = currencySymbols[settings.currency] || "₹";
  return symbol + amount.toFixed(2);
}


// ============================================
// RENDER FUNCTIONS
// ============================================

function updateCards() {
  const transactions = loadTransactions();
  const totals = calculateTotals(transactions);

  document.getElementById("balanceValue").innerText = formatMoney(totals.balance);
  document.getElementById("incomeValue").innerText = formatMoney(totals.income);
  document.getElementById("expenseValue").innerText = formatMoney(totals.expense);
  document.getElementById("countValue").innerText = transactions.length;
}

function renderTable() {
  const transactions = loadTransactions();
  const tableBody = document.getElementById("transactionTableBody");
  const emptyMsg = document.getElementById("emptyMsg");

  // clear whatever is currently in the table
  tableBody.innerHTML = "";

  // apply the active filter
  let filtered = transactions;
  if (currentFilter === "income") {
    filtered = transactions.filter(function (t) { return t.type === "income"; });
  } else if (currentFilter === "expense") {
    filtered = transactions.filter(function (t) { return t.type === "expense"; });
  }

  if (filtered.length === 0) {
    emptyMsg.classList.remove("hidden");
  } else {
    emptyMsg.classList.add("hidden");
  }

  // newest transactions first
  filtered = filtered.slice().reverse();

  for (let i = 0; i < filtered.length; i++) {
    const t = filtered[i];

    const row = document.createElement("tr");

    const amountClass = t.type === "income" ? "amount-income" : "amount-expense";
    const amountSign = t.type === "income" ? "+" : "-";

    row.innerHTML =
      "<td>" + t.date + "</td>" +
      "<td>" + t.description + "</td>" +
      "<td>" + t.category + "</td>" +
      "<td class='" + amountClass + "'>" + amountSign + formatMoney(t.amount) + "</td>" +
      "<td class='action-cell'>" +
      "<button class='edit-btn' onclick='openEditModal(" + t.id + ")'>Edit</button>" +
      "<button class='delete-btn' onclick='deleteTransaction(" + t.id + ")'>Delete</button>" +
      "</td>";

    tableBody.appendChild(row);
  }
}

function renderChart() {
  const transactions = loadTransactions();

  // destroy old chart before making a new one, otherwise they stack
  if (cashFlowChart !== null) {
    cashFlowChart.destroy();
  }

  const labels = transactions.map(function (t) { return t.date; });
  const incomeData = transactions.map(function (t) {
    return t.type === "income" ? t.amount : 0;
  });
  const expenseData = transactions.map(function (t) {
    return t.type === "expense" ? t.amount : 0;
  });

  const ctx = document.getElementById("cashFlowChart").getContext("2d");

  cashFlowChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "#16a34a"
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "#dc2626"
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// the golden rule - call this after any data change
function refreshEverything() {
  updateCards();
  renderTable();
  renderChart();
}


// ============================================
// SETTINGS PAGE
// ============================================

function loadSettingsIntoForm() {
  const settings = getSettings();
  document.getElementById("displayName").value = settings.name;
  document.getElementById("currencySelect").value = settings.currency;
  document.getElementById("darkModeToggle").checked = settings.darkMode;
}

function saveSettings() {
  const name = document.getElementById("displayName").value.trim();
  const currency = document.getElementById("currencySelect").value;

  const settings = getSettings();
  settings.name = name;
  settings.currency = currency;

  saveSettingsToStorage(settings);
  refreshEverything();

  // update the welcome message in the navbar too
  document.getElementById("welcomeText").innerText = "Hi, " + (name || currentUserEmail);

  alert("Settings saved!");
}

function toggleDarkMode() {
  const isChecked = document.getElementById("darkModeToggle").checked;

  if (isChecked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }

  const settings = getSettings();
  settings.darkMode = isChecked;
  saveSettingsToStorage(settings);
}

function loadDarkModePreference() {
  const settings = getSettings();
  if (settings.darkMode) {
    document.body.classList.add("dark");
  }
}

function resetAllData() {
  const confirmed = confirm("Are you sure? This will delete everything and cannot be undone.");
  if (confirmed) {
    localStorage.removeItem("transactions");
    localStorage.removeItem("settings");
    location.reload();
  }
}


// ============================================
// LOGIN / REGISTER / LOGOUT
// ============================================

// switches between the login form and the register form
function switchAuthTab(tab) {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginTabBtn = document.getElementById("loginTabBtn");
  const registerTabBtn = document.getElementById("registerTabBtn");

  if (tab === "login") {
    loginForm.classList.remove("hidden");
    registerForm.classList.add("hidden");
    loginTabBtn.classList.add("active");
    registerTabBtn.classList.remove("active");
  } else {
    loginForm.classList.add("hidden");
    registerForm.classList.remove("hidden");
    loginTabBtn.classList.remove("active");
    registerTabBtn.classList.add("active");
  }
}

function registerUser() {
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim().toLowerCase();
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("registerConfirm").value;
  const errorMsg = document.getElementById("registerError");

  // basic validation
  if (name === "" || email === "" || password === "" || confirmPassword === "") {
    errorMsg.innerText = "Please fill in all fields.";
    errorMsg.classList.remove("hidden");
    return;
  }

  if (password !== confirmPassword) {
    errorMsg.innerText = "Passwords do not match.";
    errorMsg.classList.remove("hidden");
    return;
  }

  const users = getAllUsers();

  // check if this email is already registered
  const alreadyExists = users.some(function (u) {
    return u.email === email;
  });

  if (alreadyExists) {
    errorMsg.innerText = "An account with this email already exists.";
    errorMsg.classList.remove("hidden");
    return;
  }

  // save the new user
  users.push({ name: name, email: email, password: password });
  saveAllUsers(users);

  // also save their name as a setting so it shows up in Settings page later
  currentUserEmail = email;
  const settings = getSettings();
  settings.name = name;
  saveSettingsToStorage(settings);

  // log them straight in
  localStorage.setItem("currentUser", email);
  enterPortal();
}

function loginUser() {
  const email = document.getElementById("loginEmail").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value;
  const errorMsg = document.getElementById("loginError");

  const users = getAllUsers();

  const matchedUser = users.find(function (u) {
    return u.email === email && u.password === password;
  });

  if (!matchedUser) {
    errorMsg.classList.remove("hidden");
    return;
  }

  errorMsg.classList.add("hidden");
  currentUserEmail = email;
  localStorage.setItem("currentUser", email);
  enterPortal();
}

// runs every time someone enters the portal - after login, register, or page reload
function enterPortal() {
  document.getElementById("authPage").classList.add("hidden");
  document.getElementById("portal").classList.remove("hidden");

  loadDarkModePreference();
  loadSettingsIntoForm();
  refreshEverything();

  // show a little welcome message in the navbar
  const settings = getSettings();
  const displayName = settings.name || currentUserEmail;
  document.getElementById("welcomeText").innerText = "Hi, " + displayName;

  // set today's date as the default value in the add transaction form
  const today = new Date().toISOString().split("T")[0];
  document.getElementById("dateInput").value = today;
}

function logout() {
  const confirmed = confirm("Are you sure you want to log out?");
  if (confirmed) {
    localStorage.removeItem("currentUser");
    location.reload();
  }
}