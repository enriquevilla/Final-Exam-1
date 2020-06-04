const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );
const {Actors} = require("./models/actor-model");
const {Movies} = require("./models/movie-model");
const {errorHandler} = require("./middleware/errorHandler");

const app = express();

app.patch("/api/add-movie-actor/:movie_ID", jsonParser, (req, res) => {
    const {id, firstName, lastName} = req.body;
    const {movie_ID} = req.params;

    if (!id) {
        errorHandler(1, req, res);
    }

    if (Number(id) != Number(movie_ID)) {
        errorHandler(2, req, res);
    }

    if (!firstName || !lastName) {
        errorHandler(3, req, res);
    }

    Movies
        .getMovieByID(movie_ID)
        .then(movie => {
            const actorIDs = movie.actors.map(i => {
                return i.actor_ID;
            });
            if (actorIDs.includes(id)) {
                errorHandler(4, req, res);
            }
            const newActor = {
                firstName: firstName,
                lastName: lastName,
                actor_ID: movie_ID
            }
            Actors
                .createActor(newActor)
                .then(actor => {
                    Movies
                        .getMovieByID(movie_ID)
                        .then(movie => {
                            return res.status(201).json(movie);
                        })
                })
                .catch(_ => {
                    res.statusMessage = "There was a problem adding actor.";
                    return res.status(500).end();
                })
        })
        .catch(_ => {
            res.statusMessage = "There was a problem getting actor by ID.";
            return res.status(500).end();
        })
});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});