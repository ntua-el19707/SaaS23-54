import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.client_id);
interface response {
  valid: boolean;
  userEmail?: string | undefined;
}
async function validateGoogleToken(token: string): Promise<response> {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.client_id, // The audience should be the client ID of your app
    });

    const payload = ticket.getPayload();
    if (payload) {
      const userId = payload.sub;
      const userEmail: string | undefined = payload.email;
      if (userEmail) {
        return { valid: true, userEmail: userEmail };
      }
    }
    return { valid: false };
    // Perform any additional validation of the payload if needed
  } catch (error) {
    console.error(`Error validating Google token: ${error}`);
    return { valid: false };
  }
}
export { validateGoogleToken };
