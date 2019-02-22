<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: receive a adding item to cart request from client and update goods.xml
	$itemNumber = '';
	$itemFile = 'data/goods.xml';
	$result = "OUT";
	if ($_SERVER["REQUEST_METHOD"] == "GET")
	{
		if (isset($_GET["itemNumber"])) {
			$itemNumber = $_GET["itemNumber"];
		}

		// Load the document
		$itemDoc = new DOMDocument();
		$itemDoc->load($itemFile);

		// Check if the itemQty is still avaible
		// If yes then increase quantity on hold by 1 and decrease itemQty by 1, then send response to client
		$itemArray = $itemDoc->getElementsByTagName('item');
		foreach ($itemArray as $i) {
			if ($i->firstChild->nodeValue == $itemNumber) {
				$i->firstChild->nextSibling->nextSibling->nextSibling->nodeValue -= 1;
				$i->lastChild->previousSibling->nodeValue += 1;
				$result = "OK;" . $itemNumber .";". $i->firstChild->nextSibling->nodeValue .";". $i->firstChild->nextSibling->nextSibling->nodeValue;
			}
		}

		// Save updated customer.xml file
		$itemDoc->save($itemFile);
	}

	// Save and return xml document
	echo $result;
?>
