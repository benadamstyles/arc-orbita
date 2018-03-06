// @flow

declare function graphql(string[]): Object

const QueryImage = ({name, children, data}) =>
  children(data.find(url => url.includes(name)))

export default QueryImage

export const query = graphql`
  query ImageQuery {
    allFile(filter: {relativeDirectory: {eq: "images"}}) {
      edges {
        node {
          publicURL
        }
      }
    }
  }
`
