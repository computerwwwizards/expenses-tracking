import { createFileRoute, useNavigate, useRouteContext } from '@tanstack/react-router'
import EmailOTPLogin from '../../components/login/otp/EmailOTP'




export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

// TODO: so I need to solve a real problem and its I can witha provider ask
//for a dinamic import but then each time we are gonna do taht and that is not a 
// really good ideea, and we end with a singleton

// the idea is to defer getting the code, askign , importing, it. 
// The problem with that, thog, is that we 


function RouteComponent() {
  const navigate = useNavigate();
  const { container } = useRouteContext({
    from: '/login'
  });

  const onSendMail = async (email: string) => {
    const eta = await container.get('loginService').sendEmailForOTP(email);

    await navigate({
      to: '/login/otp',
      search: {
        email,
        eta
      },
      mask: {
        to: '/login/otp'
      }
    })
  }

  return <main className="grow grid place-content-center-safe h-full">
    <EmailOTPLogin
      sendEmail={onSendMail}
    />
  </main>
}
