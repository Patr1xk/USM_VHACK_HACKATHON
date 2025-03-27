import React from 'react'
import coins from '../assets/coins.svg';
import aichatbot from '../assets/aichatbot.svg';
import salad1 from '../assets/salad 1.svg';
import medicine from "../assets/Medicine.svg"

import { Link } from "react-router-dom";


const CardHover = () => {
  return (
    <div className = "card">
        <div className = "card__container">
            <article className = "card__article">
                <div className = "card__data">
                    <img src = {coins} alt = "coins" class = "card__img"></img>
                        <h1 className="text-2xl font-bold ">Collect points</h1>
                        <Link to = "/progressbar">
                            <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl transform translate-y-5'>Click for more</button>

                        </Link>

                </div>
                <div className = "card__shapes">
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                </div>
            </article>

            <article className = "card__article">
                <div className = "card__data">
                    <img src = {aichatbot} alt = "coins"  className = "card__img left-20" style={{ display: 'block',
                        margin: '0 auto',
                        width: '200px', 
                        height: 'auto' }}></img>
                        <h1 className="text-2xl font-bold transform translate-y-3">AI-Chatbot</h1>
                        <Link to="/chatbot">
                            <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl transform translate-y-8'>Click for more</button>
                        </Link>
                </div>
                <div className = "card__shapes">
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                </div>
            </article>

            <article className = "card__article">
                <div className = "card__data">
                    <img src = {salad1} alt = "coins" class = "card__img"></img>
                        <h1 className="text-2xl font-bold transform translate-y-6">Meal suggestion</h1>
                        <Link to="/mealplan">
                        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl transform translate-y-12'>Click for more</button>

                        </Link>
                </div>
                <div className = "card__shapes">
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                </div>
            </article>

            <article className = "card__article">
                <div className = "card__data">
                <img src = {medicine} alt = "coins" className = "card__img w-120 h-30 "></img>


                        <h1 className="text-2xl font-bold ">Daily medication reminder</h1>
                        <Link to="/medication">
                        <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl transform translate-y-2'>Click for more</button>

                        </Link>
                </div>
                <div className = "card__shapes">
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                    <span className="card__shape"></span>
                </div>
            </article>
        </div>


    </div>
  )
}

export default CardHover
