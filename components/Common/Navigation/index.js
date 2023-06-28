import { StyledLink } from "../../../styles";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";

export default function Navigation() {
  const [selectedNavItem, setSelectedNavItem] = useLocalStorageState(
    "projects",
    { defaultValue: "" }
  );

  function handleNavOnClick(event) {
    event.preventDefault();
    setSelectedNavItem(event.target.innerText?.toLowerCase());
  }

  return (
    <Nav>
      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="projects"
        selectedNavItem={selectedNavItem}
      >
        <FontAwesomeIcon icon={faListCheck}>Projects</FontAwesomeIcon>
        <StyledLink href="/">Projects</StyledLink>
      </NavItem>

      <NavItem
        onClick={(event) => handleNavOnClick(event)}
        className="stocks"
        selectedNavItem={selectedNavItem}
      >
        <FontAwesomeIcon icon={faBoxArchive}> Stocks</FontAwesomeIcon>
        <StyledLink href="/stock">Stocks</StyledLink>
      </NavItem>
    </Nav>
  );
}

const Nav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-evenly;
  height: 4rem;
  font-size: 1rem;
  font-weight: 400;
  width: 100%;
  text-align: center;
  background-color: #ffffff;
  text-decoration: none;
`;
const NavItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.6rem;
  width: 50%;
  background-color: #fff;
  color: ${({ selectedNavItem, className }) =>
    selectedNavItem && className.includes(selectedNavItem)
      ? " #e07008"
      : "#000"};
`;
//