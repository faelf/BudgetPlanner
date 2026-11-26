interface ErrorScreenProps {
  message?: string;
  title?: string;
}

export default function ErrorScreen({
  message = 'Something went wrong while loading this page.',
  title = 'Oops!',
}: ErrorScreenProps) {
  return (
    <div className='d-flex flex-column align-items-center justify-content-center min-vh-100 text-center px-3' role='alert'>
      <div className='p-3 px-12 text-center rounded mb-4'>
        <i className='bi bi-exclamation-circle' style={{ fontSize: '15vh' }}></i>
      </div>
      <h2 className='mb-2'>{title}</h2>
      <p className='text-secondary mb-4'>{message}</p>
    </div>
  );
}