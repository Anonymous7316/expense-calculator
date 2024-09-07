import React, { memo, useState, useContext } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { MdOutlineEdit } from "react-icons/md";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoGiftOutline } from "react-icons/io5";
import { CiRollingSuitcase } from "react-icons/ci"
import { GrLinkPrevious } from "react-icons/gr";
import { GrLinkNext } from "react-icons/gr";
import './RecentTransaction.css';
import { ModalContext } from "../App";

const data = [
    {
        id:1,
        type:'Food',
        expense:150,
        date:'March 20, 2024',
        expenseOn:'Samosa',
    },
    {
        id:2,
        type:'Entertainment',
        expense:300,
        date:'March 21, 2024',
        expenseOn:'Movie',
    },
    {
        id:3,
        type:'Travel',
        expense:50,
        date:'March 22, 2024',
        expenseOn:'Auto',
    },
    {
        id:4,
        type:'Travel',
        expense:50,
        date:'March 22, 2024',
        expenseOn:'Auto',
    }
];

function RecentTransaction(){
    const [transactions,setTransactions] = useState(data);
    const {showModal, setShowModal, setModalTitle} = useContext(ModalContext);
    const handleEdit = (e,id) =>{
        e.stopPropagation();
        console.log(id);
        setModalTitle("Edit Expense");
        setShowModal(true);
    };
    const handleDelete = (e,id) =>{
        e.stopPropagation();
        setTransactions((prevState)=>prevState.filter((transaction)=>transaction.id!==id));
        console.log(id);
    };

    return(
        <div style={{margin:10, padding:20, display:'flex', justifyContent:'space-between', flexDirection:'column',height:'92%'}}>
            {
                transactions.length?
            <div>
                {transactions.map((transaction)=>{
                    return(
                        <div key={transaction.id} style={{color:'black', display:'flex', justifyContent:'space-between', borderBottom:'1px solid #9B9B9B'}}>
                            <div style={{display:'flex', justifyContent:'space-between',alignItems:'center',gap:15, padding:10}}>
                                <div className="type" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                    {transaction.type==='Food'?<IoFastFoodOutline/>:transaction.type==='Entertainment'?<IoGiftOutline/>:<CiRollingSuitcase/>}
                                </div>
                                <div><p className="expenseOn" style={{margin:2}}>{transaction.expenseOn}</p><span className="date">{transaction.date}</span></div>
                            </div>
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center',gap:25}}>
                                <p className="expense">₹{transaction.expense}</p>
                                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',width:80}}>
                                    <button className="delete" onClick={(e)=>{handleDelete(e,transaction.id)}}><TiDeleteOutline/></button>
                                    <button className="edit" onClick={(e)=>{handleEdit(e,transaction.id)}}><MdOutlineEdit/></button>
                                </div>
                            </div>
                        </div>
                    )
                }).splice(0,3)}
            </div>
            :
            <div style={{color:'#9B9B9B', display:'flex', justifyContent:'center', alignItems:'center', height:'100%'}}>
                No Recent Transactions.
            </div>
            }
          <div>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center', gap:10, height:50, marginTop:10}}>
                  <button className="paginationBtn"><GrLinkPrevious/></button>
                  <p className="paginationCount">1</p>
                  <button className="paginationBtn"><GrLinkNext/></button>
              </div>
          </div>
        </div>
    )
}

export default memo(RecentTransaction);