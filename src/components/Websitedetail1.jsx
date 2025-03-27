import React from 'react'
import Websitedetail from "../assets/websitedetail1.png"

const Websitedetail1 = () => {
  return (
    <div>
      <nav className = "flex justify-between items-center">
              <a className = "flex item-center pl-10 pt-10" style ={{marginLeft : '50px'}}>
                  <img src = {Websitedetail}
                      alt = "website icon"
                      width = {1300}
                      height = {500}
                      className = "object-contain "
                  />
              </a>
          </nav>
    </div>
  )
}

export default Websitedetail1
