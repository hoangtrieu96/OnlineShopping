<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: check if the session variable of customerID is set or not
	//* then send the inform message to client
	session_start();

	if(isset($_SESSION['customerID'])) {
		echo "true";
	} else {
		echo "false";
	}
?>
