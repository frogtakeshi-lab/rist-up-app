import { useEffect, useRef, useState } from 'react';
import { Modal } from '../common/Modal';

interface ItemFormModalProps {
  initialText?: string;
  onSubmit: (text: string) => void;
  onClose: () => void;
  title: string;
  keepOpen?: boolean;
}

export function ItemFormModal({ initialText = '', onSubmit, onClose, title, keepOpen }: ItemFormModalProps) {
  const [text, setText] = useState(initialText);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text.trim());
    if (keepOpen) {
      setText('');
      inputRef.current?.focus();
    } else {
      onClose();
    }
  };

  return (
    <Modal onClose={onClose} title={title}>
      <div className="modal-form">
        <input
          ref={inputRef}
          className="text-input"
          type="text"
          placeholder="アイテムを入力"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          maxLength={200}
        />
        <div className="modal-form-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            {keepOpen ? '完了' : 'キャンセル'}
          </button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={!text.trim()}>
            {initialText ? '変更' : '追加'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
