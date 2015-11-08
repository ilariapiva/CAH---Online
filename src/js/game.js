function addCard_White (card) {
	var white_card_html = '<div class="col-card-fixed"><div class="card-container"><div class="white-card"><p>';
	white_card_html += card.card_text;
	white_card_html += '</p></div></div></div>';
	$("#row-white-card-containers").append(white_card_html);
}