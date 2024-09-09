const axios = require('../config/http-common');
require("dotenv").config()

showHome = (req, res) =>{
    let data;
    axios.get('/api/employees/getUserInfo', {
        headers: { Authorization: "Bearer " + req.cookies.accessToken }
    })
    .then(response => {
        data = response.data;

        process.env.LOGGED_IN_ID = data.id;
        process.env.LOGGED_IN_ROLE = data.systemRole;
        
        console.log(data)
        res.render("home/home", {
            data
        });
    })
    .catch(error => {
        console.log(error.message);
    });
    
}

module.exports = {showHome};