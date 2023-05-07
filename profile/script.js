const firstName = document.querySelector("#firstName");
const lastName = document.querySelector("#lastName");
const password = document.querySelector("#password");
const newPassword = document.querySelector("#newPassword");
const confirmNewPassword = document.querySelector("#confirmNewPassword");
const saveInfoBtn = document.querySelector("#saveInfoBtn");
const changePasswordBtn = document.querySelector("#changePasswordBtn");
const logout = document.querySelector("#logout");

const errorMessage = document.querySelector(".errorMessage");
const successMessage = document.querySelector(".successMessage");
const successMessagePass = document.querySelector(".successMessagePass");

const allUser = JSON.parse(localStorage.getItem("allUser"));
const currUser = JSON.parse(localStorage.getItem("currUser"));

firstName.value = currUser.firstName;
lastName.value = currUser.lastName;

saveInfoBtn.addEventListener("click", () => {
    currUser.firstName = firstName.value;
    currUser.lastName = lastName.value;

    allUser.forEach((user) => {
        if (user.email === currUser.email) {
            user.firstName = firstName.value;
            user.lastName = lastName.value;
        }
    });

    console.log(allUser);
    console.log(currUser);

    localStorage.setItem("allUser", JSON.stringify(allUser));
    localStorage.setItem("currUser", JSON.stringify(currUser));
    setTimeout(() => {
        successMessage.innerText = "Your infrmation is saved";
    }, 100);
});

changePasswordBtn.addEventListener("click", () => {
    if (currUser.password === password.value) {
        if (newPassword.value === confirmNewPassword.value) {
            currUser.password = newPassword.value;

            allUser.forEach((user) => {
                if (user.email === currUser.email) {
                    user.password = newPassword.value;
                }
            });

            localStorage.setItem("allUser", JSON.stringify(allUser));
            localStorage.setItem("currUser", JSON.stringify(currUser));

            successMessagePass.innerText = "Your password has changed";
            errorMessage.innerText = "";
        } else {
            errorMessage.innerText = "Your new pass and confirm new pass didn't matched";
        }
    } else {
        errorMessage.innerText = "Your old password is not correct";
    }
});

logout.addEventListener("click", () => {
    localStorage.removeItem("currUser");
    location.href = "../index.html";
});
