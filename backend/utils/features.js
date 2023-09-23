class features {
    constructor(query,queryStr)
    {
      this.query = query,
      this.queryStr = queryStr
    }

    search(){

        const languages = this.queryStr.languages ? {
            languages : {
                  $regex : this.queryStr.languages,
                  $options : "i"
            }
        } : {}
        this.query = this.query.find({...languages})
        const domain = this.queryStr.domain ? {
            domain : {
                  $regex : this.queryStr.domain,
                  $options : "i"
            }
        } : {}
        this.query = this.query.find({...domain})

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