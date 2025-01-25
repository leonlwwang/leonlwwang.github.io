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
  if (response.status !== 200) {
    throw new Error(`${response.status}\n${response.statusText}`)
  }
  const data = await response.json()
  return data
}
