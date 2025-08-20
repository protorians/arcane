# @protorians/arcane

A powerful, flexible command-line interface for managing runes (plugins).

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Concepts](#core-concepts)
  - [Runes](#runes)
  - [Commands](#commands)
- [Basic Usage](#basic-usage)
- [Advanced Features](#advanced-features)
  - [Adding Runes](#adding-runes)
  - [Removing Runes](#removing-runes)
  - [Crafting Runes](#crafting-runes)
- [API Reference](#api-reference)
  - [Commands](#commands-1)
    - [craft:runes](#craftrunes)
    - [add:rune](#addrune)
    - [remove:rune](#removerune)
- [Types Reference](#types-reference)
- [License](#license)

## Overview

@protorians/arcane is a command-line interface (CLI) tool built on top of @protorians/arcane-core. It provides a simple way to manage runes (plugins) that extend the functionality of the CLI. The tool allows you to add, remove, and craft runes, making it easy to customize your command-line experience.

## Installation

```bash
# Using npm
npm install -g @protorians/arcane

# Using yarn
yarn global add @protorians/arcane

# Using pnpm
pnpm add -g @protorians/arcane
```

## Core Concepts

### Runes

Runes are plugins that extend the functionality of the arcane CLI. They can add new commands, options, and arguments to the CLI. Runes are typically distributed as GitHub repositories and can be installed using the `add:rune` command.

### Commands

The arcane CLI provides several built-in commands for managing runes:

- `craft:runes`: Crafts available runes installed in the runes directory
- `add:rune`: Adds a new rune from a GitHub repository
- `remove:rune`: Removes an installed rune

## Basic Usage

```bash
# Install arcane globally
npm install -g @protorians/arcane

# Add a rune from GitHub
arcane add:rune owner/repository

# Craft all installed runes
arcane craft:runes

# Remove a rune
arcane remove:rune owner/repository
```

## Advanced Features

### Adding Runes

You can add runes from GitHub repositories using the `add:rune` command. The command takes a GitHub repository name in the format `owner/repository` or `owner/repository@version`.

```bash
# Add a rune from the main branch
arcane add:rune owner/repository

# Add a rune from a specific version
arcane add:rune owner/repository@1.0.0
```

When you add a rune, arcane will:

1. Download the repository from GitHub
2. Extract it to the runes directory
3. Rename it to match the repository slug
4. Update the rune's configuration
5. Craft the rune to make it available for use

### Removing Runes

You can remove installed runes using the `remove:rune` command. The command takes the name of the rune to remove.

```bash
# Remove a rune
arcane remove:rune owner/repository
```

When you remove a rune, arcane will:

1. Remove the rune from the runes configuration
2. Delete the rune's directory

### Crafting Runes

Crafting runes is the process of making them available for use in the CLI. When you craft runes, arcane scans the runes directory, reads each rune's configuration, and makes their commands available in the CLI.

```bash
# Craft all installed runes
arcane craft:runes

# Craft all installed runes silently (without logging)
arcane craft:runes --silent
```

## API Reference

### Commands

#### craft:runes

Crafts available runes installed in the runes directory.

```bash
arcane craft:runes [options]
```

Options:
- `--silent, -s`: Disable logging

#### add:rune

Adds a new rune from a GitHub repository.

```bash
arcane add:rune <repository>
```

Arguments:
- `repository`: GitHub repository name (owner/repository or owner/repository@version)

#### remove:rune

Removes an installed rune.

```bash
arcane remove:rune <name>
```

Arguments:
- `name`: Name of the rune to remove

## Types Reference

The arcane CLI uses types from the @protorians/arcane-core package. For a complete reference of these types, see the [arcane-core documentation](./arcane-core/README.md).

## License

This project is licensed under the MIT License. See the LICENSE file for details.