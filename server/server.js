require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');

const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;
const server = new ApolloServer({
	typeDefs,
	resolvers
})

const startApolloServer = async () => {
	await server.start()

	app.use(express.urlencoded({ extended: true }))
	app.use(express.json())

	app.use(cors({
		origin: 'https://book-search-engine-66y0.onrender.com',
		//'http://localhost:3000', 
		//'https://book-search-engine-66y0.onrender.com',
		credentials: true,
	  }));

	app.use(
		'/graphql',
		expressMiddleware(server, {
			context: authMiddleware
		})
	)

	// if we're in production, serve client/dist as static assets
	if (process.env.NODE_ENV !== 'production') {
		app.use(express.static(path.join(__dirname, '../client/dist')));

		app.get('*', (req, res) => {
			res.sendFile(path.join(__dirname, '../client/dist/index.html'));
		});
	} else {
		app.get('/', (req, res) => {
		  res.sendFile(path.join(__dirname, '../client/src/pages/SearchBooks.jsx'));
		});
	  }

	db.once('open', () => {
		app.listen(PORT, () => {
			console.log(`🌍 Now listening on localhost:${PORT}`)
			//For local console.log(`Use GraphQL at http://localhost:${PORT}/graphql`)
			console.log(`Use GraphQL at https://book-search-engine-ex1w.onrender.com`);
		})
	})
}

startApolloServer();