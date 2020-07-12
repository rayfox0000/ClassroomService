var env = process.env



module.exports = {
    db: {
        "host": env.HOST || "localhost",
        "user": env.USER || "root",
        "password": env.PASSWORD || "raymus123",
        "database": env.DATABASE || "classroom_service",
        "pool_size": env.POOL_SIZE || 50
    }
}