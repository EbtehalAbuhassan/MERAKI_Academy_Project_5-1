import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import Input from '@mui/material/Input';
import {setinfouserOfoffer} from "../redux/offers/offerSlice"

import {setselectetUserProfile  , setselectedoffer_id} from "../redux/reducers/selected/index"

import React, { useEffect, useState ,useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
//-----------------------icons-------------------------------------------------
import { AiFillWechat } from "react-icons/ai";
import { ImAttachment } from "react-icons/im";
import {MdOpenWith} from "react-icons/md"
//---------------------------------------------------------------------------------
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';


import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';

import { Routes, Route, Link, useParams, useNavigate, Outlet } from "react-router-dom";
import "./projectInside.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { Card } from 'antd';
import Paymant from "../Paymant";
import Confermation from '../Confermation';
const { Meta } = Card;








const ProjectInside = () => {

const [Confermed, setConfermed] = useState(false)
 const projectTermination = ()=>{
  axios.put(`http://localhost:5000/projects/status/${state.selectedProject}`,{status_id:3})
  .then((resultinfo2) => {

      console.log("projects/status__________Done______", resultinfo2.data.project[0].title);

      axios.put(`http://localhost:5000/balance/${state.selectedProject}`,{status_id:9})
      .then((balance) => {
    
      console.log("!!!!!!!!!!!!!!!!!!!!!",balance)
   
        setConfermed(true)
})
.catch((err) => {
  console.log("error", err);

})

})
.catch((err) => {
  console.log("error", err);

})
  

 }


      
    const radioInput = useRef(null); //===refernce to reach redio input 

    const style = { //====this one style for the modal popup====
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
      };

//===for modal popup


function ChildModal() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
        
      <React.Fragment>
        <Button  className='button' onClick={ ()=>{handleOpen()
        
        
    
    
    }     
        }>Continue</Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="paymatn"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <h2 id="child-modal-title">Paymant </h2>
               <Paymant  cartItems={{offer_id:SelectedOffer,project_id:state.selectedProject ,projecttitle:projecttitle ,selectedofferdata: selectedofferdata}}/>
            <Button className='button' onClick={handleClose}>cancel</Button>
          </Box>
        </Modal>
      </React.Fragment>
      
    );
  }
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
//=======================



  const Navigate = useNavigate();
  const [createdDate, setcreatedDate] = useState(null);

  const [selectedProjectdata, setselectedProjectdata] = useState({});
  const [selectedProjecOffers, setselectedProjecOffers] = useState([]);
   const [AddOffer, setAddOffer] = useState(false)
const [newOfferData, setnewOfferData] = useState({})
const [budget, setbudget] = useState(0)
const [workday, setworkday] = useState(0)
const [jobOfferDescription, setjobOfferDescription] = useState("")
const [setAdd, setsetAdd] = useState(false)
const [SelectedOffer, setSelectedOffer] = useState(0)
const [projecttitle, setprojecttitle] = useState("")
const [selectedofferdata, setselectedofferdata] = useState({})

const [rate, setrate] = useState(0)

  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      project: state.project.project,
      majority: state.project.majority,
      status: state.project.status,
      selectedProject: state.selected.selectedProject,
      selectetUserProfile : state.selected.selectetUserProfile ,
      auth: state.auth,
      isLoggedIn: state.auth.isLoggedIn,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/projects/project/${state.selectedProject}`)
      .then((data) => {
        console.log("selectedProjectdata.data_________________", data.data);

        setselectedProjectdata(data.data.result[0]);
        setprojecttitle(data.data.result[0].title)
        const create_timestamp = data.data.result[0].created_at;
        const createdAt = new Date(create_timestamp);
        setcreatedDate(createdAt.toLocaleDateString("en-US"));
        setrate(Number(data.data.result[0].rate))
        console.log("------------------", createdDate, createdAt ,Number(data.data.result[0].rate));
      })
      .catch((err) => {
        console.log("error", err);
      });

    //================== to get offers ==========

    axios
      .get(`http://localhost:5000/joboffer/${state.selectedProject}`)
      .then((data) => {
        console.log("setselectedProjecOffers_________________", data.data.result);
        
        setselectedProjecOffers(data.data.result);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, [setAdd]);

  const addNewOffer = (data)=>{

  axios
      .post(`http://localhost:5000/joboffer/${state.selectedProject}`,data)
      .then((data) => {
        console.log("Done...............", data.data.result);
        setsetAdd(true)
        setAddOffer(false)
      
      })
      .catch((err) => {
        console.log("error", err);
      });
  }
// options={options}
  return (
    // <Elements stripe={stripePromise}  > 
    <div>
   <div className="upperboxinside">
      <h1> Project And Offers</h1>
      {/* <h3>Add offers ,choose  and skills</h3> */}

      </div>
     {  Confermed  && <Confermation />}
      <div className="project_inside">
        <div className="project_user">
          <div className="projectInsidefilterside" onClick={()=>{
               console.log(",,,,,,,,,,,,,",selectedProjectdata)
            dispatch(setselectetUserProfile(selectedProjectdata.user_id))
            Navigate("/ProfileSecond")
          }}>


          <Card
    hoverable
    style={{
      width: "100%",
      
    }}
    cover={<img alt="example" src={selectedProjectdata.image} />}
  >
    <Meta title={selectedProjectdata.firstname +' '+ selectedProjectdata.lastname}  />
  
  </Card>
          </div>
        </div>
        <div className="project_info">
          <div className="project_inside-info">
            <div className="details title ">
              {" "}
              <h2> Project : {selectedProjectdata.title} </h2>{" "}
              <h3> {createdDate}</h3>{" "}
            </div>
            <div>
              {/* <div className="project_inside_Line"></div> */}
              <div>
                <div className="section">
                  <div className="details2">
                    <div>
                      Price : {selectedProjectdata.projectprice} {"  "} ${" "}
                    </div>
                    <div>
                      {" "}
                      Time Expected : {selectedProjectdata.timeexpected} {"  "}
                      Days{" "}
                    </div>
                  </div>
                  <div className="details2">
                    <div> Majority : {selectedProjectdata.majorityname} </div>
                    <div> Status : {selectedProjectdata.statusname} </div>
                  </div>
                </div>
              </div>
              {/* <div className="project_inside_Line"></div> */}

              <div> Description : {selectedProjectdata.projectdescription}</div>
              <div className="attached ">
                <button
                  className="attached "
                  onClick={() => {
                    // {selectedProjectdata.?cv}
                  }}
                >
                  {" "}
                  
                  <a target='_blank' href={selectedProjectdata?.cv}><ImAttachment   className="file" />  </a>
                  {" "}
                </button>
              </div>
            </div>
          </div>

          <div className="project_inside-info-offer">
            <div className=" tag">
              {" "}
              <h2>Offers </h2>{" "}
              <div>
                <span>
                  {" "}

            { state.auth.userId == selectedProjectdata.user_id && state.isLoggedIn && <button className='button' onClick={()=>{

 console.log("________________________________________________",selectedProjectdata)

            }}>Invite Freelancers </button>}
            
            { state.auth.userId == selectedProjectdata.user_id  && selectedProjectdata.status_id == 2  &&  state.isLoggedIn &&  <button className='button' onClick={()=>{

projectTermination()


            }}> Project Termination </button>}


{/* state.auth.userId != selectedProjectdata.user_id && */}
            {  state.isLoggedIn &&    <button  className='button'  onClick={()=>{

                    setAddOffer(true)
                    setsetAdd(false)
                   }}> ADD Offer </button>}
                   {" "}
                </span>
              </div>
            </div>

            <div className="project_inside-offer">


            

            {  selectedProjecOffers?.length ?  selectedProjecOffers?.map((ProjecOffer)=>{
               return <div key={ProjecOffer.id}  className="project_inside_offer_one">

  {state.auth.userId == selectedProjectdata.user_id &&   <input className="input-radio" type="radio"    ref={radioInput}    name="selectedOffer" value= {  ProjecOffer.id  }  onChange={(e)=>{
        console.log(e.target.value ,ProjecOffer.id)
        setSelectedOffer(e.target.value)
       dispatch( setselectedoffer_id(ProjecOffer.id))
       setselectedofferdata(ProjecOffer)
        handleOpen()
    }}/>}

        <div className="offer_info">
         <AiFillWechat style={{color:"#0084CA"}}  className="chat_offer"  onClick={()=>{
          console.log(ProjecOffer)
          dispatch(setinfouserOfoffer(ProjecOffer))
           Navigate("/chat")
      }} />
          <div className="imguser"  >
            <img src={ProjecOffer.image}></img>
            <div className="imguser--cover imguser--cover--blur"> <button onClick={()=>{
                      console.log(".....................",ProjecOffer)
                      dispatch(setselectetUserProfile(ProjecOffer.user_id))
                      Navigate("/ProfileSecond")

        }}><MdOpenWith className="imguser--cover--icon" /></button></div>
          </div>
          <div>
  
             <div className="offer_info_inside" ><span>{ProjecOffer.firstname}</span>  <span> {ProjecOffer.workday} Days </span> <span> {ProjecOffer.budget} $ </span>
        </div>
      
             
              
          
          


          </div>
        </div>
        <div className="project_inside_Line"></div>
        <div className="freelancerinfo2">
          <div>
            <p>{ProjecOffer.jobofferdescription} </p>
          </div>
        </div>
    



                </div>

                })  : <p>No Offers </p> }



<div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <h2 id="parent-modal-title">Select Offer</h2>
          <p id="parent-modal-description">
            Press Continue to confirm the offer 
          </p>
          <Button className='button' onClick={()=>{handleClose()
             radioInput.current.checked =false
        }}>cancel</Button>
          <ChildModal />
        </Box>
      </Modal>
    </div>
  





            { AddOffer && <div className='project_inside_offer_one'>

     

            <Box className="box"
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '38ch' },
      

      }}
    
      noValidate
      autoComplete="off"
    >
            <TextField onChange={(e)=>{
                console.log("................",e.target.value)
                setbudget(e.target.value )
            }}
          id="standard-multiline-flexible"
          label="Price $ "
          multiline
          maxRows={4}
          variant="standard"
        />
        <TextField onChange={(e)=>{
                console.log("................",e.target.value)
               
                setworkday(e.target.value )
            }}
          id="standard-textarea"
          label="Work Days"
          placeholder="Placeholder"
          // multiline
          variant="standard"
        />
        {/* <TextField  fullWidth  onChange={(e)=>{
                console.log("................",e.target.value)
                setjobOfferDescription (e.target.value )
            }}
            
          id="standard-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="standard"
        /> */}
             <FormControl fullWidth sx={{ m: 1 ,width: '80ch' }} variant="standard">
          <InputLabel htmlFor="standard-adornment-amount">Description</InputLabel>
          <Input onChange={(e)=>{
                console.log("................",e.target.value)
                setjobOfferDescription (e.target.value )
            }}
            id="standard-multiline-static"
            multiline
            maxRows={4}
          />
        </FormControl>
           
            </Box>
   

            <button   className='button add-offer-but' onClick={()=>{
                console.log("..........offer add......",{  

                    budget: Number(budget),
                    workday :Number(workday),
                    jobOfferStatus_id:7,
                    jobOfferDescription :jobOfferDescription,
                    idproject : state.selectedProject ,
                    user_id:Number( state.auth.userId)


                   })

     
          
                   addNewOffer({
                    budget: Number(budget),
                    workday :Number(workday),
                    jobOfferStatus_id:7,
                    jobOfferDescription :jobOfferDescription,
                    idproject : state.selectedProject ,
                    user_id:Number( state.auth.userId)
                })

            }}> Add </button>
            </div>}

{/* <Outlet  cartItems={{offer_id:SelectedOffer,project_id:state.selectedProject  }}/> */}


            </div>
          </div>
        </div>
      </div>
    </div>
// </Elements>
  );
};

export default ProjectInside;
