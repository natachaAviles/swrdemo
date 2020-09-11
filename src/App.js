import React from 'react';
import './App.css';

import useSWR from 'swr'
import axios from 'axios'

const fetcher = url => axios.get(url).then(res => res.data)

function Information () {
  const { data, error } = useSWR('https://api.xor.cl/ts/?paradero=pb1283', fetcher, { refreshInterval: 1000, revalidateOnFocus: true, refreshWhenOffline: true })
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (
    <div className='app-container'>
      <p>Parada: {data.descripcion}</p>
      {data.servicios.map((servicio, index) => (
        <div className='app__block' key={index}>
          <p>Servicio: {servicio.servicio}</p>
          <p>Patente: {servicio.patente}</p>
          <p className={!servicio.descripcionError ? 'app__text--normal' : 'app__text--error' }>
            Tiempo de espera: {!servicio.tiempo ? servicio.descripcionError : servicio.tiempo}
          </p>
        </div>
      ))}
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Information />
    </div>
  );
}

export default App;
