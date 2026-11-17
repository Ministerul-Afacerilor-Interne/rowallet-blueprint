<!-- RO modification: README -->
# Blueprint for the RO Wallet Ecosystem

As part of the implementation of the RO Wallet Ecosystem, this document provides
an overview of the national ecosystem, including its governance framework, roles
and responsibilities of the involved entities, implementation approach,
architectural considerations, and operational processes.

> [!NOTE]
> **Looking for the RO Wallet implementation details?**
>
> Please refer to the [**RO Wallet Architecture Documentation**](https://ministerul-afacerilor-interne.github.io/rowallet-documentation/) for detailed information on the **architecture**, **data flows**, **cryptographic components**, and **technical interfaces** of the Romanian National EUDI Wallet.

## Links

* The GitHub repository for this document is [hosted on Github](https://github.com/Ministerul-Afacerilor-Interne/rowallet-blueprint).
* For reading, the content is available at [this website](https://ministerul-afacerilor-interne.github.io/rowallet-blueprint).

## Providing Feedback

To provide feedback, please contact us by e-mail at
[contact.rowallet@mai.gov.ro](mailto:contact.rowallet@mai.gov.ro).

## Changes

All changes to this document are tracked in the [CHANGELOG-RO.md](CHANGELOG-RO.md).

## Source and Licence

This blueprint is adapted from the Blueprint for the EUDI Wallet Ecosystem in
Germany (© BMI, © 2025 BMDS), licensed under
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). See
[ATTRIBUTION.md](ATTRIBUTION.md) and [NOTICE](NOTICE) for the attribution and
the nature of the adaptation.

The Romanian adaptation of this blueprint is not endorsed by the German Federal
Ministry of the Interior (BMI) or the German Federal Ministry for Digital
Transformation and Government Modernisation (BMDS).

## Development

The documentation site is built with [Docusaurus](https://docusaurus.io/) and
Node.js 20 or newer. The Markdown source is in `architecture-proposal/`.

### Development in a Container

For a reproducible and isolated development environment, use the checked-in VS
Code Dev Container setup. It runs Node.js and the documentation tooling inside a
container and starts a separate PlantUML service for local diagram rendering.

Requirements:

* Docker Desktop or another Docker-compatible runtime
* VS Code with the Dev Containers extension

Open the repository in VS Code and run **Dev Containers: Reopen in Container**.
The container installs dependencies with `npm ci` through the `postCreateCommand`
defined in `.devcontainer/devcontainer.json`.

Inside the container, start the local documentation site with:

```bash
npm run start:local
```

The development server is available at <http://localhost:3000>. PlantUML is
available inside the container at `http://plantuml-server:8080/plantuml`, so
diagram rendering stays inside the local Docker network.

The same environment can also be started without the VS Code command palette:

```bash
docker compose -f .devcontainer/docker-compose.devcontainer.yml up -d --build
docker compose -f .devcontainer/docker-compose.devcontainer.yml exec devcontainer npm run start:local
```

Run build and validation commands from inside the container as well. This keeps
Node.js, npm packages, and diagram rendering isolated from the host environment
apart from the repository bind mount.

### Local Development

```bash
npm ci
docker compose up -d plantuml-server
npm run start:local
```

The development server watches source changes and is available at
<http://localhost:3000>. PlantUML diagrams are rendered to local SVG files before
Docusaurus starts; diagram source and visitor requests are not sent to a
third-party renderer. If the `plantuml` command is installed locally, `npm start`
can be used without Docker.

Useful commands:

```bash
npm run build    # Generate the production site in build/
npm run build:local # Build using the local Docker PlantUML service
npm run serve    # Serve the generated production site locally
npm run lint     # Check Markdown formatting
npm test         # Lint, build, and validate routes and runtime dependencies
npm run test:local # Run the tests using the local Docker PlantUML service
npm run clear    # Remove Docusaurus caches
```

Search is generated locally with the site and runs in the browser. It does not
send search terms or document content to a third-party search provider.

`npm run build` generates the static site in `build/`. The site URL and base
path default to the GitHub Pages address above; set `DEPLOY_BASE_URL` and
`DOCUSAURUS_BASE_URL` to build for another address.
