/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send item's input to server for validation and add it to the database (xml file in this case)
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
		var itemNameErr = document.getElementById("itemNameErr");
		var itemPriceErr = document.getElementById("itemPriceErr");
		var itemQtyErr = document.getElementById("itemQtyErr");
		var itemDescErr = document.getElementById("itemDescErr");
		var successMsg = document.getElementById("successMsg");

		// Set value to those span tag if xml has
		if (window.ActiveXObject) {
			itemNameErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemName")[0].text;
			itemPriceErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemPrice")[0].text;
			itemQtyErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemQty")[0].text;
			itemDescErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemDesc")[0].text;
			if (responseDoc.getElementsByTagName("complete")[0].text == "OK") {
				successMsg.innerHTML = "Add item successfully.";
				Reset();
			}
		} else {
			itemNameErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemName")[0].textContent;
			itemPriceErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemPrice")[0].textContent;
			itemQtyErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemQty")[0].textContent;
			itemDescErr.innerHTML = "* " + responseDoc.getElementsByTagName("itemDesc")[0].textContent;
			if (responseDoc.getElementsByTagName("complete")[0].textContent == "OK") {
				successMsg.innerHTML = "Add item successfully.";
				Reset();
			}
		}
	}
}

function SendRequest() {
	var itemName = document.getElementById("itemName").value;
	var itemPrice = document.getElementById("itemPrice").value;
	var itemQty = document.getElementById("itemQty").value;
	var itemDesc = document.getElementById("itemDesc").value;

	xHRObject.open("GET", "listing.php?id=" + Number(new Date) + "&itemName=" + itemName + "&itemPrice=" + itemPrice + "&itemQty=" + itemQty + "&itemDesc=" + itemDesc, true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);
}

function Reset() {
	document.getElementById("itemName").value = '';
	document.getElementById("itemPrice").value = '';
	document.getElementById("itemQty").value = '';
	document.getElementById("itemDesc").value = '';
}
