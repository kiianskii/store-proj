import Icons from "./icons.svg";
type PropsType = {
  id: string;
  size: number;
  className: string;
};

export const Icon: React.FC<PropsType> = ({ id, size, className }) => {
  return (
    <svg width={size} height={size} className={className}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};
