import React, { memo } from "react";
import PieChartGraph from "./PieChart";
import './ExpenseTracker.css';

function ExpenseTracker(){
    return(
        <>
            <div className="ExpenseArea" style={{display:'flex', justifyContent:'space-around', alignItems:'center',padding:'50px',backgroundColor:'#626262', flexWrap:'wrap'}}>
                <div className="ExpenseCard">
                    <p>Wallet Balance: <span className="Income">₹4500</span></p>
                    <button className="AddIncomeBtn">+ Add Income</button>
                </div>
                <div className="ExpenseCard">
                    <p>Expense: <span className="Expense">₹500</span></p>
                    <button className="AddExpenseBtn">+ Add Expense</button>
                </div>
                <div>
                    <PieChartGraph/>
                </div>
            </div>
        </>
    )
}

export default memo(ExpenseTracker);