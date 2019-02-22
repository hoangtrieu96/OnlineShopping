/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send managers credentials to server for validation and checks again with manager's credentials in database (xml file in this case)
* If login successfully, hide the login form in mlogin.html and display appropriate manager function pages
*/
var xHRObject = false;

if (window.XMLHttpRequest) {
	xHRObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData() {
	if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
		var responseDoc = xHRObject.responseXML;
		// Get the error span tag of all fields
		var usernameErr = document.getElementById("usernameErr");
		var pwordErr = document.getElementById("pwordErr");
		var errMsg = document.getElementById("errMsg");
		var successLogin = document.getElementById("successLogin");
		// Set value to those span tag if xml has
		if (window.ActiveXObject) {
			usernameErr.innerHTML = responseDoc.getElementsByTagName("username")[0].text;
			pwordErr.innerHTML = responseDoc.getElementsByTagName("pword")[0].text;
			if (responseDoc.getElementsByTagName("message")[0].text != "OK") {
				errMsg.innerHTML = responseDoc.getElementsByTagName("message")[0].text;
			} else {
				errMsg.innerHTML = "";
				ShowManagerFeatures();
			}
		} else {
			usernameErr.innerHTML = responseDoc.getElementsByTagName("username")[0].textContent;
			pwordErr.innerHTML = responseDoc.getElementsByTagName("pword")[0].textContent;
			if (responseDoc.getElementsByTagName("message")[0].textContent != "OK") {
				errMsg.innerHTML = responseDoc.getElementsByTagName("message")[0].textContent;
			} else {
				errMsg.innerHTML = "";
				ShowManagerFeatures();
			}
		}
	}
}

function SendRequest() {
	var username = document.getElementById("username").value;
	var pword = document.getElementById("pword").value;

	xHRObject.open("GET", "mlogin.php?id=" + Number(new Date) + "&username=" + username + "&pword=" + pword, true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);
}

function ShowManagerFeatures() {

	var loginBlock = document.getElementById("loginBlock");
	var featureTag1 = document.getElementById("feature1");
	var featureTag2 = document.getElementById("feature2");
	var featureTag3 = document.getElementById("feature3");

	loginBlock.style.display = "none";

	// Show listing.html and processing.html to manager
	var elementA1 = document.createElement('a');
	var textA1 = document.createTextNode("Listing");
	elementA1.setAttribute('href', 'listing.html');
	elementA1.appendChild(textA1);

	var elementA2 = document.createElement('a');
	var textA2 = document.createTextNode("Processing");
	elementA2.setAttribute('href', 'processing.html');
	elementA2.appendChild(textA2);

	var elementA3 = document.createElement('a');
	var textA3 = document.createTextNode("Log out");
	elementA3.setAttribute('href', 'logout.html');
	elementA3.appendChild(textA3);

	featureTag1.appendChild(elementA1);
	featureTag2.appendChild(elementA2);
	featureTag3.appendChild(elementA3);
}
