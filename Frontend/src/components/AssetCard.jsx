import { useState } from "react";
import { FaLaptop, FaEdit, FaTrash } from "react-icons/fa";

function AssetCard(props) {
    

    const [isEditing, setisEditing] = useState(false);
    const [editedName, setEditedName] = useState(props.name);
    const [editedStatus, setEditedStatus] = useState(props.status);

    function getStatusColor() {

        if (props.status === "Available") {
            return "bg-green-100 text-green-700";
        }

        if (props.status === "Assigned") {
            return "bg-purple-100 text-purple-700";
        }

        return "bg-orange-100 text-orange-700";
    }

    return (

        <div className="
            bg-white
            rounded-2xl
            shadow-md
            p-6
            hover:shadow-2xl
            hover:-translate-y-3
            transition-all
            duration-300
        ">

            {isEditing ? (

                <div className="space-y-4">

                    <input
                        className="
                            w-full
                            p-3
                            border
                            rounded-lg
                        "
                        type="text"
                        value={editedName}
                        onChange={(e) =>
                            setEditedName(e.target.value)
                        }
                    />

                    <select
                        className="
                            w-full
                            p-3
                            border
                            rounded-lg
                        "
                        value={editedStatus}
                        onChange={(e) =>
                            setEditedStatus(e.target.value)
                        }
                    >
                        <option>Available</option>
                        <option>Assigned</option>
                        <option>Under Repair</option>
                    </select>

                    <div className="flex gap-3">

                        <button
                            className="
                                flex-1
                                bg-green-600
                                text-white
                                py-2
                                rounded-lg
                            "
                            onClick={() => {

                                const updatedAsset = {
                                    _id: props._id,
                                    name: editedName,
                                    status: editedStatus
                                };

                                props.onUpdate(updatedAsset);
                                setisEditing(false);
                            }}
                        >
                            Save
                        </button>

                        <button
                            className="
                                flex-1
                                bg-gray-400
                                text-white
                                py-2
                                rounded-lg
                            "
                            onClick={() =>
                                setisEditing(false)
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </div>

            ) : (

                <div>

                    <div className="text-5xl mb-4">
                        💻
                    </div>

                    <h3 className="text-2xl font-bold mb-3">
                        {props.name}
                    </h3>

                    <p className="text-gray-500 mb-2">
                        Asset ID: {props._id}
                    </p>

                    <span className={`
                        inline-block
                        px-4
                        py-2
                        rounded-full
                        text-sm
                        font-semibold
                        mb-6
                        ${getStatusColor()}
                    `}>
                        {props.status}
                    </span>

                    <div className="flex gap-3">

                        <button
                            className="
        bg-slate-700
        text-white
        px-5
        py-2
        rounded-lg
        hover:bg-slate-800
        transition
        disabled:opacity-50
    "
                            onClick={() => {

                                const assetToDelete = {
                                    _id: props._id,
                                    name: props.name,
                                    status: props.status
                                };

                                props.onDelete(assetToDelete);
                            }}
                        >
                            <FaTrash />
                            Delete
                        </button>

                        <button
                            className="
        bg-slate-700
        text-white
        px-5
        py-2
        rounded-lg
        hover:bg-slate-800
        transition
        disabled:opacity-50
    "
                            onClick={() =>
                                setisEditing(true)
                            }
                        >
                            <FaEdit />
                            Edit
                        </button>

                    </div>

                </div>

            )}

        </div>

    );
}

export default AssetCard;