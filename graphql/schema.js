const { buildSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList, GraphQLSchema, GraphQLNonNull } = require('graphql');
const db = require('../utils/database');

const Category = new GraphQLObjectType({

    name: 'Category',
    description: 'This represents a category',
    fields: () => {

        return {
            id: {
                type: GraphQLInt,
                resolve(category) {
                    return category.id;
                }
            },
            title: {
                type: GraphQLString,
                resolve(category) {
                    return category.title;
                }
            },
            numberOfQuestions: {
                type: GraphQLInt,
                resolve(category) {
                    return category.numberOfQuestions;
                }
            },
            uses: {
                type: GraphQLInt,
                resolve(category) {
                    return category.uses;
                }
            },
            status: {
                type: GraphQLInt,
                resolve(category) {
                    return category.status;
                }
            },
            dateOfAdding: {
                type: GraphQLString,
                resolve(category) {
                    return category.dateOfAdding;
                }
            },
            questions: {
                type: new GraphQLList(Question),
                resolve(category) {
                    return category.getQuestions();
                }
            }

        };
    }
});
const Question = new GraphQLObjectType({

    name: 'Question',
    description: 'This represents a question',
    fields: () => {

        return {
            id: {
                type: GraphQLInt,
                resolve(question) {
                    return question.id;
                }
            },
            categoryId: {
                type: GraphQLInt,
                resolve(question) {
                    return question.categoryId;
                }
            },
            question: {
                type: GraphQLString,
                resolve(question) {
                    return question.question;
                }
            },
            correctAnswer: {
                type: GraphQLString,
                resolve(question) {
                    return question.correctAnswer;
                }
            },
            option1: {
                type: GraphQLString,
                resolve(question) {
                    return question.option1;
                }
            },
            option2: {
                type: GraphQLString,
                resolve(question) {
                    return question.option1;
                }
            },
            option3: {
                type: GraphQLString,
                resolve(question) {
                    return question.option1;
                }
            },
            option4: {
                type: GraphQLString,
                resolve(question) {
                    return question.option1;
                }
            },
            option5: {
                type: GraphQLString,
                resolve(question) {
                    return question.option1;
                }
            },
            tags: {
                type: GraphQLString,
                resolve(question) {
                    return question.tags;
                }
            },
            hardness: {
                type: GraphQLInt,
                resolve(question) {
                    return question.hardness;
                }
            },
            status: {
                type: GraphQLInt,
                resolve(question) {
                    return question.status;
                }
            },
            correctGuesses: {
                type: GraphQLInt,
                resolve(question) {
                    return question.correctGuesses;
                }
            },
            option1Guesses: {
                type: GraphQLInt,
                resolve(question) {
                    return question.option1Guesses;
                }
            },
            option2Guesses: {
                type: GraphQLInt,
                resolve(question) {
                    return question.option2Guesses;
                }
            },
            option3Guesses: {
                type: GraphQLInt,
                resolve(question) {
                    return question.option3Guesses;
                }
            },
            option4Guesses: {
                type: GraphQLInt,
                resolve(question) {
                    return question.option4Guesses;
                }
            },
            option5Guesses: {
                type: GraphQLInt,
                resolve(question) {
                    return question.option5Guesses;
                }
            },
            dateOfAdding: {
                type: GraphQLString,
                resolve(question) {
                    return question.dateOfAdding;
                }
            },
            category: {
                type: Category,
                resolve(question) {
                    return question.getCategory();
                }
            }
        };
    }
});

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'This is a root query',
    fields: () => {
        return {
            categories: {
                type: new GraphQLList(Category),
                args: {
                    id: { type: GraphQLInt },
                    title: { type: GraphQLString },
                    numberOfQuestions: { type: GraphQLInt },
                    uses: { type: GraphQLInt },
                    status: { type: GraphQLInt },
                    dateOfAdding: { type: GraphQLString },

                },
                resolve(root, args) {
                    return db.models.category.findAll({ where: args });
                }
            },
            questions: {
                type: new GraphQLList(Question),
                args: {
                    id: { type: GraphQLInt },
                    categoryId: { type: GraphQLInt },
                    question: { type: GraphQLString },
                    correctAnswer: { type: GraphQLString },
                    option1: { type: GraphQLString },
                    option2: { type: GraphQLString },
                    option3: { type: GraphQLString },
                    option4: { type: GraphQLString },
                    option5: { type: GraphQLString },
                    option1Guesses: { type: GraphQLInt },
                    option2Guesses: { type: GraphQLInt },
                    option3Guesses: { type: GraphQLInt },
                    option4Guesses: { type: GraphQLInt },
                    option5Guesses: { type: GraphQLInt },
                    tags: { type: GraphQLString },
                    hardness: { type: GraphQLInt },
                    status: { type: GraphQLInt },
                    correctGuesses: { type: GraphQLInt },
                    dateOfAdding: { type: GraphQLString },

                },
                resolve(root, args) {
                    return db.models.question.findAll({ where: args });
                }

            }
        }
    }
});

const Mutation = new GraphQLObjectType({

    name: 'Mutation',
    description: 'Functions to insert and create stuff',
    fields() {
        return {
            addQuestion: {
                type: Question,
                args: {
                    categoryId: {
                        type: GraphQLInt

                    },
                    question: {
                        type: new GraphQLNonNull(GraphQLString)

                    },
                    correctAnswer: {
                        type: GraphQLString

                    },
                    option1: { type: GraphQLString },
                    option2: { type: GraphQLString },
                    option3: { type: GraphQLString },
                    option4: { type: GraphQLString },
                    option5: { type: GraphQLString },
                    option1Guesses: { type: GraphQLInt },
                    option2Guesses: { type: GraphQLInt },
                    option3Guesses: { type: GraphQLInt },
                    option4Guesses: { type: GraphQLInt },
                    option5Guesses: { type: GraphQLInt },
                    tags: {
                        type: GraphQLString

                    },
                    hardness: {
                        type: GraphQLInt

                    },
                    status: {
                        type: GraphQLInt

                    },
                    correctGuesses: {
                        type: GraphQLInt
                    },

                    dateOfAdding: {
                        type: GraphQLString
                    }

                },
                resolve(_, args) {

                    return db.models.question.create({
                        categoryId: args.categoryId,
                        question: args.question,
                        correctAnswer: args.correctAnswer,
                        option1: args.option1,
                        option2: args.option2,
                        option3: args.option3,
                        option4: args.option4,
                        option5: args.option5,
                        tags: args.tags,
                        hardness: args.hardness,
                        status: args.status,
                        correctGuesses: args.correctGuesses,
                        option1Guesses: args.option1Guesses,
                        option2Guesses: args.option2Guesses,
                        option3Guesses: args.option3Guesses,
                        option4Guesses: args.option4Guesses,
                        option5Guesses: args.option5Guesses,
                        dateOfAdding: args.dateOfAdding

                    });
                }
            },
            addCategory: {
                type: Category,
                args: {

                    title: {
                        type: new GraphQLNonNull(GraphQLString)

                    },
                    numberOfQuestions: {
                        type: GraphQLInt

                    },
                    uses: {
                        type: GraphQLInt

                    },
                    status: {
                        type: GraphQLInt

                    },
                    dateOfAdding: {
                        type: GraphQLString
                    }

                },
                resolve(_, args) {

                    return db.models.category.create({
                        title: args.title,
                        numberOfQuestions: args.numberOfQuestions,
                        uses: args.uses,
                        status: args.status,
                        dateOfAdding: args.dateOfAdding

                    });
                }
            }
        }
    }

});
const Schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

module.exports = Schema;

// module.exports = buildSchema(`
//     type Data {
//         text: String!
//         views: String!
//     }

//     type Query {
//         hello: Data!
//     }

//     schema {
//         query: Query
//     }
// `);