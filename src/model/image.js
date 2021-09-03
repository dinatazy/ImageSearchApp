export default class image {

    constructor(data) {
        data.forEach((item)=>{
            this.id = data.id ? data.id : null
            this.secret = data.secret ? data.secret : null
            this.server = data.server ? data.server : null
            this.farm = data.farm ? data.farm : null
        })
    }


}