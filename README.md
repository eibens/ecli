# ecli

[ecli] (pronounced _easily_) makes it easy to build and document a command-line
interface (CLI) in TypeScript for [Deno].

[![License][license-shield]](LICENSE) [![Deno doc][deno-doc-shield]][deno-doc]
[![Deno module][deno-land-shield]][deno-land]
[![Github tag][github-shield]][github] [![Build][build-shield]][build]
[![Code coverage][coverage-shield]][coverage]

# Motivation

If you know how to use it, a CLI is an efficient and portable way of running
code. [Deno] already makes it easy to develop and use a CLI written in
TypeScript. While developing the CLI is easy, formatting help texts and user
feedback for display in a terminal is tedious and can become repetitive. [ecli]
is a customizable tool that accelerates the process of turning a TypeScript
module into a well documented CLI.

# Documentation

[ecli] is still in a very early phase and may be subject to significant changes,
refactoring, and deprecation. The code is currently divided into multiple
thematic parts:

- [log.ts](log.ts) defines functions for printing to the console or streams.
- [text.ts](text.ts) defines lower level components for formatting text.
- [options.ts](options.ts) defines components for documenting arguments and
  flags.
- [permissions.ts](permissions.ts) defines components for documenting [Deno]
  permissions.
- [usage.ts](usage.ts) defines components for documenting installation and usage
  with [Deno].
- [history.ts](history.ts) defines components for outputting temporal data and
  events.
- [mod.ts](mod.ts) exports the above modules.

There are no unit tests yet, but components can be visually tested by running
the corresponding `<name>_demo.ts` module. For example, the
[mod.ts](permissions.ts) module may be tested by running
`deno run mod_demo.ts` and examining the output.

[ecli]: #
[deno]: https://deno.land

<!-- badges -->

[github]: https://github.com/eibens/ecli
[github-shield]: https://img.shields.io/github/v/tag/eibens/ecli?label&logo=github
[coverage-shield]: https://img.shields.io/codecov/c/github/eibens/ecli?logo=codecov&label
[license-shield]: https://img.shields.io/github/license/eibens/ecli?color=informational
[coverage]: https://codecov.io/gh/eibens/ecli
[build]: https://github.com/eibens/ecli/actions/workflows/ci.yml
[build-shield]: https://img.shields.io/github/workflow/status/eibens/ecli/ci?logo=github&label
[deno-doc]: https://doc.deno.land/https/deno.land/x/ecli/mod.ts
[deno-doc-shield]: https://img.shields.io/badge/doc-informational?logo=deno
[deno-land]: https://deno.land/x/ecli
[deno-land-shield]: https://img.shields.io/badge/x/ecli-informational?logo=deno&label
