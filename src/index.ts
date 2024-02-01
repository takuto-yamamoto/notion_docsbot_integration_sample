import * as fs from 'fs';
import * as path from 'path';

import { Client } from '@notionhq/client';
import { queryDB, addItemToDB } from './notion/api';
import { createInsertDataBasedOnQuery } from './notion/utils';

const configPath = path.join(__dirname, '../config/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
const notion = new Client({ auth: config.notion.apiToken });

const main = async () => {
  try {
    const queryResponse = await queryDB(notion, config.notion.sourceDBId);

    const insertData = createInsertDataBasedOnQuery(queryResponse);
    await Promise.all(
      insertData.map((row) =>
        addItemToDB(notion, config.notion.targetDBId, row)
      )
    );
  } catch (error) {
    console.error('NotionDBの統合に失敗しました');
    throw error;
  }
};

main();
