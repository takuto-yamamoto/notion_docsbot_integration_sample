import {
  QueryDatabaseParameters,
  CreatePageParameters,
} from '@notionhq/client/build/src/api-endpoints';
import { Client } from '@notionhq/client';

export const queryDB = async (client: Client, databaseId: string) => {
  try {
    const queryParams: QueryDatabaseParameters = {
      database_id: databaseId,
      filter: {
        and: [{ property: '日付', date: { before: '2024-02-03' } }],
      },
    };
    const response = await client.databases.query(queryParams);

    return response;
  } catch (error) {
    console.error('NotionDBのクエリに失敗しました');
    throw error;
  }
};

export const addItemToDB = async (
  client: Client,
  databaseId: string,
  rowData: CreatePageParameters['properties']
) => {
  try {
    const createParams: CreatePageParameters = {
      parent: { database_id: databaseId },
      properties: rowData,
    };
    const response = await client.pages.create(createParams);

    return response;
  } catch (error) {
    console.error('NotionDBの更新に失敗しました');
    throw error;
  }
};
