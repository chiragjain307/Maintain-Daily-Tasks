import React from 'react';
import ProjectForm from './ProjectForm';
import bgImage from './assets/bgImage.jpg'

function App() {

  return (
    <div className="min-h-screen bg-green-700 flex items-center justify-center" 
    style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // backgroundAttachment: 'fixed',
     
    }}>
      <ProjectForm />
    </div>
  )
}

export default App
