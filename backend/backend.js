class PromisedConnection {
    constructor(config) {
        // this.connection always points to a promise resolving after the last assigned request
        // initial setting is either resolved once a new connection is established or rejected if an error occurs
        this.connection = new Promise((resolve, reject) => {
            const dbConnection = new Connection(config);
            dbConnection.on("connect", function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(dbConnection);
                }
            });
        });
    }

    execute(request) {
        const nextConnection = new Promise((resolve, reject) => {
            // after scheduling new request this.connection should be reassigned to be the last in promise queue
            this.connection
                .catch( (reason) => {
                    reject(reason);
                } )
                .then( (dbConnection) => { // a new request can be executed only within the connection is free again (resolved after the last request)
                    request.on("requestCompleted", () => { // add an additional event listener in order to release connection after the request is done
                        resolve(dbConnection);
                    });
                    dbConnection.execSql(request);
                });
        } );
        this.connection = nextConnection;
    }
}