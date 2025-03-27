import React from 'react'
import doctor from "../assets/doctor.png"


const DoctorIcon = () => {
  return (
    <nav className = "flex justify-between items-center  ">
        <a className = "flex item-center pr-2 pt-2">
            <img src = {doctor}
                alt = "doctor icon"
                width = {400}
                height = {300}
                className = "object-contain "
            />
        </a>
    </nav>
  )
}

export default DoctorIcon
