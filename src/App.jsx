import { HashRouter, Routes, Route } from 'react-router-dom'
import { CitizenLayout } from './components/CitizenLayout'
import { MerchantLayout } from './pages/merchant/MerchantLayout'
import Home from './pages/citizen/Home'
import Esplora from './pages/citizen/Esplora'
import Offerte from './pages/citizen/Offerte'
import MerchantDetail from './pages/citizen/MerchantDetail'
import Prenota from './pages/citizen/Prenota'
import Ordina from './pages/citizen/Ordina'
import ChatList from './pages/citizen/ChatList'
import ChatThread from './pages/citizen/ChatThread'
import Login from './pages/merchant/Login'
import Dashboard from './pages/merchant/Dashboard'
import Vetrina from './pages/merchant/Vetrina'
import OfferteMerchant from './pages/merchant/OfferteMerchant'
import Posts from './pages/merchant/Posts'
import Prenotazioni from './pages/merchant/Prenotazioni'
import Ordini from './pages/merchant/Ordini'
import ChatMerchant from './pages/merchant/ChatMerchant'
import Abbonamento from './pages/merchant/Abbonamento'
import Strumenti from './pages/merchant/Strumenti'
import Admin from './pages/admin/Admin'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<CitizenLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/esplora" element={<Esplora />} />
          <Route path="/offerte" element={<Offerte />} />
          <Route path="/chat" element={<ChatList />} />
          <Route path="/chat/:merchantId" element={<ChatThread />} />
          <Route path="/esercente/:id" element={<MerchantDetail />} />
          <Route path="/esercente/:id/prenota" element={<Prenota />} />
          <Route path="/esercente/:id/ordina" element={<Ordina />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/area-esercente" element={<MerchantLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vetrina" element={<Vetrina />} />
          <Route path="offerte" element={<OfferteMerchant />} />
          <Route path="post" element={<Posts />} />
          <Route path="prenotazioni" element={<Prenotazioni />} />
          <Route path="ordini" element={<Ordini />} />
          <Route path="chat" element={<ChatMerchant />} />
          <Route path="abbonamento" element={<Abbonamento />} />
          <Route path="strumenti" element={<Strumenti />} />
        </Route>
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </HashRouter>
  )
}
