import { useState } from 'react';
import { ListsScreen } from './components/lists/ListsScreen';
import { ItemsScreen } from './components/items/ItemsScreen';

type Screen = { type: 'lists' } | { type: 'items'; listId: string };

export default function App() {
  const [screen, setScreen] = useState<Screen>({ type: 'lists' });

  if (screen.type === 'items') {
    return (
      <ItemsScreen
        listId={screen.listId}
        onBack={() => setScreen({ type: 'lists' })}
      />
    );
  }

  return (
    <ListsScreen
      onOpenList={(id) => setScreen({ type: 'items', listId: id })}
    />
  );
}
