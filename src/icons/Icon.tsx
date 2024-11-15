import Icons from "./icons.svg";
type PropsType = {
  id: string;
  size: number;
};

export const Icon: React.FC<PropsType> = ({ id, size }) => {
  return (
    <svg width={size} height={size}>
      <use href={Icons + "#icon-" + id}></use>
    </svg>
  );
};
