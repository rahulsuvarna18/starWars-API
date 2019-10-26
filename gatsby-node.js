const axios = require('axios')

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
    const starWarsData = await axios.get("https://swapi.co/api/people/");
    const getHomeworld = async link => await axios.get(link);
    const data = starWarsData.data
    const starwarsNode = people => {
        return {
          id: createNodeId(`people-${people.name}`),
          name: people.name,
          height: people.height,
          homeworld: people.homeworld,
          internal: {
            type: 'Starships', //query name main heading
            content: JSON.stringify(people),
            contentDigest: createContentDigest(people)
          }
        }
      }
      //created the node structure
    const homeNode = homeworld => {
        return {
            id: createNodeId(`homeworld-${homeworld.name}`),
            name: homeworld.name,
            terrain: homeworld.terrain,
            internal: {
                type: 'Homeworld', //query name main heading
                content: JSON.stringify(homeworld),
                contentDigest: createContentDigest(homeworld)
            }
        }
    }


    //Separation of the method
    const createWorld = async hwdata => {
        const response = await getHomeworld(hwdata);
        const node = homeNode(response.data)
        await createNode(node)
    }

    data.results.forEach(starship => {
        // console.log(starship)
        createNode(starwarsNode(starship))
        createWorld(starship.homeworld);
    });
    
}