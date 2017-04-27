# Contributing

Before you start contributing it's useful to know about philosophy and general contributing guidelines.

## Merge vs rebase

Your commits will be merged to `master` branch under your name. Few of earlier commits have been squashed and rebased from epic/feature branches on GitHub because of my settings. These settings have been switched off.

## Philosophy

* It's always better to be a good and easy going person rather than "I know how to do sh*t" kind of person.

* It doesn't matter how much years of experience do you have, ask questions, get answers, communicate, collaborate, follow guidelines (see below).

* Code quality bar is quite high (comparing to other FOSS projects), please expect code reviews, rejects, change requests.

* It's always better to ask before you do a big amount of work. Usually PRs should be very focused and should fix specific issue or add one feature at a time.

* Do not hurry. Give a time, think about the right way to implement stuff. Get some coffee.

* But after all, we would love to see your changes!

## Rules

### 1. Tests and code quality

1. Write tests.
2. Run linter against your `src` and `tests` (runs automatically when you `npm test`).
3. Try to avoid compound variable names, method names, class names as much as you can. Good: `count`. Bad: `orderCount`. If you're about using long variable name, try to break your scope into smaller scopes.
4. No files with more than 250 lines of code. Try to limit line count to 200.
5. Document your methods, classes with esdoc (see already existing code for examples).
6. Make documentation clean, keep it short and meaningful.

### 2. Branch names, git, process, etc.

1. Before you do _any_ work, create GitHub issue. Give a good explanation of the story you gonna work on. Show examples. It can be obvious for you, but not for others. Save time one should spend understanding your changes. Add screenshots, pics if needed.
2. Branch from the `master` (Example: `git checkout -b 123-blabla`). Name your branches the right way: `NNN-short-branch-description`. Where `NNN` is GitHub issue number. And `short-branch-description` is short and meaningful description of the work you gonna do. It's better to have 1 word description than 5.
3. Always prefix your commits with `# NNN` where `NNN` is GitHub issue number. For example: `#123 Add blabla to something`. Keep in mind that `#` is usually comment symbol in Git. So you may want to use `git commit -m "#123 Add blabla to something"` shell command or configure your `~/.gitconfig`.
4. Use right wording for your Git commits. Make them meaningful, short, use imperative mood (see [good explanation here](http://chris.beams.io/posts/git-commit/)).
5. Use `#NNN` prefix when you create PR. PR subject line should reflect your changes, should be meaningful and short.
6. Feel free to ask for advice (mention `@ro31337`) if you need help with approach.
7. (recommendation) When work is done, test your feature/bug, add screenshots confirming everything works as expected. It can be obvious for you, but here you want to save time for others.
