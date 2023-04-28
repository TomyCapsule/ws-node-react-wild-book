const Grade = require('../entity/Grade');
const Skill = require('../entity/Skill');
const Wilder = require('../entity/Wilder');
const { dataSource } = require('../utils');

module.exports = {
    find: async (req,res) => {
        try{
            const data = await dataSource.getRepository(Grade).find()
            res.send(data);
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    addGrade: async (req,res) => {
        try{
            const wilder = await dataSource.getRepository(Wilder).findOneBy({name: req.body.wilderName});
            const skill = await dataSource.getRepository(Skill).findOneBy({name: req.body.skillName});
            await dataSource.getRepository(Grade).save({
                wilder,
                skill,
                value: req.body.gradeValue
            })
            res.send('Grade added');
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    delete: async (req,res) => {
        try{
            const gradeToRemove = await dataSource.getRepository(Grade).findOneBy({id: req.body.id});
            await dataSource.getRepository(Grade).remove(gradeToRemove);
            res.send("Delete successful");
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    }
}