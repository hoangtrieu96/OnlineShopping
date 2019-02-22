/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send a request to server to check if the session variable of customerID is set or not
* if set, then does not required customer to re-login
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
			RedirectToBuying2();
		}
	}
}

function SendRequest2() {
	xHRObject2.open("GET", "loginCheck.php?id=" + Number(new Date), true);
	xHRObject2.onreadystatechange = GetData2;
	xHRObject2.send(null);
}

function RedirectToBuying2() {
	document.getElementById("container").style.display = "none";
	window.location.assign("buying.html");
}
