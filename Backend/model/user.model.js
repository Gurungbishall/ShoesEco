import jwt from 'jsonwebtoken';



const generateAccessToken = (user) => {
   return jwt.sign({id: user.customer_id, isAdmin: user.is_admin}, "MySecretKey",{expiresIn: "15m"});
  }

const generateRefreshToken = (user) => {
    return jwt.sign({id: user.customer_id, isAdmin: user.is_admin}, "MyRefreshSecretKey",{expiresIn: "15m"});
}
  
const refreshToken = async (req, res) => {
    const refreshToken = req.cookies.refresh_token;
  
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not provided" });
    }
  
    try {
   
      jwt.verify(refreshToken, "MyRefreshSecretKey", (err, user) => {
        if (err) {
          console.log(err);
          return res.status(403).json({ message: "Invalid refresh token" });
        }
  
        const newAccessToken = generateAccessToken(user);
        const newRefreshToken = generateRefreshToken(user);
  
        res.cookie("refresh_token", newRefreshToken, {
            httpOnly: true,  
            secure: true,   
            sameSite: 'None', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        });
  
        res.status(200).json({
          name: user.full_name,
          user_id: user.customer_id,
          is_admin: user.is_admin,
          accessToken: newAccessToken,  
          refreshToken: newRefreshToken,
        });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

export {generateAccessToken, generateRefreshToken, refreshToken};