let form = document.querySelector("form");
let username = document.querySelector("#name");
let role = document.querySelector("#role");
let bio = document.querySelector("#bio");
let photo = document.querySelector("#photo");

const userManager = {
  users: [],

  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();
    this.addUser();
  },

  addUser: function () {
    // Check karein ke fields khali na hon
    if (!username.value || !photo.value) return alert("Please fill the name and photo link!");

    this.users.push({
      id: Date.now(),
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value,
    });

    form.reset();
    this.renderUi();
  },

  removeUser: function (id) {
    this.users = this.users.filter((user) => user.id !== id);
    this.renderUi();
  },

  renderUi: function () {
    const container = document.querySelector(".users");
    if (!container) return; // Check if container exists
    
    container.innerHTML = "";

    // IMPORTANT: Arrow function (user) => use karna zaroori hai
    this.users.forEach((user) => {
      const card = document.createElement("div");
      card.className =
        "bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition m-4";

      const img = document.createElement("img");
      img.className = "w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow";
      img.src = user.photo;
      card.appendChild(img);

      const name = document.createElement("h2");
      name.className = "text-2xl font-bold mb-1 text-blue-700";
      name.textContent = user.username;
      card.appendChild(name);

      const roleDisplay = document.createElement("p");
      roleDisplay.className = "text-purple-500 mb-2 font-medium";
      roleDisplay.textContent = user.role;
      card.appendChild(roleDisplay);

      const desc = document.createElement("p");
      desc.className = "text-gray-700 text-center mb-4";
      desc.textContent = user.bio;
      card.appendChild(desc);

      // Remove Button logic
      const removeBtn = document.createElement("button");
      removeBtn.className = "mt-auto bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition";
      removeBtn.textContent = "Remove";
      
      // 'this' yahan userManager ko point karega kyunke hum arrow function mein hain
      removeBtn.onclick = () => this.removeUser(user.id);
      
      card.appendChild(removeBtn);
      container.appendChild(card);
    });
  },
};

userManager.init();