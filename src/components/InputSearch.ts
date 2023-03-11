import styled from 'styled-components';

export const InputSearch = styled.input`
  width: 32rem;
  height: 3rem;
  border-radius: 0.5rem;
  padding: 0 1rem;
  outline: none;
  transition: all 0.3s ease-in;

  @media screen and (max-width: 480px) {
    width: 100% !important;
  }
`;
