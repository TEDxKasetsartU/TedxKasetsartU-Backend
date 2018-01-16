# TEDxKasetsart-Backend [![license](https://img.shields.io/github/license/TEDxKasetsartU/TedxKasetsartU-Backend.svg)](https://github.com/TEDxKasetsartU/TedxKasetsartU-Backend)

## Badge



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

| Available command    | Description                        |
| -------------------- | ---------------------------------- |
| `npm` run start:prod | start server with *production* env |

### Document

| Available command      | Description                            |
| ---------------------- | -------------------------------------- |
| `npm` run build:doc    | build code document to `docs` folder   |
| `npm` run build:apidoc | build api document to `apidocs` folder |
