export type AddRemovProps = {
  mess: string;
}

export default function AddingDone(messageProc: AddRemovProps) {
  const trueMess = Object.values(messageProc);

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-20 z-100">
      <div className="fixed top-[20px] left-[calc(50%-(343px/2))] lg:top-[30px] lg:left-[calc(50%-(426px/2))]">
        <div className="flex flex-row gap-[20px] content-center bg-white w-[343px] p-[20px] lg:w-auto lg:p-10 rounded-[30px] shadow-def text-center">
          <img
            src="/img/icons/success.svg"
            alt="Курс добавлен"
            width={32}
            height={32}
          ></img>
          <h3 className="font-skyeng text-[24px] text-black">
            {trueMess[0]}
          </h3>
        </div>
      </div>
    </div>
  );
}
