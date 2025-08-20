# @protorians/arcane

Une interface en ligne de commande puissante et flexible pour gérer les runes (plugins).

## Table des matières

- [Aperçu](#aperçu)
- [Installation](#installation)
- [Concepts fondamentaux](#concepts-fondamentaux)
  - [Runes](#runes)
  - [Commandes](#commandes)
- [Utilisation de base](#utilisation-de-base)
- [Fonctionnalités avancées](#fonctionnalités-avancées)
  - [Ajout de Runes](#ajout-de-runes)
  - [Suppression de Runes](#suppression-de-runes)
  - [Création de Runes](#création-de-runes)
- [Référence API](#référence-api)
  - [Commandes](#commandes-1)
    - [craft:runes](#craftrunes)
    - [add:rune](#addrune)
    - [remove:rune](#removerune)
- [Référence des types](#référence-des-types)
- [Licence](#licence)

## Aperçu

@protorians/arcane est un outil d'interface en ligne de commande (CLI) construit sur @protorians/arcane-core. Il fournit un moyen simple de gérer les runes (plugins) qui étendent la fonctionnalité du CLI. L'outil vous permet d'ajouter, de supprimer et de créer des runes, ce qui facilite la personnalisation de votre expérience en ligne de commande.

## Installation

```bash
# Utilisation de npm
npm install -g @protorians/arcane

# Utilisation de yarn
yarn global add @protorians/arcane

# Utilisation de pnpm
pnpm add -g @protorians/arcane
```

## Concepts fondamentaux

### Runes

Les Runes sont des plugins qui étendent la fonctionnalité du CLI arcane. Elles peuvent ajouter de nouvelles commandes, options et arguments au CLI. Les Runes sont généralement distribuées sous forme de dépôts GitHub et peuvent être installées à l'aide de la commande `add:rune`.

### Commandes

Le CLI arcane fournit plusieurs commandes intégrées pour gérer les runes :

- `craft:runes` : Crée les runes disponibles installées dans le répertoire des runes
- `add:rune` : Ajoute une nouvelle rune à partir d'un dépôt GitHub
- `remove:rune` : Supprime une rune installée

## Utilisation de base

```bash
# Installer arcane globalement
npm install -g @protorians/arcane

# Ajouter une rune depuis GitHub
arcane add:rune propriétaire/dépôt

# Créer toutes les runes installées
arcane craft:runes

# Supprimer une rune
arcane remove:rune propriétaire/dépôt
```

## Fonctionnalités avancées

### Ajout de Runes

Vous pouvez ajouter des runes à partir de dépôts GitHub en utilisant la commande `add:rune`. La commande prend un nom de dépôt GitHub au format `propriétaire/dépôt` ou `propriétaire/dépôt@version`.

```bash
# Ajouter une rune depuis la branche principale
arcane add:rune propriétaire/dépôt

# Ajouter une rune depuis une version spécifique
arcane add:rune propriétaire/dépôt@1.0.0
```

Lorsque vous ajoutez une rune, arcane va :

1. Télécharger le dépôt depuis GitHub
2. L'extraire dans le répertoire des runes
3. Le renommer pour correspondre au slug du dépôt
4. Mettre à jour la configuration de la rune
5. Créer la rune pour la rendre disponible à l'utilisation

### Suppression de Runes

Vous pouvez supprimer des runes installées en utilisant la commande `remove:rune`. La commande prend le nom de la rune à supprimer.

```bash
# Supprimer une rune
arcane remove:rune propriétaire/dépôt
```

Lorsque vous supprimez une rune, arcane va :

1. Supprimer la rune de la configuration des runes
2. Supprimer le répertoire de la rune

### Création de Runes

La création de runes est le processus qui les rend disponibles pour utilisation dans le CLI. Lorsque vous créez des runes, arcane analyse le répertoire des runes, lit la configuration de chaque rune et rend leurs commandes disponibles dans le CLI.

```bash
# Créer toutes les runes installées
arcane craft:runes

# Créer toutes les runes installées silencieusement (sans journalisation)
arcane craft:runes --silent
```

## Référence API

### Commandes

#### craft:runes

Crée les runes disponibles installées dans le répertoire des runes.

```bash
arcane craft:runes [options]
```

Options :
- `--silent, -s` : Désactiver la journalisation

#### add:rune

Ajoute une nouvelle rune à partir d'un dépôt GitHub.

```bash
arcane add:rune <dépôt>
```

Arguments :
- `dépôt` : Nom du dépôt GitHub (propriétaire/dépôt ou propriétaire/dépôt@version)

#### remove:rune

Supprime une rune installée.

```bash
arcane remove:rune <nom>
```

Arguments :
- `nom` : Nom de la rune à supprimer

## Référence des types

Le CLI arcane utilise les types du package @protorians/arcane-core. Pour une référence complète de ces types, consultez la [documentation d'arcane-core](./arcane-core/README.fr.md).

## Licence

Ce projet est sous licence MIT. Voir le fichier LICENSE pour plus de détails.