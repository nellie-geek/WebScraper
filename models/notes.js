//Require mongoose
var mongoose = requier("mongoose");

//Reference to the schema constructor
var Schema = mongoose.Schema;

//Using the Schema constructor, create a new Note Schema object
var NoteSchema = new Schema({
    title: String,
    body: String
});

//Creates the model 
var Note = mongoose.model("Note", NoteSchema);

//Export the note model
module.exports = Notes; 