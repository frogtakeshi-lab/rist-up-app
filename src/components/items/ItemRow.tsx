import { IconButton } from '../common/IconButton';
import type { MemoItem } from '../../types';

interface ItemRowProps {
  item: MemoItem;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function ItemRow({ item, onToggle, onEdit, onDelete }: ItemRowProps) {
  return (
    <div className={`item-row${item.checked ? ' checked' : ''}`}>
      <button className="item-checkbox" onClick={onToggle} aria-label={item.checked ? 'チェックを外す' : 'チェック'}>
        {item.checked ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
          </svg>
        )}
      </button>
      <div className="item-text-wrap" onClick={onEdit}>
        <p className={`item-text${item.checked ? ' checked' : ''}`}>{item.text}</p>
      </div>
      <IconButton onClick={(e) => { e.stopPropagation(); onDelete(); }} label="削除" variant="danger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
        </svg>
      </IconButton>
    </div>
  );
}
