const getAccount = async (dbClient, accountId) => {
  const result = await dbClient.query(`SELECT * FROM accounts WHERE account_id=${accountId}`);

  if (result.recordset.length > 0) {
    return result.recordset[0];
  } else {
    throw Error('Account not found');
  }
}

const getRegularPayments = async (dbClient, accountId) => {
  const result = await dbClient.query(`SELECT * FROM regular_payments WHERE account_id=${accountId}`);

  return result.recordset;
}

export { getAccount, getRegularPayments };