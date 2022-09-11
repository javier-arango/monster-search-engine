package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"strings"

	"github.com/360EntSecGroup-Skylar/excelize"
	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type App struct {
	r *mux.Router
}

type Security struct {
	security_id   string
	query_result  string
	security_type string
}

type SecurityList struct {
	Security []Security
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
	cmd := &exec.Cmd{
		Path:   "./bash_engine/search.sh",
		Args:   []string{"./bash_engine/search.sh", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", search.Query},
		Stdout: os.Stdout,
		Stderr: os.Stderr,
	}
	cmd.Run()

	// parse the results
	file, err := os.Open("./result.csv")
	if err != nil {
		log.Fatal(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)
	var nextIsTitle bool = false
	var tmp string = ""
	var secType string = ""
	var secList SecurityList
	for scanner.Scan() {
		fmt.Println(scanner.Text())

		tmp = scanner.Text()

		if nextIsTitle {
			switch {
			case tmp == "security_id":
				secType = tmp
			case tmp == "cusip":
				secType = tmp
			case tmp == "isin":
				secType = tmp
			case tmp == "ric":
				secType = tmp
			case tmp == "bloomberg":
				secType = tmp
			case tmp == "bbg":
				secType = tmp
			case tmp == "symbol":
				secType = tmp
			case tmp == "root_symbol":
				secType = tmp
			case tmp == "bb_yellow":
				secType = tmp
			case tmp == "spn":
				secType = tmp
			}

			nextIsTitle = false
		} else {
			if tmp == "######" {
				nextIsTitle = true
				continue
			}
			//put the data in the list
			res := strings.Index(tmp, ":")
			if res == -1 {
				continue
			}
			f, err := excelize.OpenFile("data.xlsx")
			c1 := f.GetCellValue("data.xlsx", "A"+tmp[0:res])
			s := Security{security_id: c1, query_result: tmp[res+1:], security_type: secType}
			secList.Security = append(secList.Security, s)

			if err != nil {
				log.Fatal(err)
			}
		}
	}

	// get the security id
	// c1, err := f.GetCellValue("SHEET_NAME", "A1")
	if err := scanner.Err(); err != nil {
		log.Fatal(err)
	}

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
