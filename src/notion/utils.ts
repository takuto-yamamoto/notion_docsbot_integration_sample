import {
  CreatePageParameters,
  QueryDatabaseResponse,
} from '@notionhq/client/build/src/api-endpoints';

/** オブジェクトを再帰的に探索し、id属性をundefinedにする */
export const unsetIdRecursively = (obj: unknown) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return unsetIdRecursively(obj);
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
  response.results.map((result) => unsetIdRecursively(result?.['properties']));
