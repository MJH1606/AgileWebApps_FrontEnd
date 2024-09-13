const axios = require("../config/http-common");

getAll = async (req, res) => {
    let errorMessage;
    let skillCategory;
    try {
        skillCategory = await axios.get("/api/skillcategory",
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        });
    } catch (error) {
        errorMessage = "Unable to return records";
        skillCategory = { data: [] }; // Provide a default value to avoid undefined errors
    }
    res.render("skillCategory/getAll", {
        result: { skillCategory: skillCategory.data, errorMessage }, // Pass skillCategory.data if needed
    });
};

create = async (req, res) => {
    let errorMessage;
    const skillCategory = {
        name: req.body.name
    };

    try {
        if (skillCategory.name == null) {
            throw new Error("Name field is missing");
        }

        await axios.post("/api/skillCategory",
        {
            name: skillCategory.name
        },
        {headers:
            {Authorization: "Bearer "+ req.cookies.accessToken}
        }
    );

        res.redirect("/skillCategory");
    }
    catch (error) {
        errorMessage = "Unable to add a record due to connection issue";
        res.render("skillCategory", {
            errorMessage
        });
    }
};

addPage = async (req, res) => {
    res.render("skillCategory/add");
};


deleting = async (req, res) => {
    const id = req.body.id;
    try {
        if (id == null) {
        throw new Error("Name missing");
        }
        await axios.delete("/api/skillCategory",
        { data: { id: id },
        headers:
            {Authorization: "Bearer "+ req.cookies.accessToken}
        }
    );
        res.redirect("/skillCategory");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

getById = async(req, res) => {
    try{
        const id =req.body.id;
        const result = await axios.get('/api/skillCategory/' + id,
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        });
       

        res.render("skillCategory/edit", {
            result
        },
        );
    }
    catch(error){
        res.send(error.message);
    }
};

update = async (req, res) => {
    let errorMessage;
    const skillCategory = {
        id: req.body.id,
        name: req.body.name,
    };

    try {
        // Check if the name field is empty or missing
        if (!skillCategory.name || skillCategory.name.trim() === '') {
            throw new Error("Name field cannot be empty");
        }

        await axios.put("/api/skillCategory",
            {
                id: skillCategory.id,
                name: skillCategory.name,
            },
            { headers: { Authorization: "Bearer " + req.cookies.accessToken } },
        );
        res.redirect("/skillCategory");
    } catch (error) {
        errorMessage = error.message || "Unable to edit a record due to connection issue";
        res.render("skillCategory/edit", {
            errorMessage,
            skillCategory: {
                id: req.body.id,
                name: req.body.name // Keep the current name for re-population
            }
        });
    }
};



module.exports = {getAll, create, deleting, addPage, getById, update};