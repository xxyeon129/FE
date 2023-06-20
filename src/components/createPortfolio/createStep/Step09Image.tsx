import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { ReactComponent as UploadIcon } from '@src/assets/upload-image-icon.svg';

import { createPortfolio } from '@src/apis/portfolio';
import { PATH_URL } from '@src/constants/constants';
import { STEP } from '@src/constants/createPortfolioConstants';
import { createPortfolioState } from '@src/states';

import useCreatPortfolioRecoilValues from '@src/Hook/useCreatePortfolioRecoilValues';
import useResetCreatePortfolioRecoilValues from '@src/Hook/useResetCreatePortfolioRecoilValues';
import * as S from '@src/style/common/createStepStyles';
import TitleTextLabel from '@src/components/common/createPortfolio/TitleTextLabel';
import NextStepButton from '@src/components/common/createPortfolio/NextStepButton';
import PrevStepButton from '@src/components/common/createPortfolio/PrevStepButton';
import useImageCompress from '@src/Hook/useImageCompress';
import useSnackbarPopup from '@src/Hook/useSnackbarPopup';
import SnackbarPopup from '@src/components/common/SnackbarPopup';

const Step09Image: React.FC<{ onPrevButtonClick: (step: string) => void }> = ({
  onPrevButtonClick,
}) => {
  const {
    portfolioTitle,
    category,
    filter,
    email,
    residence,
    location,
    telephone,
    techStackArray,
    projectIdList,
    intro,
    githubId,
    youtubeUrl,
    blogUrl,
  } = useCreatPortfolioRecoilValues();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isImageExist, setIsImageExist] = useState<boolean>(false);
  const [isLoadingCompressedImage, setIsLoadingCompressedImage] = useState<boolean>(false);
  const setIsPortfolioCreated = useSetRecoilState<boolean>(createPortfolioState);

  const navigate = useNavigate();
  const resetRecoilValues = useResetCreatePortfolioRecoilValues();
  const { isSnackbarVisible, showSnackbarPopup } = useSnackbarPopup();

  const techStack = techStackArray.toString();
  const isNoImageFile = imageFile === null;

  const onUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setImageFile(file);
      const imagePreviewUrl = URL.createObjectURL(file);
      setImagePreview(imagePreviewUrl);
    }
  };

  const handleFormData = async () => {
    const formData = new FormData();
    const inputData = {
      portfolioTitle,
      techStack,
      residence,
      location,
      telephone,
      email,
      githubId,
      intro,
      youtubeUrl,
      blogUrl,
      category,
      filter,
      projectIdList,
    };

    formData.append(
      'portfolioRequestDto',
      new Blob([JSON.stringify(inputData)], { type: 'application/json' })
    );

    setIsLoadingCompressedImage(true);
    let compressedImageFile;
    imageFile && (compressedImageFile = await useImageCompress(imageFile));
    compressedImageFile && formData.append('portfolioImage', compressedImageFile);
    return formData;
  };

  const onSubmitFormData = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isLoadingCompressedImage) return;

    const formData = await handleFormData();

    try {
      await createPortfolio(formData);
      setIsLoadingCompressedImage(false);

      const storageData = localStorage.getItem('recoil-persist');
      if (storageData) {
        const parsedData = JSON.parse(storageData);
        const leaveLoginState = { loginState: parsedData.loginState };
        localStorage.setItem('recoil-persist', JSON.stringify(leaveLoginState));
      }
      resetRecoilValues();
      setIsPortfolioCreated(true);

      navigate(PATH_URL.MAIN);
    } catch (error) {
      setIsLoadingCompressedImage(false);
      if (isNoImageFile) showSnackbarPopup();
      console.log('CreatePortfolio catch error: ', error);
    }
  };

  useEffect(() => {
    if (imagePreview.length > 0) {
      setIsImageExist(true);
      return () => URL.revokeObjectURL(imagePreview);
    } else if (imagePreview.length === 0) {
      setIsImageExist(false);
    }
  }, [imagePreview]);

  const title = '마지막 단계입니다!';
  const description = '포트폴리오 대표 이미지를 등록해주세요.';

  return (
    <S.Container>
      <S.ContentContainer>
        <TitleTextLabel title={title} description={description} />
        <StImageContainer>
          {isImageExist && (
            <StPreviewContainer>
              <StPreviewImg src={imagePreview} alt="portfolio representative image" />
              <StLabelContainer>
                <StPreviewImgLabel htmlFor="portfolioImage">이미지 변경</StPreviewImgLabel>
                <StInput
                  type="file"
                  accept="image/*"
                  id="portfolioImage"
                  onChange={onUploadImage}
                />
              </StLabelContainer>
            </StPreviewContainer>
          )}
          {!isImageExist && (
            <StNoImgContainer>
              <StLabel htmlFor="portfolioImage">
                <StUploadIcon size="35px" />
                <StUploadText>
                  이미지 파일을 선택해 포트폴리오 대표 이미지를 설정해주세요.
                </StUploadText>
              </StLabel>
              <StInput type="file" accept="image/*" id="portfolioImage" onChange={onUploadImage} />
            </StNoImgContainer>
          )}
        </StImageContainer>
      </S.ContentContainer>
      <S.ButtonContainer>
        <PrevStepButton onClick={() => onPrevButtonClick(STEP.EIGHT)} />
        <NextStepButton
          onClick={onSubmitFormData}
          text="완료"
          notAllowed={`${isNoImageFile || isLoadingCompressedImage}`}
          isLoading={isLoadingCompressedImage}
        />
      </S.ButtonContainer>
      {isSnackbarVisible && (
        <SnackbarPopup text="이미지를 추가해주세요!" isSnackbarVisible={isSnackbarVisible} />
      )}
    </S.Container>
  );
};

const StImageContainer = styled.div`
  width: 750px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StPreviewImg = styled.img`
  max-width: 100%;
  max-height: 250px;
  object-fit: contain;
`;

const StLabelContainer = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

const StPreviewImgLabel = styled.label`
  border: 1px solid;
  border-radius: 50px;
  padding: 10px 20px;
  font-weight: 800;
  cursor: pointer;
  white-space: nowrap;
`;

const StPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StLabel = styled.label`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StInput = styled.input`
  opacity: 0;
  width: 0%;
`;

const StNoImgContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 750px;
  height: 250px;
  border: 1px dashed gray;
  border-radius: 30px;

  @media ${({ theme }) => theme.size.tablet} {
    width: 100%;
  }
`;

const StUploadIcon = styled(UploadIcon)<{ size: string }>`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
`;

const StUploadText = styled.div`
  color: #949494;
  padding-top: 20px;
`;

export default Step09Image;
