import type { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export interface TextFieldProps {
  label?: ReactNode;
  errors?: {id: string; message: ReactNode}[];
}


export default function TextField({
  label,
  className = '',
  errors,
  ...props
}: TextFieldProps & ComponentProps<'input'> ){
  return <div className={'grid gap-2'}>
    { label && <label className="translate-5" >
        {label}
      </label> 
    }
    <input
      aria-invalid={!!errors?.length} 
      className={twMerge("invalid:border-red-500 aria-invalid:border-red-500 disabled:cursor-not-allowed disabled:text-gray-500 disabled:bg-gray-900 disabled:border-gray-600 rounded-3xl p-4 focus-visible:outline-0 border-2 border-blue-700", className)} 
      {...props} 
    />
    {
      !!errors?.length && <ul className={"text-red-500"}>
        {
          errors?.map(({
            id,
            message
          })=><li key={id}>{message}</li>)
        }
      </ul>
    }
  </div>
}
