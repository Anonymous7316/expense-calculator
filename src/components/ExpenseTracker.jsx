import React, { memo, useContext } from "react";
import PieChartGraph from "./PieChart";
import './ExpenseTracker.css';
import { ModalContext } from "../App";

function ExpenseTracker(){
    const {showModal, setShowModal, setModalTitle} = useContext(ModalContext);
    const handleAddExpense = () =>{
        setModalTitle("Add Expense");
        setShowModal(true);
    }

    return(
        <>
            <div className="ExpenseArea" style={{display:'flex', justifyContent:'space-around', alignItems:'center',padding:'50px',backgroundColor:'#626262', flexWrap:'wrap'}}>
                <div className="ExpenseCard">
                    <p>Wallet Balance: <span className="Income">₹4500</span></p>
                    <button className="AddIncomeBtn">+ Add Income</button>
                </div>
                <div className="ExpenseCard">
                    <p>Expense: <span className="Expense">₹500</span></p>
                    <button className="AddExpenseBtn" onClick={handleAddExpense}>+ Add Expense</button>
                </div>
                <div>
                    <PieChartGraph/>
                </div>
            </div>
        </>
    )
}

export default memo(ExpenseTracker);