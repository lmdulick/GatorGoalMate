import React, { useEffect, useState } from 'react'

function App() {

  const [backendData, setBackendData] = useState([])

  const makeAPICall = async () => {
    const response = await fetch('http://localhost:5000/api/', {mode:'cors'});
    const data = await response.json();
    //console.log({ data })
    //console.log(data.users)
    setBackendData(data.users)
    //console.log(backendData)
    }
    
    useEffect(() => {
        makeAPICall();
      }, [])

    useEffect(() => {
      console.log(backendData);
    }, [backendData]);
  // useEffect(async () => {
  //   const response = await fetch('http://localhost:5000/api/', {mode:'cors'});
  //   const data = await response.json();
  //   console.log({ data })
  //   // fetch('http://localhost:5000/api'), { mode: 'cors' }.then(
  //   //   response => response.json()
  //   // ).then(
  //   //   data => {
  //   //     setBackendData(data)
  //   //     console.log(backendData)
  //   //   }
  //   // )
  // }, [])

  return (
    <div>

      {(typeof backendData === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.map((user, i) => (
          <p key={i}>{user}</p>
        ))
      )}

    </div>
  )
}

export default App

// react local host: http://localhost:3000/