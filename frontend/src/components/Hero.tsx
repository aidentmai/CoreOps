import { Link } from "react-router-dom";
import { UserAuth } from "../Context/UserAuth";

const Hero = () => {
  const { isLoggedIn } = UserAuth();
  return (
    <div className="flex flex-col justify-center max-w-[1200px] md:h-[70vh] mx-auto py-8">
      <p className="text-3xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-purple-600  inline-block font-bold text-center">
        Welcome to CoreOps
      </p>
      <p className="mb-8 text-center">
        CoreOps is a platform that helps you manage your tasks within your team.
      </p>
      <div className="flex justify-center mt-8">
        {isLoggedIn() ? (
          <Link to="/dashboard">
            <button
              className="bg-blue-500 text-white  
                            dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
                            text-center me-2 mb-2"
            >
              Get Started
            </button>
          </Link>
        ) : (
          <Link to="/login">
            <button
              className="bg-blue-500 text-white  
                            dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 
                            text-center me-2 mb-2"
            >
              Get Started
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Hero;
