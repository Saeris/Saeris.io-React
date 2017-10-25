import md5 from "blueimp-md5" // https://github.com/blueimp/JavaScript-MD5

export const withUser = (id = ``) => component => {
  const fragments = component?.fragments || {}
  return graphql(
    gql`
      query getUser${fragments ? `_${md5(`${Object.keys(fragments).map(name => `${name}`)}`)}` : ``}($id: ID!) {
        user(id: $id) {
          id
          ${fragments ? `${Object.keys(fragments).map(name => `...${name}\n`)}` : ``}
        }
      }
      ${fragments ? Object.values(fragments).map(fragment => `${fragment}\n`) : ``}
    `,
    {
      options: props => ({
        variables: {
          id
        }
      }),
      props: ({ ownProps, data: { loading, user } }) => ({
        loading,
        user
      })
    }
  )(component)
}
