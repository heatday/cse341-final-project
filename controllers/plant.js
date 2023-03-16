const plant = require('../models/plant')


const getAll = async (req, res) => {
    /*  #swagger.description = 'Returns all plant descriptions from the database.'
        #swagger.tags = ['Plant Information']
    */
        try {
          const result = await plant.find();
            //200 is success
            res.status(200).json(result);
          } catch (err) {
              //500 server error
            res.status(500).json({message: err.message});
          }
      };

const getOne = async (req, res) => {
  /*  #swagger.description = 'Returns one plant description from the database.'
      #swagger.tags = ['Plant Information']
  */
      try {
    const plants = await plant.findById(req.params.plantId);
    if (!plants) {
      // 404  code for not existing
      res.status(404).json({message: "Can't find the plant."});
      return;
    }
    res.status(200).json(plants);
  } catch (err) {
    //500 server error
    res.status(500).json({message: err.message});
  }
};

const uploadPlant = async (req, res) => {
  /*  #swagger.description = 'Stores a plant description in the database.'
      #swagger.tags = ['Plant Information']
  */
      try {
        //error if something is empty in these attributes
        if (!req.body.NamePlant || !req.body.Description || !req.body.Type_of_tree || !req.body.gender_of_tree) {
          //400 means user error 
          res.status(400).send({ message: 'Content can not be empty!' });
          return;
        }
    
        const plants = new plant(req.body);
       plants.save().then((data) => {
          //201 means new thing created as opposed to general 200 "everything worked"
          res.status(201).send(data);
        })
        .catch((err) => {
          res.status(500).json({message: err.message || 'Error occured uploading plants.'});
        });
      } catch (err) {
        //500 server error
        res.status(500).json({message: err.message});
      }
    };
    


const updatePlant = async (req, res) => {
  /*  #swagger.description = 'Updates a plant description in the database.'
      #swagger.tags = ['Plant Information']
  */
      const plants = {
        NamePlant: req.body.NamePlant,
        Description: req.body.Description,
        Type_of_tree: req.body.Type_of_tree,
        gender_of_tree: req.body.gender_of_tree
      }
      try {
        const plantSchema = await plant.findByIdAndUpdate(req.params.plantId, req.body, { new: true });
        if (!plantSchema) {
          //404  code for not existing
          return res.status(404).send("No plants found.");
        }
        //204 succeeds
        res.status(204).send(String(plants, plantSchema));
        
        
        
      } catch(err) {
        res.status(500).send(err)
      }
    };


const deletePlant = async (req, res) => {
  /*  #swagger.description = 'Deletes a plant description from the database.'
      #swagger.tags = ['Plant Information']
  */
      try {
        const plants = await plant.findById(req.params.plantId);
        if (!plants) {
          //404  code for not existing
          res.status(404).json({message: "Cannot find this plant."});
          return;
        }
        const result = plants.remove();
        res.status(200).json({message: "Deleted plant."});
      } catch (err) {
        res.status(500).json({message: err.message});
      }
    
    };
    
  

module.exports = {getAll, getOne, uploadPlant, updatePlant, deletePlant};