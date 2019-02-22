/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: has 4 server requests for different purposes
* request 1: retrieve a list of items for sale
* request 2: perform adding items to cart, update goods.xml in server
* request 3: perform removing items from cart, update goods.xml in server
* request 4: either performing confirm purchase or cancel purchase, update goods.xmls in server
*/

window.onload = SendRequest;

// This first request send to buying.php to get the list of available item in goods.xml every fixed second

var xHRObject = false;

if (window.XMLHttpRequest) {
	xHRObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData() {
	if ((xHRObject.readyState == 4) && (xHRObject.status == 200)) {
		var responseDoc = xHRObject.responseText;
		var itemList = document.getElementById("itemList");
		itemList.innerHTML = responseDoc;
	}
}

function SendRequest() {
	xHRObject.open("GET", "buying.php?id=" + Number(new Date), true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);

	// Update item list
	setTimeout("SendRequest()", 5000);
}

function AddItem(anItem) {
	var itemNumber = anItem.getAttribute('id');
	SendRequest2(itemNumber);
	document.getElementById("finalPurchaseMsg").innerHTML = '';
}

// The second request functions are used to send request to another server buyingAdd.php
// To check if item is in-stock

var xHRObject2 = false;

if (window.XMLHttpRequest) {
	xHRObject2 = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject2 = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData2() {
	if ((xHRObject2.readyState == 4) && (xHRObject2.status == 200)) {
		var responseDoc = xHRObject2.responseText;
		var responses = responseDoc.split(';');
		var tbody = document.getElementById("itemCart");

		var itemNumber = responses[1];
		var itemName = responses[2];
		var itemPrice = responses[3];

		var itemInCart = false;

		if (responses[0] != "OK") {
			alert("Sorry, this item is not available for sale!");
		} else {
			var itemNumberArray = document.getElementsByClassName("cartItemNumber");
			// Check if item is already in cart or not
			if (itemNumberArray.length > 0) {
				for (i = 0; i < itemNumberArray.length; i++) {
					if (itemNumberArray[i].innerHTML == itemNumber) {
						// Get the second last <td> in that <tr>, which is itemQty
						var currentQty = itemNumberArray[i].parentElement.lastChild.previousSibling.innerHTML;
						// Increment the qty by 1
						var newQty = parseInt(currentQty) + 1;
						// Update the qty in html
						itemNumberArray[i].parentElement.lastChild.previousSibling.innerHTML = newQty;

						itemInCart = true;
						break;
					}
				}
			}
			// If item not in cart then create a new row and add item
			if (itemInCart == false) {
				var row = document.createElement('tr');

				var cell = document.createElement('td');
				cell.setAttribute("class", "cartItemNumber");
				var text = document.createTextNode(itemNumber);
				cell.appendChild(text);

				var cell2 = document.createElement('td');
				var text2 = document.createTextNode(itemName);
				cell2.appendChild(text2);

				var cell3 = document.createElement('td');
				var text3 = document.createTextNode(itemPrice);
				cell3.appendChild(text3);

				var cell4 = document.createElement('td');
				var text4 = document.createTextNode('1');
				cell4.appendChild(text4);

				var cell5 = document.createElement('td');
				var removeBtn = document.createElement('button');
				removeBtn.setAttribute("type", "button");
				removeBtn.setAttribute("class", "btn btn-default");
				removeBtn.setAttribute("onclick", "RemoveItem(this)");
				var text5 = document.createTextNode("Remove 1 item from cart");
				removeBtn.appendChild(text5);
				cell5.appendChild(removeBtn);

				row.appendChild(cell);
				row.appendChild(cell2);
				row.appendChild(cell3);
				row.appendChild(cell4);
				row.appendChild(cell5);
				tbody.appendChild(row);
			}

			CalculateTotal();
		}
	}
}

function SendRequest2(itemNumber) {
	xHRObject2.open("GET", "buyingAdd.php?id=" + Number(new Date) + "&itemNumber=" + itemNumber, true);
	xHRObject2.onreadystatechange = GetData2;
	xHRObject2.send(null);
}

function RemoveItem(anItem) {
	var itemNumber = anItem.parentElement.parentElement.firstChild.innerHTML;

	SendRequest3(itemNumber);
	// Remove item by 1 from cart
	var itemNumberArray = document.getElementsByClassName("cartItemNumber");
	if (itemNumberArray.length > 0) {
		for (i = 0; i < itemNumberArray.length; i++) {
			if (itemNumberArray[i].innerHTML == itemNumber) {
				// Get the second last <td> in that <tr>, which is itemQty
				var currentQty = itemNumberArray[i].parentElement.lastChild.previousSibling.innerHTML;
				// Decrement the qty by 1
				var newQty = parseInt(currentQty) - 1;
				// Check if qty = 0 or not
				// If qty = 0, then remove this item from cart
				if(newQty == 0) {
					var currentRow = itemNumberArray[i].parentElement;
					document.getElementById("itemCart").removeChild(currentRow);
				} else {
					// Update the html
					itemNumberArray[i].parentElement.lastChild.previousSibling.innerHTML = newQty;
				}
				break;
			}
		}
	}

	CalculateTotal();
}

// This third request will be sent to buyingRemove.php to update the goods.xml after users remove an item from cart

var xHRObject3 = false;

if (window.XMLHttpRequest) {
	xHRObject3 = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject3 = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData3() {
	if ((xHRObject3.readyState == 4) && (xHRObject3.status == 200)) {
		var responseDoc = xHRObject3.responseText;
		//alert(responseDoc);
	}
}

function SendRequest3(itemNumber) {
	xHRObject3.open("GET", "buyingRemove.php?id=" + Number(new Date) + "&itemNumber=" + itemNumber, true);
	xHRObject3.onreadystatechange = GetData3;
	xHRObject3.send(null);
}

function CalculateTotal() {
	var total = 0;
	var totagTag = document.getElementById("total");

	// Get item number <td> of all items in cart
	var itemNumberArray = document.getElementsByClassName("cartItemNumber");
	for (i = 0; i < itemNumberArray.length; i++) {
		var aItemQty = itemNumberArray[i].parentElement.lastChild.previousSibling.innerHTML;
		var aItemPrice = itemNumberArray[i].nextElementSibling.nextElementSibling.innerHTML;
		total += parseInt(aItemQty) * parseFloat(aItemPrice);
	}

	// Update total to html
	totagTag.innerHTML = total;
}

// This part is about Confirm and Cancel purchase
// Both action will be sent to the same php server named buyingAction.php
var totalPay = 0; // for display total pay price

function PurchaseAction(action) {
	totalPay = document.getElementById("total").innerHTML;
	SendRequest4(action);
	ClearCart();
}

// Clear cart function
// Clear all items in cart after confirm or cancel purchase
function ClearCart() {
	// Clear total amount to pay
	document.getElementById("total").innerHTML = '0';
	// Get all items in cart
	var cart = document.getElementById("itemCart");
	var allItems = cart.getElementsByTagName('tr');
	var row;
	// Delete all row in tbody
	for (row in allItems) {
		cart.deleteRow(row.rowIndex);
	}
}

// This four request will be sent to buyingAction.php to update the goods.xml after users confirm or cancel the purchase

var xHRObject4 = false;

if (window.XMLHttpRequest) {
	xHRObject4 = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	xHRObject4 = new ActiveXObject("Microsoft.XMLHTTP");
}

function GetData4() {
	if ((xHRObject4.readyState == 4) && (xHRObject4.status == 200)) {
		var responseDoc = xHRObject4.responseText;
		var purchaseMsgTag = document.getElementById("finalPurchaseMsg");
		if (responseDoc == "confirm") {
			purchaseMsgTag.innerHTML = "Your purchase has been confirmed and total amount due to pay is $" + totalPay + ".";
		} else {
			purchaseMsgTag.innerHTML = "Your purchase request has been cancelled, welcome to shop next time!"
		}
	}
}

function SendRequest4(action) {
	xHRObject4.open("GET", "buyingAction.php?id=" + Number(new Date) + "&action=" + action, true);
	xHRObject4.onreadystatechange = GetData4;
	xHRObject4.send(null);
}
