import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Santo from './pages/Santo'
// import Musica from './pages/Musica'
import Oracao from './pages/Oracao'
import Novena from './pages/Novena'
import Obra from './pages/Obra'


const API_URL = import.meta.env.VITE_API_URL

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/santo/:id' element={<Santo />}></Route>
      <Route path='/santo/:santoId/oracao/:oracaoId' element={<Oracao />}></Route>
      <Route path='/santo/:santoId/novena/:novenaId' element={<Novena />}></Route>
      {/* <Route path='/santo/:id/musica/:id' element={<Musica />}></Route> */}
      <Route path='/santo/:santoId/obra/:obraId' element={<Obra />}></Route>
    </Routes>
  );
}

