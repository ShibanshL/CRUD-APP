import React,{useEffect,useState} from 'react'
import './Main.css'
import Display from './Display'
import Add from './Add'
import Filter from './Filter'
import { useNotification } from '../API_MNAGE'

function Main() {
  const notify = useNotification((state:any) => state.notification)
  const setNotify = useNotification((state:any) => state.setNotification)
  const [loading,setLoading] = useState(false)
  const [val,setVal] = useState(-200)


  //this useEffect basically contorls the notifications
  useEffect(()=>{
    if(notify){
      setVal(10)

      setTimeout(() => {
        setNotify('')
      }, 3000)
    }
    if(notify ==''){
      setVal(-200)
    }

  },[notify])

  //This funciton based on the users action gives out the notification
  const Notif = () => {
    if(notify == 'ADD'){
        return(
          <>
            <div style={{position:'absolute',zIndex:4,borderRadius:'20px', bottom:val, backdropFilter: 'blur(16px) saturate(180%)', backgroundColor:' rgba(240, 240, 240, 0.45)', height:'100px', width:'40vw', transition:'0.8s ease', display:'flex', alignItems:'center',justifyContent:'center', color:'rgba(0,0,0,0.5)'}}>
              <h2 style={{fontSize:'2vw', color:'black'}}>Your data has been succesfully Added!!</h2>
            </div>
          </>
        )
      }

       if(notify == 'DELETE'){
        return(
          <>
            <div style={{position:'absolute',zIndex:4,borderRadius:'20px', bottom:val, backdropFilter: 'blur(16px) saturate(180%)', backgroundColor:' rgba(240, 240, 240, 0.45)', height:'100px', width:'40vw', transition:'0.8s ease', display:'flex', alignItems:'center',justifyContent:'center', color:'rgba(0,0,0,0.5)'}}>
              <h2 style={{fontSize:'2vw', color:'black'}}>Your data has been succesfully Deleted!!</h2>
            </div>
          </>
        )
      }

       if(notify == 'EDIT'){
        return(
          <>
            <div style={{position:'absolute',zIndex:4,borderRadius:'20px', bottom:val, backdropFilter: 'blur(16px) saturate(180%)', backgroundColor:' rgba(240, 240, 240, 0.45)', height:'100px', width:'40vw', transition:'0.8s ease', display:'flex', alignItems:'center',justifyContent:'center'}}>
              <h2 style={{fontSize:'2vw', color:'black'}}>Your data has been succesfully Edited!!</h2>
            </div>
          </>
        )
      }
  }
  

  return (
    <div className='Main'>
      <div className='Main_Sub'>
        <Add />
        <Filter />
        <Display />
      {Notif()}
      </div>
    </div>
  )
}

export default Main