const sequelize = require( "../../db/db")
const { users } = sequelize.models

export const onlyAdmin = (errorHandler) =>
  async (ctx, next) => {

    // No chat = no service
    if (!ctx.chat) {
      return
    }

    // Surely not an admin
    if (!ctx.from?.id) {
      return
    }
    // find user
    const user = await users.findOne({
      where: {
        telegram_id: ctx.from.id
      },
      raw: true
    })
    // check role
    if(user.role == 2){
      return next()
    }

    // Not an admin
    return errorHandler?.(ctx)
  }