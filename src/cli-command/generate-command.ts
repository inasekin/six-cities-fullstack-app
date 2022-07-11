import got from 'got';

import {CliCommandInterface} from './cli-command.interface.js';
import {MockData} from '../types/mock-data.type.js';
import OfferGenerator from '../common/offer-generator/offer-generator.js';
import {printError, printSuccess} from './cli-functions.js';
import TSVFileWriter from '../common/file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      return console.log(printError(`Не удалось получить данные из ${url}.`));
    }

    const offerGenerator = new OfferGenerator(this.initialData);
    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGenerator.generate());
    }

    console.log(printSuccess(`Файл ${filepath} создан.`));
  }
}
