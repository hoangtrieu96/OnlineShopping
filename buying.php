<?php
	//@student name: Trieu Hoang Nguyen
	//@student id: 100031534
	//@main function: applying xslt for goods.xml to display a list of items for sales to customers

	if (file_exists('data/goods.xml')) {
		// Load the goods xml
		$xml = new DOMDocument;
		$xml->load('data/goods.xml');

		// Load goods.xsl
		$xsl = new DOMDocument;
		$xsl->load('goods.xsl');

		// Configure the transformer
		$proc = new XSLTProcessor;
		$proc->importStyleSheet($xsl); // attach the xsl rules

		$doc = $proc->transformToXML($xml);

		echo $doc;
	}
	else {
		echo "<p>404 item not found!</p>";
	}
?>
