# Contributing 
Our commit history is a great example of why some structure when contributing is necessary.
This document describes how you should go about contributing to the repo, please read all relevant parts before contributing.

## Feature branches
As both master and development are protected, any changes will have to be made through a feature branch. A feature branch should have the following characteristics through its lifetime:

- The branch is linked to at least one issue.
- It should only have one clear and achievable goal.  
eg. "Add cinfo command" and not "Change license and fix the call command"
- A feature branch should be named after the issue like: `<nr>-<lowercase-name>`.  
eg. you have an issue nr 301 named "Add feature branches to contributing", then your branch should be named: `301-add-feature-branches-to-contributing`.

## Issues
### Creation
- Make sure there is not already an issue regarding your topic.
- Keep the title short, descriptive and [imperative].
- Answer the following questions in the description:
  - What is the current situation?
  - Why should this be changed?
  - What changes are necessary?
- Add any relevant tags.
- If you are planning to resolve the issue yourself, at least partly, then assign yourself to the issue.

### Commenting
- All comments should be written in English.
- Be sure to follow our [Code of Conduct].
- Keep any discussion on-topic, or move it to another issue/platform.

## Pull requests

### Creation
- Keep the title short, descriptive and [imperative].
- Write a short description of your changes.  
If your PR solves any issue(s), make sure to add `resolves #<issue nr>` at the end.
- Add any relevant tags.

### Review
These steps have been written to go from quick and easy to more rigorous.  
If at any stage you find an issue, you can choose to stop at that stage until a fix has been pushed. Do make sure to go through the entire process of the stage you found an issue at. 

1. Check whether all automated reviews/actions have passed.
2. Open up the changes in your code editor and whether there are TS and/or Eslint errors.
3. Manually review the changes for any obvious mistakes or bad practices.
4. Run the changes locally and test any relevant parts of the bot.

## Commits
- Commits should follow the style made popular by [Angular][Angular contributing].
- The scope can be any folder, command. It may also be omitted, but preferably not.


<!-- Dictionary -->
[imperative]: https://examples.yourdictionary.com/imperative-sentence-examples.html

<!-- Docs links -->
[Code of Conduct]: ./CODE-OF-CONDUCT.md

<!-- Other links -->
[Angular contributing]: https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit