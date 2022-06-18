const configs = require("../config");
const { createCrypt } = require("../modules/bcrypt");
const sequelize = require("./db");

const { users, admin_users, categories, mosques } = sequelize.models

module.exports.init = async function() {

    let cats = [
        {
            name: "Qurilish"
        },
        {
            name: "Ko'chat"
        },
        {
            name: "Maishiy yordam",
            parent_id: 1
        },
        {
            name: "Moddiy yordam",
            parent_id: 1
        }
    ]
    let mos = [
        {
            name: "Masjid 1",
            phone: "8468468468",
            location: "dcjndindoimeoi"
        },
        {
            name: "Masjid 2",
            phone: "8468468468",
            location: "dcjndindoimeoi"
        },
        {
            name: "Masjid 3",
            phone: "8468468468",
            location: "dcjndindoimeoi"
        }
    ]

    if (await categories.count()==0) {
        for (const cat of cats) {
            await categories.create({
                name: cat.name,
                parent_id: cat.parent_id
            })
        }
    }

    if (await mosques.count()==0) {
        for (const m of mos) {
            await mosques.create({
                ...m
            })
        }
    }

    const admins = await users.count({
        where:{
            role: 1
        }
    })

    if(await admins == 0){
        const user = await users.create({
            full_name: "admin",
            language_code: "uz",
            role: 1,
            telegram_id: configs.ADMIN_ID
        })
    
        const admin = await admin_users.create({
            user_id: user.id,
            username: "admin", 
            password: createCrypt(configs.PASSWORD)
        })
    }
}