// eslint-disable-next-line
export default async function({ field, card }) {
  let foreignKey = await field.value('foreignKey');
  let foreignType = await field.value('foreignType');
  try {
    let found = await card.reader.search({
      filter: {
        type: { csRealm: foreignType.csRealm, csId: foreignType.csId },
        eq: {
         [foreignKey + '.csId']:  card.csId,
         [foreignKey + '.csRealm']:  card.csRealm,
         [foreignKey + '.csOriginalRealm']:  card.csOriginalRealm
        },
      },
    });
    return { value: found.cards };
  } catch (err) {
    return { value: [] };
  }
}
