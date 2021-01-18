<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/adblanc/repo">
    <img src="https://lh3.googleusercontent.com/proxy/a3aeFyFwkJPGrUDx5Wdv-MW1h5xsMODNQXjO5_0AYAcF4RfzXjN4ZJKtzhiHskeV4OFCvWq8aRDcqldN6rzB52t9_Y3nSjRZ6Bg-i2FqXOayg5_RxFPl3eIF6Q" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Translator</h3>

  <p align="center">
    A node.js package to translate JSON files.
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [About the Project](#about-the-project)
  - [Built With](#built-with)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

<!-- ABOUT THE PROJECT -->

## About The Project

[![Product Name Screen Shot][product-screenshot]]

Translator allows you to translate a JSON file and more specifically an **array of values.**
Your JSON file must contain either an **array of strings or an array of objects** that you want to translate.

This project scrape https://www.deepl.com/fr/translator website to bypass it's pro API limitation.
All deepl languages are available aswell as auto detection as input language.

You can either get the result of the translation printed out in the console or as a JSON file.

### Built With

- [Puppeteer](https://github.com/puppeteer/puppeteer)
- [Inquirer](https://github.com/SBoudrias/Inquirer.js)
- [Chalk](https://github.com/chalk/chalk)
- [Cli-progress](https://github.com/AndiDittrich/Node.CLI-Progress)

## Installation

You can download it globally using

```sh
npm install -g @ablanc/translator
```

or add it as a devlopment dependency

```sh
npm install --save-dev @ablanc/translator

# or with yarn
yarn add -D @ablanc/translator
```

## Usage

To use it type this in your terminal:

```sh
Usage: translator [options]

Options:
  -i, --input <input>                                 json file to process
  -o, --output <console|path-to-file>                 output display
  -li, --lang-input <lang_input>                      en | fr | de | es | pt | it | nl | pl | ru
  -lo, --lang-output <lang_output>                    en-US | fr-FR | de-DE | es-ES | pt-PT | it-IT | nl-NL | pl-PL | ru-RU
  -pt, --properties-to-translate <property,property>  specify your object properties you want to translate, separated by ,
  -skid --skip-until-id <id>                          it will start translating your objects from id
  -int, --interactive                                 interactive mode
  -h, --help                                          display help for command
```

## Contributing

Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE` for more information.

[product-screenshot]: https://media.discordapp.net/attachments/625724633538101251/682967033243107418/translator.png
