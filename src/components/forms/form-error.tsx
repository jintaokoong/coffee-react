import React from 'react';

const inlineStyles = {
  color: 'red',
  fontSize: '0.75rem',
}

export const FormError: React.FC = (props) => (
  <p style={inlineStyles}>
    {props.children}
  </p>
)