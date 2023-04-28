const express = require('express');
const { dataSource } = require('./utils');
const WilderController = require('./controller/wilder');
const SkillController = require('./controller/skill');
const GradeController = require('./controller/grade');
const cors = require('cors');
const colors = require('colors');
const app = express();

colors.enable();
app.use(express.json());
app.use(cors());



app.get('/api/wilder', WilderController.find);
app.get('/api/wilder/findTest', WilderController.findTest);
app.post('/api/wilder', WilderController.create);
app.put('/api/wilder', WilderController.update);
app.put('/api/wilder/skill', WilderController.addSkill);
app.delete('/api/wilder', WilderController.delete);

app.get('/api/skill', SkillController.find);
app.post('/api/skill', SkillController.create);
app.put('/api/skill', SkillController.update);
app.delete('/api/skill', SkillController.delete);

app.get('/api/grade', GradeController.find);
app.post('/api/grade', GradeController.addGrade);
app.delete('/api/grade', GradeController.delete);

app.use('/api/wilder', (req, res, next) => {
    console.log(`Time: ${new Date(Date.now()).toLocaleTimeString()}`.underline.green);
    res.status(400).send('Not found')
});

const start = async () => {
    await dataSource.initialize();
    app.listen(5000, () => console.log('Listening on port 5000'));
}

start();