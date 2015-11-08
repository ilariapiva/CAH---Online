//global variables
var min_player = 3;
var max_player = 10;
var max_score = 5;
var global_phase;

//session variables
var player_list;
var game_time;
var card_time;
var card_win_time;

//round variables
var black_card;
var master_player;
var round_phase;

exports.db_connect = function db_connect()
{
	
};

//round functions
function inizialize_round(master, card)
{
	round_phase = "inizialize";
	master_player = master;
	black_card = card;

	//inizializzazione players
	for (var i = 0; i < player_list.length; i++) {
		player_list[i].card_played = "";
	}
}

//controllo se tutti i giocatori hanno giocato
function check_players_played()
{
	if (true) {};
	var cont = 0;
	for (var player in player_list) {
		if (player.card_played != "") 
		{
			cont++;
		}
	}
	return (cont == player_list.length);
}

//quando un giocatore ha giocato una carta bianca
function player_has_played(user,card)
{
	player_list[user].card_played = card;
	if (check_players_played()) {
		round_phase = "winner select";
		round_winner_select_phase();
	}
}

function round_winner_select_phase()
{
	//socket.emit...
}

function round_winner_selected(card)
{
	for (var player in player_list) {
		if (player.card_played == card) 
		{
			player.session_point += 1;
		}
	}
}

function round_winner_broadscast()
{
	//socket.emit...
	round_phase = "";
}

function check_phase(num_function){

	//controllo fasi globali
	if (num_function > 100 && num_function < 200) {

		if (global_phase == "session") {
			return true;
		}
	}
	else if(num_function > 200 && num_function < 300)
	{
		if (global_phase == "round") {
			return true;
		}
	}
}