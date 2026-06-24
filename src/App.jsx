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

     const savedAssets = localStorage.getItem("assets");

    const initialAssets = savedAssets
        ? JSON.parse(savedAssets)
        : [
            { id: 101, name: "Dell Laptop", status: "Available" },
            { id: 102, name: "HP Monitor", status: "Assigned" },
            { id: 103, name: "MacBook Pro", status: "Under Repair" },
        ];

    const [assets, setAssets] = useState(initialAssets);

    const initialRequests = [
  {
    id: 1,
    employeeName: "Lakshay",
    assetId: 101,
    requestStatus: "Pending",
    requestDate: "2026-06-20"
  }
];

const [requests, setRequests] = useState(initialRequests);

useEffect(() => {
  localStorage.setItem("assets", JSON.stringify(assets));
}, [assets]);


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