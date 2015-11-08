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
				console.log('Error while performing Query login.');
		});
	};

	exports.db_disconnect = function db_disconnect()
	{
		connection.end();
	};

	exports.db_register = function db_register(email, user, pwd, callback)
	{
		var errors = ""; 
		var check = true;
		check_email(check, errors, email, user, pwd, callback);
	};
//};

function insert_account(check, errors, email, user, pwd, callback)
{
	if (check) {
		//var register_values  = {email: email, username: user, password: pwd };
		//console.log(register_values);
		connection.query('INSERT INTO account(email, username, password) VALUES("'+email+'","'+user+'","'+pwd+'")', function(err, result) {
			if(!err)
			{
				callback(true);
			}
			else
			{
				console.log(err.stack);
				callback(false, "Error while performing Query insert_account.")
			}
		});
	}
	else{
		callback(false, errors);
	}	
}

function check_user(check, errors, email, user, pwd, callback)
{
	connection.query('SELECT * from account where username = "'+user+'"', function(err, rows, fields) {
		if (!err)
		{
			if (rows.length > 0) {
				console.log('false');
				errors += "Username already exist.";
				check = false;
			}
			insert_account(check, errors, email, user, pwd, callback);
		}
		else
			console.log('Error while performing Query check_user.');
	});
}

function check_email(check, errors, email, user, pwd, callback)
{
	connection.query('SELECT * from account where email = "'+email+'"', function(err, rows, fields) {
		if (!err)
		{
			if (rows.length > 0) {
				console.log('false');
				errors += "E-mail already exist.";
				check = false;
			}
			check_user(check, errors, email, user, pwd, callback);
		}
		else
			console.log('Error while performing Query check_email.');
		});
}