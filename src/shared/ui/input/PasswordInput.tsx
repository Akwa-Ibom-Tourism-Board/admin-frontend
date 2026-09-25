import { forwardRef, useState } from "react";
import styled from "styled-components";
import { Eye, EyeOff } from "lucide-react";
import { Input, type InputProps } from "./Input";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.75rem;
  display: inline-flex;
  background: none;
  border: none;
  padding: 0;
  color: ${({ theme }) => theme.colors.muted.foreground};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.colors.foreground};
  }
`;

export const PasswordInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [visible, setVisible] = useState(false);

  return (
    <Wrapper>
      <Input ref={ref} type={visible ? "text" : "password"} style={{ paddingRight: "2.5rem" }} {...props} />
      <ToggleButton
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </ToggleButton>
    </Wrapper>
  );
});
PasswordInput.displayName = "PasswordInput";
