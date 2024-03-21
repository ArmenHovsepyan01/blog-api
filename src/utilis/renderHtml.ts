import path from 'path';
import fs from 'fs/promises';
import hbs from 'handlebars';

export async function renderHtml(template_name: string, data: any) {
  try {
    const templates_path = path.resolve('./views');

    const template_path = path.join(templates_path, template_name);
    const template = await fs.readFile(template_path, 'utf-8');

    const compliedHtml = hbs.compile(template);

    return compliedHtml(data);
  } catch (e) {
    throw new Error(e);
  }
}
