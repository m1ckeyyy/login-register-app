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
	// Send a POST request to the server with the form data
	fetch("/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => (window.location = response.url))
		.catch((err) => {
			console.error("POINTLESS error: ", err);
		});
});
