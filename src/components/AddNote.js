import {React , useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'


const AddNote = (props) => {
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const {addNote} = context;
    
    const [note, setNote] = useState({title: "", description:"" , tag:""});
    
    const handleAdd = (e) =>{
        e.preventDefault();
        addNote(note.title , note.description, note.tag);
        setNote({title: "", description:"" , tag:""})
        props.showAlert("Note Added Successfully" , "success");
    };

    const onChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value})
    };

  return (
    <>
     <div className='container my-5'>
      <h1>Add Your Notes Here</h1>
      <form action=''>
        <div className="mb-3 my-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title"  value={note.title} onChange={onChange} required/>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="description" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' value={note.description} onChange={onChange} required/>
          <div id="instructions" className="form-text">Minimum length must br greater than or equal to 5 characters</div>
        </div>
        <div className="mb-3 my-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' value={note.tag} onChange={onChange} required/>
        </div>
        <button type="submit" className="btn btn-primary my-2" onClick={handleAdd}>Add Note</button> 
    </form>
    </div>
    </>
  )
}

export default AddNote