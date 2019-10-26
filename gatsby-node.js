const axios = require('axios');
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
exports.sourceNodes = async ({ 
    actions,
    createContentDigest,
    createNodeId }) => {
    const { createNode } = actions
    const starWarsData = await axios.get("https://swapi.co/api/starships/");
    const data = starWarsData.data
        //console.log(data)
    const starShipNode = ship => {
        console.log(ship)
        return {
          id: createNodeId(`ship-${ship.name}`),
          name: ship.name,
          model: ship.model,
          manufacturer: ship.manufacturer,
          hyperdrive: ship.hyperdrive_rating,
          internal: {
            type: 'Starships',
            content: JSON.stringify(ship),
            contentDigest: createContentDigest(ship)
          }
        }
      }
    //   console.log(starShipNode(starWarsData))
    data.results.forEach(starship => {
        //console.log(starship)
        createNode(starShipNode(starship))
    });
    
}

 