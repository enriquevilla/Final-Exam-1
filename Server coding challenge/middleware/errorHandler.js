function errorHandler(error, req, res) {
    if (error === 1) {
        res.statusMessage = "Id is missing in the body of the request";
        return res.status(406).end();
    }

    if (error === 2) {
        res.statusMessage = "id and movie_ID do not match";
        return res.status(409).end();
    }

    if (error === 3) {
        res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list.";
        return res.status(403).end();
    }

    if (error === 4) {
        res.statusMessage = "The actor is already in this movie list";
        return res.status(400).end();
    }
}

module.exports = errorHandler;