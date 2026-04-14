export interface MemoItem {
  id: string;
  text: string;
  checked: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface MemoList {
  id: string;
  name: string;
  items: MemoItem[];
  createdAt: number;
  updatedAt: number;
}

export type ModalState =
  | { type: 'none' }
  | { type: 'createList' }
  | { type: 'renameList'; listId: string }
  | { type: 'createItem'; listId: string }
  | { type: 'editItem'; listId: string; itemId: string }
  | { type: 'confirmDeleteList'; listId: string }
  | { type: 'confirmDeleteItem'; listId: string; itemId: string };
