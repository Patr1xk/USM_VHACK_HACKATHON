import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import images
import salad1 from '../assets/salad 1.svg';
import salad2 from '../assets/salad 2.svg';
import salad3 from '../assets/salad 3.svg';
import salad4 from '../assets/salad 4.svg';
import salad5 from '../assets/salad 5.svg';
import salad6 from '../assets/salad 6.svg';
import doctor from "../assets/doctor.png"


const Slider1 = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };
  return (
    <div className='w-3/4 m-auto'>
      <div className="mt-20">
      <Slider {...settings}>
        {data.map((d) => (
          <div key={d.name} className="bg-white h-[450px] text-black rounded-xl">
            <div className='h-56 bg-indigo-500 flex justify-center items-center rounded-t-xl'>
              <img src={d.img} alt="" className="h-44 w-44 rounded-full"/>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 p-4">
              <p className="text-xl font-semibold">{d.name}</p>
              <p className="text-center">{d.recipe}</p>
              <button className='bg-indigo-500 text-white text-lg px-6 py-1 rounded-xl'>Read More</button>
            </div>
          </div>
        ))}
      </Slider>
      </div>
      
    </div>
  );
};

const data = [
  {
    name: "Caesar Salad",
    img: salad1,
    recipe: "Romaine lettuce, croutons, Parmesan cheese, Caesar dressing, and grilled chicken (optional)."
  },
  {
    name: "Greek Salad",
    img: salad2,
    recipe: "Tomatoes, cucumbers, red onions, olives, feta cheese, oregano, and olive oil."
  },
  {
    name: "Cobb Salad",
    img: salad3,
    recipe: "Romaine lettuce, grilled chicken, bacon, boiled eggs, avocado, blue cheese, and ranch dressing."
  },
  {
    name: "Caprese Salad",
    img: salad4,
    recipe: "Fresh mozzarella, tomatoes, basil leaves, balsamic glaze, and olive oil."
  },
  {
    name: "Waldorf Salad",
    img: salad5,
    recipe: "Apples, celery, walnuts, grapes, and mayonnaise or yogurt."
  },
  {
    name: "Asian Sesame Salad",
    img: salad6,
    recipe: "Lettuce, shredded carrots, almonds, mandarin oranges, crispy wontons, and sesame dressing."
  }
  
];

export default Slider1;
