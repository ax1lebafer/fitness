import ButtonLink from "../../components/ui/ButtonLink";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";

type ProfileEnterProps = {
  closeModal: () => void;
};

export default function ProfileEnter({ closeModal }: ProfileEnterProps) {
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const openProfilePage = () => {
    closeModal();
    navigate("/profile");
  };

  const onExit = () => {
    closeModal();
    logout();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-10 opacity-100">
      <div className="fixed inset-0 z-20" onClick={closeModal}></div>
      <div className="relative min-w-[343px] xl:min-w-[1160px] h-full">
        <div className="absolute top-[80px] xl:top-[100px] right-0 z-30">
          <form
            className="w-[266px] p-[30px] bg-[white] rounded-[30px] flex flex-col items-center"
            action="#"
          >
            <div className="w-[206px] h-[50px]  mb-[34px]">
              <div className="flex flex-col gap-[10px] text-center text-[18px] font-normal leading-4">
                <p className="text-[#000000]">{user?.name}</p>
                <p className="text-[#999999]">{user?.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <ButtonLink
                text="Мой профиль"
                className="mt-[0px] w-[206px]"
                onClick={openProfilePage}
              />
              <ButtonLink
                text="Выйти"
                className="mt-[0px] w-[206px] bg-transparent border border-black hover:bg-[#F7F7F7] hover:text-black active:bg-[#E9ECED] active:text-black"
                onClick={onExit}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
