
const config = {
  server: 'witssummer.c5ni8ntdysh1.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: 'wits365summer5782',
  database: 'witsExamples',
  
  options: {
    trustedconnection: true,
    enableArithPort: true,
    trustServerCertificate: true
  },
  port: 1433
  
}

module.exports = config;