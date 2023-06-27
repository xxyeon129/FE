export interface PortfolioDataType {
  id: number;
  portfolioTitle: string;
  portfolioImage: string;
  userProfileImage: string;
  userName: string;
  views: number;
}

export interface CreatePortfolioStepProps {
  onNextButtonClick: (step: string) => void;
  onPrevButtonClick: (step: string) => void;
}

export interface ProjectDataType {
  id: number;
  title: string;
  term: string;
  people: string;
  position: string;
  projectImageList: { id: number; imageUrl: string }[];
  description: string;
}
