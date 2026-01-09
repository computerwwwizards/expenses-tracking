import { createLazyFileRoute, useNavigate, useRouteContext } from '@tanstack/react-router'
import OTPInput from '../../../components/login/otp/OTPInput'
import { useCallback, useMemo } from 'react'

export const Route = createLazyFileRoute('/login/otp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { email, eta } = useRouteContext({
    from: '/login/otp/'
  })

  const { container } = useRouteContext({
    from: '/login',
  })

  const loginService = useMemo(()=>{
    return container.get('loginService')
  }, [container])

  const navigate = useNavigate({
    from: '/login/otp'
  })

  const handleSendOTP = useCallback(async (otp: string)=>{
    await loginService.loginWithOTP(otp)

    await navigate({
      to: '/'
    })
  }, [loginService])

  return <main className='grid self-center grow place-content-center-safe'>
    <OTPInput 
      onResend={loginService.sendEmailForOTP}
      email={email}
      eta={eta ?? 10_000}
      sendOTP={handleSendOTP}
    />
  </main>
}
