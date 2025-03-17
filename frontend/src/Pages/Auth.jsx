import { LoginForm } from '@/components/ui/login-form'
import React from 'react'
import { useLocation } from 'react-router-dom'

function Auth() {
  const location=useLocation();
  const path=location.pathname;
  const mode=path.split('/');
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
          <LoginForm mode={mode[1]}/>
      </div>
    </div>
  )
}

export default Auth