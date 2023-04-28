const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: "Grade",
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        value: {
            type: 'int'
        }
    },
    relations:{
        wilder: {
            target: "Wilder",
            type: "many-to-one",
            eager: true,
        },
        skill: {
            target: "Skill",
            type: "many-to-one",
            eager: true
        }
    }
});