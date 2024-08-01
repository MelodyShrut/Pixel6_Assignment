import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CustomerListPage from './pages/CustomerListPage';
import AddCustomer from './pages/AddCustomer';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AddCustomer />} />
        <Route path="/customers" element={<CustomerListPage />} />
        <Route path="/edit-customers/:id" element={<AddCustomer />} />
      </Routes>
    </Router>
  );
}

export default App;
