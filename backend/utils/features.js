class features {
    constructor(query,queryStr)
    {
      this.query = query,
      this.queryStr = queryStr
     
    }

    search(){
       
        //For Languages:-
        if(Array.isArray(this.queryStr.languages)){
            const languages = {
                languages :{
                    $in : this.queryStr.languages
                }
            }
            this.query = this.query.find({...languages})
        }
        else{
            const languages = this.queryStr.languages ? {
                languages : {
                    $regex : this.queryStr.languages,
                    $options : "i",
                }
            } : {}
            this.query = this.query.find({...languages})
        }

        
        //For Domain :-
        if (Array.isArray(this.queryStr.domain)) {
            const domain = {
                domain: {
                    $in: this.queryStr.domain
                }
            };
            this.query = this.query.find({ ...domain });
        } else {
            const domain = this.queryStr.domain ? {
                domain: {
                    $regex: this.queryStr.domain,
                    $options: "i"
                }
            } : {};
            this.query = this.query.find({ ...domain });
        }



        //For tags or Project name
        const tags = this.queryStr.tags ? {
            title : {
                  $regex : this.queryStr.tags,
                  $options : "i"
            }
        } : {}
        this.query = this.query.find({...tags})
        return this
    }
   
}


module.exports = features