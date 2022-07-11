import { CliCommandInterface } from './cli-command.interface.js';
import chalk from 'chalk';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(chalk.blue(`
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.js --<command> [--arguments]
        Команды:
            --version:                                                    # выводит номер версии
            --help:                                                       # печатает этот текст
            --import <path> <login> <password> <host> <dbname> <salt>:    # импортирует данные из TSV
            --generate <count> <filepath> <url>                           # создает файл в формате TSV со случайно сгенерированными данными
        `));
  }
}
