class ExpiredTokken extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Expired Tokken";
  }
}
class VerrificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Verrification Error";
  }
}
class JwtWrongFormat extends Error {
  constructor(message: string) {
    super(message);
    this.name = "jwt wrong format";
  }
}

export { ExpiredTokken, VerrificationError, JwtWrongFormat };
