<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: receive either a confirm or cancel request from client and update appropriately the goods.xml
	$action = '';
	$itemFile = 'data/goods.xml';
	$result = '';
	if ($_SERVER["REQUEST_METHOD"] == "GET")
	{
		if (isset($_GET["action"])) {
			$action = $_GET["action"];
		}

		// Load the document
		$itemDoc = new DOMDocument();
		$itemDoc->load($itemFile);

		// Get all items in goods.xml
		$itemArray = $itemDoc->getElementsByTagName('item');
		foreach ($itemArray as $i) {
			$qtyOnHold = $i->lastChild->previousSibling->nodeValue;
			// Check any items in cart by check if item quantity on hold bigger than 0
			if ($qtyOnHold > 0) {
				// Check the action if confirm or cancel
				if ($action == "confirm") {
					// In this confirm case, increase the number of quantity sold by number of quantity on hold
					//and decrease number of quanity on hold the same amount
					$i->lastChild->nodeValue += $qtyOnHold; // this is itemQtySold
					$i->lastChild->previousSibling->nodeValue -= $qtyOnHold; // this is itemQtyHold
					$result = "confirm";
				} else {
					// In this cancel case, increase the number of quantity available by number of quantity on hold
					//and decrease number of quanity on hold the same amount
					$i->firstChild->nextSibling->nextSibling->nextSibling->nodeValue += $qtyOnHold; // this is itemQty (available)
					$i->lastChild->previousSibling->nodeValue -= $qtyOnHold; // this is itemQtyHold
					$result = "cancel";
				}
			}
		}
		// Save updated customer.xml file
		$itemDoc->save($itemFile);
	}

	// Save and return xml document
	echo $result;
?>
