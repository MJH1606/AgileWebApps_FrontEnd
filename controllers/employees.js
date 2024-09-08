const axios = require("../config/http-common");

getAll = async (req, res) => {
    let errorMessage;
    let employees;
    try {
        employees = await axios.get("/api/employees");
    } catch (error) {
        errorMessage = "Unable to return records";
    }
    res.render("employees/getAll", {
        result: { employees, errorMessage },
    });
};

deleting = async (req, res) => {
    const id = req.body.id;
    try {
        if (id == null) {
        throw new Error("Id missing");
        }
        await axios.delete("/api/employees", { data: { id: id } });
        res.redirect("/employees");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

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

        await axios.put("/api/employees",
            {id: employee.id,
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
        const jobRole = await axios.get('/api/jobRole');
        const systemRole = await axios.get('/api/systemRole')
        const managedBy = await axios.get(`/api/employees/systemrole/` + "Manager")

        res.render("employees/edit", {
            result, jobRole, systemRole, managedBy
        });
    }
    catch(error){
        res.send(error.message);
    }
};

addPage = async (req, res) => {
    const jobRole = await axios.get('/api/jobRole');
    const systemRole = await axios.get('/api/systemRole')
    const managedBy = await axios.get(`/api/employees/systemrole/` + "Manager")

    res.render("employees/add", {jobRole, systemRole, managedBy});
};

create = async (req, res) => {
    let errorMessage;
    const employee = {
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

        await axios.post("/api/employees",
            {username: employee.username,
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
        errorMessage = "Unable to add a record due to connection issue";
        res.render("employees", {
        errorMessage
        });
    }
};

module.exports = {update, getById, create, addPage, deleting, getAll};