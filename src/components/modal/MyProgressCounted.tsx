export default function MyProgressCounted() {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black opacity-20"
            
          ></div>
          <div className="absolute left-[calc(50%-(360px/2))] top-[calc(50%-(527px/2))] opacity-100">
            <p>Ваш прогресс засчитан</p>
          </div>
        </div>
      );
}