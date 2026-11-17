#!/usr/bin/env node
/* 生成访问密码的 SHA-256 哈希（含站点盐值）。
 * 用法：node scripts/hash-password.mjs 新密码
 * 把输出整行替换 index.html 里 JS 顶部的 PASS_HASH 即可完成改密。 */
import { createHash } from 'node:crypto';

const SALT = 'ai-explore::gate::';
const pw = process.argv[2];

if (!pw) {
  console.error('用法：node scripts/hash-password.mjs 新密码');
  process.exit(1);
}

console.log(createHash('sha256').update(SALT + pw, 'utf8').digest('hex'));
