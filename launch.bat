@echo off
start cmd /K mongod --dbpath ./DB/ --bind_ip 127.0.0.1
:1
node .
goto:1