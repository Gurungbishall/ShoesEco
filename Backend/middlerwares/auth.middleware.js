import jwt from 'jsonwebtoken';



const AdminVerify = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(" ")[1];

        jwt.verify(token, "MysecretKey", (err, user) => {
            if (err) {
                return res.status(401).json("Token is not valid");
            }
            req.user = user;
            next();
        });

    } else {
        res.status(401).json("You are not authorized");
    }
};

export { AdminVerify };

