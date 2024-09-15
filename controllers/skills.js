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

getByName = async (req, res) => {
    try{
        const name =req.body.name;
        const skill =  await axios.get('/api/skills/name/' + encodeURIComponent(name),
            {headers:
                {Authorization: "Bearer "+ req.cookies.accessToken}
            });
        const skillCategory = await axios.get('/api/skillCategory',
            {headers:
                {Authorization: "Bearer "+ req.cookies.accessToken}
            }
        );
        
        res.render("skills/edit", {
            skill, skillCategory
        },
        );
    }
    catch(error){
        res.send(error.message);
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
        {Authorization: "Bearer "+ req.cookies.accessToken},
        data: { name: name }
        });
        res.redirect("/skills");
    } catch (error) {
        res.status(404).send(error.message);
    }
};

update = async(req, res) =>{
    let errorMessage;
    const skill = {
        name: req.body.name,
        category: req.body.category,
    };
    try{
        if (skill.name == null ||
            skill.category == null
        ) {
            throw new Error("Essential fields missing")
        }

        await axios.put("/api/skills",
            {
                name: skill.name,
                category: skill.category
            }, 
            {headers:
                {Authorization: "Bearer "+ req.cookies.accessToken}
            }
        );
        res.redirect("/skills");
    }
    catch (error){
        errorMessage = "Unable to edit a record due to connection issue";
        res.render("employees/edit", {
        errorMessage
        });
    }
};

create = async (req, res) => {
    let errorMessage;
    const skill = {
        name: req.body.name,
        category: req.body.category,
    };
    try {
        if (skill.name == null || skill.category == null) {
        throw new Error("Essential fields missing");
        }

        await axios.post("api/skills", 
            
            {
        name: skill.name,
        category: skill.category,
        },
        {headers:
            {Authorization: "Bearer "+ req.cookies.accessToken}
        }
    );
        res.redirect("/skills");
    } catch (error) {
        errorMessage = "Unable to add a record due to connection issue";
        res.render("skills/add", {
        errorMessage,
        });
    }
};

addPage = async (req, res) => {

    const skillCategory = await axios.get('/api/skillCategory',
            {headers:
                {Authorization: "Bearer "+ req.cookies.accessToken}
            }
        );
        console.log(skillCategory)
    res.render("skills/add", {skillCategory});
};

module.exports = {update, getByName, create, addPage, deleting, getAll};
