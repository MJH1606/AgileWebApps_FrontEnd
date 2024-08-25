const axios = require("../config/http-common");

getAll = async (req, res) => {
    let errorMessage;
    let employees;
    try {
        employees = await axios.get("api/employees");
    } catch (error) {
        errorMessage = "Unable to return records";
    }
    res.render("employees/getAll", {
        result: { employees, errorMessage },
    });
};
/*
deleting = async (req, res) => {
    const id = req.body.id;
    try {
        if (id == null) {
        throw new Error("Id missing");
        }
        await axios.delete("/tools", { data: { id: id } });
        res.redirect("/tools");
    } catch (error) {
        res.status(404).send(error.message);
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

getById = async(req, res) => {
    try{
        const id =req.body.id;
        const result = await axios.get('/tools/' + id);
        res.render("tools/edit", {
            result
        });
    }
    catch(error){
        res.send(error.message);
    }
}

update = async(req, res) =>{
    let errorMessage;
    const tool = {
        id: req.body.id,
        description: req.body.description,
        hire_price: req.body.hire_price
    };
    try{
        if (tool.description ==null ||
        tool.hire_price ==null){
            throw new Error("Essential fields missing");
        }
        await axios.put("/tools",
            {id: tool.id,
            description: tool.description,
            hire_price: tool.hire_price}
        );
        res.redirect("/tools");
    }
    catch (error){
        errorMessage = "Unable to edit a record due to connection issue";
        res.render("tools/edit", {
        errorMessage
        });
    }
}
module.exports = {update, getById, create, addPage, deleting, getAll};
*/
module.exports = {getAll};