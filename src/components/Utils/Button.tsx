import React from 'react';
import { TwStyle } from 'twin.macro';
import { styled } from '../../../stitches.config';

const ButtonSt = styled('button', {});

const Button: React.FC<{
    css?: any;
    tws?: TwStyle;
    onClick: any;
    disabled?: boolean;
}> = ({ children, css, tws, onClick, disabled }) => {
    return (
        <ButtonSt onClick={onClick} disabled={disabled} css={{ ...css, ...tws }}>
            {children}
        </ButtonSt>
    );
};

export default Button;
