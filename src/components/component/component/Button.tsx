type Props = {
  title: string;
  onClick: () => void;
};
export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="text-black text-xs border-solid border w-72 h-16 cursor-pointer"
      type="button"
    >{props.title}
    </button>
  );
};

export const SelectedButton = (props: Props) => {
  return (
    <button onClick={props.onClick}
      className="text-white bg-[#233B6C] text-xs border-solid border w-72 h-16 cursor-pointer"
      type="button"
    >{props.title}
    </button>
  );
};