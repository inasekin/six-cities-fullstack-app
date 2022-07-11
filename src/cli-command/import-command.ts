import {CliCommandInterface} from './cli-command.interface.js';
import TSVFileReader from '../common/file-reader/tsv-file-reader.js';
import {createOffer, getErrorMessage, printError, printSuccess} from './cli-functions.js';
import {getURI} from '../utils/db.js';
import {UserServiceInterface} from '../modules/user/user-service.interface.js';
import {OfferServiceInterface} from '../modules/offer/offer-service.interface.js';
import {DatabaseInterface} from '../common/database-client/database.interface.js';
import {LoggerInterface} from '../common/logger/logger.interface.js';
import {CityServiceInterface} from '../modules/city/city-service.interface.js';
import {BuildingTypeServiceInterface} from '../modules/building-type/building-type-service.interface.js';
import {GoodServiceInterface} from '../modules/good/good-service.interface.js';
import ConsoleLoggerService from '../common/logger/console-logger.service.js';
import OfferService from '../modules/offer/offer-service.js';
import {OfferModel} from '../modules/offer/offer.entity.js';
import BuildingTypeService from '../modules/building-type/building-type.service.js';
import {BuildingTypeModel} from '../modules/building-type/building-type.entity.js';
import {CityModel} from '../modules/city/city.entity.js';
import DatabaseService from '../common/database-client/database.service.js';
import UserService from '../modules/user/user.service.js';
import {UserModel} from '../modules/user/user.entity.js';
import {GoodModel} from '../modules/good/good.entity.js';
import CityService from '../modules/city/city.service.js';
import GoodService from '../modules/good/good.service.js';
import {Offer} from '../types/offer.type.js';

const DEFAULT_DB_PORT = 27017;
const DEFAULT_USER_PASSWORD = '123456';

class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private buildingTypeService!: BuildingTypeServiceInterface;
  private cityService!: CityServiceInterface;
  private goodService!: GoodServiceInterface;
  private offerService!: OfferServiceInterface;
  private databaseService!: DatabaseInterface;
  private logger: LoggerInterface;
  private saltRounds!: number;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onComplete = this.onComplete.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.buildingTypeService = new BuildingTypeService(this.logger, BuildingTypeModel);
    this.cityService = new CityService(this.logger, CityModel);
    this.goodService = new GoodService(this.logger, GoodModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new DatabaseService(this.logger);
  }

  private async saveOffer(offer: Offer) {
    const goods = [];
    const type = await this.buildingTypeService.findOrCreate({name: offer.type});
    const city = await this.cityService.findOrCreate({
      name: offer.city.name,
      longitude: offer.location.longitude,
      latitude: offer.city.location.latitude
    });
    const user = await this.userService.findOrCreate({
      ...offer.host,
      password: DEFAULT_USER_PASSWORD
    }, this.saltRounds);

    for (const name of offer.goods) {
      const existGood = await this.goodService.findOrCreate({name});
      goods.push(existGood.id);
    }

    this.offerService.create({
      ...offer,
      type: type.id,
      city: city.id,
      goods,
    }, user.id);
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    await this.saveOffer(offer);
    resolve();
  }

  private onComplete(count: number) {
    this.logger.info(printSuccess(`Импортировано предложений: ${count}.`));
    this.databaseService.disconnect();
  }

  public async execute(fileName = '', login: string, password: string, host: string, dbname: string, saltRounds: string) {
    const uri = getURI(login, password, host, DEFAULT_DB_PORT, dbname, {authSource: login});
    this.saltRounds = +saltRounds;

    await this.databaseService.connect(uri);

    const fileReader = new TSVFileReader(fileName.trim());
    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onComplete);

    try {
      await fileReader.read();
    } catch (err) {
      this.logger.error((printError(`Не удалось импортировать данные из файла по причине: ${getErrorMessage(err)}`)));
    }
  }
}

export default ImportCommand;
