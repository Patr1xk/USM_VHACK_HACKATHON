import React from 'react';
import { Button } from 'primereact/button';
import Bestes from "../assets/Bestes.png"

const Header = () => {
   return(
     <header 
       className="padding-x px-10 py-1 auto top-0 left-0 z-3 w-full bg-white shadow-sm"
       style={{ 
         fontFamily: '"Paytone One", sans-serif',
         color: 'black'
       }}
     >
       <nav className="flex justify-between items-center max-container">
         <a href="/dashboard" className="flex item-center pl-4 pt-2">
           <img 
             src={Bestes}
             alt="Bestes logo"
             width={130}
             height={29}
             className="object-contain"
           />
           <span className="text-5xl font-bold mt-7 ml-4">Bestes</span>
         </a>
         
         <ul className="flex-1 flex justify-center items-center gap-28 max-lg:hidden">
           <li>
             <a href="//dashboard" className="Paytone One text-1xs text-slate-gray hover:text-black mr-4">
               Home
             </a>
           </li>
           <li>
             <a href="//dashboard" className="Paytone One text-1xs text-slate-gray hover:text-black mr-4">
               About us
             </a>
           </li>
           <li>
             <a href="//dashboard" className="Paytone One text-1xs text-slate-gray hover:text-black mr-4">
               Services
             </a>
           </li>
           <li>
             <a href="//dashboard" className="Paytone One text-1xs text-slate-gray hover:text-black mr-4">
               Contact us
             </a>
           </li>
         </ul>

         {/* Larger button with logout text */}
         <div className="flex items-center ml-4">
          
         <a href="/" className="flex items-center">
          <Button 
            icon="pi pi-user" 
            rounded 
            severity="info" 
            aria-label="User"
            size="large"  // Makes the button larger
            className="mr-2"  // Adds margin between button and text
          />
          <span className="text-lg font-semibold text-slate-gray">Logout</span>
        </a>
         </div>
       </nav>
     </header>
   )
}

export default Header;