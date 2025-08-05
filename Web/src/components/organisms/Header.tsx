import { useState } from "react";
import Divider from "../atoms/Divider";
import HamburgerIcon from "../atoms/icons/HamburguerIcon";
import Dropdown from "../molecules/Dropdown";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import Button from "../atoms/Button";
import ArrowLeftIcon from "../atoms/icons/ArrowLeftIcon";
import Tooltip from "../molecules/Tooltip";

export interface HeaderProps {
  loggedIn: boolean;
}

export default function Header({ loggedIn }: HeaderProps) {
  const { logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const logoutAndRedirect = () => {
    logout();
    navigate("/");
  };

  const itens = loggedIn
    ? [
        { label: "My Assistants", onClick: () => navigate("/chatbot/list") },
        {
          label: "My Profile",
          onClick: () => {
            console.log("naviget to me ");
            navigate("/me");
          },
        },
        { label: "LogOut", onClick: () => logoutAndRedirect() },
      ]
    : [
        {
          label: "Sign Up",
          onClick: () => {
            console.log("naviget to me ");
            navigate("/signup");
          },
        },
        { label: "Login", onClick: () => navigate("/login") },
      ];
  return (
    <header className=" ">
      <div className="bg-white rounded-md   mb-1.5 p-1">
        <div
          className="flex  justify-between gap-1  "
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <Dropdown
            items={itens}
            label={<HamburgerIcon isOpen={isDropdownOpen} />}
          />
          <Tooltip content="Go Back" position="left">
            <Button className="bg-white" onClick={() => history.back()}>
              <ArrowLeftIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Divider />
    </header>
  );
}
