```
sls invoke  -f hello -s dev 
sls invoke  -f hello -s dev -d 'hola'
sls invoke  -f hello -s dev -d '{"name": "valdes"}'
```

### Ejecuto en forma local

```
sls invoke local -f hello -s dev -d '{"name": "valdes"}'
```
## Serverless plugins

https://www.serverless.com/plugins

## Serverless offline

Permite trabajar en forma offline las api gateway gracias a que lo simula, evita gastos y tenemos configurado todo de forma rápida.

```
npm init -y
npm install serverless-offline --save-dev
```

plugins:
  - serverless-offline

```
sls offline
```