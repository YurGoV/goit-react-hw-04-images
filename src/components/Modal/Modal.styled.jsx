import styled from '@emotion/styled';

export const Backdrop = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled.div`
  display: flex;
  opacity: ${props => props.opacityValue === 0 ? 0 : 1};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 1200px;
  width: 75%;
  padding: 1px;
  background-color: white;
  border: 1px solid #3f51b5;
  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
  0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);
  transition: opacity 0.8s;
`;
