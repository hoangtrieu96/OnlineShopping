<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: validates managers login credentials from mlogin.html and checks again managers.txt
	//* and generate appropriate message to send back

	header('Content-Type: text/xml');
	session_start();
?>
<?php
	$username = $pword = "";
	$usernameErr = $pwordErr = "";
	$isLogin = false;
	// Load mloginErr.xml
	$error = simplexml_load_file('data/mloginErr.xml');

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

		// Check login credentials against manager.txt
		if ($validateResult) {
			// Open manager.txt and read line by line
			$file = fopen("data/manager.txt","r") or die("Unable to open file!");

			// Check if username and password matched manager.txt data
			while(!feof($file))
			{
				$line = fgets($file);
				$credentials = explode(",", $line);
				if ((trim($credentials[0])) == $username && (trim($credentials[1]) == $pword)) {
					$isLogin = true;
					break;
				} else {
					$error->message = "Invalid username or password.";
				}
			}
			fclose($file);
		}
	}

	if ($isLogin) {
		$error->message = "OK";
		$_SESSION['managerID'] = $username;
	}

	// Save and return xml document
	echo $error->saveXML();
?>
