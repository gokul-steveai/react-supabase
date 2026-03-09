interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ name, size = 'md' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg',
  };

  return (
    <div className={`${sizes[size]} bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0`}>
      {name[0]?.toUpperCase() || 'U'}
    </div>
  );
}
