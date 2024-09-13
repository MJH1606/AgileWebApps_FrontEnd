const axios = require("../config/http-common");

getAll = async (req, res) => {
    let errorMessage;
    let skills;
    let resId;
    try {
        skills = await axios.get("/api/skills",
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        });
        resId = await axios.get('/api/employees/getUserInfo', {
            headers: { Authorization: "Bearer " + req.cookies.accessToken }
        });

        
    } catch (error) {
        res.send("Unable to return records");
    }
    res.render("skills/getAll", {
        result: { skills, errorMessage }, resId
    });
};

deleting = async (req, res) => {
    const name = req.body.name;
    try {
        if (name == null) {
        throw new Error("Name missing");
        }
        await axios.delete("/api/skills",

        { data: { name: name },
        headers:
            {Authorization: "Bearer "+ req.cookies.accessToken} 
        });
        res.redirect("/skills");
    } catch (error) {
        res.status(404).send(error.message);
    }
};
/*
update = async(req, res) =>{
    let errorMessage;
    const employee = {
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        system_role_id: req.body.system_role_id,
        job_role_id: req.body.job_role_id,
        first_name: req.body.first_name,
        surname: req.body.surname,
        managed_by: req.body.managed_by
    };
    try{
        if (employee.username == null ||
            employee.password == null ||
            employee.system_role_id == null ||
            employee.job_role_id == null ||
            employee.first_name == null ||
            employee.surname == null
        ) {
            throw new Error("Essential fields missing")
        }

        await axios.put("/employees",
            {id: employee.username,
            username: employee.username,
            password: employee.password,
            system_role_id: employee.system_role_id,
            job_role_id: employee.job_role_id,
            first_name: employee.first_name,
            surname: employee.surname,
            managed_by: employee.managed_by}
        );
        res.redirect("/employees");
    }
    catch (error){
        errorMessage = "Unable to edit a record due to connection issue";
        res.render("employees/edit", {
        errorMessage
        });
    }
};

getById = async(req, res) => {
    try{
        const id =req.body.id;
        const result = await axios.get('/api/employees/' + id);
        res.render("/employees/edit", {
            result
        });
    }
    catch(error){
        res.send(error.message);
    }
};

addPage = async (req, res) => {
    res.render("tools/add");
};

create = async (req, res) => {
    let errorMessage;
    const tool = {
        description: req.body.description,
        hire_price: req.body.hire_price,
    };
    try {
        if (tool.description == null || tool.hire_price == null) {
        throw new Error("Essential fields missing");
        }
        await axios.post("/tools", {
        description: tool.description,
        hire_price: tool.hire_price,
        });
        res.redirect("/tools");
    } catch (error) {
        errorMessage = "Unable to add a record due to connection issue";
        res.render("tools/add", {
        errorMessage,
        });
    }
};




module.exports = {update, getById, create, addPage, deleting, getAll};
*/
module.exports = {getAll, deleting};