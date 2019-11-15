import * as jwt from 'jsonwebtoken';

const secret = 'damingerdai';

export = (event, context) => {
	let jsonData: any = '';
	jwt.verify(event.query.token, secret, (error, decoded) => {
		if (error) {
			jsonData = { 'status': 'Token Invalid' };
		} else {
			const username = decoded.username;
			const password = decoded.password;
			jsonData = {
				username,
				password
			};
		}
	});

	context
		.headers({ 'Content-Type': 'application/json' })
		.status(200)
		.succeed(jsonData);
}
