$(document).ready(function () {
  const form = document.getElementById("form");
  const fname = document.getElementById("fname");
  const lname = document.getElementById("lname");
  const username = document.getElementById("username");
  const password = document.getElementById("password");

  form.addEventListener("submit", (e) => {
    // e.preventDefault();

    checkInputs();
  });

  function checkInputs() {
    let usernameResult = true,
      passwordResult = true,
      firstnameResult = true,
      lastnameResult = true;
    // trim to remove the whitespaces
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    let answer;
    $.ajax({
      type: "POST",
      url: "/register/username",
      data: { usernameValue },
      dataType: "json",
      success: function (data, status) {
        // success callback function
        answer = data.message;
      },
      error: function (jqXhr, textStatus, errorMessage) {
        console.log(errorMessage);
      },
    });

    if (usernameValue === "") {
      setErrorFor(username, "Username cannot be blank");
      usernameResult = false;
    } else if (usernameValue.length < 2) {
      setErrorFor(username, "At least 2 characters must be provided");
      usernameResult = false;
    } else if (answer === "fail") {
      setErrorFor(username, "Username already exists");
      usernameResult = false;
    } else {
      setSuccessFor(username);
    }

    if (fnameValue === "") {
      setErrorFor(fname, "Firstname cannot be blank");
      firstnameResult = false;
    } else if (fnameValue.length < 2) {
      setErrorFor(fname, "At least 2 characters must be provided");
      firstnameResult = false;
    } else if (fnameValue.length > 30) {
      setErrorFor(fname, "At most 30 characters must be provided");
      firstnameResult = false;
    } else {
      setSuccessFor(fname);
    }

    if (lnameValue === "") {
      setErrorFor(lname, "Lastname cannot be blank");
      lastnameResult = false;
    } else if (lnameValue.length < 2) {
      setErrorFor(lname, "At least 2 characters must be provided");
      lastnameResult = false;
    } else if (lnameValue.length > 30) {
      setErrorFor(lname, "At most 30 characters must be provided");
      lastnameResult = false;
    } else {
      setSuccessFor(lname);
    }

    if (passwordValue === "") {
      setErrorFor(password, "Password cannot be blank");
      passwordResult = false;
    } else if (!isPassword(passwordValue)) {
      setErrorFor(password, "Min 8 chars, one capital and one small");
      passwordResult = false;
    } else {
      setSuccessFor(password);
    }

    // let check = [
    //   usernameResult,
    //   passwordResult,
    //   firstnameResult,
    //   lastnameResult,
    // ];
    // if (
    //   check[0] === true &&
    //   check[1] === true &&
    //   check[2] === true &&
    //   check[3] === true
    // ) {
    //   $.ajax({
    //     type: "POST",
    //     url: "/register/save",
    //     data: {
    //       fname: fnameValue,
    //       lname: lnameValue,
    //       gender: "male",
    //       username: usernameValue,
    //       password: passwordValue,
    //     },
    //     success: function (response) {
    //       console.log(response);
    //     },
    //   });
    // }
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
});
