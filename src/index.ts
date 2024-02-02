import * as fs from 'fs';
import * as path from 'path';

import { Client } from '@notionhq/client';
import { queryDB, addItemToDB } from './notion/api';
import { createInsertDataBasedOnQuery } from './notion/utils';

const configPath = path.join(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const { apiToken, sourceDBId, targetDBId } = config.notion;

const main = async () => {
  try {
    const notion = new Client({ auth: apiToken });

    const queryResponse = await queryDB(notion, sourceDBId);
    console.log('データのクエリが完了しました！');

    const insertRows = createInsertDataBasedOnQuery(queryResponse);
    await Promise.all(
      insertRows.map((row) => addItemToDB(notion, targetDBId, row))
    );
    console.log('データの追加が完了しました！');
  } catch (error) {
    console.error('NotionDBのデータコピーに失敗しました');
    throw error;
  }
};

main();
