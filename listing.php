<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: validata the item's inputs in listing.html via listing.js, if all inputs are valid then add it to goods.xml
	//* and generate appropriate messages to send back
	header('Content-Type: text/xml');
?>
<?php
	$itemName = $itemDesc = $itemPrice = $itemQty = "";
	$itemNameErr = $itemPriceErr = $itemQtyErr = $itemDescErr = "";
	$itemFile = 'data/goods.xml';
	// Load listingErr.xml and write all error message to it
	$error = simplexml_load_file('data/listingErr.xml');

	// Sanitise input function
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
		if (isset($_GET["itemName"])) {
			$itemName = $_GET["itemName"];
		}
		if (isset($_GET["itemPrice"])) {
			$itemPrice = $_GET["itemPrice"];
		}
		if (isset($_GET["itemQty"])) {
			$itemQty = $_GET["itemQty"];
		}
		if (isset($_GET["itemDesc"])) {
			$itemDesc = $_GET["itemDesc"];
		}

		// Validate
		if ($itemName == "") {
			$itemNameErr = "Field must not be empty.";
			$validateResult = false;
		}
		if ($itemPrice == "") {
			$itemPriceErr = "Field must not be empty.";
			$validateResult = false;
		}
		else if (!is_numeric($itemPrice)) {
			$itemPriceErr = "Must be a number.";
			$validateResult = false;
		}
		if ($itemQty == "") {
			$itemQtyErr = "Field must not be empty.";
			$validateResult = false;
		}
		else if (!is_numeric($itemQty)) {
			$itemQtyErr = "Must be a number.";
			$validateResult = false;
		}
		if ($itemDesc == "") {
			$itemDescErr = "Field must not be empty.";
			$validateResult = false;
		}


		// Update node's value
		$error->itemName = $itemNameErr;
		$error->itemPrice = $itemPriceErr;
		$error->itemQty = $itemQtyErr;
		$error->itemDesc = $itemDescErr;
		$error->complete = "";

		if ($validateResult) {
			// Sanitise data
			$itemName = sanitise_input($itemName);
			$itemPrice = sanitise_input($itemPrice);
			$itemQty = sanitise_input($itemQty);
			$itemDesc = sanitise_input($itemDesc);

			// Check if customer.xml exist or not
			if (!file_exists($itemFile)) {
				$itemDoc = new DOMDocument('1.0');
				$itemDoc->formatOutput = true;

				$root = $itemDoc->createElement('items');
				$root = $itemDoc->appendChild($root);

				$itemDoc->save($itemFile);
			}

			// Load the document
			$itemDoc = new DOMDocument();
			$itemDoc->load($itemFile);

			// Generate item number
			$itemNumber = 1;

			// Check if this document contains any child inside customers element or not
			// Then check last item number to generate a new number = highest number + 1
			if ($itemDoc->getElementsByTagName('items')->item(0)->hasChildNodes()) {
				$max = 0;
				$itemArray = $itemDoc->getElementsByTagName('item');
				foreach ($itemArray as $i) {
					if ($i->firstChild->nodeValue > $max) {
						$max = $i->firstChild->nodeValue;
					}
				}
				$itemNumber = $max + 1;
			}

			// Start create new <item></item> with all provided and generated inputs
			$root = $itemDoc->getElementsByTagName('items')->item(0);

			$itemBranch = $itemDoc->createElement('item');
			$itemBranch = $root->appendChild($itemBranch);

			$itemNumberBranch = $itemDoc->createElement('itemNumber');
			$itemNumberBranch = $itemBranch->appendChild($itemNumberBranch);
			$itemNumberValue = $itemDoc->createTextNode(strval($itemNumber));
			$itemNumberValue = $itemNumberBranch->appendChild($itemNumberValue);

			$itemNameBranch = $itemDoc->createElement('itemName');
			$itemNameBranch = $itemBranch->appendChild($itemNameBranch);
			$itemNameValue = $itemDoc->createTextNode($itemName);
			$itemNameValue = $itemNameBranch->appendChild($itemNameValue);

			$itemPriceBranch = $itemDoc->createElement('itemPrice');
			$itemPriceBranch = $itemBranch->appendChild($itemPriceBranch);
			$itemPriceValue = $itemDoc->createTextNode($itemPrice);
			$itemPriceValue = $itemPriceBranch->appendChild($itemPriceValue);

			$itemQtyBranch = $itemDoc->createElement('itemQty');
			$itemQtyBranch = $itemBranch->appendChild($itemQtyBranch);
			$itemQtyValue = $itemDoc->createTextNode($itemQty);
			$itemQtyValue = $itemQtyBranch->appendChild($itemQtyValue);

			$itemDescBranch = $itemDoc->createElement('itemDesc');
			$itemDescBranch = $itemBranch->appendChild($itemDescBranch);
			$itemDescValue = $itemDoc->createTextNode($itemDesc);
			$itemDescValue = $itemDescBranch->appendChild($itemDescValue);

			$itemQtyHoldBranch = $itemDoc->createElement('itemQtyHold');
			$itemQtyHoldBranch = $itemBranch->appendChild($itemQtyHoldBranch);
			$itemQtyHoldValue = $itemDoc->createTextNode('0');
			$itemQtyHoldValue = $itemQtyHoldBranch->appendChild($itemQtyHoldValue);

			$itemQtySoldBranch = $itemDoc->createElement('itemQtySold');
			$itemQtySoldBranch = $itemBranch->appendChild($itemQtySoldBranch);
			$itemQtySoldValue = $itemDoc->createTextNode('0');
			$itemQtySoldValue = $itemQtySoldBranch->appendChild($itemQtySoldValue);

			// Save updated customer.xml file
			$itemDoc->save($itemFile);

			// Add success message to error xml file when validated
			$error->complete = "OK";
		}
	}

	// Save and return xml document
	echo $error->saveXML();
?>
