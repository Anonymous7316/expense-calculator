import React, {createContext, useState} from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import BarChart from './components/BarChart';
import RecentTransaction from './components/RecentTransaction';
import Modal from './components/modal';

export const ModalContext = createContext();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  return (
    <div className="App">
      <ModalContext.Provider value={{showModal, setShowModal, setModalTitle}}>
        <div className='expense'>
          <h1>Expense Tracker</h1>
          <ExpenseTracker/>
        </div>
        <div className='transactions'>
          <div style={{width:'65%'}}>
            <h1><i>Recent Transactions</i></h1>
            <div className='transactionCard' style={{ height:345, backgroundColor:'white'}}>
              <RecentTransaction/>
            </div>
          </div>
          <div>
            <h1><i>Top Expenses </i></h1>
            <div className='transactionCard' style={{width:417, height:345, backgroundColor:'white', display:'flex', justifyContent:'center',alignItems:'center'}}>
              <BarChart/>
            </div>
          </div>
        </div>
      </ModalContext.Provider>
      <Modal showModal={showModal} setShowModal={setShowModal} modalTitle={modalTitle}/>
    </div>
  );
}

export default App;
