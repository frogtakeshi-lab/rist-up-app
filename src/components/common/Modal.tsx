import { useEffect, useRef, useState } from 'react';

interface ModalProps {
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Modal({ onClose, title, children }: ModalProps) {
  const [closing, setClosing] = useState(false);
  const startedClosing = useRef(false);

  const handleClose = () => {
    if (startedClosing.current) return;
    startedClosing.current = true;
    setClosing(true);
    setTimeout(onClose, 280);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <>
      <div
        className={`modal-backdrop${closing ? ' closing' : ''}`}
        onClick={handleClose}
      />
      <div className={`modal-sheet${closing ? ' closing' : ''}`}>
        <div className="modal-handle" />
        {title && <p className="modal-title">{title}</p>}
        {children}
      </div>
    </>
  );
}
