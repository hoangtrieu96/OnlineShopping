<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: perform sold quantity clearing process, as well as remove completely sold items from goods.xml

	$itemFile = 'data/goods.xml';
	$result = '';

	// Load the document
	$itemDoc = new DOMDocument();
	$itemDoc->load($itemFile);

	// Get all items in goods.xml
	$itemArray = $itemDoc->getElementsByTagName('item');
	$itemToRemove = [];
	foreach ($itemArray as $i) {
		$qtySold = $i->lastChild->nodeValue;
		$qtyAvailable = $i->firstChild->nextSibling->nextSibling->nextSibling->nodeValue;
		$qtyHold = $i->lastChild->previousSibling->nodeValue;
		// Check any items in cart by check if item quantity sold bigger than 0
		if ($qtySold > 0) {
			// Clear the sold quantity for this item
			$i->lastChild->nodeValue = 0;
		}
		// Check if any items are completely sold (quantity available and on hold are both = 0)
		if ($qtyAvailable == 0 && $qtyHold == 0) {
			// Add this item to itemToRemove array
			array_push($itemToRemove, $i);
			$result .= "add 1 item to detete |";
		}
	}
	$root = $itemDoc->getElementsByTagName('items')->item(0);
	foreach ($itemToRemove as $r) {
		$root->removeChild($r);
		$result .= "removed 1 |";
	}

	$result .= "OK";

	// Save updated customer.xml file
	$itemDoc->save($itemFile);

	// Save and return xml document
	echo $result;
?>
