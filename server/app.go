package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os/exec"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type App struct {
	r *mux.Router
}

type SearchQuery struct {
	Query string `json:"searchquery"`
}

func (a *App) Initialize() {
	a.r = mux.NewRouter()
	a.initializeRoutes()
	fmt.Println("Server started")
}

func (a *App) HelloWorld(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	var search SearchQuery
	err := json.NewDecoder(r.Body).Decode(&search)
	if err != nil {
		sendErr(w, http.StatusBadRequest, err.Error())
		return
	}
	fmt.Println("Received quwey!")

	// call search
	/*
		cmd := &exec.Cmd{
			Path:   "./bash_engine/search.sh",
			Args:   []string{"./bash_engine/search.sh", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", search.Query},
			Stdout: os.Stdout,
			Stderr: os.Stderr,
		}
	*/

	out, err := exec.Command("./bash_engine/search.sh 0 1 2 3 4 5 6 7 8 9 " + search.Query).Output()

	fmt.Println(out)

	resp := make(map[string]string)
	resp["message"] = "Status Created"
	resp["searchquery"] = search.Query

	jsonResp, err := json.Marshal(resp)
	if err != nil {
		log.Fatalf("Error happened in JSON marshal. Err: %s", err)
	}
	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write(jsonResp)
}

func sendErr(w http.ResponseWriter, code int, message string) {
	resp, _ := json.Marshal(map[string]string{"error": message})
	http.Error(w, string(resp), code)
}

func (a *App) Run(addr string) {

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:4200", "http://localhost:4200/AppointmentForm"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "DELETE", "POST", "PUT"},
	})

	handler := c.Handler(a.r)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
