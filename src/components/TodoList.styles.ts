import styled from 'styled-components';

export const TodoListContainer = styled.div`
  max-width: 56%;
  margin: 0 auto;
  color: #ffffff;
  font-size: 20px;
  line-height: 30px;
  padding-top: 1%;
  text-align: left;
`;


export const TodoItem = styled.div`
  /* Стили для общего контейнера задачи */
`;

export const TodoCheckbox = styled.input`
  /* Стили для чекбокса */
`;

export const TodoTitle = styled.div<{ completed: boolean }>`
  /* Стили для заголовка задачи */
`;

export const TodoButton = styled.button`
  /* Стили для кнопок */
`;

export const InputField = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
`;