import React,{useEffect, useState} from 'react'
import './Main.css'
import {useStore, useNotification} from '../API_MNAGE'
import { AddData } from '../fetchers/AllFetchers'

function Add() {
    const[val,setVal] = useState('')
    const [tasks,setTasks]=useState({id:'',Task:'',Done:false})
    const setNotify = useNotification((state:any) => state.setNotification)
    const change = useStore((state:any) => state.count)
    const setChange = useStore((state:any) => state.inc)



    useEffect(()=>{
        AddData(tasks)
        setChange()
        setVal('')
    },[tasks])

  
    const handleSub = () => {
        setTasks({...tasks,id:JSON.stringify(Math.floor(100000 + Math.random() * 900000)),Task:val})
        AddData(tasks)
        setChange()
        setNotify('ADD')
    }

  return (
    <div className="Add">
      <div className="Add_Sub">
        <input value={val} data-testid='Add_Input' onChange={(e:any)=>{setVal(e.target.value)}} placeholder='Write your stuff here'/>
        <button name="SUBMIT" onClick={handleSub}>SUBMIT</button>
      </div>
    </div>
  )
}

export default Add