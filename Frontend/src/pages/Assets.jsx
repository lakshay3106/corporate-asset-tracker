import { useState, useEffect } from "react";
import AssetCard from "../components/AssetCard";
import { FaSearch } from "react-icons/fa";

function Assets({assets,setAssets}) {

    const [assetName, setAssetName] = useState("");
    const [status, setStatus] = useState("Available");
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState(null);
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("none");
    const [currentPage, setCurrentPage] = useState(1);

    const assetsPerPage = 5;

const startIndex =
    (currentPage - 1) * assetsPerPage;

const endIndex =
    startIndex + assetsPerPage;

const totalAssets = assets.length;

const availableAssets =
    assets.filter(
        (asset) =>
            asset.status === "Available"
    ).length;

const assignedAssets =
    assets.filter(
        (asset) =>
            asset.status === "Assigned"
    ).length;

const repairAssets =
    assets.filter(
        (asset) =>
            asset.status === "Under Repair"
    ).length;

const displayedAssets =
    assets
        .filter((asset) =>
            asset.name
                .toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        )
        .filter((asset) => {
            if (filter === "All") {
                return true;
            }

            return asset.status === filter;
        });

if (sort === "A-Z") {
    displayedAssets.sort((a, b) =>
        a.name.localeCompare(b.name)
    );
}

else if (sort === "Z-A") {
    displayedAssets.sort((a, b) =>
        b.name.localeCompare(a.name)
    );
}

else if (sort === "newest") {
    displayedAssets.sort((a, b) =>
        b.id - a.id
    );
}

else if (sort === "oldest") {
    displayedAssets.sort((a, b) =>
        a.id - b.id
    );
}

const totalPages = Math.ceil(
    displayedAssets.length /
    assetsPerPage
);

const paginatedAssets =
    displayedAssets.slice(
        startIndex,
        endIndex
    );


function confirmDelete() {
    setAssets(
        assets.filter(
            (asset) =>
                asset.id !== assetToDelete.id
        )
    );

    setShowModal(false);
    setAssetToDelete(null);
}

function handlePrevious() {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
}

function handleNext() {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
}

async function handleUpdate(updatedAsset) {
    console.log("handleUpdate called", updatedAsset);
    try {
        console.log("Before fetch");
        const response = await fetch(
            `http://localhost:5000/assets/${updatedAsset.id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: updatedAsset.name,
                    status: updatedAsset.status
                })
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update asset");
        }
        console.log("After fetch",response.status)
        const assetFromBackend = await response.json();

        setAssets((prevAssets) =>
            prevAssets.map((asset) => {

                if (asset.id === assetFromBackend.id) {
                    return assetFromBackend;
                }

                return asset;
            })
        );

    } catch (error) {

        console.error(error);

    }

}

async function handleAsset() {

    if (!assetName.trim()) {
        alert("Please enter asset name");
        return;
    }

    try {

        const response = await fetch("http://localhost:5000/assets", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: assetName,
                status: status
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add asset");
        }

        const newAsset = await response.json();

        setAssets((prevAssets) => [...prevAssets, newAsset]);

        setAssetName("");
        setStatus("Available");

    } catch (error) {

        console.error(error);

    }

}
function handleDelete(asset) {
    setAssetToDelete(asset);
    setShowModal(true);
}

async function confirmDelete() {

    try {

        const response = await fetch(
            `http://localhost:5000/assets/${assetToDelete.id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete asset");
        }

        setAssets(prevAssets =>
            prevAssets.filter(
                asset => asset.id !== assetToDelete.id
            )
        );

        setShowModal(false);
        setAssetToDelete(null);

    }
    catch(error){

        console.error(error);

    }

}


    return (
  <div className="space-y-8">

    <h1 className="text-4xl font-bold text-slate-800">
    Asset Management
</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

    <div className="bg-white p-6 rounded-2xl shadow-md">
        <h3 className="text-gray-500">
            Total Assets
        </h3>

        <p className="text-4xl font-bold mt-2">
            {totalAssets}
        </p>
    </div>

    <div className="bg-green-50 p-6 rounded-2xl shadow-md">
        <h3 className="text-gray-500">
            Available
        </h3>

        <p className="text-4xl font-bold mt-2 text-green-600">
            {availableAssets}
        </p>
    </div>

    <div className="bg-purple-50 p-6 rounded-2xl shadow-md">
        <h3 className="text-gray-500">
            Assigned
        </h3>

        <p className="text-4xl font-bold mt-2 text-purple-600">
            {assignedAssets}
        </p>
    </div>

    <div className="bg-orange-50 p-6 rounded-2xl shadow-md">
        <h3 className="text-gray-500">
            Under Repair
        </h3>

        <p className="text-4xl font-bold mt-2 text-orange-600">
            {repairAssets}
        </p>
    </div>

</div>

    <div className="bg-white p-8 rounded-2xl shadow-md">

    <h2 className="text-2xl font-bold mb-6 text-slate-800">
        Add New Asset
    </h2>

    <div className="flex flex-col md:flex-row gap-4">
        <input  className="w-full md:flex-1 p-3 border rounded-lg"
          type="text"
          placeholder="Enter Asset Name"
          value={assetName}
          onChange={(e) =>
            setAssetName(e.target.value)
          }
        />

        <select  className="
        p-3
        border
        border-gray-300
        rounded-lg
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
    "
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Available</option>
          <option>Assigned</option>
          <option>Under Repair</option>
        </select>

        <button className="
        bg-blue-600
        text-white
        px-6
        py-3
        rounded-lg
        hover:bg-blue-700
        transition-all
        duration-300
        font-semibold
    " onClick={handleAsset}>
          Add Asset
        </button>
      </div>
    </div>

    <div className="bg-white p-8 rounded-2xl shadow-md">

    <h2 className="text-2xl font-bold mb-6">
    Search & Filter Assets
</h2>

  <div className="relative flex-1">

    <FaSearch
        className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
            text-lg
        "
    />

    <input
        className="
            w-full
            pl-12
            pr-4
            py-4
            text-lg
            bg-slate-50
            border-2
            border-gray-200
            rounded-xl
            shadow-sm
            transition-all
            duration-300
            focus:outline-none
            focus:border-blue-500
            focus:ring-4
            focus:ring-blue-100
            hover:border-gray-300
        "
        type="text"
        placeholder="Search assets by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
    />

</div>

     <div className="flex gap-6 mt-4">

    <select
        className="
            w-40
            p-3
            border
            border-gray-300
            rounded-lg
        "
        value={filter}
        onChange={(e) =>
            setFilter(e.target.value)
        }
    >
        <option>All</option>
        <option>Available</option>
        <option>Assigned</option>
        <option>Under Repair</option>
    </select>

    <select
        className="
            w-40
            p-3
            border
            border-gray-300
            rounded-lg
        "
        value={sort}
        onChange={(e) =>
            setSort(e.target.value)
        }
    >
        <option value="none">None</option>
        <option value="A-Z">A-Z</option>
        <option value="Z-A">Z-A</option>
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
    </select>

</div>

      <p>
        You searched for:{" "}
        <strong>{search}</strong>
      </p>
    </div>

    <div className="assets-section">
      <h2>Assets</h2>

      <div className="asset-grid">
        {paginatedAssets.map((asset) => (
          <AssetCard
            key={asset.id}
            id={asset.id}
            name={asset.name}
            status={asset.status}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          className="pagination-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="pagination-btn"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>

    {showModal && (
      <div className="modal">
        <div className="modal-content">
          <h3>Confirm Deletion</h3>

          <p>
            Delete "{assetToDelete.name}"?
          </p>

          <button
            onClick={() => {
              setShowModal(false);
              setAssetToDelete(null);
            }}
          >
            Cancel
          </button>

          <button onClick={confirmDelete}>
            Delete
          </button>
        </div>
      </div>
    )}

  </div>
);
}

export default Assets;