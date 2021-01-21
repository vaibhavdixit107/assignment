import updateResponses from '../redux/actions/responseAction'
import { useDispatch } from 'react-redux'
const axios = require('axios').default

function useResponse(){
    const dispatch = useDispatch()
    const fetchActorName = () => 
    {
        return axios
          .get('https://swapi.dev/api/people')
          .then(res => {
            setActorName(res.data.results)
            return res
          })
          .catch(error => {
            return error
          })
    }
    const fetchFilmUrl = data => 
    {
        return axios
          .get(data)
          .then(res => {
            setFilmUrl(res.data.films)
            axios.all(res.data.films.map(l => axios.get(l)))
            .then(axios.spread(function (...res) {
            dispatch(updateResponses('SET_FILMNAME',res))
        
         }));
            return res
          })
          .catch(error => {
            return error
          })
    }
    const setActorName = data => {
        dispatch(updateResponses('SET_ACTORNAME', data))      
    }
    const setFilmUrl = data => {
        dispatch(updateResponses('SET_FILMURL', data))
    }
      
    return {
        fetchActorName,
        fetchFilmUrl,        
      }
}

export default useResponse