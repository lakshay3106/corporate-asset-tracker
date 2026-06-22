import { useState } from "react";

function AssetCard(props){

    const [isEditing,setisEditing]=useState(false);
    const [editedName,setEditedName]=useState(props.name);
    const [editedStatus,setEditedStatus]=useState(props.status);


    return(
        <div>
            {isEditing ? (
                <div>
                    <input 
                        type="text"
                        value={editedName}
                        onChange={(e)=>setEditedNameetEditedName(e.target.value)}
                        />

                    <select 
                    value={editedStatus}
                    onChange={(e) =>
                             setEditedStatus(e.target.value)
    }
>
                            <option>Available</option>
                            <option>Assigned</option>
                            <option>Under Repair</option>
                    </select>
                    <button onClick={()=>{
                         const updatedAsset = {
                            id:props.id,
                            name: editedName,
                            status: editedStatus
                         };

                         props.onUpdate(updatedAsset);
                         setisEditing(false);
                    }}>Save</button>
                    <button onClick={()=>setisEditing(false)}>Cancel</button>




            
            </div>
            )

            :
            (
                <div>
                    <p>{props.id}</p>
                    <h3>{props.name}</h3>
                    <p>Status : {props.status}</p>
                    <button onClick={()=>{
                        const assetToDelete={
                            id:props.id,
                            name:props.name,
                            status:props.status
                        };
                        props.onDelete(assetToDelete)}}>Delete</button>
                        
                    <button onClick={()=>setisEditing(true)}>Edit</button>
                </div>
            )

        }

        </div>

      

    );
}

export default AssetCard