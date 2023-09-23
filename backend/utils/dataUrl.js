const DataUriParser = require("datauri/parser.js")
const path = require("path")


//for single file
const getDataUri = (file)=>{
    const parser = new DataUriParser()
    const extName = path.extname(file.originalname).toString()
    console.log(extName)
    return  parser.format(extName,file.buffer)
}



//for multiple file
// const getMultipleDataUri = (files) =>{
//     const parser = new DataUriParser()
//      const dataUris = []
//  let i = 1
//      files.forEach((file,index)=>{
//         // console.log(`Processing file ${index + 1}: ${file.originalname}`)
//         const extName = path.extname(file.originalname).toString()
//         // console.log(index,file.buffer)
//         const dataUrisss = parser.format(extName,file.buffer)
//         dataUris.push(dataUrisss);
//         console.log("Data URL FOR INDEX : ",i,dataUris)
//         i++
//         // console.log(`for dataUri ${index+1}`,dataUris)
//         // console.log(`Data URI for file ${index + 1}:`, dataUrisss);
//      })
//      return dataUris
// }

const getMultipleDataUri = (files) => {
    // const parser = new DataUriParser();
    const dataUris = [];
   

    files.forEach((file, index) => {
        const parser = new DataUriParser();
        const extName = path.extname(file.originalname).toString();
        const dataUri = parser.format(extName, file.buffer);

        dataUris.push(dataUri);
        // console.log("Data URL FOR INDEX:", index + 1, dataUris);
    });

    return dataUris;
}

// const getMultipleDataUri = (files) => {
//     const dataUris = [];
  
//     files.forEach((file, index) => {
//       const extName = path.extname(file.originalname).toString();
//       const dataUri = {
//         name: file.originalname, // The file name
//         type: file.mimetype,      // The file type (e.g., image/png)
//         data: file.buffer,       // The file data
//       };
  
//       dataUris.push(dataUri);
//     });
  
//     return dataUris;
//   };
  


module.exports = {
    getDataUri,
    getMultipleDataUri,
  };