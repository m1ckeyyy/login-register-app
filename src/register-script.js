const form = document.getElementById("login-form");
form.addEventListener("submit", (event) => {
	event.preventDefault(); // Prevent the form from reloading the page
	const formData = new FormData(form); // Get the form data
	const data = {}; // Convert the form data to a JavaScript object
	for (const [key, value] of formData.entries()) {
		data[key] = value;
	}
	console.log(data);
	document.querySelector("#username").value = "";
	document.querySelector("#password").value = "";
	//add conditions for username and password
	//login min length 5
	//password min length 8
	//
	// Send a POST request to the server with the form data
	fetch("/register", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	}).catch((err) => {
		console.error("POINTLESS error: ", err);
	});
});
