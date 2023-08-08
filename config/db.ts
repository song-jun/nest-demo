const productConfig = {
  mysql: {
    port: '7084',
    host: 'containers-us-west-139.railway.app',
    user: 'root',
    password: 'tS91dkC4aYBDzKZEM587',
    database: 'railway', // 库名
    connectionLimit: 10, // 连接限制
  },
};
const localConfig = {
  mysql: {
    port: '3306',
    host: 'localhost',
    user: 'nest',
    password: '123456',
    database: 'nest', // 库名
    connectionLimit: 10, // 连接限制
  },
};
// 本地运行是没有 process.env.NODE_ENV 的，借此来区分[开发环境]和[生产环境]
const config = process.env.NODE_ENV ? productConfig : productConfig;

export default config;
