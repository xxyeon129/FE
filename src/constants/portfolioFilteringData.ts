import { ReactComponent as AllIcon } from '@src/assets/nav/category/nav-category-all-icon.svg';
import { ReactComponent as DevelopIcon } from '@src/assets/nav/category/nav-category-develop-icon.svg';
import { ReactComponent as DesignIcon } from '@src/assets/nav/category/nav-category-design-icon.svg';
import { ReactComponent as PhotographIcon } from '@src/assets/nav/category/nav-category-photographer-icon.svg';

export const CATEGORY_KEYWORD = {
  ALL: 'All',
  DEVELOP: 'Develop',
  DESIGN: 'Design',
  PHOTOGRAPHER: 'Photographer',
};

export const FILTER_KEYWORD = {
  ALL: 'All',
  DEVELOP: {
    BACKEND: 'Backend',
    FRONTEND: 'Frontend',
    AI: 'AI',
    BIG_DATA: 'Big Data',
    APP: 'App',
    SYSTEM: 'System',
    SECURITY: 'Security',
  },
  DESIGN: {
    GRAPHIC: 'Graphic',
    UIUX: 'UI/UX',
    WEB: 'Web',
    VISUAL: 'Visual',
    INTERACTION: 'Interaction',
    PRODUCT: 'Product',
    BRAND: 'Brand',
  },
  PHOTOGRAPH: {
    COMMERCIAL: 'Commercial',
    PORTRAIT: 'Portrait',
    WEDDING: 'Wedding',
    FASHION: 'Fashion',
    WILDLIFE: 'Wildlife',
    SPORTS: 'Sports',
  },
};

export const categoryList = [
  CATEGORY_KEYWORD.ALL,
  CATEGORY_KEYWORD.DEVELOP,
  CATEGORY_KEYWORD.DESIGN,
  CATEGORY_KEYWORD.PHOTOGRAPHER,
];

export const categoryListWithIcon: { value: string; icon: React.ComponentType }[] = [
  { value: CATEGORY_KEYWORD.ALL, icon: AllIcon },
  { value: CATEGORY_KEYWORD.DEVELOP, icon: DevelopIcon },
  { value: CATEGORY_KEYWORD.DESIGN, icon: DesignIcon },
  { value: CATEGORY_KEYWORD.PHOTOGRAPHER, icon: PhotographIcon },
];

export const filterListObject = {
  all: [],
  develop: [
    FILTER_KEYWORD.ALL,
    FILTER_KEYWORD.DEVELOP.BACKEND,
    FILTER_KEYWORD.DEVELOP.FRONTEND,
    FILTER_KEYWORD.DEVELOP.AI,
    FILTER_KEYWORD.DEVELOP.BIG_DATA,
    FILTER_KEYWORD.DEVELOP.APP,
    FILTER_KEYWORD.DEVELOP.SYSTEM,
    FILTER_KEYWORD.DEVELOP.SECURITY,
  ],
  design: [
    FILTER_KEYWORD.ALL,
    FILTER_KEYWORD.DESIGN.GRAPHIC,
    FILTER_KEYWORD.DESIGN.UIUX,
    FILTER_KEYWORD.DESIGN.WEB,
    FILTER_KEYWORD.DESIGN.VISUAL,
    FILTER_KEYWORD.DESIGN.INTERACTION,
    FILTER_KEYWORD.DESIGN.PRODUCT,
    FILTER_KEYWORD.DESIGN.BRAND,
  ],
  photograph: [
    FILTER_KEYWORD.ALL,
    FILTER_KEYWORD.PHOTOGRAPH.COMMERCIAL,
    FILTER_KEYWORD.PHOTOGRAPH.PORTRAIT,
    FILTER_KEYWORD.PHOTOGRAPH.WEDDING,
    FILTER_KEYWORD.PHOTOGRAPH.FASHION,
    FILTER_KEYWORD.PHOTOGRAPH.WILDLIFE,
    FILTER_KEYWORD.PHOTOGRAPH.SPORTS,
  ],
};
