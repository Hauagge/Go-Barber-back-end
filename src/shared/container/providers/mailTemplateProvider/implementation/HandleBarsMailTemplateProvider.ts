import handlebars from 'handlebars';
import fs from 'fs';
import IParseMailTemplateDTOS from '../dtos/IParseMailTemplateDTOS';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class HandleBarsEmailTemplateProvider
  implements IMailTemplateProvider {
  public async parse({
    file,
    variables,
  }: IParseMailTemplateDTOS): Promise<string> {
    const template = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = handlebars.compile(template);
    return parseTemplate(variables);
  }
}
