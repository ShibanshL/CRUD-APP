import React,{useEffect,useState} from 'react'
import './Main.css'
import {useStore,useCategory,useSearch, useNotification} from '../API_MNAGE'
import { DeleteData, EditData } from '../fetchers/AllFetchers'

interface APIDATA {
    id:string,
    Task:string,
    Done:boolean
  }
  

function Display() {
  const category = useCategory((state:any) => state.category)
  const search = useSearch((state:any)=>state.search)
  const change = useStore((state:any) => state.count)
  const setChange = useStore((state:any) => state.inc)
  const setNotify = useNotification((state:any) => state.setNotification)
  const [loading, setLoading] = useState(false)
  const [doneClick, setDoneClick] = useState(false)
  const[apiData,setApiData] = useState([])
  const[filterData,setFilterData] = useState([])
  const [edit, setEdit] = useState({
    ifClicked:false,
    currentVal:''
  })
  const [editText,setEditText] = useState({id:'',Task:'',Done:false})

  //This function fetches data also filters them if required
  const dataFetch =async () => {
    setFilterData([])
    var url = 'http://localhost:3031/posts';
    var res = await fetch(url)
    var data = await res.json()
    

    if(category && !search){
      if(category == 'DONE'){
        setLoading(true)
        setFilterData([])
        const dataSelect = data.filter((val:any) => val.Done == true)
        setFilterData(dataSelect)
        setLoading(false)
      }

      if(category == 'NOT DONE'){
        setLoading(true)
        setFilterData([])
        const dataSelect = data.filter((val:any) => val.Done == false)
        setFilterData(dataSelect)
        setLoading(false)
    }
    }

    
    if(search && !category){
      setFilterData([])
      const dataSearch = data.filter((val:any) => val.Task.includes(search))
      setFilterData(dataSearch)
    }

    if(category && search){
      setFilterData([])
      if(category == 'DONE'){
        const dataSelect = data.filter((val:any) => val.Task.includes(search) && val.Done == true)
        setFilterData(dataSelect)
      }

      if(category == 'NOT DONE'){
        const dataSelect = data.filter((val:any) => val.Task.includes(search) && val.Done == false)
        setFilterData(dataSelect)
      }

       if(!category){
        setFilterData([])
        const dataSearch = data.filter((val:any) => val.Task.includes(search))
        setFilterData(dataSearch)
    }
    }

   
    if(!category || !search){
      const filter = data.filter((val:any) => val.Task != '')
      setApiData(filter)
    }

  }

 
  //This useeffect calls the fetch function every time user makes some changes
  useEffect(()=>{
    dataFetch()
  },[change])

  
  //This useeffect calls the fetch function every time user tries to filter data
  useEffect(()=>{
    setTimeout(()=>{
    dataFetch()

    },3000)
  },[category || search])
   

  //This is the loading screen   
  if(filterData.length<1&&(search||category)){
    return(
        <>
          <div style={{height:'75%',width:'95%', color:'black', fontSize:'2em',borderRadius:'30px', background:'rgba(255,255,255,0.5)',transition:'1s ease', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
            Loading
          </div>
        </>
    )
  }

  //This is the loading screen   
  if(apiData.length<1){
    return(
        <>
            <div style={{height:'75%',width:'95%', color:'black', fontSize:'2em',borderRadius:'30px', background:'rgba(255,255,255,0.5)',transition:'1s ease', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'20px'}}>
            Loading
            </div>
        </>
    )
  }

  //This function using changes the status of by changing a boolean value
  const checkDone =async (id:string,task:string, done:boolean) => {

    var data = {id:id,Task:task,Done:true}

    if(done){
      data = {id:id,Task:task,Done:false}
    }

    if(!done){
      data = {id:id,Task:task,Done:true}
    }

    await fetch(`http://localhost:3031/posts/${id}`,{
      method:'PUT',
      body:JSON.stringify(data),
      headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
      },
  }).then(res => {console.log(res)})
  setChange()
  setDoneClick(false)


  }

  //this statement renders the filterd data for the user
  if(search || category){
    return(
      <>
        <div className="Display">
          <div className="Display_Sub">
          {filterData.map((e:APIDATA)=>{

            return(
              <div key={e.id} className='Cards'>
                <div className="cardText">
                  <div className="cardText_Sub">
                    {!edit.ifClicked?<p style={e.Done?{textDecoration:'line-through'}:{color:'black'}}>{e.Task}</p>:edit.currentVal == e.Task?<textarea rows={4} style={{width:'100%', border:'none', background:'white', color:'black', outline:'none'}} value={editText.Task} onChange={(e:any)=>{setEditText({...editText,Task:e.target.value})}}/>:<p style={e.Done?{textDecoration:'line-through'}:{color:'black'}}>{e.Task}</p>}
                  </div>
                </div>
                <div className="cardButtons">
                  <div className="cardButton_Sub">
                    <div className="sub_Button">
                     {!edit.ifClicked?(
                     <> 
                        <button style={{background:'white'}} onClick={()=>{setEdit({currentVal:e.Task,ifClicked:true}); setEditText({id:e.id, Task:e.Task,Done:e.Done})}}>
                          E
                        </button>
                        <button style={{background:'white'}} onClick={() => {DeleteData(e.id);setNotify('DELETE')}}>
                          D
                        </button>
                      </>):edit.currentVal == e.Task?
                      (<>
                       <button style={{background:'rgb(11, 255, 44)'}} onClick={()=>{setEdit({currentVal:'',ifClicked:false}); EditData(e.id, editText);setChange();setNotify("EDIT")}}>
                          Y
                        </button>
                        <button style={{background:'#ee1313de'}} onClick={()=>{setEdit({currentVal:'',ifClicked:false})}}>
                          N
                        </button>
                      </>):
                      (
                        <> 
                           <button onClick={()=>{setEdit({currentVal:e.Task,ifClicked:true})}}>
                             E
                           </button>
                           <button>
                             D
                           </button>
                         </>)}
                    </div>
                    <div className="DoneButton">
                    <button style={{opacity:'50%'}} onClick={()=>{ checkDone(e.id,e.Task,e.Done)}} disabled={true}>{e.Done?'UNDO':'DONE'}</button>
                    </div>
                  </div>
                </div>
              </div>
            )
           
          })}
          </div>
          
        </div>
      </>
    )
  }


  return (
    <div className="Display">
          <div className="Display_Sub">
          {apiData.map((e:APIDATA)=>{
            return(
              <div key={e.id} className='Cards'  data-testid='check'>
                <div className="cardText">
                  <div className="cardText_Sub">
                    {!edit.ifClicked?<p style={e.Done?{textDecoration:'line-through'}:{color:'black'}}>{e.Task}</p>:edit.currentVal == e.Task?<textarea rows={4} data-testid='editingText' style={{width:'100%', border:'none', background:'white', color:'black', outline:'none'}} value={editText.Task} onChange={(e:any)=>{setEditText({...editText,Task:e.target.value})}}/>:<p style={e.Done?{textDecoration:'line-through'}:{color:'black'}}>{e.Task}</p>}
                  </div>
                </div>
                <div className="cardButtons">
                  <div className="cardButton_Sub">
                    <div className="sub_Button">
                     {!edit.ifClicked?(
                     <> 
                        <button data-testid='EditButton' style={{background:'white'}} disabled={e.Done?true:false} onClick={()=>{setEdit({currentVal:e.Task,ifClicked:true}); setEditText({id:e.id, Task:e.Task,Done:e.Done})}}>
                          E
                        </button>
                        <button data-testid='DeleteButton' style={{background:'white'}} onClick={() => {DeleteData(e.id); setNotify('DELETE');setChange()}}>
                          D
                        </button>
                      </>):edit.currentVal == e.Task?
                      (<>
                       <button name='Y' data-testid='editingChoice' style={{background:'rgb(11, 255, 44)'}} onClick={()=>{setEdit({currentVal:'',ifClicked:false}); EditData(e.id, editText); setChange();setNotify('EDIT')}}>
                          Y
                        </button>
                        <button name="N" style={{background:'#ee1313de'}} onClick={()=>{setEdit({currentVal:'',ifClicked:false})}}>
                          N
                        </button>
                      </>):
                      (
                        <> 
                           <button data-testid='EditButton' onClick={()=>{setEdit({currentVal:e.Task,ifClicked:true})}}>
                             E
                           </button>
                           <button>
                             D
                           </button>
                         </>)}
                    </div>
                    <div className="DoneButton">
                    <button style={edit.ifClicked?{opacity:'50%'}:{}} disabled={edit.ifClicked?true:false} onClick={()=>{ checkDone(e.id,e.Task,e.Done)}}>{e.Done?'UNDO':'DONE'}</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          </div>
        </div>
  )
}

export default Display