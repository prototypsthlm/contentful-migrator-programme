# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.0.9](https://github.com/prototypsthlm/contentful-migrator-programme/compare/v0.0.8...v0.0.9) (2022-05-31)


### Bug Fixes

* error when creating aux env ([#162](https://github.com/prototypsthlm/contentful-migrator-programme/issues/162)) ([de23d8f](https://github.com/prototypsthlm/contentful-migrator-programme/commit/de23d8f11736759e957e3ea3f1f54651b4b3dccf))

### [0.0.8](https://github.com/prototypsthlm/contentful-migrator-programme/compare/v0.0.7...v0.0.8) (2022-05-25)


### Bug Fixes

* 100 migration limit due to bad api request ([#148](https://github.com/prototypsthlm/contentful-migrator-programme/issues/148)) ([f44b290](https://github.com/prototypsthlm/contentful-migrator-programme/commit/f44b290ae0e752cb7caca45485b18bb6ae801f06))
* remove duplicate bugfix from changelog ([70d3761](https://github.com/prototypsthlm/contentful-migrator-programme/commit/70d376188c5130dc48efe8b7c1c749bdf748f38c))

### [0.0.7](https://github.com/prototypsthlm/contentful-migrator-programme/compare/v0.0.5...v0.0.7) (2021-09-16)


### Features

* Add tests ([#39](https://github.com/prototypsthlm/contentful-migrator-programme/issues/39)) ([13adab2](https://github.com/prototypsthlm/contentful-migrator-programme/commit/13adab2c0bdf0f3c743c78b4cffc0f8cb23e05cf))
* adds dependabot ([#29](https://github.com/prototypsthlm/contentful-migrator-programme/issues/29)) ([7dc2c15](https://github.com/prototypsthlm/contentful-migrator-programme/commit/7dc2c15315bb11c359cb4648a5abf2e4964e2d79))

### [0.0.6](https://github.com/prototypsthlm/contentful-migrator-programme/compare/v0.0.5...v0.0.6) (2021-03-19)


### Bug Fixes

* remove npm test script ([b777c3f](https://github.com/prototypsthlm/contentful-migrator-programme/commit/b777c3fe1e88a9a98669106cc07e77bf661562a3))

### [0.0.5](https://github.com/prototypsthlm/contentful-migrator-programme/compare/v0.0.4...v0.0.5) (2020-09-04)


### Features

* Add support for interactive rollback to an arbitrary migration ([6241ec3](https://github.com/prototypsthlm/contentful-migrator-programme/commit/6241ec38479054b8d2680f448dc5c723c883ba28))
* Add support for migration batches ([18cb26f](https://github.com/prototypsthlm/contentful-migrator-programme/commit/18cb26f3a6a7a34436af413951182ccec0be6a1f))
* added lint PR title to conform with conventional commits format ([d81aac5](https://github.com/prototypsthlm/contentful-migrator-programme/commit/d81aac51ed2ca3e9563d3d952f08dfd9dfab5f6e))
* added log coloring with chalk ([#25](https://github.com/prototypsthlm/contentful-migrator-programme/issues/25)) ([1995126](https://github.com/prototypsthlm/contentful-migrator-programme/commit/199512608ed96bfa142c41dbddcddddb2d5b2a06))
* convert project to typescript ([#23](https://github.com/prototypsthlm/contentful-migrator-programme/issues/23)) ([857b8fe](https://github.com/prototypsthlm/contentful-migrator-programme/commit/857b8fef109f81c7346cb5c44dc6d365c6ba2df7))


### Bug Fixes

* init bookkeeping before checking migrations to handle ([0573853](https://github.com/prototypsthlm/contentful-migrator-programme/commit/0573853ea8fd2c37e4da0658f2b4f6496d2a29d8))
* missing environment variables to rename ([41f39d1](https://github.com/prototypsthlm/contentful-migrator-programme/commit/41f39d180b69f375d43c8ab39b5f01dbb1a00294))

### 0.0.4 (2020-09-02)


### Features

* add ability to use aux env ([a0f3ecd](https://github.com/prototypsthlm/contentful-migrator-programme/commit/a0f3ecd7fc9976d4b61d4a9825ba2a3cfb45c41e))
* add reset command ([9499e70](https://github.com/prototypsthlm/contentful-migrator-programme/commit/9499e70d9051c5a7ac393f562ac73b6424f9a7b1))
* Add support for up/down migrations ([#1](https://github.com/prototypsthlm/contentful-migrator-programme/issues/1)) ([4df9e77](https://github.com/prototypsthlm/contentful-migrator-programme/commit/4df9e7709934353ba4bb3a8862cb9a133dc56c3d))
* convert commands to be under node_modules/.bin folder and use yargs to handle them ([dc34ed4](https://github.com/prototypsthlm/contentful-migrator-programme/commit/dc34ed474bd44c98e9990584fba3b37c2bd13e37))
* read env vars from .env in the installed project ([60d9a6d](https://github.com/prototypsthlm/contentful-migrator-programme/commit/60d9a6d8623a127967b15bc129273a4aab19e8a0))


### Bug Fixes

* aux:create optional name argument ([67a7c2b](https://github.com/prototypsthlm/contentful-migrator-programme/commit/67a7c2b3f9889fb0201867aae766cb035e21e071))
* fix migration paths and error logging ([ea24d11](https://github.com/prototypsthlm/contentful-migrator-programme/commit/ea24d11d84c5577bdc71f0f62bdd17b7fc6a7f80))
* Rename Prettier config file ([4a813dc](https://github.com/prototypsthlm/contentful-migrator-programme/commit/4a813dcbce6edaab2a60e725fc68f8227e66e7c6))
* update wrong testEnv parameter shape ([9c4583f](https://github.com/prototypsthlm/contentful-migrator-programme/commit/9c4583f260fdcaa7c8268c5a5b521e544bb39929))
* wrong migration folder path ([d8fabd6](https://github.com/prototypsthlm/contentful-migrator-programme/commit/d8fabd653fbf8a479c69a7c1a9cc456a0dfb63d9))
* wrong migrations-type.js path ([a253784](https://github.com/prototypsthlm/contentful-migrator-programme/commit/a2537843d2757828a3f08f1da819d46dda24f853))
