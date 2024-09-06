const jwt = require("jsonwebtoken");

const jwtConfig = { expiresIn: "2h" };

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            jwtConfig,
            (err, token) => {
                if (err) {
                    console.log(err);
                    reject("Error generating JWT");
                }

                resolve(token);
            }
        );
    });
};

module.exports = { generateJWT };
