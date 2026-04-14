import { IconButton } from '../common/IconButton';
import type { MemoList } from '../../types';

interface ListCardProps {
  list: MemoList;
  onOpen: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export function ListCard({ list, onOpen, onRename, onDelete }: ListCardProps) {
  const total = list.items.length;
  const checked = list.items.filter((i) => i.checked).length;

  return (
    <div className="list-card" onClick={onOpen}>
      <div className="list-card-body">
        <p className="list-card-name">{list.name}</p>
        <p className="list-card-meta">
          {total === 0 ? 'アイテムなし' : `${checked} / ${total} 完了`}
        </p>
      </div>
      {total > 0 && (
        <span className="list-card-badge">{total - checked}</span>
      )}
      <div className="list-card-actions" onClick={(e) => e.stopPropagation()}>
        <IconButton onClick={onRename} label="名前を変更">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </IconButton>
        <IconButton onClick={onDelete} label="削除" variant="danger">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
          </svg>
        </IconButton>
      </div>
    </div>
  );
}
