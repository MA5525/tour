import React, { useState, useEffect } from 'react'
import Loading from './components/Loading'
import Tours from './components/Tours/Tours'
import axios from 'axios'
import './style.css'
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(false)
  const [tours, setTours] = useState([])

  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }
const getTours=async()=>{
  setLoading(true)
  const {data} =await axios.get(url)
  setTours(data)
  setLoading(false)
}

const handleRefresh=()=>{
  getTours()
}

  useEffect(()=>{
    getTours()
  },[])
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <form >
            <button onClick={() => handleRefresh()} >refresh</button>
          </form>

        </div>
      </main>
    )
  }
  return (
    <main className='container'>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App