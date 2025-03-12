import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

const UserOverview = () => {

const [count,setCount] = useState(0)
const increament  = ()=>{
  setCount(count+1)
}
const decrement = ()=>{ 
  setCount(count-1)
}
const reset = ()=>{
  setCount(0)
}


useEffect (()=>{
async function getUser(){

  try {
    const response = await fetch ('http://dummyjson.com/users');
  } catch (err){
     throw err
  }
}
})



return (
  <div>
    <h1> the value of count is {count}</h1>

<button variant="primary" onClick={increament}>Increament</button>
<button variant="primary" onClick={decrement} >Decrement</button> <br />
<button variant="primary" onClick={reset}>Increament</button>

  </div>
);


}



export default UserOverview;


// state is an imprtent datastore of a component 
// useEffect is used to perform a sideeffect 
//the effect is always automatically caled first 
//No dependancy array function is called is any state changes 