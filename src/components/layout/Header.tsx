interface HeaderProps {
  title: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

export function Header({ title, left, right }: HeaderProps) {
  return (
    <header className="header">
      {left}
      <h1 className="header-title">{title}</h1>
      {right}
    </header>
  );
}
