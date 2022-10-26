import './App.css';
import {useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField'
import React, { useState } from "react";


function Projects(){
  return(
    <div>
      <h1>Projects</h1>
      <ProjectList name = "1" availabileSets = {100}/>
      <ProjectList name = "2" availabileSets = {100}/>
      <ProjectList name = "3" availabileSets = {100}/>
    </div>
  );
}

function ProjectList(props){
  const[joinPressed, setStatus] = useState(false); 
  const[joinButton, setjoinText] = useState("Join"); 

  const changeJoinState = () => {
    if(joinPressed){
      setjoinText("Join");
      setStatus(false); 
      fetch("/Join/" + props.name).then(response => response.json()
      ).then((data) =>{
        console.log(data) 
        alert("Join" + data.Status)})  
    } 
    else{
      setjoinText("Leave"); 
      setStatus(true); 
      fetch("/Leave/" + props.name).then(response => response.json()
      ).then((data) =>{
        console.log(data) 
        alert("Leave" + data.Status)})  
    }
  }

  return (
    <div class = "box" style={{
      backgroundColor: joinPressed ? '#00B74A' : '',
    }} >
      <h2>Project Name {props.name}</h2>
      <p>list, of, authorized, users</p>
    <div>
      <HWSet name = "1" availabileSets = {props.availabileSets}/>
      <HWSet name = "2" availabileSets = {props.availabileSets}/>
    </div>
      <Button sx={{ m: 2 }} variant="contained" onClick={(e) => {changeJoinState()}}>{joinButton}</Button>
    </div>
  );
}

function HWSet(props){
  let sets = parseInt(props.availabileSets, 10); 
  const [textValue, setValue] = useState(""); 
  const[availableSets, setState] = useState(sets);

  const CheckIn = (val) => {
    let y = props.availabileSets - availableSets; 
    if(parseInt(availableSets, 10) +parseInt(val, 10) <= sets){
      let x = (parseInt(availableSets, 10) + parseInt(val, 10)); 
      setState(x);
      y = x; 
    }
    else{
      setState(parseInt(props.availableSets, 10)); 
    }
    fetch("/CheckedIn/" + props.name + "/" + y).then(response => response.json()
      ).then((data) =>{
        console.log(data) 
        alert("CheckedIn" + data.Quantity)}) 
  }

  const CheckOut = (val) => {
    let y = availableSets; 
    if(parseInt(val, 10) < parseInt(availableSets, 10)){
      let x = (parseInt(availableSets, 10) - parseInt(val, 10)); 
      setState(x);  
      y = x;
    }
    else{
      setState(0); 
    }
    let url = 'https://sheltered-plains-55782.herokuapp.com/CheckOut/${props.name}/${y}'; 
    fetch(url).then((response) => response.json().then(value => {
      let quantity = value["Quantity"];
      alert(quantity)
    }))
  }

  return(
    <div>
      <h3> HWSet{props.name}: {availableSets}/{props.availabileSets}</h3>
      <TextField sx = {{m: 2}} id = "outlined-basic" label = "Enter Quantity" variant = "outlined"
        value = {textValue} onChange = {(clicked) => {
          setValue(clicked.target.value);}}/>
      <Button sx={{ m:2 }} onClick={(clicked) => {CheckIn(textValue)}} variant = "contained">Check In</Button>
      <Button sx={{ m:2 }} onClick={(clicked) => {CheckOut(textValue)}} variant = "contained">Check Out</Button>
    </div>
  );
}

function App(){

  return(
    <Projects />
  );
}

export default App;
