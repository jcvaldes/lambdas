```
sls invoke  -f hello -s dev 
sls invoke  -f hello -s dev -d 'hola'
sls invoke  -f hello -s dev -d '{"name": "valdes"}'
```

### Ejecuto en forma local

```
sls invoke local -f hello -s dev -d '{"name": "valdes"}'
```