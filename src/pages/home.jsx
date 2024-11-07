import React, { useEffect } from 'react'
import { GifState } from '../context/context';
import Gif from "../compountens/gif";
import FilterGif from '../compountens/filter-gifs';

const HomePage = () => {
  const { gf, gifs, setGifs, filter } = GifState();

  const fetchTrandingGIFs = async () => {
    const { data } = await gf.trending({
      limit: 20,
      type: filter,
      rating: "g",
    });
    setGifs(data);
  };
  useEffect(() => {
    fetchTrandingGIFs();
  }, [filter]);
  return (
    <div>
      <img
        src="/banner.gif"
        alt="earth banner"
        className='mt-2 rounded w-full' />
      
      <FilterGif showTrending/>

      <div className='columns-2 md:col-span-3 lg:columns-4 xl:columns-5 gap-2'>
        {gifs.map((gif) => {
          return <Gif gif={gif} key={gif.title}/>;
        })}
      </div>
    </div>

  )
}

export default HomePage