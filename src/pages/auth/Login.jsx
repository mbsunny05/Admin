import {
    Box,
    Button,
    Card,
    CardContent,
    TextField,
    Typography,
  } from '@mui/material'
  import { useContext, useState } from 'react'
  import { useNavigate } from 'react-router-dom'
  import api from '../../api/axios'
  import { AuthContext } from '../../auth/AuthContext'
  
  const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
  
    const { setUser } = useContext(AuthContext)
    const navigate = useNavigate()
  
    //as
    console.log('SENDING LOGIN:', {
      username,
      password,
      usernameType: typeof username,
      passwordLength: password.length,
    })
    

    const handleLogin = async () => {
      if (!username || !password) return
  
      try {
        setLoading(true)
  
        const res = await api.post('/auth/signin', {
          username,
          password,
        })
  
        if (res.data.status === 'success') {
          const { token, role } = res.data.data
  
          if (role !== 'admin') {
            alert('Admin access only')
            return
          }
  
          localStorage.setItem('token', token)
          localStorage.setItem('role', role)
  
          setUser({ role })
          navigate('/dashboard')
        }
      } catch (err) {
        alert('Invalid credentials')
      } finally {
        setLoading(false)
      }
    }
  
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg,#1976d2,#42a5f5)',
        }}
      >
        <Card sx={{ width: 380, borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              School Admin Login
            </Typography>
  
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
  
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
  
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </CardContent>
        </Card>
      </Box>
    )
  }
  
  export default Login
  