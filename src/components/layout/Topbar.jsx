import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from '@mui/material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext'

const Topbar = () => {
  const {
    academicYears,
    academicYear,
    setAcademicYear,
    setUser,
  } = useContext(AuthContext)

  const navigate = useNavigate()

  /* =========================
     LOGOUT
  ========================= */
  const logout = () => {
    localStorage.clear()
    setUser(null)
    navigate('/login')
  }

  return (
    <Box
      sx={{
        height: 64,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #e0e0e0',
        backgroundColor: '#fff',
      }}
    >
      {/* LEFT SIDE */}
      <Typography variant="h6">
        Admin Panel
      </Typography>

      {/* RIGHT SIDE */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* ACADEMIC YEAR SELECT */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2">
            Academic Year
          </Typography>

          <Select
            size="small"
            displayEmpty
            value={academicYear?.academic_year_id || ''}
            onChange={e => {
              const selected = academicYears.find(
                y => y.academic_year_id === e.target.value
              )
              setAcademicYear(selected)
            }}
            sx={{ minWidth: 140 }}
          >
            <MenuItem value="">
              Select Year
            </MenuItem>

            {academicYears.map(y => (
              <MenuItem
                key={y.academic_year_id}
                value={y.academic_year_id}
              >
                {y.year_name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        {/* LOGOUT BUTTON */}
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={logout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  )
}

export default Topbar
