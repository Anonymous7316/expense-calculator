import React, { useContext } from 'react';
import ReactModal from 'react-modal';
import './AddIncomeModal.css';
import { expenseContext } from "../App";

const AddExpense = ({showModal, setShowModal}) => {
  const {expense,setExpense} = useContext(expenseContext);
  const hideModalHandler = () => setShowModal(false);

  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
    localStorage.setItem('expense',JSON.stringify({balance:(parseInt(expense.balance)+ parseInt(formData.balance)).toString(),expense:expense.expense,data:expense.data}));
    setExpense({balance:(parseInt(expense.balance)+ parseInt(formData.balance)).toString(),expense:expense.expense,data:expense.data});
    setShowModal(false);
  }

  return (
    <div>
      {/* Your main content here */}
      <ReactModal ariaHideApp={false} isOpen={showModal} onClickBackdrop={hideModalHandler} style={{content:{width:538, height:164, top:'50%',left:'50%',transform: 'translate(-50%, -50%)',borderRadius:15,backgroundColor:'#EFEFEFD9'}}}>
        {/* Modal content here */}
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
          <h1>Add Balance</h1>
          <form action="" onSubmit={handleSubmit} style={{display:'flex', flexWrap:'wrap',gap:10}}>
              <input placeholder='Income Amount' type="text" name='balance' style={{width:217}}/>
              <button className="AddBalanceBtn" type='submit'>Add Balance</button>
              <button className="CancelBtn" onClick={hideModalHandler}>Close</button>
          </form>
        </div>
      </ReactModal>
    </div>
  );
};

export default AddExpense;