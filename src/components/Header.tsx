import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
`;

const Header: React.FC = () => {
  return (
    <StyledHeader>
      <Title>Todo App</Title>
    </StyledHeader>
  );
};

export default Header;

// import React from 'react';

// function Header() {
//   return (
//     <header>
//       <h1>Todo List</h1>
//     </header>
//   );
// }

// export default Header;
