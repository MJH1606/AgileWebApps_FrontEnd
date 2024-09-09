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
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        },
        {
            name: skillCategory.name
        });

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
        await axios.delete("/api/skillcategory",
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        },
        { data: { id: id } });
        res.redirect("/skillcategory");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {getAll, create, deleting, addPage};