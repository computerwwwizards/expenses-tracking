'use client';

import { useActionState, useCallback, useState, type ChangeEvent, type ComponentProps, type ReactNode } from "react"
import TextField from "shared-react/text-field";
import Button from "shared-react/button";
import Spinner from "shared-react/spinner";

export interface EmailOTPLogin {
  sendEmail(email: string): Promise<void>;
  EmailTextField?: typeof TextField;
}


interface FormState {
  errors?: {
    id: string;
    message: ReactNode;
  }[];
  email?: string;
}

function BasicEmailTextField({
  value: initialValue,
  onChange,
  validateEmail,
  errors: originalErrors,
  ...props
}: ComponentProps<typeof TextField> & { validateEmail?: (email: string) => { isValid: boolean; errors?: string[] } }) {
  const [value, setValue] = useState(initialValue ?? '');
  const [errors, setErrors] = useState<{ id: string, message: ReactNode }[] | undefined>();

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event
    const newEvent = event;

    newEvent.currentTarget = currentTarget;

    const { value } = currentTarget

    if (validateEmail) {
      const { isValid: isValidEmail, errors } = validateEmail(value)

      if (isValidEmail)
        setValue(value)
      else
        setErrors(errors?.map((message) => ({ id: message, message })))

    }else{
      setValue(value)
    }

    onChange?.(newEvent)
  }, [validateEmail, onChange])

  return <TextField
    {...props}
    value={value}
    onChange={handleChange}
    errors={(originalErrors ?? []).concat(errors ?? [])}
  />
}

export default function EmailOTPLogin({
  sendEmail,
  EmailTextField = BasicEmailTextField
}: EmailOTPLogin) {
  const [isEnabled, setIsEnabled] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { currentTarget } = event
    const isValid = currentTarget.ariaInvalid === 'false'
      && currentTarget.checkValidity()

    setIsEnabled(isValid);
  }


  const [state, action, isPending] = useActionState(async (_prevState: FormState | null, formData: FormData) => {
    const email = formData.get('email')?.toString()

    if (!email)
      return {
        errors: [{
          id: 'no data',
          message: 'No email was sent'
        }]
      }

    try {
      await sendEmail(email)

      return {
        email
      }
    } catch (unknownError: unknown) {
      const error = unknownError as Error;

      return {
        errors: [{
          id: error.message,
          message: error.message
        }],
        email
      }
    }

  }, null);



  return <form className={'grid gap-4'} action={action}>
    <EmailTextField
      label="Email"
      type="email"
      disabled={isPending}
      placeholder="valid.email@gmail.com"
      name="email"
      defaultValue={state?.email}
      onChange={onChange}
    />
    <Button variant="primary" disabled={isPending || !isEnabled}>
      {isPending ? <Spinner size="sm" /> : 'Send me the code'}
    </Button>
    {
      !!state?.errors?.length && <ul className="text-red-500">
        {state?.errors.map(({
          id, message
        }) => <li key={id}>{message}</li>)}
      </ul>
    }
  </form>
}