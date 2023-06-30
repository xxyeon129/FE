import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { deletePortfolio, getMyPortfolio } from '@src/apis/portfolio';
import { PortfolioDataType } from '@src/types/portfolioType';
import { PATH_URL } from '@src/constants/constants';
import * as S from '@src/style/common/commonStyles';
import NoPortfolio from '@src/components/myPortfolio/NoPortfolio';
import MyPortfolioItem from '@src/components/myPortfolio/myPortfolioItem';
import Modal from '@src/components/common/Modal';
import { ReactComponent as DeleteModalIcon } from '@src/assets/delete-post-modal-icon.svg';

const MyPortfolio = () => {
  const [myPortfolioList, setMyPortfolioList] = useState<PortfolioDataType[]>([]);
  const [isMyPortfolioExist, setIsMyPortfolioExist] = useState(false);
  const [selectedId, setSelectedId] = useState<null | number>(null);
  const [isPortfolioDeleted, setIsPortfolioDeleted] = useState<boolean>(false);
  const [isDeletePortfolioModalOpen, setIsDeletePortfolioModalOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const onClickCreatePortfolio = () => {
    navigate(PATH_URL.CREATE_PORTFOLIO);
  };

  const onClickDeletePortfolio = async (id: number) => {
    await deletePortfolio(id);
    setIsDeletePortfolioModalOpen(false);
    setIsPortfolioDeleted(!isPortfolioDeleted);
  };

  const onClickDeleteIcon = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    e.stopPropagation();
    setIsDeletePortfolioModalOpen(true);
    setSelectedId(id);
  };

  const OnCloseDeleteModal = () => {
    setIsDeletePortfolioModalOpen(false);
  };

  useEffect(() => {
    myPortfolioList.length !== 0 && setIsMyPortfolioExist(true);
  }, [myPortfolioList]);

  useEffect(() => {
    const fetchMyPortfolioData = async () => {
      const myPortfolioData = await getMyPortfolio();
      setMyPortfolioList(myPortfolioData);
    };
    fetchMyPortfolioData();
  }, [isPortfolioDeleted]);

  return (
    <S.PageContainer>
      {isMyPortfolioExist ? (
        <>
          <StMyPortfolioTopNav>
            <StMyPortfolioPageTitle>My Portfolios</StMyPortfolioPageTitle>
            <S.Button
              onClick={onClickCreatePortfolio}
              width="180px"
              fontsize="16px"
              padding="12px 10px"
              fontweight="900"
            >
              새 포트폴리오 만들기
            </S.Button>
          </StMyPortfolioTopNav>
          <StMyPortfolioContainer>
            <S.PortfolioListContainer ismyportfolio="true">
              {myPortfolioList?.map(portfolio => (
                <MyPortfolioItem
                  key={portfolio.id}
                  item={portfolio}
                  onClickDeleteIcon={onClickDeleteIcon}
                />
              ))}
            </S.PortfolioListContainer>
          </StMyPortfolioContainer>
        </>
      ) : (
        <NoPortfolio />
      )}
      {isDeletePortfolioModalOpen && (
        <Modal
          Icon={DeleteModalIcon}
          onClose={OnCloseDeleteModal}
          deletePost={onClickDeletePortfolio}
          mainText="포트폴리오를 정말 삭제할까요?"
          subText="삭제하고 나면 복구할 수 없어요."
          mainButtonText="취소"
          subButtonText="삭제하기"
          selectedId={selectedId}
          type="multiline"
        />
      )}
    </S.PageContainer>
  );
};

const StMyPortfolioTopNav = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 610px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const StMyPortfolioPageTitle = styled.h1`
  font-weight: 800;
`;

const StMyPortfolioContainer = styled.div`
  margin: 50px 0;
`;

export default MyPortfolio;
