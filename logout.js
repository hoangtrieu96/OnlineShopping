/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send logout request of manager to server and retrieve the managerID from server
*/
window.onload = SendRequest;

var xHRObject = false;

if (window.XMLHttpRequest) {
	xHRObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData() {
	if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
		var responseDoc = xHRObject.responseText;
		var logoutMsg = document.getElementById("logoutMsg");
		logoutMsg.innerHTML = responseDoc + "!";
	}
}

function SendRequest() {
	xHRObject.open("GET", "logout.php?id=" + Number(new Date), true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);
}
