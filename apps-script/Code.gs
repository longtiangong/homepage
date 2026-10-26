function doGet() {
  return HtmlService.createHtmlOutputFromFile('AdminPortal')
    .setTitle('行政系統');
}

function verifyAdminPassword(password) {
  var configuredPassword = PropertiesService.getScriptProperties()
    .getProperty('ADMIN_PASSWORD');

  if (!configuredPassword) {
    throw new Error('管理密碼尚未設定，請聯絡系統管理者。');
  }

  var userKey = Session.getTemporaryActiveUserKey();
  if (!userKey) {
    throw new Error('無法識別此登入要求，請稍後再試。');
  }

  var cache = CacheService.getScriptCache();
  var cacheKey = 'admin-login:' +
    Utilities.base64EncodeWebSafe(
      Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, userKey)
    );
  var lock = LockService.getScriptLock();
  lock.waitLock(5000);

  try {
    var attempts = Number(cache.get(cacheKey) || '0');
    if (attempts >= 5) {
      throw new Error('登入嘗試次數過多，請 15 分鐘後再試。');
    }

    if (typeof password === 'string' &&
        password.length > 0 &&
        password === configuredPassword) {
      cache.remove(cacheKey);
      return true;
    }

    cache.put(cacheKey, String(attempts + 1), 900);
    return false;
  } finally {
    lock.releaseLock();
  }
}
