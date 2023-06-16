import { Button, ModalStyle } from '@src/style/common/commonStyles';

interface ModalProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  mainText: string;
  subText?: string;
  mainButtonText: string;
  subButtonText?: string;
  deletePost: (id: number) => Promise<void>;
  onClose: () => void;
  selectedId: number | null;
}

const Modal = ({
  Icon,
  mainText,
  subText,
  mainButtonText,
  subButtonText,
  deletePost,
  onClose,
  selectedId,
}: ModalProps) => {
  const keepModalOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalStyle.Background onClick={onClose}>
      <ModalStyle.Container onClick={keepModalOpen}>
        <ModalStyle.Content>
          <Icon />
          <ModalStyle.TextWrapper>
            <ModalStyle.MainText>{mainText}</ModalStyle.MainText>
            {subText && <ModalStyle.SubText>{subText}</ModalStyle.SubText>}
          </ModalStyle.TextWrapper>
        </ModalStyle.Content>
        <ModalStyle.ButtonWrapper>
          {subButtonText && (
            <Button
              onClick={() => selectedId !== null && deletePost(selectedId)}
              width="140px"
              fontsize="20px"
              padding="12px 0"
              color="lightgray"
              hovercolor="none"
            >
              {subButtonText}
            </Button>
          )}
          <Button onClick={onClose} width="140px" fontsize="20px" padding="12px 0">
            {mainButtonText}
          </Button>
        </ModalStyle.ButtonWrapper>
      </ModalStyle.Container>
    </ModalStyle.Background>
  );
};

export default Modal;
