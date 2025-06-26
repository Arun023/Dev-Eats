import { cn } from '../../../utils';

function Skeleton({ className }) {
  return <div className={cn('animate-pulse rounded-md', className)} />;
}

export { Skeleton };
