const joi = require("joi");
const path = require("path");
const dotenv = require("dotenv")
const DEFAULT_WALLET_MONEY = 500;
const DEFAULT_ADDRESS = 'ADRESS_NOT_SET';
const DEFAULT_PAYMENT_OPTION = "PAYMENT_OPTION_DEFAULT"

dotenv.config({path: path.join(__dirname, "../.env")});

const envVarsSchema = joi.object().keys({
    PORT: joi.number().default(3000),
    MONGODB_URL: joi.string().required().description("Mongo db url"),
    JWT_SECRET: joi.string().required().description("JWT Secret Key"),
    JWT_ACCESS_EXPIRATION_MINUTES: joi.number().default(30).description("Minutes after which token expires")
}).unknown()

const {value:envVars, error} = envVarsSchema.prefs({errors: {label: "key"}}).validate(process.env)
if(error) {
    throw new Error("Config validation error: ", error.message)
}
module.exports  = {
    port: envVars.PORT,
    mongoose: {
        url: envVars.MONGODB_URL
    },
    default_wallet_money: DEFAULT_WALLET_MONEY,
    default_address: DEFAULT_ADDRESS,
    default_payment_option: DEFAULT_PAYMENT_OPTION,
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES
    }
}