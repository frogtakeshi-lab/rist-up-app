import { useState } from 'react';
import { useListStore } from '../../store/useListStore';
import { AppShell } from '../layout/AppShell';
import { Header } from '../layout/Header';
import { FAB } from '../common/FAB';
import { EmptyState } from '../common/EmptyState';
import { ConfirmDialog } from '../common/ConfirmDialog';
import { ListCard } from './ListCard';
import { ListFormModal } from './ListFormModal';

interface ListsScreenProps {
  onOpenList: (id: string) => void;
}

type Modal =
  | { type: 'none' }
  | { type: 'create' }
  | { type: 'rename'; listId: string; currentName: string }
  | { type: 'confirmDelete'; listId: string; listName: string };

export function ListsScreen({ onOpenList }: ListsScreenProps) {
  const lists = useListStore((s) => s.lists);
  const createList = useListStore((s) => s.createList);
  const renameList = useListStore((s) => s.renameList);
  const deleteList = useListStore((s) => s.deleteList);

  const [modal, setModal] = useState<Modal>({ type: 'none' });

  return (
    <>
      <AppShell
        header={<Header title="リスト" />}
      >
        {lists.length === 0 ? (
          <EmptyState
            icon="📝"
            title="リストがありません"
            description="右下の ＋ ボタンから新しいリストを作成しましょう"
          />
        ) : (
          <div className="screen-content">
            <div className="lists-grid">
              {lists.map((list) => (
                <ListCard
                  key={list.id}
                  list={list}
                  onOpen={() => onOpenList(list.id)}
                  onRename={() => setModal({ type: 'rename', listId: list.id, currentName: list.name })}
                  onDelete={() => setModal({ type: 'confirmDelete', listId: list.id, listName: list.name })}
                />
              ))}
            </div>
          </div>
        )}
        <FAB onClick={() => setModal({ type: 'create' })} label="リストを作成" />
      </AppShell>

      {modal.type === 'create' && (
        <ListFormModal
          title="新しいリスト"
          onSubmit={(name) => {
            const id = createList(name);
            onOpenList(id);
          }}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'rename' && (
        <ListFormModal
          title="リスト名を変更"
          initialName={modal.currentName}
          onSubmit={(name) => renameList(modal.listId, name)}
          onClose={() => setModal({ type: 'none' })}
        />
      )}

      {modal.type === 'confirmDelete' && (
        <ConfirmDialog
          title="リストを削除"
          message={`「${modal.listName}」を削除しますか？中のアイテムもすべて削除されます。`}
          onConfirm={() => {
            deleteList(modal.listId);
            setModal({ type: 'none' });
          }}
          onCancel={() => setModal({ type: 'none' })}
        />
      )}
    </>
  );
}
