# BBEdit Recovery

So over the last few years as a developer I've experienced three instances of a [MacBook swollen battery](https://www.consumerreports.org/laptop-computers/some-macbook-pro-batteries-can-swell-what-you-need-to-know/). I do not know if I'm just scripting too much, too many projects with `npx` calls for React :zany_face:, or just simply bad luck. Either way I've found over time I was manually copying over my BBEdit settings to my NAS and thought there has got to be a better way to backup.

To resolve the headache of copying over and since I've enjoyed writing more in Node I thought it be fun to write a CLI to help anyone else. At current standing this is very basic but in my free time (if ever :roll_eyes:) I'm thinking of building in a `launchd` setup that pushes to a repository.

## Installation

NPM:

```bash
npm i bbedit-recovery
```

install dependencies

```bash
cd bbedit-recovery && npm i
```

NPM link

After dependencies are added run:

```bash
npm link
```

If you're done run to remove

```bash
npm unlink
```

## How to use

This package can take three CLI commands:

```bash
bbedit-recovery
bbedit-recover
```

or the shorthand:

```bash
bbrec
```

by default with no options passed this will create a directory named `bbedit-recovery` and copy over all directories that are not empty and files. This location can be echoed with the `pwd` command in the terminal if you're unsure where files will go.

## Options

What's a CLI without options, right? Currently this takes two `dest` and `name` but I can assure you there will be more in the future.

### Destination

You can specify where the files will be copied to by passing either the commands `--name` or the shorthand `-n`. This expects and tests for a directory. If a directory isn't valid it will error out.

Example:

```bash
bbedit-recover -dest /Users/$USER/supercalifragilisticexpialidocious
```

shorthand:

```bash
bbrec -d /Users/$USER/supercalifragilisticexpialidocious
```

#### Desktop and Documents

If you'd like to copy files to your **Desktop** directory:

```bash
bbedit-recover -d Desktop
```

If you'd like to copy files to your **Documents** directory:

```bash
bbedit-recover -dest Documents
```

ewww.. a shorthand for Documents:

```bash
bbedit-recover -d Docs
```

### Name

Well, I'm hurt that you do not like the name `bbedit-recovery`. Fine, so be it, there is an option to change it just for you:

```bash
bbedit-recover -dest /Users/$USER/Desktop/supercalifragilisticexpialidocious -name recovery
```

shorthand:

```bash
bbrec -d /Users/$USER/Desktop/supercalifragilisticexpialidocious -n recover
```

### Intro

What's a CLI without a groovy terminal banner:

```bash
bbedit-recovery intro
```

### Help

Documentation writing is soooo boring. If I add a feature and forget to update the README.md you can get a listing of the commands:

```bash
bbedit-recovery --help
```
