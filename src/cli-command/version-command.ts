import chalk from 'chalk';
import { readFileSync } from 'fs';
import { CliCommandInterface } from './cli-command.interface.js';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  private static readVersion(): string {
    const contentPageJSON = readFileSync('./package.json', 'utf-8');
    const content = JSON.parse(contentPageJSON);
    return content.version;
  }

  public async execute() {
    const version = VersionCommand.readVersion();
    console.log(chalk.blue(`Current version of project is ${version}`));
  }
}
