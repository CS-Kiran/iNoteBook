import React , {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";

    const notesInitialized = []

      const [notes , setNotes] = useState(notesInitialized)


      //Get all notes
       const getNotes = async() => {
        //API call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json" ,
            "auth-token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        setNotes(json)
      }

      //Add note
      const addNote = async(title , description, tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/addnotes`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json" ,
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title , description, tag}),
        });
        const note = await response.json();
        setNotes(notes.concat(note));
      }

      //Delete note
      const deleteNote = async (id) => {
        //API call
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json" ,
            "auth-token": localStorage.getItem('token')
          }
        });
        // eslint-disable-next-line
        const json = await response.json();

        const newNotes = notes.filter((note)=> {return note._id !== id})
        setNotes(newNotes);
      }

      //edit note
      const editNote = async (id, title , description , tag) => {
        //API call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json" ,
            "auth-token": localStorage.getItem('token')
          },
          body: JSON.stringify({title , description , tag}),
        });

        // eslint-disable-next-line
        const json = await response.json();
        
        //edit function
        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
          const element = notes[index];
          if(element._id === id) {
            newNotes[index].title = title;
            newNotes[index].description = description;
            newNotes[index].tag = tag;
            break;
          }          
        }
        setNotes(newNotes);
      }

    return (
        <NoteContext.Provider value={{notes, getNotes , addNote, deleteNote, editNote}}>
            {props.children}
        </NoteContext.Provider>

    )
}

export default NoteState;