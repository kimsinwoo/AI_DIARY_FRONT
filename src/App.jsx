import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CreateDiary, DiaryList, Intro, Login, Main, Mypage, SignUp, NotFound } from './pages'
import DiaryDetail from './pages/DiaryDetail'

function App() {
  const [isLogin, setIsLogin] = useState(false)
  const [isCheckAttedance, setIsCheckAttedance] = useState(false)
  const navigate = useNavigate()

  const accessToken = localStorage.getItem('accessToken')

  const getFormattedDate = () => {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')

    return `${year}${month}${day}`
  }

  const checkAttendance = async () => {
    const date = getFormattedDate()
    try {
      const response = await axios.post('http://localhost:3030/diary/check', {
        accessToken,
        date
      })
      setIsCheckAttedance(response.data.data)
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (!accessToken) {
        setIsLogin(false)
        return
      } else if (accessToken) {
        setIsLogin(true)
        return
      }

      try {
        const response = await axios.get('http://localhost:3030/verify-token', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        if (response.status === 200) {
          setIsLogin(true)
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          const refreshToken = localStorage.getItem('refreshToken')
          if (refreshToken) {
            try {
              const refreshResponse = await axios.post('http://localhost:3030/refresh-token', {
                refreshToken,
              })

              if (refreshResponse.data.accessToken) {
                localStorage.setItem('accessToken', refreshResponse.data.accessToken)
                setIsLogin(true)
              }
            } catch (refreshError) {
              console.log('리프레시 토큰으로 엑세스 토큰을 갱신할 수 없습니다.')
              setIsLogin(false)
            }
          } else {
            setIsLogin(false)
          }
        } else {
          console.log('로그인 상태 확인 실패', error)
          setIsLogin(false)
        }
      }
    }

    checkLoginStatus()
    checkAttendance()
  }, [])

  return (
    <Routes>
      {isLogin ? (
        <Route index element={<Main checkAttendance={isCheckAttedance} />} />
      ) : (
        <Route index element={<Intro />} />
      )}
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<SignUp />} />
      <Route path='/diary' element={<DiaryList checkAttendance={isCheckAttedance} accessToken={localStorage.getItem('accessToken')} />} />
      <Route path='/mypage' element={<Mypage checkAttendance={isCheckAttedance} />} />
      <Route path='/diarydetail' element={<DiaryDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
