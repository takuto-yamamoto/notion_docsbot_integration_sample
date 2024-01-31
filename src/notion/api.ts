import { Client } from '@notionhq/client';
import {
  QueryDatabaseParameters,
  UpdateDatabaseParameters,
} from '@notionhq/client/build/src/api-endpoints';

export const queryNotionDB = async (params: QueryDatabaseParameters) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const response = await notion.databases.query(params);

  return response;
};

export const updateNotionDB = async (params: UpdateDatabaseParameters) => {
  const notion = new Client({ auth: process.env.NOTION_TOKEN });

  const response = await notion.databases.update(params);

  return response;
};
