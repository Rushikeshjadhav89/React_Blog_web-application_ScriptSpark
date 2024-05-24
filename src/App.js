import './App.css'; 
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home';
import About from './components/pages/About'
import Blog from './components/pages/Blog';
import AddEditBlog from './components/pages/AddEditBlog';
import NotFound from './components/pages/NotFound';
import {ToastContainer} from 'react-toastify'
import Header from './components/Header';







function App() {
  return (
    <div className="App">
        {/* <h1>Bloging Site</h1> */}
        <BrowserRouter>
          <Header/>
          <ToastContainer />
            
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='about' element={<About/>}/>
                <Route path='blog/:id' element={<Blog/>}/>
                <Route path='edit' element={<AddEditBlog/>}/>
                <Route path='edit/:id' element={<AddEditBlog/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
