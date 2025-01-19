
const DeleteUser = async (req, res) => {
    if (req.user.user_id == req.params.customer_id || req.user.is_admin) {
        res.status(200).json("User has been deleted.");
    } else {
        res.status(403).json("You are not allowed to perform this action");
    }
};


export {DeleteUser};