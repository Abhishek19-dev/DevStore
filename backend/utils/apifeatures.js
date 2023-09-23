class ApiFeatures{
    constructor(query , queryStr){
        this.query = query;
        this.queryStr = queryStr;
    }

    //for search the product
    search(){
        const keyword = this.queryStr.keyword ? {
            name : {
                $regex : this.queryStr.keyword,
                $options : "i"
            }
        } : {}

        this.query = this.query.find({...keyword}) // ye mujhe wo wo return krke dega jiske name mei keyword aata ho
        return this;
    }
  //filter 
    filter(){
     const queryCopy = {...this.queryStr}

     //Remove fields for category
     const removeFields = ["keyword","page","limit"]
     removeFields.forEach(key => {
         delete queryCopy[key]
     })
     //
    // console.log(queryCopy)  //{ price: { gt: '1200', lt: '2000' } } ab gt ko $gt se replace krna tha
     let queryStr = JSON.stringify(queryCopy)
     queryStr = queryStr.replace(/\b(gt|gte|lte|lt)\b/g , (key)=>{
        return `$${key}`
     })
   
     
     this.query = this.query.find(JSON.parse(queryStr))
    //  console.log(queryStr)
     return this;
    }

    //pagination
    pagination(resultPerPage){
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1)

        this.query = this.query.limit(resultPerPage).skip(skip)
        return this ;
    }
}

module.exports = ApiFeatures;