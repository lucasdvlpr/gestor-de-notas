const Error = ({children}) => {
    return (
      <div className='flex justify-between gap-4 text-sm bg-red-600 text-white p-2 my-5 rounded-md'>
      {children}
    </div>
    )
  }
  
  export default Error;