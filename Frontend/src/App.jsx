import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useState,useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Assets from "./pages/Assets";
import Requests from "./pages/Requests";
import MyDesk from "./pages/MyDesk";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";


function App() {

    const [assets, setAssets] = useState([]);


const [requests, setRequests] = useState([]);

useEffect(()=>{
  fetch("http://localhost:5000/assets")
    .then((response)=>response.json())
    .then((data)=>{
      setAssets(data);
    })
    .catch((error)=>{
      console.error(error);
    })
},[]);


useEffect(()=>{
  fetch("http://localhost:5000/requests")
    .then((response)=>response.json())
    .then((data)=>{
      setRequests(data);
    })
    .catch((error)=>{
      console.error(error);
    })
},[]);




  return (
    <BrowserRouter>

       <Navbar />

  <div className="flex">

      <Sidebar />

    <div className="flex-1 p-8 bg-slate-100 min-h-screen">
      <Routes>
       <Route
  path="/"
  element={<Dashboard assets={assets} />}
/>

<Route
  path="/assets"
  element={
    <Assets
      assets={assets}
      setAssets={setAssets}
    />
  }
/>

<Route
  path="/requests"
  element={<Requests
            assets={assets}
            setAssets={setAssets}
            requests={requests}
            setRequests={setRequests}
        />}
/>

<Route
  path="/my-desk"
  element={<MyDesk 
                assets={assets}
                setAssets={setAssets}/>}
/>
      </Routes>
</div>
</div>
    </BrowserRouter>
  );
}

export default App;