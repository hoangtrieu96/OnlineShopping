/*
@student name: Trieu Hoang Nguyen
@student id: 100031534
@main function: send users input of register.html to server for validations and add to database
* also display appropriate error or success messages (received from server) to users
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
		var emailErr = document.getElementById("emailErr");
		var fnameErr = document.getElementById("fnameErr");
		var lnameErr = document.getElementById("lnameErr");
		var pwordErr = document.getElementById("pwordErr");
		var cpwordErr = document.getElementById("cpwordErr");
		var phoneErr = document.getElementById("phoneErr");
		var complete = document.getElementById("completeRegister");

		// Set value to those span tag if xml has
		if (window.ActiveXObject) {
			emailErr.innerHTML = "* " + responseDoc.getElementsByTagName("email")[0].text;
			fnameErr.innerHTML = "* " + responseDoc.getElementsByTagName("fname")[0].text;
			lnameErr.innerHTML = "* " + responseDoc.getElementsByTagName("lname")[0].text;
			pwordErr.innerHTML = "* " + responseDoc.getElementsByTagName("pword")[0].text;
			cpwordErr.innerHTML = "* " + responseDoc.getElementsByTagName("cpword")[0].text;
			phoneErr.innerHTML = " " + responseDoc.getElementsByTagName("phone")[0].text;
			complete.innerHTML = responseDoc.getElementsByTagName("complete")[0].text;

		} else {
			emailErr.innerHTML = "* " + responseDoc.getElementsByTagName("email")[0].textContent;
			fnameErr.innerHTML = "* " + responseDoc.getElementsByTagName("fname")[0].textContent;
			lnameErr.innerHTML = "* " + responseDoc.getElementsByTagName("lname")[0].textContent;
			pwordErr.innerHTML = "* " + responseDoc.getElementsByTagName("pword")[0].textContent;
			cpwordErr.innerHTML = "* " + responseDoc.getElementsByTagName("cpword")[0].textContent;
			phoneErr.innerHTML = " " + responseDoc.getElementsByTagName("phone")[0].textContent;
			complete.innerHTML = responseDoc.getElementsByTagName("complete")[0].textContent;
		}

		if (complete.innerHTML !== "") {
			document.getElementById("registerForm").reset();
		}
	}
}

function SendRequest() {
	var email = document.getElementById("email").value;
	var fname = document.getElementById("fname").value;
	var lname = document.getElementById("lname").value;
	var pword = document.getElementById("pword").value;
	var cpword = document.getElementById("cpword").value;
	var phone = document.getElementById("phone").value;

	xHRObject.open("GET", "register.php?id=" + Number(new Date) + "&email=" + email + "&fname=" + fname + "&lname=" + lname + "&pword=" + pword + "&cpword=" + cpword + "&phone=" + phone, true);
	xHRObject.onreadystatechange = GetData;
	xHRObject.send(null);
}
