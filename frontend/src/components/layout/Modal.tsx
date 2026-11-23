import type { ReactNode } from 'react';

interface ModalProps {
  id: string;
  theme: string;
  buttonLabel: ReactNode;
  title: string;
  message: string;
  footer: ReactNode;
}

export default function Modal({ id, theme, buttonLabel, title, message, footer }: ModalProps) {
  return (
    <>
      <button
        type='button'
        className={`btn-outline theme-${theme}`}
        data-bs-toggle='dialog'
        data-bs-target={`#${id}`}
        data-bs-backdrop='static'
      >
        {buttonLabel}
      </button>

      <dialog className='dialog dialog-slide-down' id={id}>
        <div className='dialog-header'>
          <h1 className='dialog-title'>{title}</h1>
          <button type='button' className='btn-close' data-bs-dismiss='dialog' aria-label='Close'></button>
        </div>
        <div className='dialog-body'>
          <p>{message}</p>
        </div>
        <div className='dialog-footer'>
          <button type='button' className='theme-secondary btn-outline' data-bs-dismiss='dialog'>
            Cancel
          </button>
          {footer}
        </div>
      </dialog>
    </>
  );
}