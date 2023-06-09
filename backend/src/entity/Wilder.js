const EntitySchema = require('typeorm').EntitySchema;

module.exports = new EntitySchema({
    name: 'Wilder',
    columns: {
        id: {
            primary: true,
            type: 'int',
            generated: true
        },
        name: {
            type: 'text'
        },
        city: {
            type: 'text',
            nullable: true
        }
    },
    relations: {
        grades: {
            target: "Grade",
            type: "one-to-many",
            inverseSide: 'wilder'
        }
    }
});