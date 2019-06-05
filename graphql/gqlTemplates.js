const gl4sProductQuery =  `
query getGLR4SPValidProducts($collectionId: ID!,$metaNameSpace: String!, $metaKey: String!){
  collection(id: $collectionId) {
    products(first: 10) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        cursor
        node {
        id
        hasOnlyDefaultVariant
        hasOutOfStockVariants
          images(first: 12) {
            edges {
              node {
                altText
                id
                src
                originalSrc
              }
            }
          }
          metafield(namespace: $metaNameSpace, key: $metaKey) {
            value
          }
          title
          handle
          description
          descriptionHtml
          descriptionPlainSummary
          featuredImage {
            altText
            id
            src
            originalSrc
          }
          defaultCursor
          productType
          variants(first:5){
            edges{
                node{
                id
                sku
                title
                inventoryQuantity
                price
                image
                
                }
            }
          }
        }
      }
    }
    productsCount
  }
  }`;


module.exports = gl4sProductQuery;
