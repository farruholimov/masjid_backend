const configs = require("./src/config");
const sequelize = require("./src/db/db");
const { init } = require("./src/db/init");
const app = require("./src/server");
;
(async () => {
    try {
        await sequelize.sync({
            force: false
        })
        await init()
        sequelize.query(
            `CREATE OR REPLACE FUNCTION trigger_madmin() RETURNS TRIGGER AS $$
             BEGIN INSERT INTO mosque_admins (mosque_id) VALUES (NEW.id); 
             RETURN NEW; 
             END; 
             $$ LANGUAGE plpgsql;`
        )
        
        sequelize.query(
            `CREATE TRIGGER madmin_trigger AFTER INSERT ON "mosques" FOR EACH ROW EXECUTE PROCEDURE trigger_madmin();`
        )
    } catch (error) {
        console.log("Sequelize error:", error);
    }
})()

const port = configs.PORT
app.listen(port, () => console.log(`Running on ${port}🚀...`))