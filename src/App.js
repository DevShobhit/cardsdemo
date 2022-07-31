import React from 'react'
import Home from './pages/home'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Result, Button } from 'antd'
import CardGrid from './components/listngrids/cardgrid'
import History from './pages/history'
import NotFound from './pages/404'

function App() {
  const cards = useSelector((state) => state.cards)
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}>
            <Route
              path='/'
              element={
                cards.error ? (
                  <Result
                    status='warning'
                    title='There are some problems with your connection.'
                    extra={
                      <Button
                        type='primary'
                        key='reload'
                        onClick={() => window.location.reload()}
                      >
                        Try Again
                      </Button>
                    }
                  />
                ) : (
                  <CardGrid />
                )
              }
            />
            <Route path='history' element={<History />}></Route>
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
