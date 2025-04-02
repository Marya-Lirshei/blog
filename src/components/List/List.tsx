import { IListProps } from "../../types/types";

const List: React.FC<IListProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default List;
