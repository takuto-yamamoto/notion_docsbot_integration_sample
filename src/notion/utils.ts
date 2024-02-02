import {
  CreatePageParameters,
  PageObjectResponse,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

/** オブジェクトを再帰的に探索し、id属性をundefinedにする */
const unsetIdRecursively = (obj: unknown): unknown => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(unsetIdRecursively);
  }

  return Object.entries(obj).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: key === 'id' ? undefined : unsetIdRecursively(value),
    }),
    {}
  );
};

/** クエリ結果をもとにDB追加データを作る */
export const createInsertDataBasedOnQuery = (
  response: QueryDatabaseResponse
): CreatePageParameters['properties'][] =>
  response.results.map((result) => {
    // id属性はDB固有の値でありデータコピーには不要であるため削除する
    const properties = (result as PageObjectResponse)?.['properties'];
    const formattedProperties = unsetIdRecursively(properties);

    // レスポンスのpropertiesからid属性を消せば更新用データとして許容されるため直接アサーションする
    return formattedProperties as CreatePageParameters['properties'];
  });
