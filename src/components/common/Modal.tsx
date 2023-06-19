import { Button, ModalStyle } from '@src/style/common/commonStyles';

interface ModalProps {
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
  mainText: string;
  subText?: string;
  mainButtonText: string;
  subButtonText?: string;
  deletePost?: (id: number) => Promise<void>;
  onClose: () => void;
  selectedId?: number | null;
  type?: string;
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
  type,
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
            <ModalStyle.MainText type={type}>{mainText}</ModalStyle.MainText>
            {subText && <ModalStyle.SubText>{subText}</ModalStyle.SubText>}
          </ModalStyle.TextWrapper>
        </ModalStyle.Content>
        <ModalStyle.ButtonWrapper>
          {subButtonText && (
            <Button
              onClick={() => deletePost && selectedId && deletePost(selectedId)}
              width="140px"
              fontsize="20px"
              padding="12px 0"
              color="lightgray"
              hovercolor="none"
              responsivewidth="100px"
              responsivefontsize="16px"
            >
              {subButtonText}
            </Button>
          )}
          <Button
            onClick={onClose}
            width="140px"
            fontsize="20px"
            padding="12px 0"
            responsivewidth="100px"
            responsivefontsize="16px"
          >
            {mainButtonText}
          </Button>
        </ModalStyle.ButtonWrapper>
      </ModalStyle.Container>
    </ModalStyle.Background>
  );
};

export default Modal;
