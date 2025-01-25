export const query = `
  query ($after: String) {
    user(login: "leonlwwang") {
      repositories(
        first: 9
        after: $after
        ownerAffiliations: OWNER
        privacy: PUBLIC
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          name
          description
          createdAt
          pushedAt
          languages(first: 3) {
            edges {
              node {
                name
              }
            }
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }
`
