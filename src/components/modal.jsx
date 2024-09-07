import React, { useState } from 'react';
import ReactModal from 'react-modal';
import './modal.css';

const AddExpense = ({showModal, setShowModal,modalTitle}) => {
  const hideModalHandler = () => setShowModal(false);
  const handleSubmit = (e) =>{
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target).entries());
    console.log(formData);
  }
  return (
    <div>
      {/* Your main content here */}
      <ReactModal ariaHideApp={false} isOpen={showModal} onClickBackdrop={hideModalHandler} style={{content:{width:538, height:335, top:'50%',left:'50%',transform: 'translate(-50%, -50%)',borderRadius:15,backgroundColor:'#EFEFEFD9'}}}>
        {/* Modal content here */}
        <div style={{display:'flex', justifyContent:'center', flexDirection:'column'}}>
          <h1>{modalTitle}</h1>
          <form action="" onSubmit={handleSubmit} style={{display:'flex', flexWrap:'wrap',gap:10}}>
              <input placeholder="Title" type="text" name='Ttile'/>
              <input placeholder='Price' type="number" name='Price'/>
              <input placeholder="Select Category" id="category" type="text" name='category'/>
              <input placeholder="dd/mm/yyyy" id="date" type="date" name='date'/>
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