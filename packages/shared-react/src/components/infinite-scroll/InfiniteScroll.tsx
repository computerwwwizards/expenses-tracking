import { memo, Suspense, use, useCallback, useRef, useState } from "react"

function SuspendedResponse({ promise }: { promise: Promise<string[]> }) {
  const resolvedPromise = use(promise);
  console.log('suspewnded', resolvedPromise)

  return resolvedPromise.map((string)=><p key={string}>{string}</p>)
}


const SuspendedResponseM = memo(SuspendedResponse)

function wait(time = 2000){
  return new Promise((res)=>{
    setTimeout(res, time)
  })  
}

async function fakeFetchData(base: string){
  await wait();
  return ['1', '2', '3', '4', '5', '6', '7'].map(number=>base + number)
}

export default function InfiniteScroll() {
  const [promises, setPromises] = useState<Promise<string[]>[]>([]);
  const ref = useRef(1);
  console.log('asdas')

  const handleClick = useCallback(async ()=>{
    const data = fakeFetchData(ref.current.toString())
    ref.current++
  
    setPromises(prev=>[...prev, data])
  }, [])

  return <div>
    {
      promises?.map((promise, index) => <Suspense key={`infite-scrol-${index}`} fallback={"Loading"} >
        <SuspendedResponseM
          promise={promise}
        />
      </Suspense>
      )
    }
    <button onClick={handleClick} >Load more</button>
  </div>
}