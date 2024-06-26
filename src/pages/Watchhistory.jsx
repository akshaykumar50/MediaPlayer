import { faArrowLeft, faHouse, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { deleteVideoFromHistoryApi, getVideoFromHistoryApi } from '../services/allApi';
import { useEffect } from 'react';



function Watchhistory() {

  const [videoHistory,setVideoHistory] = useState([])
  const[deleteStatus , setDeleteStatus] =useState([])

  const getHistory = async()=>{
    const result = await getVideoFromHistoryApi()
    
    if(result.status>=200 && result.status<300){
      setVideoHistory(result.data)
    }       
  }
  console.log(videoHistory);

  
  useEffect(()=>{
    getHistory()
  },[deleteStatus])

  const deleteHistory = async(id)=>{
    const result = await deleteVideoFromHistoryApi(id)
    setDeleteStatus(result.data)
    console.log(result.status);
  }

  return (
    <>
      <div className='d-flex p-3 m-5'>
        <h4 className='ms-md-5'>Watch History</h4>
        <h5 className='ms-auto me-md-5'><Link style={{textDecoration:'none',color:'white'}} to={'/home'}> <span id='h'><FontAwesomeIcon icon={faArrowLeft} beat className='me-2' /> Back to Home </span><FontAwesomeIcon icon={faHouse} className='ms-2' /></Link></h5>
      </div>
      <div className='row w-100'>
        <div className="col-md-1"></div>
        <div className="col-md-10 ">
          {videoHistory?.length>0?
            <Table responsive className='table table-bordered table-light text-center'>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Caption</th>
                  <th>URL</th>
                  <th>Time Stamp</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {videoHistory?.map((item,index)=>(<tr>
                  <td>{index+1}</td>
                  <td>{item?.caption}</td>
                  <td><Link to={item?.url} target='_blank'>{item?.url}</Link></td>
                  <td>{item?.timeStamp}</td>
                  <td className='text-center'><Button className='btn btn-danger ms-auto' onClick={()=>deleteHistory(item.id)}><FontAwesomeIcon icon={faTrashCan} /></Button></td>
                </tr>))}
              </tbody>

            </Table>
            :
            <p className='text-warning fs-5'>No watch History</p>}
        </div>
        <div className="col-md-1"></div>
        
      </div>
    </>
  )
}

export default Watchhistory