const BACKEND_URL = "http://localhost:3000";

const loginSection = document.getElementById("login-section");
const contentSection = document.getElementById("content-section");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginBtn = document.getElementById("login");
const loginStatus = document.getElementById("login-status");
const loggedUserSpan = document.getElementById("logged-user");

const titleInput = document.getElementById("title");
const linkInput = document.getElementById("link");
const typeSelect = document.getElementById("type");
const submitBtn = document.getElementById("submit");
const statusText = document.getElementById("status");

function checkLogin() {
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  if (token && username) {
    loginSection.classList.add("hidden");
    contentSection.classList.remove("hidden");
    loggedUserSpan.textContent = username;
  } else {
    loginSection.classList.remove("hidden");
    contentSection.classList.add("hidden");
  }
}

loginBtn.addEventListener("click", async () => {
  const username = usernameInput.value;
  const password = passwordInput.value;

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error("Invalid login");
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", username);
    checkLogin();
  } catch (err) {
    loginStatus.textContent = "Login failed. Check credentials.";
  }
});

submitBtn.addEventListener("click", async () => {
  const title = titleInput.value;
  const link = linkInput.value;
  const type = typeSelect.value;
  const token = localStorage.getItem("token");

  if (!title || !link || !type || !token) {
    statusText.textContent = "Please fill in all fields.";
    return;
  }

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/content`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ title, link, type }),
    });

    if (!res.ok) throw new Error("Upload failed");

    titleInput.value = "";
    linkInput.value = "";
    statusText.textContent = "Content added!";
    statusText.classList.add("success");
  } catch (err) {
    statusText.textContent = "Failed to add content.";
  }
});

checkLogin();
