<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: validates user's login information and checks again the customer.xml
	//* also generate appropriate messages to send back
	header('Content-Type: text/xml');
	session_start();
?>
<?php
	$username = $pword = "";
	$usernameErr = $pwordErr = "";
	$isLogin = false;
	// Load loginErr.xml
	$error = simplexml_load_file('data/loginErr.xml');

	if ($_SERVER["REQUEST_METHOD"] == "GET")
	{
		$validateResult = true;

		// Receive user inputs
		if (isset($_GET["username"])) {
			$username = $_GET["username"];
		}
		if (isset($_GET["pword"])) {
			$pword = $_GET["pword"];
		}

		// Validate
		if ($username == "") {
			$usernameErr = "Field must not be empty.";
			$validateResult = false;
		}
		if ($pword == "") {
			$pwordErr = "Field must not be empty.";
			$validateResult = false;
		}

		// Update node's value
		$error->username = $usernameErr;
		$error->pword = $pwordErr;
		$error->message = "";

		// Check login credentials against customer.xml
		if ($validateResult) {
			$customerDoc = new DOMDocument();
			$customerDoc->load('data/customer.xml');

			if ($customerDoc->getElementsByTagName('customers')->item(0)->hasChildNodes()) {
				$customerArray = $customerDoc->getElementsByTagName('customer');
				foreach ($customerArray as $cus) {
					if (($cus->firstChild->nextSibling->nodeValue === $username) && ($cus->lastChild->previousSibling->nodeValue === $pword)) {
						$isLogin = true;
						break;
					} else {
						$error->message = "Invalid username or password.";
					}
				}
			}
		}
	}

	if ($isLogin) {
		$error->message = "OK";
		$_SESSION['customerID'] = $username;
	}

	// Save and return xml document
	echo $error->saveXML();
?>
