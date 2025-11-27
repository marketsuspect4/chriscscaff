import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <img
            src={logo}
            alt="Chris.C Scaffolding"
            className="h-12 w-auto"
          />
        </button>
      </div>
    </header>
  );
};
