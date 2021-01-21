const updateResponses = (state = { setActorName: [], setFilmUrl: [], setFilmName:[] }, action) => {
    switch (action.type) {
      case 'SET_ACTORNAME':
        return {...state, setActorName: action.setActorName}
    case 'SET_FILMURL':
        return {...state, setFilmUrl: action.setFilmUrl}
        case 'SET_FILMNAME':
        return {...state, setFilmName: action.setFilmName}
      case 'INITIAL_RESPONSE_DATA':
        return {
          updateReport: [],
        }
      default:
        return state
    }
  }
  
  export default updateResponses