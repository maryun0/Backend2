import mysql from 'mysql2/promise';

// Utilize um módulo ou escopo fechado para armazenar o pool
let pool;

export default async function conectar() {
    if (pool) return await pool.getConnection();

    pool = mysql.createPool({
        host: 'localhost',
        user: 'usuario_app', // Usuário específico para a aplicação
        password: 'senha_segura', // Senha segura
        port: 3306,
        database: 'backend2',
        waitForConnections: true,
        connectionLimit: 10,
        idleTimeout: 360000, // Tempo limite para conexões ociosas
        queueLimit: 0,
    });

    return await pool.getConnection();
}
