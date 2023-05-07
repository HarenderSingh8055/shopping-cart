const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirmPassword");
const errorMessage = document.querySelector(".errorMessage");
const successMessage = document.querySelector(".successMessage");
const form = document.querySelector("#form");


let allUser = [];
let count = 0;

if (localStorage.getItem("allUser")) {
	allUser = JSON.parse(localStorage.getItem("allUser"));
	count = allUser[allUser.length - 1].id;
	// console.log(count)
}

form.addEventListener("submit", (e) => {
	e.preventDefault();

	if (allUser) {
		for (let user of allUser) {
			if (user.email === email.value) {
				console.log("Inside for llopp");
				errorMessage.innerText = "Email already exists";
				return;
			}
		}
	}

	if (
		firstName.value.trim() === "" ||
		lastName.value.trim() === "" ||
		email.value.trim() === "" ||
		password.value.trim() === "" ||
		confirmPassword.value.trim() === ""
	) {
		errorMessage.innerText = "Please fill all the fields";
	} else if (password.value.trim() != confirmPassword.value.trim()) {
		errorMessage.innerText = "Your password and confirm password are not same";
	} else {
		count++;
		errorMessage.innerText = "";
		successMessage.innerText = "You have successfully signed up";

		let newUser = {
			id: count,
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			password: password.value,
		};
		allUser.push(newUser);
		console.log(allUser);
		form.reset();

		localStorage.setItem("allUser", JSON.stringify(allUser));
		setTimeout(() => {
			location.href = "../login/index.html";
		}, 500);
	}

	console.log(allUser);
});
