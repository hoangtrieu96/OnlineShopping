<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<table class="table table-bordered table-responsive">
		<thead>
			<tr class="table-info">
				<th>Item Number</th>
				<th>Name</th>
				<th>Price</th>
				<th>Quantity Available</th>
				<th>Quantity On Hold</th>
				<th>Quantity Sold</th>
			</tr>
		</thead>
		<tbody>
			<xsl:for-each select="items/item[itemQtySold &gt; 0]">
				<tr>
					<td><xsl:value-of select="itemNumber"/></td>
					<td><xsl:value-of select="itemName"/></td>
					<td><xsl:value-of select="itemPrice"/></td>
					<td><xsl:value-of select="itemQty"/></td>
					<td><xsl:value-of select="itemQtyHold"/></td>
					<td><xsl:value-of select="itemQtySold"/></td>
				</tr>
			</xsl:for-each>
		</tbody>
	</table>
</xsl:template>

</xsl:stylesheet>
