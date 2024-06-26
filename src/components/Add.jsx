import { faCloudArrowUp, faFilm } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addVideoApi, getVideoFromHistoryApi } from '../services/allApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Watchhistory() {

    const getHistory =  async() =>{
        const result = await getVideoFromHistoryApi()
        console.log(result);
    }
    useEffect(()=>{
        getHistory()
    },[])
}


function Add({setAddStatus}) {

    //create a state to hold data from input field
    const [video,setVideo] = useState({
        caption:"",
        image:"",
        url:""
    })

    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setVideo({
            caption:"",
            image:"",
            url:""
        })
    };
    const handleShow = () => setShow(true);

    const validateLink =(e) => {
        /* console.log(e.target.value); */
        const link = e.target.value
        
        if(link.endsWith('?feature=shared')){
            const yTkey = link.slice(-26,-15)
            /* console.log(yTkey); */
            let embedLink = `https://www.youtube.com/embed/${yTkey}`
            setVideo ({...video,url:embedLink})
            console.log();
            
        }
        else if(link.startsWith('https://youtu.be/') ){
            const yTkey = link.slice(17,28)
            /* console.log(yTkey); */
            let embedLink = `https://www.youtube.com/embed/${yTkey}`
            setVideo ({...video,url:embedLink})
            
        }
        else {
            const yTkey = link.slice(-11)
            /* console.log((yTkey)); */
            let embedLink = `https://www.youtube.com/embed/${yTkey}`
            setVideo({...video,url:embedLink})
            
        }
    }
    /* console.log(video); */

    /* const handleClose1 = () => {
        setVideo({
            caption:"",
            image:"",
            url:""
        })
    } */

    const handleUpload = async(e) =>{
        e.preventDefault()

        const {caption, image , url} = video

        if(!caption || !image || !url){
            toast.info('Please fill the form completely')
        }
        else{
            const result = await addVideoApi(video)
            /* console.log(result); */
            if(result.status>=200 && result.status<300){
                toast.success('Video Uploaded Successfully')
                setAddStatus(result.data)
                handleClose()
            }
            else{
                toast.error('Something went wrong')
                handleClose()
            }
        }
    }

    /* 
        https://www.youtube.com/watch?v=tOM-nWPcR4U
    */

    /* 
        https://youtu.be/tOM-nWPcR4U?si=62gTcpKolpw6i1Q6
     */

    /* 
        <iframe width="640" height="360" src="https://www.youtube.com/embed/tOM-nWPcR4U" title="Illuminati|Aavesham|Jithu Madhavan|Fahadh Faasil|Sushin Shyam,Dabzee,Vinayak| Nazriya|Anwar Rasheed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
     */

  return (
    <>
        <div className='d-flex align-items-center'>
            <h5 id='h'>Upload new Video</h5>
            <button className='btn' onClick={handleShow}><FontAwesomeIcon icon={faCloudArrowUp} size='xl'/></button>
        </div>

        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title className='text-warning'><FontAwesomeIcon icon={faFilm} className='me-2'/>Upload Videos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Please fill the following details</p>
            <input type="text" placeholder='Video Caption'  className='form-control' onChange={(e) => setVideo({...video,caption:e.target.value})}/>
            <input type="text" placeholder='Video Image'  className='form-control mt-3' onChange={(e) => setVideo({...video,image:e.target.value})} />
            <input type="text" placeholder='Video URL'  className='form-control mt-3' onChange={(e) => validateLink(e)}/>
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="warning" onClick={handleUpload}>
            Upload
        </Button>
        </Modal.Footer>
        </Modal>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}/>
    </>
  )
}

export default Add