type Props = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
};

export const Button = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="text-black text-xs border-solid border w-72 h-16 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
    >
      {props.title}
    </button>
  );
};

export const SelectedButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="text-white bg-[#233B6C] text-xs border-solid border w-72 h-16 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      type="button"
    >
      {props.title}
    </button>
  );
};