const Asset=require("../models/Asset")

const getAssets = async (req, res) => {
    try{
    const assets=await Asset.find()
    res.json(assets);
    }
    catch(error){
        console.error(error)
        res.status(500).json({
            message:error.message
        })
    }
};

const addAsset = async (req, res) => {
    try{
     if (!req.body.name?.trim()) {

        return res.status(400).json({
            message: "Asset name is required."
        });

    }  

    const newAsset=await Asset.create(req.body);

    res.status(201).json(newAsset);

}
catch(error){
    console.error(error);

    res.status(500).json({
        message:error.message
    })
}
};

const updateAsset=async (req,res)=>{
    try{
          if (!req.body.name?.trim()) {
            return res.status(400).json({
                message: "Asset Name is Required"
            });
        }

    const updatedAsset=await Asset.findByIdAndUpdate(
        req.params.id,
        req.body,{
            new:true
        }
    );


    if(!updatedAsset){
        return res.status(404).json({
            message:"Asset not found"
        })
    }

    res.status(200).json(updatedAsset);

}
    catch(error){
        console.error(error);
        res.status(500).json({
        message:error.message

    })

}};

const deleteAsset=async (req,res)=>{
    try{

    const deletedAsset=await Asset.findByIdAndDelete(
        req.params._id
    );


    if(!deletedAsset){
        return res.status(404).json({
            message:"Asset not found"
        })
    }

    res.status(200).json(deletedAsset);

}
    catch(error){
        console.error(error);
        res.status(500).json({
        message:error.message

    })

}};

module.exports = {
    getAssets,
    addAsset,
    updateAsset,
    deleteAsset
};

