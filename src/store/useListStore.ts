import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { MemoList, MemoItem } from '../types';

interface ListStore {
  lists: MemoList[];
  createList: (name: string) => string;
  renameList: (id: string, name: string) => void;
  deleteList: (id: string) => void;
  addItem: (listId: string, text: string) => void;
  updateItem: (listId: string, itemId: string, text: string) => void;
  toggleItem: (listId: string, itemId: string) => void;
  deleteItem: (listId: string, itemId: string) => void;
  clearCheckedItems: (listId: string) => void;
  getList: (id: string) => MemoList | undefined;
}

export const useListStore = create<ListStore>()(
  persist(
    (set, get) => ({
      lists: [],

      createList: (name) => {
        const id = nanoid();
        const now = Date.now();
        set((state) => ({
          lists: [
            ...state.lists,
            { id, name: name.trim(), items: [], createdAt: now, updatedAt: now },
          ],
        }));
        return id;
      },

      renameList: (id, name) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === id ? { ...list, name: name.trim(), updatedAt: Date.now() } : list
          ),
        }));
      },

      deleteList: (id) => {
        set((state) => ({
          lists: state.lists.filter((list) => list.id !== id),
        }));
      },

      addItem: (listId, text) => {
        const now = Date.now();
        const newItem: MemoItem = {
          id: nanoid(),
          text: text.trim(),
          checked: false,
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? { ...list, items: [...list.items, newItem], updatedAt: now }
              : list
          ),
        }));
      },

      updateItem: (listId, itemId, text) => {
        const now = Date.now();
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId ? { ...item, text: text.trim(), updatedAt: now } : item
                  ),
                  updatedAt: now,
                }
              : list
          ),
        }));
      },

      toggleItem: (listId, itemId) => {
        const now = Date.now();
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.map((item) =>
                    item.id === itemId
                      ? { ...item, checked: !item.checked, updatedAt: now }
                      : item
                  ),
                  updatedAt: now,
                }
              : list
          ),
        }));
      },

      deleteItem: (listId, itemId) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => item.id !== itemId),
                  updatedAt: Date.now(),
                }
              : list
          ),
        }));
      },

      clearCheckedItems: (listId) => {
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  items: list.items.filter((item) => !item.checked),
                  updatedAt: Date.now(),
                }
              : list
          ),
        }));
      },

      getList: (id) => get().lists.find((list) => list.id === id),
    }),
    {
      name: 'memo-list-store',
      version: 1,
    }
  )
);
