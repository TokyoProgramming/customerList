import Alert from './components/Alert';
import Customer from './components/Customer';
import CustomerList from './components/CustomerList';

function App() {
  return (
    <div className="container">
      <h1>Customer List Redux</h1>
      <Alert />
      <Customer />
      <CustomerList />
    </div>
  );
}

export default App;
