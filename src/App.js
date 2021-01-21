import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import useResponse from './services/useResponse'
import CircularProgress from '@material-ui/core/CircularProgress'


const useStyles = makeStyles({
  card: {
    minWidth: 500,
  },
  
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  formControl: {
    margin: 10,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: 14
  },
});


const App = () =>{
  const actorNames = useSelector(state => state.response.setActorName)
  const filmName = useSelector(state=> state.response.setFilmName)
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const { fetchActorName, fetchFilmUrl } = useResponse()
  const [lastMovieData, setLastMovieData] = useState({movieName:'',date:''}) 
  const [name, setName] = useState('');
  useEffect(() => {
    const fetchData = async()=> {
      await fetchActorName()
    }
    fetchData();
  }, []);
  

  useEffect(()=>{
    let data = []
    if(filmName !== undefined){
    filmName.map(name=>{
      data.push({movieName:name.data.title, date:name.data.release_date})
    })
    
      setLastMovieData(data[data.length - 1])
      return data
  }
  },[filmName])
  

  const handleActorName = actorNames => {
  let newArr = []
  actorNames.forEach((actor, index) => {
    newArr.push(
      <MenuItem key={'stationOption' + index} value={actor.name}>
        <ListItemText primary={actor.name} onClick={()=>handleFilmList(actor.url)} />
      </MenuItem>
    )
  })
   return newArr
  }

  const handleFilmList = async (data) => {
    setLoading(true)
    const res = await fetchFilmUrl(data)
    if(res !== undefined){
      setLoading(false)
    }     
    
  }

  const handleChange = (event) =>{
    setName(event.target.value);
  }

  const renderFilmList = (filmName) => {
    const filmArr = []
    filmName.map((film,index)=>{
      filmArr.push(        
          <Typography variant="body2" component="p" key={index} >
            {film.data.title}
          </Typography>        
      )
      
    })
    return filmArr
  }
  return(
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label">Actor Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={name}
          onChange={handleChange}
        >         
          {handleActorName(actorNames)}          
        </Select>
        {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
      </FormControl>
      
      <Card className={classes.card}>
    
      <CardContent>
      {renderFilmList(filmName)}
      
      </CardContent>
      <CardContent>
      <Typography className={classes.pos} color="textSecondary">
          {lastMovieData !== undefined ? lastMovieData.movieName + ' / '+ lastMovieData.date : ''}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default App;
