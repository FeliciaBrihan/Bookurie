import { sequelize } from "../../../global.js";



export async function setAuthorization(req, res){

    const {RolePermission} = sequelize.models

    try {
        const data = req.body
        const newRolePerm = await RolePermission.create(data)

        if (!newRolePerm) {
            return res.status(400).send({error: 'Invalid data'})
        }
        res.status(200).json({
            data: newRolePerm
        })
        
    } catch (error) {
        console.log(error)
    }


}