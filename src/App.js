import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import ExpenseTracker from './components/ExpenseTracker';
import BarChart from './components/BarChart';
import RecentTransaction from './components/RecentTransaction';
import Modal from './components/modal';
import AddBalanceModal from './components/AddIncomeModal';
import { type } from '@testing-library/user-event/dist/type';

// const data = [
//   {
//       id:1,
//       type:'Food',
//       expense:150,
//       date:'March 20, 2024',
//       expenseOn:'Samosa',
//   },
//   {
//       id:2,
//       type:'Entertainment',
//       expense:300,
//       date:'March 21, 2024',
//       expenseOn:'Movie',
//   },
//   {
//       id:3,
//       type:'Travel',
//       expense:50,
//       date:'March 22, 2024',
//       expenseOn:'Auto',
//   },
//   {
//       id:4,
//       type:'Travel',
//       expense:50,
//       date:'March 22, 2024',
//       expenseOn:'Auto',
//   }
// ];

export const ModalContext = createContext();
export const AddBalanceModalContext = createContext();
export const expenseContext = createContext();

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [expense, setExpense] = useState({balance:'',expense:'',data:[]});
  const [selectedID,setSelectedID] = useState('');
  const [chartData, setChartData] = useState([]);

  if(!localStorage.getItem('expense')){
    const expenseData = {balance:5000, expense:0, data:[]};
    localStorage.setItem('expense',JSON.stringify(expenseData));
    setExpense(expenseData);
  }

  useEffect(()=>{
    function getData(){
      try{
        const expenseData = localStorage.getItem('expense');
        if(expenseData){
          const data = JSON.parse(expenseData);
          setExpense(data);
        }
      }
      catch(e){
        console.error(e);
      }
    }
    getData();
  },[]);

  useEffect(()=>{
    let graphData = Object.groupBy(expense.data,({type})=>type);
    let finalExpense = Object.keys(graphData).map((type)=>{
    let amt = 0;
    graphData[type].forEach(expense => {
      amt += parseInt(expense.expense);
      });
      return {name:type,amt,value:amt};
    });
    setChartData(finalExpense);
  },[expense]);

  return (
    <div className="App">
      <expenseContext.Provider value={{expense,setExpense}}>
        <ModalContext.Provider value={{showModal, setShowModal, setModalTitle}}>
          <AddBalanceModalContext.Provider value={{showAddBalanceModal, setShowAddBalanceModal}}>
          <div className='expense'>
            <h1>Expense Tracker</h1>
            <ExpenseTracker chartData={chartData}/>
          </div>
          <div className='transactions'>
            <div style={{width:'65%'}}>
              <h1><i>Recent Transactions</i></h1>
              <div className='transactionCard' style={{ height:345, backgroundColor:'white'}}>
                <RecentTransaction setSelectedID={setSelectedID}/>
              </div>
            </div>
            <div>
              <h1><i>Top Expenses </i></h1>
              <div className='transactionCard' style={{width:417, height:345, backgroundColor:'white', display:'flex', justifyContent:'center',alignItems:'center'}}>
                <BarChart data={chartData}/>
              </div>
            </div>
          </div>
          </AddBalanceModalContext.Provider>
        </ModalContext.Provider>
        <Modal showModal={showModal} setShowModal={setShowModal} modalTitle={modalTitle} selectedID={selectedID} />
        <AddBalanceModal showModal={showAddBalanceModal} setShowModal={setShowAddBalanceModal}/>
      </expenseContext.Provider>
    </div>
  );
}

export default App;
