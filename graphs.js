const {GraphQLSchema, GraphQLObjectType, GraphQLBoolean, GraphQLNonNull, GraphQLID, GraphQLString, GraphQLInt, GraphQLScalarType, GraphQLList, GraphQLInputObjectType, GraphQLEnumType, GraphQLDirective, GraphQLIncludeDirective, GraphQLUnionType} = require("graphql");

const forum = require("./models/forum");
const plant = require("./models/plant");
<<<<<<< HEAD
=======

>>>>>>> 249c8bd7d9e5742ac2aa685d4968cb9361968c01




const plantinfo = new GraphQLObjectType({
  name: "plant",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    NamePlant: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Type_of_tree: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gender_of_tree: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});




const plantinput = new GraphQLInputObjectType({
  name: "plantinput",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    NamePlant: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    Type_of_tree: {
      type: new GraphQLNonNull(GraphQLString),
    },
    gender_of_tree: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
});



const rootQuery = new GraphQLObjectType({
  name: "Query",
  fields: {
    plant: {
      type: new GraphQLList(plantinfo),
      resolve: async () => {
        try {
          return await plant.find();
          //200 is generic success
          // res.status(200).json(characters);
        } catch (err) {
            //500 means server error, not user error
          // res.status(500).json({message: err.message});
          throw new Error(err.message);
        }
      },
    },

    plants: {
      type: plantinfo,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, args) => {
        try {
          return await plant.findById(args.id);
          // res.status(200).json(character);
        } catch (err) {
          //500 means server error, not user error
          // res.status(500).json({message: err.message});
          throw new Error(err.message);
        }
      }
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createplant: {
      type: plantinfo,
      args: {
        plant: {
          type: new GraphQLNonNull(plantinput),
        },
      },
      resolve: async (_, args) => {
        try {
          return await plant.create(args.plant)

        } catch (err) {
          //500 means server error, not user error
          // res.status(500).json({message: err.message});
          throw new Error(err.message);
        }
      },
    },
  },
});



const foruminfo = new GraphQLObjectType({
  name: "forum",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLUnionType(GraphQLEnumType),
    },
    isEdited: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    comments: [{
      content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLUnionType(GraphQLEnumType),
    },
    isEdited: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }]
  },
});




const foruminput = new GraphQLInputObjectType({
  name: "foruminput",
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLUnionType(GraphQLEnumType),
    },
    isEdited: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    comments: [{
      content: {
      type: new GraphQLNonNull(GraphQLString),
    },
    author: {
      type: new GraphQLNonNull(GraphQLString),
    },
    date: {
      type: new GraphQLUnionType(GraphQLEnumType),
    },
    isEdited: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
  }]
},
});



const rootQuery1 = new GraphQLObjectType({
  name: "Query",
  fields: {
    forum: {
      type: new GraphQLList(foruminfo),
      resolve: async () => {
        try {
          return await forum.find();
          //200 is generic success
          // res.status(200).json(characters);
        } catch (err) {
            //500 means server error, not user error
          // res.status(500).json({message: err.message});
          throw new Error(err.message);
        }
      },
    },

    forums: {
      type: foruminfo,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve: async (_, args) => {
        try {
          return await forum.findById(args.id);
          // res.status(200).json(character);
        } catch (err) {
          //500 means server error, not user error
          // res.status(500).json({message: err.message});
          throw new Error(err.message);
        }
      }
    },
  },
});

const Mutation1 = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createforum: {
      type: foruminfo,
      args: {
        forum: {
          type: new GraphQLNonNull(foruminput),
        },
      },
      resolve: async (_, args) => {
        try {
          return await forum.create(args.forum)

        } catch (err) {
          //500 means server error, not user error
          // res.status(500).json({message: err.message});
          throw new Error(err.message);
        }
      },
    },
  },
});



module.exports = new GraphQLSchema({
  query: rootQuery,
  mutation: Mutation,
 
});

module.exports = new GraphQLSchema({
  query:  rootQuery1,
  mutation: Mutation1,
 
});



