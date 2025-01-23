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
          owner {
            login
          }
          isFork
          languages(first: 3) {
            edges {
              size
              node {
                name
              }
            }
            totalSize
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
