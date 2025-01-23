import { repoQuery } from '/src/projects/data/gql.js'

let after = null

export const searchRepositories = () => {
  const gqlResponse = query(repoQuery)
  return gqlResponse
}

const query = async (gqlQuery) => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`
    },
    body: JSON.stringify({
      query: gqlQuery,
      variables: { after },
    }),
  })
  const data = await response.json()
  return data
}