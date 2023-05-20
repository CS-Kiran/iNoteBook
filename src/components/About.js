import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const context = useContext(noteContext);

  //component_did_mount like function with class features ie : called at last after all functions are completed with execution. 
  
  useEffect(() => {
    
  })

  return (
    <>
    <div>
        <h1>About Page</h1>
    </div>
    </>
  )
}

export default About