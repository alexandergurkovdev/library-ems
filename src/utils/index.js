export const validateEmail = (value) => {
  let error;
  if (!value) {
    error = 'Поле email обязательно';
  } else if (!/^[a-z0-9](\.?[a-z0-9]){5,}@(emailsoldiers|creativesoldiers|leadplan)\.(ru|com)$/g.test(value)) {
    error = 'Только для доменов @emailsoldiers, @creativesoldiers, @leadplan';
  }
  return error;
};

export const booksFilter = [
  {
    value: 'all',
    label: 'Все книги'
  },
  {
    value: 'sales',
    label: 'Чтобы легко продавать'
  },
  {
    value: 'work-fast',
    label: 'Чтобы всё успевать'
  },
  {
    value: 'personal-growth',
    label: 'Личностный рост'
  },
  {
    value: 'people-managment',
    label: 'Управление людьми'
  },
  {
    value: 'projects-managment',
    label: 'Управление проектами'
  },
  {
    value: 'marketing',
    label: 'Про маркетинг'
  },
  {
    value: 'dev',
    label: 'Про разработку'
  },
  {
    value: 'analitycs',
    label: 'Про аналитику'
  },
  {
    value: 'design',
    label: 'Про дизайн'
  },
  {
    value: 'art',
    label: 'Про искусство'
  },
  {
    value: 'talking',
    label: 'Чтобы уметь договариваться'
  },
  {
    value: 'busines',
    label: 'Про бизнес'
  },
  {
    value: 'conflicts',
    label: 'Чтобы управлять конфликтами'
  },
  {
    value: 'mentors',
    label: 'Быть хорошим наставником'
  },
  {
    value: 'fiction',
    label: 'Художественная литература'
  }
];

export const bookRating = [
  {
    value: '1',
    label: '1'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
];

export const getRatingPercents = (value) => Math.floor(value) * 100 / 5;
