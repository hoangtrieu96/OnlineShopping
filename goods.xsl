<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:template match="/">
	<table class="table table-bordered table-responsive">
		<thead>
			<tr class="table-info">
				<th>Item Number</th>
				<th>Name</th>
				<th>Description</th>
				<th>Price</th>
				<th>Quantity</th>
				<th>Add</th>
			</tr>
		</thead>
		<tbody>
			<xsl:for-each select="items/item[itemQty &gt; 0]">
				<tr>
					<td><xsl:value-of select="itemNumber"/></td>
					<td><xsl:value-of select="itemName"/></td>
					<td><xsl:value-of select="substring(itemDesc, 1, 20)"/></td>
					<td><xsl:value-of select="itemPrice"/></td>
					<td><xsl:value-of select="itemQty"/></td>
					<td><button type="button" class="btn btn-primary" onclick="AddItem(this)">
							<xsl:attribute name="id"><xsl:value-of select="itemNumber"/></xsl:attribute>
						Add 1 to cart</button>
					</td>
				</tr>
			</xsl:for-each>
		</tbody>
	</table>
</xsl:template>

</xsl:stylesheet>
