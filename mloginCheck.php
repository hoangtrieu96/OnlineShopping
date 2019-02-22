<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: check if session variable of managerID is set or not and send message to client

	session_start();

	if(isset($_SESSION['managerID'])) {
		echo "true";
	} else {
		echo "false";
	}
?>
