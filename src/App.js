import React from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import BarChart from './components/BarChart';
import RecentTransaction from './components/RecentTransaction';
import Modal from './components/modal';

function App() {
  return (
    <div className="App">
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
      <Modal/>
    </div>
  );
}

export default App;
