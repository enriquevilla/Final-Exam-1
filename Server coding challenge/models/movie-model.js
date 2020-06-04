const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    throw new Error( err );
                });
    },
    getMovieByID: function(id) {
        return moviesCollection
            .find({movie_ID: id})
            .populate("actors", ["firstName", "lastName"])
            .then(movies => {
                return movies;
            })
            .catch(err => {
                throw new Error(err);
            })
    },
    addActorToMovieList: function(mID, aID) {
        return moviesCollection
            .updateOne({movie_ID: mID}, {$push: {"actors": aID}})
            .then(_ => {
                return _;
            })
            .catch(err => {
                throw new Error(err);
            })
    }
}

module.exports = {
    Movies
};

