import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import BusinessPage from './pages/BusinessPage';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BusinessPage />} />
        <Route path="/about" element={<h1 className='bg-green-500'>About Page</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;