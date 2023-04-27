const errorMessage = {
  authenticationError: `Authentication Error`,
  authorizationError: [
    `유효하지 않은 인증정보입니다.`,
    `로그인이 필요합니다.`,
    `이메일 또는 비밀번호가 일치하지 않습니다.`,
    `비밀번호가 일치하지 않습니다.`,
  ],
  forbiddenError: `인증되지 않은 토큰입니다.`,
  conflictError: `이미 가입된 사용자입니다.`,
  inputError: `Input Error`,
  argumentError: `Argument Error`,
  businessError: `Business Error`,
  configError: `Config Error`,
  databaseError: `DB Error`,
  fatalError: `Fatal Error`,
  objectCreationError: `Object Creation Error`,
  resourceNotFoundError: `Resource Not Found Error`,
  resourceDuplicationError: `Resource Duplication Error`,
  remoteStorageError: `Remote Storage Error`,
  requestValidationError: `Request Validation Error`,
};

export { errorMessage };
