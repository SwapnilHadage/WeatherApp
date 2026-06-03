import { getErrorMessage } from '../data/ErrorMsgs'

function ErrorPage({error}) {
  
  const {
        message,
        code,
        status,
        statusText
      } = error
  const msg = getErrorMessage(error);

  return (
    <div className='w-screen h-scrren p-5 bg-gray-500 z-60'>
      <div className=" size-full bg-red-200  ">
        {msg}
      </div>
    </div>
  )
}

export default ErrorPage;
