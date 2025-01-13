/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { HiEllipsisVertical } from "react-icons/hi2";

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  left: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext();

function Menus({ children }) {
  const [isOpen, setIsOpen] = useState("");
  const [position, setPosition] = useState("");

  const close = () => setIsOpen("");

  const open = setIsOpen;

  return (
    <MenusContext.Provider value={{ isOpen, open, close, position, setPosition }}>
      {children}
    </MenusContext.Provider>
  );
}

function Toggle({ id }) {
  const { open, close, isOpen, setPosition } = useContext(MenusContext);

  function handleToggle(e) {
    const { bottom, right, width } = e.target.closest("button").getBoundingClientRect();
    const xPosition = right - width;
    const yPosition = bottom + 10;

    setPosition({ x: xPosition, y: yPosition });

    if (isOpen === "" || id !== isOpen) {
      open(id);
    } else {
      close();
    }
  }

  return (
    <StyledToggle onClick={handleToggle} id={id}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
}

function Button({ children, onClick, icon }) {
  const { close } = useContext(MenusContext);

  function handleOnClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleOnClick}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

function List({ children, id }) {
  const { isOpen, close, position } = useContext(MenusContext);

  const ref = useOutsideClick(close);

  if (isOpen !== id) return null;

  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.Button = Button;
Menus.List = List;

export default Menus;
