import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiEllipsisVertical, HiMiniBars3BottomRight } from "react-icons/hi2";
import { GifState } from '../context/context';
import GifSearch from './gif-search';

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  
  const { gf, favorites } = GifState();

  const fetchingGifCategories = async () => {
    const { data } = await gf.categories();
    setCategories(data);
  };

  useEffect(() => {
    fetchingGifCategories();
  }, []);

  return (
    <nav>
      <div className='relative flex gap-4 justify-between items-center mb-2'>
        <Link to="/" className='flex gap-2'>
          <img src="./logo.svg" className='w-8' alt="giphy logo" />
          <h1 className='text-5xl font-bold tracking-tight cursor-pointer'>
            Giphy
          </h1>
        </Link>
        
        <div className='flex items-center gap-4'>
          {/* Render categories */}
          {categories?.slice(0, 5)?.map((category) => (
            <Link
              key={category.name}
              to={`/${category.name_encoded}`}
              className='px-4 py-1 hover:gradient border-b-4 hidden lg:block'
            >
              {category.name}
            </Link>
          ))}
          
          <button onClick={() => setShowCategories(!showCategories)}>
            <HiEllipsisVertical
              size={35}
              className={`py-0.5 hover:gradient ${showCategories ? "gradient" : ""} border-b-4 hidden lg:block`}
            />
          </button>

          {favorites?.length > 0 && (
            <div className='h-9 bg-gray-700 pt-1.5 px-6 cursor-pointer rounded'>
              <Link to="/favorite">Favorites</Link>
            </div>
          )}

          <button onClick={() => setShowCategories(!showCategories)}>
            <HiMiniBars3BottomRight className='text-sky-400 block lg:hidden' size={30} />
          </button>
        </div>

        {/* Category dropdown for small screens with gradient background */}
        {showCategories && (
          <div className='absolute right-0 top-14 px-10 pt-6 pb-9 w-full gradient z-20'>
            <span className='text-3xl font-extrabold'>Categories</span>
            <hr className='bg-gray-100 opacity-10 my-5' />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
              {categories?.map((category) => (
                <Link 
                  to={`/${category.name_encoded}`} 
                  className='font-bold' 
                  key={category.name}
                  onClick={() => setShowCategories(false)}  // Close menu after clicking
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
          {/* Search */}
          <GifSearch />
    </nav>
  );
};

export default Header;
