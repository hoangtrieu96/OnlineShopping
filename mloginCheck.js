/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send a request to server to check if session variable of managerID is set or not
* if yes then display manager's function pages without required to re-login
*/

window.onload = SendRequest2;

var xHRObject2 = false;

if (window.XMLHttpRequest) {
	xHRObject2 = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject2 = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData2() {
	if ((xHRObject2.readyState == 4) && (xHRObject2.status == 200)) {
		var responseDoc2 = xHRObject2.responseText;
		if (responseDoc2 == "true") {
			ShowManagerFeatures2();
		}
	}
}

function SendRequest2() {
	xHRObject2.open("GET", "mloginCheck.php?id=" + Number(new Date), true);
	xHRObject2.onreadystatechange = GetData2;
	xHRObject2.send(null);
}

function ShowManagerFeatures2() {

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
