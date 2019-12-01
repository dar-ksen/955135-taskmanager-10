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

const Tasks = [
  {
    description: `Изучить теорию`,
    dueDate: new Date(Date.UTC(2019, 11, 10, 3, 1, 0)),
    repeatingDays: { 'mo': false, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`keks`],
    color: `yellow`,
    isFavorite: true,
    isArchive: true
  },
  {
    description: `Сделать домашку`,
    dueDate: new Date(Date.UTC(2019, 11, 1, 3, 1, 0)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `yellow`,
    isFavorite: false,
    isArchive: true
  },
  {
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': false, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `theory`, `practice`, `intensive`, `keks`],
    color: `green`,
    isFavorite: true,
    isArchive: true
  },
  {
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2019, 11, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavorite: true,
    isArchive: true
  },
  {
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2020, 1, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavorite: false,
    isArchive: true
  },
  {
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `pink`,
    isFavorite: true,
    isArchive: false
  },
  {
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `keks`],
    color: `green`,
    isFavorite: true,
    isArchive: true
  },
  {
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2019, 11, 1, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavorite: false,
    isArchive: true
  },
  {
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: DefaultRepeatingDays,
    tags: [`intensive`, `keks`],
    color: `black`,
    isFavorite: true,
    isArchive: false
  },
  {
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [],
    color: `green`,
    isFavorite: true,
    isArchive: true
  },
  {
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2019, 10, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavorite: false,
    isArchive: true
  },
];

export { Tasks };
