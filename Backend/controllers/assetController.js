let assets = [
    {
        id: 101,
        name: "Dell Laptop",
        status: "Available"
    },
    {
        id: 102,
        name: "MacBook Air",
        status: "Assigned"
    }
];

const getAssets = (req, res) => {
    res.json(assets);
};

const addAsset = (req, res) => {
     if (!req.body.name) {

        return res.status(400).json({
            message: "Asset name is required."
        });

    }
    const newAsset = {
        id: Date.now(),
        ...req.body
    };

    assets.push(newAsset);

    res.status(201).json(newAsset);
};

const updateAsset=(req,res)=>{
    const id=Number(req.params.id);
    const asset=assets.find(asset=>asset.id===id);

    if(!asset){
        return res.status(404).json({
            message:"Asset not found"
        })
    }

    if(!req.body.name?.trim()) return res.status(400).json({
        message:"Asset Name is Required"
    })


    assets=assets.map(asset=>{
        if(asset.id===id){
            return{
                ...asset,
                ...req.body
            }
        }

        return asset;
    })

    const updatedAsset=assets.find(asset=>asset.id===id);
    res.status(200).json(updatedAsset);
};

const deleteAsset = (req, res) => {

    const id = Number(req.params.id);

    const asset = assets.find(asset => asset.id === id);

    if (!asset) {
        return res.status(404).json({
            message: "Asset not found"
        });
    }

    assets = assets.filter(asset => asset.id !== id);

    res.status(200).json({
        message: "Asset deleted successfully"
    });

    console.log("DELETE API CALLED");
console.log(req.params);

};

module.exports = {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset
};

