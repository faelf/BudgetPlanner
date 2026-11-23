
interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading...' }: LoadingScreenProps) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center min-vh-100' role='status' aria-live='polite' >
      <div className='mb-4'>
        <div className='spinner-border text-primary' style={{ width: '15vh', height: '15vh' }} aria-hidden='true' ></div>
      </div>

      <h3 className='mb-2'>Please wait</h3>
      { message && (<p className='text-secondary mb-0'>{message}</p>) }
    </div>
  );
}
