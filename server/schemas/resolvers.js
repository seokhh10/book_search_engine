const { User } = require('../models');
// graphSQL error handling 
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        // authentication method for middleware
        
        me: async (parent, args, context) => {
          if (context.user) {
            const userData = await User.findOne({ _id: context.user._id })
              .select('-__v -password')
              .populate('book')
            return userData;
          }
        
          throw new AuthenticationError('Not logged in');
        },
        // get all users
        users: async () => {
            return User.find()
            .select('-__v -password')
            .populate('book')
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
            .select('-__v -password')
            .populate('book')
        },
    },
    Mutation: {
        // login resolver uses the authentication import AuthenticationError
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
        },
        addUser: async (parent, args) => {
            // Mongoose User model creates a new user in the database
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
             saveBook: async (parent, {bookInput}, context) => {
             console.log(context.user)
             console.log(bookInput)
             

            if (context.user) {
            
              const book = await User.findByIdAndUpdate(
                { _id: context.user._id },
                { $push: { savedBooks: bookInput } },
                { new: true }
              );
          
              return book;
            }
             
            throw new AuthenticationError('You need to be logged in!');
        },
        // removeBook function
        removeBook: async (parent, args, context) => {
           console.log(args)
          

          if (context.user) {
              const book = await User.findByIdAndUpdate(
              { _id: context.user._id },
              { $pull: { savedBooks: args } },
              { new: true }
            );
        
            return book;
          }
          
          throw new AuthenticationError('You need to be logged in!');
      },
      removeBook: async (parent, args, context) => {
        if(context.user) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: context.user._id },
            { $pull: { savedBooks: { bookId: args.bookId } } },
            { new: true }
        );

        return updatedUser;
        }

        throw new AuthenticationError('You need to be logged in!');
      }
    }
  };
  
module.exports = resolvers;