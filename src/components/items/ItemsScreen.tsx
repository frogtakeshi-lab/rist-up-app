import { useState } from 'react';
import { useListStore } from '../../store/useListStore';
import { AppShell } from '../layout/AppShell';
import { Header } from '../layout/Header';
import { IconButton } from '../common/IconButton';
import { FAB } from '../common/FAB';
import { EmptyState } from '../common/EmptyState';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ItemRow } from './ItemRow';
import { ItemFormModal } from './ItemFormModal';

interface ItemsScreenProps {
  listId: string;
  onBack: () => void;
}

type Modal =
  | { type: 'none' }
  | { type: 'addItem' }
  | { type: 'editItem'; itemId: string; currentText: string }
  | { type: 'confirmDelete'; itemId: string; itemText: string }
  | { type: 'confirmClearChecked' };

export function ItemsScreen({ listId, onBack }: ItemsScreenProps) {
  const list = useListStore((s) => s.lists.find((l) => l.id === listId));
  const addItem = useListStore((s) => s.addItem);
  const updateItem = useListStore((s) => s.updateItem);
  const toggleItem = useListStore((s) => s.toggleItem);
  const deleteItem = useListStore((s) => s.deleteItem);
  const clearCheckedItems = useListStore((s) => s.clearCheckedItems);

  const [modal, setModal] = useState<Modal>({ type: 'none' });

  if (!list) return null;

  const unchecked = list.items.filter((i) => !i.checked);
  const checked = list.items.filter((i) => i.checked);
  const hasChecked = checked.length > 0;

  return (
    <>
      <AppShell
        header={
          <Header
            title={list.name}
            left={
              <IconButton onClick={onBack} label="戻る">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </IconButton>
            }
            right={
              hasChecked ? (
                <IconButton onClick={() => setModal({ type: 'confirmClearChecked' })} label="チェック済みを削除">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </IconButton>
              ) : undefined
            }
          />
        }
      >
        {list.items.length === 0 ? (
          <EmptyState
            icon="✅"
            title="アイテムがありません"
            description="右下の ＋ ボタンからアイテムを追加しましょう"
          />
        ) : (
          <div className="items-list">
            {unchecked.length > 0 && (
              <>
                {unchecked.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onToggle={() => toggleItem(listId, item.id)}
                    onEdit={() => setModal({ type: 'editItem', itemId: item.id, currentText: item.text })}
                    onDelete={() => setModal({ type: 'confirmDelete', itemId: item.id, itemText: item.text })}
                  />
                ))}
              </>
            )}
            {checked.length > 0 && (
              <>
                <p className="items-section-label">完了 ({checked.length})</p>
                {checked.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onToggle={() => toggleItem(listId, item.id)}
                    onEdit={() => setModal({ type: 'editItem', itemId: item.id, currentText: item.text })}
                    onDelete={() => setModal({ type: 'confirmDelete', itemId: item.id, itemText: item.text })}
                  />
                ))}
              </>
            )}
          </div>
        )}
        <FAB onClick={() => setModal({ type: 'addItem' })} label="アイテムを追加" />
      </AppShell>

      {modal.type === 'addItem' && (
        <ItemFormModal
          title="アイテムを追加"
          onSubmit={(text) => addItem(listId, text)}
          onClose={() => setModal({ type: 'none' })}
          keepOpen
        />
      )}

      {modal.type === 'editItem' && (
        <ItemFormModal
          title="アイテムを編集"
          initialText={modal.currentText}
          onSubmit={(text) => updateItem(listId, modal.itemId, text)}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'confirmDelete' && (
        <ConfirmDialog
          title="アイテムを削除"
          message={`「${modal.itemText}」を削除しますか？`}
          onConfirm={() => {
            deleteItem(listId, modal.itemId);
            setModal({ type: 'none' });
          }}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'confirmClearChecked' && (
        <ConfirmDialog
          title="チェック済みを削除"
          message={`完了した ${checked.length} 件のアイテムをすべて削除しますか？`}
          onConfirm={() => {
            clearCheckedItems(listId);
            setModal({ type: 'none' });
          }}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}
    </>
  );
}
