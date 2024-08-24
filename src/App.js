import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddSchool from './AddSchool';
import ListSchools from './ListSchools';
import Home from './Home'


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/addSchool' element={<AddSchool/>} />
          <Route path='/listSchools/:lat/:log' element={<ListSchools/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
