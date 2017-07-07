/*
Navicat MySQL Data Transfer

Source Server         : weicai
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : wecai

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2017-05-08 18:00:48
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for access
-- ----------------------------
DROP TABLE IF EXISTS `access`;
CREATE TABLE `access` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '权限id',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `gid` int(10) unsigned NOT NULL COMMENT '组id  也可以看做角色id',
  `read` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '查看权限  0 不能查看   1可以查看',
  `update` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '修改自己的商品权限',
  `delete` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '删除自己的商品权限',
  `buy` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '购买权限',
  `issued` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '发布商品权限',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='权限表';

-- ----------------------------
-- Records of access
-- ----------------------------

-- ----------------------------
-- Table structure for check_user_status
-- ----------------------------
DROP TABLE IF EXISTS `check_user_status`;
CREATE TABLE `check_user_status` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT COMMENT 'id',
  `author_id` int(12) unsigned NOT NULL,
  `type` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '1 用户  2 物品',
  `aid` int(12) unsigned NOT NULL COMMENT '用户id或者物品id',
  `check_time` datetime NOT NULL COMMENT '审核时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '0 审核不通过   1 审核通过',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=40 DEFAULT CHARSET=gbk COMMENT='用户审核状态表';

-- ----------------------------
-- Records of check_user_status
-- ----------------------------
INSERT INTO `check_user_status` VALUES ('28', '113', '1', '112', '2017-04-12 11:00:00', '1');
INSERT INTO `check_user_status` VALUES ('29', '113', '1', '113', '2017-04-01 01:16:10', '1');
INSERT INTO `check_user_status` VALUES ('37', '113', '1', '119', '2017-04-27 17:35:44', '1');
INSERT INTO `check_user_status` VALUES ('36', '113', '1', '118', '2017-04-27 17:35:35', '1');
INSERT INTO `check_user_status` VALUES ('38', '113', '1', '120', '2017-04-27 17:39:40', '0');
INSERT INTO `check_user_status` VALUES ('39', '113', '1', '121', '2017-04-27 17:53:11', '0');

-- ----------------------------
-- Table structure for coll
-- ----------------------------
DROP TABLE IF EXISTS `coll`;
CREATE TABLE `coll` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '收藏记录id',
  `uid` int(10) unsigned NOT NULL COMMENT '用户的id',
  `gid` int(10) unsigned NOT NULL COMMENT '商品id',
  `create_time` datetime NOT NULL COMMENT '收藏时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态:  0 删除   1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='收藏表';

-- ----------------------------
-- Records of coll
-- ----------------------------
INSERT INTO `coll` VALUES ('1', '113', '38', '2017-04-28 14:46:02', '1');
INSERT INTO `coll` VALUES ('3', '113', '40', '2017-04-28 15:07:06', '1');
INSERT INTO `coll` VALUES ('4', '112', '50', '2017-04-28 18:28:46', '1');
INSERT INTO `coll` VALUES ('5', '113', '49', '2017-05-03 13:25:14', '1');
INSERT INTO `coll` VALUES ('6', '119', '37', '2017-05-07 16:40:31', '1');
INSERT INTO `coll` VALUES ('7', '113', '50', '2017-05-07 16:45:15', '1');
INSERT INTO `coll` VALUES ('8', '112', '44', '2017-05-08 17:46:20', '1');
INSERT INTO `coll` VALUES ('9', '112', '35', '2017-05-08 17:46:23', '1');

-- ----------------------------
-- Table structure for comm
-- ----------------------------
DROP TABLE IF EXISTS `comm`;
CREATE TABLE `comm` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '评价信息id',
  `uid` int(10) unsigned NOT NULL COMMENT '评价人id',
  `oid` int(10) unsigned NOT NULL COMMENT '订单id',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级评价id',
  `level` int(8) unsigned NOT NULL DEFAULT '3' COMMENT '评价等级  1 好拼',
  `content` varchar(255) NOT NULL COMMENT '评价内容',
  `create_time` datetime NOT NULL COMMENT '评价时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态: 0 删除  1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='评价表';

-- ----------------------------
-- Records of comm
-- ----------------------------
INSERT INTO `comm` VALUES ('1', '112', '5', '0', '1', '这裙子很漂亮，女朋友很喜欢，穿着也很漂亮', '2017-05-08 13:30:51', '1');
INSERT INTO `comm` VALUES ('2', '119', '4', '0', '2', '物流太慢了，裙子质量一般般', '2017-05-08 13:42:07', '1');
INSERT INTO `comm` VALUES ('3', '112', '6', '0', '1', '已经是第二次购买了，质量很好，喜欢的赶紧下手吧', '2017-05-08 14:27:58', '1');
INSERT INTO `comm` VALUES ('4', '118', '9', '0', '3', '感觉没有想象中的好，服务态度也不好，物流又慢。', '2017-05-08 14:36:11', '1');

-- ----------------------------
-- Table structure for follow_school
-- ----------------------------
DROP TABLE IF EXISTS `follow_school`;
CREATE TABLE `follow_school` (
  `uid` int(8) unsigned NOT NULL COMMENT '关注人',
  `sid` int(8) unsigned NOT NULL COMMENT '被关注学校',
  `create_time` datetime NOT NULL COMMENT '关注时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='关注学校表';

-- ----------------------------
-- Records of follow_school
-- ----------------------------
INSERT INTO `follow_school` VALUES ('113', '30', '2017-04-28 14:45:33');
INSERT INTO `follow_school` VALUES ('113', '23', '2017-04-28 14:57:04');
INSERT INTO `follow_school` VALUES ('112', '30', '2017-04-28 18:28:52');
INSERT INTO `follow_school` VALUES ('113', '31', '2017-05-07 13:43:22');

-- ----------------------------
-- Table structure for follow_student
-- ----------------------------
DROP TABLE IF EXISTS `follow_student`;
CREATE TABLE `follow_student` (
  `uid` int(8) unsigned NOT NULL COMMENT '关注人',
  `to_uid` int(8) unsigned NOT NULL COMMENT '被关注人',
  `create_time` datetime NOT NULL COMMENT '关注时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='关注学生表';

-- ----------------------------
-- Records of follow_student
-- ----------------------------
INSERT INTO `follow_student` VALUES ('113', '119', '2017-04-28 14:51:02');
INSERT INTO `follow_student` VALUES ('113', '118', '2017-04-28 14:57:06');
INSERT INTO `follow_student` VALUES ('112', '119', '2017-04-28 18:28:48');
INSERT INTO `follow_student` VALUES ('113', '112', '2017-05-07 13:43:12');
INSERT INTO `follow_student` VALUES ('112', '113', '2017-05-08 13:43:53');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '商品id',
  `uid` int(10) unsigned NOT NULL COMMENT '创建该商品的用户id',
  `typeid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品类型  默认：0   0：其他',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '商品名字',
  `tag` int(8) unsigned NOT NULL COMMENT '标签',
  `originalprice` decimal(10,0) unsigned NOT NULL COMMENT '原价',
  `price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '价格',
  `number` int(32) unsigned NOT NULL DEFAULT '0' COMMENT '库存',
  `image` varchar(535) NOT NULL DEFAULT '' COMMENT '图片地址，允许多张逗号分割',
  `notice` varchar(255) NOT NULL COMMENT '注意事项',
  `caption` varchar(255) NOT NULL DEFAULT '' COMMENT '商品介绍',
  `update_time` datetime NOT NULL COMMENT '更新商品信息时间',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态  0 删除  1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8 COMMENT='商品表';

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('35', '113', '58', '蓝色连衣裙', '1', '200', '129.00', '4', '/upload/files/149328810882536.jpg,/upload/files/149328810883073.jpg,/upload/files/149328810883450.jpg,/upload/files/149328810883788.jpg,/upload/files/149328810884296.jpg,/upload/files/149328810884666.jpg,/upload/files/149328810884977.jpg,/upload/files/149', '微信付款', '非常好看', '2017-04-27 18:15:08', '2017-04-27 18:15:08', '1');
INSERT INTO `goods` VALUES ('36', '113', '58', '绿色连衣裙', '2', '300', '229.00', '1', '/upload/files/149328868315213.jpg,/upload/files/149328868315529.jpg,/upload/files/149328868315985.jpg,/upload/files/149328868316152.jpg,/upload/files/149328868316498.jpg,/upload/files/149328868316785.jpg,/upload/files/14932886831703.jpg,/upload/files/1493', '支付宝', '自己买的，还没穿', '2017-04-27 18:24:43', '2017-04-27 18:24:43', '1');
INSERT INTO `goods` VALUES ('37', '113', '58', '黑色连衣裙', '1', '100', '50.00', '493', '/upload/files/149328876648765.jpg,/upload/files/14932887664844.jpg,/upload/files/149328876648911.jpg,/upload/files/149328876649478.jpg,/upload/files/149328876649777.jpg,/upload/files/149328876650071.jpg,/upload/files/149328876650297.jpg,/upload/files/1493', '支付宝', '美美地', '2017-04-27 18:26:06', '2017-04-27 18:26:06', '1');
INSERT INTO `goods` VALUES ('38', '112', '72', 'T恤', '1', '100', '29.00', '160', '/upload/files/149334476792914.jpg,/upload/files/149334476793246.jpg,/upload/files/149334476793542.jpg,/upload/files/149334476795887.jpg,/upload/files/149334476796161.jpg,/upload/files/149334476796440.jpg,/upload/files/149334476796769.jpg', '支付宝', '送男友', '2017-04-28 09:59:27', '2017-04-28 09:59:27', '1');
INSERT INTO `goods` VALUES ('39', '112', '77', 'ipad air2(64G插卡版，全网通4G版)金色', '2', '3418', '2698.00', '1', '/upload/files/149334633905721.jpg,/upload/files/149334633906028.jpg,/upload/files/149334633906367.jpg,/upload/files/149334633906621.jpg,/upload/files/149334633906916.jpg,/upload/files/149334633907248.jpg,/upload/files/149334633907711.jpg', '广州番禺面交', 'ipad air2(64G插卡版，全网通4G)金色，机子成色很好，wifi插卡各项功能非常完美，支持移动联通电信三网4G，指纹灵敏，运行流畅，看电影玩游戏听音乐体验非常好，无id锁，绝无任何暗病，2698出。', '2017-04-28 10:25:39', '2017-04-28 10:25:39', '1');
INSERT INTO `goods` VALUES ('40', '112', '47', '最新计算机考研包邮操作系统4版网络6 +组成原理2+数据结构 二手', '2', '200', '44.00', '1', '/upload/files/149334788085743.jpg,/upload/files/149334788085943.jpg,/upload/files/149334788086270.jpg,/upload/files/149334788086584.jpg,/upload/files/149334788086775.jpg,/upload/files/149334788087055.jpg,/upload/files/149334788087341.jpg', '24小时内发货，不用问有没有，包邮不包邮，在不在之类的问题', '所有书在架的，都可以直接拍，谢谢送2018考研408计算机全套复习视频资料～确认收货找我要 二手8新，少量笔记，介意请别拍哈。择优发货！！每天18:00发货，别催，谢谢。。 全部为正版二手八成新左右，有少量笔记，不影响阅读，无破损，无缺页少页。一套共四本。分别为：一 计算机操作系统（第四版）（汤小丹）二 计算机网络（第6版）（谢希仁）9787121201677  三 数据结构（C语言版） （严蔚敏）9787302147510  四 计算机组成原理第二版 （唐塑飞）9787040223903 ', '2017-04-28 10:51:20', '2017-04-28 10:51:20', '1');
INSERT INTO `goods` VALUES ('43', '118', '77', '#iPhone#女生苹果64g玫瑰金iphone6splus', '2', '4689', '3428.00', '1', '/upload/files/149335007547482.jpg,/upload/files/149335007547785.jpg,/upload/files/149335007547997.jpg,/upload/files/149335007548244.jpg,/upload/files/149335007548529.jpg,/upload/files/14933500754890.jpg,/upload/files/149335007549250.jpg', '最好面交，十分相处的也可快递！！', '玫瑰金转让转让一台5.5寸玫粉色6splus，全网通无id无锁无卡贴，一开始就360度全面保护的， 所以成色新的不可以再新 达到9.6新。边角 侧部 背面 没有一处瑕疵，脱壳卸膜看起来就是新机一样。移动联通电信4g随便连。每一样都很正常，指纹一触即解。定价准确 可支持任何验机，本人绝不售假，机子好的让人喜欢，没有暗病和问题，拍照清晰高清。', '2017-04-28 11:27:55', '2017-04-28 11:27:55', '1');
INSERT INTO `goods` VALUES ('44', '118', '49', '四级 六级词汇', '2', '86', '25.00', '0', '/upload/files/149335037110991.jpg,/upload/files/149335037111237.jpg', '包邮', '有光碟', '2017-04-28 11:32:51', '2017-04-28 11:32:51', '1');
INSERT INTO `goods` VALUES ('49', '119', '86', '云南白药牙膏留兰香型180g减轻牙龈出血祛除口腔异味 ', '1', '35', '28.00', '500', '/upload/files/149335245772660.jpg,/upload/files/149335245773040.jpg,/upload/files/149335245773250.jpg,/upload/files/149335245773513.jpg,/upload/files/149335245773772.jpg,/upload/files/149335245774026.jpg,/upload/files/14933524577426.jpg,/upload/files/149335245774546.jpg,/upload/files/14933524577471.jpg,/upload/files/149335245775030.jpg', '支付宝', '正品 减轻牙龈出血 修复粘膜损 祛除口腔异味', '2017-04-28 12:07:37', '2017-04-28 12:07:37', '1');
INSERT INTO `goods` VALUES ('50', '119', '86', '纳美洁白牙膏帮助减轻烟渍黄牙渍清新口气小苏打牙膏包邮共230g ', '1', '68', '18.00', '13783', '/upload/files/149335277661785.jpg,/upload/files/149335277661951.jpg,/upload/files/14933527766220.jpg,/upload/files/149335277662571.jpg,/upload/files/149335277662873.jpg,/upload/files/149335277663184.jpg,/upload/files/149335277663460.jpg,/upload/files/149335277663770.jpg,/upload/files/149335277664031.jpg,/upload/files/149335277664421.jpg', '微信', '买160g 牙膏送70g 牙膏 ', '2017-04-28 12:12:56', '2017-04-28 12:12:56', '1');
INSERT INTO `goods` VALUES ('51', '119', '83', '转让大容量全自动洗衣机', '2', '1000', '379.00', '1', '/upload/files/149335295514127.jpg,/upload/files/149335295514513.jpg', '附近可以帮送一下', '搬家转让惠而浦6.5公斤的全自动洗衣机，手搓试洗衣服干净，力道大，不锈钢内胆。', '2017-04-28 12:15:55', '2017-04-28 12:15:55', '1');

-- ----------------------------
-- Table structure for goods_type
-- ----------------------------
DROP TABLE IF EXISTS `goods_type`;
CREATE TABLE `goods_type` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名字',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级分类id',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '分类说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态: 0 删除  1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=107 DEFAULT CHARSET=utf8 COMMENT='商品类型表';

-- ----------------------------
-- Records of goods_type
-- ----------------------------
INSERT INTO `goods_type` VALUES ('4', '鞋帽', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('5', '文化体育', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('6', '百货', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('7', '女装', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('8', '化妆品', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('9', '男装', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('10', '图书', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('11', '食品饮品', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('12', '数码家电', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('13', '日用品', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('14', '电脑', '0', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('15', '皮鞋', '4', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('16', '女鞋', '4', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('17', '男鞋', '4', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('18', '运动鞋', '4', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('19', '休闲鞋', '4', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('20', '球类', '5', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('21', '拖鞋', '4', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('22', '健身器材', '5', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('23', '学习用品', '5', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('24', '运动防护', '5', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('25', '文化娱乐', '5', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('26', '坐垫', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('27', '被单', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('28', '被子', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('29', '耳环', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('30', '影音', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('31', '手链', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('32', '公仔', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('33', '模型', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('34', '床垫', '6', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('35', '化妆水', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('36', '洁面', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('37', '眼霜', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('38', 'BB霜', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('39', '粉底', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('40', '爽肤水', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('41', '面膜', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('42', '香水', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('43', '口红/唇彩', '8', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('44', '小说', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('45', '中国名著', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('46', '外国文学', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('47', '教科书', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('48', '动漫', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('49', '试卷', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('50', '期刊', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('51', '科普读物', '10', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('52', '袜子', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('53', '睡衣', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('54', '裤子', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('55', '针织', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('56', 't恤', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('57', '外套', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('58', '裙子', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('59', '衬衫', '7', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('60', '肉类', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('61', '豆干类', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('62', '茶饮料', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('63', '奶茶', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('64', '牛奶', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('65', '腌制品', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('66', '果冻布丁', '11', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('67', '袜子', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('68', '裤子', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('69', '睡衣', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('70', '外套', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('71', '针织', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('72', 't恤', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('73', '衬衫', '9', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('74', '数码相机', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('75', '数码配件', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('76', '数码摄影机', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('77', '手机', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('78', '通讯配件', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('79', '剃须刀', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('80', '饮水机', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('81', '空调', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('82', '吹风筒', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('83', '洗衣机', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('84', '电视', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('85', '冰箱', '12', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('86', '牙膏', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('87', '洗发水', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('88', '护发素', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('89', '洗手液', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('90', '牙刷', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('91', '洗衣粉/液', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('92', '毛巾', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('93', '镜子/梳子', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('94', '盆具', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('95', '牙签', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('96', '保鲜盒', '13', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('97', '笔记本', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('98', '鼠标', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('99', '键盘', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('100', '摄像头', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('101', '主板', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('102', '内存', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('103', '打印机', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('104', '扫描仪', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('105', '计算器', '14', '', '2017-02-10 15:18:47', '1');
INSERT INTO `goods_type` VALUES ('106', '电源', '14', '', '2017-02-10 15:18:47', '1');

-- ----------------------------
-- Table structure for groups
-- ----------------------------
DROP TABLE IF EXISTS `groups`;
CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '组id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '组名',
  `parentid` int(10) unsigned NOT NULL COMMENT '父级组id',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态：0 删除  1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='分组表';

-- ----------------------------
-- Records of groups
-- ----------------------------

-- ----------------------------
-- Table structure for logistics
-- ----------------------------
DROP TABLE IF EXISTS `logistics`;
CREATE TABLE `logistics` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '物流信息id',
  `uid` int(10) unsigned NOT NULL COMMENT '用户id',
  `recipient` varchar(255) NOT NULL DEFAULT '' COMMENT '收件人名字',
  `phone` varchar(255) NOT NULL DEFAULT '' COMMENT '联系电话',
  `postcode` varchar(32) NOT NULL DEFAULT '' COMMENT '邮编',
  `province` varchar(32) NOT NULL DEFAULT '' COMMENT '省',
  `city` varchar(255) NOT NULL DEFAULT '' COMMENT '市',
  `area` varchar(255) NOT NULL DEFAULT '' COMMENT '区',
  `address` varchar(255) NOT NULL DEFAULT '' COMMENT '详细地址',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(2) NOT NULL DEFAULT '1' COMMENT '是否删除：0删除，1存在',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='物流地址表';

-- ----------------------------
-- Records of logistics
-- ----------------------------
INSERT INTO `logistics` VALUES ('2', '119', '刘家辉', '15999999999', '000000', '广东省', '广州市', '黄埔区', '广州商学院', '2017-05-07 16:22:20', '1');
INSERT INTO `logistics` VALUES ('3', '112', '邱周周', '13423416288', '0000000', '上海市', '虹口区', '城区', '16巷子', '2017-05-08 17:37:10', '0');
INSERT INTO `logistics` VALUES ('4', '112', '邱周周1', '13423416288', '000000', '广东省', '珠海市', '斗门区', '16巷子', '2017-05-07 16:38:28', '1');
INSERT INTO `logistics` VALUES ('5', '113', '胡洁如', '13686163835', '000000', '广东省', '广州市', '黄埔区', '广州商学院', '2017-05-08 14:26:57', '1');
INSERT INTO `logistics` VALUES ('6', '118', '陈田晓', '13666666666', '000000', '北京市', '大兴区', '五环至六环之间', '胡同街', '2017-05-08 14:34:06', '1');
INSERT INTO `logistics` VALUES ('7', '118', '刘小姐', '13466666666', '123456', '天津市', '河西区', '全境', '大新路18号', '2017-05-08 14:34:49', '1');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `uid` int(10) unsigned NOT NULL COMMENT '订单的主人id',
  `gid` int(10) unsigned NOT NULL COMMENT '商品id',
  `lid` int(10) unsigned NOT NULL COMMENT '收货信息',
  `number` int(32) unsigned NOT NULL DEFAULT '0' COMMENT '购买数量',
  `payment_status` int(8) unsigned NOT NULL DEFAULT '0' COMMENT '商品状态：0 ：没发货  1：已发货  2：完成交易 3:用户已经评价',
  `create_time` datetime NOT NULL COMMENT '购买时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '0：删除  1：未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='订单表';

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '112', '50', '3', '1', '0', '2017-05-07 15:07:22', '1');
INSERT INTO `orders` VALUES ('2', '112', '50', '3', '2', '0', '2017-05-07 15:30:50', '1');
INSERT INTO `orders` VALUES ('3', '119', '44', '2', '1', '0', '2017-05-07 16:22:24', '1');
INSERT INTO `orders` VALUES ('4', '119', '37', '2', '1', '3', '2017-05-07 16:22:24', '1');
INSERT INTO `orders` VALUES ('5', '112', '37', '4', '1', '3', '2017-05-07 16:38:37', '1');
INSERT INTO `orders` VALUES ('6', '112', '37', '3', '2', '3', '2017-05-08 13:54:58', '1');
INSERT INTO `orders` VALUES ('7', '112', '35', '3', '1', '1', '2017-05-08 13:54:58', '1');
INSERT INTO `orders` VALUES ('8', '113', '38', '5', '2', '0', '2017-05-08 14:26:59', '1');
INSERT INTO `orders` VALUES ('9', '118', '37', '6', '3', '3', '2017-05-08 14:34:53', '1');
INSERT INTO `orders` VALUES ('10', '112', '50', '4', '2', '2', '2017-05-08 17:42:46', '1');

-- ----------------------------
-- Table structure for province
-- ----------------------------
DROP TABLE IF EXISTS `province`;
CREATE TABLE `province` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名字',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级分类id',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '分类说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态: 0 删除  1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COMMENT='城市表';

-- ----------------------------
-- Records of province
-- ----------------------------
INSERT INTO `province` VALUES ('37', '北京', '0', '', '2017-02-12 13:07:04', '1');
INSERT INTO `province` VALUES ('38', '广东', '0', '', '2017-02-12 13:07:04', '1');
INSERT INTO `province` VALUES ('39', '上海', '0', '', '2017-02-12 13:07:04', '1');

-- ----------------------------
-- Table structure for school
-- ----------------------------
DROP TABLE IF EXISTS `school`;
CREATE TABLE `school` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '分类id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '分类名字',
  `parentid` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '父级分类id',
  `remark` varchar(255) NOT NULL DEFAULT '' COMMENT '分类说明',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '状态: 0 删除  1 未删除',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8 COMMENT='学校表';

-- ----------------------------
-- Records of school
-- ----------------------------
INSERT INTO `school` VALUES ('23', '清华大学', '37', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('24', '外交学院', '37', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('25', '中国农业大学', '37', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('26', '中央财经大学', '37', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('27', '北京大学', '37', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('28', '广州大学', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('29', '中科院', '37', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('30', '广州商学院', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('31', '华南农业大学', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('32', '广东药学院', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('33', '东莞理工', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('34', '嘉应学院', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('35', '复旦大学', '39', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('36', '广东海洋', '38', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('37', '华东师大', '39', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('38', '上海戏剧学院', '39', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('39', '上海工程', '39', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('40', '上海大学', '39', '', '2017-02-12 13:07:04', '1');
INSERT INTO `school` VALUES ('41', '上海电力', '39', '', '2017-02-12 13:07:04', '1');

-- ----------------------------
-- Table structure for search
-- ----------------------------
DROP TABLE IF EXISTS `search`;
CREATE TABLE `search` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(12) unsigned NOT NULL COMMENT '用户id',
  `keyword` varchar(255) NOT NULL DEFAULT '' COMMENT '搜索关键字',
  `create_time` datetime NOT NULL COMMENT '搜索时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=152 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of search
-- ----------------------------
INSERT INTO `search` VALUES ('151', '112', '二手', '2017-05-08 17:06:40');
INSERT INTO `search` VALUES ('150', '112', '手机', '2017-05-08 12:00:05');
INSERT INTO `search` VALUES ('149', '112', '教科书', '2017-05-08 12:00:00');
INSERT INTO `search` VALUES ('148', '112', '手机', '2017-05-08 11:59:59');
INSERT INTO `search` VALUES ('147', '112', '牙膏', '2017-05-07 16:16:22');
INSERT INTO `search` VALUES ('146', '112', '牙膏', '2017-05-07 16:16:16');
INSERT INTO `search` VALUES ('145', '112', '牙膏', '2017-05-07 16:14:03');
INSERT INTO `search` VALUES ('144', '112', '手机', '2017-05-07 16:13:53');
INSERT INTO `search` VALUES ('143', '119', '手机', '2017-04-28 12:17:44');
INSERT INTO `search` VALUES ('142', '119', '小说', '2017-04-28 12:17:43');
INSERT INTO `search` VALUES ('141', '119', '女装', '2017-04-28 12:17:42');
INSERT INTO `search` VALUES ('140', '119', '四级', '2017-04-28 12:17:40');
INSERT INTO `search` VALUES ('139', '113', '四级', '2017-04-28 11:35:50');
INSERT INTO `search` VALUES ('138', '118', '女装', '2017-04-28 11:29:19');
INSERT INTO `search` VALUES ('137', '118', '手机', '2017-04-28 11:29:12');
INSERT INTO `search` VALUES ('136', '113', '手机', '2017-04-27 18:09:07');

-- ----------------------------
-- Table structure for season
-- ----------------------------
DROP TABLE IF EXISTS `season`;
CREATE TABLE `season` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT COMMENT '原因id',
  `rid` int(12) unsigned NOT NULL COMMENT '审核结果id',
  `season` varchar(255) NOT NULL COMMENT '审核不通过的原因',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=gbk COMMENT='不通过原因表';

-- ----------------------------
-- Records of season
-- ----------------------------
INSERT INTO `season` VALUES ('15', '39', '真实姓名和身份证不符合');
INSERT INTO `season` VALUES ('14', '38', '学生证不合格');

-- ----------------------------
-- Table structure for shop_cart
-- ----------------------------
DROP TABLE IF EXISTS `shop_cart`;
CREATE TABLE `shop_cart` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `uid` int(8) unsigned NOT NULL,
  `gid` int(8) unsigned NOT NULL COMMENT '商品id',
  `number` int(12) unsigned NOT NULL DEFAULT '1' COMMENT '数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='购物车表';

-- ----------------------------
-- Records of shop_cart
-- ----------------------------
INSERT INTO `shop_cart` VALUES ('1', '112', '49', '3');
INSERT INTO `shop_cart` VALUES ('2', '112', '35', '1');

-- ----------------------------
-- Table structure for tags
-- ----------------------------
DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `create_time` datetime NOT NULL,
  `status` int(8) unsigned NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=gbk;

-- ----------------------------
-- Records of tags
-- ----------------------------
INSERT INTO `tags` VALUES ('1', '新品', '2017-02-12 15:37:54', '1');
INSERT INTO `tags` VALUES ('2', '二手', '2017-02-12 15:38:47', '1');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `mid` int(10) unsigned NOT NULL COMMENT '资料id',
  `gid` int(10) unsigned NOT NULL COMMENT '组id',
  `account` varchar(255) NOT NULL DEFAULT '' COMMENT '账号：手机号码',
  `password` varchar(255) NOT NULL DEFAULT '' COMMENT '密码',
  `reg_time` datetime NOT NULL COMMENT '注册时间',
  `last_time` datetime NOT NULL COMMENT '最后登录时间',
  `status` int(8) unsigned NOT NULL DEFAULT '1' COMMENT '0: 删除   1：未删除',
  PRIMARY KEY (`id`,`mid`,`account`)
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8 COMMENT='用户表';

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('112', '7', '0', '13423416288', '0659c7992e268962384eb17fafe88364', '2017-04-13 02:12:24', '2017-05-08 16:46:03', '1');
INSERT INTO `users` VALUES ('113', '8', '0', '13686163835', '0659c7992e268962384eb17fafe88364', '0000-00-00 00:00:00', '2017-05-08 17:56:36', '1');
INSERT INTO `users` VALUES ('118', '12', '0', '13666666666', 'e10adc3949ba59abbe56e057f20f883e', '2017-04-27 16:55:36', '2017-05-08 14:32:27', '1');
INSERT INTO `users` VALUES ('119', '13', '0', '15999999999', 'b427ebd39c845eb5417b7f7aaf1f9724', '2017-04-27 17:12:09', '2017-05-08 17:38:56', '1');
INSERT INTO `users` VALUES ('120', '14', '0', '17666666666', 'd8578edf8458ce06fbc5bb76a58c5ca4', '2017-04-27 17:37:35', '2017-04-27 17:37:35', '1');
INSERT INTO `users` VALUES ('121', '15', '0', '13488888888', 'a152e841783914146e4bcd4f39100686', '2017-04-27 17:52:04', '2017-04-27 17:52:04', '1');
INSERT INTO `users` VALUES ('122', '16', '0', '18666666666', '8ace72535e8ea08b22681721a437a6f5', '2017-04-27 17:57:18', '2017-04-27 17:57:18', '1');

-- ----------------------------
-- Table structure for users_msg
-- ----------------------------
DROP TABLE IF EXISTS `users_msg`;
CREATE TABLE `users_msg` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户信息id',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT '姓名',
  `nickname` varchar(255) NOT NULL COMMENT '用户昵称',
  `sex` int(8) NOT NULL COMMENT '性别：1 男  2 女',
  `card` varchar(32) NOT NULL DEFAULT '' COMMENT '身份证',
  `student_card` varchar(32) NOT NULL DEFAULT '' COMMENT '学生证',
  `student_photo` varchar(255) NOT NULL DEFAULT '' COMMENT '学生拿着学生证的合照',
  `card_photo` varchar(255) NOT NULL COMMENT '学生拿着身份证的合照',
  `school_city` int(12) unsigned NOT NULL COMMENT '省',
  `school` int(12) unsigned NOT NULL COMMENT '学校',
  `avatar` varchar(255) NOT NULL DEFAULT '' COMMENT '头像',
  `status` int(8) NOT NULL DEFAULT '0' COMMENT '审核状态:  0待审核   1已审核',
  PRIMARY KEY (`id`,`school`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- ----------------------------
-- Records of users_msg
-- ----------------------------
INSERT INTO `users_msg` VALUES ('7', '邱周周', '小新', '1', '441423199501125663', '201306114126', '/upload/files/14891517067517.jpg', '/upload/files/148915170675162.jpg', '38', '31', '/upload/files/148915170674917.jpg', '1');
INSERT INTO `users_msg` VALUES ('8', '胡洁如', '冰', '0', '441423199501125662', '201306114125', '/upload/files/148915218720040.jpg', '/upload/files/148915218720010.jpg', '38', '30', '/upload/files/14891521872007.jpg', '1');
INSERT INTO `users_msg` VALUES ('12', '陈田晓', '甜蜜果', '0', '441423199501125664', '201306114127', '/upload/files/14932834733589.png', '/upload/files/149328347335825.jpg', '37', '23', '/upload/files/149328347335779.jpeg', '1');
INSERT INTO `users_msg` VALUES ('13', '刘家辉', '小辉辉', '1', '441423199501125665', '201306114128', '/upload/files/149328512212035.jpg', '/upload/files/149328512212031.jpg', '38', '30', '/upload/files/149328512212043.jpg', '1');
INSERT INTO `users_msg` VALUES ('14', '测试不通过用户', '测试不通过用户', '1', '441526456984556233', '201564895648', '/upload/files/149328595115151.png', '/upload/files/149328595115131.png', '39', '35', '/upload/files/149328595115184.png', '1');
INSERT INTO `users_msg` VALUES ('15', '不通过用户', '不通过用户', '0', '556589422658856225', '264626656544', '/upload/files/149328677800836.png', '/upload/files/149328677800879.png', '39', '37', '/upload/files/14932867780084.png', '1');
INSERT INTO `users_msg` VALUES ('16', '测试待审核', '测试待审核', '1', '415268459852116522', '206541365448', '/upload/files/149328711655317.jpg', '/upload/files/149328711655389.png', '38', '33', '/upload/files/149328711655322.png', '0');
