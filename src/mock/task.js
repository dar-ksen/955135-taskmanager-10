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
    id: String(new Date() + Math.random()),
    description: `Изучить теорию`,
    dueDate: new Date(Date.UTC(2019, 11, 10, 3, 1, 0)),
    repeatingDays: { 'mo': false, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`keks`],
    color: `yellow`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Сделать домашку`,
    dueDate: new Date(Date.UTC(2019, 11, 1, 3, 1, 0)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `yellow`,
    isFavored: false,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': false, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `theory`, `practice`, `intensive`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Изучить теорию`,
    dueDate: new Date(Date.UTC(2020, 2, 3, 5, 16, 15)),
    repeatingDays: { 'mo': false, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `theory`, `practice`, `intensive`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2019, 11, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2020, 1, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: false,
    isArchived: true
  },
  {
    id: String(new Date() + Math.random()),
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `pink`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': true, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Сделать домашку`,
    dueDate: new Date(Date.UTC(2020, 0, 1, 5, 45, 15)),
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': true, 'fr': false, 'sa': false, 'su': false },
    tags: [`homework`, `keks`],
    color: `green`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2020, 2, 1, 5, 16, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: false,
    isArchived: true
  },
  {
    id: String(new Date() + Math.random()),
    description: `Сделать домашку`,
    dueDate: null,
    repeatingDays: DefaultRepeatingDays,
    tags: [`intensive`, `keks`],
    color: `black`,
    isFavored: true,
    isArchived: false
  },
  {
    id: String(new Date() + Math.random()),
    description: `Изучить теорию`,
    dueDate: null,
    repeatingDays: { 'mo': true, 'tu': true, 'we': false, 'th': false, 'fr': false, 'sa': false, 'su': false },
    tags: [],
    color: `green`,
    isFavored: true,
    isArchived: true
  },
  {
    id: String(new Date() + Math.random()),
    description: `Пройти интенсив на соточку`,
    dueDate: new Date(Date.UTC(2019, 10, 5, 5, 45, 15)),
    repeatingDays: DefaultRepeatingDays,
    tags: [`homework`, `intensive`, `keks`],
    color: `blue`,
    isFavored: false,
    isArchived: true
  },
];

export { tasks };
