cd /d %~dp0
start cmd /k "docker-compose -f docker-compose.yml up --build"
