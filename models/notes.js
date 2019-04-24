//Require mongoose
var mongoose = require("mongoose");

//Reference to the schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new Note Schema object
var noteSchema = new Schema({
    title: String,
    body: String
});

//Creates the model 
var note = mongoose.model("note", noteSchema);

//Export the note model
module.exports = note; 