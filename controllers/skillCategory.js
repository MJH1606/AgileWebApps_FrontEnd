const axios = require("../config/http-common");

getAll = async (req, res) => {
    let errorMessage;
    let skillCategory;
    try {
        skillCategory = await axios.get("/api/skillcategory");
    } catch (error) {
        errorMessage = "Unable to return records";
        skillCategory = { data: [] }; // Provide a default value to avoid undefined errors
    }
    res.render("skillCategory/getAll", {
        result: { skillCategory: skillCategory.data, errorMessage }, // Pass skillCategory.data if needed
    });
};


deleting = async (req, res) => {
    const id = req.body.id;
    try {
        if (id == null) {
        throw new Error("Name missing");
        }
        await axios.delete("/api/skillcategory", { data: { id: id } });
        res.redirect("/skillcategory");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

module.exports = {getAll, deleting};