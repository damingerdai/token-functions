import * as jwt from 'jsonwebtoken';

const secret = 'damingerdai';

export = (event, context) => {
    const headers = event.headers;
    const username = headers['username'] || headers['user'] || headers['name'];
    const password  = headers['password'];
    if (username && password) {
        const token = jwt.sign({
            username,
            password
        }, secret, {
            expiresIn: '1h'
        })
        if (token) {
            const response = {
                token
            };
            context
            .headers({ 'Content-Type': 'application/json' })
            .status(200)
            .succeed(response);
        } else {
            const response = {
                error: 'username and password is required'
            };
            context
            .headers({ 'Content-Type': 'application/json' })
            .status(400)
            .succeed(response);
        }
    } else {
        const response = {
            error: 'username and password is required'
        };
        context
        .headers({ 'Content-Type': 'application/json' })
        .status(403)
        .succeed(response);
    }
}
