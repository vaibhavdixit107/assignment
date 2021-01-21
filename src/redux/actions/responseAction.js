const updateResponses = (type, obj) => {
    switch (type) {
      case 'SET_ACTORNAME':
        return {
          type: 'SET_ACTORNAME',
          setActorName: obj,
        }
    case 'SET_FILMURL':
        return {
            type: 'SET_FILMURL',
            setFilmUrl: obj,
        }
        case 'SET_FILMNAME':
            return {
                type: 'SET_FILMNAME',
                setFilmName: obj,
            }    
      case 'INITIAL_RESPONSE_DATA':
        return {
          type: 'INITIAL_RESPONSE_DATA',
        }
      default:
    }
  }
  
  export default updateResponses