import { styled } from 'styled-components';
import { IoMdCloseCircle } from 'react-icons/io';

const ErrorMessage: React.FC<{ errorMessage: string | boolean }> = ({ errorMessage }) => {
  const isErrorMessageExist = typeof errorMessage === 'string' && errorMessage.length !== 0;

  return (
    <StErrorMessage>
      {isErrorMessageExist && <StErrorIcon />}
      <StErrorText>{errorMessage}</StErrorText>
    </StErrorMessage>
  );
};

const StErrorMessage = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 0 5px;
`;

const StErrorIcon = styled(IoMdCloseCircle)`
  font-size: 15px;
  color: red;
  margin-right: 3px;
`;

const StErrorText = styled.div`
  font-size: 15px;
  color: red;
`;

export default ErrorMessage;
