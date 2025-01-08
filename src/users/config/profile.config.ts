import { registerAs } from "@nestjs/config";

export default registerAs('profileconfig',() => ({
    apiKey: process.env.PROFILE_API_KEY,
}));