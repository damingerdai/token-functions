"use strict"

export = (event, context) => {
    let err;
    const result =             {
        status: "You said: " + JSON.stringify(event.body)
    };

    context
        .status(200)
        .succeed(result);
}
