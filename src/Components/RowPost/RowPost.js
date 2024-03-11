import React, { useEffect,useState } from 'react';
import './RowPost.css'
import { API_KEY,imageUrl } from '../../constants/constants';
import axios from 'axios';
import YouTube from 'react-youtube';

function RowPost(props) {
  const [row,setRow]=useState([])
  const [urlId,setUrlId]= useState('')

  useEffect(()=>{
    axios.get(props.url).then((response)=>{
      
      setRow(response.data.results)
      console.log(response.data.results)
      

    }

   ) 
  }

  ,[])
 
  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

const HandleMovie=(id)=>{
  console.log(id)
  axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
    if (response.data.results.length!==0){
      setUrlId(response.data.results[0])
      

    }
    else{
      console.log('No trailer available')
    }
  })
}



  return (
    <div className='row'>
        <h2>{props.title}</h2>
        <div className='posters'>
        {row.map((obj) => (
         <div key={obj.id}>
               <img onClick={() => HandleMovie(obj.id)} className={props.isSmall ? 'smallposter' : 'poster'} src={`${imageUrl+obj.backdrop_path}`} />
               <p>{obj.name}</p>
        </div>
      
))}
          
          

          { urlId && <YouTube opts={opts} videoId={urlId.key}/> }
        
        
    </div>
    </div>
  );
}

export default RowPost;
