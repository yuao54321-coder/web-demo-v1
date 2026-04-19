import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '../lib/AuthContext'

const Auth = () => {
  const navigate = useNavigate()
  const { signIn, signUp } = useAuth()
  const [mode, setMode] = useState('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg('')
    const fn = mode === 'signin' ? signIn : signUp
    const { error } = await fn(email, password)
    setLoading(false)
    if (error) {
      setMsg(error.message)
      return
    }
    if (mode === 'signup') {
      setMsg('注册成功！请查收邮箱确认后再登录')
      return
    }
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-extrabold text-gray-900">飞探</span>
        </div>

        <h2 className="text-xl font-bold text-center mb-6">
          {mode === 'signin' ? '欢迎回来' : '创建账号'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">密码</label>
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="至少6位"
            />
          </div>

          {msg && <div className="text-sm text-red-600">{msg}</div>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white"
          >
            {loading ? '处理中...' : (mode === 'signin' ? '登录' : '注册')}
          </Button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-600">
          {mode === 'signin' ? (
            <>
              没有账号？
              <button onClick={() => setMode('signup')} className="text-orange-600 font-medium ml-1">
                去注册
              </button>
            </>
          ) : (
            <>
              已有账号？
              <button onClick={() => setMode('signin')} className="text-orange-600 font-medium ml-1">
                去登录
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Auth
