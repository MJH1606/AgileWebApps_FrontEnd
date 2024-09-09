const axios = require('../config/http-common');

showLogin = (req, res) =>{
    res.render("login/login");
}

login = async(req, res) => {
    process.env.LOGGED_IN_ID = null;
    process.env.LOGGED_IN_ROLE = null;
    try{
        const username = req.body.username;
        const password = req.body.password;

        var errorMessage;

        const response = await axios.post("/login",
            {username: username, password:password});
        var responseData = JSON.stringify(response.data);

        res.cookie("accessToken",

        JSON.parse(responseData)['accessToken'],
        {httpOnly: true, secure: true});

        res.redirect("/home");
    }
    catch(error){
        errorMessage = "Invalid user details";
        res.render("login/login",{ errorMessage });
    }
}

// Function to get user info
getUserInfo = async (req, userData) => {
    axios.get('/api/employees/getUserInfo', {
        headers: { Authorization: "Bearer " + req.cookies.accessToken }
    })
    .then(response => {
        const data = response.data;

        // Check if user data is valid
        if (data.id && data.systemRole) {
            userData(null, data);  // Pass data to callback
        } else {
            userData('Unauthorized or no user info');
        }
    })
    .catch(error => {
        userData(error.response ? error.response.data : error.message);
    });
};

module.exports = {login,showLogin, getUserInfo};