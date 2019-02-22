<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: unset the customerID session variable and send this customerID to client

	session_start();

	if(isset($_SESSION['customerID'])) {
		echo $_SESSION['customerID'];
		unset($_SESSION['customerID']);
	}
?>
