module.exports = async function({ field, card }) {
  console.log("HERE")
  let foreignKey = await field.value('foreignKey');
  let foreignType = await field.value('foreignType');
  try {
    let found = await card.reader.search({
      filter: {
        type: foreignType,
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
