import React,{ useState } from 'react';



const AddTest = () => {

const [data,setData] = useState({
    name : '',
    code : '',
})



const submitAction = (e)=>{
 // e.preventDefault();
 fetch('http://localhost:3000/tests', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'from react',
    testScriptCode: 'testing'
  })
});
fetch();
    console.log(data);
}

    return ( 
      <div>
    <h3>Add Test Script</h3>
    <form onSubmit={submitAction}>
  <label>
    Name: 
    <input type="text" name="name" onChange={e=> setData({...data, name : e.target.value})} value={data.name} />
  </label>

  <br />

  <label>
    Code: 
    <textarea type="text" name="code" onChange={e=> setData({...data, code : e.target.value})} value={data.code} />
  </label>

  <br />
  
  <input type="submit" value="Save"  />
</form>
</div>
    );
      
    }

export default AddTest;