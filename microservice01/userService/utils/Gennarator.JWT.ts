import { user } from "./interfaces/user";
import { sign, verify } from "jsonwebtoken";
import { readFileSync } from "fs";
import { VerrificationError, ExpiredTokken, JwtWrongFormat } from "./error";
import path from "path";
const pathToPKey = path.join(__dirname, "../config/keys/public.pem");
const Pub_KEY = readFileSync(pathToPKey, "utf8");

const pathToKey = path.join(__dirname, "../config/keys/private.pem");
const PRIV_KEY = readFileSync(pathToKey, "utf8");

/**
 * issueJWTfoRLoginINourServices
 * @param user
 * @returns
 */
//? why do this  i already do it with google jwt
//& to increasse or decrese singing time and sign his  id  based  in our db
function issueJWT(user: user): {
  expires: string;
  token: string;
} {
  const _id = user.user_id; //id in our DBS

  const expiresIn = "4h";

  const payload: { sub: string; iat: number; exp: number } = {
    sub: _id,
    iat: Date.now() / 1000,
    exp: Date.now() / 1000 + 60 * 60 * 4, // 4 hours
  };

  const signedToken = sign(payload, PRIV_KEY, {
    algorithm: "RS512",
  });

  console.log(signedToken);
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
/**
 * verifyJET
 * @param token string
 * @returns user_id if token is valid
 */
function verifyJWT(token: string): string {
  try {
    const tokenParts = token.split(" ");

    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      const jwtToken = tokenParts[1];

      try {
        const verification = verify(jwtToken, Pub_KEY, {
          algorithms: ["RS512"],
        });

        const jwtPayload = verification as {
          sub: string;
          iat: number;
          exp: number;
        };

        if (jwtPayload.iat < jwtPayload.exp) {
          // Token is valid, continue processing
          return jwtPayload.sub;
        } else {
          throw new ExpiredTokken("");
        }
      } catch (err) {
        throw new VerrificationError("");
      }
    } else {
      throw new JwtWrongFormat("");
    }
  } catch (err) {
    throw err;
  }
}
export { issueJWT, verifyJWT };
