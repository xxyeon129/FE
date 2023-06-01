export interface PortfolioDataType {
  id: number;
  portfolioTitle: string;
  portfolioImage: string;
  userProfileImage: string;
  userName: string;
}

export interface CreatePortfolioStepProps {
  onNextButtonClick: (step: string) => void;
}
