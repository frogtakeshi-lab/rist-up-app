interface IconButtonProps {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  variant?: 'default' | 'danger';
  children: React.ReactNode;
}

export function IconButton({ onClick, label, variant = 'default', children }: IconButtonProps) {
  return (
    <button
      className={`icon-btn${variant === 'danger' ? ' danger' : ''}`}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}
