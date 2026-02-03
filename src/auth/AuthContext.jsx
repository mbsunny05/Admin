import { createContext, useEffect, useState } from 'react'
import api from '../api/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [academicYears, setAcademicYears] = useState([])
  const [academicYear, setAcademicYear] = useState(null)

  /* =========================
     AUTH BOOTSTRAP
  ========================= */
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    if (token && role) {
      setUser({ role })
    } else {
      setUser(null)
    }

    setLoading(false) // ✅ only here
  }, [])

  /* =========================
     LOAD ACADEMIC YEARS
  ========================= */
  useEffect(() => {
    if (!user) return

    api.get('/admin/academic-years')
      .then(res => {
        if (res.data.status === 'success') {
          const years = res.data.data
          setAcademicYears(years)

          const savedYearId =
            localStorage.getItem('academic_year_id')

          const selected =
            years.find(
              y =>
                y.academic_year_id ===
                Number(savedYearId)
            ) ||
            years.find(y => y.is_active) ||
            null

          setAcademicYear(selected)
        }
      })
  }, [user])

  /* =========================
     PERSIST YEAR
  ========================= */
  useEffect(() => {
    if (academicYear) {
      localStorage.setItem(
        'academic_year_id',
        academicYear.academic_year_id
      )
    }
  }, [academicYear])

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.clear()
    setUser(null)
    setAcademicYear(null)
    setAcademicYears([])
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        academicYears,
        academicYear,
        setAcademicYear,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}