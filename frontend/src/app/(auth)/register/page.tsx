'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import { Button, Input, Card } from '@/components/ui'
import { Eye, EyeOff, CheckCircle } from 'lucide-react'
import { validatePassword } from '@/lib/validation'

interface RegisterFormData {
  fullName: string
  username: string
  email: string
  password: string
  confirmPassword: string
  terms: boolean
}

type PasswordStrength = 'weak' | 'medium' | 'strong' | ''

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>('')

  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()
  const router = useRouter()
  const { register: registerUser } = useAuth()
  const { showToast } = useToast()

  const password = watch('password')
  const email = watch('email')

  useEffect(() => {
    if (password) {
      const result = validatePassword(password)
      setPasswordStrength(result.strength as PasswordStrength)
    } else {
      setPasswordStrength('')
    }
  }, [password])

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true)
    
    try {
      await registerUser({
        fullName: data.fullName,
        username: data.username,
        email: data.email,
        password: data.password,
        confirmPassword: data.confirmPassword,
      })
      
      showToast('Account created! Please sign in. ✓', 'success')
      
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (err) {
      showToast('Registration failed. Please try again.', 'error')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <Card className="bg-white rounded-2xl shadow-card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-primary text-center mb-2">MealMajor</h1>
        <h2 className="text-2xl font-bold text-gray-900 text-center">Create Your Account</h2>
        <p className="text-gray-500 text-center mb-8">Start your healthy eating journey today</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="John Doe"
            error={errors.fullName?.message}
            {...register('fullName', { 
              required: 'Full name is required',
              minLength: { value: 2, message: 'Name must be at least 2 characters' }
            })}
          />

          <div>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              rightIcon={
                email && !errors.email && (
                  <CheckCircle size={20} className="text-green-500" />
                )
              }
            />
          </div>

          <Input
            label="Username"
            placeholder="johndoe_123"
            error={errors.username?.message}
            {...register('username', { 
              required: 'Username is required',
              minLength: { value: 3, message: 'Username must be at least 3 characters' },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: 'Only letters, numbers, and underscores allowed'
              }
            })}
          />

          <div>
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a strong password"
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 8, message: 'Password must be at least 8 characters' }
              })}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              }
            />
            
            {password && (
              <div className="mt-2 mb-4">
                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      passwordStrength === 'weak'
                        ? 'w-1/3 bg-red-500'
                        : passwordStrength === 'medium'
                        ? 'w-2/3 bg-yellow-500'
                        : passwordStrength === 'strong'
                        ? 'w-full bg-green-500'
                        : ''
                    }`}
                  />
                </div>
                <p
                  className={`text-xs mt-1 font-medium ${
                    passwordStrength === 'weak'
                      ? 'text-red-600'
                      : passwordStrength === 'medium'
                      ? 'text-yellow-600'
                      : passwordStrength === 'strong'
                      ? 'text-green-600'
                      : ''
                  }`}
                >
                  {passwordStrength ? `Strength: ${passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}` : ''}
                </p>
              </div>
            )}
          </div>

          <Input
            label="Confirm Password"
            type={showConfirm ? 'text' : 'password'}
            placeholder="Re-enter your password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            }
          />

          <div>
            <label className="flex items-start gap-2">
              <input
                type="checkbox"
                className="w-4 h-4 rounded mt-0.5"
                {...register('terms', { required: 'You must accept the terms' })}
              />
              <span className="text-sm text-gray-600">
                I agree to the{' '}
                <Link href="#" className="text-primary hover:underline font-medium">
                  Terms & Conditions
                </Link>
                {' '}and{' '}
                <Link href="#" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
              </span>
            </label>
            {errors.terms && (
              <p className="text-sm text-red-600 mt-1">{errors.terms.message}</p>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={isLoading}
            className="bg-primary hover:bg-primary-dark text-white"
          >
            Create Account
          </Button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-primary font-semibold hover:underline">
            Sign In
          </Link>
        </div>
      </Card>
    </div>
  )
}
