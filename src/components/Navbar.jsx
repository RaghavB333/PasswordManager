import React from 'react'

const Navbar = () => {
  return (
    <nav className='bg-slate-800'>
      <div className="md:mycontainer md:w-[calc(100vw-24rem)] md:mx-48 md:flex md:justify-between md:items-center md:px-4 md:h-14 md:py-5 flex justify-between items-center px-4 h-14 py-5 ">
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>
          <span>MyPass</span>
          <span className="text-green-700">Man/&gt;</span>
        </div>
        {/* <ul>
          <li className='flex gap-4 text-white'>
            <a className='hover:font-bold' href="#">Home</a>
            <a className='hover:font-bold' href="#">About</a>
            <a className='hover:font-bold' href="#">Contact</a>
          </li>
        </ul> */}
        <button className='text-white bg-green-700 my-5 rounded-full flex gap-4 justify-between  items-center ring-white ring-1'>
          <img className='invert py-1 w-10 ' src="github.svg" alt="image" />
          <span className='font-bold px-2'>Github </span>
        </button>
      </div>

    </nav>
  )
}

export default Navbar
