import axios from 'axios'
import React,{ useState,useEffect,createContext } from 'react'

export const BookContext = createContext()

export const AppContext = ({children}) => {
  /* 
    Single Movie Starts
  */
  const [movieData,setMovieData]=useState('')
  const [searchData,setSearchData]=useState([])
  const [movieDesc,setMovieDesc]=useState('')
  const [movieReviews,setMovieReviews]=useState([])
  const [movieReviewsPage,setMovieReviewsPage]=useState(0)
  const [cast,setCast] = useState([])
  const [ratings,setRatings] = useState([])
  const [posters,setPosters] = useState([])
  const [images,setImages] = useState([])
  const [videos,setVideos] = useState([])

  useEffect(() => {
    setUserMovies(userMovies)
  },[userMovies])
  useEffect(() => {
    setPopularMoviePages(popularMoviePages)
  },[popularMoviePages])
  useEffect(() => {
    setSearchData(searchData)
    console.log(searchData)
  },[searchData])

  const fetchMovieSearch = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/searchMovie",{
      movieName : mId
    }).then((data)=>{
        setSearchData(data.data.results)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieSearch = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/searchMovie",{
      movieName : mId
    }).then((data)=>{
        setMovieData(data.data.results[0])
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieDesc = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/movieWiki",{
      movieId : mId
    }).then((data)=>{
        setMovieDesc(data.data.plotShort.plainText)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieReviews = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/movieReviews",{
      movieId : mId
    }).then((data)=>{
      setMovieReviews(data.data.items)
      setMovieReviewsPage(data.data.items.length)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieCast = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/movieCrew",{
      movieId : mId
    }).then((data)=>{
      setCast(data.data.actors)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieRatings = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/movieUserRatings",{
      movieId : mId
    }).then((data)=>{
      setRatings(data.data.ratings)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMoviePosters = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/moviePosters",{
      movieId : mId
    }).then((data)=>{
      setPosters(data.data.posters)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieImages = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/movieImages",{
      movieId : mId
    }).then((data)=>{
      setImages(data.data.items)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchSingleMovieVideos = async(mId) => {
    await axios.post("http://localhost:8080/api/movie/movieMedia",{
      movieId : mId
    }).then((data)=>{
      setVideos(data.data)
    }).catch((e) => {
      console.log(e)
    })
  }

  /*
    Single Movie Ends  
  */

  /*
    BATCH MOVIES START  
  */

  const [popularMovies,setPopularMovies] = useState([])
  const [popularMoviePages,setPopularMoviePages] = useState(0)
  const [currPage,setCurrPage] = useState("0")

  const fetchPopularMovies = async() => {
    await axios.get("http://localhost:8080/api/movie/popular")
    .then((data)=>{
      setPopularMovies(data.data.items)
      setPopularMoviePages(data.data.items.length)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchTopRatedMovies = async() => {
    await axios.get("http://localhost:8080/api/movie/toprated")
    .then((data)=>{
      setPopularMovies(data.data.items)
      setPopularMoviePages(data.data.items.length)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchUpcomingMovies = async() => {
    await axios.get("http://localhost:8080/api/movie/upcoming")
    .then((data)=>{
      setPopularMovies(data.data.items)
      setPopularMoviePages(data.data.items.length)
    }).catch((e) => {
      console.log(e)
    })
  }

  const fetchNowPlayingMovies = async() => {
    await axios.get("http://localhost:8080/api/movie/nowplaying")
    .then((data)=>{
      setPopularMovies(data.data.items)
      setPopularMoviePages(data.data.items.length)
    }).catch((e) => {
      console.log(e)
    })
  }

  const CurrPage = () => {
    setCurrPage(1)
  }

  /* 
    BATCH MOVIE END
  */

  /*
    USER QUERIES
  */

  const [isLoggedIn,setIsLoggedIn] = useState(true)
  const [uname ,setUsername] = useState(localStorage.getItem("user")?localStorage.getItem("user"):'username')
  const [userMovies,setUserMovies] = useState([])
  const [us,setUs] = useState([])
  const [success,setSuccess] = useState(null)

  useEffect(() => {
    const userUpdate = () => {
      const user = localStorage.getItem("user")
      if(user){
        setUsername(user)
      }
    }

    window.addEventListener('storage',userUpdate)
  
    return () => {
      window.removeEventListener('storage',userUpdate)
    }
  }, [])
  
  useEffect(() => {
    setUsername(uname)
    console.log(uname)
  },[uname])

  const userLogin = async(username, password) => {
    await axios.post("http://localhost:8080/api/auth/signin",{
      username : username,
      password : password
    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        setIsLoggedIn(false)
        setUs(data.data)
        setUsername(username)
        localStorage.setItem("user",username)
        console.log(data)
      }
    }).catch(e => {
      alert(e.message)
    })
  }

  const userLogOut = async() => {
    await axios.post("http://localhost:8080/api/auth/signout",{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        setIsLoggedIn(true)
        const ck = document.cookie.split(";").filter(e => e.startsWith("loki="))
        document.cookie = ck+";max-age=0";
        localStorage.removeItem("user")
        setUsername("username")
        console.log(data)
      }
    }).catch(e => {
      alert(e.message())
    })
  }

  const userSignUp = async(username,email,password) => {
    await axios.post("http://localhost:8080/api/auth/signup",{
      username : username,
      email : email,
      role : ["user"],
      password : password
    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        setIsLoggedIn(false)
        console.log(data)
      }
    }).catch(e => {
      alert(e.message)
    })
  }

  const deleteWatchMovie = (
    movieId
  ) => {
    axios.post("http://localhost:8080/api/user/deletewatchmovie",{
      movies : movieId

    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data)
        setSuccess(true) 
        deleteAllMovie(movieId)
      }
    }).catch(e => {
      setSuccess(false)
      // alert("Error occured while performing query kindly try again later.")
    })
  }

  const deleteFavMovie = (
    movieId
  ) => {
     axios.post("http://localhost:8080/api/user/deletefavmovie",{
      movies : movieId

    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data)
        setSuccess(true)
        deleteAllMovie(movieId)
      }
    }).catch(e => {
      setSuccess(false)
      // alert("Error occured while performing query kindly try again later.")
    })
  }

  const deletePlayMovie = (
    movieId
  ) => {
     axios.post("http://localhost:8080/api/user/deleteplaymovie",{
      movies : movieId

    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data)
        deleteAllMovie(movieId)
        setSuccess(true)
      }
    }).catch(e => {
      setSuccess(false)
      // alert("Error occured while performing query kindly try again later.")
    })
  }

  const deleteAllMovie = (
    movieId
  ) => {
     axios.post("http://localhost:8080/api/user/deletemovie",{
      movies : movieId

    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data)
        allMovies()
      }
    }).catch(e => {
      alert("Error occured while performing query kindly try again later.")
    })
  }

  const addMovie = async(
    movieId,
    movieImgId,
    movieTitle,
    movieDirector,
    movieReleased,
    movieRating,
    watchlist,
    favourite,
    playing,
    bought
  ) => {
  await axios.post("http://localhost:8080/api/user/addmovie",{
    id : movieId,
    movieImgId : movieImgId,
    movieTitle : movieTitle,
    movieDirector : movieDirector,
    movieReleased : movieReleased,
    movieRating : movieRating,
    watchlist : watchlist,
    favourite : favourite,
    playing : playing,
    bought : bought

  },{
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "http://localhost:8080",
      "Access-Control-Allow-Credentials" : true
    },
    withCredentials: true
  }).then(data => {
    if (data.status === 200){
      console.log(data)
      setSuccess(true)
      allMovies()
    }
  }).catch(e => {
    setSuccess(false)
  })
}

  const addFavMovie = async(
    movieId,
    movieImgId,
    movieTitle,
    movieDirector,
    movieReleased,
    movieRating,
    watchlist,
    favourite,
    playing,
    bought
  ) => {
  await axios.post("http://localhost:8080/api/user/addfavmovie",{
    id : movieId,
    movieImgId : movieImgId,
    movieTitle : movieTitle,
    movieDirector : movieDirector,
    movieReleased : movieReleased,
    movieRating : movieRating,
    watchlist : watchlist,
    favourite : favourite,
    playing : playing,
    bought : bought

    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data)
        allMovies()
        setSuccess(true)
      }
    }).catch(e => {
      setSuccess(false)
      // console.log(e.message)
      // alert("Error occured while performing query kindly try again later.")
    })
  }

  const addPlayMovie = async(
    movieId,
    movieImgId,
    movieTitle,
    movieDirector,
    movieReleased,
    movieRating,
    watchlist,
    favourite,
    playing,
    bought
  ) => {
  await axios.post("http://localhost:8080/api/user/addplaymovie",{
    id : movieId,
    movieImgId : movieImgId,
    movieTitle : movieTitle,
    movieDirector : movieDirector,
    movieReleased : movieReleased,
    movieRating : movieRating,
    watchlist : watchlist,
    favourite : favourite,
    playing : playing,
    bought : bought

  },{
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin" : "http://localhost:8080",
      "Access-Control-Allow-Credentials" : true
    },
    withCredentials: true
  }).then(data => {
    if (data.status === 200){
      console.log(data)
      allMovies()
      setSuccess(true)
    }
  }).catch(e => {
    setSuccess(false)
    // alert("Error occured while performing query kindly try again later.")
  })
  }

  const allMovies = () => {
    axios.get("http://localhost:8080/api/user/allMovies",{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data.data)
        setUserMovies(data.data)
        setPopularMoviePages(data.data.length)
      }
    }).catch(e => {
      alert("Error occured while performing query kindly try again later."+e.message)
    })
  }

  const getToken = () => {
    if(document.cookie.split(';').find(row => row.startsWith('loki='))){
      setIsLoggedIn(false)
    }
  }

  useEffect(()=>{
    getToken()
  },[])

  /*
    USER QUERIES END
  */

  /* 
    ADMIN QUERIES START
  */

  const [ users,setUsers ] = useState([])
  const [ userhMovieLength,setUserMovieLength ] = useState([])
  const [ userMoviesInd,setUserMoviesInd ] = useState([])

  const allUsers = async() => {
    axios.get("http://localhost:8080/api/admin/home",{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        // console.log(data)
        setUsers(data.data)
      }
    }).catch(e => {
      alert("Error occured while performing query kindly try again later."+e.message)
    })
  }

  const UserMoviesind = (user) => {
    axios.post("http://localhost:8080/api/admin/movies",{
      user : user
    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data.data)
        setUserMoviesInd(data.data)
      }
    }).catch(e => {
      alert("Error occured while performing query kindly try again later."+e.message)
    })
  }

  const deleteUserDb = (user) => {
    axios.post("http://localhost:8080/api/admin/deleteuser",{
      user : user
    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(data.data)
        allUsers()
      }else{
        alert("Cannot Delete Admin.")
      }
    }).catch(e => {
      alert("Error occured while performing query kindly try again later.")
    })
  }

  const UserMoviesLength = (user) => {
    axios.post("http://localhost:8080/api/admin/movieslength",{
      user : user
    },{
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin" : "http://localhost:8080",
        "Access-Control-Allow-Credentials" : true
      },
      withCredentials: true
    }).then(data => {
      if (data.status === 200){
        console.log(user)
        setUserMovieLength((curr => [...curr,(data.data)]))
      }
    }).catch(e => {
      alert("Error occured while performing query kindly try again later."+e.message)
    })
  }

  
  /*
    ADMIN QUERIES END
  */

  return (
    <BookContext.Provider value={{
      isLoggedIn : isLoggedIn,

      // All Movies
      movies : popularMovies,
      popularPages : popularMoviePages,
      ChangeCurrPage : CurrPage,

      fetchPopularMovies : fetchPopularMovies,
      fetchTopRatedMovies : fetchTopRatedMovies,
      fetchUpcomingMovies : fetchUpcomingMovies,
      fetchNowPlayingMovies : fetchNowPlayingMovies,
      // End All Movies

      fetchSingleMovieSearch : fetchSingleMovieSearch,
      fetchSingleMovieDesc : fetchSingleMovieDesc,
      fetchSingleMovieReviews : fetchSingleMovieReviews,
      fetchSingleMovieCast : fetchSingleMovieCast,
      fetchSingleMovieRatings : fetchSingleMovieRatings,
      fetchSingleMoviePosters : fetchSingleMoviePosters,
      fetchSingleMovieImages : fetchSingleMovieImages,
      fetchSingleMovieVideos : fetchSingleMovieVideos,
      movieData : movieData,
      movieDesc : movieDesc,
      movieReviews : movieReviews,
      movieReviewsPage : movieReviewsPage,
      cast : cast,
      ratings : ratings,
      posters : posters,
      images : images,
      videos : videos,

      //auth
      uname : uname,
      setUsername : setUsername,
      userSignUp : userSignUp,
      userLogin : userLogin,
      userLogOut : userLogOut,
      addMovie : addMovie,
      allMovies : allMovies,
      addFavMovie : addFavMovie,
      addPlayMovie : addPlayMovie,
      userMovies : userMovies,
      deleteWatchMovie : deleteWatchMovie,
      deleteFavMovie : deleteFavMovie,
      deletePlayMovie : deletePlayMovie,
      deleteAllMovie : deleteAllMovie,
      success : success,
      setSuccess : setSuccess,

      //search
      fetchMovieSearch : fetchMovieSearch,
      searchData : searchData,
      setSearchData : setSearchData,

      //admin
      allUsers : allUsers,
      users : users,
      UserMoviesind : UserMoviesind,
      userMoviesInd : userMoviesInd,
      deleteUserDb : deleteUserDb
    }}>
      {children}
    </BookContext.Provider>
  )
}
