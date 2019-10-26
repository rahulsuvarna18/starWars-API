import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import './styles/index.css';

const IndexPage = (props) => {
  props.data.allStarships.edges.forEach(node => {
    console.log(node.node)
  })
  
  return (
    <Layout>
    <SEO title="Home" />
    <p>All the starships in StarWars</p>
    {props.data.allStarships.edges.map(node => {
      return (
        <div key={node.node.name} className="main-text">
          <p>Ship Name: <span className="nodes">{node.node.name}</span></p>
          <p>Ship Model: <span className="nodes">{node.node.model}</span></p>
          <p>Ship Manufacturer: <span className="nodes">{node.node.manufacturer}</span></p>
          <p>Hyperdrive Rating: <span className="nodes">{node.node.hyperdrive}</span></p>
          <p>Starship Class: <span className="nodes">{node.node.starshipClass}</span></p>
          <p>____________________________</p> 
        </div>
      )
    })}
    {/* <p>{props.data.starship.name}</p> */}
    
  </Layout>
  )
}

export default IndexPage

export const query = graphql`
query Site {
  allStarships {
    edges {
      node {
        name
        model
        manufacturer
        hyperdrive
        starshipClass
        id
      }
    }
  }
}

`