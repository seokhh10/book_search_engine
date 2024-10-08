import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Outlet } from 'react-router-dom'

import Navbar from './components/Navbar'

import './App.css'

const httpLink = createHttpLink({
	 uri: 'https://book-search-engine-ex1w.onrender.com'

	 // For local  	 uri: 'http://localhost:3000/graphql'
})

const authLink = setContext((_, { headers }) => {
	const token = localStorage.getItem('id_token')
	return {
		headers: {
			...headers,
			authorization: token ? `Bearer ${token}` : ''
		}
	}
})

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache()
})

function App() {
	return (
		<>
			<ApolloProvider client={client}>
				<Navbar />
				<Outlet />
			</ApolloProvider>
		</>
	)
}

export default App;