import styled from '@emotion/styled';


export const Gallery = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
`;

export const Ul = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;
`;

export const ButtonStyled = styled.button`
  padding: 8px 16px;
  min-width: 100%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 2px;
  background-color: #3f51b5;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: #fff;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2),
  0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12);

  &:hover,
  &:focus {
    background-color: #303f9f;
`;


export const LoaderDiv = styled.div`
  display: flex;
  height: 80px;
  //padding: 15px 0;
  padding-top: 15px;
  padding-bottom: 0;
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;
