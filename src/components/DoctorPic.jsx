import React from 'react'
import doctor2 from "../assets/doctor2.svg"


const DoctorPic = () => {
  return (
    <nav className = "flex justify-between items-center  ">
            <a className = "flex item-center pr-2 pt-2">
                <img src = {doctor2}
                    alt = "doctor icon"
                    width = {400}
                    height = {300}
                    className = "object-contain "
                />
            </a>
        </nav>
  )
}

export default DoctorPic
