import theme from '@src/style/theme';

export const CATEGORY_KEYWORD = {
  ALL: 'All',
  DEVELOP: 'Develop',
  DESIGN: 'Design',
  PHOTOGRAPHER: 'Photographer',
};

export const CATEGORY_KEYWORD_DISPLAY = {
  ALL: 'All',
  DEVELOPER: 'Developer',
  DESIGNER: 'Designer',
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

export const categoryListForDisplay: { value: string; display: string; color: string }[] = [
  { value: CATEGORY_KEYWORD.ALL, display: CATEGORY_KEYWORD_DISPLAY.ALL, color: 'white' },
  {
    value: CATEGORY_KEYWORD.DEVELOP,
    display: CATEGORY_KEYWORD_DISPLAY.DEVELOPER,
    color: theme.color.neonGreen,
  },
  {
    value: CATEGORY_KEYWORD.DESIGN,
    display: CATEGORY_KEYWORD_DISPLAY.DESIGNER,
    color: theme.color.blueGreen,
  },
  {
    value: CATEGORY_KEYWORD.PHOTOGRAPHER,
    display: CATEGORY_KEYWORD_DISPLAY.PHOTOGRAPHER,
    color: theme.color.skyBlue,
  },
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
