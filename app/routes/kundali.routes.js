// module.exports = (app) => {
//     const {
//       createKundali,
//       getAllKundalis,
//       getKundaliById,
//       updateKundali,
//       deleteKundali,
//       matchKundalis
//     } = require("../controllers/kundali.controller.js");
  
//     var router = require("express").Router();
  
//     // Create: Add a new Kundali
//     router.post("/", createKundali);
  
//     // Read (All): Get all Kundali records
//     router.get("/", getAllKundalis);
  
//     // Read (Single): Get a specific Kundali record by ID
//     router.get("/:id", getKundaliById);
  
//     // Update: Update a specific Kundali record by ID
//     router.put("/:id", updateKundali);
  
//     // Delete: Delete a specific Kundali record by ID
//     router.delete("/:id", deleteKundali);
    
//     router.post("/match", matchKundalis);

  
//     app.use("/api/kundali", router);
//   };
  