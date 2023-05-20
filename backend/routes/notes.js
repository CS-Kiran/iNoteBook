const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const {body , validationResult} = require('express-validator');

//Route1 : Get all notes using the GET method "/api/notes/fetchalluser"
router.get('/fetchallnotes', fetchuser ,async (req, res) => {
  const notes = await Notes.find({user: req.user.id});
  res.json(notes);
});

//Route2 : Add a new note using POST method "/api/notes/addnotes" : Login required
router.post('/addnotes', fetchuser ,[
  body('title').isLength({min: 5}).withMessage('Title must be at least 5 characters long'),
  body('description').isLength({min: 5}).withMessage('Description must be at least 5 characters long'),
  body('tag').isLength({min: 1}).withMessage('Tag must be at least 1 characters long'),
] ,async (req, res) => {
  try {
    const error = validationResult(req);
    if(!error.isEmpty()){
      return res.status(400).json({error: error.array()});
    }
    const {title, description, tag} = req.body;
    const notes = new Notes ({
      title, description, tag, user: req.user.id
    })
    const saveNote = await notes.save();
    res.json(saveNote);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


//Route3: Update a Note using the PUT method : "/api/notes/updatenote" : Login required
router.put('/updatenote/:id' , fetchuser ,async (req, res) => {

  try {
    const {title , description ,tag } = req.body;
    //create new note object
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find note to be UPDATE and also check for authenticated user 
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Note Not Found");
    }

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("USER Not Allowed");
    }
    
    note =await Notes.findByIdAndUpdate(req.params.id ,{$set:newNote}, {new:true})
    if(!note){
      return res.status(404).send("Note not Updated : Internal Server Error");
    }
    else {
      return res.json({"Success":"Updated Successfully" , note:note});
    }
  }catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
});


//Route4: Delete a Note using the DELETE method : "/api/notes/deletenote" : Login required
router.delete('/deletenote/:id' , fetchuser ,async (req, res) => {

  try {
    //find note to be DELETED and also check for authenticated user 
    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("Note Not Found");
    }

    if(note.user.toString() !== req.user.id){
      return res.status(401).send("User Not Allowed");
    }

    note =await Notes.findByIdAndDelete(req.params.id ,{$set:note}, {new:true})
    if(!note){
      return res.status(404).send("Note not Deleted : Internal Server Error");
    }
    else {
      return res.json({"Success":"Deleted Successfully" , note:note});
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
  
});

module.exports = router;