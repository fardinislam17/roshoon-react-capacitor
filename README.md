# Roshoon UI

Welcome to the Roshoon UI repository. This project is built using modern frontend technologies, and here you'll find instructions on how to set up the project, contribute, and maintain code standards.

## Developer Setup Instructions

### 1. Clone the Repository

To get started, clone the repository to your local machine:

```bash
git clone https://github.com/roshoon/roshoon-ui.git
```

### 2. Install Dependencies

Navigate into the project directory and install the necessary dependencies by running:

```bash
npm install
```

### 3. Run the Application

To run the development server, execute the following command:

```bash
npm start
```

The project will be running on [localhost:3333](http://localhost:3333).

---

## Branching Instructions

When creating a new branch, please follow these guidelines:

- **Feature Branch**: `feature/[Jira-ticket-Number]`
  - Example: `feature/RPD-12345`
- **Bugfix Branch**: `bug/[Jira-ticket-Number]`
  - Example: `bug/RPD-12345`

The Jira ticket number should always be included to track the relevant task.

---

## Commit Message Guidelines

Each commit message must follow this structure to maintain consistency across the repository:

- The commit message should start with the Jira ticket number followed by a colon `:` and a brief description of the change.

  **Example:**

  ```bash
  [RPD-12345]: Add the header component to the homepage
  ```

This helps in tracking commits related to specific tasks and issues.

---

## Pull Request Guidelines

When opening a pull request, ensure the following:

- **Description**: Include a detailed description of what the pull request is addressing.
  - Mention the Jira ticket number.
  - Explain the purpose of the changes.
  - List any dependencies or external changes.
- **Testing**: Provide a summary of the tests performed (manual or automated).
- **Reviewers**: Tag the relevant reviewers and ensure all the team members involved in the feature or bugfix are aware of the PR.

### Pull Request Format

Please follow this template when creating a pull request:

```markdown
## Jira Ticket

- [RPD-12345]

## Description

- Brief description of the task.
- Any relevant details that would help the reviewers.

## Testing

- Explain how this was tested (unit tests, manual testing, etc.)

## Dependencies

- List any external libraries, API changes, or other PRs that this one depends on.

## Screenshots (if applicable)

- Add before and after screenshots if the UI has changed.
```

---

## General Contribution Guidelines

1. Ensure all code adheres to our linting and formatting rules. Use `npm run lint` to check your code before committing.
2. Write clear, concise, and well-documented code.
3. Keep pull requests focused. Avoid bundling unrelated changes.
4. Ensure your branch is up-to-date with the main branch before opening a pull request.
5. Ensure all tests pass before opening a pull request.
6. Tag relevant Jira issues with your commits and pull requests.

---

If you feel like any important details are missing or need clarification, please don't hesitate to reach out via the appropriate channels.

Thank you for contributing to **Roshoon UI**!
