import React, { memo, useContext } from "react";
import PieChartGraph from "./PieChart";
import './ExpenseTracker.css';
import { ModalContext } from "../App";
import { AddBalanceModalContext } from "../App";
import { expenseContext } from "../App";

function ExpenseTracker({chartData}){
    const {setShowModal, setModalTitle} = useContext(ModalContext);
    const {setShowAddBalanceModal} = useContext(AddBalanceModalContext);
    const {expense} = useContext(expenseContext);

    const handleAddExpense = () =>{
        setModalTitle("Add Expense");
        setShowModal(true);
    };
    
    const handleAddBalance = () =>{
        setShowAddBalanceModal(true);
    };

    return(
        <>
            <div className="ExpenseArea" style={{display:'flex', justifyContent:'space-around', alignItems:'center',padding:'50px',backgroundColor:'#626262', flexWrap:'wrap'}}>
                <div className="ExpenseCard">
                    <p>Wallet Balance: <span className="Income">₹{expense.balance}</span></p>
                    <button className="AddIncomeBtn" onClick={handleAddBalance}>+ Add Income</button>
                </div>
                <div className="ExpenseCard">
                    <p>Expense: <span className="Expense">₹{expense.expense}</span></p>
                    <button className="AddExpenseBtn" onClick={handleAddExpense}>+ Add Expense</button>
                </div>
                <div>
                    <PieChartGraph data={chartData}/>
                </div>
            </div>
        </>
    )
}

export default memo(ExpenseTracker);