const axios = require("../config/http-common");

getAll = async (req, res) => {
    let errorMessage;
    let skills;
    try {
        skills = await axios.get("/api/skills",
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        });
    } catch (error) {
        errorMessage = "Unable to return records";
    }
    res.render("skills/getAll", {
        result: { skills, errorMessage },
    });
};

getByName = async (req, res) => {
    const name = req.params.name; // Get 'name' from the URL params
    try {
        // Fetch the skill by its name (since it's the unique identifier in your case)
        const skill = await Skill.findOne({
            where: { name: name }, // Use 'name' instead of 'id'
            include: [
                {
                    model: SkillCategory,
                    as: 'category',
                    attributes: ['id', 'name'], // Keep category details
                    required: true
                }
            ]
        });

        if (!skill) {
            throw new Error(`Unable to find skill with name ${name}`);
        }

        // Render the skill edit page with the fetched skill
        res.render('skills/edit', { skill });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

deleting = async (req, res) => {
    const name = req.body.name;
    try {
        if (name == null) {
        throw new Error("Name missing");
        }
        await axios.delete("/api/skills",
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        }, 
        { data: { name: name } });
        res.redirect("/skills");
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

 getById = async (req, res) => {
    const id = req.params.id;
    try {
        // Fetch the skill by ID
        const skill = await Skill.findByPk(id, {
            include: [
                {
                    model: SkillCategory,
                    as: 'category',
                    attributes: ['id', 'name'],
                    required: true
                }
            ]
        });

        if (!skill) {
            throw new Error(`Unable to find skill with id ${id}`);
        }

        // Render the skill edit page with the fetched skill
        res.render('skills/edit', { skill });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
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




module.exports = {update, getByName, getById, create, addPage, deleting, getAll};
