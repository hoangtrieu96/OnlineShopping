<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: unset managerID session variable

	session_start();

	if(isset($_SESSION['managerID'])) {
		echo $_SESSION['managerID'];
		unset($_SESSION['managerID']);
	}
?>
