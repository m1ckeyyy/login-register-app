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

	// Send a POST request to the server with the form data
	fetch("/login", {
		method: "POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((response) => response.json())
		.then((result) => {
			// Do something with the result
		})
		.catch((err) => {
			console.error("error: ", err);
		});
});
