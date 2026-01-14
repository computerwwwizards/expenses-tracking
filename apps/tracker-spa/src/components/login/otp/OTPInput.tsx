import { useActionState, useCallback,useMemo, useState, type ChangeEvent, type HTMLAttributes, type ReactNode } from "react";
import TextField from "shared-react/text-field";
import Button from "shared-react/button";
import Spinner from "shared-react/spinner";
import type { TimerProps } from "shared-react/timer";
import Timer from "shared-react/timer";




export interface OTPInputProps {
  email: string;
  eta: number;
  onResend?: (email: string) => Promise<number>;
  sendOTP?: (otp: string) => Promise<void>
}

interface OTPFormState {
  errors?: {
    id: string;
    message: ReactNode;
  }[];
}

interface ResendFormState {
  errors?: {
    id: string;
    message: ReactNode;
  }[];
  eta?: number;
}


interface RedTimerProps extends TimerProps {
  etaToRed?: number;
}

function RedTimer({
  onTick, 
  initialEta,
  refreshRate,
  step,
  etaFormatter,
  etaToRed = 10000,
  onStop,
  className,
  ...props
}: RedTimerProps & HTMLAttributes<HTMLElement>){
  const [isRed, setIsRed ] = useState(false);

  const handleTick = useCallback((prevEta: number, newEta: number)=>{
    setIsRed(newEta <= etaToRed);
    onTick?.(prevEta, newEta);
  }, [onTick, etaToRed])

  return <strong 
    className={(isRed ?'text-red-500 ':' ').concat(className ?? '') } 
    {...props}
  >
    <Timer 
      onTick={handleTick}  
      initialEta={initialEta}
      etaFormatter={etaFormatter}
      step={step}
      onStop={onStop}
      refreshRate={refreshRate}
    />
  </strong> 
}

export default function OTPInput({
  email,
  eta,
  onResend,
  sendOTP
}: OTPInputProps) {
  const [state, action, pending] = useActionState(async (
    _prevState: OTPFormState | null,
    formData: FormData
  ) => {
    const otp = formData.get('otp')?.toString();
    if (!otp)
      return {
        errors: [{
          id: 'no otp',
          message: 'Please enter the OTP code'
        }]
      };

    try {
      await sendOTP?.(otp);
      return {};
    } catch (error: unknown) {
      const internalError = error as Error;

      return {
        errors: [{
          id: internalError.message,
          message: internalError.message
        }]
      };
    }
  }, {});

  const [isExpired, setIsExpired] = useState(false);
  const [isValid, setIsValid ] = useState(false)
  const onChange = useCallback((event: ChangeEvent<HTMLInputElement>)=>{
    const { currentTarget } = event

    setIsValid(currentTarget.checkValidity())
  }, [])
  const [resendState, resendAction, resendPending] = useActionState(async (
    prevState: ResendFormState,
    _formData: FormData
  ) => {
    try {
      const newEta = await onResend?.(email);
      setIsExpired(false)
      return { eta: newEta ?? prevState.eta};
    } catch (error: unknown) {
      const internalError = error as Error;
      return {
        errors: [{
          id: internalError.message,
          message: internalError.message
        }]
      };
    }
  }, { eta });

  const isDisable = useMemo(() => isExpired || pending, [isExpired, pending])

  const handleStop = useCallback(() => {
    setIsExpired(true)
  }, [])

  return <div className="grid gap-4 place-content-center">
    <p>We have sent the code to <strong>{email}</strong></p>
    {isExpired ?
      <div className="grid gap-3 place-content-center">
        <p>Your code has expired</p>
        <form className="grid" action={resendAction}>
          <Button type="submit" disabled={resendPending}>
            {resendPending ? <Spinner size="sm" /> : 'Send again'}
          </Button>
        </form>
        {
          !!resendState?.errors?.length && <ul className="text-red-500">
            {resendState?.errors.map(({
              id, message
            }) => <li key={id}>{message}</li>)}
          </ul>
        }
      </div> : <p className="text-center">
        You have left{'  '}
        <RedTimer 
          initialEta={resendState.eta ?? eta} 
          onStop={handleStop}
        />
      </p>
    }

    <form className="grid gap-4" action={action}>
      <TextField 
        disabled={isDisable} 
        type="text" 
        name="otp"
        label="One Time Password"
        placeholder="Insert code" 
        onChange={onChange}
        minLength={1}
      />
      <Button disabled={isDisable || !isValid} variant="primary">
        {pending ? <Spinner size="sm" /> : 'Log me in'}
      </Button>
      {
        !!state?.errors?.length && <ul className="text-red-500">
          {state?.errors.map(({
            id, message
          }) => <li key={id}>{message}</li>)}
        </ul>
      }
    </form>
  </div>
}

