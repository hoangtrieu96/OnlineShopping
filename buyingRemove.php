<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: receive a item removing request from client and update goods.xml

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

		// User remove 1 item from cart, so need to update goods.xml
		// Decrease quantity on hold by 1 and increase itemQty by 1, then send response to client
		$itemArray = $itemDoc->getElementsByTagName('item');
		foreach ($itemArray as $i) {
			if ($i->firstChild->nodeValue == $itemNumber) {
				$i->firstChild->nextSibling->nextSibling->nextSibling->nodeValue += 1; // this is itemQty
				$i->lastChild->previousSibling->nodeValue -= 1; // this is itemQtyHold
				$result = "OK";
			}
		}

		// Save updated customer.xml file
		$itemDoc->save($itemFile);
	}

	// Save and return xml document
	echo $result;
?>
