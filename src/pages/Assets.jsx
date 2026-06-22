import { useState, useEffect } from "react";
import AssetCard from "../components/AssetCard";

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

function handleUpdate(updatedAsset) {
    setAssets(
        assets.map((asset) => {
            if (asset.id === updatedAsset.id) {
                return updatedAsset;
            }

            return asset;
        })
    );
}

function handleAsset() {
    if (assetName.trim() === "") {
      alert("Please enter an asset name");
      return;
    }

    const newAsset = {
      id: Date.now(),
      name: assetName.trim(),
      status: status,
    };

    setAssets([...assets, newAsset]);

    setAssetName("");
    setStatus("Available");

    
}

function handleDelete(asset) {
    setAssetToDelete(asset);
    setShowModal(true);
}


    return (
  <div className="app-container">

    <h2>Total Assets : {totalAssets}</h2>
    <h2>Available: {availableAssets}</h2>
    <h2>Assigned: {assignedAssets}</h2>
    <h2>Under Repair: {repairAssets}</h2>

    <div className="section">
      <h2>Add Asset</h2>

      <div className="form-group">
        <input
          type="text"
          placeholder="Enter Asset Name"
          value={assetName}
          onChange={(e) =>
            setAssetName(e.target.value)
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
        >
          <option>Available</option>
          <option>Assigned</option>
          <option>Under Repair</option>
        </select>

        <button onClick={handleAsset}>
          Add Asset
        </button>
      </div>
    </div>

    <div className="section">
      <h2>Search Assets</h2>

      <input
        type="text"
        placeholder="Search Assets"
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <select
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