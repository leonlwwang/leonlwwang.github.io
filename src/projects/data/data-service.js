let after = null

export const searchRepositories = (gqlQuery) => {
  const gqlResponse = query(gqlQuery)
  return gqlResponse
}

const query = async (query) => {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: query,
      variables: { after },
    }),
  })
  const data = await response.json()
  return data
}
