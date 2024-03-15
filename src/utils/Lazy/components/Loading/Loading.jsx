import icon from "./icon.png";

const Loading = () => {
  return (
    <div>
      <div className="w-full h-screen flex justify-center items-center bg-opacity-70 bg-white fixed top-0 left-0 z-50">
        <div className="w-64 h-64 relative animate-spin">
          <img className="w-full h-full" src={icon} />
        </div>
      </div>
    </div>
  );
};

export default Loading;
