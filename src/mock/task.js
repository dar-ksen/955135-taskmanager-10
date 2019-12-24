/* tags: [`homework`, `theory`, `practice`, `intensive`, `keks`] */

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const tasks = [
  {
    id: `0001`,
    description: `Изучить теорию`,
    dueDate: new Date(Date.UTC(2019, 11, 10, 3, 1, 0)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`keks`],
    color: `yellow`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0002`,
    description: `Сделать домашку`,
    dueDate: new Date(Date.UTC(2019, 11, 1, 3, 1, 0)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `yellow`,
    isFavored: false,
    isArchived: false
  },
  {
    id: `0003`,
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': false, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `theory`, `practice`, `intensive`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0004`,
    description: `Изучить теорию`,
    dueDate: new Date(Date.UTC(2020, 2, 3, 5, 16, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `theory`, `practice`, `intensive`, `keks`],
    color: `black`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0005`,
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2019, 11, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0006`,
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2020, 1, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: false,
    isArchived: true
  },
  {
    id: `0007`,
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `pink`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0008`,
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0009`,
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': true, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0010`,
    description: `Сделать домашку`,
    dueDate: new Date(Date.UTC(2020, 0, 1, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0011`,
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2020, 2, 1, 5, 16, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: false,
    isArchived: true
  },
  {
    id: `0012`,
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: DefaultRepeatingDays,
    tags: [],
    color: `black`,
    isFavored: true,
    isArchived: false
  },
  {
    id: `0013`,
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [],
    color: `green`,
    isFavored: true,
    isArchived: true
  },
  {
    id: `0014`,
    description: `Сделать сегодня`,
    dueDate: new Date(),
    repeatingDays: DefaultRepeatingDays,
    tags: [],
    color: `blue`,
    isFavored: false,
    isArchived: false
  },
];

export { tasks };
