$(document).ready(function () {
  $("#delete").click(function () {
    const username = $("#username").html().trim();
    $.ajax({
      type: "POST",
      url: "/delete",
      data: { username: username },
      dataType: "json",
      success: function (response) {
        if (response.message === "deleted") {
          window.location.replace("/");
        }
      },
    });
  });

  //   // $('#update').click(function () {
  //   //   const oldUsername = $("#username").html().trim();
  //   //   const firstname=$('#user-fname').val();
  //   //   const lastname=$('#user-lname').val();
  //   //   const username=$('#user-username').val();
  //   //   const password=$('#user-password').val();
  //   //   $.ajax({
  //   //     type: "POST",
  //   //     url: "/update",
  //   //     data: { firstname:firstname, lastname:lastname,oldUsername:oldUsername, username:username, password:password},
  //   //     dataType: "json",
  //   //   });
  //   // });
  // });
});
