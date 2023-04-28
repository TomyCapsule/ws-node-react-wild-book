const Grade = require('../entity/Grade');
const Skill = require('../entity/Skill');
const Wilder = require('../entity/Wilder');
const { dataSource } = require('../utils');

module.exports = {
    create: async (req,res) => {
        try{
            console.log(req.body);
            const newWilder = await dataSource
                .getRepository(Wilder)
                .save(req.body);
            res.send(newWilder);
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    find: async (req,res) => {
        try{
            const wilders = await dataSource
                .getRepository(Wilder)
                .find()
            const grades = await dataSource
                .getRepository(Grade)
                .find()
            const data = wilders.map(wilder => {
                const wilderGrades = grades.filter(grade => grade.wilder.id === wilder.id)
                const wilderGradesLean = wilderGrades.map(elt => ({
                    title: elt.skill.name,
                    grade: elt.value
                }))
                return {
                    ...wilder,
                    skills: wilderGradesLean
                }
            })
            res.send(data);
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    findTest: async (req,res) => {
        try{
            const wilders = await dataSource.getRepository(Wilder).find({relations: ['grades']})
            const data = wilders.map(wilder => {
                const skills = wilder.grades.map(grade => ({
                    name: grade.skill.name,
                    note: grade.value
                }));
                const {grades, ...wilderLean} = wilder
                return {
                    ...wilderLean,
                    skills
                }
            });
            res.send(data);
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    update: async (req,res) => {
        try{
            const wilderRepository = dataSource.getRepository(Wilder);
            const wilderToUpdate = await wilderRepository
                .findOneBy({
                    id: req.body.id
                });
            wilderToUpdate.city = req.body.city;
            await wilderRepository.save(wilderToUpdate);
            res.send('update successful');
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    delete: async (req,res) => {
        try{
            const wilderRepository = dataSource.getRepository(Wilder)
            const wilderToDelete = await wilderRepository.findBy({
                id: req.body.id
            });
            const deletedWilder = await wilderRepository.remove(wilderToDelete);
            res.send(deletedWilder);
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    },
    addSkill: async (req,res) => {
        try{
            console.log(req.body);
            const wilderRepository = dataSource.getRepository(Wilder);
            const wilderToUpdate = await wilderRepository
                .findOneBy({ name: req.body.wilderName });
            console.log(wilderToUpdate);
            const skillToAdd = await dataSource
                .getRepository(Skill)
                .findOneBy({ name: req.body.skillName });
            wilderToUpdate.skills = [...wilderToUpdate.skills, skillToAdd];
            const updatedWilder = await wilderRepository.save(wilderToUpdate);
            res.send(updatedWilder);
        }catch(err){
            console.error(err);
            res.status(500).send('Something broke');
        }
    }
}