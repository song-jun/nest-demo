const { Model, DataTypes, QueryTypes } = require('sequelize');
import { log } from '../utils/chalk';

// 创建登录用户
const NAME = 'root';
const PASSWORD = '123456';
const defaultList = [
  'blog',
  'comment',
  'filedata',
  'leaveword',
  'muban',
  'nest',
  'person',
  'test',
  'user',
  'users',
  'visit',
];

export const User = async (sequelize) => {
  // 模型实例创建table
  const user = sequelize.define(
    'user',
    {
      name: DataTypes.TEXT,
      favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green',
      },
      age: DataTypes.INTEGER,
      cash: DataTypes.INTEGER,
    },
    {
      // freezeTableName: true，表示是否需要自动复数表名，true表示不需要
      freezeTableName: true,
    },
  );
  const nest = sequelize.define(
    'nest',
    {
      name: DataTypes.TEXT,
      favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green',
      },
      age: DataTypes.INTEGER,
      cash: DataTypes.INTEGER,
    },
    {
      // freezeTableName: true，表示是否需要自动复数表名，true表示不需要
      freezeTableName: true,
    },
  );
  // 销毁 / 删除记录;
  const destroyTable = async (name) => {
    await name.destroy({
      // 筛选条件
      where: {},
      // 如果将此参数设置为true，则可以直接清空记录表
      truncate: true,
    });
  };
  const deleteAll = async (name: any) => {
    if (name) {
      // 删除某张表
      name.drop();
    } else {
      // 删除数据库所有表
      sequelize.drop();
    }
  };
  // 原始sql删除
  const dropAll = async (list = defaultList) => {
    if (list.length === 0) return;
    let str = `DROP TABLE IF EXISTS ${list.join(',')}`;
    await sequelize.query(str);
    log.blue(`删除${list.join(',')}等${list.length}个表成功`);
  };
  (async () => {
    //带{ force: true }参数则表示，原表存在需要删除原表
    log.blue(QueryTypes);
    await user.sync({ force: true });
    await nest.sync({ force: true });
    // await dropAll();
  })();
  // 原始创建table
  await sequelize.query(
    'CREATE TABLE IF NOT EXISTS person(userId smallint(6) unsigned NOT NULL auto_increment,user varchar(255),password varchar(255),tel varchar(255),email varchar(255),nickname varchar(255),robotname varchar(255),qq varchar(255),img varchar(255),name varchar(255),visitNum int(10),PRIMARY KEY (`userId`)) ENGINE=InnoDB DEFAULT CHARSET=gbk',
  );
  log.blue('person表创建成功');
  let str = `INSERT INTO person(user,password) VALUES('${NAME}','${PASSWORD}');`;
  await sequelize.query(str);
  // await sequelize.query(`INSERT INTO person(user,password) VALUES ($1,$2);`, {
  //   bind: [NAME, PASSWORD],
  //   type: QueryTypes.INSERT,
  // });
  log.blue('person初始化成功');
  await sequelize.query(
    'CREATE TABLE IF NOT EXISTS blog(blogId smallint(6) unsigned NOT NULL auto_increment,id varchar(255),name varchar(255),memo varchar(255),type varchar(255),time varchar(255),text longtext,md longtext,comment varchar(255),star int(10),PRIMARY KEY (`blogId`) ) ENGINE=InnoDB DEFAULT CHARSET=gbk',
  );
    log.blue('blog表创建成功');
   await sequelize.query(
      'CREATE TABLE IF NOT EXISTS muban(mubanId smallint(6) unsigned NOT NULL auto_increment,id varchar(255),name varchar(255),mubanUrl varchar(255),type varchar(255),time varchar(255),text longtext,md longtext,comment varchar(255),star int(10),PRIMARY KEY (`mubanId`) ) ENGINE=InnoDB DEFAULT CHARSET=gbk',
    );
    log.blue('muban表创建成功');
   await sequelize.query(
      'CREATE TABLE IF NOT EXISTS comment(commentId smallint(6) unsigned NOT NULL auto_increment,id varchar(255) ,blogId varchar(255),text varchar(255),PRIMARY KEY (`commentId`)) ENGINE=InnoDB DEFAULT CHARSET=gbk',
    );
    log.blue('comment表创建成功');
   await sequelize.query(
      'CREATE TABLE IF NOT EXISTS leaveword(lwId smallint(6) unsigned NOT NULL auto_increment,id varchar(255),name varchar(255),time varchar(255),text varchar(255),PRIMARY KEY(`lwId`)) ENGINE=InnoDB DEFAULT CHARSET=gbk',
    );
    log.blue('leaveword表创建成功');
   await sequelize.query(
      'CREATE TABLE IF NOT EXISTS visit(id smallint(6) unsigned NOT NULL auto_increment,name varchar(255),type varchar(255),ip varchar(255),address varchar(255),time int(100),PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=gbk',
    );
    log.blue('visit表创建成功');
   await sequelize.query(
      'CREATE TABLE IF NOT EXISTS filedata(id smallint(6) unsigned NOT NULL auto_increment,path varchar(255),name varchar(255),str LONGTEXT,type varchar(255),cur int(100),PRIMARY KEY(`id`)) ENGINE=InnoDB DEFAULT CHARSET=gbk',
    );
    log.blue('filedata表创建成功');
};
