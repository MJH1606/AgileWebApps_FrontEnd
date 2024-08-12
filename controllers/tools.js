const axios = require('../config/http-common');

getAll = async(req, res) =>{
let errorMessage;
    let tools;
    try{
        tools = await axios.get('/tools');
    }
    catch (error){
        errorMessage = "Unable to return records";
    }
    res.render("tools/getAll", {
        result: {tools, errorMessage}
    });
}

module.exports = {getAll};