package main

func (a *App) initializeRoutes() {
	a.r.HandleFunc("/stars", a.HelloWorld).Methods("POST")
	// a.r.HandleFunc("/getClient", a.getClient).Methods("GET")
}
