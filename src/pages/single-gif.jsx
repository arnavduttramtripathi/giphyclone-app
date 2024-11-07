import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GifState } from "../context/context";
import Gif from "../compountens/gif";
import { HiMiniChevronDown, HiMiniChevronUp, HiMiniHeart } from "react-icons/hi2";
import FollowOn from "../compountens/follow-on";
import { HiOutlineExternalLink } from "react-icons/hi";
import { FaPaperPlane } from "react-icons/fa6";
import { IoCodeSharp } from "react-icons/io5";

const contentType = ["gifs", "stickers", "texts"];

const GifPage = () => {
  const { type, slug } = useParams();
  const [gif, setGif] = useState([]);
  const [relatedGifs, setRelatedGifs] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const { gf, addTooFavorites, favorites } = GifState();

// yet to complete
   const shareGif = async (gifUrl) => { 
  try {
    await navigator.clipboard.writeText(gifUrl);
    alert("GIF link copied to clipboard!");
  } catch (error) {
    console.error("Failed to copy GIF link:", error);
    alert("Failed to copy link. Please try again.");
  }
};
  
const shareGifNotYEt = async (gifUrl) => {
  try {
    if (navigator.share) {
      await navigator.share({
        title: "Check out this GIF!",
        url: gifUrl,
      });
    } else {
      await navigator.clipboard.writeText(gifUrl);
      alert("GIF link copied to clipboard!");
    }
  } catch (error) {
    console.error("Error sharing GIF:", error);
  }
  };
  
  const embedGif = async (gifUrl) => {
  const embedCode = `<iframe src="${gifUrl}" width="480" height="270" frameBorder="0" allowFullScreen></iframe>`;
  
  try {
    await navigator.clipboard.writeText(embedCode);
    alert("Embed code copied to clipboard!");
  } catch (error) {
    console.error("Error copying embed code:", error);
    alert("Failed to copy embed code. Please try again.");
  }
};



  const fetchGif = async () => {
    const gifId = slug.split("-").pop();
    const { data } = await gf.gif(gifId);
    const { data: related } = await gf.related(gifId, { limit: 10 });

    setGif(data);
    setRelatedGifs(related);
  };

  useEffect(() => {
    if (!contentType.includes(type)) {
      throw new Error("Invalid Content Type");
    }
    fetchGif();
  }, [type]);

  return (
    <div className="grid grid-cols-4 my-10 gap-4">
      <div className="hidden sm:block">
        {gif?.user && (
          <>
            <div className="flex gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
            </div>
            {readMore || gif?.user?.description?.length < 100
              ? gif?.user?.description
              : `${gif?.user?.description.substring(0, 100)}...`}
            {gif?.user?.description?.length > 100 && (
              <div
                className="flex items-center faded-text cursor-pointer"
                onClick={() => setReadMore(!readMore)}
              >
                {readMore ? (
                  <>
                    Read less <HiMiniChevronUp size={20} />
                  </>
                ) : (
                  <>
                    Read More <HiMiniChevronDown size={20} />
                  </>
                )}
              </div>
            )}
          </>
        )}
        <FollowOn />
        <div className="divider" />
        {gif?.source && (
          <div> 
            <span className="faded-text">Source</span>
            <div className="flex items-center text-sm font-bold gap-1">
              <HiOutlineExternalLink size={25} />
              <a href={gif.source} target="_blank" className="truncate">
                {gif.source}
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="col-span-4 sm:col-span-3">
        <div className="flex gap-6">
          <div className="w-full sm:w-3/4">
            <div className="faded-text truncate mb-2">{gif.title}</div>
            <Gif gif={gif} hover={false} />
            {/* mobile UI */}
            <div className="flex sm:hidden gap-1">
              <img
                src={gif?.user?.avatar_url}
                alt={gif?.user?.display_name}
                className="h-14"
              />
              <div className="px-2">
                <div className="font-bold">{gif?.user?.display_name}</div>
                <div className="faded-text">@{gif?.user?.username}</div>
              </div>
              <button className="ml-auto"
                onClick={shareGif}
              > 
                <FaPaperPlane size={25}/>
              </button>
            </div>
          </div>
          <div className="hidden sm:flex flex-col gap-5 mt-6">
            <button
              onClick={() => addTooFavorites(gif.id)}
              className="flex gap-5 item-center font-bold text-lg" >
              <HiMiniHeart size={30}
                className={`${
                favorites.includes(gif.id) ? "text-red-500": " "
              }`}
              />Favorites
            </button>
            <button
               onClick={shareGif} // yet to done
              className="flex gap-6 items-center font-bold text-lg"
            >
              <FaPaperPlane size={25}/>Share
            </button>
            <button
              onClick={embedGif}  //yet to done
              className="flex gap-6 items-center font-bold text-lg"
            >
              <IoCodeSharp size={25}/>Embed
            </button>
          </div>
          {/* favorites / share / embed */}
        </div>
        <div>
          <span className="font-extrabold">Related GIFs</span>
          {/* Render related GIFs here */}
          <div className="columns-2 md:columns-3 gap-2">
            {relatedGifs.slice(1).map((gif) => (
              <Gif gif={gif} key={gif.id} />
            ))}

          </div>
        </div>
      </div>
    </div>
  );
};

export default GifPage;
