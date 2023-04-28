const Skill = require('../entity/Skill');
const { dataSource } = require('../utils');

module.exports = {
    find: async (req,res) => {
        try{
            const skills = await dataSource.getRepository(Skill).find();
            console.log(skills);
            res.send("Find successful");
        }catch(err){
            res.status(500).send('Something broke');
        }
    },
    create: async (req,res) => {
        try{
            await dataSource
                .getRepository(Skill)
                .save(req.body)
            res.send('Create successful');
        }catch(err){
            res.status(500).send('Something broke');
        }
    },
    update: async (req,res) => {
        try{
            const skillRepo = dataSource.getRepository(Skill);
            const skillToUpdate = await skillRepo.findOneBy({
                id: req.body.id
            });
            skillToUpdate.name = req.body.name;
            skillRepo.save(skillToUpdate);
            res.send("Update successful");
        }catch(err){
            res.status(500).send('Something broke');
        }
    },
    delete: async (req,res) => {
        try{
            await dataSource
                .getRepository(Skill)
                .delete({id: req.body.id})
            res.send('Delete Successful')
        }catch(err){
            res.status(500).send('Something broke');
        }
    }
}