/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send user's login information to server to validate and display error messages if any
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
		// Set value to those span tag if xml has
		if (window.ActiveXObject) {
			usernameErr.innerHTML = responseDoc.getElementsByTagName("username")[0].text;
			pwordErr.innerHTML = responseDoc.getElementsByTagName("pword")[0].text;
			if (responseDoc.getElementsByTagName("message")[0].text != "OK") {
				errMsg.innerHTML = responseDoc.getElementsByTagName("message")[0].text;
			} else {
				errMsg.innerHTML = "";
				RedirectToBuying();
			}
		} else {
			usernameErr.innerHTML = responseDoc.getElementsByTagName("username")[0].textContent;
			pwordErr.innerHTML = responseDoc.getElementsByTagName("pword")[0].textContent;
			if (responseDoc.getElementsByTagName("message")[0].textContent != "OK") {
				errMsg.innerHTML = responseDoc.getElementsByTagName("message")[0].textContent;
			} else {
				errMsg.innerHTML = "";
				RedirectToBuying();
			}
		}
	}
}

function SendRequest() {
	var username = document.getElementById("username").value;
	var pword = document.getElementById("pword").value;

	xHRObject.open("GET", "login.php?id=" + Number(new Date) + "&username=" + username + "&pword=" + pword, true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);
}

function RedirectToBuying() {
	window.location.assign("buying.html");
}
