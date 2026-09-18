type Props = {
  question: string;
};
export const MustQuestion = (props: Props) => {

  return (
    <>
      <div className="flex bg-gray-200 h-10 w-60 items-center">
        <label className="text-left px-5 text-sm">{props.question}</label>
        <label className="text-white text-center bg-[#233B6C] rounded w-15">必須</label>
      </div>

    </>
  )
};