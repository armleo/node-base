// Project/index.js
process.stdout.isTTY = true;
// Заставим думать node.js что мой любимый git bash это консоль!
// Смотрите https://github.com/nodejs/node/issues/3006

const cluster = require('cluster');
// загрузим кластер
if(cluster.isMaster)
{
    // если мы <<master>> то запустим код из ветки мастер
    require('./master');
}
else
{
    // Если мы worker запустим код из ветки для worker-a
    require('./worker');
}