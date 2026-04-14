import { useEffect, useRef, useState } from 'react';
import { Modal } from '../common/Modal';

interface ListFormModalProps {
  initialName?: string;
  onSubmit: (name: string) => void;
  onClose: () => void;
  title: string;
}

export function ListFormModal({ initialName = '', onSubmit, onClose, title }: ListFormModalProps) {
  const [name, setName] = useState(initialName);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name.trim());
    onClose();
  };

  return (
    <Modal onClose={onClose} title={title}>
      <div className="modal-form">
        <input
          ref={inputRef}
          className="text-input"
          type="text"
          placeholder="リスト名を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          maxLength={50}
        />
        <div className="modal-form-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            キャンセル
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!name.trim()}>
            {initialName ? '変更' : '作成'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
