import React, { useEffect, useState } from 'react';
import { API_KEY } from '../../constants/constants';
import './Banner.css';
import axios from '../../axios'
import { imageUrl } from '../../constants/constants';

function Banner() {

  const [movie,setMovie]=useState()
  useEffect(()=>{
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`).then((response)=>{
      console.log(response.data.results[0])
      setMovie(response.data.results[0])

    })
  }

  ,[])


  return (
    <div 
     style={{backgroundImage:`url(${movie ? imageUrl+movie.backdrop_path : ""})`}}
     className='banner'>
      
        <div className='content'>
            
            <h1> {movie ? movie.title : ""}  </h1><br/>

            <div className='banner_buttons'>
                <button className='buttons'> Play</button>
                <button className='buttons'> My List</button>
            </div><br/>

            <div className='description'>
                <h1> {movie ? movie.overview : ""} </h1>
            </div>
        </div>

     <div className="fade_bottom"></div>
        
        



      
    </div>
    
  );
}

export default Banner;
