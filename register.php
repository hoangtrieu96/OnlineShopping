<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: validate user's inputs send from register.html via register.js and generate appropriate messages to send back
	//*if all input is valid, add them to a xml file
	//*if the xml file is not exists at the moment, then create a new one

	header('Content-Type: text/xml');
?>
<?php
	$email = $fname = $lname = $pword = $cpword = $phone = "";
	$emailErr = $fnameErr = $lnameErr = $pwordErr = $cpwordErr = $phoneErr = "";
	$emailUnique = true;
	$customerFile = 'data/customer.xml';
	// Load registerErr.xml and write all error message to it
	$error = simplexml_load_file('data/registerErr.xml');

	function sanitise_input($data) {
		$data = trim($data);
		$data = stripslashes($data);
		$data = htmlspecialchars($data);
		return $data;
	}

	if ($_SERVER["REQUEST_METHOD"] == "GET")
	{
		$validateResult = true;

		// Receive user inputs
		if (isset($_GET["email"])) {
			$email = $_GET["email"];
		}
		if (isset($_GET["fname"])) {
			$fname = $_GET["fname"];
		}
		if (isset($_GET["lname"])) {
			$lname = $_GET["lname"];
		}
		if (isset($_GET["pword"])) {
			$pword = $_GET["pword"];
		}
		if (isset($_GET["cpword"])) {
			$cpword = $_GET["cpword"];
		}
		if (isset($_GET["phone"])) {
			$phone = $_GET["phone"];
		}

		// Validate
		if ($email == "") {
			$emailErr = "Field must not be empty.";
			$validateResult = false;
		}
		else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
			$emailErr = "Invalid email format.";
			$validateResult = false;
		}
		if ($fname == "") {
			$fnameErr = "Field must not be empty.";
			$validateResult = false;
		}
		else if (!preg_match("/^[a-zA-Z ]*$/", $fname)) {
			$fnameErr ="Only alphabetical letters and space allowed in your name.";
			$validateResult = false;
		}
		if ($lname == "") {
			$lnameErr = "Field must not be empty.";
			$validateResult = false;
		}
		else if (!preg_match("/^[a-zA-Z ]*$/", $lname)) {
			$lnameErr ="Only alphabetical letters and space allowed in your name.";
			$validateResult = false;
		}
		if ($pword == "") {
			$pwordErr = "Field must not be empty.";
			$validateResult = false;
		}
		if ($cpword == "") {
			$cpwordErr = "Field must not be empty.";
			$validateResult = false;
		}
		else if ($cpword !== $pword) {
			$cpwordErr = "Confirm password does not match.";
			$validateResult = false;
		}
		if (!preg_match("/^(\(0[0-9]{1}\)[0-9]{8})|(0[0-9]{1}\s[0-9]{8})$/", $phone)) {
			$phoneErr = "Must exactly 10 digits with correct format.";
			$validateResult = false;
		}

		// Update node's value
		$error->email = $emailErr;
		$error->fname = $fnameErr;
		$error->lname = $lnameErr;
		$error->pword = $pwordErr;
		$error->cpword = $cpwordErr;
		$error->phone = $phoneErr;
		$error->complete = "";

		if ($validateResult) {
			// Sanitise data
			$email = sanitise_input($email);
			$fname = sanitise_input($fname);
			$lname = sanitise_input($lname);
			$pword = sanitise_input($pword);
			$phone = sanitise_input($phone);

			// Check if customer.xml exist or not
			if (!file_exists($customerFile)) {
				$customerDoc = new DOMDocument('1.0');
				$customerDoc->formatOutput = true;

				$root = $customerDoc->createElement('customers');
				$root = $customerDoc->appendChild($root);

				$customerDoc->save($customerFile);
			}

			// Load the document
			$customerDoc = new DOMDocument();
			$customerDoc->load($customerFile);

			// Check if this document contains any child inside customers element or not
			// Then check email is unique or not
			if ($customerDoc->getElementsByTagName('customers')->item(0)->hasChildNodes()) {
				$customerArray = $customerDoc->getElementsByTagName('customer');
				foreach ($customerArray as $cus) {
					if ($cus->firstChild->nextSibling->nodeValue === $email) {
						$emailUnique = false;
						$error->email = " Email already in used.";
						break;
					}
				}
			}

			// If email is unique then generate the customerID and add to xml file
			if ($emailUnique) {
				// Generate customer id
				$customerID = uniqid();

				$root = $customerDoc->getElementsByTagName('customers')->item(0);

				$customerBranch = $customerDoc->createElement('customer');
				$customerBranch = $root->appendChild($customerBranch);

				$idBranch = $customerDoc->createElement('id');
				$idBranch = $customerBranch->appendChild($idBranch);
				$idValue = $customerDoc->createTextNode($customerID);
				$idValue = $idBranch->appendChild($idValue);

				$emailBranch = $customerDoc->createElement('email');
				$emailBranch = $customerBranch->appendChild($emailBranch);
				$emailValue = $customerDoc->createTextNode($email);
				$emailValue = $emailBranch->appendChild($emailValue);

				$fnameBranch = $customerDoc->createElement('fname');
				$fnameBranch = $customerBranch->appendChild($fnameBranch);
				$fnameValue = $customerDoc->createTextNode($fname);
				$fnameValue = $fnameBranch->appendChild($fnameValue);

				$lnameBranch = $customerDoc->createElement('lname');
				$lnameBranch = $customerBranch->appendChild($lnameBranch);
				$lnameValue = $customerDoc->createTextNode($lname);
				$lnameValue = $lnameBranch->appendChild($lnameValue);

				$pwordBranch = $customerDoc->createElement('pword');
				$pwordBranch = $customerBranch->appendChild($pwordBranch);
				$pwordValue = $customerDoc->createTextNode($pword);
				$pwordValue = $pwordBranch->appendChild($pwordValue);

				$phoneBranch = $customerDoc->createElement('phone');
				$phoneBranch = $customerBranch->appendChild($phoneBranch);
				$phoneValue = $customerDoc->createTextNode($phone);
				$phoneValue = $phoneBranch->appendChild($phoneValue);

				// Save updated customer.xml file
				$customerDoc->save($customerFile);

				// Add success message to error xml file when validated
				$error->complete = "Register successfully.";
			}
		}
	}

	// Save and return xml document
	echo $error->saveXML();
?>
