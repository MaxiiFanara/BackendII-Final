
# Puerto en el que correrá el servidor
PORT=8080

# Entorno de ejecución (development | production)
NODE_ENV=development


# URL de conexión a MongoDB
 Para local: mongodb://localhost:27017/nombre_db
 Para Atlas: mongodb+srv://usuario:password@cluster.mongodb.net/nombre_db
MONGO_URL= valor de la url 

# Secreto para firmar tokens JWT (cambiar en producción)
JWT_SECRET= clave jwt 

# Tiempo de expiración del token JWT
JWT_EXPIRES_IN=24h


# Tiempo de expiración del token de reset de pass 
PASSWORD_RESET_EXPIRES_IN=1h

# Secreto para tokens de recuperación (diferente al JWT_SECRET)
PASSWORD_RESET_SECRET= clave jwt para reset pass 



# Servicio de email 
EMAIL_SERVICE=gmail

# Email desde el cual se enviarán los correos
EMAIL_USER=tu_email@gmail.com

# Contraseña de aplicación de Gmail
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx

# Puerto para Gmail
EMAIL_PORT=3000

# Número de rondas de sal para bcrypt
BCRYPT_SALT_ROUNDS=1

# Secreto para firmar cookies (cambiar en producción)
COOKIE_SECRET= clave secretas para cookies 

