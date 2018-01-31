# TEDxKasetsart-Backend [![license](https://img.shields.io/github/license/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://github.com/TEDxKasetsartU/TedxKasetsartU-Backend)

## Badge

| Badge | Description |
| ----- | ----------- |
| [![Libraries.io for GitHub](https://img.shields.io/librariesio/github/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://libraries.io/github/TEDxKasetsartU/TedxKasetsartU-Backend) | monitoring dependencies, by **libraries.io** |
| [![Known Vulnerabilities](https://snyk.io/test/github/tedxkasetsartu/tedxkasetsartu-backend/badge.svg?targetFile=package.json)](https://snyk.io/test/github/tedxkasetsartu/tedxkasetsartu-backend?targetFile=package.json) | monitoring vulnerabilities dependencies, by **snyk.io** |
| [![Codecov](https://img.shields.io/codecov/c/github/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://codecov.io/github/TEDxKasetsartU/TedxKasetsartU-Backend) | code coverage, use **codecov** |
| [![CircleCI](https://img.shields.io/circleci/project/github/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://circleci.com/gh/TEDxKasetsartU/TedxKasetsartU-Backend) | testing CI, use **CircleCI** |
| [![Code Climate](https://img.shields.io/codeclimate/maintainability/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://codeclimate.com/github/TEDxKasetsartU/TedxKasetsartU-Backend) | analysis code and maintainability, use **code climates** |
| [![Code Climate](https://img.shields.io/codeclimate/issues/github/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://codeclimate.com/github/TEDxKasetsartU/TedxKasetsartU-Backend/issues) | code issues or problem, use **code climates** |
| [![Heroku](https://img.shields.io/badge/Heroku-Updated-brightgreen.svg)](https://tedxku-backend.herokuapp.com) | staging server |
| [![Doc](https://img.shields.io/badge/Document-Updated-orange.svg)](https://tedxkasetsartu.github.io/TedxKasetsartU-Backend/) | document site |

## Available command

### Server

| Available command         | Description                                            |
| ------------------------- | ------------------------------------------------------ |
| `npm` start               | start server with *default* env                        |
| `npm` run start:watch     | start server with *default* env and watch file changes |
| `npm` run start:dev       | start server with *develop* env                        |
| `npm` run start:dev:watch | start server with *develop* env and watch file changes |
| `npm` run start:prod      | start server with *production* env                     |

### Database

| Available command        | Description                                 |
| ------------------------ | ------------------------------------------- |
| `npm` run start:db       | start mongo database server (on background) |
| `npm` run stop:db        | stop mongo database server                  |
| `npm` run start:db:watch | start mongo database server and watch       |

### Testing

| Available command    | Description                                             |
| -------------------- | ------------------------------------------------------- |
| `npm` run test:mocha | run mocha test without any configuration                |
| `npm` test           | run **test:mocha** in *test* env                        |
| `npm` run test:watch | run **test:mocha** in *test* env and watch file changes |

### Code coverage

| Available command   | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `npm` run cov       | run test and sent the report to **coveralls**             |
| `npm` run cov:check | run checker coverage, all of this should more and **70%** |
|                     | *lines*, *functions*, *statements*, and *branches*        |

### Linter

| Available command | Description                       |
| ----------------- | --------------------------------- |
| `npm` run lint    | run linter analysis, using eslint |

### CI testing

| Available command   | Description                                                                 |
| ------------------- | --------------------------------------------------------------------------- |
| `npm` run ci:test   | run test, This must run in **CircleCI** only                                |
| `npm` run ci:report | run test and sent report to **codecov**, This must run in **CircleCI** only |

### Monitoring

| Available command | Description                                                       |
| ----------------- | ----------------------------------------------------------------- |
| monitor:start     | start monitor server, use `pm2` command                           |
| monitor:stop      | stop monitor server, use `pm2` command                            |
| monitor:show      | stop monitor information, use `pm2` command                       |
| monitor:restart   | restart server and monitor, use `pm2` command                     |
| monitor:delete    | delete server process, use `pm2` command                          |
| monitor:log       | show server log, use `pm2` command. `--lines` to specify out line |

I use [keymetrics](https://app.keymetrics.io/#/)

### Production

| Available command    | Description                                    |
| -------------------- | ---------------------------------------------- |
| `npm` run start:prod | start server with *production* env             |
| `npm` run build:gh   | build document and deploy to `gh-pages` branch |

### Document

| Available command       | Description                            |
| ----------------------- | -------------------------------------- |
| `npm` run build:doc     | build code document to `docs` folder   |
| `npm` run build:apidoc  | build api document to `apidocs` folder |
| `npm` run build:doc:all | build both api and code docs           |
