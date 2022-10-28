let form = document.getElementById("login-form");
let api = "http://127.0.0.1:3800";
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let email = form.email.value;
  let password = form.password.value;
  //validate client
  // Tự làm

  // Coi như đã validate xong ở client
  let data = { email, password };
  fetch(api + "/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === "success") {
        window.location.href = "/";
      }
    })
    .catch((err) => console.log(err));
});



// Pagination

// current page index (dang o trang bao nhieu)
// page size (co bao nhieu ban ghi o trang do)