/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send two request to server
* first request: ask for item list with non-zero sold quantity and display it to processing.html
* second request: send to server to perform the item processing in server-side
*/

window.onload = SendRequest;

var xHRObject = false;

// This first request will be sent to processingShow.php to get the list of sold items

if (window.XMLHttpRequest) {
	xHRObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData() {
	if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
		var responseDoc = xHRObject.responseText;
		var itemListTag = document.getElementById("itemList");
		// Receive the html from xslt and display to manager
		itemListTag.innerHTML = responseDoc;
	}
}

function SendRequest() {
	xHRObject.open("GET", "processingShow.php?id=" + Number(new Date), true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);
}

// This second request will be sent to processing.php when performed item processing
// to process item with sold quantities greater than 0

var xHRObject2 = false;

if (window.XMLHttpRequest) {
	xHRObject2 = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject2 = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData2() {
	if ((xHRObject2.readyState == 4) && (xHRObject2.status == 200)) {
		var responseDoc = xHRObject2.responseText;
		//alert(responseDoc);

		// Update the list after performed item processing
		SendRequest();
	}
}

function SendRequest2() {
	xHRObject2.open("GET", "processing.php?id=" + Number(new Date), true);
	xHRObject2.onreadystatechange = GetData2;
	xHRObject2.send(null);
}
