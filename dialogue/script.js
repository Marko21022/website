const dialogues = [
  "👋 | Hello! I am {name}, part of {rank} team in WSRP. How can I assist you today? If I am late, say 'void'.",
  "⚠️ | Please send your proof over to report proof channel. If you do not have video proof or at least 3 witnesses, we can not do anything.",
  "You will be warned for RDM.",
  "You will be kicked for Mass RDM",
  "You will be warned for VDM",
  "You will be kicked for Mass VDM",
  "You will be warned for GTAD",
  "You will be kicked for Mass GTAD",
  "You will be warned for FailRP",
  "You will be kicked for Mass FailRP",
  "You will be banned for NITRP",
  "You will be banned for RTAP",
  "❔ | Anything else I can help you with today?",
  "❤️ | Have a fun and immersive roleplay experience here at WSRP!",
  "📶 | If you need anything else, make sure to call !mod. Please rate me in our comms. Goodbye!"
];

const encodedPasswordArray = [87, 83, 82, 80, 50, 48, 50, 53];
function decodePassword(encodedArray) {
  return String.fromCharCode(...encodedArray);
}

function checkPassword() {
  const input = document.getElementById("loginInput").value;
  const errorText = document.getElementById("loginError");

  // Decode the password and compare
  if (decodePassword(encodedPasswordArray) === input) {
    document.getElementById("loginScreen").style.display = "none";
  } else {
    errorText.textContent = "Incorrect password.";
  }
}

function generateDialogues() {
  const name = document.getElementById('nameInput').value.trim();
  const rank = document.getElementById('rankSelect').value;
  const container = document.getElementById('dialoguesContainer');
  const button = document.getElementById('generate');
  button.style.transition = "all .2s ease-in-out";

  if (!rank) {
    showToast("Please select the rank.");
    return;
  }
  if (!name) {
    showToast("Please enter the name.");
    button.style.filter = "blur(1px)";
    setTimeout(() => button.style.filter = "blur(0)", 3000);
    return;
  }

  // Save to localStorage
  localStorage.setItem("savedName", name);
  localStorage.setItem("savedRank", rank);

  container.innerHTML = '';

  dialogues.forEach(template => {
    const text = template.replace(/{name}/g, name).replace(/{rank}/g, rank);
    const div = document.createElement('div');
    div.className = 'dialogue';
    div.innerHTML = `
      ${text}
      <button class="copy-btn" onclick="copyText(\`${text}\`)">Copy</button>
    `;
    container.appendChild(div);
  });
}

function copyText(text) {
  navigator.clipboard.writeText(text)
    .then(() => showToast("Copied!"))
    .catch(() => showToast("Failed to copy!"));
}

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// Autofill name and rank if saved
window.onload = () => {
  const savedName = localStorage.getItem("savedName");
  const savedRank = localStorage.getItem("savedRank");

  if (savedName) document.getElementById('nameInput').value = savedName;
  if (savedRank) document.getElementById('rankSelect').value = savedRank;
};
