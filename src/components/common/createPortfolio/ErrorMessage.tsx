import { styled } from 'styled-components';
import { ReactComponent as ErrorIcon } from '@src/assets/createPortfolio/create-portfolio-error-message-icon.svg';

const ErrorMessage: React.FC<{ errorMessage: string | boolean }> = ({ errorMessage }) => {
  const isErrorMessageExist = typeof errorMessage === 'string' && errorMessage.length !== 0;

  return (
    <StErrorMessage>
      {isErrorMessageExist && (
        <StErrorIcon>
          <ErrorIcon />
        </StErrorIcon>
      )}
      <StErrorText>{errorMessage}</StErrorText>
    </StErrorMessage>
  );
};

const StErrorMessage = styled.div`
  display: flex;
  margin: 8px 0 0 5px;
`;

const StErrorIcon = styled.div`
  width: 17px;
  height: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${props => props.theme.color.errorRed};
  margin-right: 5px;

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    width: 0.9rem;
    height: 0.9rem;

    & svg {
      transition: 0.5s;
      width: 0.5rem;
      height: 0.5rem;
    }
  }
`;

const StErrorText = styled.div`
  font-size: 15px;
  color: ${props => props.theme.color.errorRed};

  @media ${({ theme }) => theme.size.mobileColumn} {
    transition: 0.5s;
    font-size: 0.8rem;
  }
`;

export default ErrorMessage;
