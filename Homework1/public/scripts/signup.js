const form = document.getElementById("form");
const fname = document.getElementById("fname");
const lname = document.getElementById("lname");
const gender = document.getElementsByName("gender");
const username = document.getElementById("username");
const password = document.getElementById("password");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    let result = checkInputs();

    if (result.message === 'pass') {
        $.ajax({
            type: "POST",
            url: "/signup/add",
            data: result,
            dataType: "json",
            success: function (response) {
                if (response.message === 'pass') {
                    window.location.replace("/");
                }
                else {
                    setErrorFor(username, "Username already exists");
                }
            }
        });
    }
});

function checkInputs() {
    // trim to remove the whitespaces
    let fnameResult, lnameResult, usernameResult, passwordResult;
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    let genderValue;
    if (gender[0].checked) {
        genderValue = gender[0].value;
    } else if (gender[1].checked) {
        genderValue = gender[1].value;
    } else {
        genderValue = "empty";
    }
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();

    if (usernameValue === "") {
        setErrorFor(username, "Username cannot be blank");
        usernameResult = false;
    } else {
        setSuccessFor(username);
        usernameResult = true;
    }

    if (passwordValue === "") {
        setErrorFor(password, "Password cannot be blank");
        passwordResult = false;
    } else if (!isPassword(passwordValue)) {
        setErrorFor(password, "pattern");
        passwordResult = false;
    } else {
        setSuccessFor(password);
        passwordResult = true;
    }

    if (fnameValue === "") {
        setErrorFor(fname, "Firstname cannot be blank");
        fnameResult = false;
    } else {
        setSuccessFor(fname);
        fnameResult = true;
    }

    if (lnameValue === "") {
        setErrorFor(lname, "Lastname cannot be blank");
        lnameResult = false;
    } else {
        setSuccessFor(lname);
        lnameResult = true;
    }
    if (
        fnameResult === true &&
        lnameResult === true &&
        usernameResult === true &&
        passwordResult === true
    ) {
        return {
            fname: fnameValue,
            lname: lnameValue,
            gender: genderValue,
            username: usernameValue,
            password: passwordValue,
            message: "pass",
        };
    } else {
        return { message: "fail" };
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function isPassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
}
