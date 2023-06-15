import styled from 'styled-components';

interface TodoTitleProps {
  completed: boolean;
}

export const TodoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const TodoTitle = styled.span<TodoTitleProps>`
  flex-grow: 1;
  color: ${(props) => (props.completed ? '#999999' : '#fafafa')};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  cursor: pointer;
`;

export const TodoCheckbox = styled.input`
  margin-right: 10px;
`;

export const TodoButton = styled.button`
  margin-left: 5px;
  padding: 5px 10px;
  font-size: 14px;
  border: none;
  background-color: #f2f2f2;
  color: #333333;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #e6e6e6;
  }
`;
