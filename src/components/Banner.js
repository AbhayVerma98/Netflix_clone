import React, { useEffect, useState } from 'react';
import './Banner.css';
import Axios from '../Axios';
import RequestAPI from '../RequestAPI';
import movieTrailer from 'movie-trailer';
import YouTube from 'react-youtube';

function Banner() {
  const [movie, setMovie] = useState([]);
  const [trailerurl, setTrailerurl] = useState("");

  useEffect(() => {
      
    async function fetchData() {
        const request = await Axios.get(RequestAPI.fetchNetflixOriginals) ;

        setMovie(
            request.data.results[
                Math.floor(Math.random() * request.data.results.length - 1)
            ]
        );
        return request;
       
    } fetchData();

  }, []) 

   function truncate(str ,n) {
      return str?.length > n ? str.substr(0, n - 1) + "..." : str;  };

      const handleClick = (movie) => {
        
        if(trailerurl){
          setTrailerurl("");
        }else{
          movieTrailer(movie?.name || "")
          .then(url => {
            const urlParams = new URLSearchParams( new URL(url).search);
            setTrailerurl(urlParams.get('v'));
   
          }).catch(error => console.log(error))
        }
          };

          const opts = {
            height: "390",
            width: "100%",
            playerVars: {
              autoplay:1,
            },
          }
  
    return (
      <div className='outercon'>
         <div className="bg">
         <img
            className="nav__logo"
             src="http://www.freepnglogos.com/uploads/netflix-logo-0.png"
            alt="NETFLIX" />
         </div>
       <header className="banner"
       onClick={() => setTrailerurl("")}
       style={{
           backgroundSize: "cover",
           backgroundImage: `url(
               "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
           )`,
           backgroundPosition: "center-center",
       }}
       >

           <div className="banner__contents">

               <h1 className="banner__title">
                   {movie?.title || movie?.name || movie?.original_name}
               </h1>
               <div className="banner__buttons">

                   <button
                    onClick={()=> handleClick(movie)}

                     className="banner__button">
                     Play
                   </button>
                   <button className="banner__button">
                     My List 
                   </button>

               </div>
              <h1 className="banner__description">

                  {truncate(movie?.overview, 150)}

              </h1>
           </div>
         
         <div className="banner--fadeBottom"/>
         
       </header>
      
       {trailerurl && <YouTube
             videoId={trailerurl}  
             opts={opts}
            />} 
      </div>
    )
}

export default Banner