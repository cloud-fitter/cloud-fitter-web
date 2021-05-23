# Cloud-Fitter
## 说明

基于react17 + umi3 + ant-design4 + typescript

## 运行

安装依赖：npm install 或 yarn install
启动项目：npm start 或 yarn start 

## 编译镜像

yarn build

docker build -t cloudfitter/cloud-fitter-web:latest .

docker run -d --rm --add-host localnode:$(ifconfig en0 | grep inet | grep -v inet6 | awk '{print $2}') -p 8080:8080 cloudfitter/cloud-fitter-web:latest
或者
docker run -d --rm --add-host localnode:{本机ip} -p 8080:8080 cloudfitter/cloud-fitter-web:latest
