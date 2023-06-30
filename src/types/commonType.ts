export interface fadeInAnimationType {
  ref: React.RefObject<HTMLDivElement>;
  style: {
    opacity: number;
    transform: string | undefined;
  };
}
