var mysql = require('mysql');
var connection = null;

//module.exports = {
	exports.db_connect = function db_connect()
	{
		connection = mysql.createConnection({
			host     : 'localhost',
			user     : 'root',
			password : '',
			database : 'cah-db'
		});

		connection.connect();
	};

	exports.db_login = function db_login(email, pwd, callback)
	{
		connection.query('SELECT * from account where email = "'+email+'" and password = "'+pwd+'"', function(err, rows, fields) {
			if (!err)
			{
				//console.log('The solution is: ', rows);
				//console.log(rows.length);
				if (rows.length == 0) {
					console.log('false');
					callback(false);
				}
				else
				{
					console.log('true');
					callback(true);
				}
			}
			else
				console.log('Error while performing Query.');
		});
	};

	exports.db_disconnect = function db_disconnect()
	{
		connection.end();
	};
//};