import { createLazyFileRoute } from '@tanstack/react-router'
import OTPInput from '../../../components/login/otp/OTPInput'
import { useCallback, useMemo } from 'react'

export const Route = createLazyFileRoute('/login/otp/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { container, email, eta  } = Route.useRouteContext()

  const loginService = useMemo(()=>{
    return container.get('loginService')
  }, [container])

  const navigate = Route.useNavigate()

  const handleSendOTP = useCallback(async (otp: string)=>{
    const { userName } = await loginService.loginWithOTP(otp, email)

    await navigate({
      to: '/',
      search: {
        email,
        userName
      },
      mask:{
        to: '/'
      }
    })
  }, [loginService, email, navigate])

  return <main className='grid self-center grow place-content-center-safe h-full'>
    <OTPInput 
      onResend={loginService.sendEmailForOTP}
      email={email}
      eta={eta ?? 10_000}
      sendOTP={handleSendOTP}
    />
  </main>
}
