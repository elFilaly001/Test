import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1 className='bg-blue-500'>Home Page</h1>} />
        <Route path="/about" element={<h1 className='bg-green-500'>About Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;