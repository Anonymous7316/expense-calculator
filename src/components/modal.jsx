import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import './modal.css';
import { expenseContext } from "../App";
import { useSnackbar } from 'notistack'

const AddExpense = ({showModal, setShowModal,modalTitle,selectedID}) => {
  const { enqueueSnackbar} = useSnackbar()
  const {expense,setExpense} = useContext(expenseContext);
  const hideModalHandler = () => setShowModal(false);
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    
    if(modalTitle === "Edit Expense"){
      let date = new Date(formData.date).toString().split(' ');
      formData.date = [date[1], date[2]+',', date[3]].join(' ');
      let currentExpenseValue = parseInt(expense.data.find((transaction)=>transaction.id===selectedID).expense);
      let newTotalBalance = parseInt(expense.balance) + parseInt(currentExpenseValue) - parseInt(formData.expense);
      if(newTotalBalance<0){
        enqueueSnackbar("You can't spend more than you balance!",{anchorOrigin:{ horizontal: 'top', vertical: 'right' }, variant:'error'});
      }
      else{
        let newTotalExpense = parseInt(expense.expense) - parseInt(currentExpenseValue) + parseInt(formData.expense);
        let newTransactionList = expense.data.map((transaction)=>{
          if(transaction.id===parseInt(selectedID)){
              return {...formData,id:transaction.id};
          }
          return transaction;
        });
        localStorage.setItem('expense',JSON.stringify({balance:newTotalBalance.toString(),expense:newTotalExpense.toString(),data:newTransactionList}));
        setExpense({balance:newTotalBalance.toString(),expense:newTotalExpense.toString(),data:newTransactionList});
        setShowModal(false);
      }
    }
    else{
      let date = new Date(formData.date).toString().split(' ');
      formData.date = [date[1], date[2]+',', date[3]].join(' ');
      formData.id = expense.data.length + 1;
      let currentExpenseValue = parseInt(formData.expense);
      let newTotalBalance = parseInt(expense.balance) - parseInt(currentExpenseValue);
      if(newTotalBalance<0){
        enqueueSnackbar("You can't spend more than you balance!",{anchorOrigin:{ horizontal: 'top', vertical: 'right' }, variant:'error'});
      }
      else{
        let newTotalExpense = parseInt(expense.expense) + parseInt(currentExpenseValue);
        let newTransactionList = JSON.parse(JSON.stringify(expense.data));
        newTransactionList.unshift(formData);
        localStorage.setItem('expense',JSON.stringify({balance:newTotalBalance.toString(),expense:newTotalExpense.toString(),data:newTransactionList}));
        setExpense({balance:newTotalBalance.toString(),expense:newTotalExpense.toString(),data:newTransactionList});
        setShowModal(false);
      }
    }
  }
  return (
    <div>
      <ReactModal ariaHideApp={false} isOpen={showModal} onClickBackdrop={hideModalHandler} style={{content:{width:538, height:335, top:'50%',left:'50%',transform: 'translate(-50%, -50%)',borderRadius:15,backgroundColor:'#EFEFEFD9'}}}>
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
          <h1>{modalTitle}</h1>
          <form action="" onSubmit={handleSubmit} style={{display:'flex', flexWrap:'wrap',gap:10}}>
              <input required placeholder="Title" type="text" name='expenseOn'/>
              <input required placeholder='Price' type="number" name='expense'/>
              <select required name='type' placeholder="Select Category" id="category">
                  <option value="Entertainment">Entertainment</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
              </select>
              <input required placeholder="dd/mm/yyyy" id="date" type="date" name='date'/>
              <div style={{display:'flex', flexWrap:'wrap',gap:10}}>
                <button className="AddExpBtn" type='submit'>Add Expense</button>
                <button className="CancelBtn" onClick={hideModalHandler}>Close</button>
              </div>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default AddExpense;