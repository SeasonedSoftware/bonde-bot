import ApolloClient, { createNetworkInterface } from 'apollo-client'

const networkInterface = createNetworkInterface({
  uri: process.env.GRAPHQL_URL || 'http://data.bonde.devel:3001/graphql'
})

networkInterface.use([{
  applyMiddleware (req, next) {
    if (!req.options.headers) {
      req.options.headers = {}
    }
    if (global.jwtToken) {
      req.options.headers['authorization'] = `Bearer ${global.jwtToken}`
    }
    next()
  }
}])

export const client = new ApolloClient({ networkInterface })
