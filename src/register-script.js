const form = document.getElementById("login-form");
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent the form from reloading the page
  const formData = new FormData(form); // Get the form data
  const data = {}; // Convert the form data to a JavaScript object
  for (const [key, value] of formData.entries()) {
    data[key] = value;
  }
  console.log(data);

  if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(data.password)) {
    console.log("test true");
    document.querySelector("#username").value = "";
    document.querySelector("#password").value = "";

    fetch("/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => {
      console.error("POINTLESS error: ", err);
    });
  } else {
    console.log("test false");
    document.querySelector(".disclaimer-invalid-password").style.display =
      "block";
  } 
});
