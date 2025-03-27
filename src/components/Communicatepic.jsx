import React from 'react'
import communicate from "../assets/Communicate.svg"

const Communicatepic = () => {
  return (
    <nav className = "flex justify-between items-center  ">
                <a className = "flex item-center pr-2 pt-2">
                    <img src = {communicate}
                        alt = "Communication"
                        width = {400}
                        height = {300}
                        className = "object-contain "
                    />
                </a>
            </nav>
  )
}

export default Communicatepic
