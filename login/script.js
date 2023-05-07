const email = document.querySelector("#email");
const password = document.querySelector("#password");
const errorMessage = document.querySelector(".errorMessage");
const successMessage = document.querySelector(".successMessage");
const form = document.querySelector("#form");

const allUser = JSON.parse(localStorage.getItem("allUser"));
let currUser = {};

console.log("Inside login script");
form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (email.value.trim() === "" || password.value.trim() === "") {
		errorMessage.innerText = "Please fill all the fields";
	} else {
		allUser.forEach((user) => {
			if (user.email === email.value) {
				console.log("Email matched", user);
				if (user.password === password.value) {
					currUser = {
						firstName: user.firstName,
						lastName: user.lastName,
						email: user.email,
						password: user.password,
						token: generateToken(),
					};

					localStorage.setItem("currUser", JSON.stringify(currUser));
					form.reset();

					setTimeout(() => {
						location.href = "../shop/index.html";
					}, 500);
				} else {
					errorMessage.innerText = "Email/Password are not correct";
				}
			}
		});
	}
});

function generateToken() {
	let token = "";
	let chars =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789*-+/;@#$%^&";
	for (let i = 0; i < 16; i++) {
		token += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return token;
}
