//For use with react-hook-forms simply treat it as any other input (ie pass through {...register(name, options)})
// however for use as a controlled element make sure you include the prop ref={null}
import {forwardRef, useEffect, useRef, useState} from "react";
import styled from "styled-components";
import Input from "./Input.jsx";
import {HiEye, HiEyeSlash} from "react-icons/hi2";

const PasswordInput = forwardRef(function PasswordInput(inputProps, ref) {
    const [isVisible, setIsVisible] = useState(false);
    //when using an onChange handler to set the state in the parent we are losing focus so have had to put this functionality in here, originally it was designed for use with react-hook-form
    const focusRef = useRef(null);
    const valuePW = focusRef.current?.['value'];
    useEffect(() => {
        focusRef?.current?.focus();
    }, [valuePW]);

    //visibility icon holder
    const Icon = styled.span`
    position: absolute;
    z-index: 10;
    transform: translate(-2.6rem, 0.8rem);
    cursor: pointer;
    & svg {
      width: 2.2rem;
      height: 2.2rem;
      color: var(--color-brand-600);
    }
  `;
    const InputHolder = styled.div`
    position: relative;
    width: 100%;
  `;
    return (
        <InputHolder>
            <Input
                type={isVisible ? 'text' : 'password'}
                //for auto-complete functionality
                autoComplete="current-password"
                {...inputProps}
                ref={ref || focusRef}
            ></Input>
            <Icon
                onClick={(e) => {
                    e.preventDefault();
                    setIsVisible((vis) => !vis);
                }}
            >
                {isVisible ? <HiEyeSlash /> : <HiEye />}
            </Icon>
        </InputHolder>
    );
});

export default PasswordInput;