const axios = require("../config/http-common");

deleting = async (req, res) => {
    const id = req.body.id;
    const skill = req.body.skill;
    try {
        if (id == null ||
            skill == null
        ) {
        throw new Error("Essential Fields missing");
        }
        await axios.delete("/api/employees/" + id + "/skills/" + skill, { 
            data: { id: id },
            headers: {Authorization: "Bearer "+ req.cookies.accessToken}});
        res.redirect("/home");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

update = async(req, res) =>{
    let errorMessage;
    const empId = req.body.id
    const skillDetails = {
        skill: req.body.skill,
        level: req.body.level,
        expiration: req.body.expiration,
        notes: req.body.notes
    }
    try{
        if (empId == null ||
            skillDetails.skill == null
        ) {
            throw new Error("Essential fields missing")
        }

        await axios.put("/api/employees/" + empId + "/skills/" + skillDetails.skill,
            {level: skillDetails.level,
                expiration: skillDetails.expiration,
                notes: skillDetails.notes
            },
            {headers: {Authorization: "Bearer "+ req.cookies.accessToken}},
        );
        res.redirect("/home");
    }
    catch (error){
        errorMessage = "Unable to edit a record due to connection issue";
        res.render("skillDetails/edit", {
        errorMessage, empId, skillDetails
        });
    }
};

addPage = async (req, res) => {
    const id = req.body.id;
    const skills = await axios.get('/api/skills', 
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        });
        console.log(skills)

    res.render("skillDetails/add", {id, skills});
};

create = async (req, res) => {
    let errorMessage;
    const empId = req.body.id
    const skillDetails = {
        skill: req.body.skill,
        level: req.body.level,
        expiration: req.body.expiration,
        notes: req.body.notes
    }
    try{
        if (empId == null ||
            skillDetails.skill == null ||
            skillDetails.level == null ||
            skillDetails.notes == null
        ) {
            throw new Error("Essential fields missing")
        }

        await axios.post("/api/employees/" + empId + "/skills",
            {skill: skillDetails.skill,
                level: skillDetails.level,
                expiration: skillDetails.expiration,
                notes: skillDetails.notes
            },
            {headers: {Authorization: "Bearer "+ req.cookies.accessToken}},
        );
        res.redirect("/home");
    }
    catch (error){
        errorMessage = "Unable to add a record due to connection issue";
        res.render("skillDetails/add", {
        errorMessage
        });
    }
};

getById = (req, res) => {
    const skillDetails = {
        id: req.body.id,
        skill: req.body.skill,
        level: req.body.level,
        expiration: req.body.expiration,
        notes: req.body.notes
    }
    console.log(skillDetails)

    res.render('skillDetails/edit', {skillDetails})
};

getAll = async (req, res) => {
    const id = req.body.id;
    try{
        const skills = await axios.get('/api/employees/' + id + '/skills',
        {headers:
        {Authorization: "Bearer "+ req.cookies.accessToken}
        });

        res.render('skillDetails/viewAll', {id, skills})
    } catch (error) {
        res.status(404).send(error.message);
    }
        
}

module.exports = {update, create, addPage, deleting, getById, getAll};